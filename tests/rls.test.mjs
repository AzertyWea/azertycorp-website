import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const initial = read('supabase/migrations/0001_init.sql');
const remediation = read('supabase/migrations/0002_secure_rls.sql');
const all = `${initial}\n${remediation}`;

test('admin checks use JWT app_metadata, not user-editable metadata', () => {
  assert.match(all, /auth\.jwt\(\)\s*->\s*'app_metadata'\s*->>\s*'role'/);
  assert.doesNotMatch(all, /raw_user_meta_data\s*->>\s*'role'/);
  assert.match(all, /public\.azerty_is_admin\(\)/);
});

test('no broad authenticated admin policies remain', () => {
  assert.doesNotMatch(all, /for\s+all\s+to\s+authenticated\s+using\s*\(\s*true\s*\)/i);
  assert.doesNotMatch(all, /for\s+select\s+to\s+authenticated\s+using\s*\(\s*true\s*\)/i);
  assert.doesNotMatch(all, /for\s+update\s+to\s+authenticated\s+using\s*\(\s*true\s*\)/i);
  assert.doesNotMatch(all, /"contacts_public_insert"[\s\S]{0,300}with check \(true\)/i);
});

test('public contact inserts are validated and admin reads are role-gated', () => {
  assert.match(all, /char_length\(btrim\(name\)\) between 2 and 120/);
  assert.match(all, /email ~ '\^\[\^\[:space:\]@\]\+@\[\^\[:space:\]@\]\+\\\.\[\^\[:space:\]@\]\+\$'/);
  assert.match(all, /website is null or website = ''/);
  assert.match(all, /create policy "contacts_admin_select"[\s\S]{0,200}public\.azerty_is_admin\(\)/);
  assert.match(all, /create policy "contacts_admin_update"[\s\S]{0,250}public\.azerty_is_admin\(\)/);
});

test('remediation is idempotent and non-destructive', () => {
  assert.match(remediation, /drop policy if exists "contacts_admin_select"/);
  assert.match(remediation, /drop policy if exists "projects_admin_all"/);
  assert.match(remediation, /add column if not exists website text/);
  assert.doesNotMatch(remediation, /drop table/i);
  assert.doesNotMatch(remediation, /delete from/i);
  assert.doesNotMatch(remediation, /truncate/i);
});
