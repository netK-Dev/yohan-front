'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { AdminError, AdminLoading } from '@/components/admin/AdminFeedback';
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
  const [loadedId, setLoadedId] = React.useState<string | null>(null);
  const [retry, setRetry] = React.useState(0);
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(
        `/admin/login?returnTo=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [session, isPending, router]);

  React.useEffect(() => {
    const controller = new AbortController();
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        if (!response.ok) {
          if (response.status === 404) {
            setLoadError('Projet non trouvé');
          } else {
            setLoadError('Erreur lors du chargement du projet');
          }
          return;
        }
        const data = await response.json();
        if (controller.signal.aborted) return;
        setLoadError(null);
        setProject(data);
      } catch {
        if (controller.signal.aborted) return;
        setLoadError('Erreur de connexion');
      } finally {
        if (!controller.signal.aborted) {
          setLoadedId(projectId);
          setIsLoadingProject(false);
        }
      }
    }

    if (projectId && session?.user) {
      fetchProject();
    }
    return () => controller.abort();
  }, [projectId, session?.user, retry]);

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
    software: p.software || [],
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
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }

      router.replace('/admin/dashboard?saved=updated');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  if (!isPending && !session?.user) return null;

  // Loading
  if (isPending || isLoadingProject || loadedId !== projectId) {
    return (
      <AdminPageLayout title="Chargement...">
        <AdminLoading>Chargement du projet…</AdminLoading>
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
        <div className="mx-auto max-w-lg">
          <AdminError
            message={loadError}
            onRetry={() => {
              setLoadError(null);
              setIsLoadingProject(true);
              setRetry((value) => value + 1);
            }}
          />
          <Link
            href="/admin/dashboard"
            className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-4 text-sm hover:bg-white/10"
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
          className={`rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-6`}
        >
          <ProjectForm
            key={project.id}
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
