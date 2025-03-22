'use client';

import Image from "next/image";

const BottomBar = () => {
  return (
    <div className="w-full">
      <Image
        src="/images/pasek.png"
        alt="bolid"
        layout="intrinsic" // Obraz zachowa oryginalny aspekt przy ustalonej szerokości
        width={1920}
        height={10}
      />
    </div>
  );
};

export default BottomBar;
