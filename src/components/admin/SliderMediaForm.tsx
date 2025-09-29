'use client';

import React from 'react';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
  SLIDER_CATEGORIES,
  SLIDER_MEDIA_TYPES,
} from '@/lib/types/slider';
import { COLOR_COMBINATIONS } from '@/lib/colors';
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

export default function SliderMediaForm({
  sliderMedia,
  onSubmit,
  onCancel,
  isLoading = false,
}: SliderMediaFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.mediaUrl.trim()) {
      alert('Titre et média requis');
      return;
    }

    await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      mediaUrl: formData.mediaUrl,
      mediaPath: formData.mediaPath || undefined,
      mediaType: formData.mediaType,
      category: formData.category || undefined,
      order: formData.order,
      isActive: formData.isActive,
    });
  };

  const handleMediaUpload = (url: string, pathname: string) => {
    setFormData(prev => ({
      ...prev,
      mediaUrl: url,
      mediaPath: pathname,
      mediaType: url.toLowerCase().includes('.gif') ? 'gif' : 'image',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titre */}
      <div>
        <label
          className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
        >
          Titre *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e =>
            setFormData(prev => ({ ...prev, title: e.target.value }))
          }
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#ff0015] focus:outline-none focus:ring-2 focus:ring-[#ff0015]/20"
          placeholder="Titre du média"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
        >
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e =>
            setFormData(prev => ({ ...prev, description: e.target.value }))
          }
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#ff0015] focus:outline-none focus:ring-2 focus:ring-[#ff0015]/20"
          placeholder="Description du média (optionnel)"
          rows={3}
        />
      </div>

      {/* Upload de média */}
      <div>
        <label
          className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
        >
          Média *
        </label>

        {formData.mediaUrl ? (
          <div className="space-y-4">
            {/* Prévisualisation */}
            <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-white/10">
              <SafeImage
                src={formData.mediaUrl}
                alt={formData.title || 'Média'}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>

            {/* Bouton pour changer */}
            <FileUploader
              onUploaded={handleMediaUpload}
              accept="image/*"
              maxSizeMb={10}
            />
          </div>
        ) : (
          <FileUploader
            onUploaded={handleMediaUpload}
            accept="image/*"
            maxSizeMb={10}
          />
        )}
      </div>

      {/* Catégorie */}
      <div>
        <label
          className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
        >
          Catégorie
        </label>
        <select
          value={formData.category}
          onChange={e =>
            setFormData(prev => ({ ...prev, category: e.target.value }))
          }
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-all duration-300 focus:border-[#ff0015] focus:outline-none focus:ring-2 focus:ring-[#ff0015]/20"
        >
          <option value="">Sélectionner une catégorie</option>
          {SLIDER_CATEGORIES.map(category => (
            <option key={category} value={category} className="bg-gray-900">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Ordre et Statut */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
          >
            Ordre d'affichage
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                order: parseInt(e.target.value) || 0,
              }))
            }
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#ff0015] focus:outline-none focus:ring-2 focus:ring-[#ff0015]/20"
            min="0"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium ${COLOR_COMBINATIONS.page.text} mb-2`}
          >
            Statut
          </label>
          <div className="flex items-center space-x-3 pt-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={e =>
                setFormData(prev => ({ ...prev, isActive: e.target.checked }))
              }
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#ff0015] focus:ring-[#ff0015]/20"
            />
            <label
              htmlFor="isActive"
              className={`text-sm ${COLOR_COMBINATIONS.page.text}`}
            >
              Actif dans le slider
            </label>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300 disabled:opacity-50 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover}`}
        >
          {isLoading
            ? 'Enregistrement...'
            : sliderMedia
              ? 'Mettre à jour'
              : 'Créer'}
        </button>
      </div>
    </form>
  );
}
