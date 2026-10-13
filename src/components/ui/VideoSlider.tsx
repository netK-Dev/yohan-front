'use client';

import { useState } from 'react';
import { type ProjectVideo, getEmbedUrl } from '@/lib/types/video';
import MediaVideo from '@/components/ui/MediaVideo';

interface VideoSliderProps {
  videos: ProjectVideo[];
  title: string;
  posterImage?: string;
}

function embedSource(url: string) {
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return null;
    const host = parsed.hostname.replace('www.', '');
    if (
      [
        'youtube.com',
        'youtube-nocookie.com',
        'youtu.be',
        'vimeo.com',
        'player.vimeo.com',
      ].includes(host)
    )
      return getEmbedUrl(url);
    return null;
  } catch {
    return null;
  }
}

export default function VideoSlider({
  videos,
  title,
  posterImage,
}: VideoSliderProps) {
  const [selected, setSelected] = useState(0);
  if (videos.length === 0) return null;
  const index = selected % videos.length;
  const video = videos[index];
  const embed = video.type === 'youtube' ? embedSource(video.url) : null;
  return (
    <section className="mb-12" aria-label={`Vidéos du projet ${title}`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-medium">
          Vidéo{videos.length > 1 ? 's' : ''}
        </h2>
        <span aria-live="polite" className="text-xs text-white/60">
          {index + 1} / {videos.length}
        </span>
      </div>
      {video.type === 'upload' ? (
        <MediaVideo
          key={video.url}
          sources={[{ src: video.url }]}
          title={`${title} — vidéo ${index + 1}`}
          poster={posterImage}
        />
      ) : (
        <ExternalPlayer
          key={video.url}
          src={embed}
          title={`${title} — vidéo ${index + 1}`}
        />
      )}
      {video.type === 'youtube' && embed && (
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-2"
        >
          Ouvrir sur {embed.includes('vimeo.com') ? 'Vimeo' : 'YouTube'} ↗
        </a>
      )}
      {videos.length > 1 && (
        <div
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Choisir une vidéo"
        >
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={i === index}
              className={`min-h-11 rounded-sm border px-4 py-2 text-sm ${i === index ? 'border-white bg-white text-black' : 'border-white/25 text-white/70 hover:border-white/60'}`}
            >
              Vidéo {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function ExternalPlayer({ src, title }: { src: string | null; title: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="relative aspect-video bg-[#111113]">
      {!src || error ? (
        <p
          role="alert"
          className="flex h-full items-center justify-center p-5 text-center text-sm text-white/70"
        >
          Cette vidéo ne peut pas être affichée pour le moment.
        </p>
      ) : (
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
