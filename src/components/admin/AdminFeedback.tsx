import type { ReactNode } from 'react';

export function AdminLoading({
  children = 'Chargement…',
}: {
  children?: ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-12 text-sm text-white/70"
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"
      />
      {children}
    </div>
  );
}

export function AdminError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-lg border border-red-400/30 bg-red-500/5 p-4"
    >
      <p className="text-sm text-red-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 min-h-11 rounded-md border border-white/20 px-4 text-sm text-white hover:bg-white/10"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
