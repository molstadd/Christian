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

  clouds.innerHTML = `
    <img class="photo-cloud photo-cloud-one" src="assets/clouds-transparent(1).png" alt="" aria-hidden="true">
    <img class="photo-cloud photo-cloud-two" src="assets/clouds-transparent(2).png" alt="" aria-hidden="true">`;

  const style = document.createElement('style');
  style.textContent = `
    .hero-clouds .cloud,
    .hero-clouds .real-cloud { display:none!important; }

    .hero-clouds {
      position:absolute!important;
      z-index:2!important;
      right:clamp(-70px,1vw,40px)!important;
      top:50%!important;
      width:clamp(500px,52vw,900px)!important;
      height:clamp(280px,32vw,520px)!important;
      transform:translateY(-50%)!important;
      overflow:visible!important;
      pointer-events:none!important;
    }

    .photo-cloud {
      position:absolute;
      display:block;
      width:118%;
      height:auto;
      max-width:none!important;
      pointer-events:none;
      user-select:none;
      will-change:transform;
      filter:brightness(.76) saturate(.72) contrast(.98);
    }

    .photo-cloud-one {
      left:-36%;
      top:20%;
      opacity:.82;
      animation:photoCloudDriftOne 44s linear infinite;
    }

    .photo-cloud-two {
      left:-10%;
      top:46%;
      width:108%;
      opacity:.66;
      animation:photoCloudDriftTwo 61s linear infinite;
      animation-delay:-24s;
    }

    @keyframes photoCloudDriftOne {
      0%   { transform:translateX(-14%) translateY(0) scale(.96); }
      50%  { transform:translateX(10%) translateY(-2%) scale(1); }
      100% { transform:translateX(32%) translateY(1%) scale(.97); }
    }

    @keyframes photoCloudDriftTwo {
      0%   { transform:translateX(28%) translateY(1%) scale(.92); }
      50%  { transform:translateX(4%) translateY(3%) scale(.96); }
      100% { transform:translateX(-22%) translateY(0) scale(.93); }
    }

    @media(max-width:900px){
      .hero-clouds{
        right:-135px!important;
        width:clamp(390px,68vw,620px)!important;
        height:360px!important;
        opacity:.84!important;
      }
    }

    @media(max-width:620px){
      .hero-clouds{
        right:-150px!important;
        top:31%!important;
        width:430px!important;
        height:260px!important;
        opacity:.62!important;
      }
    }

    @media(prefers-reduced-motion:reduce){
      .photo-cloud{animation:none!important;}
    }
  `;
  document.head.appendChild(style);
})();