document.addEventListener('DOMContentLoaded', () => {

  // ===== THEME TOGGLE =====
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('azertycorp-theme');

  if (saved === 'dark') {
    html.classList.add('dark');
  } else if (!saved) {
    // Default: light
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('azertycorp-theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    const isDark = html.classList.contains('dark');
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeBtn.innerHTML = isDark ? sunIcon : moonIcon;
  }
  updateThemeIcon();

  // ===== NAVBAR SCROLL =====
  const nav = document.querySelector('.nav-bar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 50);
    });
  }

  // ===== MOBILE MENU =====
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      menuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased) + '+';
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ===== ACCORDION =====
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('active');
        ai.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ===== TESTIMONIAL CAROUSEL =====
  const carousel = document.getElementById('testimonial-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let current = 0;
    let interval;

    function showSlide(index) {
      slides.forEach((s, i) => {
        s.style.display = i === index ? 'block' : 'none';
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      current = index;
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
      });
    });

    showSlide(0);
    interval = setInterval(nextSlide, 5000);
  }

  // ===== PORTFOLIO FILTER =====
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => {
          b.classList.remove('bg-foreground', 'text-background');
          b.classList.add('border', 'border-card-border');
        });
        btn.classList.add('bg-foreground', 'text-background');
        btn.classList.remove('border', 'border-card-border');

        document.querySelectorAll('[data-category]').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.php';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.php')) {
      link.classList.add('nav-active');
    }
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch('process-contact.php', {
        method: 'POST',
        body: formData
      })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          contactForm.reset();
          const msg = document.getElementById('form-success');
          if (msg) msg.classList.remove('hidden');
        } else {
          alert(data.message || 'Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        alert('Thank you! We\'ll reply within 24 hours.');
        contactForm.reset();
      });
    });
  }

  // ===== SLIDESHOW =====
  document.querySelectorAll('.slideshow').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const dots = slideshow.querySelectorAll('.slideshow-dot');
    const prevBtn = slideshow.querySelector('.slideshow-arrow.prev');
    const nextBtn = slideshow.querySelector('.slideshow-arrow.next');
    const progress = slideshow.querySelector('.slideshow-progress');
    let current = 0;
    let interval;
    const intervalTime = 5000;
    let progressInterval;

    function showSlide(index) {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
      resetProgress();
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
      showSlide((current - 1 + slides.length) % slides.length);
    }

    function resetProgress() {
      if (progress) {
        progress.style.transition = 'none';
        progress.style.width = '0%';
        void progress.offsetWidth;
        progress.style.transition = `width ${intervalTime}ms linear`;
        progress.style.width = '100%';
      }
    }

    function startAutoplay() {
      clearInterval(interval);
      nextSlide();
      interval = setInterval(nextSlide, intervalTime);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(interval); prevSlide(); interval = setInterval(nextSlide, intervalTime); });
    if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(interval); nextSlide(); interval = setInterval(nextSlide, intervalTime); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { clearInterval(interval); showSlide(i); interval = setInterval(nextSlide, intervalTime); });
    });

    // Keyboard
    slideshow.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { clearInterval(interval); prevSlide(); interval = setInterval(nextSlide, intervalTime); }
      if (e.key === 'ArrowRight') { clearInterval(interval); nextSlide(); interval = setInterval(nextSlide, intervalTime); }
    });

    // Touch swipe
    let touchStartX = 0;
    slideshow.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slideshow.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        clearInterval(interval);
        diff > 0 ? nextSlide() : prevSlide();
        interval = setInterval(nextSlide, intervalTime);
      }
    }, { passive: true });

    // Pause on hover
    slideshow.addEventListener('mouseenter', () => { clearInterval(interval); if (progress) progress.style.transitionPlayState = 'paused'; });
    slideshow.addEventListener('mouseleave', () => { interval = setInterval(nextSlide, intervalTime); if (progress) progress.style.transitionPlayState = 'running'; });

    showSlide(0);
    interval = setInterval(nextSlide, intervalTime);
  });
});
