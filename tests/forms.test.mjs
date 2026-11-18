import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const siteJs = read('assets/js/site.js');
const apiJs = read('assets/js/api.js');
const legacyJs = read('assets/js/main.js');

test('no fake or non-authoritative success path remains', () => {
  assert.doesNotMatch(siteJs, /WEB3FORMS_KEY/);
  assert.doesNotMatch(siteJs, /api\.web3forms\.com/);
  assert.doesNotMatch(siteJs, /saved\s*=\s*true/);
  assert.doesNotMatch(siteJs, /reply within 24 hours/i);
  assert.doesNotMatch(siteJs, /répondrons sous 24 heures/i);
  assert.doesNotMatch(legacyJs, /WEB3FORMS_KEY/);
  assert.doesNotMatch(legacyJs, /saved\s*=\s*true/);
});

test('lead submission checks the Supabase result', () => {
  assert.match(apiJs, /result\.error/);
  assert.match(apiJs, /throw result\.error/);
  assert.match(apiJs, /Invalid email/);
  assert.match(apiJs, /Invalid message/);
  assert.match(apiJs, /Honeypot/);
  assert.doesNotMatch(apiJs, /createClient\(\s*['"]https:/);
});

test('all production forms use the corrected honeypot field', () => {
  const files = fs.readdirSync(root).filter((file) => file.endsWith('.html') && file !== 'content-engine.html');
  let botFields = 0;

  for (const file of files) {
    const html = read(file);
    const matches = html.match(/class="qm-bot"/g) || [];
    botFields += matches.length;
    assert.doesNotMatch(html, /name="name"\s+class="qm-bot"/, `${file} still has a colliding honeypot`);
  }

  assert.ok(botFields >= 14, 'expected honeypot fields in quote and contact forms');
});

test('newsletter fake form is removed', () => {
  const blog = read('blog.html');
  assert.doesNotMatch(blog, /id="nlForm"/);
  assert.doesNotMatch(blog, /Thank you for subscribing!/);
  assert.match(blog, /Parlons de votre projet/);
});

test('forms have live status regions', () => {
  const contact = read('contact.html');
  const index = read('index.html');
  assert.match(contact, /id="contactFormStatus"[^>]*role="status"/);
  assert.match(index, /id="quoteStatus"[^>]*role="status"/);
});
