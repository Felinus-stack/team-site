"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type FooterLinkProps = {
  children: string;
  href?: string; // 可选的导航链接属性
  onClick?: MouseEventHandler<HTMLLIElement>; // 可选的自定义点击事件属性
};

const FooterLink: React.FC<FooterLinkProps> = ({ children, href, onClick }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      onClick(event); // 如果提供了自定义函数则执行
    } else if (href) {
      router.push(href); // 如果没有自定义函数则导航到指定链接
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
