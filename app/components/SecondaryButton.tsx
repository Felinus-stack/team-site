"use client";

import { useRouter } from "next/navigation";

interface IconLinkProps {
  buttonText: string;
  darkMode?: boolean;
  to: string;
}

const SecondaryButton: React.FC<IconLinkProps> = ({
  buttonText,
  darkMode = false,
  to,
}) => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push(to);
  };
  return (
    <button
      className="
      items-center
      relative
      flex
      pr-12
      md:py-3 py-2
      pl-0
      rounded
      transition-all
      duration-300
      group"
      onClick={handleNavigation}
    >
      <span
        className={`${
          darkMode ? "text-white" : "text-black"
        } transition-colors duration-300 relative z-10 group-hover:text-customRed text-xs md:text-base`}
      >
        {buttonText}
        <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-customRed group-hover:w-full transition-all duration-300 ease-in-out"></div>
      </span>
      <svg
        className="absolute right-4 md:right-0 bottom-[-1] transition-all duration-300 ease-in-out rotate-0 group-hover:translate-x-4 group-hover:opacity-0 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="17.2056"
          cy="17.2056"
          r="16.7056"
          stroke={`${darkMode ? "white" : "black"}`}
          className="group-hover:stroke-customRed group-hover:stroke-[2px]"
        />
        <path
          d="M15.7715 14.3379L19.356 17.9224L15.7715 21.5069"
          stroke={`${darkMode ? "white" : "black"}`}
          className="group-hover:stroke-customRed group-hover:stroke-[2px]"
        />
      </svg>
    </button>
  );
};

export default SecondaryButton;
