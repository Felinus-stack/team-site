'use client';

import Image from "next/image";

const BottomBar = () => {
  return (
    <div className="w-full">
      <Image
        src="/images/pasek.png"
        alt="project"
        layout="intrinsic" // 图片在固定宽度下保持原始宽高比
        width={1920}
        height={10}
      />
    </div>
  );
};

export default BottomBar;
