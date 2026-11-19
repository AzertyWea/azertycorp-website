import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('homepage exposes the four-chapter scroll story rail', () => {
  const html = read('index.html');

  assert.match(html, /<div class="story-rail" data-story-rail aria-hidden="true">/);
  assert.match(html, /<span class="story-rail-progress" data-story-progress-bar><\/span>/);
  for (const chapter of ['build', 'automate', 'design', 'transform']) {
    assert.match(html, new RegExp(`data-story-step="${chapter}"`), `missing chapter ${chapter}`);
  }
});

test('homepage sections are tagged as dimensional story scenes', () => {
  const html = read('index.html');

  for (const chapter of ['build', 'automate', 'design', 'transform']) {
    assert.match(html, new RegExp(`data-story-chapter="${chapter}"`), `missing scene ${chapter}`);
  }
  assert.match(html, /class="hero" id="hero" data-story-scene/);
  assert.match(html, /class="accent-banner"[^>]*data-story-scene/);
  assert.match(html, /class="showcase-stage story-layer story-stage"/);
  assert.match(html, /class="story-bg" src=/);
  assert.match(html, /class="hero-content story-layer"/);
});

test('scroll story CSS adds depth layers and respects reduced motion', () => {
  const css = read('assets/css/site.css');

  assert.match(css, /\.story-layer\{transform:translate3d\(0,var\(--story-shift/);
  assert.match(css, /\.story-bg\{transform:translate3d\(0,var\(--story-bg-shift/);
  assert.match(css, /\.story-stage\{transform:perspective\(1000px\) rotateX\(var\(--story-tilt/);
  assert.match(css, /\.story-rail\{[^}]*z-index:800/);
  assert.match(css, /\.story-rail\.is-active\{opacity:1\}/);
  assert.match(css, /@media\(max-width:1279px\)\{\.story-rail\{display:none\}\}/);

  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion:reduce)'));
  assert.match(reduced, /\.story-rail\{display:none !important\}/);
  assert.match(reduced, /\.story-layer,\.story-bg,\.story-stage\{transform:none !important/);
});

test('scroll story script is throttled, chapter-aware and motion-safe', () => {
  const js = read('assets/js/site.js');

  assert.match(js, /function initScrollStory\(\)/);
  assert.match(js, /initScrollStory\(\);/);
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /window\.addEventListener\('scroll', requestUpdate, \{ passive: true \}\)/);
  assert.match(js, /function requestUpdate\(\)/);
  assert.match(js, /now - lastUpdate < 16/);
  assert.match(js, /setProperty\('--story-shift'/);
  assert.match(js, /setProperty\('--story-scale'/);
  assert.match(js, /setProperty\('--story-bg-shift'/);
  assert.match(js, /setProperty\('--story-tilt'/);
  assert.match(js, /data-story-step/);
});
