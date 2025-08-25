"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SliderElement from "./SliderElement";

export interface SliderProps {
  currentBolid: string;
  onChangeBolid?: (newBolid: string) => void;
  darkMode?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  currentBolid = "RT13e",
  onChangeBolid = () => {},
  darkMode = false,
}) => {
  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname!.split("/")[1];
  const teamRedirect = (bolid: string) =>
    router.push(`/${currentLocale}/team/${bolid}`);
  const bolidRedirect = (bolid: string) =>
    router.push(`/${currentLocale}/bolid/${bolid}`);

  if (pathname && pathname.includes(`/team/`)) {
    onChangeBolid = teamRedirect;
  } else if (pathname && pathname.includes(`/bolid/`)) {
    onChangeBolid = bolidRedirect;
  }

  // 开始拖拽
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // 拖拽中
  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 结束拖拽
  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="">
      <div
        className={`${
          darkMode ? "bg-neutral-500" : "bg-neutral-300"
        } absolute inset-0 mt-5 md:mt-9 w-full h-2 md:h-3 opacity-50`}
      ></div>
      <div
        className={` w-[99vw] h-full relative pt-4 md:pt-8 overflow-x-scroll animation-container ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollContainerRef}
        onMouseDown={startDragging}
        onMouseMove={onDrag}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
      >
        <div className="flex relative gap-12 sm:gap-24 mx-8 md:ml-[calc((100vw-var(--container-width))/2)]">
          <SliderElement
            darkMode={darkMode}
            date={2024}
            bolid="RT14e"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2023}
            bolid="RT13e"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2023}
            bolid="RT11b"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2022}
            bolid="RT12e"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2021}
            bolid="RT11"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2020}
            bolid="RTX"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2019}
            bolid="RT09"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2018}
            bolid="RT08"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2017}
            bolid="RT07"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2016}
            bolid="RT06"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2015}
            bolid="RT05"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2014}
            bolid="RT04"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2013}
            bolid="RT03"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2012}
            bolid="RT02"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <SliderElement
            darkMode={darkMode}
            date={2011}
            bolid="RT01"
            onClick={onChangeBolid}
            currentBolid={currentBolid}
          />
          <div className="flex-shrink-0 w-1 md:w-[calc((85vw-var(--container-width))/2)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
