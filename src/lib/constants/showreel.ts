export const DEFAULT_SHOWREEL_ASSETS = {
  youtubeUrl: 'https://www.youtube.com/watch?v=_4_oc9oPMwY',
  mp4Url:
    'https://q0rddlmz68grwzup.public.blob.vercel-storage.com/showreel/yohan-showreel-1080p.mp4',
  mp4Pathname: '/showreel/yohan-showreel-1080p.mp4',
  webmUrl:
    'https://q0rddlmz68grwzup.public.blob.vercel-storage.com/showreel/yohan-showreel-1080p.webm',
  webmPathname: '/showreel/yohan-showreel-1080p.webm',
  posterUrl:
    'https://q0rddlmz68grwzup.public.blob.vercel-storage.com/showreel/yohan-showreel-poster.jpg',
  posterPathname: '/showreel/yohan-showreel-poster.jpg',
} as const;

export const PROTECTED_SHOWREEL_PATHNAMES: ReadonlySet<string> = new Set<
  string
>([
  DEFAULT_SHOWREEL_ASSETS.mp4Pathname,
  DEFAULT_SHOWREEL_ASSETS.webmPathname,
  DEFAULT_SHOWREEL_ASSETS.posterPathname,
]);
