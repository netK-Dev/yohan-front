import { z } from 'zod';

// ============================================
// SECTIONS DE LA PAGE D'ACCUEIL
// ============================================

export const HOME_SECTIONS = ['hero', 'services', 'cta'] as const;
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
  services: ServicesContentSchema,
  cta: CTAContentSchema,
};

// Type union pour le contenu complet de la page d'accueil
export type HomeContentMap = {
  hero: HeroContent;
  services: ServicesContent;
  cta: CTAContent;
};

// Type pour la réponse API complète
export type HomeContentResponse = {
  [K in HomeSection]?: HomeContentMap[K];
};
