# 环境变量检查清单

请确保您的 `.env` 文件包含以下所有环境变量：

## 必需的环境变量

```bash
# NextAuth.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# 数据库配置
DATABASE_URL="mysql://user:password@localhost:3306/database_name"

# Google OAuth 配置
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth 配置
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## 如何获取 OAuth 凭据

### Google OAuth:
1. 访问 https://console.cloud.google.com/
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端凭据
5. 设置重定向URI：`http://localhost:3000/api/auth/callback/google`

### GitHub OAuth:
1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 设置 Authorization callback URL：`http://localhost:3000/api/auth/callback/github`

## 验证配置

运行以下命令确保一切正常：
```bash
npm run dev
```

然后访问登录页面测试 Google 和 GitHub 登录功能。



