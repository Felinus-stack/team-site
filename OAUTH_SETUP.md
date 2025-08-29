# OAuth 登录配置指南

## 环境变量配置

请在项目根目录创建 `.env.local` 文件并添加以下环境变量：

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database
DATABASE_URL="mysql://user:password@localhost:3306/database_name"

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Google OAuth 应用设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端凭据：
   - 应用类型：Web 应用程序
   - 授权的重定向 URI：`http://localhost:3000/api/auth/callback/google`
   - 对于生产环境：`https://yourdomain.com/api/auth/callback/google`
5. 复制客户端ID和客户端密钥到环境变量

## GitHub OAuth 应用设置

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - Application name: 您的应用名称
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - 对于生产环境：`https://yourdomain.com/api/auth/callback/github`
4. 创建应用后，复制 Client ID 和 Client Secret 到环境变量

## 数据库迁移

配置完成后，运行以下命令更新数据库结构：

```bash
npx prisma db push
```

## 测试

完成配置后，启动开发服务器：

```bash
npm run dev
```

访问登录页面，测试 Google 和 GitHub 登录功能。

## 注意事项

- `NEXTAUTH_SECRET` 应该是一个随机字符串，可以使用 `openssl rand -base64 32` 生成
- 确保数据库连接字符串正确
- 在生产环境中，记得更新回调URL为您的实际域名


