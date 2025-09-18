#!/usr/bin/env tsx
/**
 * Script pour supprimer un utilisateur existant
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupUser() {
  const email = process.argv[2] || 'flyaxe709@gmail.com';

  console.log(`🧹 Suppression de l'utilisateur: ${email}`);

  try {
    // Supprimer d'abord les comptes liés
    await prisma.account.deleteMany({
      where: {
        user: {
          email: email,
        },
      },
    });

    // Supprimer les sessions liées
    await prisma.session.deleteMany({
      where: {
        user: {
          email: email,
        },
      },
    });

    // Supprimer l'utilisateur
    const deletedUser = await prisma.user.deleteMany({
      where: { email: email },
    });

    if (deletedUser.count > 0) {
      console.log('✅ Utilisateur supprimé avec succès!');
      console.log(`   ${deletedUser.count} utilisateur(s) supprimé(s)`);
    } else {
      console.log('ℹ️ Aucun utilisateur trouvé avec cet email');
    }
  } catch (error: any) {
    console.error('❌ Erreur lors de la suppression:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupUser();
