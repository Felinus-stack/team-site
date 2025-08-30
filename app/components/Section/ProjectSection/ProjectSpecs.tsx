"use client";

import Text from "../../Text";

interface ProjectSpecsProps {
  animate: string;
  acceleration: string;
  power: string;
  mass: string;
  language: "ch" | "en";
  dict: any;
}
const ProjectSpecs: React.FC<ProjectSpecsProps> = ({
  animate,
  acceleration,
  power,
  mass,
  language,
  dict,
}) => {
  // 英文版本的技术规格映射
  const englishSpecs = {
    // 参与人数映射
    "5人": "5 Members",
    "6人": "6 Members", 
    "7人": "7 Members",
    "8人": "8 Members",
    "10人": "10 Members",
    "4人": "4 Members",
    
    // 技术架构映射
    "多模态交互": "Multi-modal Interaction",
    "微服务架构": "Microservices Architecture",
    "云原生架构": "Cloud-native Architecture",
    "物联网架构": "IoT Architecture",
    "分布式架构": "Distributed Architecture", 
    "单体架构": "Monolithic Architecture",
    "大数据架构": "Big Data Architecture",
    "前后端分离": "Frontend-Backend Separation",
    
    // 开发周期映射
    "6个月": "6 Months",
    "4个月": "4 Months",
    "3个月": "3 Months", 
    "8个月": "8 Months",
    "5个月": "5 Months",
    "2个月": "2 Months"
  };

  // 根据语言获取显示文本
  const getDisplayText = (chineseText: string) => {
    if (language === "en") {
      return englishSpecs[chineseText] || chineseText;
    }
    return chineseText;
  };
  return (
    <div className="">
      <div
        className={`${animate} py-2 relative w-[100vw] flex justify-between bg-neutral-700 transition duration-200 ease-out`}
      >
        <div className="bg-neutral-800 pl-[calc((100vw-var(--container-width))/3)] z-10 hidden lg:flex justify-between items-center pr-8 ">
          <div className=" flex flex-col">
            <Text bold medium color="white" opacity1>
              {dict.specyfikacja}
            </Text>
            <Text right center bold medium color="white" opacity1>
              {dict.projektu}
            </Text>
          </div>
          <svg
            className="w-16 h-8 lg:w-36 lg:h-36"
            viewBox="0 0 89 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.2096 2.07734C24.715 0.612594 27.1229 0.645578 28.5876 2.15101L44.8595 18.8749L28.5876 35.5988C27.1229 37.1043 24.715 37.1373 23.2096 35.6725C21.7042 34.2078 21.6712 31.7999 23.1359 30.2945L34.2469 18.8749L23.1359 7.45534C21.6712 5.9499 21.7042 3.54209 23.2096 2.07734Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.2682 2.07734C46.7736 0.612594 49.1814 0.645578 50.6462 2.15101L66.9181 18.8749L50.6462 35.5988C49.1814 37.1043 46.7736 37.1373 45.2682 35.6725C43.7628 34.2078 43.7298 31.7999 45.1945 30.2945L56.3055 18.8749L45.1945 7.45534C43.7298 5.9499 43.7628 3.54209 45.2682 2.07734Z"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex justify-center items-center gap-2 pl-4 lg:pl-0">
          <svg
            className="w-14 h-10 md:w-20 md:h-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z"
              fill="white"
            />
            <path
              d="M8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6Z"
              fill="white"
            />
            <path
              d="M8 13C10.7614 13 13 15.2386 13 18V20H3V18C3 15.2386 5.23858 13 8 13Z"
              fill="white"
            />
            <path
              d="M16 13C18.7614 13 21 15.2386 21 18V20H14V18.5C14 16.567 12.433 15 10.5 15H10C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13H16Z"
              fill="white"
            />
          </svg>
          <div className="flex flex-col justify-center max-w-52">
            <h1
              className={`text-white font-akiraExpanded text-md md:text-3xl font-extrabold leading-tight`}
            >
              {getDisplayText(acceleration)}
            </h1>
            <h2
              className={`hidden md:block text-customRed font-akiraExpanded text-2xl font-extrabold leading-tight`}
            >
              {dict.TXTacceleration}
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <svg
            className="w-14 h-14 md:w-24 md:h-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="white"
            />
            <path
              d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
              fill="white"
            />
          </svg>
          <div className="flex flex-col justify-center max-w-52">
            <h1
              className={`text-white font-akiraExpanded text-md md:text-3xl font-extrabold leading-tight`}
            >
              {getDisplayText(power)}
            </h1>
            <h2
              className={`hidden min-w-fit md:block text-customRed font-akiraExpanded text-2xl font-extrabold leading-tight`}
            >
              {dict.TXTpower}
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center pr-4 lg:pr-[calc((100vw-var(--container-width))/3)] gap-2">
          <svg
            className="w-12 h-12 md:w-20 md:h-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 3H22V5H2V3Z"
              fill="white"
            />
            <path
              d="M2 7H22V9H2V7Z"
              fill="white"
            />
            <path
              d="M2 11H22V13H2V11Z"
              fill="white"
            />
            <path
              d="M2 15H22V17H2V15Z"
              fill="white"
            />
            <path
              d="M2 19H22V21H2V19Z"
              fill="white"
            />
            <path
              d="M6 4V8L10 6L6 4Z"
              fill="#D41E3E"
            />
            <path
              d="M6 12V16L10 14L6 12Z"
              fill="#D41E3E"
            />
          </svg>
          <div className="flex flex-col justify-center max-w-52">
            <h1
              className={`text-white font-akiraExpanded text-md md:text-3xl font-extrabold leading-tight`}
            >
              {getDisplayText(mass)}
            </h1>
            <h2
              className={`hidden md:block text-customRed font-akiraExpanded text-2xl font-extrabold leading-tight`}
            >
              {dict.TXTmass}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSpecs;
