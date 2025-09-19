#!/usr/bin/env tsx
/**
 * Script pour créer un nouvel utilisateur admin
 * Usage: npx tsx scripts/create-user.ts [email] [password] [name]
 *
 * Exemples:
 * npx tsx scripts/create-user.ts admin@yohan.dev admin123 "Admin Yohan"
 * npx tsx scripts/create-user.ts user@example.com password123
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser() {
  const args = process.argv.slice(2);

  // Paramètres par défaut ou depuis les arguments
  const email = args[0] || 'admin@yohan.dev';
  const password = args[1] || 'admin123';
  const name = args[2] || 'Admin User';

  console.log(`🚀 Création d'un nouvel utilisateur...`);
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Nom: ${name}`);
  console.log(`🔒 Mot de passe: ${password}`);
  console.log('---');

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(
        '❌ Cet email est déjà utilisé. Choisissez un autre email.'
      );
      process.exit(1);
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Générer un ID unique
    const userId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        emailVerified: new Date(),
      },
    });

    // Créer un compte associé avec le mot de passe hashé
    await prisma.account.create({
      data: {
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        accountId: email,
        providerId: 'credential',
        userId: user.id,
        password: hashedPassword,
      },
    });

    console.log('✅ Utilisateur créé avec succès!');
    console.log('📋 Détails:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nom: ${user.name}`);
    console.log(`   Créé le: ${user.createdAt}`);
    console.log('');
    console.log('🔑 Vous pouvez maintenant vous connecter sur /admin/login');
  } catch (error: any) {
    console.error("❌ Erreur lors de la création de l'utilisateur:");
    console.error('   ', error.message || error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Afficher l'aide si demandé
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
📖 Script de création d'utilisateur Better Auth

Usage:
  npx tsx scripts/create-user.ts [email] [password] [name]

Arguments:
  email     - Email de l'utilisateur (défaut: admin@yohan.dev)
  password  - Mot de passe (défaut: admin123)
  name      - Nom d'affichage (défaut: Admin User)

Exemples:
  npx tsx scripts/create-user.ts
  npx tsx scripts/create-user.ts admin@yohan.dev admin123 "Admin Yohan"
  npx tsx scripts/create-user.ts user@example.com password123
  npx tsx scripts/create-user.ts client@company.com securepass "Client Name"

Options:
  --help, -h    Afficher cette aide
`);
  process.exit(0);
}

createUser();
