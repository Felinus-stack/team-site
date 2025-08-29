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
  presetProject = "新乡市卡口车辆防疫管理系统",
}) => {
  const [currentProjectData, setCurrentProjectData] = useState<ProjectData>({
    name: presetProject,
    EN_name: "Xinxiang Vehicle Checkpoint Management System",
    year: "2024",
    short_description: "专为疫情防控设计的智能管理系统",
    EN_short_description: "An intelligent epidemic prevention management system designed specifically for vehicle checkpoint control.",
    acceleration: "8人",
    mass: "微服务架构",
    power: "4个月",
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
      (currentProjectData.name === "XXX市信访预警系统" && projectName === "新乡市卡口车辆防疫管理系统")
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
      (currentProjectData.name === "新乡市卡口车辆防疫管理系统" && projectName === "XXX市信访预警系统")
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
