"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type FooterLinkProps = {
  children: string;
  href?: string; // Optional href prop for navigation
  onClick?: MouseEventHandler<HTMLLIElement>; // Optional onClick prop for custom functions
};

const FooterLink: React.FC<FooterLinkProps> = ({ children, href, onClick }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      onClick(event); // Execute the custom function if provided
    } else if (href) {
      router.push(href); // Navigate to the provided href if no custom function
    }
  };

  return (
    <li
      onClick={handleClick}
      className="text-opacity-70 cursor-pointer py-1 whitespace-nowrap duration-300 hover:text-customRed"
    >
      {children}
    </li>
  );
};

export default FooterLink;
