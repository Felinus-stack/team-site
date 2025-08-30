"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import ProjectContent from "./ProjectContent";
import Slider from "./Slider";
import { getEnglishFileName } from "@/app/utils/projectMapping";

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

// 预定义项目数据，避免每次API请求
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
    short_description: "新乡市卡口车辆防疫管理系统",
    EN_short_description: "Xinxiang Vehicle Checkpoint Management System",
    acceleration: "8人",
    mass: "实时监控",
    power: "12个月",
  },
  "新生报道系统": {
    name: "新生报道系统",
    EN_name: "Freshman Registration System",
    year: "2023",
    short_description: "新生报道系统",
    EN_short_description: "Freshman Registration System",
    acceleration: "6人",
    mass: "自动化流程",
    power: "8个月",
  },
  "无人车定位跟踪系统": {
    name: "无人车定位跟踪系统",
    EN_name: "Autonomous Vehicle Tracking System",
    year: "2022",
    short_description: "无人车定位跟踪系统",
    EN_short_description: "Autonomous Vehicle Tracking System",
    acceleration: "10人",
    mass: "精确定位",
    power: "15个月",
  },
  "网格化管理系统": {
    name: "网格化管理系统",
    EN_name: "Urban Grid Management System",
    year: "2021",
    short_description: "网格化管理系统",
    EN_short_description: "Urban Grid Management System",
    acceleration: "7人",
    mass: "网格管理",
    power: "10个月",
  },
  "统战管理系统": {
    name: "统战管理系统",
    EN_name: "United Front Management System",
    year: "2020",
    short_description: "统战管理系统",
    EN_short_description: "United Front Management System",
    acceleration: "5人",
    mass: "统一管理",
    power: "9个月",
  },
  "场所工作人员管理界面": {
    name: "场所工作人员管理界面",
    EN_name: "Workplace Personnel Management Interface",
    year: "2019",
    short_description: "场所工作人员管理界面",
    EN_short_description: "Workplace Personnel Management Interface",
    acceleration: "4人",
    mass: "人员管理",
    power: "7个月",
  },
  "XXX市信访预警系统": {
    name: "XXX市信访预警系统",
    EN_name: "City Petition Early Warning System",
    year: "2018",
    short_description: "XXX市信访预警系统",
    EN_short_description: "City Petition Early Warning System",
    acceleration: "6人",
    mass: "预警系统",
    power: "11个月",
  },
};

const ProjectSectionOptimized: React.FC<ProjectSectionProps> = ({
  dict,
  language,
  presetProject = "智能陪护",
}) => {
  const [currentProjectData, setCurrentProjectData] = useState<ProjectData>(
    PROJECT_DATA_CACHE[presetProject] || PROJECT_DATA_CACHE["智能陪护"]
  );
  const [previousProjectData, setPreviousProjectData] = useState<ProjectData>(currentProjectData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setSameDirection] = useState("");
  const [sameDirectionShift, setSameDirectionShift] = useState("duration-500");
  const [isLoading, setIsLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // 预加载所有项目图片
  const preloadImages = useCallback(() => {
    Object.keys(PROJECT_DATA_CACHE).forEach((projectName) => {
      const englishName = getEnglishFileName(projectName);
      const imagePath = `/images/projects/${englishName}/${englishName}.png`;
      
      if (!preloadedImages.has(imagePath)) {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, imagePath]));
        };
        img.src = imagePath;
      }
    });
  }, [preloadedImages]);

  // 组件挂载时预加载图片
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // 优化的项目切换函数
  const handleChangeProject = useCallback(async (projectName: string) => {
    // 如果是相同项目，直接返回
    if (currentProjectData.name === projectName) return;

    setIsLoading(true);

    // 先从缓存获取数据，立即更新UI
    const cachedData = PROJECT_DATA_CACHE[projectName];
    if (cachedData) {
      // 立即更新数据，不等待API
      updateProjectWithAnimation(cachedData);
      setIsLoading(false);
    }

    // 后台异步获取最新数据（如果需要）
    try {
      const response = await fetch(`/api/projects/${projectName}`);
      if (response.ok) {
        const apiData = await response.json();
        // 更新缓存
        PROJECT_DATA_CACHE[projectName] = apiData;
        // 如果数据有变化，再次更新
        if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
          setCurrentProjectData(apiData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch project data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentProjectData.name]);

  // 处理动画和数据更新
  const updateProjectWithAnimation = useCallback((newData: ProjectData) => {
    const currentYear = parseInt(currentProjectData.year);
    const newYear = parseInt(newData.year);

    if (
      currentYear < newYear ||
      (currentProjectData.name === "XXX市信访预警系统" && newData.name === "智能陪护")
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
      (currentProjectData.name === "智能陪护" && newData.name === "XXX市信访预警系统")
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

    setPreviousProjectData(currentProjectData);
    setCurrentProjectData(newData);
  }, [currentProjectData, sameDirection]);

  // 初始化
  useEffect(() => {
    const initialData = PROJECT_DATA_CACHE[presetProject] || PROJECT_DATA_CACHE["智能陪护"];
    setCurrentProjectData(initialData);
  }, [presetProject]);

  return (
    <div id="projects" className="overflow-hidden">
      <div className="relative flex flex-col w-[200vw]">
        <Slider
          currentProject={currentProjectData.name}
          onChangeProject={handleChangeProject}
          language={language}
        />
        
        {/* 加载指示器 */}
        {isLoading && (
          <div className="absolute top-4 right-4 z-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
          </div>
        )}

        <div
          className={`flex ${sameDirectionShift} ${isAnimating} ${
            displayRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <ProjectContent {...currentProjectData} language={language} dict={dict} />
          {previousProjectData && (
            <ProjectContent
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

export default ProjectSectionOptimized;
