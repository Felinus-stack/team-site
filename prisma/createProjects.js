const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 项目基础数据
const projectBaseData = {
  "智能陪护": {
    year: "2025",
    shortDescription: "基于人工智能技术的智能陪护解决方案",
    acceleration: "响应时间: <1秒",
    mass: "多模态交互",
    power: "24小时服务"
  },
  "新乡市卡口车辆防疫管理系统": {
    year: "2024",
    shortDescription: "专为疫情防控设计的智能管理系统",
    acceleration: "响应时间: <2秒",
    mass: "微服务架构",
    power: "实时监控"
  },
  "新生报道系统": {
    year: "2023",
    shortDescription: "高校新生入学报道数字化解决方案",
    acceleration: "报道时间: 30分钟",
    mass: "Web技术栈",
    power: "多平台支持"
  },
  "无人车定位跟踪系统": {
    year: "2022",
    shortDescription: "基于物联网技术的无人驾驶车辆管理系统",
    acceleration: "定位精度: 厘米级",
    mass: "分布式架构",
    power: "多车协同"
  },
  "网格化管理系统": {
    year: "2021",
    shortDescription: "城市网格化管理数字化解决方案",
    acceleration: "响应时间: <5秒",
    mass: "GIS技术",
    power: "精细化管理"
  },
  "统战管理系统": {
    year: "2020",
    shortDescription: "统一战线工作数字化管理平台",
    acceleration: "查询时间: <3秒",
    mass: "安全架构",
    power: "权限管理"
  },
  "场所工作人员管理界面": {
    year: "2019",
    shortDescription: "各类场所人员管理数字化解决方案",
    acceleration: "操作响应: <2秒",
    mass: "现代前端",
    power: "响应式设计"
  },
  "XXX市信访预警系统": {
    year: "2018",
    shortDescription: "政府信访工作智能化预警和管理平台",
    acceleration: "预警时间: 实时",
    mass: "大数据分析",
    power: "机器学习"
  }
};

async function createProjects() {
  try {
    console.log("开始创建项目数据...");
    
    // 获取projectsDescriptions.json中的描述
    const fs = require("fs");
    const path = require("path");
    const projectDescriptionsPath = path.join(__dirname, "projectsDescriptions.json");
    const projectDescriptions = require(projectDescriptionsPath);
    
    // 创建所有项目记录
    for (const [projectName, baseData] of Object.entries(projectBaseData)) {
      // 检查项目是否已存在
      const existingProject = await prisma.project.findUnique({
        where: { name: projectName },
      });

      if (!existingProject) {
        // 获取详细描述（如果有）
        const enDescription = projectDescriptions[projectName] || null;
        
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
        console.log(`项目 ${projectName} 已存在，跳过创建`);
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