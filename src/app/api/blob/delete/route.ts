import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { getServerSession } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentification requise' },
        { status: 401 }
      );
    }

    const { pathname } = await request.json();
    if (!pathname) {
      return NextResponse.json(
        { error: 'pathname requis' },
        { status: 400 }
      );
    }

    await del(pathname);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Suppression échouée' },
      { status: 500 }
    );
  }
}
