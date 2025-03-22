"use client";

import { IconType } from "react-icons";

interface IconLinkProps {
  href: string;
  icon: IconType;
  ariaLabel: string;
  black?: boolean;
}

const SocialIcons: React.FC<IconLinkProps> = ({
  href,
  icon: Icon,
  ariaLabel,
  black = false,
}) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded-full
        border-[1px]
        ${black ? "border-black text-black" : "border-white text-white"}
        transition
        duration-300
        hover:border-customRed
        hover:bg-customRed`}
      >
        <Icon size={16} />
      </div>
    </a>
  );
};

export default SocialIcons;
