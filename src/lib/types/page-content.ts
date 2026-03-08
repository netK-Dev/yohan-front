import { z } from 'zod';

// ============================================
// SECTIONS DE LA PAGE D'ACCUEIL
// ============================================

export const HOME_SECTIONS = ['hero', 'showreel', 'services', 'cta'] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

// ============================================
// HERO SECTION
// ============================================

export const HeroStatSchema = z.object({
  value: z.string().min(1, 'Valeur requise').max(10, 'Max 10 caractères'),
  label: z.string().min(1, 'Label requis').max(30, 'Max 30 caractères'),
});

export const HeroContentSchema = z.object({
  badge: z.string().min(1, 'Badge requis').max(50, 'Max 50 caractères'),
  title: z.string().min(1, 'Titre requis').max(50, 'Max 50 caractères'),
  titleHighlight: z
    .string()
    .min(1, 'Titre accent requis')
    .max(50, 'Max 50 caractères'),
  subtitle: z
    .string()
    .min(1, 'Sous-titre requis')
    .max(200, 'Max 200 caractères'),
  description: z
    .string()
    .min(1, 'Description requise')
    .max(500, 'Max 500 caractères'),
  ctaPrimaryText: z
    .string()
    .min(1, 'Texte bouton requis')
    .max(40, 'Max 40 caractères'),
  ctaSecondaryText: z
    .string()
    .min(1, 'Texte bouton requis')
    .max(40, 'Max 40 caractères'),
  stats: z
    .array(HeroStatSchema)
    .min(1, 'Au moins une statistique')
    .max(5, 'Maximum 5 statistiques'),
});

export type HeroContent = z.infer<typeof HeroContentSchema>;
export type HeroStat = z.infer<typeof HeroStatSchema>;

const HERO_REMOVED_STAT_LABELS = new Set(['passion']);

function normalizeHeroStatLabel(label: string): string {
  return label.trim().toLowerCase();
}

/**
 * Retire les anciennes stats Hero qui ne sont plus pertinentes.
 * Actuellement: "Passion".
 */
export function sanitizeHeroStats(stats: HeroStat[]): HeroStat[] {
  return stats.filter(
    stat => !HERO_REMOVED_STAT_LABELS.has(normalizeHeroStatLabel(stat.label))
  );
}

export function sanitizeHeroContent(content: HeroContent): HeroContent {
  return {
    ...content,
    stats: sanitizeHeroStats(content.stats),
  };
}

// ============================================
// SHOWREEL SECTION
// ============================================

export const ShowreelContentSchema = z.object({
  badge: z.string().min(1, 'Badge requis').max(30, 'Max 30 caracteres'),
  title: z.string().min(1, 'Titre requis').max(80, 'Max 80 caracteres'),
  description: z
    .string()
    .min(1, 'Description requise')
    .max(240, 'Max 240 caracteres'),
  youtubeUrl: z.union([z.string().url('URL YouTube invalide'), z.literal('')]),
  mp4Url: z.string().url('URL MP4 invalide'),
  mp4Pathname: z.string(),
  webmUrl: z.union([z.string().url('URL WebM invalide'), z.literal('')]),
  webmPathname: z.string(),
  posterUrl: z.string().url('URL du poster invalide'),
  posterPathname: z.string(),
});

export type ShowreelContent = z.infer<typeof ShowreelContentSchema>;

// ============================================
// SERVICES SECTION
// ============================================

export const ServiceItemSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(60, 'Max 60 caractères'),
  description: z
    .string()
    .min(1, 'Description requise')
    .max(500, 'Max 500 caractères'),
  tags: z
    .array(z.string().min(1).max(30))
    .min(1, 'Au moins un tag')
    .max(6, 'Maximum 6 tags'),
  image: z.string().min(1, 'Image requise'),
  categorySlug: z.string().min(1, 'Catégorie requise'),
});

export const ServicesContentSchema = z.object({
  badge: z.string().min(1, 'Badge requis').max(50, 'Max 50 caractères'),
  title: z.string().min(1, 'Titre requis').max(50, 'Max 50 caractères'),
  titleHighlight: z
    .string()
    .min(1, 'Titre accent requis')
    .max(50, 'Max 50 caractères'),
  subtitle: z
    .string()
    .min(1, 'Sous-titre requis')
    .max(300, 'Max 300 caractères'),
  services: z
    .array(ServiceItemSchema)
    .min(1, 'Au moins un service')
    .max(6, 'Maximum 6 services'),
});

export type ServicesContent = z.infer<typeof ServicesContentSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;

// ============================================
// CTA SECTION
// ============================================

export const CTAContentSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(60, 'Max 60 caractères'),
  titleHighlight: z
    .string()
    .min(1, 'Titre accent requis')
    .max(40, 'Max 40 caractères'),
  titleSuffix: z.string().max(10, 'Max 10 caractères').default('?'),
  subtitle: z
    .string()
    .min(1, 'Sous-titre requis')
    .max(200, 'Max 200 caractères'),
  ctaText: z
    .string()
    .min(1, 'Texte bouton requis')
    .max(40, 'Max 40 caractères'),
});

export type CTAContent = z.infer<typeof CTAContentSchema>;

// ============================================
// MAP SECTION → SCHEMA (pour validation dynamique)
// ============================================

export const SECTION_SCHEMAS: Record<HomeSection, z.ZodSchema> = {
  hero: HeroContentSchema,
  showreel: ShowreelContentSchema,
  services: ServicesContentSchema,
  cta: CTAContentSchema,
};

// Type union pour le contenu complet de la page d'accueil
export type HomeContentMap = {
  hero: HeroContent;
  showreel: ShowreelContent;
  services: ServicesContent;
  cta: CTAContent;
};

// Type pour la réponse API complète
export type HomeContentResponse = {
  [K in HomeSection]?: HomeContentMap[K];
};

const SHOWREEL_URL_FIELDS = ['mp4Url', 'webmUrl', 'posterUrl'] as const;
const SHOWREEL_PATH_FIELDS = [
  'mp4Pathname',
  'webmPathname',
  'posterPathname',
] as const;

export function isBlobStorageUrl(url: string): boolean {
  try {
    return new URL(url).hostname.includes('blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export function extractBlobUrlsFromShowreel(
  content?: Partial<ShowreelContent> | null
): string[] {
  if (!content) return [];

  const urls = SHOWREEL_URL_FIELDS.map(field => content[field]).filter(
    (value): value is string =>
      typeof value === 'string' && value.length > 0 && isBlobStorageUrl(value)
  );

  return Array.from(new Set(urls));
}

export function extractBlobPathnamesFromShowreel(
  content?: Partial<ShowreelContent> | null
): string[] {
  if (!content) return [];

  const pathnames = SHOWREEL_PATH_FIELDS.map(field => content[field]).filter(
    (value): value is string => typeof value === 'string' && value.length > 0
  );

  return Array.from(new Set(pathnames));
}
