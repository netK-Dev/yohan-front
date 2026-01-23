import DOMPurify from 'dompurify';

// Configuration de DOMPurify pour le contenu rich text
const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'strike',
  'h2',
  'h3',
  'ul',
  'ol',
  'li',
  'a',
];

const ALLOWED_ATTR = ['href', 'target', 'rel', 'class'];

/**
 * Sanitize le HTML pour empêcher les attaques XSS
 * Autorise uniquement les tags et attributs nécessaires pour le rich text
 * IMPORTANT: Cette fonction doit être appelée côté client uniquement
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

  // Vérifier que nous sommes côté client
  if (typeof window === 'undefined') {
    console.warn('sanitizeHtml appelé côté serveur - retour du HTML brut');
    return dirty;
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ['target'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus'],
  });
}

/**
 * Extrait le texte brut du HTML (pour comptage de caractères, SEO, etc.)
 */
export function stripHtml(html: string): string {
  if (!html) return '';

  // Côté serveur : utiliser une regex simple
  if (typeof window === 'undefined') {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Côté client : utiliser le DOM
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Tronque le texte HTML tout en préservant la sécurité
 * Utile pour les previews
 */
export function truncateHtml(html: string, maxLength: number): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + '...';
}
