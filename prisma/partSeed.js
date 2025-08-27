const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const partsToAdd = [
    {
      partName: "前端界面",
      description:
        "采用现代化的前端技术栈构建，包括React、Next.js等主流框架。界面设计注重用户体验，响应式布局确保在各种设备上的完美展现。组件化开发模式提高了代码复用性和维护效率。整个前端架构轻量高效，加载速度优化至极致，为用户提供流畅的交互体验。",
    },
    {
      partName: "后端服务",
      description:
        "基于Node.js构建的高性能后端服务架构，采用微服务设计模式确保系统的可扩展性和稳定性。集成了Prisma ORM进行数据库操作，支持多种数据库类型。API设计遵循RESTful规范，提供完整的数据接口服务。系统具备强大的并发处理能力和容错机制。",
    },
    {
      partName: "数据库设计",
      description:
        "采用关系型数据库设计，数据结构清晰合理，支持复杂的业务逻辑需求。数据库索引优化确保查询效率，事务处理保证数据一致性。支持数据备份和恢复机制，确保数据安全性。数据库设计遵循范式理论，避免数据冗余。",
    },
    {
      partName: "算法引擎",
      description:
        "核心算法模块采用先进的机器学习和人工智能技术，包括自然语言处理、图像识别、智能推荐等功能。算法经过大量数据训练和优化，准确率和效率不断提升。支持实时数据处理和分析，为业务决策提供智能支持。算法模块采用模块化设计，易于扩展和维护。",
    },
    {
      partName: "系统架构",
      description:
        "采用现代化的云原生架构设计，支持容器化部署和微服务治理。系统具备高可用性、高并发性和高扩展性。监控和日志系统完善，便于运维管理。支持CI/CD自动化部署，提高开发效率。架构设计考虑了安全性和性能优化。",
    },
    {
      partName: "智能定位模块",
      description:
        "基于GPS和多传感器融合的精确定位系统，采用卡尔曼滤波和SLAM算法实现高精度位置跟踪。支持室内外无缝定位切换，定位精度可达米级。系统具备实时轨迹记录和历史轨迹回放功能，为位置服务提供可靠的技术支撑。",
    },
    {
      partName: "性能监控",
      description:
        "全方位的系统性能监控和优化模块，实时监控系统资源使用情况、接口响应时间、用户行为数据等关键指标。采用APM性能监控工具，提供详细的性能分析报告。支持自动报警和故障诊断，确保系统稳定运行。性能数据可视化展示，便于运维决策。",
    },
  ];

  const project = await prisma.project.findUnique({
    where: {
      name: "无人车定位跟踪系统",
    },
  });

  if (project) {
    const updateProject = await prisma.project.update({
      where: {
        id: project.id, // 使用项目的ID进行更新
      },
      data: {
        parts: {
          push: partsToAdd, // 使用 'push' 而不是 'create'
        },
      },
    });

    console.log(`部件已添加到项目: ${updateProject.name}`);
  } else {
    console.log('未找到名为 "无人车定位跟踪系统" 的项目');
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
