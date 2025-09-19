'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { signIn, useSession } from '@/lib/auth-client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { data: session } = useSession();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (session?.user) {
      router.push('/admin/dashboard');
    }
  }, [session, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Essayer de se connecter uniquement
      const signInResult = await signIn.email({
        email,
        password,
      });

      if (signInResult.data?.user) {
        router.push('/admin/dashboard');
        return;
      }

      // Afficher l'erreur de connexion sans créer de compte
      if (signInResult.error) {
        setError(
          'Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.'
        );
      }
    } catch {
      setError('Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <main
      className={`relative min-h-screen ${COLOR_COMBINATIONS.page.background} ${COLOR_COMBINATIONS.page.text}`}
    >
      <AnimatedGridBackground
        className="pointer-events-none absolute inset-0"
        density={0.4}
        speed={1}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold tracking-wide">
              Espace Admin
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Connectez-vous pour accéder au tableau de bord
            </p>
          </div>

          <form
            suppressHydrationWarning
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            {error && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm text-white/80"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                autoComplete="username"
                className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/40 focus:border-white/20 disabled:opacity-50"
                placeholder="admin@yohan.dev"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm text-white/80"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                autoComplete="current-password"
                className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/40 focus:border-white/20 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-white/50">
            <Link
              href="/"
              className="underline decoration-white/20 underline-offset-4 hover:text-white/80"
            >
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
