'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
} from '@/lib/types/slider';

export function useSliderMedia(activeOnly: boolean = false) {
  const [sliderMedia, setSliderMedia] = useState<SliderMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestRef = useRef<AbortController | null>(null);

  // Charger les médias slider
  const loadSliderMedia = useCallback(() => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    const params = new URLSearchParams();
    if (activeOnly) params.set('activeOnly', 'true');

    return fetch(`/api/slider-media?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des médias slider');
        }

        const data = await response.json();
        if (controller.signal.aborted) return;
        setError(null);
        setSliderMedia(data);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
  }, [activeOnly]);

  const fetchSliderMedia = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await loadSliderMedia();
  }, [loadSliderMedia]);

  // Créer un nouveau média slider
  const createSliderMedia = useCallback(
    async (input: CreateSliderMediaInput): Promise<SliderMedia> => {
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
      requestRef.current?.abort();
      setIsLoading(false);
      setSliderMedia((prev) => [...prev, newMedia]);
      return newMedia;
    },
    []
  );

  // Mettre à jour un média slider
  const updateSliderMedia = useCallback(
    async (id: number, input: UpdateSliderMediaInput): Promise<SliderMedia> => {
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
      requestRef.current?.abort();
      setIsLoading(false);
      setSliderMedia((prev) =>
        prev.map((media) => (media.id === id ? updatedMedia : media))
      );
      return updatedMedia;
    },
    []
  );

  // Supprimer un média slider
  const deleteSliderMedia = useCallback(async (id: number): Promise<void> => {
    const response = await fetch(`/api/slider-media/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la suppression');
    }

    requestRef.current?.abort();

    setIsLoading(false);

    setSliderMedia((prev) => prev.filter((media) => media.id !== id));
  }, []);

  // Réorganiser l'ordre des médias
  const reorderSliderMedia = useCallback(
    async (mediaId: number, newOrder: number): Promise<void> => {
      await updateSliderMedia(mediaId, { order: newOrder });
      await fetchSliderMedia(); // Recharger pour avoir l'ordre correct
    },
    [updateSliderMedia, fetchSliderMedia]
  );

  // Basculer le statut actif/inactif
  const toggleSliderMediaStatus = useCallback(
    async (id: number): Promise<void> => {
      const media = sliderMedia.find((m) => m.id === id);
      if (!media) return;

      await updateSliderMedia(id, { isActive: !media.isActive });
    },
    [sliderMedia, updateSliderMedia]
  );

  useEffect(() => {
    void loadSliderMedia();
    return () => requestRef.current?.abort();
  }, [loadSliderMedia]);

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
