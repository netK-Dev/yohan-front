'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import SectionAccordion from '@/components/admin/homepage/SectionAccordion';
import HomepageHeroForm from '@/components/admin/homepage/HomepageHeroForm';
import HomepageServicesForm from '@/components/admin/homepage/HomepageServicesForm';
import HomepageCTAForm from '@/components/admin/homepage/HomepageCTAForm';
import { useHomeContent } from '@/lib/hooks/useHomeContent';

export default function AdminHomepagePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { content, isLoading, saveStatus, saveSection, resetSection } =
    useHomeContent();

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

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
    <AdminPageLayout title="Page d'accueil">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Section Hero */}
          <SectionAccordion
            title="Section Hero"
            description="Titre principal, sous-titre, description et statistiques"
            defaultOpen={true}
            saveStatus={saveStatus.hero}
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            }
          >
            <HomepageHeroForm
              initialContent={content.hero}
              onSave={(c) => saveSection('hero', c)}
              onReset={() => resetSection('hero')}
              saveStatus={saveStatus.hero}
            />
          </SectionAccordion>

          {/* Section Services */}
          <SectionAccordion
            title="Section Services"
            description="Domaines d'expertise : titres, descriptions, tags et images"
            saveStatus={saveStatus.services}
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            }
          >
            <HomepageServicesForm
              initialContent={content.services}
              onSave={(c) => saveSection('services', c)}
              onReset={() => resetSection('services')}
              saveStatus={saveStatus.services}
            />
          </SectionAccordion>

          {/* Section CTA */}
          <SectionAccordion
            title="Appel à l'action (CTA)"
            description="Titre, sous-titre et bouton de la section finale"
            saveStatus={saveStatus.cta}
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                />
              </svg>
            }
          >
            <HomepageCTAForm
              initialContent={content.cta}
              onSave={(c) => saveSection('cta', c)}
              onReset={() => resetSection('cta')}
              saveStatus={saveStatus.cta}
            />
          </SectionAccordion>
        </div>
      )}
    </AdminPageLayout>
  );
}
