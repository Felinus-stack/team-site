// 根据项目ID获取项目信息的操作
import prisma from "@/app/libs/prismadb";

export async function getProjectByProjectId(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      name: projectId,
    },
    select: {
      parts: true,
      year: true,
    },
  });

  return project;
}
