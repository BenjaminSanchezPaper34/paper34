#!/usr/bin/env python3
"""Image de partage (Open Graph, 1200 x 630) des pages d'apps.

Compose : fond sombre du site avec un halo bleu Paper34, l'icône, le nom, la promesse,
les appareils, « paper34.fr/apps » et, à droite, un visuel de l'app (dans son appareil).
Usage : python3 scripts/og-apps.py  (régénère public/apps/<slug>/partage.png pour chaque app listée)
Une app ajoutée au registre s'ajoute ici avec son visuel (voir docs/APPS.md).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
W, H = 1200, 630
SF = "/System/Library/Fonts/SFNS.ttf"  # SF Pro (police système d'Apple), variable

APPS = [
    # slug, nom, promesse, appareils, visuel, arrondi du visuel (rx, ry en fraction) ou None
    ("puppy-drop", "Puppy Drop", "Fusionne des chiots,\ndécouvre 36 races.", "iPhone · iPad · Apple Watch",
     "apps/puppy-drop/capture-1-jeu.webp", (0.135, 0.062)),
    ("jaugeai", "JaugeAI", "Toutes vos IA,\nau poignet. Gratuitement.", "Mac · iPhone · Apple Watch",
     "apps/jaugeai/capture-2-iphone.webp", None),
    ("watchroad", "WatchRoad", "Trois minutes de route,\ndes zombies sur le capot.", "Apple Watch",
     "apps/watchroad/montre-1-portes.webp", None),
]


def font(size: int, weight: str) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(SF, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def rounded(img: Image.Image, rx: float, ry: float) -> Image.Image:
    m = Image.new("L", (img.width * 4, img.height * 4), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, m.width - 1, m.height - 1), radius=int(min(rx * img.width, ry * img.height) * 4), fill=255)
    m = m.resize(img.size, Image.LANCZOS)
    out = img.convert("RGBA")
    out.putalpha(Image.composite(out.getchannel("A"), Image.new("L", img.size, 0), m))
    return out


def build(slug, name, tagline, devices, visual, radius):
    can = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    # Halo bleu Paper34 derrière le visuel
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((700, 40, 1260, 600), fill=(0, 113, 227, 120))
    can.alpha_composite(glow.filter(ImageFilter.GaussianBlur(120)))

    # Visuel à droite, 560 px de haut
    v = Image.open(PUB / visual).convert("RGBA")
    vh = 560
    v = v.resize((round(v.width * vh / v.height), vh), Image.LANCZOS)
    if radius:
        v = rounded(v, *radius)
    can.alpha_composite(v, (W - 90 - v.width if v.width < 420 else W - 40 - v.width, (H - vh) // 2))

    d = ImageDraw.Draw(can)
    x = 72
    # Icône
    icon = Image.open(PUB / f"apps/{slug}/icone.webp").convert("RGBA").resize((128, 128), Image.LANCZOS)
    can.alpha_composite(rounded(icon, 0.225, 0.225), (x, 72))
    # Nom, promesse, appareils
    d.text((x, 228), name, font=font(76, "Bold"), fill=(245, 245, 247))
    d.multiline_text((x, 330), tagline, font=font(36, "Semibold"), fill=(59, 157, 255), spacing=10)
    d.text((x, 452), devices, font=font(24, "Medium"), fill=(161, 161, 166))
    d.text((x, 540), "paper34.fr/apps", font=font(24, "Semibold"), fill=(245, 245, 247))

    out = PUB / f"apps/{slug}/partage.png"
    can.convert("RGB").save(out, optimize=True)
    print(out.relative_to(ROOT), out.stat().st_size // 1024, "Ko")


if __name__ == "__main__":
    for a in APPS:
        build(*a)
