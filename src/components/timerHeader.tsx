import { Star } from "./UI/icons";

interface TimerHeaderProps {
    timeLeft: number;
    isBlinking: boolean;
    isEnded: boolean;
    formattedTime: string;
}

export default function TimerHeader({
    timeLeft,
    isBlinking,
    isEnded,
    formattedTime,
}: TimerHeaderProps) {

    return (
        <header
            className={`flex flex-col gap-1 p-2 text-center transition-all duration-300 ${isEnded
                ? 'bg-[var(--primary-header)]'
                : isBlinking
                    ? 'bg-[var(--status-error)] animate-pulse'
                    : 'bg-[var(--primary-header)]'
                }`}
        >

            <div className="text-[clamp(0.875rem,3.5vw,1.5rem)] font-medium">
                Успейте открыть пробную неделю
            </div>
            <div
                className={`flex justify-center items-center leading-1 gap-2 text-[clamp(1.75rem,4vw,2.5rem)] h-[clamp(2.25rem,4vw,3.25rem)] font-bold transition-colors ${isEnded
                    ? 'text-white'
                    : isBlinking
                        ? 'text-red-300'
                        : 'text-[var(--status-alert)]'
                    }`}
            >
                <Star />
                <p>{isEnded ? '00:00' : formattedTime}</p>
                <Star />
            </div>
        </header>
    );
};

