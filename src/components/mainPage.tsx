import TariffInteractiveSection from "./TariffInteractiveSection";

export default function MainPage() {
  return (
    <div className="mx-auto max-w-[1216px] px-4 min-h-screen mt-[clamp(1.25rem,5vw,3.125rem)] mb-[clamp(1.25rem,4.5vw,9.375rem)]">
      <h1 className="text-[clamp(1.375rem,5vw,2.5rem)] font-bold  mb-[clamp(1.5rem,5vw,6.875rem)]">
        Выбери подходящий для себя <span className="text-[var(--primary-accent)]">тариф</span>
      </h1>
      <div className="lg:flex-row flex flex-col w-full items-center lg:justify-center lg:gap-[clamp(3rem,5vw,5.4rem)] mb-[clamp(1.375rem,4.5vw,4.125rem)] gap-0">
        <img src='/img.webp' className=" w-[clamp(6.187rem,37vw,23.75rem)] " />
        <TariffInteractiveSection/>
      </div>
      <div className="flex flex-col gap-2.5 md:gap-7 p-[clamp(1.25rem,5vw,3.125rem)] rounded-[clamp(0.625rem,4.5vw,1.875rem)] w-full  border border-[var(--primary-border)]">
        <p className="w-fit px-[clamp(1.125rem,3vw,1.5rem)] py-[clamp(0.75rem,3vw,1rem)] rounded-4xl text-[var(--status-success)] border border-[var(--status-success)]">гарантия возврата 30 дней</p>
        <p className="leading-snug text-[clamp(0.875rem,2.5vw,1.5rem)]">Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.</p>
      </div>
    </div>
  );
}
