import FSSection from "@/app/components/Section/FSSection/FSSection";
import HistorySection from "@/app/components/Section/HistorySection/HistorySection";
import JoinusSection from "@/app/components/Section/JoinusSection/JoinusSection";
import SponsorsSection from "@/app/components/Section/SponsorsSection/SponsorsSection";
import { getDictionary } from "../dictionaries";
import DepartmentsAbout from "./DepartmentsAbout/DepartmentsAbout";
import FSAbout from "./FSAbout";
import GarageAbout from "./GarabeAbout";
import HeroAbout from "./HeroAbout";
import NavAbout from "./NavAbout";

interface AboutUsProps {
  params: {
    lang: string;
  };
}

const AboutUs: React.FC<AboutUsProps> = async ({ params }) => {
  const language =
    params.lang === "pl" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);

  return (
    <div className="">
      <HeroAbout dict={dict.heroAbout} />
      <NavAbout dict={dict.navAbout} />
      <GarageAbout dict={dict.garage} />
      <HistorySection dict={dict.historySection} aboutUs />
      <DepartmentsAbout dict={dict.departmentsAbout} />
      <FSSection dict={dict.fsSection} aboutUs />
      <FSAbout dict={dict.fsAbout} />
      <SponsorsSection />
      <JoinusSection dict={dict.joinusSection} />
    </div>
  );
};

export default AboutUs;
