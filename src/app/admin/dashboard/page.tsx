'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SafeImage from '@/components/ui/SafeImage';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import AdminSavedNotice from '@/components/admin/AdminSavedNotice';
import { AdminError, AdminLoading } from '@/components/admin/AdminFeedback';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import { useSession } from '@/lib/auth-client';
import { useProjects } from '@/lib/hooks/useProjects';
import { Project, PROJECT_CATEGORIES } from '@/lib/types/project';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { projects, isLoading, error, fetchProjects, deleteProject } =
    useProjects();
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [actionError, setActionError] = React.useState('');
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    if (!isPending && !session?.user)
      router.replace('/admin/login?returnTo=%2Fadmin%2Fdashboard');
  }, [session, isPending, router]);

  async function handleDelete() {
    if (!selected || deleting) return;
    setDeleting(true);
    setActionError('');
    try {
      await deleteProject(selected.id);
      setStatus(`Le projet « ${selected.title} » a été supprimé.`);
      setSelected(null);
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : 'La suppression a échoué. Réessayez.'
      );
    } finally {
      setDeleting(false);
    }
  }

  if (isPending)
    return (
      <AdminPageLayout title="Projets">
        <AdminLoading>Vérification de votre session…</AdminLoading>
      </AdminPageLayout>
    );
  if (!session?.user) return null;

  return (
    <AdminPageLayout
      title="Projets"
      action={
        <Link
          href="/admin/dashboard/new"
          className="inline-flex min-h-11 items-center rounded-md bg-[#cc0009] px-4 text-sm font-semibold hover:bg-[#b30006]"
        >
          Nouveau projet
        </Link>
      }
    >
      <AdminSavedNotice resource="project" />
      <p
        role="status"
        className={status ? 'mb-4 text-sm text-white/80' : 'sr-only'}
      >
        {status}
      </p>
      {isLoading ? (
        <AdminLoading>Chargement des projets…</AdminLoading>
      ) : error ? (
        <AdminError message={error} onRetry={() => void fetchProjects()} />
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 bg-[#111111] px-6 py-10 text-center">
          <h2 className="text-lg font-medium">Votre portfolio commence ici</h2>
          <p className="mt-2 text-sm text-white/65">
            Ajoutez un projet avec ses images, sa description et ses vidéos.
          </p>
          <Link
            href="/admin/dashboard/new"
            className="mt-5 inline-flex min-h-11 items-center rounded-md border border-white/20 px-4 text-sm hover:bg-white/10"
          >
            Créer le premier projet
          </Link>
        </div>
      ) : (
        <section className="space-y-8" aria-label="Liste des projets">
          <p className="text-sm text-white/65">
            {projects.length} projet{projects.length > 1 ? 's' : ''} dans le
            portfolio
          </p>
          {PROJECT_CATEGORIES.map((category) => {
            const items = projects.filter((p) => p.category === category);
            if (!items.length) return null;
            return (
              <section key={category}>
                <h2 className="mb-3 text-base font-semibold">
                  {category}{' '}
                  <span className="ml-2 text-sm font-normal text-white/60">
                    ({items.length})
                  </span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((project) => (
                    <article
                      key={project.id}
                      className="overflow-hidden rounded-lg border border-white/15 bg-[#111111]"
                    >
                      <div className="relative aspect-[16/7] bg-white/5">
                        {project.images[0] ? (
                          <SafeImage
                            src={project.images[0]}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-sm text-white/60">
                            Aucune image
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium break-words">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/60">
                          {new Date(project.date).toLocaleDateString('fr-FR', {
                            timeZone: 'UTC',
                          })}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href={`/admin/dashboard/${project.id}/edit`}
                            aria-label={`Modifier le projet ${project.title}`}
                            className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-3 text-sm hover:bg-white/10"
                          >
                            Modifier
                          </Link>
                          <button
                            type="button"
                            disabled={deleting}
                            onClick={() => {
                              setSelected(project);
                              setActionError('');
                            }}
                            aria-label={`Supprimer le projet ${project.title}`}
                            className="min-h-11 rounded-md px-3 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      )}
      <DeleteConfirmation
        title={selected?.title ?? null}
        pending={deleting}
        error={actionError}
        onClose={() => setSelected(null)}
        onConfirm={() => void handleDelete()}
      />
    </AdminPageLayout>
  );
}
