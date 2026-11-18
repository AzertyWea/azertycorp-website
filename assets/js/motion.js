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

  init();
})();
