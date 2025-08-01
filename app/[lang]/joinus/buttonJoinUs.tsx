"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface ButtonsSectionProps {
  dict: any;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({ dict }) => {
  const router = useRouter();

  const handleFormsClick = () => {
    window.open("https://docs.qq.com/form/page/DTHBlb1Z4b0h3VEtU", "_blank"); // Otwiera Facebooka w nowej karcie
  };

  const handleFacebookClick = () => {
    window.open("https://space.bilibili.com/99622895", "_blank"); // Otwiera Facebooka w nowej karcie
  };

  return (
    <div className="my-16 flex gap-4 md:w-1/3">
      <Button label="加入我们" onClick={handleFormsClick} />
      <Button
        outline
        label="了解更多"
        onClick={handleFacebookClick}
      />
    </div>
  );
};

export default ButtonsSection;