import prisma from "@/app/libs/prismadb";

export async function fetchFiveNews() {
  try {
    const news = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        enTitle: true,
        shortDescription: true,
        enShortDescription: true,
        longDescription: true,
        enLongDescription: true,
        duration: true,
        logo: true,
        mainImage: true,
        date: true,
      },
      orderBy: [
        {
          date: "desc",
        },
      ],
      take: 3,
    });
    return news;
  } catch {
    return [];
  }
}
