'use client';

import { useState, useEffect } from 'react';
import type { CTAContent } from '@/lib/types/page-content';
import { COLOR_COMBINATIONS } from '@/lib/colors';

interface HomepageCTAFormProps {
  initialContent: CTAContent;
  onSave: (content: CTAContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

export default function HomepageCTAForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
}: HomepageCTAFormProps) {
  const [form, setForm] = useState<CTAContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm(initialContent);
    setHasChanges(false);
  }, [initialContent]);

  function updateField<K extends keyof CTAContent>(
    key: K,
    value: CTAContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (
      !confirm(
        'Rétablir les valeurs par défaut pour la section Appel à l\'action ?'
      )
    )
      return;
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving';

  // Prévisualisation du titre assemblé
  const previewTitle = `${form.title} ${form.titleHighlight}${form.titleSuffix}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prévisualisation */}
      <div className="rounded-lg border border-white/10 bg-gradient-to-r from-black/40 to-black/20 p-4 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
          Prévisualisation
        </p>
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {form.title}{' '}
          <span className="bg-gradient-to-r from-[#ff0015] to-[#e6000c] bg-clip-text text-transparent">
            {form.titleHighlight}
          </span>
          {form.titleSuffix}
        </h3>
        <p className="mt-1 text-sm text-white/60">{form.subtitle}</p>
        <div className="mt-3 inline-block rounded-full bg-gradient-to-r from-[#ff1a2a] to-[#e6000c] px-5 py-2 text-sm font-semibold text-white">
          {form.ctaText}
        </div>
      </div>

      {/* Champs titre */}
      <div className="grid gap-4 sm:grid-cols-3">
        <FieldGroup label="Titre" hint="Début du titre">
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="admin-input"
            maxLength={60}
            disabled={isSaving}
          />
        </FieldGroup>
        <FieldGroup label="Titre accentué" hint="Partie en rouge">
          <input
            type="text"
            value={form.titleHighlight}
            onChange={(e) => updateField('titleHighlight', e.target.value)}
            className="admin-input"
            maxLength={40}
            disabled={isSaving}
          />
        </FieldGroup>
        <FieldGroup label="Suffixe" hint="Après l'accent (ex: ?)">
          <input
            type="text"
            value={form.titleSuffix}
            onChange={(e) => updateField('titleSuffix', e.target.value)}
            className="admin-input"
            maxLength={10}
            disabled={isSaving}
          />
        </FieldGroup>
      </div>

      {/* Sous-titre */}
      <FieldGroup label="Sous-titre">
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          className="admin-input"
          maxLength={200}
          disabled={isSaving}
        />
      </FieldGroup>

      {/* Texte du bouton */}
      <FieldGroup label="Texte du bouton">
        <input
          type="text"
          value={form.ctaText}
          onChange={(e) => updateField('ctaText', e.target.value)}
          className="admin-input"
          maxLength={40}
          disabled={isSaving}
        />
      </FieldGroup>

      {/* Preview titre assemblé */}
      <p className="text-xs text-white/40">
        Titre complet : &quot;{previewTitle}&quot;
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-50"
        >
          Réinitialiser par défaut
        </button>
        <button
          type="submit"
          disabled={isSaving || !hasChanges}
          className={`rounded-md px-6 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow}`}
        >
          {isSaving ? 'Sauvegarde...' : 'Enregistrer la section CTA'}
        </button>
      </div>
    </form>
  );
}

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/90">{label}</label>
      {hint && <p className="text-xs text-white/40">{hint}</p>}
      {children}
    </div>
  );
}
