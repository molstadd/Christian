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
    #big-story .story-track{
      position:relative!important;display:grid!important;
      grid-template-columns:repeat(4,minmax(0,1fr))!important;
      grid-template-rows:repeat(2,minmax(150px,auto))!important;
      column-gap:28px!important;row-gap:72px!important;overflow:visible!important;
      padding:14px 0 34px!important;isolation:isolate;
    }
    #big-story .story-step{
      min-width:0!important;position:relative!important;z-index:3!important;
      background:transparent!important;border:0!important;border-top:0!important;border-bottom:0!important;
      box-shadow:none!important;padding:22px 8px 18px!important;text-shadow:0 2px 8px rgba(0,0,0,.9);
    }
    #big-story .story-step.emphasis{border:0!important;background:transparent!important}
    #big-story .story-vine-photo{
      position:absolute;z-index:1;left:-2.5%;top:-5%;width:105%;height:110%;
      pointer-events:none;overflow:visible;
      filter:brightness(.72) saturate(.76) contrast(1.08) drop-shadow(0 5px 5px rgba(0,0,0,.62));
    }
    #big-story .vine-segment{
      position:absolute;inset:0;
      background:url("assets/Vine-(1).png") center/100% 100% no-repeat;
      opacity:0;
      will-change:clip-path,opacity;
    }
    #big-story .vine-top{
      clip-path:inset(0 100% 48% 0);
      animation:vineTopFlow 34s ease-in-out infinite;
    }
    #big-story .vine-turn{
      clip-path:inset(0 0 100% 83%);
      animation:vineTurnFlow 34s ease-in-out infinite;
    }
    #big-story .vine-bottom{
      clip-path:inset(48% 0 0 100%);
      animation:vineBottomFlow 34s ease-in-out infinite;
    }
    @keyframes vineTopFlow{
      0%{clip-path:inset(0 100% 48% 0);opacity:0}
      3%{opacity:1}
      35%{clip-path:inset(0 0 48% 0);opacity:1}
      91%{clip-path:inset(0 0 48% 0);opacity:1}
      98%,100%{clip-path:inset(0 0 48% 0);opacity:0}
    }
    @keyframes vineTurnFlow{
      0%,34%{clip-path:inset(0 0 100% 83%);opacity:0}
      36%{opacity:1}
      49%{clip-path:inset(0 0 0 83%);opacity:1}
      91%{clip-path:inset(0 0 0 83%);opacity:1}
      98%,100%{clip-path:inset(0 0 0 83%);opacity:0}
    }
    @keyframes vineBottomFlow{
      0%,48%{clip-path:inset(48% 0 0 100%);opacity:0}
      50%{opacity:1}
      79%{clip-path:inset(48% 0 0 0);opacity:1}
      91%{clip-path:inset(48% 0 0 0);opacity:1}
      98%,100%{clip-path:inset(48% 0 0 0);opacity:0}
    }
    @media(max-width:760px){
      #big-story .story-track{grid-template-columns:1fr!important;grid-template-rows:none!important;gap:12px!important}
      #big-story .story-step{grid-column:1!important;grid-row:auto!important;padding:18px 4px!important}
      #big-story .story-vine-photo{display:none!important}
    }
    @media(prefers-reduced-motion:reduce){
      #big-story .vine-segment{animation:none!important;opacity:1!important}
      #big-story .vine-top{clip-path:inset(0 0 48% 0)!important}
      #big-story .vine-turn{clip-path:inset(0 0 0 83%)!important}
      #big-story .vine-bottom{clip-path:inset(48% 0 0 0)!important}
    }
  `;
  document.head.appendChild(style);
})();