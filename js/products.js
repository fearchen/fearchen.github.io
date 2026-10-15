(function(){
if(window.__trLoaded){window.__trInit&&window.__trInit();return}window.__trLoaded=1;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n==null?'':Number(n).toLocaleString('en-US');
function card(i,k,ph){return `<a class="it" href="${esc(i.url)}" target="_blank" rel="noopener"><div class="top"><span class="rk">${ph?esc(i.rank):k+1}</span><span class="nm">${esc(i.name)}</span>${ph?(i.votes!=null?`<span class="st">▲ ${fmt(i.votes)}</span>`:''):(i.stars_week!=null?`<span class="st">★ +${fmt(i.stars_week)} 本周</span>`:'')}</div>
<div class="sub">${ph?esc(i.tagline_en):`${esc(i.lang||'—')} · 总星 ${fmt(i.stars_total)} · ${esc(i.desc_en)}`}</div><div class="ds">${esc(i.desc_zh||'（中文简介待补）')}</div><div class="go">${ph?'查看 Product Hunt 页面 →':'打开 GitHub 仓库 →'}</div></a>`}
function render(el,D){const g=D.github,p=D.producthunt,ph=el.dataset.sec==='ph';
const foot='<div class="foot">说明：榜单与数字直接抓自 '+(ph?'Product Hunt 周榜页面；中文简介只依据产品页自我介绍撰写':'GitHub Trending 页面；中文简介只依据各仓库 README 撰写')+'，未作独立验证，宣传性说法以原页面为准。</div>';
const other=ph?'<a href="/github/">→ GitHub 情报</a>':'<a href="/producthunt/">→ Product Hunt 情报</a>';
el.innerHTML=ph?`<div class="hero"><div><b>🚀 Product Hunt 情报 · 每周更新</b><p>Product Hunt 上一完整周的周榜前 10。最近更新：${esc(D.updated)}</p></div><div class="jump">${other}</div></div>
<section id="tr-ph" class="ph"><div class="sh"><h2>🚀 Product Hunt 周榜</h2><span>${esc(p.title||'')} · 数字为榜单分数（latestScore，约等于票数） · <a href="${esc(p.source)}" target="_blank" rel="noopener">producthunt.com</a></span></div>${p.error?`<p>抓取失败：${esc(p.error)}</p>`:''}<div class="grid">${p.items.map((i,k)=>card(i,k,1)).join('')}</div></section>`+foot
:`<div class="hero"><div><b>⭐ GitHub 情报 · 每周更新</b><p>GitHub Trending 本周热门仓库。最近更新：${esc(D.updated)}</p></div><div class="jump">${other}</div></div>
<section id="tr-gh"><div class="sh"><h2>⭐ GitHub 本周热门</h2><span>抓取于 ${esc(g.fetched)} · 星数为“本周新增” · <a href="${esc(g.source)}" target="_blank" rel="noopener">github.com/trending</a></span></div><div class="grid">${g.items.map((i,k)=>card(i,k,0)).join('')}</div></section>`+foot;}
window.__trInit=function(){const el=document.getElementById('tr');if(!el||el.dataset.done)return;el.dataset.done=1;
fetch('/products/data.json',{cache:'no-cache'}).then(r=>r.json()).then(D=>render(el,D)).catch(e=>{el.innerHTML='<p>数据加载失败：'+esc(e)+'</p>'})};
window.__trInit();
const hook=()=>window.swup&&window.swup.hooks&&window.swup.hooks.on('page:view',()=>window.__trInit());
if(!hook())window.addEventListener('redefine:swup:ready',hook,{once:true});
})();
