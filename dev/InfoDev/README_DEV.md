# 🚀 Guide Développeur - Yohan Front

## 📖 Table des matières

- [🏗️ Architecture Next.js 15](#️-architecture-nextjs-15)
- [📁 Structure du projet](#-structure-du-projet)
- [🎨 Design System](#-design-system)
- [⚙️ Configuration et outils](#️-configuration-et-outils)
- [🔄 Workflow de développement](#-workflow-de-développement)
- [📝 Conventions de code](#-conventions-de-code)
- [🧩 Développement de composants](#-développement-de-composants)
- [🛣️ Gestion des routes](#️-gestion-des-routes)
- [💾 Gestion d'état](#-gestion-détat)
- [🔐 Authentification](#-authentification)
- [📡 API et données](#-api-et-données)
- [🎯 Bonnes pratiques](#-bonnes-pratiques)
- [🐛 Debugging et tests](#-debugging-et-tests)
- [🚀 Déploiement](#-déploiement)

---

## 🏗️ Architecture Next.js 15

### App Router vs Pages Router

Ce projet utilise **App Router** (Next.js 13+), la nouvelle architecture recommandée :

```
src/app/
├── layout.tsx          # Layout racine (obligatoire)
├── page.tsx           # Page d'accueil (/)
├── globals.css        # Styles globaux
├── (public)/          # 🌐 Groupe de routes publiques
│   ├── about/
│   │   └── page.tsx   # /about
│   ├── projects/
│   │   ├── page.tsx   # /projects
│   │   └── [id]/
│   │       └── page.tsx # /projects/[id]
│   └── contact/
│       └── page.tsx   # /contact
└── admin/             # 🔐 Routes admin
    ├── layout.tsx     # Layout admin
    ├── dashboard/
    │   └── page.tsx   # /admin/dashboard
    └── projects/
        └── page.tsx   # /admin/projects
```

### Concepts clés App Router

#### 1. **File-based Routing**

```typescript
// app/page.tsx = Route "/"
export default function HomePage() {
  return <div>Page d'accueil</div>
}

// app/about/page.tsx = Route "/about"
export default function AboutPage() {
  return <div>À propos</div>
}

// app/projects/[id]/page.tsx = Route "/projects/123"
export default function ProjectPage({ params }: { params: { id: string } }) {
  return <div>Projet {params.id}</div>
}
```

#### 2. **Layouts emboîtés**

```typescript
// app/layout.tsx - Layout racine (toujours présent)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

// app/admin/layout.tsx - Layout admin (uniquement pour /admin/*)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  )
}
```

#### 3. **Groupes de routes**

```typescript
// app/(public)/ - Groupe sans impact sur l'URL
// Permet d'organiser les routes publiques sans affecter l'URL finale
(public)/
├── about/page.tsx     # URL: /about (pas /(public)/about)
├── projects/page.tsx  # URL: /projects
└── contact/page.tsx   # URL: /contact
```

#### 4. **Server vs Client Components**

```typescript
// Server Component (par défaut) - Rendu côté serveur
export default function ServerComponent() {
  // Pas d'interactivité, pas de hooks React
  // Accès direct aux bases de données
  const data = await fetch('...')
  return <div>{data}</div>
}

// Client Component - Rendu côté client
'use client'
import { useState } from 'react'

export default function ClientComponent() {
  const [state, setState] = useState('')
  // Hooks React, événements, interactivité
  return <button onClick={() => setState('clicked')}>Cliquer</button>
}
```

---

## 📁 Structure du projet

### Organisation modulaire

```
src/
├── app/                     # 🛣️ App Router Next.js
│   ├── (public)/           # Routes publiques groupées
│   │   ├── about/          # Page à propos
│   │   ├── projects/       # Portfolio
│   │   └── contact/        # Contact
│   ├── admin/              # Zone d'administration
│   │   ├── dashboard/      # Tableau de bord
│   │   ├── projects/       # Gestion projets
│   │   └── content/        # Gestion contenu
│   ├── api/                # API Routes
│   │   ├── auth/           # Authentification
│   │   ├── projects/       # CRUD projets
│   │   └── content/        # CRUD contenu
│   ├── globals.css         # Styles globaux + Tailwind
│   └── layout.tsx          # Layout racine
├── components/             # 🧩 Composants réutilisables
│   ├── ui/                 # Composants UI de base
│   │   ├── Button.tsx      # Bouton réutilisable
│   │   ├── Input.tsx       # Champ de saisie
│   │   ├── Card.tsx        # Carte de contenu
│   │   └── Modal.tsx       # Modal/popup
│   ├── forms/              # Formulaires spécialisés
│   │   ├── ContactForm.tsx # Formulaire contact
│   │   └── ProjectForm.tsx # Formulaire projet
│   ├── layout/             # Composants de layout
│   │   ├── Header.tsx      # En-tête site
│   │   ├── Footer.tsx      # Pied de page
│   │   └── Navigation.tsx  # Navigation
│   └── admin/              # Composants admin
│       ├── Sidebar.tsx     # Sidebar admin
│       └── DataTable.tsx   # Tableau de données
├── lib/                    # 🔧 Utilitaires et config
│   ├── colors.ts           # Système de couleurs
│   ├── utils.ts            # Fonctions utilitaires
│   ├── validations.ts      # Schémas Zod
│   ├── db.ts               # Configuration DB
│   └── auth.ts             # Configuration auth
├── types/                  # 📝 Types TypeScript
│   ├── index.ts            # Types généraux
│   ├── auth.ts             # Types authentification
│   ├── content.ts          # Types contenu
│   └── api.ts              # Types API
├── hooks/                  # 🎣 Custom hooks
│   ├── useAuth.ts          # Hook authentification
│   ├── useContent.ts       # Hook gestion contenu
│   └── useLocalStorage.ts  # Hook localStorage
└── stores/                 # 🗃️ State management
    ├── authStore.ts        # Store authentification
    ├── contentStore.ts     # Store contenu
    └── uiStore.ts          # Store interface
```

### Règles d'organisation

#### **Composants :**

- `ui/` : Composants génériques réutilisables
- `forms/` : Formulaires métier spécialisés
- `layout/` : Composants de structure (Header, Footer)
- `admin/` : Composants spécifiques à l'administration

#### **Pages :**

- Chaque dossier = une route
- `page.tsx` = composant principal de la route
- `layout.tsx` = layout spécifique à la section
- `loading.tsx` = état de chargement
- `error.tsx` = gestion des erreurs

---

## 🎨 Design System

### Système de couleurs avancé

Le projet utilise un système de couleurs sophistiqué avec **3 couches** :

#### **1. Variables CSS** (globals.css)

```css
:root {
  /* Couleurs principales */
  --color-primary-dark: #100000; /* Noir profond */
  --color-accent: #e60b18; /* Rouge vibrant */
  --color-white: #ffffff; /* Blanc pur */

  /* Variants avec opacité */
  --color-primary-dark-50: rgba(16, 0, 0, 0.05);
  --color-accent-700: rgba(230, 11, 24, 0.7);
}
```

#### **2. Configuration Tailwind** (globals.css)

```css
@theme inline {
  --color-primary: var(--color-primary-dark);
  --color-accent: var(--color-accent);
  /* Mapping vers classes Tailwind */
}
```

#### **3. Constantes TypeScript** (lib/colors.ts)

```typescript
export const COLORS = {
  primary: {
    DEFAULT: '#100000',
    50: 'rgba(16, 0, 0, 0.05)',
    700: 'rgba(16, 0, 0, 0.7)',
    // ...
  },
};

export const COLOR_COMBINATIONS = {
  primaryButton: {
    background: 'bg-accent',
    text: 'text-white',
    hover: 'hover:bg-accent-700',
  },
};
```

### Utilisation dans les composants

```typescript
import { COLOR_COMBINATIONS } from '@/lib/colors'

// Option 1 : Classes Tailwind directes
<button className="bg-accent text-white hover:bg-accent-700">
  Bouton
</button>

// Option 2 : Combinaisons prédéfinies
<button className={`
  ${COLOR_COMBINATIONS.primaryButton.background}
  ${COLOR_COMBINATIONS.primaryButton.text}
  ${COLOR_COMBINATIONS.primaryButton.hover}
`}>
  Bouton
</button>

// Option 3 : Classes CSS personnalisées
<button className="btn-primary">
  Bouton
</button>
```

---

## ⚙️ Configuration et outils

### Stack technique complète

```json
{
  "runtime": "Node.js 18+",
  "framework": "Next.js 15.3.3",
  "language": "TypeScript",
  "styling": "Tailwind CSS v4",
  "packageManager": "npm",
  "qualityTools": ["ESLint", "Prettier"],
  "devTools": ["Turbopack"]
}
```

### Configuration TypeScript (tsconfig.json)

```typescript
{
  "compilerOptions": {
    "strict": true,              // Type checking strict
    "target": "ES2017",          // Support moderne
    "jsx": "preserve",           // JSX pour Next.js
    "moduleResolution": "bundler", // Résolution moderne
    "paths": {
      "@/*": ["./src/*"]         // Alias pour imports
    }
  }
}
```

### Configuration ESLint (eslint.config.mjs)

```javascript
// Configuration Next.js recommandée + règles personnalisées
export default [
  {
    extends: ['next/core-web-vitals'],
    rules: {
      // Règles personnalisées
    },
  },
];
```

### Configuration Prettier (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"] // Tri automatique classes
}
```

---

## 🔄 Workflow de développement

### Commandes essentielles

```bash
# Développement avec Turbopack (plus rapide)
npm run dev

# Build de production
npm run build
npm run start

# Qualité de code
npm run lint          # Analyse ESLint
npm run lint:fix      # Correction auto
npm run format        # Format avec Prettier
npm run format:check  # Vérification format
```

### Workflow Git recommandé

```bash
# 1. Créer une branche feature
git checkout -b feature/nouveau-composant

# 2. Développer avec qualité
npm run lint:fix && npm run format

# 3. Commits descriptifs
git commit -m "feat: ajout composant Button avec variants"

# 4. Pull request avec review
git push origin feature/nouveau-composant
```

### Hot Reload et performance

```typescript
// Next.js 15 avec Turbopack = rechargement ultra-rapide
// - Modifications CSS : < 100ms
// - Modifications composants : < 500ms
// - Pas de rechargement complet navigateur
```

---

## 📝 Conventions de code

### Nommage des fichiers

```
components/
├── Button.tsx              # PascalCase pour composants
├── types/
│   └── auth.ts            # camelCase pour utilitaires
└── hooks/
    └── useAuth.ts         # camelCase avec prefix "use"
```

### Structure d'un composant

```typescript
// 1. Imports externes
import React from 'react'
import { clsx } from 'clsx'

// 2. Imports internes
import { COLOR_COMBINATIONS } from '@/lib/colors'
import type { ButtonProps } from '@/types'

// 3. Types (si non externalisés)
interface LocalButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

// 4. Composant principal
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: LocalButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // 5. Logique du composant
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variantClasses = {
    primary: COLOR_COMBINATIONS.primaryButton.background,
    secondary: COLOR_COMBINATIONS.secondaryButton.background
  }

  // 6. Rendu JSX
  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// 7. Exports nommés si nécessaire
export type { LocalButtonProps }
```

### Convention d'imports

```typescript
// 1. Imports React
import React, { useState, useEffect } from 'react';

// 2. Imports libraries externes
import { clsx } from 'clsx';
import { z } from 'zod';

// 3. Imports Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 4. Imports internes (avec alias @/)
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import type { User } from '@/types';
```

---

## 🧩 Développement de composants

### Composants UI de base

#### **Exemple : Button.tsx**

```typescript
// components/ui/Button.tsx
'use client'

import React from 'react'
import { clsx } from 'clsx'
import { COLOR_COMBINATIONS } from '@/lib/colors'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2'

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const variantClasses = {
    primary: `${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover}`,
    secondary: `${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.hover}`,
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }

  return (
    <button
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        {
          'opacity-50 cursor-not-allowed': disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <LoadingSpinner className="mr-2" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
```

#### **Exemple : Card.tsx**

```typescript
// components/ui/Card.tsx
import React from 'react'
import { clsx } from 'clsx'
import { COLOR_COMBINATIONS } from '@/lib/colors'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated'
}

export default function Card({
  children,
  className,
  padding = 'md',
  variant = 'default'
}: CardProps) {
  const baseClasses = `${COLOR_COMBINATIONS.card.background} ${COLOR_COMBINATIONS.card.border} border rounded-lg`

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const variantClasses = {
    default: COLOR_COMBINATIONS.card.shadow,
    elevated: 'shadow-xl'
  }

  return (
    <div className={clsx(
      baseClasses,
      paddingClasses[padding],
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  )
}
```

### Composants composés

```typescript
// Composant avec sous-composants
export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>
}

Card.Content = function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>
}

// Usage :
<Card>
  <Card.Header>Titre</Card.Header>
  <Card.Content>Contenu</Card.Content>
</Card>
```

---

## 🛣️ Gestion des routes

### Navigation Next.js 15

```typescript
// Composant Navigation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/projects', label: 'Projets' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            'nav-link',
            pathname === link.href && 'nav-link-active'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
```

### Routes dynamiques

```typescript
// app/projects/[id]/page.tsx
interface ProjectPageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { id } = params

  return (
    <div>
      <h1>Projet {id}</h1>
      {/* Contenu du projet */}
    </div>
  )
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProject(params.id)

  return {
    title: `${project.title} - Yohan Front`,
    description: project.description
  }
}
```

### Middleware et protection de routes

```typescript
// middleware.ts (racine du projet)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protection des routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 💾 Gestion d'état

### Context API pour l'état global

```typescript
// stores/AuthContext.tsx
'use client'

import React, { createContext, useContext, useReducer } from 'react'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthContextType {
  state: AuthState
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload }
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    error: null
  })

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const user = await loginUser(credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### Custom hooks pour la logique métier

```typescript
// hooks/useProjects.ts
'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const newProject = await response.json();
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'ajout");
      throw err;
    }
  };

  return {
    projects,
    isLoading,
    error,
    addProject,
    refetch: fetchProjects,
  };
}
```

---

## 🔐 Authentification

### Configuration Auth

```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
```

### API Route d'authentification

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import { getUserByEmail } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérifier l'utilisateur
    const user = await getUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Générer le token
    const token = generateToken(user);

    // Créer la réponse avec cookie
    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Connexion réussie',
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
```

---

## 📡 API et données

### Structure API Routes

```typescript
// app/api/projects/route.ts - GET /api/projects
export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur création' }, { status: 400 });
  }
}

// app/api/projects/[id]/route.ts - GET /api/projects/123
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
```

### Validation avec Zod

```typescript
// lib/validations.ts
import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(100, 'Titre trop long'),
  description: z.string().min(1, 'Description requise'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie'),
  imageUrl: z.string().url("URL d'image invalide").optional(),
  githubUrl: z.string().url('URL GitHub invalide').optional(),
  liveUrl: z.string().url('URL live invalide').optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// Usage dans API Route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ProjectSchema.parse(body); // Validation automatique

    const project = await createProject(validatedData);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
```

### Gestion de base de données

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Fonctions métier
export async function getAllProjects() {
  const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows;
}

export async function getProjectById(id: string) {
  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createProject(project: ProjectInput) {
  const result = await query(
    `INSERT INTO projects (title, description, technologies, image_url, github_url, live_url, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      project.title,
      project.description,
      project.technologies,
      project.imageUrl,
      project.githubUrl,
      project.liveUrl,
      project.status,
    ]
  );
  return result.rows[0];
}
```

---

## 🎯 Bonnes pratiques

### Performance

```typescript
// 1. Lazy loading des composants
const AdminDashboard = lazy(() => import('@/components/admin/Dashboard'))

// 2. Memo pour éviter les re-renders
const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return <div>{project.title}</div>
})

// 3. useCallback pour les fonctions
const handleSubmit = useCallback((data: FormData) => {
  // Logique de soumission
}, [dependency])

// 4. Optimisation des images Next.js
import Image from 'next/image'

<Image
  src="/project-image.jpg"
  alt="Description"
  width={300}
  height={200}
  priority // Pour les images above-the-fold
/>
```

### Accessibilité

```typescript
// 1. Labels explicites
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// 2. ARIA attributes
<button aria-expanded={isOpen} aria-controls="menu">
  Menu
</button>

// 3. Focus management
const buttonRef = useRef<HTMLButtonElement>(null)

useEffect(() => {
  if (isModalOpen) {
    buttonRef.current?.focus()
  }
}, [isModalOpen])

// 4. Semantic HTML
<main>
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Mes Projets</h2>
  </section>
</main>
```

### SEO

```typescript
// 1. Métadonnées statiques
export const metadata: Metadata = {
  title: 'Yohan Front - Portfolio',
  description: 'Portfolio de développeur fullstack',
  openGraph: {
    title: 'Yohan Front',
    description: 'Portfolio moderne avec Next.js',
    images: ['/og-image.jpg']
  }
}

// 2. Métadonnées dynamiques
export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  return {
    title: `${project.title} - Yohan Front`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageUrl]
    }
  }
}

// 3. Structured Data
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Portfolio',
      name: 'Yohan Front',
      description: 'Portfolio de développeur'
    })
  }}
/>
```

---

## 🐛 Debugging et tests

### Debugging Next.js

```typescript
// 1. Console.log avec contexte
console.log('🔍 [DEBUG] User data:', { user, timestamp: new Date().toISOString() })

// 2. Debugging conditionnel
if (process.env.NODE_ENV === 'development') {
  console.log('Dev only log')
}

// 3. React DevTools
// Installer l'extension React DevTools pour Chrome/Firefox

// 4. Next.js DevTools
// Analyse des bundles et performance
npm run build -- --analyze
```

### Configuration des tests

```typescript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)

// jest.setup.js
import '@testing-library/jest-dom'

// Exemple de test de composant
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/Button'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## 🚀 Déploiement

### Variables d'environnement

```bash
# .env.local (développement)
DATABASE_URL=postgresql://localhost:5432/yohan_dev
JWT_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000

# .env.production (production)
DATABASE_URL=postgresql://prod-url/yohan_prod
JWT_SECRET=production-secret-key
NEXTAUTH_URL=https://yohan-front.vercel.app
```

### Déploiement Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret"
  }
}
```

### Scripts de déploiement

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "deploy": "npm run build && npm run start",
    "db:migrate": "npx prisma migrate deploy",
    "db:seed": "npx tsx scripts/seed.ts"
  }
}
```

---

## 📚 Ressources et documentation

### Documentation officielle

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Outils recommandés

- **VS Code Extensions** : ES7+ React/Redux/React-Native snippets, Tailwind CSS IntelliSense
- **Chrome Extensions** : React Developer Tools, Redux DevTools

### Commandes utiles

```bash
# Création rapide de composants
npx generate-react-cli component Button --type=functional --destination=src/components/ui

# Analyse du bundle
npm run build -- --analyze

# Nettoyage des dépendances
npm audit fix
npm outdated
```

---

## 🎉 Conclusion

Ce guide couvre tous les aspects essentiels pour développer efficacement sur le projet **Yohan Front**. L'architecture Next.js 15 avec App Router, combinée au design system Tailwind CSS et à TypeScript, offre une base solide pour créer une application moderne, performante et maintenable.

**Prochaines étapes recommandées :**

1. Implémenter les composants UI de base
2. Développer les pages publiques
3. Configurer l'authentification
4. Mettre en place la base de données
5. Créer les API routes CRUD

N'hésitez pas à enrichir cette documentation au fur et à mesure du développement ! 🚀
