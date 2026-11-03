// Controllers: read the request (hash + query), call models, return a view.
const D=()=>TNF.Deliveries;
TNF.C={
 dashboard(q){const rows=D().filter(q);return `<h1>Dashboard</h1>${TNF.V.filters(q,'dashboard')}${TNF.V.kpis(TNF.totals(rows))}`},
 deliveries(q){return `<h1>Delivery records</h1>${TNF.V.filters(q,'deliveries')}${TNF.V.table(D().filter(q))}`},
 delivery(q,id){const d=D().find(id);return d?TNF.V.detail(d):'<h1>Not found</h1>'},
 new(){return TNF.V.form()},
 reconciliation(q){q.result='over';return TNF.V.recon(D().filter(q),q)},
 reports(q){const g={};D().filter(q).forEach(d=>(g[d.site]=g[d.site]||[]).push(d));
  const out={};Object.keys(g).forEach(k=>out[k]=TNF.totals(g[k]));return TNF.V.reports(out)},
 save(form){const o={};new FormData(form).forEach((v,k)=>o[k]=v);
  ['litres_loaded','litres_meter','litres_dips','vcf'].forEach(k=>o[k]=o[k]===''?null:+o[k]);
  Object.assign(o,{delivery_time:'12:00:00',supplier:'-',loading_point:'-',transporter:'-',driver:'-',product:'D50',split_load:0});
  const id=D().add(o);location.hash='#/delivery/'+id}
};
