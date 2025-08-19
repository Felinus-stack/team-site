"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/`)}
      className=" relative py-7 cursor-pointer"
    >
      <Image 
        alt="Logo" 
        fill
        className="object-contain"
        src="/images/logo.png" 
      />
    </div>
  );
};

export default Logo;
