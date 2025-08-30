const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

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
    
    // 创建默认管理员账户
    const plainPassword = "admin123456";
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    
    const admin = await prisma.admin.create({
      data: {
        name: "管理员",
        email: "admin@teamsite.com",
        hashedPassword: hashedPassword,
      },
    });
    
    console.log("✅ 管理员账户创建成功！");
    console.log(`📧 邮箱: ${admin.email}`);
    console.log(`🔑 密码: ${plainPassword}`);
    console.log("⚠️  请登录后立即修改密码！");
    
  } catch (error) {
    console.error("❌ 创建管理员账户失败:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
