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

  /* ----------------------------------------------------------
     I18N — current language + UI strings (shared by all parts)
     ---------------------------------------------------------- */
  var currentLang = 'fr';
  try { currentLang = localStorage.getItem('azerty-lang') || 'fr'; } catch (e) {}

  var UI_STRINGS = {
    fr: {
      'close': 'Fermer',
      'send': 'Envoi...',
      'form-not-config': 'Formulaire de contact non configuré. Écrivez-nous à hello@azertycorp.com',
      'thank-you': 'Merci ! Nous vous répondrons sous 24 heures.',
      'error': 'Une erreur est survenue. Veuillez réessayer.',
      'theme-dark': 'Passer en thème sombre',
      'theme-light': 'Passer en thème clair',
      'cta-1': 'Parler au studio',
      'cta-2': 'Voir les tarifs',
      'cta-3': 'Réserver un appel',
      'cookie-aria': 'Consentement aux cookies'
    },
    en: {
      'close': 'Close',
      'send': 'Sending...',
      'form-not-config': 'Contact form not configured yet. Reach us at hello@azertycorp.com',
      'thank-you': 'Thank you! We will reply within 24 hours.',
      'error': 'Something went wrong. Please try again.',
      'theme-dark': 'Switch to dark theme',
      'theme-light': 'Switch to light theme',
      'cta-1': 'Talk to the studio',
      'cta-2': 'View pricing',
      'cta-3': 'Book a call',
      'cookie-aria': 'Cookie consent'
    }
  };
  function _t(key) {
    var s = UI_STRINGS[currentLang];
    return (s && s[key]) || key;
  }

  function applyLang(l) {
    currentLang = l;
    document.documentElement.lang = l;
    document.querySelectorAll('[data-fr],[data-fr-html]').forEach(function (el) {
      var isFr = (l === 'fr');
      if (el.hasAttribute(isFr ? 'data-fr-html' : 'data-en-html')) {
        el.innerHTML = el.getAttribute(isFr ? 'data-fr-html' : 'data-en-html');
      } else if (el.hasAttribute(isFr ? 'data-fr' : 'data-en')) {
        el.textContent = el.getAttribute(isFr ? 'data-fr' : 'data-en');
      }
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('tc-on', b.getAttribute('data-lang-btn') === l);
    });
  }

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
    b.setAttribute('aria-label', _t('cookie-aria'));
    b.innerHTML =
      '<div class="ccb-inner">' +
        '<p class="ccb-text" data-fr-html="Nous utilisons des cookies pour les statistiques et pour améliorer votre expérience. <a href=\'/privacy\' class=\'ccb-link\'>Politique de confidentialité</a>" data-en-html="We use cookies for analytics and to improve your experience. <a href=\'/privacy\' class=\'ccb-link\'>Privacy Policy</a>">Nous utilisons des cookies pour les statistiques et pour améliorer votre expérience. <a href="/privacy" class="ccb-link">Politique de confidentialité</a></p>' +
        '<div class="ccb-actions">' +
          '<button type="button" class="ccb-btn ccb-reject" id="cookie-reject" data-fr="Refuser" data-en="Reject">Refuser</button>' +
          '<button type="button" class="ccb-btn ccb-accept" id="cookie-accept" data-fr="Accepter" data-en="Accept">Accepter</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    applyLang(currentLang);
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
    var texts = [_t('cta-1'), _t('cta-2'), _t('cta-3')];
    var i = 0;
    if (window.matchMedia && window.matchMedia('(max-width: 1023px)').matches &&
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
        '<button class="qm-close" style="margin-left:auto;color:#fff;border-color:rgba(255,255,255,.2)" aria-label="' + _t('close') + '">&times;</button>' +
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
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = _t('send'); }
        var data = new FormData(form);
        var saved = false;
        if (window.AZAPI) {
          AZAPI.submitLead(data, 'quote-modal').then(function () { saved = true; }).catch(function () {});
        }
        if (CONFIG.WEB3FORMS_KEY) {
          data.append('access_key', CONFIG.WEB3FORMS_KEY);
          data.append('subject', 'New quote request from ' + CONFIG.SITE_NAME + ' website');
          data.append('from_name', 'AZERTYCORP Website');
          fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
            .then(function (r) { return r.json(); })
            .then(function (res) {
              if (res.success) saved = true;
            })
            .catch(function () { saved = true; });
        } else {
          saved = true;
        }
        window.setTimeout(function () {
          if (!saved) return;
          form.reset();
          if (status) { status.textContent = _t('thank-you'); status.className = 'qm-status ok'; }
          try { window.fbq && window.fbq('track', 'Lead'); } catch (err) {}
          if (btn) { btn.disabled = false; btn.textContent = original; }
        }, 900);
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
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = _t('send'); }
      var data = new FormData(form);
      var saved = false;
      if (window.AZAPI) {
        AZAPI.submitLead(data, 'contact-page').then(function () { saved = true; }).catch(function () {});
      }
      if (CONFIG.WEB3FORMS_KEY) {
        data.append('access_key', CONFIG.WEB3FORMS_KEY);
        data.append('subject', 'New contact from ' + CONFIG.SITE_NAME + ' website');
        data.append('from_name', 'AZERTYCORP Website');
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
          .then(function (r) { return r.json(); })
          .then(function (res) { if (res.success) saved = true; })
          .catch(function () { saved = true; });
      } else {
        saved = true;
      }
      window.setTimeout(function () {
        if (!saved) return;
        form.reset();
        if (status) { status.textContent = _t('thank-you'); status.className = 'form-status ok'; }
        if (btn) { btn.disabled = false; btn.textContent = original; }
      }, 900);
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
        b.setAttribute('aria-label', t === 'dark' ? _t('theme-light') : _t('theme-dark'));
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
     LANGUAGE FR/EN — data-fr/data-en swap, persisted, synced
     ---------------------------------------------------------- */
  function initLang() {
    var KEY = 'azerty-lang';
    function setLang(l) {
      try { localStorage.setItem(KEY, l); } catch (e) {}
      applyLang(l);
    }

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang-btn')); });
    });
    try {
      window.addEventListener('storage', function (e) {
        if (e.key === KEY && e.newValue) applyLang(e.newValue);
      });
    } catch (e) {}

    applyLang(currentLang);
  }

  /* ----------------------------------------------------------
     PRICING CURRENCY — FCFA / USD (pricing page only)
     ---------------------------------------------------------- */
  function initCurrency() {
    var cur = 'fcfa';
    try { cur = localStorage.getItem('azerty-cur') || 'fcfa'; } catch (e) {}
    function applyCur(c) {
      document.querySelectorAll('[data-fcfa]').forEach(function (el) {
        el.textContent = el.getAttribute(c === 'fcfa' ? 'data-fcfa' : 'data-usd');
      });
      document.querySelectorAll('[data-cur-btn]').forEach(function (b) {
        b.classList.toggle('tc-on', b.getAttribute('data-cur-btn') === c);
      });
    }
    document.querySelectorAll('[data-cur-btn]').forEach(function (b) {
      b.addEventListener('click', function () {
        cur = b.getAttribute('data-cur-btn');
        try { localStorage.setItem('azerty-cur', cur); } catch (e) {}
        applyCur(cur);
      });
    });
    applyCur(cur);
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
    initLang();
    initCurrency();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
