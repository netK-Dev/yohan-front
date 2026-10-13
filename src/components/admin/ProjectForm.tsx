'use client';

import React from 'react';
import Image from 'next/image';
import SafeImage from '@/components/ui/SafeImage';
import Modal from '@/components/ui/Modal';
import FileUploader from '@/components/ui/FileUploader';
import RichTextEditor from '@/components/ui/RichTextEditor';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectSchema,
  PROJECT_CATEGORIES,
  SOFTWARE_LIST,
} from '@/lib/types/project';
import { ProjectVideo, getEmbedUrl } from '@/lib/types/video';

interface ProjectFormProps {
  initialData?: Partial<UpdateProjectInput>;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const inputClass =
  'min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/60 focus:ring-2 focus:ring-white/20 aria-invalid:border-red-400 disabled:opacity-50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white/85 hover:bg-white/10 disabled:opacity-50';

function currentLocalDate() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: ProjectFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const baseId = React.useId();
  const [formData, setFormData] = React.useState<CreateProjectInput>({
    title: initialData?.title || '',
    category: initialData?.category || PROJECT_CATEGORIES[0],
    date: initialData?.date || currentLocalDate(),
    description: initialData?.description || '',
    images: initialData?.images || [],
    videos: initialData?.videos || [],
    video: initialData?.video || '',
    videoFile: initialData?.videoFile || '',
    skill: initialData?.skill || '',
    software: initialData?.software || [],
    link: initialData?.link || '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [showGalleryUploader, setShowGalleryUploader] = React.useState(false);
  const [showAddVideo, setShowAddVideo] = React.useState(false);
  const [videoType, setVideoType] = React.useState<'youtube' | 'upload'>(
    'youtube'
  );
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const [videoError, setVideoError] = React.useState('');
  const busy = isLoading || uploading;

  function change(
    field: keyof CreateProjectInput,
    value: string | string[] | ProjectVideo[]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setSubmitError('');
  }

  function fieldProps(field: string) {
    return {
      id: `${baseId}-${field}`,
      'aria-invalid': !!errors[field],
      'aria-describedby': errors[field]
        ? `${baseId}-${field}-error`
        : undefined,
    };
  }

  function fieldError(field: string) {
    return (
      errors[field] && (
        <p
          id={`${baseId}-${field}-error`}
          className="mt-2 text-sm text-red-300"
        >
          {errors[field]}
        </p>
      )
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setSubmitError('');
    const result = ProjectSchema.safeParse(formData);
    const nextErrors: Record<string, string> = {};
    if (!result.success)
      for (const issue of result.error.issues)
        nextErrors[String(issue.path[0])] = issue.message;
    const plainDescription = formData.description
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
    if (!plainDescription)
      nextErrors.description = 'La description est requise.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => {
        const firstInvalid = Array.from(
          formRef.current?.querySelectorAll<HTMLElement>(
            '[aria-invalid="true"], [data-invalid="true"]'
          ) ?? []
        ).find(
          (element) =>
            element.tabIndex >= 0 &&
            element.getClientRects().length > 0 &&
            !element.matches(':disabled')
        );
        firstInvalid?.focus();
      });
      return;
    }
    try {
      await onSubmit(
        mode === 'edit' && initialData?.id
          ? { ...formData, id: initialData.id }
          : formData
      );
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Le projet n’a pas été enregistré. Réessayez.'
      );
    }
  }

  function addVideo(video: ProjectVideo) {
    const videos = formData.videos || [];
    if (videos.length >= 8) {
      setVideoError('Vous pouvez ajouter jusqu’à 8 vidéos.');
      return;
    }
    change('videos', [...videos, video]);
    setYoutubeUrl('');
    setVideoError('');
    setShowAddVideo(false);
  }

  function addLinkVideo() {
    try {
      const url = new URL(youtubeUrl.trim());
      if (!['http:', 'https:'].includes(url.protocol))
        throw new Error('URL invalide');
      if (!getEmbedUrl(url.href)) throw new Error('Vidéo non prise en charge');
      addVideo({ type: 'youtube', url: url.href });
    } catch {
      setVideoError('Saisissez une URL YouTube ou Vimeo complète (https://…).');
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={busy}
      className="space-y-6"
    >
      <p className="text-sm text-white/65">
        Les champs marqués * sont obligatoires. Les modifications sont publiées
        après l’enregistrement.
      </p>
      {(submitError || Object.values(errors).some(Boolean)) && (
        <div
          role="alert"
          className="rounded-md border border-red-400/30 bg-red-500/5 p-4 text-sm text-red-300"
        >
          {submitError ||
            'Vérifiez les champs indiqués avant d’enregistrer le projet.'}
        </div>
      )}
      <fieldset
        disabled={busy}
        className="min-w-0 space-y-4 rounded-lg border border-white/10 p-4 sm:p-5"
      >
        <legend className="px-2 text-base font-semibold">Présentation</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${baseId}-title`}
              className="mb-2 block text-sm font-medium"
            >
              Titre du projet *
            </label>
            <input
              {...fieldProps('title')}
              type="text"
              required
              maxLength={100}
              value={formData.title}
              onChange={(event) => change('title', event.target.value)}
              className={inputClass}
            />
            {fieldError('title')}
          </div>
          <div>
            <label
              htmlFor={`${baseId}-date`}
              className="mb-2 block text-sm font-medium"
            >
              Date du projet *
            </label>
            <input
              {...fieldProps('date')}
              type="date"
              required
              value={formData.date}
              onChange={(event) => change('date', event.target.value)}
              className={inputClass}
            />
            {fieldError('date')}
          </div>
        </div>
        <div>
          <label
            htmlFor={`${baseId}-category`}
            className="mb-2 block text-sm font-medium"
          >
            Catégorie *
          </label>
          <select
            {...fieldProps('category')}
            required
            value={formData.category}
            onChange={(event) => change('category', event.target.value)}
            className={inputClass}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-[#111111]">
                {category}
              </option>
            ))}
          </select>
          {fieldError('category')}
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Description *</p>
          <RichTextEditor
            id={`${baseId}-description`}
            label="Description du projet"
            required
            describedBy={
              errors.description ? `${baseId}-description-error` : undefined
            }
            value={formData.description}
            onChange={(html) => change('description', html)}
            disabled={busy}
            error={!!errors.description}
            maxLength={5000}
          />
          {fieldError('description')}
        </div>
      </fieldset>
      <fieldset
        disabled={busy}
        className="min-w-0 space-y-4 rounded-lg border border-white/10 p-4 sm:p-5"
      >
        <legend className="px-2 text-base font-semibold">
          Images du projet *
        </legend>
        <p className="text-xs leading-5 text-white/65">
          Ajoutez au moins une image. La première image sert de couverture.
        </p>
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {formData.images.map((url, index) => (
              <div key={`${url}-${index}`} className="relative">
                <div className="relative aspect-video overflow-hidden rounded-md border border-white/15">
                  <SafeImage
                    src={url}
                    alt={`Image ${index + 1} du projet`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 240px"
                  />
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    change(
                      'images',
                      formData.images.filter((_, i) => i !== index)
                    )
                  }
                  aria-label={`Retirer l’image ${index + 1} du projet`}
                  className="absolute top-1 right-1 flex h-11 w-11 items-center justify-center rounded-md border border-white/30 bg-black/85 text-xl text-white hover:bg-black"
                >
                  ×
                </button>
                {index === 0 && (
                  <p className="mt-1 text-xs text-white/65">Couverture</p>
                )}
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          id={`${baseId}-images`}
          aria-describedby={
            errors.images ? `${baseId}-images-error` : undefined
          }
          data-invalid={!!errors.images}
          aria-expanded={showGalleryUploader}
          aria-controls={`${baseId}-gallery`}
          onClick={() => setShowGalleryUploader((value) => !value)}
          className={`${secondaryClass} data-[invalid=true]:border-red-400`}
        >
          {showGalleryUploader
            ? 'Fermer l’import d’images'
            : '+ Ajouter des images'}
        </button>
        <div id={`${baseId}-gallery`} hidden={!showGalleryUploader}>
          <FileUploader
            label="Importer les images du projet"
            required={!formData.images.length}
            errorMessage={errors.images}
            disabled={busy}
            onBusyChange={setUploading}
            accept="image/*"
            maxSizeMb={10}
            multiple
            onMultipleUploaded={(files) =>
              change('images', [
                ...formData.images,
                ...files.map((file) => file.url),
              ])
            }
          />
        </div>
        {fieldError('images')}
      </fieldset>
      <fieldset
        disabled={busy}
        className="min-w-0 space-y-4 rounded-lg border border-white/10 p-4 sm:p-5"
      >
        <legend className="px-2 text-base font-semibold">
          Vidéos{' '}
          <span className="text-sm font-normal text-white/65">
            (facultatif)
          </span>
        </legend>
        <p className="text-xs text-white/65">
          {formData.videos?.length || 0} / 8 vidéos · Liens YouTube/Vimeo ou
          fichiers vidéo.
        </p>
        {formData.videos?.map((video, index) => (
          <div
            key={`${video.url}-${index}`}
            className="flex min-w-0 items-center gap-3 rounded-md border border-white/15 p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                Vidéo {index + 1} ·{' '}
                {video.type === 'youtube'
                  ? 'YouTube / Vimeo'
                  : 'Fichier importé'}
              </p>
              <p className="mt-1 text-xs break-all text-white/65">
                {video.url}
              </p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                change(
                  'videos',
                  (formData.videos || []).filter((_, i) => i !== index)
                )
              }
              aria-label={`Retirer la vidéo ${index + 1}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl text-red-300 hover:bg-red-500/10"
            >
              ×
            </button>
          </div>
        ))}
        {(!formData.videos || formData.videos.length < 8) && (
          <button
            type="button"
            className={secondaryClass}
            onClick={() => {
              setYoutubeUrl('');
              setVideoError('');
              setVideoType('youtube');
              setShowAddVideo(true);
            }}
          >
            + Ajouter une vidéo
          </button>
        )}
        {fieldError('videos')}
      </fieldset>
      <fieldset
        disabled={busy}
        className="min-w-0 space-y-4 rounded-lg border border-white/10 p-4 sm:p-5"
      >
        <legend className="px-2 text-base font-semibold">
          Détails{' '}
          <span className="text-sm font-normal text-white/65">
            (facultatifs)
          </span>
        </legend>
        <div>
          <label
            htmlFor={`${baseId}-skill`}
            className="mb-2 block text-sm font-medium"
          >
            Compétences utilisées
          </label>
          <input
            {...fieldProps('skill')}
            type="text"
            maxLength={200}
            value={formData.skill}
            onChange={(event) => change('skill', event.target.value)}
            className={inputClass}
            aria-describedby={`${baseId}-skill-help${errors.skill ? ` ${baseId}-skill-error` : ''}`}
          />
          <p id={`${baseId}-skill-help`} className="mt-2 text-xs text-white/65">
            Séparez les compétences par une virgule, par exemple : modélisation,
            animation, compositing.
          </p>
          {fieldError('skill')}
        </div>
        <fieldset className="min-w-0">
          <legend className="mb-2 text-sm font-medium">
            Logiciels utilisés
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {SOFTWARE_LIST.map((software) => (
              <button
                key={software.id}
                type="button"
                disabled={busy}
                aria-pressed={formData.software.includes(software.id)}
                onClick={() =>
                  change(
                    'software',
                    formData.software.includes(software.id)
                      ? formData.software.filter((id) => id !== software.id)
                      : [...formData.software, software.id]
                  )
                }
                className={`flex min-h-11 flex-col items-center justify-center gap-2 rounded-md border p-3 ${formData.software.includes(software.id) ? 'border-white/60 bg-white/10' : 'border-white/15 bg-black/20 hover:bg-white/5'}`}
              >
                <Image
                  src={software.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-center text-xs text-white/85">
                  {software.name}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label
            htmlFor={`${baseId}-link`}
            className="mb-2 block text-sm font-medium"
          >
            Lien du projet
          </label>
          <input
            {...fieldProps('link')}
            type="url"
            value={formData.link}
            onChange={(event) => change('link', event.target.value)}
            placeholder="https://…"
            className={inputClass}
          />
          {fieldError('link')}
        </div>
      </fieldset>
      <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className={secondaryClass}
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
              : mode === 'create'
                ? 'Créer le projet'
                : 'Enregistrer les modifications'}
        </button>
      </div>
      <p role="status" className="sr-only">
        {uploading
          ? 'Import des médias en cours. Attendez avant d’enregistrer.'
          : isLoading
            ? 'Enregistrement du projet en cours…'
            : ''}
      </p>
      <Modal
        isOpen={showAddVideo}
        onClose={() => {
          if (!uploading) setShowAddVideo(false);
        }}
        title="Ajouter une vidéo"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div
            role="group"
            aria-label="Source de la vidéo"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              disabled={busy}
              aria-pressed={videoType === 'youtube'}
              onClick={() => setVideoType('youtube')}
              className={secondaryClass}
            >
              YouTube / Vimeo
            </button>
            <button
              type="button"
              disabled={busy}
              aria-pressed={videoType === 'upload'}
              onClick={() => setVideoType('upload')}
              className={secondaryClass}
            >
              Fichier vidéo
            </button>
          </div>
          {videoType === 'youtube' ? (
            <div>
              <label
                htmlFor={`${baseId}-video-url`}
                className="mb-2 block text-sm font-medium"
              >
                URL de la vidéo
              </label>
              <input
                id={`${baseId}-video-url`}
                type="url"
                value={youtubeUrl}
                onChange={(event) => {
                  setYoutubeUrl(event.target.value);
                  setVideoError('');
                }}
                aria-invalid={!!videoError}
                aria-describedby={`${baseId}-video-help`}
                className={inputClass}
                placeholder="https://www.youtube.com/watch?v=…"
              />
              <p
                id={`${baseId}-video-help`}
                className="mt-2 text-xs text-white/65"
              >
                Collez l’URL complète d’une vidéo YouTube ou Vimeo.
              </p>
              <button
                type="button"
                disabled={busy || !youtubeUrl.trim()}
                onClick={addLinkVideo}
                className={`${secondaryClass} mt-4`}
              >
                Ajouter cette vidéo
              </button>
            </div>
          ) : (
            <FileUploader
              label="Importer une vidéo"
              disabled={busy}
              onBusyChange={setUploading}
              accept="video/*"
              maxSizeMb={500}
              onUploaded={(url) => addVideo({ type: 'upload', url })}
            />
          )}
          {videoError && (
            <p role="alert" className="text-sm text-red-300">
              {videoError}
            </p>
          )}
        </div>
      </Modal>
    </form>
  );
}
