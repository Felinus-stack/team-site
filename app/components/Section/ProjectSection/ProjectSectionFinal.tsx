"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProjectContentOptimized from "./ProjectContentOptimized";
import Slider from "./Slider";
import { useImagePreloader } from "@/app/hooks/useImagePreloader";

type ProjectData = {
  name: string;
  EN_name?: string;
  year: string;
  short_description: string;
  EN_short_description: string;
  acceleration: string;
  mass: string;
  power: string;
};

interface ProjectSectionProps {
  dict: any;
  language: "ch" | "en";
  presetProject?: string;
}

// 项目列表
const PROJECT_NAMES = [
  "智能陪护",
  "新乡市卡口车辆防疫管理系统", 
  "新生报道系统",
  "无人车定位跟踪系统",
  "网格化管理系统",
  "统战管理系统",
  "场所工作人员管理界面",
  "XXX市信访预警系统"
];

// 预定义项目数据缓存
const PROJECT_DATA_CACHE: { [key: string]: ProjectData } = {
  "智能陪护": {
    name: "智能陪护",
    EN_name: "Smart Companion System",
    year: "2025",
    short_description: "基于人工智能技术的智能陪护解决方案",
    EN_short_description: "An intelligent companion care solution based on artificial intelligence technology.",
    acceleration: "5人",
    mass: "多模态交互",
    power: "6个月",
  },
  "新乡市卡口车辆防疫管理系统": {
    name: "新乡市卡口车辆防疫管理系统",
    EN_name: "Xinxiang Vehicle Checkpoint Management System",
    year: "2024",
    short_description: "智能化车辆防疫管理解决方案",
    EN_short_description: "Intelligent vehicle epidemic prevention management solution",
    acceleration: "8人",
    mass: "实时监控",
    power: "12个月",
  },
  "新生报道系统": {
    name: "新生报道系统",
    EN_name: "Freshman Registration System",
    year: "2023",
    short_description: "高效便捷的新生入学报到系统",
    EN_short_description: "Efficient and convenient freshman enrollment system",
    acceleration: "6人",
    mass: "自动化流程",
    power: "8个月",
  },
  "无人车定位跟踪系统": {
    name: "无人车定位跟踪系统",
    EN_name: "Autonomous Vehicle Tracking System",
    year: "2022",
    short_description: "精确的无人车实时定位与跟踪系统",
    EN_short_description: "Precise real-time positioning and tracking system for autonomous vehicles",
    acceleration: "10人",
    mass: "精确定位",
    power: "15个月",
  },
  "网格化管理系统": {
    name: "网格化管理系统",
    EN_name: "Urban Grid Management System",
    year: "2021",
    short_description: "城市网格化智能管理平台",
    EN_short_description: "Urban grid intelligent management platform",
    acceleration: "7人",
    mass: "网格管理",
    power: "10个月",
  },
  "统战管理系统": {
    name: "统战管理系统",
    EN_name: "United Front Management System",
    year: "2020",
    short_description: "统一战线工作管理系统",
    EN_short_description: "United front work management system",
    acceleration: "5人",
    mass: "统一管理",
    power: "9个月",
  },
  "场所工作人员管理界面": {
    name: "场所工作人员管理界面",
    EN_name: "Workplace Personnel Management Interface",
    year: "2019",
    short_description: "场所工作人员智能管理界面",
    EN_short_description: "Intelligent workplace personnel management interface",
    acceleration: "4人",
    mass: "人员管理",
    power: "7个月",
  },
  "XXX市信访预警系统": {
    name: "XXX市信访预警系统",
    EN_name: "City Petition Early Warning System",
    year: "2018",
    short_description: "城市信访预警智能分析系统",
    EN_short_description: "City petition early warning intelligent analysis system",
    acceleration: "6人",
    mass: "预警系统",
    power: "11个月",
  },
};

const ProjectSectionFinal: React.FC<ProjectSectionProps> = ({
  dict,
  language,
  presetProject = "智能陪护",
}) => {
  // 使用图片预加载Hook
  const { isImageLoaded, allImagesLoaded } = useImagePreloader(PROJECT_NAMES);
  
  const [currentProjectData, setCurrentProjectData] = useState<ProjectData>(
    PROJECT_DATA_CACHE[presetProject] || PROJECT_DATA_CACHE["智能陪护"]
  );
  const [previousProjectData, setPreviousProjectData] = useState<ProjectData>(currentProjectData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setSameDirection] = useState("");
  const [sameDirectionShift, setSameDirectionShift] = useState("duration-500");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 优化的项目切换函数
  const handleChangeProject = useCallback(async (projectName: string) => {
    // 防止重复点击
    if (isTransitioning || currentProjectData.name === projectName) return;
    
    setIsTransitioning(true);

    // 立即从缓存获取数据
    const newProjectData = PROJECT_DATA_CACHE[projectName];
    if (!newProjectData) {
      setIsTransitioning(false);
      return;
    }

    // 处理动画逻辑
    const currentYear = parseInt(currentProjectData.year);
    const newYear = parseInt(newProjectData.year);

    if (
      currentYear < newYear ||
      (currentProjectData.name === "XXX市信访预警系统" && projectName === "智能陪护")
    ) {
      if (sameDirection === "left") {
        setSameDirectionShift("0");
        setIsAnimating("translate-x-[-50%]");
        setTimeout(() => {
          setIsAnimating("translate-x-[0]");
          setSameDirectionShift("duration-500");
        }, 10);
      } else {
        setSameDirection("left");
        setDisplayRight(false);
        setIsAnimating("translate-x-[0]");
      }
    } else if (
      currentYear > newYear ||
      (currentProjectData.name === "智能陪护" && projectName === "XXX市信访预警系统")
    ) {
      if (sameDirection === "right") {
        setSameDirectionShift("");
        setIsAnimating("translate-x-[0]");
        setTimeout(() => {
          setIsAnimating("translate-x-[-50%]");
          setSameDirectionShift("duration-500");
        }, 10);
      } else {
        setSameDirection("right");
        setDisplayRight(true);
        setIsAnimating("translate-x-[-50%]");
      }
    }

    // 立即更新数据
    setPreviousProjectData(currentProjectData);
    setCurrentProjectData(newProjectData);

    // 等待动画完成
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // 后台更新数据（如果需要）
    try {
      const response = await fetch(`/api/projects/${projectName}`);
      if (response.ok) {
        const apiData = await response.json();
        PROJECT_DATA_CACHE[projectName] = apiData;
        // 如果当前还是这个项目，更新数据
        if (currentProjectData.name === projectName) {
          setCurrentProjectData(apiData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch latest project data:", error);
    }
  }, [currentProjectData, sameDirection, isTransitioning]);

  return (
    <div id="projects" className="overflow-hidden">
      {/* 全局加载指示器 */}
      {!allImagesLoaded && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
            <span className="text-sm text-gray-600">预加载图片中...</span>
          </div>
        </div>
      )}

      <div className="relative flex flex-col w-[200vw]">
        <Slider
          currentProject={currentProjectData.name}
          onChangeProject={handleChangeProject}
          language={language}
        />
        
        {/* 切换指示器 */}
        {isTransitioning && (
          <div className="absolute top-4 right-4 z-10">
            <div className="animate-pulse bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              切换中...
            </div>
          </div>
        )}

        <div
          className={`flex ${sameDirectionShift} ${isAnimating} ${
            displayRight ? "flex-row-reverse" : "flex-row"
          } ${isTransitioning ? 'pointer-events-none' : ''}`}
        >
          <ProjectContentOptimized 
            {...currentProjectData} 
            language={language} 
            dict={dict} 
          />
          {previousProjectData && (
            <ProjectContentOptimized
              {...previousProjectData}
              language={language}
              dict={dict}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSectionFinal;
