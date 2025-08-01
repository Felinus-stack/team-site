import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function POST(request: NextRequest) {
  try {
    // 检查用户是否已认证
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      shortDescription,
      longDescription,
      duration,
      logo,
      mainImage,
      content
    } = body;

    // 验证必填字段
    if (!title || !shortDescription || !longDescription) {
      return NextResponse.json(
        { error: '标题、简短描述和详细描述为必填项' },
        { status: 400 }
      );
    }

    // 创建新闻
    const news = await prisma.news.create({
      data: {
        title,
        shortDescription,
        longDescription,
        duration: duration || 5,
        logo: logo || '/images/logo-czarne.svg',
        mainImage: mainImage || '/images/placeholder.jpg',
        content: {
          create: content?.map((item: { text: string }) => ({
            text: item.text
          })) || []
        }
      },
      include: {
        content: true
      }
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('创建新闻失败:', error);
    return NextResponse.json(
      { error: '创建新闻失败' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        content: true
      }
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('获取新闻失败:', error);
    return NextResponse.json(
      { error: '获取新闻失败' },
      { status: 500 }
    );
  }
}