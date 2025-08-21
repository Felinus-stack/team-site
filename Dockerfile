# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package.json ./

# 安装所有依赖（Next.js 需要完整依赖来启动）
RUN npm install

# 复制环境变量文件
COPY .env ./

# 复制已构建的项目文件
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]