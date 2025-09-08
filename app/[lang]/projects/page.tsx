import { getDictionary } from "../dictionaries";
import Container from "@/app/components/Container";
import ProjectSectionFinal from "@/app/components/Section/ProjectSection/ProjectSectionFinal";

interface Iparams {
  lang: string;
}

type Locale = "ch" | "en";

const ProjectsPage = async ({ params }: { params: Iparams }) => {
  const { lang } = params;
  const currentLocale = lang === "ch" || lang === "en" ? lang : "en";

  const dict = await getDictionary(currentLocale);

  return (
    <div className="flex flex-col pt-[100px]">
      <ProjectSectionFinal
        dict={dict.projectSection}
        language={currentLocale}
      />
    </div>
  );
};

export default ProjectsPage;
