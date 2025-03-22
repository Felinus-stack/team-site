"use client";
import { useMemo } from "react";

interface TextProps {
  children: React.ReactNode;
  small?: boolean;
  medium?: boolean;
  main?: boolean;
  extrasmall?: boolean;
  wide?: boolean;
  bold?: boolean;
  center?: boolean;
  opacity1?: boolean;
  color?: "white" | "black" | "red" | "gray";
  hoverColor?: "white" | "black" | "red" | "gray";
  alignCenter?: boolean;
  right?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  small,
  medium,
  main,
  extrasmall,
  wide,
  bold,
  center,
  opacity1,
  color,
  hoverColor,
  alignCenter,
  right,
}) => {
  const colorClass = () => {
    switch (color) {
      case "black":
        return "text-black";
      case "red":
        return "text-customRed";
      case "gray":
        return "text-gray-700";
      case "white":
        return "text-white";
      default:
        return "";
    }
  };

  // Określanie klasy rozmiaru tekstu
  const sizeClass = () => {
    if (small) return "text-md md:text-xl";
    if (medium) return "text-xl md:text-3xl";
    if (main) return "text-[14px] md:text-[14px]";
    if (extrasmall) return "text-xs";
    return "text-xs sm:text-base sm:leading-5";
  };

  const hoverColorClass = useMemo(() => {
    if (!hoverColor) return ""; // Jeśli hoverColor nie jest podany, nie dodajemy klasy
    switch (hoverColor) {
      case "black":
        return "group-hover:text-black";
      case "red":
        return "group-hover:text-customRed";
      case "gray":
        return "group-hover:text-gray-500";
      default:
        return "group-hover:text-white";
    }
  }, [hoverColor]);

  return (
    <p
      className={`
      font-openSans
      duration-300 ease-in-out
      ${hoverColorClass}
      ${colorClass()}
      ${sizeClass()}
      ${opacity1 ? "text-opacity-100" : "text-opacity-70"}
      ${center ? "justify-center" : "text-justify"}
      ${right ? "text-right" : ""}
      ${wide ? "" : "tracking-tighter"}
      ${bold ? "font-bold" : "font-normal"}
      ${alignCenter ? "text-center" : ""}
    `}
    >
      {children}
    </p>
  );
};
// ??? leading-4 wide
export default Text;
