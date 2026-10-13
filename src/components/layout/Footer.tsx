import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#09090b]">
      <div className="site-container py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex min-h-11 items-center gap-3"
            >
              <Image src="/img/logo_yohan.png" alt="" width={40} height={40} />
              <span className="text-base font-semibold">Doens Production</span>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-white/60">
              Créateur visuel spécialisé en 3D/VFX, Motion Design et Courts
              Métrages.
            </p>
          </div>
          <nav aria-label="Navigation de pied de page">
            <p className="eyebrow mb-3">Explorer</p>
            <Link className="text-link flex" href="/realisations">
              Toutes les réalisations
            </Link>
            <Link className="text-link flex" href="/about">
              À propos
            </Link>
            <Link className="text-link flex" href="/contact">
              Contact
            </Link>
          </nav>
          <div>
            <p className="eyebrow mb-3">Un projet en tête ?</p>
            <a
              className="text-link break-all"
              href="mailto:contact@doensproduction.com"
            >
              contact@doensproduction.com
            </a>
            <p className="mt-2 text-sm text-white/60">France</p>
            <Link className="text-link mt-3" href="/contact?type=quote">
              Demander un devis ↗
            </Link>
          </div>
        </div>
        <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Doens Production. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
