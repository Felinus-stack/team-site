import prisma from "@/app/libs/prismadb";

export const getBolids = async () => {
  const bolids = await prisma.bolid.findMany({
    select: {
      name: true,
    },
  });

  return bolids.map(bolid => bolid.name);
};