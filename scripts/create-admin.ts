import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { hashPassword } from 'better-auth/crypto';
import prisma from '../src/lib/prisma';

async function main() {
  const database = new URL(process.env.DATABASE_URL ?? '');
  const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(
    database.hostname
  );
  const email =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() ||
    (isLocal ? 'admin@localhost.test' : '');
  const providedPassword = process.env.ADMIN_PASSWORD;

  if (!email || (!isLocal && !providedPassword)) {
    throw new Error(
      'ADMIN_EMAIL et ADMIN_PASSWORD sont requis pour une base distante.'
    );
  }
  if (await prisma.user.findUnique({ where: { email } })) {
    console.log(`Le compte ${email} existe déjà ; aucun changement.`);
    return;
  }

  const password = providedPassword || randomBytes(24).toString('base64url');
  if (password.length < 12 || password.length > 128) {
    throw new Error(
      'Le mot de passe doit contenir entre 12 et 128 caractères.'
    );
  }
  const id = randomUUID();
  await prisma.user.create({
    data: {
      id,
      email,
      name: process.env.ADMIN_NAME || 'Administrateur',
      accounts: {
        create: {
          id: randomUUID(),
          accountId: id,
          providerId: 'credential',
          password: await hashPassword(password),
        },
      },
    },
  });

  if (!providedPassword) {
    mkdirSync('.local', { recursive: true, mode: 0o700 });
    writeFileSync(
      '.local/admin-credentials.json',
      JSON.stringify({ email, password }, null, 2) + '\n',
      { mode: 0o600 }
    );
    console.log(
      'Identifiants locaux : .local/admin-credentials.json (ignoré par Git).'
    );
  }
  console.log(`Compte administrateur créé : ${email}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
