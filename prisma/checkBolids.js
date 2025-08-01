const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkBolids() {
  try {
    console.log("检查数据库中现有的Bolid记录...");
    
    const bolids = await prisma.bolid.findMany({
      select: {
        name: true,
        year: true,
        shortDescription: true,
      }
    });
    
    console.log(`数据库中共有 ${bolids.length} 条Bolid记录:`);
    bolids.forEach(bolid => {
      console.log(`- ${bolid.name} (${bolid.year}): ${bolid.shortDescription}`);
    });
    
    if (bolids.length === 0) {
      console.log("数据库中没有任何Bolid记录！");
    }
    
  } catch (error) {
    console.error("查询数据库时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBolids();