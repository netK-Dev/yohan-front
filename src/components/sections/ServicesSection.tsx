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
      gradient: 'from-accent/20 to-accent/5',
      hoverGradient: 'group-hover:from-accent/30 group-hover:to-accent/10',
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
      className={`relative py-20 lg:py-32 ${COLOR_COMBINATIONS.page.background}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-accent/10 absolute -left-20 top-20 h-40 w-40 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-accent/10 text-accent mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
            Nos Expertises
          </div>

          <h2
            className={`mb-6 text-4xl font-bold leading-tight ${COLOR_COMBINATIONS.page.text} md:text-5xl lg:text-6xl`}
          >
            Domaines de{' '}
            <span className="from-accent to-accent-700 bg-gradient-to-r bg-clip-text text-transparent">
              Création
            </span>
          </h2>

          <p
            className={`mx-auto max-w-3xl text-lg leading-relaxed ${COLOR_COMBINATIONS.page.text} opacity-80 md:text-xl`}
          >
            Découvrez l&apos;univers créatif de{' '}
            <span className="text-accent font-semibold">Doens Production</span>,
            où technique et artistique se rencontrent pour donner vie à vos
            projets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${COLOR_COMBINATIONS.card.background} hover:shadow-accent/10 p-8 shadow-2xl transition-all duration-500 hover:scale-105`}
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
                <div className="relative mb-6 h-48 overflow-hidden rounded-2xl">
                  {/* Image background glow */}
                  <div className="from-accent/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Service title */}
                <h3
                  className={`mb-4 text-2xl font-bold leading-tight ${COLOR_COMBINATIONS.card.text} group-hover:text-accent transition-colors duration-300`}
                >
                  {service.title}
                </h3>

                {/* Service description */}
                <p
                  className={`mb-6 text-base leading-relaxed ${COLOR_COMBINATIONS.card.text} opacity-80`}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="group-hover:bg-accent/20 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Call to action */}
                <button className="bg-accent hover:bg-accent-700 focus:ring-accent w-full rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Découvrir ce domaine
                </button>
              </div>

              {/* Bottom accent line */}
              <div className="via-accent absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
