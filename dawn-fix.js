(() => {
  const sky4 = document.querySelector('.sky-4');
  if (!sky4) return;

  // Remove the previous full-stage dark overlay. It changed the color of the
  // entire fourth section instead of simply allowing the sunrise to emerge.
  const oldDimmer = sky4.querySelector('.dawn-dimmer');
  if (oldDimmer) oldDimmer.remove();

  const update = () => {
    const rect = sky4.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Begin as section 4 approaches the viewport and steadily reveal the
    // existing sunrise layer. This changes only the sunrise image, not the
    // black star-field background itself.
    const raw = (vh * 1.05 - rect.top) / Math.max(vh * 1.75, 1);
    const p = Math.max(0, Math.min(1, raw));
    const eased = p * p * (3 - 2 * p);

    const brightness = 0.66 + eased * 0.54;
    const saturation = 0.82 + eased * 0.28;
    const opacity = 0.34 + eased * 0.66;

    sky4.style.setProperty('--dawn-brightness', brightness.toFixed(3));
    sky4.style.setProperty('--dawn-saturation', saturation.toFixed(3));
    sky4.style.setProperty('--dawn-opacity', opacity.toFixed(3));
    sky4.style.setProperty('--dawn-shade', '0');
    sky4.style.setProperty('--dawn-glow', '0');
  };

  let raf = 0;
  const requestUpdate = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  // Replace the ultra-thin haze effect with recognizable nighttime clouds
  // that drift slowly across the face of the moon.
  const cloudFix = document.createElement('style');
  cloudFix.textContent = `
    .hero-clouds {
      z-index: 2 !important;
      overflow: visible !important;
    }
    .hero-clouds .cloud {
      left: -18% !important;
      width: 138% !important;
      height: 25% !important;
      border-radius: 999px !important;
      opacity: .48 !important;
      filter: blur(5px) !important;
      mix-blend-mode: normal !important;
      background:
        linear-gradient(180deg, rgba(120,132,150,.62) 0%, rgba(66,78,98,.70) 58%, rgba(34,45,64,.62) 100%) !important;
      box-shadow:
        0 8px 24px rgba(2,7,17,.34),
        inset 0 1px 10px rgba(220,228,238,.10) !important;
    }
    .hero-clouds .cloud::before,
    .hero-clouds .cloud::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: inherit;
      box-shadow: inherit;
    }
    .hero-clouds .cloud::before {
      width: 34%;
      height: 145%;
      left: 19%;
      bottom: 22%;
    }
    .hero-clouds .cloud::after {
      width: 27%;
      height: 118%;
      left: 52%;
      bottom: 18%;
    }
    .hero-clouds .cloud-one {
      top: 34% !important;
      opacity: .52 !important;
      animation: moonCloudPassOne 30s linear infinite !important;
    }
    .hero-clouds .cloud-two {
      top: 58% !important;
      height: 19% !important;
      opacity: .38 !important;
      transform: scale(.86) !important;
      animation: moonCloudPassTwo 42s linear infinite !important;
      animation-delay: -16s !important;
    }
    @keyframes moonCloudPassOne {
      0%   { transform: translateX(-26%) scaleY(.78); }
      50%  { transform: translateX(7%) scaleY(.82); }
      100% { transform: translateX(38%) scaleY(.78); }
    }
    @keyframes moonCloudPassTwo {
      0%   { transform: translateX(36%) scale(.86,.70); }
      50%  { transform: translateX(4%) scale(.90,.73); }
      100% { transform: translateX(-30%) scale(.86,.70); }
    }
    @media (max-width: 900px) {
      .hero-clouds { opacity: .80 !important; }
    }
    @media (max-width: 620px) {
      .hero-clouds { opacity: .62 !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-clouds .cloud { animation: none !important; }
    }
  `;
  document.head.appendChild(cloudFix);
})();