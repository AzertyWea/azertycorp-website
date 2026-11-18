# 02 — AZERTYCORP Technical Architecture (Phase 2)

**Document status:** APPROVED FOR IMPLEMENTATION  
**Generated:** 2026-11-18  
**Parent document:** `docs/01_PROJECT_AUDIT.md`  
**Implementation branch:** `implementation/phase-2`  
**Source of truth:** clean worktree `C:\Users\moise\AppData\Local\Temp\opencode\azerty-motion`, based on `origin/main` + `acd3118` + `e8e8c58`  
**Deployment status:** local implementation only. No push, no production deployment.

---

## 1. Architecture objective

Preserve the existing static-site technology stack and visual identity, while removing the specific defects that prevent the site from being reliable, secure and honest:

1. Forms must report success only after the authoritative Supabase insert succeeds.
2. Supabase RLS must enforce least privilege with an explicit admin role.
3. The broken, publicly reachable Content Engine must not be deployed.
4. Production CSP must allow only the origins actually required by the site.
5. A minimal automated test and CI gate must prevent regression.

This phase does **not** redesign the site, add frameworks, introduce paid services, invent content, or deploy to production.

---

## 2. Source-of-truth decision

### 2.1 Authoritative source

The authoritative source is the clean worktree at:

`C:\Users\moise\AppData\Local\Temp\opencode\azerty-motion`

It contains:

- `origin/main` up to the animation work.
- Animation commit `acd3118`.
- Phase 1 audit commit `e8e8c58`.

### 2.2 Divergent working copy

The original worktree at:

`C:\Users\moise\OneDrive\Desktop\azerty corp website\azertycorp\public`

remains untouched. It contains local branch `main` at `26ec65f`, 9 commits behind `origin/main`, with 18 modified and 5 untracked files.

Those 23 pending changes were archived **without modifying the original worktree** at:

`C:\Users\moise\AppData\Local\Temp\opencode\azertycorp-public-pending-20261118`

The archive contains:

- `status.txt` — porcelain status at capture time.
- `pending-changes.patch` — binary-capable diff.
- `HEAD.txt`, `branch.txt` — provenance.
- Copies of every modified and untracked file in its original relative path.

No change from that archive is merged into the authoritative source without separate owner review.

### 2.3 Branching model

- `docs/phase-1-audit` — audit only, local.
- `implementation/phase-2` — Phase 2 implementation, local.
- `main` — remains the deployment branch, untouched by this phase.

Production deployment requires explicit approval after local verification.

---

## 3. Technology stack (unchanged)

| Layer | Technology | Decision |
|---|---|---|
| Rendering | Static multi-page HTML | Preserved. No framework introduced. |
| Styling | Vanilla CSS (`site.css`, `motion.css`) | Preserved. |
| Behavior | Vanilla JS (`config.js`, `api.js`, `site.js`, `motion.js`) | Preserved and modularized minimally. |
| Backend | Supabase Postgres/PostgREST | Preserved as authoritative form backend. |
| Hosting | Vercel static hosting | Preserved. |
| Database migrations | SQL files under `supabase/migrations/` | Preserved, with remediation migration added. |
| Tests | Node built-in test runner | Added. No runtime dependencies. |
| CI | GitHub Actions, test-only | Added. No deploy job. |

---

## 4. Target file organization

```text
.
├── assets/
│   ├── css/
│   │   ├── site.css
│   │   ├── motion.css
│   │   ├── design-system.css        # retained, not loaded
│   │   └── dark-mode.css            # retained, not loaded
│   ├── js/
│   │   ├── config.js                # NEW: central public configuration
│   │   ├── api.js                   # Supabase access and lead submission
│   │   ├── site.js                  # UI behavior and form state handling
│   │   ├── motion.js
│   │   └── main.js                  # retained, not loaded; dead code cleanup later
│   └── vendor/
│       ├── supabase-js-2.119.1.js   # NEW: pinned local UMD build
│       └── SUPABASE_LICENSE.txt     # NEW: license notice
├── docs/
│   ├── 01_PROJECT_AUDIT.md
│   └── 02_TECHNICAL_ARCHITECTURE.md
├── scripts/
│   └── static-server.mjs            # NEW: local route-accurate test server
├── supabase/
│   └── migrations/
│       ├── 0001_init.sql            # hardened for fresh installs
│       └── 0002_secure_rls.sql      # NEW: remediation for existing databases
├── tests/
│   ├── configuration.test.mjs
│   ├── forms.test.mjs
│   ├── rls.test.mjs
│   ├── routes.test.mjs
│   └── smoke.test.mjs
├── .github/workflows/ci.yml         # NEW: test-only CI
├── .vercelignore                    # NEW: excludes non-production files
├── 404.html                         # NEW: branded 404
├── vercel.json
├── robots.txt
├── sitemap.xml
└── package.json                     # NEW: scripts and Node version
```

`content-engine.html` and `content-engine.js` remain in source control as historical tooling but are excluded from Vercel deployment by `.vercelignore` and disallowed in `robots.txt`.

---

## 5. Configuration strategy

### 5.1 Central public config

`assets/js/config.js` exposes:

```js
window.AZERTY_CONFIG = {
  SITE_NAME: 'AZERTYCORP',
  SUPPORT_EMAIL: 'hello@azertycorp.com',
  SUPABASE_URL: 'https://bjczjzddhoyadhbwhhgo.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_...',
  SUPABASE_CLIENT_SRC: '/assets/vendor/supabase-js-2.119.1.js',
  GA4_MEASUREMENT_ID: '',
  GOOGLE_ADS_ID: '',
  META_PIXEL_ID: '',
  STORAGE_KEY: 'azertycorp:cookie-consent'
};
```

The Supabase publishable key is intentionally public by design, but it now lives in one place. No service-role key, secret key or private credential is stored in the repository.

`api.js` and `site.js` read from `AZERTY_CONFIG`. Missing config produces an explicit error instead of fake success.

### 5.2 Dependency strategy

The Supabase client is vendored as a pinned UMD build:

`assets/vendor/supabase-js-2.119.1.js`

Rationale:

- Removes the floating `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` dependency.
- Avoids adding jsDelivr to the production CSP script allow-list.
- Makes the exact dependency version auditable.
- Loads lazily only when a Supabase operation is requested.

License notice is stored beside the dependency.

Tailwind CDN is removed as a production dependency by excluding the Content Engine from deployment. No Tailwind allow-list entry is added.

---

## 6. Data flow

### 6.1 Lead submission (authoritative)

```text
Visitor submits contact form or quote modal
        ↓
site.js validates form and checks honeypot
        ↓
AZAPI.submitLead(FormData, source)
        ↓
api.js validates required fields
        ↓
api.js lazy-loads local Supabase client
        ↓
Supabase client INSERT into public.contacts using publishable key
        ↓
Supabase evaluates RLS: anon/authenticated INSERT only, with validation
        ↓
OK   → real success state, form reset
Error → visible error state, button re-enabled, no reset
```

Non-authoritative Web3Forms code is removed from the success path. There is no timeout-based success and no swallowed failure.

### 6.2 Public content reads

`AZAPI.getProjects()`, `getTestimonials()` and `getPosts()` remain available, but public RLS only exposes rows where `published = true`. No admin content is readable by anonymous users.

### 6.3 Administration

The Content Engine is not a production surface in this phase.

- `signUp`, `signIn`, `signOut` and engine sync methods are removed from the public `AZAPI` surface.
- `content-engine.html` / `content-engine.js` are excluded from Vercel deployment.
- Admin access must be designed later with a real admin role and authenticated UI. Until then, Supabase admin operations are performed by authorized operators using Supabase Dashboard/API with appropriate credentials.

---

## 7. Security model

### 7.1 RLS roles

| Role | Contacts | Projects / testimonials / posts / metrics | Engine user-owned tables |
|---|---|---|---|
| `anon` | INSERT only, validated | SELECT published/public rows only | No access |
| `authenticated` (non-admin) | INSERT only, validated | SELECT published/public rows only | Own rows only |
| `authenticated` + `app_metadata.role = 'admin'` | SELECT/UPDATE, no public DELETE | Full management | Own rows only |
| `service_role` | Out of browser scope | Out of browser scope | Out of browser scope |

Admin identity is taken from `auth.jwt() -> 'app_metadata' ->> 'role'`, not `raw_user_meta_data`, because users can modify their own raw metadata.

### 7.2 CSP

Production CSP is tightened to the actual dependency graph:

- `script-src`: self, inline (legacy page scripts), GA, GTM, Meta.
- `connect-src`: self, Supabase project origin, GA, GTM, Meta.
- Removed: jsDelivr, Web3Forms, Google Translate, Tailwind CDN.

### 7.3 Abuse controls

Client-side honeypot is corrected from `name="name"` to `name="website"` so it no longer overwrites the real name value. Database-level length/format checks are enforced in the public insert policy.

Rate limiting requires an edge/server layer or Supabase-side controls and remains a documented limitation for this phase.

---

## 8. Error handling and states

All production forms use one shared behavior:

- Submitting: button disabled, text changes to “Envoi…” / “Sending…”.
- Invalid: browser validation is invoked, no network call.
- Success: only after Supabase returns no error; form resets; status uses the `.ok` class.
- Failure: status uses the `.err` class; button is restored; form data is retained.

The misleading “reply within 24 hours” success promise is removed because it is not an approved factual commitment.

The fake newsletter form is replaced by a truthful contact CTA because no newsletter provider or double opt-in workflow is configured.

---

## 9. Website structure decisions in this phase

| Item | Decision |
|---|---|
| Existing public pages | Preserved. |
| Home / About / Services / Portfolio / Pricing / Gallery / Blog / Contact / REDI / Elite Biz / CV / Privacy / Terms | Preserved. |
| Custom 404 | Added. |
| Content Engine | Excluded from production. |
| Legal notice / cookie policy / FAQ page | Deferred pending owner legal input and page-purpose review. |
| Service detail pages / case studies | Deferred pending verified content. |
| Placeholder `href="#"` links | Deferred to the structure/content phase; not changed in this security-focused phase. |

---

## 10. Testing and CI strategy

Node built-in tests cover:

1. **configuration** — CSP allow-list, config keys, local vendor dependency, no forbidden origins, `.vercelignore`, robots.
2. **routes** — rewrites resolve to files, sitemap matches clean routes, local asset references exist.
3. **forms** — no fake-success markers, no Web3Forms path, honeypot name, Supabase error checking.
4. **rls** — no broad admin policies, no anon contact reads, admin role source is app metadata.
5. **smoke** — local server returns 200 for every route and required asset, 404 page is branded.

CI runs `npm test` on push and pull requests. It has no deployment job.

Browser console and responsive verification are performed locally during implementation and recorded in the QA report; they are not claimed as CI coverage.

---

## 11. Migration and recovery notes

### 11.1 Database

`0002_secure_rls.sql` uses only:

- `create or replace function`
- `drop policy if exists`
- `create policy`
- `alter table ... add column if not exists`

It performs no destructive table or data operation. Existing lead rows are retained.

Admin policy remediation is idempotent. If a database only has `0001_init.sql`, the hardened version of that file is safe for fresh installs. If `0001_init.sql` was already applied, run `0002_secure_rls.sql`.

### 11.2 Application rollback

Before any future deployment:

1. Record current production commit SHA.
2. Deploy the reviewed commit.
3. Verify routes, CSP headers, form success/failure paths and console.
4. Roll back by redeploying the recorded SHA if verification fails.

No rollback or deployment is executed in Phase 2.

---

## 12. Acceptance criteria for Phase 2

Phase 2 is complete only when:

- [x] Source of truth and divergent changes are documented and isolated.
- [ ] `docs/02_TECHNICAL_ARCHITECTURE.md` is committed.
- [ ] Supabase client is local, pinned and licensed.
- [ ] Central config is loaded before API/site scripts on all public pages.
- [ ] Forms succeed only on confirmed Supabase insert and fail visibly otherwise.
- [ ] Fake Web3Forms success path is removed.
- [ ] Fake newsletter is removed.
- [ ] Honeypot no longer collides with the real name field.
- [ ] RLS remediation is idempotent and least-privilege.
- [ ] Content Engine is excluded from deployment and disallowed in robots.
- [ ] Custom branded 404 exists.
- [ ] CSP matches actual production dependencies.
- [ ] `npm test` passes with all tests actually executed.
- [ ] Local browser smoke checks show no console errors on public pages.
- [ ] No push or deployment has occurred.

Remaining owner-blocked items are carried forward, not invented.
