const N = require('./load.js'); const E=N.E;
console.log('days', N.DAYS.length);
const bad=[];
N.DAYS.forEach(d=>{ if(d.n%7===0 && !d.rv) bad.push('day '+d.n+' should be review'); if(d.n%7!==0 && d.rv) bad.push('day '+d.n+' unexpected review');
  if(!d.rv && !d.cons && !d.items.length) bad.push('empty day '+d.n);
  if(d.dl) d.dl.l.forEach(l=>{ if(Array.isArray(l[1])){ if(!l[1].some(o=>o[1])) bad.push('dlg no correct '+d.n);} });
  if(d.rd) d.rd.q.forEach(q=>{ if(q[2]>=q[1].length) bad.push('rd idx '+d.n); });
  if(d.ls) d.ls.q.forEach(q=>{ if(q[2]>=q[1].length) bad.push('ls idx '+d.n); });
});
// sentence tile validation
const known=new Map(); // reading -> introduced day
Object.values(E.ITEMS).forEach(it=>{ if(it.type==='v'){ known.set(E.normJ(it.jp),it.day); known.set(E.surface(it.jp).replace(/\s/g,''),it.day); E.surface(it.jp).split(' ').forEach(p=>{ if(!known.has(p)) known.set(p,it.day); }); } });
const FUNC=new Set(Object.keys(E.FUNC).concat(['じゃ','ありません','でした','ね','よ','か','と','ちょっと…','ない','なかった','…','いえいえ']));
const unk={};
Object.values(E.ITEMS).filter(i=>i.type==='s').forEach(s=>{
  s.tiles.forEach(t=>{
    let b=E.reading(t).replace(/[、。…]/g,''); if(!b) return;
    if(FUNC.has(b)) return; if(N.NAMES.some(n=>b===n||b===n+'さん')) return;
    const k=known.get(b)||known.get(E.normJ(b)); if(k!==undefined){ if(k>s.day) (unk[s.day]=unk[s.day]||[]).push(t+'(later '+k+')'); return; }
    // conjugations
    const bases=[[/ませんでした$/,'ます'],[/ました$/,'ます'],[/ません$/,'ます'],[/ましょう$/,'ます'],[/かった$/,'い'],[/く$/,'い']];
    for(const [re,rep] of bases){ if(re.test(b)){ const bb=b.replace(re,rep); if(known.has(bb)||bb==='よい') return; } }
    if(['いって','まがって','まって','かいて','とって','おして','よく'].includes(b)) return;
    // numbers/counters
    if(/^(.*)(さい|じ|ふん|ぷん|がつ|えん|ばんせん|にん)$/.test(b)) return;
    if(['ついたち','はん','しがつ','じゅうきゅうさい','せんはっぴゃく','さんびゃく'].includes(b)) return;
    (unk[s.day]=unk[s.day]||[]).push(t);
  });
});
console.log('BAD', bad);
console.log('UNKNOWN TILES', JSON.stringify(unk,null,0));
const counts={}; Object.values(E.ITEMS).forEach(i=>counts[i.type]=(counts[i.type]||0)+1); console.log(counts);
// romaji spot check
['こんにちは','がっこう','きって','しゃしん','ケーキ','コーヒー','パーティー','ちかてつ','ほん','きんようび','ジュース','ベッド','おちゃ'].forEach(w=>console.log(w,E.romaji(w)));
console.log(E.tileRomaji('わたし は がくせい です'.split(' ')));
['gakkou','kitte','shashin','konnichiha','kyou','nihon','sen\'en','ke-ki','tokei','onna','chotto','matcha'].forEach(w=>console.log(w,E.kanaInput(w,true)));
console.log(E.checkJ('watashi wa gakusei desu'.length?E.kanaInput('watashiwagakuseidesu',true):'', 'わたしはがくせいです', 'わたし は がくせい です'.split(' ')));
console.log(E.checkJ('けえき','ケーキ'), E.checkJ('ke-ki'.length?E.kanaInput('ke-ki',true):'','ケーキ'));
console.log(E.checkE("I'm a student",["I am a student"]), E.checkE('its three oclock now',["It's 3 o'clock now"]), E.checkE('Tanaka is a teacher',["Mr. Tanaka is a teacher"]), E.checkE('25',['twenty five']));
[0,4,7,9,11,23,47,99,100,300,600,800,1000,1800,3000,3600,8000,8800,10000,25000].forEach(n=>console.log(n,E.numRead(n)));
[1,8,10,11,18,20,21,30].forEach(n=>console.log(n,E.ageRead(n)));
