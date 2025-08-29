const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 为不同项目定义组件数据
const projectPartsData = {
  "无人车定位跟踪系统": [
    {
      partName: "前端界面",
      description: "采用现代化的前端技术栈构建，包括React、Next.js等主流框架。界面设计注重用户体验，响应式布局确保在各种设备上的完美展现。"
    },
    {
      partName: "后端服务", 
      description: "基于Node.js构建的高性能后端服务架构，采用微服务设计模式确保系统的可扩展性和稳定性。"
    },
    {
      partName: "数据库设计",
      description: "采用关系型数据库设计，数据结构清晰合理，支持复杂的业务逻辑需求。数据库索引优化确保查询效率。"
    },
    {
      partName: "算法引擎",
      description: "核心算法模块采用先进的机器学习和人工智能技术，包括自然语言处理、图像识别、智能推荐等功能。"
    },
    {
      partName: "智能定位模块",
      description: "基于GPS和多传感器融合的精确定位系统，采用卡尔曼滤波和SLAM算法实现高精度位置跟踪。"
    }
  ],
  "智能陪护": [
    {
      partName: "AI对话引擎",
      description: "基于大语言模型的智能对话系统，支持多轮对话、情感理解和个性化回复。"
    },
    {
      partName: "情感识别模块",
      description: "通过语音、文字、表情等多模态数据分析用户情感状态，提供个性化的陪护服务。"
    },
    {
      partName: "健康监测系统",
      description: "集成各种健康传感器，实时监测用户生理指标，提供健康建议和预警。"
    }
  ],
  "新乡市卡口车辆防疫管理系统": [
    {
      partName: "车牌识别系统",
      description: "基于深度学习的车牌识别技术，支持多种车牌类型的快速准确识别。"
    },
    {
      partName: "人员信息核查",
      description: "与公安、卫健委等部门数据对接，实现人员身份和健康状态的快速验证。"
    },
    {
      partName: "数据分析平台",
      description: "实时统计分析通行数据，为疫情防控决策提供数据支撑。"
    }
  ]
};

async function restoreParts() {
  try {
    console.log("🔧 开始恢复项目组件数据...");
    
    // 检查是否已有数据
    const existingParts = await prisma.part.findMany();
    if (existingParts.length > 0) {
      console.log("⚠️  项目组件数据已存在，跳过恢复");
      return;
    }
    
    let totalCreated = 0;
    
    for (const [projectName, parts] of Object.entries(projectPartsData)) {
      // 查找项目
      const project = await prisma.project.findUnique({
        where: { name: projectName }
      });
      
      if (!project) {
        console.log(`⚠️  未找到项目: ${projectName}, 跳过`);
        continue;
      }
      
      console.log(`📦 为项目 "${projectName}" 创建组件...`);
      
      for (const partData of parts) {
        await prisma.part.create({
          data: {
            partName: partData.partName,
            description: partData.description,
            projectId: project.id
          }
        });
        
        console.log(`  ✅ 创建组件: ${partData.partName}`);
        totalCreated++;
      }
    }
    
    console.log(`🎉 项目组件数据恢复完成! 共创建 ${totalCreated} 个组件`);
    
  } catch (error) {
    console.error("❌ 恢复项目组件数据失败:", error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreParts();
