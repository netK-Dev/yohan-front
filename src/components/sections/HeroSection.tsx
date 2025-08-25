import Image from 'next/image';
import Link from 'next/link';
import { COLOR_COMBINATIONS } from '@/lib/colors';

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
            <button
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
            </button>
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

// Composant carousel 3D avec perspective avancée
function CircularSlider() {
  const models3D = [
    {
      id: 1,
      src: '/gifs/model-1.gif',
      alt: 'Sculpture abstraite 3D',
      category: 'Sculpture',
    },
    {
      id: 2,
      src: '/gifs/model-2.gif',
      alt: 'Animation de produit',
      category: 'Produit',
    },
    {
      id: 3,
      src: '/gifs/model-3.gif',
      alt: 'Environnement 3D',
      category: 'Environnement',
    },
    {
      id: 4,
      src: '/gifs/model-4.gif',
      alt: 'Character design',
      category: 'Character',
    },
  ];

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-sm overflow-hidden sm:h-[400px] sm:max-w-md md:h-[500px] md:max-w-lg lg:h-[600px] lg:max-w-2xl">
      {/* Container avec perspective 3D */}
      <div
        className="carousel-3d-container relative h-full w-full"
        style={{
          perspective: '800px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Carousel rotatif */}
        <div className="carousel-3d-stage">
          {models3D.map((model, index) => {
            const totalItems = models3D.length;
            const angleStep = 360 / totalItems;
            const rotateY = index * angleStep;
            const radius = 200; // Réduit pour mobile

            // Calcul de la profondeur pour l'effet de perspective
            const normalizedAngle = rotateY % 360;
            const isInFront = normalizedAngle > 90 && normalizedAngle < 270;
            const zIndex = isInFront ? 1 : 10;

            // Calcul de l'échelle et de l'opacité basés sur la position
            const frontFactor = Math.cos((normalizedAngle * Math.PI) / 180);
            const scale = 0.7 + frontFactor * 0.5; // Scale de 0.7 à 1.2
            const opacity = 0.4 + Math.abs(frontFactor) * 0.6; // Opacité de 0.4 à 1

            return (
              <div
                key={model.id}
                className="carousel-3d-item absolute"
                style={{
                  transform: `rotateY(${rotateY}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
              >
                <div className="carousel-item-content group">
                  {/* Image container avec effets avancés */}
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
                    {/* Halo lumineux */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff0015]/20 via-transparent to-[#ff0015]/20 blur-xl transition-all duration-500 group-hover:from-[#ff0015]/40 group-hover:to-[#ff0015]/40" />

                    {/* Container principal */}
                    <div className="relative h-full w-full rounded-xl border border-white/5 bg-gradient-to-br from-[#000002] to-gray-950 p-2 shadow-2xl transition-all duration-500 group-hover:shadow-[#ff0015]/25 sm:rounded-2xl sm:p-3">
                      <div className="h-full w-full overflow-hidden rounded-lg bg-black/5 sm:rounded-xl">
                        <Image
                          src={model.src}
                          alt={model.alt}
                          fill
                          className="rounded-lg object-cover transition-transform duration-700 group-hover:scale-110 sm:rounded-xl"
                          unoptimized
                          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                        />

                        {/* Overlay avec catégorie */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-xl">
                          <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2">
                            <span className="rounded-full bg-[#ff0015]/80 px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm sm:px-2 sm:py-1">
                              {model.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Réflexion au sol */}
                    <div
                      className="absolute left-0 top-full h-16 w-full rounded-b-2xl bg-gradient-to-b from-gray-200/20 to-transparent opacity-30"
                      style={{
                        transform:
                          'scaleY(-0.6) perspective(100px) rotateX(45deg)',
                        transformOrigin: 'top',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateurs de contrôle */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 animate-pulse rounded-full bg-white/40"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
