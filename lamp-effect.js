(() => {
  const grid = document.querySelector('.discipleship .discipleship-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.word-card')];
  if (!cards.length) return;

  const torch = document.createElement('div');
  torch.className = 'word-torch';
  torch.innerHTML = `
    <div class="torch-aura"></div>
    <div class="torch-embers"><i></i><i></i><i></i><i></i></div>
    <img src="assets/torch.png" alt="" aria-hidden="true">
  `;
  grid.appendChild(torch);

  const style = document.createElement('style');
  style.textContent = `
    .discipleship .discipleship-grid{position:relative;isolation:isolate;overflow:visible;}
    .discipleship .word-card{position:relative;z-index:2;overflow:visible;transition:color .35s ease,text-shadow .35s ease;}
    .discipleship .word-card.torch-lit strong{color:#ffd58a!important;text-shadow:0 0 9px rgba(255,181,72,.65),0 0 24px rgba(255,121,25,.28),0 2px 7px rgba(0,0,0,.9)!important;}
    .discipleship .word-card.torch-lit span{color:#fff4dc!important;text-shadow:0 0 8px rgba(255,166,65,.25);}

    .word-torch{
      position:absolute;z-index:5;left:0;top:100%;width:clamp(115px,12vw,190px);
      pointer-events:none;opacity:0;transform:translate(-42%,-30%) rotate(-8deg);
      transform-origin:72% 72%;will-change:left,transform,opacity;filter:drop-shadow(0 8px 10px rgba(0,0,0,.65));
    }
    .word-torch img{display:block;width:100%;height:auto;position:relative;z-index:2;animation:torchAlive .16s ease-in-out infinite alternate;}
    .torch-aura{
      position:absolute;z-index:1;width:145%;aspect-ratio:1;left:-19%;top:-36%;border-radius:50%;
      background:radial-gradient(circle,rgba(255,225,142,.42) 0%,rgba(255,161,57,.28) 20%,rgba(236,91,18,.15) 42%,rgba(170,54,10,.06) 58%,transparent 72%);
      filter:blur(12px);animation:fireGlow .34s ease-in-out infinite alternate;mix-blend-mode:screen;
    }
    .torch-embers{position:absolute;z-index:3;left:32%;top:-8%;width:38%;height:40%;}
    .torch-embers i{position:absolute;width:3px;height:3px;border-radius:50%;background:#ffd37a;box-shadow:0 0 6px #ff8b2c;opacity:0;animation:ember 1.4s linear infinite;}
    .torch-embers i:nth-child(1){left:22%;animation-delay:.05s}.torch-embers i:nth-child(2){left:47%;animation-delay:.42s}.torch-embers i:nth-child(3){left:67%;animation-delay:.78s}.torch-embers i:nth-child(4){left:36%;animation-delay:1.08s}
    .word-torch.torch-running{opacity:1;transition:opacity .45s ease;}
    .word-torch.torch-rest{opacity:0;transition:opacity 1.1s ease;}

    @keyframes torchAlive{from{transform:rotate(-.7deg) scale(.995);filter:brightness(.96)}to{transform:rotate(.7deg) scale(1.008);filter:brightness(1.08)}}
    @keyframes fireGlow{0%{transform:scale(.92);opacity:.68;filter:blur(13px) brightness(.92)}55%{transform:scale(1.06);opacity:1;filter:blur(11px) brightness(1.15)}100%{transform:scale(.98);opacity:.82;filter:blur(14px) brightness(1.03)}}
    @keyframes ember{0%{transform:translate(0,14px) scale(.5);opacity:0}18%{opacity:1}70%{opacity:.65}100%{transform:translate(12px,-38px) scale(.15);opacity:0}}

    @media(max-width:700px){.word-torch{width:105px;top:100%;}.torch-aura{filter:blur(9px)}}
    @media(prefers-reduced-motion:reduce){.word-torch{display:none!important}.discipleship .word-card:last-child strong{color:#efc77f!important}}
  `;
  document.head.appendChild(style);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let started = false;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function centerFor(card){
    const g = grid.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    return r.left - g.left + r.width * .5;
  }

  async function play(){
    torch.classList.add('torch-running');
    for(let i=0;i<cards.length;i++){
      const card = cards[i];
      cards.forEach(c=>c.classList.remove('torch-lit'));
      card.classList.add('torch-lit');
      const x = centerFor(card);
      torch.style.transition = i === 0 ? 'opacity .45s ease' : 'left 1.05s cubic-bezier(.45,.05,.3,1), opacity .35s ease';
      torch.style.left = `${x}px`;
      torch.style.transform = `translate(-42%,-30%) rotate(${i % 2 ? -5 : -9}deg)`;
      await sleep(i === 0 ? 950 : 1250);
    }
    await sleep(500);
    cards.forEach(c=>c.classList.remove('torch-lit'));
    torch.classList.remove('torch-running');
    torch.classList.add('torch-rest');
  }

  const observer = new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting) && !started){
      started=true;
      play();
      observer.disconnect();
    }
  },{threshold:.35});
  observer.observe(grid);
})();