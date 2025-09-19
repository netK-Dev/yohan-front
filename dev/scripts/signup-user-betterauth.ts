#!/usr/bin/env tsx
/**
 * Script pour créer un utilisateur via l'API Better Auth (méthode recommandée)
 * Usage: npx tsx scripts/signup-user-betterauth.ts [email] [password] [name]
 */

async function signupUser() {
  const args = process.argv.slice(2);

  const email = args[0] || 'flyaxe709@gmail.com';
  const password = args[1] || 'admin-dev-4ccf98tj4';
  const name = args[2] || 'AdminDev';

  console.log(`🚀 Inscription via Better Auth API...`);
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Nom: ${name}`);
  console.log(`🔒 Mot de passe: ${password}`);
  console.log('---');

  try {
    // Utiliser fetch pour appeler l'API Better Auth directement
    const response = await fetch(
      'http://localhost:3000/api/auth/sign-up/email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Utilisateur créé avec succès via Better Auth!');
      console.log('📋 Résultat:', result);
      console.log('');
      console.log('🔑 Vous pouvez maintenant vous connecter sur /admin/login');
    } else {
      const error = await response.json();
      console.error("❌ Erreur lors de l'inscription:");
      console.error('   Status:', response.status);
      console.error('   Erreur:', error);

      if (error.message?.includes('already exists')) {
        console.log('');
        console.log(
          "💡 L'utilisateur existe déjà. Essayez de vous connecter directement."
        );
      }
    }
  } catch (error: any) {
    console.error("❌ Erreur de connexion à l'API:", error.message);
    console.log('');
    console.log(
      '💡 Assurez-vous que le serveur de développement est lancé (npm run dev)'
    );
  }
}

// Afficher l'aide si demandé
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
📖 Script d'inscription utilisateur via Better Auth API

Usage:
  npx tsx scripts/signup-user-betterauth.ts [email] [password] [name]

Prérequis:
  - Le serveur de développement doit être lancé (npm run dev)

Arguments:
  email     - Email de l'utilisateur (défaut: flyaxe709@gmail.com)
  password  - Mot de passe (défaut: admin-dev-4ccf98tj4)
  name      - Nom d'affichage (défaut: AdminDev)

Exemples:
  npx tsx scripts/signup-user-betterauth.ts
  npx tsx scripts/signup-user-betterauth.ts user@example.com password123 "User Name"

Options:
  --help, -h    Afficher cette aide
`);
  process.exit(0);
}

signupUser();
