import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageSlider from '@/components/ui/ImageSlider';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { parseSkills } from '@/lib/utils/skills';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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

    return projects.map(project => ({
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

  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main
        className={`min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text}`}
      >
        <section className="relative pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
              <p className="text-white/80">{project.description}</p>
            </div>

            {/* Galerie d'images */}
            {project.images && project.images.length > 0 && (
              <ImageSlider images={project.images} title={project.title} />
            )}

            {/* Vidéo uploadée */}
            {project.videoFile && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-white">Vidéo</h2>
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
                <h2 className="mb-4 text-xl font-semibold text-white">Vidéo</h2>
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
