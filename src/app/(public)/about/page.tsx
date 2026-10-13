import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import IntroBanner from '@/components/sections/IntroBanner';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export const metadata = {
  title: 'À propos | Doens Production',
  description:
    'Parcours, expertises et valeurs de Doens Production. Un CV moderne orienté création visuelle.',
};

export default function AboutPage() {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main
        id="main-content"
        tabIndex={-1}
        className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}
      >
        <IntroBanner
          title="Yohan Doens"
          subtitle="Créateur de mondes visuels – 3D/VFX, Motion Design, Court Métrage"
        />

        {/* Corps de page type CV */}
        <section className="section-space">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            {/* Colonne gauche: Infos clés */}
            <aside className="public-panel">
              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Coordonnées
                  </h2>
                  <ul className="mt-3 space-y-2 text-white/80">
                    <li>
                      <a
                        className="text-link break-all"
                        href="mailto:contact@doensproduction.com"
                      >
                        contact@doensproduction.com
                      </a>
                    </li>
                    <li>France</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Compétences
                  </h2>
                  <ul className="mt-3 grid grid-cols-1 gap-2 text-white/80 sm:grid-cols-2">
                    <li className="border-b border-white/10 py-2 text-sm">
                      Modeling
                    </li>
                    <li className="border-b border-white/10 py-2 text-sm">
                      Shading
                    </li>
                    <li className="border-b border-white/10 py-2 text-sm">
                      Compositing
                    </li>
                    <li className="border-b border-white/10 py-2 text-sm">
                      After Effects
                    </li>
                    <li className="border-b border-white/10 py-2 text-sm">
                      Branding animé
                    </li>
                    <li className="border-b border-white/10 py-2 text-sm">
                      Montage
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Outils</h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-white/80">
                    <span className="border-b border-white/10 py-2 text-sm">
                      Blender
                    </span>
                    <span className="border-b border-white/10 py-2 text-sm">
                      Nuke
                    </span>
                    <span className="border-b border-white/10 py-2 text-sm">
                      After Effects
                    </span>
                    <span className="border-b border-white/10 py-2 text-sm">
                      Photoshop
                    </span>
                    <span className="border-b border-white/10 py-2 text-sm">
                      Illustrator
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Colonne droite: Expériences et parcours */}
            <div className="space-y-8">
              {/* À propos */}
              <div className="public-panel">
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-white">Profil</h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Je conçois et réalise des expériences visuelles impactantes
                    en 3D/VFX, motion design et court métrage. Mon approche
                    allie exigence technique et direction artistique.
                  </p>
                </div>
              </div>

              {/* Expériences */}
              <div className="public-panel">
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-white">
                    Expériences
                  </h2>
                  <ul className="mt-4 space-y-4">
                    <li className="border-t border-white/15 py-5">
                      <div className="flex flex-col items-start justify-between gap-2 text-white sm:flex-row sm:flex-wrap">
                        <span className="font-semibold">
                          Freelance – Doens Production
                        </span>
                        <span className="shrink-0 text-sm text-white/60">
                          2020 – Aujourd&#39;hui
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        Réalisations 3D/VFX, motion design et courts métrages
                        pour des marques et studios.
                      </p>
                    </li>
                    <li className="border-t border-white/15 py-5">
                      <div className="flex flex-col items-start justify-between gap-2 text-white sm:flex-row sm:flex-wrap">
                        <span className="font-semibold">
                          ISART Digital – Formation 3D/VFX
                        </span>
                        <span className="text-white/60">Diplômé</span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        Maîtrise du pipeline complet: modeling, shading,
                        rigging, animation, rendering, compositing.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-white/20 py-8">
                <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Travaillons ensemble
                    </h3>
                    <p className="text-white/90">
                      Parlons de votre projet – réponse rapide et conseils.
                    </p>
                  </div>
                  <Link
                    href="/contact?type=quote"
                    className="button-primary shrink-0"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
