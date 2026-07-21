# 源境团队官网

一个包含项目展示、新闻管理、管理员后台和 AI 官网助手的多语言网站。

## 技术栈

- 前端：Next.js 14、React、TypeScript、Tailwind CSS
- API：Express、TypeScript
- 关系数据库：MySQL、Prisma
- 管理员认证：bcrypt + JWT
- AI 知识库：Ollama（Embedding）+ Qdrant（向量检索）
- 对话模型：兼容 OpenAI Chat Completions API 的云端模型

## 目录说明

```text
app/                 Next.js 前端与页面
server/src/          Express API、AI 与后台逻辑
prisma/              Prisma Schema、初始化脚本
public/images/       前台静态图片
docker-compose.ai.yml  Qdrant 与 Ollama 容器
```

## 环境要求

- Node.js 20+
- pnpm
- MySQL 8+
- Docker Desktop（仅 AI 知识库功能需要）

## 首次安装

```powershell
pnpm install
Copy-Item .env.example .env
```

编辑 `.env`，至少配置：

```dotenv
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/team_site"
AUTH_JWT_SECRET="请替换为随机的长字符串"

API_PORT=4000
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
FRONTEND_ORIGIN="http://localhost:3000"

LLM_API_BASE_URL="https://你的模型服务地址/v1"
LLM_API_KEY="你的模型密钥"
LLM_MODEL="你的模型名称"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="请设置强密码"
```

不要将 `.env`、模型密钥、数据库密码或 SMTP 授权码提交到 Git。

## 数据库与管理员

创建数据库 `team_site` 后执行：

```powershell
pnpm exec prisma db push
pnpm seed:admin
```

`pnpm seed:admin` 会读取 `ADMIN_EMAIL` 与 `ADMIN_PASSWORD` 创建第一个管理员。已有管理员时不会覆盖其密码。

管理员注册接口仅用于首次初始化：数据库已有管理员后，未登录用户不能继续注册管理员。正常使用时请直接登录。

## 启动开发环境

前端和 API 是两个独立服务，需要分别启动。

```powershell
# 终端 1：Express API，端口 4000
pnpm run server:dev

# 终端 2：Next.js 前端，端口 3000
pnpm dev
```

访问：

- 网站：<http://localhost:3000>
- API 健康检查：<http://localhost:4000/health>
- 管理员登录后：`/ch/admin/addNews`
- 加入意向后台：`/ch/admin/recruitment`

> `server:dev` 会先编译再启动，并不监听后端文件变化。修改 `server/src/` 后，需要在后端终端按 `Ctrl + C`，再重新运行 `pnpm run server:dev`。

## 新闻管理与图片路径

新闻管理页的 `Logo 路径` 和 `主图片路径` 都是浏览器访问路径，不是 Windows 文件路径。

若图片实际位于：

```text
public/images/news/news14.png
```

后台应填写：

```text
/images/news/news14.png
```

不要填写：

```text
public/images/news/news14.png
E:\\learningMaterials\\team\\team-site\\public\\images\\news\\news14.png
```

建议：

- 主图使用横图，如 1200×675 或 1600×900。
- Logo 使用 PNG 或 SVG，推荐约 2:1 比例。
- 文件名与扩展名必须完全一致；部署到 Linux 时大小写也必须一致。
- 后端会把常见的 `public/images/...` 写法自动修正为 `/images/...`，但仍建议直接填写正确格式。
- 外部图片仅配置了 `https://storage.googleapis.com`；其他图床要先在 `next.config.js` 的 `images.remotePatterns` 中允许。

## AI 官网助手

AI 回答流程：

```text
用户问题 → Ollama 生成向量 → Qdrant 检索项目/新闻资料 → 云端模型流式回答
```

启动本地 AI 依赖：

```powershell
docker compose -f docker-compose.ai.yml up -d
docker exec team-site-ollama ollama pull nomic-embed-text
```

资料变更后同步知识库：

```powershell
pnpm run knowledge:sync
```

检查容器：

```powershell
docker compose -f docker-compose.ai.yml ps
```

若不启动 Ollama 与 Qdrant，普通网站仍可使用，但 AI 聊天无法完成知识库检索。

## AI 招新与加入意向

网站右下角的同一个 AI 助手同时支持官网咨询与招新咨询：

1. 用户提出“是否适合加入团队”等意图；
2. AI 逐轮了解方向、项目经历、协作、目标和每周投入时间；
3. 信息足够后仅请求常用邮箱；
4. 用户提交邮箱后，系统保存加入意向及对应对话；
5. 管理员在 `/ch/admin/recruitment` 分页查看、筛选和按需打开对话详情。

管理员点击“同意加入”后，系统会通过 SMTP 向该用户发送“源境团队加入意向审核结果”邮件；邮件发送成功后才会将状态更新为已同意。请先在 `.env` 配置 `SMTP_HOST`、`SMTP_PORT`、`SMTP_USER`、`SMTP_PASS` 和 `MAIL_FROM`。其中 `SMTP_PASS` 应使用邮箱服务商提供的授权码，不应使用网页登录密码。

## 常用命令

```powershell
pnpm dev                 # 前端开发服务
pnpm run server:dev      # 编译并启动 API
pnpm run server:build    # 仅编译 API
pnpm run server:start    # 启动已编译 API
pnpm exec prisma db push # 同步 Prisma Schema 到 MySQL
pnpm seed:admin          # 创建首个管理员
pnpm run knowledge:sync  # 同步项目与新闻到 Qdrant
pnpm run recruitment:seed # 初始化历史招新题库/任务数据
pnpm build               # 构建前端生产版本
```

## 常见故障

### 图片报 `Failed to parse src`

图片路径缺少开头的 `/`，或写入了 `public/`。

- 错误：`public/images/news/news14.jpg`
- 正确：`/images/news/news14.jpg`

确认实际文件扩展名也正确，例如文件是 `.png` 时路径必须以 `.png` 结尾。

### 后台“无法加载加入意向”

通常是 API 仍在运行旧代码。停止后端后重新执行：

```powershell
pnpm run server:dev
```

然后浏览器按 `Ctrl + F5`。

### 后台按钮无法点击

管理员页面不应显示右侧“媒体/招新”悬浮侧栏。刷新前端后，侧栏会在 `/admin` 路由自动隐藏；若仍显示，请重启 `pnpm dev` 并强制刷新浏览器。

### AI 提示服务不可用

依次检查：

1. API 是否运行在 4000 端口；
2. Docker Desktop 是否启动；
3. `ollama` 和 `qdrant` 容器是否为 Up；
4. `nomic-embed-text` 是否已下载；
5. `.env` 中的 `LLM_API_BASE_URL`、`LLM_API_KEY`、`LLM_MODEL` 是否正确；
6. 项目或新闻变更后是否执行了 `pnpm run knowledge:sync`。

## 生产部署

生产环境需要分别部署：

- Next.js 前端；
- Express API；
- MySQL；
- Qdrant 与 Ollama（启用 AI 检索时）；
- 兼容 OpenAI 协议的模型服务。

生产环境必须使用独立、强随机的 `AUTH_JWT_SECRET`，并将所有真实凭据保存在部署平台的环境变量中。
