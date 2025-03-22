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
      short_description: true,
      long_description: true,
      length_time: true,
      logo: true,
      main_image: true,
      content: true,
    },
  });

  return news;
}
