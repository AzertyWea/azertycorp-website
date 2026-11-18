import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const publicPages = fs.readdirSync(root).filter((file) =>
  file.endsWith('.html') && file !== 'content-engine.html' && file !== '404.html'
);

test('no public page contains a placeholder link', () => {
  for (const file of publicPages) {
    assert.doesNotMatch(read(file), /href="#"/, `${file} still has a placeholder link`);
  }
});

test('placeholder cards are non-interactive articles', () => {
  const blog = read('blog.html');
  const portfolio = read('portfolio.html');

  assert.match(blog, /<article class="blog-card[^>]*data-category=/);
  assert.doesNotMatch(blog, /<a class="blog-card/);
  assert.match(portfolio, /<article class="work-card[^>]*data-category=/);
  assert.doesNotMatch(portfolio, /<a class="work-card[^>]*href="#"/);
});

test('gallery items are real buttons with lightbox behavior', () => {
  const gallery = read('gallery.html');
  const buttons = gallery.match(/<button type="button" class="gallery-item[^>]*data-lightbox/g) || [];

  assert.ok(buttons.length >= 20, 'expected gallery items to be keyboard-accessible buttons');
  assert.doesNotMatch(gallery, /<a class="gallery-item/);
});

test('unverified social icons are non-interactive and hidden from assistive tech', () => {
  let spans = 0;
  for (const file of publicPages) {
    const html = read(file);
    spans += (html.match(/<span class="social-icon" aria-hidden="true">/g) || []).length;
    assert.doesNotMatch(html, /<a href="#" aria-label=/, `${file} still has a fake social link`);
  }
  assert.ok(spans >= 44, 'expected footer social icons to be converted to non-links');
});

test('every public page links to the primary navigation routes', () => {
  const required = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'blog.html', 'contact.html'];

  for (const file of publicPages) {
    const html = read(file);
    for (const route of required) {
      assert.match(html, new RegExp(`href="${route.replace('.', '\\.')}"`), `${file} is missing ${route}`);
    }
  }
});
