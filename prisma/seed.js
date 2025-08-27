const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

// 英文描述的JSON文件路径
const projectDescriptionsPath = path.join(__dirname, "projectsDescriptions.json");
const projectDescriptions = require(projectDescriptionsPath);

async function updateProjectDescriptions() {
  try {
    for (const [projectName, description] of Object.entries(projectDescriptions)) {
      // 按名称查找项目
      const project = await prisma.project.findUnique({
        where: { name: projectName },
      });

      if (project) {
        // 更新项目记录，添加新的变量enShortDescription（修正字段名）
        await prisma.project.update({
          where: { name: projectName },
          data: { enShortDescription: description },
        });
        console.log(`已使用enShortDescription更新 ${projectName}`);
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
