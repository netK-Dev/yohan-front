import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Route de debug pour analyser un projet spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id, 10);
    
    console.log(`🔍 [DEBUG] Analyzing project ID: "${id}"`);
    console.log(`📏 [DEBUG] ID parsed as: ${projectId}`);
    console.log(`🔤 [DEBUG] ID type: ${typeof projectId}`);
    
    if (isNaN(projectId)) {
      return NextResponse.json({
        searchedId: id,
        exactMatch: 'INVALID_ID_FORMAT',
        message: 'ID is not a valid number.',
      }, { status: 400 });
    }
    
    // Chercher le projet exact
    const exactProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    // Lister tous les projets pour comparaison
    const allProjects = await prisma.project.findMany({
      select: { id: true, title: true },
      take: 10
    });

    return NextResponse.json({
      searchedId: id,
      parsedId: projectId,
      exactMatch: exactProject ? 'FOUND' : 'NOT_FOUND',
      project: exactProject,
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
