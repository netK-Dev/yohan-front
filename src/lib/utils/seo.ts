/**
 * Utilitaires SEO pour la génération automatique de métadonnées
 */

import { Metadata } from 'next';

// Type plus flexible pour les projets venant de Prisma
export interface ProjectForSEO {
  id: number;
  title: string;
  category: string;
  date: Date;
  description: string;
  images: string[];
  video: string | null;
  videoFile: string | null;
  skill: string | null;
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Configuration SEO de base
const SEO_CONFIG = {
  siteName: 'Doens Production',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  defaultImage: '/img/logo_yohan.png',
  twitterHandle: '@doensproduction',
  author: 'Yohan Doens',
  locale: 'fr_FR',
  type: 'website',
};

/**
 * Génère une description SEO optimisée basée sur la description du projet
 */
export function generateSEODescription(
  description: string,
  category: string,
  maxLength = 160
): string {
  // Nettoyer la description (supprimer HTML, caractères spéciaux)
  const cleanDescription = description
    .replace(/<[^>]*>/g, '') // Supprimer HTML
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();

  // Préfixe basé sur la catégorie
  const categoryPrefix =
    {
      '3D/VFX et Compositing': 'Projet 3D/VFX : ',
      'Motion Design': 'Motion Design : ',
      'Court Métrage': 'Court métrage : ',
    }[category] || 'Réalisation : ';

  // Suffixe pour le branding
  const suffix = ' | Doens Production';

  // Calculer l'espace disponible
  const availableLength = maxLength - categoryPrefix.length - suffix.length;

  let finalDescription = cleanDescription;

  // Tronquer si nécessaire en gardant des mots entiers
  if (finalDescription.length > availableLength) {
    finalDescription = finalDescription.substring(0, availableLength - 3);
    const lastSpaceIndex = finalDescription.lastIndexOf(' ');
    if (lastSpaceIndex > availableLength * 0.8) {
      finalDescription = finalDescription.substring(0, lastSpaceIndex);
    }
    finalDescription += '...';
  }

  return categoryPrefix + finalDescription + suffix;
}

/**
 * Génère un titre SEO optimisé
 */
export function generateSEOTitle(
  title: string,
  category: string,
  maxLength = 60
): string {
  const suffix = ' | Doens Production';
  const categoryMap = {
    '3D/VFX et Compositing': '3D/VFX',
    'Motion Design': 'Motion Design',
    'Court Métrage': 'Court Métrage',
  };

  const shortCategory =
    categoryMap[category as keyof typeof categoryMap] || category;
  const fullTitle = `${title} - ${shortCategory}${suffix}`;

  // Si le titre est trop long, tronquer le titre du projet
  if (fullTitle.length > maxLength) {
    const availableLength = maxLength - ` - ${shortCategory}${suffix}`.length;
    const truncatedTitle =
      title.length > availableLength
        ? title.substring(0, availableLength - 3) + '...'
        : title;

    return `${truncatedTitle} - ${shortCategory}${suffix}`;
  }

  return fullTitle;
}

/**
 * Génère les mots-clés SEO basés sur le projet
 */
export function generateSEOKeywords(project: ProjectForSEO): string[] {
  const baseKeywords = [
    'Doens Production',
    'Yohan Doens',
    project.category.toLowerCase(),
    'réalisation audiovisuelle',
    'production créative',
  ];

  // Ajouter des mots-clés spécifiques à la catégorie
  const categoryKeywords = {
    '3D/VFX et Compositing': [
      '3D',
      'VFX',
      'effets spéciaux',
      'compositing',
      'animation 3D',
      'post-production',
      'rendu 3D',
    ],
    'Motion Design': [
      'motion design',
      'animation graphique',
      'motion graphics',
      'animation 2D',
      'design animé',
      'identité visuelle animée',
    ],
    'Court Métrage': [
      'court métrage',
      'film court',
      'réalisation cinéma',
      'production audiovisuelle',
      'storytelling',
      'cinéma indépendant',
    ],
  };

  const specificKeywords =
    categoryKeywords[project.category as keyof typeof categoryKeywords] || [];

  // Ajouter les compétences comme mots-clés
  const skillKeywords = project.skill
    ? project.skill.split(',').map(skill => skill.trim().toLowerCase())
    : [];

  // Combiner tous les mots-clés et supprimer les doublons
  return [...baseKeywords, ...specificKeywords, ...skillKeywords]
    .filter((keyword, index, arr) => arr.indexOf(keyword) === index)
    .slice(0, 15); // Limiter à 15 mots-clés
}

/**
 * Génère les métadonnées complètes pour une page de projet
 */
export function generateProjectMetadata(project: ProjectForSEO): Metadata {
  const title = generateSEOTitle(project.title, project.category);
  const description = generateSEODescription(
    project.description,
    project.category
  );
  const keywords = generateSEOKeywords(project);
  const projectUrl = `${SEO_CONFIG.siteUrl}/realisations/${project.id}`;
  const imageUrl =
    project.images.length > 0 ? project.images[0] : SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,

    // Open Graph
    openGraph: {
      title,
      description,
      url: projectUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.category}`,
        },
      ],
      locale: SEO_CONFIG.locale,
      type: 'article',
      publishedTime: project.createdAt.toISOString(),
      modifiedTime: project.updatedAt.toISOString(),
      authors: [SEO_CONFIG.author],
      section: project.category,
      tags: keywords,
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },

    // Métadonnées additionnelles
    category: project.category,

    // Autres métadonnées
    other: {
      'article:author': SEO_CONFIG.author,
      'article:section': project.category,
      'article:published_time': project.createdAt.toISOString(),
      'article:modified_time': project.updatedAt.toISOString(),
      'article:tag': keywords.join(','),
    },
  };
}

/**
 * Génère les données structurées JSON-LD pour un projet
 */
export function generateProjectStructuredData(project: ProjectForSEO) {
  const projectUrl = `${SEO_CONFIG.siteUrl}/realisations/${project.id}`;
  const imageUrl =
    project.images.length > 0 ? project.images[0] : SEO_CONFIG.defaultImage;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': projectUrl,
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    creator: {
      '@type': 'Person',
      name: SEO_CONFIG.author,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
      },
    },
    dateCreated: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    datePublished: project.createdAt.toISOString(),
    genre: project.category,
    keywords: generateSEOKeywords(project),
    about: {
      '@type': 'Thing',
      name: project.category,
    },
    // Ajouter la vidéo si disponible
    ...(project.videoFile || project.video
      ? {
          video: {
            '@type': 'VideoObject',
            name: project.title,
            description: project.description,
            thumbnailUrl: imageUrl,
            contentUrl: project.videoFile || project.video,
            uploadDate: project.createdAt.toISOString(),
          },
        }
      : {}),
    // Ajouter le lien externe si disponible
    ...(project.link
      ? {
          sameAs: [project.link],
        }
      : {}),
  };
}

/**
 * Génère les métadonnées pour la page de listing des réalisations
 */
export function generateRealisationsListingMetadata(
  projects: ProjectForSEO[],
  category?: string
): Metadata {
  const baseTitle = category ? `${category} | Réalisations` : 'Réalisations';
  const title = `${baseTitle} | ${SEO_CONFIG.siteName}`;

  const baseDescription = category
    ? `Découvrez nos réalisations en ${category.toLowerCase()}`
    : 'Découvrez une sélection de réalisations en 3D/VFX, Motion Design et Court Métrage';

  const description = `${baseDescription} par ${SEO_CONFIG.siteName}. Portfolio créatif de Yohan Doens.`;

  const url = category
    ? `${SEO_CONFIG.siteUrl}/realisations?category=${encodeURIComponent(category)}`
    : `${SEO_CONFIG.siteUrl}/realisations`;

  // Utiliser la première image du premier projet comme image de preview
  const imageUrl =
    projects.length > 0 && projects[0].images.length > 0
      ? projects[0].images[0]
      : SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    keywords: [
      'portfolio',
      'réalisations',
      '3D',
      'VFX',
      'motion design',
      'court métrage',
      'Doens Production',
      'Yohan Doens',
      ...(category ? [category.toLowerCase()] : []),
    ].join(', '),

    openGraph: {
      title,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: SEO_CONFIG.locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: SEO_CONFIG.twitterHandle,
    },
  };
}
