"use client";

import Image from "next/image";
import Container from "../../Container";
import Button from "../../Button";
import Title from "../../Title";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface JoinusSectionProps {
  dict: {
    title: string;
    buttonRecruitment: string;
    buttonPartner: string;
  };
  sizeBig?: boolean;
}

const JoinusSection: React.FC<JoinusSectionProps> = ({
  dict,
  sizeBig = false,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  return (
    <div
      id="joinus"
      className={`${sizeBig ? "h-screen" : "h-[633px]"} relative`}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), radial-gradient(75% 75% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%)`,
        }}
      ></div>
      <div className="grid h-full grid-cols-[25%_40%_35%] relative">
        {/* Pierwsza kolumna */}
        <div className="relative h-full col-span-3 md:col-span-1">
          <Image
            src="/images/joinus/photo1.png"
            alt="Photo 1"
            layout="fill"
            objectFit="cover"
            objectPosition="left center"
          />
        </div>

        {/* Druga kolumna, podzielona na dwa wiersze */}
        <div className="relative h-full hidden md:flex flex-col">
          {/* Pierwszy wiersz w drugiej kolumnie */}
          <div className="relative flex-1">
            <Image
              src="/images/joinus/photo2.jpeg"
              alt="Photo 2"
              layout="fill"
              objectFit="cover"
              objectPosition="left 80%"
            />
          </div>

          {/* Drugi wiersz w drugiej kolumnie, podzielony na dwie kolumny */}
          <div className="relative flex-1 grid grid-cols-[2fr_1fr]">
            {/* Pierwsza kolumna w drugim wierszu */}
            <div className="relative">
              <Image
                src="/images/joinus/photo3.jpeg"
                alt="Photo 3"
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
              />
            </div>
            {/* Druga kolumna w drugim wierszu */}
            <div className="relative">
              <Image
                src="/images/joinus/photo4.jpeg"
                alt="Photo 4"
                layout="fill"
                objectFit="cover"
                objectPosition="left center"
              />
            </div>
          </div>
        </div>

        {/* Trzecia kolumna */}
        <div className="relative h-full hidden md:block">
          <Image
            src="/images/joinus/photo5.jpeg"
            alt="Photo 5"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-10">
        <Container>
          <div className="flex flex-col justify-center max-w-4xl">
            <div className="uppercase text-center">
              <Title wrap>{dict.title}</Title>
            </div>
            <div className="flex gap-4 mt-8">
              <Button
                label={dict.buttonRecruitment}
                onClick={() => {
                  if (sizeBig) {
                    loginModal.onOpen();
                  } else {
                    router.push(`/joinus`);
                  }
                }}
              />
              <Button
                outline
                label={dict.buttonPartner}
                onClick={() => {
                  if (sizeBig) {
                    router.push(`/`);
                  } else {
                    router.push(`/partners/joinus`);
                  }
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default JoinusSection;
