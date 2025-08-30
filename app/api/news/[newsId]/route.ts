import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// DELETE - 删除新闻
export async function DELETE(
  request: Request,
  { params }: { params: { newsId: string } }
) {
  try {
    // 检查用户是否已登录且为管理员
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new NextResponse("未授权", { status: 401 });
    }

    const { newsId } = params;

    if (!newsId) {
      return new NextResponse("新闻ID不能为空", { status: 400 });
    }

    // 检查新闻是否存在
    const existingNews = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!existingNews) {
      return new NextResponse("新闻不存在", { status: 404 });
    }

    // 先删除相关的新闻内容
    await prisma.newsContent.deleteMany({
      where: {
        newsId: newsId,
      },
    });

    // 删除新闻
    await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return new NextResponse("新闻删除成功", { status: 200 });
  } catch (error) {
    console.error("[NEWS_DELETE]", error);
    return new NextResponse("内部服务器错误", { status: 500 });
  }
}
