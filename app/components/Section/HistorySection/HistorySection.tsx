"use client";

import Image from "next/image";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../Title";
import Counter from "./Counter";
import SecondaryButton from "../../SecondaryButton";

type HistorySectionProps = {
  aboutUs?: boolean;
  dict: {
    title: string;
    subtitle: string;
    members: string;
    membersDescription: string;
    projects: string;
    projectsDescription: string;
    achievements: string;
    achievementsDescription: string;
    description: string;
    buttonText: string;
  };
};

const HistorySection: React.FC<HistorySectionProps> = ({ aboutUs, dict }) => {
  return (
    <div id="history-section" className="relative bg-white">
      <Container>
        <div className="my-8 md:my-28">
          <div className="md:mb-8 hidden md:block">
            {aboutUs && <Title color="black">{dict.title}</Title>}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20 ">
            <div className="h-[22rem] lg:h-full relative flex justify-center items-center order-3 lg:order-1">
              <Image
                className=""
                src="/images/history.jpg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
                objectPosition="left center"
              />
            </div>
            <div
              className={`${
                aboutUs ? "flex-col-reverse" : "flex-col"
              } flex order-2`}
            >
              <div
                className={`${
                  aboutUs ? "" : "mb-8 md:mb-12"
                } flex justify-between text-center w-auto`}
              >
                <div className="flex flex-col">
                  <Counter targetNumber={90} size="bigger" color="red">
                    0
                  </Counter>
                  <div className=" text-lg">
                    <Text center bold color="red" wide>
                      {dict.members}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {dict.membersDescription}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter targetNumber={15} size="bigger" color="red">
                    0
                  </Counter>
                  <div className=" text-lg">
                    <Text center bold color="red" wide>
                      {dict.projects}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {dict.projectsDescription}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter targetNumber={21} size="bigger" color="red">
                    0
                  </Counter>
                  <div className=" text-lg">
                    <Text center bold color="red" wide>
                      {dict.achievements}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {dict.achievementsDescription}
                  </Text>
                </div>
              </div>
              <div className="">
                <Title wrap size="big" color="black">
                  {dict.subtitle}
                </Title>
                <div className=" my-2">
                  <Text color="gray">{dict.description}</Text>
                </div>
                {!aboutUs && (
                  <SecondaryButton
                    to="/about#history-section"
                    buttonText={dict.buttonText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HistorySection;
