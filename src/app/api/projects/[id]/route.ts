import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-server';
import { UpdateProjectSchema } from '@/lib/types/project';
import { deleteManyFromBlob } from '@/lib/blob';
import prisma from '@/lib/prisma';

// GET /api/projects/[id] - Récupérer un projet spécifique (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT /api/projects/[id] - Mettre à jour un projet (admin only)
export const PUT = withAuth(
  async (request, session, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await request.json();

      // Validation avec Zod
      const validatedData = UpdateProjectSchema.parse({
        ...body,
        id,
      });

      // Vérifier que le projet existe
      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return NextResponse.json(
          { error: 'Projet non trouvé' },
          { status: 404 }
        );
      }

      // Préparer les données pour la mise à jour (exclure l'ID)
      const updateData = { ...validatedData };
      delete (updateData as { id?: string }).id;

      // Conversion de la date si fournie
      const finalUpdateData: Record<string, unknown> = { ...updateData };
      if (updateData.date) {
        finalUpdateData.date = new Date(updateData.date);
      }

      // Nettoyer les champs optionnels
      if (updateData.video === '') finalUpdateData.video = null;
      if (
        Array.isArray(updateData.images) === false &&
        updateData.images !== undefined
      ) {
        delete (finalUpdateData as Record<string, unknown>).images; // sécuriser si mauvais type
      }
      if (updateData.videoFile === '') finalUpdateData.videoFile = null;
      if (updateData.skill === '') finalUpdateData.skill = null;
      if (updateData.link === '') finalUpdateData.link = null;

      // Collecter les fichiers Blob supprimés lors de la modification
      const removedBlobUrls: string[] = [];

      // Vérifier si des images ont été supprimées
      if (finalUpdateData.images && Array.isArray(finalUpdateData.images)) {
        const oldImages = existingProject.images || [];
        const newImages = finalUpdateData.images as string[];
        const removedImages = oldImages.filter(img => !newImages.includes(img));
        removedBlobUrls.push(...removedImages);
      }

      // Vérifier si la vidéo a été remplacée ou supprimée
      if (finalUpdateData.videoFile !== undefined) {
        if (
          existingProject.videoFile &&
          finalUpdateData.videoFile !== existingProject.videoFile
        ) {
          removedBlobUrls.push(existingProject.videoFile);
        }
      }

      const project = await prisma.project.update({
        where: { id },
        data: finalUpdateData,
      });

      // Supprimer les anciens fichiers Blob (en arrière-plan)
      if (removedBlobUrls.length > 0) {
        deleteManyFromBlob(removedBlobUrls).catch(error => {
          console.error(
            'Erreur lors de la suppression des anciens fichiers Blob:',
            error
          );
        });
      }

      return NextResponse.json(project);
    } catch (error: unknown) {
      console.error('Erreur lors de la mise à jour du projet:', error);

      // Erreur de validation Zod
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          {
            error: 'Données invalides',
            details: (error as unknown as { errors: unknown }).errors,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour du projet' },
        { status: 500 }
      );
    }
  }
);

// DELETE /api/projects/[id] - Supprimer un projet (admin only)
export const DELETE = withAuth(
  async (request, session, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      // Vérifier que le projet existe
      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return NextResponse.json(
          { error: 'Projet non trouvé' },
          { status: 404 }
        );
      }

      // Collecter toutes les URLs Blob à supprimer
      const blobUrls: string[] = [];
      if (existingProject.images) {
        blobUrls.push(...existingProject.images);
      }
      if (existingProject.videoFile) {
        blobUrls.push(existingProject.videoFile);
      }

      // Supprimer le projet de la DB
      await prisma.project.delete({
        where: { id },
      });

      // Supprimer les fichiers Blob (en arrière-plan, non bloquant)
      if (blobUrls.length > 0) {
        deleteManyFromBlob(blobUrls).catch(error => {
          console.error(
            'Erreur lors de la suppression des fichiers Blob:',
            error
          );
        });
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du projet' },
        { status: 500 }
      );
    }
  }
);
