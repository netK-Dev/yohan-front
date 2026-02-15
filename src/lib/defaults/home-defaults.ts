import type {
  HeroContent,
  ServicesContent,
  CTAContent,
} from '@/lib/types/page-content';

/**
 * Valeurs par défaut de la page d'accueil.
 * Utilisées comme fallback lorsque le contenu n'est pas encore défini en base.
 * Ces valeurs correspondent au contenu hardcodé original des composants.
 */

export const DEFAULT_HERO_CONTENT: HeroContent = {
  badge: 'Portfolio 3D & VFX',
  title: 'Créateur de',
  titleHighlight: 'Mondes Visuels',
  subtitle: 'Spécialisé en 3D/VFX, Motion Design et Courts Métrages',
  description:
    "Bienvenue dans l'univers de Doens Production, où la créativité rencontre la technologie pour donner vie à vos projets les plus ambitieux.",
  ctaPrimaryText: 'Découvrir mes créations',
  ctaSecondaryText: 'Me contacter',
  stats: [
    { value: '50+', label: 'Projets' },
    { value: '5', label: 'Années' },
    { value: '100%', label: 'Passion' },
  ],
};

export const DEFAULT_SERVICES_CONTENT: ServicesContent = {
  badge: 'Nos Expertises',
  title: 'Domaines de',
  titleHighlight: 'Création',
  subtitle:
    "Découvrez l'univers créatif de Doens Production, où technique et artistique se rencontrent pour donner vie à vos projets.",
  services: [
    {
      title: '3D/VFX et Compositing',
      description:
        'Formation spécialisée à ISART Digital avec maîtrise complète du pipeline 3D : modeling, shading, rigging, animation, rendering et compositing. Expertise technique approfondie pour donner vie à vos projets les plus ambitieux.',
      tags: ['3D Modeling', 'VFX', 'Compositing', 'Rendering'],
      image: '/img/services/basement-doens-yohan-combo-07.webp',
      categorySlug: '3d-vfx',
    },
    {
      title: 'Motion Design',
      description:
        "Création graphique animée avec maîtrise experte d'Illustrator, Photoshop et After Effects. Développement continu de styles variés et d'approches innovantes pour des visuels percutants et mémorables.",
      tags: ['After Effects', 'Illustration', 'Animation', 'Branding'],
      image: '/img/services/Hnet-image.webp',
      categorySlug: 'motion-design',
    },
    {
      title: 'Court Métrage',
      description:
        "Expertise complète en production audiovisuelle : réalisation, développement scénaristique et montage créatif. Transformation d'idées en récits visuels captivants avec une approche artistique et technique maîtrisée.",
      tags: ['Réalisation', 'Scénario', 'Montage', 'Storytelling'],
      image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
      categorySlug: 'court-metrage',
    },
  ],
};

export const DEFAULT_CTA_CONTENT: CTAContent = {
  title: 'Prêt à donner vie à',
  titleHighlight: 'votre vision',
  titleSuffix: '?',
  subtitle: "Collaborons pour créer quelque chose d'exceptionnel ensemble.",
  ctaText: 'Démarrer un projet',
};
