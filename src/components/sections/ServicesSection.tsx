import Image from 'next/image';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: '3D/VFX et Compositing',
      image: '/img/services/basement-doens-yohan-combo-07.webp',
      description:
        'Formation spécialisée à ISART Digital avec maîtrise complète du pipeline 3D : modeling, shading, rigging, animation, rendering et compositing. Expertise technique approfondie pour donner vie à vos projets les plus ambitieux.',
      tags: ['3D Modeling', 'VFX', 'Compositing', 'Rendering'],
      gradient: 'from-[#ff0015]/20 to-[#ff0015]/5',
      hoverGradient:
        'group-hover:from-[#ff0015]/30 group-hover:to-[#ff0015]/10',
    },
    {
      id: 2,
      title: 'Motion Design',
      image: '/img/services/Hnet-image.webp',
      description:
        'Création graphique animée avec maîtrise experte d&apos;Illustrator, Photoshop et After Effects. Développement continu de styles variés et d&apos;approches innovantes pour des visuels percutants et mémorables.',
      tags: ['After Effects', 'Illustration', 'Animation', 'Branding'],
      gradient: 'from-white/20 to-white/5',
      hoverGradient: 'group-hover:from-white/30 group-hover:to-white/10',
    },
    {
      id: 3,
      title: 'Court Métrage',
      image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
      description:
        'Expertise complète en production audiovisuelle : réalisation, développement scénaristique et montage créatif. Transformation d&apos;idées en récits visuels captivants avec une approche artistique et technique maîtrisée.',
      tags: ['Réalisation', 'Scénario', 'Montage', 'Storytelling'],
      gradient: 'from-gray-600/20 to-gray-600/5',
      hoverGradient: 'group-hover:from-gray-600/30 group-hover:to-gray-600/10',
    },
  ];

  return (
    <section
      className={`relative py-12 sm:py-16 lg:py-20 xl:py-32 ${COLOR_COMBINATIONS.page.background}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-20 w-20 rounded-full bg-[#ff0015]/10 blur-3xl sm:-left-20 sm:top-20 sm:h-40 sm:w-40" />
        <div className="absolute -right-10 bottom-10 h-20 w-20 rounded-full bg-white/5 blur-3xl sm:-right-20 sm:bottom-20 sm:h-40 sm:w-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ff0015]/10 px-3 py-1.5 text-xs font-medium text-[#ff0015] sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff0015] sm:h-2 sm:w-2" />
            Nos Expertises
          </div>

          <h2
            className={`mb-4 text-3xl font-bold leading-tight ${COLOR_COMBINATIONS.page.text} sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl`}
          >
            Domaines de{' '}
            <span className="bg-gradient-to-r from-[#ff0015] to-[#e6000c] bg-clip-text text-transparent">
              Création
            </span>
          </h2>

          <p
            className={`mx-auto max-w-3xl text-base leading-relaxed ${COLOR_COMBINATIONS.page.text} opacity-80 sm:text-lg md:text-xl`}
          >
            Découvrez l&apos;univers créatif de{' '}
            <span className="font-semibold text-[#ff0015]">
              Doens Production
            </span>
            , où technique et artistique se rencontrent pour donner vie à vos
            projets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${COLOR_COMBINATIONS.card.background} p-6 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[#ff0015]/10 sm:rounded-3xl sm:p-8`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} ${service.hoverGradient} transition-all duration-500`}
              />

              {/* Card content */}
              <div className="relative z-10">
                {/* Image container with advanced effects */}
                <div className="relative mb-4 h-40 overflow-hidden rounded-xl sm:mb-6 sm:h-48 sm:rounded-2xl">
                  {/* Image background glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff0015]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Service title */}
                <h3
                  className={`mb-3 text-xl font-bold leading-tight ${COLOR_COMBINATIONS.card.text} transition-colors duration-300 group-hover:text-[#ff0015] sm:mb-4 sm:text-2xl`}
                >
                  {service.title}
                </h3>

                {/* Service description */}
                <p
                  className={`mb-4 text-sm leading-relaxed ${COLOR_COMBINATIONS.card.text} opacity-80 sm:mb-6 sm:text-base`}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#ff0015]/20 group-hover:text-white sm:px-3 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Call to action */}
                <button
                  className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.focus}`}
                >
                  Découvrir ce domaine
                </button>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff0015] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
