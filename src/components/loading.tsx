export default function LoadingState() {
  return (
    <div>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-accent)] mb-4"></div>
        <div className="text-white text-xl">Загрузка тарифов...</div>
      </div>
    </div>
  );
};