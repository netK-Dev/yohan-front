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

import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_SHOWREEL_CONTENT,
  DEFAULT_CTA_CONTENT,
} from '../src/lib/defaults/home-defaults';

const SECTIONS = [
  { section: 'hero', content: DEFAULT_HERO_CONTENT },
  { section: 'showreel', content: DEFAULT_SHOWREEL_CONTENT },
  { section: 'services', content: DEFAULT_SERVICES_CONTENT },
  { section: 'cta', content: DEFAULT_CTA_CONTENT },
] as const;

async function main() {
  const forceReset = process.argv.includes('--force');

  console.log("🔧 Seed du contenu de la page d'accueil");
  console.log(
    `   Mode : ${forceReset ? 'FORCE (écrase les données existantes)' : 'SAFE (ne touche pas aux données existantes)'}`
  );
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
        console.log(
          `   ✅ [${section}] Contenu écrasé avec les valeurs par défaut`
        );
      } else {
        // Mode safe : ne crée que si la section n'existe pas
        const existing = await prisma.pageContent.findUnique({
          where: { page_section: { page: 'home', section } },
        });

        if (existing) {
          console.log(
            `   ⏭️  [${section}] Déjà en base, ignoré (utiliser --force pour écraser)`
          );
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
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
