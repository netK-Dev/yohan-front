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

// Liste des logiciels disponibles avec icônes
export const SOFTWARE_LIST = [
  { id: 'after-effects', name: 'After Effects', icon: '/Icone_400x400/Icone_After_Effect_400x400.png' },
  { id: 'arnold', name: 'Arnold', icon: '/Icone_400x400/Icone_Arnold_400x400.png' },
  { id: 'blender', name: 'Blender', icon: '/Icone_400x400/Icone_Blender_400x400.png' },
  { id: 'houdini', name: 'Houdini', icon: '/Icone_400x400/Icone_Houdini_400x400.png' },
  { id: 'maya', name: 'Maya', icon: '/Icone_400x400/Icone_Maya_400x400.png' },
  { id: 'nuke', name: 'Nuke', icon: '/Icone_400x400/Icone_Nuke_400x400.png' },
  { id: 'photoshop', name: 'Photoshop', icon: '/Icone_400x400/Icone_Photoshop_400x400.png' },
  { id: 'premiere-pro', name: 'Premiere Pro', icon: '/Icone_400x400/Icone_Premiere_Pro_400x400.png' },
  { id: 'substance-painter', name: 'Substance Painter', icon: '/Icone_400x400/Icone_Substance_Painter_400x400.png' },
  { id: 'zbrush', name: 'ZBrush', icon: '/Icone_400x400/Icone_Zbrush_400x400.png' },
] as const;

export type SoftwareId = (typeof SOFTWARE_LIST)[number]['id'];

export function getSoftwareById(id: string) {
  return SOFTWARE_LIST.find(sw => sw.id === id) ?? null;
}

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
  software: z.array(z.string()).optional().default([]),
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
  software: string[];
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
