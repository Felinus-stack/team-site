import {
  type RecruitmentDirection,
  type RecruitmentQuestionType,
  type RecruitmentRecommendation,
} from "@prisma/client";
import { prisma } from "./prisma";

export const recruitmentDirections = [
  "FRONTEND",
  "BACKEND",
  "ROBOTICS",
  "AI_FULL_STACK",
] as const;

export type RecruitmentDirectionValue = (typeof recruitmentDirections)[number];

type QuestionDefinition = {
  code: string;
  direction: RecruitmentDirection | null;
  prompt: string;
  type: RecruitmentQuestionType;
  options?: string[];
  required: boolean;
  sortOrder: number;
};

type TaskDefinition = {
  direction: RecruitmentDirection;
  title: string;
  description: string;
  requirements: string[];
  rubric: Record<string, number>;
};

const questions: QuestionDefinition[] = [
  { code: "available_hours", direction: null, prompt: "请确认你每周可以稳定投入至少 24 小时，并说明可投入的时间段。", type: "TEXT", required: true, sortOrder: 10 },
  { code: "motivation", direction: null, prompt: "你为什么想加入源境团队？", type: "TEXT", required: true, sortOrder: 20 },
  { code: "project_experience", direction: null, prompt: "请说明你做过的项目、课程作业或练习，以及你具体负责的部分。", type: "TEXT", required: true, sortOrder: 30 },
  { code: "portfolio", direction: null, prompt: "请填写 GitHub、Gitee、作品集或演示链接；没有可留空。", type: "URL", required: false, sortOrder: 40 },
  { code: "collaboration", direction: null, prompt: "请描述一次团队协作经历，以及你使用过的协作工具。", type: "TEXT", required: true, sortOrder: 50 },
  { code: "learning_goals", direction: null, prompt: "你希望在三个月内学习或完成什么成果？", type: "TEXT", required: true, sortOrder: 60 },
  { code: "frontend_stack", direction: "FRONTEND", prompt: "你使用过哪些前端技术，例如 HTML、CSS、JavaScript、React、Next.js 或 TypeScript？", type: "TEXT", required: true, sortOrder: 110 },
  { code: "frontend_responsive", direction: "FRONTEND", prompt: "请说明你如何处理手机端与电脑端的不同布局。", type: "TEXT", required: true, sortOrder: 120 },
  { code: "frontend_api", direction: "FRONTEND", prompt: "你会如何处理接口加载、失败和空数据状态？", type: "TEXT", required: true, sortOrder: 130 },
  { code: "backend_stack", direction: "BACKEND", prompt: "你使用过哪些后端语言、框架和数据库？", type: "TEXT", required: true, sortOrder: 210 },
  { code: "backend_api", direction: "BACKEND", prompt: "请举例说明你设计过的一个接口及其请求、返回内容。", type: "TEXT", required: true, sortOrder: 220 },
  { code: "backend_security", direction: "BACKEND", prompt: "你会如何处理密码、身份认证、非法参数和权限不足？", type: "TEXT", required: true, sortOrder: 230 },
  { code: "robotics_experience", direction: "ROBOTICS", prompt: "你接触过哪些开发板、传感器、执行器、仿真工具或机器人项目？", type: "TEXT", required: true, sortOrder: 310 },
  { code: "robotics_language", direction: "ROBOTICS", prompt: "请说明你使用 Python、C/C++、ROS 或 ROS2 的经验。", type: "TEXT", required: true, sortOrder: 320 },
  { code: "robotics_debug", direction: "ROBOTICS", prompt: "遇到硬件或仿真环境不工作时，你通常如何排查？", type: "TEXT", required: true, sortOrder: 330 },
  { code: "ai_stack", direction: "AI_FULL_STACK", prompt: "你是否调用过大模型 API，或接触过 RAG、Embedding、向量数据库？", type: "TEXT", required: true, sortOrder: 410 },
  { code: "ai_security", direction: "AI_FULL_STACK", prompt: "你会如何确保 API Key 不暴露在浏览器中，并让资料不足时的 AI 不编造答案？", type: "TEXT", required: true, sortOrder: 420 },
  { code: "ai_deployment", direction: "AI_FULL_STACK", prompt: "请说明你使用 Docker、Node.js、Python、Ollama、Qdrant 或 MySQL 的经验。", type: "TEXT", required: true, sortOrder: 430 },
];

const tasks: TaskDefinition[] = [
  {
    direction: "FRONTEND",
    title: "响应式官网页面与接口联调",
    description: "根据给定页面或设计稿完成一个响应式页面，并接入模拟或公开 API。",
    requirements: ["支持桌面端和移动端", "有加载、失败和空数据状态", "组件拆分合理", "提交代码仓库和说明文档"],
    rubric: { functionality: 35, responsiveUi: 25, codeQuality: 20, documentation: 10, collaboration: 10 },
  },
  {
    direction: "BACKEND",
    title: "项目管理 REST API",
    description: "实现一个带登录、分页和增删改查的项目或任务管理 API。",
    requirements: ["使用数据库保存数据", "完成参数校验和统一错误处理", "实现认证或权限校验", "提供接口文档"],
    rubric: { functionality: 35, databaseDesign: 25, validationSecurity: 20, documentation: 10, collaboration: 10 },
  },
  {
    direction: "ROBOTICS",
    title: "传感器采集或仿真控制任务",
    description: "完成传感器采集与展示，或在仿真环境实现简单避障、循迹等控制逻辑。",
    requirements: ["提交可运行代码", "说明硬件或仿真环境", "提供运行视频、截图或日志", "说明异常处理方式"],
    rubric: { functionality: 35, controlSafety: 25, codeQuality: 20, experimentRecord: 10, collaboration: 10 },
  },
  {
    direction: "AI_FULL_STACK",
    title: "带来源引用的文档问答应用",
    description: "实现一个小型文档问答应用，能够检索资料并在回答中显示来源。",
    requirements: ["模型密钥只保存在后端环境变量", "回答显示来源", "资料不足时明确说明", "提供 Docker 或本地运行说明"],
    rubric: { retrievalCitation: 30, fullStackIntegration: 25, securityConfiguration: 20, errorHandling: 15, documentation: 10 },
  },
];

export const isRecruitmentDirection = (value: unknown): value is RecruitmentDirectionValue =>
  typeof value === "string" && recruitmentDirections.includes(value as RecruitmentDirectionValue);

export const getDirectionLabel = (direction: RecruitmentDirectionValue): string => ({
  FRONTEND: "前端",
  BACKEND: "后端",
  ROBOTICS: "机器人",
  AI_FULL_STACK: "AI 全栈",
})[direction];

export const getRecommendation = (weeklyHours: number): RecruitmentRecommendation =>
  weeklyHours >= 24 ? "TASK_READY" : "PREPARE_FIRST";

export const seedRecruitmentCatalog = async (): Promise<void> => {
  for (const question of questions) {
    await prisma.recruitmentQuestion.upsert({
      where: { code: question.code },
      update: question,
      create: { ...question, options: question.options ?? undefined },
    });
  }
  for (const task of tasks) {
    const existing = await prisma.recruitmentTask.findFirst({
      where: { direction: task.direction, version: 1 },
      select: { id: true },
    });
    if (existing) {
      await prisma.recruitmentTask.update({ where: { id: existing.id }, data: task });
    } else {
      await prisma.recruitmentTask.create({ data: { ...task, version: 1 } });
    }
  }
};
