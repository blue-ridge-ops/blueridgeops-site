/* ============================================
   Blue Ridge Ops — Script
   ============================================ */

(function () {
  'use strict';

  // --- Scroll animations ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // --- Nav scroll state + back-to-top ---
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 20);

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active nav section tracking ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Contact form ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send — replace with real form handler (Formspree, Netlify, etc.)
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--accent)';
        btn.style.borderColor = 'var(--accent)';
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }
})();
