import assert from 'node:assert/strict';
import test from 'node:test';
import { getEmbedUrl } from '../src/lib/types/video';

test('YouTube watch, short, live and embed URLs keep the same playable video', () => {
  const id = '_4_oc9oPMwY';
  for (const url of [
    `https://www.youtube.com/watch?v=${id}&t=10`,
    `https://youtu.be/${id}?si=example`,
    `https://youtube.com/shorts/${id}`,
    `https://youtube.com/live/${id}`,
    `https://youtube.com/embed/${id}?autoplay=1`,
  ])
    assert.equal(getEmbedUrl(url), `https://www.youtube.com/embed/${id}`);
  assert.equal(
    getEmbedUrl(`https://youtube-nocookie.com/embed/${id}?autoplay=1`),
    `https://www.youtube-nocookie.com/embed/${id}`
  );
});

test('Vimeo links and embeds preserve the private playback hash without autoplay', () => {
  for (const url of [
    'https://vimeo.com/123456789/abcdef0123',
    'https://player.vimeo.com/video/123456789?h=abcdef0123&autoplay=1',
  ])
    assert.equal(
      getEmbedUrl(url),
      'https://player.vimeo.com/video/123456789?h=abcdef0123'
    );
});

test('known mobile and music YouTube aliases use canonical embeds without autoplay', () => {
  const id = '_4_oc9oPMwY';
  for (const host of ['m.youtube.com', 'music.youtube.com']) {
    for (const path of [
      `/watch?v=${id}&autoplay=1`,
      `/shorts/${id}?autoplay=1`,
      `/live/${id}?autoplay=1`,
      `/embed/${id}?autoplay=1`,
    ])
      assert.equal(
        getEmbedUrl(`https://${host}${path}`),
        `https://www.youtube.com/embed/${id}`
      );
  }
});

test('unsupported hosts, protocols and invalid video IDs cannot be published as playable embeds', () => {
  for (const url of [
    'https://example.com/video',
    'https://youtube.com.example.com/watch?v=_4_oc9oPMwY',
    'https://m.youtube.com.example.com/watch?v=_4_oc9oPMwY',
    'https://music.youtube.com.example.com/watch?v=_4_oc9oPMwY',
    'https://other.youtube.com/watch?v=_4_oc9oPMwY',
    'ftp://youtube.com/watch?v=_4_oc9oPMwY',
    'ftp://m.youtube.com/watch?v=_4_oc9oPMwY',
    'https://youtube.com/watch?v=invalid',
    'https://music.youtube.com/watch?v=invalid',
    'https://vimeo.com/channels',
    'javascript:alert(1)',
  ])
    assert.equal(getEmbedUrl(url), null);
});
