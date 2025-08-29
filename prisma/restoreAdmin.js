const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log("🔧 开始创建管理员账户...");
    
    // 检查是否已存在管理员
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      console.log("⚠️  管理员账户已存在，跳过创建");
      return;
    }
    
    // 创建默认管理员账户（暂时使用明文密码，稍后可在管理界面修改）
    const hashedPassword = "admin123456";
    
    const admin = await prisma.admin.create({
      data: {
        name: "管理员",
        email: "admin@teamsite.com",
        hashedPassword: hashedPassword,
      },
    });
    
    console.log("✅ 管理员账户创建成功！");
    console.log(`📧 邮箱: ${admin.email}`);
    console.log(`🔑 密码: admin123456`);
    console.log("⚠️  请登录后立即修改密码！");
    
  } catch (error) {
    console.error("❌ 创建管理员账户失败:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
