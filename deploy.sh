#!/bin/bash

# 部署脚本 - Team Site
# 使用方法: ./deploy.sh

set -e  # 遇到错误时退出

echo "🚀 开始部署 Team Site..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 停止现有服务
echo "🛑 停止现有服务..."
docker-compose down

# 清理旧的镜像（可选）
echo "🧹 清理旧的镜像..."
docker system prune -f

# 构建并启动服务
echo "🔨 构建并启动服务..."
docker-compose up --build -d

# 等待数据库启动
echo "⏳ 等待数据库启动..."
sleep 30

# 运行数据库迁移
echo "📊 运行数据库迁移..."
docker-compose exec app npx prisma db push

# 运行数据库种子（如果需要）
echo "🌱 运行数据库种子..."
docker-compose exec app npm run prisma:seed || echo "⚠️  种子脚本执行失败或不存在"

# 检查服务状态
echo "✅ 检查服务状态..."
docker-compose ps

echo "🎉 部署完成！"
echo "📱 应用访问地址: http://localhost:3000"
echo "🗄️  数据库访问地址: localhost:3306"
echo ""
echo "📋 常用命令:"
echo "  查看日志: docker-compose logs -f"
echo "  停止服务: docker-compose down"
echo "  重启服务: docker-compose restart"
echo "  进入应用容器: docker-compose exec app sh"
echo "  进入数据库: docker-compose exec db mysql -u team_user -p team_site"