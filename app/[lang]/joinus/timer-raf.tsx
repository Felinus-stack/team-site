"use client";

import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import { useEffect, useState, useCallback, useRef } from "react";

interface TimerProps {
  targetDate: string;
  dict: any;
}

const Timer: React.FC<TimerProps> = ({ targetDate, dict }) => {
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  
  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate);
    const now = new Date();
    const difference = target.getTime() - now.getTime();
    
    let timeLeft = {
      days: "00",
      hours: "00", 
      minutes: "00",
      seconds: "00",
      isExpired: false,
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        isExpired: false,
      };
    } else {
      timeLeft.isExpired = true;
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const updateTimer = useCallback((timestamp: number) => {
    // 计算当前时间状态
    const newTimeLeft = calculateTimeLeft();
    
    // 只在每秒更新一次，或者状态发生变化时更新
    const shouldUpdate = 
      timestamp - lastUpdateRef.current >= 1000 || 
      newTimeLeft.isExpired !== timeLeft.isExpired;
    
    if (shouldUpdate) {
      setTimeLeft(newTimeLeft);
      lastUpdateRef.current = timestamp;
      
      // 如果刚好过期，不再继续循环
      if (newTimeLeft.isExpired) {
        return;
      }
    }
    
    // 如果没有过期，继续下一帧
    if (!newTimeLeft.isExpired) {
      rafRef.current = requestAnimationFrame(updateTimer);
    }
  }, [calculateTimeLeft, timeLeft.isExpired]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateTimer);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTimer]);

  // 如果倒计时结束，显示结束状态
  if (timeLeft.isExpired) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="mb-8">
          <Text bold medium color="black">
            {dict.recruitmentClosed}
          </Text>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300">
          <Text bold small color="black">
            {dict.recruitmentEndedMessage}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-8">
        <Text bold medium color="black">
          {dict.recruitmentOpen}
        </Text>
      </div>
      <Text wide small color="black">
        {dict.nextRecruitmentStartsIn}
      </Text>
      <div className="flex gap-2 md:gap-4">
        <div className="flex flex-col text-center rounded-lg p-3 md:p-4 transition-all duration-300">
          <Title lower size="bigger" color="red">
            {timeLeft.days}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.days}
          </Title>
        </div>
        <div className="flex items-center">
          <Title lower size="bigger" color="red">:</Title>
        </div>
        <div className="flex flex-col text-center rounded-lg p-3 md:p-4 transition-all duration-300">
          <Title lower size="bigger" color="red">
            {timeLeft.hours}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.hours}
          </Title>
        </div>
        <div className="flex items-center">
          <Title lower size="bigger" color="red">:</Title>
        </div>
        <div className="flex flex-col text-center rounded-lg p-3 md:p-4 transition-all duration-300">
          <Title lower size="bigger" color="red">
            {timeLeft.minutes}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.minutes}
          </Title>
        </div>
        <div className="flex items-center">
          <Title lower size="bigger" color="red">:</Title>
        </div>
        <div className="flex flex-col text-center rounded-lg p-3 md:p-4 transition-all duration-300">
          <Title lower size="bigger" color="red">
            {timeLeft.seconds}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.seconds}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default Timer;
