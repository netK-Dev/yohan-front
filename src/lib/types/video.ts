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
    if (!['https:', 'http:'].includes(u.protocol)) return null;
    const hostname = u.hostname.replace(/^www\./, '');
    const host = ['m.youtube.com', 'music.youtube.com'].includes(hostname)
      ? 'youtube.com'
      : hostname;
    if (['youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host)) {
      const pathId =
        host === 'youtu.be'
          ? u.pathname.split('/')[1]
          : /^\/(?:embed|shorts|live)\/([^/]+)/.exec(u.pathname)?.[1];
      const id =
        pathId || (u.pathname === '/watch' ? u.searchParams.get('v') : null);
      const embedHost =
        host === 'youtube-nocookie.com'
          ? 'www.youtube-nocookie.com'
          : 'www.youtube.com';
      return id && /^[\w-]{11}$/.test(id)
        ? `https://${embedHost}/embed/${id}`
        : null;
    }
    if (['vimeo.com', 'player.vimeo.com'].includes(host)) {
      const match = /^\/(?:video\/)?(\d+)(?:\/([\w]+))?\/?$/.exec(u.pathname);
      if (!match) return null;
      const embed = new URL(`https://player.vimeo.com/video/${match[1]}`);
      const hash = u.searchParams.get('h') || match[2];
      if (hash) embed.searchParams.set('h', hash);
      return embed.href;
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
    .filter(
      (v) => v.type === 'upload' && v.url.includes('blob.vercel-storage.com')
    )
    .map((v) => v.url);
}
