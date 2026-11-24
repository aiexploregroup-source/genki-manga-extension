"""Generate Chrome Web Store promo tiles from the extension screenshots."""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "screenshot-newtab.png")
PINK = (255, 77, 141)
CYAN = (53, 214, 255)
YELLOW = (255, 217, 61)
INK = (22, 21, 31)
WHITE = (255, 255, 255)


def font(size, bold=True, japanese=False):
    candidates = []
    if japanese:
        candidates = [r"C:\Windows\Fonts\meiryo.ttc", r"C:\Windows\Fonts\YuGothM.ttc", r"C:\Windows\Fonts\arialbd.ttf"]
    elif bold:
        candidates = [r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\segoeuib.ttf"]
    else:
        candidates = [r"C:\Windows\Fonts\arial.ttf", r"C:\Windows\Fonts\segoeui.ttf"]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()


def cover(im, size):
    w, h = size
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((int(sw * scale), int(sh * scale)), Image.LANCZOS)
    x = (im.width - w) // 2
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def draw_tile(size, out, title_size, sub_size, bullets, pad):
    im = cover(Image.open(SRC).convert("RGB"), size).convert("RGBA")
    w, h = size
    # dark gradient band at the bottom
    band_h = int(h * 0.46)
    band = Image.new("RGBA", (w, band_h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(band)
    for i in range(band_h):
        alpha = int(225 * (i / band_h) ** 0.7)
        bd.line([(0, i), (w, i)], fill=(18, 12, 34, alpha))
    im.alpha_composite(band, (0, h - band_h))
    d = ImageDraw.Draw(im)

    # pink sticker bar + title
    f_title = font(title_size)
    f_sub = font(sub_size)
    title = "GENKI MANGA"
    tw = d.textbbox((0, 0), title, font=f_title)[2]
    bar_x, bar_y = pad, h - band_h + pad
    d.rounded_rectangle([bar_x - 8, bar_y - 6, bar_x + tw + 14, bar_y + title_size + 10], radius=10, fill=PINK, outline=INK, width=3)
    d.text((bar_x + 3, bar_y - 2), title, font=f_title, fill=WHITE, stroke_width=1, stroke_fill=INK)

    sub = "learn Japanese · manga style"
    d.text((bar_x + 2, bar_y + title_size + 16), sub, font=f_sub, fill=CYAN, stroke_width=2, stroke_fill=INK)

    f_b = font(max(13, int(sub_size * 0.86)))
    y = bar_y + title_size + sub_size + 30
    for b in bullets:
        d.text((bar_x + 4, y), "• " + b, font=f_b, fill=YELLOW, stroke_width=2, stroke_fill=INK)
        y += int(sub_size * 1.45)

    im.convert("RGB").save(os.path.join(HERE, out), quality=95)
    print(out, size)


draw_tile((440, 280), "promo-small-440x280.png", 30, 15,
          ["30-day Genki I quest", "Cute chibi buddies", "Daily reminders"], 18)
draw_tile((920, 680), "promo-large-920x680.png", 56, 24,
          ["Manga new tab with 4 anime backgrounds", "Flashcards · kana charts · boss quizzes", "XP, streaks & daily study reminders"], 40)
draw_tile((1400, 560), "promo-hero-1400x560.png", 64, 26,
          ["Study Japanese the manga way 🌸", "Genki I 30-day challenge · flashcards · quizzes · daily reminders"], 56)
