"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TileHeading from "./TileHeading";

interface ClientUserCardProps {
  opiekun?: boolean;
  member: {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string;
    email?: string;
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

const ClientUserCard: React.FC<ClientUserCardProps> = ({
  opiekun,
  member,
  teamId,
  roleHistory,
}) => {
  const placeholderImage = "/images/TeamPlaceholder.jpg";
  const [imageSrc, setImageSrc] = useState(placeholderImage);

  useEffect(() => {
    const memberImageSrc = `https://storage.googleapis.com/pwr-rt/${
      teamId === "RT11b" ? "RT11" : teamId
    }/${encodeURIComponent(
      member.name[0].toUpperCase() + member.name.slice(1)
    )}%20${encodeURIComponent(
      member.surname[0].toUpperCase() + member.surname.slice(1)
    )}.jpg`;

    // Check if the image exists
    fetch(memberImageSrc)
      .then((res) => {
        if (res.ok) {
          setImageSrc(memberImageSrc);
        } else {
          setImageSrc(placeholderImage);
        }
      })
      .catch(() => {
        setImageSrc(placeholderImage);
      });
  }, [member.name, member.surname, teamId]);

  return (
    <div className="relative group">
      <div className="absolute inset-0 z-0 w-full h-full rounded-full blur-3xl bg-white opacity-10"></div>
      <div className="relative rounded-md overflow-hidden bg-black pb-14">
        <div className="relative h-[350px]">
          <Image
            src={imageSrc}
            alt={`Zdjęcie ${member.name} ${member.surname}`}
            layout="fill"
            objectFit="cover"
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

export default ClientUserCard;
