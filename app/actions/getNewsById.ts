// actions/getNewsById.ts
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
