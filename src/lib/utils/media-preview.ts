const STATIC_PREVIEWS: Record<string, string> = {
  '/img/services/Hnet-image.webp': '/img/services/Hnet-image-poster.webp',
  '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp':
    '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5-poster.webp',
};

// Les miniatures utilisent une image fixe extraite du média original.
export function getMediaPreview(src: string): string {
  return STATIC_PREVIEWS[src] ?? src;
}
