import { Tariff } from "@/types/types";
import { calculateDiscountPercent } from "@/utils/functions";
import { useEffect, useState } from "react";


interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  isTimerEnded: boolean;
  onSelect: (tariff: Tariff) => void;
}

export default function TariffCard ({
  tariff,
  isSelected,
  isTimerEnded,
  onSelect
}: TariffCardProps) {
  const discountPercent = calculateDiscountPercent(tariff.price, tariff.full_price);
  const displayPrice = isTimerEnded ? tariff.full_price : tariff.price;
  const baseClasses = "relative bg-[var(--secondary-bg)] rounded-[clamp(1.25rem,5vw,2.5rem)] border-2 transition-all duration-300 cursor-pointer";
  const regularPadding = "md:pt-[70px] md:px-5 md:pb-6 py-5 pr-4 pl-8";
  const bestStyles = "md:pt-8 md:pr-5 md:pl-28 md:pb-7 py-5 pr-4 pl-8";
  const borderClasses = isSelected
    ? 'border-[var(--primary-accent)]' + (tariff.is_best ? '' : ' scale-105')
    : 'border-[var(--primary-border)] hover:border-amber-300';
  const gridClasses = tariff.is_best ? 'md:col-span-3' : '';
  const [showDiscount, setShowDiscount] = useState(!isTimerEnded);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    useEffect(() => {
    if (isTimerEnded && !isAnimatingOut && showDiscount) {
      setIsAnimatingOut(true);
      setShowDiscount(false);
    }
  }, [isTimerEnded, isAnimatingOut, showDiscount]);
    useEffect(() => {
    if (isTimerEnded) {
      setShowDiscount(false);
    }
  }, [isTimerEnded]);
  return (
    <div
      className={`${baseClasses} ${tariff.is_best ? bestStyles : regularPadding} ${borderClasses} ${gridClasses}`}
      onClick={() => onSelect(tariff)}
    >
      {tariff.is_best && (
        <div className="absolute md:top-3 md:right-5 top-2.5 right-5 tracking-wider leading-5 text-[var(--primary-accent)] text-[clamp(0.8125rem,4vw,1.375rem)]">
          хит!
        </div>
      )}
      {discountPercent && (
        <p 
          className={`absolute top-0 transition-all duration-500 ease-in-out ${
            isAnimatingOut
              ? 'opacity-0 scale-50 translate-y-4' 
              : !isTimerEnded
                ? 'opacity-100 scale-100 translate-y-0'  
                : 'hidden'  
          } ${tariff.is_best
            ? 'md:left-12 md:right-auto right-[clamp(3.5rem,16vw,5rem)]'
            : 'md:left-12 md:right-auto right-8'
          } bg-[var(--status-error)] md:px-2 md:py-1 px-1.5 py-0.5 text-[clamp(0.8125rem,4vw,1.375rem)] rounded-b-md md:rounded-b-lg  `}
        >
          {discountPercent}
        </p>
      )}
      <div className={`flex ${tariff.is_best ? 'md:flex-row' : 'md:flex-col'} justify-centers items-center lg:gap-10 md:gap-12 gap-7 `}>
        <div className="flex flex-col md:items-center gap-[clamp(0.75rem,3.7vw,1rem)]">
          <p className="text-[clamp(1rem,2.8vw,1.625rem)]">{tariff.period}</p>
          <div className="flex flex-col w-full justify-center md:items-center">
            <p className={`text-[clamp(1.875rem,6vw,3.125rem)] leading-none ${isSelected ? 'text-[var(--primary-accent)]' : ""}  text-nowrap`}>
              {displayPrice} ₽
            </p>
            {!isTimerEnded && discountPercent && (
              <p className="text-[var(--secondary-text)] min-w-[112px] line-through text-[clamp(0.875rem,3.2vw,1.5rem)]  text-end text-nowrap">
                {tariff.full_price} ₽
              </p>
            )}
          </div>
        </div>
        <p className="py-2.5 [@media(max-width:420px)]:w-[120px] text-[clamp(0.855rem,1.2vw,1rem)]  leading-snug">
          {tariff.text}
        </p>
      </div>
    </div>
  );
};
