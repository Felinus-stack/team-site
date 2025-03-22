"use client";

import Button from "@/app/components/Button";
import Title from "@/app/components/Title";
import { useRouter } from "next/navigation";
import React from "react";

interface NewsControlsProps {
  dict: {
    title: string;
    becomePartner: string;
    contact: string;
  };
}

const NewsControls: React.FC<NewsControlsProps> = ({ dict }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <Title color="black">{dict.title}</Title>
      <div className="flex gap-4 w-full md:w-2/5">
        <Button
          label={dict.becomePartner}
          onClick={() => router.push(`/partners/joinus`)}
        />
        <Button
          outline
          label={dict.contact}
          onClick={() => router.push(`/contact`)}
        />
      </div>
    </div>
  );
};

export default NewsControls;
