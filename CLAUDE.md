# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Aperçu du Projet

**Yohan Front** est un portfolio professionnel pour Yohan Doens (Doens Production), spécialisé dans la création 3D/VFX, Motion Design et Courts Métrages. L'application combine une interface publique de présentation avec un panneau d'administration complet pour la gestion du contenu.

**Stack technique :**
- Next.js 15.3.3 avec App Router et Turbopack
- React 19, TypeScript (mode strict)
- Tailwind CSS v4
- Prisma ORM avec PostgreSQL (Neon en production)
- Better Auth pour l'authentification
- Vercel Blob pour le stockage des médias
- Resend pour l'envoi d'emails

## Commandes

```bash
# Développement
npm run dev              # Démarre le serveur avec Turbopack (http://localhost:3000)

# Build et Production
npm run build            # prisma generate && next build
npm run start            # Serveur de production

# Qualité du code
npm run lint             # Vérification ESLint
npm run lint:fix         # Correction automatique ESLint
npm run format           # Formatage Prettier
npm run format:check     # Vérification du formatage

# Base de données
npx prisma generate      # Régénérer le client après modification du schéma
npx prisma migrate dev --name <nom>  # Créer une nouvelle migration
npx prisma db push       # Appliquer le schéma sans migration (dev)
npx prisma studio        # Interface visuelle pour la DB
```

## Architecture

### Structure des Routes (App Router)

```
src/app/
├── page.tsx                    # Page d'accueil (/)
├── layout.tsx                  # Layout racine (html, body)
├── globals.css                 # Styles globaux Tailwind
├── sitemap.ts                  # Génération automatique du sitemap
├── robots.ts                   # Configuration robots.txt
│
├── (public)/                   # Groupe de routes publiques
│   ├── about/page.tsx          # /about
│   ├── contact/page.tsx        # /contact
│   └── realisations/
│       ├── page.tsx            # /realisations (listing)
│       └── [id]/
│           ├── page.tsx        # /realisations/:id (détail projet)
│           └── not-found.tsx   # Page 404 personnalisée
│
├── admin/                      # Zone administration (protégée)
│   ├── login/page.tsx          # Connexion admin
│   ├── dashboard/page.tsx      # Gestion des projets (CRUD)
│   └── slider/page.tsx         # Gestion du slider homepage
│
└── api/                        # API Routes
    ├── auth/[...all]/route.ts  # Endpoints Better Auth
    ├── projects/               # CRUD Projets
    │   ├── route.ts            # GET (public), POST (auth)
    │   ├── [id]/route.ts       # GET, PUT, DELETE
    │   ├── new/route.ts        # Création
    │   └── category/[category]/route.ts
    ├── slider-media/           # CRUD Slider
    │   ├── route.ts            # GET, POST
    │   └── [id]/route.ts       # PUT, DELETE
    ├── blob/                   # Gestion fichiers Vercel Blob
    │   ├── upload/route.ts
    │   └── delete/route.ts
    └── send/route.ts           # Envoi emails (formulaire contact)
```

### Système d'Authentification (Better Auth)

L'authentification utilise **Better Auth** avec Prisma adapter :

- `src/lib/auth.ts` - Configuration serveur Better Auth
- `src/lib/auth-client.ts` - Client React (exports : `signIn`, `signOut`, `signUp`, `useSession`, `getSession`)
- `src/lib/auth-server.ts` - Utilitaires serveur :
  - `getServerSession()` - Récupérer la session dans Server Components/API Routes
  - `requireAuth()` - Middleware qui renvoie 401 si non authentifié
  - `withAuth(handler)` - HOC pour protéger une API Route

**Pattern de protection des API Routes :**
```typescript
// Route publique
export async function GET() { /* ... */ }

// Route protégée
export const POST = withAuth(async (request, session) => {
  // session.user est garanti disponible
});
```

### Gestion des Fichiers (Vercel Blob)

Utilitaires dans `src/lib/blob.ts` :
- `uploadToBlob(file)` - Upload via `/api/blob/upload`
- `deleteFromBlob(pathname)` - Suppression directe via SDK
- `deleteManyFromBlob(urls)` - Suppression en lot
- `extractBlobPathname(url)` - Extraire le pathname d'une URL Blob

Les fichiers sont automatiquement nettoyés lors de la suppression/modification des projets.

### Modèles de Données (Prisma)

```prisma
# Authentification (Better Auth)
- User, Session, Account, Verification

# Contenu
- Project {
    id, title, category, date, description,
    images: String[],
    videos: Json,        # Array de ProjectVideo (nouveau système multi-vidéos)
    video?, videoFile?,  # Anciens champs (conservés pour rétrocompatibilité)
    skill?, link?
  }
- SliderMedia {
    id, title, description?, mediaUrl, mediaPath?,
    mediaType, category?, order, isActive
  }
```

### Types et Validation (Zod)

**Projets** (`src/lib/types/project.ts`) :
- `PROJECT_CATEGORIES` : `['3D/VFX et Compositing', 'Motion Design', 'Court Métrage']`
- `ProjectSchema`, `CreateProjectSchema`, `UpdateProjectSchema`
- Types : `Project`, `ProjectUI`, `CreateProjectInput`, `UpdateProjectInput`

**Slider** (`src/lib/types/slider.ts`) :
- `SLIDER_CATEGORIES` : `['Sculpture', 'Produit', 'Environnement', 'Character', 'Animation', 'VFX', 'Motion Design']`
- `SLIDER_MEDIA_TYPES` : `['image', 'gif']`
- Types : `SliderMedia`, `CreateSliderMediaInput`, `UpdateSliderMediaInput`

**Vidéos** (`src/lib/types/video.ts`) :
- `ProjectVideo` : `{ type: 'youtube' | 'upload', url: string }` - Type pour les vidéos de projet
- `getEmbedUrl(url)` - Convertit une URL YouTube/Vimeo en URL d'embed
- `extractBlobUrlsFromVideos(videos)` - Extrait les URLs Blob des vidéos uploadées (pour nettoyage)
- Max 8 vidéos par projet, mix YouTube/Vimeo et uploads possible

### Hooks Personnalisés

- `useProjects()` - CRUD projets côté client (`fetchProjects`, `createProject`, `updateProject`, `deleteProject`)
- `useSliderMedia()` - CRUD médias slider

### Design System

**Palette** (`src/lib/colors.ts`) :
- `COLORS.primary.DEFAULT` : `#000002` (noir profond)
- `COLORS.accent.DEFAULT` : `#ff0015` (rouge)
- `COLORS.white` : `#ffffff`

**Combinaisons prédéfinies** (`COLOR_COMBINATIONS`) :
- `header`, `primaryButton`, `secondaryButton`, `card`, `admin`, `page`, `section`, `gradients`

**Usage dans les composants :**
```tsx
import { COLOR_COMBINATIONS } from '@/lib/colors';

<button className={`${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text}`}>
```

### SEO

Utilitaires dans `src/lib/utils/seo.ts` :
- `generateProjectMetadata(project)` - Métadonnées Next.js pour un projet
- `generateProjectStructuredData(project)` - JSON-LD CreativeWork
- `generateRealisationsListingMetadata(projects)` - Métadonnées page listing
- `generateSEOTitle()`, `generateSEODescription()`, `generateSEOKeywords()`

Les pages de réalisations génèrent automatiquement les métadonnées et données structurées.

### Composants Clés

**UI** (`src/components/ui/`) :
- `FileUploader` - Upload drag & drop avec progress (single/multiple)
- `SafeImage` - Wrapper Next/Image avec fallback d'erreur
- `Modal` - Modal responsive avec overlay opaque
- `Pagination`, `ImageSlider`
- `VideoSlider` - Slider pour vidéos multiples (YouTube/Vimeo + uploads), navigation par pills
- `RichTextDisplay` - Affichage HTML sécurisé pour descriptions de projets

**Admin** (`src/components/admin/`) :
- `AdminHeader` - Navigation admin avec logout
- `ProjectForm` - Formulaire création/édition projet avec upload images/vidéo
- `SliderMediaForm` - Formulaire gestion médias slider

**Sections** (`src/components/sections/`) :
- `HeroSection`, `ServicesSection`, `CTASection`, `IntroBanner`
- `RealisationsGallery` - Galerie avec filtres par catégorie
- `AnimatedGridBackground` - Fond animé

**Layout** (`src/components/layout/`) :
- `Header` - Navigation publique
- `Footer`

### Emails (React Email + Resend)

Templates dans `src/email/templates/` :
- `email-template.tsx` - Confirmation envoyée au client
- `yohan-notification-template.tsx` - Notification pour Yohan

## Variables d'Environnement

```bash
# Base de données PostgreSQL (Neon)
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=<clé-aléatoire-64-chars>
BETTER_AUTH_URL=http://localhost:3000

# Vercel Blob
BLOB_READ_WRITE_TOKEN=<token-vercel>

# Resend (emails)
RESEND_API_KEY=<clé-api-resend>
RESEND_FROM_CLIENT=<email-expéditeur-confirmation>
RESEND_FROM_NOTIF=<email-expéditeur-notification>

# SEO
NEXT_PUBLIC_SITE_URL=https://doensproduction.com
```

### Scripts de Migration

Dossier `dev/scripts/` (exclu du build TypeScript) :
- `migrate-videos-to-array.ts` - Migration des anciens champs `video`/`videoFile` vers le nouveau tableau `videos`

Usage : `tsx dev/scripts/migrate-videos-to-array.ts`

## Conventions

- **Imports** : Utiliser l'alias `@/*` pour tous les imports depuis `src/`
- **Langue** : Interface et messages en français
- **Composants** : Client Components marqués avec `'use client'` en première ligne
- **API** : Validation Zod systématique, réponses JSON standardisées
- **Styles** : Tailwind CSS uniquement, utiliser `COLOR_COMBINATIONS` pour la cohérence
- **Vidéos** : Utiliser le nouveau système `videos` (array de `ProjectVideo`), les anciens champs sont conservés pour rétrocompatibilité
