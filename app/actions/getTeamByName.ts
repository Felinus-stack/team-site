import prisma from "@/app/libs/prismadb";

export async function getTeamByFullName(name: string, surname: string) {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        name,
        surname,
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
