"""Generate crisp Chrome-extension icons for genki manga extension.

Draws a single high-resolution 256px master and LANCZOS-downscales it to
16/32/48/128 px PNGs. Run: python make_icons.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
S = 256  # master size

# --- palette -----------------------------------------------------------------
MAGENTA = (255, 61, 154)
PURPLE = (123, 47, 247)
DARK = (34, 14, 54)
WHITE = (255, 255, 255)
YELLOW = (255, 210, 63)
INK = (199, 24, 122)


def rounded_mask(size, box, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius=radius, fill=255)
    return mask


def diagonal_gradient(size, c1, c2):
    """Top-left c1 -> bottom-right c2 gradient image."""
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x + y) / float(w + h - 2)
            t = max(0.0, min(1.0, t))
            px[x, y] = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
    return img


def star(draw, cx, cy, outer, inner, color, points=4):
    """Draw a simple pointed sparkle/star."""
    import math

    verts = []
    for i in range(points * 2):
        r = outer if i % 2 == 0 else inner
        a = (math.pi / points) * i - math.pi / 2
        verts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    draw.polygon(verts, fill=color)


def load_font():
    """Prefer the kana げ in a Japanese font; fall back to bold 'G'."""
    meiryo = r"C:\Windows\Fonts\meiryo.ttc"
    arialbd = r"C:\Windows\Fonts\arialbd.ttf"
    if os.path.exists(meiryo):
        try:
            return ImageFont.truetype(meiryo, 84), "\u3052"
        except Exception:
            pass
    if os.path.exists(arialbd):
        try:
            return ImageFont.truetype(arialbd, 96), "G"
        except Exception:
            pass
    return ImageFont.load_default(), "G"


def draw_master():
    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # Thick dark rounded-square base
    base = ImageDraw.Draw(canvas)
    base.rounded_rectangle([8, 8, S - 8, S - 8], radius=60, fill=DARK + (255,))

    # Magenta -> purple gradient inset
    grad = diagonal_gradient((S, S), MAGENTA, PURPLE).convert("RGBA")
    mask = rounded_mask((S, S), [20, 20, S - 20, S - 20], 50)
    canvas.paste(grad, (0, 0), mask)

    d = ImageDraw.Draw(canvas)

    # Soft top gloss
    d.rounded_rectangle([30, 30, S - 30, 96], radius=32,
                        fill=(255, 255, 255, 28))

    # Yellow sparkle accents
    for (sx, sy, sr) in [(54, 58, 15), (206, 74, 12), (58, 200, 11),
                         (202, 196, 9)]:
        star(d, sx, sy, sr, sr * 0.34, YELLOW + (255,))
        d.ellipse([sx - 2.5, sy - 2.5, sx + 2.5, sy + 2.5], fill=WHITE + (255,))

    # Comic speech bubble with tail
    tail = [(104, 158), (168, 158), (128, 210)]
    d.polygon(tail, fill=DARK + (255,))
    d.polygon([(110, 160), (162, 160), (128, 199)], fill=WHITE + (255,))
    bubble = [66, 74, 192, 176]
    d.rounded_rectangle(bubble, radius=34, fill=DARK + (255,))
    d.rounded_rectangle([74, 82, 184, 168], radius=28, fill=WHITE + (255,))

    # Bold letter / kana
    font, text = load_font()
    box = d.textbbox((0, 0), text, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    tx = (66 + 192) / 2 - tw / 2 - box[0]
    ty = (74 + 176) / 2 - th / 2 - box[1] + 2
    d.text((tx + 4, ty + 5), text, font=font, fill=DARK + (255,))
    d.text((tx, ty), text, font=font, fill=INK + (255,),
           stroke_width=2, stroke_fill=DARK + (255,))

    return canvas


def main():
    master = draw_master()
    for size in (16, 32, 48, 128):
        out = master.resize((size, size), Image.LANCZOS)
        path = os.path.join(HERE, "icon%d.png" % size)
        out.save(path, "PNG")
        print("wrote", path)

    for size in (16, 32, 48, 128):
        p = os.path.join(HERE, "icon%d.png" % size)
        if not os.path.exists(p):
            raise RuntimeError("missing icon: " + p)
    print("All 4 icons verified.")


if __name__ == "__main__":
    main()
