'use client';

import { useState, useEffect } from 'react';
import type { HeroContent, HeroStat } from '@/lib/types/page-content';
import { COLOR_COMBINATIONS } from '@/lib/colors';

interface HomepageHeroFormProps {
  initialContent: HeroContent;
  onSave: (content: HeroContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

export default function HomepageHeroForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
}: HomepageHeroFormProps) {
  const [form, setForm] = useState<HeroContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm(initialContent);
    setHasChanges(false);
  }, [initialContent]);

  function updateField<K extends keyof HeroContent>(
    key: K,
    value: HeroContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
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
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (!confirm('Rétablir les valeurs par défaut pour la section Hero ?'))
      return;
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Badge */}
      <FieldGroup label="Badge" hint="Petit texte au-dessus du titre">
        <input
          type="text"
          value={form.badge}
          onChange={(e) => updateField('badge', e.target.value)}
          className="admin-input"
          maxLength={50}
          disabled={isSaving}
        />
      </FieldGroup>

      {/* Titres */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup label="Titre" hint="Première partie du titre">
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="admin-input"
            maxLength={50}
            disabled={isSaving}
          />
        </FieldGroup>
        <FieldGroup label="Titre accentué" hint="Partie en rouge/gradient">
          <input
            type="text"
            value={form.titleHighlight}
            onChange={(e) => updateField('titleHighlight', e.target.value)}
            className="admin-input"
            maxLength={50}
            disabled={isSaving}
          />
        </FieldGroup>
      </div>

      {/* Sous-titre */}
      <FieldGroup label="Sous-titre" hint="Ligne de spécialités">
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          className="admin-input"
          maxLength={200}
          disabled={isSaving}
        />
      </FieldGroup>

      {/* Description */}
      <FieldGroup label="Description" hint="Paragraphe de présentation">
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="admin-input min-h-[80px] resize-y"
          maxLength={500}
          rows={3}
          disabled={isSaving}
        />
        <p className="mt-1 text-xs text-white/40">
          {form.description.length}/500 caractères
        </p>
      </FieldGroup>

      {/* Boutons CTA */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup label="Bouton principal" hint="Texte du bouton rouge">
          <input
            type="text"
            value={form.ctaPrimaryText}
            onChange={(e) => updateField('ctaPrimaryText', e.target.value)}
            className="admin-input"
            maxLength={40}
            disabled={isSaving}
          />
        </FieldGroup>
        <FieldGroup label="Bouton secondaire" hint="Texte du bouton contour">
          <input
            type="text"
            value={form.ctaSecondaryText}
            onChange={(e) => updateField('ctaSecondaryText', e.target.value)}
            className="admin-input"
            maxLength={40}
            disabled={isSaving}
          />
        </FieldGroup>
      </div>

      {/* Statistiques */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/90">
            Statistiques
          </label>
          {form.stats.length < 5 && (
            <button
              type="button"
              onClick={addStat}
              disabled={isSaving}
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/20 disabled:opacity-50"
            >
              + Ajouter
            </button>
          )}
        </div>

        <div className="space-y-2">
          {form.stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                placeholder="50+"
                className="admin-input w-24 text-center"
                maxLength={10}
                disabled={isSaving}
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, 'label', e.target.value)}
                placeholder="Projets"
                className="admin-input flex-1"
                maxLength={30}
                disabled={isSaving}
              />
              {form.stats.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  disabled={isSaving}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-red-500/20 bg-red-600/10 text-red-400 transition hover:bg-red-600/20 disabled:opacity-50"
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
          {isSaving ? 'Sauvegarde...' : 'Enregistrer la section Hero'}
        </button>
      </div>
    </form>
  );
}

/** Champ avec label et indice */
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
