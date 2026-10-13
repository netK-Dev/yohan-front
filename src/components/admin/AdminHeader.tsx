'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';

const links = [
  { href: '/admin/dashboard', label: 'Projets' },
  { href: '/admin/slider', label: 'Slider' },
  { href: '/admin/homepage', label: 'Accueil' },
];

export default function AdminHeader({
  className = '',
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    if (isLoggingOut) return;
    setLoggingOut(true);
    setError('');
    try {
      const result = await signOut();
      if (result.error) throw new Error('Déconnexion impossible');
      router.replace('/admin/login');
    } catch {
      setError('La déconnexion a échoué. Veuillez réessayer.');
      setLoggingOut(false);
    }
  }

  return (
    <header
      className={`border-b border-white/10 bg-[#0a0a0a] text-white ${className}`}
    >
      <a
        href="#admin-content"
        className="sr-only focus:not-sr-only focus:inline-flex focus:min-h-11 focus:items-center focus:px-4"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/admin/dashboard"
          className="flex min-h-11 min-w-0 items-center gap-3"
        >
          <Image
            src="/img/logo_yohan.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              Doens Production <span className="text-white/60">/ Admin</span>
            </p>
            {session?.user?.name && (
              <p className="max-w-60 truncate text-xs text-white/60">
                {session.user.name}
              </p>
            )}
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-3 text-sm text-white/80 hover:bg-white/5"
          >
            Voir le site <span className="sr-only">(nouvel onglet)</span>
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="min-h-11 rounded-md px-3 text-sm text-white/80 hover:bg-white/5 disabled:opacity-50"
          >
            {isLoggingOut ? 'Déconnexion…' : 'Se déconnecter'}
          </button>
        </div>
        <nav
          aria-label="Administration"
          className="flex w-full gap-1 border-t border-white/10 pt-2 lg:order-none lg:w-auto lg:border-0 lg:pt-0"
        >
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-md border px-4 text-sm font-medium lg:flex-none ${active ? 'border-white/15 bg-white/10 text-white' : 'border-transparent text-white/65 hover:bg-white/5 hover:text-white'}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <p
          role={error ? 'alert' : 'status'}
          className={
            error || isLoggingOut ? 'w-full text-sm text-white/80' : 'sr-only'
          }
        >
          {error || (isLoggingOut ? 'Déconnexion en cours…' : '')}
        </p>
      </div>
    </header>
  );
}
