"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../Button";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../Title";
import ProjectSpecs from "./ProjectSpecs";

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

const ProjectContent: React.FC<ProjectData> = ({
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

    // 为长英文名称添加换行
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

  const description =
    language === "en" ? EN_short_description : short_description;
  
  const displayName = language === "en" ? (EN_name || name) : name;

  // 为按钮文字格式化 - 英文模式下只显示项目名称
  const formatButtonText = (teamText: string, projectName: string) => {
    if (language === "en") {
      return teamText; // 英文模式下只显示 "MEET THE TEAM"
    }
    return `${teamText} ${projectName}`;
  };

  return (
    <div className="relative flex flex-col">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 py-4 sm:py-12 transition-all ease-out duration-500">
          <div
            className={`flex justify-center items-center transition-all ease-out duration-500`}
          >
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
          <div
            className={`flex flex-col justify-end items-center h-full w-full transition-all ease-out duration-500`}
          >
            <Image
              src={`/images/projects/${name}/${name}.png`}
              alt="project"
              layout="intrinsic"
              width={700}
              height={300}
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
        animate={"opacity"}
        acceleration={acceleration}
        mass={mass}
        power={power}
        language={language}
        dict={dict}
      />
    </div>
  );
};

export default ProjectContent;
