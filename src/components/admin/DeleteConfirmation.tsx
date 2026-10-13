'use client';

import Modal from '@/components/ui/Modal';

export default function DeleteConfirmation({
  title,
  pending,
  error,
  onClose,
  onConfirm,
}: {
  title: string | null;
  pending: boolean;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      isOpen={title !== null}
      onClose={() => {
        if (!pending) onClose();
      }}
      title="Confirmer la suppression"
      maxWidth="md"
    >
      <p className="text-sm leading-6 break-words text-white/80">
        Supprimer « {title} » et ses médias associés ? Cette action est
        définitive.
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={onClose}
          className="min-h-11 rounded-md border border-white/20 px-4 text-sm disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={onConfirm}
          className="min-h-11 rounded-md bg-[#cc0009] px-4 text-sm font-medium text-white hover:bg-[#b30006] disabled:opacity-50"
        >
          {pending ? 'Suppression…' : 'Supprimer définitivement'}
        </button>
      </div>
      <p role="status" className="sr-only">
        {pending ? 'Suppression en cours…' : ''}
      </p>
    </Modal>
  );
}
