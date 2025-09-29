'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import AdminHeader from '@/components/admin/AdminHeader';
import Modal from '@/components/ui/Modal';
import SliderMediaForm from '@/components/admin/SliderMediaForm';
import SafeImage from '@/components/ui/SafeImage';
import { useSliderMedia } from '@/lib/hooks/useSliderMedia';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
} from '@/lib/types/slider';

export default function AdminSliderPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    sliderMedia,
    isLoading: mediaLoading,
    createSliderMedia,
    updateSliderMedia,
    deleteSliderMedia,
    toggleSliderMediaStatus,
  } = useSliderMedia();

  // États pour les modals
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [editingMedia, setEditingMedia] = React.useState<SliderMedia | null>(
    null
  );
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  // Handlers pour les médias
  const handleCreateMedia = async (
    data: CreateSliderMediaInput | UpdateSliderMediaInput
  ) => {
    setFormLoading(true);
    try {
      await createSliderMedia(data as CreateSliderMediaInput);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création du média');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateMedia = async (
    data: CreateSliderMediaInput | UpdateSliderMediaInput
  ) => {
    if (!editingMedia) return;

    setFormLoading(true);
    try {
      await updateSliderMedia(editingMedia.id, data as UpdateSliderMediaInput);
      setEditingMedia(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour du média');
    } finally {
      setFormLoading(false);
    }
  };

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
              Gestion du Slider
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition`}
            >
              Nouveau Média
            </button>
          </div>

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
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditingMedia(media)}
                      className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-white/20"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleToggleStatus(media)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 ${
                        media.isActive
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {media.isActive ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => handleDeleteMedia(media)}
                      className="rounded-lg bg-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-all duration-300 hover:bg-red-500/30"
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
        </main>
      </div>

      {/* Modal de création */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nouveau Média Slider"
      >
        <SliderMediaForm
          onSubmit={handleCreateMedia}
          onCancel={() => setShowCreateModal(false)}
          isLoading={formLoading}
        />
      </Modal>

      {/* Modal d'édition */}
      <Modal
        isOpen={!!editingMedia}
        onClose={() => setEditingMedia(null)}
        title="Modifier le Média"
      >
        <SliderMediaForm
          sliderMedia={editingMedia}
          onSubmit={handleUpdateMedia}
          onCancel={() => setEditingMedia(null)}
          isLoading={formLoading}
        />
      </Modal>
    </div>
  );
}
