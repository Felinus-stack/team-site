"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../Button";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../Title";
import BolidSpecs from "./BolidSpecs";

interface BolidData {
  name: string;
  year: string;
  short_description: string;
  EN_short_description: string;
  acceleration: string;
  mass: string;
  power: string;
  language: "pl" | "en";
  dict: any;
}

const BolidContent: React.FC<BolidData> = ({
  name,
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

  const teamRedirect = (bolid: string) => {
    const currentLocale = path!.split("/")[1];
    router.push(`/${currentLocale}/team/${bolid}`);
  };
  const bolidRedirect = (bolid: string) => {
    const currentLocale = path!.split("/")[1];
    router.push(`/${currentLocale}/bolid/${bolid}#achievements`);
  };

  const renderName = (name: string) => {
    const lastChar = name.slice(-1);
    const isSpecialChar = lastChar === "e" || lastChar === "b";

    return (
      <div className="uppercase flex items-baseline">
        <Title color="red">{isSpecialChar ? name.slice(0, -1) : name}</Title>
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

  return (
    <div className="relative flex flex-col">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 py-4 sm:py-12 transition-all ease-out duration-500">
          <div
            className={`flex justify-center items-center transition-all ease-out duration-500`}
          >
            <div>
              <Title size="subtitle" color="gray">
                {year}
              </Title>
              {renderName(name)}
              <div className="my-2 sm:my-6">
                <Text color="gray">{description}</Text>
              </div>
              <div className="gap-4 mt-8 hidden lg:flex">
                <Button
                  label={dict.moreAboutBolid}
                  onClick={() => bolidRedirect(name)}
                />
                <Button
                  outline
                  label={`${dict.meetTeam} ${name}`}
                  onClick={() => teamRedirect(name)}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col justify-end items-center h-full w-full transition-all ease-out duration-500`}
          >
            <Image
              src={`/images/bolid/${name}/${name}.png`}
              alt="bolid"
              layout="intrinsic"
              width={700}
              height={300}
            />
          </div>
          <div className="gap-2 md:gap-4 flex lg:hidden">
            <Button
              label={dict.moreAboutBolid}
              onClick={() => bolidRedirect(name)}
            />
            <Button
              outline
              label={`${dict.meetTeam} ${name}`}
              onClick={() => teamRedirect(name)}
            />
          </div>
        </div>
      </Container>
      <BolidSpecs
        animate={"opacity"}
        acceleration={acceleration}
        mass={mass}
        power={power}
        dict={dict}
      />
    </div>
  );
};

export default BolidContent;
