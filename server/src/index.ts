import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { prisma } from "./lib/prisma";

type ProjectParams = { name: string };
type NewsParams = { newsId: string };
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

const parseNewsInput = (body: unknown): NewsInput | null => {
  if (!isRecord(body)) return null;
  const title = readRequiredString(body.title);
  const shortDescription = readRequiredString(body.shortDescription);
  const longDescription = readRequiredString(body.longDescription);
  if (!title || !shortDescription || !longDescription) return null;

  const duration = typeof body.duration === "number" && Number.isFinite(body.duration)
    ? Math.max(1, Math.trunc(body.duration))
    : 5;
  const logo = readRequiredString(body.logo) ?? "/images/logo-czarne.svg";
  const mainImage = readRequiredString(body.mainImage) ?? "/images/placeholder.jpg";
  const content = Array.isArray(body.content)
    ? body.content
        .filter(isRecord)
        .map((item) => readRequiredString(item.text))
        .filter((text): text is string => text !== null)
        .map((text) => ({ text }))
    : [];

  return { title, shortDescription, longDescription, duration, logo, mainImage, content };
};

app.get("/health", async (_request: Request, response: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok" });
  } catch {
    response.status(503).json({ status: "unavailable" });
  }
});

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
