'use client';

import React from 'react';
import SafeImage from '@/components/ui/SafeImage';
import Modal from '@/components/ui/Modal';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectSchema,
  PROJECT_CATEGORIES,
} from '@/lib/types/project';
import { ProjectVideo } from '@/lib/types/video';
import FileUploader from '@/components/ui/FileUploader';
import RichTextEditor from '@/components/ui/RichTextEditor';

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
    videos: initialData?.videos || [],
    video: initialData?.video || '',
    videoFile: initialData?.videoFile || '',
    skill: initialData?.skill || '',
    link: initialData?.link || '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showGalleryUploader, setShowGalleryUploader] = React.useState(false);

  // États pour la gestion des vidéos multiples
  const [showAddVideo, setShowAddVideo] = React.useState(false);
  const [videoType, setVideoType] = React.useState<'youtube' | 'upload'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const [showVideoUpload, setShowVideoUpload] = React.useState(false);

  const handleChange = (
    field: keyof CreateProjectInput,
    value: string | string[] | ProjectVideo[]
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

  const removeGalleryImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    handleChange('images', newImages);
  };

  // Handlers pour la gestion des vidéos multiples
  const handleAddYoutubeVideo = () => {
    if (!youtubeUrl.trim()) {
      alert('Veuillez entrer une URL YouTube/Vimeo');
      return;
    }

    const currentVideos = formData.videos || [];
    if (currentVideos.length >= 8) {
      alert('Maximum 8 vidéos autorisées');
      return;
    }

    const newVideo: ProjectVideo = {
      type: 'youtube',
      url: youtubeUrl.trim(),
    };

    handleChange('videos', [...currentVideos, newVideo]);
    setYoutubeUrl('');
    setShowAddVideo(false);
    setShowVideoUpload(false);
  };

  const handleVideoFileUploaded = (url: string) => {
    const currentVideos = formData.videos || [];
    if (currentVideos.length >= 8) {
      alert('Maximum 8 vidéos autorisées');
      return;
    }

    const newVideo: ProjectVideo = {
      type: 'upload',
      url: url,
    };

    handleChange('videos', [...currentVideos, newVideo]);
    setShowVideoUpload(false);
    setShowAddVideo(false);
  };

  const removeVideo = (index: number) => {
    const currentVideos = formData.videos || [];
    const newVideos = currentVideos.filter((_, i) => i !== index);
    handleChange('videos', newVideos);
  };

  const openAddVideoModal = () => {
    setYoutubeUrl('');
    setVideoType('youtube');
    setShowVideoUpload(false);
    setShowAddVideo(true);
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
        <RichTextEditor
          value={formData.description}
          onChange={html => handleChange('description', html)}
          placeholder="Décrivez le projet en détail..."
          disabled={isLoading}
          error={!!errors.description}
          maxLength={5000}
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
          <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-2">
            {formData.images.map((imageUrl, index) => (
              <div key={index} className="group relative">
                <div className="relative h-24 w-full overflow-hidden rounded-md border border-white/10 sm:h-20">
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
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-100 shadow-lg sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:opacity-0 sm:shadow-none sm:transition sm:group-hover:opacity-100"
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

      {/* Vidéos du projet (nouveau système) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <label className="text-sm font-medium text-white/80">
              Vidéos du projet
            </label>
          </div>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50">
            {formData.videos?.length || 0} / 8
          </span>
        </div>

        {/* Liste des vidéos existantes */}
        {formData.videos && formData.videos.length > 0 && (
          <div className="mb-3 space-y-2">
            {formData.videos.map((video, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-3 rounded-lg border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-3 transition hover:border-white/20"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                  video.type === 'youtube'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {video.type === 'youtube' ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white/80">
                      {video.type === 'youtube' ? 'YouTube / Vimeo' : 'Fichier uploadé'}
                    </span>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/40">
                      {video.type}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-white/40">
                    {video.url}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-transparent text-white/30 transition hover:bg-red-500/10 hover:text-red-400 sm:h-8 sm:w-8"
                  aria-label="Supprimer la vidéo"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bouton ajouter vidéo */}
        {(!formData.videos || formData.videos.length < 8) && (
          <button
            type="button"
            onClick={openAddVideoModal}
            className="group flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/[0.02] px-4 py-4 text-sm text-white/50 transition hover:border-[#ff0015]/50 hover:bg-[#ff0015]/5 hover:text-white/80"
            disabled={isLoading}
          >
            <svg className="h-5 w-5 transition group-hover:text-[#ff0015]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Ajouter une vidéo</span>
          </button>
        )}
      </div>

      {/* Modal d'ajout de vidéo */}
      {showAddVideo && (
        <Modal
          isOpen={showAddVideo}
          onClose={() => {
            setShowAddVideo(false);
            setShowVideoUpload(false);
            setYoutubeUrl('');
          }}
          title="Ajouter une vidéo"
        >
          <div className="space-y-6">
            {/* Sélection du type de source */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
                Source de la vidéo
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVideoType('youtube');
                    setShowVideoUpload(false);
                  }}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition sm:gap-3 sm:p-5 ${
                    videoType === 'youtube'
                      ? 'border-[#ff0015] bg-[#ff0015]/5'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {videoType === 'youtube' && (
                    <div className="absolute right-2 top-2">
                      <svg className="h-5 w-5 text-[#ff0015]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    videoType === 'youtube' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40'
                  }`}>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${videoType === 'youtube' ? 'text-white' : 'text-white/70'}`}>
                      Lien externe
                    </p>
                    <p className="mt-0.5 text-xs text-white/40">
                      YouTube, Vimeo
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVideoType('upload');
                    setShowVideoUpload(true);
                  }}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition sm:gap-3 sm:p-5 ${
                    videoType === 'upload'
                      ? 'border-[#ff0015] bg-[#ff0015]/5'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {videoType === 'upload' && (
                    <div className="absolute right-2 top-2">
                      <svg className="h-5 w-5 text-[#ff0015]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    videoType === 'upload' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'
                  }`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${videoType === 'upload' ? 'text-white' : 'text-white/70'}`}>
                      Upload fichier
                    </p>
                    <p className="mt-0.5 text-xs text-white/40">
                      MP4, WebM (max 50MB)
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Séparateur */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Formulaire selon le type */}
            {videoType === 'youtube' && !showVideoUpload ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    URL de la vidéo
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={e => setYoutubeUrl(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#ff0015]/50 focus:ring-1 focus:ring-[#ff0015]/20"
                    placeholder="https://www.youtube.com/watch?v=..."
                    autoFocus
                  />
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/40">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Collez l&apos;URL complète de YouTube ou Vimeo
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddYoutubeVideo}
                  disabled={!youtubeUrl.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff0015] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#ff0015]/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter cette vidéo
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Sélectionnez un fichier vidéo
                </p>
                <FileUploader
                  accept="video/*"
                  maxSizeMb={50}
                  onUploaded={handleVideoFileUploaded}
                />
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Champs optionnels */}
      <div className="space-y-4">
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
