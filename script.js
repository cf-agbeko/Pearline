/* =============================================
   PEARLINE — script.js
   Scroll animations + micro-interactions
   ============================================= */

// ── Intersection Observer for fade-up animations ──
const fadeEls = document.querySelectorAll(
  '.service-card, .about-headline, .about-text, .strip-title, .tickets-text h2, .btn-editorial, .btn-dark'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grid parents
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});

// ── Service cards stagger delay ──
const cards = document.querySelectorAll('.service-card');
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.05}s`;
});

// ── Stamp tilt on mousemove ──
const stamp = document.querySelector('.hero-stamp');
if (stamp) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 8;
    const y = (e.clientY / innerHeight - 0.5) * 8;
    stamp.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
}

// ── Portfolio items — subtle hover lift ──
document.querySelectorAll('.port-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.02)';
    item.style.transition = 'transform 0.3s ease, opacity 0.2s';
    item.style.zIndex = '2';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
    item.style.zIndex = '1';
  });
});

// ── Nav shrink on scroll ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.padding = '0.8rem 3rem';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.padding = '1.2rem 3rem';
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ── Tape strips — random slight skew on load ──
document.querySelectorAll('.hero-tape').forEach((tape, i) => {
  const skew = (Math.random() - 0.5) * 2;
  const baseRot = i === 0 ? -1.5 : 1;
  tape.style.transform = `rotate(${baseRot + skew}deg)`;
});
