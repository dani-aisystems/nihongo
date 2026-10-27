const N = require('./load.js'); const E=N.E;
const state={items:{},conf:{},mist:[]};
let problems=[]; const lens={};
for(const mode of ['quick','std','deep']){
  for(let d=1; d<=168; d++){
    let S; try{ S=E.buildLesson(d,mode,state);}catch(e){ problems.push(`build ${d} ${mode}: ${e.stack.split('\n').slice(0,3).join(' | ')}`); continue; }
    lens[mode]=(lens[mode]||[]); lens[mode].push(S.steps.length);
    S.steps.forEach((s,i)=>{
      if(!s||!s.type) problems.push(`null step d${d} ${mode} #${i}`);
      if(s.type==='mcq'){ const ok=s.opts.filter(o=>o.ok).length; const uniq=new Set(s.opts.map(o=>E.normJ(o.t)+'|'+o.t.toLowerCase())).size;
        if(ok!==1) problems.push(`mcq ok!=1 d${d} ${s.key}`); if(uniq!==s.opts.length) problems.push(`mcq dup opts d${d} ${s.key} ${s.opts.map(o=>o.t)}`); if(s.opts.length<2) problems.push(`mcq <2 opts d${d} ${s.key}`);
        // ambiguous English: wrong option equal to an alt of the correct item
        const it=E.ITEMS[s.key]; if(it&&it.en&&!s.jpOpts){ const alts=it.en.map(E.normE); s.opts.filter(o=>!o.ok).forEach(o=>{ if(E.normE(o.t)&&alts.includes(E.normE(o.t))) problems.push(`ambig d${d} ${s.key} ${o.t}`); }); }
      }
      if(s.phase===undefined) problems.push(`no phase d${d} ${s.type}`);
    });
    // simulate grading so later days have history
    if(mode==='std') S.steps.forEach(s=>{ if(s.key&&E.ITEMS[s.key]) E.grade(state,s.key,Math.random()<0.8,s.kind||'rec'); });
  }
}
console.log('problems',problems.length); console.log(problems.slice(0,40).join('\n'));
for(const m in lens){ const a=lens[m]; console.log(m,'min',Math.min(...a),'max',Math.max(...a),'avg',(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1)); }
// estimate minutes
['quick','std','deep'].forEach(m=>{ const mins=[1,8,25,60,100,150,168].map(d=>E.estimate(E.buildLesson(d,m,state).steps)); console.log(m,mins.join(' ')); });
