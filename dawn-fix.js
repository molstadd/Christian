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
      right:clamp(-145px,-4vw,-55px)!important;
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
      left:-18%;
      top:20%;
      opacity:.82;
      animation:photoCloudDriftOne 48s ease-in-out infinite alternate;
    }

    .photo-cloud-two {
      left:2%;
      top:46%;
      width:108%;
      opacity:.66;
      animation:photoCloudDriftTwo 64s ease-in-out infinite alternate;
      animation-delay:-19s;
    }

    @keyframes photoCloudDriftOne {
      from { transform:translateX(-7%) translateY(0) scale(.96); }
      to   { transform:translateX(18%) translateY(-2%) scale(1); }
    }

    @keyframes photoCloudDriftTwo {
      from { transform:translateX(13%) translateY(1%) scale(.92); }
      to   { transform:translateX(-10%) translateY(3%) scale(.96); }
    }

    @media(max-width:900px){
      .hero-clouds{
        right:-185px!important;
        width:clamp(390px,68vw,620px)!important;
        height:360px!important;
        opacity:.84!important;
      }
    }

    @media(max-width:620px){
      .hero-clouds{
        right:-175px!important;
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

(() => {
  const track = document.querySelector('#big-story .story-track');
  if (!track) return;

  const steps = [...track.querySelectorAll('.story-step')];
  if (steps.length !== 8) return;

  track.querySelectorAll('.story-arrow').forEach(a => a.style.display = 'none');

  const vine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  vine.setAttribute('class', 'story-vine');
  vine.setAttribute('viewBox', '0 0 1000 330');
  vine.setAttribute('preserveAspectRatio', 'none');
  vine.setAttribute('aria-hidden', 'true');
  vine.innerHTML = `
    <path class="vine-shadow" d="M35 145 C180 137 300 151 430 143 S690 139 840 144 C930 147 963 172 958 214 C953 258 900 270 825 268 C675 263 560 273 430 267 S170 263 35 270"/>
    <path class="vine-stem" d="M35 145 C180 137 300 151 430 143 S690 139 840 144 C930 147 963 172 958 214 C953 258 900 270 825 268 C675 263 560 273 430 267 S170 263 35 270"/>
    <path class="vine-tendril" d="M286 146 C302 129 314 128 326 142 M712 143 C727 126 741 128 750 143 M575 268 C590 251 603 252 612 267"/>
    <path class="vine-leaf" d="M316 137 C326 123 339 123 345 126 C338 137 329 142 316 137 Z M744 137 C754 123 767 123 773 127 C765 138 756 142 744 137 Z M603 261 C614 247 627 247 633 251 C625 261 616 266 603 261 Z M180 266 C191 253 203 253 209 257 C201 267 192 271 180 266 Z"/>
  `;
  track.prepend(vine);

  const style = document.createElement('style');
  style.textContent = `
    #big-story .story-track{
      position:relative!important;
      display:grid!important;
      grid-template-columns:repeat(4,minmax(0,1fr))!important;
      grid-template-rows:repeat(2,minmax(128px,auto))!important;
      column-gap:24px!important;
      row-gap:34px!important;
      overflow:visible!important;
      padding:10px 0 22px!important;
      isolation:isolate;
    }
    #big-story .story-step{
      min-width:0!important;
      position:relative!important;
      z-index:2!important;
    }
    #big-story .story-step:nth-of-type(1){grid-column:1;grid-row:1}
    #big-story .story-step:nth-of-type(2){grid-column:2;grid-row:1}
    #big-story .story-step:nth-of-type(3){grid-column:3;grid-row:1}
    #big-story .story-step:nth-of-type(4){grid-column:4;grid-row:1}
    #big-story .story-step:nth-of-type(5){grid-column:4;grid-row:2}
    #big-story .story-step:nth-of-type(6){grid-column:3;grid-row:2}
    #big-story .story-step:nth-of-type(7){grid-column:2;grid-row:2}
    #big-story .story-step:nth-of-type(8){grid-column:1;grid-row:2}
    #big-story .story-vine{
      position:absolute;
      z-index:1;
      left:1.5%;
      top:0;
      width:97%;
      height:100%;
      overflow:visible;
      pointer-events:none;
      opacity:.62;
    }
    #big-story .vine-shadow,
    #big-story .vine-stem,
    #big-story .vine-tendril,
    #big-story .vine-leaf{vector-effect:non-scaling-stroke}
    #big-story .vine-shadow{
      fill:none;
      stroke:rgba(0,0,0,.34);
      stroke-width:4.5;
      stroke-linecap:round;
    }
    #big-story .vine-stem{
      fill:none;
      stroke:#776547;
      stroke-width:2.1;
      stroke-linecap:round;
      stroke-dasharray:2 1.6;
    }
    #big-story .vine-tendril{
      fill:none;
      stroke:#8c7a52;
      stroke-width:1.4;
      stroke-linecap:round;
      opacity:.72;
    }
    #big-story .vine-leaf{
      fill:#7f8355;
      stroke:#a08b5a;
      stroke-width:.6;
      opacity:.70;
    }
    @media(max-width:760px){
      #big-story .story-track{
        grid-template-columns:1fr!important;
        grid-template-rows:none!important;
        gap:16px!important;
      }
      #big-story .story-step:nth-of-type(n){grid-column:1!important;grid-row:auto!important}
      #big-story .story-vine{display:none!important}
    }
  `;
  document.head.appendChild(style);
})();