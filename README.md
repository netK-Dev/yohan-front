# 🚀 Yohan Front - Portfolio Moderne avec Zone Admin

> **Portfolio professionnel nouvelle génération** - Une application web moderne alliant performance, design élégant et gestion de contenu avancée.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## ✨ À propos du projet

**Yohan Front** est un portfolio professionnel moderne conçu pour présenter des projets et compétences de manière élégante. Il combine une **interface publique soignée** avec une **zone d'administration complète** pour une gestion de contenu autonome et efficace.

### 🎯 Vision du projet

Créer un portfolio qui ne soit pas seulement beau, mais aussi **fonctionnel**, **performant** et **facile à maintenir**. Chaque détail a été pensé pour offrir une expérience utilisateur exceptionnelle tout en permettant une gestion de contenu intuitive.

## 🌟 Fonctionnalités principales

### 🌐 Interface publique

- **🏠 Page d'accueil** : Hero section impactante avec présentation dynamique
- **👨‍💻 À propos** : Présentation personnelle, compétences et parcours
- **💼 Portfolio** : Galerie de projets avec filtres et détails techniques
- **📧 Contact** : Formulaire de contact avec validation avancée
- **📱 Design responsive** : Optimisé pour tous les écrans

### 🔐 Zone d'administration

- **📊 Dashboard** : Vue d'ensemble avec statistiques et métriques
- **⚡ Gestion projets** : CRUD complet avec prévisualisation en temps réel
- **✏️ Éditeur de contenu** : Modification des textes du site en direct
- **🔒 Authentification** : Système de connexion sécurisé avec JWT
- **📸 Gestion médias** : Upload et organisation des images

### 🚀 Performance & Qualité

- **⚡ Ultra-rapide** : Next.js 15 avec Turbopack et optimisations avancées
- **🎨 Design System** : Palette cohérente et composants réutilisables
- **♿ Accessibilité** : Conformité WCAG 2.1 AAA
- **📈 SEO optimisé** : Métadonnées dynamiques et structured data
- **🔍 TypeScript strict** : Code robuste et maintenable

## 🛠️ Technologies modernes

### Core Stack

- **[Next.js 15.3.3](https://nextjs.org/)** - Framework React avec App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Langage typé pour plus de robustesse
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS moderne avec design system
- **[React 19](https://react.dev/)** - Bibliothèque UI avec les dernières fonctionnalités

### Outils de développement

- **[Turbopack](https://turbo.build/pack)** - Bundler ultra-rapide pour le développement
- **[ESLint](https://eslint.org/)** - Linting avec configuration Next.js recommandée
- **[Prettier](https://prettier.io/)** - Formatage automatique avec plugin Tailwind
- **[Zod](https://github.com/colinhacks/zod)** - Validation de schémas TypeScript

### Architecture & Performance

- **Server & Client Components** - Rendu hybride optimisé
- **API Routes** - Backend intégré avec Next.js
- **Middleware** - Protection des routes et authentification
- **Image Optimization** - Optimisation automatique des médias

## 🎨 Design System

### Palette de couleurs professionnelle

Notre design system utilise une palette **dark mode** élégante et moderne :

| Couleur     | Code      | Usage                                         | Contraste |
| ----------- | --------- | --------------------------------------------- | --------- |
| **Primary** | `#100000` | Arrière-plans principaux, texte sur clair     | AAA ✅    |
| **Accent**  | `#e60b18` | Boutons d'action, liens, éléments interactifs | AAA ✅    |
| **White**   | `#ffffff` | Texte principal, arrière-plans clairs         | AAA ✅    |

### Principes de design

- **🌙 Dark mode natif** : Confort visuel et modernité
- **♿ Accessibilité maximale** : Contrastes validés WCAG 2.1 AAA
- **🎯 Cohérence visuelle** : Variables CSS et constantes TypeScript
- **📱 Mobile-first** : Design responsive et optimisé tactile

### Exemples d'utilisation

```tsx
// Classes Tailwind directes
<button className="bg-accent hover:bg-accent-700 text-white">
  Action principale
</button>;

// Combinaisons prédéfinies
import { COLOR_COMBINATIONS } from '@/lib/colors';
<header className={COLOR_COMBINATIONS.header.background}>
  En-tête avec style cohérent
</header>;
```

## 🚀 Démarrage rapide

### Prérequis

- **Node.js 18+** (recommandé : version LTS)
- **npm** ou **yarn** ou **pnpm**
- **Git** pour le contrôle de version

### Installation en 3 étapes

```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/yohan-front.git
cd yohan-front

# 2. Installer les dépendances
npm install

# 3. Lancer le développement
npm run dev
```

🎉 **C'est parti !** Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

### Configuration avancée

```bash
# Variables d'environnement (optionnel)
cp .env.example .env.local

# Vérifier la qualité du code
npm run lint && npm run format:check

# Build de production
npm run build
npm run start
```

## 📁 Architecture du projet

### Organisation modulaire et scalable

```
yohan_front/
├── 📁 src/
│   ├── 📁 app/                  # 🛣️ App Router Next.js
│   │   ├── 📁 (public)/         # Routes publiques groupées
│   │   │   ├── 📄 page.tsx      # Page d'accueil
│   │   │   ├── 📁 about/        # Page à propos
│   │   │   ├── 📁 projects/     # Portfolio projets
│   │   │   └── 📁 contact/      # Formulaire contact
│   │   ├── 📁 admin/            # Zone d'administration
│   │   │   ├── 📁 dashboard/    # Tableau de bord
│   │   │   ├── 📁 projects/     # Gestion projets
│   │   │   └── 📁 content/      # Éditeur contenu
│   │   ├── 📁 api/              # API Routes backend
│   │   ├── 📄 layout.tsx        # Layout racine
│   │   └── 📄 globals.css       # Styles globaux
│   ├── 📁 components/           # 🧩 Composants réutilisables
│   │   ├── 📁 ui/               # Composants de base (Button, Input...)
│   │   ├── 📁 forms/            # Formulaires spécialisés
│   │   ├── 📁 layout/           # Header, Footer, Navigation
│   │   └── 📁 admin/            # Composants admin
│   ├── 📁 lib/                  # 🔧 Utilitaires et configuration
│   │   ├── 📄 colors.ts         # Système de couleurs
│   │   ├── 📄 auth.ts           # Configuration authentification
│   │   ├── 📄 db.ts             # Base de données
│   │   └── 📄 validations.ts    # Schémas Zod
│   ├── 📁 types/                # 📝 Types TypeScript
│   ├── 📁 hooks/                # 🎣 Custom hooks React
│   └── 📁 stores/               # 🗃️ State management
├── 📁 public/                   # Assets statiques
├── 📁 InfoDev/                  # 📚 Documentation développeur
└── 📄 README.md                 # Ce fichier
```

### Principes architecturaux

- **🔀 Séparation des responsabilités** : Interface publique vs administration
- **🧩 Composants modulaires** : Réutilisabilité maximale
- **📝 Types stricts** : TypeScript pour la robustesse
- **🎣 Hooks personnalisés** : Logique métier centralisée
- **🛣️ File-based routing** : Structure intuitive avec App Router

## 🛣️ Routes et navigation

### Routes publiques

- **`/`** - 🏠 Page d'accueil avec hero section
- **`/about`** - 👨‍💻 Présentation personnelle et compétences
- **`/projects`** - 💼 Portfolio avec galerie de projets
- **`/projects/[id]`** - 🔍 Détail d'un projet spécifique
- **`/contact`** - 📧 Formulaire de contact

### Zone d'administration (`/admin/*`)

- **`/admin/dashboard`** - 📊 Tableau de bord avec métriques
- **`/admin/projects`** - ⚡ Gestion CRUD des projets
- **`/admin/content`** - ✏️ Éditeur de contenu du site
- **`/admin/login`** - 🔒 Authentification sécurisée

### API Routes (`/api/*`)

- **`/api/auth/*`** - Authentification JWT
- **`/api/projects/*`** - CRUD projets avec validation
- **`/api/content/*`** - Gestion du contenu dynamique

## 📜 Scripts disponibles

### Développement

```bash
npm run dev          # 🚀 Serveur de développement (Turbopack)
npm run build        # 🏗️ Build de production optimisé
npm run start        # 🌐 Serveur de production
```

### Qualité de code

```bash
npm run lint         # 🔍 Analyse ESLint
npm run lint:fix     # 🔧 Correction automatique ESLint
npm run format       # 💄 Formatage Prettier
npm run format:check # ✅ Vérification formatage
```

### Utilitaires

```bash
npm run analyze      # 📊 Analyse du bundle (production)
npm run type-check   # 🔍 Vérification types TypeScript
```

## 🔧 Développement avancé

### Workflow recommandé

1. **🌿 Créer une branche feature**

   ```bash
   git checkout -b feature/nouveau-composant
   ```

2. **💻 Développer avec qualité**

   ```bash
   npm run lint:fix && npm run format
   ```

3. **📝 Commits descriptifs**

   ```bash
   git commit -m "feat: ajout composant Button avec variants"
   ```

4. **🔄 Pull Request avec review**
   ```bash
   git push origin feature/nouveau-composant
   ```

### Conventions de code

- **📝 TypeScript strict** : Types explicites et validations
- **🎨 Prettier + ESLint** : Formatage automatique et cohérent
- **📚 Documentation** : Commentaires JSDoc pour les composants
- **🧪 Tests** : Tests unitaires pour les fonctionnalités critiques
- **♿ Accessibilité** : ARIA labels et navigation clavier

### Configuration des outils

<details>
<summary>🔧 Configurations détaillées</summary>

#### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "strict": true, // Type checking strict
    "target": "ES2017", // Support moderne
    "jsx": "preserve", // JSX pour Next.js
    "moduleResolution": "bundler", // Résolution moderne
    "paths": {
      "@/*": ["./src/*"] // Alias pour imports
    }
  }
}
```

#### Prettier (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

</details>

## 🚀 Déploiement

### Plateformes supportées

- **[Vercel](https://vercel.com/)** 🟢 _Recommandé_ - Déploiement automatique avec optimisations
- **[Netlify](https://netlify.com/)** - Alternative avec fonctions serverless
- **[Railway](https://railway.app/)** - Déploiement simple avec base de données
- **[DigitalOcean](https://digitalocean.com/)** - VPS pour un contrôle complet

### Déploiement automatique (Vercel)

1. **Connecter le repository GitHub**
2. **Configurer les variables d'environnement**
3. **Déployement automatique à chaque push**

```bash
# Variables d'environnement requises
DATABASE_URL=postgresql://...
JWT_SECRET=your-super-secret-key
NEXTAUTH_URL=https://votre-domaine.com
```

## 📊 Performance et métriques

### Scores Lighthouse (cibles)

- **🚀 Performance** : 95+ (grâce à Next.js et optimisations)
- **♿ Accessibilité** : 100 (conformité WCAG 2.1 AAA)
- **💡 Bonnes pratiques** : 100 (sécurité et standards web)
- **🔍 SEO** : 100 (métadonnées et structured data)

### Optimisations intégrées

- **⚡ Turbopack** : Hot reload ultra-rapide en développement
- **🖼️ Image Optimization** : Compression et formats modernes automatiques
- **📦 Code Splitting** : Chargement paresseux des composants
- **🗜️ Bundle Optimization** : Tree shaking et minification

## 🤝 Contribution

### Pour contribuer au projet

1. **🍴 Fork le repository**
2. **🌿 Créer une branche feature** (`git checkout -b feature/amazing-feature`)
3. **📝 Commit les changements** (`git commit -m 'feat: add amazing feature'`)
4. **🚀 Push vers la branche** (`git push origin feature/amazing-feature`)
5. **📬 Ouvrir une Pull Request**

### Guidelines de contribution

- **📚 Documentation** : Mettre à jour la documentation si nécessaire
- **🧪 Tests** : Ajouter des tests pour les nouvelles fonctionnalités
- **🎨 Style** : Respecter les conventions de code (ESLint + Prettier)
- **♿ Accessibilité** : Vérifier la conformité WCAG

## 📚 Documentation

### Pour les développeurs

- **[📖 Guide Développeur](./InfoDev/README_DEV.md)** - Documentation technique complète
- **[🎨 Design System](./InfoDev/DESIGN_SYSTEM.md)** - Guide des couleurs et composants
- **[🔧 API Reference](./InfoDev/API.md)** - Documentation des API Routes

### Ressources externes

- **[Next.js 15 Docs](https://nextjs.org/docs)** - Documentation officielle Next.js
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Guide Tailwind CSS
- **[TypeScript](https://www.typescriptlang.org/docs/)** - Documentation TypeScript

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Yohan** - _Développeur Full Stack_

- 🌐 Portfolio : [yohan-front.vercel.app](https://yohan-front.vercel.app)
- 📧 Email : [votre-email@domain.com](mailto:votre-email@domain.com)
- 💼 LinkedIn : [linkedin.com/in/yohan](https://linkedin.com/in/yohan)

## 🙏 Remerciements

- **[Next.js Team](https://nextjs.org/)** pour l'excellent framework
- **[Vercel](https://vercel.com/)** pour la plateforme de déploiement
- **[Tailwind Labs](https://tailwindlabs.com/)** pour le framework CSS moderne
- **La communauté open source** pour les outils et bibliothèques

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

_Fait avec ❤️ et beaucoup de ☕ par [Yohan](https://github.com/yohan)_

[🚀 Demo Live](https://yohan-front.vercel.app) • [📖 Documentation](./InfoDev/README_DEV.md) • [🐛 Report Bug](https://github.com/yohan/yohan-front/issues) • [💡 Feature Request](https://github.com/yohan/yohan-front/issues)

</div>
