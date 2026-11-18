# 03 — AZERTYCORP Website Structure Notes (Phase 3)

**Generated:** 2026-11-18  
**Branch:** `implementation/phase-3`  
**Parent:** `docs/01_PROJECT_AUDIT.md`, `docs/02_TECHNICAL_ARCHITECTURE.md`  
**Deployment:** local only. No push, no Vercel deployment.

---

## 1. Scope

Phase 3 removes fake navigation affordances without inventing destinations, pages or content. Existing page layout, copy, brand and routes are preserved.

No legal identity, domain, client, statistic, partner or scheduler decision was assumed. Those items remain **BLOCKED** pending owner input.

---

## 2. Decision: placeholder content cards

The audit found 34 content cards with `href="#"`:

- 4 blog cards in `blog.html`
- 10 portfolio/work cards in `portfolio.html`
- 20 gallery items in `gallery.html`

### Applied

- Blog and portfolio cards were converted from `<a href="#">` to `<article>` elements.
- Their `data-category`, `reveal` and styling classes were preserved, so filtering, motion and visual layout continue to work.
- Gallery items were converted from `<a href="#">` to `<button type="button">` elements because they have a real in-page behavior: opening the lightbox.
- CSS was added to reset native button styling while preserving the existing gallery appearance.

### Rationale

No verified article URLs, case-study URLs or project detail pages were supplied. A link to `#` is dishonest: it looks actionable but does nothing. Non-interactive cards retain the information without pretending to offer navigation.

If the owner later supplies verified detail pages, these articles can be upgraded to real links without changing their content.

---

## 3. Decision: unverified social icons

The audit found 44 footer social icons using `href="#"`.

### Applied

- Each icon was converted from `<a href="#" aria-label="…">` to `<span class="social-icon" aria-hidden="true">`.
- Footer CSS was updated to style `.social-icon`.
- Hover affordances were removed because the icons are no longer controls.

### Rationale

Real social profile URLs were not supplied. Keeping fake links would be misleading; inventing URLs is prohibited. Hiding the icons from assistive technology avoids announcing unavailable destinations. They remain visually present as branding decoration until verified URLs are provided.

---

## 4. Navigation and route integrity

- All 13 public pages continue to link to the primary navigation routes.
- The custom `404.html` from Phase 2 remains the only intentional non-page HTML artifact.
- `content-engine.html` and `content-engine.js` remain excluded from deployment.
- No new public route was created in this phase.

---

## 5. Deferred structure decisions

| Item | Status | Reason |
|---|---|---|
| Blog detail pages | Deferred | No verified article bodies/URLs. |
| Case-study detail pages | Deferred | No verified client/project permissions or content. |
| Dedicated service pages | Deferred | No owner decision on which services merit routes. |
| Legal notice / cookie policy / FAQ page | Deferred | Requires legal identity, consent model and owner review. |
| Real social URLs | Deferred | URLs not supplied. |
| Legal-page indexation | Deferred | Owner/legal decision required. |
| Canonical domain | Deferred | `azertycorp-1.vercel.app` vs `azertycorp.com` unconfirmed. |

---

## 6. Verification

- `npm test` includes a new `tests/structure.test.mjs`.
- Tests assert:
  - no `href="#"` remains on any public page;
  - blog/work placeholders are non-interactive articles;
  - gallery items are keyboard-accessible buttons with lightbox data;
  - social icons are non-interactive and hidden from assistive tech;
  - every public page links to the primary navigation routes.
- Browser smoke checks must be rerun locally after the change before any future deployment.
