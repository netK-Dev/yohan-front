'use client';

import { useRef, useEffect, useState } from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';

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
      className={`relative w-full overflow-hidden ${COLOR_COMBINATIONS.page.background}`}
    >
      {/* Container responsive plein écran pour la vidéo */}
      <div className="relative w-full">
        {/* Hauteur viewport complète sur mobile, aspect video sur desktop */}
        <div className="relative h-screen w-full sm:h-[70vh] md:h-[80vh] lg:aspect-video lg:h-auto">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/yohandoens-banner.mp4" type="video/mp4" />
          </video>

          {/* Loading moderne responsive */}
          {(!isVisible || isLoading) && !isEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm">
              <div className="relative">
                {/* Cercles animés - responsive */}
                <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                  <div className="absolute inset-0 rounded-full border-2 border-[#ff0015]/20 sm:border-4"></div>
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#ff0015] sm:border-4"></div>
                  <div
                    className="absolute inset-1 animate-spin rounded-full border border-transparent border-t-white/60 sm:inset-2 sm:border-2"
                    style={{
                      animationDirection: 'reverse',
                      animationDuration: '1.5s',
                    }}
                  ></div>
                </div>

                {/* Point central pulsant */}
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#ff0015] sm:h-3 sm:w-3"></div>
              </div>
            </div>
          )}

          {/* Bouton de lecture si erreur - responsive */}
          {hasError && !isEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <button
                onClick={handleManualPlay}
                className={`group relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 sm:h-20 sm:w-20 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover}`}
              >
                <svg
                  className="ml-1 h-6 w-6 text-white transition-transform group-hover:scale-110 sm:h-8 sm:w-8"
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
    </section>
  );
}
