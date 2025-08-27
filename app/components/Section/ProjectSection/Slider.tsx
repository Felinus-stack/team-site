"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SliderElement from "./SliderElement";

export interface SliderProps {
  currentProject: string;
  onChangeProject?: (newProject: string) => void;
  darkMode?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  currentProject = "新乡市卡口车辆防疫管理系统",
  onChangeProject = () => {},
  darkMode = false,
}) => {
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
            bolid="智能陪护"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2024}
            bolid="新乡市卡口车辆防疫管理系统"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2023}
            bolid="新生报道系统"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2022}
            bolid="无人车定位跟踪系统"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2021}
            bolid="网格化管理系统"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2020}
            bolid="统战管理系统"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2019}
            bolid="场所工作人员管理界面"
            onClick={onChangeProject}
            currentProject={currentProject}
          />
          <SliderElement
            darkMode={darkMode}
            date={2018}
            bolid="XXX市信访预警系统"
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
