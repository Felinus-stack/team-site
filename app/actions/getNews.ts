import prisma from "@/app/libs/prismadb";

export async function fetchNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
    });
    return news;
  } catch {
    return [];
  }
}
