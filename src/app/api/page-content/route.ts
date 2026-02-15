import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/page-content?page=home
 * Récupère tout le contenu d'une page, indexé par section.
 * Route publique (utilisée aussi par le back-office).
 */
export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get('page');

    if (!page) {
      return NextResponse.json(
        { error: 'Paramètre "page" requis' },
        { status: 400 }
      );
    }

    const rows = await prisma.pageContent.findMany({
      where: { page },
      select: { section: true, content: true, updatedAt: true },
    });

    const result: Record<string, unknown> = {};
    for (const row of rows) {
      result[row.section] = row.content;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur GET /api/page-content:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
