# 05 — AZERTYCORP Scroll Story Notes

**Generated:** 2026-11-19  
**Branch:** `implementation/scroll-story`  
**Parent:** `docs/04_UI_UX_NOTES.md`  
**Deployment:** local only. No push, no Vercel deployment.

---

## 1. Request

The owner asked for scroll-driven animations that “tell a dimensional story,” instead of one-shot animations that finish before the visitor sees them.

This was implemented on the **homepage only**. Existing page structure, brand identity, palette, typography and copy are preserved. No new services, clients, statistics, claims or URLs were invented.

---

## 2. Narrative structure

The story uses the brand’s existing three pillars plus its existing transformation line:

| Chapter | Label | Sections |
|---|---|---|
| 01 | BUILD | Hero, services carousel, guarantees |
| 02 | AUTOMATE | Tech stack, engagement banner |
| 03 | DESIGN | Why AZERTYCORP, industry showcase |
| 04 | TRANSFORM | Live demo, contact CTA |

The labels reuse existing words from the homepage (`BUILD · AUTOMATE · DESIGN`, `BUILD. DESIGN. TRANSFORM.`). They are decorative and hidden from assistive technology because they duplicate existing headings and navigation.

---

## 3. Applied changes

### HTML — `index.html`

- Added a fixed chapter rail:
  - four chapter steps;
  - a vertical progress bar;
  - bilingual `data-fr` / `data-en` labels;
  - `aria-hidden="true"` because it is decorative.
- Tagged homepage sections with:
  - `data-story-scene`;
  - `data-story-chapter`;
  - `data-story-depth`.
- Added depth-layer hooks:
  - `story-bg` on the hero and engagement banner images;
  - `story-layer` on hero content, section heads, showcase stage, demo frame and CTA.

### CSS — `assets/css/site.css`

- `.story-layer` moves and subtly scales foreground content using CSS variables.
- `.story-bg` parallaxes background images with a slight overscale to avoid edge gaps.
- `.story-stage` adds a small perspective tilt to the floating showcase cards.
- `.story-rail` is a fixed, dark, blurred pill:
  - `z-index: 800` — below cookie banner (`940`), menu (`950`) and modal (`1100`);
  - hidden below `1280px` to avoid clutter on tablets/phones;
  - `pointer-events: none` so it never blocks content.
- Reduced-motion rules hide the rail and remove every story transform.

### JavaScript — `assets/js/site.js`

Added `initScrollStory()`:

- finds all `[data-story-scene]` sections;
- computes each section’s position relative to the viewport centre;
- writes `--story-shift`, `--story-scale`, `--story-bg-shift` and `--story-tilt` onto the scene;
- updates the rail progress from total document scroll;
- highlights the chapter whose section centre is closest to the viewport centre;
- throttles updates to roughly 60fps with a time-based check;
- uses a passive scroll listener;
- returns early and hides the rail when `prefers-reduced-motion: reduce` is active.

The time-based throttle was chosen because `requestAnimationFrame` does not fire reliably in the local browser harness. It behaves consistently in both the harness and real browsers.

---

## 4. Accessibility and performance

- Story rail is decorative and `aria-hidden`.
- No focus order or interactive target was changed.
- Animations use transforms only; no layout-affecting properties are animated.
- `prefers-reduced-motion` disables the entire effect.
- Depth values are intentionally small; text remains readable and images stay covered.
- The scroll listener is passive and throttled.

---

## 5. Verification

### Automated

- `npm test`: 38/38 passing.
- New `tests/scroll-story.test.mjs` asserts:
  - four-chapter rail exists;
  - homepage scenes are tagged by chapter;
  - depth hooks are present;
  - CSS defines story layers and reduced-motion resets;
  - script is throttled, chapter-aware and motion-safe.
- `node --check assets/js/site.js`: passed.
- `git diff --check`: passed.

### Browser

Local preview scroll checks confirmed:

| Scroll target | Active chapter | Progress |
|---|---|---|
| Top | `build` | 0% |
| `#stack` | `automate` | ~22% |
| Showcase | `design` | ~71% |
| `#demo` | `transform` | ~82% |
| `#contact` | `transform` | ~92% |

Depth variables and computed transforms changed with scroll. No console errors were recorded.

---

## 6. Deferred

- No story rail on inner pages yet.
- No new copy or imagery was added.
- No push, deployment or live Supabase change was made.
