#!/bin/bash

# Next.js 应用 Docker 部署脚本
# 适用于云效部署流程和 MySQL 已在独立服务器部署的情况

set -e

# 配置变量
APP_NAME="team-site-app"
IMAGE_NAME="team-site"
PORT="3000"

# 函数：停止并删除现有容器
stop_container() {
    echo "🛑 停止现有应用容器..."
    docker stop $APP_NAME 2>/dev/null || echo "应用容器未运行"
    docker rm $APP_NAME 2>/dev/null || echo "应用容器不存在"
}

# 函数：构建镜像
build_image() {
    echo "🔨 构建应用镜像..."
    # 清理旧镜像（可选）
    docker rmi $IMAGE_NAME:latest 2>/dev/null || echo "旧镜像不存在，开始构建新镜像"
    docker build -t $IMAGE_NAME:latest .
}

# 函数：启动容器
start_container() {
    echo "🚀 启动应用容器..."
    docker run -d \
      --name $APP_NAME \
      -p $PORT:3000 \
      -e NODE_ENV=production \
      -e DATABASE_URL="mysql://yuanjing:eH5BkCs87SsGn5zb@rm-m5ekp21no5z88rl1rgo.mysql.rds.aliyuncs.com:3306/teamsite" \
      -e NEXTAUTH_SECRET="yuanjing" \
      -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyCgw2HEy6L1MKSuteQq4u8UF-OFSnW0QsA" \
      -e VERCEL="" \
      --restart unless-stopped \
      $IMAGE_NAME:latest
}

# 函数：检查应用状态
check_status() {
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
}

# 主逻辑：根据参数执行不同操作
case "${1:-deploy}" in
    "restart")
        echo "🔄 重启 Next.js 应用..."
        # 检查 Docker 是否安装
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker 未安装，请先安装 Docker"
            exit 1
        fi
        echo "✅ Docker 已安装"
        
        stop_container
        build_image
        start_container
        check_status
        ;;
    "deploy")
        echo "🚀 开始部署 Next.js 应用..."
        # 检查 Docker 是否安装
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker 未安装，请先安装 Docker"
            exit 1
        fi
        echo "✅ Docker 已安装"
        
        stop_container
        build_image
        start_container
        check_status
        ;;
    "stop")
        echo "🛑 停止 Next.js 应用..."
        stop_container
        ;;
    "start")
        echo "▶️  启动 Next.js 应用..."
        start_container
        check_status
        ;;
    *)
        echo "❌ 未知参数: $1"
        echo "用法: $0 [deploy|restart|start|stop]"
        echo "  deploy  - 完整部署（默认）"
        echo "  restart - 重启应用"
        echo "  start   - 启动应用"
        echo "  stop    - 停止应用"
        exit 1
        ;;
esac

echo ""
echo "🎉 Next.js 应用操作完成！"
echo "📱 应用访问地址: http://localhost:$PORT"
echo ""
echo "📋 常用命令:"
echo "  查看应用日志: docker logs -f $APP_NAME"
echo "  停止应用: $0 stop"
echo "  重启应用: $0 restart"
echo "  进入应用容器: docker exec -it $APP_NAME sh"
echo "  清理应用: docker stop $APP_NAME && docker rm $APP_NAME"
echo ""
echo "⚠️  注意事项:"
echo "  1. 环境变量已通过 .env 文件自动配置"
echo "  2. 请确保 MySQL 服务器可以从容器访问"
echo "  3. 如需修改端口，请更新脚本中的 PORT 变量"