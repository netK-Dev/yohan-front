'use client';

import React, { useState } from 'react';
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
}

export default function SafeImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  width,
  height,
  onError,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-800/50 text-white/50 ${className || ''}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">📷</div>
          <div className="text-xs">Image indisponible</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div 
          className={`animate-pulse bg-white/5 ${className || ''}`}
          style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
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
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        style={loading ? { opacity: 0 } : { opacity: 1 }}
        // Désactiver l'optimisation pour éviter les timeouts sur Vercel Blob
        unoptimized={src.includes('blob.vercel-storage.com')}
      />
    </>
  );
}
