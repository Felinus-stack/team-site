"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import Button from "../Button";

interface SideBarProps {
  dict: {
    media: string;
    recruitment: string;
  };
}

const SideBar: React.FC<SideBarProps> = ({ dict }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${
        isScrolled ? "gap-4 bottom-1/2" : "gap-48 bottom-1/3"
      } fixed flex flex-col right-0 z-20 transform duration-700`}
    >
      <div
        className={`${
          isScrolled ? "" : "-rotate-90 translate-x-1/2"
        } duration-300 hidden md:block`}
      >
        <div
          className={`w-56 transition-transform duration-1000 ease-in-out ${
            isScrolled
              ? "translate-x-3/4 hover:translate-x-1/4"
              : "-translate-y-1/3"
          }`}
        >
          <Button
            icon={FaCamera}
            label={dict.media}
            onClick={() => router.push(`/partners/joinus`)}
          />
        </div>
      </div>
      <div
        className={`${
          isScrolled ? "" : "-rotate-90 translate-x-1/2"
        } duration-300`}
      >
        <div
          className={`w-56 transition-transform duration-1000 ease-in-out ${
            isScrolled
              ? "translate-x-3/4 hover:translate-x-1/4"
              : "-translate-y-1/3"
          }`}
        >
          <Button
            icon={MdPerson}
            outline
            label={dict.recruitment}
            onClick={() => router.push("/joinus")}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
