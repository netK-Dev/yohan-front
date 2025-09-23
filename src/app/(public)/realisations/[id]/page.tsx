import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { headers } from 'next/headers';

async function fetchProject(id: string) {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const baseURL =
    process.env.NEXT_PUBLIC_APP_URL ||
    (host ? `${proto}://${host}` : 'http://localhost:3000');

  const res = await fetch(`${baseURL}/api/projects/${id}`, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <main
        className={`min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text} flex items-center justify-center`}
      >
        <p className="text-white/70">Projet introuvable.</p>
      </main>
    );
  }

  return (
    <>
      <Header />
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

            <div className="relative mb-6 h-64 overflow-hidden rounded-xl sm:h-96">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute left-4 top-4 rounded-full bg-[#ff0015]/80 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                {project.category}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-white/80">{project.description}</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.video ? (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 hover:bg-white/10"
                >
                  Voir la vidéo
                </a>
              ) : null}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 hover:bg-white/10"
                >
                  Lien du projet
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
