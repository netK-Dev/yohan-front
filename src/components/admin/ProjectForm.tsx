'use client';

import React from 'react';
import SafeImage from '@/components/ui/SafeImage';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectSchema,
  PROJECT_CATEGORIES,
} from '@/lib/types/project';
import FileUploader from '@/components/ui/FileUploader';

interface ProjectFormProps {
  initialData?: Partial<UpdateProjectInput>;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: ProjectFormProps) {
  const [formData, setFormData] = React.useState<CreateProjectInput>({
    title: initialData?.title || '',
    category: initialData?.category || PROJECT_CATEGORIES[0],
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    images: initialData?.images || [],
    video: initialData?.video || '',
    videoFile: initialData?.videoFile || '',
    skill: initialData?.skill || '',
    link: initialData?.link || '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showGalleryUploader, setShowGalleryUploader] = React.useState(false);
  const [showVideoUploader, setShowVideoUploader] = React.useState(false);

  const handleChange = (
    field: keyof CreateProjectInput,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    try {
      ProjectSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      const fieldErrors: Record<string, string> = {};
      if (error && typeof error === 'object' && 'errors' in error) {
        (error.errors as Array<{ path?: string[]; message?: string }>)?.forEach(
          err => {
            if (err.path?.[0]) {
              fieldErrors[err.path[0]] = err.message || 'Erreur de validation';
            }
          }
        );
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'edit' && initialData?.id) {
        await onSubmit({ ...formData, id: initialData.id });
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  const handleGalleryUploaded = (
    files: Array<{ url: string; pathname: string }>
  ) => {
    const newImages = files.map(f => f.url);
    handleChange('images', [...formData.images, ...newImages]);
    setShowGalleryUploader(false);
  };

  const handleVideoUploaded = (url: string) => {
    handleChange('videoFile', url);
    setShowVideoUploader(false);
  };

  const removeGalleryImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    handleChange('images', newImages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Titre, Catégorie et Date */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            Titre du projet *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
            className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
              errors.title
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 focus:border-white/20'
            }`}
            placeholder="Ex: Intro FX Neon"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            Date du projet *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={e => handleChange('date', e.target.value)}
            className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
              errors.date
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 focus:border-white/20'
            }`}
            disabled={isLoading}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-400">{errors.date}</p>
          )}
        </div>
      </div>

      {/* Catégorie */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Catégorie *
        </label>
        <select
          value={formData.category}
          onChange={e => handleChange('category', e.target.value)}
          className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
            errors.category
              ? 'border-red-500 focus:border-red-400'
              : 'border-white/10 focus:border-white/20'
          }`}
          disabled={isLoading}
        >
          {PROJECT_CATEGORIES.map(category => (
            <option key={category} value={category} className="bg-black">
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-400">{errors.category}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          rows={3}
          className={`w-full resize-none rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
            errors.description
              ? 'border-red-500 focus:border-red-400'
              : 'border-white/10 focus:border-white/20'
          }`}
          placeholder="Décrivez le projet en détail..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Galerie d'images */}
      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <label className="text-sm font-medium text-white/80">
            Images du projet *
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-2">
            {formData.images.map((imageUrl, index) => (
              <div key={index} className="group relative">
                <div className="relative h-20 w-full overflow-hidden rounded-md border border-white/10">
                  <SafeImage
                    src={imageUrl}
                    alt={`Galerie ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowGalleryUploader(true)}
          className="w-full rounded-md border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/60 transition hover:border-white/40 hover:text-white/80"
        >
          + Ajouter des images
        </button>

        {showGalleryUploader && (
          <div className="mt-3">
            <FileUploader
              accept="image/*"
              maxSizeMb={10}
              multiple={true}
              onMultipleUploaded={handleGalleryUploaded}
            />
            <button
              type="button"
              onClick={() => setShowGalleryUploader(false)}
              className="mt-2 text-xs text-white/60 underline hover:text-white/80"
            >
              Annuler
            </button>
          </div>
        )}

        {errors.images && (
          <p className="mt-1 text-xs text-red-400">{errors.images}</p>
        )}
      </div>

      {/* Champs optionnels */}
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <label className="text-sm font-medium text-white/80">
              URL de la vidéo
            </label>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs text-red-400">
              Optionnel
            </span>
          </div>
          <input
            type="url"
            value={formData.video}
            onChange={e => handleChange('video', e.target.value)}
            className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
              errors.video
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 focus:border-white/20'
            }`}
            placeholder="https://..."
            disabled={isLoading}
          />
          {errors.video && (
            <p className="mt-1 text-xs text-red-400">{errors.video}</p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <label className="text-sm font-medium text-white/80">
              Upload vidéo
            </label>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs text-red-400">
              Optionnel
            </span>
          </div>

          {formData.videoFile && !showVideoUploader ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2">
                <svg
                  className="h-4 w-4 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 4a1 1 0 100 2h2a1 1 0 100-2H9z" />
                </svg>
                <span className="text-sm text-white/70">Vidéo uploadée</span>
                <a
                  href={formData.videoFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Voir
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoUploader(true)}
                className="text-xs text-white/60 underline hover:text-white/80"
              >
                Changer la vidéo
              </button>
            </div>
          ) : showVideoUploader ? (
            <div>
              <FileUploader
                accept="video/*"
                maxSizeMb={50}
                onUploaded={handleVideoUploaded}
              />
              <button
                type="button"
                onClick={() => setShowVideoUploader(false)}
                className="mt-2 text-xs text-white/60 underline hover:text-white/80"
              >
                Annuler
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowVideoUploader(true)}
              className="w-full rounded-md border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/60 transition hover:border-white/40 hover:text-white/80"
            >
              + Uploader une vidéo
            </button>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <label className="text-sm font-medium text-white/80">
              Compétences utilisées
            </label>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs text-red-400">
              Optionnel
            </span>
          </div>

          {/* Tutoriel */}
          <div className="mb-3 rounded-md border border-blue-500/20 bg-blue-500/10 p-3">
            <div className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-xs text-blue-300">
                <p className="mb-1 font-medium">
                  💡 Comment séparer les compétences :
                </p>
                <p className="text-blue-200/80">
                  Séparez chaque compétence par une virgule.
                </p>
                <p className="mt-1 text-blue-200/70">
                  Exemple : Blender, After Effects, Cinema 4D
                </p>
              </div>
            </div>
          </div>

          <input
            type="text"
            value={formData.skill}
            onChange={e => handleChange('skill', e.target.value)}
            className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
              errors.skill
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 focus:border-white/20'
            }`}
            placeholder="Ex: Blender, After Effects, Cinema 4D"
            disabled={isLoading}
          />
          {errors.skill && (
            <p className="mt-1 text-xs text-red-400">{errors.skill}</p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <label className="text-sm font-medium text-white/80">
              Lien du projet
            </label>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs text-red-400">
              Optionnel
            </span>
          </div>
          <input
            type="url"
            value={formData.link}
            onChange={e => handleChange('link', e.target.value)}
            className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
              errors.link
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 focus:border-white/20'
            }`}
            placeholder="https://..."
            disabled={isLoading}
          />
          {errors.link && (
            <p className="mt-1 text-xs text-red-400">{errors.link}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} ${COLOR_COMBINATIONS.secondaryButton.hover} transition disabled:opacity-50`}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition disabled:opacity-50`}
        >
          {isLoading
            ? 'Sauvegarde...'
            : mode === 'create'
              ? 'Créer le projet'
              : 'Mettre à jour'}
        </button>
      </div>
    </form>
  );
}
