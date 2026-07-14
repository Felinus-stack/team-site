const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

// 项目描述的JSON文件路径
const enShortDescriptionsPath = path.join(__dirname, "projectsDescriptions.json");
const enShortDescriptions = require(enShortDescriptionsPath);

async function updateProjectDescriptions() {
  try {
    for (const [projectName, enDescription] of Object.entries(enShortDescriptions)) {
      // 按名称查找项目
      const project = await prisma.project.findUnique({
        where: { name: projectName },
      });

      if (project) {
        // 更新项目记录，添加英文短描述
        await prisma.project.update({
          where: { name: projectName },
          data: { enShortDescription: enDescription },
        });
        console.log(`已使用英文短描述更新 ${projectName}`);
      } else {
        console.log(`未找到名为 ${projectName} 的项目`);
      }
    }
  } catch (error) {
    console.error("更新项目描述时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProjectDescriptions();
