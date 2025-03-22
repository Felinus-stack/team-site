"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Title from "@/app/components/Title";
import {
  FaBolt,
  FaBullhorn,
  FaChartBar,
  FaCube,
  FaDollarSign,
  FaLaptopCode,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import DepartmentElement from "./DepartmentElement";

type DepartmentsAboutProps = {
  lightMode?: boolean;
  dict: {
    title: string;
    interestedIn: string;
    mechanical: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    composites: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    marketing: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    software: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    electrical: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    vehiclePerformance: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    business: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
  };
};

const DepartmentsAbout: React.FC<DepartmentsAboutProps> = ({
  lightMode,
  dict,
}) => {
  const departments = [
    {
      name: "mechanical",
      description: dict.mechanical.description,
      responsibilities: dict.mechanical.responsibilities,
    },
    {
      name: "composites",
      description: dict.composites.description,
      responsibilities: dict.composites.responsibilities,
    },
    {
      name: "marketing",
      description: dict.marketing.description,
      responsibilities: dict.marketing.responsibilities,
    },
    {
      name: "software",
      description: dict.software.description,
      responsibilities: dict.software.responsibilities,
    },
    {
      name: "electrical",
      description: dict.electrical.description,
      responsibilities: dict.electrical.responsibilities,
    },
    {
      name: "vehicle performance",
      description: dict.vehiclePerformance.description,
      responsibilities: dict.vehiclePerformance.responsibilities,
    },
    {
      name: "business",
      description: dict.business.description,
      responsibilities: dict.business.responsibilities,
    },
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="department-section" className="relative bg-white">
      {!lightMode ? (
        <Container>
          <div className=" w-full mb-4 md:mb-6">
            <Title color="black">{dict.title}</Title>
          </div>
        </Container>
      ) : (
        <div className="mt-12 mb-6 text-center flex flex-col gap-6 ">
          <Title wrap color="black">
            {dict.interestedIn}
          </Title>
          <div className="w-full">
            <Container>
              <div className="flex gap-4 md:w-3/4 flex-wrap justify-center items-center">
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={IoSettings}
                    label="MECHANICAL"
                    onClick={() => handleScrollToSection("mechanical")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={FaCube}
                    label="COMPOSITES"
                    onClick={() => handleScrollToSection("composites")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={FaBullhorn}
                    label="MARKETING"
                    onClick={() => handleScrollToSection("marketing")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={FaLaptopCode}
                    label="SOFTWARE"
                    onClick={() => handleScrollToSection("software")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={FaBolt}
                    label="ELECTRICAL"
                    onClick={() => handleScrollToSection("electrical")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1 whitespace-nowrap">
                  <Button
                    black
                    icon={FaChartBar}
                    label="VEHICLE PERFORMANCE"
                    onClick={() => handleScrollToSection("vehicle performance")}
                  />
                </div>
                <div className="sm:max-w-72 flex-1">
                  <Button
                    black
                    icon={FaDollarSign}
                    label="BUSINESS"
                    onClick={() => handleScrollToSection("business")}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="flex flex-col">
          {departments.map((department, index) => (
            <DepartmentElement
              key={department.name}
              department={department.name}
              responsibilities={department.responsibilities}
              text={department.description}
              index={index}
              lightMode={lightMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsAbout;
