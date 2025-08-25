import prisma from "@/app/libs/prismadb";

export async function fetchNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // 按日期降序排列，最新的新闻在顶部
      },
    ],
  });
  return news;
}
