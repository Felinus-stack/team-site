import prisma from "@/app/libs/prismadb";

export const getProjects = async () => {
  const projects = await prisma.project.findMany({
    select: {
      name: true,
    },
  });

  return projects.map(project => project.name);
};