'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'screen';
  drawer?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg',
  drawer = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Le dialogue natif contient le focus et rend le reste du document inerte.
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      } else {
        const content =
          document.getElementById('admin-content') ||
          document.getElementById('main-content');
        content?.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;
  const widths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    screen: 'max-w-6xl',
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const elements = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), video[controls], iframe, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => element.getClientRects().length > 0);
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
      className={`fixed border border-white/20 bg-[#0d0d10] p-0 text-[#f4f2ee] backdrop:bg-black/85 ${drawer ? 'inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-[min(90vw,360px)] max-w-none' : `inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] ${widths[maxWidth]}`}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-3 sm:px-6">
        <h2 id={titleId} className="text-base font-medium">
          {title}
        </h2>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="flex min-h-11 min-w-11 items-center justify-center text-xl text-white/75 hover:text-white"
          aria-label="Fermer le dialogue"
        >
          ×
        </button>
      </div>
      <div className="max-h-[calc(90dvh-72px)] overflow-y-auto overscroll-contain p-5 sm:p-6">
        {children}
      </div>
    </dialog>,
    document.body
  );
}
