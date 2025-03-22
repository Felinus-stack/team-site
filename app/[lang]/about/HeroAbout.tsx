"use client";

import Title from "@/app/components/Title";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroAboutProps {
  dict: {
    title: string;
  };
}

const HeroAbout: React.FC<HeroAboutProps> = ({ dict }) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className=" fixed w-full grid-cols-1 grid md:grid-cols-2 h-[40rem]"
      style={{ transform: `translateY(${offsetY * -0.1}px)` }}
    >
      <div className="pt-[100px] opacity-90 md:opacity-100 bg-neutral-900 z-10">
        <div className="h-full p-20">
          <div className="flex flex-col justify-between h-full max-w-[400px]">
            <Title wrap color="white">
              {dict.title}
            </Title>
            <svg
              width="49"
              height="119"
              viewBox="0 0 49 119"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.5836 1.51323C48.5093 3.49241 48.466 6.65794 46.4868 8.58363L24.5 29.9762L2.51322 8.58363C0.534034 6.65794 0.490673 3.49241 2.41637 1.51323C4.34206 -0.465958 7.50759 -0.509321 9.48677 1.41637L24.5 16.0238L39.5132 1.41637C41.4924 -0.50932 44.6579 -0.465956 46.5836 1.51323Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.5836 29.5132C48.5093 31.4924 48.466 34.6579 46.4868 36.5836L24.5 57.9762L2.51322 36.5836C0.534034 34.6579 0.490673 31.4924 2.41637 29.5132C4.34206 27.534 7.50759 27.4907 9.48677 29.4164L24.5 44.0238L39.5132 29.4164C41.4924 27.4907 44.6579 27.534 46.5836 29.5132Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.5836 59.5132C48.5093 61.4924 48.466 64.6579 46.4868 66.5836L24.5 87.9762L2.51322 66.5836C0.534034 64.6579 0.490673 61.4924 2.41637 59.5132C4.34206 57.534 7.50759 57.4907 9.48677 59.4164L24.5 74.0238L39.5132 59.4164C41.4924 57.4907 44.6579 57.534 46.5836 59.5132Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.5836 89.5132C48.5093 91.4924 48.466 94.6579 46.4868 96.5836L24.5 117.976L2.51322 96.5836C0.534034 94.6579 0.490673 91.4924 2.41637 89.5132C4.34206 87.534 7.50759 87.4907 9.48677 89.4164L24.5 104.024L39.5132 89.4164C41.4924 87.4907 44.6579 87.534 46.5836 89.5132Z"
                stroke="#E9E9E9"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" absolute md:relative h-[40rem] w-screen md:w-full z-0">
        <Image
          className=""
          src="/images/history.jpg"
          alt="bolid"
          layout="fill"
          objectFit="cover"
          objectPosition="center 20%"
        />
      </div>
    </div>
  );
};

export default HeroAbout;
