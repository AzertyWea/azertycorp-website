import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from '../scripts/static-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const routes = ['/', ...vercel.rewrites.map((item) => item.source)];
const assets = [
  '/assets/css/site.css',
  '/assets/css/motion.css',
  '/assets/js/config.js',
  '/assets/js/api.js',
  '/assets/js/site.js',
  '/assets/js/motion.js',
  '/assets/vendor/supabase-js-2.119.1.js',
  '/404.html'
];

test('all public routes and required assets are served', async (t) => {
  const server = createStaticServer({ root });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  for (const route of [...routes, ...assets]) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    assert.ok(
      response.headers.get('content-type')?.includes('text/html') ||
      response.headers.get('content-type')?.includes('javascript') ||
      response.headers.get('content-type')?.includes('css') ||
      response.headers.get('content-type')?.includes('xml'),
      `${route} has an unexpected content type`
    );
    await response.arrayBuffer();
  }
});

test('excluded content engine returns 404', async (t) => {
  const server = createStaticServer({ root });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/content-engine.html`);
  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /AZERTYCORP/);
});
