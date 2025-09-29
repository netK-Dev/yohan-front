'use client';

import { useState, useEffect } from 'react';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
} from '@/lib/types/slider';

export function useSliderMedia(activeOnly: boolean = false) {
  const [sliderMedia, setSliderMedia] = useState<SliderMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les médias slider
  const fetchSliderMedia = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (activeOnly) params.set('activeOnly', 'true');

      const response = await fetch(`/api/slider-media?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des médias slider');
      }

      const data = await response.json();
      setSliderMedia(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  // Créer un nouveau média slider
  const createSliderMedia = async (
    input: CreateSliderMediaInput
  ): Promise<SliderMedia> => {
    const response = await fetch('/api/slider-media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la création');
    }

    const newMedia = await response.json();
    setSliderMedia(prev => [...prev, newMedia]);
    return newMedia;
  };

  // Mettre à jour un média slider
  const updateSliderMedia = async (
    id: number,
    input: UpdateSliderMediaInput
  ): Promise<SliderMedia> => {
    const response = await fetch(`/api/slider-media/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la mise à jour');
    }

    const updatedMedia = await response.json();
    setSliderMedia(prev =>
      prev.map(media => (media.id === id ? updatedMedia : media))
    );
    return updatedMedia;
  };

  // Supprimer un média slider
  const deleteSliderMedia = async (id: number): Promise<void> => {
    const response = await fetch(`/api/slider-media/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la suppression');
    }

    setSliderMedia(prev => prev.filter(media => media.id !== id));
  };

  // Réorganiser l'ordre des médias
  const reorderSliderMedia = async (
    mediaId: number,
    newOrder: number
  ): Promise<void> => {
    await updateSliderMedia(mediaId, { order: newOrder });
    await fetchSliderMedia(); // Recharger pour avoir l'ordre correct
  };

  // Basculer le statut actif/inactif
  const toggleSliderMediaStatus = async (id: number): Promise<void> => {
    const media = sliderMedia.find(m => m.id === id);
    if (!media) return;

    await updateSliderMedia(id, { isActive: !media.isActive });
  };

  useEffect(() => {
    fetchSliderMedia();
  }, [activeOnly]);

  return {
    sliderMedia,
    isLoading,
    error,
    fetchSliderMedia,
    createSliderMedia,
    updateSliderMedia,
    deleteSliderMedia,
    reorderSliderMedia,
    toggleSliderMediaStatus,
  };
}
