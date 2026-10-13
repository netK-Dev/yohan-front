'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  HomeSection,
  HomeContentMap,
  HomeContentResponse,
} from '@/lib/types/page-content';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SHOWREEL_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_CTA_CONTENT,
} from '@/lib/defaults/home-defaults';

const DEFAULTS: HomeContentMap = {
  hero: DEFAULT_HERO_CONTENT,
  showreel: DEFAULT_SHOWREEL_CONTENT,
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
      showreel: 'idle',
      services: 'idle',
      cta: 'idle',
    }
  );

  const [saveErrors, setSaveErrors] = useState<
    Partial<Record<HomeSection, string>>
  >({});
  const requestRef = useRef<AbortController | null>(null);

  // Charger tout le contenu
  const loadContent = useCallback(() => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    return fetch('/api/page-content?page=home', {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du contenu');
        }

        const data: HomeContentResponse = await response.json();
        if (controller.signal.aborted) return;
        setError(null);

        setContent({
          hero: data.hero ?? DEFAULTS.hero,
          showreel: data.showreel ?? DEFAULTS.showreel,
          services: data.services ?? DEFAULTS.services,
          cta: data.cta ?? DEFAULTS.cta,
        });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
  }, []);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await loadContent();
  }, [loadContent]);

  // Sauvegarder une section
  const saveSection = useCallback(
    async <S extends HomeSection>(
      section: S,
      sectionContent: HomeContentMap[S]
    ): Promise<boolean> => {
      setSaveStatus((prev) => ({ ...prev, [section]: 'saving' }));
      setSaveErrors((prev) => ({ ...prev, [section]: '' }));

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

        return true;
      } catch (err) {
        setSaveErrors((prev) => ({
          ...prev,
          [section]:
            err instanceof Error
              ? err.message
              : 'Enregistrement impossible. Vérifiez votre connexion et réessayez.',
        }));
        setSaveStatus((prev) => ({ ...prev, [section]: 'error' }));

        return false;
      }
    },
    []
  );

  const markSectionDirty = useCallback((section: HomeSection) => {
    setSaveStatus((prev) =>
      prev[section] === 'idle' ? prev : { ...prev, [section]: 'idle' }
    );
    setSaveErrors((prev) =>
      prev[section] ? { ...prev, [section]: '' } : prev
    );
  }, []);

  // Réinitialiser une section aux valeurs par défaut
  const resetSection = useCallback(
    async <S extends HomeSection>(section: S): Promise<boolean> => {
      return saveSection(section, DEFAULTS[section]);
    },
    [saveSection]
  );

  useEffect(() => {
    void loadContent();
    return () => requestRef.current?.abort();
  }, [loadContent]);

  return {
    content,
    isLoading,
    error,
    saveStatus,
    saveErrors,
    markSectionDirty,
    saveSection,
    resetSection,
    refetch: fetchContent,
  };
}
