# 使用 Debian 基础镜像以获得更好的 Prisma 兼容性
FROM node:18-slim

# 安装 Prisma 所需的依赖
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 prisma 目录（prisma generate 需要）
COPY package.json ./
COPY .next ./.next/
COPY public ./public/
COPY .env ./
COPY prisma ./prisma/

# 设置npm镜像源并只安装生产依赖（云效已完成构建，这里只需要运行时依赖）
RUN npm config set registry https://registry.npmmirror.com && \
    npm install --only=production && \
    npm cache clean --force

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