"use client";

import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { useState } from "react";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  black?: boolean;
  icon?: IconType;
  hoverText?: string; // Opcjonalny prop dla tekstu wyświetlanego podczas hovera
}

const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return "";
  const countryCode = phoneNumber.slice(0, 3);
  const restOfNumber = phoneNumber.slice(3);
  const formattedNumber = restOfNumber.replace(/(\d{3})(?=\d)/g, "$1 ");
  return `${countryCode} ${formattedNumber}`;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  black,
  icon: Icon,
  hoverText,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition duration-300 ease-in-out
        w-full min-w-fit
        ${black ? "bg-black" : outline ? "bg-white" : "bg-customRed"}
        ${black ? "px-12" : "px-2"}
        ${
          black ? "border-black" : outline ? "border-black" : "border-customRed"
        }
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-2 md:py-3"}
        ${small ? "text-sm" : "text-sm md:text-md"}
        ${small ? " font-light" : "font-semibold"}
        ${small ? " border-[1px]" : " border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="absolute left-2 top-[6px] md:left-3 md:top-[10px]"
        />
      )}
      <span
        className={`transition-opacity duration-300 ease-in-out ${
          isHovered && hoverText ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      {hoverText && (
        <span
          className={`transition-opacity duration-300 ease-in-out absolute inset-0 flex items-center justify-center ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {hoverText.includes("+") ? formatPhoneNumber(hoverText) : hoverText}
        </span>
      )}
    </button>
  );
};

export default Button;
