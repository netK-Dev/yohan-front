'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SafeImage from '@/components/ui/SafeImage';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useSession } from '@/lib/auth-client';
import { useProjects } from '@/lib/hooks/useProjects';
import { Project } from '@/lib/types/project';
import { PROJECT_CATEGORIES } from '@/lib/types/project';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    projects,
    isLoading: projectsLoading,
    deleteProject,
  } = useProjects();

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}" ?`)) {
      return;
    }

    try {
      await deleteProject(project.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  if (isPending) {
    return (
      <AdminPageLayout title="Chargement...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
            <p className="text-sm text-white/60">Chargement...</p>
          </div>
        </div>
      </AdminPageLayout>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <AdminPageLayout
      title="Gestion des Projets"
      action={
        <Link
          href="/admin/dashboard/new"
          className={`w-full rounded-md px-4 py-3 text-sm font-medium sm:w-auto sm:py-2 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition`}
        >
          Nouveau Projet
        </Link>
      }
    >
      {projectsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
        </div>
      ) : (
        <section className="space-y-10">
          {projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur">
              <p className="text-white/60">Aucun projet pour le moment.</p>
              <Link
                href="/admin/dashboard/new"
                className={`mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} transition`}
              >
                Créer votre premier projet
              </Link>
            </div>
          ) : (
            PROJECT_CATEGORIES.map(category => {
              const items = projects.filter(p => p.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold tracking-wide text-white/80">
                      {category}
                    </h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(project => (
                      <div
                        key={project.id}
                        className="group relative h-40 overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-lg backdrop-blur transition-colors hover:border-white/20 sm:h-32"
                      >
                        <SafeImage
                          src={project.images[0] || ''}
                          alt={project.title}
                          fill
                          className="object-cover opacity-60 transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

                        <div className="relative flex h-full flex-col justify-between p-4 sm:p-3">
                          <div>
                            <h3 className="line-clamp-1 text-sm font-medium text-white/90">
                              {project.title}
                            </h3>
                            <p className="text-xs text-white/60">
                              {new Date(project.date).toLocaleDateString(
                                'fr-FR'
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/dashboard/${project.id}/edit`}
                              className={`rounded-md px-3 py-2 text-xs ${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} ${COLOR_COMBINATIONS.secondaryButton.hover} transition`}
                            >
                              Éditer
                            </Link>
                            <button
                              onClick={() => handleDeleteProject(project)}
                              className="rounded-md border border-red-500/20 bg-red-600/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-600/30"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}
    </AdminPageLayout>
  );
}
