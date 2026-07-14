import { getPublicApiData } from "@/app/libs/public-api";
import type { NewsItem } from "@/app/libs/api-types";

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    return await getPublicApiData<NewsItem[]>("/api/news");
  } catch {
    return [];
  }
}
