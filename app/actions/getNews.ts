import prisma from "@/app/libs/prismadb";

export async function fetchNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // Sortuje wyniki malejąco, więc najnowsze newsy będą na górze
      },
    ],
  });
  return news;
}
