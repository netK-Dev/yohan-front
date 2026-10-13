# Analyse et remise en état du projet

État vérifié le 20 septembre 2026 (UTC), depuis le commit `9f35717`, sur macOS Apple Silicon. Modifications locales sur `codex/setup-dependency-refresh` ; aucun push, déploiement ou changement de base distante.

## Ce que contient le projet

Il s’agit d’une application complète, malgré son nom `yohan-front` : Next.js App Router fournit le site public, les écrans d’administration et le backend. PostgreSQL stocke sept modèles : `User`, `Session`, `Account`, `Verification`, `Project`, `SliderMedia` et `PageContent`.

- Les pages publiques présentent l’activité, les réalisations et le contact. La page d’accueil combine des données en base, des valeurs par défaut et un cache Next.js. Les fiches projets utilisent un rendu statique avec revalidation à 300 secondes et génération à la demande.
- L’administration gère les projets, les médias du slider et quatre sections d’accueil : hero, showreel, services et appel à l’action. Tiptap produit les descriptions HTML.
- Better Auth utilise les tables PostgreSQL pour les comptes et les sessions. L’autorisation repose sur la possession d’un compte : il n’existe pas de distinction de rôles entre utilisateurs.
- Les uploads passent par Vercel Blob ; les emails par Resend avec deux templates React. Ces services ne sont pas nécessaires pour consulter les pages ou modifier les textes.
- Les dossiers `_bmad` et `.cursor` sont des ressources de développement, pas des dépendances exécutées par l’application.

## Problèmes constatés et corrections

| Constat initial                                                                                     | Correction                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Node et gestionnaire de paquets non fixés ; README annonçant Node 18, npm et des commandes absentes | Node 22.23.2 et pnpm 10.34.5 fixés, contrôle des engines, verrou pnpm actualisé, documentation remplacée                       |
| `.env.example` en UTF-16, URL PostgreSQL mal formée, secret constant versionné                      | Modèle UTF-8 complet ; script idempotent générant des secrets aléatoires, fichiers privés exclus de Git                        |
| Installation dépendante d’une variable absente ; `dotenv` importé sans dépendance directe           | Génération Prisma possible avant configuration ; dépendance déclarée                                                           |
| Scripts de compilation natifs explicitement ignorés dans pnpm                                       | Autorisation limitée aux paquets nécessaires, dont Prisma, esbuild et sharp                                                    |
| Migrations incomplètes par rapport au schéma utilisé                                                | Migration additive pour `videos`, `software`, `slider_media` et `page_content`                                                 |
| Pas de procédure de création d’administrateur                                                       | Script CLI utilisant le hash natif Better Auth ; mot de passe local aléatoire dans `.local/admin-credentials.json`             |
| Mauvaise priorité des opérateurs dans l’URL Better Auth, pouvant produire `https://undefined`       | Résolution explicite de `BETTER_AUTH_URL`, puis de l’URL Vercel                                                                |
| Inscription publique activée alors que tout compte peut administrer                                 | Inscription fermée ; provisionnement explicite des comptes                                                                     |
| Création, modification et suppression du slider sans authentification serveur                       | Contrôle de session ajouté aux trois opérations                                                                                |
| Routes de debug accessibles publiquement                                                            | Authentification en développement ; réponse 404 en production                                                                  |
| HTML riche renvoyé brut pendant le rendu serveur                                                    | DOMPurify isomorphe et tests XSS du rendu serveur                                                                              |
| JSON-LD pouvant contenir des balises issues du contenu                                              | Échappement du caractère `<` dans les scripts JSON-LD                                                                          |
| Suppression Blob reconstruisant une mauvaise URL de stockage                                        | Conservation des URL complètes et des pathnames acceptés par le SDK ; validation stricte des hôtes Blob                        |
| Callback Blob traité comme une requête nécessitant un cookie navigateur                             | Vérification du callback signé par le SDK ; authentification maintenue pour la génération des tokens                           |
| Resend instancié au chargement du module, même sans clé                                             | Initialisation au moment de l’envoi et réponse 503 explicite si non configuré                                                  |
| `next lint` obsolète                                                                                | Migration avec le codemod officiel vers ESLint et sa configuration native                                                      |
| Changement d’API `revalidateTag`                                                                    | Invalidation immédiate explicite après sauvegarde des sections d’accueil                                                       |
| Changements Zod 4 (`issues`, messages et valeurs par défaut dans les mises à jour partielles)       | Adaptation des erreurs et protection contre l’effacement involontaire des vidéos/logiciels                                     |
| Extensions Link/Underline chargées deux fois avec Tiptap 3                                          | Désactivation de leur doublon dans StarterKit ; synchronisation externe sans boucle `onUpdate`                                 |
| Synchronisations d’état React redondantes                                                           | Réinitialisation des formulaires par clé, suppression des écrans de chargement artificiels, filtre/pagination dérivés de l’URL |
| Titre du showreel fixé à 2025 malgré le champ éditable                                              | Affichage du titre stocké en base                                                                                              |
| Paramètres SEO/images incomplets                                                                    | `metadataBase`, taille du logo et gestion des deux WebP animés fournis avec le site                                            |
| Aucun test automatisé ni chaîne de vérification                                                     | Tests unitaires, intégration locale et workflow GitHub Actions                                                                 |

Prettier est désormais configuré et appliqué au code et à la documentation du projet. Cela explique les changements de présentation dans des fichiers sans changement fonctionnel. Les ressources BMAD, les médias et le lockfile ne sont pas reformatés.

## Versions retenues

| Composant                        | Version du clone (lockfile ou manifeste) | Version retenue |
| -------------------------------- | ---------------------------------------- | --------------- |
| Next.js / eslint-config-next     | 15.3.8                                   | 16.3.5          |
| React / React DOM                | 19.1.1                                   | 19.3.0          |
| Prisma CLI / client / adapter-pg | 7.3.0                                    | 7.10.0, alignés |
| Better Auth                      | 1.3.12                                   | 1.7.5           |
| Tiptap                           | 3.16.0                                   | 3.31.3, alignés |
| Vercel Blob                      | 0.27.3                                   | 2.8.0           |
| Resend                           | 6.1.x                                    | 6.28.1          |
| React Email render               | 1.3.1                                    | 2.1.0           |
| Zod                              | 3.x                                      | 4.6.5           |
| Tailwind CSS / PostCSS plugin    | 4.x                                      | 4.3.3           |
| pg                               | 8.17.2                                   | 8.23.0          |
| TypeScript                       | 5.9.2                                    | 5.9.3           |
| ESLint                           | 9.x                                      | 9.39.5          |
| Prettier / plugin Tailwind       | 3.5.x / 0.6.x                            | 3.9.8 / 0.8.1   |

Les dépendances directes sont fixées à des versions exactes et leurs résolutions transitives sont enregistrées dans `pnpm-lock.yaml`. `bcryptjs`, ses anciens types, les types DOMPurify redondants, `@eslint/eslintrc` direct et `@react-email/components` inutilisé ont été retirés. Prisma CLI est une dépendance de développement. `isomorphic-dompurify` remplace l’usage direct de DOMPurify pour sécuriser aussi le rendu serveur.

Choix de compatibilité :

- Node 22 est déjà installé et satisfait les prérequis. Les autres projets et la configuration globale du shell n’ont pas été modifiés. Colima, déjà installé, a été démarré.
- Prisma 8 est une **release candidate** dans le registre au moment de l’intervention. La série stable 7.10.0 est retenue.
- TypeScript 7 dépasse la plage déclarée par `typescript-eslint` (`<6.1.0`). La série 5.9 est conservée pour cette remise en état.
- **ESLint 9 est en fin de support depuis le 6 août 2026.** Il est conservé temporairement parce que `eslint-plugin-react@7.37.5`, utilisé par la configuration Next.js, ne déclare pas la compatibilité avec ESLint 10. L’audit de sécurité actuel est propre, mais cela ne remplace pas la maintenance : migrer cet ensemble lorsque ses plugins seront compatibles.
- pnpm reste en version 10 pour conserver le format de verrou et la politique de scripts maîtrisés ; sa version est fixée par projet.

## Audit des dépendances

L’audit initial du lockfile remontait **184 alertes** : 5 critiques, 74 élevées, 92 modérées et 13 faibles. Ce comptage correspond aux avis du registre et ne démontre pas que chaque problème était exploitable dans cette application.

Après renouvellement des résolutions transitives, `pnpm audit` retourne **0 alerte connue**. Trois contraintes ciblées sont documentées dans `package.json` : `@prisma/config > deepmerge-ts` en 8.0.0, `prisma > mysql2` en version corrigée 3.x et `better-auth > defu` en version corrigée 6.x. L’usage de `deepmerge` par le chargeur de configuration Prisma a été inspecté ; génération, validation, migrations et build passent avec cette contrainte. Ces overrides seront à réévaluer lors d’une prochaine mise à jour des paquets parents.

## Vérifications

- Installation reproductible avec `pnpm install --frozen-lockfile`.
- Génération Prisma sans `DATABASE_URL` et sans charger `.env`, pour valider l’installation avant le setup.
- PostgreSQL Docker sain, migrations appliquées, seed des quatre sections et création de l’administrateur local.
- `prisma validate` et comparaison entre la base migrée et le schéma : **aucune différence**.
- `pnpm check` : ESLint sans erreur ni avertissement, TypeScript strict et six tests unitaires réussis.
- Tests unitaires : mises à jour partielles non destructives, validation des données par défaut, HTML nettoyé côté serveur, conservation des liens sûrs et rendu des deux emails sans envoi.
- Test d’intégration réussi en développement **et sur le serveur de production local** : refus des écritures anonymes, inscription publique refusée, connexion/session/déconnexion, CRUD des projets et du slider, validation, persistance d’une section temporaire, pages publiques et statut du service email absent.
- Compilation optimisée avec Next.js 16 et Turbopack réussie.
- Navigateur : accueil affiché sur ordinateur et en format mobile, connexion administrateur, formulaire de création et saisie dans l’éditeur Tiptap vérifiés ; les quatre formulaires de contenu d’accueil se chargent. Aucun échec JavaScript remonté par le navigateur pendant ces parcours.
- Relance du setup, du seed et de la création de compte : configuration et contenu conservés. Après nettoyage des tests : un administrateur, quatre sections, aucun projet ou média de test.
- Routes de debug : 401 sans connexion en développement, 404 en production.
- Fichiers `.env` et identifiants locaux en permissions 600, dossier `.local` en 700, tous exclus de Git.

La CI est préparée pour rejouer ces contrôles avec PostgreSQL et le serveur de production. Elle n’a pas été exécutée sur GitHub, puisqu’aucun changement n’a été poussé.

## Limites et suite recommandée

1. **Données de production absentes du clone.** Les projets et le slider sont vides localement ; ce n’est pas une erreur de migration. Une restauration nécessite un export explicite de la base distante.
2. **Clés Blob et Resend absentes.** Les envois réels et les uploads/suppressions distants ne sont pas testés. Les templates email sont rendus localement et la gestion des clés manquantes est vérifiée. Ne pas tester des suppressions avec un token de production.
3. **Historique de migrations à contrôler avant production.** La migration historique de septembre 2025 supprime `projects` puis crée `projects_v2`. Elle n’a pas été réécrite. Une base existante peut également contenir des tables ajoutées manuellement sans migration ; comparer son historique et son schéma avant tout déploiement.
4. **Comptes tous administrateurs.** L’inscription publique est fermée, mais une installation ayant déjà eu des inscriptions ouvertes doit contrôler sa liste de comptes. Si l’ancien secret d’exemple a été utilisé en production, le remplacer dans cet environnement.
5. **Contact à renforcer avant exposition prolongée.** Le honeypot est côté client ; l’API n’a pas de limitation de débit dédiée. La confirmation client et la notification propriétaire sont deux envois distincts et leur stratégie d’échec mérite une amélioration dédiée.
6. **Cache et médias.** Les fiches projets peuvent conserver leur version précédente jusqu’à la revalidation de 300 secondes. Les métadonnées de la liste et le sitemap sont pré-rendus ; une invalidation explicite lors des CRUD serait utile. Les médias de showreel par défaut restent des ressources distantes.
7. **Mesures non réalisées.** Pas d’audit Lighthouse/WCAG exhaustif, de test de charge, de compatibilité multi-navigateur ou de test de déploiement distant. Le README n’affirme plus une conformité AAA ou des scores de performance non mesurés.

## Références utilisées

- [Migration officielle Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16) et documentation correspondant à la version installée dans `node_modules/next/dist/docs/`.
- [Migration Zod 4](https://zod.dev/v4/changelog).
- [Better Auth — email et mot de passe](https://better-auth.com/docs/authentication/email-password).
- [Vercel Blob SDK](https://vercel.com/docs/vercel-blob/using-blob-sdk).
- [Versions maintenues d’ESLint](https://eslint.org/version-support/).
- Métadonnées et avis de sécurité du registre npm, ainsi que code des dépendances installées.
