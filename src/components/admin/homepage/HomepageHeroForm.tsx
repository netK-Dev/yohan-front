'use client';

import { useState } from 'react';
import type { HeroContent, HeroStat } from '@/lib/types/page-content';
import FormField from '@/components/admin/FormField';

interface HomepageHeroFormProps {
  initialContent: HeroContent;
  onSave: (content: HeroContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  errorMessage?: string;
  onDirty?: () => void;
}

export default function HomepageHeroForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
  errorMessage,
  onDirty,
}: HomepageHeroFormProps) {
  const [previousContent, setPreviousContent] = useState(initialContent);
  const [form, setForm] = useState<HeroContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);

  if (previousContent !== initialContent) {
    setPreviousContent(initialContent);
    setForm(initialContent);
    setHasChanges(false);
  }

  function updateField<K extends keyof HeroContent>(
    key: K,
    value: HeroContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
    onDirty?.();
  }

  function updateStat(index: number, field: keyof HeroStat, value: string) {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateField('stats', newStats);
  }

  function addStat() {
    if (form.stats.length >= 5) return;
    updateField('stats', [...form.stats, { value: '', label: '' }]);
  }

  function removeStat(index: number) {
    if (form.stats.length <= 1) return;
    updateField(
      'stats',
      form.stats.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving) return;
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (isSaving) return;
    if (!confirm('Rétablir les valeurs par défaut pour la section Hero ?'))
      return;
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving';

  return (
    <form onSubmit={handleSubmit} aria-busy={isSaving} className="space-y-6">
      <p className="text-xs text-white/65">
        Les champs marqués * sont obligatoires. Enregistrez chaque section pour
        publier vos modifications.
      </p>
      <fieldset disabled={isSaving} className="min-w-0 space-y-6">
        {/* Badge */}
        <FormField label="Badge *" hint="Petit texte au-dessus du titre">
          <input
            type="text"
            value={form.badge}
            required
            onChange={(e) => updateField('badge', e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            maxLength={50}
            disabled={isSaving}
          />
        </FormField>

        {/* Titres */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Titre *" hint="Première partie du titre">
            <input
              type="text"
              value={form.title}
              required
              onChange={(e) => updateField('title', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={50}
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
              maxLength={50}
              disabled={isSaving}
            />
          </FormField>
        </div>

        {/* Sous-titre */}
        <FormField label="Sous-titre *" hint="Ligne de spécialités">
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

        {/* Description */}
        <FormField label="Description *" hint="Paragraphe de présentation">
          <textarea
            value={form.description}
            required
            onChange={(e) => updateField('description', e.target.value)}
            className="min-h-[80px] w-full min-w-0 resize-y rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            maxLength={500}
            rows={3}
            disabled={isSaving}
          />
          <p className="mt-1 text-xs text-white/65">
            {form.description.length}/500 caractères
          </p>
        </FormField>

        {/* Boutons CTA */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Bouton principal *" hint="Texte du bouton rouge">
            <input
              type="text"
              value={form.ctaPrimaryText}
              required
              onChange={(e) => updateField('ctaPrimaryText', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={40}
              disabled={isSaving}
            />
          </FormField>
          <FormField label="Bouton secondaire *" hint="Texte du bouton contour">
            <input
              type="text"
              value={form.ctaSecondaryText}
              required
              onChange={(e) => updateField('ctaSecondaryText', e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              maxLength={40}
              disabled={isSaving}
            />
          </FormField>
        </div>

        {/* Statistiques */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/90">
              Statistiques *
            </h3>
            {form.stats.length < 5 && (
              <button
                type="button"
                onClick={addStat}
                disabled={isSaving}
                className="min-h-11 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/20 disabled:opacity-50"
              >
                + Ajouter
              </button>
            )}
          </div>

          <div className="space-y-2">
            {form.stats.map((stat, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-wrap items-center gap-2"
              >
                <label className="block w-24 shrink-0">
                  <span className="sr-only">
                    Valeur de la statistique {index + 1}
                  </span>
                  <input
                    type="text"
                    required
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="50+"
                    className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-center text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    maxLength={10}
                    disabled={isSaving}
                  />
                </label>
                <label className="block min-w-0 flex-1">
                  <span className="sr-only">
                    Libellé de la statistique {index + 1}
                  </span>
                  <input
                    type="text"
                    required
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Projets"
                    className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    maxLength={30}
                    disabled={isSaving}
                  />
                </label>
                {form.stats.length > 1 && (
                  <button
                    type="button"
                    aria-label={`Supprimer la statistique ${index + 1}`}
                    onClick={() => removeStat(index)}
                    disabled={isSaving}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-red-500/20 bg-red-600/10 text-red-400 transition hover:bg-red-600/20 disabled:opacity-50"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

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
            {isSaving ? 'Enregistrement…' : 'Enregistrer la section Hero'}
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
