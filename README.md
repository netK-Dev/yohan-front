# 🚀 Yohan Front - Portfolio avec Zone Admin

Site portfolio moderne développé avec **Next.js 15**, **Tailwind CSS** et **TypeScript**. Comprend une interface publique pour présenter les projets et une zone d'administration sécurisée pour gérer le contenu.

## 📋 Table des matières

- [Technologies utilisées](#-technologies-utilisées)
- [Architecture du projet](#-architecture-du-projet)
- [Design System](#-design-system)
- [Installation et démarrage](#-installation-et-démarrage)
- [Structure des dossiers](#-structure-des-dossiers)
- [Routes et pages](#-routes-et-pages)
- [Composants](#-composants)
- [Scripts disponibles](#-scripts-disponibles)
- [Développement](#-développement)

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15.3.3 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4 avec palette personnalisée
- **Qualité de code** : ESLint + Prettier
- **Formatage** : Prettier avec plugin Tailwind CSS
- **Package Manager** : npm

## 🎨 Design System

### Palette de couleurs cohérente

Le projet utilise une palette de couleurs moderne et accessible :

| Couleur | Hex | Usage |
|---------|-----|--------|
| **Primary** | `#100000` | Noir profond - Texte principal, arrière-plans sombres |
| **Accent** | `#e60b18` | Rouge vibrant - Boutons d'action, liens, éléments interactifs |
| **White** | `#ffffff` | Blanc pur - Arrière-plans clairs, texte sur foncé |

### Accessibilité
- ✅ **Contrastes WCAG 2.1 AAA** validés
- ✅ **Compatible daltonisme** (tous types)
- ✅ **Variables CSS** et constantes TypeScript
- ✅ **Classes Tailwind** personnalisées

### Usage des couleurs
```tsx
// Classes Tailwind
<div className="bg-primary text-white">...</div>
<button className="bg-accent hover:bg-accent-700">...</button>

// Constantes TypeScript
import { COLOR_COMBINATIONS } from '@/lib/colors'
<header className={COLOR_COMBINATIONS.header.background}>...</header>
```

📖 **Documentation complète** : [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🏗️ Architecture du projet

Le projet suit une architecture **modulaire et scalable** avec une séparation claire entre :

### 🌐 Interface publique
- **Page d'accueil** : Présentation et hero section
- **À propos** : Informations personnelles et compétences
- **Projets** : Portfolio avec détails des projets
- **Contact** : Formulaire de contact

### 🔐 Zone d'administration
- **Dashboard** : Vue d'ensemble et statistiques
- **Gestion des projets** : CRUD complet (Create, Read, Update, Delete)
- **Gestion du contenu** : Modification des textes du site
- **Authentification** : Système de login sécurisé

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd yohan_front

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure des dossiers

```
src/
├── app/                          # App Router Next.js
│   ├── (public)/                 # 🌐 Routes publiques (groupes de routes)
│   │   ├── page.tsx             # Page d'accueil
│   │   ├── about/               # À propos
│   │   ├── projects/            # Portfolio/projets
│   │   └── contact/             # Contact
│   ├── admin/                   # 🔐 Zone d'administration
│   │   ├── dashboard/           # Dashboard admin
│   │   ├── projects/           # Gestion des projets
│   │   └── content/            # Gestion du contenu
│   ├── api/                    # 🔌 API Routes
│   │   ├── auth/               # Authentification
│   │   ├── projects/           # CRUD projets
│   │   └── content/            # CRUD contenu
│   ├── globals.css             # Styles globaux
│   └── layout.tsx              # Layout principal
├── components/                  # 🧩 Composants réutilisables
│   ├── ui/                     # Composants UI de base (Button, Input, etc.)
│   ├── forms/                  # Formulaires spécialisés
│   ├── layout/                 # Composants de layout (Header, Footer, etc.)
│   └── admin/                  # Composants spécifiques admin
├── lib/                        # 🔧 Utilitaires et configuration
│   ├── db.ts                   # Configuration base de données
│   ├── auth.ts                 # Configuration authentification
│   ├── validations.ts          # Schémas de validation (Zod)
│   └── utils.ts                # Fonctions utilitaires
├── types/                      # 📝 Types TypeScript
│   ├── index.ts                # Types généraux
│   ├── auth.ts                 # Types authentification
│   └── content.ts              # Types contenu/projets
├── hooks/                      # 🎣 Custom hooks React
│   ├── useAuth.ts              # Hook authentification
│   └── useContent.ts           # Hook gestion contenu
└── stores/                     # 🗃️ State management
    ├── authStore.ts            # Store authentification
    └── contentStore.ts         # Store contenu
```

## 🛣️ Routes et pages

### Routes publiques (`/(public)/`)
- `/` - Page d'accueil
- `/about` - À propos
- `/projects` - Portfolio
- `/projects/[id]` - Détail d'un projet
- `/contact` - Contact

### Routes admin (`/admin/`)
- `/admin` - Dashboard
- `/admin/projects` - Gestion des projets
- `/admin/content` - Gestion du contenu
- `/admin/login` - Connexion

### API Routes (`/api/`)
- `/api/auth/*` - Authentification
- `/api/projects/*` - CRUD projets
- `/api/content/*` - CRUD contenu

## 🧩 Composants

### Structure recommandée :
- **`components/ui/`** : Composants de base réutilisables
- **`components/forms/`** : Formulaires spécialisés
- **`components/layout/`** : Header, Footer, Navigation
- **`components/admin/`** : Composants spécifiques à l'admin

## 📜 Scripts disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement avec Turbopack

# Production
npm run build        # Build de production
npm run start        # Démarre le serveur de production

# Qualité de code
npm run lint         # Analyse ESLint
npm run lint:fix     # Corrige automatiquement les erreurs ESLint
npm run format       # Formate le code avec Prettier
npm run format:check # Vérifie le formatage
```

## 🔧 Développement

### Conventions de code
- **TypeScript** : Types stricts activés
- **ESLint** : Configuration Next.js recommandée
- **Prettier** : Formatage automatique avec plugin Tailwind
- **Commits** : Messages descriptifs en français

### Structure de développement recommandée
1. **Types first** : Définir les types TypeScript avant l'implémentation
2. **Composants réutilisables** : Créer des composants UI génériques
3. **Hooks personnalisés** : Extraire la logique dans des hooks
4. **API-first** : Développer les API routes en premier
5. **Tests** : Ajouter des tests pour les fonctionnalités critiques

### Prochaines étapes de développement
- [ ] Configuration de la base de données
- [ ] Système d'authentification
- [ ] Composants UI de base
- [ ] CRUD projets
- [ ] Upload d'images
- [ ] Système de blog (optionnel)

## 🚀 Déploiement

Le projet est configuré pour être déployé facilement sur :
- **Vercel** (recommandé)
- **Netlify**
- **Railway**
- **Heroku**

---

**Développé avec ❤️ par Yohan** | Next.js 15 + Tailwind CSS + TypeScript
