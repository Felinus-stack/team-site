import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface LangButtonProps {
  lang: string;
  black?: boolean;
}

const LangButton: React.FC<LangButtonProps> = ({ lang, black = false }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    if (pathname) {
      const newLang = lang === "pl" ? "en" : "pl";
      const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
      router.push(newPath);
    }
  };

  const flag = lang === "pl" ? "en" : "pl";
  const altText = lang === "pl" ? "US flag" : "Polish flag";

  return (
    <div
      onClick={handleLanguageChange}
      className={`
        flex relative
        items-center
        justify-center
        w-8
        h-8
        rounded-full
        border-[2px]
        ${black ? "border-black text-black" : "border-white text-white"}
        transition
        duration-300
        hover:border-customRed
        hover:bg-customRed cursor-pointer`}
    >
      <Image
        src={`/images/Flaga${flag}.png`}
        alt={altText}
        fill
        className="rounded-full"
      />
    </div>
  );
};

export default LangButton;
