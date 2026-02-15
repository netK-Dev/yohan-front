'use client';

import { useState, type ReactNode } from 'react';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface SectionAccordionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  saveStatus?: SaveStatus;
  defaultOpen?: boolean;
}

const STATUS_BADGES: Record<SaveStatus, { label: string; className: string } | null> = {
  idle: null,
  saving: {
    label: 'Sauvegarde...',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  success: {
    label: 'Sauvegardé',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  error: {
    label: 'Erreur',
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
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const badge = STATUS_BADGES[saveStatus];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-lg backdrop-blur transition-colors hover:border-white/15">
      {/* Header cliquable */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5 sm:px-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/80">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white sm:text-base">
              {title}
            </h3>
            <p className="text-xs text-white/50">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {badge && (
            <span
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
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-[5000px] opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="border-t border-white/10 px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
