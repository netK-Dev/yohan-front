'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import AdminHeader from '@/components/admin/AdminHeader';
import { useSession } from '@/lib/auth-client';
import Modal from '@/components/ui/Modal';
import ProjectForm from '@/components/admin/ProjectForm';
import { useProjects } from '@/lib/hooks/useProjects';
import {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
} from '@/lib/types/project';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    projects,
    isLoading: projectsLoading,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();

  // États pour les modals
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(
    null
  );
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  // Handlers pour les projets
  const handleCreateProject = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    setFormLoading(true);
    try {
      await createProject(data as CreateProjectInput);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    if (!editingProject) return;

    setFormLoading(true);
    try {
      await updateProject(editingProject.id, data);
      setEditingProject(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setFormLoading(false);
    }
  };

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

  const formatProjectForEdit = (project: Project): UpdateProjectInput => ({
    id: project.id,
    title: project.title,
    date: new Date(project.date).toISOString().split('T')[0],
    description: project.description,
    image: project.image,
    video: project.video || '',
    skill: project.skill || '',
    link: project.link || '',
  });

  if (isPending) {
    return (
      <div
        className={`relative min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60"></div>
          <p className="text-sm text-white/60">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div
      className={`relative min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text}`}
    >
      <AnimatedGridBackground
        className="pointer-events-none absolute inset-0"
        density={0.35}
        speed={1.1}
      />

      <div className="relative z-10">
        <AdminHeader />

        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-wide">
              Gestion des Projets
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition`}
            >
              Nouveau Projet
            </button>
          </div>

          {projectsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60"></div>
            </div>
          ) : (
            <section className="space-y-6">
              {projects.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur">
                  <p className="text-white/60">Aucun projet pour le moment.</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className={`mt-4 rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} transition`}
                  >
                    Créer votre premier projet
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-xl backdrop-blur transition-all hover:border-white/20"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <div className="p-4">
                        <h3 className="mb-1 font-medium text-white/90">
                          {project.title}
                        </h3>
                        <p className="mb-2 text-xs text-white/60">
                          {new Date(project.date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="mb-4 line-clamp-2 text-xs text-white/70">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className={`flex-1 rounded-md px-3 py-1.5 text-xs ${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} ${COLOR_COMBINATIONS.secondaryButton.hover} transition`}
                          >
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project)}
                            className="rounded-md border border-red-500/20 bg-red-600/20 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-600/30"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {/* Modal Créer Projet */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Créer un nouveau projet"
        maxWidth="2xl"
      >
        <ProjectForm
          mode="create"
          onSubmit={handleCreateProject}
          onCancel={() => setShowCreateModal(false)}
          isLoading={formLoading}
        />
      </Modal>

      {/* Modal Éditer Projet */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Éditer le projet"
        maxWidth="2xl"
      >
        {editingProject && (
          <ProjectForm
            mode="edit"
            initialData={formatProjectForEdit(editingProject)}
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
            isLoading={formLoading}
          />
        )}
      </Modal>
    </div>
  );
}
