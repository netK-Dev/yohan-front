'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import SliderMediaForm from '@/components/admin/SliderMediaForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { AdminError, AdminLoading } from '@/components/admin/AdminFeedback';
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
    async function fetchMedia() {
      try {
        const response = await fetch(`/api/slider-media/${mediaId}`, {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        if (!response.ok) {
          if (response.status === 404) {
            setLoadError('Média non trouvé');
          } else {
            setLoadError('Erreur lors du chargement du média');
          }
          return;
        }
        const data = await response.json();
        if (controller.signal.aborted) return;
        setLoadError(null);
        setMedia(data);
      } catch {
        if (controller.signal.aborted) return;
        setLoadError('Erreur de connexion');
      } finally {
        if (!controller.signal.aborted) {
          setLoadedId(mediaId);
          setIsLoadingMedia(false);
        }
      }
    }

    if (mediaId && session?.user) {
      fetchMedia();
    }
    return () => controller.abort();
  }, [mediaId, session?.user, retry]);

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
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }

      router.replace('/admin/slider?saved=updated');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/slider');
  };

  if (!isPending && !session?.user) return null;

  // Loading
  if (isPending || isLoadingMedia || loadedId !== mediaId) {
    return (
      <AdminPageLayout title="Chargement...">
        <AdminLoading>Chargement du média…</AdminLoading>
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
        <div className="mx-auto max-w-lg">
          <AdminError
            message={loadError}
            onRetry={() => {
              setLoadError(null);
              setIsLoadingMedia(true);
              setRetry((value) => value + 1);
            }}
          />
          <Link
            href="/admin/slider"
            className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-4 text-sm hover:bg-white/10"
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
          className={`rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-6`}
        >
          <SliderMediaForm
            key={media.id}
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
