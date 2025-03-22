"use client";

import Image from "next/image";
import React from "react";
import TileHeading from "./TileHeading";

interface UserCardProps {
  opiekun?: boolean;
  member: {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string | null;
    email?: string | null;
  };
  teamId: string;
  roleHistory: {
    [key: string]: {
      role: string;
      bolidName: string;
      department: string;
    }[];
  };
}

const UserCard: React.FC<UserCardProps> = ({
  opiekun,
  member,
  teamId,
  roleHistory,
}) => {
  const placeholderImage = "/images/TeamPlaceholder.jpg";

  const memberImageSrc = `https://storage.googleapis.com/pwr-rt/${
    teamId === "RT11b" ? "RT11" : teamId
  }/${encodeURIComponent(
    member.name[0].toUpperCase() + member.name.slice(1)
  )}%20${encodeURIComponent(
    member.surname[0].toUpperCase() + member.surname.slice(1)
  )}.jpg`;

  return (
    <div className="relative group w-full">
      <div className="absolute inset-0 z-0 w-full h-full rounded-full blur-3xl bg-white opacity-10"></div>
      <div className="relative rounded-md overflow-hidden bg-black pb-14">
        <div className=" absolute w-full h-[350px]">
          <Image
            src={placeholderImage}
            alt={`Zdjęcie pomocnicze`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative h-[350px]">
          <Image
            src={memberImageSrc}
            alt={`Zdjęcie ${member.name} ${member.surname}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <TileHeading
          opiekun={opiekun}
          member={member}
          roleHistory={roleHistory}
          phoneNumber={member.phoneNumber}
          email={member.email}
        />
      </div>
    </div>
  );
};

export default UserCard;
