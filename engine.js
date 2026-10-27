/* NIHONGO — engine: text utilities, course index, spaced repetition, session builder */
(function(){
const N = window.NIHONGO;
const E = N.E = {};

/* ================= Kana & romaji ================= */
const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0)+0x60));
const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0)-0x60));
E.toKata = toKata; E.toHira = toHira;

const K2R = {};
N.HIRA.forEach(([k,r])=>K2R[k]=r);
K2R["を"]="o";
N.DAKU.forEach(([k,r])=>K2R[k]=r);
N.YOON.forEach(([k,r])=>K2R[k]=r);
N.EXTRA_KATA.forEach(([k,r])=>K2R[toHira(k)]=r);
Object.assign(K2R,{"ぁ":"a","ぃ":"i","ぅ":"u","ぇ":"e","ぉ":"o","ゃ":"ya","ゅ":"yu","ょ":"yo","ゔ":"vu","ゎ":"wa"});

// strip ruby markup  日本[にほん] → surface 日本 / reading にほん
E.surface = s => s.replace(/\[[^\]]*\]/g,"");
E.reading = s => s.replace(/([^\s\[\]]+?)\[([^\]]+)\]/g,(m,a,b)=>b);
// Ruby parse into segments [{t, r}] — kanji run immediately before [..]
E.rubySegs = s => {
  const out=[]; const re=/([一-鿿々]+)\[([^\]]+)\]/g; let i=0,m;
  while((m=re.exec(s))){ if(m.index>i) out.push({t:s.slice(i,m.index)}); out.push({t:m[1],r:m[2]}); i=re.lastIndex; }
  if(i<s.length) out.push({t:s.slice(i)}); return out;
};

E.romaji = function(str, opts={}){
  let s = toHira(E.reading(str));
  let out=""; let i=0;
  while(i<s.length){
    const c=s[i], two=s.substr(i,2);
    if(c===" "){ out+=" "; i++; continue; }
    if(c==="っ"){ // double next consonant
      const nx = s.substr(i+1,2); let r = K2R[nx]||K2R[s[i+1]]||"";
      if(r.startsWith("ch")) out+="t"; else if(r) out+=r[0];
      i++; continue;
    }
    if(c==="ー"){ const m=out.match(/[aeiou](?!.*[aeiou])/); out += m?m[0]:"-"; i++; continue; }
    if(c==="ん"){ const nx=K2R[s[i+1]]||""; out += (/^[aeiouy]/.test(nx)?"n'":"n"); i++; continue; }
    if(K2R[two] && two.length===2 && /[ゃゅょぁぃぅぇぉ]/.test(two[1])){ out+=K2R[two]; i+=2; continue; }
    if(K2R[c]){ out+=K2R[c]; i++; continue; }
    if(/[。、！？・…]/.test(c)){ out+= c==="。"?".":c==="、"?",":c==="！"?"!":c==="？"?"?":c==="…"?"…":" "; i++; continue; }
    out+=c; i++;
  }
  return out;
};
// romaji of a sentence given as tiles, with particle readings
E.tileRomaji = tiles => tiles.map(t => {
  const bare=E.reading(t).replace(/[、。]/g,"");
  if(N.PARTICLES[bare]) return N.PARTICLES[bare] + (t.endsWith("、")?",":"");
  if(bare==="こんにちは") return "konnichiwa";
  if(bare==="こんばんは") return "konbanwa";
  return E.romaji(t);
}).join(" ").replace(/\s+([,.])/g,"$1");

/* romaji → hiragana (input method) */
const R2K = {};
Object.entries(K2R).forEach(([k,r])=>{ if(!R2K[r] || k.length>R2K[r].length===false) R2K[r]=R2K[r]||k; });
Object.assign(R2K,{a:"あ",i:"い",u:"う",e:"え",o:"お",shi:"し",si:"し",chi:"ち",ti:"ち",tsu:"つ",tu:"つ",fu:"ふ",hu:"ふ",ji:"じ",zi:"じ",zu:"ず",du:"づ",di:"ぢ",wo:"を",ja:"じゃ",ju:"じゅ",jo:"じょ",jya:"じゃ",jyu:"じゅ",jyo:"じょ",zya:"じゃ",zyu:"じゅ",zyo:"じょ",sya:"しゃ",syu:"しゅ",syo:"しょ",cya:"ちゃ",cyu:"ちゅ",cyo:"ちょ",tya:"ちゃ",tyu:"ちゅ",tyo:"ちょ",xtsu:"っ",ltsu:"っ",xya:"ゃ",xyu:"ゅ",xyo:"ょ",xa:"ぁ",xi:"ぃ",xu:"ぅ",xe:"ぇ",xo:"ぉ",la:"ぁ",li:"ぃ",lu:"ぅ",le:"ぇ",lo:"ぉ",
 ka:"か",ki:"き",ku:"く",ke:"け",ko:"こ",ga:"が",gi:"ぎ",gu:"ぐ",ge:"げ",go:"ご",sa:"さ",su:"す",se:"せ",so:"そ",za:"ざ",ze:"ぜ",zo:"ぞ",ta:"た",te:"て",to:"と",da:"だ",de:"で",do:"ど",na:"な",ni:"に",nu:"ぬ",ne:"ね",no:"の",ha:"は",hi:"ひ",he:"へ",ho:"ほ",ba:"ば",bi:"び",bu:"ぶ",be:"べ",bo:"ぼ",pa:"ぱ",pi:"ぴ",pu:"ぷ",pe:"ぺ",po:"ぽ",ma:"ま",mi:"み",mu:"む",me:"め",mo:"も",ya:"や",yu:"ゆ",yo:"よ",ra:"ら",ri:"り",ru:"る",re:"れ",ro:"ろ",wa:"わ",
 fa:"ふぁ",fi:"ふぃ",fe:"ふぇ",fo:"ふぉ",thi:"てぃ",dhi:"でぃ",wi:"うぃ",we:"うぇ",she:"しぇ",che:"ちぇ",je:"じぇ",va:"ゔぁ",vi:"ゔぃ",vu:"ゔ",ve:"ゔぇ",vo:"ゔぉ"});
E.kanaInput = function(src, final){
  let s = src.toLowerCase(); let out=""; let i=0;
  while(i<s.length){
    const ch=s[i];
    if(!/[a-z\-']/.test(ch)){ out+=ch; i++; continue; }
    if(ch==="-"){ out+="ー"; i++; continue; }
    if(ch==="'"){ i++; continue; }
    // n handling
    if(ch==="n"){
      const nx=s[i+1];
      if(nx==="n"){ out+="ん"; i += /[aeiouy]/.test(s[i+2]||"") ? 1 : 2; continue; }
      if(nx===undefined){ if(final){ out+="ん"; i++; continue; } out+="n"; i++; continue; }
      if(!/[aeiouy]/.test(nx)){ out+="ん"; i++; continue; }
    }
    // double consonant
    if(/[bcdfghjkmpqrstvwxz]/.test(ch) && s[i+1]===ch){ out+="っ"; i++; continue; }
    if(ch==="t"&&s[i+1]==="c"&&s[i+2]==="h"){ out+="っ"; i++; continue; }
    let matched=false;
    for(let L=4;L>=1;L--){ const seg=s.substr(i,L); if(R2K[seg]){ out+=R2K[seg]; i+=L; matched=true; break; } }
    if(matched) continue;
    // y-combos like "kya" etc.
    const m3=s.substr(i,3);
    if(/^[kgnhbpmr]y[auo]$/.test(m3)){ const base=R2K[m3[0]+"i"]; const sm={a:"ゃ",u:"ゅ",o:"ょ"}[m3[2]]; out+=base+sm; i+=3; continue; }
    if(/^(sh|ch)[auo]$/.test(m3)){ const base=R2K[m3.slice(0,2)+"i"]; const sm={a:"ゃ",u:"ゅ",o:"ょ"}[m3[2]]; out+=base+sm; i+=3; continue; }
    // incomplete — keep raw letters
    out+=ch; i++;
  }
  return out;
};

/* ================= Normalisation & answer checking ================= */
const VOW = {a:"あ",i:"い",u:"う",e:"え",o:"お"};
E.normJ = function(s){
  s = toHira(E.surface(E.reading(s)));
  s = s.replace(/[\s。、！？!?.,・…「」『』（）()~〜]/g,"");
  // expand ー to the vowel of the previous kana
  let out="";
  for(const c of s){ if(c==="ー"){ const r=K2R[out.slice(-1)]||""; const v=r.slice(-1); out+=VOW[v]||""; } else out+=c; }
  return out;
};
E.normJsurface = s => toHira(E.surface(s)).replace(/[\s。、！？!?.,・…]/g,"");
const NUMW = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100};
E.normE = function(s){
  s = (" "+s.toLowerCase()+" ")
    .replace(/[’`]/g,"'")
    .replace(/\(.*?\)/g," ")
    .replace(/i'm/g,"i am").replace(/it's/g,"it is").replace(/that's/g,"that is").replace(/what's/g,"what is").replace(/where's/g,"where is").replace(/who's/g,"who is").replace(/there's/g,"there is").replace(/won't/g,"will not").replace(/can't/g,"cannot").replace(/n't/g," not").replace(/'ll/g," will").replace(/'re/g," are").replace(/'ve/g," have").replace(/'d/g," would")
    .replace(/o'?\s?clock/g," ")
    .replace(/(\d),(\d{3})/g,"$1$2")
    .replace(/[^a-z0-9 ]/g," ")
    .replace(/\b(a|an|the|mr|ms|mrs|miss|san)\b/g," ")
    .replace(/\s+/g," ").trim();
  s = s.split(" ").map(w=>NUMW[w]!==undefined?String(NUMW[w]):w).join(" ");
  s = s.replace(/\b(\d+) (\d)\b/g,(m,a,b)=> (a.endsWith("0")&&+a>=20)? String(+a + +b) : m);
  s = s.replace(/^to /,"");
  return s;
};
function lev(a,b){ const m=a.length,n=b.length; if(!m) return n; if(!n) return m; let p=Array(n+1).fill(0).map((_,i)=>i);
  for(let i=1;i<=m;i++){ let q=[i]; for(let j=1;j<=n;j++) q[j]=Math.min(p[j]+1,q[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1)); p=q; } return p[n]; }
E.lev = lev;
E.checkE = function(input, alts){
  const a=E.normE(input); if(!a) return {ok:false};
  for(const alt of alts){ const b=E.normE(alt); if(!b) continue;
    if(a===b) return {ok:true,exact:true};
    const tol = b.length>=10?2:b.length>=5?1:0;
    if(lev(a,b)<=tol) return {ok:true,typo:true,best:alt};
  }
  return {ok:false};
};
// Japanese check: expected = jp string (may contain ruby), tiles for particle phonetics
E.checkJ = function(input, expected, tiles){
  const a=E.normJ(input); if(!a) return {ok:false};
  const forms = new Set([E.normJ(expected), E.normJsurface(expected)]);
  if(forms.has(a)) return {ok:true,exact:true};
  // phonetic particles (わ for は etc.)
  if(tiles){
    const ph = tiles.map(t=>{ const b=E.reading(t).replace(/[、。]/g,""); return b==="は"?"わ":b==="へ"?"え":b==="を"?"お":t; }).join("");
    if(E.normJ(ph)===a) return {ok:true,particle:true};
  }
  // optional sentence-final か/です leniency is NOT applied (grammar matters)
  return {ok:false};
};

/* ================= Numbers ================= */
const D1 = ["","いち","に","さん","よん","ご","ろく","なな","はち","きゅう"];
E.numRead = function(n){
  if(n===0) return "ゼロ";
  let s="";
  const man=Math.floor(n/10000); if(man){ s += (man===1?"いち":E.numRead(man))+"まん"; }
  const th=Math.floor(n/1000)%10; if(th){ s += th===1?"せん":th===3?"さんぜん":th===8?"はっせん":D1[th]+"せん"; }
  const hu=Math.floor(n/100)%10; if(hu){ s += hu===1?"ひゃく":hu===3?"さんびゃく":hu===6?"ろっぴゃく":hu===8?"はっぴゃく":D1[hu]+"ひゃく"; }
  const te=Math.floor(n/10)%10; if(te){ s += te===1?"じゅう":D1[te]+"じゅう"; }
  const on=n%10; if(on) s+=D1[on];
  return s;
};
const HOURS=["","いちじ","にじ","さんじ","よじ","ごじ","ろくじ","しちじ","はちじ","くじ","じゅうじ","じゅういちじ","じゅうにじ"];
const MONTHS=["","いちがつ","にがつ","さんがつ","しがつ","ごがつ","ろくがつ","しちがつ","はちがつ","くがつ","じゅうがつ","じゅういちがつ","じゅうにがつ"];
const DATES=["","ついたち","ふつか","みっか","よっか","いつか","むいか","なのか","ようか","ここのか","とおか","じゅういちにち","じゅうににち","じゅうさんにち","じゅうよっか","じゅうごにち","じゅうろくにち","じゅうしちにち","じゅうはちにち","じゅうくにち","はつか","にじゅういちにち","にじゅうににち","にじゅうさんにち","にじゅうよっか","にじゅうごにち","にじゅうろくにち","にじゅうしちにち","にじゅうはちにち","にじゅうくにち","さんじゅうにち","さんじゅういちにち"];
const MINS={5:"ごふん",10:"じゅっぷん",15:"じゅうごふん",20:"にじゅっぷん",25:"にじゅうごふん",30:"さんじゅっぷん",35:"さんじゅうごふん",40:"よんじゅっぷん",45:"よんじゅうごふん",50:"ごじゅっぷん",55:"ごじゅうごふん"};
const MONTH_EN=["","January","February","March","April","May","June","July","August","September","October","November","December"];
E.ageRead = n => { if(n===20) return "はたち"; let r=E.numRead(n); if(n%10===1) r=r.replace(/いち$/,"いっ"); else if(n%10===8) r=r.replace(/はち$/,"はっ"); else if(n%10===0) r=r.replace(/じゅう$/,"じゅっ"); return r+"さい"; };
E.NUMK = {
  n10:{t:"Numbers 0–10", gen:()=>{const n=rnd(0,10);return {v:n,label:String(n),read:n===0?"ゼロ":E.numRead(n)};}},
  n99:{t:"Numbers to 99", gen:()=>{const n=rnd(11,99);return {v:n,label:String(n),read:E.numRead(n)};}},
  age:{t:"Ages", gen:()=>{const n=pick([1,3,5,8,10,11,15,18,19,20,21,28,30,33,40,48]);return {v:n,label:n+" years old",read:E.ageRead(n)};}},
  hour:{t:"Hours", gen:()=>{const n=rnd(1,12);return {v:n,label:n+":00",read:HOURS[n]};}},
  min:{t:"Minutes", gen:()=>{const h=rnd(1,12), m=pick([5,10,15,20,25,30,35,40,45,50,55]);return {v:h*100+m,label:h+":"+String(m).padStart(2,"0"),read:HOURS[h]+" "+MINS[m]};}},
  month:{t:"Months", gen:()=>{const n=rnd(1,12);return {v:n,label:MONTH_EN[n],read:MONTHS[n]};}},
  date:{t:"Dates", gen:()=>{const n=pick([1,2,3,4,5,6,7,8,9,10,14,15,20,24,11,17,29,31]);return {v:n,label:ord(n)+" (of the month)",read:DATES[n]};}},
  yen:{t:"Prices", gen:()=>{const n=pick([100,200,400,500,1000,2000,5000,10000,1500,2500,700,900]);return {v:n,label:"¥"+n.toLocaleString("en-US"),read:E.numRead(n)+"えん"};}},
  yen2:{t:"Prices with sound changes", gen:()=>{const n=pick([300,600,800,3000,8000,1800,3600,650,1300,8800,6300,3800]);return {v:n,label:"¥"+n.toLocaleString("en-US"),read:E.numRead(n)+"えん"};}},
};
const WRONGFORM = r => r.replace("さんびゃく","さんひゃく").replace("ろっぴゃく","ろくひゃく").replace("はっぴゃく","はちひゃく").replace("さんぜん","さんせん").replace("はっせん","はちせん");
function ord(n){ const s=["th","st","nd","rd"],v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }
E.ord=ord;
function rnd(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
E.shuffle=shuffle; E.pick=pick; E.rnd=rnd;

/* ================= Course index ================= */
const ITEMS = E.ITEMS = {};   // key → item
const BYJP = E.BYJP = {};     // surface/reading → item
const DAYS = N.DAYS;
const KANA_ROM = k => K2R[toHira(k)] || "";
E.kanaRom = KANA_ROM;

function addItem(it){ ITEMS[it.key]=it; if(it.jp){ const s=E.surface(it.jp).replace(/\s/g,""); if(!BYJP[s]) BYJP[s]=it; const r=E.reading(it.jp).replace(/\s/g,""); if(!BYJP[r]) BYJP[r]=it; } return it; }

DAYS.forEach((d,i)=>{
  d.n=i+1; d.week=Math.ceil(d.n/7); d.stage=Math.ceil(d.week/4); d.items=[];
  if(d.k){
    const ks = typeof d.k==="string" ? [...d.k] : d.k;
    ks.forEach(k=>{
      const key="k:"+k; if(ITEMS[key]) { d.items.push(key); return; }
      const isKata=/[゠-ヿ]/.test(k);
      const hira=N.HIRA.find(x=>x[0]===toHira(k));
      addItem({key,type:"k",jp:k,rom:k==="っ"||k==="ッ"?"small tsu (pause)":KANA_ROM(k),kata:isKata,mn:isKata?(N.KATA_NOTES[k]||(hira?"Katakana partner of "+hira[0]+".":"")):(hira?hira[2]:""),day:d.n,noQuiz:/^[っッぢづヂヅ]$/.test(k)});
      d.items.push(key);
    });
  }
  const vv=(d.v||[]).map(x=>[x,false]).concat((d.p||[]).map(x=>[x,true]));
  vv.forEach(([str,ph])=>{
    const [jp,en,emoji,note,rom]=str.split("|");
    const key="v:"+E.surface(jp).replace(/\s/g,"");
    if(ITEMS[key]){ console.warn("dup vocab",jp,d.n); d.items.push(key); return; }
    addItem({key,type:"v",jp,en:en.split(";"),emoji:emoji||"",note:note||"",rom:rom||null,ph,day:d.n});
    d.items.push(key);
  });
  (d.s||[]).forEach((str,j)=>{
    const [tl,en,ctx]=str.split("|");
    const tiles=tl.split(" ").filter(Boolean);
    const key="s:"+d.n+"-"+j;
    addItem({key,type:"s",tiles,jp:tiles.join(""),en:en.split(";"),ctx:ctx||"",g:d.g||null,day:d.n});
    d.items.push(key);
  });
  if(d.g){ const gs=[].concat(d.g); gs.forEach(g=>{ const key="g:"+g; if(!ITEMS[key]){ const G=N.GRAMMAR[g]; addItem({key,type:"g",gid:g,...G,day:d.n}); d.items.push(key);} }); }
  if(d.num){ const key="n:"+d.num; if(!ITEMS[key]) addItem({key,type:"n",kind:d.num,t:E.NUMK[d.num].t,day:d.n}); d.items.push(key); }
});
N.KANJI.forEach(([c,m,r,ex,exm,day])=>{ const key="j:"+c; addItem({key,type:"j",jp:c,en:m.split("; "),readings:r,ex,exm,day}); DAYS[day-1].items.push(key); });
// names + function words for sentence gloss
E.FUNC = {"は":"topic marker (read “wa”)","が":"subject marker","を":"object marker (read “o”)","に":"at / to / on (time, place)","へ":"to (direction, read “e”)","で":"at (place of action) / by (means)","と":"with / and","も":"also, too","の":"’s / of (links nouns)","か":"question marker","ね":"…isn't it? (seeking agreement)","よ":"…you know (new info)","です":"is / am / are (polite)","でした":"was (polite)","じゃ":"(negative) not","ありません":"(polite negative) is not","から":"from","まで":"until / as far as","ください":"please (give me / do)","おねがいします":"please (request)","そう":"so, that way","ちょっと…":"a bit… (polite trailing no)","ちょっと":"a little","…":"(trailing off)","な":"links a な-adjective to a noun"};
E.gloss = function(tile){
  const b=E.surface(tile).replace(/[、。…]/g,""); const r=E.reading(tile).replace(/[、。…]/g,"");
  if(E.FUNC[b]) return E.FUNC[b];
  const it=BYJP[b]||BYJP[r]; if(it&&it.en) return it.en[0];
  for(const nm of N.NAMES){ if(b===nm||b===nm+"さん") return (nm[0].toUpperCase? "" : "")+"name"+(b.endsWith("さん")?" + さん":""); }
  // verb forms
  const forms=[["ませんでした","didn't …"],["ました","did …"],["ません","don't …"],["ましょう","let's …"],["ます","…"]];
  for(const [suf,lab] of forms){ if(b.endsWith(suf)&&suf!=="ます"){ const base=b.slice(0,-suf.length)+"ます"; const it2=BYJP[base]; if(it2) return it2.en[0].replace(/^to /,"")+" ("+lab.replace("…","").trim()+")"; } }
  if(b.endsWith("かった")){ const it2=BYJP[b.slice(0,-3)+"い"]; if(it2) return "was "+it2.en[0]; }
  if(b.endsWith("く")){ const it2=BYJP[b.slice(0,-1)+"い"]||(b==="よく"?BYJP["いい"]:null); if(it2) return it2.en[0]+" (→ not)"; }
  if(b==="ない"||b==="なかった") return b==="ない"?"not":"was not";
  const te={"いって":"go (please …)","まがって":"turn (please …)","まって":"wait (please …)","かいて":"write (please …)","とって":"take (please …)","おして":"press (please …)"}; if(te[b]) return te[b];
  return "";
};
E.dayOf = n => DAYS[n-1];
E.itemsUpTo = n => Object.values(ITEMS).filter(it=>it.day<=n);
E.isKataDay = d => d.items.some(k=>ITEMS[k].type==="k"&&ITEMS[k].kata);

/* Prerequisite text */
E.prereq = function(d){
  if(d.n===1) return "None — this is where you start.";
  const prev=[]; for(let i=d.n-1;i>=1&&prev.length<2;i--){ const p=DAYS[i-1]; if(!p.rv) prev.push("Day "+p.n+" · "+p.t); }
  const g=[].concat(d.g||[]); let extra="";
  if(d.stage>=3 && g.length) extra=" Uses です sentences from Stage 2.";
  return prev.join(" and ")+"."+extra;
};

/* ================= Spaced repetition ================= */
const DAY_MS=864e5;
E.newSRS = () => ({f:Date.now(),n:0,c:0,w:0,e:2.3,iv:0,due:0,rc:[0,0],pc:[0,0],lm:null,last:0});
E.grade = function(state, key, ok, kind, q, sessionSet){
  const now=Date.now(); const it=state.items[key]||(state.items[key]=E.newSRS());
  it.n++; it.last=now;
  const slot = kind==="prod"?"pc":"rc";
  if(ok){ it.c++; it[slot][0]++; } else { it.w++; it[slot][1]++; }
  if(!ok){
    it.e=Math.max(1.3,it.e-0.2); it.iv=0; it.due=now+10*60*1000; return it;
  }
  if(sessionSet && sessionSet.has(key)) return it; // only one interval step per session
  if(sessionSet) sessionSet.add(key);
  let iv=it.iv;
  const qual = q==null ? 2 : q; // 1 hard, 2 good, 3 easy
  if(iv<1){ iv = kind==="prod"||qual>=3 ? 1 : (it.c>=2?1:0.5); }
  else { const mult = it.e*(kind==="prod"?1.15:0.85)*(qual===1?0.6:qual===3?1.3:1); iv = Math.max(iv+1, Math.round(iv*mult)); }
  if(qual===1) it.e=Math.max(1.3,it.e-0.15); if(qual===3) it.e=Math.min(3,it.e+0.15);
  it.iv=Math.min(iv,180); it.due=now+it.iv*DAY_MS; return it;
};
E.level = s => !s||!s.n?0: s.iv<1?1: s.iv<3?2: s.iv<7?3: s.iv<21?4:5;
E.LEVELS = ["New","Seen","Learning","Familiar","Strong","Mastered"];
E.isMastered = s => s && s.iv>=7 && s.c>=3;
E.dueKeys = function(state, maxDay){
  const now=Date.now();
  return Object.entries(state.items).filter(([k,s])=>s.n>0 && s.due<=now && ITEMS[k] && ITEMS[k].day<=maxDay && quizzable(ITEMS[k]))
    .sort((a,b)=> (a[1].due-b[1].due) || (b[1].w-a[1].w)).map(x=>x[0]);
};
E.weakKeys = function(state, maxDay, n){
  return Object.entries(state.items).filter(([k,s])=>s.n>0&&ITEMS[k]&&ITEMS[k].day<=maxDay&&quizzable(ITEMS[k]))
    .map(([k,s])=>[k,(s.w+1)/(s.c+1)-E.level(s)*0.1]).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
};
function quizzable(it){ if(it.type==="k") return !it.noQuiz; if(it.type==="g") return !!(it.err&&it.err.length); return true; }
E.quizzable=quizzable;

/* ================= Question generation ================= */
function poolFor(maxDay, type, filt){ return Object.values(ITEMS).filter(it=>it.type===type && it.day<=Math.max(maxDay,1) && (!filt||filt(it))); }
function distinctEn(a,b){ const A=a.en.map(E.normE), B=b.en.map(E.normE); return !A.some(x=>B.includes(x)); }
function distractors(it, maxDay, n){
  // Wrong options come only from material already reached; later items are a last resort when too few exist
  const lim=Math.max(maxDay,it.day);
  const byDay=arr=>arr.sort((a,b)=>a.day-b.day);
  if(it.type==="v"){
    const ok=x=>x!==it && distinctEn(x,it) && !(x.en[0][0]==="("&&it.en[0][0]==="(");
    const pool=poolFor(lim,"v",ok);
    const near=pool.filter(x=>Math.abs(x.day-it.day)<=7 && x.ph===it.ph);
    let out=pickDistinct(shuffle(near).concat(shuffle(pool)), n);
    if(out.length<n) out=pickDistinct(out.concat(byDay(Object.values(ITEMS).filter(x=>x.type==="v"&&x.day>lim&&ok(x)))), n);
    return out;
  }
  if(it.type==="s"){
    const ok=x=>x!==it && distinctEn(x,it);
    const pool=poolFor(lim,"s",ok);
    const near=pool.filter(x=>Math.abs(x.day-it.day)<=14);
    let out=pickDistinct(shuffle(near).concat(shuffle(pool)), n);
    if(out.length<n) out=pickDistinct(out.concat(byDay(Object.values(ITEMS).filter(x=>x.type==="s"&&x.day>lim&&ok(x)))), n);
    return out;
  }
  if(it.type==="j"){ let pool=shuffle(poolFor(lim,"j",x=>x!==it)).slice(0,n); if(pool.length<n) pool=pool.concat(byDay(Object.values(ITEMS).filter(x=>x.type==="j"&&x.day>lim)).slice(0,n-pool.length)); return pool; }
  return [];
}
function pickDistinct(cands, n){ const out=[]; for(const c of cands){ if(out.length>=n) break; if(!out.includes(c) && out.every(o=>distinctEn(o,c) && E.surface(o.jp)!==E.surface(c.jp))) out.push(c); } return out; }
function kanaDistractors(it, maxDay, n, state){
  const all=poolFor(Math.max(maxDay,it.day),"k",x=>x!==it && !x.noQuiz && x.kata===it.kata && x.rom!==it.rom && !(it.rom==="o"&&x.rom==="wo") && !(it.rom==="wo"&&x.rom==="o"));
  const look=(N.LOOKALIKE.find(g=>g.includes(it.jp))||[]).filter(c=>c!==it.jp).map(c=>ITEMS["k:"+c]).filter(x=>x&&all.includes(x));
  // personal confusions first
  const conf=[]; if(state&&state.conf){ Object.entries(state.conf).forEach(([p,c])=>{ const [a,b]=p.split(">"); if(a===it.jp&&c>=1&&ITEMS["k:"+b]&&all.includes(ITEMS["k:"+b])) conf.push(ITEMS["k:"+b]); }); }
  const sameRow=all.filter(x=>x.rom.length>1&&it.rom.length>1&&x.rom.slice(0,-1)===it.rom.slice(0,-1));
  const out=[]; [...conf,...look,...shuffle(sameRow),...shuffle(all)].forEach(x=>{ if(out.length<n && !out.includes(x)) out.push(x); });
  return out;
}
const enLabel = it => it.en[0];
const optsFrom = (correct, wrongs) => shuffle([{t:correct,ok:true}, ...wrongs.map(w=>({t:w.t,ok:false,why:w.why}))]);

// Each generator returns a step object (plain JSON).
const G = E.GEN = {};
G.kanaRec = (it, maxDay, state) => { const ds=kanaDistractors(it,maxDay,3,state); return {type:"mcq",key:it.key,kind:"rec",cat:it.kata?"kata":"hira",prompt:{big:it.jp,sub:"What sound is this?"},speak:it.jp,
  opts:optsFrom(it.rom,ds.map(d=>({t:d.rom,why:d.rom+" is "+d.jp+"."}))),exp:it.jp+" is “"+it.rom+"”."+(it.mn?" "+it.mn:""),conf:ds.map(d=>[d.rom,d.jp])}; };
G.kanaRev = (it, maxDay, state, listen) => { const ds=kanaDistractors(it,maxDay,3,state); return {type:"mcq",key:it.key,kind:"rec",cat:listen?"listen":(it.kata?"kata":"hira"),prompt:listen?{audio:it.jp,sub:"Which character did you hear?",fallback:it.rom}:{big:it.rom,sub:"Which character is this sound?",lat:1},
  opts:optsFrom(it.jp,ds.map(d=>({t:d.jp,why:d.jp+" is “"+d.rom+"”."}))),jpOpts:1,exp:"“"+it.rom+"” is "+it.jp+"."+(it.mn?" "+it.mn:""),conf:ds.map(d=>[d.jp,d.jp])}; };
G.kanaType = it => ({type:"type",key:it.key,kind:"prod",cat:it.kata?"kata":"hira",lang:"en-rom",prompt:{big:it.jp,sub:"Type the sound in romaji"},speak:it.jp,ans:[it.rom].concat(it.rom==="wo"?["o"]:it.rom==="ji"?["zi"]:it.rom==="shi"?["si"]:it.rom==="chi"?["ti"]:it.rom==="tsu"?["tu"]:it.rom==="fu"?["hu"]:[]),exp:it.jp+" = “"+it.rom+"”."});
G.kanaMatch = (its) => ({type:"match",keys:its.map(i=>i.key),cat:its[0].kata?"kata":"hira",pairs:shuffle(its).slice(0,4).map(i=>[i.jp,i.rom])});
G.vocJE = (it, maxDay) => { const ds=distractors(it,maxDay,3); return {type:"mcq",key:it.key,kind:"rec",cat:"vocab",prompt:{jp:it.jp,sub:"What does this mean?",emoji:null},speak:it.jp,
  opts:optsFrom(enLabel(it),ds.map(d=>({t:enLabel(d),why:"“"+enLabel(d)+"” is "+E.surface(d.jp)+"."}))),exp:E.surface(it.jp)+" = “"+it.en.join(" / ")+"”."+(it.note?" "+it.note:"")}; };
G.vocEJ = (it, maxDay) => { const ds=distractors(it,maxDay,3); return {type:"mcq",key:it.key,kind:"rec",cat:"vocab",prompt:{en:enLabel(it),sub:"Choose the Japanese",emoji:it.emoji},
  opts:optsFrom(it.jp,ds.map(d=>({t:d.jp,why:E.surface(d.jp)+" means “"+enLabel(d)+"”."}))),jpOpts:1,exp:"“"+enLabel(it)+"” is "+E.surface(it.jp)+"."}; };
G.vocListen = (it, maxDay) => { const ds=distractors(it,maxDay,3); return {type:"mcq",key:it.key,kind:"rec",cat:"listen",prompt:{audio:E.reading(it.jp),sub:"What did you hear?",fallback:E.reading(it.jp)},
  opts:optsFrom(enLabel(it),ds.map(d=>({t:enLabel(d),why:"That would be "+E.surface(d.jp)+"."}))),exp:"You heard "+E.surface(it.jp)+" — “"+enLabel(it)+"”."}; };
G.vocTypeE = it => ({type:"type",key:it.key,kind:"rec",cat:"vocab",lang:"en",prompt:{jp:it.jp,sub:"Type the meaning in English"},speak:it.jp,ans:it.en,exp:E.surface(it.jp)+" = “"+it.en.join(" / ")+"”."});
G.vocTypeJ = it => ({type:"type",key:it.key,kind:"prod",cat:"vocab",lang:"ja",prompt:{en:enLabel(it),sub:"Write it in Japanese (type romaji — it converts)",emoji:it.emoji},expect:it.jp,ans:[it.jp],exp:"“"+enLabel(it)+"” is "+E.surface(it.jp)+" ("+romOf(it)+")."});
G.vocFlash = it => ({type:"flash",key:it.key,cat:"vocab",front:{en:enLabel(it),emoji:it.emoji},back:{jp:it.jp,en:it.en.join(" / ")},speak:it.jp,dir:"ej"});
G.senJE = (it, maxDay) => { const ds=distractors(it,maxDay,2); return {type:"mcq",key:it.key,kind:"rec",cat:"grammar",g:it.g,prompt:{tiles:it.tiles,sub:"What does this mean?"},speak:it.tiles.join(""),
  opts:optsFrom(it.en[0],ds.map(d=>({t:d.en[0],why:"That's "+d.tiles.join(" ")+"."}))),exp:"“"+it.en[0]+"”"}; };
G.senListen = (it, maxDay) => { const ds=distractors(it,maxDay,2); return {type:"mcq",key:it.key,kind:"rec",cat:"listen",g:it.g,prompt:{audio:E.reading(it.tiles.join("")),sub:"What did you hear?",fallback:it.tiles.join(" ")},
  opts:optsFrom(it.en[0],ds.map(d=>({t:d.en[0],why:"That would be "+d.tiles.join(" ")+"."}))),exp:"You heard: "+E.surface(it.tiles.join(" "))+" — “"+it.en[0]+"”."}; };
G.senBuild = (it, maxDay, extra) => {
  let tiles=it.tiles.map(t=>t);
  let bank=tiles.slice(); if(extra){ const ex=shuffle(["は","を","に","で","が","も","の","へ"].filter(p=>!tiles.includes(p))).slice(0,1); bank=bank.concat(ex); }
  return {type:"build",key:it.key,kind:"prod",cat:"grammar",g:it.g,prompt:{en:it.en[0],sub:"Build the sentence"},tiles,bank:shuffle(bank.map((t,i)=>({t,id:i}))),exp:it.en[0]+" → "+it.tiles.join(" ")};
};
G.senScene = (it, maxDay) => { const ds=distractors(it,maxDay,2); return {type:"mcq",key:it.key,kind:"rec",cat:"grammar",g:it.g,prompt:{scene:it.ctx||("Say: “"+it.en[0]+"”"),sub:"What do you say?"},
  opts:optsFrom(it.tiles.join(" "),ds.map(d=>({t:d.tiles.join(" "),why:"That means “"+d.en[0]+"”."}))),jpOpts:1,exp:it.tiles.join(" ")+" = “"+it.en[0]+"”."}; };
G.senTypeJ = it => ({type:"type",key:it.key,kind:"prod",cat:"grammar",g:it.g,lang:"ja",prompt:{en:it.en[0],sub:"Write it in Japanese"},expect:it.tiles.join(""),tiles:it.tiles,ans:[it.tiles.join("")],exp:"Structure: "+it.tiles.join(" · ")});
G.err = (g, e, i) => ({type:"err",key:"g:"+g,kind:"prod",cat:"grammar",g,tiles:e[0].split(" "),wrong:e[1],fix:e[2],why:e[3]});
G.speak = it => ({type:"speak",key:it.key,cat:"speak",jp:it.tiles?it.tiles.join(" "):it.jp,tiles:it.tiles||null,en:it.en[0]});
G.kanji = (it, maxDay) => { const ds=distractors(it,maxDay,3); return {type:"mcq",key:it.key,kind:"rec",cat:"kanji",prompt:{big:it.jp,sub:"What does this kanji mean?"},
  opts:optsFrom(it.en[0],ds.map(d=>({t:d.en[0],why:d.jp+" means “"+d.en[0]+"”."}))),exp:it.jp+" = “"+it.en.join("; ")+"”. Readings: "+it.readings+"."}; };
G.num = (kind, mode) => {
  const K=E.NUMK[kind]; const a=K.gen(); const seen=new Set([a.read]); const ds=[];
  if(kind==="yen2" && WRONGFORM(a.read)!==a.read){ ds.push({label:a.label,read:WRONGFORM(a.read),wrong:true}); seen.add(WRONGFORM(a.read)); }
  let guard=0; while(ds.length<3&&guard++<50){ const b=K.gen(); if(!seen.has(b.read)&&b.label!==a.label){ seen.add(b.read); ds.push(b);} }
  if(mode==="listen") return {type:"mcq",key:"n:"+kind,kind:"rec",cat:"listen",prompt:{audio:a.read,sub:"Which did you hear?",fallback:a.read},opts:optsFrom(a.label,ds.filter(d=>!d.wrong).map(d=>({t:d.label,why:"That would be "+d.read+"."}))),exp:"You heard "+a.read+" = "+a.label+"."};
  return {type:"mcq",key:"n:"+kind,kind:"rec",cat:"numbers",prompt:{en:a.label,sub:"How do you say it?"},opts:optsFrom(a.read,ds.map(d=>({t:d.read,why:d.wrong?"Sound change! It's "+a.read+", not "+d.read+".":d.read+" is "+d.label+"."}))),jpOpts:1,exp:a.label+" = "+a.read+"."};
};
function romOf(it){ return it.rom || (it.tiles?E.tileRomaji(it.tiles):E.romaji(it.jp)); }
E.romOf = romOf;

/* ================= Session builder ================= */
E.MODES = {quick:{l:"Quick",min:10,ls:2,pr:6,rc:4,ch:2},std:{l:"Standard",min:15,ls:4,pr:10,rc:6,ch:3,speak:1},deep:{l:"Deep",min:20,ls:6,pr:14,rc:10,ch:5,speak:3,err:2,dlg2:1}};
E.STEP_SECS = {intro:20,info:25,teachK:15,teachKG:40,teachV:20,teachG:45,teachS:25,teachJ:20,mcq:12,type:25,build:30,match:30,dlg:70,read:90,listenP:80,err:25,speak:30,flash:12,recap:15,regx:40};
E.estimate = steps => Math.max(3,Math.round(steps.reduce((a,s)=>a+(E.STEP_SECS[s.t2||s.type]||15),0)/60));

function teachStep(it){
  if(it.type==="k") return {type:"teachK",key:it.key,phase:"learn"};
  if(it.type==="v") return {type:"teachV",key:it.key,phase:"learn"};
  if(it.type==="s") return {type:"teachS",key:it.key,phase:"learn"};
  if(it.type==="g") return {type:"teachG",key:it.key,phase:"learn"};
  if(it.type==="j") return {type:"teachJ",key:it.key,phase:"learn"};
  if(it.type==="n") return {type:"teachN",key:it.key,phase:"learn"};
}
function recQ(it, maxDay, state){
  if(it.type==="k") return G.kanaRec(it,maxDay,state);
  if(it.type==="v") return G.vocJE(it,maxDay);
  if(it.type==="s") return G.senJE(it,maxDay);
  if(it.type==="j") return G.kanji(it,maxDay);
  if(it.type==="n") return G.num(it.kind);
  if(it.type==="g" && it.err&&it.err.length) return G.err(it.gid,it.err[0]);
  return null;
}
function prodQ(it, maxDay, state, hard){
  if(it.type==="k") return Math.random()<0.5?G.kanaType(it):G.kanaRev(it,maxDay,state);
  if(it.type==="v"){ const canType = E.reading(it.jp).length<=8 && it.en[0][0]!=="("; return canType ? G.vocTypeJ(it) : G.vocEJ(it,maxDay); }
  if(it.type==="s"){ if(hard && it.tiles.length<=4 && !it.tiles.some(t=>/[一-鿿]/.test(t))) return G.senTypeJ(it); return G.senBuild(it,maxDay,hard); }
  if(it.type==="j") return G.kanji(it,maxDay);
  if(it.type==="n") return G.num(it.kind, Math.random()<0.5?"listen":null);
  if(it.type==="g" && it.err&&it.err.length) return G.err(it.gid,pick(it.err));
  return null;
}
function listenQ(it, maxDay, state){
  if(it.type==="k") return G.kanaRev(it,maxDay,state,true);
  if(it.type==="v") return G.vocListen(it,maxDay);
  if(it.type==="s") return G.senListen(it,maxDay);
  if(it.type==="n") return G.num(it.kind,"listen");
  return null;
}
function varied(it, maxDay, state, i){
  // rotate formats for practice
  const r = i%4;
  if(it.type==="k"){ return [G.kanaRec, (a,b,c)=>G.kanaRev(a,b,c), G.kanaType, G.kanaRec][r](it,maxDay,state); }
  if(it.type==="v"){ const typeOK=E.reading(it.jp).length<=8&&it.en[0][0]!=="("; return [G.vocJE,G.vocEJ,typeOK?G.vocTypeJ:G.vocJE,typeOK&&it.en[0].length<24?G.vocTypeE:G.vocEJ][r](it,maxDay); }
  if(it.type==="s"){ return [G.senJE,G.senBuild,G.senScene,G.senBuild][r](it,maxDay); }
  if(it.type==="j") return G.kanji(it,maxDay);
  if(it.type==="n") return G.num(it.kind, r%2?"listen":null);
  if(it.type==="g"&&it.err&&it.err.length) return G.err(it.gid,it.err[i%it.err.length]);
  return null;
}
E.varied=varied; E.recQ=recQ; E.prodQ=prodQ; E.listenQ=listenQ;
function take(arr,n){ const out=[]; let i=0; if(!arr.length) return out; while(out.length<n){ out.push(arr[i%arr.length]); i++; if(i>n*4) break; } return out; }
function tag(step, phase, extra){ if(!step) return null; step.phase=phase; return Object.assign(step,extra||{}); }

E.buildLesson = function(day, modeKey, state){
  const d=DAYS[day-1]; const M=E.MODES[modeKey]||E.MODES.std; const steps=[]; const maxDay=day;
  const push=(s)=>{ if(s) steps.push(s); };
  if(d.rv || d.cons) return E.buildReview(day, modeKey, state);
  push({type:"intro",phase:"learn"});
  (d.info||[]).forEach((x,i)=>push({type:"info",phase:"learn",i}));
  const its=d.items.map(k=>ITEMS[k]);
  const kana=its.filter(i=>i.type==="k"), voc=its.filter(i=>i.type==="v"), sen=its.filter(i=>i.type==="s"), gra=its.filter(i=>i.type==="g"), kj=its.filter(i=>i.type==="j"), nums=its.filter(i=>i.type==="n");
  const quizK=kana.filter(k=>!k.noQuiz);
  // --- LEARN: teach → check → teach … ---
  if(kana.length>10){
    // grouped kana cards (rows of up to 5)
    const rows=[]; let cur=[]; kana.forEach(k=>{ cur.push(k.key); if(cur.length===5){ rows.push(cur); cur=[]; } }); if(cur.length) rows.push(cur);
    rows.forEach((r,ri)=>{ push({type:"teachKG",phase:"learn",keys:r}); const q=r.map(k=>ITEMS[k]).filter(x=>!x.noQuiz); if(q.length) push(tag(G.kanaRec(pick(q),maxDay,state),"learn")); });
  } else {
    kana.forEach((k,i)=>{ push(teachStep(k)); if(!k.noQuiz && (i%2===1||i===kana.length-1)) push(tag(G.kanaRec(k,maxDay,state),"learn")); });
    if(quizK.length>=3) push(tag(G.kanaMatch(quizK.slice(-5)),"learn"));
  }
  kj.forEach((k,i)=>{ push(teachStep(k)); if(i%2===1) push(tag(G.kanji(k,maxDay),"learn")); });
  nums.forEach(n=>{ push(teachStep(n)); push(tag(G.num(n.kind),"learn")); });
  voc.forEach((v,i)=>{ push(teachStep(v)); if(i%2===1||i===voc.length-1) push(tag(G.vocJE(v,maxDay),"learn")); });
  gra.forEach(g=>push(teachStep(g)));
  sen.forEach((s,i)=>{ push(teachStep(s)); if(i<2) push(tag(G.senJE(s,maxDay),"learn")); });
  // --- LISTEN ---
  const listenPool=[...voc,...sen,...quizK,...nums];
  shuffle(listenPool).slice(0,M.ls).forEach(it=>push(tag(listenQ(it,maxDay,state),"listen")));
  if(steps.filter(s=>s.phase==="listen").length<M.ls && listenPool.length) take(listenPool,M.ls-steps.filter(s=>s.phase==="listen").length).forEach(it=>push(tag(listenQ(it,maxDay,state),"listen")));
  // --- PRACTICE ---
  const pPool=[...quizK,...voc,...sen,...kj,...nums,...gra.filter(g=>g.err&&g.err.length)];
  const order=take(shuffle(pPool),M.pr);
  order.forEach((it,i)=>push(tag(varied(it,maxDay,state,i+1),"practice")));
  if(M.err){ gra.forEach(g=>(g.err||[]).slice(0,M.err).forEach(e=>push(tag(G.err(g.gid,e),"practice")))); }
  if(quizK.length>=4 && M.pr>=8) push(tag(G.kanaMatch(shuffle(quizK).slice(0,4)),"practice"));
  // --- APPLY ---
  if(d.dl) push({type:"dlg",phase:"apply",day});
  if(d.rd) push({type:"read",phase:"apply",day});
  if(d.ls) push({type:"listenP",phase:"apply",day});
  if(!d.dl&&!d.rd&&!d.ls){
    const ctxS=sen.filter(s=>s.ctx); if(ctxS.length) shuffle(ctxS).slice(0,M.dlg2?2:1).forEach(s=>push(tag(G.senScene(s,maxDay),"apply")));
    else if(voc.length) shuffle(voc).slice(0,M.dlg2?3:2).forEach(v=>push(tag(sceneVocab(v,maxDay,d),"apply")));
    else if(kj.length) kj.slice(0,2).forEach(k=>push(tag(G.kanji(k,maxDay),"apply")));
  } else if(M.dlg2 && sen.some(s=>s.ctx)) push(tag(G.senScene(pick(sen.filter(s=>s.ctx)),maxDay),"apply"));
  if(M.speak){ shuffle([...voc.filter(v=>v.ph),...sen,...voc]).slice(0,M.speak).forEach(it=>push(tag(G.speak(it),"apply"))); }
  // --- RECALL (from history) ---
  const due=E.dueKeys(state,day-1).filter(k=>!d.items.includes(k));
  const weak=E.weakKeys(state,day-1,M.rc).filter(k=>!due.includes(k)&&!d.items.includes(k));
  let rk=[...due,...weak].slice(0,M.rc);
  // fill with older seen items (interleaving) if history is thin
  if(rk.length<M.rc){ const older=Object.keys(state.items).filter(k=>ITEMS[k]&&ITEMS[k].day<day&&E.quizzable(ITEMS[k])&&!rk.includes(k)); rk=rk.concat(shuffle(older).slice(0,M.rc-rk.length)); }
  // weak grammar → re-explain
  const weakG=rk.map(k=>ITEMS[k]).find(it=>it.type==="s"&&it.g&&state.items["g:"+it.g]&&state.items["g:"+it.g].w>=2);
  if(weakG) push({type:"regx",phase:"recall",key:"g:"+weakG.g});
  rk.forEach((k,i)=>{ const it=ITEMS[k]; const st=state.items[k]; const prod=st&&st.rc[0]>=2&&Math.random()<0.6; push(tag(prod?prodQ(it,day,state):recQ(it,day,state),"recall",{rv:1})); });
  // discrimination drill for repeated kana confusion
  const confPairs=Object.entries(state.conf||{}).filter(([p,c])=>c>=2).sort((a,b)=>b[1]-a[1]);
  if(confPairs.length){ const [a]=confPairs[0][0].split(">"); const it=ITEMS["k:"+a]; if(it&&it.day<=day) push(tag(G.kanaRec(it,day,state),"recall",{drill:1})); }
  if(!rk.length){ // day 1: recall today's items
    [...quizK,...voc].slice(0,M.rc).forEach(it=>push(tag(it.type==="v"?G.vocFlash(it):G.kanaType(it),"recall")));
  }
  // --- CHALLENGE ---
  const cPool=[...sen,...voc,...quizK,...nums];
  shuffle(cPool).slice(0,M.ch).forEach(it=>push(tag(prodQ(it,maxDay,state,true),"challenge")));
  if(steps.filter(s=>s.phase==="challenge").length<M.ch && cPool.length) take(cPool,M.ch-steps.filter(s=>s.phase==="challenge").length).forEach(it=>push(tag(prodQ(it,maxDay,state,true),"challenge")));
  return {day,mode:modeKey,kind:"lesson",steps:steps.filter(Boolean)};
};
function sceneVocab(v, maxDay, d){
  const q=G.vocEJ(v,maxDay);
  const scenes = E.isKataDay(d) ? ["You're reading a café menu. Find “"+enLabel(v)+"”.","You see a sign. Which word means “"+enLabel(v)+"”?"] : ["A friend asks how to say “"+enLabel(v)+"”. Which word is it?","You want to say “"+enLabel(v)+"”. Choose the word."];
  q.prompt={scene:pick(scenes),sub:"Choose the Japanese",emoji:v.emoji}; return q;
}

/* Review / assessment days */
E.buildReview = function(day, modeKey, state){
  const d=DAYS[day-1]; const M=E.MODES[modeKey]||E.MODES.std; const steps=[]; const push=s=>{ if(s) steps.push(s); };
  let from, to=day-1, scale=1;
  if(d.fin){ from=1; scale=2.2; } else if(d.as){ from=(d.stage-1)*28+1; scale=1.6; } else if(d.cons){ from=1; scale=1.2; } else { from=day-6; }
  push({type:"intro",phase:"learn"});
  const all=Object.values(ITEMS).filter(it=>it.day>=from&&it.day<=to&&E.quizzable(it));
  const by=t=>all.filter(it=>it.type===t);
  const weight=k=>{ const s=state.items[k]; return s? (s.w+1)/(s.c+2) + (E.level(s)<3?0.3:0) : 0.5; };
  const pickW=(arr,n)=> shuffle(arr).sort((a,b)=>weight(b.key)-weight(a.key)+ (Math.random()-0.5)*0.4).slice(0,n);
  const n=x=>Math.max(1,Math.round(x*scale*(M.pr/8)));
  if(d.cons==="particles"){
    Object.values(ITEMS).filter(i=>i.type==="g"&&i.err&&i.err.length).forEach(g=>g.err.forEach(e=>{ if(/[はがをにでへとも]/.test(e[2])||/^\(/.test(e[2])) push(tag(G.err(g.gid,e),"practice",{test:"grammar"})); }));
    pickW(by("s"),n(6)).forEach(s=>push(tag(G.senBuild(s,day,true),"practice",{test:"grammar"})));
    steps.splice(1,0,...[]);
  } else if(d.cons==="forms"){
    const f=by("s").filter(s=>s.tiles.some(t=>/(ました|ません|ましょう|かった|くない|でした|く$)/.test(t)));
    pickW(f,n(8)).forEach((s,i)=>push(tag(i%2?G.senBuild(s,day,true):G.senJE(s,day),"practice",{test:"grammar"})));
    ["masen","mashita","adjneg","adjpast","iiadj"].forEach(g=>(N.GRAMMAR[g].err||[]).forEach(e=>push(tag(G.err(g,e),"practice",{test:"grammar"}))));
  } else if(d.cons==="travel"||d.cons==="social"){
    (d.scn||[]).forEach(sd=>push({type:"dlg",phase:"apply",day:sd,test:"conversation"}));
    const rel=all.filter(it=>it.type==="s"&&it.ctx&&(d.cons==="travel"?(it.day>=85&&it.day<=112):(it.day>=113||it.day<=56)));
    pickW(rel,n(5)).forEach(s=>push(tag(G.senScene(s,day),"apply",{test:"conversation"})));
  } else {
    // kana
    const k=by("k"); if(k.length){ pickW(k,n(d.week<=4?6:2)).forEach((it,i)=>push(tag(i%3===2?G.kanaType(it):i%3===1?G.kanaRev(it,day,state):G.kanaRec(it,day,state),"practice",{test:it.kata?"katakana":"hiragana"}))); }
    // vocab
    const v=by("v"); pickW(v,n(6)).forEach((it,i)=>push(tag(i%3===2&&E.reading(it.jp).length<=8&&it.en[0][0]!=="("?G.vocTypeJ(it):i%3===1?G.vocEJ(it,day):G.vocJE(it,day),"practice",{test:"vocabulary"})));
    // kanji
    const j=by("j"); pickW(j,n(2)).forEach(it=>push(tag(G.kanji(it,day),"practice",{test:"kanji"})));
    // numbers
    const nn=by("n"); pickW(nn,n(2)).forEach((it,i)=>push(tag(G.num(it.kind,i%2?"listen":null),"practice",{test:it.kind&&i%2?"listening":"numbers"})));
    // grammar
    const s=by("s"); pickW(s,n(5)).forEach((it,i)=>push(tag(i%2?G.senBuild(it,day):G.senJE(it,day),"practice",{test:"grammar"})));
    by("g").forEach(g=>{ if(Math.random()<0.7||d.fin) push(tag(G.err(g.gid,pick(g.err)),"practice",{test:"grammar"})); });
    // listening
    const lp=[...v,...s]; pickW(lp,n(d.listen?6:3)).forEach(it=>push(tag(listenQ(it,day,state),"listen",{test:"listening"})));
    // apply: a dialogue / reading from the period
    const dlgDays=[]; for(let x=from;x<=to;x++){ const dd=DAYS[x-1]; if(dd.dl||dd.rd||dd.ls) dlgDays.push(x); }
    shuffle(dlgDays).slice(0,d.fin?3:d.as?2:1).forEach(x=>{ const dd=DAYS[x-1]; push({type:dd.dl?"dlg":dd.rd?"read":"listenP",phase:"apply",day:x,test:dd.dl?"conversation":dd.rd?"reading":"listening"}); });
    // production challenge
    pickW(s,n(2)).forEach(it=>push(tag(G.senBuild(it,day,true),"challenge",{test:"grammar"})));
  }
  // order: practice items shuffled lightly by category for interleaving
  const intro=steps.shift(); const body=shuffle(steps.filter(s=>s.phase!=="apply"&&s.phase!=="challenge")).concat(steps.filter(s=>s.phase==="apply"),steps.filter(s=>s.phase==="challenge"));
  return {day,mode:modeKey,kind:d.fin?"final":d.as?"assessment":d.cons?"consolidation":"review",steps:[intro,...body].filter(Boolean)};
};

/* Practice sessions (Practice tab & Library quick-practice) */
E.buildPractice = function(kind, state, opts={}){
  const maxDay=opts.maxDay||1; const steps=[]; const push=s=>{ if(s) steps.push(tag(s,"practice")); };
  // Only what the learner has reached: completed days, plus anything already met inside a lesson
  const known=it=>it.day<=maxDay || (state.items[it.key] && opts.seenOK!==false);
  const pool=t=>Object.values(ITEMS).filter(it=>it.type===t&&known(it)&&E.quizzable(it));
  const n=opts.n||10;
  if(kind==="hira"||kind==="kata"){
    const k=pool("k").filter(it=>kind==="kata"?it.kata:!it.kata);
    if(!k.length) return null;
    const conf=Object.entries(state.conf||{}).filter(([p,c])=>c>=2).map(([p])=>p.split(">")[0]).map(c=>ITEMS["k:"+c]).filter(it=>it&&k.includes(it));
    const sel=[...conf,...shuffle(k).sort((a,b)=>E.level(state.items[a.key])-E.level(state.items[b.key]))].slice(0,n);
    sel.forEach((it,i)=>push([G.kanaRec,(a,b,c)=>G.kanaRev(a,b,c),G.kanaType,(a,b,c)=>G.kanaRev(a,b,c,true)][i%4](it,maxDay,state)));
    if(k.length>=4) push(G.kanaMatch(shuffle(k).slice(0,4)));
  } else if(kind==="vocab"){
    const v=pool("v"); if(!v.length) return null;
    const due=E.dueKeys(state,maxDay).map(k=>ITEMS[k]).filter(it=>it.type==="v");
    [...due,...shuffle(v)].filter((x,i,a)=>a.indexOf(x)===i).slice(0,n).forEach((it,i)=>push(varied(it,maxDay,state,i)));
  } else if(kind==="listen"){
    const p=[...pool("v"),...pool("s"),...pool("n"),...pool("k")]; if(!p.length) return null;
    shuffle(p).slice(0,n).forEach(it=>push(listenQ(it,maxDay,state)));
  } else if(kind==="build"){
    const s=pool("s"); if(!s.length) return null; shuffle(s).slice(0,Math.min(n,8)).forEach((it,i)=>push(G.senBuild(it,maxDay,i%2===1)));
  } else if(kind==="grammar"){
    const g=pool("g"); const s=pool("s"); if(!g.length&&!s.length) return null;
    shuffle(g).slice(0,5).forEach(it=>push(G.err(it.gid,pick(it.err))));
    shuffle(s).slice(0,n-steps.length).forEach((it,i)=>push(i%2?G.senScene(it,maxDay):G.senJE(it,maxDay)));
  } else if(kind==="speak"){
    const p=[...pool("v").filter(v=>v.ph),...pool("s"),...pool("v")]; if(!p.length) return null; shuffle(p).slice(0,6).forEach(it=>push(G.speak(it)));
  } else if(kind==="due"){
    const due=E.dueKeys(state,maxDay); if(!due.length) return null; due.slice(0,n).forEach((k,i)=>{ const it=ITEMS[k]; const s=state.items[k]; push(s.rc[0]>=2&&i%2?prodQ(it,maxDay,state):recQ(it,maxDay,state)); });
  } else if(kind==="mistakes"){
    const keys=[...new Set((state.mist||[]).filter(m=>!m.r).map(m=>m.k))].filter(k=>ITEMS[k]&&E.quizzable(ITEMS[k])).slice(0,n);
    if(!keys.length) return null; keys.forEach((k,i)=>push(i%2?prodQ(ITEMS[k],maxDay,state):recQ(ITEMS[k],maxDay,state)));
  } else if(kind==="item"){
    const it=ITEMS[opts.key]; if(!it) return null;
    if(it.type==="g"){ (it.err||[]).forEach(e=>push(G.err(it.gid,e))); pool("s").filter(s=>s.g===it.gid).slice(0,4).forEach((s,i)=>push(i%2?G.senBuild(s,maxDay):G.senJE(s,maxDay))); }
    else { push(recQ(it,maxDay,state)); push(listenQ(it,maxDay,state)); push(prodQ(it,maxDay,state)); if(it.type!=="k") push(varied(it,maxDay,state,1)); }
    if(it.type==="v"||it.type==="s") push(G.speak(it));
  } else if(kind==="numbers"){
    const nn=pool("n"); if(!nn.length) return null; for(let i=0;i<n;i++){ const it=pick(nn); push(G.num(it.kind,i%3===2?"listen":null)); }
  }
  return steps.length?{day:null,mode:"practice",kind:"practice",pk:kind,steps:steps.filter(Boolean)}:null;
};
})();
