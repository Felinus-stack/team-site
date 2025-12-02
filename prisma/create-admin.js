const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

async function main() {
  const prisma = new PrismaClient();
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error("ADMIN_EMAIL 或 ADMIN_PASSWORD 未配置");
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
    if (existing?.hashedPassword) {
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existing) {
      await prisma.admin.update({
        where: { email: normalizedEmail },
        data: { hashedPassword },
      });
    } else {
      await prisma.admin.create({
        data: {
          email: normalizedEmail,
          hashedPassword,
        },
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  process.exitCode = 1;
});

