import { getPublicApiData } from "@/app/libs/public-api";

export async function getTeamByFullName(name: string, surname: string) {
  try {
    const searchParams = new URLSearchParams({ name, surname });
    return await getPublicApiData<any[]>(`/api/team/by-name?${searchParams}`);
  } catch {
    return [];
  }
}
