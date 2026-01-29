/**
 * Types pour la gestion des vidéos de projet
 */

export const VIDEO_TYPES = ['youtube', 'upload'] as const;
export type VideoType = (typeof VIDEO_TYPES)[number];

/**
 * Structure d'une vidéo de projet
 * - type: 'youtube' pour URL externe (YouTube/Vimeo), 'upload' pour fichier uploadé
 * - url: URL de la vidéo (embed YouTube/Vimeo ou URL Blob)
 */
export interface ProjectVideo {
  type: VideoType;
  url: string;
}

/**
 * Extrait l'URL embed depuis une URL YouTube ou Vimeo
 * @param url URL de la vidéo
 * @returns URL embed ou null si non supporté
 */
export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');

    // YouTube
    if (host.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // Vimeo
    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Vérifie si une URL est une vidéo YouTube/Vimeo valide
 */
export function isValidExternalVideoUrl(url: string): boolean {
  return getEmbedUrl(url) !== null;
}

/**
 * Extrait les URLs Blob depuis un array de vidéos
 */
export function extractBlobUrlsFromVideos(videos: ProjectVideo[]): string[] {
  return videos
    .filter(v => v.type === 'upload' && v.url.includes('blob.vercel-storage.com'))
    .map(v => v.url);
}
