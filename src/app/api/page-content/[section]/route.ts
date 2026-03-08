import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/auth-server';
import {
  HOME_SECTIONS,
  SECTION_SCHEMAS,
  HeroContentSchema,
  ShowreelContentSchema,
  extractBlobPathnamesFromShowreel,
  extractBlobUrlsFromShowreel,
  sanitizeHeroContent,
  type HomeSection,
} from '@/lib/types/page-content';
import { PROTECTED_SHOWREEL_PATHNAMES } from '@/lib/constants/showreel';
import { deleteManyFromBlob } from '@/lib/blob';

/**
 * PUT /api/page-content/[section]
 * Met a jour le contenu d'une section (upsert).
 * Protege par authentification admin.
 * Body: { page: string, content: object }
 */
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const section = url.pathname.split('/').pop() as string;

    if (!HOME_SECTIONS.includes(section as HomeSection)) {
      return NextResponse.json(
        {
          error: `Section invalide: "${section}". Sections autorisees: ${HOME_SECTIONS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { page, content } = body;

    if (!page || !content) {
      return NextResponse.json(
        { error: 'Champs "page" et "content" requis' },
        { status: 400 }
      );
    }

    const schema = SECTION_SCHEMAS[section as HomeSection];
    const parsed = schema.safeParse(content);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Donnees invalides',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    let normalizedContent: unknown = parsed.data;

    if (page === 'home' && section === 'hero') {
      const heroParsed = HeroContentSchema.safeParse(parsed.data);

      if (!heroParsed.success) {
        return NextResponse.json(
          {
            error: 'Donnees invalides',
            details: heroParsed.error.flatten().fieldErrors,
          },
          { status: 422 }
        );
      }

      const normalizedHero = sanitizeHeroContent(heroParsed.data);
      normalizedContent =
        normalizedHero.stats.length > 0 ? normalizedHero : heroParsed.data;
    }

    let removedBlobUrls: string[] = [];

    if (page === 'home' && section === 'showreel') {
      const existing = await prisma.pageContent.findUnique({
        where: { page_section: { page, section } },
        select: { content: true },
      });

      const oldParsed = ShowreelContentSchema.safeParse(existing?.content);
      const nextParsed = ShowreelContentSchema.safeParse(normalizedContent);

      if (oldParsed.success && nextParsed.success) {
        const oldUrls = extractBlobUrlsFromShowreel(oldParsed.data);
        const newUrls = new Set(extractBlobUrlsFromShowreel(nextParsed.data));
        const oldPathnames = new Set(
          extractBlobPathnamesFromShowreel(oldParsed.data)
        );

        removedBlobUrls = oldUrls.filter(urlValue => {
          if (newUrls.has(urlValue)) return false;

          let pathname = '';
          try {
            pathname = new URL(urlValue).pathname;
          } catch {
            return false;
          }

          // On supprime uniquement les blobs explicitement geres par la section.
          if (!oldPathnames.has(pathname)) return false;

          // Les assets de fallback par defaut ne doivent jamais etre supprimes.
          if (PROTECTED_SHOWREEL_PATHNAMES.has(pathname)) return false;

          return true;
        });
      }
    }

    const result = await prisma.pageContent.upsert({
      where: { page_section: { page, section } },
      update: { content: normalizedContent as object },
      create: { page, section, content: normalizedContent as object },
    });

    revalidateTag('home-content');
    revalidatePath('/');

    if (removedBlobUrls.length > 0) {
      deleteManyFromBlob(removedBlobUrls).catch(error => {
        console.warn(
          '[page-content] Echec suppression anciens assets showreel:',
          error
        );
      });
    }

    return NextResponse.json({
      section: result.section,
      content: result.content,
      updatedAt: result.updatedAt,
    });
  } catch (error) {
    console.error('Erreur PUT /api/page-content/[section]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
});
