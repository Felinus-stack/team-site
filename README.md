# 团队网站项目

这是一个基于 [Next.js](https://nextjs.org/) 的项目，使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 创建。

## 开始使用

首先，启动开发服务器：

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
# 或者
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

您可以通过修改 `app/page.tsx` 文件来编辑页面。文件保存后页面会自动更新。

本项目使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 来自动优化和加载 Inter 字体（Google 自定义字体）。

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

您可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js/) - 欢迎您的反馈和贡献！

## 部署

### 使用 Vercel 部署

部署 Next.js 应用最简单的方法是使用 Next.js 创建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/deployment) 了解更多详情。

### 使用 Docker 部署

本项目提供了 Docker 部署支持：

```bash
# 构建镜像
docker build -t team-site .

# 运行容器
docker run -p 3000:3000 team-site
```

或者使用提供的部署脚本：

```bash
# 使用 Docker 部署
./deploy-nextjs.sh

# 传统部署方式
./deploy.sh
```

## 项目特性

- 🌐 多语言支持（中文/英文）
- 📱 响应式设计
- 🎨 现代化 UI 界面
- 🔐 用户认证系统
- 📰 新闻管理系统
- 👥 团队成员展示
- 🤝 合作伙伴展示
- 📍 联系方式和地图集成

## 技术栈

- **前端框架**: Next.js 14
- **样式**: Tailwind CSS
- **数据库**: MySQL + Prisma ORM
- **认证**: NextAuth.js
- **部署**: Docker + Vercel
- **语言**: TypeScript
