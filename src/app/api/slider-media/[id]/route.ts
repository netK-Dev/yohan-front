import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UpdateSliderMediaInput } from '@/lib/types/slider';
import { deleteFromBlob } from '@/lib/blob';

// GET - Récupérer un média slider par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderMediaId = parseInt(id, 10);

    if (isNaN(sliderMediaId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const sliderMedia = await prisma.sliderMedia.findUnique({
      where: { id: sliderMediaId },
    });

    if (!sliderMedia) {
      return NextResponse.json(
        { error: 'Média slider non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(sliderMedia);
  } catch (error) {
    console.error('Erreur lors de la récupération du média slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT - Mettre à jour un média slider
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderMediaId = parseInt(id, 10);

    if (isNaN(sliderMediaId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body: UpdateSliderMediaInput = await request.json();

    // Vérifier que le média existe
    const existingMedia = await prisma.sliderMedia.findUnique({
      where: { id: sliderMediaId },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { error: 'Média slider non trouvé' },
        { status: 404 }
      );
    }

    // Si l'URL du média change, supprimer l'ancien fichier blob
    if (
      body.mediaUrl &&
      body.mediaUrl !== existingMedia.mediaUrl &&
      existingMedia.mediaPath
    ) {
      await deleteFromBlob(existingMedia.mediaPath);
    }

    const updatedMedia = await prisma.sliderMedia.update({
      where: { id: sliderMediaId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.mediaUrl !== undefined && { mediaUrl: body.mediaUrl }),
        ...(body.mediaPath !== undefined && { mediaPath: body.mediaPath }),
        ...(body.mediaType !== undefined && { mediaType: body.mediaType }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.order !== undefined && { order: body.order }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return NextResponse.json(updatedMedia);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du média slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un média slider
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderMediaId = parseInt(id, 10);

    if (isNaN(sliderMediaId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    // Récupérer le média pour supprimer le fichier blob
    const sliderMedia = await prisma.sliderMedia.findUnique({
      where: { id: sliderMediaId },
    });

    if (!sliderMedia) {
      return NextResponse.json(
        { error: 'Média slider non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le fichier blob si il existe
    if (sliderMedia.mediaPath) {
      await deleteFromBlob(sliderMedia.mediaPath);
    }

    // Supprimer l'enregistrement de la base de données
    await prisma.sliderMedia.delete({
      where: { id: sliderMediaId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du média slider:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
