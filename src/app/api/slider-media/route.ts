import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateSliderMediaInput } from '@/lib/types/slider';

// GET - Récupérer tous les médias slider
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const sliderMedia = await prisma.sliderMedia.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(sliderMedia);
  } catch (error) {
    console.error('Erreur lors de la récupération des médias slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Créer un nouveau média slider
export async function POST(request: NextRequest) {
  try {
    const body: CreateSliderMediaInput = await request.json();

    // Validation basique
    if (!body.title || !body.mediaUrl) {
      return NextResponse.json(
        { error: 'Titre et URL du média requis' },
        { status: 400 }
      );
    }

    const sliderMedia = await prisma.sliderMedia.create({
      data: {
        title: body.title,
        description: body.description || null,
        mediaUrl: body.mediaUrl,
        mediaPath: body.mediaPath || null,
        mediaType: body.mediaType || 'image',
        category: body.category || null,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(sliderMedia, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du média slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
