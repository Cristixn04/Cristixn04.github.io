/* main.js — Portafolio Cristian Camilo Muñoz */

/* ── 1. Cursor personalizado ── */
(function () {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function followMouse() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(followMouse);
  }
  followMouse();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .soft-item, .vm-card, .contact-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
})();


/* ── 2. Navbar scroll ── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ── 3. Menú hamburguesa ── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
})();


/* ── 4. Active nav link on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── 5. Typing effect ── */
(function () {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Desarrollador Full Stack',
    'Backend Developer',
    'Automatización con IA',
    'Builder de Soluciones'
  ];

  let ri = 0, ci = 0, deleting = false;

  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        setTimeout(() => { deleting = true; tick(); }, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 50 : 80);
  }

  function tick() { type(); }
  tick();
})();


/* ── 6. AOS — Animate On Scroll (ligero, sin librería) ── */
(function () {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.aosDelay || '0', 10);
        setTimeout(() => e.target.classList.add('aos-animate'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();


/* ── 7. Barras de progreso técnicas (se animan cuando entran en vista) ── */
(function () {
  const fills = document.querySelectorAll('.tech-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = e.target.dataset.width || '0';
        e.target.style.width = pct + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => io.observe(f));
})();


/* ── 8. Contador de estadísticas (hero) ── */
(function () {
  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(el => {
          const text = el.textContent.trim();
          const num  = parseInt(text.replace(/\D/g, ''), 10);
          const suf  = text.replace(/[\d]/g, '');
          animateCount(el, num, suf, 1200);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  io.observe(statsEl);
})();


/* ── 9. Smooth scroll para todos los links internos ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});