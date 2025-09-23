import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/projects/category/[category] - Récupérer les projets d'une catégorie
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const projects = await prisma.project.findMany({
      where: { category },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
