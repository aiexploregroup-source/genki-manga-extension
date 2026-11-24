"""QA checker for the Genki Manga extension. Run: python tools/validate.py"""
import json, os, subprocess, sys, xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors, warnings = [], []

def check(cond, msg, warn=False):
    (warnings if warn else errors).append(msg) if not cond else None

# manifest
m_path = os.path.join(ROOT, "manifest.json")
check(os.path.exists(m_path), "manifest.json missing")
if os.path.exists(m_path):
    m = json.load(open(m_path, encoding="utf-8"))
    check(m.get("manifest_version") == 3, "manifest_version is not 3")
    for p in ("alarms", "notifications", "storage"):
        check(p in m.get("permissions", []), f"permission missing: {p}")
    check(m.get("chrome_url_overrides", {}).get("newtab") == "newtab.html", "new tab override missing")
    for ref in [m.get("background", {}).get("service_worker"), m.get("action", {}).get("default_popup"),
                m.get("chrome_url_overrides", {}).get("newtab")]:
        check(ref and os.path.exists(os.path.join(ROOT, ref)), f"manifest references missing file: {ref}")
    for ref in list(m.get("icons", {}).values()) + list(m.get("action", {}).get("default_icon", {}).values()):
        check(os.path.exists(os.path.join(ROOT, ref)), f"icon missing: {ref}")

# files referenced by html
html = open(os.path.join(ROOT, "newtab.html"), encoding="utf-8").read()
import re
for ref in re.findall(r'(?:src|href)="([^":]+\.(?:js|css|svg|png))"', html):
    check(os.path.exists(os.path.join(ROOT, ref)), f"newtab.html references missing file: {ref}")
for ref in re.findall(r"url\(['\"]?([^'\")]+\.(?:svg|png))", html + open(os.path.join(ROOT, "newtab.css"), encoding="utf-8").read()):
    check(os.path.exists(os.path.join(ROOT, ref)), f"CSS/HTML references missing asset: {ref}")

# JS syntax
for js in ("newtab.js", "background.js", "popup.js", "data/genki.js"):
    path = os.path.join(ROOT, js)
    if not os.path.exists(path):
        check(False, f"missing JS: {js}"); continue
    r = subprocess.run(["node", "--check", path], capture_output=True, text=True)
    check(r.returncode == 0, f"JS syntax error in {js}: {r.stderr.strip()[:300]}")

# SVG validity
for name in sorted(os.listdir(os.path.join(ROOT, "assets"))):
    if name.endswith(".svg"):
        try: ET.parse(os.path.join(ROOT, "assets", name))
        except Exception as e: check(False, f"invalid SVG {name}: {e}")

# PNG icon sizes
try:
    from PIL import Image
    for name in ("icon16.png", "icon32.png", "icon48.png", "icon128.png"):
        p = os.path.join(ROOT, "assets", name)
        if not os.path.exists(p): check(False, f"missing icon {name}"); continue
        im = Image.open(p)
        expected = int(name[4:-4])
        check(im.size == (expected, expected), f"icon {name} has size {im.size}, expected {expected}x{expected}")
except ImportError:
    warnings.append("Pillow not installed; skipped icon size check")

# data sanity via node
data_path = os.path.join(ROOT, "data", "genki.js")
if os.path.exists(data_path):
    script = f"""
require({json.dumps(data_path).replace('\\\\', '\\\\')});
const G = globalThis.GENKI;
if (!G) {{ console.log('NO_DATA'); process.exit(0); }}
console.log(JSON.stringify({{
  days: G.DAYS && G.DAYS.length,
  vocab: G.DAYS ? G.DAYS.reduce((a,d)=>a+(d.vocab||[]).length,0) : 0,
  grammar: G.DAYS ? G.DAYS.reduce((a,d)=>a+(d.grammar||[]).length,0) : 0,
  quiz: G.DAYS ? G.DAYS.reduce((a,d)=>a+(d.quiz||[]).length,0) : 0,
  hira: G.HIRAGANA && G.HIRAGANA.length,
  kata: G.KATAKANA && G.KATAKANA.length,
  quotes: G.QUOTES && G.QUOTES.length,
  ranks: G.RANKS && G.RANKS.length,
  badAnswers: G.DAYS ? G.DAYS.reduce((a,d)=>a+(d.quiz||[]).filter(q=>!Array.isArray(q.choices)||q.choices.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3).length,0) : -1,
  badDays: G.DAYS ? G.DAYS.filter((d,i)=>d.day!==i+1).length : -1
}}));
"""
    r = subprocess.run(["node", "-e", script], capture_output=True, text=True)
    if r.returncode != 0 or "NO_DATA" in r.stdout:
        check(False, f"data sanity check failed: {r.stdout} {r.stderr[:200]}")
    else:
        data = json.loads(r.stdout)
        check(data["days"] == 30, f"expected 30 days, got {data['days']}")
        check(data["badDays"] == 0, f"{data['badDays']} days have wrong day numbers")
        check(data["badAnswers"] == 0, f"{data['badAnswers']} quiz questions have bad answers/choices")
        check(data["vocab"] >= 100, f"only {data['vocab']} vocab items")
        check(data["quiz"] >= 60, f"only {data['quiz']} quiz questions")
        check(data["hira"] >= 8 and data["kata"] >= 8, "kana charts too small")
        check(data["ranks"] == 6, f"expected 6 ranks, got {data['ranks']}")
        print("DATA SUMMARY:", json.dumps(data))

print("\n=== ERRORS ===")
print("\n".join(errors) if errors else "none")
print("=== WARNINGS ===")
print("\n".join(warnings) if warnings else "none")
sys.exit(1 if errors else 0)
