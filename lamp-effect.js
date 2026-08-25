(() => {
  const grid = document.querySelector('.discipleship .discipleship-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.word-card')];
  if (cards.length !== 4) return;

  const style = document.createElement('style');
  style.textContent = `
    .discipleship .discipleship-grid{position:relative;isolation:isolate;}
    .discipleship .word-card{position:relative;overflow:visible;transition:color .55s ease,text-shadow .55s ease,transform .55s ease;}
    .discipleship .word-card::before{
      content:"";position:absolute;z-index:-1;left:4%;right:4%;top:2%;bottom:0;
      border-radius:48% 52% 44% 56%/56% 44% 58% 42%;
      background:radial-gradient(ellipse at 50% 58%,rgba(242,184,93,.30) 0%,rgba(218,133,52,.17) 26%,rgba(147,79,28,.08) 46%,transparent 72%);
      filter:blur(12px);opacity:0;transform:scale(.82) translateY(8px);
      transition:opacity .7s ease,transform .7s ease;
      pointer-events:none;
    }
    .discipleship .word-card::after{
      content:"";position:absolute;left:12%;right:12%;bottom:9px;height:1px;
      background:linear-gradient(90deg,transparent,rgba(239,199,127,.72),transparent);
      opacity:0;filter:blur(.2px);transform:scaleX(.45);
      transition:opacity .65s ease,transform .65s ease;
      pointer-events:none;
    }
    .discipleship .word-card.lamp-active::before{opacity:1;transform:scale(1) translateY(0);animation:lampFlicker 1.7s ease-in-out infinite alternate;}
    .discipleship .word-card.lamp-active::after{opacity:.88;transform:scaleX(1);}
    .discipleship .word-card.lamp-active strong{color:#efc77f!important;text-shadow:0 0 12px rgba(239,199,127,.28),0 2px 7px rgba(0,0,0,.9)!important;}
    .discipleship .word-card.lamp-active span{color:#fff5df!important;}
    .discipleship .word-card.lamp-final::before{opacity:.62;transform:scale(1) translateY(0);}
    .discipleship .word-card.lamp-final::after{opacity:.58;transform:scaleX(.95);}
    .discipleship .word-card.lamp-final strong{color:#efc77f!important;text-shadow:0 0 14px rgba(239,199,127,.24),0 2px 7px rgba(0,0,0,.9)!important;}
    @keyframes lampFlicker{
      0%{filter:blur(12px) brightness(.94);opacity:.82}
      38%{filter:blur(13px) brightness(1.06);opacity:1}
      67%{filter:blur(11px) brightness(.98);opacity:.9}
      100%{filter:blur(14px) brightness(1.08);opacity:.96}
    }
    @media(prefers-reduced-motion:reduce){
      .discipleship .word-card::before{animation:none!important}
    }
  `;
  document.head.appendChild(style);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    cards[3].classList.add('lamp-final');
    return;
  }

  let started = false;
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const reset = () => cards.forEach(c => c.classList.remove('lamp-active','lamp-final'));

  const play = () => {
    clearTimers();
    reset();
    const stepMs = 1250;
    cards.forEach((card, i) => {
      timers.push(setTimeout(() => {
        cards.forEach(c => c.classList.remove('lamp-active'));
        card.classList.add('lamp-active');
      }, i * stepMs));
    });
    timers.push(setTimeout(() => {
      cards.forEach(c => c.classList.remove('lamp-active'));
      cards[3].classList.add('lamp-final');
    }, cards.length * stepMs + 350));
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        play();
        observer.unobserve(grid);
      }
    });
  }, {threshold:.38});
  observer.observe(grid);
})();