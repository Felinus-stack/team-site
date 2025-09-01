"use client";

import React, { useEffect, useState } from "react";
import ProjectContent from "./ProjectContent";
import Slider from "./Slider";

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

const ProjectSection: React.FC<ProjectSectionProps> = ({
  dict,
  language,
  presetProject = "智能陪护",
}) => {
  const [currentProjectData, setCurrentProjectData] = useState<ProjectData>({
    name: presetProject,
    EN_name: "Intelligent Companion Care",
    year: "2025",
    short_description: "基于人工智能技术的智能陪护解决方案",
    EN_short_description: "An intelligent companion care solution based on artificial intelligence technology.",
    acceleration: "5人",
    mass: "多模态交互",
    power: "6个月",
  });

  const [previousProjectData, setPreviousProjectData] =
    useState<ProjectData>(currentProjectData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setsameDirection] = useState("");
  const [sameDirectionShift, setsameDirectionShift] = useState("duration-500");

  const fetchProjectData = async (projectName: string) => {
    const response = await fetch(`/api/projects/${projectName}`);
    if (!response.ok) {
      console.error("Failed to fetch project data:", response.statusText);
      return;
    }

    const data = await response.json();

    if (
      currentProjectData.year < data.year ||
      (currentProjectData.name === "XXX市信访预警系统" && projectName === "智能陪护")
    ) {
      if (sameDirection === "left") {
        setsameDirectionShift("0");
        setIsAnimating("translate-x-[-50%]");
        setTimeout(() => {
          setIsAnimating("translate-x-[0]");
          setsameDirectionShift("duration-500");
        }, 10);
      } else {
        setsameDirection("left");
        setDisplayRight(false);
        setIsAnimating("translate-x-[0]");
      }
    } else if (
      currentProjectData.year > data.year ||
      (currentProjectData.name === "智能陪护" && projectName === "XXX市信访预警系统")
    ) {
      if (sameDirection === "right") {
        setsameDirectionShift("");
        setIsAnimating("translate-x-[0]");
        setTimeout(() => {
          setIsAnimating("translate-x-[-50%]");
          setsameDirectionShift("duration-500");
        }, 10);
      } else {
        setsameDirection("right");
        setDisplayRight(true);
        setIsAnimating("translate-x-[-50%]");
      }
    }

    setPreviousProjectData(currentProjectData);
    setCurrentProjectData(data);
  };

  useEffect(() => {
    fetchProjectData(currentProjectData.name);
  }, []);

  const handleChangeProject = (projectName: string) => {
    console.log('项目切换点击:', projectName); // 调试日志
    fetchProjectData(projectName);
  };

  return (
    <div id="projects" className="overflow-hidden">
      <div className="relative flex flex-col w-[200vw]">
        <Slider
          currentProject={currentProjectData.name}
          onChangeProject={handleChangeProject}
          language={language}
        />
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

export default ProjectSection;
