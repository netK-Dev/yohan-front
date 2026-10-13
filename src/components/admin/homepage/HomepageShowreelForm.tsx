'use client';

import { useState } from 'react';
import type { ShowreelContent } from '@/lib/types/page-content';
import FormField from '@/components/admin/FormField';
import FileUploader from '@/components/ui/FileUploader';
import SafeImage from '@/components/ui/SafeImage';

interface HomepageShowreelFormProps {
  initialContent: ShowreelContent;
  onSave: (content: ShowreelContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  errorMessage?: string;
  onDirty?: () => void;
}

export default function HomepageShowreelForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
  errorMessage,
  onDirty,
}: HomepageShowreelFormProps) {
  const [previousContent, setPreviousContent] = useState(initialContent);
  const [form, setForm] = useState<ShowreelContent>(initialContent);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  if (previousContent !== initialContent) {
    setPreviousContent(initialContent);
    setForm(initialContent);
    setHasChanges(false);
  }

  function updateField<K extends keyof ShowreelContent>(
    key: K,
    value: ShowreelContent[K]
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
        'Rétablir les valeurs par défaut pour la section showreel de la page d’accueil ?'
      )
    ) {
      return;
    }
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving' || uploading;

  return (
    <form onSubmit={handleSubmit} aria-busy={isSaving} className="space-y-6">
      <p className="text-xs text-white/65">
        Les champs marqués * sont obligatoires. Enregistrez chaque section pour
        publier vos modifications.
      </p>
      <fieldset disabled={isSaving} className="min-w-0 space-y-6">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-xs font-semibold tracking-wider text-white/65 uppercase">
            Textes de la section
          </h4>
          <div className="space-y-4">
            <FormField label="Badge *">
              <input
                type="text"
                value={form.badge}
                required
                onChange={(e) => updateField('badge', e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                maxLength={30}
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Titre *">
              <input
                type="text"
                value={form.title}
                required
                onChange={(e) => updateField('title', e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                maxLength={80}
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Description *">
              <textarea
                value={form.description}
                required
                onChange={(e) => updateField('description', e.target.value)}
                className="min-h-[80px] w-full min-w-0 resize-y rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                maxLength={240}
                rows={3}
                disabled={isSaving}
              />
              <p className="mt-1 text-xs text-white/65">
                {form.description.length}/240 caractères
              </p>
            </FormField>

            <FormField label="Lien YouTube (alternative)">
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={(e) => updateField('youtubeUrl', e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                placeholder="https://www.youtube.com/watch?v=..."
                disabled={isSaving}
              />
            </FormField>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-xs font-semibold tracking-wider text-white/65 uppercase">
            Vidéo MP4 (obligatoire)
          </h4>
          {form.mp4Url ? (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
              <video
                key={form.mp4Url}
                controls
                muted
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source src={form.mp4Url} type="video/mp4" />
              </video>
            </div>
          ) : null}

          <div className="space-y-3">
            <FormField label="URL MP4 *">
              <input
                type="url"
                value={form.mp4Url}
                required
                onChange={(e) => {
                  updateField('mp4Url', e.target.value);
                  updateField('mp4Pathname', '');
                }}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                placeholder="https://...mp4"
                disabled={isSaving}
              />
            </FormField>

            <FileUploader
              disabled={isSaving}
              onBusyChange={setUploading}
              label="Importer la vidéo MP4"
              accept="video/mp4"
              maxSizeMb={500}
              onUploaded={(url, pathname) => {
                updateField('mp4Url', url);
                updateField('mp4Pathname', pathname);
              }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-xs font-semibold tracking-wider text-white/65 uppercase">
            Vidéo WebM (recommandée)
          </h4>
          {form.webmUrl ? (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
              <video
                key={form.webmUrl}
                controls
                muted
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source src={form.webmUrl} type="video/webm" />
              </video>
            </div>
          ) : null}

          <div className="space-y-3">
            <FormField label="URL WebM">
              <input
                type="url"
                value={form.webmUrl}
                onChange={(e) => {
                  updateField('webmUrl', e.target.value);
                  updateField('webmPathname', '');
                }}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                placeholder="https://...webm"
                disabled={isSaving}
              />
            </FormField>

            <FileUploader
              disabled={isSaving}
              onBusyChange={setUploading}
              label="Importer la vidéo WebM"
              accept="video/webm"
              maxSizeMb={500}
              onUploaded={(url, pathname) => {
                updateField('webmUrl', url);
                updateField('webmPathname', pathname);
              }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-xs font-semibold tracking-wider text-white/65 uppercase">
            Image d’affiche
          </h4>
          {form.posterUrl ? (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
              <SafeImage
                src={form.posterUrl}
                alt="Poster showreel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ) : null}

          <div className="space-y-3">
            <FormField label="URL de l’affiche *">
              <input
                type="url"
                value={form.posterUrl}
                required
                onChange={(e) => {
                  updateField('posterUrl', e.target.value);
                  updateField('posterPathname', '');
                }}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                placeholder="https://...jpg"
                disabled={isSaving}
              />
            </FormField>

            <FileUploader
              disabled={isSaving}
              onBusyChange={setUploading}
              label="Importer l’affiche"
              accept="image/jpeg,image/png,image/webp"
              maxSizeMb={20}
              onUploaded={(url, pathname) => {
                updateField('posterUrl', url);
                updateField('posterPathname', pathname);
              }}
            />
          </div>
        </div>

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
            {uploading
              ? 'Import en cours…'
              : isSaving
                ? 'Enregistrement…'
                : 'Enregistrer la section Showreel'}
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
