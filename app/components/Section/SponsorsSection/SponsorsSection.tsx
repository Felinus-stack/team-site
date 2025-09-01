"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// 校企伙伴数据，与partners页面保持同步
const strategicSponsors = [
  "hist.png",
  "htu.png", 
  "xxu.png",
  "xxgc.png",
];

const platinumSponsors = [
  "weibo.png",
  "MiHoYo.png",
  "kuaishou.png",
  "JD.png",
  "DiDi.png",
  "baidu.png",
  "360.png",
  "Ctrip.png",
  "haluo.png",
  "weipai.png",
  "xiaomi.png",
  "ByteDance.png",
  "huawei.png",
  "alibaba.png",
  "tongcheng.png",
  "jinshanyun.png",
  "yunzhi.png",
  "tengyu.png",
  "bluelogo.png",
  "duxiaoman.png",
  "FlashEx.png",
  "haoweilai.png",
  "shuma.png",
  "tengdataiyuan.png"
];



// 合并所有赞助商图片
const sponsors = [
  ...strategicSponsors.map(name => `/images/sponsors/${name}`),
  ...platinumSponsors.map(name => `/images/sponsors/${name}`),
];

const SponsorsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let animationFrameId: number | undefined;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollSpeed = 1; // 可以调整滚动速度

  const [isAnimating, setIsAnimating] = useState(false);

  const animateScroll = () => {
    if (containerRef.current && !isAnimating) {
      setIsAnimating(true);
      const step = () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += scrollSpeed;
          if (
            containerRef.current.scrollLeft >=
            containerRef.current.scrollWidth / 2
          ) {
            containerRef.current.scrollLeft = 0;
          }
          animationFrameId = requestAnimationFrame(step);
        }
      };
      step();
    }
  };

  useEffect(() => {
    // 开始滚动动画
    animateScroll();

    // 清理：停止动画并更新状态
    return () => {
      setIsAnimating(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const onMouseLeave = () => {
    setIsDragging(false);
    animateScroll();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX; // 滚动速度倍数
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      id="section-partners"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="  relative bg-white overflow-hidden animation-container flex items-center w-full h-[100px] md:h-[200px]"
      style={{ overflowX: "auto", cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* <div className="relative h-full"> */}
      <div className="relative h-full">
        <div className="flex gap-20 select-none h-full">
          {sponsors.map((src, index) => (
            <div key={index} className="relative h-full w-36 md:w-60">
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                fill
                className=" object-contain"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-20"></div>
      </div>
      {/* Kopia w celu stworzenia iluzji braku przeskoku międzye końcem animacji */}
      <div className="relative h-full ml-20">
        <div className="flex gap-20 select-none h-full">
          {sponsors.map((src, index) => (
            <div key={index} className="relative h-full w-36 md:w-60">
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                fill
                className=" object-contain"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-20"></div>
      </div>
    </div>
  );
};

export default SponsorsSection;
