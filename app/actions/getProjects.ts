import prisma from "@/app/libs/prismadb";

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        name: true,
      },
    });
    return projects.map(project => project.name);
  } catch {
    return [];
  }
};
