'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from '@/lib/types/project';
import { type ProjectVideo } from '@/lib/types/video';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const { data: session, isPending } = useSession();

  const [project, setProject] = React.useState<Project | null>(null);
  const [isLoadingProject, setIsLoadingProject] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  React.useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setLoadError('Projet non trouvé');
          } else {
            setLoadError('Erreur lors du chargement du projet');
          }
          return;
        }
        const data = await response.json();
        setProject(data);
      } catch {
        setLoadError('Erreur de connexion');
      } finally {
        setIsLoadingProject(false);
      }
    }

    if (projectId && session?.user) {
      fetchProject();
    }
  }, [projectId, session?.user]);

  const formatProjectForEdit = (p: Project): UpdateProjectInput => ({
    id: p.id,
    title: p.title,
    category: p.category,
    date: new Date(p.date).toISOString().split('T')[0],
    description: p.description,
    images: p.images,
    videos: (p.videos as unknown as ProjectVideo[]) || [],
    video: p.video || '',
    videoFile: p.videoFile || '',
    skill: p.skill || '',
    link: p.link || '',
  });

  const handleSubmit = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    setFormLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Erreur lors de la mise à jour'
        );
      }

      router.replace('/admin/dashboard');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  // Loading
  if (isPending || isLoadingProject) {
    return (
      <AdminPageLayout title="Chargement...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
            <p className="text-sm text-white/60">Chargement du projet...</p>
          </div>
        </div>
      </AdminPageLayout>
    );
  }

  // Erreur
  if (loadError) {
    return (
      <AdminPageLayout
        title="Erreur"
        breadcrumbs={[
          { label: 'Projets', href: '/admin/dashboard' },
          { label: 'Erreur' },
        ]}
      >
        <div className="mx-auto max-w-lg rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-red-400">{loadError}</p>
          <Link
            href="/admin/dashboard"
            className="mt-4 inline-block rounded-md bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            Retour aux projets
          </Link>
        </div>
      </AdminPageLayout>
    );
  }

  if (!session?.user || !project) return null;

  return (
    <AdminPageLayout
      title={`Éditer : ${project.title}`}
      breadcrumbs={[
        { label: 'Projets', href: '/admin/dashboard' },
        { label: project.title },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <div
          className={`rounded-xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-4 shadow-xl backdrop-blur sm:p-6`}
        >
          <ProjectForm
            mode="edit"
            initialData={formatProjectForEdit(project)}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
