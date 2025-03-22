import Container from "@/app/components/Container";
import Title from "@/app/components/Title";
import DepartmentsAbout from "../about/DepartmentsAbout/DepartmentsAbout";
import { getDictionary } from "../dictionaries";
import ButtonsSection from "./buttonJoinUs";
import Timer from "./timer";

interface Props {
  params: {
    lang: string;
  };
}

const JoinUs: React.FC<Props> = async ({ params }) => {
  const language =
    params.lang === "pl" || params.lang === "en" ? params.lang : "en";
  const dict = await getDictionary(language);

  return (
    <div className="pt-[120px]">
      <div className="absolute opacity-5 right-0">
        <h1 className="text-[15rem] font-extrabold text-black uppercase leading-none">
          {dict.joinUs.pageTitle}
        </h1>
      </div>
      <Container>
        <div className="w-full flex flex-col items-center mt-16">
          <div className="mb-24 py-4 my-4 border-b-2 md:w-3/5 border-black text-center">
            <Title color="black">{dict.joinUs.becomeMember}</Title>
          </div>
          <Timer targetDate="2024-10-26T00:00:00" dict={dict.joinUs} />
          <ButtonsSection dict={dict.joinUs} />
        </div>
      </Container>
      <DepartmentsAbout dict={dict.departmentsAbout} lightMode />
    </div>
  );
};

export default JoinUs;
