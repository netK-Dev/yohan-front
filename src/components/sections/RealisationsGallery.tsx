'use client';

import { useEffect, useMemo, useState } from 'react';
import SafeImage from '@/components/ui/SafeImage';
import Pagination from '@/components/ui/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { parseSkills } from '@/lib/utils/skills';
import { getSoftwareById } from '@/lib/types/project';

type DbProject = {
  id: string | number;
  title: string;
  category?: string | null;
  images: string[];
  skill?: string | null;
  software?: string[];
};
const CATEGORIES = [
  { key: 'all', label: 'Tous les projets' },
  { key: '3d-vfx', label: '3D/VFX' },
  { key: 'motion-design', label: 'Motion Design' },
  { key: 'court-metrage', label: 'Court Métrage' },
];
const PAGE_SIZE = 12;
function categoryKey(category: string) {
  const value = category.toLowerCase();
  if (value.includes('motion')) return 'motion-design';
  if (value.includes('court')) return 'court-metrage';
  if (value.includes('3d') || value.includes('vfx')) return '3d-vfx';
  return '';
}

export function GallerySkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Chargement des réalisations…</span>
      <div
        aria-hidden="true"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-white/10" />
            <div className="mt-5 h-3 w-24 bg-white/10" />
            <div className="mt-3 h-5 w-3/4 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RealisationsGallery() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams.get('category');
  const active = CATEGORIES.find((item) => item.key === category)?.key ?? 'all';

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/projects', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Chargement impossible');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Réponse invalide');
        if (!controller.signal.aborted) {
          setProjects(data);
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter(
            (project) => categoryKey(project.category || '') === active
          ),
    [active, projects]
  );
  const requestedPage = Number(searchParams.get('page') || '1');
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;
  const query = searchParams.toString();

  // Canonicalise les filtres invalides, sans ajouter une entrée d'historique.
  useEffect(() => {
    if (loading || error) return;
    const params = new URLSearchParams(query);
    if (
      category &&
      !CATEGORIES.some((item) => item.key === category && item.key !== 'all')
    )
      params.delete('category');
    if (currentPage === 1) params.delete('page');
    else params.set('page', String(currentPage));
    const next = params.toString();
    if (next !== query)
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      });
  }, [category, currentPage, error, loading, pathname, query, router]);

  function filterHref(key: string) {
    const params = new URLSearchParams(query);
    if (key === 'all') params.delete('category');
    else params.set('category', key);
    params.delete('page');
    return params.size ? `${pathname}?${params}` : pathname;
  }
  function changePage(page: number) {
    const params = new URLSearchParams(query);
    if (page > 1) params.set('page', String(page));
    else params.delete('page');
    router.push(params.size ? `${pathname}?${params}` : pathname, {
      scroll: false,
    });
    document.getElementById('gallery-results')?.focus({ preventScroll: true });
    document
      .getElementById('gallery-results')
      ?.scrollIntoView({ block: 'start' });
  }
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className="section-space" aria-label="Portfolio">
      <div className="site-container">
        <nav
          aria-label="Filtrer les réalisations"
          className="mb-8 flex flex-wrap gap-2 border-b border-white/15 pb-6"
        >
          {CATEGORIES.map((item) => (
            <Link
              key={item.key}
              href={filterHref(item.key)}
              scroll={false}
              aria-current={active === item.key ? 'true' : undefined}
              className={`inline-flex min-h-11 items-center rounded-sm border px-4 py-2 text-sm transition-colors ${active === item.key ? 'border-white/70 bg-white text-black' : 'border-white/20 text-white/65 hover:border-white/50 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          id="gallery-results"
          tabIndex={-1}
          className="scroll-mt-28"
          aria-busy={loading}
        >
          {loading ? (
            <GallerySkeleton />
          ) : error ? (
            <div role="alert" className="public-panel py-12 text-center">
              <h2 className="text-xl font-medium">
                Les réalisations ne sont pas disponibles pour le moment.
              </h2>
              <p className="mt-3 text-sm text-white/65">
                Veuillez réessayer dans quelques instants.
              </p>
              <button
                type="button"
                className="button-secondary mt-6"
                onClick={() => {
                  setLoading(true);
                  setError(false);
                  setAttempt((value) => value + 1);
                }}
              >
                Réessayer
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="public-panel py-12 text-center" role="status">
              <h2 className="text-2xl font-medium">
                {projects.length
                  ? 'Aucun projet dans cette catégorie'
                  : 'Les réalisations arrivent bientôt'}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/65">
                {projects.length
                  ? 'Explorez les autres disciplines pour découvrir les projets du portfolio.'
                  : 'Découvrez les domaines de création ou échangeons autour de votre prochain projet.'}
              </p>
              <Link
                className="button-secondary mt-6"
                href={projects.length ? filterHref('all') : '/contact'}
                scroll={projects.length ? false : undefined}
              >
                {projects.length
                  ? 'Voir tous les projets'
                  : 'Parlons de votre projet'}
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 text-xs text-white/55" role="status">
                {filtered.length} projet{filtered.length > 1 ? 's' : ''} · Page{' '}
                {currentPage} sur {totalPages}
              </p>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((project, i) => {
                  const tags = parseSkills(project.skill || '');
                  return (
                    <article key={project.id} className="min-w-0">
                      <Link
                        href={`/realisations/${project.id}`}
                        className="group block"
                        aria-label={`Voir le projet ${project.title}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#111113]">
                          <SafeImage
                            src={project.images?.[0] || ''}
                            alt={project.title}
                            fill
                            priority={i < 3}
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          />
                        </div>
                        {project.category && (
                          <p className="mt-4 text-xs text-white/55">
                            {project.category}
                          </p>
                        )}
                        <h2 className="mt-2 flex items-start justify-between gap-4 text-xl font-medium tracking-tight group-hover:underline group-hover:underline-offset-4">
                          {project.title}
                          <span
                            className="text-base text-white/50"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </h2>
                      </Link>
                      {tags.length > 0 && (
                        <p className="mt-3 text-xs leading-6 text-white/55">
                          {tags.slice(0, 3).join(' · ')}
                          {tags.length > 3 ? ` · +${tags.length - 3}` : ''}
                        </p>
                      )}
                      {(project.software?.length ?? 0) > 0 && (
                        <p className="mt-2 text-xs leading-6 text-white/55">
                          {project.software
                            ?.map((id) => getSoftwareById(id)?.name || id)
                            .join(' · ')}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={filtered.length}
                pageSize={PAGE_SIZE}
                onPageChange={changePage}
                className="mt-12"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
