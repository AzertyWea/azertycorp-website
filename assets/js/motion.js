/* ============================================================
   AZERTYCORP — MOTION REFINEMENT LAYER
   Dependency-free. Adds staggered reveals to elements that were
   not covered by the existing .reveal system, and gives existing
   .reveal groups a light stagger when no delay was authored.

   Loaded synchronously at the end of <body> so classes are in
   place before the deferred site.js reveal observer starts.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) return;

  function elements(list) {
    return Array.prototype.slice.call(list).filter(function (el) {
      return el && el.nodeType === 1;
    });
  }

  function collectGroup(nodes, stagger, seen, all) {
    var group = [];

    elements(nodes).forEach(function (el) {
      if (seen.indexOf(el) !== -1) return;
      /* Existing .reveal elements are already handled by site.js. */
      if (el.classList.contains('reveal')) return;
      if (el.closest && el.closest('.reveal')) return;
      seen.push(el);
      group.push(el);
    });

    group.forEach(function (el, index) {
      el.classList.add('m-reveal');
      el.style.setProperty('--m-delay', (index * stagger).toFixed(2) + 's');
      all.push(el);
    });
  }

  function staggerExistingReveals() {
    var groups = [];

    elements(document.querySelectorAll('.reveal')).forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;

      var found = null;
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].parent === parent) {
          found = groups[i];
          break;
        }
      }
      if (!found) {
        found = { parent: parent, items: [] };
        groups.push(found);
      }
      found.items.push(el);
    });

    groups.forEach(function (group) {
      group.items.forEach(function (el, index) {
        /* Never override an authored delay from the markup. */
        if (el.style.getPropertyValue('--d')) return;
        el.style.setProperty('--d', (index * 0.07).toFixed(2) + 's');
      });
    });
  }

  function reveal(all) {
    if (!all.length) return;

    if (!('IntersectionObserver' in window)) {
      all.forEach(function (el) { el.classList.add('m-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('m-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    all.forEach(function (el) { io.observe(el); });
  }

  function init() {
    var seen = [];
    var all = [];

    staggerExistingReveals();

    elements(document.querySelectorAll('.section-head')).forEach(function (head) {
      collectGroup(head.children, 0.07, seen, all);
    });

    elements(document.querySelectorAll('.services-scroll')).forEach(function (track) {
      collectGroup(
        elements(track.children).filter(function (el) {
          return el.classList.contains('service-slide');
        }),
        0.09,
        seen,
        all
      );
    });

    elements(document.querySelectorAll('.filters')).forEach(function (filters) {
      collectGroup(
        elements(filters.children).filter(function (el) {
          return el.classList.contains('filter-btn');
        }),
        0.05,
        seen,
        all
      );
    });

    reveal(all);
  }

  /* ----------------------------------------------------------
     MILIGRAM-INSPIRED CINEMATIC MOTION
     Dependency-free translation of the reference motion language:
     clip-path image reveals, blurred text rises, image parallax
     and a scroll-driven two-column curtain.
     ---------------------------------------------------------- */
  function initCinematicMotion() {
    var clipTargets = elements(document.querySelectorAll(
      '.accent-banner img, .service-card img, .why-media img, .showcase-card img, .demo-shot'
    ));
    clipTargets.forEach(function (el) { el.classList.add('m-clip'); });

    var parallaxTargets = elements(document.querySelectorAll(
      '.service-card img, .why-media img, .showcase-card img'
    ));
    parallaxTargets.forEach(function (el) { el.classList.add('m-parallax'); });

    var textTargets = [];
    var groups = [
      document.querySelectorAll('.band'),
      document.querySelectorAll('.ai-studio'),
      document.querySelectorAll('.cta-center > *'),
      document.querySelectorAll('.footer-brand > *'),
      document.querySelectorAll('.footer-col')
    ];

    groups.forEach(function (group) {
      elements(group).forEach(function (el, index) {
        if (el.classList.contains('m-reveal') || el.classList.contains('m-text')) return;
        el.classList.add('m-text');
        el.style.setProperty('--m-text-delay', (index * 0.06).toFixed(2) + 's');
        textTargets.push(el);
      });
    });

    var pendingRevealChecks = [];

    function observe(nodes, className) {
      if (!nodes.length) return;

      var pending = nodes.slice();
      var io = null;

      function mark(el) {
        if (el.classList.contains(className)) return;
        el.classList.add(className);
        var index = pending.indexOf(el);
        if (index !== -1) pending.splice(index, 1);
        if (io) io.unobserve(el);
      }

      /* Fallback for delayed or suppressed observer callbacks. */
      function checkViewport() {
        var vh = window.innerHeight || 1;
        pending.slice().forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < vh - 8 && rect.bottom > 8) mark(el);
        });
      }

      if (!('IntersectionObserver' in window)) {
        pending.slice().forEach(mark);
        return;
      }

      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) mark(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      pending.forEach(function (el) { io.observe(el); });
      pendingRevealChecks.push(checkViewport);
      checkViewport();
    }

    observe(clipTargets, 'is-revealed');
    observe(textTargets, 'is-revealed');

    var curtain = document.querySelector('[data-curtain]');
    var caption = curtain ? curtain.querySelector('.curtain-caption') : null;
    var lastUpdate = 0;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function update() {
      var vh = window.innerHeight || 1;

      pendingRevealChecks.forEach(function (check) { check(); });

      parallaxTargets.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var center = rect.top + rect.height / 2;
        var progress = (vh / 2 - center) / (vh / 2 + rect.height / 2);
        progress = clamp(progress, -1, 1);
        el.style.setProperty('--m-parallax', (progress * 28).toFixed(2) + 'px');
      });

      if (!curtain) return;

      var curtainRect = curtain.getBoundingClientRect();
      var total = curtainRect.height - vh;
      var p = total > 0 ? clamp(-curtainRect.top / total, 0, 1) : 0;

      curtain.style.setProperty('--curtain-left', (-64 * p).toFixed(2) + '%');
      curtain.style.setProperty('--curtain-right', (64 * p).toFixed(2) + '%');
      curtain.style.setProperty('--curtain-alpha', clamp((p - 0.38) * 2.8, 0, 1).toFixed(3));
      curtain.style.setProperty('--curtain-scale', (0.94 + p * 0.06).toFixed(3));
      if (caption) caption.style.opacity = p > 0.78 ? '0' : '1';
    }

    function requestUpdate() {
      var now = window.performance && performance.now ? performance.now() : Date.now();
      if (now - lastUpdate < 16) return;
      lastUpdate = now;
      update();
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  }

  init();
  initCinematicMotion();
})();
