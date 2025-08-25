import Header from '@/components/layout/Header';
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
      <Header />
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

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
            {/* Infos + highlights */}
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-20" />
              <div className="relative z-10 space-y-6">
                <div>
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
              </div>
            </div>

            {/* Formulaire */}
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.gradients.card} p-6 shadow-2xl sm:rounded-3xl sm:p-8`}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#ff0015]/10 to-transparent opacity-20" />
              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
