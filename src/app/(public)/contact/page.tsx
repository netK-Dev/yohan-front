import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import IntroBanner from '@/components/sections/IntroBanner';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export const metadata = {
  title: 'Contact | Doens Production',
  description:
    'Parlez-nous de votre projet 3D/VFX, Motion Design ou Court Métrage. Devis rapide et conseils.',
};

export default function ContactPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
        <IntroBanner
          title="Entrons en contact"
          subtitle="Discutons de vos idées et transformons-les en créations visuelles marquantes."
        />

        {/* Section contenu */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          {/* décor */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0015]/5 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
            {/* Infos + highlights */}
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.subtle} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/50 via-white/20 to-transparent" />
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80">
                    Infos
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Parlez-moi de votre projet
                  </h2>
                  <p className="mt-2 text-white/80">
                    Je réponds rapidement avec des propositions concrètes et
                    adaptées à vos objectifs.
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur-sm">
                    <span className="text-white">3D/VFX</span> • Modeling,
                    Shading, Compositing
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur-sm">
                    <span className="text-white">Motion Design</span> • Branding
                    animé, Kinetic type
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur-sm">
                    <span className="text-white">Court Métrage</span> •
                    Réalisation, Montage
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur-sm">
                    Devis rapide • Conseil et accompagnement
                  </li>
                </ul>

                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <a
                    href="mailto:contact@doensproduction.com"
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    contact@doensproduction.com
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    LinkedIn
                  </a>
                </div>

                {/* FAQ courte */}
                <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <details className="group p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-white/90">
                      Délais de réponse
                      <span className="transition-transform group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-white/70">
                      Je réponds sous 24 à 48h ouvrées, souvent le jour même.
                    </p>
                  </details>
                  <details className="group p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-white/90">
                      Devis et budget
                      <span className="transition-transform group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-white/70">
                      Après un premier échange, je fournis un devis clair et
                      détaillé.
                    </p>
                  </details>
                  <details className="group p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-white/90">
                      Processus
                      <span className="transition-transform group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-white/70">
                      Brief, moodboard, itérations créatives, puis livraison
                      finale conforme.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div
              className={`relative overflow-hidden rounded-2xl border border-[#ff0015]/30 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#ff0015]/10 to-transparent opacity-20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff0015] via-[#e6000c] to-transparent opacity-80" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-[#ff0015]/20 px-2 py-1 text-xs font-medium text-white">
                      Formulaire
                    </span>
                    <h3 className="text-sm font-semibold text-white/90">
                      Contact
                    </h3>
                  </div>
                </div>
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
                <p className="mt-4 text-center text-xs text-white/50">
                  Protégé par détection anti-spam silencieuse. Vos données ne
                  sont jamais revendues.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
