import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
import {
  HeroContentSchema,
  ServicesContentSchema,
  CTAContentSchema,
  type HeroContent,
  type ServicesContent,
  type CTAContent,
} from '@/lib/types/page-content';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_CTA_CONTENT,
} from '@/lib/defaults/home-defaults';

type HomeContent = {
  hero: HeroContent;
  services: ServicesContent;
  cta: CTAContent;
};

/**
 * Charge le contenu de la page d'accueil depuis la base de données.
 * Utilise le cache Next.js avec le tag 'home-content' pour des performances optimales.
 * Fusionne avec les valeurs par défaut : si un champ manque en base, le default est utilisé.
 */
async function fetchHomeContent(): Promise<HomeContent> {
  const rows = await prisma.pageContent.findMany({
    where: { page: 'home' },
    select: { section: true, content: true },
  });

  const contentMap: Record<string, unknown> = {};
  for (const row of rows) {
    contentMap[row.section] = row.content;
  }

  // Parser et valider chaque section — la source primaire est toujours la DB
  const heroParsed = HeroContentSchema.safeParse(contentMap['hero']);
  const servicesParsed = ServicesContentSchema.safeParse(
    contentMap['services']
  );
  const ctaParsed = CTAContentSchema.safeParse(contentMap['cta']);

  // Fallback de sécurité : si la DB n'est pas seedée ou si les données sont invalides
  if (!heroParsed.success) {
    console.warn(
      '[home-content] Section "hero" absente ou invalide en DB — fallback sur les defaults. Exécuter : npx tsx scripts/seed-home-content.ts'
    );
  }
  if (!servicesParsed.success) {
    console.warn(
      '[home-content] Section "services" absente ou invalide en DB — fallback sur les defaults. Exécuter : npx tsx scripts/seed-home-content.ts'
    );
  }
  if (!ctaParsed.success) {
    console.warn(
      '[home-content] Section "cta" absente ou invalide en DB — fallback sur les defaults. Exécuter : npx tsx scripts/seed-home-content.ts'
    );
  }

  return {
    hero: heroParsed.success ? heroParsed.data : DEFAULT_HERO_CONTENT,
    services: servicesParsed.success
      ? servicesParsed.data
      : DEFAULT_SERVICES_CONTENT,
    cta: ctaParsed.success ? ctaParsed.data : DEFAULT_CTA_CONTENT,
  };
}

/**
 * Version cachée de fetchHomeContent.
 * Le cache est invalidé via revalidateTag('home-content') lors des mises à jour admin.
 * En production : 0 requête DB pour les visiteurs tant que le contenu n'a pas changé.
 */
export const getHomeContent = unstable_cache(fetchHomeContent, ['home-content'], {
  tags: ['home-content'],
});
