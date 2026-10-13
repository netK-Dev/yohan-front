import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import IntroBanner from '@/components/sections/IntroBanner';

export const metadata = {
  title: 'Contact | Doens Production',
  description:
    'Parlez-nous de votre projet 3D/VFX, Motion Design ou Court Métrage. Devis rapide et conseils.',
};

export default function ContactPage() {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main id="main-content" tabIndex={-1}>
        <IntroBanner
          title="Entrons en contact"
          subtitle="Discutons de vos idées et transformons-les en créations visuelles marquantes."
        />
        <section className="section-space">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Un projet, une idée</p>
              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                Parlez-moi de votre projet
              </h2>
              <p className="mt-4 text-base leading-7 text-white/65">
                Je réponds rapidement avec des propositions concrètes et
                adaptées à vos objectifs.
              </p>
              <a
                href="mailto:contact@doensproduction.com"
                className="text-link mt-5 break-all"
              >
                contact@doensproduction.com ↗
              </a>
              <ul className="my-8 space-y-4 border-y border-white/15 py-6 text-sm leading-7 text-white/65">
                <li>
                  <span className="text-white">3D/VFX</span> · Modeling,
                  Shading, Compositing
                </li>
                <li>
                  <span className="text-white">Motion Design</span> · Branding
                  animé, Kinetic type
                </li>
                <li>
                  <span className="text-white">Court Métrage</span> ·
                  Réalisation, Montage
                </li>
                <li>Devis rapide · Conseil et accompagnement</li>
              </ul>
              <div className="divide-y divide-white/15">
                {[
                  [
                    'Délais de réponse',
                    'Je réponds sous 24 à 48h ouvrées, souvent le jour même.',
                  ],
                  [
                    'Devis et budget',
                    'Après un premier échange, je fournis un devis clair et détaillé.',
                  ],
                  [
                    'Processus',
                    'Brief, moodboard, itérations créatives, puis livraison finale conforme.',
                  ],
                ].map(([question, answer]) => (
                  <details key={question} className="group py-3">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                      {question}
                      <span
                        aria-hidden="true"
                        className="text-lg text-white/50 group-open:rotate-180"
                      >
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-2 pb-3 text-sm leading-7 text-white/65">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
            <div className="public-panel">
              <h2 className="mb-6 text-xl font-medium">Votre message</h2>
              <Suspense
                fallback={
                  <p role="status" className="text-white/65">
                    Chargement du formulaire…
                  </p>
                }
              >
                <ContactForm />
              </Suspense>
              <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-6 text-white/55">
                Vos coordonnées servent uniquement à vous répondre. Vos données
                ne sont jamais revendues.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
