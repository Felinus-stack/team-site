import { getProjectByProjectId } from "@/app/actions/getProjectByProjectId";
import Container from "@/app/components/Container";
import ProjectSectionFinal from "@/app/components/Section/ProjectSection/ProjectSectionFinal";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import { getEnglishFileName } from "@/app/utils/projectMapping";

interface Iparams {
  lang: string;
  projectId?: string;
}

type Locale = "ch" | "en";

const ProjectPage = async ({ params }: { params: Iparams }) => {
  const { lang, projectId } = params;
  const currentLocale = lang === "ch" || lang === "en" ? lang : "en";

  const dict = await getDictionary(currentLocale);
  const projectIdValue = projectId ?? "智能陪护";
  const project = await getProjectByProjectId(projectIdValue);

  if (!project) {
    return <p>未找到项目</p>;
  }

  return (
    <div className="flex flex-col pt-[100px]">
      <ProjectSectionFinal
        dict={dict.projectSection}
        language={currentLocale}
        presetProject={projectIdValue}
      />
      <div className=" w-full" id="achievements">
        <Container>
          <div className="flex flex-col w-full py-8 md:py-16">
            <Title size="big" color="black">
              {project.year}赛季成就
            </Title>

            <div className="flex">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 text-white">
                <div className="relative rounded overflow-hidden h-52 md:h-60">
                  <Image
                    src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/1.jpg`}
                    alt="比赛照片"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className=" absolute inset-0 bg-black opacity-50"></div>
                  <div className=" absolute inset-0 p-4 flex flex-col justify-between ">
                    <Title size="small">德国大学生方程式赛车大赛</Title>
                    <div className=" flex justify-between items-end ">
                      <div className=" ">
                        <Text extrasmall>总成绩第6名</Text>
                        <Text extrasmall>8字形绕桩第8名</Text>
                        <Text extrasmall>直线加速第11名</Text>
                        <Text extrasmall>工程设计第2名</Text>
                        <Text extrasmall>商业计划书第4名</Text>
                        <Text extrasmall>耐久赛第7名</Text>
                      </div>
                      <div className="">
                        <Image
                          src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/logo1.png`}
                          alt="比赛标志"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded overflow-hidden h-52 md:h-60">
                  <Image
                    src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/2.jpg`}
                    alt="Zdjęcie 2"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className=" absolute inset-0 bg-black opacity-50"></div>
                  <div className=" absolute inset-0 p-4 flex flex-col justify-between">
                    <Title size="small">阿尔卑斯-亚得里亚大学生方程式赛车大赛</Title>
                    <div className=" flex justify-between items-end">
                      <div className="">
                        <Text extrasmall>总成绩第6名</Text>
                        <Text extrasmall>8字形绕桩第8名</Text>
                        <Text extrasmall>直线加速第11名</Text>
                        <Text extrasmall>工程设计第2名</Text>
                        <Text extrasmall>商业计划书第4名</Text>
                        <Text extrasmall>耐久赛第7名</Text>
                      </div>
                      <div className="">
                        <Image
                          src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/logo2.png`}
                          alt="Zdjęcie 1"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded overflow-hidden h-52 md:h-60">
                  <Image
                    src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/3.jpg`}
                    alt="Zdjęcie 2"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className=" absolute inset-0 bg-black opacity-50"></div>
                  <div className=" absolute inset-0 p-4 flex flex-col justify-between">
                    <Title size="small">意大利大学生方程式赛车大赛</Title>
                    <div className=" flex justify-between items-end">
                      <div className="">
                        <Text extrasmall>总成绩第6名</Text>
                        <Text extrasmall>8字形绕桩第8名</Text>
                        <Text extrasmall>直线加速第11名</Text>
                        <Text extrasmall>工程设计第2名</Text>
                        <Text extrasmall>商业计划书第4名</Text>
                        <Text extrasmall>耐久赛第7名</Text>
                      </div>
                      <div className="">
                        <Image
                          src={`/images/projects/${getEnglishFileName(projectIdValue)}/images/zawody/logo3.png`}
                          alt="Zdjęcie 1"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="w-full">
        {project.parts.map((part, depIndex) => (
          <div
            key={part.partName}
            className={`${depIndex % 2 === 0 ? "bg-neutral-200" : "bg-white"}`}
          >
            <Container>
              <div
                className={`${
                  depIndex % 2 === 0 ? "" : " md:flex-row-reverse"
                } flex md:flex-row flex-col gap-0 md:gap-16 my-8 `}
              >
                <div className=" my-0 md:my-20 md:w-2/3">
                  <div className=" uppercase">
                    <Title size="big" color="black">
                      {part.partName}
                    </Title>
                  </div>
                  <div className=" my-4 md:my-6">
                    <Text color="black">{part.description}</Text>
                  </div>
                </div>
                <div className=" my-auto md:w-1/3">
                  <Image
                    src={`/images/projects/${getEnglishFileName(projectIdValue)}/parts/${part.partName}.png`}
                    alt={`${part.partName}部件图片`}
                    width={300} // 使用真实的图片比例
                    height={400} // 使用真实的图片比例
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
