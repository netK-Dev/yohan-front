import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/auth-server';
import {
  HOME_SECTIONS,
  SECTION_SCHEMAS,
  type HomeSection,
} from '@/lib/types/page-content';
import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';

/**
 * PUT /api/page-content/[section]
 * Met à jour le contenu d'une section (upsert).
 * Protégé par authentification admin.
 * Body: { page: string, content: object }
 */
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const section = url.pathname.split('/').pop() as string;

    if (!HOME_SECTIONS.includes(section as HomeSection)) {
      return NextResponse.json(
        {
          error: `Section invalide: "${section}". Sections autorisées: ${HOME_SECTIONS.join(', ')}`,
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

    // Validation Zod selon la section
    const schema = SECTION_SCHEMAS[section as HomeSection];
    const parsed = schema.safeParse(content);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    // Upsert : crée ou met à jour
    const result = await prisma.pageContent.upsert({
      where: { page_section: { page, section } },
      update: { content: parsed.data },
      create: { page, section, content: parsed.data },
    });

    // Invalider le cache de données + régénérer la page statique sur le CDN
    revalidateTag('home-content');
    revalidatePath('/');

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
