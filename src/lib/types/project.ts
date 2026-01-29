import { z } from 'zod';
import type { ProjectVideo } from './video';

// Schema de validation Zod pour les projets
// Catégories disponibles
export const PROJECT_CATEGORIES = [
  '3D/VFX et Compositing',
  'Motion Design',
  'Court Métrage',
] as const;

// Type utilitaire pour la catégorie
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Schema pour une vidéo individuelle
const ProjectVideoSchema = z.object({
  type: z.enum(['youtube', 'upload'], {
    errorMap: () => ({ message: 'Type de vidéo invalide' }),
  }),
  url: z.string().url('URL de vidéo invalide'),
});

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Titre trop long'),
  category: z.enum(PROJECT_CATEGORIES, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  date: z.string().min(1, 'La date est requise'),
  description: z
    .string()
    .min(1, 'La description est requise')
    .max(10000, 'Description trop longue'),
  images: z.array(z.string().url()).min(1, 'Au moins une image est requise'),

  // NOUVEAU: Array de vidéos avec validation
  videos: z
    .array(ProjectVideoSchema)
    .max(8, 'Maximum 8 vidéos autorisées')
    .optional()
    .default([]),

  // ANCIENS CHAMPS (rétrocompatibilité)
  video: z.string().url('URL de vidéo invalide').optional().or(z.literal('')),
  videoFile: z
    .string()
    .url('URL de vidéo invalide')
    .optional()
    .or(z.literal('')),

  skill: z
    .string()
    .max(200, 'Compétences trop longues')
    .optional()
    .or(z.literal('')),
  link: z.string().url('URL de lien invalide').optional().or(z.literal('')),
});

export const CreateProjectSchema = ProjectSchema;

export const UpdateProjectSchema = ProjectSchema.partial().extend({
  id: z.number().int().positive('ID invalide'),
});

// Types TypeScript dérivés des schémas
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;

// Type pour les projets complets (avec metadata Prisma)
export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  date: Date;
  description: string;
  images: string[];
  videos: ProjectVideo[]; // NOUVEAU: Array de vidéos
  video: string | null; // Ancien champ (rétrocompatibilité)
  videoFile: string | null; // Ancien champ (rétrocompatibilité)
  skill: string | null;
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Type pour les projets dans l'interface (dates en string)
export interface ProjectUI
  extends Omit<Project, 'date' | 'createdAt' | 'updatedAt'> {
  date: string;
  createdAt: string;
  updatedAt: string;
}
