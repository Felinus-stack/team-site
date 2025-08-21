#!/bin/bash

# Docker 部署脚本 - Team Site
# 使用方法: ./deploy-docker.sh

set -e  # 遇到错误时退出

echo "🚀 开始 Docker 部署 Team Site..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 配置变量
APP_NAME="team-site-app"
DB_NAME="team-site-db"
NETWORK_NAME="team-site-network"
DB_PASSWORD="rootpassword"
DB_USER="team_user"
DB_USER_PASSWORD="team_password"
DB_DATABASE="team_site"

# 停止并删除现有容器
echo "🛑 停止现有容器..."
docker stop $APP_NAME $DB_NAME 2>/dev/null || echo "容器未运行"
docker rm $APP_NAME $DB_NAME 2>/dev/null || echo "容器不存在"

# 删除现有网络
echo "🌐 清理网络..."
docker network rm $NETWORK_NAME 2>/dev/null || echo "网络不存在"

# 创建 Docker 网络
echo "🌐 创建 Docker 网络..."
docker network create $NETWORK_NAME

# 启动 MySQL 数据库容器
echo "🗄️  启动 MySQL 数据库..."
docker run -d \
  --name $DB_NAME \
  --network $NETWORK_NAME \
  -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD \
  -e MYSQL_DATABASE=$DB_DATABASE \
  -e MYSQL_USER=$DB_USER \
  -e MYSQL_PASSWORD=$DB_USER_PASSWORD \
  -p 3306:3306 \
  -v team-site-mysql-data:/var/lib/mysql \
  --restart unless-stopped \
  mysql:8.0

# 等待数据库启动
echo "⏳ 等待数据库启动..."
sleep 30

# 构建应用镜像
echo "🔨 构建应用镜像..."
docker build -t $APP_NAME .

# 启动应用容器
echo "🚀 启动应用容器..."
docker run -d \
  --name $APP_NAME \
  --network $NETWORK_NAME \
  -e NODE_ENV=production \
  -e DATABASE_URL="mysql://$DB_USER:$DB_USER_PASSWORD@$DB_NAME:3306/$DB_DATABASE" \
  -e NEXTAUTH_SECRET="your-nextauth-secret-here" \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key" \
  -p 3000:3000 \
  --restart unless-stopped \
  $APP_NAME

# 等待应用启动
echo "⏳ 等待应用启动..."
sleep 15

# 运行数据库迁移
echo "📊 运行数据库迁移..."
docker exec $APP_NAME npx prisma db push

# 检查容器状态
echo "✅ 检查容器状态..."
docker ps --filter "name=$APP_NAME" --filter "name=$DB_NAME"

# 检查应用是否正常运行
echo "🔍 检查应用健康状态..."
if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ 应用运行正常！"
else
    echo "⚠️  应用可能还在启动中，请稍后检查"
fi

echo "🎉 Docker 部署完成！"
echo "📱 应用访问地址: http://localhost:3000"
echo "🗄️  数据库访问地址: localhost:3306"
echo ""
echo "📋 常用命令:"
echo "  查看应用日志: docker logs -f $APP_NAME"
echo "  查看数据库日志: docker logs -f $DB_NAME"
echo "  停止服务: docker stop $APP_NAME $DB_NAME"
echo "  重启应用: docker restart $APP_NAME"
echo "  进入应用容器: docker exec -it $APP_NAME sh"
echo "  进入数据库: docker exec -it $DB_NAME mysql -u $DB_USER -p$DB_USER_PASSWORD $DB_DATABASE"
echo "  清理所有: docker stop $APP_NAME $DB_NAME && docker rm $APP_NAME $DB_NAME && docker network rm $NETWORK_NAME"