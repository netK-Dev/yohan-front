'use client';

import React from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectSchema,
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
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    image: initialData?.image || '',
    video: initialData?.video || '',
    skill: initialData?.skill || '',
    link: initialData?.link || '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showImageUploader, setShowImageUploader] = React.useState(
    !formData.image
  );

  const handleChange = (field: keyof CreateProjectInput, value: string) => {
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
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
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

  const handleImageUploaded = (url: string) => {
    handleChange('image', url);
    setShowImageUploader(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titre */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
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

      {/* Date */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
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

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          rows={4}
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

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Image principale *
        </label>

        {formData.image && !showImageUploader ? (
          <div className="space-y-3">
            <div className="relative h-32 w-full overflow-hidden rounded-md border border-white/10">
              <img
                src={formData.image}
                alt="Aperçu"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowImageUploader(true)}
              className="text-xs text-white/60 underline hover:text-white/80"
            >
              Changer l'image
            </button>
          </div>
        ) : (
          <FileUploader
            accept="image/*"
            maxSizeMb={10}
            onUploaded={handleImageUploaded}
          />
        )}

        {errors.image && (
          <p className="mt-1 text-xs text-red-400">{errors.image}</p>
        )}
      </div>

      {/* Vidéo (optionnel) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          URL de la vidéo
        </label>
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

      {/* Compétences (optionnel) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Compétences utilisées
        </label>
        <input
          type="text"
          value={formData.skill}
          onChange={e => handleChange('skill', e.target.value)}
          className={`w-full rounded-md border bg-black/60 px-3 py-2 text-sm text-white outline-none ${
            errors.skill
              ? 'border-red-500 focus:border-red-400'
              : 'border-white/10 focus:border-white/20'
          }`}
          placeholder="Ex: Blender, After Effects, Cinema 4D..."
          disabled={isLoading}
        />
        {errors.skill && (
          <p className="mt-1 text-xs text-red-400">{errors.skill}</p>
        )}
      </div>

      {/* Lien (optionnel) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Lien du projet
        </label>
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
