"use client";

import Button from "@/app/components/Button";
import { usePathname } from "next/navigation";
interface ButtonsSectionProps {
  dict: { buttonRecruitment: string; buttonPartner: string };
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({ dict }) => {
  const pathname = usePathname();

  const handleFormsClick = () => {
    const locale = pathname?.split("/")[1] === "en" ? "en" : "ch";
    window.location.assign(`/${locale}?assistant=recruitment`);
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/yuanjingteam", "_blank"); // Open Facebook in new tab
  };

  return (
    <div className="my-16 flex gap-4 md:w-1/3">
      <Button label={dict.buttonRecruitment} onClick={handleFormsClick} />
      <Button
        outline
        label={dict.buttonPartner}
        onClick={handleFacebookClick}
      />
    </div>
  );
};

export default ButtonsSection;
