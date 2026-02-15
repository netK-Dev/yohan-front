/**
 * Script de migration : seed le contenu de la page d'accueil en base de données.
 *
 * Usage :
 *   npx tsx scripts/seed-home-content.ts           # upsert sans écraser les données existantes
 *   npx tsx scripts/seed-home-content.ts --force    # force le reset aux valeurs par défaut
 *
 * Ce script est idempotent : il peut être relancé sans risque.
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Valeurs par défaut (identiques à src/lib/defaults/home-defaults.ts)
// Dupliquées ici pour éviter les problèmes d'alias de chemins avec tsx
const DEFAULT_HERO_CONTENT = {
  badge: 'Portfolio 3D & VFX',
  title: 'Créateur de',
  titleHighlight: 'Mondes Visuels',
  subtitle: 'Spécialisé en 3D/VFX, Motion Design et Courts Métrages',
  description:
    "Bienvenue dans l'univers de Doens Production, où la créativité rencontre la technologie pour donner vie à vos projets les plus ambitieux.",
  ctaPrimaryText: 'Découvrir mes créations',
  ctaSecondaryText: 'Me contacter',
  stats: [
    { value: '50+', label: 'Projets' },
    { value: '5', label: 'Années' },
    { value: '100%', label: 'Passion' },
  ],
};

const DEFAULT_SERVICES_CONTENT = {
  badge: 'Nos Expertises',
  title: 'Domaines de',
  titleHighlight: 'Création',
  subtitle:
    "Découvrez l'univers créatif de Doens Production, où technique et artistique se rencontrent pour donner vie à vos projets.",
  services: [
    {
      title: '3D/VFX et Compositing',
      description:
        'Formation spécialisée à ISART Digital avec maîtrise complète du pipeline 3D : modeling, shading, rigging, animation, rendering et compositing. Expertise technique approfondie pour donner vie à vos projets les plus ambitieux.',
      tags: ['3D Modeling', 'VFX', 'Compositing', 'Rendering'],
      image: '/img/services/basement-doens-yohan-combo-07.webp',
      categorySlug: '3d-vfx',
    },
    {
      title: 'Motion Design',
      description:
        "Création graphique animée avec maîtrise experte d'Illustrator, Photoshop et After Effects. Développement continu de styles variés et d'approches innovantes pour des visuels percutants et mémorables.",
      tags: ['After Effects', 'Illustration', 'Animation', 'Branding'],
      image: '/img/services/Hnet-image.webp',
      categorySlug: 'motion-design',
    },
    {
      title: 'Court Métrage',
      description:
        "Expertise complète en production audiovisuelle : réalisation, développement scénaristique et montage créatif. Transformation d'idées en récits visuels captivants avec une approche artistique et technique maîtrisée.",
      tags: ['Réalisation', 'Scénario', 'Montage', 'Storytelling'],
      image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
      categorySlug: 'court-metrage',
    },
  ],
};

const DEFAULT_CTA_CONTENT = {
  title: 'Prêt à donner vie à',
  titleHighlight: 'votre vision',
  titleSuffix: '?',
  subtitle: "Collaborons pour créer quelque chose d'exceptionnel ensemble.",
  ctaText: 'Démarrer un projet',
};

const SECTIONS = [
  { section: 'hero', content: DEFAULT_HERO_CONTENT },
  { section: 'services', content: DEFAULT_SERVICES_CONTENT },
  { section: 'cta', content: DEFAULT_CTA_CONTENT },
] as const;

async function main() {
  const forceReset = process.argv.includes('--force');

  console.log('🔧 Seed du contenu de la page d\'accueil');
  console.log(`   Mode : ${forceReset ? 'FORCE (écrase les données existantes)' : 'SAFE (ne touche pas aux données existantes)'}`);
  console.log('');

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    for (const { section, content } of SECTIONS) {
      if (forceReset) {
        // Mode --force : écrase toujours
        await prisma.pageContent.upsert({
          where: { page_section: { page: 'home', section } },
          update: { content: content as object },
          create: { page: 'home', section, content: content as object },
        });
        console.log(`   ✅ [${section}] Contenu écrasé avec les valeurs par défaut`);
      } else {
        // Mode safe : ne crée que si la section n'existe pas
        const existing = await prisma.pageContent.findUnique({
          where: { page_section: { page: 'home', section } },
        });

        if (existing) {
          console.log(`   ⏭️  [${section}] Déjà en base, ignoré (utiliser --force pour écraser)`);
        } else {
          await prisma.pageContent.create({
            data: { page: 'home', section, content: content as object },
          });
          console.log(`   ✅ [${section}] Contenu inséré avec succès`);
        }
      }
    }

    console.log('');
    console.log('✅ Seed terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
