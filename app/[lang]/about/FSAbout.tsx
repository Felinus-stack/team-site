import Container from "@/app/components/Container";
import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import Image from "next/image";

interface FSAboutProps {
  dict: {
    dynamicCompetitions: string;
    staticCompetitions: string;
    competitions: {
      acceleration: {
        title: string;
        text: string;
      };
      skidPad: {
        title: string;
        text: string;
      };
      autocross: {
        title: string;
        text: string;
      };
      endurance: {
        title: string;
        text: string;
      };
      cost: {
        title: string;
        text: string;
      };
      engineering: {
        title: string;
        text: string;
      };
      business: {
        title: string;
        text: string;
      };
    };
  };
}

const FSAbout: React.FC<FSAboutProps> = ({ dict }) => {
  const { dynamicCompetitions, staticCompetitions, competitions } = dict;

  return (
    <div className=" relative bg-white">
      <Container>
        <div className="w-full">
          <div className="">
            <Title wrap size="medium" color="black">
              {dynamicCompetitions}
            </Title>
            <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-6 my-6">
              <FlipCard
                height={"h-60"}
                src="/images/FS/acceleration.png"
                title={competitions.acceleration.title}
                text={competitions.acceleration.text}
              />
              <FlipCard
                height={"h-60"}
                src="/images/FS/skipad.png"
                title={competitions.skidPad.title}
                text={competitions.skidPad.text}
              />
              <FlipCard
                height={"h-60"}
                src="/images/FS/autocross.png"
                title={competitions.autocross.title}
                text={competitions.autocross.text}
              />
              <FlipCard
                height={"h-60"}
                src="/images/FS/endurance.png"
                title={competitions.endurance.title}
                text={competitions.endurance.text}
              />
            </div>
          </div>
          <div className=" my-8 md:my-12">
            <Title wrap size="medium" color="black">
              {staticCompetitions}
            </Title>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
              <FlipCard
                height={"h-56 md:h-80"}
                src="/images/FS/cost.png"
                title={competitions.cost.title}
                text={competitions.cost.text}
              />
              <FlipCard
                height={"h-56 md:h-80"}
                src="/images/FS/engineering.png"
                title={competitions.engineering.title}
                text={competitions.engineering.text}
              />
              <FlipCard
                height={"h-56 md:h-80"}
                src="/images/FS/business.png"
                title={competitions.business.title}
                text={competitions.business.text}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FSAbout;

interface FlipCardProps {
  text: string;
  src: string;
  title: string;
  height: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ text, src, title, height }) => {
  return (
    <div className={`flip-card ${height} relative rounded-md`}>
      <div className="flip-card-inner">
        <div className="flip-card-front relative w-full h-full">
          <Image src={src} alt={title} layout="fill" objectFit="fill" />
        </div>
        <div className=" text-center flip-card-back absolute inset-0 z-20 flex flex-col justify-center items-center gap-4 rounded-md p-8 bg-neutral-200">
          <Title wrap color="black" size="small">
            {title}
          </Title>
          <Text extrasmall>{text}</Text>
        </div>
      </div>
    </div>
  );
};
