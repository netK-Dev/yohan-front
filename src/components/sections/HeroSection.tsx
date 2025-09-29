'use client';

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

// Slider 3D robuste et fonctionnel
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

  // Loader
  if (isLoading) {
    return (
      <div className="relative mx-auto h-[500px] w-full max-w-4xl overflow-hidden sm:h-[600px] md:h-[700px] lg:h-[800px]">
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff0015] border-t-transparent" />
        </div>
      </div>
    );
  }

  // Média unique
  if (models3D.length === 1) {
    const singleModel = models3D[0];
    return (
      <div className="relative mx-auto h-[500px] w-full max-w-4xl overflow-hidden sm:h-[600px] md:h-[700px] lg:h-[800px]">
        <div className="flex h-full w-full items-center justify-center">
          <div className="group">
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff0015]/20 via-transparent to-[#ff0015]/20 blur-xl transition-all duration-500 group-hover:from-[#ff0015]/40 group-hover:to-[#ff0015]/40" />
              <div className="relative h-full w-full rounded-xl border border-white/5 bg-gradient-to-br from-[#000002] to-gray-950 p-3 shadow-2xl transition-all duration-500 group-hover:shadow-[#ff0015]/25 sm:rounded-2xl sm:p-4">
                <div className="h-full w-full overflow-hidden rounded-lg bg-black/5 sm:rounded-xl">
                  <Image
                    src={singleModel.src}
                    alt={singleModel.alt}
                    fill
                    className="rounded-lg object-cover transition-transform duration-700 group-hover:scale-110 sm:rounded-xl"
                    unoptimized
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-xl">
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                      <span className="rounded-full bg-[#ff0015]/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-sm">
                        {singleModel.category}
                      </span>
                    </div>
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
      <div className="relative mx-auto h-[500px] w-full max-w-4xl overflow-hidden sm:h-[600px] md:h-[700px] lg:h-[800px]">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center text-white/60">
            <div className="mb-4 text-4xl">🎨</div>
            <p className="text-sm">Aucun média disponible</p>
          </div>
        </div>
      </div>
    );
  }

  // Configuration intelligente avec espacement constant garanti
  const totalItems = models3D.length;

  // Taille d'une image (en pixels, basé sur lg:h-72 w-72 = 288px)
  const imageSize = 288;

  // Espacement désiré constant entre les images (en pixels)
  const desiredSpacing = 15;

  // Calcul précis du rayon pour garantir l'espacement exact
  // On utilise la distance entre les centres des images pour calculer le rayon
  const angleStep = (2 * Math.PI) / totalItems;
  const distanceBetweenCenters = imageSize + desiredSpacing;

  // Formule: rayon = distance / (2 * sin(angle/2))
  const calculatedRadius =
    distanceBetweenCenters / (2 * Math.sin(angleStep / 2));

  // Rayon final avec limites raisonnables
  const radius = Math.max(250, Math.min(1000, calculatedRadius));

  // Perspective adaptative selon le rayon
  const perspective = Math.max(1400, radius * 2);

  // Animation dynamique et fluide
  const animationDuration = Math.max(30, totalItems * 6);

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-4xl overflow-hidden sm:h-[600px] md:h-[700px] lg:h-[800px]">
      <div
        className="relative h-full w-full"
        style={{
          perspective: `${perspective}px`, // Perspective adaptative selon le rayon
          perspectiveOrigin: 'center center',
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transformStyle: 'preserve-3d',
            animation: `spin3d ${animationDuration}s linear infinite`,
          }}
        >
          {models3D.map((model, index) => {
            const angle = (360 / totalItems) * index;

            // Calcul de l'effet de profondeur moderne (taille uniforme)
            const normalizedAngle = ((angle + 180) % 360) - 180; // -180 à +180
            const frontFactor = Math.cos((normalizedAngle * Math.PI) / 180); // -1 à +1

            // Opacité pour effet de fade (toutes les images gardent la même taille)
            const opacity = 0.6 + Math.abs(frontFactor) * 0.4; // 0.6 à 1.0 (plus visible)

            // Z-index pour superposition correcte
            const zIndex = Math.round((frontFactor + 1) * 50); // 0 à 100

            return (
              <div
                key={model.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                <div className="group">
                  <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
                    {/* Halo lumineux adaptatif selon la position */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl transition-all duration-1000"
                      style={{
                        background: `radial-gradient(circle, rgba(255,0,21,${0.1 + frontFactor * 0.2}) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Container principal avec effets premium */}
                    <div className="relative h-full w-full rounded-xl border border-white/10 bg-gradient-to-br from-[#000002] via-gray-900 to-[#000002] p-2 shadow-2xl backdrop-blur-sm transition-all duration-700 group-hover:border-[#ff0015]/30 group-hover:shadow-[#ff0015]/20 sm:rounded-2xl sm:p-3">
                      <div className="h-full w-full overflow-hidden rounded-lg bg-black/10 sm:rounded-xl">
                        <Image
                          src={model.src}
                          alt={model.alt}
                          fill
                          className="rounded-lg object-cover transition-all duration-700 group-hover:scale-105 sm:rounded-xl"
                          unoptimized
                          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                        />

                        {/* Overlay moderne avec gradient */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 sm:rounded-xl">
                          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                            <div className="flex items-center justify-between">
                              <span className="rounded-full bg-[#ff0015]/90 px-2 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-sm">
                                {model.category}
                              </span>
                              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff0015] sm:h-2 sm:w-2" />
                            </div>
                          </div>
                        </div>

                        {/* Réflexion subtile */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-30 sm:rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateurs modernes */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform items-center space-x-3">
          <div className="flex space-x-2">
            {models3D.slice(0, Math.min(8, models3D.length)).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white/30 transition-all duration-500 hover:bg-[#ff0015]/60"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animation: `pulse 2s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          {models3D.length > 8 && (
            <span className="text-xs font-medium text-white/40">
              +{models3D.length - 8}
            </span>
          )}
        </div>

        {/* Badge moderne avec informations */}
        <div className="absolute left-4 top-4 z-10 flex items-center space-x-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff0015]" />
          <span className="text-xs font-medium text-white/80">
            {totalItems} création{totalItems > 1 ? 's' : ''} • {desiredSpacing}
            px • R:{Math.round(radius)}
          </span>
        </div>
      </div>
    </div>
  );
}
