import { getPublicApiData } from "@/app/libs/public-api";

export const getProjects = async () => {
  try {
    return await getPublicApiData<string[]>("/api/projects");
  } catch {
    return [];
  }
};
