import assert from 'node:assert/strict';
import test from 'node:test';
import { sanitizeHtml } from '../src/lib/utils/sanitize';

test('HTML is sanitized during SSR before it reaches the browser', () => {
  const html = sanitizeHtml(
    '<p onclick="alert(1)">Texte<strong>important</strong></p><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">Lien</a>'
  );
  assert.ok(html.includes('<strong>important</strong>'));
  assert.doesNotMatch(html, /script|onclick|onerror|<img|javascript:/i);
});

test('safe editor markup and HTTPS links are preserved', () => {
  const html =
    '<h2>Titre</h2><p><a href="https://example.com" target="_blank" rel="noopener noreferrer">Lien</a></p>';
  assert.equal(sanitizeHtml(html), html);
  assert.equal(sanitizeHtml(''), '');
});
