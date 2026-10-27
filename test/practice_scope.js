const N=require('./load.js'); const E=N.E;
let bad=0, total=0;
for(const learned of [2,5,13,30,60]){
  const state={items:{},conf:{},mist:[]};
  // simulate completed days 1..learned with every item seen
  for(let d=1; d<=learned; d++) N.DAYS[d-1].items.forEach(k=>{ const s=E.newSRS(); s.n=2; s.c=1; s.w=1; s.due=0; state.items[k]=s; state.mist.push({k,r:false}); });
  // lookup of japanese text → item day
  const dayOf=t=>{ const it=E.BYJP[E.surface(t).replace(/\s/g,'')]||E.BYJP[E.reading(t).replace(/\s/g,'')]; return it?it.day:null; };
  for(const k of ['due','hira','kata','vocab','listen','build','grammar','numbers','speak','mistakes']){
    for(let rep=0; rep<15; rep++){
      const s=E.buildPractice(k,state,{maxDay:learned,n:10}); if(!s) continue;
      s.steps.forEach(st=>{ total++;
        const it=E.ITEMS[st.key]; if(it && it.day>learned){ bad++; console.log('ITEM beyond',learned,k,st.key,it.day); }
        (st.opts||[]).forEach(o=>{ if(st.key&&st.key.startsWith('k:')){ const kk=E.ITEMS['k:'+o.t]||Object.values(E.ITEMS).find(x=>x.type==='k'&&x.rom===o.t&&x.kata===it.kata); if(kk&&kk.day>learned){ bad++; console.log('KANA OPT beyond',learned,st.key,o.t,kk.day);} return; } if(st.key&&st.key.startsWith('n:')) return; const sen=Object.values(E.ITEMS).find(x=>x.type==='s'&&(x.en[0]===o.t||x.tiles.join(' ')===o.t)); const vd=Object.values(E.ITEMS).find(x=>x.type==='v'&&(x.en[0]===o.t||x.jp===o.t)); const kd=E.ITEMS['k:'+o.t]; const d=(sen||vd||kd||{}).day; if(d&&d>learned){ bad++; if(bad<15) console.log('OPT beyond',learned,k,st.key,o.t,d);} });
      });
    }
  }
}
console.log('steps',total,'out-of-scope',bad);
