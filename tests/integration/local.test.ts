import 'dotenv/config';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import { hashPassword } from 'better-auth/crypto';
import prisma from '../../src/lib/prisma';
import { DEFAULT_CTA_CONTENT } from '../../src/lib/defaults/home-defaults';

const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const isLocal = (url: string) =>
  ['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname);

test('local portfolio: authentication, CRUD, validation, and homepage persistence', async (t) => {
  assert.ok(isLocal(baseURL), 'Integration tests only run against localhost.');
  assert.ok(
    isLocal(process.env.DATABASE_URL || ''),
    'Integration tests require a local database.'
  );
  t.after(() => prisma.$disconnect());
  const email = `test-${randomUUID()}@localhost.test`;
  const password = randomBytes(24).toString('base64url');
  const userId = randomUUID();
  await prisma.user.create({
    data: {
      id: userId,
      email,
      name: 'Integration test',
      accounts: {
        create: {
          id: randomUUID(),
          accountId: userId,
          providerId: 'credential',
          password: await hashPassword(password),
        },
      },
    },
  });
  const projectIds: number[] = [];
  const sliderIds: number[] = [];
  let cookie = '';
  const request = (
    path: string,
    method = 'GET',
    body?: unknown,
    authenticated = false
  ) =>
    fetch(new URL(path, baseURL), {
      method,
      headers: {
        'Content-Type': 'application/json',
        Origin: baseURL,
        ...(authenticated ? { Cookie: cookie } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });

  try {
    for (const [path, method] of [
      ['/api/projects', 'POST'],
      ['/api/projects/new', 'POST'],
      ['/api/projects/1', 'PUT'],
      ['/api/projects/1', 'DELETE'],
      ['/api/slider-media', 'POST'],
      ['/api/slider-media/1', 'PUT'],
      ['/api/slider-media/1', 'DELETE'],
      ['/api/page-content/hero', 'PUT'],
      ['/api/blob/upload', 'POST'],
      ['/api/blob/delete', 'POST'],
    ]) {
      assert.equal(
        (await request(path, method, {})).status,
        401,
        `${method} ${path}`
      );
    }
    const signup = await request('/api/auth/sign-up/email', 'POST', {
      email: 'forbidden@localhost.test',
      password,
      name: 'Forbidden',
    });
    assert.ok(
      [400, 403, 404].includes(signup.status),
      `Public signup rejected: ${signup.status}`
    );
    const login = await request('/api/auth/sign-in/email', 'POST', {
      email,
      password,
    });
    assert.equal(login.status, 200);
    cookie = login.headers
      .getSetCookie()
      .map((value) => value.split(';')[0])
      .join('; ');
    assert.ok(cookie);
    const session = await request(
      '/api/auth/get-session',
      'GET',
      undefined,
      true
    );
    assert.equal((await session.json()).user.email, email);
    for (const path of ['/api/projects', '/api/projects/new']) {
      const invalid = await request(path, 'POST', {}, true);
      assert.equal(invalid.status, 400);
      assert.ok(Array.isArray((await invalid.json()).details));
    }

    const projectData = {
      title: 'Integration test',
      category: 'Motion Design',
      date: '2026-09-20',
      description: '<p>Projet de vérification</p>',
      images: ['https://blob.vercel-storage.com/integration-test.jpg'],
      videos: [
        { type: 'youtube', url: 'https://www.youtube.com/watch?v=_4_oc9oPMwY' },
      ],
      software: ['blender'],
    };
    for (const path of ['/api/projects', '/api/projects/new']) {
      const created = await request(path, 'POST', projectData, true);
      assert.equal(created.status, 201);
      const project = await created.json();
      projectIds.push(project.id);
      const updated = await request(
        `/api/projects/${project.id}`,
        'PUT',
        { title: 'Titre modifié' },
        true
      );
      assert.equal(updated.status, 200);
      const data = await updated.json();
      assert.deepEqual(data.videos, projectData.videos);
      assert.deepEqual(data.software, projectData.software);
      assert.equal((await request(`/realisations/${project.id}`)).status, 200);
      assert.equal(
        (
          await request(
            `/api/projects/${project.id}`,
            'DELETE',
            undefined,
            true
          )
        ).status,
        200
      );
    }

    const media = await request(
      '/api/slider-media',
      'POST',
      {
        title: 'Integration test',
        mediaUrl: 'https://blob.vercel-storage.com/integration-test.jpg',
        mediaType: 'image',
      },
      true
    );
    assert.equal(media.status, 201);
    const slider = await media.json();
    sliderIds.push(slider.id);
    assert.equal(
      (
        await request(
          `/api/slider-media/${slider.id}`,
          'PUT',
          { title: 'Titre modifié' },
          true
        )
      ).status,
      200
    );
    assert.equal(
      (
        await request(
          `/api/slider-media/${slider.id}`,
          'DELETE',
          undefined,
          true
        )
      ).status,
      200
    );

    // A separate page keeps the real homepage content untouched.
    const testPage = `integration-${userId}`;
    try {
      const content = await request(
        '/api/page-content/cta',
        'PUT',
        { page: testPage, content: DEFAULT_CTA_CONTENT },
        true
      );
      assert.equal(content.status, 200);
      const stored = await prisma.pageContent.findUnique({
        where: { page_section: { page: testPage, section: 'cta' } },
      });
      assert.deepEqual(stored?.content, DEFAULT_CTA_CONTENT);
    } finally {
      await prisma.pageContent.deleteMany({ where: { page: testPage } });
    }

    assert.equal((await request('/api/send', 'POST', {})).status, 400);
    if (!process.env.RESEND_API_KEY) {
      assert.equal(
        (
          await request('/api/send', 'POST', {
            fullName: 'Test',
            email,
            subject: 'Test',
            message: 'Un message de test valide.',
          })
        ).status,
        503
      );
    }
    for (const path of [
      '/',
      '/about',
      '/contact',
      '/realisations',
      '/admin/login',
      '/sitemap.xml',
      '/robots.txt',
    ]) {
      assert.equal((await request(path)).status, 200, path);
    }
    assert.equal(
      (await request('/api/auth/sign-out', 'POST', {}, true)).status,
      200
    );
    assert.equal(
      (await request('/api/projects', 'POST', {}, true)).status,
      401,
      'Session revoked on sign-out'
    );
  } finally {
    await prisma.project.deleteMany({ where: { id: { in: projectIds } } });
    await prisma.sliderMedia.deleteMany({ where: { id: { in: sliderIds } } });
    await prisma.user.delete({ where: { id: userId } });
  }
});
