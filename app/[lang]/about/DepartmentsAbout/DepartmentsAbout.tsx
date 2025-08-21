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
    frontend: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    backend: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    product: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    design: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    operates: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    mobile: {
      description: string;
      responsibilities: { text: string; icon: string }[];
    };
    algorithm: {
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
      name: "frontend",
      description: dict.frontend.description,
      responsibilities: dict.frontend.responsibilities,
    },
    {
      name: "backend",
      description: dict.backend.description,
      responsibilities: dict.backend.responsibilities,
    },
    {
      name: "product",
      description: dict.product.description,
      responsibilities: dict.product.responsibilities,
    },
    {
      name: "design",
      description: dict.design.description,
      responsibilities: dict.design.responsibilities,
    },
    {
      name: "operates",
      description: dict.operates.description,
      responsibilities: dict.operates.responsibilities,
    },
    {
      name: "mobile",
      description: dict.mobile.description,
      responsibilities: dict.mobile.responsibilities,
    },
    {
      name: "algorithm",
      description: dict.algorithm.description,
      responsibilities: dict.algorithm.responsibilities,
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
              <div className="flex gap-4 max-w-6xl mx-auto flex-wrap justify-center items-center">
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={IoSettings}
                    label="前端"
                    onClick={() => handleScrollToSection("frontend")}
                  />
                </div>
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={FaCube}
                    label="后端"
                    onClick={() => handleScrollToSection("backend")}
                  />
                </div>
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={FaBullhorn}
                    label="产品"
                    onClick={() => handleScrollToSection("product")}
                  />
                </div>
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={FaLaptopCode}
                    label="设计"
                    onClick={() => handleScrollToSection("design")}
                  />
                </div>
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={FaBolt}
                    label="运营"
                    onClick={() => handleScrollToSection("operates")}
                  />
                </div>
                <div className="min-w-36 max-w-44 flex-1">
                  <Button
                    black
                    icon={FaChartBar}
                    label="移动端"
                    onClick={() => handleScrollToSection("mobile")}
                  />
                </div>
                <div className="min-w-32 max-w-40 flex-1">
                  <Button
                    black
                    icon={FaDollarSign}
                    label="算法"
                    onClick={() => handleScrollToSection("algorithm")}
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
