// 根据赛车ID获取赛车信息的操作
import prisma from "@/app/libs/prismadb";

export async function getBolidByBolidId(bolidId: string) {
  const bolid = await prisma.bolid.findUnique({
    where: {
      name: bolidId,
    },
    select: {
      parts: true,
      year: true,
    },
  });

  return bolid;
}
