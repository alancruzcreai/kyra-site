'use strict';

/* ── DARK MODE ── */
const html = document.documentElement;
const btn  = document.getElementById('themeToggle');
const sun  = document.getElementById('iconSun');
const moon = document.getElementById('iconMoon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('cv-theme', theme);
  if (theme === 'dark') {
    sun.style.display  = 'none';
    moon.style.display = 'block';
  } else {
    sun.style.display  = 'block';
    moon.style.display = 'none';
  }
}

// Init from storage or system preference
const saved = localStorage.getItem('cv-theme');
if (saved) {
  applyTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
}

if (btn) btn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ── COPY EMAIL ── */
function copyEmail() {
  const email = 'nkyra95@gmail.com';
  navigator.clipboard?.writeText(email).then(() => toast('Email copied: ' + email))
    .catch(() => { fallbackCopy(email); toast('Email copied: ' + email); });
}

function fallbackCopy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function toast(msg) {
  document.querySelector('.cv-toast')?.remove();
  const t = document.createElement('div');
  t.className = 'cv-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ── ACHIEVEMENT CARD ANIMATIONS ── */
// Use CSS classes (not inline styles) so @media print can override
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('card-visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.achievement-card').forEach(c => {
    c.classList.add('card-enter');
    io.observe(c);
  });
});
