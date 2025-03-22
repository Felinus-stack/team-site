import prisma from "@/app/libs/prismadb";

export async function fetchFiveNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // Sortuje wyniki malejąco, więc najnowsze newsy będą na górze
      },
    ],
    take: 3, // Pobiera tylko 5 najnowszych wiadomości
  });
  return news;
}
