const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const memberToUpdate = { name: "Piotr", surname: "Osiński" };

  const existingMember = await prisma.teamMember.findFirst({
    where: {
      name: { equals: memberToUpdate.name, mode: "insensitive" },
      surname: { equals: memberToUpdate.surname, mode: "insensitive" },
    },
  });

  if (existingMember) {
    // 如果成员存在，添加新角色
    await prisma.teamMember.update({
      where: { id: existingMember.id },
      data: {
        roles: {
          create: {
            department: "复合材料",
            role: "成员",
            projectName: "智能陪护",
          },
        },
      },
    });
    console.log(
      `为 ${memberToUpdate.name} ${memberToUpdate.surname} 更新了角色`
    );
  } else {
    // 如果成员不存在，创建新的团队成员并添加相应数据
    await prisma.teamMember.create({
      data: {
        name: memberToUpdate.name,
        surname: memberToUpdate.surname,
        roles: {
          create: [
            {
              department: "复合材料",
              role: "成员",
              projectName: "智能陪护",
            },
          ],
        },
      },
    });
    console.log(
      `创建了新的团队成员 ${memberToUpdate.name} ${memberToUpdate.surname}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
