import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx scripts/seed-home-content.ts',
  },
  datasource: {
    // Client generation must also work before local setup or in CI.
    url: process.env.DATABASE_URL ?? '',
  },
});
