import { getPublicApiData } from "@/app/libs/public-api";

export async function getTeamByProject(projectName: string) {
  try {
    return await getPublicApiData<any[]>(
      `/api/team?projectName=${encodeURIComponent(projectName)}`
    );
  } catch {
    return [];
  }
}
