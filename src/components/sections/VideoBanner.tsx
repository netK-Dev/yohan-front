'use client';

import { useEffect, useRef, useState } from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import type { ShowreelContent } from '@/lib/types/page-content';
import { DEFAULT_SHOWREEL_CONTENT } from '@/lib/defaults/home-defaults';

interface VideoBannerProps {
  content?: ShowreelContent;
}

export default function VideoBanner({ content }: VideoBannerProps) {
  const c = content ?? DEFAULT_SHOWREEL_CONTENT;
  const displayTitle = 'Showreel 2025';
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '320px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) {
      return;
    }

    const handleLoaded = () => {
      setIsReady(true);
      setHasError(false);
    };

    const handleVideoError = () => {
      setHasError(true);
      setIsReady(false);
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);
    video.addEventListener('error', handleVideoError);

    video.load();
    void video.play().catch(() => {
      // Autoplay can be blocked in some contexts.
    });

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
      video.removeEventListener('error', handleVideoError);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const video = expandedVideoRef.current;
    if (video) {
      video.load();
      void video.play().catch(() => {
        // Autoplay can be blocked in some contexts.
      });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const openExpanded = () => {
    setShouldLoad(true);
    setIsExpanded(true);
  };

  const closeExpanded = () => {
    setIsExpanded(false);
    setTouchStartY(null);
  };

  const handleExpandedTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchStartY(event.touches[0]?.clientY ?? null);
  };

  const handleExpandedTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (touchStartY === null) {
      return;
    }

    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY > 90) {
      closeExpanded();
    }
    setTouchStartY(null);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Showreel"
      className={`relative mt-8 w-full overflow-hidden pb-12 sm:mt-10 sm:pb-16 lg:mt-12 ${COLOR_COMBINATIONS.page.background}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#000002] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#000002] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0015]/12 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mx-4 overflow-hidden border-y border-white/15 bg-black/70 shadow-[0_35px_90px_rgba(0,0,0,0.55)] sm:mx-0 sm:rounded-[1.75rem] sm:border">
          <div className="relative h-[72dvh] min-h-[28rem] sm:h-auto sm:aspect-video">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload={shouldLoad ? 'metadata' : 'none'}
              poster={c.posterUrl}
              className="h-full w-full object-cover"
              aria-label="Showreel Doens Production"
            >
              {shouldLoad ? (
                <>
                  {c.webmUrl ? <source src={c.webmUrl} type="video/webm" /> : null}
                  <source src={c.mp4Url} type="video/mp4" />
                </>
              ) : null}
            </video>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

            {!isReady && !hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[2px]">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#ff0015]" />
                </div>
              </div>
            ) : null}

            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/75 p-6 text-center">
                <a
                  href={c.youtubeUrl || DEFAULT_SHOWREEL_CONTENT.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover}`}
                >
                  Ouvrir la version YouTube
                </a>
              </div>
            ) : null}

            <button
              type="button"
              onClick={openExpanded}
              aria-label="Ouvrir le showreel en plein ecran"
              className="absolute inset-0 z-[1]"
            />

            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-6">
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 sm:text-sm">
                  {displayTitle}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={c.youtubeUrl || DEFAULT_SHOWREEL_CONTENT.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/85 transition hover:border-[#ff0015]/60 hover:text-white sm:h-auto sm:w-auto sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs sm:font-medium"
                  aria-label="Voir sur YouTube"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 sm:mr-2"
                  >
                    <path d="M23 12s0-3.54-.45-5.24a2.98 2.98 0 00-2.1-2.1C18.76 4.2 12 4.2 12 4.2s-6.76 0-8.45.46a2.98 2.98 0 00-2.1 2.1C1 8.46 1 12 1 12s0 3.54.45 5.24a2.98 2.98 0 002.1 2.1c1.69.46 8.45.46 8.45.46s6.76 0 8.45-.46a2.98 2.98 0 002.1-2.1C23 15.54 23 12 23 12z" />
                    <path d="M10 15.5v-7l6 3.5-6 3.5z" fill="#000002" />
                  </svg>
                  <span className="hidden sm:inline">YouTube</span>
                </a>

                <button
                  type="button"
                  onClick={openExpanded}
                  className="rounded-full border border-white/20 bg-black/35 px-3 py-2 text-xs font-medium text-white/90 transition hover:border-white/40 hover:text-white sm:rounded-lg"
                  aria-label="Ouvrir le showreel en plein ecran"
                >
                  Plein ecran
                </button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 sm:rounded-[1.75rem]" />
        </div>
      </div>

      {isExpanded ? (
        <div
          className="fixed inset-0 z-[110] bg-black"
          onTouchStart={handleExpandedTouchStart}
          onTouchEnd={handleExpandedTouchEnd}
        >
          <div className="relative h-[100dvh] w-full">
            <video
              ref={expandedVideoRef}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload={shouldLoad ? 'metadata' : 'none'}
              poster={c.posterUrl}
              className="h-full w-full object-cover sm:object-contain"
              aria-label="Showreel en plein ecran"
            >
              {shouldLoad ? (
                <>
                  {c.webmUrl ? <source src={c.webmUrl} type="video/webm" /> : null}
                  <source src={c.mp4Url} type="video/mp4" />
                </>
              ) : null}
            </video>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

            <button
              type="button"
              onClick={closeExpanded}
              className="absolute right-3 top-3 z-10 rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-xs font-medium text-white/85 transition hover:border-white/40 hover:text-white sm:right-6 sm:top-6"
              aria-label="Fermer le plein ecran"
            >
              Fermer
            </button>

            <div className="absolute left-3 top-3 z-10 rounded-lg border border-white/20 bg-black/45 px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/75 sm:left-6 sm:top-6 sm:text-xs">
              {displayTitle}
            </div>

            <div className="absolute bottom-4 left-0 right-0 z-10 text-center sm:hidden">
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
                Glissez vers le bas pour fermer
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
