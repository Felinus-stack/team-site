import { createHash } from "node:crypto";
import { prisma } from "./prisma";

export type AgentSource = {
  type: "project" | "news";
  title: string;
  url: string;
  excerpt: string;
};

export type AgentStreamMetadata = {
  conversationId: string;
  sources: AgentSource[];
};

export type AgentStreamCallbacks = {
  onReady: (metadata: AgentStreamMetadata) => void;
  onDelta: (content: string) => void;
};

type KnowledgePayload = AgentSource & { content: string };

type QdrantPoint = {
  id: string;
  score: number;
  payload?: KnowledgePayload;
};

type QdrantQueryResult = {
  result?: { points?: QdrantPoint[] };
};

type OllamaEmbedResult = { embeddings?: unknown };

type LlmStreamChunk = {
  choices?: Array<{ delta?: { content?: unknown } }>;
};

const qdrantUrl = (process.env.QDRANT_URL ?? "http://localhost:6333").replace(/\/$/, "");
const qdrantCollection = process.env.QDRANT_COLLECTION ?? "team_site_knowledge";
const ollamaUrl = (process.env.OLLAMA_URL ?? "http://localhost:11434").replace(/\/$/, "");
const embeddingModel = process.env.EMBEDDING_MODEL ?? "nomic-embed-text";
const llmApiBaseUrl = (process.env.LLM_API_BASE_URL ?? "").replace(/\/$/, "");
const llmModel = process.env.LLM_MODEL ?? "doubao-seed-2.0-pro";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const requestJson = async <T>(url: string, init: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const status = isRecord(payload) && isRecord(payload.status) ? payload.status : null;
    const message = status && typeof status.error === "string"
      ? status.error
      : `${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  return payload as T;
};

const getEmbedding = async (input: string): Promise<number[]> => {
  const result = await requestJson<OllamaEmbedResult>(`${ollamaUrl}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: embeddingModel, input }),
  });
  const embeddings = result.embeddings;
  if (!Array.isArray(embeddings) || !Array.isArray(embeddings[0])) {
    throw new Error("Ollama did not return a valid embedding");
  }
  const vector = embeddings[0];
  if (!vector.every((value): value is number => typeof value === "number" && Number.isFinite(value))) {
    throw new Error("Ollama returned an invalid embedding vector");
  }
  return vector;
};

const ensureCollection = async (vectorSize: number): Promise<void> => {
  const response = await fetch(`${qdrantUrl}/collections/${qdrantCollection}`);
  if (response.ok) return;
  if (response.status !== 404) {
    throw new Error(`Unable to read Qdrant collection: ${response.status}`);
  }
  await requestJson(`${qdrantUrl}/collections/${qdrantCollection}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vectors: { size: vectorSize, distance: "Cosine" } }),
  });
};

const searchKnowledge = async (question: string): Promise<AgentSource[]> => {
  const vector = await getEmbedding(question);
  const result = await requestJson<QdrantQueryResult>(
    `${qdrantUrl}/collections/${qdrantCollection}/points/query`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: vector, limit: 5, with_payload: true, score_threshold: 0.25 }),
    }
  );
  return (result.result?.points ?? [])
    .filter((point) => point.payload && point.score >= 0.25)
    .map((point) => point.payload as AgentSource);
};

const buildLlmMessages = (
  question: string,
  sources: AgentSource[],
  previousMessages: Array<{ role: "USER" | "ASSISTANT"; content: string }>,
  recruitmentTasks: Array<{ direction: string; title: string; description: string }>
): Array<{ role: "system" | "user" | "assistant"; content: string }> => {
  const context = sources.length > 0
    ? sources.map((source, index) => `[${index + 1}] ${source.title}\n${source.excerpt}`).join("\n\n")
    : "没有检索到官网资料。";
  const history = previousMessages.slice(-8).map((message) => ({
    role: message.role === "USER" ? "user" as const : "assistant" as const,
    content: message.content,
  }));
  const taskGuide = recruitmentTasks
    .map((task) => `- ${task.direction}: ${task.title}（${task.description}）`)
    .join("\n");
  return [
    {
      role: "system",
      content: "你是源境团队官网的 AI 助手。用简洁、友好的中文回答。只能把给定官网资料当作关于团队事实的依据；资料不足时明确说明，并建议用户查看官网或联系团队。不要编造项目、成员、招新或联系方式；不要输出推理过程。",
    },
    {
      role: "system",
      content: `当用户明确想了解“我是否适合加入团队”、招新、方向选择或能力评估时，你仍是同一个官网助手，但切换为自然的招新咨询对话：每次只追问一个关键问题，逐步了解兴趣方向、项目或练习中本人负责的内容、技术基础、协作经历、三个月目标，以及是否能每周稳定投入至少 24 小时。信息充分后，用“方向建议 / 已有证据 / 还需准备 / 推荐任务 / 下一步”总结。只根据用户已说明的经历归纳，不猜测人格；不询问性别、年龄、民族、健康、宗教等敏感信息；不能自动录取、淘汰或承诺加入，必须说明最终由团队人工审核。没有经验时给出可执行的学习建议。用户未表达招新意图时，不要主动把普通官网问答转为评估。\n\n可推荐任务：\n${taskGuide || "暂无任务配置"}`,
    },
    {
      role: "system",
      content: "招新流程补充：完成信息了解后，不要推荐任务。请简洁说明方向建议、已有证据、还需准备和“最终由团队人工审核”，然后请用户仅输入一个常用邮箱以提交加入意向，并在回复最后单独追加标记 [[COLLECT_EMAIL]]。在用户提交邮箱前，不要追加该标记；其他普通官网问答不使用该标记。",
    },
    ...history,
    { role: "system", content: `本次检索到的官网资料：\n${context}` },
    { role: "user", content: question },
  ];
};

const getDeltaContent = (payload: unknown): string | null => {
  if (!isRecord(payload) || !Array.isArray(payload.choices)) return null;
  const firstChoice = payload.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.delta)) return null;
  return typeof firstChoice.delta.content === "string" ? firstChoice.delta.content : null;
};

const streamLlmAnswer = async (
  question: string,
  sources: AgentSource[],
  previousMessages: Array<{ role: "USER" | "ASSISTANT"; content: string }>,
  recruitmentTasks: Array<{ direction: string; title: string; description: string }>,
  onDelta: (content: string) => void
): Promise<string> => {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey || !llmApiBaseUrl) {
    throw new Error("LLM_API_BASE_URL and LLM_API_KEY must be configured");
  }

  const response = await fetch(`${llmApiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: llmModel,
      temperature: 0.3,
      stream: true,
      messages: buildLlmMessages(question, sources, previousMessages, recruitmentTasks),
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${detail.slice(0, 500)}`);
  }
  if (!response.body) throw new Error("The configured LLM did not return a response stream");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";
  let completed = false;

  const processEvents = (): void => {
    buffer = buffer.replace(/\r\n/g, "\n");
    let boundary = buffer.indexOf("\n\n");
    while (boundary >= 0) {
      const event = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      boundary = buffer.indexOf("\n\n");
      const data = event
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice("data:".length).trimStart())
        .join("\n");
      if (!data) continue;
      if (data === "[DONE]") {
        completed = true;
        continue;
      }
      try {
        const content = getDeltaContent(JSON.parse(data) as unknown);
        if (content) {
          answer += content;
          onDelta(content);
        }
      } catch {
        // Ignore malformed provider keepalive events and continue reading the stream.
      }
    }
  };

  while (!completed) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    processEvents();
    if (done) break;
  }
  buffer += decoder.decode();
  processEvents();

  if (answer.trim().length === 0) {
    throw new Error("The configured LLM returned an empty streamed answer");
  }
  return answer.trim();
};

const normalizeSessionId = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const sessionId = value.trim();
  return /^[A-Za-z0-9_-]{8,128}$/.test(sessionId) ? sessionId : null;
};

export const streamAgentReply = async (
  input: { message: string; sessionId: unknown; conversationId: unknown },
  callbacks: AgentStreamCallbacks
): Promise<AgentStreamMetadata> => {
  const sessionId = normalizeSessionId(input.sessionId);
  if (!sessionId) throw new Error("A valid sessionId is required");

  const requestedConversationId = typeof input.conversationId === "string"
    ? input.conversationId
    : undefined;
  const existingConversation = requestedConversationId
    ? await prisma.agentConversation.findFirst({
        where: { id: requestedConversationId, sessionId },
        include: { messages: { orderBy: { createdAt: "desc" }, take: 8 } },
      })
    : null;
  const conversation = existingConversation ?? await prisma.agentConversation.create({
    data: { sessionId, title: input.message.slice(0, 80) },
    include: { messages: true },
  });
  const previousMessages = [...conversation.messages]
    .reverse()
    .map((message) => ({ role: message.role, content: message.content }));

  await prisma.agentMessage.create({
    data: { conversationId: conversation.id, role: "USER", content: input.message },
  });
  const sources = await searchKnowledge(input.message);
  const recruitmentTasks = await prisma.recruitmentTask.findMany({
    where: { isActive: true },
    orderBy: [{ direction: "asc" }, { version: "desc" }],
    distinct: ["direction"],
    select: { direction: true, title: true, description: true },
  });
  const metadata = { conversationId: conversation.id, sources };
  callbacks.onReady(metadata);

  const answer = await streamLlmAnswer(
    input.message,
    sources,
    previousMessages,
    recruitmentTasks,
    callbacks.onDelta
  );
  await prisma.agentMessage.create({
    data: {
      conversationId: conversation.id,
      role: "ASSISTANT",
      content: answer,
      citations: {
        create: sources.map((source) => ({
          sourceType: source.type,
          sourceUrl: source.url,
          sourceTitle: source.title,
        })),
      },
    },
  });
  return metadata;
};

const toDeterministicUuid = (input: string): string => {
  const hex = createHash("sha256").update(input).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
};

const chunkText = (text: string): string[] => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 1200) return [normalized];
  const chunks: string[] = [];
  for (let start = 0; start < normalized.length; start += 1000) {
    chunks.push(normalized.slice(start, start + 1200));
  }
  return chunks;
};

export const synchronizeKnowledge = async (): Promise<number> => {
  const [projects, news] = await Promise.all([
    prisma.project.findMany({ include: { parts: true } }),
    prisma.news.findMany({ include: { content: true } }),
  ]);
  const documents: Array<{ id: string; payload: KnowledgePayload }> = [
    ...projects.flatMap((project) => {
      const content = [
        `项目：${project.name}`,
        `年份：${project.year}`,
        `简介：${project.shortDescription}`,
        ...project.parts.map((part) => `${part.partName}：${part.description}`),
      ].join("\n");
      return chunkText(content).map((chunk, index) => ({
        id: toDeterministicUuid(`project:${project.id}:${index}`),
        payload: {
          type: "project" as const,
          title: project.name,
          url: `/projects/${encodeURIComponent(project.name)}`,
          excerpt: chunk,
          content: chunk,
        },
      }));
    }),
    ...news.flatMap((newsItem) => {
      const content = [
        `新闻：${newsItem.title}`,
        `简介：${newsItem.shortDescription}`,
        `正文：${newsItem.longDescription}`,
        ...newsItem.content.map((item) => item.text),
      ].join("\n");
      return chunkText(content).map((chunk, index) => ({
        id: toDeterministicUuid(`news:${newsItem.id}:${index}`),
        payload: {
          type: "news" as const,
          title: newsItem.title,
          url: `/news/${newsItem.id}`,
          excerpt: chunk,
          content: chunk,
        },
      }));
    }),
  ];
  if (documents.length === 0) return 0;

  const vectors = await Promise.all(documents.map((document) => getEmbedding(document.payload.content)));
  await ensureCollection(vectors[0].length);
  await requestJson(`${qdrantUrl}/collections/${qdrantCollection}/points?wait=true`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      points: documents.map((document, index) => ({
        id: document.id,
        vector: vectors[index],
        payload: document.payload,
      })),
    }),
  });
  return documents.length;
};
