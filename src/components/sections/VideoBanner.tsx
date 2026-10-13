'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import MediaVideo from '@/components/ui/MediaVideo';
import SafeImage from '@/components/ui/SafeImage';
import type { ShowreelContent } from '@/lib/types/page-content';
import { DEFAULT_SHOWREEL_CONTENT } from '@/lib/defaults/home-defaults';

export default function VideoBanner({
  content,
}: {
  content?: ShowreelContent;
}) {
  const c = content ?? DEFAULT_SHOWREEL_CONTENT;
  const [expanded, setExpanded] = useState(false);
  const sources = [
    ...(c.webmUrl ? [{ src: c.webmUrl, type: 'video/webm' }] : []),
    ...(c.mp4Url ? [{ src: c.mp4Url, type: 'video/mp4' }] : []),
  ];
  const youtube = c.youtubeUrl || DEFAULT_SHOWREEL_CONTENT.youtubeUrl;
  return (
    <section className="section-space" aria-labelledby="showreel-title">
      <div className="site-container">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3">{c.badge}</p>
            <h2 id="showreel-title" className="section-title">
              {c.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              {c.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Voir sur YouTube ↗
            </a>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-haspopup="dialog"
              className="button-secondary"
            >
              Agrandir le showreel
            </button>
          </div>
        </div>
        {sources.length ? (
          expanded ? (
            <div className="relative aspect-video bg-[#111113]">
              <SafeImage
                src={c.posterUrl || ''}
                alt={c.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ) : (
            <MediaVideo
              key={sources.map((source) => source.src).join()}
              sources={sources}
              title={c.title}
              poster={c.posterUrl || undefined}
            />
          )
        ) : (
          <p className="public-panel text-sm text-white/65">
            Le lecteur est indisponible.{' '}
            <a
              href={youtube}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le showreel sur YouTube
            </a>
          </p>
        )}
        <p className="mt-3 text-xs text-white/50">
          Utilisez les commandes du lecteur pour lancer la vidéo et activer le
          son.
        </p>
      </div>
      <Modal
        isOpen={expanded}
        onClose={() => setExpanded(false)}
        title={c.title}
        maxWidth="screen"
      >
        {sources.length > 0 && (
          <MediaVideo
            sources={sources}
            title={c.title}
            poster={c.posterUrl || undefined}
          />
        )}
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-3"
        >
          Voir sur YouTube ↗
        </a>
      </Modal>
    </section>
  );
}
