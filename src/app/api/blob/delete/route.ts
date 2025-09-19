import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { pathname } = await request.json();
    if (!pathname) {
      return NextResponse.json({ error: 'pathname requis' }, { status: 400 });
    }

    await del(pathname);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Suppression échouée' }, { status: 500 });
  }
}
