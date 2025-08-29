const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 项目基础数据
const projectBaseData = {
  "智能陪护": {
    year: "2025",
    shortDescription: "基于人工智能技术的智能陪护解决方案",
    acceleration: "5人",
    mass: "多模态交互",
    power: "6个月"
  },
  "新乡市卡口车辆防疫管理系统": {
    year: "2024",
    shortDescription: "专为疫情防控设计的智能管理系统",
    acceleration: "8人",
    mass: "微服务架构",
    power: "4个月"
  },
  "新生报道系统": {
    year: "2023",
    shortDescription: "高校新生入学报道数字化解决方案",
    acceleration: "6人",
    mass: "Web技术栈",
    power: "3个月"
  },
  "无人车定位跟踪系统": {
    year: "2022",
    shortDescription: "基于物联网技术的无人驾驶车辆管理系统",
    acceleration: "7人",
    mass: "分布式架构",
    power: "8个月"
  },
  "网格化管理系统": {
    year: "2021",
    shortDescription: "城市网格化管理数字化解决方案",
    acceleration: "9人",
    mass: "GIS技术",
    power: "5个月"
  },
  "统战管理系统": {
    year: "2020",
    shortDescription: "统一战线工作数字化管理平台",
    acceleration: "4人",
    mass: "安全架构",
    power: "4个月"
  },
  "场所工作人员管理界面": {
    year: "2019",
    shortDescription: "各类场所人员管理数字化解决方案",
    acceleration: "3人",
    mass: "现代前端",
    power: "2个月"
  },
  "XXX市信访预警系统": {
    year: "2018",
    shortDescription: "政府信访工作智能化预警和管理平台",
    acceleration: "6人",
    mass: "大数据分析",
    power: "7个月"
  }
};

async function createProjects() {
  try {
    console.log("开始创建项目数据...");
    
    // 获取英文短描述
    const fs = require("fs");
    const path = require("path");
    const enShortDescriptionsPath = path.join(__dirname, "enShortDescriptions.json");
    const enShortDescriptions = require(enShortDescriptionsPath);
    
    // 创建所有项目记录
    for (const [projectName, baseData] of Object.entries(projectBaseData)) {
      // 检查项目是否已存在
      const existingProject = await prisma.project.findUnique({
        where: { name: projectName },
      });

      if (!existingProject) {
        // 获取详细描述（如果有）
        const enDescription = enShortDescriptions[projectName] || null;
        
        // 创建新的项目记录
        await prisma.project.create({
          data: {
            name: projectName,
            year: baseData.year,
            shortDescription: baseData.shortDescription,
            enShortDescription: enDescription,
            acceleration: baseData.acceleration,
            mass: baseData.mass,
            power: baseData.power,
          },
        });
        console.log(`已创建新项目记录: ${projectName}`);
      } else {
        // 更新现有项目记录
        const enDescription = enShortDescriptions[projectName] || existingProject.enShortDescription;
        
        await prisma.project.update({
          where: { name: projectName },
          data: {
            year: baseData.year,
            shortDescription: baseData.shortDescription,
            enShortDescription: enDescription,
            acceleration: baseData.acceleration,
            mass: baseData.mass,
            power: baseData.power,
          },
        });
        console.log(`已更新项目记录: ${projectName}`);
      }
    }
    
    console.log("所有项目数据创建完成！");
  } catch (error) {
    console.error("创建项目数据时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createProjects();