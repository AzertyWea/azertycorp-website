# 01 — AZERTYCORP Project Audit & Transformation Roadmap

**Document status:** DRAFT FOR OWNER APPROVAL  
**Generated:** 2026-11-18  
**Audited commit:** `acd3118` (`Refine motion system with staggered reveals and reduced-motion support`)  
**Audited branch/worktree:** `docs/phase-1-audit` at `C:\Users\moise\AppData\Local\Temp\opencode\azerty-motion`  
**Live site:** <https://azertycorp-1.vercel.app/>  
**Deployment model:** Vercel static site, auto-deployed from GitHub `AzertyWea/azertycorp-website`, branch `main`.

> This is Phase 1 only: discovery, audit and roadmap. No Phase 2+ implementation has been applied, and nothing from this audit has been pushed or deployed.

---

## 0. Executive verdict

**Production readiness: FAIL — not production-ready under the project’s own quality gate.**

The platform has a strong visual foundation and a clean static architecture, but it has unresolved critical correctness, security and honesty issues:

1. **Contact/quote/newsletter forms report success without verified delivery.** Leads can be silently lost and visitors are told they will receive a reply.
2. **Supabase row-level security grants all authenticated users access to lead PII and all “admin” content tables.** Public sign-up is available, so this is a real privilege escalation path.
3. **The Content Engine is broken at load** (`Router is not defined`) and its Tailwind CDN dependency is blocked by the site’s own CSP.
4. **The production CSP blocks the Supabase client and connection.** The only configured backend cannot run in production.
5. **Privacy/legal copy names the wrong processor and omits required business identity.**
6. **No tests, CI, monitoring, backup/restore runbook or maintenance documentation exist.**
7. **There are two divergent working copies**, one of which contains 23 uncommitted/untracked changes that are not on `origin/main`.

The animation work completed immediately before this audit is **PASS**: it is additive, scoped, reduced-motion-safe, verified in browser at desktop and 390px mobile, committed, pushed and live. It did not introduce the critical findings above.

---

## 1. Scope, method and evidence

### 1.1 What was inspected

- Repository root, tracked file inventory (37 files).
- 14 HTML documents: 13 public pages plus `content-engine.html`.
- CSS: `assets/css/site.css`, `motion.css`, `design-system.css`, `dark-mode.css`.
- JavaScript: `assets/js/site.js`, `api.js`, `motion.js`, `main.js`, `content-engine.js`, plus inline scripts.
- Backend artifact: `supabase/migrations/0001_init.sql`.
- Deployment/config: `vercel.json`, `robots.txt`, `sitemap.xml`, `.gitignore`, git history and worktree state.
- Assets: 9 local images, remote Unsplash usage, font loading, caching headers.
- Live site: all clean routes, `/content-engine.html`, CSP response headers, 404 behaviour, live console errors, Supabase client load attempt.

### 1.2 Method

- Static source review with file/line evidence.
- Git history and worktree comparison.
- Live HTTP checks against `https://azertycorp-1.vercel.app/`.
- Live browser console and runtime checks for the Content Engine and Supabase client.
- Cross-checking of duplicated findings across multiple independent reviewers.

### 1.3 Limitations / BLOCKED evidence

The following could not be verified from the repository alone and require owner or platform access:

- Supabase project region, applied migration state, retention policy and whether leads are actually arriving.
- Vercel project settings, deployment logs, preview environment configuration and DNS/domain ownership.
- Legal entity identity, registration details, physical address and data-controller/DPO details.
- Whether named projects, clients, partners, statistics and timeline claims are factual.
- Whether `azertycorp.com` is intended to be the canonical public domain.

These are marked **BLOCKED** or **owner confirmation required** rather than reported as invented facts.

---

## 2. Classification

### Severity

| Severity | Meaning |
|---|---|
| CRITICAL | Business data loss, unauthorized data access, broken core conversion path, or legally material misstatement. Must block release. |
| HIGH | Major functional, security, privacy or SEO defect. Must be fixed or formally accepted before release. |
| MEDIUM | Material quality, maintainability, conversion or accessibility issue. |
| LOW | Cleanup, consistency or optimization issue. |
| INFORMATIONAL | Verified positive or neutral observation. |

### Status

| Status | Meaning |
|---|---|
| PASS | Requirement is met with evidence. |
| PARTIAL | Requirement is partly met or implemented inconsistently. |
| FAIL | Requirement is not met. |
| NOT APPLICABLE | Requirement does not apply to this stack/context. |
| BLOCKED | Cannot be verified without owner/platform input. |

---

## 3. Technology and architecture snapshot

| Area | Finding | Status | Evidence |
|---|---|---|---|
| Rendering strategy | Static multi-page HTML; no framework, no build step, no server runtime. | PASS | 14 `.html` files; no `package.json`, no framework config. |
| Frontend | Vanilla CSS and vanilla JS. Two public stylesheets and three public scripts are actually loaded. | PASS | `index.html:29-30`, `index.html:631-633`. |
| Design system | Tokens exist in `site.css`; brand palette and Montserrat/Inter tokens are defined. | PARTIAL | `site.css:8-61`; off-brand inline accents at `index.html:357,361,365`. |
| Theme | Light/dark via `html[data-theme]` with pre-paint script and persisted toggle. | PASS | `index.html:5`, `site.css:68-91`, `site.js:518-536`. |
| Bilingual | Client-side FR/EN swap via `data-fr` / `data-en`; `html.lang` is updated. | PARTIAL | `site.js:61-75`; no localized URLs or `hreflang`. |
| Backend | Supabase project referenced by hardcoded URL + publishable key. Leads insert into `contacts`. | PARTIAL | `api.js:8-9,51-64`; `0001_init.sql:12-37`. |
| Auth | Supabase `signIn` / `signUp` exposed via `AZAPI`; Content Engine has auth UI. | FAIL | `api.js:92-106,143-155`; `content-engine.js:1009-1025`. |
| Database | PostgreSQL/Supabase with RLS policies in one manual migration. | FAIL | `supabase/migrations/0001_init.sql:25-37,65-72,144-160,171-213`. |
| Hosting | Vercel static hosting with rewrites, headers and immutable asset cache. | PARTIAL | `vercel.json:2-36`. |
| Forms | Web3Forms and Supabase paths exist, but no reliable delivery is implemented. | FAIL | `site.js:13-20,443-512`. |
| Testing | No test runner, linting, CI, E2E, accessibility or security tests. | FAIL | No `package.json`, no `.github/`, no test config. |
| Documentation | No README, runbook, deployment guide or maintenance guide. | FAIL | No `.md` files before this audit. |
| Monitoring | No error tracking, uptime monitoring, CSP reporting or lead-failure alerting. | FAIL | No monitoring config; analytics IDs empty at `site.js:14-16`. |

---

## 4. Phase 1 requirement matrix

| Inspection requirement | Status | Notes |
|---|---|---|
| Root directory | PASS | Inspected; static site root. |
| Source directories | PASS | `assets/`, `supabase/`. |
| Frontend | PASS | HTML/CSS/JS inventoried and reviewed. |
| Backend | PARTIAL | Supabase migration and API layer present; backend not wired successfully. |
| Components | PARTIAL | Repeated card/modal/menu patterns are copy-pasted in HTML/JS, not modular. |
| Pages | PASS | 14 HTML files inventoried. |
| Routes | PASS | 12 clean rewrites in `vercel.json`; all live routes returned 200. |
| API endpoints | PARTIAL | Supabase REST used indirectly; no server API. |
| Database | FAIL | RLS policies are unsafe; migration is manual and non-idempotent. |
| Configuration files | PARTIAL | `vercel.json` present; no env/config abstraction. |
| Package manifests/dependencies | NOT APPLICABLE | No package manager; dependencies are CDN-loaded. |
| Environment variables | FAIL | No `.env`, `.env.example`; `.env*` not ignored. |
| Assets/fonts/images | PARTIAL | Large unoptimized PNGs; no `srcset` or intrinsic dimensions. |
| Deployment configuration | PARTIAL | Vercel config works, but CSP is wrong and rollback is undocumented. |
| Existing documentation | FAIL | None before this document. |
| Testing configuration | FAIL | None. |

---

## 5. Findings register

### 5.1 CRITICAL

| ID | Finding | Status | Severity | Evidence | Impact | Required action |
|---|---|---|---|---|---|---|
| C-01 | Forms show hardcoded success without verified delivery | FAIL | CRITICAL | `site.js:17` (`WEB3FORMS_KEY: ''`); `site.js:451-470` quote handler; `site.js:492-509` contact handler; `main.js:231-252` duplicate dead handler. Failures are swallowed with `.catch(function(){})` and `saved = true`. | Leads can be lost silently; visitors are falsely told “Merci ! Nous vous répondrons sous 24 heures.” | Implement one real submission path, check the result/errors, show success only on confirmed delivery, add failure state, remove `saved = true` fallbacks. Add lead-delivery monitoring. |
| C-02 | Supabase RLS exposes lead PII and content to any authenticated user | FAIL | CRITICAL | `0001_init.sql:27-37` contacts public insert + `authenticated` select/update; `:70-72`, `:95-97`, `:124-126`, `:211-213` admin policies use broad `authenticated`; `api.js:96-98` public `signUp`; `content-engine.js:1009-1025`. | A self-registered user can read contacts (name/email/phone/message) and modify/delete projects, testimonials, posts and metrics. | Replace “admin” policies with a real admin role/claim check, keep public insert only with validation, add abuse controls, add RLS policy tests before any redeploy. |
| C-03 | Content Engine crashes at load | FAIL | CRITICAL | `content-engine.js:327` assigns `Router.navigate` without declaring `Router`. Confirmed live console: `ReferenceError: Router is not defined`; `window.App` and `window.DB` are `undefined`. | The internal tool is completely nonfunctional. | Declare/import `Router`, fix initialization order, add a smoke test that loads the page with zero console errors. |

### 5.2 HIGH

| ID | Finding | Status | Severity | Evidence | Impact | Required action |
|---|---|---|---|---|---|---|
| H-01 | CSP blocks the actual backend and admin UI dependencies | FAIL | HIGH | `vercel.json:20` omits `https://cdn.jsdelivr.net`, `https://cdn.tailwindcss.com` and `https://bjczjzddhoyadhbwhhgo.supabase.co`. `api.js:29` loads jsDelivr; `content-engine.html:10` loads Tailwind CDN. Live console confirmed both blocks; `AZAPI.getSession()` rejected with `Failed to load https://cdn.jsdelivr.net/...`. | Supabase lead capture and Content Engine cannot work in production. | Self-host/pin dependencies or add exact origins. Remove stale Translate directives. Use Report-Only validation before enforcing. |
| H-02 | Privacy policy names the wrong processor and omits Supabase | FAIL | HIGH | `privacy.html:179-180`; `terms.html:176-177` claim Web3Forms; actual code inserts leads into Supabase (`api.js:8-9,51-64`; `0001_init.sql:12-37`). | GDPR-style transparency failure; wrong recipient and no storage/retention disclosure. | Rewrite privacy/terms to describe the actual processor, data stored, location, retention and lawful basis, or change the implementation to match the policy. |
| H-03 | Legal pages lack business identity | FAIL | HIGH | `privacy.html:151-152`, `privacy.html:192`, `terms.html:152,182-183`. No registered name, registration number, street address, controller/DPO identity. | Cannot satisfy legal identification obligations. | Owner must provide verified details. Do not invent them. Then update both pages and obtain legal review. |
| H-04 | Cookie consent is binary and has no in-site withdrawal control | PARTIAL | HIGH | `site.js:86-99,184-214`; `privacy.html:163,169`. | No granular consent; “Refuser” is one-way; privacy text tells users to clear cookies or contact the company. | Implement granular consent, persistence and a visible “manage preferences” control; align policy text. |
| H-05 | Newsletter form is fake and undisclosed | FAIL | HIGH | `blog.html:209-214,313-327`: no network call, only `indexOf('@')`, hardcoded “Thank you for subscribing!”; no privacy checkbox or processor disclosure. | Email addresses are not subscribed; policy does not mention newsletter collection. | Connect to a real provider with double opt-in and disclosure, or remove the form. |
| H-06 | Privacy policy claims tracking that is not configured | PARTIAL | HIGH | `privacy.html:165-167` lists GA4, Google Ads and Meta Pixel; `site.js:14-16` IDs are empty and `initAnalytics()` returns at `site.js:105`. | Legal copy is aspirational/misleading. | Reconcile copy with actual configuration; if tracking is planned, configure IDs and consent gating first. |
| H-07 | Placeholder links on primary content and social icons | FAIL | HIGH | 34 content-card `href="#"` links in `blog.html`, `portfolio.html`, `gallery.html`; 44 footer social `href="#"` links across 11 pages. | Case studies, articles and social profiles do not work. | Create real detail pages/destinations or convert non-links to semantic non-interactive elements. Supply real social URLs. |
| H-08 | Internal Content Engine is publicly reachable and indexable | FAIL | HIGH | `/content-engine.html` returned 200 live; no `noindex`, no robots disallow, no working auth (see C-03). | Admin/sign-up surface is exposed to crawlers and users. | Restrict access, add `noindex`, disallow in robots, or remove from production build; decide with owner. |
| H-09 | Divergent working copies / unclear source of truth | FAIL | HIGH | Audited worktree is clean at `acd3118`; original `azertycorp/public` is on local `main` at `26ec65f`, 9 commits behind, with 18 modified and 5 untracked files (`premium.css`, `premium.js`, `api.js`, `content-engine.html`, `content-engine.js`). | Manual deployment from the wrong directory would revert or expose different code. | Choose one authoritative source. Commit/archive the 23 pending changes, fast-forward local `main`, document the deploy path. |

### 5.3 MEDIUM

| ID | Finding | Status | Severity | Evidence | Impact | Action |
|---|---|---|---|---|---|---|
| M-01 | No custom 404 page | FAIL | MEDIUM | Live `/this-page-does-not-exist` returned Vercel default 404 with no AZERTYCORP branding. | Broken/old links lead to an off-brand dead end. | Add a branded `404.html` with navigation and search/contact CTA. |
| M-02 | Sitemap incomplete and stale | PARTIAL | MEDIUM | `sitemap.xml` lists 11 URLs; omits `/privacy`, `/terms`; all `lastmod` values are `2026-08-14`. | Legal pages are omitted; freshness signals are wrong. | Add legal URLs if they should be indexed (after removing `noindex`), update `lastmod`, generate from source of truth. |
| M-03 | Legal pages are deliberately de-indexed | PARTIAL | MEDIUM | `privacy.html:23` and `terms.html:23` have `<meta name="robots" content="noindex">`. | Mandatory notices are hard to find via search. | Confirm with owner/legal whether they should be indexable. |
| M-04 | Heading structure skips H2 on listing pages | FAIL | MEDIUM | `blog.html` H1 at 136 then H3 cards at 162/172/182/192; same pattern in `portfolio.html`, `gallery.html`. | Accessibility and SEO outline weakness. | Add semantic section H2s or adjust card heading levels. |
| M-05 | No header landmark, skip link or `aria-current` on public pages | PARTIAL | MEDIUM | Marketing pages use `nav/main/footer/section` but no `<header>`, skip link or active-page state. | Keyboard/screen-reader navigation is weaker than target WCAG 2.2 AA. | Add landmarks, skip link and active nav state. |
| M-06 | Modal/menu/lightbox accessibility state is incomplete | FAIL | MEDIUM | `site.js:219-236,383-441`; quote modal has static `aria-hidden="true"`, no `role="dialog"`/`aria-modal`, no focus trap; menu buttons lack `aria-expanded`; FAQ buttons lack `aria-expanded`/`aria-controls`. | Dialog and disclosure state is not exposed correctly. | Add roles, state attributes, focus management and Escape handling. |
| M-07 | Color contrast failures | FAIL | MEDIUM | Red `#E51B23` on `#F4F4F5`/`#0B0B0D`/`#E8E8EA` is 4.23/4.23/3.80:1; low-alpha text at `site.css:511,895,971` fails AA. | WCAG AA failures on real text. | Use `--primary-dark` or darker red on those surfaces; raise muted alpha to at least `.65`/`.75` where text. |
| M-08 | Showcase hover transform jump | FAIL | MEDIUM | `site.css:597` uses `transform:scale(1.06) !important`, overriding inline `translate(-50%,-50%) scale(1.15)` at `index.html:487`. | Center card jumps on hover. | Move positioning to a wrapper or include the base transform in the hover state. |
| M-09 | Cookie banner overlays modals | FAIL | MEDIUM | `site.css:727-736` banner `z-index:1200`; `site.css:754-759` modal `z-index:1100`. | First-time visitors can have modal controls obscured. | Lower banner z-index below dialogs or auto-hide it when a dialog opens. |
| M-10 | Off-brand hardcoded colors and stale tokens | PARTIAL | MEDIUM | `index.html:357,361,365,504`; legacy `--gold` aliases at `site.css:45` used in `elite-biz.html`, `redi.html`, `services.html`. | Brand palette rule is not fully enforced; maintainability suffers. | Replace with brand tokens; document only approved aliases. |
| M-11 | Unverifiable business claims | BLOCKED | MEDIUM | Founding timeline (`about.html:182-237`), “dozens of projects” (`pricing.html:173`), “24h guaranteed response” repeated sitewide, REDI stats (`redi.html:150-159`), named portfolio projects (`portfolio.html:178-276`), AI partner implications (`index.html:326-333`). | Risk of publishing unsupported claims. | Owner must confirm or remove. Do not invent replacements. |
| M-12 | Pricing inconsistencies and unsupported “most popular” labels | PARTIAL | MEDIUM | `index.html:381-390,405`; `pricing.html:164,249,313`; `elite-biz.html:199-212`. USD/FCFA rate outlier; USD-only packages; popularity badges unsourced. | Commercial confusion and trust risk. | Owner confirmation of rates, currency policy and badge legitimacy. |
| M-13 | Stale dates and past roadmap presented as current | FAIL | MEDIUM | `sitemap.xml` all `lastmod` 2026-08-14; `redi.html:251-279` Q1–Q4 2025 roadmap; `blog.html` 2024–2025 dates. | Content credibility and SEO freshness suffer. | Update or explicitly label historical roadmap/archive. |
| M-14 | “Book a call” CTAs self-link or open generic modal | PARTIAL | MEDIUM | `contact.html:204-206`, `index.html:137`, `pricing.html:339`, `elite-biz.html:280`; no scheduler in repo. | CTA promise does not match behavior. | Add real scheduler link or change wording to “Contact us”. |
| M-15 | Missing legal/utility pages | PARTIAL | MEDIUM | No legal notice, cookie policy, FAQ page or custom 404. FAQ only inline on `contact.html`. | Target architecture and compliance gaps. | Create only where owner confirms need and supplies verified content. |
| M-16 | Dead/conflicting unreferenced code | PARTIAL | MEDIUM | `main.js` is unreferenced but duplicates menu/reveal/counter/form logic with different storage keys; `design-system.css`, `dark-mode.css`, `logo.png` unreferenced. | Future maintenance hazard. | Remove or intentionally integrate; never load both form handlers. |
| M-17 | Missing QA/CI/monitoring/backup posture | FAIL | MEDIUM | No package manifests, test config, CI workflows, error tracking, CSP reporting, release tags or restore procedure. | No automated safety net; silent failures remain invisible. | Establish minimal test toolchain and CI gate; add monitoring and rollback runbook. |
| M-18 | `.env*` not ignored; no configuration layer | PARTIAL | MEDIUM | `.gitignore:1-16`; no `.env.example`; Supabase values hardcoded in `api.js:8-9`. | Future secrets can be committed; no staging/prod separation. | Ignore env files, add `.env.example`, centralize config (publishable key may remain public but should be configurable). |
| M-19 | Live `Access-Control-Allow-Origin: *` observed | PARTIAL | MEDIUM | Live HEAD response on `/` includes `Access-Control-Allow-Origin: *`, although no such header is declared in `vercel.json`. | Overly permissive CORS if any authenticated/private endpoints are added later. | Identify source, remove if unintended, add regression check. |

### 5.4 LOW / INFORMATIONAL

| ID | Finding | Status | Severity | Evidence | Action |
|---|---|---|---|---|---|
| L-01 | Internal links use `.html` while canonical URLs use clean routes | PARTIAL | LOW | `index.html:73-79` vs `index.html:9`; rewrites in `vercel.json:3-14`. | Standardize on clean URLs or add explicit redirects. |
| L-02 | No `hreflang` despite FR/EN toggle | PARTIAL | LOW | `site.js:61-75`; all pages declare `lang="fr"`. | If English is SEO-relevant, add localized URLs; otherwise update metadata dynamically on toggle. |
| L-03 | English alt text on French pages | PARTIAL | LOW | `index.html:187,206,225,244`; `blog.html:159-189`; `gallery.html:168-320`. | Localize generic alt text. |
| L-04 | No `width`/`height` or `srcset` on images | PARTIAL | LOW | 164 `<img>` tags across 14 HTML files; 0 with dimensions or `srcset`. CSS aspect-ratio containers mitigate CLS. | Add intrinsic dimensions and responsive sources. |
| L-05 | Large PNG assets and repeated logos | PARTIAL | LOW | `studio-ai.png` 2.49 MB, `founder.png` 1.36 MB, `logo-black.png` 429 KB loaded on every page. | Convert to WebP/AVIF/SVG, version filenames. |
| L-06 | Immutable asset cache without image versioning | PARTIAL | LOW | `vercel.json:32-35`; image URLs have no `?v=`. | Add content-hashed filenames or version query. |
| L-07 | Deprecated `X-XSS-Protection` and `'unsafe-inline'` in CSP | PARTIAL | LOW | `vercel.json:20,24`. | Remove deprecated header; reduce inline allowances where feasible. |
| L-08 | Stale font comment | PARTIAL | LOW | `index.html:25` says Comfortaa/DM Sans/Space Grotesk; actual fonts Montserrat/Inter at `index.html:28`. | Update comment. |
| L-09 | Fragmented breakpoints and duplicated inline legal CSS | PARTIAL | LOW | `site.css` uses 480/639/640/720/768/1024/1280 plus `gallery.html:30-34` 900; `privacy.html:31-38` and `terms.html:31-38` duplicated. | Consolidate tokens and shared styles. |
| L-10 | Stale CSP entries for removed Google Translate | PARTIAL | LOW | `vercel.json:20` still allows Translate origins; commit `8abb8ee` removed the widget. | Remove unused directives. |
| I-01 | Security headers largely present | PASS | INFO | HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/CORP, frame-ancestors. | Preserve and test. |
| I-02 | All clean routes returned 200 | PASS | INFO | Live HEAD checks for all 12 rewrites plus root, sitemap, robots, content-engine, motion assets. | None. |
| I-03 | Motion layer is clean | PASS | INFO | `motion.css`, `motion.js`; verified no console errors, staggered reveals, reduced motion, 390px mobile, live assets 200. | Keep as reference implementation. |
| I-04 | No service-role/private secrets found | PASS | INFO | Secret-pattern scan across history; only Supabase publishable key and empty placeholders. | Maintain secret scanning. |

---

## 6. Target architecture gap analysis

Based on the target architecture in the project brief.

| # | Target page/capability | Current state | Status | Action |
|---:|---|---|---|---|
| 1 | Home | `index.html` / `/` | PASS | Keep; remove unsupported claims after owner review. |
| 2 | About AZERTYCORP | `about.html` / `/about` | PASS | Verify timeline claims. |
| 3 | Services | `services.html` / `/services` | PASS | Verify “most requested” and process claims. |
| 4 | Individual service pages where commercially useful | No dedicated service-detail routes; REDI and Elite Biz are product/division pages. | PARTIAL | Owner decision on which services merit detail pages; do not create empty pages. |
| 5 | Portfolio / Projects | `portfolio.html` / `/portfolio` | PASS | Replace placeholder links with real destinations. |
| 6 | Case Studies | Portfolio cards only; no detail pages. | PARTIAL | Add genuine case studies only from verified work. |
| 7 | Our Process | Process sections exist on `index.html` and `services.html`; no dedicated page. | PARTIAL | Decide whether a dedicated page adds value. |
| 8 | Insights / Blog | `blog.html` listing only; 4 cards with `href="#"`. | PARTIAL | Add real articles or remove card links. |
| 9 | Contact | `contact.html` / `/contact` | PASS | Fix form delivery and validation. |
| 10 | Request a Quote | Global quote modal; no dedicated route. | PARTIAL | Keep modal if working; otherwise add dedicated page. |
| 11 | FAQ | Inline on `contact.html`; no dedicated page. | PARTIAL | Keep inline unless content volume justifies a page. |
| 12 | Privacy Policy | `privacy.html` / `/privacy` exists but `noindex`, wrong processor, missing identity. | PARTIAL | Rewrite after owner input. |
| 13 | Legal Notice | Missing. | FAIL | Create only with verified legal identity. |
| 14 | Terms and Conditions | `terms.html` / `/terms` exists but `noindex` and missing identity. | PARTIAL | Rewrite after owner input. |
| 15 | Cookie Policy | Missing; cookie section inside privacy policy. | FAIL | Add if tracking/cookies are actually used; align with consent UI. |
| 16 | Custom 404 | Missing; Vercel default 404 live. | FAIL | Add branded `404.html`. |

---

## 7. Live verification results

Performed 2026-11-18 against `https://azertycorp-1.vercel.app/`:

| Check | Result |
|---|---|
| `/`, `/about`, `/services`, `/pricing`, `/portfolio`, `/gallery`, `/blog`, `/contact`, `/redi`, `/elite-biz`, `/cv`, `/privacy`, `/terms` | All `200`. |
| `/sitemap.xml`, `/robots.txt`, `/content-engine.html` | All `200`. |
| `/assets/css/motion.css`, `/assets/js/motion.js` | `200`; live HTML references `?v=20261118`. |
| Unknown route | `404`, Vercel default page, no AZERTYCORP branding. |
| Live CSP header | Confirmed missing jsDelivr, Tailwind CDN and Supabase origins. |
| Live `AZAPI.getSession()` | Rejected: `Failed to load https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`; CSP violation logged. |
| Live `/content-engine.html` console | Three errors: Tailwind CSP block, `tailwind is not defined`, `Router is not defined`. `window.App`/`window.DB` undefined. |
| Live `Access-Control-Allow-Origin` | `*` observed on `/`. |

---

## 8. Transformation roadmap (approval required)

### Gate 0 — Owner decisions before implementation

No implementation beyond documentation should begin until these are answered:

1. Which directory/commit is the authoritative source for production?
2. What should happen to the 23 uncommitted/untracked changes in `azertycorp/public`?
3. What is the authoritative domain: `azertycorp-1.vercel.app` or `azertycorp.com`?
4. What are the verified legal entity details (name, registration, address, controller/DPO/privacy contact)?
5. Which form backend should be authoritative: Supabase, Web3Forms, or another provider? Provide required credentials/config.
6. Should `content-engine.html` be public, restricted, or removed from the deployed site?
7. Which named clients/projects/partners/statistics are verified and may remain?
8. Should blog/case-study detail pages be built, or should placeholder cards be converted to non-links?
9. Are "24h response", "most popular", "most requested", "dedicated PM/SLA" and similar claims approved?
10. Is a scheduler required for "book a call", or should wording change?

### Phase 2 — Technical architecture

**Goal:** define the target structure without unnecessary redesign.

- Establish one source of truth and branch protection.
- Define a small shared config module for form/backend IDs.
- Decide dependency strategy: self-host/pin Supabase JS and remove Tailwind CDN, or add exact CSP origins.
- Document static-site architecture, data flow, error flow and deployment flow.
- **Deliverable:** `docs/02_TECHNICAL_ARCHITECTURE.md`.
- **Acceptance:** owner-approved architecture; no contradictory working copies.

### Phase 3 — Website structure

- Apply the target architecture table above.
- Add custom 404; decide legal notice/cookie policy/FAQ pages.
- Replace or remove placeholder links.
- Connect all pages in navigation.
- **Acceptance:** no `href="#"` on primary cards/social unless it is a functioning in-page control; every public route has a clear purpose.

### Phase 4 — Premium UI/UX

- Preserve the existing brand identity; refine tokens and shared components.
- Fix showcase hover jump, cookie/modal z-index, contrast failures and off-brand accents.
- Consolidate breakpoints; verify 320–1440px.
- Add skip link, header landmark, `aria-current`, dialog semantics.
- **Acceptance:** brand palette intact; WCAG AA contrast issues resolved or documented; motion layer remains reduced-motion-safe.

### Phase 5 — Business and conversion

- Fix form delivery with verified success/failure states.
- Add validation, honeypot fix, loading/error/success states.
- Align CTAs with actual behavior.
- Replace unsupported claims with owner-approved copy only.
- **Acceptance:** a test submission produces a verifiable stored/delivered lead; failure produces a visible error; no false success.

### Phase 6 — Functional engineering

- Test navigation, menu, theme, language, currency, carousel, FAQ, filters, lightbox, quote modal, newsletter, contact form and content engine.
- Remove dead `main.js` or integrate it correctly.
- Fix honeypot `name` collision and missing validation.
- **Acceptance:** every interactive element has a real, tested behavior.

### Phase 7 — Security

- Fix RLS with admin role/claim checks.
- Add rate limiting/abuse controls for public insert.
- Correct CSP; remove stale origins; add reporting.
- Remove `Access-Control-Allow-Origin: *` if unintended.
- Add secret scanning and ignore env files.
- **Deliverable:** `docs/04_SECURITY_AUDIT.md`.
- **Acceptance:** anonymous cannot select contacts; non-admin authenticated cannot select/update admin tables; CSP violations are monitored.

### Phase 8 — Privacy and legal

- Rewrite privacy/terms from verified facts.
- Add legal notice/cookie policy if confirmed necessary.
- Implement granular consent and withdrawal.
- Disclose Supabase processor, retention and lawful basis.
- Obtain legal review; do not represent generated text as lawyer-approved.
- **Deliverable:** `docs/06_LEGAL_COMPLIANCE.md`.
- **Acceptance:** owner confirms every legal identity field; policy matches actual code and processors.

### Phase 9 — SEO

- Correct sitemap, `lastmod`, legal-page indexation, `hreflang` decision, heading hierarchy, alt localization.
- Keep canonical domain consistent with owner decision.
- Add structured data validation.
- **Deliverable:** `docs/05_SEO_PERFORMANCE.md`.
- **Acceptance:** sitemap matches live indexable pages; zero broken internal links; one H1 per page; no H1→H3 skips.

### Phase 10 — Performance

- Optimize the three large PNGs and logos.
- Add image dimensions and `srcset`.
- Measure LCP/INP/CLS with Lighthouse and field data where available.
- Keep the lightweight CSS/JS approach.
- **Target:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Actual results must be measured, not assumed.

### Phase 11 — Accessibility

- Run automated checks and manual keyboard/screen-reader passes.
- Fix dialog/menu/FAQ/filter state, focus management and contrast.
- **Acceptance:** WCAG 2.2 AA target; remaining limitations documented.

### Phase 12 — Testing and QA

- Add minimal Node-based test runner with:
  - route/rewrite existence checks;
  - sitemap/robots consistency;
  - local asset resolution;
  - CSP origin allow-list assertions;
  - RLS policy tests;
  - smoke tests for all pages with zero console errors;
  - form success/failure tests;
  - responsive checks at 390px and 1280px.
- Add CI gate on pull requests.
- **Deliverable:** `docs/07_QA_TEST_REPORT.md` with actual executed results.

### Phase 13 — Infrastructure and production readiness

- Document Vercel deployment, rollback, environment variables, Supabase migrations, backups and monitoring.
- Add release tags and deployment log.
- **Deliverable:** `docs/08_DEPLOYMENT_GUIDE.md`.
- **Acceptance:** a documented rollback restores the previous commit and database state.

### Phase 14 — Maintenance and handover

- README, maintenance guide, troubleshooting, third-party services, renewal requirements and client handover checklist.
- **Deliverable:** `docs/09_MAINTENANCE_GUIDE.md`.

### Phase 15 — Final quality gate

- Re-run all checks and produce `docs/10_FINAL_TRANSFORMATION_REPORT.md`.
- Use PASS/PARTIAL/FAIL/BLOCKED/NOT APPLICABLE.
- Do not declare production-ready while any CRITICAL issue remains unresolved.

---

## 9. Current deployment state

| Item | State |
|---|---|
| Animation work commit | `acd3118`, pushed to `origin/main`, live on Vercel. |
| This audit | Local branch `docs/phase-1-audit`, not pushed, not deployed. |
| Original `azertycorp/public` working tree | Untouched; still contains 23 uncommitted/untracked changes. |
| Production readiness | **FAIL** until C-01, C-02 and C-03 are resolved and verified. |

---

## 10. Approval request

Please approve or decide:

1. Proceed to Phase 2 using `docs/phase-1-audit` as the working branch?
2. Authoritative source and disposition of the 23 pending changes in `azertycorp/public`.
3. Authoritative domain.
4. Legal entity details and processor choices.
5. Form backend and whether Supabase remains.
6. Fate of `content-engine.html`.
7. Which claims/projects may remain.
8. Whether detail pages should be created or placeholder links removed.

Once these decisions are provided, implementation should proceed phase by phase with evidence and tests at each gate.
