import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    // All accounts can administer the portfolio; provision them via the CLI.
    disableSignUp: true,
    requireEmailVerification: false, // Désactiver la vérification email pour simplifier
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'),
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_BRANCH_URL
      ? [`https://${process.env.VERCEL_BRANCH_URL}`]
      : []),
  ],
});
