"use client";

import { useEffect, useState } from "react";
import BolidContent from "./BolidContent";
import Slider from "./Slider";

type BolidData = {
  name: string;
  year: string;
  short_description: string;
  EN_short_description: string;
  acceleration: string;
  mass: string;
  power: string;
};

interface BolidSectionProps {
  dict: any;
  language: "ch" | "en";
  presetBolid?: string;
}

const BolidSection: React.FC<BolidSectionProps> = ({
  dict,
  language,
  presetBolid = "RT14e",
}) => {
  const [currentBolidData, setCurrentBolidData] = useState<BolidData>({
    name: presetBolid,
    year: "2023",
    short_description:
      "最新项目是团队对汽车行业挑战和趋势的回应。我们希望设计解决方案并参与正在发生的变革。赛车的电动化和自动驾驶系统的创建是团队发展的一个里程碑。该车辆配备了来自赛车运动领域的创新解决方案。它的特点是全单体壳车身，仅重24公斤，还有自主研发的发动机以及高低压电线束。自动驾驶系统使我们不仅能够参加电动类别比赛，还能参加无人驾驶类别比赛。",
    EN_short_description: "",
    acceleration: "3s",
    mass: "230 KG",
    power: "2 x 48 KW",
  });

  const [previousBolidData, setPreviousBolidData] =
    useState<BolidData>(currentBolidData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setsameDirection] = useState("");
  const [sameDirectionShift, setsameDirectionShift] = useState("duration-500");

  const fetchBolidData = async (bolidName: string) => {
    const response = await fetch(`/api/bolid/${bolidName}`);
    if (!response.ok) {
      console.error("Failed to fetch bolid data:", response.statusText);
      return;
    }

    const data = await response.json();

    if (
      currentBolidData.year < data.year ||
      (currentBolidData.name === "RT11b" && bolidName === "RT13e")
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
      currentBolidData.year > data.year ||
      (currentBolidData.name === "RT13e" && bolidName === "RT11b")
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

    setPreviousBolidData(currentBolidData);
    setCurrentBolidData(data);
  };

  useEffect(() => {
    fetchBolidData(currentBolidData.name);
  }, []);

  const handleChangeBolid = (bolidName: string) => {
    fetchBolidData(bolidName);
  };

  return (
    <div id="bolid" className="overflow-hidden">
      <div className="relative flex flex-col w-[200vw]">
        <Slider
          currentBolid={currentBolidData.name}
          onChangeBolid={handleChangeBolid}
        />
        <div
          className={`flex ${sameDirectionShift} ${isAnimating} ${
            displayRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <BolidContent {...currentBolidData} language={language} dict={dict} />
          {previousBolidData && (
            <BolidContent
              {...previousBolidData}
              language={language}
              dict={dict}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BolidSection;
