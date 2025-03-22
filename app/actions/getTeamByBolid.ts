import prisma from "@/app/libs/prismadb";

export async function getTeamByBolid(bolidName: string) {
  const teamMembers = await prisma.teamMember.findMany({
    where: {
      roles: {
        some: {
          bolidName: bolidName,
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
          bolidName: true,
        },
      },
    },
  });

  return teamMembers;
}
