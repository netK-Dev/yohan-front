'use client';

import { useState } from 'react';
import type { CTAContent } from '@/lib/types/page-content';
import FormField from '@/components/admin/FormField';

interface HomepageCTAFormProps {
  initialContent: CTAContent;
  onSave: (content: CTAContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  errorMessage?: string;
  onDirty?: () => void;
}

export default function HomepageCTAForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
  errorMessage,
  onDirty,
}: HomepageCTAFormProps) {
  const [previousContent, setPreviousContent] = useState(initialContent);
  const [form, setForm] = useState<CTAContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);

  if (previousContent !== initialContent) {
    setPreviousContent(initialContent);
    setForm(initialContent);
    setHasChanges(false);
  }

  function updateField<K extends keyof CTAContent>(
    key: K,
    value: CTAContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
    onDirty?.();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving) return;
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (isSaving) return;
    if (
      !confirm(
        "Rétablir les valeurs par défaut pour la section Appel à l'action ?"
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
    <form onSubmit={handleSubmit} aria-busy={isSaving} className="space-y-6">
      <p className="text-xs text-white/65">
        Les champs marqués * sont obligatoires. Enregistrez chaque section pour
        publier vos modifications.
      </p>
      <fieldset disabled={isSaving} className="min-w-0 space-y-6">
        {/* Prévisualisation */}
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-center">
          <p className="mb-1 text-xs font-medium tracking-wider text-white/65 uppercase">
            Prévisualisation
          </p>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {form.title}{' '}
            <span className="text-red-300">{form.titleHighlight}</span>
            {form.titleSuffix}
          </h3>
          <p className="mt-1 text-sm text-white/60">{form.subtitle}</p>
          <div className="mt-3 inline-block rounded-full bg-[#cc0009] px-5 py-2 text-sm font-semibold text-white">
            {form.ctaText}
          </div>
        </div>

        {/* Champs titre */}
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Titre *" hint="Début du titre">
            <input
              type="text"
              value={form.title}
              required
              onChange={(e) => updateField('title', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={60}
              disabled={isSaving}
            />
          </FormField>
          <FormField label="Titre accentué *" hint="Partie en rouge">
            <input
              type="text"
              value={form.titleHighlight}
              required
              onChange={(e) => updateField('titleHighlight', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={40}
              disabled={isSaving}
            />
          </FormField>
          <FormField label="Suffixe" hint="Après l'accent (ex: ?)">
            <input
              type="text"
              value={form.titleSuffix}
              onChange={(e) => updateField('titleSuffix', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={10}
              disabled={isSaving}
            />
          </FormField>
        </div>

        {/* Sous-titre */}
        <FormField label="Sous-titre *">
          <input
            type="text"
            value={form.subtitle}
            required
            onChange={(e) => updateField('subtitle', e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            maxLength={200}
            disabled={isSaving}
          />
        </FormField>

        {/* Texte du bouton */}
        <FormField label="Texte du bouton *">
          <input
            type="text"
            value={form.ctaText}
            required
            onChange={(e) => updateField('ctaText', e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            maxLength={40}
            disabled={isSaving}
          />
        </FormField>

        {/* Preview titre assemblé */}
        <p className="text-xs text-white/65">
          Titre complet : &quot;{previewTitle}&quot;
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="min-h-11 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-50"
          >
            Réinitialiser par défaut
          </button>
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className={`min-h-11 rounded-md bg-[#cc0009] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b30006] disabled:opacity-50`}
          >
            {isSaving ? 'Enregistrement…' : 'Enregistrer la section CTA'}
          </button>
        </div>
      </fieldset>
      <p
        role={saveStatus === 'error' ? 'alert' : 'status'}
        className="text-sm text-white/80"
      >
        {saveStatus === 'saving'
          ? 'Enregistrement en cours…'
          : saveStatus === 'success'
            ? 'Section enregistrée.'
            : saveStatus === 'error'
              ? errorMessage ||
                'La section n’a pas été enregistrée. Vérifiez les champs et réessayez.'
              : hasChanges
                ? 'Modifications non enregistrées.'
                : ''}
      </p>
    </form>
  );
}
