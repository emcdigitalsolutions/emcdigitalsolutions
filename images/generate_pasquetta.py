"""Generate Pasquetta (Easter Monday) greeting card PNG for EMC Digital Solutions.
Uses EMC brand colors: navy bg + green/gold spring theme.
Output: 1200x630 (og:image standard)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), 'news-buona-pasquetta-2026.png')

# EMC brand colors
BG_TOP = (12, 17, 32)
BG_MID = (19, 27, 46)
BG_BOT = (15, 23, 40)
GOLD_LIGHT = (255, 214, 102)
GOLD = (245, 197, 66)
GREEN = (72, 187, 120)
GREEN_LIGHT = (134, 239, 172)
GREEN_DARK = (34, 120, 74)
BLUE_LIGHT = (147, 184, 252)
TEXT = (232, 228, 220)

img = Image.new('RGB', (W, H), BG_TOP)
draw = ImageDraw.Draw(img, 'RGBA')

# Vertical gradient background
for y in range(H):
    t = y / H
    if t < 0.5:
        r = int(BG_TOP[0] + (BG_MID[0] - BG_TOP[0]) * (t * 2))
        g = int(BG_TOP[1] + (BG_MID[1] - BG_TOP[1]) * (t * 2))
        b = int(BG_TOP[2] + (BG_MID[2] - BG_TOP[2]) * (t * 2))
    else:
        r = int(BG_MID[0] + (BG_BOT[0] - BG_MID[0]) * ((t - 0.5) * 2))
        g = int(BG_MID[1] + (BG_BOT[1] - BG_MID[1]) * ((t - 0.5) * 2))
        b = int(BG_MID[2] + (BG_BOT[2] - BG_MID[2]) * ((t - 0.5) * 2))
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Central radial glow (green tint for spring)
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(400, 0, -20):
    alpha = int(25 * (1 - r / 400))
    gdraw.ellipse([W//2 - r, H//2 - r, W//2 + r, H//2 + r],
                  fill=(72, 187, 120, alpha))
glow = glow.filter(ImageFilter.GaussianBlur(40))
img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')
draw = ImageDraw.Draw(img, 'RGBA')

# Decorative elements - spring flowers/leaves (small circles and stars)
spring_dots = [
    # Left side - green dots (leaves)
    (90, 180, 5, GREEN_LIGHT), (120, 220, 3, GREEN), (70, 260, 4, GREEN_LIGHT),
    (150, 150, 3, GREEN), (50, 320, 4, GREEN_LIGHT), (130, 380, 3, GREEN),
    (80, 440, 5, GREEN_LIGHT), (160, 480, 3, GREEN),
    # Right side
    (1110, 180, 5, GREEN_LIGHT), (1080, 220, 3, GREEN), (1130, 260, 4, GREEN_LIGHT),
    (1050, 150, 3, GREEN), (1150, 320, 4, GREEN_LIGHT), (1070, 380, 3, GREEN),
    (1120, 440, 5, GREEN_LIGHT), (1040, 480, 3, GREEN),
    # Gold accents
    (200, 120, 3, GOLD), (1000, 120, 3, GOLD),
    (180, 500, 3, GOLD), (1020, 500, 3, GOLD),
    (250, 300, 2, GOLD_LIGHT), (950, 300, 2, GOLD_LIGHT),
]
for x, y, r, color in spring_dots:
    draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, 120))

# Sun/picnic symbol - large circle with rays (representing outdoor/nature)
sun_cx, sun_cy = 600, 340
sun_r = 100

# Sun glow
sun_glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sgdraw = ImageDraw.Draw(sun_glow)
for r in range(180, 0, -10):
    alpha = int(50 * (1 - r / 180))
    sgdraw.ellipse([sun_cx - r, sun_cy - r, sun_cx + r, sun_cy + r],
                   fill=(245, 197, 66, alpha))
sun_glow = sun_glow.filter(ImageFilter.GaussianBlur(20))
img = Image.alpha_composite(img.convert('RGBA'), sun_glow).convert('RGB')
draw = ImageDraw.Draw(img, 'RGBA')

# Sun rays
for angle in range(0, 360, 30):
    rad = math.radians(angle)
    x1 = sun_cx + int(sun_r * 0.7 * math.cos(rad))
    y1 = sun_cy + int(sun_r * 0.7 * math.sin(rad))
    x2 = sun_cx + int((sun_r + 40) * math.cos(rad))
    y2 = sun_cy + int((sun_r + 40) * math.sin(rad))
    draw.line([(x1, y1), (x2, y2)], fill=(255, 214, 102, 100), width=3)

# Sun circle
draw.ellipse([sun_cx - sun_r, sun_cy - sun_r, sun_cx + sun_r, sun_cy + sun_r],
             fill=(245, 197, 66, 40), outline=(255, 214, 102, 150), width=3)

# Inner circle with EMC logo
draw.ellipse([sun_cx - 60, sun_cy - 60, sun_cx + 60, sun_cy + 60],
             fill=(12, 17, 32, 200))

# EMC 3-bar chevron logo inside the circle
bar_scale = 1.8
logo_left = sun_cx - 25
logo_top = sun_cy - 22

def draw_bar(row_y, length, opacity=255):
    x0 = logo_left
    y0 = logo_top + row_y * bar_scale
    x1 = x0 + length * bar_scale
    x_point = x0 + (length + 8) * bar_scale
    y_bot = y0 + 8 * bar_scale
    y_mid = y0 + 4 * bar_scale
    poly = [
        (x0 + 4, y0),
        (x1, y0),
        (x_point, y_mid),
        (x1, y_bot),
        (x0 + 4, y_bot),
    ]
    draw.polygon(poly, fill=(107, 158, 247, opacity))
    draw.ellipse([x0, y0, x0 + 8, y_bot], fill=(107, 158, 247, opacity))

draw_bar(0, 16, 255)
draw_bar(9, 13, 220)
draw_bar(18, 16, 255)

# Green grass/nature line at bottom
for x in range(0, W, 3):
    h = 15 + int(8 * math.sin(x * 0.05)) + int(5 * math.sin(x * 0.13))
    for dy in range(h):
        alpha = int(60 * (1 - dy / h))
        y = H - dy
        if 0 <= y < H:
            draw.point((x, y), fill=(72, 187, 120, alpha))

# Title text
try:
    title_font = ImageFont.truetype('arialbd.ttf', 62)
    sub_font = ImageFont.truetype('arial.ttf', 26)
    brand_font = ImageFont.truetype('arialbd.ttf', 20)
except Exception:
    title_font = ImageFont.load_default()
    sub_font = ImageFont.load_default()
    brand_font = ImageFont.load_default()

# Main title
title = 'Buona Pasquetta!'
tw = draw.textlength(title, font=title_font)
# Shadow
draw.text(((W - tw) / 2 + 2, 52), title, font=title_font, fill=(12, 17, 32, 180))
# Gold text
draw.text(((W - tw) / 2, 50), title, font=title_font, fill=GOLD_LIGHT)

# Subtitle
sub = '6 Aprile 2026'
sw = draw.textlength(sub, font=sub_font)
draw.text(((W - sw) / 2, 125), sub, font=sub_font, fill=(232, 228, 220, 180))

# Secondary text
sub2 = 'Una giornata di relax, natura e buona compagnia'
sw2 = draw.textlength(sub2, font=sub_font)
draw.text(((W - sw2) / 2, 480), sub2, font=sub_font, fill=(147, 184, 252, 180))

# Brand at bottom
brand = 'EMC DIGITAL SOLUTIONS'
bw = draw.textlength(brand, font=brand_font)
draw.text(((W - bw) / 2, 560), brand, font=brand_font, fill=(232, 228, 220, 200))

img.save(OUT, 'PNG', optimize=True)
print(f'Generated: {OUT}')
print(f'Size: {img.size}')
