import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('homepage uses the cinematic curtain showcase structure', () => {
  const html = read('index.html');

  assert.match(html, /<div class="curtain-scroll" data-curtain>/);
  assert.match(html, /<div class="curtain-sticky">/);
  assert.match(html, /class="showcase-stage story-layer story-stage"/);
  assert.match(html, /class="showcase-column showcase-column--left"/);
  assert.match(html, /class="showcase-column showcase-column--right"/);
  assert.match(html, /class="showcase-curtain" aria-hidden="true"/);
  assert.match(html, /class="text-center curtain-caption"/);

  /* Every original industry card and its real link are still present. */
  assert.equal((html.match(/class="showcase-card"/g) || []).length, 9);
  assert.equal((html.match(/href="portfolio\.html"/g) || []).length >= 10, true);
});

test('AI studio logos loop in both directions without new claims', () => {
  const html = read('index.html');

  assert.match(html, /class="ai-studio-logos ai-marquee" aria-label="AI Studio"/);
  assert.match(html, /class="ai-marquee-track"/);
  assert.equal((html.match(/class="ai-marquee-group"/g) || []).length, 2);
  assert.equal((html.match(/class="ai-marquee-group" aria-hidden="true"/g) || []).length, 1);
  for (const name of ['OpenAI', 'Anthropic', 'Midjourney', 'Hugging Face', 'TensorFlow', 'PyTorch']) {
    assert.ok(html.includes(`<span class="ai-logo">${name}</span>`), `missing ${name}`);
  }
});

test('cinematic assets are cache-busted', () => {
  const html = read('index.html');

  assert.match(html, /motion\.css\?v=20261120a/);
  assert.match(html, /motion\.js\?v=20261120a/);
});

test('cinematic CSS defines reveals, parallax, curtain and reduced-motion fallback', () => {
  const css = read('assets/css/motion.css');

  assert.match(css, /@keyframes mHeroMediaIn/);
  assert.match(css, /@keyframes mHeroWordIn/);
  assert.match(css, /prefers-reduced-motion:no-preference/);
  assert.match(css, /\.m-clip\{[^}]*clip-path:inset\(0 100% 0 0\)/);
  assert.match(css, /\.m-clip\.is-revealed\{clip-path:inset\(0 0 0 0\)\}/);
  assert.match(css, /\.m-parallax\{[^}]*translate:0 var\(--m-parallax,0px\)/);
  assert.match(css, /\.m-text\{[^}]*filter:blur\(7px\)/);
  assert.match(css, /animation:mAIMarquee 34s linear infinite reverse/);
  assert.match(css, /\.showcase-column--left\{transform:translate3d\(var\(--curtain-left,0%\),0,0\)\}/);
  assert.match(css, /\.showcase-column--right\{transform:translate3d\(var\(--curtain-right,0%\),0,0\)\}/);
  assert.match(css, /opacity:var\(--curtain-alpha,0\)/);
  assert.match(css, /@media\(max-width:1023px\)\{/);

  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion:reduce)'));
  assert.match(reduced, /\.ai-marquee-track\{animation:none !important\}/);
  assert.match(reduced, /\.m-clip\{[^}]*clip-path:none !important/);
  assert.match(reduced, /\.m-text\{[^}]*filter:none !important/);
  assert.match(reduced, /\.curtain-scroll\{height:auto !important\}/);
  assert.match(reduced, /\.showcase-curtain\{[^}]*opacity:1 !important/);
});

test('cinematic script is dependency-free, throttled and scroll-driven', () => {
  const js = read('assets/js/motion.js');

  assert.match(js, /function initCinematicMotion\(\)/);
  assert.match(js, /initCinematicMotion\(\);/);
  assert.match(js, /classList\.add\('m-clip'\)/);
  assert.match(js, /classList\.add\('m-parallax'\)/);
  assert.match(js, /classList\.add\('m-text'\)/);
  assert.match(js, /setProperty\('--m-parallax'/);
  assert.match(js, /setProperty\('--curtain-left'/);
  assert.match(js, /setProperty\('--curtain-right'/);
  assert.match(js, /setProperty\('--curtain-alpha'/);
  assert.match(js, /window\.addEventListener\('scroll', requestUpdate, \{ passive: true \}\)/);
  assert.match(js, /now - lastUpdate < 16/);

  /* Observer callbacks are augmented, not replaced, by a viewport check. */
  assert.match(js, /pendingRevealChecks/);
  assert.match(js, /function checkViewport\(\)/);
  assert.match(js, /rect\.top < vh - 8 && rect\.bottom > 8/);

  assert.doesNotMatch(js, /gsap|GSAP|ScrollTrigger|Lenis/);
  const html = read('index.html');
  assert.doesNotMatch(html, /gsap|ScrollTrigger|lenis/i);
});
