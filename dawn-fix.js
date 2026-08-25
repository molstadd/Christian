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

  const cloudSvg = (id, seed, variant = 1) => {
    const path = variant === 1
      ? 'M-70 250 C20 205 70 218 135 185 C190 155 240 186 300 151 C355 119 420 156 486 137 C545 119 585 151 650 129 C720 105 770 149 835 140 C900 129 935 161 995 151 C1060 139 1115 175 1270 145 L1270 335 L-70 335 Z'
      : 'M-70 238 C10 220 75 246 143 211 C210 176 268 216 330 190 C392 164 448 204 515 176 C580 148 642 196 711 171 C774 148 827 190 892 174 C955 158 1014 199 1083 181 C1140 167 1202 202 1270 185 L1270 330 L-70 330 Z';

    return `
      <svg class="real-cloud-svg" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="${id}" x="-25%" y="-50%" width="150%" height="210%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="3" seed="${seed}" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="B" result="distorted"/>
            <feGaussianBlur in="distorted" stdDeviation="3.5"/>
          </filter>
          <linearGradient id="shade-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#aeb7c1" stop-opacity="0.12"/>
            <stop offset="28%" stop-color="#788491" stop-opacity="0.32"/>
            <stop offset="63%" stop-color="#46515f" stop-opacity="0.68"/>
            <stop offset="100%" stop-color="#202936" stop-opacity="0.90"/>
          </linearGradient>
          <linearGradient id="edge-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d5dbe1" stop-opacity="0.14"/>
            <stop offset="100%" stop-color="#9ba6b2" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="${path}" fill="url(#shade-${id})" filter="url(#${id})"/>
        <path d="${path}" fill="none" stroke="url(#edge-${id})" stroke-width="7" opacity=".45" filter="url(#${id})"/>
      </svg>`;
  };

  clouds.innerHTML = `
    <div class="real-cloud real-cloud-one">${cloudSvg('cloudNoiseA', 11, 1)}</div>
    <div class="real-cloud real-cloud-two">${cloudSvg('cloudNoiseB', 29, 2)}</div>`;

  const style = document.createElement('style');
  style.textContent = `
    .hero-clouds .cloud{display:none!important}
    .hero-clouds{
      z-index:2!important;
      overflow:visible!important;
      width:clamp(430px,46vw,820px)!important;
      height:clamp(245px,29vw,455px)!important;
      right:clamp(-30px,2vw,65px)!important;
    }
    .real-cloud{
      position:absolute;
      left:-24%;
      width:150%;
      pointer-events:none;
      will-change:transform;
    }
    .real-cloud-svg{display:block;width:100%;height:auto;overflow:visible}
    .real-cloud-one{
      top:17%;
      opacity:.88;
      animation:realCloudDriftA 38s linear infinite;
    }
    .real-cloud-two{
      top:48%;
      opacity:.72;
      animation:realCloudDriftB 52s linear infinite;
      animation-delay:-19s;
    }
    @keyframes realCloudDriftA{
      0%{transform:translateX(-17%) translateY(0) scaleY(.72)}
      50%{transform:translateX(2%) translateY(-2%) scaleY(.76)}
      100%{transform:translateX(21%) translateY(1%) scaleY(.72)}
    }
    @keyframes realCloudDriftB{
      0%{transform:translateX(20%) translateY(1%) scale(.92,.63)}
      50%{transform:translateX(0) translateY(3%) scale(.95,.67)}
      100%{transform:translateX(-21%) translateY(0) scale(.92,.63)}
    }
    @media(max-width:900px){
      .hero-clouds{right:-100px!important;width:clamp(350px,64vw,540px)!important;height:315px!important;opacity:.84!important}
    }
    @media(max-width:620px){
      .hero-clouds{right:-125px!important;top:31%!important;width:390px!important;height:235px!important;opacity:.60!important}
    }
    @media(prefers-reduced-motion:reduce){.real-cloud{animation:none!important}}
  `;
  document.head.appendChild(style);
})();