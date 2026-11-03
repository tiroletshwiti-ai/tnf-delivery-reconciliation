window.TNF=window.TNF||{};
// Model: reconciliation rules (ported from calc.php). Tolerance = 0.5% of litres loaded, judged on compensated volume.
TNF.cfg={pct:0.5};
const r2=v=>v==null?null:Math.round(v*100)/100;
TNF.calc=function(d){
  const L=d.litres_loaded,M=d.litres_meter,adj=0,D=d.litres_dips,V=d.vcf,o={};
  o.difference=r2(M+adj-L); o.dip_var=D==null?null:r2(D-M);
  o.comp=V==null?null:r2(M*V); o.comp_var=o.comp==null?null:r2(o.comp-L);
  o.loss_pct=L?(M-L)/L*100:null; o.allowed=r2(L*TNF.cfg.pct/100);
  o.density_change=(d.density_loading!=null&&d.density_receipt!=null)?Math.round((d.density_receipt-d.density_loading)*1e4)/1e4:null;
  if(o.comp_var==null){o.result='incomplete';o.loss=null;o.over_by=null}
  else{o.loss=r2(Math.max(0,-o.comp_var));o.over_by=r2(Math.max(0,o.loss-o.allowed));o.result=o.loss>o.allowed?'over':'within'}
  return o;
};
TNF.totals=rows=>{const t={count:rows.length,loaded:0,meter:0,comp:0,comp_var:0,over:0};
  rows.forEach(r=>{t.loaded+=r.litres_loaded;t.meter+=r.litres_meter;if(r.c.comp!=null){t.comp+=r.c.comp;t.comp_var+=r.c.comp_var}if(r.c.result==='over')t.over++});return t};
