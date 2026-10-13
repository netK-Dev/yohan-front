'use client';

import React from 'react';
import {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
} from '@/lib/types/project';

// Hook pour gérer les projets côté client
export function useProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const requestRef = React.useRef<AbortController | null>(null);

  // Récupérer tous les projets
  const loadProjects = React.useCallback(() => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    return fetch('/api/projects', {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des projets');
        }

        const data = await response.json();
        if (controller.signal.aborted) return;
        setError(null);
        setProjects(data);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
  }, []);

  const fetchProjects = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await loadProjects();
  }, [loadProjects]);

  // Créer un nouveau projet
  const createProject = React.useCallback(
    async (projectData: CreateProjectInput): Promise<Project> => {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      const newProject = await response.json();
      requestRef.current?.abort();
      setIsLoading(false);
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    },
    []
  );

  // Mettre à jour un projet
  const updateProject = React.useCallback(
    async (
      id: number,
      projectData: Partial<UpdateProjectInput>
    ): Promise<Project> => {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }

      const updatedProject = await response.json();
      requestRef.current?.abort();
      setIsLoading(false);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updatedProject : p))
      );
      return updatedProject;
    },
    []
  );

  // Supprimer un projet
  const deleteProject = React.useCallback(async (id: number): Promise<void> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la suppression');
    }

    requestRef.current?.abort();

    setIsLoading(false);

    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Charger les projets au montage (une seule fois)
  React.useEffect(() => {
    void loadProjects();
    return () => requestRef.current?.abort();
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
