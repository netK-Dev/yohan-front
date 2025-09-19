import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur admin par défaut
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yohan.dev' },
    update: {},
    create: {
      email: 'admin@yohan.dev',
      name: 'Admin Yohan',
      emailVerified: new Date(),
    },
  });

  console.log('Utilisateur admin créé:', admin);

  // Créer le compte d'authentification (provider credential) avec mot de passe hashé si absent
  const existingCredential = await prisma.account.findFirst({
    where: {
      userId: admin.id,
      providerId: 'credential',
    },
  });

  if (!existingCredential) {
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.account.create({
      data: {
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        accountId: admin.email, // identifiant du compte côté provider "credential"
        providerId: 'credential',
        userId: admin.id,
        password: hashedPassword,
      },
    });

    console.log(
      `Compte d'authentification créé pour ${admin.email} (provider: credential)`
    );
  } else {
    console.log('Compte credential déjà présent pour cet utilisateur.');
  }

  // Créer quelques projets de test
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        title: 'Intro FX Neon',
        date: new Date('2024-01-15'),
        description:
          "Création d'une intro avec des effets néon en 3D et VFX avancés",
        image: '/img/services/00a4567a-5ad4-4fcc-b13c-a9b9601849a5.webp',
        skill: '3D, VFX, After Effects',
        link: 'https://example.com/neon-fx',
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        title: 'Packshot Produit X',
        date: new Date('2024-02-20'),
        description:
          'Motion design pour présentation produit avec animations fluides',
        image: '/img/services/basement-doens-yohan-combo-07.webp',
        skill: 'Motion Design, Cinema 4D',
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-3' },
      update: {},
      create: {
        id: 'project-3',
        title: 'Court Métrage - Lueur',
        date: new Date('2024-03-10'),
        description:
          'Court métrage artistique avec direction photo et montage créatif',
        image: '/img/services/Hnet-image.webp',
        video: 'https://example.com/lueur-trailer.mp4',
        skill: 'Réalisation, Montage, Color Grading',
        link: 'https://example.com/lueur',
      },
    }),
  ]);

  console.log('Projets créés:', projects.length);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
