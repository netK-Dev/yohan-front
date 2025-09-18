'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';

type AdminHeaderProps = {
  className?: string;
};

export default function AdminHeader({ className }: AdminHeaderProps) {
  const router = useRouter();

  function handleLogout() {
    // Factice pour l'instant: retour vers la page de login
    router.push('/admin/login');
  }

  return (
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
            <span className="text-sm font-semibold tracking-wide text-white/90">
              Admin
            </span>
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
      </div>
    </header>
  );
}
