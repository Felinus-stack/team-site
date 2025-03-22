"use client";

import { useState } from "react";

import Text from "@/app/components/Text";
import { toast } from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import Button from "../../../components/Button";

interface Member {
  name: string;
  surname: string;
  currentRole: string;
  phoneNumber?: string | null;
  email?: string | null;
}

interface Role {
  role: string;
  bolidName: string;
  department: string;
}

interface ParamsTileHeading {
  opiekun?: boolean;
  member: Member;
  roleHistory: { [key: string]: Role[] };
  phoneNumber?: string | null;
  email?: string | null;
}

const handlePhone = (phoneNumber: string) => {
  return () => {
    window.location.href = `tel:${phoneNumber}`;
  };
};

const handleMail = (email: string) => {
  return () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = `mailto:${email}`;
    } else {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success(`E-mail skopiowany do schowka! ${email}`);
        })
        .catch((err) => {
          toast.error("Nie udało się skopiować maila.");
        });
    }
  };
};

const TileHeading: React.FC<ParamsTileHeading> = ({
  opiekun,
  member,
  roleHistory,
  phoneNumber,
  email,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          opiekun
            ? "bottom-0"
            : "capitalize absolute inset-0 translate-y-[82%] group-hover:opacity-[98%] group-hover:translate-y-0 group-hover:p-6 transition duration-300 ease-in-out"
        } absolute p-3 flex flex-col justify-between bg-black`}
      >
        <div className="absolute inset-0 z-0 w-full h-full rounded-full blur-3xl bg-white opacity-15"></div>
        <div
          className={` ${
            opiekun ? "" : "group-hover:my-1"
          }flex flex-col transition-all duration-300 ease-in-out z-30`}
        >
          <div
            className={` ${
              opiekun ? "" : "group-hover:text-center"
            } w-full duration-300 ease-in-out`}
          >
            <Text color="white" opacity1 small wide bold center>
              {member.name} {member.surname}
            </Text>
          </div>
          <div
            className={`${
              opiekun ? "" : "group-hover:text-center "
            }w-full transition-all duration-300 ease-in-out capitalize`}
          >
            <Text color="red" opacity1 bold center>
              {isHovered
                ? member.currentRole
                : member.currentRole.length > 28
                ? `${member.currentRole.slice(0, 28)}...`
                : member.currentRole}
            </Text>
          </div>
        </div>

        <div
          className={`${
            opiekun ? "hidden" : "flex"
          } relative py-4 my-4 items-center`}
        >
          <div className="absolute ml-[3px] h-full w-[2px] bg-neutral-400 rounded-lg"></div>
          <div className="flex flex-col gap-2 z-30 text-white max-h-28 w-full overflow-scroll overflow-x-hidden custom-scrollbar">
            {roleHistory[`${member.name} ${member.surname}`]?.map(
              (role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  <div className=" absolute w-2 h-2 rounded-full bg-white mt-2"></div>
                  <div className=" ml-5">
                    <Text center>
                      {role.bolidName} - {role.role}
                    </Text>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className=" flex flex-col w-full gap-4">
          {/* <ClientSideInteractionButton /> */}
          {phoneNumber && (
            <Button
              label="Zadzwoń do mnie!"
              onClick={handlePhone(phoneNumber)}
              outline
              icon={FiPhone}
              hoverText={phoneNumber}
            />
          )}
          {email && (
            <Button
              label="Napisz do mnie!"
              onClick={handleMail(email)}
              icon={FaEnvelope}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TileHeading;
