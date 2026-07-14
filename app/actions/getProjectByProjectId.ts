// 根据项目ID获取项目信息的操作
import { getPublicApiData } from "@/app/libs/public-api";

export async function getProjectByProjectId(projectId: string) {
  return getPublicApiData(`/api/projects/${encodeURIComponent(projectId)}`);
}
