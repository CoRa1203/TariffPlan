'use client'

import { useFormValidation } from "@/hooks/useFormValidation";
import { useCallback } from "react";
import { Tariff } from "@/types/types";
import { Exclamation } from "./UI/icons";
import PurchaseForm from "./purchaseForm";
import LoadingState from "./loading";
import ErrorState from "./errorState";
import useFetchTariffs from "@/hooks/useFetchTariffs";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import TariffCard from "./TariffCard";


export default function TariffInteractiveSection() {
    const {
        tariffs,
        selectedTariff,
        setSelectedTariff,
        isLoading,
        error
    } = useFetchTariffs();

    const { isEnded } = useCountdownTimer();

    const {
        isChecked,
        isError,
        setIsChecked,
        setIsError,
        validate,
        reset
    } = useFormValidation();
    // @ts-ignore TODO: исправить типизацию
    const handleTariffSelect = useCallback((tariff: Tariff) => {
        setSelectedTariff(selectedTariff?.id === tariff.id ? null : tariff);

        if (isError) {
            setIsError(false);
        }
    }, [isError, setIsError, setSelectedTariff, selectedTariff]);

    const handlePurchase = useCallback(() => {
        if (!validate() || !selectedTariff) return;

        console.log('Purchasing:', selectedTariff);
        reset();
    }, [validate, selectedTariff, reset]);

    const handleCheckboxChange = useCallback((checked: boolean) => {
        setIsChecked(checked);
        if (checked && isError) {
            setIsError(false);
        }
    }, [isError, setIsChecked, setIsError]);

    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={handleRetry} />;
    }

    return (
        <div className="flex flex-col lg:max-w-3xl">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[clamp(0.8rem,2vw,0.6rem)] mb-[clamp(0.625rem,2vw,1.25rem)]">
                {tariffs.map((tariff, index) => (
                    <TariffCard
                        key={`${tariff.id}-${index}`}
                        tariff={tariff}
                        isSelected={selectedTariff?.id === tariff.id && selectedTariff?.period === tariff.period}
                        isTimerEnded={isEnded}
                        onSelect={handleTariffSelect}
                    />
                ))}
            </div>
            <div className="flex gap-1.5 px-5 py-4 bg-[var(--secondary-bg)] rounded-2xl max-w-lg mb-[clamp(1rem,3vw,1.875rem)]">
                <Exclamation />
                <p className="leading-snug">Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
            </div>
            <PurchaseForm
                selectedTariff={selectedTariff}
                isChecked={isChecked}
                isError={isError}
                onCheckboxChange={handleCheckboxChange}
                onPurchase={handlePurchase}
            />
        </div>
    );
}