/* ============================================================
   OE-WOV — main.js
   Scroll reveals, nav state, checklist animation, status bar
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAV: scroll state ---- */
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav__toggle');

  function toggleNav() {
    const isOpen = nav.classList.toggle('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  }

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateNavStatus();
  }

  /* ---- NAV: dynamic status based on section ---- */
  const sections = [
    { id: 'hero',         label: '● READY FOR DEPARTURE!' },
    { id: 'profile',      label: '● CLIMBING — PILOT IN COMMAND' },
    { id: 'capabilities', label: '● CRUISE — SYSTEMS CHECK' },
    { id: 'checklist',    label: '● PRE-DEPARTURE CHECKLIST' },
    { id: 'logbook',      label: '● REVIEWING FLIGHT LOG' },
    { id: 'voice',        label: '● FREQUENCY OPEN' },
    { id: 'contact',      label: '● FINAL APPROACH — TOWER CONTACT' },
  ];

  const navStatus = document.getElementById('navStatus');

  function updateNavStatus() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    let active = sections[0];

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      if (el.offsetTop <= scrollMid) active = s;
    }

    if (navStatus.textContent !== active.label) {
      navStatus.style.opacity = '0';
      setTimeout(() => {
        navStatus.textContent = active.label;
        navStatus.style.opacity = '0.8';
      }, 200);
    }
  }

  /* ---- REVEAL ON SCROLL ---- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- CHECKLIST: animate ticks and progress bar ---- */
  const checkItems = document.querySelectorAll('.checklist__item[data-check]');
  const checkFill  = document.getElementById('checklistFill');
  const checkPct   = document.getElementById('checklistPct');
  let   checked    = 0;
  let   checkStarted = false;

  function runChecklist() {
    if (checkStarted) return;
    checkStarted = true;

    checkItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('checked');
        checked++;
        const pct = Math.round((checked / checkItems.length) * 100);
        if (checkFill) checkFill.style.width = pct + '%';
        if (checkPct)  checkPct.textContent  = pct + '%';
      }, i * 280);
    });
  }

  const checklistSection = document.getElementById('checklist');

  const checklistObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(runChecklist, 400);
        checklistObserver.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (checklistSection) checklistObserver.observe(checklistSection);

  /* ---- NAV: mobile toggle ---- */
  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  /* ---- SMOOTH ANCHOR SCROLLING with nav offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });

      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
        }
      }
    });
  });

  /* ---- VIDEO: ensure autoplay on mobile ---- */
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // autoplay blocked — poster image is already shown, no action needed
    });
  }

  /* ---- HORIZON DIVIDERS: stagger fade-in ---- */
  const dividers = document.querySelectorAll('.horizon-divider');
  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          dividerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  dividers.forEach((d) => {
    d.style.opacity    = '0';
    d.style.transition = 'opacity 0.8s ease';
    dividerObserver.observe(d);
  });

  /* ---- LOGBOOK STATS: count-up animation ---- */
  function animateCount(el, target, duration, suffix) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * target;
      el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const statNumbers = document.querySelectorAll('.logbook__stat-number');
  let statsStarted  = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !statsStarted) {
        statsStarted = true;
        const targets = [25, 4, 2];
        const suffixes = ['+', '', '×'];
        statNumbers.forEach((el, i) => {
          animateCount(el, targets[i], 1400, suffixes[i]);
        });
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  const logbookSection = document.getElementById('logbook');
  if (logbookSection) statsObserver.observe(logbookSection);

  /* ---- INIT ---- */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();
