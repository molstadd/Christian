(() => {
  const grid = document.querySelector('.discipleship .discipleship-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.word-card')];
  if (!cards.length) return;

  const torch = document.createElement('div');
  torch.className = 'word-torch';
  torch.innerHTML = `<div class="torch-aura"></div><div class="torch-embers"><i></i><i></i><i></i><i></i></div><img src="assets/torch.png" alt="" aria-hidden="true">`;
  document.body.appendChild(torch);

  const style = document.createElement('style');
  style.textContent = `
    .discipleship,.discipleship .discipleship-grid{overflow:visible!important;}
    .discipleship .word-card{position:relative;z-index:2;overflow:visible;transition:color .8s ease,text-shadow .8s ease;}
    .discipleship .word-card.torch-lit strong{color:#ffd58a!important;text-shadow:0 0 10px rgba(255,181,72,.55),0 0 26px rgba(255,121,25,.22),0 2px 7px rgba(0,0,0,.9)!important;}
    .discipleship .word-card.torch-lit span{color:#fff4dc!important;text-shadow:0 0 9px rgba(255,166,65,.22);}
    .word-torch{position:absolute;z-index:9999;left:0;top:0;width:clamp(115px,12vw,190px);pointer-events:none;opacity:0;transform:translate(-42%,-30%) rotate(-7deg);transform-origin:72% 72%;will-change:left,top,opacity;filter:drop-shadow(0 8px 10px rgba(0,0,0,.65));}
    .word-torch img{display:block;width:100%;height:auto;position:relative;z-index:2;}
    .torch-aura{position:absolute;z-index:1;width:150%;aspect-ratio:1;left:-22%;top:-39%;border-radius:50%;background:radial-gradient(circle,rgba(255,229,151,.46) 0%,rgba(255,164,59,.30) 20%,rgba(236,91,18,.16) 42%,rgba(170,54,10,.06) 58%,transparent 73%);filter:blur(13px);animation:fireGlow .62s ease-in-out infinite alternate;mix-blend-mode:screen;}
    .torch-embers{position:absolute;z-index:3;left:32%;top:-8%;width:38%;height:40%;}.torch-embers i{position:absolute;width:3px;height:3px;border-radius:50%;background:#ffd37a;box-shadow:0 0 7px #ff8b2c;opacity:0;animation:ember 1.8s ease-out infinite;}.torch-embers i:nth-child(1){left:22%;animation-delay:.05s}.torch-embers i:nth-child(2){left:47%;animation-delay:.55s}.torch-embers i:nth-child(3){left:67%;animation-delay:1s}.torch-embers i:nth-child(4){left:36%;animation-delay:1.4s}
    .word-torch.torch-running{opacity:1}.word-torch.torch-rest{opacity:0;transition:opacity 1.5s ease}
    @keyframes fireGlow{0%{transform:scale(.94,.98);opacity:.72;filter:blur(14px) brightness(.95)}45%{transform:scale(1.04,1.08);opacity:1;filter:blur(12px) brightness(1.12)}70%{transform:scale(.98,1.03);opacity:.82;filter:blur(14px) brightness(1.02)}100%{transform:scale(1.07,.97);opacity:.92;filter:blur(13px) brightness(1.08)}}
    @keyframes ember{0%{transform:translate(0,12px) scale(.45);opacity:0}15%{opacity:.9}65%{opacity:.5}100%{transform:translate(9px,-42px) scale(.1);opacity:0}}
    @media(max-width:700px){.word-torch{width:105px}.torch-aura{filter:blur(10px)}}
    @media(prefers-reduced-motion:reduce){.word-torch{display:none!important}.discipleship .word-card:last-child strong{color:#efc77f!important}}
  `;
  document.head.appendChild(style);

  const separatorFix = document.createElement('style');
  separatorFix.textContent = `
    .sky-2 .pillar-card,.sky-2 .pillar-card + .pillar-card,.sky-2 .word-card,.sky-2 .word-card:last-child,.sky-2 .rise-step,.sky-2 .rise-step + .rise-step,.sky-2 .story-step,.sky-2 .story-step.emphasis,.sky-3 .checklist p {border-top:0!important;border-right:0!important;border-bottom:0!important;border-left:0!important;border-color:transparent!important;outline:0!important;box-shadow:none!important;}
    .pillars .pillar-card::before,.pillars .pillar-card::after,.discipleship .word-card::before,.discipleship .word-card::after,.new-life .rise-step::before,.new-life .rise-step::after,.pillars .card-grid::before,.pillars .card-grid::after,.discipleship .discipleship-grid::before,.discipleship .discipleship-grid::after,.new-life .rise-grid::before,.new-life .rise-grid::after{content:none!important;display:none!important;border:0!important;background:none!important;box-shadow:none!important;}
  `;
  document.head.appendChild(separatorFix);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let started=false;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const pointFor=card=>{const r=card.getBoundingClientRect();return{x:r.left+window.scrollX+r.width*.5,y:r.bottom+window.scrollY+24};};
  async function play(){
    const first=pointFor(cards[0]);torch.style.left=`${first.x}px`;torch.style.top=`${first.y}px`;torch.classList.remove('torch-rest');torch.classList.add('torch-running');torch.style.transform='translate(-42%,-30%) rotate(-7deg)';
    for(let i=0;i<cards.length;i++){cards.forEach(c=>c.classList.remove('torch-lit'));cards[i].classList.add('torch-lit');const p=pointFor(cards[i]);torch.style.transition=i===0?'opacity .8s ease':'left 2.8s cubic-bezier(.42,0,.25,1), top 2.8s cubic-bezier(.42,0,.25,1), opacity .8s ease';torch.style.left=`${p.x}px`;torch.style.top=`${p.y}px`;await sleep(i===0?1600:3100);}
    await sleep(1000);cards.forEach(c=>c.classList.remove('torch-lit'));torch.classList.remove('torch-running');torch.classList.add('torch-rest');
  }
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!started){started=true;play();observer.disconnect();}},{threshold:.35});observer.observe(grid);
})();

// Restoration summary: keep the ideas, but present them as a quiet closing refrain rather than buttons.
(() => {
  const finalList = document.querySelector('.restoration .final-list');
  if (finalList) {
    finalList.setAttribute('aria-label', 'The restoration pictured in Revelation');
    const style = document.createElement('style');
    style.textContent = `
      .sky-4 .restoration .final-list{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;align-items:center!important;gap:0!important;margin:34px auto 42px!important;max-width:1100px!important;}
      .sky-4 .restoration .final-list span{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:4px 18px!important;color:#efc77f!important;font-family:'Cormorant Garamond',serif!important;font-size:clamp(22px,2.15vw,34px)!important;font-weight:600!important;line-height:1.25!important;text-shadow:0 2px 8px rgba(0,0,0,.82)!important;white-space:nowrap!important;}
      .sky-4 .restoration .final-list span:not(:last-child)::after{content:'·';display:inline-block;margin-left:36px;color:#e9b567;opacity:.9;}
      @media(max-width:760px){.sky-4 .restoration .final-list{display:grid!important;grid-template-columns:1fr!important;text-align:center!important;gap:8px!important}.sky-4 .restoration .final-list span{padding:2px 8px!important;white-space:normal!important}.sky-4 .restoration .final-list span::after{display:none!important;content:none!important}}
    `;
    document.head.appendChild(style);
  }
  const about = document.querySelector('#about .narrow');
  if (about) {
    const paragraphs = about.querySelectorAll(':scope > p:not(.eyebrow)');
    if (paragraphs[0]) paragraphs[0].textContent = 'The Way of Christ project began with a simple concern: have we made Christianity more complicated in some places and easier in others than Jesus did? This is an attempt to go back to Jesus and His apostles, listen carefully, and ask what it really means to follow Him.';
    if (paragraphs[1]) paragraphs[1].textContent = 'The goal is not to create another system, denomination, or list of arguments. It is to keep returning to the Gospel, to the words of Jesus, and to the witness of His apostles, and to let those shape what we believe, how we live, and who we are becoming.';
  }
})();

// Final sunrise readability refinements.
(() => {
  const restorationSection = document.querySelector('.sky-4 .restoration');
  const restoration = restorationSection?.querySelector('.narrow');
  const cta = restoration?.querySelector('.btn-primary');
  if (restorationSection && restoration && cta) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'restoration-cta';
    restorationSection.appendChild(ctaWrap);
    ctaWrap.appendChild(cta);
  }

  const style = document.createElement('style');
  style.textContent = `
    /* Let the dark accent hold the closing message, while the CTA sits below it on the sunrise. */
    .sky-4 .restoration .narrow{
      width:min(1120px,calc(100% - 40px))!important;
      max-width:1120px!important;
      background:rgba(5,12,24,.34)!important;
      border:1px solid rgba(255,255,255,.10)!important;
      border-radius:26px!important;
      padding:42px 42px 38px!important;
      box-shadow:0 20px 55px rgba(0,0,0,.18)!important;
      backdrop-filter:blur(2px)!important;
      -webkit-backdrop-filter:blur(2px)!important;
    }
    .sky-4 .restoration .restoration-shade{
      width:100%!important;margin:28px 0 0!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;
    }
    .sky-4 .restoration .restoration-cta{
      position:relative!important;z-index:3!important;text-align:center!important;margin:28px auto 0!important;
    }
    .sky-4 .restoration .restoration-cta .btn-primary{
      display:inline-flex!important;margin:0!important;
    }
    /* The studies heading sits on a darker part of the photograph, so force strong light contrast. */
    .sky-4 #studies .section-heading .eyebrow,
    .sky-4 #studies .section-heading .eyebrow.dark{
      color:#efc77f!important;opacity:1!important;text-shadow:0 2px 9px rgba(0,0,0,.95)!important;
    }
    .sky-4 #studies .section-heading h2{
      color:#fffef9!important;text-shadow:0 3px 14px rgba(0,0,0,.95),0 1px 3px rgba(0,0,0,1)!important;
    }
    @media(max-width:620px){.sky-4 .restoration .narrow{width:calc(100% - 28px)!important;padding:30px 18px 26px!important;border-radius:20px!important;}.sky-4 .restoration .restoration-cta{margin-top:22px!important;}}
  `;
  document.head.appendChild(style);
})();