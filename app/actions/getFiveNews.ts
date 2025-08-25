import prisma from "@/app/libs/prismadb";

export async function fetchFiveNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // 按日期降序排列，最新的新闻在顶部
      },
    ],
    take: 3, // 只获取最新的3条新闻
  });
  return news;
}
