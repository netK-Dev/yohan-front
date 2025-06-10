'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          console.log('Vidéo visible, début du chargement...');
          setIsVisible(true);
          // Forcer le chargement quand visible
          const video = videoRef.current;
          if (video) {
            video.load();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      if (!isEnded) {
        video.play().catch(() => {
          setHasError(true);
        });
      }
    };

    const handleEnded = () => {
      setIsEnded(true);
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [isVisible, isEnded]);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (video && !isEnded) {
      setIsLoading(false);
      video.play().catch(error => {
        console.error('Erreur lors de la lecture manuelle:', error);
        setHasError(true);
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Container responsive pour la vidéo */}
      <div className="relative w-full">
        {/* Aspect ratio responsive 16:9 sur desktop, 9:16 sur mobile */}
        <div className="relative aspect-video w-full md:aspect-video">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/yohandoens-banner.mp4" type="video/mp4" />
          </video>

          {/* Loading moderne sans texte */}
          {(!isVisible || isLoading) && !isEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm">
              <div className="relative">
                {/* Cercles animés */}
                <div className="relative h-20 w-20">
                  <div className="border-accent/20 absolute inset-0 rounded-full border-4"></div>
                  <div className="border-t-accent absolute inset-0 animate-spin rounded-full border-4 border-transparent"></div>
                  <div
                    className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-white/60"
                    style={{
                      animationDirection: 'reverse',
                      animationDuration: '1.5s',
                    }}
                  ></div>
                </div>

                {/* Point central pulsant */}
                <div className="bg-accent absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"></div>
              </div>
            </div>
          )}

          {/* Bouton de lecture si erreur */}
          {hasError && !isEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <button
                onClick={handleManualPlay}
                className="bg-accent hover:bg-accent-600 group relative flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="ml-1 h-8 w-8 text-white transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gradient de transition vers la section suivante */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
