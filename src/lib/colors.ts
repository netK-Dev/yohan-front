/**
 * Palette de couleurs du projet Yohan Front - Charte Graphique Moderne 2025
 * Couleurs cohérentes basées sur #000002 avec variations de gris et rouge
 */

export const COLORS = {
  // Couleur principale - Noir profond moderne
  primary: {
    DEFAULT: '#000002', // Noir principal moderne
    50: '#0a0a0a', // Très légèrement plus clair
    100: '#141414', // Gris très sombre
    200: '#1e1e1e', // Gris sombre
    300: '#282828', // Gris moyen-sombre
    400: '#323232', // Gris moyen
    500: '#3c3c3c', // Gris
    600: '#464646', // Gris clair
    700: '#505050', // Gris plus clair
    800: '#5a5a5a', // Gris très clair
    900: '#646464', // Gris le plus clair
  },

  // Couleur d'accent - Rouge moderne et vibrant
  accent: {
    DEFAULT: '#ff0015', // Rouge principal moderne
    50: '#ffe6e8', // Rouge très clair
    100: '#ffccce', // Rouge clair
    200: '#ff999d', // Rouge moyen-clair
    300: '#ff666c', // Rouge moyen
    400: '#ff333b', // Rouge moyen-foncé
    500: '#ff0015', // Rouge principal
    600: '#e6000c', // Rouge foncé
    700: '#cc0009', // Rouge très foncé
    800: '#b30006', // Rouge sombre
    900: '#990003', // Rouge très sombre
  },

  // Blanc pur pour contraste maximal
  white: '#ffffff',

  // Couleurs neutres optimisées pour thème sombre
  gray: {
    50: '#f9f9f9', // Blanc cassé
    100: '#f3f3f3', // Gris très clair
    200: '#e7e7e7', // Gris clair
    300: '#d1d1d1', // Gris moyen-clair
    400: '#b4b4b4', // Gris moyen
    500: '#9a9a9a', // Gris
    600: '#6b6b6b', // Gris moyen-sombre
    700: '#555555', // Gris sombre
    800: '#3f3f3f', // Gris très sombre
    900: '#2a2a2a', // Gris presque noir
    950: '#1a1a1a', // Gris ultra-sombre
  },
} as const;

/**
 * Classes Tailwind CSS correspondantes pour usage facile
 */
export const TAILWIND_CLASSES = {
  // Backgrounds
  bg: {
    primary: 'bg-[#000002]',
    accent: 'bg-[#ff0015]',
    white: 'bg-white',
    gray: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200',
      300: 'bg-gray-300',
      400: 'bg-gray-400',
      500: 'bg-gray-500',
      600: 'bg-gray-600',
      700: 'bg-gray-700',
      800: 'bg-gray-800',
      900: 'bg-gray-900',
      950: 'bg-gray-950',
    },
  },

  // Text colors
  text: {
    primary: 'text-[#000002]',
    accent: 'text-[#ff0015]',
    white: 'text-white',
    gray: {
      50: 'text-gray-50',
      100: 'text-gray-100',
      200: 'text-gray-200',
      300: 'text-gray-300',
      400: 'text-gray-400',
      500: 'text-gray-500',
      600: 'text-gray-600',
      700: 'text-gray-700',
      800: 'text-gray-800',
      900: 'text-gray-900',
      950: 'text-gray-950',
    },
  },

  // Border colors
  border: {
    primary: 'border-[#000002]',
    accent: 'border-[#ff0015]',
    white: 'border-white',
    gray: {
      50: 'border-gray-50',
      100: 'border-gray-100',
      200: 'border-gray-200',
      300: 'border-gray-300',
      400: 'border-gray-400',
      500: 'border-gray-500',
      600: 'border-gray-600',
      700: 'border-gray-700',
      800: 'border-gray-800',
      900: 'border-gray-900',
      950: 'border-gray-950',
    },
  },
} as const;

/**
 * Combinaisons de couleurs recommandées - Charte Graphique Moderne
 */
export const COLOR_COMBINATIONS = {
  // Headers et navigation - Noir moderne
  header: {
    background: 'bg-[#000002]',
    text: 'text-white',
    accent: 'text-[#ff0015]',
    border: 'border-gray-800',
  },

  // Boutons principaux - Rouge accent moderne
  primaryButton: {
    background: 'bg-[#ff0015]',
    text: 'text-white',
    hover: 'hover:bg-[#e6000c]',
    focus: 'focus:ring-[#ff0015]',
    shadow: 'shadow-lg shadow-[#ff0015]/25',
  },

  // Boutons secondaires - Transparent avec bordure
  secondaryButton: {
    background: 'bg-transparent',
    text: 'text-white',
    border: 'border-white border-2',
    hover: 'hover:bg-white hover:text-[#000002]',
    focus: 'focus:ring-white',
  },

  // Cards et conteneurs - Gris sombre moderne
  card: {
    background: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-800',
    shadow: 'shadow-2xl shadow-black/50',
  },

  // Interface admin - Ultra sombre
  admin: {
    sidebar: 'bg-[#000002]',
    sidebarText: 'text-white',
    sidebarAccent: 'text-[#ff0015]',
    content: 'bg-gray-950',
    contentText: 'text-white',
  },

  // Pages principales - Fond noir moderne
  page: {
    background: 'bg-[#000002]',
    text: 'text-white',
    accent: 'text-[#ff0015]',
  },

  // Zones de contenu secondaires
  section: {
    background: 'bg-gray-950',
    text: 'text-white',
    border: 'border-gray-800',
  },

  // Gradients modernes
  gradients: {
    primary: 'bg-gradient-to-br from-[#000002] via-gray-950 to-[#000002]',
    accent: 'bg-gradient-to-r from-[#ff0015] to-[#e6000c]',
    subtle: 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950',
    overlay: 'bg-gradient-to-t from-black/80 via-transparent to-transparent',
    header: 'bg-gradient-to-r from-[#000002] via-gray-950 to-[#000002]',
    card: 'bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900',
    dropdown: 'bg-gradient-to-b from-gray-950 to-[#000002]',
  },
} as const;

/**
 * Types TypeScript pour les couleurs
 */
export type ColorKey = keyof typeof COLORS;
export type PrimaryShade = keyof typeof COLORS.primary;
export type AccentShade = keyof typeof COLORS.accent;
export type GrayShade = keyof typeof COLORS.gray;
