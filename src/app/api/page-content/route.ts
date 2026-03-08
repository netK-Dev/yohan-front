import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  HeroContentSchema,
  sanitizeHeroContent,
} from '@/lib/types/page-content';

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
      let sectionContent: unknown = row.content;

      if (page === 'home' && row.section === 'hero') {
        const heroParsed = HeroContentSchema.safeParse(row.content);
        if (heroParsed.success) {
          const normalized = sanitizeHeroContent(heroParsed.data);
          sectionContent =
            normalized.stats.length > 0 ? normalized : heroParsed.data;
        }
      }

      result[row.section] = sectionContent;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur GET /api/page-content:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
