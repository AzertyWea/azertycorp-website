# 06 — AZERTYCORP Miligram-Inspired Motion Notes

**Generated:** 2026-11-20  
**Branch:** `implementation/scroll-story`  
**Parent:** `docs/05_SCROLL_STORY_NOTES.md`  
**Deployment:** preview branch only. No push to `main`, no production deployment, no Supabase live write.

---

## 1. Request

The owner asked for animation and motion sequences inspired by `https://miligram.pt/`, especially its transition rhythm, scroll reveals and pinned image sequence.

The reference site uses GSAP, ScrollTrigger, Lenis and SplitText. This implementation deliberately **does not add those dependencies**. It translates the same motion language with the existing dependency-free CSS/JS stack, so the current CSP, performance budget and static hosting model remain unchanged.

Brand identity, palette, typography, copy, navigation, links, imagery and all existing content were preserved. No service, client, statistic, certification, partnership or claim was invented.

---

## 2. Reference patterns translated

| Miligram pattern | AZERTYCORP adaptation |
|---|---|
| Hero media curtain | `.hero-media` clip-path reveal from bottom to top |
| Split/blurred word rise | Existing hero lines receive a blurred `translate` entrance; copy and line breaks are unchanged |
| `clip-path` image reveal | `.m-clip` on existing images, revealed when scrolled into view |
| Image parallax | `.m-parallax` writes a small `--m-parallax` translate to existing card/banner images |
| Pinned image-grid curtain | Industry showcase becomes a 230vh scroll section with two parting columns and a centered overlay |
| Reverse logo marquee | Existing AI Studio logos are duplicated once and the track runs `reverse` |
| Header/card stack effects | Not adopted: unnecessary for the current layout and would add complexity without value |

---

## 3. Applied changes

### `index.html`

- Wrapped the existing industry showcase in `.curtain-scroll[data-curtain]`.
- Added `.curtain-sticky`, `.showcase-columns`, `.showcase-column--left`, `.showcase-column--right` and `.showcase-curtain`.
- Kept all nine original industry cards and their existing `portfolio.html` links.
- Duplicated the existing AI Studio logo group once, with `aria-hidden="true"` on the duplicate.
- Cache-busted `motion.css` and `motion.js` to `?v=20261120a`.

### `assets/css/motion.css`

- Added `mHeroMediaIn` and `mHeroWordIn` keyframes.
- Added `.m-clip`, `.m-parallax` and `.m-text` states.
- Added the reverse `.ai-marquee-track` animation and edge mask.
- Added the pinned curtain layout:
  - `.curtain-scroll` height `230vh`;
  - `.curtain-sticky` height `100vh/100svh`;
  - two absolutely layered columns driven by `--curtain-left` / `--curtain-right`;
  - overlay opacity driven by `--curtain-alpha`;
  - overlay scale driven by `--curtain-scale`.
- Added a mobile fallback below `1024px`: static showcase, no pinning, no curtain, no column transforms.
- Extended `prefers-reduced-motion: reduce` so every cinematic effect is removed while the composition stays intact.

### `assets/js/motion.js`

Added `initCinematicMotion()`:

- tags existing images with `.m-clip` / `.m-parallax`;
- tags selected secondary blocks with `.m-text`;
- observes reveals with `IntersectionObserver`;
- adds a viewport/scroll fallback for delayed or suppressed observer callbacks;
- writes `--m-parallax` for nearby images only;
- computes curtain progress from the section’s sticky scroll range;
- updates all curtain variables from one passive, time-throttled scroll listener;
- fades the existing caption near the end of the curtain sequence;
- returns early under `prefers-reduced-motion: reduce`.

No global library, bundler, font, image or network request was added.

---

## 4. Accessibility and performance

- The curtain overlay and chapter rail remain decorative and are hidden from assistive technology.
- No focus order, label, link destination or interactive target changed.
- The duplicated marquee group is `aria-hidden="true"`.
- Animation uses `clip-path`, opacity, filter and transforms; no layout property is animated.
- Off-screen parallax work is skipped.
- The scroll listener is passive and throttled to roughly 60fps.
- `prefers-reduced-motion` removes hero, reveal, parallax, marquee, pinning and curtain motion.

---

## 5. Verification

### Automated

- `npm test`: **43/43 passing**.
- New `tests/miligram-motion.test.mjs` asserts:
  - curtain showcase structure;
  - nine original industry cards and existing portfolio links;
  - duplicated marquee with hidden copy;
  - cache-busted assets;
  - CSS reveals, parallax, curtain and reduced-motion fallback;
  - dependency-free, throttled, scroll-driven JS;
  - observer fallback path.
- `node --check assets/js/motion.js`: passed.
- `git diff --check`: passed.

### Browser

The harness viewport is below the `1024px` desktop breakpoint, so QA used a same-origin `1280×800` iframe to exercise the desktop curtain path.

| Curtain scroll | `--curtain-left` | `--curtain-right` | `--curtain-alpha` | `--curtain-scale` | Caption |
|---|---:|---:|---:|---:|---|
| 0% | `-0.01%` | `0.01%` | `0.000` | `0.940` | visible |
| 50% | `-32.01%` | `32.01%` | `0.336` | `0.970` | visible |
| 95% | `-60.81%` | `60.81%` | `1.000` | `0.997` | hidden |

Computed column transforms moved from `matrix(1, 0, 0, 1, 0, 0)` to approximately `±321px`; overlay opacity matched `--curtain-alpha`. The scroll-story rail stayed on the existing `design` chapter with progress from `62.6%` to `73.4%`, confirming the two systems coexist.

Reveal checks after scrolling to targets:

- `.m-clip.is-revealed` present; computed `clip-path: inset(0px)`.
- `.m-text.is-revealed` present; computed `opacity: 1`, `filter: blur(0px)`.
- Marquee computed `animation-name: mAIMarquee`, `animation-direction: reverse`.
- No console errors.

The `IntersectionObserver` callbacks did not fire reliably in the browser harness, so the scroll/viewport fallback was added. It augments, not replaces, the observer in real browsers.

### Lighthouse

Local audit of `?cinematic=1`:

- Accessibility: **1.00**
- Best Practices: **1.00**
- SEO: **1.00**
- Failures: none
- Console errors: none

Screenshot capture remained unavailable because the harness requires a separately visible desktop window; DOM/computed-style verification was used instead.

---

## 6. Deferred

- No GSAP, ScrollTrigger, Lenis or SplitText runtime.
- No new images, copy, fonts, routes or claims.
- Cinematic curtain remains homepage-only.
- No production push and no Vercel deployment from this step.
- No Supabase live write.
