'use client'
import { Tariff } from "@/types/types";
import { useEffect, useState } from "react";

interface UseFetchTariffsReturn {
    tariffs: Tariff[];
    selectedTariff: Tariff | null;
    setSelectedTariff: (tariff: Tariff | null) => void;
    isLoading: boolean;
    error: string | null;
}

export default function useFetchTariffs(): UseFetchTariffsReturn {
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [selectedTariff, setSelectedTariffState] = useState<Tariff | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchTariffs = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs');

                if (!response.ok) {
                    throw new Error(`Не удалось тарифы. Повторите попытку или попробуйте позже. Status: ${response.status}.`);
                }

                const data: Tariff[] = await response.json();
                setTariffs(data);
                const sortedTariffs = [...data].sort((a, b) => {
                    if (a.is_best && !b.is_best) return -1;
                    if (!a.is_best && b.is_best) return 1;
                    return 0;
                });
                setTariffs(sortedTariffs);

                const bestTariff = sortedTariffs.find(t => t.is_best) || sortedTariffs[0];
                setSelectedTariff(bestTariff);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Не удалось загрузить тарифы');
                console.error('Ошибка подгрузки тарифов:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTariffs();
    }, []);

    const setSelectedTariff = (tariff: Tariff | null) => {
        setSelectedTariffState(tariff);
    };
    return {
        tariffs,
        selectedTariff,
        setSelectedTariff,
        isLoading,
        error
    };
};