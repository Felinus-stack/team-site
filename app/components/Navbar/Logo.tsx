"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/`)}
      className=" relative py-7 cursor-pointer"
    >
      <Image alt="Logo" height={height} width={width} src="/images/logo.png" />
    </div>
  );
};

export default Logo;
