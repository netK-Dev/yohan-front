import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Route de debug pour analyser un projet spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log(`🔍 [DEBUG] Analyzing project ID: "${id}"`);
    console.log(`📏 [DEBUG] ID length: ${id.length}`);
    console.log(`🔤 [DEBUG] ID type: ${typeof id}`);
    
    // Chercher le projet exact
    const exactProject = await prisma.project.findUnique({
      where: { id },
    });

    // Chercher des projets similaires
    const similarProjects = await prisma.project.findMany({
      where: {
        id: {
          contains: id.substring(0, 5), // Premiers 5 caractères
        },
      },
      select: { id: true, title: true }
    });

    // Lister tous les projets pour comparaison
    const allProjects = await prisma.project.findMany({
      select: { id: true, title: true },
      take: 10
    });

    return NextResponse.json({
      searchedId: id,
      idLength: id.length,
      exactMatch: exactProject ? 'FOUND' : 'NOT_FOUND',
      project: exactProject,
      similarProjects,
      allProjectsInDb: allProjects,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error(`❌ [DEBUG] Error analyzing project:`, error);
    return NextResponse.json({
      error: 'Analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
