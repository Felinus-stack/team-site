"use client";

import Text from "@/app/components/Text";
import Title from "@/app/components/Title";
import { useEffect, useState, useCallback } from "react";

interface TimerProps {
  targetDate: string;
  dict: any;
}

const Timer: React.FC<TimerProps> = ({ targetDate, dict }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-8">
        <Text bold medium color="black">
          Rekrutacja otwarta, dołącz do nas! 🚀
        </Text>
      </div>
      <Text wide small>
        {dict.nextRecruitmentStartsIn}
      </Text>
      <div className="flex gap-2 md:gap-4">
        <div className="flex flex-col text-center">
          <Title lower size="bigger" color="red">
            {timeLeft.days}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.days}
          </Title>
        </div>
        <Title lower size="bigger" color="red">
          :
        </Title>
        <div className="flex flex-col text-center">
          <Title lower size="bigger" color="red">
            {timeLeft.hours}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.hours}
          </Title>
        </div>
        <Title lower size="bigger" color="red">
          :
        </Title>
        <div className="flex flex-col text-center">
          <Title lower size="bigger" color="red">
            {timeLeft.minutes}
          </Title>
          <Title lower size="subtitle" color="red">
            {dict.minutes}
          </Title>
        </div>
        <Title lower size="bigger" color="red">
          :
        </Title>
        <div className="flex flex-col text-center">
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
