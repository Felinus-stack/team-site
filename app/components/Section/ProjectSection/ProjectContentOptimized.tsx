"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../Button";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../Title";
import ProjectSpecs from "./ProjectSpecs";
import { getEnglishFileName } from "@/app/utils/projectMapping";
import { useState, useEffect } from "react";

interface ProjectData {
  name: string;
  EN_name?: string;
  year: string;
  short_description: string;
  EN_short_description: string;
  acceleration: string;
  mass: string;
  power: string;
  language: "ch" | "en";
  dict: any;
}

const ProjectContentOptimized: React.FC<ProjectData> = ({
  name,
  EN_name,
  year,
  short_description,
  EN_short_description,
  acceleration,
  mass,
  power,
  language,
  dict,
}) => {
  const router = useRouter();
  const path = usePathname();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const teamRedirect = (project: string) => {
    const currentLocale = path!.split("/")[1];
    router.push(`/${currentLocale}/team/${project}`);
  };
  
  const projectRedirect = (project: string) => {
    const currentLocale = path!.split("/")[1];
    router.push(`/${currentLocale}/projects/${project}#achievements`);
  };

  const renderName = (name: string) => {
    const lastChar = name.slice(-1);
    const isSpecialChar = lastChar === "e" || lastChar === "b";
    const isEnglish = /^[a-zA-Z\s]+$/.test(name);

    const formatEnglishName = (englishName: string) => {
      if (!isEnglish) return englishName;
      
      const words = englishName.split(' ');
      if (words.length > 4) {
        const midPoint = Math.ceil(words.length / 2);
        return (
          <>
            {words.slice(0, midPoint).join(' ')}
            <br />
            {words.slice(midPoint).join(' ')}
          </>
        );
      }
      return englishName;
    };

    return (
      <div className="uppercase flex items-baseline">
        <Title color="red" size={isEnglish ? "medium" : "normal"} wrap={isEnglish}>
          {isSpecialChar ? formatEnglishName(name.slice(0, -1)) : formatEnglishName(name)}
        </Title>
        {isSpecialChar && (
          <Title color="red" size="medium">
            {lastChar}
          </Title>
        )}
      </div>
    );
  };

  const description = language === "en" ? EN_short_description : short_description;
  const displayName = language === "en" ? (EN_name || name) : name;

  const formatButtonText = (teamText: string, projectName: string) => {
    if (language === "en") {
      return teamText;
    }
    return `${teamText} ${projectName}`;
  };

  // 重置图片加载状态当项目改变时
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [name]);

  const imageSrc = `/images/projects/${getEnglishFileName(name)}/${getEnglishFileName(name)}.png`;

  return (
    <div className="relative flex flex-col">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 py-4 sm:py-12 transition-all ease-out duration-500">
          <div className="flex justify-center items-center transition-all ease-out duration-500">
            <div>
              <Title size="subtitle" color="gray">
                {year}
              </Title>
              {renderName(displayName)}
              <div className="my-2 sm:my-6">
                <Text color="gray" small={language === "en"}>{description}</Text>
              </div>
              <div className="gap-4 mt-8 hidden lg:flex">
                <Button
                  label={dict.moreAboutProject}
                  onClick={() => projectRedirect(name)}
                />
                <Button
                  outline
                  label={formatButtonText(dict.meetTeam, displayName)}
                  onClick={() => teamRedirect(name)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-end items-center h-full w-full transition-all ease-out duration-500 relative">
            {/* 图片加载占位符 */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                  <div className="text-gray-500 text-sm">加载中...</div>
                </div>
              </div>
            )}
            
            {/* 图片加载错误占位符 */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center text-gray-500">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">图片加载失败</div>
                </div>
              </div>
            )}
            
            <Image
              src={imageSrc}
              alt={`${name} project image`}
              width={700}
              height={300}
              priority={true} // 优先加载
              quality={90} // 提高图片质量
              className={`transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              // 使用 sizes 优化响应式加载
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
            />
          </div>
          
          <div className="gap-2 md:gap-4 flex lg:hidden">
            <Button
              label={dict.moreAboutProject}
              onClick={() => projectRedirect(name)}
            />
            <Button
              outline
              label={formatButtonText(dict.meetTeam, displayName)}
              onClick={() => teamRedirect(name)}
            />
          </div>
        </div>
      </Container>
      <ProjectSpecs
        animate="opacity"
        acceleration={acceleration}
        mass={mass}
        power={power}
        language={language}
        dict={dict}
      />
    </div>
  );
};

export default ProjectContentOptimized;
