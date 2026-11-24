"""Build a clean Chrome Web Store upload zip containing only runtime files."""
import os, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(os.path.dirname(ROOT), "genki-manga-extension-store-v1.0.0.zip")

FILES = [
    "manifest.json", "newtab.html", "newtab.css", "newtab.js",
    "popup.html", "popup.css", "popup.js", "background.js",
    "data/genki.js",
    "assets/bg-sakura.svg", "assets/bg-sunset.svg", "assets/bg-shrine.svg", "assets/bg-neon.svg",
    "assets/chara-hana.svg", "assets/chara-ken.svg", "assets/chara-mochi.svg",
    "assets/icon16.png", "assets/icon32.png", "assets/icon48.png", "assets/icon128.png",
]

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for rel in FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            raise SystemExit(f"Missing runtime file: {rel}")
        z.write(path, rel)

print(OUT)
print(f"{len(FILES)} files, {os.path.getsize(OUT) // 1024} KB")
