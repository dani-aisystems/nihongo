/* NIHONGO — application UI */
(function(){
"use strict";
const N=window.NIHONGO, E=N.E, ITEMS=E.ITEMS, DAYS=N.DAYS;
const $=(s,r=document)=>r.querySelector(s);
function h(tag,attrs,...kids){ const el=document.createElement(tag);
  if(attrs) for(const k in attrs){ const v=attrs[k]; if(v==null||v===false) continue;
    if(k==="class") el.className=v; else if(k==="style") el.setAttribute("style",v); else if(k.startsWith("on")&&typeof v==="function") el.addEventListener(k.slice(2),v); else if(k==="html") el.innerHTML=v; else el.setAttribute(k,v===true?"":v); }
  kids.flat(9).forEach(c=>{ if(c==null||c===false) return; el.append(c.nodeType?c:document.createTextNode(String(c))); }); return el; }
const ICON={
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
  slow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 16c0-4 3-7 7-7s7 3 7 7"/><path d="M18 16h2M2 16h2"/><circle cx="11" cy="9" r="1"/></svg>',
  gear:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  x:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
};
const svg=s=>{ const t=document.createElement("span"); t.style.display="contents"; t.innerHTML=s; return t; };

/* ================= State & persistence ================= */
const DEF=()=>({v:2,u:0,settings:{mode:"std",romaji:"auto",furi:true,audio:true,rate:0.75,name:"",theme:"",sv:2},done:{},items:{},conf:{},mist:[],act:{},stats:{q:0,c:0,cat:{},rp:{rec:[0,0],prod:[0,0]},ms:0},tests:{},draft:null,started:Date.now()});
// compact SRS packing for storage
const packIt=s=>[s.n,s.c,s.w,Math.round(s.e*100),Math.round(s.iv*10),Math.round(s.due/1000),s.rc[0],s.rc[1],s.pc[0],s.pc[1],Math.round(s.last/1000),Math.round(s.f/1000)];
const unpackIt=a=>({n:a[0],c:a[1],w:a[2],e:a[3]/100,iv:a[4]/10,due:a[5]*1000,rc:[a[6],a[7]],pc:[a[8],a[9]],last:a[10]*1000,f:a[11]*1000,lm:null});
function serialize(st){ const o=Object.assign({},st); o.items={}; for(const k in st.items) o.items[k]=packIt(st.items[k]); o.mist=st.mist.slice(-120); const ak=Object.keys(st.act).sort().slice(-400); o.act={}; ak.forEach(k=>o.act[k]=st.act[k]);
  if(o.draft && JSON.stringify(o.draft).length>90000) o.draft=null; return o; }
function deserialize(o){ const st=Object.assign(DEF(),o||{}); st.settings=Object.assign(DEF().settings,(o||{}).settings||{}); st.stats=Object.assign(DEF().stats,(o||{}).stats||{}); if(!st.stats.cat) st.stats.cat={}; if(!st.settings.sv){ if(st.settings.rate>=0.85&&st.settings.rate<1) st.settings.rate=0.75; else if(st.settings.rate<0.85) st.settings.rate=0.65; st.settings.sv=2; } if(!st.stats.rp) st.stats.rp={rec:[0,0],prod:[0,0]};
  const items={}; for(const k in (st.items||{})){ const v=st.items[k]; items[k]=Array.isArray(v)?unpackIt(v):v; } st.items=items; st.mist=st.mist||[]; st.conf=st.conf||{}; st.act=st.act||{}; st.done=st.done||{}; st.tests=st.tests||{}; return st; }
const LKEY="nihongo.v2";
let S=DEF();
try{ const t=localStorage.getItem(LKEY); if(t) S=deserialize(JSON.parse(t)); }catch(e){}
const Store={ref:null,mode:"device",writing:false,pending:false,timer:0,
  saveLocal(){ try{ localStorage.setItem(LKEY,JSON.stringify(serialize(S))); }catch(e){} },
  save(){ S.u=Date.now(); this.saveLocal(); if(this.ref){ clearTimeout(this.timer); this.timer=setTimeout(()=>this.push(),1500); } },
  async push(){ if(!this.ref) return; if(this.writing){ this.pending=true; return; } this.writing=true;
    try{ await this.ref.set(serialize(S)); this.mode="account"; }catch(e){ if(e&&(e.code==="invalid_argument"||e.code==="revoked"||e.code==="not_granted")){ this.ref=null; this.mode="device"; } else if(e&&e.code==="quota_exceeded"){ toast("Your account storage is full — progress is still saved on this device."); } }
    this.writing=false; syncBadge(); if(this.pending){ this.pending=false; this.push(); } },
  async connect(){
    if(!window.claude||typeof window.claude.use!=="function"){ syncBadge(); return; }
    try{
      const [db,user]=await Promise.all([window.claude.use("db"),window.claude.use("user")]);
      if(!db||!user){ syncBadge(); return; }
      const id=await user.id(); if(!id){ syncBadge(); return; }
      this.ref=db.doc("data/users/"+id+"/progress");
      const snap=await this.ref.get();
      if(snap.exists){ const r=snap.data(); if(r&&r.u&&r.u>(S.u||0)){ S=deserialize(JSON.parse(JSON.stringify(r))); this.saveLocal(); applyTheme(); render(); toast("Progress restored from your account."); } else if((S.u||0)>(r&&r.u||0)) this.push(); }
      else if(S.u) this.push();
      this.mode="account";
    }catch(e){ this.ref=null; this.mode="device"; }
    syncBadge();
  }
};
function syncBadge(){ const el=$("#sync"); if(!el) return; el.className="sync"+(Store.mode==="account"?" on":""); el.title=Store.mode==="account"?"Progress saves to your Claude account":"Progress saves in this browser"; el.lastChild.textContent=Store.mode==="account"?"Saved":"On this device"; }

/* ================= Derived ================= */
const doneDays=()=>Object.keys(S.done).map(Number);
const highest=()=>doneDays().length?Math.max(...doneDays()):0;
const curDay=()=>{ for(let i=1;i<=168;i++) if(!S.done[i]) return i; return 168; };
const unlocked=n=>n<=highest()+1;
const maxDay=()=>Math.max(1,Math.min(168,highest()+1));
// Last day actually completed — practice and the library stay within this
const learnedDay=()=>Math.max(1,highest());
const dayKey=(t=Date.now())=>{ const d=new Date(t); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const myName=()=>S.settings.name||"アレックス";
const fill=s=>s.replace(/\{me\}/g,myName());
function romMode(day){ const r=S.settings.romaji; if(r==="always") return "show"; if(r==="off") return "hide"; return (day||maxDay())<=28?"show":"tap"; }
function catAcc(c){ const v=S.stats.cat[c]; return v&&v[1]?v[0]/v[1]:null; }

/* ================= Audio (browser speech) ================= */
const TTS={ok:false,voice:null,checked:false,
  // Prefer the clearest, most natural Japanese voices first
  score(v){ const n=(v.name||"")+" "+(v.voiceURI||""); let sc=0;
    if(/natural|neural|enhanced|premium|siri/i.test(n)) sc+=50;
    if(/Nanami|Keita|Kyoko|O-?ren|Otoya|Hattori|Google/i.test(n)) sc+=30;
    if(/ja[-_]JP/i.test(v.lang)) sc+=10;
    if(/compact|eloquence/i.test(n)) sc-=40;
    return sc; },
  init(){ if(!("speechSynthesis" in window)){ this.checked=true; return; }
    const pick=()=>{ try{ const vs=speechSynthesis.getVoices().filter(v=>/^ja(-|_|$)/i.test(v.lang)); vs.sort((a,b)=>this.score(b)-this.score(a)); this.voice=vs[0]||null; this.ok=!!this.voice; this.checked=true; }catch(e){ this.ok=false; } };
    pick(); try{ speechSynthesis.addEventListener("voiceschanged",()=>{ const was=this.ok; pick(); if(was!==this.ok) refreshAudio(); }); }catch(e){} setTimeout(()=>{ pick(); refreshAudio(); },1200); },
  // Rate: single kana are spoken slowest so each sound is distinct; words and sentences at the learner speed
  rateFor(clean,slow){ const base=S.settings.rate||0.75; const kana=clean.length<=2;
    if(slow) return kana?0.45:0.5;
    return kana?Math.min(base,0.6):base; },
  speak(text,slow,onend){ if(!S.settings.audio||!this.ok) return false; try{ speechSynthesis.cancel();
      const clean=fill(E.surface(E.reading(text))).replace(/\s+/g,"");
      // A trailing 。 makes engines finish the sound cleanly instead of clipping it
      const say=clean.length<=2?clean+"。":clean;
      const u=new SpeechSynthesisUtterance(say); u.lang="ja-JP"; u.voice=this.voice; u.rate=this.rateFor(clean,slow); u.pitch=1; u.volume=1;
      if(onend){ u.onend=onend; u.onerror=onend; }
      // Small delay after cancel() avoids the first syllable being cut off in Chrome and Safari
      setTimeout(()=>{ try{ speechSynthesis.speak(u); }catch(e){} },60); return true; }catch(e){ return false; } },
  seq(lines,i=0,done){ if(i>=lines.length){ done&&done(); return; } if(!this.speak(lines[i],false,()=>setTimeout(()=>this.seq(lines,i+1,done),450))) done&&done(); }
};
function refreshAudio(){ document.querySelectorAll("[data-audio]").forEach(el=>{ const t=el.getAttribute("data-audio"); el.replaceWith(audioCtl(t,el.getAttribute("data-big")==="1")); }); }
function audioCtl(text,big){
  const wrap=h("span",{class:"audio","data-audio":text,"data-big":big?"1":"0"});
  if(!S.settings.audio){ wrap.append(h("span",{class:"noaudio"},"Audio is off in Settings")); return wrap; }
  if(!TTS.ok){ wrap.append(h("span",{class:"noaudio"},TTS.checked?"No Japanese voice on this device":"Checking audio…")); return wrap; }
  wrap.append(h("button",{class:"play"+(big?"":" sm"),"aria-label":"Play audio",onclick:e=>{e.stopPropagation();TTS.speak(text);}},svg(ICON.play)),
    h("button",{class:"play sm","style":"background:var(--paper-2);color:var(--ai)","aria-label":"Play slowly",title:"Slow",onclick:e=>{e.stopPropagation();TTS.speak(text,true);}},svg(ICON.slow)));
  return wrap;
}

/* ================= Japanese text rendering ================= */
function jpText(str,cls){ const el=h("span",{class:"jp"+(cls?" "+cls:"")}); const s=fill(str);
  if(S.settings.furi){ E.rubySegs(s).forEach(seg=>{ if(seg.r) el.append(h("ruby",null,seg.t,h("rt",null,seg.r))); else el.append(seg.t); }); } else el.append(E.surface(s));
  return el; }
function romLine(str,day,tiles){ const m=romMode(day); if(m==="hide") return null; const r=tiles?E.tileRomaji(tiles.map(fill)):E.romaji(fill(str));
  if(m==="show") return h("div",{class:"rom"},r);
  const el=h("button",{class:"rom",style:"text-decoration:underline dotted;text-underline-offset:3px",onclick:()=>{ el.textContent=r; el.style.textDecoration="none"; }},"Show romaji"); return el; }
const sentJP=it=>it.tiles.join(" ");
const sentJPdisp=it=>{ const t=it.tiles.join(""); return /[か]$/.test(t)?t+"。":/[。！？…]$/.test(t)?t:t+"。"; };

/* ================= Shell ================= */
let VIEW="today";
const app=$("#app");
function applyTheme(){ const t=S.settings.theme; if(t) document.documentElement.setAttribute("data-theme",t); else document.documentElement.removeAttribute("data-theme"); }
function toast(msg){ const t=h("div",{class:"toast",role:"status"},msg); document.body.append(t); setTimeout(()=>t.remove(),2800); }
const TABS=[["today","今","Today"],["path","道","Path"],["practice","練","Practice"],["progress","歩","Progress"],["library","書","Library"]];
function render(){
  const scrollY=window.scrollY;
  app.innerHTML="";
  const shell=h("div",{class:"shell"},
    h("header",{class:"top"},
      h("div",{class:"brand"},h("span",{class:"jp"},"日本語"),"NIHONGO"),
      h("div",{class:"sp"}),
      h("span",{class:"sync",id:"sync"},h("i"),"…"),
      h("button",{class:"iconbtn","aria-label":"Settings",onclick:openSettings},svg(ICON.gear))),
    h("main",{id:"main"}, VIEWS[VIEW]()),
  );
  const tabs=h("nav",{class:"tabs","aria-label":"Sections"},h("div",{class:"in"},TABS.map(([k,kj,l])=>h("button",{class:"tab","aria-current":VIEW===k?"page":null,onclick:()=>{ VIEW=k; render(); window.scrollTo(0,0); }},h("span",{class:"k"},kj),l))));
  app.append(shell,tabs); syncBadge();
  if(VIEW==="__keep") window.scrollTo(0,scrollY);
}
function go(v){ VIEW=v; render(); window.scrollTo(0,0); }

/* ================= TODAY ================= */
function greeting(){ const hr=new Date().getHours(); if(hr<10) return ["おはようございます","ohayou gozaimasu","Good morning"]; if(hr<17) return ["こんにちは","konnichiwa","Good afternoon"]; return ["こんばんは","konbanwa","Good evening"]; }
function last7(){ const out=[]; for(let i=6;i>=0;i--){ const k=dayKey(Date.now()-i*864e5); out.push({k,on:!!(S.act[k]&&(S.act[k].q||S.act[k].l)),today:i===0,d:new Date(Date.now()-i*864e5)}); } return out; }
function runLen(){ let n=0; for(let i=0;i<400;i++){ const k=dayKey(Date.now()-i*864e5); if(S.act[k]&&(S.act[k].q||S.act[k].l)) n++; else if(i>0) break; } return n; }
function TodayView(){
  const g=greeting(); const day=curDay(); const d=DAYS[day-1]; const allDone=Object.keys(S.done).length>=168;
  const mode=S.settings.mode; const sess=d.rv||d.cons?E.buildReview(day,mode,S):E.buildLesson(day,mode,S); const est=E.estimate(sess.steps);
  const due=E.dueKeys(S,maxDay()).length; const draft=S.draft&&S.draft.sess&&S.draft.sess.day===day?S.draft:null;
  const st=N.STAGES[d.stage-1]; const wk=N.WEEKS[d.week];
  const kindLbl=d.fin?"Final assessment":d.as?"Stage assessment":d.rv?"Weekly check":d.cons?"Consolidation":"Lesson";
  const l7=last7(); const studied=l7.filter(x=>x.on).length;
  return h("div",null,
    h("section",{class:"greet"},h("div",{class:"jp"},g[0]),h("span",{class:"rom"},g[1]+" — "+g[2].toLowerCase()+(S.settings.name?", "+S.settings.name:""))),
    h("section",{class:"card hero"},
      h("div",{class:"daynum","aria-hidden":"true"},String(day)),
      h("div",{class:"meta"},h("span",{class:"chip shu"},"Day "+day+" of 168"),h("span",{class:"chip"},"Stage "+d.stage+" · "+st.t),h("span",{class:"chip ai"},kindLbl)),
      h("h1",null,d.t),
      h("p",{class:"obj"},d.o),
      h("div",{class:"lbl",style:"margin-top:16px;margin-bottom:6px"},"Session length"),
      modeSeg(()=>render()),
      h("button",{class:"btn pri wide cta",onclick:()=>draft?resumeDraft():startDay(day)},allDone?"Practise the final assessment again":draft?"Resume — step "+(draft.idx+1)+" of "+draft.sess.steps.length:(Object.keys(S.done).length?"Continue learning":"Start your first lesson")),
      h("div",{class:"row",style:"justify-content:space-between;margin-top:10px"},h("span",{class:"small faint"},"≈ "+est+" min · "+sess.steps.length+" steps · Week "+d.week+": "+wk.t),
        draft?h("button",{class:"btn ghost",style:"min-height:32px;padding:0 8px;font-size:13px",onclick:()=>{ S.draft=null; Store.save(); render(); }},"Restart lesson"):null)
    ),
    h("section",{class:"sec grid2"},
      h("button",{class:"card mini",style:"text-align:left",onclick:()=>due?startPractice("due"):go("practice")},h("span",{class:"lbl"},"Reviews due"),h("b",null,String(due)),h("span",{class:"small muted"},due?"Tap to review now":"Nothing due — well done")),
      h("div",{class:"card mini"},h("span",{class:"lbl"},"This week"),h("b",null,studied+" / 7 days"),
        h("div",{class:"dots",style:"margin-top:4px"},l7.map(x=>h("i",{class:(x.on?"on ":"")+(x.today?"today":""),title:x.k},"MTWTFSS"[(x.d.getDay()+6)%7]))))
    ),
    h("section",{class:"sec"},
      h("div",{class:"prog-line"},h("span",null,"Course progress"),h("span",{class:"num"},Object.keys(S.done).length+" / 168 days")),
      h("div",{class:"bar"},h("i",{style:"width:"+(Object.keys(S.done).length/168*100).toFixed(1)+"%"})),
      runLen()>1?h("p",{class:"small faint",style:"margin-top:8px"},runLen()+" days in a row. Missing a day never resets your progress."):h("p",{class:"small faint",style:"margin-top:8px"},"Study when you can. Missing a day never resets your progress.")
    ),
    Object.keys(S.done).length===0?h("section",{class:"sec card"},h("h2",{style:"font-size:16px"},"How it works"),
      h("p",{class:"muted small",style:"margin-top:6px"},"Each day is one focused skill in five parts: Learn, Listen, Practice, Apply and Recall, followed by a short challenge. Your answers drive spaced review, so words you miss come back sooner and words you know come back less often."),
      h("p",{class:"muted small",style:"margin-top:8px"},"Audio uses your device's built-in Japanese voice (computer-generated, not recorded speakers). "+(TTS.ok?"A Japanese voice is available here.":"If none is installed, you'll read the text instead."))):null
  );
}
function modeSeg(after){ return h("div",{class:"seg",role:"group","aria-label":"Session length"},Object.entries(E.MODES).map(([k,m])=>h("button",{"aria-pressed":S.settings.mode===k?"true":"false",onclick:()=>{ S.settings.mode=k; Store.save(); after&&after(); }},m.l,h("small",null,m.min+" min")))); }

/* ================= PATH ================= */
let openWeeks=new Set();
function PathView(){
  const cur=curDay(); if(!openWeeks.size) openWeeks.add(DAYS[cur-1].week);
  return h("div",null,
    h("section",{class:"greet"},h("h1",{style:"font-size:24px"},"Learning path"),h("p",{class:"muted small",style:"margin-top:4px"},"24 weeks, six lines. Each station is a day; double rings are weekly checks. Tap a week to see its goals.")),
    N.STAGES.map(st=>h("section",{class:"stage",style:"--line:"+st.color},
      h("div",{class:"stage-h"},h("div",{class:"badge",style:"background:"+st.color},String(st.n)),h("div",null,h("div",{class:"lbl"},"Stage "+st.n+" · "+st.jp),h("h2",null,st.t))),
      st.weeks.map(w=>{ const W=N.WEEKS[w]; const open=openWeeks.has(w); const days=DAYS.slice((w-1)*7,w*7); const dn=days.filter(d=>S.done[d.n]).length;
        return h("div",{class:"week"},
          h("div",{class:"week-h",role:"button",tabindex:"0","aria-expanded":open?"true":"false",onclick:()=>{ open?openWeeks.delete(w):openWeeks.add(w); render(); },onkeydown:e=>{ if(e.key==="Enter") e.target.click(); }},
            h("span",{class:"lbl"},"Week "+w),h("b",null,W.t),h("span",{class:"small faint",style:"margin-left:auto"},dn+"/7")),
          open?h("div",{class:"outs"},h("b",{style:"font-size:12.5px"},"You'll be able to:"),h("ul",null,W.out.map(o=>h("li",null,o)))):null,
          open?days.map(d=>station(d,cur)):null);
      })))
  );
}
function station(d,cur){
  const done=!!S.done[d.n], isCur=d.n===cur, lock=!unlocked(d.n);
  return h("button",{class:"stn"+(d.rv?" xfer":"")+(done?" done":"")+(isCur?" cur":"")+(lock?" lock":""),onclick:()=>openDay(d.n)},
    h("span",{class:"dot"}),
    h("span",{class:"t"},h("b",null,d.t),h("span",null,done?"Done · "+Math.round((S.done[d.n].acc||0)*100)+"%":isCur?"Up next":lock?"Locked":"Available")),h("span",{class:"n"},"Day "+d.n));
}
function openDay(n){
  const d=DAYS[n-1]; const done=S.done[n]; const lock=!unlocked(n);
  const sess=d.rv||d.cons?E.buildReview(n,S.settings.mode,S):E.buildLesson(n,S.settings.mode,S);
  const its=d.items.map(k=>ITEMS[k]);
  const chips=its.filter(i=>i.type!=="s"&&i.type!=="n").map(i=>i.type==="g"?h("span",{class:"chip ai"},i.t):h("span",{class:"chip"},h("span",{class:"jp",style:"font-weight:700"},E.surface(i.jp)),i.type==="k"?" "+i.rom:i.en?" "+i.en[0]:""));
  const sens=its.filter(i=>i.type==="s");
  sheet(h("div",{class:"stack"},
    h("div",null,h("div",{class:"lbl"},"Day "+n+" · Week "+d.week+" · Stage "+d.stage),h("h2",{style:"margin-top:4px"},d.t)),
    h("p",null,h("b",null,"Objective: "),d.o),
    h("p",{class:"small muted"},h("b",null,"Builds on: "),E.prereq(d)),
    h("p",{class:"small muted"},"≈ "+E.estimate(sess.steps)+" min in "+E.MODES[S.settings.mode].l+" mode · "+sess.steps.length+" steps"),
    d.rv||d.cons?h("p",{class:"small muted"},d.fin?"Covers the whole course and builds your A1 profile.":d.as?"Covers the whole stage and reports weak areas by skill.":d.cons?"Draws on everything so far, weighted toward your weak spots.":"Mixed review of the last six days, reported by skill."):null,
    chips.length?h("div",null,h("div",{class:"lbl",style:"margin-bottom:6px"},"New content"),h("div",{class:"row",style:"gap:6px"},chips)):null,
    sens.length?h("div",null,h("div",{class:"lbl",style:"margin-bottom:6px"},"Example sentences"),sens.map(s=>h("div",{style:"padding:6px 0;border-top:1px solid var(--rule)"},jpText(sentJPdisp(s),""),h("div",{class:"small muted"},s.en[0])))):null,
    done?h("p",{class:"chip ok"},"Completed "+new Date(done.ts).toLocaleDateString()+" · "+Math.round(done.acc*100)+"%"):null,
    lock?h("div",{class:"note"},"Unlocks after Day "+(n-1)+". You can preview what's coming above."):null,
    h("button",{class:"btn pri wide",disabled:lock?true:null,onclick:()=>{ closeSheet(); startDay(n); }},done?"Do this day again":lock?"Locked":"Start Day "+n)
  ));
}

/* ================= PRACTICE ================= */
const PMODES=[["due","Due reviews","復","Items scheduled for review today."],["hira","Hiragana","あ","Recognition, sounds and writing."],["kata","Katakana","ア","Includes your confusing pairs first."],["vocab","Vocabulary","語","Due and weak words in mixed formats."],["listen","Listening","聞","Hear it, then pick the meaning."],["build","Sentence building","文","Put tiles in the right order."],["grammar","Grammar","法","Error spotting and sentence meaning."],["numbers","Numbers & time","数","Prices, dates, times and ages."],["speak","Speaking","話","Listen, repeat aloud, compare."],["mistakes","Mistake notebook","誤","Retry the things you've missed."]];
function PracticeView(){
  const md=highest();
  const avail=k=>{ try{ const s=E.buildPractice(k,S,{maxDay:md,n:8}); return s?s.steps.length:0; }catch(e){ return 0; } };
  const openMist=(S.mist||[]).filter(m=>!m.r);
  return h("div",null,
    h("section",{class:"greet"},h("h1",{style:"font-size:24px"},"Practice"),h("p",{class:"muted small",style:"margin-top:4px"},md?"Drills on what you've learned so far (Days 1–"+md+"). Nothing from lessons you haven't reached. Results feed your review schedule.":"Finish Day 1 to unlock practice. Drills only use what you've already learned.")),
    h("section",{class:"sec grid2"},PMODES.map(([k,t,kj,desc])=>{ const n=k==="mistakes"?openMist.length:avail(k); const off=k==="mistakes"?!(S.mist||[]).length:!n;
      return h("button",{class:"card",style:"text-align:left;display:flex;flex-direction:column;gap:6px"+(off?";opacity:.55":""),disabled:off?true:null,onclick:()=>k==="mistakes"?openNotebook():startPractice(k)},
        h("div",{class:"row",style:"justify-content:space-between"},h("span",{class:"jp",style:"font-size:26px;font-weight:700;color:var(--ai)"},kj),h("span",{class:"chip"+(k==="due"&&n?" shu":"")},k==="due"?n+" due":k==="mistakes"?n+" open":off?"Not yet":"Ready")),
        h("b",null,t),h("span",{class:"small muted"},off&&k==="due"?"Nothing due right now.":off&&k==="mistakes"?"No mistakes recorded yet.":off?"Unlocks as you progress.":desc)); }))
  );
}
function openNotebook(){
  const list=(S.mist||[]).slice().reverse();
  const open=list.filter(m=>!m.r);
  sheet(h("div",{class:"stack"},
    h("h2",null,"Mistake notebook"),
    h("p",{class:"small muted"},open.length+" open · "+(list.length-open.length)+" fixed. Retrying correctly marks an item as fixed."),
    open.length?h("button",{class:"btn pri wide",onclick:()=>{ closeSheet(); startPractice("mistakes"); }},"Retry open mistakes"):null,
    list.length?h("div",null,list.slice(0,60).map(m=>h("div",{style:"padding:10px 0;border-top:1px solid var(--rule)"},
      h("div",{class:"row",style:"justify-content:space-between"},h("b",{style:"font-size:14px;min-width:0;overflow-wrap:anywhere"},m.p),m.r?h("span",{class:"chip ok"},"Fixed"):h("span",{class:"chip shu"},"Open")),
      h("div",{class:"small"},h("span",{class:"faint"},"You: "),h("span",{class:"jp"},m.y||"—"),h("span",{class:"faint"}," · Correct: "),h("span",{class:"jp"},m.a)),
      m.x?h("div",{class:"small muted"},m.x):null))):h("div",{class:"empty"},"Nothing here yet. Missed answers will collect here with explanations.")
  ));
}

/* ================= PROGRESS ================= */
const CATS=[["hira","Hiragana"],["kata","Katakana"],["vocab","Vocabulary"],["kanji","Kanji"],["grammar","Grammar"],["numbers","Numbers"],["listen","Listening"]];
function compScores(){
  const out={}; N.COMP.forEach(c=>out[c.id]={sum:0,n:0,seen:0});
  Object.values(ITEMS).forEach(it=>{ if(!E.quizzable(it)) return; const d=DAYS[it.day-1]; let c=N.WEEKS[d.week].c;
    if(it.type==="k") c="read"; if(it.day<=23&&it.type==="v"&&it.ph) c="greet"; if(d.week===4&&it.day<=23) c="greet";
    const s=S.items[it.key]; out[c].n++; if(s&&s.n){ out[c].seen++; out[c].sum+=Math.min(1,E.level(s)/4)*(s.c/(s.c+s.w)); } });
  const L=S.stats.cat.listen; if(L&&L[1]>=3){ const n=Math.min(L[1],40); out.listen={n:40,seen:n,sum:(L[0]/L[1])*n}; }
  return out;
}
function compLevel(c){ if(!c.seen) return ["Not started","",0]; const v=c.sum/Math.max(c.seen,1); const cover=c.n?c.seen/c.n:0;
  const score=v*Math.min(1,cover*1.1);
  if(score>=0.7&&cover>=0.8) return ["Demonstrated","ok",score]; if(score>=0.45) return ["Developing","kin",score]; return ["Emerging","ai",score]; }
function ProgressView(){
  const items=Object.entries(S.items); const voc=items.filter(([k])=>k.startsWith("v:"));
  const vm=voc.filter(([,s])=>E.isMastered(s)).length; const kana=items.filter(([k])=>k.startsWith("k:")); const km=kana.filter(([,s])=>E.isMastered(s)).length;
  const days=Object.keys(S.act).filter(k=>S.act[k].q||S.act[k].l).length; const mins=Math.round((S.stats.ms||0)/60000);
  const acc=S.stats.q?S.stats.c/S.stats.q:null; const rp=S.stats.rp;
  const heat=[]; for(let i=83;i>=0;i--){ const k=dayKey(Date.now()-i*864e5); const a=S.act[k]; const v=a?(a.q||0)+(a.l||0)*10:0; heat.push(h("i",{class:v>=30?"l3":v>=12?"l2":v>0?"l1":"",title:k+(a?": "+(a.q||0)+" answers":"")})); }
  const cs=compScores();
  const cats=CATS.map(([c,l])=>[c,l,catAcc(c),(S.stats.cat[c]||[0,0])[1]]).filter(x=>x[3]>0);
  const strong=cats.filter(x=>x[3]>=8&&x[2]>=0.85).map(x=>x[1]); const weakC=cats.filter(x=>x[3]>=6&&x[2]<0.7).map(x=>x[1]);
  const weakItems=E.weakKeys(S,learnedDay(),5).map(k=>ITEMS[k]).filter(Boolean);
  const tests=Object.entries(S.tests).sort((a,b)=>b[0]-a[0]);
  return h("div",null,
    h("section",{class:"greet"},h("h1",{style:"font-size:24px"},"Progress"),h("p",{class:"muted small",style:"margin-top:4px"},"Everything here comes from your own answers.")),
    h("section",{class:"sec grid3"},
      stat(Object.keys(S.done).length,"lessons done"),stat(days,"days studied"),stat(mins,"minutes"),
      stat(voc.length,"words met"),stat(vm,"words strong"),stat(km+"/"+kana.length,"kana strong")),
    h("section",{class:"sec card"},h("div",{class:"lbl",style:"margin-bottom:10px"},"Accuracy by skill"),
      cats.length?h("div",{class:"cats"},cats.map(([c,l,a,t])=>catRow(l,a,t+" answers"))):h("div",{class:"empty"},"Complete your first lesson to see skill accuracy."),
      (rp.rec[0]+rp.rec[1])?h("div",{class:"row small muted",style:"margin-top:12px;gap:16px"},
        h("span",null,"Recognition: ",h("b",null,pct(rp.rec[0]/(rp.rec[0]+rp.rec[1])))),
        h("span",null,"Recall from memory: ",h("b",null,(rp.prod[0]+rp.prod[1])?pct(rp.prod[0]/(rp.prod[0]+rp.prod[1])):"—")),
        h("span",null,"Overall: ",h("b",null,acc!=null?pct(acc):"—"))):null),
    (strong.length||weakC.length||weakItems.length)?h("section",{class:"sec grid2"},
      h("div",{class:"card"},h("div",{class:"lbl"},"Strengths"),strong.length?h("p",{style:"margin-top:6px"},strong.join(", ")):h("p",{class:"small muted",style:"margin-top:6px"},"Keep going — strengths show up after a few sessions.")),
      h("div",{class:"card"},h("div",{class:"lbl"},"Needs work"),weakC.length?h("p",{style:"margin-top:6px"},weakC.join(", ")):null,
        weakItems.length?h("div",{class:"row",style:"gap:6px;margin-top:8px"},weakItems.map(it=>h("span",{class:"chip shu"},h("span",{class:"jp"},it.type==="s"?it.tiles.join(""):it.type==="g"?it.t:E.surface(it.jp||""))))):null,
        weakItems.length?h("button",{class:"btn wide",style:"margin-top:10px",onclick:()=>startPractice("vocab")},"Practise weak items"):null)):null,
    h("section",{class:"sec card"},h("div",{class:"lbl",style:"margin-bottom:10px"},"Consistency · last 12 weeks"),h("div",{class:"heat"},heat)),
    h("section",{class:"sec card"},h("div",{class:"row",style:"justify-content:space-between;margin-bottom:4px"},h("div",{class:"lbl"},"A1 can-do profile"),h("span",{class:"small faint"},"From demonstrated performance")),
      N.COMP.map(c=>{ const [l,cl,sc]=compLevel(cs[c.id]); return h("div",{class:"comp"},h("div",{class:"t"},h("b",null,c.t),h("p",null,c.d),h("div",{class:"bar",style:"margin-top:6px"},h("i",{style:"width:"+Math.round(sc*100)+"%"}))),h("span",{class:"chip "+cl},l)); }),
      h("p",{class:"small faint",style:"margin-top:10px"},"“Demonstrated” needs both coverage and accurate recall. Finishing days alone never marks a skill as achieved.")),
    tests.length?h("section",{class:"sec card"},h("div",{class:"lbl",style:"margin-bottom:8px"},"Check and assessment results"),
      tests.map(([d,t])=>h("div",{style:"padding:8px 0;border-top:1px solid var(--rule)"},h("div",{class:"row",style:"justify-content:space-between"},h("b",{style:"font-size:14px"},"Day "+d+" · "+DAYS[d-1].t),h("span",{class:"chip"},pct(t.acc))),
        t.weak&&t.weak.length?h("div",{class:"small muted"},"Weak: "+t.weak.join(", ")):h("div",{class:"small muted"},"No weak areas flagged.")))):null
  );
}
const pct=v=>v==null||isNaN(v)?"—":Math.round(v*100)+"%";
function stat(v,l){ return h("div",{class:"stat"},h("b",null,String(v)),h("span",null,l)); }
function catRow(l,a,sub){ return h("div",{class:"cat"},h("span",null,l,h("br"),h("span",{class:"small faint"},sub||"")),h("div",{class:"bar"},h("i",{class:a<0.6?"bad":a<0.8?"mid":"",style:"width:"+Math.round((a||0)*100)+"%"})),h("b",{class:"num",style:"text-align:right"},pct(a))); }

/* ================= LIBRARY ================= */
let LIB={tab:"kana",q:"",ks:"hira"};
function LibraryView(){
  const md=learnedDay();
  const tabs=[["kana","Kana"],["words","Words"],["grammar","Grammar"],["sent","Sentences"],["phr","Expressions"],["kanji","Kanji"],["culture","Culture"]];
  const body=h("div",{class:"sec"});
  if(LIB.tab==="kana") body.append(kanaChart(md));
  else{
    const inp=h("input",{class:"search",id:"lib-q",type:"search",placeholder:"Search Japanese, romaji or English",value:LIB.q,oninput:e=>{ LIB.q=e.target.value; const r=$("#lib-r"); r.replaceWith(libList(md)); }});
    body.append(inp,libList(md));
  }
  return h("div",null,
    h("section",{class:"greet"},h("h1",{style:"font-size:24px"},"Library"),h("p",{class:"muted small",style:"margin-top:4px"},"Everything you've learned (up to Day "+md+"). Tap any entry for audio, examples and quick practice.")),
    h("div",{class:"scroll-x",style:"margin-top:14px"},h("div",{class:"seg",style:"min-width:520px"},tabs.map(([k,l])=>h("button",{"aria-pressed":LIB.tab===k?"true":"false",onclick:()=>{ LIB.tab=k; render(); }},l)))),
    body);
}
function libList(md){
  const q=LIB.q.trim().toLowerCase(); const match=(it)=>{ if(!q) return true; const hay=[E.surface(it.jp||""),E.reading(it.jp||""),E.romOf(it)||"",(it.en||[]).join(" "),it.t||"",(it.tiles||[]).join("")].join(" ").toLowerCase(); return hay.includes(q)||E.normJ(hay).includes(E.normJ(q)); };
  const wrap=h("div",{id:"lib-r",class:"card",style:"margin-top:12px;padding:6px 14px"});
  let list=[];
  if(LIB.tab==="words") list=Object.values(ITEMS).filter(it=>it.type==="v"&&!it.ph&&it.day<=md);
  if(LIB.tab==="phr") list=Object.values(ITEMS).filter(it=>it.type==="v"&&it.ph&&it.day<=md).concat(Object.values(ITEMS).filter(it=>it.type==="v"&&!it.ph&&it.day<=md&&/ます$|です|ください|しまして|ございます|なさい|さま/.test(E.surface(it.jp))&&it.jp.length>4));
  if(LIB.tab==="grammar") list=Object.values(ITEMS).filter(it=>it.type==="g"&&it.day<=md);
  if(LIB.tab==="sent") list=Object.values(ITEMS).filter(it=>it.type==="s"&&it.day<=md);
  if(LIB.tab==="kanji") list=Object.values(ITEMS).filter(it=>it.type==="j"&&it.day<=md);
  if(LIB.tab==="culture"){ const notes=[]; DAYS.slice(0,md).forEach(d=>(d.info||[]).forEach((x,i)=>notes.push({d,x}))); const f=notes.filter(n=>!q||(n.x[0]+n.x[1]).toLowerCase().includes(q));
    if(!f.length) wrap.append(h("div",{class:"empty",style:"border:0"},"No notes yet."));
    f.forEach(n=>wrap.append(h("div",{style:"padding:12px 0;border-top:1px solid var(--rule)"},h("div",{class:"lbl"},"Day "+n.d.n),h("b",null,n.x[0]),h("p",{class:"small muted"},n.x[1])))); return wrap; }
  list=list.filter(match);
  if(!list.length) wrap.append(h("div",{class:"empty",style:"border:0"},q?"No matches.":"Nothing here yet — keep going."));
  list.slice(0,300).forEach(it=>{ const s=S.items[it.key]; const lv=E.level(s);
    wrap.append(h("button",{class:"lrow",onclick:()=>openItem(it.key)},
      it.type==="g"?h("span",{class:"en",style:"color:var(--ink);font-weight:700"},it.t):it.type==="s"?h("span",{class:"jp",style:"flex:1"},jpText(sentJPdisp(it))):h("span",{class:"jp"},jpText(it.jp)),
      it.type==="s"||it.type==="g"?null:h("span",{class:"en"},(it.en||[]).slice(0,2).join(", ")),
      it.type==="s"?null:h("span",{class:"em"},it.emoji||""),
      h("span",{class:"chip"+(lv>=4?" ok":lv>=2?" kin":""),style:"font-size:11px"},E.LEVELS[lv]))); });
  return wrap;
}
function kanaChart(md){
  const box=h("div",null);
  const seg=h("div",{class:"seg",style:"margin-bottom:12px"},[["hira","Hiragana"],["kata","Katakana"],["daku","Voiced"],["yoon","Combined"]].map(([k,l])=>h("button",{"aria-pressed":LIB.ks===k?"true":"false",onclick:()=>{ LIB.ks=k; render(); }},l)));
  box.append(seg);
  let cells=[];
  const gojuon=["あいうえお","かきくけこ","さしすせそ","たちつてと","なにぬねの","はひふへほ","まみむめも","や_ゆ_よ","らりるれろ","わ___を","ん____"];
  if(LIB.ks==="hira"||LIB.ks==="kata") gojuon.forEach(r=>[...r].forEach(c=>cells.push(c==="_"?null:(LIB.ks==="kata"?E.toKata(c):c))));
  if(LIB.ks==="daku") N.DAKU.forEach(([c])=>cells.push(c));
  if(LIB.ks==="yoon"){ const cols=[]; N.YOON.forEach(([c])=>cells.push(c)); cells=cells.reduce((a,c,i)=>{ a.push(c); if(i%3===2){ a.push(null); a.push(null);} return a; },[]); }
  const g=h("div",{class:"kgrid"});
  cells.forEach(c=>{ if(!c){ g.append(h("div")); return; }
    const it=ITEMS["k:"+c]||ITEMS["k:"+E.toKata(c)]; const s=it?S.items[it.key]:null; const lv=E.level(s); const intro=it&&it.day<=md;
    g.append(h("button",{class:"kcell"+(intro?" m"+lv:" dim"),onclick:()=>{ TTS.speak(c); if(it) openItem(it.key); },title:intro?"":"Introduced later"},h("span",{class:"jp"},c),h("span",{class:"rom"},E.kanaRom(c)||"")));
  });
  box.append(g, h("p",{class:"small faint",style:"margin-top:10px"},"Shading shows how well you know each character. Faded cells are introduced later; you can still tap to hear them."));
  return box;
}
function openItem(key){
  const it=ITEMS[key]; if(!it) return; const s=S.items[key]; const md=learnedDay();
  const examples=Object.values(ITEMS).filter(x=>x.type==="s"&&x.day<=Math.max(md,it.day)&&(it.type==="g"?x.g===it.gid:x.tiles.some(t=>E.surface(t).replace(/[、。]/g,"")===E.surface(it.jp||"#"))));
  const body=h("div",{class:"stack"});
  if(it.type==="g"){ body.append(h("div",{class:"lbl"},"Grammar · Day "+it.day),h("h2",null,it.t),h("p",null,it.s),grammarExample(it),h("p",{class:"small muted"},h("b",null,"How it works: "),it.how),h("p",{class:"small muted"},it.more)); }
  else if(it.type==="s"){ body.append(h("div",{class:"lbl"},"Sentence · Day "+it.day),h("div",{class:"prompt",style:"padding:6px 0"},h("div",{class:"jpl"},jpText(sentJPdisp(it))),romLine("",md,it.tiles)),h("p",{style:"text-align:center"},it.en[0]),h("div",{style:"text-align:center"},audioCtl(sentJP(it),false)),glossRow(it.tiles)); }
  else { body.append(h("div",{class:"lbl"},(it.type==="k"?(it.kata?"Katakana":"Hiragana"):it.type==="j"?"Kanji":"Word")+" · Day "+it.day),
    h("div",{style:"text-align:center"},it.emoji?h("div",{style:"font-size:40px"},it.emoji):null,h("div",{class:"jp",style:"font-size:"+(it.type==="v"?"36":"72")+"px;font-weight:700;line-height:1.4"},jpText(it.jp)),h("div",{class:"rom"},it.type==="k"?it.rom:it.type==="j"?it.readings:E.romOf(it)),
      it.en?h("p",{style:"margin-top:6px;font-size:17px"},it.en.join(" · ")):null,h("div",{style:"margin-top:10px"},audioCtl(it.type==="j"?E.reading(it.ex):E.reading(it.jp),false))),
    it.mn?h("div",{class:"note"},it.mn):null,it.note?h("div",{class:"note"},it.note):null,it.type==="j"?h("div",{class:"gex"},jpText(it.ex),h("div",{class:"small muted"},it.exm)):null); }
  if(examples.length) body.append(h("div",null,h("div",{class:"lbl",style:"margin-bottom:6px"},"Examples"),examples.slice(0,4).map(x=>h("div",{style:"padding:8px 0;border-top:1px solid var(--rule)"},jpText(sentJPdisp(x)),h("div",{class:"small muted"},x.en[0])))));
  body.append(h("div",{class:"row small muted"},h("span",null,"Status: ",h("b",null,E.LEVELS[E.level(s)])),s&&s.n?h("span",null,s.c+" right · "+s.w+" missed"):null,s&&s.n&&s.due?h("span",null,"Next review: "+(s.due<=Date.now()?"now":new Date(s.due).toLocaleDateString())):null));
  if(it.day<=md) body.append(h("button",{class:"btn ai wide",onclick:()=>{ closeSheet(); const sess=E.buildPractice("item",S,{key,maxDay:md}); if(sess) startSession(sess); }},"Quick practice"));
  else body.append(h("div",{class:"note"},"Introduced on Day "+it.day+"."));
  sheet(body);
}

/* ================= Settings ================= */
function openSettings(){
  const st=S.settings;
  const sel=(id,label,val,opts,on)=>h("div",{class:"form"},h("label",{for:id},label),h("select",{id,onchange:e=>{ on(e.target.value); Store.save(); }},opts.map(([v,l])=>h("option",{value:v,selected:String(val)===String(v)?true:null},l))));
  const txt=h("textarea",{id:"backup-txt",readonly:true,"aria-label":"Backup data"});
  const imp=h("textarea",{id:"import-txt",placeholder:"Paste a backup here","aria-label":"Paste backup"});
  const resetBox=h("div",{class:"note",hidden:true},h("p",null,"This erases all progress on this device and in your account. It can't be undone."),h("div",{class:"row",style:"margin-top:8px"},h("button",{class:"btn pri",onclick:()=>{ const keep=S.settings; S=DEF(); S.settings=keep; Store.save(); Store.push(); closeSheet(); render(); toast("Progress reset."); }},"Erase everything"),h("button",{class:"btn ghost",onclick:()=>resetBox.hidden=true},"Cancel")));
  sheet(h("div",{class:"stack"},
    h("h2",null,"Settings"),
    h("div",null,h("div",{class:"lbl",style:"margin-bottom:6px"},"Default session length"),modeSeg(()=>{ closeSheet(); render(); openSettings(); })),
    h("div",{class:"form"},h("label",{for:"set-name"},"Your name in katakana (used in dialogues)"),h("input",{type:"text",id:"set-name",value:st.name,placeholder:"e.g. ダニエル, マリア, アレックス",oninput:e=>{ st.name=e.target.value.trim(); Store.save(); }}),h("span",{class:"small faint"},"Tip: type romaji in any answer box to get kana. Here, use your phone's Japanese keyboard or copy from a lesson.")),
    sel("set-rom","Romaji",st.romaji,[["auto","Automatic (shown to Day 28, then tap to reveal)"],["always","Always show"],["off","Hide"]],v=>st.romaji=v),
    sel("set-furi","Furigana over kanji",st.furi?"1":"0",[["1","Show"],["0","Hide"]],v=>st.furi=v==="1"),
    sel("set-audio","Audio",st.audio?"1":"0",[["1","On"],["0","Off"]],v=>{ st.audio=v==="1"; }),
    sel("set-rate","Normal speech speed",st.rate,[["0.65","Slower"],["0.75","Learner (default)"],["0.9","Closer to natural"]],v=>{ st.rate=+v; TTS.speak("こんにちは"); }),
    sel("set-theme","Appearance",st.theme,[["","Match device"],["light","Light"],["dark","Dark"]],v=>{ st.theme=v; applyTheme(); }),
    h("p",{class:"small muted"},TTS.ok?"Audio uses your device's Japanese voice ("+TTS.voice.name+"). It's synthesized, not a recorded native speaker.":"No Japanese text-to-speech voice was found on this device, so listening steps show the text instead. Installing a Japanese voice in your system settings enables audio."),
    h("div",{class:"card",style:"background:var(--paper-2)"},h("div",{class:"lbl"},"Saving"),
      h("p",{class:"small",style:"margin-top:6px"},Store.mode==="account"?"Your progress is saved privately to your Claude account (only you can read it) and in this browser.":"Your progress is saved in this browser. Signed-in viewers also get private account sync; this view doesn't have it, so keep a backup."),
      h("div",{class:"row",style:"margin-top:10px"},
        h("button",{class:"btn",onclick:async()=>{ const data=JSON.stringify(serialize(S)); txt.value=data; txt.hidden=false; try{ const dl=window.claude&&await window.claude.use("downloads"); if(dl){ await dl.save({filename:"nihongo-backup-"+dayKey()+".json",data}); toast("Backup ready to save."); return; } }catch(e){} if(!window.claude){ try{ const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([data],{type:"application/json"})); a.download="nihongo-backup-"+dayKey()+".json"; document.body.append(a); a.click(); a.remove(); toast("Backup downloaded."); return; }catch(e){} } try{ await navigator.clipboard.writeText(data); toast("Backup copied to clipboard."); }catch(e){ txt.select(); toast("Select and copy the text below."); } }},"Export backup"),
        h("button",{class:"btn",onclick:()=>{ imp.hidden=!imp.hidden; impBtn.hidden=imp.hidden; fileIn.hidden=imp.hidden; }},"Import backup")),
      (txt.hidden=true,txt), (imp.hidden=true,imp)),
    h("div",null,h("button",{class:"btn ghost",style:"color:var(--shu)",onclick:()=>resetBox.hidden=false},"Reset all progress"),resetBox)
  ));
  var fileIn=h("input",{type:"file",accept:".json,application/json",hidden:true,onchange:e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ imp.value=r.result; }; r.readAsText(f); }});
  var impBtn=h("button",{class:"btn ai",hidden:true,onclick:()=>{ try{ const o=JSON.parse(imp.value); if(!o||!o.done||!o.settings) throw 0; S=deserialize(o); S.u=Date.now(); Store.save(); applyTheme(); closeSheet(); render(); toast("Backup restored."); }catch(e){ toast("That doesn't look like a NIHONGO backup. Paste the full exported text."); } }},"Restore from backup");
  imp.after(fileIn,impBtn);
}

/* ================= Sheets ================= */
function sheet(content){ closeSheet(); const sc=h("div",{class:"scrim",id:"scrim",onclick:e=>{ if(e.target.id==="scrim") closeSheet(); }},h("div",{class:"sheet",role:"dialog","aria-modal":"true"},h("div",{class:"grab"}),
  h("button",{class:"iconbtn",style:"float:right;margin:-10px -8px 0 0","aria-label":"Close",onclick:closeSheet},svg(ICON.x)),content)); document.body.append(sc); const f=sc.querySelector("button,input,select"); }
function closeSheet(){ const s=$("#scrim"); if(s) s.remove(); }
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&$("#scrim")) closeSheet(); });

/* ================= Player ================= */
let P=null;
const PH={learn:["Learn","var(--ai)"],listen:["Listen","var(--fuji)"],practice:["Practice","var(--matcha)"],apply:["Apply","var(--kin)"],recall:["Recall","var(--nezumi)"],challenge:["Challenge","var(--shu)"]};
function startDay(n){ const d=DAYS[n-1]; const sess=d.rv||d.cons?E.buildReview(n,S.settings.mode,S):E.buildLesson(n,S.settings.mode,S); startSession(sess); }
function startPractice(k){ const s=E.buildPractice(k,S,{maxDay:highest(),n:k==="due"?15:10}); if(!s){ toast("Nothing to practise here yet."); return; } startSession(s); }
function startSession(sess){ P={sess,idx:0,ans:{},ms:0,tick:Date.now(),remed:false,retried:[],sset:new Set(),first:{}}; persistDraft(); openPlayer(); }
function resumeDraft(){ const d=S.draft; P={sess:d.sess,idx:d.idx,ans:d.ans||{},ms:d.ms||0,tick:Date.now(),remed:!!d.remed,retried:d.retried||[],sset:new Set(d.sset||[]),first:d.first||{}}; openPlayer(); }
function persistDraft(){ if(!P) return; if(P.sess.kind==="practice"){ return; } S.draft={sess:P.sess,idx:P.idx,ans:P.ans,ms:P.ms,remed:P.remed,retried:P.retried,sset:[...P.sset],first:P.first}; Store.save(); }
function tick(){ const now=Date.now(); P.ms+=Math.min(now-P.tick,60000); P.tick=now; }
function openPlayer(){ let pl=$("#player"); if(!pl){ pl=h("div",{class:"player",id:"player",role:"dialog","aria-label":"Lesson"}); document.body.append(pl); document.body.style.overflow="hidden"; } renderStep(); }
function closePlayer(){ const pl=$("#player"); if(pl) pl.remove(); document.body.style.overflow=""; try{ speechSynthesis.cancel(); }catch(e){} if(P&&P.sess.kind!=="practice") persistDraft(); P=null; render(); }
function curStep(){ return P.sess.steps[P.idx]; }
function lessonDay(){ return P.sess.day||learnedDay(); }

function renderStep(){
  const pl=$("#player"); if(!pl||!P) return; pl.innerHTML="";
  if(P.idx>=P.sess.steps.length){ return finish(); }
  const st=curStep(); const a=P.ans[P.idx];
  // progress segmented by phase
  const phases=[]; P.sess.steps.forEach((s,i)=>{ const p=s.phase||"learn"; let g=phases[phases.length-1]; if(!g||g.p!==p){ g={p,n:0,done:0}; phases.push(g); } g.n++; if(i<P.idx||(i===P.idx&&a)) g.done++; });
  const top=h("div",{class:"p-top"},
    h("button",{class:"iconbtn","aria-label":"Close lesson",onclick:()=>{ tick(); closePlayer(); }},svg(ICON.x)),
    h("div",{class:"p-prog",role:"progressbar","aria-valuemin":"0","aria-valuemax":String(P.sess.steps.length),"aria-valuenow":String(P.idx)},phases.map(g=>h("i",{style:"flex:"+g.n+";--c:"+PH[g.p][1]},h("b",{style:"width:"+(g.done/g.n*100)+"%"})))),
    h("button",{class:"iconbtn","aria-label":"Previous step",disabled:P.idx===0?true:null,style:P.idx===0?"opacity:.3":"",onclick:()=>{ if(P.idx>0){ P.idx--; renderStep(); } }},svg(ICON.back)));
  const ph=PH[st.phase||"learn"];
  const meta=h("div",{class:"p-phase"},h("b",{style:"color:"+ph[1]},ph[0]),h("span",{class:"num"},(P.idx+1)+" / "+P.sess.steps.length));
  const body=h("div",{class:"p-body",id:"pbody"}); const foot=h("div",{class:"p-foot",id:"pfoot"});
  pl.append(top,meta,body,foot);
  const R=STEP[st.type]; if(!R){ body.append(h("div",{class:"empty"},"Unknown step")); foot.append(nextBtn()); return; }
  R(st,body,foot,a);
  body.scrollTop=0;
}
function nextBtn(label,cls){ return h("button",{class:"btn wide "+(cls||"pri"),style:"min-height:52px;font-size:16px",onclick:advance,id:"nextbtn"},label||"Continue"); }
function advance(){ tick(); if(!P.ans[P.idx]) P.ans[P.idx]={done:1,ok:null}; P.idx++; persistDraft(); renderStep(); }
function answered(){ return !!P.ans[P.idx]; }

/* grading + feedback */
function record(st, ok, info={}){
  if(P.ans[P.idx]) return; tick();
  P.ans[P.idx]={done:1,ok,val:info.val==null?null:info.val};
  const key=st.key; const it=ITEMS[key];
  const cat=st.cat||"vocab"; const C=S.stats.cat; C[cat]=C[cat]||[0,0]; C[cat][1]++; if(ok) C[cat][0]++;
  const rp=S.stats.rp[st.kind==="prod"?"prod":"rec"]; rp[ok?0:1]++;
  S.stats.q++; if(ok) S.stats.c++;
  const dk=dayKey(); const A=S.act[dk]=S.act[dk]||{q:0,c:0,ms:0,l:0}; A.q++; if(ok) A.c++;
  if(key && it){ E.grade(S,key,ok,st.kind||"rec",info.q,P.sset); if(st.g && !ok) E.grade(S,"g:"+st.g,false,"rec"); }
  if(st.keys) st.keys.forEach(k=>E.grade(S,k,ok,"rec",null,P.sset));
  if(key && !P.first[key]) P.first[key]=ok?1:-1;
  if(!ok && key){
    S.mist.push({k:key,p:info.prompt||promptText(st),y:info.val==null?"":String(info.val),a:info.correct||"",x:info.why||st.exp||"",ts:Date.now(),d:P.sess.day||null,r:false});
    if(S.mist.length>160) S.mist=S.mist.slice(-160);
    // a second chance later in this session
    if(!P.retried.includes(key) && it && P.sess.steps.length<160){ const q=E.recQ(it,lessonDay(),S)||null; if(q){ q.phase=st.phase==="learn"?"practice":st.phase; q.retry=1; const at=Math.min(P.sess.steps.length,P.idx+3); P.sess.steps.splice(at,0,q); P.retried.push(key); } }
  } else if(ok && key){ (S.mist||[]).forEach(m=>{ if(m.k===key&&!m.r&&(st.retry||P.sess.pk==="mistakes"||st.rv)) m.r=true; }); }
  persistDraft();
}
function promptText(st){ const p=st.prompt||{}; return p.big||p.en||(p.tiles?p.tiles.join(" "):"")||E.surface(p.jp||"")||p.scene||(p.audio?"(listening) "+p.audio:"")||st.type; }
function feedback(foot, ok, title, text, extra){
  const fb=h("div",{class:"fb "+(ok===true?"ok":ok===false?"bad":"info"),role:"status"},h("h3",null,ok===true?"✓ ":ok===false?"✕ ":"",title),text?h("p",null,text):null,extra||null);
  foot.innerHTML=""; foot.append(fb,nextBtn(ok===false?"Got it":"Continue")); const nb=$("#nextbtn"); if(nb) nb.focus({preventScroll:true});
}
function whyBtn(st){ const g=st.g; if(!g||!N.GRAMMAR[g]) return null; return h("div",{class:"row"},h("button",{class:"btn ghost",style:"min-height:34px;padding:0 10px;font-size:13px;color:var(--ai)",onclick:()=>openItem("g:"+g)},"Why? Explain the grammar")); }
const PRAISE=["Correct!","Nice!","That's it!","正解！ Correct","Well done!"];

/* ================= Step renderers ================= */
const STEP={};
STEP.intro=(st,b,f)=>{
  const s=P.sess; const d=s.day?DAYS[s.day-1]:null;
  if(!d){ b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Practice"),h("h2",{style:"margin-top:6px"},"Focused practice"),h("p",{class:"muted"},s.steps.length+" questions. Answers update your review schedule."))); f.append(nextBtn("Start")); return; }
  const its=d.items.map(k=>ITEMS[k]);
  const newW=its.filter(i=>i.type==="v"||i.type==="k"||i.type==="j");
  b.append(h("div",{class:"tcard"},
    h("div",{class:"lbl"},"Day "+d.n+" · "+N.STAGES[d.stage-1].t),
    h("h2",{style:"margin-top:6px;font-size:24px"},d.t),
    h("p",{style:"margin-top:10px"},h("b",null,"Today you'll: "),d.o),
    h("p",{class:"small muted",style:"margin-top:8px"},h("b",null,"Builds on: "),E.prereq(d)),
    newW.length?h("div",{class:"row",style:"gap:6px;margin-top:12px"},newW.slice(0,14).map(i=>h("span",{class:"chip"},h("span",{class:"jp",style:"font-weight:700"},E.surface(i.jp))))):null,
    d.rv||d.cons?h("p",{class:"small muted",style:"margin-top:10px"},"No new material today. You'll get a result for each skill at the end so you know exactly what to work on."):null,
    h("div",{class:"row",style:"gap:6px;margin-top:14px"},["learn","listen","practice","apply","recall","challenge"].filter(p=>s.steps.some(x=>x.phase===p)).map(p=>h("span",{class:"chip",style:"color:"+PH[p][1]},PH[p][0]))),
    h("p",{class:"small faint",style:"margin-top:10px"},"≈ "+E.estimate(s.steps)+" min · "+E.MODES[s.mode]?.l+" mode. Take as long as you like."),
  ));
  f.append(nextBtn("Begin"));
};
STEP.info=(st,b,f)=>{ const d=DAYS[P.sess.day-1]; const x=d.info[st.i]; b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Good to know"),h("h2",{style:"margin-top:6px"},x[0]),h("p",{style:"margin-top:10px;font-size:16px"},x[1]))); f.append(nextBtn()); };
STEP.teachK=(st,b,f)=>{ const it=ITEMS[st.key];
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"New "+(it.kata?"katakana":"hiragana")),
    h("div",{class:"genko",style:"margin-top:12px"},h("span",{class:"jp"},it.jp)),
    h("div",{style:"font-size:26px;font-weight:700;font-family:var(--f-mono)"},it.rom),
    h("div",{style:"margin:12px 0"},audioCtl(it.jp,true)),
    it.mn?h("p",{class:"muted"},it.mn):null));
  f.append(nextBtn()); markSeen(st.key); };
STEP.teachKG=(st,b,f)=>{ const its=st.keys.map(k=>ITEMS[k]);
  const g=h("div",{class:"kgrid",style:"margin-top:12px"},its.map(it=>h("button",{class:"kcell",onclick:()=>TTS.speak(it.jp)},h("span",{class:"jp"},it.jp),h("span",{class:"rom"},it.rom))));
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"New characters"),h("p",{class:"muted small",style:"margin-top:4px"},TTS.ok?"Tap each one to hear it, and say it aloud.":"Read each one aloud."),g,
    its.some(i=>i.mn)?h("p",{class:"small muted",style:"margin-top:12px"},its.filter(i=>i.mn&&!/^Katakana partner/.test(i.mn)).slice(0,2).map(i=>i.jp+": "+i.mn).join(" ")):null));
  f.append(nextBtn()); st.keys.forEach(markSeen); };
STEP.teachV=(st,b,f,a)=>{ const it=ITEMS[st.key]; const day=lessonDay(); let shown=!!a;
  const ex=Object.values(ITEMS).find(x=>x.type==="s"&&x.day<=Math.max(day,it.day)+3&&x.day>=it.day&&x.tiles.some(t=>E.surface(t).replace(/[、。]/g,"")===E.surface(it.jp)));
  const back=h("div",{class:"reveal",hidden:!shown},
    h("div",{style:"font-size:20px;font-weight:700"},it.en.join(" · ")),
    it.note?h("div",{class:"note"},it.note):null,
    ex?h("div",{class:"gex"},h("div",{class:"lbl",style:"margin-bottom:4px"},"Example"),jpText(sentJPdisp(ex)),h("div",{class:"small muted"},ex.en[0])):null);
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},it.ph?"New expression":"New word"),
    it.emoji?h("div",{style:"font-size:44px;margin-top:8px"},it.emoji):null,
    h("div",{class:"jp",style:"font-size:clamp(30px,9vw,42px);font-weight:700;line-height:1.4;margin-top:6px"},jpText(it.jp)),
    it.ph||romMode(day)!=="hide"?h("div",{class:"rom",style:"font-size:15px"},E.romOf(it)):null,
    h("div",{style:"margin-top:12px"},audioCtl(E.reading(it.jp),true)),back));
  const reveal=h("button",{class:"btn ai wide",style:"min-height:52px",onclick:()=>{ back.hidden=false; f.innerHTML=""; f.append(nextBtn()); P.ans[P.idx]={done:1,ok:null}; }},"Reveal meaning");
  f.append(shown?nextBtn():reveal); markSeen(st.key); };
STEP.teachS=(st,b,f)=>{ const it=ITEMS[st.key]; const day=lessonDay();
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"Example sentence"),
    h("div",{class:"jpl jp",style:"font-size:clamp(24px,7vw,32px);font-weight:700;line-height:1.6;margin-top:10px"},jpText(sentJPdisp(it))),
    romLine("",day,it.tiles),
    h("p",{style:"margin-top:10px;font-size:17px"},it.en[0]),
    h("div",{style:"margin-top:12px"},audioCtl(sentJP(it),true)),
    glossRow(it.tiles),
    it.g?h("p",{class:"small muted",style:"margin-top:12px"},N.GRAMMAR[it.g].t):null));
  f.append(nextBtn()); markSeen(st.key); };
function glossRow(tiles){ return h("div",{class:"gloss"},tiles.map(t=>{ const g=E.gloss(fill(t)); return h("span",null,jpText(t.replace(/[、。]$/,"")),g?h("small",null,g):null); })); }
function grammarExample(G){ const tiles=G.ex[0].split(" "); return h("div",{class:"gex"},h("div",{class:"jp",style:"font-size:22px;font-weight:700"},jpText(tiles.join("").replace(/([^。])$/,"$1。"))),h("div",{class:"rom"},E.tileRomaji(tiles)),h("div",{style:"margin-top:4px"},G.ex[1]),glossRow(tiles),h("div",{style:"margin-top:10px"},audioCtl(tiles.join(""),false))); }
STEP.teachG=(st,b,f)=>{ const G=ITEMS[st.key]; const more=h("p",{class:"small muted",hidden:true,style:"margin-top:8px"},G.more);
  b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Grammar"),h("h2",{style:"margin-top:6px"},G.t),h("p",{style:"margin-top:10px;font-size:16px"},G.s),grammarExample(G),
    h("p",{class:"small",style:"margin-top:12px"},h("b",null,"How it works: "),G.how),more,
    h("button",{class:"btn ghost",style:"margin-top:6px;min-height:34px;padding:0 8px;font-size:13px;color:var(--ai)",onclick:e=>{ more.hidden=!more.hidden; e.target.textContent=more.hidden?"More detail":"Less detail"; }},"More detail")));
  f.append(nextBtn()); markSeen(st.key); };
STEP.teachJ=(st,b,f)=>{ const it=ITEMS[st.key];
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"New kanji"),h("div",{class:"genko",style:"margin-top:12px"},h("span",{class:"jp"},it.jp)),
    h("div",{style:"font-size:20px;font-weight:700"},it.en.join("; ")),h("div",{class:"rom",style:"margin-top:4px"},"Readings: "+it.readings),
    h("div",{class:"gex"},jpText(it.ex),h("div",{class:"small muted"},it.exm),h("div",{style:"margin-top:8px"},audioCtl(E.reading(it.ex),false)))));
  f.append(nextBtn()); markSeen(st.key); };
STEP.teachN=(st,b,f)=>{ const it=ITEMS[st.key]; const K=E.NUMK[it.kind]; const ex=[]; const seen=new Set(); let g=0; while(ex.length<6&&g++<80){ const x=K.gen(); if(!seen.has(x.label)){ seen.add(x.label); ex.push(x);} }
  b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Pattern practice"),h("h2",{style:"margin-top:6px"},K.t),h("p",{class:"muted small",style:"margin-top:4px"},"Read each one aloud, then tap to check with audio."),
    h("div",{class:"stack",style:"margin-top:12px;gap:8px"},ex.map(x=>h("button",{class:"opt",onclick:()=>TTS.speak(x.read)},h("b",{class:"num",style:"min-width:110px"},x.label),h("span",{class:"jp",style:"font-weight:700"},x.read))))));
  f.append(nextBtn()); };
function markSeen(k){ if(!k||!ITEMS[k]) return; if(!S.items[k]){ S.items[k]=E.newSRS(); S.items[k].due=Date.now(); } }

function promptEl(st){ const p=st.prompt||{}; const day=lessonDay(); const box=h("div",{class:"prompt"});
  if(p.sub) box.append(h("div",{class:"sub"},p.sub));
  if(p.scene) box.append(h("div",{class:"scene"},p.emoji?h("span",{style:"font-size:22px;margin-right:6px"},p.emoji):null,p.scene));
  if(p.emoji&&!p.scene) box.append(h("div",{class:"emoji"},p.emoji));
  if(p.big) box.append(h("div",{class:p.lat?"en":"big",style:p.lat?"font-family:var(--f-mono);font-size:40px":""},p.big));
  if(p.jp){ box.append(h("div",{class:"jpl"},jpText(p.jp))); const it=ITEMS[st.key]; if(it&&it.type==="v") box.append(romLine(it.jp,day)); }
  if(p.tiles){ box.append(h("div",{class:"jpl"},jpText(p.tiles.join("").replace(/([^。！？…])$/,"$1。"))),romLine("",day,p.tiles)); }
  if(p.en) box.append(h("div",{class:"en"},p.en));
  if(p.audio){ if(TTS.ok&&S.settings.audio){ box.append(audioCtl(p.audio,true)); setTimeout(()=>{ if(P&&curStep()===st&&!answered()) TTS.speak(p.audio); },250); }
    else box.append(h("div",{class:"noaudio",style:"margin-bottom:8px"},"Audio unavailable — read instead"),h("div",{class:"jpl"},jpText(p.fallback||p.audio))); }
  else if(st.speak) box.append(h("div",{style:"margin-top:8px"},audioCtl(st.speak,false)));
  return box; }

STEP.mcq=(st,b,f,a)=>{
  b.append(promptEl(st));
  const two=st.jpOpts&&st.opts.every(o=>E.surface(o.t).length<=3);
  const box=h("div",{class:"opts"+(two?" two":"")});
  const btns=st.opts.map((o,i)=>h("button",{class:"opt"+(st.jpOpts?" jpo":"")+(two?" center":""),onclick:()=>choose(i)},two?null:h("span",{class:"kbd"},String(i+1)),st.jpOpts?jpText(o.t):o.t));
  box.append(...btns); b.append(box);
  function show(i){ btns.forEach((bt,j)=>{ bt.disabled=true; if(st.opts[j].ok) bt.classList.add(j===i?"sel-ok":"show-ok"); else if(j===i) bt.classList.add("sel-bad"); }); }
  function choose(i){ if(answered()) return; const o=st.opts[i]; const correct=st.opts.find(x=>x.ok).t;
    if(st.conf && !o.ok){ const exp=ITEMS[st.key]&&ITEMS[st.key].jp; const ch=(st.conf.find(c=>c[0]===o.t)||[])[1]; if(exp&&ch){ const k=exp+">"+ch; S.conf[k]=(S.conf[k]||0)+1; } }
    record(st,o.ok,{val:o.t,correct,why:o.ok?null:(o.why?o.why+" ":"")+st.exp});
    show(i); if(st.speak&&o.ok) TTS.speak(st.speak);
    feedback(f,o.ok,o.ok?E.pick(PRAISE):"Not quite",o.ok?st.exp:(o.why?o.why+" ":"")+"Correct: "+E.surface(correct)+". "+(st.exp&&!st.exp.startsWith("“")?st.exp:""),whyBtn(st)); }
  if(a){ const i=st.opts.findIndex(o=>o.t===a.val); show(i); feedback(f,a.ok,a.ok?"Correct":"Answered",st.exp,whyBtn(st)); }
  else f.append(h("p",{class:"small faint",style:"text-align:center"},"Tap an answer"));
  b.onkeydown=null; keyPick=(k)=>{ const n=+k; if(n>=1&&n<=btns.length&&!answered()) choose(n-1); };
};
let keyPick=null;
document.addEventListener("keydown",e=>{ if(!P||$("#scrim")) return; if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA") return; if(/^[1-4]$/.test(e.key)&&keyPick){ keyPick(e.key); } else if(e.key==="Enter"){ const nb=$("#nextbtn"); if(nb&&document.activeElement!==nb){ e.preventDefault(); nb.click(); } } });

STEP.type=(st,b,f,a)=>{
  keyPick=null; b.append(promptEl(st));
  const ja=st.lang==="ja";
  const inp=h("input",{class:"tin"+(ja?" jpin":""),id:"tin-"+P.idx,autocomplete:"off",autocapitalize:"off",spellcheck:"false",lang:ja?"ja":"en",placeholder:ja?"Type romaji or kana…":st.lang==="en-rom"?"Type the sound, e.g. ka":"Type in English"});
  const hint=ja?h("p",{class:"small faint",style:"margin-top:8px"},"Romaji converts to hiragana as you type (nn = ん, double letters = っ, - = ー). Katakana answers can be typed in hiragana."):null;
  if(ja) inp.addEventListener("input",()=>{ const v=inp.value; const c=E.kanaInput(v,false); if(c!==v){ inp.value=c; } });
  b.append(h("div",{style:"max-width:460px;margin:0 auto"},inp,hint));
  const check=()=>{ if(answered()) return; let v=inp.value.trim(); if(ja) v=E.kanaInput(v,true); if(!v){ inp.focus(); return; }
    let res; if(ja) res=E.checkJ(v,st.expect,st.tiles); else if(st.lang==="en-rom") res={ok:st.ans.includes(v.toLowerCase().replace(/\s/g,""))}; else res=E.checkE(v,st.ans);
    inp.disabled=true; const correct=ja?E.surface(st.expect):st.ans[0];
    record(st,res.ok,{val:v,correct,why:st.exp});
    let note=""; if(res.particle) note=" As a particle, write は / へ / を — they're read wa / e / o."; if(res.typo) note=" (Small typo — accepted. Expected: “"+res.best+"”.)";
    feedback(f,res.ok,res.ok?E.pick(PRAISE):"Not quite",(res.ok?"":"Answer: "+correct+". ")+st.exp+note,whyBtn(st));
    if(res.ok&&ja) TTS.speak(st.expect); };
  inp.addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); if(answered()){ advance(); } else check(); } });
  if(a){ inp.value=a.val||""; inp.disabled=true; feedback(f,a.ok,a.ok?"Correct":"Answered",(a.ok?"":"Answer: "+(ja?E.surface(st.expect):st.ans[0])+". ")+st.exp,whyBtn(st)); }
  else { f.append(h("div",{class:"row",style:"flex-wrap:nowrap"},h("button",{class:"btn ghost",style:"flex:none",onclick:()=>{ if(answered()) return; inp.disabled=true; const correct=ja?E.surface(st.expect):st.ans[0]; record(st,false,{val:"(skipped)",correct,why:st.exp}); feedback(f,false,"Here's the answer",correct+". "+st.exp,whyBtn(st)); }},"I don't know"),h("button",{class:"btn pri",style:"flex:1;min-height:52px",onclick:check},"Check"))); setTimeout(()=>inp.focus({preventScroll:true}),80); }
};

STEP.build=(st,b,f,a)=>{
  keyPick=null; b.append(promptEl(st));
  let chosen=[]; // bank ids
  const slot=h("div",{class:"slot","aria-label":"Your sentence"}); const bank=h("div",{class:"bank"});
  const draw=()=>{ slot.innerHTML=""; bank.innerHTML="";
    chosen.forEach((id,pos)=>{ const t=st.bank.find(x=>x.id===id); slot.append(h("button",{class:"tile",disabled:answered()?true:null,onclick:()=>{ chosen.splice(pos,1); draw(); }},jpText(fill(t.t)))); });
    st.bank.forEach(t=>bank.append(h("button",{class:"tile"+(chosen.includes(t.id)?" used":""),disabled:answered()||chosen.includes(t.id)?true:null,onclick:()=>{ chosen.push(t.id); draw(); }},jpText(fill(t.t)))));
    const cb=$("#chk"); if(cb) cb.disabled=!chosen.length?true:null; };
  b.append(h("div",{style:"max-width:520px;margin:0 auto"},slot,bank));
  const check=()=>{ if(answered()) return; const got=chosen.map(id=>st.bank.find(x=>x.id===id).t); const ok=got.join("")===st.tiles.join("");
    record(st,ok,{val:got.join(" "),correct:st.tiles.join(" "),why:st.exp}); draw();
    const it=ITEMS[st.key];
    feedback(f,ok,ok?E.pick(PRAISE):"Not quite",(ok?"":"Correct order: "+E.surface(st.tiles.join(" "))+". ")+(it&&it.g?N.GRAMMAR[it.g].s:"Japanese order: topic first, verb or です last."),whyBtn(st));
    if(ok) TTS.speak(st.tiles.join("")); };
  if(a){ chosen=[]; const vals=(a.val||"").split(" "); vals.forEach(v=>{ const t=st.bank.find(x=>x.t===v&&!chosen.includes(x.id)); if(t) chosen.push(t.id); }); draw(); feedback(f,a.ok,a.ok?"Correct":"Answered","Correct order: "+E.surface(st.tiles.join(" ")),whyBtn(st)); }
  else { draw(); f.append(h("div",{class:"row",style:"flex-wrap:nowrap"},h("button",{class:"btn ghost",style:"flex:none",onclick:()=>{ chosen=[]; draw(); }},"Clear"),h("button",{class:"btn pri",id:"chk",style:"flex:1;min-height:52px",disabled:true,onclick:check},"Check"))); }
};

STEP.match=(st,b,f,a)=>{
  keyPick=null; b.append(h("div",{class:"prompt"},h("div",{class:"sub"},"Match each character with its sound")));
  const L=E.shuffle(st.pairs.map((p,i)=>({t:p[0],i,side:0}))), Rr=E.shuffle(st.pairs.map((p,i)=>({t:p[1],i,side:1})));
  let sel=null, gone=new Set(), errors=0;
  const grid=h("div",{class:"mgrid",style:"max-width:420px;margin:0 auto"});
  const cells=[]; for(let r=0;r<st.pairs.length;r++){ cells.push(L[r],Rr[r]); }
  const draw=()=>{ grid.innerHTML=""; cells.forEach(c=>{ const id=c.side+"-"+c.i; grid.append(h("button",{class:"mbtn"+(c.side===0?" jp":"")+(gone.has(id)?" gone":"")+(sel&&sel.side===c.side&&sel.i===c.i?" sel":""),disabled:gone.has(id)||answered()?true:null,onclick:e=>tap(c,e.currentTarget)},c.side===0?h("span",{class:"jp"},c.t):h("span",{style:"font-family:var(--f-mono)"},c.t))); }); };
  const tap=(c,el)=>{ if(c.side===0) TTS.speak(c.t); if(!sel||sel.side===c.side){ sel=c; draw(); return; }
    if(sel.i===c.i){ gone.add("0-"+c.i); gone.add("1-"+c.i); sel=null; draw(); if(gone.size===cells.length){ const ok=errors<=1; record(st,ok,{val:errors+" errors"}); feedback(f,ok,ok?"All matched!":"Matched — with a few slips",errors?errors+" wrong pair"+(errors>1?"s":"")+". Those characters will come back for review.":"Perfect."); } }
    else { errors++; el.classList.add("no"); setTimeout(()=>{ sel=null; draw(); },350); } };
  draw(); b.append(grid);
  if(a){ cells.forEach(c=>gone.add(c.side+"-"+c.i)); draw(); feedback(f,a.ok,"Matched",""); } else f.append(h("p",{class:"small faint",style:"text-align:center"},"Tap a character, then its sound"));
};

STEP.err=(st,b,f,a)=>{
  keyPick=null; b.append(h("div",{class:"prompt"},h("div",{class:"sub"},"One part of this sentence is wrong. Tap it.")));
  const row=h("div",{class:"bank",style:"margin-top:0"});
  const draw=(pick)=>{ row.innerHTML=""; st.tiles.forEach((t,i)=>row.append(h("button",{class:"tile"+(pick!=null&&i===st.wrong?" fixed":"")+(pick!=null&&i===pick&&pick!==st.wrong?" wrong":""),disabled:pick!=null?true:null,onclick:()=>choose(i)},jpText(t)))); };
  const choose=i=>{ if(answered()) return; const ok=i===st.wrong; record(st,ok,{val:st.tiles[i],correct:st.fix,why:st.why,prompt:"Spot the error: "+st.tiles.join(" ")}); draw(i);
    feedback(f,ok,ok?"Good eye!":"Not that one",(ok?"":"The problem is "+st.tiles[st.wrong]+". ")+"Fix: "+st.fix+". "+st.why,whyBtn(st)); };
  draw(a?st.tiles.indexOf(a.val):null); b.append(row);
  if(a) feedback(f,a.ok,"Answered","Fix: "+st.fix+". "+st.why,whyBtn(st)); else f.append(h("p",{class:"small faint",style:"text-align:center"},"Tap the tile that's wrong"));
};

STEP.speak=(st,b,f,a)=>{
  keyPick=null; const day=lessonDay(); const txt=h("div",{hidden:!a&&false});
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"Speaking"),h("p",{class:"muted",style:"margin-top:6px"},"Listen, then say it aloud two or three times. Compare your rhythm: every kana gets one even beat."),
    h("div",{class:"jpl jp",style:"font-size:clamp(24px,7vw,32px);font-weight:700;margin-top:12px;line-height:1.6"},jpText(st.tiles?st.tiles.join("").replace(/([^。！？…])$/,"$1。"):st.jp)),
    h("div",{class:"rom"},st.tiles?E.tileRomaji(st.tiles):E.romOf(ITEMS[st.key]||{jp:st.jp})),
    h("p",{style:"margin-top:6px"},st.en),
    h("div",{style:"margin-top:14px"},audioCtl(st.tiles?st.tiles.join(""):E.reading(st.jp),true)),
    TTS.ok?null:h("p",{class:"small faint",style:"margin-top:8px"},"Without audio: read the romaji slowly, then at normal speed.")));
  const rate=(q,ok,l)=>h("button",{class:"btn"+(q===2?" pri":""),style:"flex:1",onclick:()=>{ if(answered()) return; record(st,ok,{q,val:l}); feedback(f,ok?true:null,ok?"Logged":"Logged — it'll come back",ok?"Self-check recorded. This app doesn't score your voice; your honest rating sets the next review.":"No problem. You'll practise it again soon.")} },l);
  if(a) feedback(f,a.ok?true:null,"Logged","");
  else f.append(h("p",{class:"small faint",style:"text-align:center;margin-bottom:8px"},"How did it go?"),h("div",{class:"row",style:"flex-wrap:nowrap"},rate(0,false,"Not yet"),rate(1,true,"Close"),rate(2,true,"Nailed it")));
};

STEP.flash=(st,b,f,a)=>{
  keyPick=null; const it=ITEMS[st.key]; const back=h("div",{class:"reveal",hidden:!a},h("div",{class:"jp",style:"font-size:36px;font-weight:700"},jpText(st.back.jp)),h("div",{class:"rom"},E.romOf(it)),h("div",{style:"margin-top:8px"},audioCtl(E.reading(st.back.jp),false)));
  b.append(h("div",{class:"tcard",style:"text-align:center"},h("div",{class:"lbl"},"Recall from memory"),st.front.emoji?h("div",{style:"font-size:44px;margin-top:8px"},st.front.emoji):null,h("div",{style:"font-size:24px;font-weight:700;margin-top:6px"},st.front.en),h("p",{class:"small muted"},"Say the Japanese out loud before you reveal it."),back));
  const grade=(q,ok,l)=>h("button",{class:"btn"+(q===2?" pri":""),style:"flex:1",onclick:()=>{ if(answered()) return; record(st,ok,{q,val:l}); advance(); }},l);
  if(a){ f.append(nextBtn()); return; }
  f.append(h("button",{class:"btn ai wide",style:"min-height:52px",onclick:e=>{ back.hidden=false; TTS.speak(st.back.jp); f.innerHTML=""; f.append(h("p",{class:"small faint",style:"text-align:center;margin-bottom:8px"},"How well did you remember?"),h("div",{class:"row",style:"flex-wrap:nowrap"},grade(0,false,"Forgot"),grade(1,true,"Hard"),grade(2,true,"Good"),grade(3,true,"Easy"))); }},"Reveal"));
};

STEP.regx=(st,b,f)=>{ const G=ITEMS[st.key]; const e=(G.err||[])[0];
  b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Let's look at this again"),h("h2",{style:"margin-top:6px"},G.t),h("p",{style:"margin-top:8px"},"You've missed this a couple of times, so here it is in its simplest form."),grammarExample(G),
    h("p",{class:"small",style:"margin-top:10px"},G.how),e?h("div",{class:"note"},"Common slip: ",h("span",{class:"jp"},e[0])," → fix ",h("b",{class:"jp"},e[2]),". ",e[3]):null));
  f.append(nextBtn()); };

/* Dialogue */
STEP.dlg=(st,b,f,a)=>{
  keyPick=null; const d=DAYS[st.day-1]; const D=d.dl; const chat=h("div",{class:"chat"});
  b.append(h("div",{class:"setting-l"},"🎬 ",D.set),chat);
  let li=0, firstTry=true, allFirst=true, turns=0;
  const bubble=(who,jp,en,me)=>{ const narr=!who; const bb=h("div",{class:"bub"+(me?" me":"")+(narr?" narr":"")},
      narr?null:h("div",{class:"who"},who),h("div",{class:narr?"":"jp"},narr?(en||jp):jpText(jp)),!narr&&en?h("div",{class:"tr"},en):null);
    if(!narr&&!me&&TTS.ok&&S.settings.audio){ bb.append(h("div",{style:"margin-top:4px"},audioCtl(jp,false))); }
    chat.append(bb); setTimeout(()=>bb.scrollIntoView({behavior:"smooth",block:"end"}),30); return bb; };
  const step=()=>{
    const say=[]; while(li<D.l.length && !Array.isArray(D.l[li][1])){ const [w,jp,en]=D.l[li]; bubble(w,jp,en,false); if(w) say.push(jp); li++; } if(say.length&&TTS.ok&&!a) TTS.seq(say);
    if(li>=D.l.length){ const ok=allFirst; if(!a) record({key:null,cat:"conversation",kind:"rec"},ok,{});
      // grade all you-turns as one conversation result for the day's sentences
      f.innerHTML=""; f.append(h("div",{class:"fb "+(ok?"ok":"info")},h("h3",null,ok?"Conversation complete!":"Conversation complete"),h("p",null,ok?"Every reply right on the first try.":"You found the right replies. Missed turns are noted for review.")),nextBtn()); return; }
    const opts=E.shuffle(D.l[li][1].map((o,i)=>({o,i}))); turns++; firstTry=true;
    f.innerHTML=""; f.append(h("p",{class:"small faint",style:"text-align:center;margin-bottom:8px"},"Your reply:"),h("div",{class:"opts"},opts.map(({o})=>h("button",{class:"opt jpo",style:"font-size:17px",onclick:e=>pickR(o,e.currentTarget)},jpText(o[0])))));
  };
  const pickR=(o,el)=>{ if(o[1]){ bubble("You",o[0],null,true); if(o[3]){ const r=o[3]; setTimeout(()=>{ bubble(r[0],r[1],r[2],false); if(TTS.ok) TTS.speak(r[1]); },300); } li++;
      f.innerHTML=""; f.append(h("div",{class:"fb ok"},h("h3",null,"✓ ",firstTry?"Natural reply":"That works"),h("p",null,o[2])),h("button",{class:"btn pri wide",style:"min-height:52px",onclick:step},"Continue")); }
    else { firstTry=false; allFirst=false; el.classList.add("sel-bad"); el.disabled=true; const ex=f.querySelector(".fb"); if(ex) ex.remove(); f.prepend(h("div",{class:"fb bad"},h("h3",null,"✕ Try another reply"),h("p",null,o[2])));
      S.mist.push({k:"dlg:"+st.day,p:D.set,y:fill(o[0]),a:fill(D.l[li][1].find(x=>x[1])[0]),x:o[2],ts:Date.now(),d:st.day,r:false}); } };
  if(a){ D.l.forEach(l=>{ if(Array.isArray(l[1])){ const c=l[1].find(x=>x[1]); bubble("You",c[0],null,true); } else bubble(l[0],l[1],l[2],false); }); f.append(nextBtn()); return; }
  step();
};
/* Reading passage */
STEP.read=(st,b,f,a)=>{ keyPick=null; const R=DAYS[st.day-1].rd; passage(b,f,a,R.title,R.text.map(t=>h("div",{class:"jp",style:"font-size:18px;font-weight:500;line-height:1.8"},jpText(t))),R.q,"reading",null); };
STEP.listenP=(st,b,f,a)=>{ keyPick=null; const L=DAYS[st.day-1].ls; const lines=L.l.map(x=>x[1]);
  const tr=h("div",{hidden:true,class:"stack",style:"gap:6px;margin-top:10px"},L.l.map(x=>h("div",null,h("span",{class:"lbl"},x[0]+" "),jpText(x[1]))));
  const head=[];
  if(TTS.ok&&S.settings.audio){ head.push(h("div",{style:"text-align:center"},h("button",{class:"btn ai",onclick:()=>TTS.seq(lines)},svg('<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>')," Play the conversation")),h("button",{class:"btn ghost",style:"margin-top:6px;font-size:13px",onclick:e=>{ tr.hidden=!tr.hidden; e.target.textContent=tr.hidden?"Show transcript":"Hide transcript"; }},"Show transcript"),tr); setTimeout(()=>{ if(P&&curStep()===st&&!a) TTS.seq(lines); },300); }
  else { tr.hidden=false; head.push(h("div",{class:"noaudio"},"Audio unavailable on this device — read the transcript instead."),tr); }
  passage(b,f,a,L.title,head,L.q,"listen",lines); };
function passage(b,f,a,title,content,qs,cat,lines){
  b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},cat==="listen"?"Listening":"Reading"),h("h2",{style:"margin-top:6px;font-size:18px"},jpText(title)),h("div",{style:"margin-top:12px"},content)));
  const qbox=h("div",{class:"stack",style:"margin-top:16px"}); b.append(qbox);
  let qi=0, right=0;
  const ask=()=>{ if(qi>=qs.length){ const ok=right>=Math.ceil(qs.length*0.66); if(!a) record({key:null,cat,kind:"rec"},ok,{val:right+"/"+qs.length}); f.innerHTML=""; f.append(h("div",{class:"fb "+(ok?"ok":"info")},h("h3",null,right+" of "+qs.length+" correct"),h("p",null,ok?"You picked out the key information.":"Reread the passage once more — the answers are all in there.")),nextBtn()); return; }
    const [q,opts,ans,why]=qs[qi]; const order=E.shuffle(opts.map((o,i)=>i));
    const qd=h("div",{class:"card"},h("b",null,(qi+1)+". "+q),h("div",{class:"opts",style:"margin-top:10px"},order.map(i=>h("button",{class:"opt",onclick:e=>{ const ok=i===ans; if(ok) right++; else { S.stats.cat[cat]=S.stats.cat[cat]||[0,0]; } qd.querySelectorAll("button").forEach((bt,j)=>{ bt.disabled=true; if(order[j]===ans) bt.classList.add(order[j]===i?"sel-ok":"show-ok"); else if(order[j]===i) bt.classList.add("sel-bad"); });
      qd.append(h("p",{class:"small "+(ok?"":"muted"),style:"margin-top:8px;color:"+(ok?"var(--matcha)":"var(--shu)")},(ok?"✓ ":"✕ ")+why)); qi++; setTimeout(ask,250); }},opts[i]))));
    qbox.append(qd); setTimeout(()=>qd.scrollIntoView({behavior:"smooth",block:"nearest"}),40); };
  if(a){ f.append(nextBtn()); qbox.append(h("p",{class:"small muted"},"Answered: "+(a.val||""))); return; }
  ask();
}

/* ================= Finish ================= */
function finish(){
  const pl=$("#player"); tick();
  const graded=Object.entries(P.ans).filter(([i,a])=>a.ok===true||a.ok===false);
  const right=graded.filter(([,a])=>a.ok).length; const acc=graded.length?right/graded.length:1;
  // remediation once, for lessons
  if(P.sess.kind==="lesson" && acc<0.6 && !P.remed){
    P.remed=true; const missed=[...new Set(Object.entries(P.first).filter(([k,v])=>v<0).map(([k])=>k))].filter(k=>ITEMS[k]).slice(0,4);
    const add=[]; missed.forEach(k=>{ const it=ITEMS[k]; const t=it.type==="k"?{type:"teachK",key:k}:it.type==="v"?{type:"teachV",key:k}:it.type==="s"?{type:"teachS",key:k}:it.type==="g"?{type:"regx",key:k}:null; if(t){ t.phase="recall"; add.push(t); } const q=E.recQ(it,lessonDay(),S); if(q){ q.phase="recall"; q.retry=1; add.push(q); } });
    if(add.length){ add.unshift({type:"info2",phase:"recall"}); P.sess.steps.push(...add); persistDraft(); return renderStep(); }
  }
  const sess=P.sess; const dk=dayKey(); const A=S.act[dk]=S.act[dk]||{q:0,c:0,ms:0,l:0}; A.ms+=P.ms; S.stats.ms=(S.stats.ms||0)+P.ms;
  const d=sess.day?DAYS[sess.day-1]:null; let first=false;
  // per-category breakdown
  const cats={}; graded.forEach(([i,a])=>{ const s=sess.steps[i]; const c=s.test||catName(s.cat); cats[c]=cats[c]||[0,0]; cats[c][1]++; if(a.ok) cats[c][0]++; });
  if(d && sess.kind!=="practice"){ first=!S.done[d.n]; const prev=S.done[d.n]; S.done[d.n]={ts:Date.now(),acc:prev?Math.max(prev.acc,acc):acc,mode:sess.mode,mins:Math.round(P.ms/60000)}; A.l=(A.l||0)+1;
    if(d.rv||d.cons){ const weak=Object.entries(cats).filter(([c,v])=>v[1]>=2&&v[0]/v[1]<0.7).map(([c])=>c); S.tests[d.n]={acc,cats,weak,ts:Date.now()}; } S.draft=null; }
  Store.save();
  const missed=[...new Set(Object.entries(P.first).filter(([k,v])=>v<0).map(([k])=>k))].map(k=>ITEMS[k]).filter(Boolean);
  const newIts=d?d.items.map(k=>ITEMS[k]).filter(i=>i.type==="v"||i.type==="k"||i.type==="j"):[];
  const concepts=d?[...new Set([...(d.items.map(k=>ITEMS[k]).filter(i=>i.type==="g").map(i=>i.t)),...(d.items.some(k=>k.startsWith("s:"))&&d.g?[]:[])])]:[];
  const next=d&&d.n<168?DAYS[d.n]:null;
  pl.innerHTML="";
  const body=h("div",{class:"p-body done"});
  body.append(h("div",{class:"hanko","aria-hidden":"true"},"済"),
    h("div",{class:"lbl"},d?(sess.kind==="lesson"?"Lesson complete":sess.kind==="final"?"Final assessment complete":sess.kind==="assessment"?"Stage assessment complete":"Check complete"):"Practice complete"),
    h("h2",{style:"margin-top:6px;font-size:24px"},d?"Day "+d.n+" · "+d.t:"Nice work"),
    h("div",{class:"statrow"},h("div",{class:"stat"},h("b",null,pct(acc)),h("span",null,"accuracy")),h("div",{class:"stat"},h("b",null,String(graded.length)),h("span",null,"answers")),h("div",{class:"stat"},h("b",null,Math.max(1,Math.round(P.ms/60000))+" min"),h("span",null,"study time"))));
  if(newIts.length) body.append(h("div",{class:"card",style:"text-align:left"},h("div",{class:"lbl"},"New today"),h("div",{class:"row",style:"gap:6px;margin-top:8px"},newIts.map(i=>h("span",{class:"chip"},h("span",{class:"jp",style:"font-weight:700"},E.surface(i.jp)),i.type==="k"?" "+i.rom:" "+i.en[0])))));
  if(concepts.length) body.append(h("div",{class:"card",style:"text-align:left;margin-top:10px"},h("div",{class:"lbl"},"Concepts practised"),h("p",{style:"margin-top:6px"},concepts.join(" · "))));
  if(Object.keys(cats).length>1) body.append(h("div",{class:"card",style:"margin-top:10px"},h("div",{class:"lbl",style:"margin-bottom:10px;text-align:left"},"By skill"),h("div",{class:"cats"},Object.entries(cats).map(([c,v])=>catRow(c.charAt(0).toUpperCase()+c.slice(1),v[0]/v[1],v[0]+"/"+v[1])))));
  if(missed.length) body.append(h("div",{class:"card",style:"text-align:left;margin-top:10px"},h("div",{class:"lbl"},"To review"),h("p",{class:"small muted",style:"margin-top:4px"},"These come back sooner in your reviews."),h("div",{class:"row",style:"gap:6px;margin-top:8px"},missed.slice(0,12).map(it=>h("span",{class:"chip shu"},h("span",{class:"jp"},it.type==="s"?it.tiles.join(""):it.type==="g"?it.t:it.type==="n"?it.t:E.surface(it.jp)))))));
  if(d&&d.fin) body.append(finalReport(cats));
  else if(d&&(d.as)&&Object.keys(cats).length){ const weak=Object.entries(cats).filter(([c,v])=>v[0]/v[1]<0.7).map(([c])=>c); body.append(h("div",{class:"note",style:"text-align:left;margin-top:10px"},weak.length?"Focus next on: "+weak.join(", ")+". Use the Practice tab for targeted drills.":"No weak areas at this stage — keep reviewing to make it stick.")); }
  const foot=h("div",{class:"p-foot"});
  if(next&&sess.kind!=="practice") foot.append(h("div",{class:"small faint",style:"text-align:center;margin-bottom:8px"},"Next: Day "+next.n+" · "+next.t),h("div",{class:"row",style:"flex-wrap:nowrap"},h("button",{class:"btn",style:"flex:1",onclick:()=>{ closePlayer(); go("today"); }},"Done for today"),h("button",{class:"btn pri",style:"flex:1",onclick:()=>{ closePlayer(); startDay(next.n); }},"Start Day "+next.n)));
  else foot.append(h("button",{class:"btn pri wide",style:"min-height:52px",onclick:()=>{ closePlayer(); }},"Finish"));
  pl.append(body,foot); Store.save();
  P=null; // session over
}
STEP.info2=(st,b,f)=>{ b.append(h("div",{class:"tcard"},h("div",{class:"lbl"},"Quick review"),h("h2",{style:"margin-top:6px"},"Let's go over a few things once more"),h("p",{class:"muted",style:"margin-top:8px"},"A few answers didn't land. Here's a short refresher with another try — then you're done."))); f.append(nextBtn()); };
function catName(c){ return {hira:"hiragana",kata:"katakana",vocab:"vocabulary",grammar:"grammar",listen:"listening",numbers:"numbers",kanji:"kanji",speak:"speaking",conversation:"conversation",reading:"reading"}[c]||c||"other"; }
function finalReport(cats){
  const cs=compScores(); const box=h("div",{class:"card",style:"text-align:left;margin-top:10px"},h("div",{class:"lbl"},"Your A1 profile"));
  const gaps=[];
  N.COMP.forEach(c=>{ const [l,cl,sc]=compLevel(cs[c.id]); if(l!=="Demonstrated") gaps.push(c); box.append(h("div",{class:"comp"},h("div",{class:"t"},h("b",null,c.t),h("p",null,c.d)),h("span",{class:"chip "+cl},l))); });
  box.append(h("div",{class:"lbl",style:"margin-top:14px"},"Your improvement plan"));
  const plan=h("ul",{style:"margin:6px 0 0;padding-left:20px",class:"small"});
  if(!gaps.length) plan.append(h("li",null,"Every A1 can-do area is demonstrated. Keep daily reviews going and start JLPT N5-style reading to broaden vocabulary."));
  gaps.slice(0,4).forEach(c=>plan.append(h("li",null,h("b",null,c.t+": "),({read:"10 minutes of kana drills on the Practice tab each day until all kana are Strong.",greet:"Replay the Week 4 lessons and the speaking drill.",intro:"Redo Days 26, 55 and 155 — say each reply aloud before choosing.",things:"Practise sentence building for Weeks 5 and 11.",numbers:"Use Numbers & time practice daily for a week.",routine:"Rebuild the Week 9–10 sentences from memory.",food:"Replay Days 88–97 and the restaurant scenario.",travel:"Replay Days 99–111 and the travel scenario.",personal:"Write three diary lines a day using Weeks 18–20 patterns.",listen:"Do the Listening practice with audio only, transcript hidden."})[c.id]||"Review this area in Practice.")));
  box.append(plan, h("p",{class:"small faint",style:"margin-top:10px"},"This profile reflects what you've shown in the app. It's a guide toward CEFR A1, not an official certificate; the JLPT N5 is a separate exam with its own format."));
  return box;
}

/* ================= Boot ================= */
const VIEWS={today:TodayView,path:PathView,practice:PracticeView,progress:ProgressView,library:LibraryView};
const hash=(location.hash||"").replace("#",""); if(VIEWS[hash]) VIEW=hash;
applyTheme(); TTS.init(); render();
Store.connect();
window.__NIHONGO_DEBUG={get S(){return S;},get P(){return P;},E,startDay,go,render};
})();
