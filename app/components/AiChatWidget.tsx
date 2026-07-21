"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HiOutlineSparkles, HiXMark } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { publicApiBaseUrl } from "@/app/libs/public-api";

type AgentSource = {
  type: "project" | "news";
  title: string;
  url: string;
};

type AgentStreamMetadata = {
  conversationId: string;
  sources: AgentSource[];
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
  sources?: AgentSource[];
};

type StreamCallbacks = {
  onMeta: (metadata: AgentStreamMetadata) => void;
  onDelta: (content: string) => void;
};

const agentSessionStorageKey = "team-site-agent-session";
const shouldShowSources = false;

const getAgentSessionId = (): string => {
  const existing = window.localStorage.getItem(agentSessionStorageKey);
  if (existing) return existing;

  const sessionId = window.crypto.randomUUID().replace(/-/g, "");
  window.localStorage.setItem(agentSessionStorageKey, sessionId);
  return sessionId;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStreamMetadata = (value: unknown): value is AgentStreamMetadata =>
  isRecord(value) &&
  typeof value.conversationId === "string" &&
  Array.isArray(value.sources);

const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const readAgentStream = async (response: Response, callbacks: StreamCallbacks): Promise<void> => {
  if (!response.ok || !response.body) {
    throw new Error("The AI stream could not be opened");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let streamError: string | null = null;

  const processEvents = (): void => {
    buffer = buffer.replace(/\r\n/g, "\n");
    let boundary = buffer.indexOf("\n\n");
    while (boundary >= 0) {
      const event = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      boundary = buffer.indexOf("\n\n");

      const eventName = event
        .split("\n")
        .find((line) => line.startsWith("event:"))
        ?.slice("event:".length)
        .trim();
      const data = event
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice("data:".length).trimStart())
        .join("\n");
      if (!eventName || !data) continue;

      try {
        const payload: unknown = JSON.parse(data);
        if (eventName === "meta" && isStreamMetadata(payload)) {
          callbacks.onMeta(payload);
        }
        if (eventName === "delta" && isRecord(payload) && typeof payload.content === "string") {
          callbacks.onDelta(payload.content);
        }
        if (eventName === "error" && isRecord(payload) && typeof payload.error === "string") {
          streamError = payload.error;
        }
      } catch {
        streamError = "AI stream returned invalid data";
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    processEvents();
    if (done) break;
  }
  buffer += decoder.decode();
  processEvents();
  if (streamError) throw new Error(streamError);
};

const initialMessage: ChatMessage = {
  id: 1,
  role: "assistant",
  content: "你好！我是源境团队 AI 助手。你可以问我项目、团队、新闻或合作相关的问题。",
};

const recruitmentOpeningQuestion = "我想通过对话了解自己是否适合加入源境团队，请开始向我提问。";

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isAwaitingRecruitmentEmail, setIsAwaitingRecruitmentEmail] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasStartedRecruitmentRef = useRef(false);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  }, [isTyping, isStreaming, messages]);

  useEffect(() => {
    if (isTyping || !isOpen) return;
    const frameId = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, isTyping]);

  const addAssistantError = (content: string): void => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now() + 1, role: "assistant", content },
    ]);
  };

  const submitRecruitmentEmail = async (email: string): Promise<void> => {
    if (!isEmail(email)) {
      addAssistantError("请只输入一个有效的常用邮箱，例如 name@example.com。");
      return;
    }
    if (!conversationId) {
      addAssistantError("当前对话尚未建立完成，请稍后再提交邮箱。");
      return;
    }
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content: email },
    ]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/recruitment/intents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sessionId: getAgentSessionId(), conversationId }),
      });
      if (!response.ok) throw new Error("Unable to submit recruitment intent");
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "已收到你的加入意向与邮箱。团队管理员会人工查看本次对话；如审核同意，将通过该邮箱联系你。",
        },
      ]);
      setIsAwaitingRecruitmentEmail(false);
    } catch {
      addAssistantError("邮箱提交失败，请稍后重试。");
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const submitQuestion = async (question: string): Promise<void> => {
    const content = question.trim();
    if (!content || isTyping) return;
    if (isAwaitingRecruitmentEmail) {
      await submitRecruitmentEmail(content);
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content },
    ]);
    setInput("");
    setIsTyping(true);

    let assistantMessageId: number | null = null;
    let assistantAnswer = "";
    let sources: AgentSource[] = [];
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/agent/chat`, {
        method: "POST",
        headers: { Accept: "text/event-stream", "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          sessionId: getAgentSessionId(),
          conversationId,
        }),
      });
      await readAgentStream(response, {
        onMeta: (metadata) => {
          sources = metadata.sources;
          setConversationId(metadata.conversationId);
        },
        onDelta: (delta) => {
          assistantAnswer += delta;
          if (assistantMessageId === null) {
            assistantMessageId = Date.now() + 1;
            setIsStreaming(true);
            setMessages((currentMessages) => [
              ...currentMessages,
              { id: assistantMessageId as number, role: "assistant", content: delta },
            ]);
            return;
          }
          setMessages((currentMessages) => currentMessages.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: `${message.content}${delta}` }
              : message
          ));
        },
      });

      if (assistantMessageId === null) {
        throw new Error("The AI service returned an empty answer");
      }
      setMessages((currentMessages) => currentMessages.map((message) =>
        message.id === assistantMessageId ? { ...message, sources } : message
      ));
      if (assistantAnswer.includes("[[COLLECT_EMAIL]]")) {
        setMessages((currentMessages) => currentMessages.map((message) =>
          message.id === assistantMessageId
            ? { ...message, content: message.content.replace(/\s*\[\[COLLECT_EMAIL\]\]\s*/g, "") }
            : message
        ));
        setIsAwaitingRecruitmentEmail(true);
      }
    } catch {
      addAssistantError("AI 服务暂时不可用，请稍后再试。");
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    const shouldStartRecruitment = new URLSearchParams(window.location.search).get("assistant") === "recruitment";
    if (!shouldStartRecruitment || hasStartedRecruitmentRef.current) return;
    hasStartedRecruitmentRef.current = true;
    setIsOpen(true);
    void submitQuestion(recruitmentOpeningQuestion);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <section
        aria-hidden={!isOpen}
        className={`w-[calc(100vw-2.5rem)] max-w-[380px] overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 text-white shadow-2xl shadow-black/40 transition-all duration-300 sm:w-[380px] ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-red-600 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <HiOutlineSparkles size={22} />
            </div>
            <div>
              <p className="font-semibold">源境团队 AI 助手</p>
              <p className="text-xs text-white/80">基于官网知识库回答</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="关闭 AI 聊天窗口"
            className="rounded-full p-2 transition hover:bg-white/15"
          >
            <HiXMark size={22} />
          </button>
        </div>

        <div
          ref={messageListRef}
          aria-live="polite"
          className="custom-scrollbar flex h-[380px] flex-col gap-3 overflow-y-auto bg-neutral-950 px-4 py-5"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "rounded-br-md bg-red-600 text-white"
                    : "rounded-bl-md bg-white/10 text-neutral-100"
                }`}
              >
                {message.content}
                {shouldShowSources && message.role === "assistant" && message.sources && message.sources.length > 0 && (
                  <div className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-2 text-xs text-neutral-300">
                    <span className="text-neutral-400">官网来源</span>
                    {message.sources.map((source) => (
                      <a
                        key={`${source.type}-${source.url}`}
                        href={source.url}
                        className="text-red-300 underline-offset-2 hover:text-red-200 hover:underline"
                      >
                        {source.type === "project" ? "项目：" : "新闻："}{source.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && !isStreaming && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-neutral-300">
                正在检索并组织回答…
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-neutral-900 px-4 py-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isTyping}
              placeholder="输入你的问题…"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-red-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="发送消息"
              className="rounded-xl bg-red-600 p-2.5 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IoSend size={18} />
            </button>
          </form>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "最小化 AI 聊天窗口" : "打开 AI 聊天窗口"}
        className={`group flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-xl shadow-red-900/30 transition duration-300 hover:scale-105 hover:shadow-red-700/40 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        {isOpen ? <HiXMark size={30} /> : <RiRobot2Line size={30} className="transition group-hover:scale-110" />}
      </button>
    </div>
  );
};

export default AiChatWidget;
