// Front controller / router: #/page?from=..&site=..  ->  controller -> view
function route(){
  const [p,qs]=(location.hash.slice(2)||'dashboard').split('?'),parts=p.split('/'),q=Object.fromEntries(new URLSearchParams(qs||''));
  const page=parts[0]==='delivery'?'delivery':parts[0],fn=TNF.C[page]||TNF.C.dashboard;
  document.getElementById('nav').innerHTML=TNF.V.nav(page==='delivery'?'deliveries':page);
  document.getElementById('app').innerHTML=fn(q,parts[1]);
}
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;
  if(f.id==='nf')return TNF.C.save(f);
  const q=new URLSearchParams(new FormData(f));[...q].forEach(([k,v])=>v||q.delete(k));location.hash='#/'+f.dataset.page+(q.toString()?'?'+q:'')});
addEventListener('hashchange',route);route();
