import { createHmac, timingSafeEqual } from "node:crypto";
import { Prisma, type RecruitmentIntentStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { streamAgentReply } from "./lib/agent";
import { getMailConfigurationError, isMailConfigured, sendJoinAcceptedEmail } from "./lib/mail";
import { prisma } from "./lib/prisma";
import {
  getDirectionLabel,
  getRecommendation,
  isRecruitmentDirection,
  type RecruitmentDirectionValue,
} from "./lib/recruitment";

type ProjectParams = { name: string };
type NewsParams = { newsId: string };
type RecruitmentIntentParams = { intentId: string };
type RecruitmentIntentQuery = { page?: string; pageSize?: string; status?: string };
type TeamQuery = { projectName?: string };
type TeamMemberQuery = { name?: string; surname?: string };
type EmptyParams = Record<string, never>;

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

type AuthResponse = {
  token: string;
  user: { id: string; name: string | null; email: string | null };
};

type NewsInput = {
  title: string;
  shortDescription: string;
  longDescription: string;
  duration: number;
  logo: string;
  mainImage: string;
  content: Array<{ text: string }>;
};

type RecruitmentAnswerInput = {
  questionCode: string;
  answer: string;
};

type RecruitmentApplicationInput = {
  sessionId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  primaryDirection: RecruitmentDirectionValue;
  secondaryDirection: RecruitmentDirectionValue | null;
  weeklyHours: number;
  motivation: string;
  projectExperience: string;
  portfolioUrl: string | null;
  collaborationExperience: string | null;
  learningGoals: string;
  answers: RecruitmentAnswerInput[];
};

type AgentSource = {
  type: "project" | "news";
  title: string;
  url: string;
};

type AgentChatResponse = {
  answer: string;
  mode: "retrieval" | "rag";
  sources: AgentSource[];
};

const app = express();
const port = Number(process.env.API_PORT ?? 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";
const jwtSecret = process.env.AUTH_JWT_SECRET;

if (!jwtSecret) {
  throw new Error("AUTH_JWT_SECRET must be configured before starting the API");
}

app.use(express.json({ limit: "1mb" }));
app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  next();
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readRequiredString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const firstQueryValue = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
};

const encodeJson = (value: object): string =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const signTokenPart = (value: string): string =>
  createHmac("sha256", jwtSecret).update(value).digest("base64url");

const createAccessToken = (id: string, email: string): string => {
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const payload = encodeJson({
    sub: id,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  });
  const signedPart = `${header}.${payload}`;
  return `${signedPart}.${signTokenPart(signedPart)}`;
};

const verifyAccessToken = (token: string): JwtPayload | null => {
  const [header, payload, signature, ...rest] = token.split(".");
  if (!header || !payload || !signature || rest.length > 0) return null;

  const expectedSignature = signTokenPart(`${header}.${payload}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const decoded: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      !isRecord(decoded) ||
      typeof decoded.sub !== "string" ||
      typeof decoded.email !== "string" ||
      typeof decoded.exp !== "number" ||
      decoded.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { sub: decoded.sub, email: decoded.email, exp: decoded.exp };
  } catch {
    return null;
  }
};

const requireAuthentication = (request: Request, response: Response): JwtPayload | null => {
  const authorization = request.header("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;
  const payload = token ? verifyAccessToken(token) : null;

  if (!payload) {
    response.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return payload;
};

const toAuthResponse = (admin: {
  id: string;
  name: string | null;
  email: string | null;
}): AuthResponse => {
  if (!admin.email) throw new Error("Admin account is missing an email");
  return {
    token: createAccessToken(admin.id, admin.email),
    user: { id: admin.id, name: admin.name, email: admin.email },
  };
};

const normalizeImagePath = (value: unknown, fallback: string): string => {
  const rawPath = readRequiredString(value);
  if (!rawPath) return fallback;
  if (/^https?:\/\//i.test(rawPath)) return rawPath;

  const normalized = rawPath.replace(/\\/g, "/").replace(/^\/?public\//i, "");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

const parseNewsInput = (body: unknown): NewsInput | null => {
  if (!isRecord(body)) return null;
  const title = readRequiredString(body.title);
  const shortDescription = readRequiredString(body.shortDescription);
  const longDescription = readRequiredString(body.longDescription);
  if (!title || !shortDescription || !longDescription) return null;

  const duration = typeof body.duration === "number" && Number.isFinite(body.duration)
    ? Math.max(1, Math.trunc(body.duration))
    : 5;
  const logo = normalizeImagePath(body.logo, "/images/logo-czarne.svg");
  const mainImage = normalizeImagePath(body.mainImage, "/images/placeholder.jpg");
  const content = Array.isArray(body.content)
    ? body.content
        .filter(isRecord)
        .map((item) => readRequiredString(item.text))
        .filter((text): text is string => text !== null)
        .map((text) => ({ text }))
    : [];

  return { title, shortDescription, longDescription, duration, logo, mainImage, content };
};

const readOptionalString = (value: unknown, maxLength = 2000): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
};

const readEmail = (value: unknown): string | null => {
  const email = readOptionalString(value, 254)?.toLowerCase() ?? null;
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
};

const parseRecruitmentApplication = (body: unknown): RecruitmentApplicationInput | null => {
  if (!isRecord(body) || body.consent !== true) return null;
  const sessionId = readRequiredString(body.sessionId);
  const primaryDirection = body.primaryDirection;
  const secondaryDirection = body.secondaryDirection;
  const weeklyHours = body.weeklyHours;
  const motivation = readOptionalString(body.motivation, 4000);
  const projectExperience = readOptionalString(body.projectExperience, 6000);
  const learningGoals = readOptionalString(body.learningGoals, 4000);
  if (
    !sessionId ||
    !/^[A-Za-z0-9_-]{8,128}$/.test(sessionId) ||
    !isRecruitmentDirection(primaryDirection) ||
    (secondaryDirection !== null && secondaryDirection !== undefined && !isRecruitmentDirection(secondaryDirection)) ||
    typeof weeklyHours !== "number" ||
    !Number.isInteger(weeklyHours) ||
    weeklyHours < 24 ||
    weeklyHours > 168 ||
    !motivation ||
    !projectExperience ||
    !learningGoals ||
    !Array.isArray(body.answers)
  ) {
    return null;
  }

  const answers = body.answers.map((value): RecruitmentAnswerInput | null => {
    if (!isRecord(value)) return null;
    const questionCode = readOptionalString(value.questionCode, 100);
    const answer = readOptionalString(value.answer, 4000);
    return questionCode && answer ? { questionCode, answer } : null;
  });
  if (answers.some((answer) => answer === null)) return null;
  const validAnswers = answers.filter((answer): answer is RecruitmentAnswerInput => answer !== null);
  if (new Set(validAnswers.map((answer) => answer.questionCode)).size !== validAnswers.length) return null;

  return {
    sessionId,
    name: readOptionalString(body.name, 100),
    email: readOptionalString(body.email, 254),
    phone: readOptionalString(body.phone, 50),
    primaryDirection,
    secondaryDirection: isRecruitmentDirection(secondaryDirection) ? secondaryDirection : null,
    weeklyHours,
    motivation,
    projectExperience,
    portfolioUrl: readOptionalString(body.portfolioUrl, 500),
    collaborationExperience: readOptionalString(body.collaborationExperience, 4000),
    learningGoals,
    answers: validAnswers,
  };
};

const getSearchTerm = (message: string): string =>
  message
    .replace(/[？?！!，,。\s]/g, "")
    .replace(/请问|介绍一下|项目介绍|团队有哪些|有哪些|项目|新闻|相关|情况|什么|怎么|如何|一下|吗/g, "")
    .trim();

const isProjectQuestion = (message: string): boolean =>
  /项目|系统|作品|团队/.test(message);

const isNewsQuestion = (message: string): boolean => /新闻|动态|资讯/.test(message);

const createProjectUrl = (projectName: string): string =>
  `/projects/${encodeURIComponent(projectName)}`;

const createNewsUrl = (newsId: string): string => `/news/${newsId}`;

app.get("/health", async (_request: Request, response: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok" });
  } catch {
    response.status(503).json({ status: "unavailable" });
  }
});

app.get("/api/recruitment/questions", async (request: Request, response: Response) => {
  const direction = firstQueryValue(request.query.direction);
  if (!isRecruitmentDirection(direction)) {
    response.status(400).json({ error: "A valid recruitment direction is required" });
    return;
  }
  const questions = await prisma.recruitmentQuestion.findMany({
    where: {
      isActive: true,
      OR: [{ direction: null }, { direction }],
    },
    orderBy: { sortOrder: "asc" },
    select: {
      code: true,
      direction: true,
      prompt: true,
      type: true,
      options: true,
      required: true,
    },
  });
  response.json(questions);
});

app.get("/api/recruitment/tasks", async (request: Request, response: Response) => {
  const direction = firstQueryValue(request.query.direction);
  if (!isRecruitmentDirection(direction)) {
    response.status(400).json({ error: "A valid recruitment direction is required" });
    return;
  }
  const task = await prisma.recruitmentTask.findFirst({
    where: { direction, isActive: true },
    orderBy: [{ version: "desc" }, { updatedAt: "desc" }],
    select: { id: true, direction: true, title: true, description: true, requirements: true, rubric: true, version: true },
  });
  if (!task) {
    response.status(404).json({ error: "No active task found for this direction" });
    return;
  }
  response.json(task);
});

app.post("/api/recruitment/applications", async (request: Request, response: Response) => {
  const input = parseRecruitmentApplication(request.body);
  if (!input) {
    response.status(400).json({ error: "Invalid application payload or consent is missing" });
    return;
  }

  const questions = await prisma.recruitmentQuestion.findMany({
    where: {
      isActive: true,
      OR: [{ direction: null }, { direction: input.primaryDirection }],
    },
    select: { id: true, code: true, required: true },
  });
  const questionByCode = new Map(questions.map((question) => [question.code, question]));
  const providedCodes = new Set(input.answers.map((answer) => answer.questionCode));
  const hasUnknownQuestion = input.answers.some((answer) => !questionByCode.has(answer.questionCode));
  const hasMissingRequiredAnswer = questions.some(
    (question) => question.required && !providedCodes.has(question.code)
  );
  if (hasUnknownQuestion || hasMissingRequiredAnswer) {
    response.status(400).json({ error: "Required recruitment answers are incomplete" });
    return;
  }

  const task = await prisma.recruitmentTask.findFirst({
    where: { direction: input.primaryDirection, isActive: true },
    orderBy: [{ version: "desc" }, { updatedAt: "desc" }],
    select: { id: true, title: true },
  });
  if (!task) {
    response.status(503).json({ error: "Recruitment task configuration is unavailable" });
    return;
  }

  const recommendation = getRecommendation(input.weeklyHours);
  const application = await prisma.recruitmentApplication.create({
    data: {
      ...input,
      consentAt: new Date(),
      status: "TASK_ASSIGNED",
      answers: {
        create: input.answers.map((answer) => ({
          questionId: questionByCode.get(answer.questionCode)?.id ?? "",
          answer: answer.answer,
        })),
      },
      assessment: {
        create: {
          suggestedDirection: input.primaryDirection,
          recommendation,
          strengths: [],
          gaps: [],
          suggestedTask: task.title,
          summary: `已完成${getDirectionLabel(input.primaryDirection)}方向的基础信息提交。请完成“${task.title}”后进入人工审核。`,
          model: null,
        },
      },
      taskSubmissions: { create: { taskId: task.id } },
    },
    select: {
      id: true,
      status: true,
      assessment: { select: { suggestedDirection: true, recommendation: true, suggestedTask: true, summary: true } },
    },
  });
  response.status(201).json(application);
});

app.post(
  "/api/agent/chat",
  async (
    request: Request<EmptyParams, AgentChatResponse, unknown>,
    response: Response<AgentChatResponse | { error: string }>
  ) => {
    if (!isRecord(request.body)) {
      response.status(400).json({ error: "Invalid request body" });
      return;
    }

    const message = readRequiredString(request.body.message);
    if (!message || message.length > 500) {
      response.status(400).json({ error: "message must contain 1 to 500 characters" });
      return;
    }

    let streamStarted = false;
    const writeEvent = (event: string, payload: object): void => {
      response.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);
    };

    try {
      response.status(200);
      response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      response.setHeader("Cache-Control", "no-cache, no-transform");
      response.setHeader("Connection", "keep-alive");
      response.flushHeaders();
      streamStarted = true;

      await streamAgentReply(
        {
          message,
          sessionId: request.body.sessionId,
          conversationId: request.body.conversationId,
        },
        {
          onReady: (metadata) => writeEvent("meta", metadata),
          onDelta: (content) => writeEvent("delta", { content }),
        }
      );
      writeEvent("done", {});
    } catch (error: unknown) {
      console.error("[AGENT_ERROR]", error);
      if (streamStarted) {
        writeEvent("error", { error: "AI service is temporarily unavailable" });
      } else {
        response.status(503).json({ error: "AI service is temporarily unavailable" });
      }
    } finally {
      response.end();
    }
    return;

    const legacyMessage = message ?? "";
    const searchTerm = getSearchTerm(legacyMessage);
    const projectSearch = searchTerm.length >= 2
      ? prisma.project.findMany({
          where: {
            OR: [
              { name: { contains: searchTerm } },
              { shortDescription: { contains: searchTerm } },
            ],
          },
          orderBy: { year: "desc" },
          take: 3,
        })
      : isProjectQuestion(legacyMessage)
        ? prisma.project.findMany({ orderBy: { year: "desc" }, take: 5 })
        : Promise.resolve([]);
    const newsSearch = searchTerm.length >= 2
      ? prisma.news.findMany({
          where: {
            OR: [
              { title: { contains: searchTerm } },
              { shortDescription: { contains: searchTerm } },
              { longDescription: { contains: searchTerm } },
            ],
          },
          orderBy: { date: "desc" },
          take: 3,
        })
      : isNewsQuestion(legacyMessage)
        ? prisma.news.findMany({ orderBy: { date: "desc" }, take: 3 })
        : Promise.resolve([]);

    const [projects, news] = await Promise.all([projectSearch, newsSearch]);
    const sources: AgentSource[] = [
      ...projects.map((project) => ({
        type: "project" as const,
        title: project.name,
        url: createProjectUrl(project.name),
      })),
      ...news.map((newsItem) => ({
        type: "news" as const,
        title: newsItem.title,
        url: createNewsUrl(newsItem.id),
      })),
    ];

    const projectAnswer = projects.length > 0
      ? `项目资料：\n${projects
          .map((project) => `- ${project.name}（${project.year}）：${project.shortDescription}`)
          .join("\n")}`
      : "";
    const newsAnswer = news.length > 0
      ? `新闻资料：\n${news
          .map((newsItem) => `- ${newsItem.title}：${newsItem.shortDescription}`)
          .join("\n")}`
      : "";
    const answer = [projectAnswer, newsAnswer].filter(Boolean).join("\n\n") ||
      "我暂时没有在官网的项目和新闻资料中找到直接相关的内容。你可以换一种更具体的说法，例如输入项目名称。";

    response.json({ answer, mode: "retrieval", sources });
  }
);

app.post("/api/recruitment/intents", async (request: Request, response: Response) => {
  if (!isRecord(request.body)) {
    response.status(400).json({ error: "Invalid request body" });
    return;
  }
  const email = readEmail(request.body.email);
  const sessionId = readRequiredString(request.body.sessionId);
  const conversationId = readRequiredString(request.body.conversationId);
  if (!email || !sessionId || !conversationId || !/^[A-Za-z0-9_-]{8,128}$/.test(sessionId)) {
    response.status(400).json({ error: "A valid email, sessionId, and conversationId are required" });
    return;
  }
  const conversation = await prisma.agentConversation.findFirst({
    where: { id: conversationId, sessionId },
    select: { id: true },
  });
  if (!conversation) {
    response.status(404).json({ error: "Conversation not found" });
    return;
  }
  const existingIntent = await prisma.recruitmentIntent.findUnique({ where: { conversationId } });
  if (existingIntent) {
    response.json({ id: existingIntent.id, status: existingIntent.status, alreadySubmitted: true });
    return;
  }
  const existingEmailIntent = await prisma.recruitmentIntent.findFirst({
    where: { email },
    select: { id: true },
  });
  if (existingEmailIntent) {
    response.status(409).json({ error: "该邮箱已提交过加入意向，请勿重复提交" });
    return;
  }
  try {
    const intent = await prisma.recruitmentIntent.create({
      data: { conversationId, email },
      select: { id: true, status: true },
    });
    response.status(201).json(intent);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      response.status(409).json({ error: "该邮箱已提交过加入意向，请勿重复提交" });
      return;
    }
    throw error;
  }
});

app.get(
  "/api/admin/recruitment-intents",
  async (request: Request<EmptyParams, unknown, unknown, RecruitmentIntentQuery>, response: Response) => {
  if (!requireAuthentication(request, response)) return;
    const pageValue = Number(firstQueryValue(request.query.page) ?? "1");
    const pageSizeValue = Number(firstQueryValue(request.query.pageSize) ?? "20");
    const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const pageSize = Number.isInteger(pageSizeValue) ? Math.min(Math.max(pageSizeValue, 1), 100) : 20;
    const status = firstQueryValue(request.query.status);
    const statusFilter: RecruitmentIntentStatus | undefined =
      status === "PENDING_REVIEW" || status === "ACCEPTED" ? status : undefined;
    const where = statusFilter ? { status: statusFilter } : {};
    const [total, intents] = await prisma.$transaction([
      prisma.recruitmentIntent.count({ where }),
      prisma.recruitmentIntent.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: { id: true, email: true, status: true, emailDeliveryStatus: true, createdAt: true },
      }),
    ]);
    response.json({ items: intents, page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) });
  }
);

app.get(
  "/api/admin/recruitment-intents/:intentId",
  async (request: Request<RecruitmentIntentParams>, response: Response) => {
    if (!requireAuthentication(request, response)) return;
    const intent = await prisma.recruitmentIntent.findUnique({
      where: { id: request.params.intentId },
      include: {
        conversation: {
          select: {
            messages: {
              orderBy: { createdAt: "asc" },
              select: { role: true, content: true, createdAt: true },
            },
          },
        },
      },
    });
    if (!intent) {
      response.status(404).json({ error: "Recruitment intent not found" });
      return;
    }
    response.json(intent);
  }
);

app.delete(
  "/api/admin/recruitment-intents/:intentId",
  async (request: Request<RecruitmentIntentParams>, response: Response) => {
    if (!requireAuthentication(request, response)) return;
    const intent = await prisma.recruitmentIntent.findUnique({
      where: { id: request.params.intentId },
      select: { id: true, conversationId: true },
    });
    if (!intent) {
      response.status(404).json({ error: "Recruitment intent not found" });
      return;
    }
    await prisma.$transaction([
      prisma.recruitmentIntent.delete({ where: { id: intent.id } }),
      prisma.agentConversation.delete({ where: { id: intent.conversationId } }),
    ]);
    response.status(204).end();
  }
);

app.post(
  "/api/admin/recruitment-intents/:intentId/accept",
  async (request: Request<RecruitmentIntentParams>, response: Response) => {
    const reviewer = requireAuthentication(request, response);
    if (!reviewer) return;
    if (!isMailConfigured()) {
      response.status(503).json({ error: getMailConfigurationError() });
      return;
    }
    const intent = await prisma.recruitmentIntent.findUnique({ where: { id: request.params.intentId } });
    if (!intent) {
      response.status(404).json({ error: "Recruitment intent not found" });
      return;
    }
    try {
      await sendJoinAcceptedEmail(intent.email);
      const delivered = await prisma.recruitmentIntent.update({
        where: { id: intent.id },
        data: {
          status: "ACCEPTED",
          reviewerId: reviewer.sub,
          reviewedAt: new Date(),
          emailDeliveryStatus: "SENT",
        },
        select: { id: true, status: true, emailDeliveryStatus: true },
      });
      response.json(delivered);
    } catch (error: unknown) {
      await prisma.recruitmentIntent.update({
        where: { id: intent.id },
        data: { emailDeliveryStatus: "FAILED" },
      });
      console.error("[RECRUITMENT_EMAIL_ERROR]", error);
      response.status(502).json({ error: "通知邮件发送失败，申请仍处于待审核状态；请检查邮件服务配置后重试。" });
    }
  }
);

app.post("/api/auth/login", async (request: Request<EmptyParams, unknown, unknown>, response: Response) => {
  if (!isRecord(request.body)) {
    response.status(400).json({ error: "Invalid request body" });
    return;
  }
  const email = readRequiredString(request.body.email)?.toLowerCase();
  const password = readRequiredString(request.body.password);
  if (!email || !password) {
    response.status(400).json({ error: "Email and password are required" });
    return;
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin?.hashedPassword || !(await bcrypt.compare(password, admin.hashedPassword))) {
    response.status(401).json({ error: "Invalid email or password" });
    return;
  }
  response.json(toAuthResponse(admin));
});

app.get("/api/auth/me", async (request: Request, response: Response) => {
  const payload = requireAuthentication(request, response);
  if (!payload) return;
  const admin = await prisma.admin.findUnique({
    where: { id: payload.sub },
    select: { id: true, name: true, email: true },
  });
  if (!admin) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }
  response.json({ user: admin });
});

app.post("/api/auth/register", async (request: Request<EmptyParams, unknown, unknown>, response: Response) => {
  if (!isRecord(request.body)) {
    response.status(400).json({ error: "Invalid request body" });
    return;
  }
  const email = readRequiredString(request.body.email)?.toLowerCase();
  const password = readRequiredString(request.body.password);
  const name = readRequiredString(request.body.name);
  if (!email || !password) {
    response.status(400).json({ error: "Email and password are required" });
    return;
  }

  const adminCount = await prisma.admin.count();
  if (adminCount > 0 && !requireAuthentication(request, response)) return;

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    response.status(409).json({ error: "Email already exists" });
    return;
  }

  const admin = await prisma.admin.create({
    data: { email, name, hashedPassword: await bcrypt.hash(password, 12) },
  });
  response.status(201).json(toAuthResponse(admin));
});

app.get("/api/projects", async (_request: Request, response: Response) => {
  const projects = await prisma.project.findMany({
    select: { name: true },
    orderBy: { year: "desc" },
  });
  response.json(projects.map((project: { name: string }) => project.name));
});

app.get("/api/projects/:name", async (request: Request<ProjectParams>, response: Response) => {
  const project = await prisma.project.findUnique({
    where: { name: request.params.name },
    include: { parts: true },
  });
  if (!project) {
    response.status(404).json({ error: "Project not found" });
    return;
  }
  const englishPath = project.englishPath ?? project.name;
  response.json({
    ...project,
    short_description: project.shortDescription,
    EN_short_description: project.enShortDescription,
    EN_name: project.enName,
    imagePath: `/images/projects/${englishPath}/${englishPath}.png`,
  });
});

app.get("/api/team", async (request: Request<EmptyParams, unknown, unknown, TeamQuery>, response: Response) => {
  const projectName = firstQueryValue(request.query.projectName);
  if (!projectName) {
    response.status(400).json({ error: "projectName is required" });
    return;
  }
  const teamMembers = await prisma.teamMember.findMany({
    where: { roles: { some: { projectName } } },
    select: {
      name: true, surname: true, email: true, phoneNumber: true,
      roles: { select: { department: true, role: true, projectName: true } },
    },
  });
  response.json(teamMembers);
});

app.get("/api/team/by-name", async (request: Request<EmptyParams, unknown, unknown, TeamMemberQuery>, response: Response) => {
  const name = firstQueryValue(request.query.name);
  const surname = firstQueryValue(request.query.surname);
  if (!name || !surname) {
    response.status(400).json({ error: "name and surname are required" });
    return;
  }
  const teamMembers = await prisma.teamMember.findMany({
    where: { name, surname },
    select: {
      name: true, surname: true, email: true, phoneNumber: true,
      roles: { select: { department: true, role: true, projectName: true } },
    },
  });
  response.json(teamMembers);
});

app.get("/api/news", async (_request: Request, response: Response) => {
  const news = await prisma.news.findMany({ orderBy: { date: "desc" }, include: { content: true } });
  response.json(news);
});

app.post("/api/news", async (request: Request<EmptyParams, unknown, unknown>, response: Response) => {
  if (!requireAuthentication(request, response)) return;
  const input = parseNewsInput(request.body);
  if (!input) {
    response.status(400).json({ error: "Invalid news payload" });
    return;
  }
  const news = await prisma.news.create({
    data: {
      title: input.title,
      shortDescription: input.shortDescription,
      longDescription: input.longDescription,
      duration: input.duration,
      logo: input.logo,
      mainImage: input.mainImage,
      content: { create: input.content },
    },
    include: { content: true },
  });
  response.status(201).json(news);
});

app.get("/api/news/:newsId", async (request: Request<NewsParams>, response: Response) => {
  const news = await prisma.news.findUnique({
    where: { id: request.params.newsId },
    include: { content: true },
  });
  if (!news) {
    response.status(404).json({ error: "News not found" });
    return;
  }
  response.json(news);
});

app.delete("/api/news/:newsId", async (request: Request<NewsParams>, response: Response) => {
  if (!requireAuthentication(request, response)) return;
  const existingNews = await prisma.news.findUnique({ where: { id: request.params.newsId } });
  if (!existingNews) {
    response.status(404).json({ error: "News not found" });
    return;
  }
  await prisma.$transaction([
    prisma.newsContent.deleteMany({ where: { newsId: request.params.newsId } }),
    prisma.news.delete({ where: { id: request.params.newsId } }),
  ]);
  response.status(204).end();
});

app.use((_request: Request, response: Response) => {
  response.status(404).json({ error: "Not found" });
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error("[API_ERROR]", error);
  response.status(500).json({ error: "Internal server error" });
});

const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

const shutdown = async (): Promise<void> => {
  server.close();
  await prisma.$disconnect();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
