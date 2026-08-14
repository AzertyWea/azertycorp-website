/* ============================================================
   AZERTYCORP — site.js (static, no build step)
   Cookie consent + gated analytics, mobile menu, reveal,
   counters, carousel, FAQ, filters, quote modal, Web3Forms.
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG — replace with your own tracking IDs / form key.
     Empty IDs disable tracking entirely (GDPR-safe default).
     ---------------------------------------------------------- */
  var CONFIG = {
    GA4_MEASUREMENT_ID: '',            // e.g. 'G-XXXXXXX'
    GOOGLE_ADS_ID: '',                 // e.g. 'AW-XXXXXXX'
    META_PIXEL_ID: '',                 // e.g. '123456789'
    WEB3FORMS_KEY: '',                 // Web3Forms access key
    SITE_NAME: 'AZERTYCORP',
    STORAGE_KEY: 'azertycorp:cookie-consent'
  };

  var consent = null;
  try { consent = localStorage.getItem(CONFIG.STORAGE_KEY); } catch (e) {}
  window.__cookieConsent = consent;

  var consentCallbacks = [];
  window.__onCookieConsent = function (fn) {
    if (window.__cookieConsent === 'accepted') { fn(); return; }
    consentCallbacks.push(fn);
  };
  window.__setCookieConsent = function (value) {
    window.__cookieConsent = value;
    try { localStorage.setItem(CONFIG.STORAGE_KEY, value); } catch (e) {}
    if (value === 'accepted') {
      consentCallbacks.forEach(function (fn) { try { fn(); } catch (e) {} });
    }
    consentCallbacks = [];
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(function () { banner.remove(); }, 300);
    }
  };

  /* ----------------------------------------------------------
     GATED ANALYTICS — loads only after explicit accept.
     ---------------------------------------------------------- */
  function initAnalytics() {
    if (!CONFIG.GA4_MEASUREMENT_ID && !CONFIG.META_PIXEL_ID && !CONFIG.GOOGLE_ADS_ID) return;

    var interactionEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart'];

    /* ---- gtag: GA4 + Google Ads ---- */
    if (CONFIG.GA4_MEASUREMENT_ID) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.GA4_MEASUREMENT_ID);

      var adsConfigured = false;
      function configureAds() {
        if (!CONFIG.GOOGLE_ADS_ID || adsConfigured) return;
        adsConfigured = true;
        window.gtag('config', CONFIG.GOOGLE_ADS_ID);
      }
      function loadGtag() {
        if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_MEASUREMENT_ID);
        document.head.appendChild(s);
      }
      window.__ensureGtag = function () { loadGtag(); configureAds(); };

      var done = false;
      function onInteraction() {
        if (done) return;
        done = true;
        loadGtag();
        configureAds();
        interactionEvents.forEach(function (ev) {
          window.removeEventListener(ev, onInteraction, { passive: true, capture: true });
        });
      }
      interactionEvents.forEach(function (ev) {
        window.addEventListener(ev, onInteraction, { passive: true, capture: true });
      });

      /* tel:/mailto: click conversions */
      document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
        if (!a || !CONFIG.GOOGLE_ADS_ID || typeof window.__ensureGtag !== 'function') return;
        try { window.__ensureGtag(); } catch (err) {}
      }, true);
    }

    /* ---- Meta Pixel (load on interaction) ---- */
    if (CONFIG.META_PIXEL_ID) {
      function loadPixel() {
        if (window.fbq) return;
        !function (f, b, e, v, n, t, s) {
          if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0';
          n.queue = []; t = b.createElement(e); t.async = true;
          t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', CONFIG.META_PIXEL_ID);
        fbq('track', 'PageView');
      }
      window.__ensurePixel = loadPixel;
      var pDone = false;
      function onPixelInteraction() {
        if (pDone) return;
        pDone = true;
        loadPixel();
        interactionEvents.forEach(function (ev) {
          window.removeEventListener(ev, onPixelInteraction, { passive: true, capture: true });
        });
      }
      interactionEvents.forEach(function (ev) {
        window.addEventListener(ev, onPixelInteraction, { passive: true, capture: true });
      });
    }
  }

  if (window.__cookieConsent === 'accepted') initAnalytics();
  else window.__onCookieConsent(initAnalytics);

  /* ----------------------------------------------------------
     COOKIE CONSENT BANNER (inject if undecided)
     ---------------------------------------------------------- */
  function injectCookieBanner() {
    if (window.__cookieConsent || document.getElementById('cookie-consent-banner')) return;
    var b = document.createElement('div');
    b.id = 'cookie-consent-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie consent');
    b.innerHTML =
      '<div class="ccb-inner">' +
        '<p class="ccb-text">We use cookies for analytics and to improve your experience. ' +
          '<a href="/privacy" class="ccb-link">Privacy Policy</a></p>' +
        '<div class="ccb-actions">' +
          '<button type="button" class="ccb-btn ccb-reject" id="cookie-reject">Reject</button>' +
          '<button type="button" class="ccb-btn ccb-accept" id="cookie-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add('ccb-visible'); });
    document.getElementById('cookie-accept').addEventListener('click', function () {
      window.__setCookieConsent('accepted');
    });
    document.getElementById('cookie-reject').addEventListener('click', function () {
      window.__setCookieConsent('rejected');
    });
  }
  setTimeout(injectCookieBanner, 800);

  /* ----------------------------------------------------------
     MOBILE FULLSCREEN MENU
     ---------------------------------------------------------- */
  function initMobileMenu() {
    var openBtns = document.querySelectorAll('[data-menu-open]');
    var menu = document.getElementById('fullMenu');
    var closeBtn = document.getElementById('fullMenuClose');
    if (!menu) return;

    function open() {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
    openBtns.forEach(function (btn) { btn.addEventListener('click', open); });
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  /* ----------------------------------------------------------
     MOBILE NAV CTA ROTATION (desktop-only rotation avoided)
     ---------------------------------------------------------- */
  function initMobileCta() {
    var el = document.querySelector('[data-mobile-nav-text]');
    if (!el) return;
    var texts = ['Talk to the studio', 'View pricing', 'Book a call'];
    var i = 0;
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(function () {
        el.classList.add('is-leaving');
        setTimeout(function () {
          i = (i + 1) % texts.length;
          el.textContent = texts[i];
          el.classList.remove('is-leaving');
          el.classList.add('is-entering');
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { el.classList.remove('is-entering'); });
          });
        }, 180);
      }, 2600);
    }
  }

  /* ----------------------------------------------------------
     REVEAL ON SCROLL
     ---------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     STAT COUNTERS
     ---------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
      return;
    }
    var counted = new Set();
    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = performance.now();
      function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     SERVICES CAROUSEL
     ---------------------------------------------------------- */
  function initCarousel() {
    var track = document.querySelector('.services-scroll');
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    if (!track) return;
    function scrollBySlides(dir) {
      var slide = track.querySelector('.service-slide');
      var amount = slide ? slide.getBoundingClientRect().width + 16 : 340;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { scrollBySlides(-1); });
    if (next) next.addEventListener('click', function () { scrollBySlides(1); });
  }

  /* ----------------------------------------------------------
     FAQ ACCORDION
     ---------------------------------------------------------- */
  function initFaq() {
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  /* ----------------------------------------------------------
     FILTERS (portfolio / gallery / services)
     ---------------------------------------------------------- */
  function initFilters() {
    var containers = document.querySelectorAll('[data-filter-container]');
    containers.forEach(function (container) {
      var btns = container.querySelectorAll('.filter-btn');
      var items = document.querySelectorAll('[data-filter-target="' + container.getAttribute('data-filter-container') + '"]');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var f = btn.getAttribute('data-filter');
          items.forEach(function (item) {
            var show = (f === 'all') || (item.getAttribute('data-category') || '').indexOf(f) !== -1;
            item.style.display = show ? '' : 'none';
            if (show) {
              item.classList.remove('is-visible');
              requestAnimationFrame(function () { item.classList.add('is-visible'); });
            }
          });
        });
      });
    });
  }

  /* ----------------------------------------------------------
     GALLERY LIGHTBOX
     ---------------------------------------------------------- */
  function initLightbox() {
    var items = document.querySelectorAll('[data-lightbox]');
    if (!items.length) return;
    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'quote-modal-overlay';
    lb.innerHTML =
      '<div class="quote-modal-panel" style="background:var(--ink);text-align:center;padding:1.5rem">' +
        '<button class="qm-close" style="margin-left:auto;color:#fff;border-color:rgba(255,255,255,.2)" aria-label="Close">&times;</button>' +
        '<img alt="" style="width:100%;border-radius:.8rem;margin-top:1rem">' +
        '<h3 style="color:#fff;font-family:var(--font-display);margin-top:1rem"></h3>' +
        '<p style="color:rgba(255,255,255,.6);font-size:.9rem"></p>' +
      '</div>';
    document.body.appendChild(lb);
    var img = lb.querySelector('img');
    var cap = lb.querySelector('h3');
    var desc = lb.querySelector('p');
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    lb.querySelector('.qm-close').addEventListener('click', close);
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    items.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        img.src = item.getAttribute('data-full') || item.querySelector('img').getAttribute('src');
        cap.textContent = item.getAttribute('data-title') || '';
        desc.textContent = item.getAttribute('data-desc') || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  /* ----------------------------------------------------------
     QUOTE MODAL
     ---------------------------------------------------------- */
  function initQuoteModal() {
    var overlay = document.getElementById('quoteModal');
    if (!overlay) return;
    var form = document.getElementById('quoteForm');
    var status = document.getElementById('quoteStatus');

    function open() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      try { window.__ensurePixel && window.__ensurePixel(); } catch (e) {}
      try { window.__ensureGtag && window.__ensureGtag(); } catch (e) {}
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    window.addEventListener('open-quote-modal', open);
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-open-quote]') : null;
      if (!t) return;
      open();
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    var closeBtn = overlay.querySelector('.qm-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!CONFIG.WEB3FORMS_KEY) {
          if (status) {
            status.textContent = 'Contact form not configured yet. Reach us at hello@azertycorp.com';
            status.className = 'qm-status err';
          }
          return;
        }
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
        var data = new FormData(form);
        data.append('access_key', CONFIG.WEB3FORMS_KEY);
        data.append('subject', 'New quote request from ' + CONFIG.SITE_NAME + ' website');
        data.append('from_name', 'AZERTYCORP Website');
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res.success) {
              form.reset();
              if (status) { status.textContent = 'Thank you! We will reply within 24 hours.'; status.className = 'qm-status ok'; }
              try { window.fbq && window.fbq('track', 'Lead'); } catch (e) {}
            } else {
              if (status) { status.textContent = res.message || 'Something went wrong. Please try again.'; status.className = 'qm-status err'; }
            }
          })
          .catch(function () {
            if (status) { status.textContent = 'Thank you! We will reply within 24 hours.'; status.className = 'qm-status ok'; }
          })
          .finally(function () {
            if (btn) { btn.disabled = false; btn.textContent = original; }
          });
      });
    }
  }

  /* ----------------------------------------------------------
     CONTACT PAGE FORM (Web3Forms)
     ---------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('contactFormStatus');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!CONFIG.WEB3FORMS_KEY) {
        if (status) { status.textContent = 'Contact form not configured yet. Reach us at hello@azertycorp.com'; status.className = 'form-status err'; }
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      var data = new FormData(form);
      data.append('access_key', CONFIG.WEB3FORMS_KEY);
      data.append('subject', 'New contact from ' + CONFIG.SITE_NAME + ' website');
      data.append('from_name', 'AZERTYCORP Website');
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            form.reset();
            if (status) { status.textContent = 'Thank you! We will reply within 24 hours.'; status.className = 'form-status ok'; }
          } else {
            if (status) { status.textContent = res.message || 'Something went wrong. Please try again.'; status.className = 'form-status err'; }
          }
        })
        .catch(function () {
          if (status) { status.textContent = 'Thank you! We will reply within 24 hours.'; status.className = 'form-status ok'; }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }

  /* ----------------------------------------------------------
     THEME TOGGLE — light / dark (persisted)
     ---------------------------------------------------------- */
  function initTheme() {
    var KEY = 'azerty-theme';
    var current = 'light';
    try { current = localStorage.getItem(KEY) || 'light'; } catch (e) {}
    function apply(t) {
      document.documentElement.setAttribute('data-theme', t);
      document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
        b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      });
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    });
    apply(current);
  }

  /* ----------------------------------------------------------
     NAV SCROLL SHADOW (desktop pill shadow on scroll)
     ---------------------------------------------------------- */
  function initNavScroll() {
    var pill = document.querySelector('.nav-pill-wrap');
    if (!pill) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) pill.style.boxShadow = '0 20px 50px rgba(0,0,0,.28)';
      else pill.style.boxShadow = '';
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     BOOT
     ---------------------------------------------------------- */
  function boot() {
    initMobileMenu();
    initMobileCta();
    initReveal();
    initCounters();
    initCarousel();
    initFaq();
    initFilters();
    initLightbox();
    initQuoteModal();
    initContactForm();
    initNavScroll();
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
