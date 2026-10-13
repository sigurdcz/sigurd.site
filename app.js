(() => {
  'use strict';

  const domains = [
    { id:'backend', index:'01', name:'Backend', overline:'01 // ARCHITECTURE', color:[89,227,229],
      lead:'Neviditelná síla, na které stojí každý skvělý produkt.',
      description:'Navrhuji systémy, které jsou spolehlivé, srozumitelné a připravené růst. Od API a databází až po komplexní integrace, fronty a optimalizaci výkonu.',
      tags:['PHP','Laravel','REST API','PostgreSQL','Redis','RabbitMQ','SQL','System Design'],
      projects:['API & integrace systémů','Datové toky a automatizace','Výkon, architektura a škálování'] },
    { id:'web', index:'02', name:'Web', overline:'02 // DIGITAL EXPERIENCES', color:[123,160,255],
      lead:'Moderní web, kterému zákazník rozumí a který přirozeně vede k cíli.',
      description:'Přehledná prezentace služeb, snadné ovládání, důvěryhodný vizuál a technické základy SEO. Srozumitelné pro návštěvníky, užitečné pro klienta.',
      tags:['HTML / CSS','JavaScript','Responsive UI','UX / UI','SEO','Performance','PHP','Accessibility'],
      projects:['Firemní weby a prezentace','Webové aplikace a administrační systémy','UX, SEO a optimalizace konverzí'] },
    { id:'aplikace', index:'03', name:'Aplikace', overline:'03 // CUSTOM SOFTWARE', color:[185,145,255],
      lead:'Malé samostatné nástroje dokážou ušetřit spoustu každodenní práce.',
      description:'Nemusíte ovládat obrovský systém, když potřebujete jen pár funkcí. Vytvářím jednoduché aplikace na konkrétní úkol. AI pomáhá rychleji ověřovat prototypy.',
      tags:['Custom Tools','Automation','Dashboards','PHP','Python','Integrations','Workflow','Desktop Tools'],
      projects:['Čed — asistent pro meetingy','CampaignOS — správa kampaní','Vlastní utility a pracovní nástroje'] },
    { id:'gamedev', index:'04', name:'GameDev', overline:'04 // INTERACTIVE WORLDS', color:[255,175,126],
      lead:'Vytvářím světy, ve kterých má každé rozhodnutí svou odezvu.',
      description:'Od programování herních mechanik přes chování nepřátel až po filmovou atmosféru scén. Propojuji technický vývoj s designem hráčského zážitku.',
      tags:['Unity','C#','HDRP','Gameplay Systems','AI / NPC','Level Design','Optimization','Combat'],
      projects:['Dark Master — akční RPG','Soubojové a dovednostní systémy','Herní AI a interaktivní prostředí'] },
    { id:'ai', index:'05', name:'AI', overline:'05 // INTELLIGENCE', color:[232,142,204],
      lead:'Umělá inteligence od chatbota až po vlastní autonomní workflow.',
      description:'Sedm úrovní práce s AI. Od jednoduchého asistenta přes lokální modely, skills a harnesy po autonomní systémy. Prototypování může být díky AI rychlejší a dostupnější.',
      tags:['LLM Agents','RAG','MCP','Python','Vector Search','Whisper','Memory Systems','Automation'],
      projects:['Čed — paměť a inteligentní vyhledávání','Agentní procesy a orchestrátory','Přepis, extrakce a zpracování dat'] }
  ];

  const $ = (id) => document.getElementById(id);
  const canvas = $('neuralCanvas');
  const ctx = canvas.getContext('2d', { alpha:true });
  const app = $('app');
  const hero = $('hero');
  const detailView = $('detailView');
  const aboutView = $('aboutView');
  const brainAnchor = $('brainAnchor');
  const cards = [...document.querySelectorAll('[data-node]')];
  const cursorGlow = $('cursorGlow');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileQuery = matchMedia('(max-width: 670px)');
  const pointer = {x:0,y:0,active:false};
  let highlighted = null;
  let activePage = 'home';
  let W=0,H=0,DPR=1, t0=performance.now();
  let neuralPoints=[], neuralEdges=[], stars=[];

  // Deterministic random data keeps the neural anatomy coherent between frames.
  function rngFactory(seed) { return () => { seed = (Math.imul(seed,1664525)+1013904223)|0; return (seed>>>0)/4294967296; }; }
  const random = rngFactory(680191);
  function rnd(a,b) { return a + (b-a)*random(); }
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const rgba=(rgb,a)=>`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

  function brainContains(x,y) {
    // Silhouette built from interlocking lobes instead of a plain circle.
    let left=((x+48)/72)**2+((y+2)/69)**2 < 1;
    let right=((x-48)/72)**2+((y+2)/69)**2 < 1;
    let bottom=(x/82)**2+((y-21)/62)**2<1 && y>8;
    return left||right||bottom;
  }
  function buildNeuralAnatomy() {
    neuralPoints=[]; neuralEdges=[];
    let loops=0;
    while (neuralPoints.length < 205 && loops++ < 3000) {
      let x=rnd(-121,121),y=rnd(-82,83);
      if (!brainContains(x,y)) continue;
      neuralPoints.push({x,y,phase:rnd(0,Math.PI*2),speed:rnd(.4,1.5),size:rnd(.3,1.8)});
    }
    for(let i=0;i<neuralPoints.length;i++){
      const neighbours=[];
      for(let j=0;j<neuralPoints.length;j++){
        if(i===j)continue;
        const a=neuralPoints[i],b=neuralPoints[j];
        const d=(a.x-b.x)**2+(a.y-b.y)**2;
        if(d<35**2 && d>6**2) neighbours.push({j,d});
      }
      neighbours.sort((a,b)=>a.d-b.d);
      for (let k=0;k<Math.min(3,neighbours.length);k++){
        const j=neighbours[k].j;
        if(j>i)neuralEdges.push({a:i,b:j,lum:rnd(.35,1),phase:rnd(0,6.28)});
      }
    }
  }
  function buildStars() {
    stars=[];
    for(let i=0;i<135;i++)stars.push({x:rnd(0,1),y:rnd(0,1),r:rnd(.3,1.25),phase:rnd(0,6.28),speed:rnd(.18,1.2)});
  }
  buildNeuralAnatomy();buildStars();

  function resize() {
    const bounds=app.getBoundingClientRect();
    W=bounds.width; H=activePage==='home'?Math.max(app.scrollHeight,window.innerHeight):window.innerHeight;
    // Cap backing-store pixels to avoid excessive GPU memory on tall/high-DPI screens.
    const nativeDpr = Math.min(mobileQuery.matches ? 1.35 : 1.6, window.devicePixelRatio || 1);
    DPR=Math.max(.65,Math.min(nativeDpr,Math.sqrt(2600000 / Math.max(1,W*H))));
    canvas.width=Math.round(W*DPR);
    canvas.height=Math.round(H*DPR);
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(app);
  addEventListener('resize',resize,{passive:true});
  resize();

  function elementCenter(el) {
    const e=el.getBoundingClientRect(),root=app.getBoundingClientRect();
    return {x:e.left+e.width/2-root.left,y:e.top+e.height/2-root.top};
  }
  const ease=(v)=>v*v*(3-2*v);
  function bezier(a,b,c,d,t) {
    const s=1-t;
    return {x:s*s*s*a.x+3*s*s*t*b.x+3*s*t*t*c.x+t*t*t*d.x,
            y:s*s*s*a.y+3*s*s*t*b.y+3*s*t*t*c.y+t*t*t*d.y};
  }
  function curveFor(core,target,domainIndex,fiber) {
    const dx=target.x-core.x,dy=target.y-core.y;
    const dist=Math.hypot(dx,dy)||1,nx=dx/dist,ny=dy/dist,px=-ny,py=nx;
    const seed=fiber*12.41+domainIndex*4.81;
    const offset=(fiber-5)*3.7;
    const spread=Math.sin(seed)*17+offset*1.15;
    const bend=[-24,20,15,-25,24][domainIndex]+Math.sin(seed*.9)*13;
    const brainShift=mobileQuery.matches?41:57;
    const a={x:core.x+nx*brainShift+px*offset,y:core.y+ny*brainShift+py*offset};
    const d={x:target.x+px*offset*.085,y:target.y+py*offset*.085};
    const b={x:a.x+dx*.35+px*(bend+spread),y:a.y+dy*.35+py*(bend+spread)};
    const c={x:core.x+dx*.77+px*(bend*.6+spread*.73),y:core.y+dy*.77+py*(bend*.6+spread*.73)};
    return {a,b,c,d,nx,ny,px,py};
  }
  function strokeCurve(p) {
    ctx.beginPath();ctx.moveTo(p.a.x,p.a.y);ctx.bezierCurveTo(p.b.x,p.b.y,p.c.x,p.c.y,p.d.x,p.d.y);
  }
  function drawGlowingDot(x,y,r,color,alpha) {
    let grad=ctx.createRadialGradient(x,y,0,x,y,r*5);
    grad.addColorStop(0,rgba(color,alpha));grad.addColorStop(.12,rgba(color,alpha*.52));grad.addColorStop(1,rgba(color,0));
    ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,r*5,0,Math.PI*2);ctx.fill();
  }
  function drawLensFlare(x,y,rgb,strength=1,size=56){
    ctx.save();ctx.globalCompositeOperation='lighter';
    const h=ctx.createLinearGradient(x-size,y,x+size,y);
    h.addColorStop(0,rgba(rgb,0));h.addColorStop(.43,rgba(rgb,.05*strength));
    h.addColorStop(.5,rgba(rgb,.40*strength));h.addColorStop(.57,rgba(rgb,.05*strength));h.addColorStop(1,rgba(rgb,0));
    ctx.fillStyle=h;ctx.fillRect(x-size,y-.65,size*2,1.3);
    const v=ctx.createLinearGradient(x,y-size*.38,x,y+size*.38);
    v.addColorStop(0,rgba(rgb,0));v.addColorStop(.5,rgba(rgb,.16*strength));v.addColorStop(1,rgba(rgb,0));
    ctx.fillStyle=v;ctx.fillRect(x-.5,y-size*.38,1,size*.76);
    ctx.restore();
  }
  function drawBackdrop(now,core) {
    ctx.save();ctx.globalCompositeOperation='screen';
    const g=ctx.createRadialGradient(core.x,core.y,20,core.x,core.y,mobileQuery.matches?280:390);
    g.addColorStop(0,'rgba(48,144,186,.055)');g.addColorStop(.42,'rgba(34,65,137,.025)');g.addColorStop(1,'rgba(40,100,144,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    stars.forEach((s)=>{
      const x=s.x*W,y=s.y*H,bright=.08+(Math.sin(now*.00055*s.speed+s.phase)+1)*.13;
      if(Math.hypot(core.x-x,core.y-y)<115)return;
      ctx.fillStyle=`rgba(172,210,243,${bright})`;
      ctx.beginPath();ctx.arc(x,y,s.r,0,6.283);ctx.fill();
    });
    ctx.restore();
  }
  function drawArms(now,core) {
    for(let i=0;i<domains.length;i++){
      const domain=domains[i];
      const card=cards.find(c=>c.dataset.node===domain.id);
      const socket=card.querySelector('.node-socket');
      const target=elementCenter(socket);
      const hot=highlighted===domain.id;
      const dim=highlighted!==null&&!hot;
      const opacity=(activePage!=='home'?.32:1)*(dim?.19:hot?1.7:1);
      const rgb=domain.color;
      ctx.save();ctx.globalCompositeOperation='lighter';
      for(let fiber=0;fiber<11;fiber++){
        let p=curveFor(core,target,i,fiber);
        const central=fiber===5;
        // Thick light scattering pass.
        strokeCurve(p);
        ctx.strokeStyle=rgba(rgb,(central?.155:.051)*opacity);
        ctx.lineWidth=central?5.2:2.6;
        ctx.shadowColor=rgba(rgb,.6*opacity);
        ctx.shadowBlur=central?26:14;
        ctx.stroke();
        // Detailed conductive filaments.
        ctx.shadowBlur=0;strokeCurve(p);
        ctx.strokeStyle=rgba(rgb,(central?.64:.21)*opacity);
        ctx.lineWidth=central?1.15:.55;
        ctx.stroke();
        if(fiber%2===0){
          for(let k=1;k<7;k++){
            const u=k/7;
            const pos=bezier(p.a,p.b,p.c,p.d,u);
            const glow=Math.pow(.5+.5*Math.sin(now*.0015 + i*2+fiber*.6+k*.9),2);
            drawGlowingDot(pos.x,pos.y,central?1.3:.75,rgb,(.3+glow*.4)*opacity);
          }
        }
        // A living signal traveling from the core to the outer node.
        const numPulses=central?3:fiber%3===0?2:1;
        for(let k=0;k<numPulses;k++){
          const speed=(.000065+(fiber%4)*.000009)*(hot?1.5:1);
          const position=(now*speed+(k/numPulses)+(fiber*0.177)+i*.21)%1;
          const u=ease(position);
          const start=Math.max(0,u-.075);
          ctx.beginPath();
          for(let z=0;z<11;z++){
            const q=bezier(p.a,p.b,p.c,p.d,start+(u-start)*z/10);
            if(z===0)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y);
          }
          const end=bezier(p.a,p.b,p.c,p.d,u);
          ctx.lineWidth=central?2.6:1.3;
          ctx.strokeStyle=rgba(rgb,(central?.85:.45)*opacity);
          ctx.shadowColor=rgba(rgb,.8*opacity);ctx.shadowBlur=central?20:11;ctx.stroke();
          ctx.shadowBlur=0;
          drawGlowingDot(end.x,end.y,central?1.5:.8,rgb,.8*opacity);
        }
      }
      // Fine, irregular dendritic side fibers.
      for(let branch=0;branch<22;branch++){
        const fiber=branch%11;
        const p=curveFor(core,target,i,fiber);
        const phase=(branch*.618034)%1;
        const t=.20+phase*.65;
        const from=bezier(p.a,p.b,p.c,p.d,t);
        const to=bezier(p.a,p.b,p.c,p.d,Math.min(t+.10,1));
        const dist=(branch%2===0?1:-1)*(13+(branch%5)*8);
        const mid={x:from.x+(to.x-from.x)*.55+p.px*dist,y:from.y+(to.y-from.y)*.55+p.py*dist};
        ctx.beginPath();ctx.moveTo(from.x,from.y);
        ctx.quadraticCurveTo(mid.x,mid.y,to.x,to.y);
        ctx.strokeStyle=rgba(rgb,.13*opacity);ctx.lineWidth=.55;ctx.stroke();
        if(branch%3===0)drawGlowingDot(mid.x,mid.y,.8,rgb,.18*opacity);
      }
      // Luminescent halo at the endpoint.
      drawGlowingDot(target.x,target.y,3.2,rgb,.5*opacity);
      drawLensFlare(target.x,target.y,rgb,.5*opacity,31);
      ctx.restore();
    }
  }
  function outlineHemisphere(cx,cy,sgn,scale) {
    const S=(x,y)=>({x:cx+x*sgn*scale,y:cy+y*scale});
    const P=(x,y)=>[cx+x*sgn*scale,cy+y*scale];
    ctx.beginPath();ctx.moveTo(...P(0,-64));
    ctx.bezierCurveTo(...P(18,-83),...P(44,-85),...P(62,-72));
    ctx.bezierCurveTo(...P(91,-83),...P(114,-59),...P(109,-34));
    ctx.bezierCurveTo(...P(130,-15),...P(126,10),...P(107,24));
    ctx.bezierCurveTo(...P(117,50),...P(90,73),...P(69,60));
    ctx.bezierCurveTo(...P(49,83),...P(24,76),...P(14,60));
    ctx.bezierCurveTo(...P(3,75),...P(0,50),...P(0,31));
    ctx.bezierCurveTo(...P(6,10),...P(-4,-12),...P(0,-64));
    return S;
  }
  function drawBrain(now,core) {
    const scale=mobileQuery.matches?.82:1;
    const rgb=[115,224,234];
    ctx.save();ctx.globalCompositeOperation='lighter';
    let bg=ctx.createRadialGradient(core.x,core.y,9,core.x,core.y,136*scale);
    bg.addColorStop(0,'rgba(79,188,209,.12)');bg.addColorStop(.5,'rgba(45,106,174,.042)');bg.addColorStop(1,'rgba(70,130,209,0)');
    ctx.fillStyle=bg;ctx.beginPath();ctx.arc(core.x,core.y,136*scale,0,Math.PI*2);ctx.fill();
    for(const sgn of [-1,1]){
      const S=outlineHemisphere(core.x,core.y,sgn,scale);
      ctx.strokeStyle='rgba(107,221,238,.09)';ctx.lineWidth=1.5;ctx.shadowBlur=24;ctx.shadowColor='rgba(98,220,255,.6)';ctx.stroke();ctx.shadowBlur=0;
      ctx.strokeStyle='rgba(143,219,252,.19)';ctx.lineWidth=.55;ctx.stroke();
      // Short inner folds suggest a genuine cortical form.
      for(let f=0;f<8;f++){
        const x=17+((f*35)%78),y=-46+((f*29)%90);
        const a=S(x,y),b=S(x+11+(f%3)*5,y+12),c=S(x+5,y+23+(f%4)*3);
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(b.x,b.y,c.x,c.y);
        ctx.strokeStyle=rgba(rgb,.13+.04*Math.sin(now*.001+f));ctx.lineWidth=.75;ctx.stroke();
      }
    }
    const pts=neuralPoints.map(n=>({
      x:core.x+(n.x+Math.sin(now*.00057*n.speed+n.phase)*2.3)*scale,
      y:core.y+(n.y+Math.cos(now*.00063*n.speed+n.phase)*2.5)*scale
    }));
    for(const edge of neuralEdges){
      const a=pts[edge.a],b=pts[edge.b];
      const lum=.09+.09*edge.lum+Math.sin(now*.0015+edge.phase)*.035;
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=`rgba(126,218,243,${lum})`;ctx.lineWidth=edge.lum>.83?.7:.42;ctx.stroke();
    }
    // Select veins catch a much broader soft light, but don't blur the whole web.
    for(let k=0;k<neuralEdges.length;k+=13){
      const edge=neuralEdges[k],a=pts[edge.a],b=pts[edge.b];
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle='rgba(135,241,255,.19)';ctx.lineWidth=1.2;ctx.shadowColor='#61ccf5';ctx.shadowBlur=9;ctx.stroke();ctx.shadowBlur=0;
    }
    for(let k=0;k<neuralPoints.length;k++){
      const p=pts[k],n=neuralPoints[k];
      const glow=Math.sin(now*.0011*n.speed+n.phase)*.5+.5;
      if(n.size>1.45||k%9===0)drawGlowingDot(p.x,p.y,n.size*.9,rgb,(.3+glow*.55));
      else{ctx.fillStyle=`rgba(149,229,246,${.27+glow*.35})`;ctx.beginPath();ctx.arc(p.x,p.y,n.size*.55,0,Math.PI*2);ctx.fill();}
    }
    // Electric heartbeat at the center.
    const coreGlow=.44+Math.sin(now*.002)*.12;
    drawGlowingDot(core.x,core.y,5.2,[214,249,255],coreGlow);
    drawLensFlare(core.x,core.y,[121,222,255],.63,89*scale);
    ctx.restore();
  }

  let lastDraw=0;
  // Avoid drawing at full refresh rate on battery-powered devices and inactive views.
  // The animation loop stops entirely when the tab is hidden.
  let animationId = null;
  let frameCounter = 0;
  function draw(now) {
    animationId = null;
    if(document.hidden) return;
    animationId = requestAnimationFrame(draw);
    if(W<=0) return;
    const frameInterval = reduced ? 220 : activePage !== 'home' ? 100 : mobileQuery.matches ? 33.4 : 22.3;
    if(now-lastDraw < frameInterval)return;
    lastDraw=now;
    frameCounter++;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,W,H);
    let core=elementCenter(brainAnchor);
    drawBackdrop(now,core);
    drawArms(now,core);
    drawBrain(now,core);
  }
  animationId = requestAnimationFrame(draw);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if(animationId!==null) cancelAnimationFrame(animationId);
      animationId=null;
    } else if(animationId===null) {
      lastDraw=0;
      animationId=requestAnimationFrame(draw);
    }
  });

  // Active paths have brighter photons and muted neighboring connections.
  for(const card of cards){
    card.addEventListener('pointerenter',()=>{highlighted=card.dataset.node});
    card.addEventListener('pointerleave',()=>{highlighted=null});
    card.addEventListener('focus',()=>{highlighted=card.dataset.node});
    card.addEventListener('blur',()=>{highlighted=null});
    card.addEventListener('click',()=>navigate(card.dataset.node));
  }
  app.addEventListener('pointermove',(e)=>{
    if(e.pointerType==='touch')return;
    const bounds=app.getBoundingClientRect();
    const x=e.clientX-bounds.left,y=e.clientY-bounds.top;
    cursorGlow.style.left=x+'px';cursorGlow.style.top=y+'px';
    cursorGlow.style.opacity='1';
    pointer.x=x;pointer.y=y;pointer.active=true;
    if(activePage==='home'&&!reduced&&!mobileQuery.matches){
      const dx=(x-W/2)/W,dy=(y-window.innerHeight*.56)/window.innerHeight;
      brainAnchor.style.translate=`${dx*9}px ${dy*8}px`;
    }
  },{passive:true});
  app.addEventListener('pointerleave',()=>{cursorGlow.style.opacity='0';pointer.active=false;brainAnchor.style.translate='0 0'});

  function navigate(id) {
    const routeURL=(id==='home'?'index':id)+'.html';
    try {
      history.pushState(null,'',routeURL);
      document.documentElement.dataset.initialRoute=id;
      showRoute(id);
    } catch(error) {
      // file:// URLs can have an opaque origin; hash routing remains usable.
      window.location.hash=id==='home'?'':id;
      document.documentElement.dataset.initialRoute=id;
      showRoute(id);
    }
  }
  window.navigateNeural=navigate;
  function renderDomain(d) {
    $('detailIndex').textContent=`${d.index} / 05`;
    $('detailOverline').textContent=d.overline;
    $('detailTitle').innerHTML=`${d.name}<span>.</span>`;
    $('detailTitle').style.textShadow=`0 0 100px rgba(${d.color.join(',')},.16)`;
    $('detailTitle').querySelector('span').style.color=`rgb(${d.color.join(',')})`;
    $('detailLead').textContent=d.lead;
    $('detailDescription').textContent=d.description;
    $('detailPagination').textContent=`${d.index} — ${d.name.toUpperCase()}`;
    $('techTags').replaceChildren(...d.tags.map(tag=>{
      const span=document.createElement('span');span.textContent=tag;return span;
    }));
    $('projectList').replaceChildren(...d.projects.map((title,index)=>{
      const line=document.createElement('div');line.className='project-item';
      const number=document.createElement('span');number.className='project-no';number.textContent=String(index+1).padStart(2,'0');
      const name=document.createElement('span');name.textContent=title;
      const arrow=document.createElement('span');arrow.className='project-arr';arrow.textContent='↗';
      line.append(number,name,arrow);return line;
    }));
    window.NeuralPortfolio?.render(d.id);
    const next=domains[(domains.indexOf(d)+1)%domains.length];
    $('nextButton').onclick=()=>navigate(next.id);
  }
  function showRoute(id){
    const d=domains.find(x=>x.id===id);
    activePage=d?'detail':id==='o-mne'?'about':'home';
    if(d)detailView.style.setProperty('--domain-rgb',d.color.join(','));
    if(d)renderDomain(d);else window.NeuralPortfolio?.hideDock();
    app.classList.toggle('view-open',activePage!=='home');
    hero.classList.toggle('is-hidden',activePage!=='home');
    detailView.classList.toggle('is-visible',activePage==='detail');
    aboutView.classList.toggle('is-visible',activePage==='about');
    detailView.setAttribute('aria-hidden',activePage==='detail'?'false':'true');
    aboutView.setAttribute('aria-hidden',activePage==='about'?'false':'true');
    // Hide focusable descendants from tab traversal during transitions.
    hero.inert=activePage!=='home';
    detailView.inert=activePage!=='detail';
    aboutView.inert=activePage!=='about';
    if(activePage==='home')document.title='Sigurd — Backend, Web, Aplikace, GameDev a AI | Portfolio';
    else if(d)document.title=`${d.name} — Sigurd | Portfolio`;
    else document.title='O mně — Sigurd | Portfolio';
    const routeName=d?d.id+'.html':activePage==='about'?'o-mne.html':'';
    const canonical=document.querySelector('link[rel=canonical]');if(canonical)canonical.href='https://sigurd.site/'+routeName;
    const description=document.querySelector('meta[name=description]');if(description)description.content=d?d.description:'Interaktivní portfolio vývojáře Sigurda Gnezdilova: Backend, Web, Aplikace, GameDev a AI.';
    const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=document.title;
    const ogDescription=document.querySelector('meta[property="og:description"]');if(ogDescription)ogDescription.content=description?.content||'';
    const ogImage=document.querySelector('meta[property="og:image"]');if(ogImage)ogImage.content='https://sigurd.site/assets/og-'+(d?d.id:'home')+'.jpg';
    highlighted=null;
    resize();
    window.scrollTo({top:0,behavior:'instant'});
  }
  $('brandLink').addEventListener('click',(e)=>{e.preventDefault();navigate('home')});
  $('backButton').addEventListener('click',()=>navigate('home'));
  $('aboutBack').addEventListener('click',()=>navigate('home'));
  $('aboutButton').addEventListener('click',()=>navigate('o-mne'));
  $('aboutExplore').addEventListener('click',()=>navigate('home'));
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&activePage!=='home')navigate('home')});
  const getRoute=()=>decodeURIComponent(location.hash.slice(1))||document.documentElement.dataset.initialRoute||location.pathname.split('/').pop().replace(/\.html$/,'')||'home';
  window.addEventListener('popstate',()=>showRoute(location.pathname.split('/').pop().replace(/\.html$/,'')||getRoute()));
  window.addEventListener('hashchange',()=>showRoute(decodeURIComponent(location.hash.slice(1))));
  showRoute(getRoute());

  const loadingScreen=$('loadingScreen');
  const loadingBar=$('loadingBar');
  const loadingValue=$('loadingValue');
  const start=performance.now(),loadDuration=reduced?50:1380;
  function updateLoader(now){
    const progress=clamp((now-start)/loadDuration,0,1);
    const shown=Math.round((1-(1-progress)**2.2)*100);
    loadingBar.style.width=shown+'%';
    loadingValue.textContent=String(shown).padStart(2,'0')+'%';
    if(progress<1)requestAnimationFrame(updateLoader);
    else{loadingScreen.classList.add('is-done');setTimeout(()=>loadingScreen.remove(),1000)}
  }
  requestAnimationFrame(updateLoader);
})();
