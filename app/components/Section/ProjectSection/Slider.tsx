"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SliderElement from "./SliderElement";

export interface SliderProps {
  currentProject: string;
  onChangeProject?: (newProject: string) => void;
  darkMode?: boolean;
  language?: "ch" | "en";
}

const Slider: React.FC<SliderProps> = ({
  currentProject = "新乡市卡口车辆防疫管理系统",
  onChangeProject = () => {},
  darkMode = false,
  language = "ch",
}) => {
  // 项目名称映射
  const projectNameMap: { [key: string]: string } = {
    "智能陪护": "Smart Companion System",
    "新乡市卡口车辆防疫管理系统": "Xinxiang Vehicle Checkpoint Management System",
    "新生报道系统": "Freshman Registration System",
    "无人车定位跟踪系统": "Autonomous Vehicle Tracking System",
    "网格化管理系统": "Urban Grid Management System",
    "统战管理系统": "United Front Management System",
    "场所工作人员管理界面": "Workplace Personnel Management Interface",
    "XXX市信访预警系统": "City Petition Early Warning System",
  };

  const getDisplayName = (chineseName: string) => {
    return language === "en" ? (projectNameMap[chineseName] || chineseName) : chineseName;
  };

  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname!.split("/")[1];
  const teamRedirect = (project: string) =>
    router.push(`/${currentLocale}/team/${project}`);
  const projectRedirect = (project: string) =>
    router.push(`/${currentLocale}/projects/${project}`);

  if (pathname && pathname.includes(`/team/`)) {
    onChangeProject = teamRedirect;
  } else if (pathname && pathname.includes(`/projects/`)) {
    onChangeProject = projectRedirect;
  }

  // 开始拖拽
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // 拖拽中
  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 结束拖拽
  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="">
      <div
        className={`${
          darkMode ? "bg-neutral-500" : "bg-neutral-300"
        } absolute inset-0 mt-5 md:mt-9 w-full h-2 md:h-3 opacity-50`}
      ></div>
      <div
        className={` w-[99vw] h-full relative pt-4 md:pt-8 overflow-x-scroll animation-container ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollContainerRef}
        onMouseDown={startDragging}
        onMouseMove={onDrag}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
      >
        <div className="flex relative gap-12 sm:gap-24 mx-8 md:ml-[calc((100vw-var(--container-width))/2)]">
          <SliderElement
            darkMode={darkMode}
            date={2025}
            projectName="智能陪护"
            displayName={getDisplayName("智能陪护")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2024}
            projectName="新乡市卡口车辆防疫管理系统"
            displayName={getDisplayName("新乡市卡口车辆防疫管理系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2023}
            projectName="新生报道系统"
            displayName={getDisplayName("新生报道系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2022}
            projectName="无人车定位跟踪系统"
            displayName={getDisplayName("无人车定位跟踪系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2021}
            projectName="网格化管理系统"
            displayName={getDisplayName("网格化管理系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2020}
            projectName="统战管理系统"
            displayName={getDisplayName("统战管理系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2019}
            projectName="场所工作人员管理界面"
            displayName={getDisplayName("场所工作人员管理界面")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2018}
            projectName="XXX市信访预警系统"
            displayName={getDisplayName("XXX市信访预警系统")}
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <div className="flex-shrink-0 w-1 md:w-[calc((85vw-var(--container-width))/2)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
