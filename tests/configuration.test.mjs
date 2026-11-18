import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const vercel = JSON.parse(read('vercel.json'));
const csp = vercel.headers
  .flatMap((headerGroup) => headerGroup.headers || [])
  .find((header) => header.key === 'Content-Security-Policy')?.value || '';

test('production CSP matches the actual dependency graph', () => {
  assert.ok(csp.includes("connect-src 'self' https://bjczjzddhoyadhbwhhgo.supabase.co"), 'Supabase origin must be allowed');
  assert.ok(csp.includes("script-src 'self'"), 'local scripts must be allowed');
  assert.doesNotMatch(csp, /cdn\.jsdelivr/i);
  assert.doesNotMatch(csp, /cdn\.tailwindcss/i);
  assert.doesNotMatch(csp, /api\.web3forms/i);
  assert.doesNotMatch(csp, /translate\.google/i);
});

test('public configuration is centralised', () => {
  const config = read('assets/js/config.js');
  const api = read('assets/js/api.js');

  assert.match(config, /window\.AZERTY_CONFIG\s*=/);
  assert.match(config, /SUPABASE_URL:/);
  assert.match(config, /SUPABASE_PUBLISHABLE_KEY:/);
  assert.match(config, /SUPABASE_CLIENT_SRC:\s*'\/assets\/vendor\/supabase-js-2\.119\.1\.js'/);
  assert.doesNotMatch(api, /bjczjzddhoyadhbwhhgo\.supabase\.co/);
  assert.doesNotMatch(api, /sb_publishable_/);
  assert.doesNotMatch(api, /cdn\.jsdelivr/);
  assert.ok(fs.existsSync(path.join(root, 'assets/vendor/supabase-js-2.119.1.js')));
  assert.ok(fs.existsSync(path.join(root, 'assets/vendor/SUPABASE_LICENSE.txt')));
  assert.match(read('.gitignore'), /^!assets\/vendor\/$/m, 'vendor dependency must not be gitignored');
});

test('public configuration loads before API and site scripts on every page', () => {
  const files = fs.readdirSync(root).filter((file) =>
    file.endsWith('.html') && file !== 'content-engine.html' && file !== '404.html'
  );

  for (const file of files) {
    const html = read(file);
    const config = html.indexOf('assets/js/config.js');
    const api = html.indexOf('assets/js/api.js');
    const site = html.indexOf('assets/js/site.js');

    assert.ok(config > -1, `${file} is missing config.js`);
    assert.ok(config < api, `${file} must load config.js before api.js`);
    assert.ok(config < site, `${file} must load config.js before site.js`);
  }
});

test('content engine is excluded from production', () => {
  const vercelignore = read('.vercelignore');
  const robots = read('robots.txt');

  assert.match(vercelignore, /content-engine\.html/);
  assert.match(vercelignore, /content-engine\.js/);
  assert.match(robots, /Disallow:\s*\/content-engine\.html/);
  assert.match(robots, /Disallow:\s*\/content-engine\.js/);
});

test('branded 404 page exists', () => {
  const notFound = read('404.html');
  assert.match(notFound, /<title>Page introuvable \| AZERTYCORP<\/title>/);
  assert.match(notFound, /BUILD\. DESIGN\. TRANSFORM\./);
  assert.match(notFound, /href="index\.html"/);
});
