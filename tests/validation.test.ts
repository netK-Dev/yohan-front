import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from '../src/lib/types/project';
import { SECTION_SCHEMAS } from '../src/lib/types/page-content';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SHOWREEL_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_CTA_CONTENT,
} from '../src/lib/defaults/home-defaults';

test('a partial project update preserves omitted video and software fields', () => {
  assert.deepEqual(
    UpdateProjectSchema.parse({ id: 1, title: 'Titre modifié' }),
    {
      id: 1,
      title: 'Titre modifié',
    }
  );
  assert.deepEqual(
    UpdateProjectSchema.parse({ id: 1, videos: [], software: [] }),
    {
      id: 1,
      videos: [],
      software: [],
    }
  );
});

test('project creation retains defaults and French validation errors', () => {
  const project = CreateProjectSchema.parse({
    title: 'Test',
    category: 'Motion Design',
    date: '2026-09-20',
    description: '<p>Description</p>',
    images: ['https://example.com/image.jpg'],
  });
  assert.deepEqual(project.videos, []);
  assert.deepEqual(project.software, []);
  const invalid = CreateProjectSchema.safeParse({
    ...project,
    category: 'invalid',
  });
  assert.equal(invalid.success, false);
  if (!invalid.success)
    assert.equal(invalid.error.issues[0].message, 'Catégorie invalide');
});

test('the homepage seed remains valid for all section schemas', () => {
  const sections = {
    hero: DEFAULT_HERO_CONTENT,
    showreel: DEFAULT_SHOWREEL_CONTENT,
    services: DEFAULT_SERVICES_CONTENT,
    cta: DEFAULT_CTA_CONTENT,
  };
  for (const section of Object.keys(sections) as (keyof typeof sections)[]) {
    assert.equal(
      SECTION_SCHEMAS[section].safeParse(sections[section]).success,
      true,
      section
    );
  }
});
