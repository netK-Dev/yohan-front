import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-accent/5 absolute -right-40 -top-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Présentation textuelle */}
        <div className="space-y-8 lg:order-1">
          <div className="space-y-6">
            <div className="bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
              Portfolio 3D & VFX
            </div>

            <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-7xl">
              Créateur de{' '}
              <span className="text-accent from-accent to-accent-700 block bg-gradient-to-r bg-clip-text text-transparent">
                Mondes Visuels
              </span>
            </h1>

            <p className="text-xl font-light leading-relaxed text-black md:text-2xl lg:text-3xl">
              Spécialisé en{' '}
              <span className="font-semibold text-black">3D/VFX</span>,{' '}
              <span className="font-semibold text-black">Motion Design</span> et{' '}
              <span className="font-semibold text-black">Courts Métrages</span>
            </p>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-black lg:text-xl">
            Bienvenue dans l&apos;univers de{' '}
            <span className="text-accent font-semibold">Doens Production</span>,
            où la créativité rencontre la technologie pour donner vie à vos
            projets les plus ambitieux.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-6">
            <button className="bg-accent hover:bg-accent-600 group relative transform overflow-hidden rounded-2xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">Découvrir mes créations</span>
              <div className="from-accent-600 to-accent-800 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <button className="hover:border-accent hover:text-accent hover:bg-accent/5 group rounded-2xl border-2 border-gray-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-lg">
              <span className="flex items-center gap-2">
                Me contacter
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
          <div className="flex gap-8 border-t border-gray-400 pt-8">
            <div className="text-center">
              <div className="text-accent text-3xl font-bold">50+</div>
              <div className="text-sm font-medium text-black">Projets</div>
            </div>
            <div className="text-center">
              <div className="text-accent text-3xl font-bold">5</div>
              <div className="text-sm font-medium text-black">Années</div>
            </div>
            <div className="text-center">
              <div className="text-accent text-3xl font-bold">100%</div>
              <div className="text-sm font-medium text-black">Passion</div>
            </div>
          </div>
        </div>

        {/* Carousel 3D */}
        <div className="relative lg:order-2">
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
    <div className="relative mx-auto h-[600px] w-full max-w-2xl overflow-hidden">
      {/* Container avec perspective 3D */}
      <div
        className="carousel-3d-container relative h-full w-full"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Carousel rotatif */}
        <div className="carousel-3d-stage">
          {models3D.map((model, index) => {
            const totalItems = models3D.length;
            const angleStep = 360 / totalItems;
            const rotateY = index * angleStep;
            const radius = 320;

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
                  <div className="relative h-48 w-48 lg:h-56 lg:w-56">
                    {/* Halo lumineux */}
                    <div className="from-accent/20 to-accent/20 group-hover:from-accent/40 group-hover:to-accent/40 absolute inset-0 rounded-2xl bg-gradient-to-r via-transparent blur-xl transition-all duration-500" />

                    {/* Container principal */}
                    <div className="group-hover:shadow-accent/25 relative h-full w-full rounded-2xl border border-white/20 bg-gradient-to-br from-gray-100 to-gray-300 p-3 shadow-2xl transition-all duration-500">
                      <div className="h-full w-full overflow-hidden rounded-xl bg-black/5">
                        <Image
                          src={model.src}
                          alt={model.alt}
                          fill
                          className="rounded-xl object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                          sizes="(max-width: 768px) 192px, 224px"
                        />

                        {/* Overlay avec catégorie */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="bg-accent/80 rounded-full px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
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
