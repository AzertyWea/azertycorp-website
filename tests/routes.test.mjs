import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const vercel = JSON.parse(read('vercel.json'));
const rewrites = vercel.rewrites || [];

test('every rewrite destination exists', () => {
  for (const rewrite of rewrites) {
    const destination = rewrite.destination.replace(/^\//, '');
    assert.ok(fs.existsSync(path.join(root, destination)), `${rewrite.source} -> ${rewrite.destination} is missing`);
  }
});

test('sitemap URLs point only to known routes and exclude the content engine', () => {
  const sitemap = read('sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const known = new Set(['/', ...rewrites.map((item) => item.source)]);

  assert.ok(locations.includes('/'));
  for (const location of locations) {
    assert.ok(known.has(location), `unexpected sitemap URL: ${location}`);
    assert.doesNotMatch(location, /content-engine/i);
  }
});

test('all local asset and page references resolve', () => {
  const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html') && file !== 'content-engine.html');
  const references = [];

  for (const file of htmlFiles) {
    const html = read(file);
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const raw = match[1];
      if (!raw || /^(?:https?:|mailto:|tel:|data:|#)/i.test(raw)) continue;
      let clean = raw.split('#')[0].split('?')[0];
      if (!clean || clean.startsWith('//')) continue;
      if (/content-engine/i.test(clean)) continue;
      if (clean.startsWith('/')) {
        const rewrite = rewrites.find((item) => item.source === clean);
        clean = (rewrite ? rewrite.destination : clean).replace(/^\//, '');
      }
      references.push({ file, clean });
    }
  }

  for (const reference of references) {
    const target = path.join(root, reference.clean.replace(/^\//, ''));
    assert.ok(fs.existsSync(target), `${reference.file} references missing file: ${reference.clean}`);
  }
  assert.ok(references.length > 100, 'expected a meaningful set of local references');
});

test('custom 404 is available as a local page', () => {
  assert.ok(fs.existsSync(path.join(root, '404.html')));
});
