'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  onError?: () => void;
  unoptimized?: boolean;
}

export default function SafeImage(props: SafeImageProps) {
  // Chaque source possède son propre état de chargement et d'erreur.
  return <ImageWithFallback key={props.src} {...props} />;
}

function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  width,
  height,
  onError,
  unoptimized,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dimensions = fill
    ? { position: 'absolute' as const, inset: 0 }
    : { width, height };
  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image indisponible`}
        className={`flex items-center justify-center bg-[#161619] p-4 text-center text-xs text-white/60 ${className || ''}`}
        style={dimensions}
      >
        Image indisponible
      </div>
    );
  }
  return (
    <>
      {loading && (
        <div
          aria-hidden="true"
          className="animate-pulse bg-white/10"
          style={dimensions}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        preload={priority}
        onError={() => {
          setError(true);
          setLoading(false);
          onError?.();
        }}
        onLoad={() => setLoading(false)}
        unoptimized={
          unoptimized ||
          src.includes('blob.vercel-storage.com') ||
          src.endsWith('.gif') ||
          src === '/img/services/Hnet-image.webp' ||
          src === '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp'
        }
      />
    </>
  );
}
