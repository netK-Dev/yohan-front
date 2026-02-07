'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import SliderMediaForm from '@/components/admin/SliderMediaForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import {
  SliderMedia,
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
} from '@/lib/types/slider';

export default function EditSliderMediaPage() {
  const router = useRouter();
  const params = useParams();
  const mediaId = params.id as string;
  const { data: session, isPending } = useSession();

  const [media, setMedia] = React.useState<SliderMedia | null>(null);
  const [isLoadingMedia, setIsLoadingMedia] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  React.useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch(`/api/slider-media/${mediaId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setLoadError('Média non trouvé');
          } else {
            setLoadError('Erreur lors du chargement du média');
          }
          return;
        }
        const data = await response.json();
        setMedia(data);
      } catch {
        setLoadError('Erreur de connexion');
      } finally {
        setIsLoadingMedia(false);
      }
    }

    if (mediaId && session?.user) {
      fetchMedia();
    }
  }, [mediaId, session?.user]);

  const handleSubmit = async (
    data: CreateSliderMediaInput | UpdateSliderMediaInput
  ) => {
    setFormLoading(true);
    try {
      const response = await fetch(`/api/slider-media/${mediaId}`, {
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

      router.replace('/admin/slider');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour du média');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/slider');
  };

  // Loading
  if (isPending || isLoadingMedia) {
    return (
      <AdminPageLayout title="Chargement...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
            <p className="text-sm text-white/60">Chargement du média...</p>
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
          { label: 'Slider', href: '/admin/slider' },
          { label: 'Erreur' },
        ]}
      >
        <div className="mx-auto max-w-lg rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-red-400">{loadError}</p>
          <Link
            href="/admin/slider"
            className="mt-4 inline-block rounded-md bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            Retour au slider
          </Link>
        </div>
      </AdminPageLayout>
    );
  }

  if (!session?.user || !media) return null;

  return (
    <AdminPageLayout
      title={`Éditer : ${media.title}`}
      breadcrumbs={[
        { label: 'Slider', href: '/admin/slider' },
        { label: media.title },
      ]}
    >
      <div className="mx-auto max-w-xl">
        <div
          className={`rounded-xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-4 shadow-xl backdrop-blur sm:p-6`}
        >
          <SliderMediaForm
            sliderMedia={media}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
