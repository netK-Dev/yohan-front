'use client';

import React from 'react';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
  SLIDER_CATEGORIES,
} from '@/lib/types/slider';
import FileUploader from '@/components/ui/FileUploader';
import SafeImage from '@/components/ui/SafeImage';

interface SliderMediaFormProps {
  sliderMedia?: SliderMedia | null;
  onSubmit: (
    data: CreateSliderMediaInput | UpdateSliderMediaInput
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const inputClass =
  'min-h-11 w-full rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/60 focus:ring-2 focus:ring-white/20 aria-invalid:border-red-400 disabled:opacity-50';

export default function SliderMediaForm({
  sliderMedia,
  onSubmit,
  onCancel,
  isLoading = false,
}: SliderMediaFormProps) {
  const id = React.useId();
  const [formData, setFormData] = React.useState({
    title: sliderMedia?.title || '',
    description: sliderMedia?.description || '',
    mediaUrl: sliderMedia?.mediaUrl || '',
    mediaPath: sliderMedia?.mediaPath || '',
    mediaType: sliderMedia?.mediaType || 'image',
    category: sliderMedia?.category || '',
    order: sliderMedia?.order || 0,
    isActive: sliderMedia?.isActive ?? true,
  });
  const [error, setError] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const busy = isLoading || uploading;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (!formData.title.trim() || !formData.mediaUrl) {
      setError(
        'Renseignez un titre et importez une image ou un GIF avant d’enregistrer.'
      );
      return;
    }
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        mediaUrl: formData.mediaUrl,
        mediaPath: formData.mediaPath || undefined,
        mediaType: formData.mediaType,
        category: formData.category,
        order: formData.order,
        isActive: formData.isActive,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Le média n’a pas été enregistré. Réessayez.'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={busy} className="space-y-6">
      <p className="text-sm text-white/65">
        Les champs marqués * sont obligatoires. Enregistrez pour publier les
        modifications.
      </p>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="rounded-md border border-red-400/30 bg-red-500/5 p-4 text-sm text-red-300"
        >
          {error}
        </p>
      )}
      <fieldset disabled={busy} className="min-w-0 space-y-4">
        <div>
          <label
            htmlFor={`${id}-title`}
            className="mb-2 block text-sm font-medium"
          >
            Titre *
          </label>
          <input
            id={`${id}-title`}
            type="text"
            required
            value={formData.title}
            aria-invalid={!!error && !formData.title.trim()}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, title: event.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-description`}
            className="mb-2 block text-sm font-medium"
          >
            Description{' '}
            <span className="font-normal text-white/65">(facultative)</span>
          </label>
          <textarea
            id={`${id}-description`}
            value={formData.description}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            className={inputClass}
            rows={3}
          />
        </div>
        <fieldset className="min-w-0 space-y-3 rounded-lg border border-white/10 p-4">
          <legend className="px-2 text-sm font-medium">Image ou GIF *</legend>
          {formData.mediaUrl && (
            <div className="relative aspect-video max-w-sm overflow-hidden rounded-md border border-white/15">
              <SafeImage
                src={formData.mediaUrl}
                alt={formData.title || 'Aperçu du média'}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          )}
          <FileUploader
            label={
              formData.mediaUrl ? 'Remplacer le média' : 'Importer le média'
            }
            disabled={busy}
            required={!formData.mediaUrl}
            errorMessage={
              error && !formData.mediaUrl
                ? 'Importez une image ou un GIF pour continuer.'
                : undefined
            }
            onBusyChange={setUploading}
            accept="image/*"
            maxSizeMb={10}
            onUploaded={(url, pathname) => {
              setFormData((prev) => ({
                ...prev,
                mediaUrl: url,
                mediaPath: pathname,
                mediaType: url.toLowerCase().includes('.gif') ? 'gif' : 'image',
              }));
              setError('');
            }}
          />
        </fieldset>
        <div>
          <label
            htmlFor={`${id}-category`}
            className="mb-2 block text-sm font-medium"
          >
            Catégorie{' '}
            <span className="font-normal text-white/65">(facultative)</span>
          </label>
          <select
            id={`${id}-category`}
            value={formData.category}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, category: event.target.value }))
            }
            className={inputClass}
          >
            <option value="" className="bg-[#111111]">
              Sans catégorie
            </option>
            {SLIDER_CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-[#111111]">
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`${id}-order`}
            className="mb-2 block text-sm font-medium"
          >
            Ordre d’affichage
          </label>
          <input
            id={`${id}-order`}
            type="number"
            min={0}
            step={1}
            required
            value={formData.order}
            aria-describedby={`${id}-order-help`}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                order: Number(event.target.value),
              }))
            }
            className={inputClass}
          />
          <p id={`${id}-order-help`} className="mt-2 text-xs text-white/65">
            Les plus petits nombres apparaissent en premier, à partir de 0.
          </p>
        </div>
        <label
          htmlFor={`${id}-active`}
          className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-white/15 px-3 py-2"
        >
          <input
            id={`${id}-active`}
            type="checkbox"
            checked={formData.isActive}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                isActive: event.target.checked,
              }))
            }
            className="h-5 w-5 accent-[#cc0009]"
          />
          <span className="text-sm">Afficher ce média dans le slider</span>
        </label>
      </fieldset>
      <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="min-h-11 rounded-md border border-white/20 px-4 text-sm hover:bg-white/10 disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={busy}
          className="min-h-11 rounded-md bg-[#cc0009] px-5 text-sm font-semibold text-white hover:bg-[#b30006] disabled:opacity-50"
        >
          {uploading
            ? 'Import en cours…'
            : isLoading
              ? 'Enregistrement…'
              : sliderMedia
                ? 'Enregistrer les modifications'
                : 'Créer le média'}
        </button>
      </div>
      <p role="status" className="sr-only">
        {uploading
          ? 'Import du média en cours.'
          : isLoading
            ? 'Enregistrement en cours…'
            : ''}
      </p>
    </form>
  );
}
