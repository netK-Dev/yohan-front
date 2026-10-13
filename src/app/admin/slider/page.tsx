'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import AdminSavedNotice from '@/components/admin/AdminSavedNotice';
import { AdminError, AdminLoading } from '@/components/admin/AdminFeedback';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import SafeImage from '@/components/ui/SafeImage';
import { useSliderMedia } from '@/lib/hooks/useSliderMedia';
import { SliderMedia } from '@/lib/types/slider';

export default function AdminSliderPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    sliderMedia,
    isLoading,
    error,
    fetchSliderMedia,
    deleteSliderMedia,
    toggleSliderMediaStatus,
  } = useSliderMedia();
  const [selected, setSelected] = React.useState<SliderMedia | null>(null);
  const [pendingId, setPendingId] = React.useState<number | null>(null);
  const [actionError, setActionError] = React.useState('');
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    if (!isPending && !session?.user)
      router.replace('/admin/login?returnTo=%2Fadmin%2Fslider');
  }, [session, isPending, router]);

  async function runAction(media: SliderMedia, deleting: boolean) {
    if (pendingId !== null) return;
    setPendingId(media.id);
    setActionError('');
    setStatus('');
    try {
      if (deleting) {
        await deleteSliderMedia(media.id);
        setSelected(null);
        setStatus(`Le média « ${media.title} » a été supprimé.`);
      } else {
        await toggleSliderMediaStatus(media.id);
        setStatus(
          `Le média « ${media.title} » est maintenant ${media.isActive ? 'inactif' : 'actif'}.`
        );
      }
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'L’action a échoué. Réessayez.'
      );
    } finally {
      setPendingId(null);
    }
  }

  if (isPending)
    return (
      <AdminPageLayout title="Slider">
        <AdminLoading>Vérification de votre session…</AdminLoading>
      </AdminPageLayout>
    );
  if (!session?.user) return null;

  return (
    <AdminPageLayout
      title="Slider"
      action={
        <Link
          href="/admin/slider/new"
          className="inline-flex min-h-11 items-center rounded-md bg-[#cc0009] px-4 text-sm font-semibold hover:bg-[#b30006]"
        >
          Nouveau média
        </Link>
      }
    >
      <AdminSavedNotice resource="media" />
      <p className="mb-4 text-sm leading-6 text-white/65">
        Gérez les images du slider de la page d’accueil. Les médias actifs
        apparaissent par ordre croissant.
      </p>
      <p
        role="status"
        className={status ? 'mb-4 text-sm text-white/80' : 'sr-only'}
      >
        {status}
      </p>
      {actionError && !selected && <AdminError message={actionError} />}
      {isLoading ? (
        <AdminLoading>Chargement des médias…</AdminLoading>
      ) : error ? (
        <AdminError message={error} onRetry={() => void fetchSliderMedia()} />
      ) : sliderMedia.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 bg-[#111111] px-6 py-10 text-center">
          <h2 className="text-lg font-medium">Aucun média dans le slider</h2>
          <p className="mt-2 text-sm text-white/65">
            Ajoutez une image ou un GIF pour enrichir la page d’accueil.
          </p>
          <Link
            href="/admin/slider/new"
            className="mt-5 inline-flex min-h-11 items-center rounded-md border border-white/20 px-4 text-sm hover:bg-white/10"
          >
            Ajouter le premier média
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-white/65">
            {sliderMedia.length} média{sliderMedia.length > 1 ? 's' : ''} ·{' '}
            {sliderMedia.filter((m) => m.isActive).length} actif
            {sliderMedia.filter((m) => m.isActive).length > 1 ? 's' : ''}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sliderMedia.map((media) => (
              <article
                key={media.id}
                aria-busy={pendingId === media.id}
                className="overflow-hidden rounded-lg border border-white/15 bg-[#111111]"
              >
                <div className="relative aspect-[16/9] bg-white/5">
                  <SafeImage
                    src={media.mediaUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded border px-2 py-1 text-xs ${media.isActive ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 text-white/60'}`}
                    >
                      {media.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    <span className="text-xs text-white/60">
                      Ordre : {media.order}
                    </span>
                  </div>
                  <h2 className="font-medium break-words">{media.title}</h2>
                  {media.category && (
                    <p className="mt-1 text-sm text-white/60">
                      {media.category}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/slider/${media.id}/edit`}
                      aria-label={`Modifier le média ${media.title}`}
                      className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-3 text-sm hover:bg-white/10"
                    >
                      Modifier
                    </Link>
                    <button
                      type="button"
                      disabled={pendingId !== null}
                      onClick={() => void runAction(media, false)}
                      aria-label={`${media.isActive ? 'Désactiver' : 'Activer'} le média ${media.title}`}
                      className="min-h-11 rounded-md border border-white/15 px-3 text-sm text-white/80 hover:bg-white/10 disabled:opacity-50"
                    >
                      {pendingId === media.id && !selected
                        ? 'Mise à jour…'
                        : media.isActive
                          ? 'Désactiver'
                          : 'Activer'}
                    </button>
                    <button
                      type="button"
                      disabled={pendingId !== null}
                      onClick={() => {
                        setSelected(media);
                        setActionError('');
                      }}
                      aria-label={`Supprimer le média ${media.title}`}
                      className="min-h-11 rounded-md px-3 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      <DeleteConfirmation
        title={selected?.title ?? null}
        pending={pendingId !== null}
        error={actionError}
        onClose={() => setSelected(null)}
        onConfirm={() => {
          if (selected) void runAction(selected, true);
        }}
      />
    </AdminPageLayout>
  );
}
