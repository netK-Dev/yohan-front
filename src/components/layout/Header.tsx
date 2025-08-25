'use client';
// src/components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isRealisations =
    pathname?.startsWith('/realisations') ||
    pathname?.startsWith('/realisation');
  const isHome = pathname === '/';
  const isAbout = pathname?.startsWith('/about');
  const isContact = pathname?.startsWith('/contact');
  const category = searchParams?.get('category');
  const is3DVfx = isRealisations && category === '3d-vfx';
  const isMotion = isRealisations && category === 'motion-design';
  const isCourt = isRealisations && category === 'court-metrage';
  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent px-2 py-2 sm:px-4 sm:py-4">
      {/* Container avec effet de halo extérieur */}
      <div className="relative mx-auto max-w-7xl">
        {/* Halo extérieur uniforme - couche 1 */}
        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#000002]/30 via-gray-950/40 to-[#000002]/30 blur-md sm:rounded-3xl" />

        {/* Halo extérieur uniforme - couche 2 */}
        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#000002]/50 via-gray-950/60 to-[#000002]/50 blur-sm sm:rounded-2xl" />

        {/* Header principal intact */}
        <header className="relative rounded-xl bg-gradient-to-r from-[#000002] via-gray-950 to-[#000002] shadow-2xl sm:rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex h-16 items-center justify-between sm:h-20">
              {/* Logo/Titre avec image et texte stylé */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/"
                  className="group flex items-center space-x-2 sm:space-x-4"
                >
                  {/* Logo image */}
                  <div className="relative h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                    <Image
                      src="/img/logo_yohan.png"
                      alt="Doens Production Logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Texte stylé "Doens Production" */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
                    <h1 className="text-lg font-bold text-[#ff0015] transition-all duration-300 group-hover:text-[#ff333b] sm:text-2xl lg:text-3xl">
                      Doens
                    </h1>
                    <span className="text-sm font-light text-white opacity-90 transition-all duration-300 group-hover:opacity-100 sm:text-lg lg:text-xl">
                      Production
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation principale */}
              <nav className="hidden space-x-6 md:flex lg:space-x-8">
                {/* Accueil */}
                <Link
                  href="/"
                  className={`group relative text-base font-medium transition-all duration-300 lg:text-lg ${
                    isHome
                      ? 'text-[#ff0015]'
                      : 'text-white hover:text-[#ff0015]'
                  }`}
                >
                  Accueil
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff0015] transition-all duration-300 ${
                      isHome ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>

                {/* À propos */}
                <Link
                  href="/about"
                  className={`group relative text-base font-medium transition-all duration-300 lg:text-lg ${
                    isAbout
                      ? 'text-[#ff0015]'
                      : 'text-white hover:text-[#ff0015]'
                  }`}
                >
                  À propos
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff0015] transition-all duration-300 ${
                      isAbout ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>

                {/* Réalisation avec menu déroulant */}
                <div className="group relative">
                  <button
                    className={`flex items-center space-x-1 text-base font-medium transition-all duration-300 lg:text-lg ${
                      isRealisations
                        ? 'text-[#ff0015]'
                        : 'text-white hover:text-[#ff0015]'
                    }`}
                  >
                    <span>Réalisation</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Menu déroulant avec halo extérieur */}
                  <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 translate-y-2 transform opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {/* Halo extérieur pour dropdown */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-xl bg-gradient-to-b from-gray-950/40 to-[#000002]/40 blur-sm" />
                      <div className="blur-xs absolute -inset-1 rounded-xl bg-gradient-to-b from-gray-950/60 to-[#000002]/60" />

                      {/* Dropdown principal intact */}
                      <div className="relative rounded-xl bg-gradient-to-b from-gray-950 to-[#000002] shadow-2xl">
                        <div className="py-3">
                          <Link
                            href="/realisations"
                            className={`block px-6 py-3 font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10 ${
                              isRealisations
                                ? 'bg-white/10 text-[#ff0015]'
                                : 'text-white hover:text-[#ff0015]'
                            }`}
                          >
                            Toutes les réalisations
                          </Link>
                          <Link
                            href="/realisations?category=3d-vfx"
                            className={`block px-6 py-3 font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10 ${
                              is3DVfx
                                ? 'bg-white/10 text-[#ff0015]'
                                : 'text-white hover:text-[#ff0015]'
                            }`}
                          >
                            3D/VFX et Compositing
                          </Link>
                          <Link
                            href="/realisations?category=motion-design"
                            className={`block px-6 py-3 font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10 ${
                              isMotion
                                ? 'bg-white/10 text-[#ff0015]'
                                : 'text-white hover:text-[#ff0015]'
                            }`}
                          >
                            Motion Design
                          </Link>
                          <Link
                            href="/realisations?category=court-metrage"
                            className={`block px-6 py-3 font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10 ${
                              isCourt
                                ? 'bg-white/10 text-[#ff0015]'
                                : 'text-white hover:text-[#ff0015]'
                            }`}
                          >
                            Court Métrage
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <Link
                  href="/contact"
                  className={`group relative text-base font-medium transition-all duration-300 lg:text-lg ${
                    isContact
                      ? 'text-[#ff0015]'
                      : 'text-white hover:text-[#ff0015]'
                  }`}
                >
                  Contact
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff0015] transition-all duration-300 ${
                      isContact ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              </nav>

              {/* Menu mobile (hamburger) - Version moderne */}
              <div className="md:hidden">
                <button
                  className="rounded-lg p-1.5 text-white transition-all duration-300 hover:bg-white hover:bg-opacity-10 hover:text-[#ff0015] sm:p-2"
                  aria-label="Menu mobile"
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
