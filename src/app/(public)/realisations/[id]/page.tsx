import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageSlider from '@/components/ui/ImageSlider';
import VideoSlider from '@/components/ui/VideoSlider';
import RichTextDisplay from '@/components/ui/RichTextDisplay';
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
  const project = await fetchProject(id);
  if (!project) notFound();
  const structuredData = generateProjectStructuredData(project);
  const storedVideos = Array.isArray(project.videos)
    ? (project.videos as unknown as ProjectVideo[])
    : [];
  const videos: ProjectVideo[] = storedVideos.length
    ? storedVideos
    : [
        ...(project.videoFile
          ? [{ type: 'upload' as const, url: project.videoFile }]
          : []),
        ...(project.video
          ? [{ type: 'youtube' as const, url: project.video }]
          : []),
      ];
  const skills = parseSkills(project.skill || '');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main id="main-content" tabIndex={-1}>
        <section className="site-container py-10 sm:py-14">
          <Link href="/realisations" className="text-link mb-8">
            ← Toutes les réalisations
          </Link>
          <div className="mb-10 border-b border-white/15 pb-8">
            <p className="eyebrow mb-4">{project.category}</p>
            <h1 className="max-w-4xl text-3xl leading-tight font-semibold tracking-tight break-words sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <time
              dateTime={new Date(project.date).toISOString()}
              className="mt-5 block text-sm text-white/55"
            >
              {new Date(project.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
          {project.images.length > 0 && (
            <ImageSlider images={project.images} title={project.title} />
          )}
          {videos.length > 0 && (
            <VideoSlider
              videos={videos}
              title={project.title}
              posterImage={project.images[0]}
            />
          )}
          {project.images.length === 0 && videos.length === 0 && (
            <p className="public-panel mb-10 text-sm text-white/65">
              Les médias de ce projet ne sont pas encore disponibles.
            </p>
          )}
          <div className="grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <section aria-labelledby="project-description">
              <h2 id="project-description" className="mb-5 text-xl font-medium">
                À propos du projet
              </h2>
              {project.description.trim() ? (
                <RichTextDisplay
                  html={project.description}
                  className="text-base leading-8 text-white/70"
                />
              ) : (
                <p className="text-sm text-white/60">
                  La description de ce projet sera bientôt disponible.
                </p>
              )}
            </section>
            <aside className="space-y-7">
              {skills.length > 0 && (
                <div>
                  <h2 className="eyebrow mb-3">Compétences utilisées</h2>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.software.length > 0 && (
                <div>
                  <h2 className="eyebrow mb-3">Logiciels utilisés</h2>
                  <ul className="flex flex-wrap gap-4">
                    {project.software.map((id) => {
                      const software = getSoftwareById(id);
                      return (
                        <li
                          key={id}
                          className="flex items-center gap-2 text-sm text-white/80"
                        >
                          {software && (
                            <Image
                              src={software.icon}
                              alt=""
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          )}
                          <span>{software?.name || id}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Voir le projet en ligne ↗
                </a>
              )}
              <Link href="/contact?type=quote" className="button-secondary">
                Discutons de votre projet ↗
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
