/**
 * Palette de couleurs du projet Yohan Front - Thème Sombre
 * Couleurs cohérentes et modernes pour un design dark mode élégant
 */

export const COLORS = {
  // Couleurs principales
  primary: {
    DEFAULT: '#100000', // Noir profond - Arrière-plans
    50: 'rgba(16, 0, 0, 0.05)',
    100: 'rgba(16, 0, 0, 0.1)',
    200: 'rgba(16, 0, 0, 0.2)',
    300: 'rgba(16, 0, 0, 0.3)',
    400: 'rgba(16, 0, 0, 0.4)',
    500: 'rgba(16, 0, 0, 0.5)',
    600: 'rgba(16, 0, 0, 0.6)',
    700: 'rgba(16, 0, 0, 0.7)',
    800: 'rgba(16, 0, 0, 0.8)',
    900: 'rgba(16, 0, 0, 0.9)',
  },

  // Couleur d'accent (rouge vibrant)
  accent: {
    DEFAULT: '#e60b18', // Rouge vibrant - Accents
    50: 'rgba(230, 11, 24, 0.05)',
    100: 'rgba(230, 11, 24, 0.1)',
    200: 'rgba(230, 11, 24, 0.2)',
    300: 'rgba(230, 11, 24, 0.3)',
    400: 'rgba(230, 11, 24, 0.4)',
    500: 'rgba(230, 11, 24, 0.5)',
    600: 'rgba(230, 11, 24, 0.6)',
    700: 'rgba(230, 11, 24, 0.7)',
    800: 'rgba(230, 11, 24, 0.8)',
    900: 'rgba(230, 11, 24, 0.9)',
  },

  // Blanc pur
  white: '#ffffff',

  // Couleurs neutres pour thème sombre (inversées)
  gray: {
    50: '#2a2a2a', // Plus sombre
    100: '#3a3a3a',
    200: '#4a4a4a',
    300: '#5a5a5a',
    400: '#6b6b6b',
    500: '#8a8a8a',
    600: '#b5b5b5',
    700: '#d1d1d1',
    800: '#e5e5e5',
    900: '#ffffff', // Plus clair (blanc)
  },
} as const;

/**
 * Classes Tailwind CSS correspondantes pour usage facile
 */
export const TAILWIND_CLASSES = {
  // Backgrounds
  bg: {
    primary: 'bg-primary',
    accent: 'bg-accent',
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
    },
  },

  // Text colors
  text: {
    primary: 'text-primary',
    accent: 'text-accent',
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
    },
  },

  // Border colors
  border: {
    primary: 'border-primary',
    accent: 'border-accent',
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
    },
  },
} as const;

/**
 * Combinaisons de couleurs recommandées pour thème sombre
 */
export const COLOR_COMBINATIONS = {
  // Headers et navigation - Thème sombre
  header: {
    background: TAILWIND_CLASSES.bg.primary, // Fond noir
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    accent: TAILWIND_CLASSES.text.accent, // Liens rouge
    border: TAILWIND_CLASSES.border.gray[200], // Bordure gris sombre
  },

  // Boutons principaux - Rouge accent
  primaryButton: {
    background: TAILWIND_CLASSES.bg.accent, // Fond rouge
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    hover: 'hover:bg-accent-700', // Hover plus sombre
    focus: 'focus:ring-accent-500',
  },

  // Boutons secondaires - Noir avec bordure
  secondaryButton: {
    background: 'bg-transparent', // Transparent
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    border: TAILWIND_CLASSES.border.white, // Bordure blanche
    hover: 'hover:bg-white hover:text-primary', // Inverse au hover
    focus: 'focus:ring-white',
  },

  // Cards et conteneurs - Gris sombre
  card: {
    background: TAILWIND_CLASSES.bg.gray[50], // Fond gris sombre
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    border: TAILWIND_CLASSES.border.gray[200], // Bordure gris
    shadow: 'shadow-lg', // Ombre plus prononcée
  },

  // Interface admin - Encore plus sombre
  admin: {
    sidebar: TAILWIND_CLASSES.bg.primary, // Sidebar noir
    sidebarText: TAILWIND_CLASSES.text.white, // Texte blanc
    sidebarAccent: TAILWIND_CLASSES.text.accent, // Accent rouge
    content: TAILWIND_CLASSES.bg.gray[50], // Contenu gris sombre
    contentText: TAILWIND_CLASSES.text.white, // Texte blanc
  },

  // Pages principales - Fond noir
  page: {
    background: TAILWIND_CLASSES.bg.primary, // Fond noir
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    accent: TAILWIND_CLASSES.text.accent, // Accents rouge
  },

  // Zones de contenu secondaires
  section: {
    background: TAILWIND_CLASSES.bg.gray[50], // Gris sombre
    text: TAILWIND_CLASSES.text.white, // Texte blanc
    border: TAILWIND_CLASSES.border.gray[200], // Bordure
  },
} as const;

/**
 * Types TypeScript pour les couleurs
 */
export type ColorKey = keyof typeof COLORS;
export type PrimaryShade = keyof typeof COLORS.primary;
export type AccentShade = keyof typeof COLORS.accent;
export type GrayShade = keyof typeof COLORS.gray;
