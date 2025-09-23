'use client';

import React from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Galerie ({images.length} image{images.length > 1 ? 's' : ''})
      </h2>

      <div className="relative">
        {/* Image principale */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="100vw"
            priority={currentIndex === 0}
          />

          {/* Navigation - seulement si plus d'une image */}
          {images.length > 1 && (
            <>
              {/* Bouton précédent */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
                aria-label="Image précédente"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Bouton suivant */}
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
                aria-label="Image suivante"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Indicateur de position */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Vignettes - seulement si plus d'une image */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((imageUrl, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded transition ${
                  index === currentIndex
                    ? 'ring-2 ring-[#ff0015]'
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`Vignette ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
