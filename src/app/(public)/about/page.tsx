import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import IntroBanner from '@/components/sections/IntroBanner';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import Image from 'next/image';

export const metadata = {
  title: 'À propos | Doens Production',
  description:
    'Parcours, expertises et valeurs de Doens Production. Un CV moderne orienté création visuelle.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
        <IntroBanner
          title="Yohan Doens"
          subtitle="Créateur de mondes visuels – 3D/VFX, Motion Design, Court Métrage"
        />

        {/* Corps de page type CV */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-12 lg:px-8">
            {/* Colonne gauche: Infos clés */}
            <aside
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-20" />
              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Coordonnées
                  </h2>
                  <ul className="mt-3 space-y-2 text-white/80">
                    <li>contact@doensproduction.com</li>
                    <li>France</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Compétences
                  </h2>
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-white/80">
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      Modeling
                    </li>
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      Shading
                    </li>
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      Compositing
                    </li>
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      After Effects
                    </li>
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      Branding animé
                    </li>
                    <li className="rounded-lg bg-white/5 px-3 py-1.5">
                      Montage
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Outils</h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-white/80">
                    <span className="rounded-lg bg-white/5 px-3 py-1.5">
                      Blender
                    </span>
                    <span className="rounded-lg bg-white/5 px-3 py-1.5">
                      Nuke
                    </span>
                    <span className="rounded-lg bg-white/5 px-3 py-1.5">
                      After Effects
                    </span>
                    <span className="rounded-lg bg-white/5 px-3 py-1.5">
                      Photoshop
                    </span>
                    <span className="rounded-lg bg-white/5 px-3 py-1.5">
                      Illustrator
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Colonne droite: Expériences et parcours */}
            <div className="space-y-8 lg:col-span-2">
              {/* À propos */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#ff0015]/10 to-transparent opacity-20" />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-white">Profil</h2>
                  <p className="mt-3 text-white/80">
                    Je conçois et réalise des expériences visuelles impactantes
                    en 3D/VFX, motion design et court métrage. Mon approche
                    allie exigence technique et direction artistique.
                  </p>
                </div>
              </div>

              {/* Expériences */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-20" />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-white">
                    Expériences
                  </h2>
                  <ul className="mt-4 space-y-4">
                    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between text-white">
                        <span className="font-semibold">
                          Freelance – Doens Production
                        </span>
                        <span className="text-white/60">
                          2020 – Aujourd'hui
                        </span>
                      </div>
                      <p className="mt-2 text-white/80">
                        Réalisations 3D/VFX, motion design et courts métrages
                        pour des marques et studios.
                      </p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between text-white">
                        <span className="font-semibold">
                          ISART Digital – Formation 3D/VFX
                        </span>
                        <span className="text-white/60">Diplômé</span>
                      </div>
                      <p className="mt-2 text-white/80">
                        Maîtrise du pipeline complet: modeling, shading,
                        rigging, animation, rendering, compositing.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.accent} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
              >
                <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Travaillons ensemble
                    </h3>
                    <p className="text-white/90">
                      Parlons de votre projet – réponse rapide et conseils.
                    </p>
                  </div>
                  <a
                    href="/contact?type=quote"
                    className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#000002] transition-all hover:opacity-90"
                  >
                    Demander un devis
                  </a>
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
