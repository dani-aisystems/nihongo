import json, subprocess, sys, time, os
HERE = os.path.dirname(os.path.abspath(__file__))
from playwright.sync_api import sync_playwright

PORT = 8765
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT)], cwd=os.path.join(HERE,"site"), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
URL = f"http://localhost:{PORT}/index.html"
OUT = os.path.join(HERE,"shots"); os.makedirs(OUT, exist_ok=True)
results = []
def check(name, cond, info=""):
    results.append((name, bool(cond), info)); print(("PASS " if cond else "FAIL ") + name + (" — " + str(info) if info else ""))

def step_info(page):
    return page.evaluate("""()=>{ const D=window.__NIHONGO_DEBUG; const P=D.P; if(!P) return null; const st=P.sess.steps[P.idx]; if(!st) return {type:'finish'}; return {type:st.type, idx:P.idx, n:P.sess.steps.length, st:st, answered:!!P.ans[P.idx]}; }""")

def play(page, wrong_first=False, max_steps=400):
    """Drive the player to completion answering correctly (optionally first graded answer wrong)."""
    did_wrong = False
    for _ in range(max_steps):
        info = step_info(page)
        if info is None or info["type"] == "finish":
            return True
        t = info["type"]; st = info["st"]
        if info["answered"]:
            page.click("#nextbtn"); continue
        if t in ("intro","info","info2","teachK","teachKG","teachS","teachG","teachJ","teachN","regx"):
            page.click("#nextbtn")
        elif t == "teachV":
            page.get_by_role("button", name="Reveal meaning").click(); page.click("#nextbtn")
        elif t == "mcq":
            opts = st["opts"]; idx = next(i for i,o in enumerate(opts) if o["ok"])
            if wrong_first and not did_wrong:
                idx = next(i for i,o in enumerate(opts) if not o["ok"]); did_wrong = True
            page.locator(".opts .opt").nth(idx).click(); page.click("#nextbtn")
        elif t == "type":
            ans = st["ans"][0]
            if st["lang"] == "ja":
                rom = page.evaluate("(s)=>window.__NIHONGO_DEBUG.E.romaji(s).replace(/[^a-z' -]/g,'')", st["expect"])
                # type romaji char by char to exercise the IME
                page.locator(".tin").type(rom.replace(" ",""))
            else:
                page.locator(".tin").fill(ans)
            page.get_by_role("button", name="Check").click(); page.click("#nextbtn")
        elif t == "build":
            tiles = st["tiles"]; bank = st["bank"]; used=set()
            for tl in tiles:
                bid = next(b["id"] for b in bank if b["t"]==tl and b["id"] not in used); used.add(bid)
                pos = [b["id"] for b in bank].index(bid)
                page.locator(".bank .tile").nth(pos).click()
            page.click("#chk"); page.click("#nextbtn")
        elif t == "match":
            pairs = st["pairs"]
            for jp, rom in pairs:
                page.locator(".mbtn", has_text=jp).first.click()
                page.locator(".mbtn:not(.jp)", has_text=rom).filter(has_text=rom).first.click() if False else None
                # click exact romaji button
                btns = page.locator(".mbtn:not(.jp):not(.gone)")
                for i in range(btns.count()):
                    if btns.nth(i).inner_text().strip() == rom:
                        btns.nth(i).click(); break
            page.click("#nextbtn")
        elif t == "err":
            page.locator(".bank .tile").nth(st["wrong"]).click(); page.click("#nextbtn")
        elif t == "speak":
            page.get_by_role("button", name="Nailed it").click(); page.click("#nextbtn")
        elif t == "flash":
            page.get_by_role("button", name="Reveal").click(); page.get_by_role("button", name="Good").click()
        elif t == "dlg":
            day = st["day"]
            for _ in range(30):
                if page.locator("#nextbtn").count(): page.click("#nextbtn"); break
                cont = page.get_by_role("button", name="Continue", exact=True)
                if cont.count(): cont.click(); continue
                # pick the correct reply
                lines = page.evaluate("(d)=>window.NIHONGO.DAYS[d-1].dl.l", day)
                correct = set()
                for l in lines:
                    if isinstance(l[1], list):
                        for o in l[1]:
                            if o[1]: correct.add(o[0])
                me = page.evaluate("()=>window.__NIHONGO_DEBUG.S.settings.name||'アレックス'")
                opts = page.locator("#pfoot .opt")
                clicked=False
                for i in range(opts.count()):
                    txt = opts.nth(i).inner_text().strip()
                    if any(txt == c.replace("{me}", me) for c in correct):
                        opts.nth(i).click(); clicked=True; break
                if not clicked: raise Exception("no dialogue option matched")
        elif t in ("read","listenP"):
            day = st["day"]; key = "rd" if t=="read" else "ls"
            qs = page.evaluate(f"(d)=>window.NIHONGO.DAYS[d-1].{key}.q", day)
            for qi, q in enumerate(qs):
                page.wait_for_selector(f".p-body .card:nth-of-type({qi+1})", timeout=3000)
                card = page.locator(".p-body .stack .card").nth(qi)
                card.locator(".opt", has_text=q[1][q[2]]).first.click()
                time.sleep(0.3)
            page.click("#nextbtn")
        else:
            raise Exception("unhandled "+t)
    return False

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2)
    page = ctx.new_page()
    errors=[]
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append("console: "+m.text) if m.type=="error" else None)
    page.goto(URL); page.wait_for_selector(".hero")
    page.screenshot(path=f"{OUT}/01-today-new.png", full_page=True)
    hero = page.inner_text(".hero")
    check("New learner sees Day 1", "Day 1 of 168" in hero and "Sounds of Japanese" in hero, hero[:80])
    page.click("text=Start your first lesson")
    page.wait_for_selector("#player")
    page.screenshot(path=f"{OUT}/02-player-intro.png")
    # take a screenshot of teaching card
    page.click("#nextbtn"); page.click("#nextbtn"); page.click("#nextbtn")
    page.screenshot(path=f"{OUT}/03-teach.png")
    ok = play(page)
    check("Completes Day 1 lesson", ok)
    page.wait_for_selector(".hanko")
    page.screenshot(path=f"{OUT}/04-complete.png", full_page=True)
    done_txt = page.inner_text("#player")
    check("Completion shows next step", "Start Day 2" in done_txt and "accuracy" in done_txt)
    page.get_by_role("button", name="Done for today").click()
    # returning learner
    page.reload(); page.wait_for_selector(".hero")
    hero = page.inner_text(".hero")
    check("Returning learner continues at Day 2", "Day 2 of 168" in hero, hero[:60])
    st = page.evaluate("()=>{const S=window.__NIHONGO_DEBUG.S; return {done:Object.keys(S.done), items:Object.keys(S.items).length}}")
    check("Progress persisted (localStorage)", st["done"]==["1"] and st["items"]>5, st)
    # mode change
    def steps_for(mode):
        return page.evaluate("(m)=>window.__NIHONGO_DEBUG.E.buildLesson(10,m,window.__NIHONGO_DEBUG.S).steps.length", mode)
    q,s,d = steps_for("quick"), steps_for("std"), steps_for("deep")
    check("Modes have different workloads", q < s < d, (q,s,d))
    page.get_by_role("button", name="Deep").first.click()
    est_deep = page.inner_text(".hero")
    page.get_by_role("button", name="Quick").first.click()
    est_quick = page.inner_text(".hero")
    check("Switching mode keeps progress and updates estimate", "Day 2 of 168" in est_quick and est_deep != est_quick)
    page.get_by_role("button", name="Standard").first.click()
    # incorrect answer flow on Day 2
    page.click("text=Continue learning"); page.wait_for_selector("#player")
    # advance until first mcq
    for _ in range(40):
        info = step_info(page)
        if info["type"]=="mcq" and not info["answered"]: break
        if info["type"]=="teachV": page.get_by_role("button", name="Reveal meaning").click()
        page.click("#nextbtn")
    n_before = step_info(page)["n"]; key = step_info(page)["st"]["key"]
    opts = step_info(page)["st"]["opts"]; wi = next(i for i,o in enumerate(opts) if not o["ok"])
    page.locator(".opts .opt").nth(wi).click()
    fb = page.inner_text(".fb")
    page.screenshot(path=f"{OUT}/05-wrong.png")
    check("Wrong answer shows explanation", "Not quite" in fb and "Correct:" in fb, fb[:120])
    n_after = step_info(page)["n"]
    mist = page.evaluate("()=>window.__NIHONGO_DEBUG.S.mist.slice(-1)[0]")
    check("Wrong answer adds a retry step", n_after == n_before+1, (n_before,n_after))
    check("Mistake recorded", mist and mist["k"]==key, mist)
    # back navigation keeps state
    page.click("#nextbtn"); page.locator("[aria-label='Previous step']").click()
    check("Back shows previous answer without losing it", page.locator(".opt.sel-bad").count()==1)
    page.click("#nextbtn")
    ok = play(page); check("Completes Day 2 after a wrong answer", ok)
    page.get_by_role("button", name="Done for today").click()
    # Path: inspect future and Day 168
    page.locator(".tab", has_text="Path").click(); page.wait_for_selector(".stage")
    page.screenshot(path=f"{OUT}/06-path.png", full_page=True)
    page.locator(".week-h", has_text="A1 consolidation").click()
    page.locator(".stn", has_text="Final A1 assessment").click()
    sh = page.inner_text(".sheet")
    check("Day 168 objective visible and locked", "Objective" in sh and "reading, listening" in sh and "Locked" in sh, sh[:100])
    page.screenshot(path=f"{OUT}/07-day168.png")
    page.keyboard.press("Escape")
    page.locator(".week-h", has_text="Sounds & first hiragana").click() if page.locator(".week-h[aria-expanded='false']", has_text="Sounds & first hiragana").count() else None
    page.locator(".stn", has_text="Sounds of Japanese").click()
    check("Completed day can be revisited", page.locator(".sheet button", has_text="Do this day again").count()==1)
    page.keyboard.press("Escape")
    # every day resolves to a non-empty lesson
    empties = page.evaluate("""()=>{const D=window.__NIHONGO_DEBUG; const out=[]; for(let i=1;i<=168;i++){ const d=window.NIHONGO.DAYS[i-1]; const s=(d.rv||d.cons)?D.E.buildReview(i,'std',D.S):D.E.buildLesson(i,'std',D.S); if(s.steps.length<6) out.push(i+':'+s.steps.length);} return out;}""")
    check("No broken or empty lessons (all 168 days)", not empties, empties)
    # Practice, Progress, Library screens + horizontal overflow
    for tab, fname in [("Practice","08-practice"),("Progress","09-progress"),("Library","10-library"),("Today","11-today-returning")]:
        page.locator(".tab", has_text=tab).click(); time.sleep(0.2)
        ov = page.evaluate("()=>document.scrollingElement.scrollWidth - window.innerWidth")
        check(f"{tab}: no horizontal scroll at 390px", ov<=0, ov)
        page.screenshot(path=f"{OUT}/{fname}.png", full_page=True)
    page.locator(".tab", has_text="Library").click()
    page.get_by_role("button", name="Words").click(); page.fill("#lib-q","blue")
    check("Library search finds introduced word", page.locator(".lrow", has_text="あお").count()>=1)
    page.locator(".lrow", has_text="あお").first.click()
    check("Library entry has quick practice", page.locator(".sheet button", has_text="Quick practice").count()==1)
    page.locator(".sheet button", has_text="Quick practice").click(); ok=play(page); check("Library quick practice runs", ok)
    page.get_by_role("button", name="Finish").click()
    # Practice: hiragana drill & mistakes notebook
    page.locator(".tab", has_text="Practice").click()
    page.locator(".card", has_text="Hiragana").first.click(); ok=play(page); check("Hiragana practice runs", ok); page.get_by_role("button", name="Finish").click()
    page.locator(".card", has_text="Mistake notebook").click()
    check("Mistake notebook lists entries", page.locator(".sheet", has_text="Open").count()>=1)
    page.screenshot(path=f"{OUT}/12-notebook.png")
    page.keyboard.press("Escape")
    # Settings + backup export
    page.locator("[aria-label='Settings']").click(); page.get_by_role("button", name="Export backup").click(); time.sleep(0.3)
    bk = page.input_value("#backup-txt")
    check("Backup export produces JSON", bk.startswith("{") and '"done"' in bk)
    page.screenshot(path=f"{OUT}/13-settings.png")
    page.keyboard.press("Escape")
    # End of course: simulate days 1..167 done, start final
    page.evaluate("""()=>{ const D=window.__NIHONGO_DEBUG; const S=D.S; for(let i=1;i<=167;i++) S.done[i]={ts:Date.now(),acc:0.9,mode:'std'}; Object.values(D.E.ITEMS).forEach(it=>{ if(it.day<=167 && !S.items[it.key]) { const s=D.E.newSRS(); s.n=4; s.c=4; s.iv=8; s.due=Date.now()+864e5*8; S.items[it.key]=s; }}); D.go("today"); }""")
    hero = page.inner_text(".hero"); check("Final assessment is next once eligible", "Day 168" in hero and "Final assessment" in hero, hero[:90])
    page.click(".hero .cta"); ok=play(page, max_steps=800); check("Final assessment completes", ok)
    page.wait_for_selector(".hanko"); fin = page.inner_text("#player")
    check("Final shows A1 profile and plan", "your a1 profile" in fin.lower() and "improvement plan" in fin.lower(), fin[-200:])
    page.screenshot(path=f"{OUT}/14-final.png", full_page=True)
    page.get_by_role("button", name="Finish").click()
    # dark mode screenshot
    page.emulate_media(color_scheme="dark"); page.locator(".tab", has_text="Today").click(); page.screenshot(path=f"{OUT}/15-dark.png", full_page=True)
    # desktop layout
    page.set_viewport_size({"width":1280,"height":860}); page.emulate_media(color_scheme="light"); page.locator(".tab", has_text="Path").click(); time.sleep(0.2)
    page.screenshot(path=f"{OUT}/16-desktop.png")
    check("No runtime errors", not errors, errors[:5])
    b.close()
srv.terminate()
fails=[r for r in results if not r[1]]
print(f"\n{len(results)-len(fails)}/{len(results)} checks passed")
