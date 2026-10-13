import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

if (existsSync('.env')) {
  console.log('.env existe déjà : configuration conservée.');
} else {
  const password = randomBytes(24).toString('hex');
  const secret = randomBytes(32).toString('hex');
  const template = readFileSync('.env.example', 'utf8');
  writeFileSync(
    '.env',
    template
      .replaceAll('GENERATED_DATABASE_PASSWORD', password)
      .replace('GENERATED_AUTH_SECRET', secret),
    { mode: 0o600, flag: 'wx' }
  );
  console.log('.env créé avec des secrets locaux aléatoires.');
}
console.log(
  'Suite : pnpm db:up && pnpm db:migrate && pnpm db:seed && pnpm admin:create'
);
