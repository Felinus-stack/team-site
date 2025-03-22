"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ClosestSectionContext } from "./ClosestSectionContext";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const closestSectionId = useContext(ClosestSectionContext);

  const checkScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleNavigation = useCallback(() => {
    const currentLocale = pathname!.split("/")[1];
    const newPath = `/${currentLocale}${to}`;
    router.push(newPath);
  }, [router, pathname, to]);

  return (
    <li
      className={`cursor-pointer relative group text-lg transition duration-300 h-full flex items-center px-3 ${
        to === closestSectionId ? "text-customRed" : "text-white"
      } hover:text-customRed`}
      onClick={handleNavigation}
    >
      <p className="whitespace-nowrap">{children}</p>
      {isScrolled && (
        <span
          className={`${
            to === closestSectionId ? "scale-x-100" : ""
          } h-[3px] bg-customRed scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left block absolute bottom-0 left-0 right-0`}
        ></span>
      )}
    </li>
  );
};

export default NavItem;
