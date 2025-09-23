import { z } from 'zod';

// Schema de validation Zod pour les projets
// Catégories disponibles
export const PROJECT_CATEGORIES = [
  '3D/VFX et Compositing',
  'Motion Design',
  'Court Métrage',
] as const;

// Type utilitaire pour la catégorie
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Titre trop long'),
  category: z.enum(PROJECT_CATEGORIES, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  date: z.string().min(1, 'La date est requise'),
  description: z
    .string()
    .min(1, 'La description est requise')
    .max(2000, 'Description trop longue'),
  images: z.array(z.string().url()).min(1, 'Au moins une image est requise'),
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
  id: z.string().cuid('ID invalide'),
});

// Types TypeScript dérivés des schémas
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;

// Type pour les projets complets (avec metadata Prisma)
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
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

// Type pour les projets dans l'interface (dates en string)
export interface ProjectUI
  extends Omit<Project, 'date' | 'createdAt' | 'updatedAt'> {
  date: string;
  createdAt: string;
  updatedAt: string;
}
