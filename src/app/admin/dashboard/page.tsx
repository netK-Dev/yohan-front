'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import AdminHeader from '@/components/admin/AdminHeader';
import { useSession } from '@/lib/auth-client';

type Project = {
  id: string;
  title: string;
  category: '3D/VFX' | 'Motion Design' | 'Court Métrage';
  status: 'Brouillon' | 'Publié' | 'Archivé';
  image: string;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Intro FX Neon',
    category: '3D/VFX',
    status: 'Publié',
    image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
  },
  {
    id: 'p2',
    title: 'Packshot Produit X',
    category: 'Motion Design',
    status: 'Brouillon',
    image: '/img/services/basement-doens-yohan-combo-07.webp',
  },
  {
    id: 'p3',
    title: 'Court Métrage - Lueur',
    category: 'Court Métrage',
    status: 'Publié',
    image: '/img/services/Hnet-image.webp',
  },
  {
    id: 'p4',
    title: 'Simulation Particules',
    category: '3D/VFX',
    status: 'Archivé',
    image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
  },
  {
    id: 'p5',
    title: 'Explainer App Mobile',
    category: 'Motion Design',
    status: 'Publié',
    image: '/img/services/basement-doens-yohan-combo-07.webp',
  },
];

const CATEGORIES: Array<Project['category']> = [
  '3D/VFX',
  'Motion Design',
  'Court Métrage',
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/admin/login');
    }
  }, [session, isPending, router]);

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
          <h1 className="mb-6 text-lg font-semibold tracking-wide">
            Tableau de bord
          </h1>

          <section className="space-y-8">
            {CATEGORIES.map(category => {
              const projects = MOCK_PROJECTS.filter(
                p => p.category === category
              );
              return (
                <div
                  key={category}
                  className="rounded-xl border border-white/10 bg-black/30 p-5 shadow-xl backdrop-blur"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-white/90">
                      {category}
                    </h2>
                    <span className="text-xs text-white/50">
                      {projects.length} projet{projects.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {projects.map(project => (
                      <div
                        key={project.id}
                        className="relative overflow-hidden rounded-lg border border-white/10 p-4"
                      >
                        <div className="absolute inset-0">
                          <img
                            src={project.image}
                            alt=""
                            className="h-full w-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white/90">
                              {project.title}
                            </p>
                            <p className="text-xs text-white/70">
                              Statut: {project.status}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className={`rounded-md px-3 py-1 text-xs ${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} ${COLOR_COMBINATIONS.secondaryButton.hover} transition`}
                            >
                              Éditer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}
