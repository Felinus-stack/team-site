// 根据新闻ID获取新闻信息的操作
import { getPublicApiData } from "@/app/libs/public-api";
import type { NewsItem } from "@/app/libs/api-types";

export default async function getNewsById(newsId: string): Promise<NewsItem | null> {
  try {
    return await getPublicApiData<NewsItem>(`/api/news/${encodeURIComponent(newsId)}`);
  } catch {
    return null;
  }
}
