import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixture = resolve(root, 'test/fixtures/markdown-site');
const astro = resolve(root, 'node_modules/astro/bin/astro.mjs');

test('Astro 7 builds Markdown embed blocks as safe static link cards', () => {
  execFileSync(process.execPath, [astro, 'build', '--root', fixture], {
    cwd: root,
    stdio: 'inherit',
  });

  const html = readFileSync(resolve(fixture, 'dist/index.html'), 'utf8');

  assert.match(html, /<p>existing-plugin-output<\/p>/);
  assert.match(html, /<article class="astro-link-embed">/);
  assert.match(html, /class="astro-link-embed__link" href="https:\/\/example\.com\/article\?title=%3Cbad%3E(?:&amp;|&#x26;)quote=%22yes%22" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /class="astro-link-embed__image" src="https:\/\/images\.example\.com\/card\.png\?label=%3Cbad%3E"/);
  assert.match(html, /<h3 class="astro-link-embed__title">A (?:&lt;|&#x3C;)script>alert\("x"\)(?:&lt;|&#x3C;)\/script> (?:&amp;|&#x26;) "quote"<\/h3>/);
  assert.match(html, /<p class="astro-link-embed__description">A (?:&lt;|&#x3C;)strong>description(?:&lt;|&#x3C;)\/strong> (?:&amp;|&#x26;) "quote"<\/p>/);
  assert.doesNotMatch(html, /javascript:|data:image|<embed\b/i);
  assert.equal((html.match(/<a class="astro-link-embed__link"/g) ?? []).length, 1);
});
