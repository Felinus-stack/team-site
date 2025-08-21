#!/bin/bash

# Next.js 应用 Docker 部署脚本
# 适用于 MySQL 已在独立服务器部署的情况

set -e

echo "🚀 开始部署 Next.js 应用..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

echo "✅ Docker 已安装"

# 配置变量
APP_NAME="team-site-app"
IMAGE_NAME="team-site"
PORT="3000"

# 停止并删除现有应用容器
echo "🛑 停止现有应用容器..."
docker stop $APP_NAME 2>/dev/null || echo "应用容器未运行"
docker rm $APP_NAME 2>/dev/null || echo "应用容器不存在"

# 清理旧镜像（可选）
echo "🧹 清理旧镜像..."
docker rmi $IMAGE_NAME:latest 2>/dev/null || echo "旧镜像不存在"

# 构建应用镜像
echo "🔨 构建应用镜像..."
docker build -t $IMAGE_NAME:latest .

# 启动应用容器
echo "🚀 启动应用容器..."
docker run -d \
  --name $APP_NAME \
  -p $PORT:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="请在此处配置您的数据库连接字符串" \
  -e NEXTAUTH_SECRET="请配置您的NextAuth密钥" \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="请配置您的Google Maps API密钥" \
  --restart unless-stopped \
  $IMAGE_NAME:latest

# 等待应用启动
echo "⏳ 等待应用启动..."
sleep 10

# 检查容器状态
echo "✅ 检查容器状态..."
docker ps --filter "name=$APP_NAME"

# 检查应用是否正常运行
echo "🔍 检查应用健康状态..."
if curl -f http://localhost:$PORT >/dev/null 2>&1; then
    echo "✅ 应用运行正常"
else
    echo "⚠️  应用可能未正常启动，请检查日志: docker logs $APP_NAME"
fi

echo ""
echo "🎉 Next.js 应用部署完成！"
echo "📱 应用访问地址: http://localhost:$PORT"
echo ""
echo "📋 常用命令:"
echo "  查看应用日志: docker logs -f $APP_NAME"
echo "  停止应用: docker stop $APP_NAME"
echo "  重启应用: docker restart $APP_NAME"
echo "  进入应用容器: docker exec -it $APP_NAME sh"
echo "  清理应用: docker stop $APP_NAME && docker rm $APP_NAME"
echo ""
echo "⚠️  注意事项:"
echo "  1. 请确保在启动前配置正确的环境变量"
echo "  2. 请确保 MySQL 服务器可以从容器访问"
echo "  3. 如需修改端口，请更新脚本中的 PORT 变量"