'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [formLoading, setFormLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

  const handleSubmit = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    setFormLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      router.replace('/admin/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
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

  if (!session?.user) return null;

  return (
    <AdminPageLayout
      title="Créer un nouveau projet"
      breadcrumbs={[
        { label: 'Projets', href: '/admin/dashboard' },
        { label: 'Nouveau projet' },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <div
          className={`rounded-xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-4 shadow-xl backdrop-blur sm:p-6`}
        >
          <ProjectForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
