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
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Récupérer tous les projets
  const fetchProjects = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des projets');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Créer un nouveau projet
  const createProject = React.useCallback(
    async (projectData: CreateProjectInput): Promise<Project> => {
      setIsLoading(true);
      setError(null);

      try {
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
        setProjects(prev => [newProject, ...prev]);
        return newProject;
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la création');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Mettre à jour un projet
  const updateProject = React.useCallback(
    async (
      id: string,
      projectData: Partial<UpdateProjectInput>
    ): Promise<Project> => {
      setIsLoading(true);
      setError(null);

      try {
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
        setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)));
        return updatedProject;
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Supprimer un projet
  const deleteProject = React.useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charger les projets au montage
  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
