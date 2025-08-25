'use client';

import clsx from 'clsx';
import React from 'react';
import AnimatedGridBackground from './AnimatedGridBackground';

type IntroBannerProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function IntroBanner({
  title,
  subtitle,
  className,
}: IntroBannerProps) {
  return (
    <section
      className={clsx(
        'intro-banner-halo relative overflow-hidden bg-[#000002] pb-10 pt-28 sm:pb-12 sm:pt-36',
        className
      )}
    >
      {/* Canvas performant: cadrillage + cases rouges aléatoires */}
      <AnimatedGridBackground />

      {/* Streak subtil diagonal qui balaye la zone */}
      <div className="pointer-events-none absolute inset-0">
        <div className="intro-streak" />
      </div>

      {/* Léger voile noir pour contrôler le contraste global */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white sm:text-5xl">{title}</h1>
          {subtitle ? (
            <p className="mt-4 text-sm text-white/80 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
