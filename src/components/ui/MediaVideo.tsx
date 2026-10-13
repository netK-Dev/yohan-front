'use client';

import { useState } from 'react';

interface MediaVideoProps {
  sources: { src: string; type?: string }[];
  title: string;
  poster?: string;
}

export default function MediaVideo({
  sources,
  title,
  poster,
}: MediaVideoProps) {
  const [error, setError] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden bg-[#111113]">
      {error ? (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center"
        >
          <p className="text-sm text-white/75">
            Cette vidéo ne peut pas être lue pour le moment.
          </p>
          <button
            type="button"
            className="button-secondary"
            onClick={() => setError(false)}
          >
            Réessayer
          </button>
        </div>
      ) : (
        <video
          controls
          playsInline
          preload="none"
          poster={poster || undefined}
          aria-label={title}
          className="h-full w-full object-contain"
          onError={() => setError(true)}
        >
          {sources.map((source, index) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              onError={
                index === sources.length - 1 ? () => setError(true) : undefined
              }
            />
          ))}
          Votre navigateur ne permet pas la lecture vidéo.
        </video>
      )}
    </div>
  );
}
