import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RealisationsGallery from '@/components/sections/RealisationsGallery';
import IntroBanner from '@/components/sections/IntroBanner';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { generateRealisationsListingMetadata } from '@/lib/utils/seo';
import prisma from '@/lib/prisma';
import { Suspense } from 'react';

// Génération des métadonnées SEO pour la page de listing
export async function generateMetadata() {
  // Récupérer quelques projets récents pour les métadonnées
  const projects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return generateRealisationsListingMetadata(projects);
}

// Fonction pour générer les données structurées de la page de listing
async function generateListingStructuredData() {
  const projects = await prisma.project.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      images: true,
      createdAt: true,
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doensproduction.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Réalisations - Doens Production',
    description: 'Portfolio de réalisations créatives en 3D/VFX, Motion Design et Court Métrage',
    url: `${siteUrl}/realisations`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `${siteUrl}/realisations/${project.id}`,
          name: project.title,
          description: project.description,
          url: `${siteUrl}/realisations/${project.id}`,
          image: project.images[0] || '/img/logo_yohan.png',
          genre: project.category,
          dateCreated: project.createdAt.toISOString(),
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Réalisations',
          item: `${siteUrl}/realisations`,
        },
      ],
    },
  };
}

export default async function RealisationsPage() {
  const structuredData = await generateListingStructuredData();

  return (
    <>
      {/* Données structurées JSON-LD pour la page de listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
        <IntroBanner
          title="Réalisations"
          subtitle="Des projets qui allient exigence technique et direction artistique."
        />

        <Suspense fallback={null}>
          <RealisationsGallery />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
