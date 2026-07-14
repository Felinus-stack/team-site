import { getPublicApiData } from "@/app/libs/public-api";
import type { NewsItem } from "@/app/libs/api-types";

export async function fetchFiveNews(): Promise<NewsItem[]> {
  try {
    const news = await getPublicApiData<NewsItem[]>("/api/news");
    return news.slice(0, 3);
  } catch {
    return [];
  }
}
