'use client';

import { useState, useId, type ReactNode } from 'react';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface SectionAccordionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  saveStatus?: SaveStatus;
  defaultOpen?: boolean;
}

const STATUS_BADGES: Record<
  SaveStatus,
  { label: string; className: string } | null
> = {
  idle: null,
  saving: {
    label: 'Sauvegarde...',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  success: {
    label: 'Enregistré',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  error: {
    label: 'Non enregistré',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
};

export default function SectionAccordion({
  title,
  description,
  icon,
  children,
  saveStatus = 'idle',
  defaultOpen = false,
}: SectionAccordionProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const badge = STATUS_BADGES[saveStatus];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
      {/* Header cliquable */}
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-region`}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-h-11 w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/80">
            {icon}
          </div>
          <div>
            <span className="block text-sm font-semibold text-white sm:text-base">
              {title}
            </span>
            <p className="text-xs text-white/65">{description}</p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          {badge && (
            <span
              role={saveStatus === 'error' ? 'alert' : 'status'}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badge.className}`}
            >
              {badge.label}
            </span>
          )}

          <svg
            className={`h-5 w-5 text-white/60 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Contenu */}
      <div
        id={`${id}-region`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!isOpen}
      >
        <div className="border-t border-white/10 px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
