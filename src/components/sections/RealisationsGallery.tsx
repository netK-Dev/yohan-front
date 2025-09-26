'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import Pagination from '@/components/ui/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { parseSkills } from '@/lib/utils/skills';

type ProjectCategory = '3d-vfx' | 'motion-design' | 'court-metrage';

type ProjectItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  tags: string[];
};

// Type du projet renvoyé par l'API/DB
type DbProject = {
  id: string | number;
  title: string;
  category?: string | null;
  images: string[];
  description: string;
  skill?: string | null;
};

const CATEGORIES: Array<{ key: 'all' | ProjectCategory; label: string }> = [
  { key: 'all', label: 'Tous' },
  { key: '3d-vfx', label: '3D/VFX' },
  { key: 'motion-design', label: 'Motion Design' },
  { key: 'court-metrage', label: 'Court Métrage' },
];

// Map catégorie DB -> clé UI
function mapDbCategoryToKey(dbCategory: string): ProjectCategory {
  const c = dbCategory.toLowerCase();
  if (c.includes('motion')) return 'motion-design';
  if (c.includes('court')) return 'court-metrage';
  return '3d-vfx';
}

// Transforme un projet DB en item UI
function toProjectItem(p: DbProject): ProjectItem {
  const tags = parseSkills(p.skill || '');
  // utiliser la première image de la galerie comme couverture
  const cover = p.images && p.images.length > 0 ? p.images[0] : '';
  return {
    id: String(p.id),
    title: p.title,
    category: mapDbCategoryToKey(p.category || ''),
    image: cover,
    description: p.description,
    tags,
  };
}

export default function RealisationsGallery() {
  const [active, setActive] =
    useState<(typeof CATEGORIES)[number]['key']>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Charger les projets depuis l'API
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Erreur chargement projets');
        const data = await res.json();
        if (!cancelled)
          setProjects(Array.isArray(data) ? data.map(toProjectItem) : []);
      } catch (e) {
        if (!cancelled) setProjects([]);
        console.error('Erreur chargement projets:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === 'all') return projects;
    return projects.filter(p => p.category === active);
  }, [active, projects]);

  // Réinitialiser la page lors d'un changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  // Init du filtre depuis l'URL (?category=...)
  useEffect(() => {
    const category = searchParams.get('category');
    if (
      category === '3d-vfx' ||
      category === 'motion-design' ||
      category === 'court-metrage'
    ) {
      setActive(category);
    } else if (category === 'all' || category === null) {
      setActive('all');
    }
  }, [searchParams]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Sync page -> URL (?page=...)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set('page', String(currentPage));
    } else {
      params.delete('page');
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : `${pathname}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Init page depuis l'URL
  useEffect(() => {
    const page = Number(searchParams.get('page') || '1');
    if (Number.isFinite(page) && page >= 1) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  return (
    <section
      className={`relative py-14 sm:py-20 lg:py-24 ${COLOR_COMBINATIONS.page.background}`}
    >
      {/* Effets décoratifs subtils */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-48 w-48 rounded-full bg-[#ff0015]/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -right-24 bottom-10 h-48 w-48 rounded-full bg-white/5 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff0015]/10 px-3 py-1.5 text-xs font-medium text-[#ff0015] sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff0015] sm:h-2 sm:w-2" />
            Réalisations
          </div>
          <h1
            className={`text-3xl font-bold sm:text-5xl ${COLOR_COMBINATIONS.page.text}`}
          >
            Explorez nos{' '}
            <span className="bg-gradient-to-r from-[#ff0015] to-[#e6000c] bg-clip-text text-transparent">
              créations
            </span>
          </h1>
          <p
            className={`mx-auto mt-4 max-w-2xl text-sm opacity-80 sm:text-base ${COLOR_COMBINATIONS.page.text}`}
          >
            Une sélection de projets en 3D/VFX, Motion Design et Court Métrage.
          </p>
        </div>

        {/* Filtres */}
        <div className="mx-auto mb-10 flex w-full flex-wrap items-center justify-center gap-2 sm:mb-12 sm:gap-3">
          {CATEGORIES.map(cat => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActive(cat.key);
                  const params = new URLSearchParams(searchParams.toString());
                  if (cat.key === 'all') {
                    params.delete('category');
                  } else {
                    params.set('category', cat.key);
                  }
                  params.delete('page');
                  const qs = params.toString();
                  router.replace(qs ? `${pathname}?${qs}` : `${pathname}`, {
                    scroll: false,
                  });
                }}
                className={[
                  'rounded-full px-3 py-1.5 text-sm font-semibold transition-all sm:px-4 sm:py-2',
                  'border backdrop-blur-sm',
                  isActive
                    ? 'border-[#ff0015]/60 bg-[#ff0015]/20 text-white shadow-lg shadow-[#ff0015]/20'
                    : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10',
                ].join(' ')}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grille de cartes */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {(loading
            ? Array.from({ length: 6 }).map((_, index) => ({
                id: `skeleton-${index}`,
                title: '',
                category: '3d-vfx',
                image: '',
                description: '',
                tags: [],
              }))
            : paginated
          ).map((project, index) => (
            <article
              key={project.id}
              className={`group relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-4 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[#ff0015]/10 sm:p-6`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Accent gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff0015]/10 via-transparent to-white/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Media */}
                <div className="relative mb-4 h-48 overflow-hidden rounded-xl sm:mb-6 sm:h-56">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {loading ? (
                    <div className="h-full w-full animate-pulse bg-white/5" />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  )}
                  {/* Badge catégorie */}
                  <div className="absolute left-2 top-2 flex gap-2">
                    <span className="rounded-full bg-[#ff0015]/80 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {labelFromCategory(project.category)}
                    </span>
                  </div>
                </div>

                {/* Titre */}
                <h3
                  className={`mb-4 text-lg font-bold sm:text-xl ${COLOR_COMBINATIONS.card.text}`}
                >
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80 backdrop-blur-sm transition-colors group-hover:bg-[#ff0015]/20 group-hover:text-white sm:px-3 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA - poussé vers le bas */}
                <div className="mt-auto">
                  <Link
                    href={`/project/${project.id}`}
                    className={`block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.focus}`}
                  >
                    Voir le projet
                  </Link>
                </div>
              </div>

              {/* Ligne d’accent bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff0015] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          className="mt-10"
        />
      </div>
    </section>
  );
}

function labelFromCategory(category: string): string {
  if (category === '3d-vfx') return '3D/VFX';
  if (category === 'motion-design') return 'Motion Design';
  return 'Court Métrage';
}
