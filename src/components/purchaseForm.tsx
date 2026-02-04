import { Tariff } from "@/types/types";

interface PurchaseFormProps {
    selectedTariff: Tariff | null;
    isChecked: boolean;
    isError: boolean;
    onCheckboxChange: (checked: boolean) => void;
    onPurchase: () => void;
}

export default function PurchaseForm({
    selectedTariff,
    isChecked,
    isError,
    onCheckboxChange,
    onPurchase
}: PurchaseFormProps) {
    return (
        <div className="flex flex-col p-2 rounded-lg mb-4">
            <label className="flex items-center cursor-pointer mb-4">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        id="terms"
                        checked={isChecked}
                        onChange={(e) => onCheckboxChange(e.target.checked)}
                    />

                    {/* Кастомный чекбокс */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isError
                        ? 'border-[var(--status-error)]'
                        : 'border-[var(--secondary-border)]'
                        }`}>
                        {isChecked && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="#ffa500" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>

                <span className="ml-3 text-sm leading-tight">
                    Я согласен с <a href="#" className="underline">офертой рекуррентных платежей</a> и <a href="#" className="underline">Политикой конфиденциальности</a>
                </span>
            </label>
            {isError && <p className="text-sm text-[var(--status-error)] mb-1">Необходимо согласиться с офертой рекуррентных платежей и Политикой конфиденциальности</p>}
             {!selectedTariff && <p className="text-sm text-[var(--status-alert)] mb-1">Нужно выбрать тариф, чтобы продолжить</p>}
            <button
                onClick={onPurchase}
                disabled={!selectedTariff}
                className={`w-full lg:w-80 py-4 mb-3.5 rounded-lg font-bold text-lg transition-all duration-300 cursor-pointer ${!selectedTariff
                    ? 'bg-[var(--tertiary-bg)] cursor-not-allowed'
                    : isError
                        ? 'bg-[var(--status-error)] hover:bg-red-700 animate-pulse'
                        : 'bg-[var(--primary-accent)] hover:bg-amber-600 '
                    }`}
            >
               
                {selectedTariff ? 'Купить' : 'Выберите тариф'}
            </button>
            <p className=" text-[var(--secondary-text)] leading-tight text-sm">Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</p>
        </div>
    );
};