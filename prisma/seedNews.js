const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const newsArray = [
    {
      title: "学生社团创造创新成果",
      short_description:
        "在“学生科研社团创造创新成果”项目框架下...",
      length_time: 10,
      logo: "/images/logo-czarne.svg",
      main_image: "/images/news/2024-04-SKNInnowacje.jpg",
      long_description:
        "在由科学与高等教育部开展的“学生科研社团创造创新成果”项目框架下，今年我们有三个项目获得了资助：",
      content: [
        {
          text: "• 针对Formula Student赛车高压系统的创新复合安全结构，于2024年5月24日启动 🔨",
        },
        {
          text: "• Formula Student电动赛车的高效高压供电系统，于2024年5月27日启动 ⚡️",
        },
        {
          text: "• 关于Formula Student赛车电动牵引系统研发的科研工作，于2024年5月28日启动 ⚙️",
        },
        {
          text: "我们将获得的21万兹罗提资金用于研发第四代Formula Student电动赛车，并将竭尽全力使其像前几代赛车一样取得成功。 ",
        },
        {
          text: `🏆 同时，祝贺其他获奖者：
波兹南工业大学车辆与移动机器人科研社团
波兹南工业大学太空科研社团
波兹南工业大学非传统越野车辆科研社团
波兹南工业大学纳米传感器科研社团
波兹南工业大学年轻测量师科研社团`,
        },
      ],
    },
  ];

  for (let newsData of newsArray) {
    await prisma.news.create({
      data: newsData,
    });
    console.log(`新闻已添加: ${newsData.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
