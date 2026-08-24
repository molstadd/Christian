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
document.getElementById('year').textContent = new Date().getFullYear();

// Restore the original Living Temple artwork directly.
const templePhoto = document.querySelector('.temple-photo');
if (templePhoto) {
  templePhoto.style.setProperty('background-image', 'url("assets/living-temple-building.png")', 'important');
  templePhoto.style.setProperty('background-position', 'center', 'important');
  templePhoto.style.setProperty('background-size', 'cover', 'important');
  templePhoto.style.setProperty('background-repeat', 'no-repeat', 'important');
}

// Use the approved two-scene composite from the assets folder and crop each half in place.
const composite = 'url("assets/ChatGPT Image Aug 24, 2026, 11_28_20 AM.png")';

const follow = document.querySelector('.story-image-follow');
if (follow) {
  const img = follow.querySelector('img');
  if (img) img.style.display = 'none';
  follow.style.display = 'block';
  follow.style.width = 'min(860px, 92%)';
  follow.style.aspectRatio = '620 / 375';
  follow.style.margin = '44px auto 42px';
  follow.style.borderRadius = '24px';
  follow.style.overflow = 'hidden';
  follow.style.backgroundImage = composite;
  follow.style.backgroundRepeat = 'no-repeat';
  follow.style.backgroundSize = '294.84% 229.33%';
  follow.style.backgroundPosition = '20.70% 6.19%';
  follow.style.border = '1px solid rgba(255,255,255,.14)';
  follow.style.boxShadow = '0 26px 70px rgba(0,0,0,.30)';
}

const tomb = document.querySelector('.story-image-tomb');
if (tomb) {
  const img = tomb.querySelector('img');
  if (img) img.style.display = 'none';
  tomb.style.display = 'block';
  tomb.style.width = 'min(820px, 92%)';
  tomb.style.aspectRatio = '620 / 365';
  tomb.style.margin = '44px auto 42px';
  tomb.style.borderRadius = '24px';
  tomb.style.overflow = 'hidden';
  tomb.style.backgroundImage = composite;
  tomb.style.backgroundRepeat = 'no-repeat';
  tomb.style.backgroundSize = '294.84% 235.62%';
  tomb.style.backgroundPosition = '20.70% 87.88%';
  tomb.style.border = '1px solid rgba(255,255,255,.14)';
  tomb.style.boxShadow = '0 26px 70px rgba(0,0,0,.30)';
}
