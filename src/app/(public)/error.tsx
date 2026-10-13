'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PublicError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <>
      <title>Page indisponible | Doens Production</title>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main
        id="main-content"
        tabIndex={-1}
        className="site-container flex min-h-[65dvh] flex-col items-start justify-center py-16"
      >
        <p className="eyebrow mb-6">Un instant…</p>
        <h1 className="section-title">
          Cette page est momentanément indisponible.
        </h1>
        <p className="mt-5 text-base leading-7 text-white/65">
          Veuillez réessayer ou revenir à l’accueil.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="button-primary" onClick={retry}>
            Réessayer
          </button>
          <Link href="/" className="button-secondary">
            Retour à l’accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
