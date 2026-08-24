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

styleStoryVisual(document.querySelector('.follow-visual'), composite, '20.7% 6.2%', '620 / 375', '294.84% auto');
styleStoryVisual(document.querySelector('.tomb-visual'), composite, '20.7% 88%', '620 / 365', '294.84% auto');

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

const openLowerTextStyle = document.createElement('style');
openLowerTextStyle.textContent = `
  .sky-3 .temple-copy,
  .sky-3 .checklist,
  .sky-4 .love .narrow,
  .sky-4 .restoration .narrow,
  .sky-4 .about .narrow {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .sky-3 .temple-copy,
  .sky-3 .checklist,
  .sky-4 .love .narrow,
  .sky-4 .restoration .narrow,
  .sky-4 .about .narrow {
    text-shadow: 0 2px 8px rgba(0,0,0,.88), 0 1px 2px rgba(0,0,0,.95);
  }

  .sky-4 .love .narrow,
  .sky-4 .restoration .narrow,
  .sky-4 .about .narrow {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .sky-3 .checklist p {
    background: transparent !important;
    border-bottom-color: rgba(255,255,255,.18) !important;
  }

  .sky-4 .final-list span {
    background: rgba(6,14,25,.24) !important;
    border-color: rgba(255,255,255,.28) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.18);
  }

  .sky-4 .btn-primary {
    text-shadow: none !important;
  }
`;
document.head.appendChild(openLowerTextStyle);

const deCardStyle = document.createElement('style');
deCardStyle.textContent = `
  .sky-2 .pillar-card {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    min-height: 0 !important;
    padding: 12px 30px !important;
  }
  .sky-2 .pillar-card + .pillar-card {
    border-left: 1px solid rgba(233,181,103,.34) !important;
  }
  .sky-2 .pillar-card h3,
  .sky-2 .pillar-card h4,
  .sky-2 .pillar-card p,
  .sky-2 .pillar-card a {
    text-shadow: 0 2px 8px rgba(0,0,0,.82), 0 1px 2px rgba(0,0,0,.9);
  }

  .sky-2 .story-step,
  .sky-2 .story-step.emphasis {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 18px 12px !important;
    border-bottom: 1px solid rgba(255,255,255,.16) !important;
  }
  .sky-2 .story-step.emphasis {
    border-bottom-color: rgba(233,181,103,.7) !important;
  }

  .sky-2 .word-card {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    min-height: 0 !important;
    padding: 20px 22px !important;
    border-top: 1px solid rgba(255,255,255,.16) !important;
  }
  .sky-2 .word-card:last-child {
    border-bottom: 1px solid rgba(255,255,255,.16) !important;
  }

  .sky-2 .rise-step {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 24px 26px !important;
    border-top: 1px solid rgba(255,255,255,.18) !important;
  }
  .sky-2 .rise-step + .rise-step {
    border-left: 1px solid rgba(233,181,103,.24) !important;
  }

  .sky-3 .transform-flow span {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    padding: 8px 10px !important;
    text-shadow: 0 2px 7px rgba(0,0,0,.85);
  }

  .sky-3 .temple-copy {
    padding: 0 !important;
  }

  .sky-4 .study-card {
    background: rgba(6,14,25,.40) !important;
    border: 1px solid rgba(233,181,103,.28) !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    min-height: 0 !important;
    padding: 22px 24px !important;
  }
  .sky-4 .study-card:hover {
    background: rgba(6,14,25,.54) !important;
    border-color: rgba(233,181,103,.58) !important;
    transform: translateY(-2px);
  }

  @media (max-width: 980px) {
    .sky-2 .pillar-card + .pillar-card,
    .sky-2 .rise-step + .rise-step {
      border-left: 0 !important;
      border-top: 1px solid rgba(255,255,255,.18) !important;
    }
  }
`;
document.head.appendChild(deCardStyle);

const cleanupStyle = document.createElement('style');
cleanupStyle.textContent = `
  .sky-3 .dwelling-path {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 16px 0 !important;
  }

  .story-arrow,
  .transform-flow > b,
  .dwelling-path > i {
    display: none !important;
  }

  .sky-3 .dwelling-path {
    justify-content: space-between !important;
    gap: 18px !important;
  }
`;
document.head.appendChild(cleanupStyle);

document.querySelectorAll('.story-step > span, .rise-step > span, .dwelling-path span, .study-card > span').forEach(el => {
  if (/^\d{2}$/.test(el.textContent.trim())) el.remove();
});

const storyLayoutStyle = document.createElement('style');
storyLayoutStyle.textContent = `
  .sky-2 .story-track {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 22px 28px !important;
    overflow: visible !important;
    padding: 12px 0 8px !important;
  }

  .sky-2 .story-step {
    min-width: 0 !important;
    width: auto !important;
    padding: 18px 0 22px !important;
  }

  .sky-2 .story-step strong {
    font-size: clamp(24px, 2.2vw, 34px) !important;
  }

  .sky-2 .story-step small {
    display: block !important;
    max-width: none !important;
  }

  @media (max-width: 900px) {
    .sky-2 .story-track {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
  }

  @media (max-width: 560px) {
    .sky-2 .story-track {
      grid-template-columns: 1fr !important;
      gap: 8px !important;
    }
  }
`;
document.head.appendChild(storyLayoutStyle);

// Cinematic motion and dawn progression.
const motionStyle = document.createElement('style');
motionStyle.textContent = `
  @keyframes heroAwaken {
    0% { opacity: .16; filter: brightness(.38); }
    100% { opacity: 1; filter: brightness(1); }
  }

  .sky-1 {
    animation: heroAwaken 2.6s ease-out both;
  }

  .hero-copy {
    transition: opacity .9s ease, transform .9s ease;
  }

  .reveal {
    transform: translateY(14px) !important;
    transition: opacity .7s ease, transform .7s ease !important;
  }

  .reveal.visible {
    transform: translateY(0) !important;
  }

  /* A real darkening layer over the dawn image. JS fades this away as the visitor scrolls. */
  .sky-4::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    z-index: 1 !important;
    inset: 0 !important;
    pointer-events: none !important;
    background: rgba(3,8,18,var(--dawn-shade,.32)) !important;
    transition: background .10s linear !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .sky-1 { animation: none !important; }
    .reveal, .hero-copy { transition: none !important; transform: none !important; }
    .sky-4::after { display: none !important; }
  }
`;
document.head.appendChild(motionStyle);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const starStages = [...document.querySelectorAll('.sky-1, .sky-2, .sky-3')];
  const startTime = performance.now();

  // Use inline !important background-position so the drift is not blocked by the
  // existing !important background-position declarations in styles.css.
  const animateStars = (now) => {
    const t = (now - startTime) / 1000;
    const x = Math.sin(t / 5.2) * 24;
    const y = Math.cos(t / 7.1) * 18;
    starStages.forEach(stage => {
      stage.style.setProperty('background-position', `calc(50% + ${x.toFixed(1)}px) ${y.toFixed(1)}px`, 'important');
    });
    requestAnimationFrame(animateStars);
  };
  requestAnimationFrame(animateStars);

  let ticking = false;
  const updateDawn = () => {
    const sky4 = document.querySelector('.sky-4');
    if (!sky4) return;
    const rect = sky4.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.max(0, Math.min(1, (viewport - rect.top) / Math.max(viewport * 1.15, 1)));
    const eased = progress * progress * (3 - 2 * progress);
    const shade = 0.34 - eased * 0.31;
    sky4.style.setProperty('--dawn-shade', shade.toFixed(3));
    ticking = false;
  };

  const requestDawnUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateDawn);
      ticking = true;
    }
  };

  updateDawn();
  window.addEventListener('scroll', requestDawnUpdate, { passive: true });
  window.addEventListener('resize', requestDawnUpdate);
}
