import prisma from "@/app/libs/prismadb";

export async function getTeamByProject(projectName: string) {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        roles: {
          some: {
            projectName,
          },
        },
      },
      select: {
        name: true,
        surname: true,
        email: true,
        phoneNumber: true,
        roles: {
          select: {
            department: true,
            role: true,
            projectName: true,
          },
        },
      },
    });
    return teamMembers;
  } catch {
    return [];
  }
}
