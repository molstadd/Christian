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

// Restore the original first supporting image from the approved composite.
styleStoryVisual(document.querySelector('.follow-visual'), composite, '20.7% 6.2%', '620 / 375', '294.84% auto');

// Empty tomb remains cropped from the approved composite.
styleStoryVisual(document.querySelector('.tomb-visual'), composite, '20.7% 88%', '620 / 365', '294.84% auto');

// Add the new Jesus-leading-followers image higher on the page, between
// "Believe. Be Transformed. Live." and "Life Was Always the Destination."
const pillars = document.querySelector('.pillars');
const bigStory = document.querySelector('.big-story');
if (pillars && bigStory && !document.querySelector('.upper-followers-visual')) {
  const section = document.createElement('section');
  section.className = 'upper-followers-visual';
  section.setAttribute('aria-label', 'Jesus leading His followers along a path toward dawn');
  section.style.position = 'relative';
  section.style.zIndex = '2';
  section.style.padding = '18px 0 72px';
  section.style.background = 'transparent';

  const wrap = document.createElement('div');
  wrap.style.width = 'min(980px, calc(100% - 40px))';
  wrap.style.margin = '0 auto';

  const img = document.createElement('img');
  img.src = 'assets/jesus-leading-followers.png';
  img.alt = 'Jesus leading a varied group of followers along a rocky path beneath a starry sky toward the first light of dawn';
  img.style.display = 'block';
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.borderRadius = '24px';
  img.style.boxShadow = '0 26px 70px rgba(0,0,0,.32)';
  img.style.border = '1px solid rgba(255,255,255,.14)';

  wrap.appendChild(img);
  section.appendChild(wrap);
  bigStory.parentNode.insertBefore(section, bigStory);
}
