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
  track.querySelector('.story-vine')?.remove();

  // Explicit placement keeps the biblical sequence intact despite the old arrow divs.
  const placement = [
    [1,1], [2,1], [3,1], [4,1],
    [4,2], [3,2], [2,2], [1,2]
  ];
  steps.forEach((step, i) => {
    step.style.setProperty('grid-column', String(placement[i][0]), 'important');
    step.style.setProperty('grid-row', String(placement[i][1]), 'important');
  });

  const vine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  vine.setAttribute('class', 'story-vine story-vine-living');
  vine.setAttribute('viewBox', '0 0 1200 390');
  vine.setAttribute('preserveAspectRatio', 'none');
  vine.setAttribute('aria-hidden', 'true');
  vine.innerHTML = `
    <defs>
      <linearGradient id="vineBark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#aa8d55"/>
        <stop offset="38%" stop-color="#765b32"/>
        <stop offset="72%" stop-color="#49361f"/>
        <stop offset="100%" stop-color="#2c2116"/>
      </linearGradient>
      <filter id="vineGlow" x="-20%" y="-40%" width="140%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g class="vine-grow">
      <path class="vine-shadow" pathLength="1000" d="M24 153 C120 118 180 171 282 141 C374 113 440 165 548 139 C647 116 716 163 823 139 C930 116 1031 129 1127 157 C1179 173 1193 208 1179 243 C1161 287 1105 292 1030 284 C928 272 854 316 749 287 C651 260 574 314 469 286 C366 259 286 307 184 283 C116 267 65 281 25 305"/>
      <path class="vine-bark" pathLength="1000" d="M24 153 C120 118 180 171 282 141 C374 113 440 165 548 139 C647 116 716 163 823 139 C930 116 1031 129 1127 157 C1179 173 1193 208 1179 243 C1161 287 1105 292 1030 284 C928 272 854 316 749 287 C651 260 574 314 469 286 C366 259 286 307 184 283 C116 267 65 281 25 305"/>
      <path class="vine-highlight" pathLength="1000" d="M24 149 C120 114 180 167 282 137 C374 109 440 161 548 135 C647 112 716 159 823 135 C930 112 1031 125 1127 153 C1179 169 1193 204 1179 239 C1161 283 1105 288 1030 280 C928 268 854 312 749 283 C651 256 574 310 469 282 C366 255 286 303 184 279 C116 263 65 277 25 301"/>
    </g>

    <g class="vine-detail detail-early">
      <path class="tendril" d="M176 149 C158 120 178 104 198 124 C208 135 198 148 185 138"/>
      <path class="leaf" d="M205 138 C224 112 252 114 265 126 C250 145 229 151 205 138 Z"/>
      <path class="leaf small" d="M350 132 C365 111 384 114 393 123 C381 138 367 142 350 132 Z"/>
    </g>
    <g class="vine-detail detail-mid">
      <path class="tendril" d="M646 142 C629 112 650 96 670 118 C680 130 668 143 655 132"/>
      <path class="leaf" d="M692 143 C711 115 738 117 752 130 C737 150 716 155 692 143 Z"/>
      <path class="leaf small" d="M890 139 C907 116 928 119 938 130 C925 145 909 149 890 139 Z"/>
    </g>
    <g class="vine-detail detail-late">
      <path class="leaf" d="M1008 281 C1025 252 1054 251 1068 265 C1053 286 1032 292 1008 281 Z"/>
      <path class="tendril" d="M803 287 C788 253 811 240 831 263 C840 275 829 290 815 278"/>
      <path class="leaf" d="M725 285 C743 255 772 256 787 270 C771 291 749 297 725 285 Z"/>
      <path class="leaf small" d="M548 286 C564 261 587 263 599 275 C586 291 568 296 548 286 Z"/>
      <path class="tendril" d="M366 286 C350 253 372 238 393 262 C402 274 392 288 378 277"/>
      <path class="leaf" d="M244 283 C260 253 290 253 305 268 C289 289 267 295 244 283 Z"/>
      <path class="leaf" d="M72 298 C88 268 116 268 131 281 C116 302 95 308 72 298 Z"/>
    </g>
  `;
  track.prepend(vine);

  const style = document.createElement('style');
  style.textContent = `
    #big-story .story-track{
      position:relative!important;
      display:grid!important;
      grid-template-columns:repeat(4,minmax(0,1fr))!important;
      grid-template-rows:repeat(2,minmax(142px,auto))!important;
      column-gap:28px!important;
      row-gap:58px!important;
      overflow:visible!important;
      padding:12px 0 30px!important;
      isolation:isolate;
    }
    #big-story .story-step{
      min-width:0!important;
      position:relative!important;
      z-index:3!important;
      background:transparent!important;
      border:0!important;
      border-top:0!important;
      border-bottom:0!important;
      box-shadow:none!important;
      padding:22px 8px 18px!important;
      text-shadow:0 2px 8px rgba(0,0,0,.85);
    }
    #big-story .story-step.emphasis{border:0!important;background:transparent!important}
    #big-story .story-vine{
      position:absolute;
      z-index:1;
      left:-1%;
      top:-2%;
      width:102%;
      height:104%;
      overflow:visible;
      pointer-events:none;
    }
    #big-story .vine-shadow,
    #big-story .vine-bark,
    #big-story .vine-highlight,
    #big-story .tendril,
    #big-story .leaf{vector-effect:non-scaling-stroke}
    #big-story .vine-shadow{
      fill:none;
      stroke:rgba(0,0,0,.72);
      stroke-width:16;
      stroke-linecap:round;
      stroke-linejoin:round;
      stroke-dasharray:1000;
      stroke-dashoffset:1000;
      animation:vineGrow 30s linear infinite;
    }
    #big-story .vine-bark{
      fill:none;
      stroke:url(#vineBark);
      stroke-width:11;
      stroke-linecap:round;
      stroke-linejoin:round;
      stroke-dasharray:1000;
      stroke-dashoffset:1000;
      filter:url(#vineGlow);
      animation:vineGrow 30s linear infinite;
    }
    #big-story .vine-highlight{
      fill:none;
      stroke:rgba(208,177,108,.48);
      stroke-width:2.4;
      stroke-linecap:round;
      stroke-dasharray:1000;
      stroke-dashoffset:1000;
      animation:vineGrow 30s linear infinite;
    }
    #big-story .tendril{
      fill:none;
      stroke:#7e743e;
      stroke-width:2.2;
      stroke-linecap:round;
    }
    #big-story .leaf{
      fill:#6f7841;
      stroke:#a39254;
      stroke-width:1.1;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,.45));
    }
    #big-story .leaf.small{transform-box:fill-box;transform-origin:center;transform:scale(.78)}
    #big-story .vine-detail{opacity:0}
    #big-story .detail-early{animation:leafEarly 30s linear infinite}
    #big-story .detail-mid{animation:leafMid 30s linear infinite}
    #big-story .detail-late{animation:leafLate 30s linear infinite}

    @keyframes vineGrow{
      0%{stroke-dashoffset:1000;opacity:.35}
      4%{opacity:1}
      76%{stroke-dashoffset:0;opacity:1}
      92%{stroke-dashoffset:0;opacity:1}
      99%{stroke-dashoffset:0;opacity:0}
      100%{stroke-dashoffset:1000;opacity:0}
    }
    @keyframes leafEarly{0%,17%{opacity:0}24%,92%{opacity:.85}99%,100%{opacity:0}}
    @keyframes leafMid{0%,39%{opacity:0}47%,92%{opacity:.88}99%,100%{opacity:0}}
    @keyframes leafLate{0%,61%{opacity:0}70%,92%{opacity:.94}99%,100%{opacity:0}}

    @media(max-width:760px){
      #big-story .story-track{
        grid-template-columns:1fr!important;
        grid-template-rows:none!important;
        gap:12px!important;
      }
      #big-story .story-step{grid-column:1!important;grid-row:auto!important;padding:18px 4px!important}
      #big-story .story-vine{display:none!important}
    }
    @media(prefers-reduced-motion:reduce){
      #big-story .vine-shadow,#big-story .vine-bark,#big-story .vine-highlight{animation:none!important;stroke-dashoffset:0!important}
      #big-story .vine-detail{animation:none!important;opacity:.85!important}
    }
  `;
  document.head.appendChild(style);
})();