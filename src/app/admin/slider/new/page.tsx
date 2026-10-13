'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import SliderMediaForm from '@/components/admin/SliderMediaForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import {
  CreateSliderMediaInput,
  UpdateSliderMediaInput,
} from '@/lib/types/slider';

export default function NewSliderMediaPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(
        `/admin/login?returnTo=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [session, isPending, router]);

  const handleSubmit = async (
    data: CreateSliderMediaInput | UpdateSliderMediaInput
  ) => {
    setFormLoading(true);
    try {
      const response = await fetch('/api/slider-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      router.replace('/admin/slider?saved=created');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/slider');
  };

  if (isPending) {
    return (
      <AdminPageLayout title="Chargement...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
            <p role="status" className="text-sm text-white/65">
              Chargement...
            </p>
          </div>
        </div>
      </AdminPageLayout>
    );
  }

  if (!session?.user) return null;

  return (
    <AdminPageLayout
      title="Nouveau Média Slider"
      breadcrumbs={[
        { label: 'Slider', href: '/admin/slider' },
        { label: 'Nouveau média' },
      ]}
    >
      <div className="mx-auto max-w-xl">
        <div
          className={`rounded-xl border border-white/10 bg-[#111111] p-4 sm:p-6`}
        >
          <SliderMediaForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
