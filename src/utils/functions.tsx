import { Tariff } from "@/types/types";

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


export const calculateDiscountPercent = (price: number, fullPrice: number): string => {
  if (price >= fullPrice) return '';
  const discount = Math.round(((fullPrice - price) / fullPrice) * 100);
  return `-${discount}%`;
};


export const getBestTariff = (tariffs: Tariff[]): Tariff | null => {
  return tariffs.find(t => t.is_best) || tariffs[0] || null;
};