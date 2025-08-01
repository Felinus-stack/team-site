const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 主函数，用于删除 'news' 集合中的所有记录。
 * @returns {Promise<void>}
 */
async function main() {
  // 删除 'news' 集合中的所有记录
  const deleteResult = await prisma.news.deleteMany({});
  console.log(`已从新闻中删除 ${deleteResult.count} 条记录。`); // 输出删除记录的数量信息
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // 始终记得关闭与数据库的连接
  });
