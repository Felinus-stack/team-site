"use client";

import { AiOutlineMenu } from "react-icons/ai";
import {
  FaWeibo,
  FaWeixin,
} from "react-icons/fa";
import { BsPlayBtn } from "react-icons/bs";
import Avatar from "../../Avatar";
import { useCallback, useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import SocialIcons from "./SocialIcons";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LangButton from "./LangButton";

interface UserMenuProps {
  lang: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ lang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = useCallback(
    (path: string) => {
      const currentLocale = pathname!.split("/")[1];
      const newPath = `/${currentLocale}${path}`;
      router.push(newPath);
      setIsOpen(false);
    },
    [router, pathname]
  );

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-4">
        <div className="md:flex hidden items-center gap-4">
          <div className="social-responsive flex items-center gap-4 ml-4">
            <SocialIcons
              href="https://weibo.com/pwrracingteam"
              icon={FaWeibo}
              ariaLabel="微博"
            />
            <SocialIcons
              href="#"
              icon={FaWeixin}
              ariaLabel="微信公众号"
            />
            <SocialIcons
              href="https://space.bilibili.com/99622895"
              icon={BsPlayBtn}
              ariaLabel="哔哩哔哩"
            />
            <LangButton lang={lang} />
          </div>
        </div>
        <div
          onClick={toggleOpen}
          className=" userMenu-responsive
            p-2 ml-8
            border-[1px]
            border-white
            text-white
            hidden
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            duration-300
          hover:border-customRed
          hover:bg-customRed"
        >
          <AiOutlineMenu />
          <div className="hidden">
            <Avatar></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md  bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => handleMenuItemClick(`/`)} label="Home" />
            <MenuItem
              onClick={() => handleMenuItemClick(`/projects`)}
              label="Projects"
            />
            <MenuItem
              onClick={() => handleMenuItemClick(`/team/RT14e`)}
              label="Zespoł"
            />
            <MenuItem
              onClick={() => handleMenuItemClick(`/about`)}
              label="O nas"
            />
            <MenuItem
              onClick={() => handleMenuItemClick(`/partners`)}
              label="校企伙伴"
            />
            <MenuItem
              onClick={() => handleMenuItemClick(`/news`)}
              label="新闻资讯"
            />
            <MenuItem
              onClick={() => handleMenuItemClick(`/contact`)}
              label="联系我们"
            />
            <div className="w-full h-[1px] bg-black"></div>
            <div className="social-responsive flex items-center gap-4 my-2 mx-3 ">
              <SocialIcons
                black
                href="https://weibo.com/pwrracingteam"
                icon={FaWeibo}
                ariaLabel="微博"
              />
              <SocialIcons
                black
                href="#"
                icon={FaWeixin}
                ariaLabel="微信公众号"
              />
              <SocialIcons
                black
                href="https://space.bilibili.com/99622895"
                icon={BsPlayBtn}
                ariaLabel="哔哩哔哩"
              />
              <LangButton lang={lang} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
