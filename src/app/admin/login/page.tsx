'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from '@/lib/auth-client';

function returnDestination() {
  const requested = new URLSearchParams(window.location.search).get('returnTo');
  if (!requested) return '/admin/dashboard';
  try {
    const url = new URL(requested, window.location.origin);
    if (
      url.origin === window.location.origin &&
      /^\/admin\/(dashboard|slider|homepage)(\/|$)/.test(url.pathname)
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    /* Fall back to the dashboard for an invalid destination. */
  }
  return '/admin/dashboard';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { data: session, isPending } = useSession();

  React.useEffect(() => {
    if (session?.user) router.replace(returnDestination());
  }, [session, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signIn.email({
        email: String(formData.get('email')).trim(),
        password: String(formData.get('password')),
      });
      if (result.data?.user) {
        router.replace(returnDestination());
        return;
      }
      setError(
        'Adresse e-mail ou mot de passe incorrect. Vérifiez vos identifiants.'
      );
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion et réessayez.');
    }
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000002] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Image src="/img/logo_yohan.png" alt="" width={40} height={40} />
          <span className="text-sm font-semibold tracking-wide">
            Doens Production
          </span>
        </div>
        <div className="rounded-xl border border-white/15 bg-[#111111] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Administration</h1>
          <p className="mt-2 mb-6 text-sm leading-6 text-white/65">
            Connectez-vous pour gérer les projets et le contenu du site.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-busy={loading}
            aria-describedby={error ? 'login-error' : undefined}
          >
            {error && (
              <p
                id="login-error"
                role="alert"
                className="rounded-md border border-red-400/30 bg-red-500/5 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading || isPending}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                className="min-h-11 w-full rounded-md border border-white/20 bg-black/40 px-3 text-base text-white outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading || isPending}
                autoComplete="current-password"
                className="min-h-11 w-full rounded-md border border-white/20 bg-black/40 px-3 text-base text-white outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading || isPending || !!session?.user}
              className="min-h-11 w-full rounded-md bg-[#cc0009] px-4 text-sm font-semibold text-white hover:bg-[#b30006] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
            <p role="status" className="text-sm text-white/65">
              {isPending
                ? 'Vérification de votre session…'
                : loading
                  ? 'Connexion en cours…'
                  : session?.user
                    ? 'Ouverture de l’administration…'
                    : ''}
            </p>
          </form>
        </div>
        <Link
          href="/"
          className="mt-4 flex min-h-11 items-center justify-center text-sm text-white/65 underline underline-offset-4 hover:text-white"
        >
          Retour au site
        </Link>
      </div>
    </main>
  );
}
