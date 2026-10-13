# Doens Production — portfolio et administration

Portfolio de Yohan Doens (3D/VFX, Motion Design et courts métrages). L’application Next.js comprend les pages publiques, une administration et les API de gestion du contenu.

## Prérequis

- **Node.js 22.23.2**, indiqué dans `.nvmrc` et `.node-version`.
- **pnpm 10.34.5**, fixé par `packageManager` dans `package.json`.
- **Docker** avec Docker Compose. Sur ce Mac, Docker utilise **Colima** : `colima start` si le moteur est arrêté.

Avec nvm : `nvm install && nvm use`. Avec Corepack : `corepack enable`, puis `pnpm --version` depuis le dépôt. Ne mélangez pas npm, Yarn et pnpm : `pnpm-lock.yaml` est le verrou de référence.

## Première installation

```bash
pnpm install --frozen-lockfile
pnpm setup:local
pnpm db:up
pnpm db:migrate
pnpm db:seed
pnpm admin:create
pnpm dev
```

Ouvrir [le site](http://localhost:3000) ou [la connexion administrateur](http://localhost:3000/admin/login).

`setup:local` crée `.env` en UTF-8 avec des secrets aléatoires et conserve un fichier existant. PostgreSQL écoute uniquement sur `127.0.0.1:5433`, dans le conteneur propre à ce projet. Les données persistent dans le volume Docker `yohan-front_postgres_data`.

`admin:create` crée, uniquement sur une base locale, le compte `admin@localhost.test` et écrit son mot de passe aléatoire dans **`.local/admin-credentials.json`**, lisible uniquement par l’utilisateur du Mac et exclu de Git. Relancer la commande ne réinitialise pas un compte existant. Des identifiants personnalisés peuvent être fournis via `ADMIN_EMAIL`, `ADMIN_PASSWORD` et `ADMIN_NAME`. Pour une base distante, email et mot de passe explicites sont obligatoires.

Les inscriptions publiques sont fermées : chaque compte provisionné est un administrateur. Le projet ne possède pas de gestion de rôles.

## Reprendre le développement

```bash
colima start       # seulement si Docker est arrêté sur ce Mac
pnpm db:up
pnpm dev
```

Pour arrêter : `Ctrl+C` dans le terminal du serveur, puis `pnpm db:down` si nécessaire. Cette commande conserve les données. **`docker compose down -v` détruit le volume : ne pas l’utiliser pour un arrêt ordinaire.**

Une base neuve contient les quatre sections de la page d’accueil ; les listes de projets et de médias sont vides. Le clone Git ne contient pas les données PostgreSQL de production. Le seed partage les valeurs par défaut de l’application et n’écrase pas les sections existantes.

## Services optionnels

| Variable                                  | Fonction                                                   |
| ----------------------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`                            | PostgreSQL utilisé par Prisma, Next.js et les scripts      |
| `POSTGRES_PASSWORD`, `POSTGRES_PORT`      | Configuration du conteneur local                           |
| `BETTER_AUTH_SECRET`                      | Signature des sessions ; secret unique par environnement   |
| `BETTER_AUTH_URL`                         | Origine de l’application, `http://localhost:3000` en local |
| `NEXT_PUBLIC_SITE_URL`                    | URL des métadonnées, du sitemap et de robots.txt           |
| `BLOB_READ_WRITE_TOKEN`                   | Upload et suppression de médias Vercel Blob                |
| `RESEND_API_KEY`                          | Envoi réel des emails du formulaire de contact             |
| `RESEND_FROM_CLIENT`, `RESEND_FROM_NOTIF` | Expéditeurs Resend sur un domaine vérifié                  |

Renseigner les clés dans `.env`, puis redémarrer Next.js. Utiliser des ressources de développement pour les essais. Sans clé Resend, l’API contact renvoie explicitement `503` après validation du formulaire ; elle ne simule pas un envoi réussi. Les médias publics existants peuvent être lus sans clé Blob, mais leur disponibilité dépend du stockage distant.

`.env` est partagé par l’application, Prisma, Docker Compose et les scripts. Éviter de dupliquer `DATABASE_URL` dans `.env.local`, qui serait prioritaire pour Next.js uniquement.

## Commandes

| Commande                             | Usage                                          |
| ------------------------------------ | ---------------------------------------------- |
| `pnpm dev`                           | Serveur local, Turbopack                       |
| `pnpm build` / `pnpm start`          | Compilation puis serveur de production         |
| `pnpm check`                         | ESLint, TypeScript et tests unitaires          |
| `pnpm test:integration`              | Parcours API sur un serveur local déjà démarré |
| `pnpm format:check` / `pnpm format`  | Vérifier / appliquer Prettier                  |
| `pnpm audit`                         | Audit des dépendances du lockfile              |
| `pnpm db:up` / `pnpm db:down`        | Démarrer / arrêter PostgreSQL local            |
| `pnpm db:generate`                   | Générer le client Prisma                       |
| `pnpm db:migrate` / `pnpm db:status` | Appliquer / consulter les migrations           |
| `pnpm db:seed`                       | Créer les sections d’accueil absentes          |
| `pnpm admin:create`                  | Provisionner un compte administrateur          |
| `pnpm db:studio`                     | Explorer la base locale                        |

Les tests d’intégration refusent une application ou une base non locale. Ils créent des données temporaires, testent la connexion, les protections, les CRUD et la validation, puis nettoient ces données. Aucun email réel n’est envoyé par ces tests.

## Architecture réelle

- `src/app/` : accueil, `/about`, `/contact`, `/realisations` et `/realisations/[id]`.
- `src/app/admin/` : connexion, dashboard projets, slider et contenu d’accueil.
- `src/app/api/` : Better Auth, projets, médias, sections de page, Blob et contact.
- `src/components/` : présentation, formulaires administrateur, éditeur Tiptap et upload.
- `src/lib/` : clients Prisma et auth, schémas Zod, hooks, SEO et valeurs par défaut.
- `prisma/` : schéma PostgreSQL et migrations versionnées.
- `scripts/` : initialisation locale, compte administrateur et seed.
- `tests/` : régressions unitaires et tests d’intégration locaux.
- `_bmad/`, `.cursor/` : ressources d’assistance au développement ; exclues des vérifications applicatives.

Prisma utilise PostgreSQL via `@prisma/adapter-pg`. Le fichier historique `prisma/dev.db` n’est pas utilisé. Les descriptions riches sont nettoyées par DOMPurify côté serveur et navigateur. Better Auth stocke les utilisateurs, comptes et sessions en base. Les données d’accueil sont mises en cache et invalidées après une modification administrateur.

## Base de données et déploiement

Créer une évolution de schéma sur la base de développement :

```bash
pnpm exec prisma migrate dev --name nom_de_la_modification
pnpm db:generate
```

La chaîne de migrations a été complétée pour une installation vierge. **Avant tout déploiement sur une base existante, comparer son schéma et son historique de migrations.** L’ancienne migration `20250926082708_rename_to_projects_v2` contient un `DROP TABLE projects` ; elle est conservée pour respecter son historique. Ne pas exécuter aveuglément cette chaîne sur une ancienne base de production, et ne pas remplacer cette vérification par `db push`.

La compilation des pages publiques consulte PostgreSQL : la base cible doit être accessible et migrée. Les secrets de production se configurent dans l’hébergeur ; les secrets locaux ne doivent jamais être réutilisés. Aucun déploiement ni changement de base distante n’est réalisé par les commandes d’installation ci-dessus.

Voir [le rapport de remise en état](docs/SETUP_AUDIT.md) pour les versions, corrections, vérifications et limites.
