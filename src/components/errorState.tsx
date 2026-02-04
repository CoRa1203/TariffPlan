interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState ({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-6xl text-[var(--status-error)] mb-4">!</p>
        <p className="text-[var(--status-error)] text-xl mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 lg:w-80 py-4 bg-[var(--primary-accent)] hover:bg-amber-600  rounded-lg font-bold transition-colors"
          >
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  );
};