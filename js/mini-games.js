(function(){
if(window.__mgLoaded){window.__mgInit&&window.__mgInit();return}window.__mgLoaded=1;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u}};
const dcls=d=>/^\+/.test(d)?'up':/^-/.test(d)?'dn':/新/.test(d)?'nw':'';
function chart(c){const li=c.items.map(x=>Array.isArray(x)?`<li><span class="n">${esc(x[0])}</span><span class="g">${esc(x[1])}</span><span class="d ${dcls(x[2])}">${esc(x[2])}</span></li>`:`<li><span class="n">${esc(x)}</span></li>`).join('');
return `<div class="card"><h3>${esc(c.title)}</h3><div class="meta">数据日期：${esc(c.date)} · ${esc(c.method)}</div><ol>${li}</ol><div class="src">来源：<a href="${esc(c.source)}" target="_blank" rel="noopener">${esc(c.sourceName)}</a></div></div>`}
function render(el,D){
const n=D.news.find(x=>x.tag==='市场');
el.innerHTML=`<div class="hero"><b>🎮 小游戏情报 · 每周更新</b><p>国内（微信 / 抖音）与海外（Poki / CrazyGames / Telegram / Facebook）小游戏榜单、新品、爆款拆解与行业动态。最近更新：${esc(D.updated)}</p>
<div class="kpis"><div class="kpi"><strong>316.57 亿</strong><small>2026H1 国内小程序游戏收入（+36.01%）</small></div><div class="kpi"><strong>23%</strong><small>微信 9 月畅销 Top100 换血率</small></div><div class="kpi"><strong>209 款</strong><small>9 月版号（国产 206 + 进口 3）</small></div><div class="kpi"><strong>1 亿</strong><small>Poki 月活（官方口径）</small></div></div></div>
<section><div class="sh"><h2>📈 本周热榜</h2><span>国内看微信/抖音，海外看网页 H5 与 Telegram</span></div>
<div class="tabs"><button data-t="domestic" class="on">国内</button><button data-t="overseas">海外</button></div>
<div class="grid" data-p="domestic">${D.charts.domestic.map(chart).join('')}</div><div class="grid" data-p="overseas" style="display:none">${D.charts.overseas.map(chart).join('')}</div></section>
<section><div class="sh"><h2>🆕 新游上线</h2><span>近期入榜/上线的新品</span></div><div class="list">${D.newGames.map(g=>`<div class="item"><span class="pf ${esc(g.platform)}">${esc(g.platform)}</span><b>${esc(g.name)}</b><div style="font-size:13px;margin-top:4px">${esc(g.what)}</div><div class="meta" style="margin:4px 0 0">${esc(g.date)} · <a href="${esc(g.source)}" target="_blank" rel="noopener">${esc(host(g.source))}</a></div></div>`).join('')}</div></section>
<section><div class="sh"><h2>🔍 爆款拆解</h2><span>玩法 / 变现 / 买量</span></div>${D.breakdowns.map(b=>`<div class="card"><h3>${esc(b.name)} <span class="g">${esc(b.maker)}</span> <span class="g">${esc(b.tag)}</span></h3><div class="meta">${esc(b.rank)}</div><div class="bd"><div><b>玩法</b>${esc(b.gameplay)}</div><div><b>变现</b>${esc(b.monet)}</div><div><b>买量</b>${esc(b.ua)}</div></div><div class="src">来源：${b.sources.map(s=>`<a href="${esc(s)}" target="_blank" rel="noopener">${esc(host(s))}</a>`).join(' · ')}　<span style="color:#999">${esc(b.caveat)}</span></div></div>`).join('')}</section>
<section class="news"><div class="sh"><h2>📰 行业动态 / 政策</h2><span>版号、市场规模、平台规则</span></div><div class="card"><ul>${D.news.map(x=>`<li><span class="dt">${esc(x.date)}</span><span class="tg">${esc(x.tag)}</span><div><b>${esc(x.title)}</b><div style="font-size:13px;color:var(--m)">${esc(x.detail)} <a href="${esc(x.source)}" target="_blank" rel="noopener">[${esc(host(x.source))}]</a></div></div></li>`).join('')}</ul></div></section>
<section><div class="foot"><b>数据来源与说明</b><ul>${D.sources.map(s=>`<li>${esc(s[0])}：${esc(s[1])} — <a href="${esc(s[2])}" target="_blank" rel="noopener">${esc(host(s[2]))}</a></li>`).join('')}</ul>${esc(D.note)}</div></section>`;
el.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));el.querySelectorAll('[data-p]').forEach(p=>p.style.display=p.dataset.p===b.dataset.t?'':'none')});
}
window.__mgInit=function(){const el=document.getElementById('mg');if(!el||el.dataset.done)return;el.dataset.done=1;
fetch('/mini-games/data.json',{cache:'no-cache'}).then(r=>r.json()).then(D=>render(el,D)).catch(e=>{el.innerHTML='<p>数据加载失败：'+esc(e)+'</p>'})};
window.__mgInit();
const hook=()=>window.swup&&window.swup.hooks&&window.swup.hooks.on('page:view',()=>window.__mgInit());
if(!hook())window.addEventListener('redefine:swup:ready',hook,{once:true});
})();
