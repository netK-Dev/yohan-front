'use client';

import { useEffect, useState } from 'react';
import type { ShowreelContent } from '@/lib/types/page-content';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import FileUploader from '@/components/ui/FileUploader';
import SafeImage from '@/components/ui/SafeImage';

interface HomepageShowreelFormProps {
  initialContent: ShowreelContent;
  onSave: (content: ShowreelContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

export default function HomepageShowreelForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
}: HomepageShowreelFormProps) {
  const [form, setForm] = useState<ShowreelContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm(initialContent);
    setHasChanges(false);
  }, [initialContent]);

  function updateField<K extends keyof ShowreelContent>(
    key: K,
    value: ShowreelContent[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
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
        'Retablir les valeurs par defaut pour la section showreel de la page d accueil ?'
      )
    ) {
      return;
    }
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Textes de la section
        </h4>
        <div className="space-y-4">
          <FieldGroup label="Badge">
            <input
              type="text"
              value={form.badge}
              onChange={e => updateField('badge', e.target.value)}
              className="admin-input"
              maxLength={30}
              disabled={isSaving}
            />
          </FieldGroup>

          <FieldGroup label="Titre">
            <input
              type="text"
              value={form.title}
              onChange={e => updateField('title', e.target.value)}
              className="admin-input"
              maxLength={80}
              disabled={isSaving}
            />
          </FieldGroup>

          <FieldGroup label="Description">
            <textarea
              value={form.description}
              onChange={e => updateField('description', e.target.value)}
              className="admin-input min-h-[80px] resize-y"
              maxLength={240}
              rows={3}
              disabled={isSaving}
            />
            <p className="mt-1 text-xs text-white/40">
              {form.description.length}/240 caracteres
            </p>
          </FieldGroup>

          <FieldGroup label="Lien YouTube (fallback)">
            <input
              type="url"
              value={form.youtubeUrl}
              onChange={e => updateField('youtubeUrl', e.target.value)}
              className="admin-input"
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isSaving}
            />
          </FieldGroup>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Video MP4 (obligatoire)
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
          <FieldGroup label="URL MP4">
            <input
              type="url"
              value={form.mp4Url}
              onChange={e => {
                updateField('mp4Url', e.target.value);
                updateField('mp4Pathname', '');
              }}
              className="admin-input"
              placeholder="https://...mp4"
              disabled={isSaving}
            />
          </FieldGroup>

          <FileUploader
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
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Video WebM (recommande)
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
          <FieldGroup label="URL WebM">
            <input
              type="url"
              value={form.webmUrl}
              onChange={e => {
                updateField('webmUrl', e.target.value);
                updateField('webmPathname', '');
              }}
              className="admin-input"
              placeholder="https://...webm"
              disabled={isSaving}
            />
          </FieldGroup>

          <FileUploader
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
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Image poster
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
          <FieldGroup label="URL poster">
            <input
              type="url"
              value={form.posterUrl}
              onChange={e => {
                updateField('posterUrl', e.target.value);
                updateField('posterPathname', '');
              }}
              className="admin-input"
              placeholder="https://...jpg"
              disabled={isSaving}
            />
          </FieldGroup>

          <FileUploader
            accept="image/jpeg,image/png,image/webp"
            maxSizeMb={20}
            onUploaded={(url, pathname) => {
              updateField('posterUrl', url);
              updateField('posterPathname', pathname);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-50"
        >
          Reinitialiser par defaut
        </button>
        <button
          type="submit"
          disabled={isSaving || !hasChanges}
          className={`rounded-md px-6 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow}`}
        >
          {isSaving ? 'Sauvegarde...' : 'Enregistrer la section Showreel'}
        </button>
      </div>
    </form>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/90">{label}</label>
      {children}
    </div>
  );
}
