"use client";

import React, { useEffect, useState } from "react";
import ProjectContent from "./ProjectContent";
import Slider from "./Slider";

type ProjectData = {
  name: string;
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
    year: "2024",
    short_description:
      "新乡市卡口车辆防疫管理系统是我们团队针对疫情期间交通管控需求开发的智能化管理平台。系统集成了车辆识别、健康码验证、通行证管理等功能，为疫情防控提供了高效的技术支撑。通过人工智能和大数据分析，实现了对过往车辆的精准管控和实时监测，大大提高了防疫工作的效率和准确性。",
    EN_short_description: "Xinxiang Checkpoint Vehicle Epidemic Prevention Management System",
    acceleration: "实时处理",
    mass: "云端部署",
    power: "AI智能",
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
