import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main
        id="main-content"
        tabIndex={-1}
        className="site-container flex min-h-[65dvh] flex-col items-start justify-center py-16"
      >
        <p className="eyebrow mb-6">404 · Page introuvable</p>
        <h1 className="section-title max-w-2xl">Reprenons le fil.</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
          Cette page n’existe pas ou n’est plus disponible. Découvrez les
          réalisations ou revenez à l’accueil.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/realisations" className="button-primary">
            Voir les réalisations ↗
          </Link>
          <Link href="/" className="button-secondary">
            Retour à l’accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
