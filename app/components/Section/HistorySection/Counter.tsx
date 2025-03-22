"use client";

import React, { useEffect, useState, useRef } from "react";
import Title, { TitleProps } from "../../Title";

interface CounterProps extends TitleProps {
  targetNumber: number;
}

const Counter: React.FC<CounterProps> = ({ targetNumber, ...props }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let didCancel = false;
    const currentRef = counterRef.current;

    if (currentRef) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!didCancel && entry.isIntersecting) {
              const duration = 2000; // Całkowity czas trwania animacji w ms
              const intervalTime = duration / targetNumber; // Czas między aktualizacjami

              let start = 0;
              const interval = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === targetNumber) clearInterval(interval);
              }, intervalTime);

              if (observer) {
                observer.unobserve(currentRef);
              }
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(currentRef);
    }

    return () => {
      didCancel = true;
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetNumber]);

  return (
    <div ref={counterRef}>
      <Title {...props}>{count}</Title>
    </div>
  );
};

export default Counter;
