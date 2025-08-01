const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

// 英文描述的JSON文件路径
const bolidDescriptionsPath = path.join(__dirname, "bolidDescriptions.json");
const bolidDescriptions = require(bolidDescriptionsPath);

async function updateBolidDescriptions() {
  try {
    for (const [bolidName, description] of Object.entries(bolidDescriptions)) {
      // 按名称查找赛车
      const bolid = await prisma.bolid.findUnique({
        where: { name: bolidName },
      });

      if (bolid) {
        // 更新赛车记录，添加新的变量enShortDescription（修正字段名）
        await prisma.bolid.update({
          where: { name: bolidName },
          data: { enShortDescription: description },
        });
        console.log(`已使用enShortDescription更新 ${bolidName}`);
      } else {
        console.log(`未找到名为 ${bolidName} 的赛车`);
      }
    }
  } catch (error) {
    console.error("更新赛车描述时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBolidDescriptions();
