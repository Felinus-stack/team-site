"use client";

import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Image from "next/image";
import Link from "next/link";

interface NavAboutProps {
  dict: {
    garage: string;
    teamHistory: string;
    departments: string;
    formulaStudent: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

const NavAbout: React.FC<NavAboutProps> = ({ dict }) => {
  return (
    <div className="pt-[40rem] bg-black">
      <div className="relative bg-white">
        <Container>
          <div className="w-full">
            <ul className="flex justify-center md:justify-start my-4 mb-8">
              <NavAboutItem scrollToId="garage-section">
                {dict.garage}
              </NavAboutItem>
              <NavAboutItem scrollToId="history-section">
                {dict.teamHistory}
              </NavAboutItem>
              <NavAboutItem scrollToId="department-section">
                {dict.departments}
              </NavAboutItem>
              <NavAboutItem scrollToId="formulastudent-section">
                {dict.formulaStudent}
              </NavAboutItem>
            </ul>
            <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-20 mt-0 md:mt-12">
              <div className="relative md:w-2/5 h-[20rem] md:h-auto">
                <Image
                  className=""
                  src="/images/poznaj_nas.jpg"
                  alt="bolid"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center 10%"
                />
              </div>
              <div className="md:w-3/5 flex flex-col gap-8">
                <Text color="black" bold>
                  {dict.paragraph1}
                </Text>
                <Text color="black">{dict.paragraph2}</Text>
                <Text color="black">{dict.paragraph3}</Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavAbout;

interface NavAboutItemProps {
  children: React.ReactNode;
  scrollToId: string;
}

const NavAboutItem: React.FC<NavAboutItemProps> = ({
  children,
  scrollToId,
}) => {
  return (
    <li className="first:pl-0 p-2 md:p-8 min-w-fit">
      <Link href={`#${scrollToId}`} passHref scroll>
        <div className="w-full text-left hover:text-customRed cursor-pointer duration-300 ease-in-out">
          <Text bold>{children}</Text>
        </div>
      </Link>
    </li>
  );
};
