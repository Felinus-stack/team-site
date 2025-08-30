import { getDictionary } from "@/app/[lang]/dictionaries";
import { Metadata } from "next";
import ClientOnly from "../components/ClientOnly";
import ProjectSectionFinal from "../components/Section/ProjectSection/ProjectSectionFinal";
import DepartmentsSubsection from "../components/Section/DepartmentsSubsection/DepartmentsSubsection";
import FSSection from "../components/Section/FSSection/FSSection";
import HeroSection from "../components/Section/HeroSection/HeroSection";
import HistorySection from "../components/Section/HistorySection/HistorySection";
import JoinusSection from "../components/Section/JoinusSection/JoinusSection";
import NewsSection from "../components/Section/NewsSection/NewsSection";
import SponsorsSection from "../components/Section/SponsorsSection/SponsorsSection";
import TeamSection from "../components/Section/TeamSection/TeamSection";
import StructuredData from "../components/SEO/StructuredData";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const language = params.lang === "ch" || params.lang === "en" ? params.lang : "en";
  
  if (language === "ch") {
    return {
      title: "源境团队 - 专业软件开发与技术创新团队",
      description: "源境软件工作室成立于2018年，专注于Go/Python/Java编程、Web开发和算法竞赛。已完成15+校园项目，蓝桥杯获奖团队。",
      keywords: "源境团队,软件开发,编程团队,算法竞赛,Web开发,Go语言,Python,Java,蓝桥杯,技术创新",
      openGraph: {
        title: "源境团队 - 专业软件开发与技术创新团队",
        description: "源境软件工作室成立于2018年，专注于软件开发与技术创新的专业学生团队。",
        locale: "zh_CN",
      },
    };
  } else {
    return {
      title: "Yuanjing Team - Professional Software Development & Innovation",
      description: "Yuanjing Team founded in 2018, focusing on Go/Python/Java programming, web development, and algorithm competitions. 15+ campus projects completed.",
      keywords: "Yuanjing Team,software development,programming team,algorithm competitions,web development,Go,Python,Java,Blue Bridge Cup",
      openGraph: {
        title: "Yuanjing Team - Professional Software Development & Innovation",
        description: "Yuanjing Team founded in 2018, professional student team focusing on software development and technological innovation.",
        locale: "en_US",
      },
    };
  }
}

interface PageProps {
  params: {
    lang: string;
  };
}
const Home: React.FC<PageProps> = async ({ params }) => {
  const language =
    params.lang === "ch" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);

  return (
    <ClientOnly>
      <div className="">
        <StructuredData type="organization" data={{}} />
        <StructuredData type="website" data={{}} />
        <HeroSection dict={dict.heroSection} language={language} />
        <DepartmentsSubsection />
        <ProjectSectionFinal dict={dict.projectSection} language={language} />
        <FSSection dict={dict.fsSection} />
        <TeamSection dict={dict.teamSection} />
        <HistorySection dict={dict.historySection} />
        <JoinusSection dict={dict.joinusSection} />
        <SponsorsSection />
        <NewsSection dict={dict.newsControls} />
      </div>
    </ClientOnly>
  );
};

export default Home;
