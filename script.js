const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const templePhoto = document.querySelector('.temple-photo');
if (templePhoto) {
  templePhoto.style.setProperty('background-image', 'url("assets/living-temple-building.png")', 'important');
  templePhoto.style.setProperty('background-position', 'center', 'important');
  templePhoto.style.setProperty('background-size', 'cover', 'important');
  templePhoto.style.setProperty('background-repeat', 'no-repeat', 'important');
}

const composite = 'url("assets/ChatGPT Image Aug 24, 2026, 11_28_20 AM.png")';

function styleStoryVisual(el, image, position, ratio, size = 'cover') {
  if (!el) return;
  const img = el.querySelector('img');
  if (img) img.style.display = 'none';
  el.style.display = 'block';
  el.style.width = 'min(860px, 92%)';
  el.style.aspectRatio = ratio;
  el.style.margin = '44px auto 42px';
  el.style.borderRadius = '24px';
  el.style.overflow = 'hidden';
  el.style.backgroundImage = image;
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundSize = size;
  el.style.backgroundPosition = position;
  el.style.backgroundColor = '#06101b';
  el.style.border = '1px solid rgba(255,255,255,.14)';
  el.style.boxShadow = '0 26px 70px rgba(0,0,0,.30)';
}

// Follow visual: use a dedicated asset named exactly as below.
styleStoryVisual(document.querySelector('.follow-visual'), 'url("assets/jesus-leading-followers.jpg")', 'center', '3 / 2', 'cover');

// Empty tomb visual remains cropped from the existing approved two-picture composite.
styleStoryVisual(document.querySelector('.tomb-visual'), composite, '20.7% 88%', '620 / 365', '294.84% auto');
