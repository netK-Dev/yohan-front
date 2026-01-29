'use client';

import React, { useRef, useEffect } from 'react';
import { ProjectVideo, getEmbedUrl } from '@/lib/types/video';

interface VideoSliderProps {
  videos: ProjectVideo[];
  title: string;
  posterImage?: string;
}

export default function VideoSlider({
  videos,
  title,
  posterImage,
}: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const currentVideo = videos[currentIndex];

  // Fonction pour mettre en pause toutes les vidéos HTML5
  const pauseAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
      }
    });
  };

  // Mettre en pause lors du changement de vidéo
  useEffect(() => {
    pauseAllVideos();
  }, [currentIndex]);

  const goToNext = () => {
    pauseAllVideos();
    setCurrentIndex(prev => (prev + 1) % videos.length);
  };

  const goToPrev = () => {
    pauseAllVideos();
    setCurrentIndex(prev => (prev - 1 + videos.length) % videos.length);
  };

  const goToSlide = (index: number) => {
    pauseAllVideos();
    setCurrentIndex(index);
  };

  if (videos.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Header avec titre et compteur */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Vidéo{videos.length > 1 ? 's' : ''}
        </h2>
        {videos.length > 1 && (
          <span className="text-sm text-white/40">
            {currentIndex + 1} / {videos.length}
          </span>
        )}
      </div>

      <div className="relative">
        {/* Vidéo principale */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0a0a0a]">
          {currentVideo.type === 'youtube' ? (
            // Vidéo externe (YouTube/Vimeo)
            <iframe
              key={`youtube-${currentIndex}`}
              src={getEmbedUrl(currentVideo.url) || currentVideo.url}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${title} - Vidéo ${currentIndex + 1}`}
            />
          ) : (
            // Vidéo uploadée (HTML5)
            <video
              key={`upload-${currentIndex}`}
              ref={el => {
                videoRefs.current[currentIndex] = el;
              }}
              controls
              className="h-full w-full object-cover"
              poster={posterImage}
            >
              <source src={currentVideo.url} type="video/mp4" />
              <source src={currentVideo.url} type="video/webm" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          )}

          {/* Navigation - seulement si plus d'une vidéo */}
          {videos.length > 1 && (
            <>
              {/* Bouton précédent */}
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
                aria-label="Vidéo précédente"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
                aria-label="Vidéo suivante"
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

              {/* Badge source (discret, en haut à droite) */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white/70 backdrop-blur-sm">
                {currentVideo.type === 'youtube' ? (
                  <>
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    <span>YouTube</span>
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Vidéo</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Indicateurs de navigation minimalistes - seulement si plus d'une vidéo */}
        {videos.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative flex items-center justify-center transition-all duration-300 ${
                  index === currentIndex
                    ? 'scale-100'
                    : 'scale-90 opacity-60 hover:scale-95 hover:opacity-80'
                }`}
                aria-label={`Aller à la vidéo ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              >
                {/* Indicateur principal */}
                <div
                  className={`flex h-10 items-center gap-2 rounded-full px-4 transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#ff0015] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  {/* Icône de type */}
                  {video.type === 'youtube' ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  {/* Numéro */}
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
