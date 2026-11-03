// Model: delivery records, persisted in the browser (localStorage). Replace with fetch() calls to use a real API later.
TNF.Deliveries={
  key:'tnf_deliveries',
  all(){let a;try{a=JSON.parse(localStorage.getItem(this.key))}catch(e){}
    if(!a){a=TNF.seed.slice();this.save(a)}
    const cum={};
    return a.slice().sort((x,y)=>(x.delivery_date+x.delivery_time).localeCompare(y.delivery_date+y.delivery_time)).map(d=>{
      const c=TNF.calc(d),k=d.site+d.delivery_date.slice(0,7);cum[k]=(cum[k]||0)+c.difference;return Object.assign({},d,{c,cum_diff:r(cum[k])})})},
  find(id){return this.all().find(d=>d.id==id)},
  add(d){const a=this.raw();d.id=Math.max(0,...a.map(x=>x.id))+1;a.push(d);this.save(a);return d.id},
  raw(){return JSON.parse(localStorage.getItem(this.key)||'null')||TNF.seed.slice()},
  save(a){try{localStorage.setItem(this.key,JSON.stringify(a))}catch(e){}},
  reset(){localStorage.removeItem(this.key)},
  filter(q){return this.all().filter(d=>(!q.site||d.site===q.site)&&(!q.result||d.c.result===q.result)&&(!q.from||d.delivery_date>=q.from)&&(!q.to||d.delivery_date<=q.to))},
  sites(){return [...new Set(TNF.seed.map(d=>d.site))]}
};
function r(v){return Math.round(v*100)/100}
