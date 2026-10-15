(function(){
if(window.__ihLoaded){window.__ihInit&&window.__ihInit();return}window.__ihLoaded=1;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n==null?'':Number(n).toLocaleString('en-US');const nm=x=>Array.isArray(x)?x[0]:x;
const ic=c=>`<i class="${c} fa-fw"></i>`;
const j=u=>fetch(u,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(u+' '+r.status);return r.json()});
const sec=(i,t,s,h)=>`<section class="sec"><div class="sh"><h2>${ic(i)} ${t}</h2>${s?`<span>${s}</span>`:''}</div>${h}</section>`;
const fail=t=>`<div class="box"><h3>${t}</h3><p class="cap">数据加载失败</p></div>`;
function hero(M,P){return `<div class="hero"><div><h1>Fearchen 的情报站</h1><p>小游戏市场 · GitHub 热门 · Product Hunt 新品，每周更新</p></div><div class="bd">${M?`<span class="badge g">${ic('fa-solid fa-gamepad')} 小游戏 ${esc(M.updated)}</span>`:''}${P?`<span class="badge v">${ic('fa-solid fa-rotate')} 产品 ${esc(P.updated)}</span>`:''}</div></div>`}
function highlights(M,P){const c=[];
 if(P&&P.github.items[0]){const g=P.github.items[0];c.push(`<a class="hc c1" href="${esc(g.url)}" target="_blank" rel="noopener"><small>${ic('fa-brands fa-github')} GitHub 本周第一 · ★+${fmt(g.stars_week)}</small><h3>${esc(g.name)}</h3><p>${esc(g.desc_zh||g.desc_en)}</p></a>`)}
 if(P&&P.producthunt.items[0]){const p=P.producthunt.items[0];c.push(`<a class="hc c2" href="${esc(p.url)}" target="_blank" rel="noopener"><small>${ic('fa-brands fa-product-hunt')} Product Hunt 周榜第一 · ▲${fmt(p.votes)}</small><h3>${esc(p.name)}</h3><p>${esc(p.desc_zh||p.tagline_en)}</p></a>`)}
 if(M&&M.breakdowns&&M.breakdowns[0]){const b=M.breakdowns[0];c.push(`<a class="hc c3" href="/mini-games/"><small>${ic('fa-solid fa-magnifying-glass-chart')} 爆款拆解 · ${esc(b.maker)}</small><h3>${esc(b.name)}</h3><p>${esc(b.tag)}；${esc(b.rank)}。${esc(b.gameplay)}</p></a>`)}
 return c.length?sec('fa-solid fa-star','本周看点','编辑精选 · 一句话看懂',`<div class="hl">${c.join('')}</div>`):''}
function three(M,P){
 const mg=M?(()=>{const c=M.charts.domestic[0];return `<a class="box o" href="/mini-games/"><h3>${ic('fa-solid fa-gamepad')} 小游戏情报</h3><p class="cap">${esc(c.title)}</p><ul>${c.items.slice(0,5).map((x,i)=>`<li><span class="rk">${i+1}</span><span class="nm">${esc(nm(x))}</span></li>`).join('')}</ul><span class="more">查看小游戏情报 →</span></a>`})():fail('小游戏情报');
 const gh=P?`<a class="box v" href="/github/"><h3>${ic('fa-brands fa-github')} GitHub 情报</h3><p class="cap">GitHub Trending 本周新增星</p><ul>${P.github.items.slice(0,5).map((x,i)=>`<li><span class="rk">${i+1}</span><span class="nm">${esc(x.name)}</span><span class="st">★+${fmt(x.stars_week)}</span></li>`).join('')}</ul><span class="more">查看 GitHub 情报 →</span></a>`:fail('GitHub 情报');
 const ph=P?`<a class="box r" href="/producthunt/"><h3>${ic('fa-brands fa-product-hunt')} Product Hunt 情报</h3><p class="cap">${esc((P.producthunt.title||'Product Hunt 周榜').replace(/ \| Product Hunt$/,''))}</p><ul>${P.producthunt.items.slice(0,5).map((x,i)=>`<li><span class="rk">${esc(x.rank||i+1)}</span><span class="nm">${esc(x.name)}</span><span class="st">▲${fmt(x.votes)}</span></li>`).join('')}</ul><span class="more">查看 Product Hunt 情报 →</span></a>`:fail('Product Hunt 情报');
 return sec('fa-solid fa-ranking-star','本周榜单','',`<div class="three">${mg}${gh}${ph}</div>`)}
function kpis(M,P){const k=[];
 if(M){const n=M.news.find(x=>x.tag==='市场'),v=M.news.find(x=>x.tag==='版号');
  if(n){const m=n.title.match(/([\d.]+\s*亿元)/),h=n.title.match(/(\d{4})\s*(上半年|下半年|全年|年)/);if(m)k.push([m[1],(h?h[1]+' '+h[2]+' ':'')+'小程序游戏收入'])}
  if(v){const m=v.title.match(/(\d+)\s*款/);let mo=(v.title.match(/(\d{1,2})\s*月/)||[])[1];if(!mo){const d=String(v.date||'').match(/^\d{4}-(\d{2})/);if(d)mo=String(+d[1])}
   if(m)k.push([m[1]+' 款',mo?mo+' 月版号':'最新一批版号'])}}
 if(P){const g=P.github.items[0],p=P.producthunt.items[0];if(g)k.push(['★ '+fmt(g.stars_week),'GitHub 周冠 '+g.name]);if(p)k.push(['▲ '+fmt(p.votes),'Product Hunt 周冠 '+p.name])}
 if(M)k.push([M.newGames.length+' 款','近期新游']);
 return k.length?sec('fa-solid fa-chart-line','数据速览','',`<div class="kpis">${k.map(x=>`<div class="kpi"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div>`):''}
function newGames(M){if(!M||!M.newGames.length)return'';return sec('fa-solid fa-gift','新游上线','近期入榜 / 上线',`<div class="ngs">${M.newGames.map(g=>`<a class="ng" href="${esc(g.source)}" target="_blank" rel="noopener"><div><span class="pf p-${esc(g.platform)}">${esc(g.platform)}</span><b>${esc(g.name)}</b></div><p>${esc(g.what)}</p><em>${esc(g.date)}</em></a>`).join('')}</div>`)}
function news(M){if(!M)return'';return sec('fa-solid fa-newspaper','行业动态','版号 · 市场 · 平台',`<div class="tl">${M.news.slice(0,5).map(x=>`<a href="${esc(x.source)}" target="_blank" rel="noopener"><em>${esc(x.date)}</em><i>${esc(x.tag)}</i><span>${esc(x.title)}</span></a>`).join('')}</div>`)}
const about=`<div class="about"><b>${ic('fa-solid fa-circle-info')} 关于本站</b><p>每周整理小游戏市场（微信 / 抖音 / Poki / Telegram 等）、GitHub 热门仓库与 Product Hunt 新品，数据均摘自公开榜单与报道并附原始链接；另收录 2016–2018 年的 Linux / 容器 / OpenShift 技术笔记（<a href="/about/#tech">${'${n}'} 篇</a>）。<a href="/about/">了解更多 →</a></p></div>`;
function render(el,M,P){el.innerHTML=hero(M,P)+highlights(M,P)+three(M,P)+kpis(M,P)+newGames(M)+news(M)+about.replace('${n}',esc(el.dataset.posts))}
window.__ihInit=function(){const el=document.getElementById('ih');if(!el||el.dataset.done)return;el.dataset.done=1;
 Promise.all([j('/mini-games/data.json').catch(()=>null),j('/products/data.json').catch(()=>null)]).then(([M,P])=>render(el,M,P))};
window.__ihInit();
const hook=()=>window.swup&&window.swup.hooks&&window.swup.hooks.on('page:view',()=>window.__ihInit());
if(!hook())window.addEventListener('redefine:swup:ready',hook,{once:true});
})();
