'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { useSliderMedia } from '@/lib/hooks/useSliderMedia';

export default function HeroSection() {
  return (
    <section
      className={`hero-section-mobile relative flex min-h-screen items-center justify-center ${COLOR_COMBINATIONS.gradients.primary} px-4 py-2 sm:py-12 md:py-16 lg:py-20`}
    >
      {/* Gradient de transition harmonieux entre les sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000002]/90 via-[#000002]/50 to-[#000002]/90 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Présentation textuelle */}
        <div className="space-y-6 sm:space-y-8 lg:order-1">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0015]/10 px-3 py-1.5 text-xs font-medium text-[#ff0015] sm:px-4 sm:py-2 sm:text-sm">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff0015] sm:h-2 sm:w-2" />
              Portfolio 3D & VFX
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Créateur de{' '}
              <span className="block bg-gradient-to-r from-[#ff0015] to-[#e6000c] bg-clip-text text-transparent">
                Mondes Visuels
              </span>
            </h1>

            <p className="text-lg font-light leading-relaxed text-white sm:text-xl md:text-2xl lg:text-3xl">
              Spécialisé en{' '}
              <span className="font-semibold text-white">3D/VFX</span>,{' '}
              <span className="font-semibold text-white">Motion Design</span> et{' '}
              <span className="font-semibold text-white">Courts Métrages</span>
            </p>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-white sm:text-lg lg:text-xl">
            Bienvenue dans l&apos;univers de{' '}
            <span className="font-semibold text-[#ff0015]">
              Doens Production
            </span>
            , où la créativité rencontre la technologie pour donner vie à vos
            projets les plus ambitieux.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:gap-6">
            <Link
              href="/realisations"
              className={`group relative transform overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow}`}
            >
              <span className="relative z-10">Découvrir mes créations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#e6000c] to-[#cc0009] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              href="/contact"
              className={`group rounded-2xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ff0015] hover:bg-[#ff0015]/5 hover:text-[#ff0015] hover:shadow-lg sm:px-8 sm:py-4 sm:text-base`}
            >
              <span className="flex items-center justify-center gap-2">
                Me contacter
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-6 border-t border-gray-800 pt-6 sm:justify-start sm:gap-8 sm:pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff0015] sm:text-3xl">
                50+
              </div>
              <div className="text-xs font-medium text-white sm:text-sm">
                Projets
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff0015] sm:text-3xl">
                5
              </div>
              <div className="text-xs font-medium text-white sm:text-sm">
                Années
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff0015] sm:text-3xl">
                100%
              </div>
              <div className="text-xs font-medium text-white sm:text-sm">
                Passion
              </div>
            </div>
          </div>
        </div>

        {/* Carousel 3D */}
        <div className="relative order-first lg:order-2">
          <CircularSlider />
        </div>
      </div>
    </section>
  );
}

/**
 * Carrousel 3D Premium - Roue d'images rotative
 *
 * Caractéristiques :
 * - S'adapte automatiquement de 2 à 50+ images
 * - Calcul intelligent du rayon et de la taille des cartes
 * - Effet de profondeur avec opacité et scale progressifs
 * - Pause au survol pour mieux voir les images
 * - Performance optimisée avec will-change et backface-visibility
 * - Responsive avec breakpoints adaptés
 *
 * @see https://3dtransforms.desandro.com/carousel
 */
function CircularSlider() {
  const { sliderMedia, isLoading } = useSliderMedia(true);

  // Médias de fallback
  const fallbackModels = [
    {
      id: 1,
      src: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
      alt: 'Sculpture abstraite 3D',
      category: 'Sculpture',
    },
    {
      id: 2,
      src: '/img/services/basement-doens-yohan-combo-07.webp',
      alt: 'Animation de produit',
      category: 'Produit',
    },
    {
      id: 3,
      src: '/img/services/Hnet-image.webp',
      alt: 'Environnement 3D',
      category: 'Environnement',
    },
  ];

  const models3D =
    sliderMedia.length > 0
      ? sliderMedia.map(media => ({
          id: media.id,
          src: media.mediaUrl,
          alt: media.description || media.title,
          category: media.category || 'Création',
        }))
      : fallbackModels;

  // Loader élégant
  if (isLoading) {
    return (
      <div className="relative mx-auto flex h-[400px] w-full max-w-2xl items-center justify-center sm:h-[500px] lg:h-[600px]">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-[#ff0015]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-[#ff0015]/20" />
          </div>
        </div>
      </div>
    );
  }

  // Média unique - Affichage spécial en vedette
  if (models3D.length === 1) {
    const singleModel = models3D[0];
    return (
      <div className="relative mx-auto flex h-[400px] w-full max-w-2xl items-center justify-center sm:h-[500px] lg:h-[600px]">
        <div className="group relative">
          {/* Halo animé */}
          <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-[#ff0015]/20 via-transparent to-[#ff0015]/20 blur-2xl" />

          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-[#000002] p-3 shadow-2xl transition-all duration-500 group-hover:border-[#ff0015]/30 group-hover:shadow-[#ff0015]/30">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={singleModel.src}
                  alt={singleModel.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-full bg-[#ff0015] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      {singleModel.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Aucun média
  if (models3D.length === 0) {
    return (
      <div className="relative mx-auto flex h-[400px] w-full max-w-2xl items-center justify-center sm:h-[500px] lg:h-[600px]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <span className="text-4xl">🎨</span>
          </div>
          <p className="text-sm text-white/50">Aucun média disponible</p>
        </div>
      </div>
    );
  }

  // ============================================
  // CONFIGURATION INTELLIGENTE DU CARROUSEL 3D
  // ============================================
  const totalItems = models3D.length;

  // Tailles de carte PLUS GRANDES et adaptatives selon le nombre d'images
  const getCardSize = () => {
    if (totalItems <= 3) return { base: 220, sm: 260, md: 300, lg: 340 };
    if (totalItems <= 5) return { base: 200, sm: 240, md: 280, lg: 320 };
    if (totalItems <= 8) return { base: 180, sm: 220, md: 260, lg: 300 };
    if (totalItems <= 12) return { base: 160, sm: 200, md: 240, lg: 280 };
    if (totalItems <= 20) return { base: 140, sm: 180, md: 220, lg: 260 };
    return { base: 120, sm: 160, md: 200, lg: 240 }; // 20+ images
  };

  const cardSize = getCardSize();

  // Calcul du rayon optimal pour un bel espacement
  const spacing = Math.max(20, 50 - totalItems * 2);
  const anglePerItem = (2 * Math.PI) / totalItems;
  const optimalRadius =
    (cardSize.lg + spacing) / (2 * Math.sin(anglePerItem / 2));

  // Limites du rayon ajustées pour plus d'espace
  const minRadius = 280;
  const maxRadius = 550;
  const radius = Math.max(minRadius, Math.min(maxRadius, optimalRadius));

  // Perspective pour un bel effet 3D
  const perspective = Math.max(1000, radius * 2.2);

  // Durée d'animation fluide
  const animationDuration = Math.max(30, Math.min(70, totalItems * 5));

  return (
    <div className="carousel-3d-container relative mx-auto h-[450px] w-full sm:h-[550px] lg:h-[650px]">
      {/* Scène 3D */}
      <div
        className="relative h-full w-full"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Conteneur rotatif - animation continue */}
        <div
          className="carousel-3d-wheel absolute left-1/2 top-1/2"
          style={{
            transformStyle: 'preserve-3d',
            animation: `spin3d ${animationDuration}s linear infinite`,
          }}
        >
          {models3D.map((model, index) => {
            const angle = (360 / totalItems) * index;

            return (
              <CarouselCard
                key={model.id}
                model={model}
                angle={angle}
                radius={radius}
                cardSize={cardSize}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Carte individuelle du carrousel avec effets 3D premium
 */
interface CarouselCardProps {
  model: { id: number; src: string; alt: string; category: string };
  angle: number;
  radius: number;
  cardSize: { base: number; sm: number; md: number; lg: number };
}

function CarouselCard({ model, angle, radius, cardSize }: CarouselCardProps) {
  // Calcul de la profondeur pour les effets visuels
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const distanceFromFront =
    normalizedAngle <= 180 ? normalizedAngle : 360 - normalizedAngle;
  const depthFactor = 1 - distanceFromFront / 180; // 1 devant, 0 derrière

  // Effets progressifs - plus prononcés pour un meilleur rendu
  const opacity = 0.3 + depthFactor * 0.7; // 0.3 à 1.0
  const scale = 0.75 + depthFactor * 0.25; // 0.75 à 1.0

  return (
    <div
      className="carousel-3d-card absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate(-50%, -50%)
          rotateY(${angle}deg)
          translateZ(${radius}px)
          scale(${scale})
        `,
        transformStyle: 'preserve-3d',
        opacity,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Halo rouge subtil pour les cartes visibles */}
      {depthFactor > 0.5 && (
        <div
          className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-2xl"
          style={{
            background: `radial-gradient(circle, rgba(255,0,21,${0.2 * depthFactor}) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="group relative">
        {/* Container de la carte - taille responsive via CSS */}
        <div
          className="card-inner relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#0a0a0a] to-[#000002] shadow-2xl transition-all duration-500 group-hover:border-[#ff0015]/50 group-hover:shadow-[0_0_40px_rgba(255,0,21,0.3)]"
          style={{
            width: `clamp(${cardSize.base}px, 20vw, ${cardSize.lg}px)`,
            height: `clamp(${cardSize.base}px, 20vw, ${cardSize.lg}px)`,
          }}
        >
          {/* Image sans padding pour un rendu plus propre */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={model.src}
              alt={model.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={`(max-width: 640px) ${cardSize.base}px, (max-width: 1024px) ${cardSize.md}px, ${cardSize.lg}px`}
              loading="lazy"
            />

            {/* Gradient overlay permanent léger */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Overlay au hover avec catégorie */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block rounded-full bg-[#ff0015] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  {model.category}
                </span>
              </div>
            </div>

            {/* Reflet subtil en haut */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Bordure lumineuse subtile */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}
