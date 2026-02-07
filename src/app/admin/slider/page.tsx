'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import SafeImage from '@/components/ui/SafeImage';
import { useSliderMedia } from '@/lib/hooks/useSliderMedia';
import { SliderMedia } from '@/lib/types/slider';

export default function AdminSliderPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    sliderMedia,
    isLoading: mediaLoading,
    deleteSliderMedia,
    toggleSliderMediaStatus,
  } = useSliderMedia();

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  const handleDeleteMedia = async (media: SliderMedia) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${media.title}" ?`)) {
      return;
    }

    try {
      await deleteSliderMedia(media.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du média');
    }
  };

  const handleToggleStatus = async (media: SliderMedia) => {
    try {
      await toggleSliderMediaStatus(media.id);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  if (!session?.user) {
    return null;
  }

  return (
    <AdminPageLayout
      title="Gestion du Slider"
      action={
        <Link
          href="/admin/slider/new"
          className={`w-full rounded-md px-4 py-3 text-sm font-medium sm:w-auto sm:py-2 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition`}
        >
          Nouveau Média
        </Link>
      }
    >
      {mediaLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff0015] border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sliderMedia.map(media => (
            <div
              key={media.id}
              className={`group relative overflow-hidden rounded-xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-4 shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              {/* Statut badge */}
              <div className="absolute right-2 top-2 z-10">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    media.isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {media.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>

              {/* Image */}
              <div className="relative mb-4 h-32 overflow-hidden rounded-lg">
                <SafeImage
                  src={media.mediaUrl}
                  alt={media.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Informations */}
              <div className="space-y-2">
                <h3
                  className={`font-medium ${COLOR_COMBINATIONS.card.text} truncate`}
                >
                  {media.title}
                </h3>

                {media.category && (
                  <p className="text-xs text-white/60">{media.category}</p>
                )}

                <p className="text-xs text-white/60">
                  Ordre: {media.order}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href={`/admin/slider/${media.id}/edit`}
                  className="min-h-[44px] rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-medium text-white transition-all duration-300 hover:bg-white/20 flex items-center justify-center"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleToggleStatus(media)}
                  className={`min-h-[44px] rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 ${
                    media.isActive
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {media.isActive ? 'Désactiver' : 'Activer'}
                </button>
                <button
                  onClick={() => handleDeleteMedia(media)}
                  className="col-span-2 min-h-[44px] rounded-lg bg-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-all duration-300 hover:bg-red-500/30"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {sliderMedia.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-white/60">
                Aucun média dans le slider. Créez-en un pour commencer.
              </p>
            </div>
          )}
        </div>
      )}
    </AdminPageLayout>
  );
}
