# 04 — AZERTYCORP UI/UX Accessibility Notes (Phase 4)

**Generated:** 2026-11-18  
**Branch:** `implementation/phase-4`  
**Parent:** `docs/01_PROJECT_AUDIT.md`, `docs/02_TECHNICAL_ARCHITECTURE.md`, `docs/03_STRUCTURE_NOTES.md`  
**Deployment:** local only. No push, no Vercel deployment.

---

## 1. Scope

Phase 4 improves keyboard accessibility, dialog semantics, visible focus, color contrast and semantic heading order without changing the brand identity, layout, typography, palette, page structure or existing content.

No legal identity, canonical domain, client, statistic, partner or scheduler decision was assumed. Those items remain **BLOCKED** pending owner input.

---

## 2. Landmarks and keyboard navigation

### Applied to every public page

- Added a skip link before the header:
  - `class="skip-link"`
  - `href="#main-content"`
  - bilingual `data-fr` / `data-en` labels
- Wrapped the header and primary navigation in a single `<header class="site-header">` landmark.
- Added `<main id="main-content" tabindex="-1">` so the skip target is focusable.
- Added `aria-current="page"` to active navigation links.
- Kept the 404 page as a focused exception: it has the skip link and focusable main target, but no primary navigation header.

### CSS

- `.skip-link` is visually hidden using `transform: translateY(-200%)` and appears on `:focus` / `:focus-visible`.
- `:focus-visible` now uses the accessible `--primary-text` outline color instead of the saturated brand fill.

---

## 3. Dialog behavior

The quote modal, fullscreen mobile menu and gallery lightbox previously had inconsistent modal state and incomplete keyboard support.

### Applied

- Added `role="dialog"` and `aria-modal="true"` to the quote modal and mobile menu in HTML.
- Added `aria-labelledby="quoteModalTitle"` and `aria-hidden="true"` / `inert` initial state to the quote modal.
- Added a label to the mobile menu dialog.
- Added `data-autofocus` to the quote modal name field.
- Added `initDialogKeyboard()` in `assets/js/site.js`:
  - only one active dialog at a time;
  - `Escape` closes the active dialog;
  - `Tab` / `Shift+Tab` is trapped inside the dialog;
  - focus falls back to the dialog if it contains no focusable elements;
  - focus returns to the opener when the dialog closes;
  - body scroll is restored only when no dialog remains open.
- Converted the dynamically created lightbox into a labelled modal dialog with `aria-labelledby`, `aria-describedby`, `aria-hidden` and `inert` state.
- Added keyboard activation for `[data-open-quote][role="button"]` elements.
- Removed the `visibility` transition from `.full-menu` and `.quote-modal-overlay`. It kept dialogs visually hidden for one frame and prevented autofocus from entering them; the opacity fade remains.

### Why `inert`

`inert` prevents focus from escaping into hidden dialog content before JavaScript initializes. `openDialog()` removes it when the dialog opens and restores it when the dialog closes.

---

## 4. Color and contrast

The official AZERTY palette is unchanged. Text and icons that previously used the saturated red fill now use an accessible text token.

### Tokens

- `--primary` remains `#E51B23` for fills and backgrounds.
- `--primary-text` is:
  - `var(--red-dark)` in light mode;
  - `#FF6B6B` in dark mode.

### Applied

- Removed legacy `--gold`, `--gold-soft`, `--coral-soft`, `--teal` and `--teal-soft` aliases.
- Replaced inline legacy color variables in HTML with the existing brand red / accessible text token.
- Raised low-alpha graphite text from `.45`/`.5`/`.55`/`.6` to `.7` where it was used for body copy, captions and metadata.
- Raised low-alpha white text on dark surfaces to at least `.5` where needed.
- Added an explicit white color for footer pill buttons, overriding the inherited muted footer link color on the red background.
- Added a white hover state for the footer pill button so it remains readable while the background darkens.

No fill color or brand palette value was changed.

---

## 5. Stacking and hover fixes

- Cookie banner `z-index` lowered from `1200` to `940`, below the fullscreen menu (`950`) and quote modal (`1100`). This prevents the consent banner from covering modal controls.
- Showcase cards no longer scale via `!important` on the rotated wrapper, which caused a jump by overriding the inline rotation.
- Hover scaling now applies to `.showcase-card .inner`, with a transition. The original rotation, layering and card design are preserved.

---

## 6. Heading hierarchy

- Footer column headings changed from `<h4>` to `<h3>` so they follow the preceding page `<h2>` without skipping a level.
- CSS selector changed from `.footer-col h4` to `.footer-col h3`, with contrast raised from white `.5` to white `.6`.
- Footer heading text and styling purpose are unchanged.

---

## 7. Content integrity

- Unsupported “24 heures” / “24 hours” response-time promises were removed from visible copy, modal copy and metadata.
- Replaced with an honest email-reply statement: “Nous vous répondrons par email.” / “We’ll reply by email.”
- No new services, clients, statistics, certifications, partnerships, legal identities, URLs or claims were introduced.

---

## 8. Verification

### Automated

- `npm test`: 34/34 passing.
- New `tests/phase4.test.mjs` asserts:
  - skip links and focusable main landmarks on every public page;
  - one header landmark around routed navigation;
  - `aria-current` on active links;
  - dialog semantics and initial hidden/inert state;
  - accessible footer heading hierarchy;
  - dialog helper behavior, focus trap and Escape handling;
  - removal of unsupported 24-hour claims;
  - accessible tokens, safe stacking order, hover fix and contrast rules.
- `node --check assets/js/site.js`: passed.
- `git diff --check`: passed.

### Local browser

- Dialog state verified for quote modal, mobile menu and gallery lightbox:
  - correct roles and states;
  - autofocus enters the dialog;
  - focus remains trapped;
  - Escape closes and returns focus;
  - body overflow is restored.
- Cookie banner verified with `role="dialog"`, `aria-describedby` and `z-index: 940`.
- No console errors on index or gallery.
- Lighthouse local `index.html`:
  - Accessibility: **1.00**
  - Best Practices: **1.00**
  - SEO: **1.00**
  - No remaining accessibility findings.

Browser harness notes:

- `tools.browser.press({ key: 'Escape' })` did not deliver the key to the page in this harness; keyboard behavior was verified by dispatching a bubbling `KeyboardEvent('keydown', { key: 'Escape' })`.
- `tools.browser.hover` failed with `UnknownVizError` on transformed showcase cards; the hover fix is covered by static CSS assertions and computed-style checks.

---

## 9. Deferred UI/UX decisions

| Item | Status | Reason |
|---|---|---|
| Scheduler / booking flow | Deferred | No verified provider or URL supplied. |
| Service-detail pages | Deferred | No owner decision on which services merit routes. |
| Legal notice / cookie policy / FAQ page | Deferred | Requires legal identity, consent model and owner review. |
| Canonical domain | Deferred | `azertycorp-1.vercel.app` vs `azertycorp.com` unconfirmed. |
| Real social URLs | Deferred | URLs not supplied. |
| Performance phase | Pending | Phase 5 remains local-only until approved. |
