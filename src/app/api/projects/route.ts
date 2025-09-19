import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-server';
import { CreateProjectSchema } from '@/lib/types/project';
import prisma from '@/lib/prisma';

// GET /api/projects - Récupérer tous les projets (public)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/projects - Créer un nouveau projet (admin only)
export const POST = withAuth(async request => {
  try {
    const body = await request.json();

    // Validation avec Zod
    const validatedData = CreateProjectSchema.parse(body);

    // Conversion de la date string en Date
    const projectData = {
      ...validatedData,
      date: new Date(validatedData.date),
      // Nettoyer les champs optionnels vides
      video: validatedData.video || null,
      skill: validatedData.skill || null,
      link: validatedData.link || null,
    };

    const project = await prisma.project.create({
      data: projectData,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    console.error('Erreur lors de la création du projet:', error);

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
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
});
