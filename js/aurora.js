/* ============================================================
   AURORA TECH · interazioni condivise EMC (2026)
   - inietta gli sfondi ambientali (aurora, griglia, grana, barra scroll)
   - barra avanzamento scroll · pulsanti magnetici [data-magnetic]
   - costellazione hero (#heroNet) e terminale (#termBody) solo se presenti
   Caricare con <script src="js/aurora.js" defer></script>
   ============================================================ */
(function(){
  'use strict';
  function el(cls, id){ var d=document.createElement('div'); d.className=cls; if(id) d.id=id; d.setAttribute('aria-hidden','true'); return d; }
  if (!document.querySelector('.aurora-bg')) {
    var bg = el('aurora-bg');
    bg.appendChild(el('aurora-blob b1'));
    bg.appendChild(el('aurora-blob b2'));
    bg.appendChild(el('aurora-blob b3'));
    document.body.insertBefore(bg, document.body.firstChild);
    document.body.insertBefore(el('grid-overlay'), bg.nextSibling);
    document.body.appendChild(el('noise-overlay'));
  }
  if (!document.getElementById('scrollProgress')) {
    document.body.appendChild(el('scroll-progress','scrollProgress'));
  }
})();

(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine   = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById('scrollProgress');
  function onScrollBar(){
    var h = document.documentElement;
    var max = (h.scrollHeight - h.clientHeight) || 1;
    var p = Math.min(1, (h.scrollTop || window.pageYOffset) / max);
    if(bar) bar.style.width = (p*100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', onScrollBar, {passive:true});
  window.addEventListener('resize', onScrollBar); onScrollBar();

  /* ---------- magnetic CTAs (native cursor kept) ---------- */
  if(fine && !reduce){
    document.querySelectorAll('[data-magnetic]').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r=el.getBoundingClientRect();
        var dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
        el.style.transform='translate('+(dx*0.25)+'px,'+(dy*0.35)+'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; });
    });
  }

  /* ---------- hero constellation network ---------- */
  (function(){
    var cv = document.getElementById('heroNet');
    if(!cv || reduce) return;
    var ctx = cv.getContext('2d'), W=0, H=0, dpr=Math.min(window.devicePixelRatio||1, 2);
    var pts=[], mouse={x:-9999,y:-9999};
    function size(){
      var host = cv.parentElement; W=host.clientWidth; H=host.clientHeight;
      cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+'px'; cv.style.height=H+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      var target = Math.round(Math.min(88, (W*H)/13000));
      pts=[];
      for(var i=0;i<target;i++){
        pts.push({ x:Math.random()*W, y:Math.random()*H,
          vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28,
          r:Math.random()*1.6+0.7 });
      }
    }
    cv.parentElement.addEventListener('mousemove', function(e){
      var r=cv.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top;
    });
    cv.parentElement.addEventListener('mouseleave', function(){ mouse.x=-9999; mouse.y=-9999; });
    var LINK=128, MOUSE=170;
    function frame(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){
        var p=pts[i];
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        var dmx=mouse.x-p.x, dmy=mouse.y-p.y, dm=Math.hypot(dmx,dmy);
        if(dm<MOUSE){ p.x-=dmx/dm*0.6; p.y-=dmy/dm*0.6; }
        for(var j=i+1;j<pts.length;j++){
          var q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.hypot(dx,dy);
          if(d<LINK){
            var a=(1-d/LINK)*0.5;
            ctx.strokeStyle='rgba(120,150,240,'+a.toFixed(3)+')';
            ctx.lineWidth=0.7; ctx.beginPath();
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
        if(dm<MOUSE){
          var am=(1-dm/MOUSE)*0.6;
          ctx.strokeStyle='rgba(245,197,66,'+am.toFixed(3)+')';
          ctx.lineWidth=0.8; ctx.beginPath();
          ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
        }
        ctx.fillStyle= dm<MOUSE ? 'rgba(245,197,66,0.9)' : 'rgba(169,196,255,0.75)';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    var ro = window.ResizeObserver ? new ResizeObserver(size) : null;
    if(ro) ro.observe(cv.parentElement); else window.addEventListener('resize', size);
    size(); frame();
  })();

  /* ---------- terminal typewriter ---------- */
  (function(){
    var body=document.getElementById('termBody');
    if(!body) return;
    var seq=[
      {c:'pr',t:'$ '},{c:'st',t:'emc init progetto'},{nl:1},
      {c:'cm',t:'# analisi requisiti del cliente'},{nl:1},
      {c:'ok',t:'✓ '},{c:'st',t:'strategia definita'},{nl:1},
      {c:'pr',t:'$ '},{c:'fn',t:'build'},{c:'st',t:' --su-misura'},{nl:1},
      {c:'ok',t:'✓ '},{c:'st',t:'web · saas · app · social'},{nl:1},
      {c:'pr',t:'$ '},{c:'fn',t:'deploy'},{c:'st',t:' --prod'},{nl:1},
      {c:'ok',t:'● '},{c:'st',t:'soluzione online 🚀'},{nl:2},
      {c:'pr',t:'$ '},{cur:1}
    ];
    var i=0, ci=0, line=document.createElement('span'); line.className='ln';
    body.appendChild(line);
    function newline(n){ for(var k=0;k<n;k++){ body.appendChild(document.createTextNode('\n')); } line=document.createElement('span'); line.className='ln'; body.appendChild(line); }
    function step(){
      if(i>=seq.length){ setTimeout(function(){ body.innerHTML=''; i=0; ci=0; line=document.createElement('span'); line.className='ln'; body.appendChild(line); step(); }, 4200); return; }
      var tok=seq[i];
      if(tok.nl){ newline(tok.nl); i++; ci=0; return step(); }
      if(tok.cur){ var c=document.createElement('span'); c.className='cur'; line.appendChild(c); i++; return; }
      if(ci===0){ tok._span=document.createElement('span'); tok._span.className=tok.c; line.appendChild(tok._span); }
      if(ci<tok.t.length){ tok._span.textContent+=tok.t.charAt(ci); ci++; setTimeout(step, tok.c==='cm'?14:26); }
      else { i++; ci=0; setTimeout(step, tok.c==='ok'?260:60); }
    }
    if(reduce){ // static fallback
      seq.forEach(function(tok){ if(tok.nl){ for(var k=0;k<tok.nl;k++) body.appendChild(document.createTextNode('\n')); return;} if(tok.cur) return; var s=document.createElement('span'); s.className=tok.c; s.textContent=tok.t; body.appendChild(s); });
    } else { step(); }
  })();
})();