const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 示例团队成员数据
const teamMembersData = [
  {
    name: "张",
    surname: "三",
    email: "zhangsan@example.com",
    phoneNumber: "13800138001",
    roles: [
      {
        department: "前端开发",
        role: "团队负责人",
        projectName: "智能陪护"
      }
    ]
  },
  {
    name: "李",
    surname: "四",
    email: "lisi@example.com", 
    phoneNumber: "13800138002",
    roles: [
      {
        department: "后端开发",
        role: "高级开发工程师",
        projectName: "新乡市卡口车辆防疫管理系统"
      }
    ]
  },
  {
    name: "王",
    surname: "五",
    email: "wangwu@example.com",
    phoneNumber: "13800138003",
    roles: [
      {
        department: "算法引擎",
        role: "算法工程师", 
        projectName: "无人车定位跟踪系统"
      }
    ]
  },
  {
    name: "赵",
    surname: "六",
    email: "zhaoliu@example.com",
    phoneNumber: "13800138004",
    roles: [
      {
        department: "产品设计",
        role: "UI/UX设计师",
        projectName: "新生报道系统"
      }
    ]
  },
  {
    name: "Piotr",
    surname: "Osiński",
    email: "piotr@example.com",
    phoneNumber: "+48123456789",
    roles: [
      {
        department: "复合材料",
        role: "成员",
        projectName: "智能陪护"
      }
    ]
  }
];

async function restoreTeamMembers() {
  try {
    console.log("🔧 开始恢复团队成员数据...");
    
    // 检查是否已有数据
    const existingMembers = await prisma.teamMember.findMany();
    if (existingMembers.length > 0) {
      console.log("⚠️  团队成员数据已存在，跳过恢复");
      return;
    }
    
    let createdCount = 0;
    
    for (const memberData of teamMembersData) {
      const member = await prisma.teamMember.create({
        data: {
          name: memberData.name,
          surname: memberData.surname,
          email: memberData.email,
          phoneNumber: memberData.phoneNumber,
          roles: {
            create: memberData.roles
          }
        },
        include: {
          roles: true
        }
      });
      
      console.log(`✅ 创建团队成员: ${member.name} ${member.surname}`);
      createdCount++;
    }
    
    console.log(`🎉 团队成员数据恢复完成! 共创建 ${createdCount} 个成员`);
    
  } catch (error) {
    console.error("❌ 恢复团队成员数据失败:", error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreTeamMembers();
