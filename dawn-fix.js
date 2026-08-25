(() => {
  const sky4 = document.querySelector('.sky-4');
  if (!sky4) return;
  const oldDimmer = sky4.querySelector('.dawn-dimmer');
  if (oldDimmer) oldDimmer.remove();
  const style = document.createElement('style');
  style.textContent = `.sky-4::before{background-image:url("assets/Sunrise_Subtle.png")!important;}`;
  document.head.appendChild(style);
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
    .hero-clouds .cloud,.hero-clouds .real-cloud{display:none!important}
    .hero-clouds{position:absolute!important;z-index:2!important;right:clamp(-145px,-4vw,-55px)!important;top:50%!important;width:clamp(500px,52vw,900px)!important;height:clamp(280px,32vw,520px)!important;transform:translateY(-50%)!important;overflow:visible!important;pointer-events:none!important}
    .photo-cloud{position:absolute;display:block;width:118%;height:auto;max-width:none!important;pointer-events:none;user-select:none;will-change:transform;filter:brightness(.76) saturate(.72) contrast(.98)}
    .photo-cloud-one{left:-18%;top:20%;opacity:.82;animation:photoCloudDriftOne 48s ease-in-out infinite alternate}
    .photo-cloud-two{left:2%;top:46%;width:108%;opacity:.66;animation:photoCloudDriftTwo 64s ease-in-out infinite alternate;animation-delay:-19s}
    @keyframes photoCloudDriftOne{from{transform:translateX(-7%) translateY(0) scale(.96)}to{transform:translateX(18%) translateY(-2%) scale(1)}}
    @keyframes photoCloudDriftTwo{from{transform:translateX(13%) translateY(1%) scale(.92)}to{transform:translateX(-10%) translateY(3%) scale(.96)}}
    @media(max-width:900px){.hero-clouds{right:-185px!important;width:clamp(390px,68vw,620px)!important;height:360px!important;opacity:.84!important}}
    @media(max-width:620px){.hero-clouds{right:-175px!important;top:31%!important;width:430px!important;height:260px!important;opacity:.62!important}}
    @media(prefers-reduced-motion:reduce){.photo-cloud{animation:none!important}}
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
  track.querySelector('.story-vine-photo')?.remove();

  const placement = [[1,1],[2,1],[3,1],[4,1],[4,2],[3,2],[2,2],[1,2]];
  steps.forEach((step,i) => {
    step.style.setProperty('grid-column',String(placement[i][0]),'important');
    step.style.setProperty('grid-row',String(placement[i][1]),'important');
  });

  const vineWrap = document.createElement('div');
  vineWrap.className = 'story-vine-photo';
  vineWrap.setAttribute('aria-hidden','true');
  vineWrap.innerHTML = `
    <div class="vine-segment vine-top"></div>
    <div class="vine-segment vine-turn"></div>
    <div class="vine-segment vine-bottom"></div>`;
  track.prepend(vineWrap);

  const style = document.createElement('style');
  style.textContent = `
    #big-story .story-track{position:relative!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(150px,auto))!important;column-gap:28px!important;row-gap:72px!important;overflow:visible!important;padding:14px 0 34px!important;isolation:isolate}
    #big-story .story-step{min-width:0!important;position:relative!important;z-index:3!important;background:transparent!important;border:0!important;border-top:0!important;border-bottom:0!important;box-shadow:none!important;padding:22px 8px 18px!important;text-shadow:0 2px 8px rgba(0,0,0,.9)}
    #big-story .story-step.emphasis{border:0!important;background:transparent!important}
    #big-story .story-vine-photo{position:absolute;z-index:1;left:-2.5%;top:-5%;width:105%;height:110%;pointer-events:none;overflow:visible;filter:brightness(.72) saturate(.76) contrast(1.08) drop-shadow(0 5px 5px rgba(0,0,0,.62))}
    #big-story .vine-segment{position:absolute;inset:0;background:url("assets/Vine-(1).png") center/100% 100% no-repeat;opacity:0;will-change:clip-path,opacity}
    @media(max-width:760px){#big-story .story-track{grid-template-columns:1fr!important;grid-template-rows:none!important;gap:12px!important}#big-story .story-step{grid-column:1!important;grid-row:auto!important;padding:18px 4px!important}#big-story .story-vine-photo{display:none!important}}
    @media(prefers-reduced-motion:reduce){#big-story .vine-segment{opacity:1!important}#big-story .vine-top{clip-path:inset(0 0 42% 0)!important}#big-story .vine-turn{clip-path:inset(0 0 0 76%)!important}#big-story .vine-bottom{clip-path:inset(42% 0 0 0)!important}}
  `;
  document.head.appendChild(style);

  const top = vineWrap.querySelector('.vine-top');
  const turn = vineWrap.querySelector('.vine-turn');
  const bottom = vineWrap.querySelector('.vine-bottom');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const clamp01 = n => Math.max(0, Math.min(1, n));
  const phase = (p, start, end) => clamp01((p - start) / (end - start));
  const cycleMs = 24000;
  const holdStart = .90;
  const fadeStart = .965;
  let startTime = performance.now();

  const draw = now => {
    const p = ((now - startTime) % cycleMs) / cycleMs;
    const topP = phase(p, .00, .39);
    const turnP = phase(p, .31, .55);
    const bottomP = phase(p, .47, holdStart);
    const fade = p < fadeStart ? 1 : clamp01(1 - (p - fadeStart) / (1 - fadeStart));
    top.style.clipPath = `inset(0 ${(100 * (1 - topP)).toFixed(2)}% 42% 0)`;
    turn.style.clipPath = `inset(0 0 ${(100 * (1 - turnP)).toFixed(2)}% 76%)`;
    bottom.style.clipPath = `inset(42% 0 0 ${(100 * (1 - bottomP)).toFixed(2)}%)`;
    top.style.opacity = topP > 0 ? fade : 0;
    turn.style.opacity = turnP > 0 ? fade : 0;
    bottom.style.opacity = bottomP > 0 ? fade : 0;
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
})();

(() => {
  const pillars = document.querySelector('.pillars');
  if (!pillars) return;
  const style = document.createElement('style');
  style.textContent = `
    .sky-2 .pillars .section-heading h2{color:#fffef9!important;}
    .sky-2 .pillars .card-grid.three{align-items:stretch!important;}
    .sky-2 .pillars .pillar-card{display:grid!important;grid-template-rows:auto minmax(44px,auto) 1fr auto!important;align-content:start!important;min-height:100%!important;}
    .sky-2 .pillars .pillar-card h3{color:#efc77f!important;margin:10px 0 8px!important;}
    .sky-2 .pillars .pillar-card h4{color:#fffef9!important;font-family:var(--serif)!important;font-size:21px!important;line-height:1.25!important;letter-spacing:normal!important;text-transform:none!important;font-weight:600!important;min-height:44px!important;margin:0 0 14px!important;}
    .sky-2 .pillars .pillar-card > p{margin-top:0!important;}
    .sky-2 .pillars .pillar-card > a{align-self:end!important;margin-top:18px!important;}
  `;
  document.head.appendChild(style);
})();

(() => {
  const restoration = document.querySelector('.sky-4 .restoration .narrow');
  if (!restoration) return;
  const style = document.createElement('style');
  style.textContent = `
    .sky-4 .restoration .narrow{
      background:rgba(5,12,24,.34)!important;
      border:1px solid rgba(255,255,255,.10)!important;
      border-radius:24px!important;
      padding:34px 38px!important;
      box-shadow:0 18px 48px rgba(0,0,0,.14)!important;
      backdrop-filter:blur(3px)!important;
      -webkit-backdrop-filter:blur(3px)!important;
    }
    @media(max-width:620px){
      .sky-4 .restoration .narrow{padding:26px 20px!important;border-radius:20px!important;}
    }
  `;
  document.head.appendChild(style);
})();