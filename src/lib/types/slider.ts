export interface SliderMedia {
  id: number;
  title: string;
  description?: string | null;
  mediaUrl: string;
  mediaPath?: string | null;
  mediaType: string;
  category?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSliderMediaInput {
  title: string;
  description?: string;
  mediaUrl: string;
  mediaPath?: string;
  mediaType: string;
  category?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateSliderMediaInput {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaPath?: string;
  mediaType?: string;
  category?: string;
  order?: number;
  isActive?: boolean;
}

export const SLIDER_MEDIA_TYPES = ['image', 'gif'] as const;

export const SLIDER_CATEGORIES = [
  'Sculpture',
  'Produit',
  'Environnement',
  'Character',
  'Animation',
  'VFX',
  'Motion Design',
] as const;

export type SliderMediaType = (typeof SLIDER_MEDIA_TYPES)[number];
export type SliderCategory = (typeof SLIDER_CATEGORIES)[number];
