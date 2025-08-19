const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 赛车基础数据
const bolidBaseData = {
  "RT14e": {
    year: "2024",
    shortDescription: "第三款配备自动驾驶系统的电动汽车",
    acceleration: "0-100km/h: 4秒",
    mass: "待定",
    power: "双电机驱动"
  },
  "RT13e": {
    year: "2023",
    shortDescription: "第二款配备自动驾驶系统的电动汽车",
    acceleration: "0-100km/h: 4秒",
    mass: "待定",
    power: "双电机驱动"
  },
  "RT12e": {
    year: "2022",
    shortDescription: "首款电动汽车，配备自动驾驶系统",
    acceleration: "0-100km/h: 4秒",
    mass: "待定",
    power: "双电机驱动"
  },
  "RT11": {
    year: "2021",
    shortDescription: "最后一批燃油车之一",
    acceleration: "0-100km/h: 3秒",
    mass: "199公斤",
    power: "最高时速150km/h"
  },
  "RTX": {
    year: "2019",
    shortDescription: "2018/2019赛季研发车型",
    acceleration: "0-100km/h: 3秒",
    mass: "待定",
    power: "高性能发动机"
  },
  "RT09": {
    year: "2019",
    shortDescription: "第九款燃油车",
    acceleration: "待定",
    mass: "185公斤",
    power: "90马力发动机"
  },
  "RT08": {
    year: "2018",
    shortDescription: "第八款燃油车",
    acceleration: "待定",
    mass: "185公斤",
    power: "本田CBR600RR发动机"
  },
  "RT07": {
    year: "2017",
    shortDescription: "配备创新空气动力学套件的燃油车",
    acceleration: "0-100km/h: 3.5秒",
    mass: "待定",
    power: "本田CBR600RR发动机"
  },
  "RT06": {
    year: "2015",
    shortDescription: "首款采用预浸料单体壳结构的混合动力车型",
    acceleration: "待定",
    mass: "减重30公斤",
    power: "本田CBR600RR发动机"
  },
  "RT05": {
    year: "2015",
    shortDescription: "源境团队的第六个项目",
    acceleration: "待定",
    mass: "216公斤",
    power: "本田599cc发动机"
  },
  "RT04": {
    year: "2014",
    shortDescription: "基于空间钢框架结构的车型",
    acceleration: "待定",
    mass: "216公斤",
    power: "本田599cc发动机"
  },
  "RT03": {
    year: "2012",
    shortDescription: "首次使用碳纤维单体壳的车型",
    acceleration: "0-100km/h: 4.5秒",
    mass: "待定",
    power: "KTM 450cc发动机+涡轮增压"
  },
  "RT02": {
    year: "2011",
    shortDescription: "采用模块化结构的甲醇燃料车型",
    acceleration: "0-100km/h: 4秒",
    mass: "258公斤",
    power: "本田CBR600RR PC40"
  },
  "RT01": {
    year: "2010",
    shortDescription: "源境团队打造的第一款燃油车",
    acceleration: "待定",
    mass: "待定",
    power: "本田CBR600RR 599cc"
  },
  "RT11b": {
    year: "2022",
    shortDescription: "RT11的升级版，最后一款燃油车",
    acceleration: "0-100km/h: 3秒",
    mass: "199公斤",
    power: "优化发动机性能"
  }
};

async function createBolids() {
  try {
    console.log("开始创建赛车数据...");
    
    // 获取bolidDescriptions.json中的描述
    const fs = require("fs");
    const path = require("path");
    const bolidDescriptionsPath = path.join(__dirname, "bolidDescriptions.json");
    const bolidDescriptions = require(bolidDescriptionsPath);
    
    // 创建所有赛车记录
    for (const [bolidName, baseData] of Object.entries(bolidBaseData)) {
      // 检查赛车是否已存在
      const existingBolid = await prisma.bolid.findUnique({
        where: { name: bolidName },
      });

      if (!existingBolid) {
        // 获取英文描述（如果有）
        const enDescription = bolidDescriptions[bolidName] || null;
        
        // 创建新的赛车记录
        await prisma.bolid.create({
          data: {
            name: bolidName,
            year: baseData.year,
            shortDescription: baseData.shortDescription,
            enShortDescription: enDescription,
            acceleration: baseData.acceleration,
            mass: baseData.mass,
            power: baseData.power,
          },
        });
        console.log(`已创建新赛车记录: ${bolidName}`);
      } else {
        console.log(`赛车 ${bolidName} 已存在，跳过创建`);
      }
    }
    
    console.log("所有赛车数据创建完成！");
  } catch (error) {
    console.error("创建赛车数据时出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createBolids();