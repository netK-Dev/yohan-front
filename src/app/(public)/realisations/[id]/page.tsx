import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageSlider from '@/components/ui/ImageSlider';
import VideoSlider from '@/components/ui/VideoSlider';
import RichTextDisplay from '@/components/ui/RichTextDisplay';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { parseSkills } from '@/lib/utils/skills';
import { getSoftwareById } from '@/lib/types/project';
import {
  generateProjectMetadata,
  generateProjectStructuredData,
} from '@/lib/utils/seo';
import { type ProjectVideo } from '@/lib/types/video';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

async function fetchProject(id: string) {
  try {
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      console.log(`❌ [DEBUG] Invalid ID format: ${id}`);
      return null;
    }

    console.log(`🔍 [DEBUG] Searching for project with ID: ${projectId}`);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      console.log(`❌ [DEBUG] Project not found for ID: ${projectId}`);
      // Vérifions tous les projets existants pour debug
      const allProjects = await prisma.project.findMany({
        select: { id: true, title: true },
      });
      console.log(`📋 [DEBUG] Available projects:`, allProjects);
      return null;
    }

    console.log(`✅ [DEBUG] Project found: ${project.title}`);
    return project;
  } catch (error) {
    console.error(`❌ [DEBUG] Error fetching project:`, error);
    return null;
  }
}

// Génération statique des pages pour tous les projets existants
export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      select: { id: true },
    });

    console.log(
      `🔧 [STATIC] Generating static params for ${projects.length} projects`
    );

    return projects.map((project) => ({
      id: project.id.toString(),
    }));
  } catch (error) {
    console.error('❌ [STATIC] Error generating static params:', error);
    return [];
  }
}

function getExternalVideoEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    if (host.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

// Configuration pour ISR - revalidation toutes les 5 minutes
export const revalidate = 300;

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return {
      title: 'Projet non trouvé | Doens Production',
      description: "Le projet demandé n'existe pas ou n'est plus disponible.",
    };
  }

  return generateProjectMetadata(project);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(
    `🔍 [PAGE] Received ID from params: "${id}" (type: ${typeof id})`
  );

  const project = await fetchProject(id);

  if (!project) {
    console.log(
      `❌ [PAGE] Project not found, calling notFound() for ID: ${id}`
    );
    notFound();
  }

  const externalEmbed = getExternalVideoEmbed(project?.video);

  // Générer les données structurées JSON-LD
  const structuredData = generateProjectStructuredData(project);

  return (
    <>
      {/* Données structurées JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main
        className={`min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text}`}
      >
        <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.53 4.47a.75.75 0 010 1.06L4.81 10.25H21a.75.75 0 010 1.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Retour aux réalisations
              </Link>
            </div>
            <h1 className="mb-2 text-2xl font-bold sm:text-4xl">
              {project.title}
            </h1>
            <p className="mb-6 text-sm text-white/60">
              {new Date(project.date).toLocaleDateString('fr-FR')}
            </p>

            {/* Badge catégorie */}
            <div className="mb-6 flex">
              <span className="rounded-full bg-[#ff0015]/80 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-invert mb-8 max-w-none">
              <RichTextDisplay
                html={project.description}
                className="text-white/80"
              />
            </div>

            {/* Galerie d'images */}
            {project.images && project.images.length > 0 && (
              <ImageSlider images={project.images} title={project.title} />
            )}

            {/* Vidéos (nouveau système avec VideoSlider) */}
            {project.videos &&
              (project.videos as unknown as ProjectVideo[]).length > 0 && (
                <VideoSlider
                  videos={project.videos as unknown as ProjectVideo[]}
                  title={project.title}
                  posterImage={
                    project.images && project.images[0]
                      ? project.images[0]
                      : undefined
                  }
                />
              )}

            {/* Fallback : Ancien système pour projets non migrés */}
            {(!project.videos ||
              (project.videos as unknown as ProjectVideo[]).length === 0) && (
              <>
                {/* Vidéo uploadée */}
                {project.videoFile && (
                  <div className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                      Vidéo
                    </h2>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                      <video
                        controls
                        className="h-full w-full object-cover"
                        poster={
                          project.images && project.images[0]
                            ? project.images[0]
                            : undefined
                        }
                      >
                        <source src={project.videoFile} type="video/mp4" />
                        <source src={project.videoFile} type="video/webm" />
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                    </div>
                  </div>
                )}

                {/* Vidéo externe (YouTube/Vimeo) */}
                {externalEmbed && (
                  <div className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                      Vidéo
                    </h2>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <iframe
                        src={externalEmbed}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video player"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Compétences */}
            {project.skill && (
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-white">
                  Compétences utilisées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {parseSkills(project.skill).map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Logiciels utilisés */}
            {project.software && project.software.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-white">
                  Logiciels utilisés
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(project.software as string[]).map((swId: string) => {
                    const sw = getSoftwareById(swId);
                    if (!sw) return null;
                    return (
                      <div
                        key={swId}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"
                      >
                        <Image
                          src={sw.icon}
                          alt={sw.name}
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="text-sm text-white/80">{sw.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lien vers le projet (si fourni) */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 transition hover:bg-white/10"
                >
                  🔗 Lien du projet
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
