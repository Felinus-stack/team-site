# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package.json ./

# 只安装生产依赖（云效已完成构建，这里只需要运行时依赖）
RUN npm install --only=production && npm cache clean --force

# 复制已构建的项目文件（包括 .next 目录和 .env 文件）
COPY . .

# 创建非root用户以提高安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 更改文件所有权
RUN chown -R nextjs:nodejs /app
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 启动应用
CMD ["npm", "start"]