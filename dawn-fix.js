(() => {
  const sky4 = document.querySelector('.sky-4');
  if (!sky4) return;

  // Use a real DOM overlay rather than a pseudo-element so nothing in the
  // existing stylesheet can silently override the dawn transition.
  let dimmer = sky4.querySelector('.dawn-dimmer');
  if (!dimmer) {
    dimmer = document.createElement('div');
    dimmer.className = 'dawn-dimmer';
    Object.assign(dimmer.style, {
      position: 'absolute',
      inset: '0',
      zIndex: '1',
      pointerEvents: 'none',
      background: 'rgba(1, 5, 12, 0.58)',
      opacity: '1',
      transition: 'opacity 80ms linear'
    });
    sky4.appendChild(dimmer);
  }

  // Keep all actual content above the dimmer.
  sky4.querySelectorAll(':scope > section').forEach(section => {
    section.style.position = 'relative';
    section.style.zIndex = '2';
  });

  const update = () => {
    const rect = sky4.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Begin before the final stage fully enters the viewport and finish the
    // brightening while the visitor is still moving through the sunrise scene.
    const start = vh * 0.95;
    const distance = Math.max(vh * 1.65, 1);
    const p = Math.max(0, Math.min(1, (start - rect.top) / distance));
    const eased = p * p * (3 - 2 * p);

    // Obvious but still elegant: from a clearly dimmed dawn to essentially no
    // dark veil at all.
    dimmer.style.opacity = String(1 - eased * 0.96);

    // Also brighten the actual sunrise layer itself for a second, independent cue.
    const brightness = 0.72 + eased * 0.48;
    const saturation = 0.86 + eased * 0.24;
    sky4.style.setProperty('--dawn-brightness', brightness.toFixed(3));
    sky4.style.setProperty('--dawn-saturation', saturation.toFixed(3));
    sky4.style.setProperty('--dawn-opacity', (0.72 + eased * 0.28).toFixed(3));
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