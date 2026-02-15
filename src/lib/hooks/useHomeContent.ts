'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  HomeSection,
  HomeContentMap,
  HomeContentResponse,
} from '@/lib/types/page-content';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_CTA_CONTENT,
} from '@/lib/defaults/home-defaults';

const DEFAULTS: HomeContentMap = {
  hero: DEFAULT_HERO_CONTENT,
  services: DEFAULT_SERVICES_CONTENT,
  cta: DEFAULT_CTA_CONTENT,
};

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export function useHomeContent() {
  const [content, setContent] = useState<HomeContentMap>(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<Record<HomeSection, SaveStatus>>(
    {
      hero: 'idle',
      services: 'idle',
      cta: 'idle',
    }
  );

  // Charger tout le contenu
  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/page-content?page=home');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du contenu');
      }

      const data: HomeContentResponse = await response.json();

      setContent({
        hero: data.hero ?? DEFAULTS.hero,
        services: data.services ?? DEFAULTS.services,
        cta: data.cta ?? DEFAULTS.cta,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sauvegarder une section
  const saveSection = useCallback(
    async <S extends HomeSection>(
      section: S,
      sectionContent: HomeContentMap[S]
    ): Promise<boolean> => {
      setSaveStatus((prev) => ({ ...prev, [section]: 'saving' }));

      try {
        const response = await fetch(`/api/page-content/${section}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: 'home', content: sectionContent }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
        }

        const result = await response.json();

        // Mettre à jour le state local
        setContent((prev) => ({
          ...prev,
          [section]: result.content,
        }));

        setSaveStatus((prev) => ({ ...prev, [section]: 'success' }));

        // Remettre à 'idle' après 3s
        setTimeout(() => {
          setSaveStatus((prev) => ({ ...prev, [section]: 'idle' }));
        }, 3000);

        return true;
      } catch (err) {
        console.error(`Erreur sauvegarde section ${section}:`, err);
        setSaveStatus((prev) => ({ ...prev, [section]: 'error' }));

        setTimeout(() => {
          setSaveStatus((prev) => ({ ...prev, [section]: 'idle' }));
        }, 5000);

        return false;
      }
    },
    []
  );

  // Réinitialiser une section aux valeurs par défaut
  const resetSection = useCallback(
    async <S extends HomeSection>(section: S): Promise<boolean> => {
      return saveSection(section, DEFAULTS[section]);
    },
    [saveSection]
  );

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    isLoading,
    error,
    saveStatus,
    saveSection,
    resetSection,
    refetch: fetchContent,
  };
}
