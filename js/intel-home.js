(function(){
if(window.__ihLoaded){window.__ihInit&&window.__ihInit();return}window.__ihLoaded=1;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n==null?'':Number(n).toLocaleString('en-US');
const nm=x=>Array.isArray(x)?x[0]:x;
const j=u=>fetch(u,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(u+' '+r.status);return r.json()});
function render(el,M,P){
  const mgN=M?M.charts.domestic.length+M.charts.overseas.length:'–', prN=P?P.github.items.length+P.producthunt.items.length:'–';
  const mgCard=M?(()=>{const c=M.charts.domestic[0];return `<div class="hd"><h2>🎮 小游戏情报</h2><span>更新 ${esc(M.updated)}</span></div><p class="cap">${esc(c.title)}</p><ul>${c.items.slice(0,5).map((x,i)=>`<li><span class="rk">${i+1}</span><span class="nm">${esc(nm(x))}</span></li>`).join('')}</ul>${M.news&&M.news[0]?`<p class="nw">📰 ${esc(M.news[0].title)}</p>`:''}`})():'<h2>🎮 小游戏情报</h2><p class="cap">数据加载失败</p>';
  const fail=t=>`<h2>${t}</h2><p class="cap">数据加载失败</p>`;
  const ghCard=P?`<div class="hd"><h2>⭐ GitHub 情报</h2><span>更新 ${esc(P.github.fetched||P.updated)}</span></div><p class="cap">GitHub Trending 本周热门（本周新增星）</p><ul>${P.github.items.slice(0,5).map((x,i)=>`<li><span class="rk">${i+1}</span><span class="nm">${esc(x.name)}</span><span class="st">★+${fmt(x.stars_week)}</span></li>`).join('')}</ul>`:fail('⭐ GitHub 情报');
  const phCard=P?`<div class="hd"><h2>🚀 Product Hunt 情报</h2><span>更新 ${esc(P.producthunt.fetched||P.updated)}</span></div><p class="cap">${esc((P.producthunt.title||'Product Hunt 周榜').replace(/ \| Product Hunt$/,''))}</p><ul>${P.producthunt.items.slice(0,5).map((x,i)=>`<li><span class="rk">${x.rank||i+1}</span><span class="nm">${esc(x.name)}</span><span class="st">▲${fmt(x.votes)}</span></li>`).join('')}</ul>`:fail('🚀 Product Hunt 情报');
  el.innerHTML=`<div class="hero"><div><h1>Fearchen 的情报站</h1><p>小游戏市场 · 全球新产品，每周更新</p></div><div class="stat"><div><b>${mgN}</b><span>小游戏榜单</span></div><div><b>${prN}</b><span>本周热门产品</span></div><div><a href="/about/#tech"><b>${esc(el.dataset.posts)}</b><span>技术文章</span></a></div></div></div>
<div class="three"><a class="box" href="/mini-games/">${mgCard}<span class="more">查看完整小游戏情报 →</span></a><a class="box gh" href="/github/">${ghCard}<span class="more">查看 GitHub 情报 →</span></a><a class="box ph" href="/producthunt/">${phCard}<span class="more">查看 Product Hunt 情报 →</span></a></div>`;
}
window.__ihInit=function(){const el=document.getElementById('ih');if(!el||el.dataset.done)return;el.dataset.done=1;
  Promise.all([j('/mini-games/data.json').catch(()=>null),j('/products/data.json').catch(()=>null)]).then(([M,P])=>render(el,M,P))};
window.__ihInit();
const hook=()=>window.swup&&window.swup.hooks&&window.swup.hooks.on('page:view',()=>window.__ihInit());
if(!hook())window.addEventListener('redefine:swup:ready',hook,{once:true});
})();
