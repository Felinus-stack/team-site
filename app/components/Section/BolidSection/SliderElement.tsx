"use client";

import Title from "../../Title";

export interface SliderElementProps {
  date: number;
  bolid: string;
  onClick: (bolidName: string) => void;
  currentBolid: string;
  darkMode: boolean;
}

const SliderElement: React.FC<SliderElementProps> = ({
  date,
  bolid,
  onClick,
  currentBolid,
  darkMode,
}) => {
  const isActive = currentBolid === bolid;
  const handleClick = () => onClick(bolid);
  let subColor: "white" | "black" | "red" | "gray" | undefined = "black";
  let dotColor = "bg-neutral-300";
  if (darkMode) {
    subColor = "white";
    dotColor = "bg-neutral-500";
  }

  return (
    <div
      className={`relative flex flex-col items-center group cursor-pointer"`}
      onClick={handleClick}
    >
      <div
        className={`${
          isActive ? "bg-customRed opacity-100" : `${dotColor} opacity-90`
        } h-4 w-4 md:h-6 md:w-6 rounded-full z-10 group-hover:bg-customRed duration-300 ease-in-out`}
      ></div>
      <div
        className={`${
          isActive ? "opacity-100" : "opacity-70"
        } mt-2 flex flex-col text-center select-none uppercase`}
      >
        <Title size="small" color="red">
          {date}
        </Title>
        <Title size="medium" color={subColor}>
          {bolid}
        </Title>
      </div>
    </div>
  );
};

export default SliderElement;
