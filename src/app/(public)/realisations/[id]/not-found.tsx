import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main
        className={`min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text} flex items-center justify-center`}
      >
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Projet introuvable</h1>
          <p className="mb-6 text-white/70">
            Le projet que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
          <Link
            href="/realisations"
            className={`inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover}`}
          >
            Retour aux réalisations
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
