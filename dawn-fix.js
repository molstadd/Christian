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
})();