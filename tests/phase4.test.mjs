import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const allPages = fs.readdirSync(root).filter((file) =>
  file.endsWith('.html') && file !== 'content-engine.html'
);
const routedPages = allPages.filter((file) => file !== '404.html');

test('every public page has a skip link and a focusable main landmark', () => {
  for (const file of allPages) {
    const html = read(file);
    assert.match(html, /<a class="skip-link" href="#main-content"/, `${file} is missing the skip link`);
    assert.match(html, /<main[^>]*id="main-content"[^>]*tabindex="-1"/, `${file} is missing the main target`);
  }
});

test('routed pages expose one header landmark around the navigation', () => {
  for (const file of routedPages) {
    const html = read(file);
    assert.equal((html.match(/<header class="site-header">/g) || []).length, 1, `${file} header count`);
    assert.match(html, /<\/header>\s*<main id="main-content"/, `${file} header is not closed before main`);
  }
});

test('active navigation links expose aria-current', () => {
  for (const file of routedPages) {
    const html = read(file);
    if (!/class="nav-active"/.test(html)) continue;
    assert.match(html, /class="nav-active"[^>]*aria-current="page"/, `${file} has an unmarked active link`);
  }
});

test('quote modal and fullscreen menu have dialog semantics and hidden state', () => {
  for (const file of routedPages) {
    const html = read(file);
    assert.match(
      html,
      /<div class="quote-modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="quoteModalTitle" aria-hidden="true" inert>/,
      `${file} quote modal semantics`
    );
    assert.match(html, /<h3 id="quoteModalTitle"/, `${file} quote modal label`);
    assert.match(html, /<input data-autofocus id="qm-name"/, `${file} quote modal autofocus`);
    assert.match(
      html,
      /<div class="full-menu" id="fullMenu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true" inert>/,
      `${file} mobile menu semantics`
    );
  }
});

test('footer headings follow the page heading hierarchy', () => {
  for (const file of routedPages) {
    const html = read(file);
    assert.doesNotMatch(html, /<h4\b/, `${file} still uses footer h4 headings`);
    assert.match(html, /<h3 data-fr="Liens rapides"/, `${file} is missing the footer h3 heading`);
  }
});

test('site script manages dialog state, focus trap, and focus return', () => {
  const js = read('assets/js/site.js');

  assert.match(js, /function openDialog\(dialog, opener\)/);
  assert.match(js, /function closeDialog\(dialog, restoreFocus\)/);
  assert.match(js, /setAttribute\('aria-hidden', open \? 'false' : 'true'\)/);
  assert.match(js, /removeAttribute\('inert'\)/);
  assert.match(js, /setAttribute\('inert', ''\)/);
  assert.match(js, /function initDialogKeyboard\(\)/);
  assert.match(js, /e\.key === 'Escape'/);
  assert.match(js, /e\.key !== 'Tab'/);
  assert.match(js, /openDialog\(menu, btn\)/);
  assert.match(js, /openDialog\(overlay, trigger \|\| document\.activeElement\)/);
  assert.match(js, /openDialog\(lb, item\)/);
  assert.match(js, /closeDialog\(lb\)/);
  assert.match(js, /initDialogKeyboard\(\);/);
});

test('unsupported response-time claims are removed from public pages', () => {
  for (const file of allPages) {
    assert.doesNotMatch(read(file), /24\s*(?:heures|hours)/i, `${file} still promises a 24-hour reply`);
  }
});

test('active styles use accessible tokens and a safe stacking order', () => {
  const css = read('assets/css/site.css');

  assert.match(css, /--primary-text:var\(--red-dark\)/);
  assert.match(css, /--primary-text:#FF6B6B/);
  assert.doesNotMatch(css, /--gold|--gold-soft|--coral-soft|--teal|--teal-soft/);
  assert.match(css, /\.skip-link\{/);
  assert.match(css, /#cookie-consent-banner\{[^}]*z-index:940/);
  assert.match(css, /\.quote-modal-overlay\{[^}]*z-index:1100/);
  assert.doesNotMatch(css, /\.showcase-card:hover\{[^}]*transform/);
  assert.match(css, /\.showcase-card:hover \.inner\{transform:scale\(1\.06\)\}/);
  assert.doesNotMatch(css, /color:rgba\(var\(--text-rgb\),\.(?:45|5|55|6)\)/);
  assert.match(css, /\.footer-col h3\{/);
  assert.match(css, /\.footer-col a\.btn-pill\{color:#fff\}/);
  assert.match(css, /\.footer-col a\.btn-pill:hover\{color:#fff/);
});

test('inline text colors meet the minimum alpha on public pages', () => {
  for (const file of allPages) {
    assert.doesNotMatch(
      read(file),
      /color:rgba\(var\(--text-rgb\),\.(?:45|5|55|6)\)/,
      `${file} has low-contrast inline text`
    );
  }
});
