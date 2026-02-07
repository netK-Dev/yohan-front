import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/auth-server';
import { CreateProjectSchema } from '@/lib/types/project';

// POST /api/projects/new - Créer un nouveau projet (admin only)
export const POST = withAuth(async request => {
  try {
    const body = await request.json();

    const validated = CreateProjectSchema.parse(body);

    const data = {
      ...validated,
      date: new Date(validated.date),
      video: validated.video || null,
      videoFile: validated.videoFile || null,
      skill: validated.skill || null,
      software: validated.software || [],
      link: validated.link || null,
    };

    const project = await prisma.project.create({ data });
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as unknown as { errors?: unknown }).errors
    ) {
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
