'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { signOut, useSession } from '@/lib/auth-client';

type AdminHeaderProps = {
  className?: string;
};

export default function AdminHeader({ className }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  async function handleLogout() {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      router.push('/admin/login');
    }
  }

  return (
    <>
      <header
        className={`relative ${COLOR_COMBINATIONS.header.background} ${COLOR_COMBINATIONS.header.text} border-b border-white/10 ${className ?? ''}`}
      >
        <AnimatedGridBackground
          className="pointer-events-none absolute inset-0 opacity-30"
          density={0.35}
          speed={1.2}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/img/logo_yohan.png"
                alt="Yohan Doens"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-white/90">
                  Admin
                </span>
                {session?.user?.name && (
                  <span className="max-w-[120px] truncate text-xs text-white/60">
                    Connecté: {session.user.name}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2">
              <Link
                href="/admin/dashboard"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  pathname.startsWith('/admin/dashboard')
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Projets
              </Link>
              <Link
                href="/admin/slider"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  pathname.startsWith('/admin/slider')
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Slider
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className={`rounded-md px-3 py-2 text-sm font-medium ${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} ${COLOR_COMBINATIONS.secondaryButton.hover} transition`}
              >
                Retour au site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={`rounded-md px-3 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition`}
              >
                Se déconnecter
              </button>
            </div>
          </nav>

          {/* Bouton hamburger mobile */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
            aria-label="Menu admin"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-gradient-to-b from-[#0a0a0a] to-[#000002] shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header du drawer */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-sm font-semibold text-white/90">Admin</span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liens de navigation */}
          <nav className="mt-2 flex-1 space-y-1 px-3">
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                pathname.startsWith('/admin/dashboard')
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Projets
            </Link>
            <Link
              href="/admin/slider"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                pathname.startsWith('/admin/slider')
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Slider
            </Link>
          </nav>

          {/* Actions en bas du drawer */}
          <div className="space-y-2 border-t border-white/10 p-4">
            {session?.user?.name && (
              <p className="mb-3 truncate text-xs text-white/50">
                Connecté: {session.user.name}
              </p>
            )}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-md border-2 border-white px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white hover:text-[#000002]"
            >
              Retour au site
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="block w-full rounded-md bg-[#ff0015] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#e6000c]"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
