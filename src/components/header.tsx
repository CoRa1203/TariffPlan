'use client'

import useCountdownTimer from "@/hooks/useCountdownTimer";
import TimerHeader from "./timerHeader";
import useFetchTariffs from "@/hooks/useFetchTariffs";


export default function Header() {
 const {
    timeLeft,
    isBlinking,
    isEnded,
    formattedTime
  } = useCountdownTimer({ initialSeconds: 120, blinkThreshold: 30 });

  const { error } = useFetchTariffs();

    return  <>
    {!error ? (
        <TimerHeader 
        timeLeft={timeLeft}
          isBlinking={isBlinking}
          isEnded={isEnded}
          formattedTime={formattedTime}
        />
      ) : <></>}
    </> 
}