// 根据新闻ID获取新闻信息的操作
import prisma from "@/app/libs/prismadb";

export default async function getNewsById(newsId: string) {
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
    select: {
      date: true,
      title: true,
      shortDescription: true,
      longDescription: true,
      duration: true,
      logo: true,
      mainImage: true,
      content: true,
    },
  });

  return news;
}
