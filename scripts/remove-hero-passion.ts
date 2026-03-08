/**
 * Script de nettoyage : retire la statistique "Passion" de la section hero en base.
 *
 * Usage:
 *   npx tsx scripts/remove-hero-passion.ts
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

type JsonObject = Record<string, unknown>;

function shouldRemoveStat(label: string): boolean {
  return label.trim().toLowerCase() === 'passion';
}

function sanitizeStats(rawStats: unknown): unknown[] | null {
  if (!Array.isArray(rawStats)) return null;

  return rawStats.filter(stat => {
    if (!stat || typeof stat !== 'object' || Array.isArray(stat)) return true;

    const label = (stat as JsonObject).label;
    return typeof label !== 'string' || !shouldRemoveStat(label);
  });
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const existing = await prisma.pageContent.findUnique({
      where: { page_section: { page: 'home', section: 'hero' } },
      select: { id: true, content: true },
    });

    if (!existing) {
      console.log('Aucune section hero trouvee en base (home/hero).');
      return;
    }

    if (
      !existing.content ||
      typeof existing.content !== 'object' ||
      Array.isArray(existing.content)
    ) {
      console.log('Contenu hero invalide: aucun nettoyage applique.');
      return;
    }

    const content = existing.content as JsonObject;
    const cleanedStats = sanitizeStats(content.stats);

    if (!cleanedStats) {
      console.log('Aucun tableau stats detecte dans hero: rien a nettoyer.');
      return;
    }

    const originalCount = (content.stats as unknown[]).length;
    const removedCount = originalCount - cleanedStats.length;

    if (removedCount <= 0) {
      console.log('Aucune statistique "Passion" trouvee: base deja propre.');
      return;
    }

    if (cleanedStats.length === 0) {
      console.log(
        'Nettoyage annule: suppression totale des stats detectee (verification manuelle recommandee).'
      );
      return;
    }

    const nextContent: JsonObject = {
      ...content,
      stats: cleanedStats,
    };

    await prisma.pageContent.update({
      where: { id: existing.id },
      data: { content: nextContent as object },
    });

    console.log(
      `Nettoyage termine: ${removedCount} statistique(s) "Passion" retiree(s) de home/hero.`
    );
  } catch (error) {
    console.error('Erreur lors du nettoyage hero:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
