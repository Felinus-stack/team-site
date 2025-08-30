const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 开始更新团队相关新闻的图片...");

  // 更新使用团队照片的新闻
  const updates = [
    {
      title: "学生社团创造创新成果",
      newImage: "/images/team/team4.jpg"
    },
    {
      title: "团队技术分享交流会", 
      newImage: "/images/team/team5.jpg"
    }
  ];

  for (let update of updates) {
    const result = await prisma.news.updateMany({
      where: {
        title: update.title
      },
      data: {
        mainImage: update.newImage
      }
    });
    
    if (result.count > 0) {
      console.log(`✅ 已更新: ${update.title} -> ${update.newImage}`);
    } else {
      console.log(`⚠️  未找到新闻: ${update.title}`);
    }
  }

  // 如果需要添加更多使用其他团队图片的新闻
  const additionalNews = [
    {
      title: "团队建设与文化活动",
      shortDescription: "团队定期举办各种团建活动和文化交流，增强团队凝聚力和协作能力。",
      duration: 3,
      logo: "/images/logo-czarne.svg",
      mainImage: "/images/team/team6.jpg",
      longDescription: "通过丰富多彩的团队活动，营造积极向上的团队氛围，促进成员之间的交流与合作。",
      content: {
        create: [
          {
            text: "户外团建活动，增强团队协作精神 🏃‍♂️"
          },
          {
            text: "技术沙龙分享，促进知识交流 💡"
          },
          {
            text: "生日庆祝活动，关爱团队成员 🎂"
          }
        ]
      }
    },
    {
      title: "项目成果展示与交流",
      shortDescription: "团队定期举办项目成果展示会，分享最新的技术成果和创新理念。",
      duration: 4,
      logo: "/images/logo-czarne.svg", 
      mainImage: "/images/team/team7.jpg",
      longDescription: "通过项目展示平台，团队成员可以分享自己的研发成果，互相学习和借鉴。",
      content: {
        create: [
          {
            text: "AI项目演示，展示机器学习应用成果 🤖"
          },
          {
            text: "Web应用展示，分享前端技术创新 💻"
          },
          {
            text: "移动应用体验，展示跨平台开发能力 📱"
          }
        ]
      }
    },
    {
      title: "技术研讨与学习交流",
      shortDescription: "团队成员积极参与各类技术研讨会，不断提升专业技能和创新能力。",
      duration: 5,
      logo: "/images/logo-czarne.svg",
      mainImage: "/images/team/team8.jpg", 
      longDescription: "通过参与学术会议和技术研讨，团队紧跟技术发展趋势，保持创新活力。",
      content: {
        create: [
          {
            text: "参加技术大会，了解行业最新动态 📈"
          },
          {
            text: "学术论文发表，分享研究成果 📄"
          },
          {
            text: "开源项目贡献，回馈技术社区 🔗"
          }
        ]
      }
    }
  ];

  // 添加新的团队相关新闻
  for (let newsData of additionalNews) {
    // 检查是否已存在同名新闻
    const existing = await prisma.news.findFirst({
      where: { title: newsData.title }
    });

    if (!existing) {
      await prisma.news.create({
        data: newsData,
      });
      console.log(`✅ 新增新闻: ${newsData.title}`);
    } else {
      console.log(`⚠️  新闻已存在: ${newsData.title}`);
    }
  }

  console.log("🎉 团队图片更新完成！");
}

main()
  .catch((e) => {
    console.error("❌ 错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
