"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  targetNumber: number;
  children?: React.ReactNode;
  duration?: number; // Optional duration prop in milliseconds
}

const CountUp: React.FC<CountUpProps> = ({
  targetNumber,
  duration = 2000,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Guard against invalid target numbers
    if (targetNumber <= 0) return;

    const increment = targetNumber / (duration / 100); // Calculate how much to increment each time
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += increment;

      // Check if the current count has reached or exceeded the target number
      if (currentCount >= targetNumber) {
        setCount(targetNumber); // Set to the final value
        clearInterval(interval); // Clear the interval to stop the count
      } else {
        setCount(Math.floor(currentCount)); // Set the incremented value, floor for whole numbers
      }
    }, 100);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [targetNumber, duration, isInView]);

  return (
    <div ref={ref}>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow text-center text-blue-500">
        {count}
      </h1>
      <p className="mt-6 text-base text-zinc-500 text-center">{children}</p>
    </div>
  );
};

export default CountUp;
