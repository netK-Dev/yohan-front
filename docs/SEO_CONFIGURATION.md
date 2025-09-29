# Configuration SEO - Doens Production

## Variables d'environnement requises pour le SEO

Ajoutez ces variables à votre fichier `.env.local` pour optimiser le SEO :

```env
# Configuration SEO
NEXT_PUBLIC_SITE_URL="https://doensproduction.com"
NEXT_PUBLIC_SITE_NAME="Doens Production"
NEXT_PUBLIC_TWITTER_HANDLE="@doensproduction"
```

## Fonctionnalités SEO implémentées

### 1. Métadonnées dynamiques pour les projets

- **Titre** : Généré automatiquement à partir du titre du projet et de sa catégorie
- **Description** : Optimisée basée sur la description du projet (160 caractères max)
- **Mots-clés** : Générés automatiquement à partir de la catégorie, des compétences et du contenu
- **Images Open Graph** : Utilise la première image du projet comme preview

### 2. Données structurées (JSON-LD)

- **Pages de projets** : Schema.org `CreativeWork` avec toutes les métadonnées
- **Page de listing** : Schema.org `CollectionPage` avec `ItemList`
- **Breadcrumbs** : Navigation structurée pour les moteurs de recherche

### 3. Optimisations techniques

- **Sitemap.xml** : Généré dynamiquement avec tous les projets
- **Robots.txt** : Configuration optimisée pour les crawlers
- **Meta tags** : Open Graph, Twitter Cards, et métadonnées standard

## Structure des métadonnées par page

### Page de projet individuel

```
Titre : "Nom du Projet - Catégorie | Doens Production"
Description : "Catégorie : Description du projet... | Doens Production"
URL canonique : "/realisations/[id]"
Image : Première image du projet
```

### Page de listing des réalisations

```
Titre : "Réalisations | Doens Production"
Description : "Portfolio de réalisations créatives en 3D/VFX, Motion Design et Court Métrage"
URL canonique : "/realisations"
```

## Optimisations spécifiques par catégorie

### 3D/VFX et Compositing

- Mots-clés : 3D, VFX, effets spéciaux, compositing, animation 3D, post-production
- Focus : Aspect technique et qualité visuelle

### Motion Design

- Mots-clés : motion design, animation graphique, motion graphics, design animé
- Focus : Créativité et fluidité d'animation

### Court Métrage

- Mots-clés : court métrage, réalisation cinéma, storytelling, cinéma indépendant
- Focus : Narration et direction artistique

## Bonnes pratiques implémentées

1. **Longueur optimale des titres** : 60 caractères maximum
2. **Descriptions SEO** : 160 caractères maximum
3. **Images optimisées** : Format 1200x630 pour les previews
4. **URLs propres** : Structure claire `/realisations/[id]`
5. **Données structurées** : Conformes aux standards Schema.org
6. **Sitemap automatique** : Mis à jour avec chaque nouveau projet

## Performance SEO

Le système génère automatiquement :

- ✅ Métadonnées uniques pour chaque projet
- ✅ Descriptions optimisées sans duplication
- ✅ Mots-clés pertinents par catégorie
- ✅ Images de preview adaptées
- ✅ Données structurées complètes
- ✅ Sitemap dynamique
- ✅ URLs canoniques

## Validation

Pour valider l'implémentation SEO :

1. **Google Search Console** : Vérifier l'indexation
2. **Rich Results Test** : Tester les données structurées
3. **Facebook Debugger** : Valider les Open Graph tags
4. **Twitter Card Validator** : Vérifier les Twitter Cards
5. **Lighthouse SEO** : Audit complet des performances SEO
