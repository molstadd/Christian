(() => {
  const sky4 = document.querySelector('.sky-4');
  if (!sky4) return;
  const oldDimmer = sky4.querySelector('.dawn-dimmer');
  if (oldDimmer) oldDimmer.remove();
  const update = () => {
    const rect = sky4.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const raw = (vh * 1.05 - rect.top) / Math.max(vh * 1.75, 1);
    const p = Math.max(0, Math.min(1, raw));
    const eased = p * p * (3 - 2 * p);
    sky4.style.setProperty('--dawn-brightness', (0.66 + eased * 0.54).toFixed(3));
    sky4.style.setProperty('--dawn-saturation', (0.82 + eased * 0.28).toFixed(3));
    sky4.style.setProperty('--dawn-opacity', (0.34 + eased * 0.66).toFixed(3));
    sky4.style.setProperty('--dawn-shade', '0');
    sky4.style.setProperty('--dawn-glow', '0');
  };
  let raf = 0;
  const requestUpdate = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; update(); });
  };
  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();

(() => {
  const clouds = document.querySelector('.hero .hero-clouds');
  if (!clouds) return;
  const cloudSvg = (id, seed) => `
    <svg class="real-cloud-svg" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="${id}" x="-20%" y="-35%" width="140%" height="170%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves="4" seed="${seed}" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="42" xChannelSelector="R" yChannelSelector="G" result="distorted"/>
          <feGaussianBlur in="distorted" stdDeviation="8"/>
        </filter>
        <linearGradient id="shade-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8792a0" stop-opacity="0.18"/>
          <stop offset="45%" stop-color="#596472" stop-opacity="0.46"/>
          <stop offset="100%" stop-color="#202936" stop-opacity="0.70"/>
        </linearGradient>
      </defs>
      <g filter="url(#${id})" fill="url(#shade-${id})">
        <ellipse cx="120" cy="210" rx="190" ry="74"/>
        <ellipse cx="285" cy="180" rx="230" ry="92"/>
        <ellipse cx="485" cy="205" rx="245" ry="82"/>
        <ellipse cx="710" cy="176" rx="275" ry="104"/>
        <ellipse cx="950" cy="206" rx="235" ry="86"/>
        <ellipse cx="1115" cy="188" rx="185" ry="72"/>
      </g>
      <g filter="url(#${id})" fill="#a8b2bd" opacity="0.09">
        <ellipse cx="330" cy="140" rx="165" ry="42"/>
        <ellipse cx="760" cy="135" rx="210" ry="48"/>
      </g>
    </svg>`;
  clouds.innerHTML = `<div class="real-cloud real-cloud-one">${cloudSvg('cloudNoiseA',11)}</div><div class="real-cloud real-cloud-two">${cloudSvg('cloudNoiseB',27)}</div>`;
  const style = document.createElement('style');
  style.textContent = `
    .hero-clouds .cloud{display:none!important}
    .hero-clouds{z-index:2!important;overflow:visible!important;width:clamp(390px,42vw,760px)!important;height:clamp(220px,27vw,430px)!important;right:clamp(-10px,3vw,85px)!important}
    .real-cloud{position:absolute;left:-18%;width:138%;pointer-events:none;will-change:transform}
    .real-cloud-svg{display:block;width:100%;height:auto;overflow:visible}
    .real-cloud-one{top:18%;opacity:.90;animation:realCloudDriftA 42s ease-in-out infinite alternate}
    .real-cloud-two{top:51%;opacity:.76;transform:scale(.92,.78);animation:realCloudDriftB 58s ease-in-out infinite alternate}
    @keyframes realCloudDriftA{from{transform:translateX(-10%) scale(1,.9)}to{transform:translateX(12%) translateY(-3%) scale(1.03,.94)}}
    @keyframes realCloudDriftB{from{transform:translateX(10%) scale(.92,.78)}to{transform:translateX(-13%) translateY(3%) scale(.96,.82)}}
    @media(max-width:900px){.hero-clouds{right:-90px!important;width:clamp(320px,60vw,500px)!important;height:300px!important;opacity:.86!important}}
    @media(max-width:620px){.hero-clouds{right:-115px!important;top:31%!important;width:360px!important;height:220px!important;opacity:.60!important}}
    @media(prefers-reduced-motion:reduce){.real-cloud{animation:none!important}}
  `;
  document.head.appendChild(style);
})();