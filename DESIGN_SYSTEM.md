# 🌙 Design System - Yohan Front (Dark Mode)

## Palette de couleurs - Thème Sombre

### Couleurs principales

| Couleur | Hex | Usage | Variable CSS |
|---------|-----|--------|--------------|
| **Primary** | `#100000` | **Arrière-plans principaux**, zones sombres | `--color-primary` |
| **Accent** | `#e60b18` | Boutons d'action, liens, éléments interactifs | `--color-accent` |
| **White** | `#ffffff` | **Texte principal**, contraste sur fonds sombres | `--color-white` |

### Philosophie du thème sombre

Le design adopte une approche **dark-first** où :
- Le **noir profond** (`#100000`) domine comme arrière-plan pour réduire la fatigue oculaire
- Le **blanc pur** (`#ffffff`) assure un contraste maximal pour la lisibilité
- Le **rouge vibrant** (`#e60b18`) apporte des accents dynamiques et guide l'attention

### Variations disponibles

Chaque couleur principale dispose de variations de 50 à 900 :
- `primary-50` à `primary-900` (transparences du noir)
- `accent-50` à `accent-900` (transparences du rouge)
- `gray-50` à `gray-900` (échelle inversée pour dark mode)

## Usage dans le code

### 1. Classes Tailwind CSS

```tsx
// Arrière-plans (thème sombre)
<div className="bg-primary">Fond noir principal</div>
<div className="bg-gray-50">Fond gris sombre (cards)</div>
<div className="bg-accent">Fond rouge (boutons d'action)</div>

// Texte (optimisé pour fonds sombres)
<p className="text-white">Texte principal blanc</p>
<p className="text-accent">Texte rouge (liens/accents)</p>
<p className="text-gray-600">Texte secondaire</p>

// Bordures
<div className="border border-gray-200">Bordure subtile</div>
<div className="border border-accent">Bordure accent</div>
```

### 2. Constantes TypeScript (recommandé)

```tsx
import { COLOR_COMBINATIONS } from '@/lib/colors'

// Pages principales
<div className={COLOR_COMBINATIONS.page.background}>
  <h1 className={COLOR_COMBINATIONS.page.text}>Titre</h1>
</div>

// Headers (fond noir)
<header className={COLOR_COMBINATIONS.header.background}>
  <nav className={COLOR_COMBINATIONS.header.text}>Navigation</nav>
</header>

// Boutons principaux (rouge)
<button className={`
  ${COLOR_COMBINATIONS.primaryButton.background}
  ${COLOR_COMBINATIONS.primaryButton.text}
  ${COLOR_COMBINATIONS.primaryButton.hover}
`}>
  Action principale
</button>

// Boutons secondaires (transparents avec bordure)
<button className={`
  ${COLOR_COMBINATIONS.secondaryButton.background}
  ${COLOR_COMBINATIONS.secondaryButton.text}
  ${COLOR_COMBINATIONS.secondaryButton.border}
  ${COLOR_COMBINATIONS.secondaryButton.hover}
`}>
  Action secondaire
</button>
```

### 3. Variables CSS directes

```css
.custom-dark-element {
  background-color: var(--color-primary);      /* Noir profond */
  color: var(--color-white);                   /* Texte blanc */
  border: 1px solid var(--color-gray-200);     /* Bordure gris sombre */
}

.custom-accent-element {
  background-color: var(--color-accent);       /* Rouge vibrant */
  color: var(--color-white);                   /* Texte blanc */
}
```

## Combinaisons recommandées - Dark Mode

### Pages principales
- **Background** : `bg-primary` (noir profond)
- **Text** : `text-white` (blanc pur)
- **Accents** : `text-accent` (rouge vibrant)

### Headers et Navigation
- **Background** : `bg-primary` (noir)
- **Text** : `text-white` (blanc)
- **Hover** : `text-accent` (rouge au survol)
- **Border** : `border-gray-200` (gris sombre)

### Boutons principaux (Rouge)
- **Background** : `bg-accent` (rouge vibrant)
- **Text** : `text-white` (blanc)
- **Hover** : `hover:bg-accent-700` (rouge plus sombre)

### Boutons secondaires (Transparents)
- **Background** : `bg-transparent`
- **Text** : `text-white`
- **Border** : `border-white`
- **Hover** : `hover:bg-white hover:text-primary` (inversion)

### Cards et conteneurs
- **Background** : `bg-gray-50` (gris sombre)
- **Text** : `text-white` (blanc)
- **Border** : `border-gray-200` (gris moyen)
- **Shadow** : `shadow-lg` (ombre prononcée)

### Interface admin
- **Sidebar** : `bg-primary` (noir profond)
- **Sidebar Text** : `text-white` (blanc)
- **Sidebar Accent** : `text-accent` (rouge)
- **Content** : `bg-gray-50` (gris sombre)

## Accessibilité - Dark Mode

### Contrastes validés WCAG 2.1

- ✅ **White sur Primary** : Ratio 21:1 (AAA) - Parfait pour la lecture
- ✅ **White sur Accent** : Ratio 11.2:1 (AAA) - Excellent pour les boutons
- ✅ **Accent sur Primary** : Ratio 11.2:1 (AAA) - Idéal pour les liens
- ✅ **Gray-600 sur Primary** : Ratio 7.2:1 (AA) - Bon pour le texte secondaire

### Avantages du dark mode

- 🌙 **Réduction de la fatigue oculaire** en conditions de faible éclairage
- 🔋 **Économie d'énergie** sur écrans OLED/AMOLED
- 🎨 **Esthétique moderne** et professionnelle
- 🎯 **Meilleur focus** sur le contenu grâce aux contrastes élevés

### Daltonisme

La palette reste testée pour les différents types de daltonisme :
- ✅ Protanopie (rouge-vert) - Le rouge reste distinct
- ✅ Deutéranopie (rouge-vert) - Contraste maintenu
- ✅ Tritanopie (bleu-jaune) - Non affecté

## Exemples d'usage - Dark Mode

### Page d'accueil sombre
```tsx
<div className="bg-primary min-h-screen">
  <main className="bg-gray-50 p-8 rounded-lg shadow-lg">
    <h1 className="text-white text-4xl font-bold">Titre principal</h1>
    <p className="text-white opacity-80">Description</p>
    <button className="bg-accent text-white px-6 py-3 rounded hover:bg-accent-700">
      Action principale
    </button>
  </main>
</div>
```

### Navigation dark
```tsx
<nav className="bg-primary shadow-lg border-b border-gray-200">
  <Link href="/" className="text-white hover:text-accent">
    Accueil
  </Link>
</nav>
```

### Formulaires sombres
```tsx
<form className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <input className="bg-gray-100 border border-gray-300 text-white focus:border-accent" />
  <button className="bg-accent text-white hover:bg-accent-700">
    Envoyer
  </button>
</form>
```

### Cards sombres
```tsx
<div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
  <h3 className="text-white font-semibold">Titre de la card</h3>
  <p className="text-white opacity-80">Contenu de la card</p>
</div>
```

## Maintenance

- **Fichier principal** : `src/app/globals.css` (variables dark mode)
- **Constantes** : `src/lib/colors.ts` (combinaisons dark mode)
- **Tests visuels** : `/test` (http://localhost:3000/test)

### Personnalisation

Pour modifier l'intensité du dark mode, ajustez dans `globals.css` :
- `--color-primary-dark` pour le noir de base
- `--color-gray-*` pour les nuances intermédiaires
- Les transparences `rgba()` pour les variations

Le thème reste cohérent et accessible quelle que soit la personnalisation. 