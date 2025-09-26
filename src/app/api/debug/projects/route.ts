import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Route de debug pour voir tous les projets (à supprimer après debug)
export async function GET() {
  try {
    console.log('🔍 [DEBUG] Checking database connection...');
    
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📋 [DEBUG] Found ${allProjects.length} projects in database`);
    
    return NextResponse.json({
      count: allProjects.length,
      projects: allProjects,
      environment: process.env.NODE_ENV,
      database_url: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
    });
  } catch (error) {
    console.error('❌ [DEBUG] Database error:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
