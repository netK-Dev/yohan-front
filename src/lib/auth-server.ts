import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Vérifie si l'utilisateur est authentifié côté serveur
 * Utilisé dans les API routes pour protéger les endpoints admin
 */
export async function getServerSession() {
  try {
    const headersList = await headers();
    const authResult = await auth.api.getSession({
      headers: headersList,
    });

    return authResult;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    return null;
  }
}

/**
 * Middleware d'authentification pour les routes API admin
 * Usage: await requireAuth(request) au début de vos API handlers
 */
export async function requireAuth() {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Authentification requise' },
      { status: 401 }
    );
  }

  return session;
}

/**
 * HOC pour protéger automatiquement une route API
 * Usage: export const POST = withAuth(async (request, session) => { ... });
 */
export function withAuth<T extends unknown[]>(
  handler: (
    request: NextRequest,
    session: NonNullable<Awaited<ReturnType<typeof getServerSession>>>,
    ...args: T
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const sessionOrError = await requireAuth();

    if (sessionOrError instanceof NextResponse) {
      return sessionOrError; // Erreur d'auth
    }

    return handler(request, sessionOrError, ...args);
  };
}
