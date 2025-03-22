import prisma from "@/app/libs/prismadb";

export async function getTeamByFullName(name: string, surname: string) {
  const teamMembers = await prisma.teamMember.findMany({
    where: {
      name: name,
      surname: surname,
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
          bolidName: true,
        },
      },
    },
  });

  return teamMembers;
}
