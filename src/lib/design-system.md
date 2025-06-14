# Charte Graphique Moderne 2025 - Doens Production

## Vue d'ensemble

Cette charte graphique définit l'identité visuelle cohérente du site Doens Production, basée sur une palette moderne et professionnelle utilisant le noir #000002 comme couleur principale.

## Palette de Couleurs

### Couleur Principale - Noir Moderne

- **Principal**: `#000002` - Noir ultra-moderne, presque pur mais avec une subtile nuance
- **Variations**: De `#0a0a0a` (très légèrement plus clair) à `#646464` (gris le plus clair)

### Couleur d'Accent - Rouge Vibrant

- **Principal**: `#ff0015` - Rouge moderne et énergique
- **Variations**: De `#ffe6e8` (très clair) à `#990003` (très sombre)

### Couleurs Neutres

- **Blanc**: `#ffffff` - Contraste maximal pour la lisibilité
- **Gris**: Échelle complète de `#f9f9f9` à `#1a1a1a`

## Utilisation des Couleurs

### Fonds

- **Principal**: `bg-[#000002]` - Fond principal du site
- **Secondaire**: `bg-gray-950` ou `bg-gray-900` - Conteneurs et cartes
- **Accent**: `bg-[#ff0015]` - Boutons principaux et éléments d'action

### Textes

- **Principal**: `text-white` - Texte principal sur fond sombre
- **Accent**: `text-[#ff0015]` - Éléments importants et liens
- **Secondaire**: `text-gray-300` à `text-gray-100` - Textes secondaires

### Bordures

- **Subtiles**: `border-gray-800` - Séparations discrètes
- **Accent**: `border-[#ff0015]` - Éléments interactifs
- **Transparentes**: `border-white/10` - Effets de verre

## Gradients Modernes Harmonisés

### Gradient Principal

```css
bg-gradient-to-br from-[#000002] via-gray-950 to-[#000002]
```

_Utilisé pour les fonds principaux avec une subtile profondeur_

### Gradient d'Accent

```css
bg-gradient-to-r from-[#ff0015] to-[#e6000c]
```

_Pour les boutons et éléments d'action_

### Gradient Subtil

```css
bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950
```

_Pour les conteneurs secondaires_

### Gradient Header

```css
bg-gradient-to-r from-[#000002] via-gray-950 to-[#000002]
```

_Spécialement conçu pour la navigation, reste dans les tons sombres_

### Gradient Card

```css
bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900
```

_Pour les cartes avec une profondeur subtile_

### Gradient Dropdown

```css
bg-gradient-to-b from-gray-950 to-[#000002]
```

_Pour les menus déroulants harmonisés_

## Composants Standardisés

### Boutons Principaux

- Fond: `bg-[#ff0015]`
- Texte: `text-white`
- Hover: `hover:bg-[#e6000c]`
- Ombre: `shadow-lg shadow-[#ff0015]/25`

### Boutons Secondaires

- Fond: `bg-transparent`
- Bordure: `border-white border-2`
- Texte: `text-white`
- Hover: `hover:bg-white hover:text-[#000002]`

### Cartes

- Fond: `bg-gray-900`
- Bordure: `border-gray-800`
- Ombre: `shadow-2xl shadow-black/50`

### Badges/Tags

- Fond: `bg-[#ff0015]/10`
- Texte: `text-[#ff0015]`
- Point animé: `bg-[#ff0015]`

## Effets Visuels

### Halos Lumineux

```css
bg-gradient-to-r from-[#ff0015]/20 to-[#ff0015]/20 via-transparent blur-xl
```

### Overlays

```css
bg-gradient-to-t from-black/60 via-transparent to-transparent
```

### Éléments Décoratifs

```css
bg-[#ff0015]/5 blur-3xl
```

## Règles de Cohérence

1. **Toujours utiliser** `#000002` comme fond principal
2. **Toujours utiliser** `#ff0015` comme couleur d'accent
3. **Maintenir** un contraste élevé avec le blanc pour la lisibilité
4. **Utiliser** les gradients pour ajouter de la profondeur
5. **Appliquer** les mêmes effets visuels sur tous les composants similaires

## Classes Utilitaires Personnalisées

### Disponibles dans globals.css

- `.bg-primary` - Fond noir principal
- `.bg-accent` - Fond rouge accent
- `.text-accent` - Texte rouge accent
- `.gradient-primary` - Gradient principal
- `.gradient-accent` - Gradient d'accent
- `.card-dark` - Style de carte sombre

## Responsive Design

La charte s'adapte automatiquement aux différentes tailles d'écran en maintenant :

- Les mêmes couleurs sur tous les appareils
- Des contrastes appropriés
- Une lisibilité optimale
- Des effets visuels cohérents

## Accessibilité

- **Contraste**: Ratio minimum de 4.5:1 entre le texte et le fond
- **Lisibilité**: Blanc sur noir pour un contraste maximal
- **Focus**: Indicateurs visuels clairs avec la couleur d'accent
- **Animations**: Respectueuses des préférences utilisateur

Cette charte garantit une expérience visuelle moderne, professionnelle et cohérente sur l'ensemble du site Doens Production.
