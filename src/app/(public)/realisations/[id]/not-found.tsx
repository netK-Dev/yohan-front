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
        <p className="eyebrow mb-6">404 · Réalisation</p>
        <h1 className="section-title">Projet introuvable</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
          Le projet que vous recherchez n’existe pas ou n’est plus disponible.
          Les autres créations vous attendent dans le portfolio.
        </p>
        <Link href="/realisations" className="button-primary mt-8">
          Retour aux réalisations ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}
