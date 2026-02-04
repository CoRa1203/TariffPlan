'use client'

import { formatTime } from "@/utils/functions";
import { useCallback, useEffect, useState } from "react";

interface UseCountdownTimerProps {
  initialSeconds?: number;
  blinkThreshold?: number;
}

export default function useCountdownTimer ({
  initialSeconds = 120,
  blinkThreshold = 30
}: UseCountdownTimerProps = {}): {
  timeLeft: number;
  isBlinking: boolean;
  isEnded: boolean;
  formattedTime: string;
  resetTimer: () => void;
} {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
    setTimeLeft(initialSeconds);
    setIsBlinking(false);
    setIsEnded(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;

        if (newTime <= blinkThreshold && !isBlinking) {
          setIsBlinking(true);
        }

        if (newTime <= 0) {
          clearInterval(timer);
          setIsEnded(true);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isBlinking, blinkThreshold]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialSeconds);
    setIsBlinking(false);
    setIsEnded(false);
  }, [initialSeconds]);

  return {
    timeLeft,
    isBlinking,
    isEnded,
    formattedTime: formatTime(timeLeft),
    resetTimer
  };
};