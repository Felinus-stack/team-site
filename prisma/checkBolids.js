const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkBolids() {
  try {
    console.log("检查数据库中现有的项目记录...");
    
    const projects = await prisma.project.findMany({
      select: {
        name: true,
        year: true,
        shortDescription: true,
      }
    });
    
    console.log(`数据库中共有 ${projects.length} 条项目记录:`);
    projects.forEach(project => {
      console.log(`- ${project.name} (${project.year}): ${project.shortDescription}`);
    });
    
    if (projects.length === 0) {
      console.log("数据库中没有任何项目记录！");
    }
    
  } catch (error) {
    console.error("查询数据库时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBolids();