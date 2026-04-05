"""Generate Easter greeting card PNG for EMC Digital Solutions news page.
Uses EMC brand colors: navy bg + gold egg + blue logo bars.
Output: 1200x630 (og:image standard)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), 'news-buona-pasqua-2026.png')

# EMC brand colors
BG_TOP = (12, 17, 32)
BG_MID = (19, 27, 46)
BG_BOT = (15, 23, 40)
GOLD_LIGHT = (255, 214, 102)
GOLD = (245, 197, 66)
GOLD_DARK = (184, 134, 11)
BLUE_DARK = (30, 58, 138)
BLUE = (59, 109, 212)
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

# Central radial glow
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(400, 0, -20):
    alpha = int(30 * (1 - r / 400))
    gdraw.ellipse([W//2 - r, H//2 - r, W//2 + r, H//2 + r],
                  fill=(107, 158, 247, alpha))
glow = glow.filter(ImageFilter.GaussianBlur(40))
img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')
draw = ImageDraw.Draw(img, 'RGBA')

# Decorative gold dots (corners)
dots = [
    (100, 100, 3), (180, 160, 2), (260, 90, 3),
    (1100, 120, 3), (1020, 200, 2), (1140, 240, 3),
    (80, 520, 3), (160, 480, 2), (240, 540, 3),
    (1050, 500, 3), (1130, 440, 2), (980, 560, 3),
]
for x, y, r in dots:
    draw.ellipse([x - r, y - r, x + r, y + r], fill=(245, 197, 66, 90))

# Egg shape with gradient + shadow
cx, cy = 600, 400
rx, ry = 135, 170

# Shadow
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(shadow)
sdraw.ellipse([cx - rx, cy - ry + 8, cx + rx, cy + ry + 8], fill=(0, 0, 0, 140))
shadow = shadow.filter(ImageFilter.GaussianBlur(12))
img = Image.alpha_composite(img.convert('RGBA'), shadow).convert('RGB')
draw = ImageDraw.Draw(img, 'RGBA')

# Egg vertical gradient (gold)
egg_mask = Image.new('L', (W, H), 0)
ImageDraw.Draw(egg_mask).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
egg_grad = Image.new('RGB', (W, H), GOLD)
egrad_draw = ImageDraw.Draw(egg_grad)
for y in range(cy - ry, cy + ry):
    t = (y - (cy - ry)) / (2 * ry)
    if t < 0.45:
        f = t / 0.45
        rc = int(GOLD_LIGHT[0] + (GOLD[0] - GOLD_LIGHT[0]) * f)
        gc = int(GOLD_LIGHT[1] + (GOLD[1] - GOLD_LIGHT[1]) * f)
        bc = int(GOLD_LIGHT[2] + (GOLD[2] - GOLD_LIGHT[2]) * f)
    else:
        f = (t - 0.45) / 0.55
        rc = int(GOLD[0] + (GOLD_DARK[0] - GOLD[0]) * f)
        gc = int(GOLD[1] + (GOLD_DARK[1] - GOLD[1]) * f)
        bc = int(GOLD[2] + (GOLD_DARK[2] - GOLD[2]) * f)
    egrad_draw.line([(0, y), (W, y)], fill=(rc, gc, bc))

img.paste(egg_grad, (0, 0), egg_mask)
draw = ImageDraw.Draw(img, 'RGBA')

# Egg highlight (top-left shine)
shine = Image.new('RGBA', (W, H), (0, 0, 0, 0))
shdraw = ImageDraw.Draw(shine)
for r in range(70, 0, -5):
    alpha = int(100 * (1 - r / 70))
    shdraw.ellipse([cx - 50 - r, cy - 100 - r, cx - 50 + r, cy - 100 + r],
                   fill=(255, 255, 255, alpha))
shine = shine.filter(ImageFilter.GaussianBlur(15))
# Mask shine to egg
shine_masked = Image.new('RGBA', (W, H), (0, 0, 0, 0))
shine_masked.paste(shine, (0, 0), egg_mask)
img = Image.alpha_composite(img.convert('RGBA'), shine_masked).convert('RGB')
draw = ImageDraw.Draw(img, 'RGBA')

# Decorative horizontal bands on egg (smooth curves via antialiased polygons)
for band_y, thickness in [(cy - 40, 3), (cy + 40, 3)]:
    # approximate ellipse curve by drawing thin filled polygon
    top_points = []
    bot_points = []
    for px in range(cx - rx + 12, cx + rx - 11, 2):
        t = (px - cx) / (rx - 10)
        # vertical offset based on egg curvature (pseudo-3d band)
        curve_offset = 8 * (1 - t * t) if band_y < cy else -8 * (1 - t * t)
        py = band_y + curve_offset
        top_points.append((px, py - thickness))
        bot_points.append((px, py + thickness))
    polygon = top_points + list(reversed(bot_points))
    if len(polygon) > 2:
        draw.polygon(polygon, fill=(30, 58, 138, 110))

# Small blue dots on egg (center row, between bands)
for dx in [-55, 0, 55]:
    draw.ellipse([cx + dx - 5, cy - 5, cx + dx + 5, cy + 5], fill=(30, 58, 138, 120))

# EMC 3-bar chevron logo at top-center (above egg, smaller + cleaner)
# Total logo height: 34 units, scale 2.2x
bar_scale = 2.2
logo_width = 32 * bar_scale
logo_left = (W - logo_width) / 2
logo_top = 170

def draw_bar(row_y, length, opacity=255):
    """Draw a chevron bar with pointed right end."""
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
    # rounded left corner
    draw.ellipse([x0, y0, x0 + 8, y_bot], fill=(107, 158, 247, opacity))

draw_bar(0, 20, 255)
draw_bar(11, 16, 220)
draw_bar(22, 20, 255)

# Title "Buona Pasqua"
try:
    title_font = ImageFont.truetype('arialbd.ttf', 68)
    year_font = ImageFont.truetype('arial.ttf', 28)
    brand_font = ImageFont.truetype('arialbd.ttf', 22)
except Exception:
    title_font = ImageFont.load_default()
    year_font = ImageFont.load_default()
    brand_font = ImageFont.load_default()

title_text = 'Buona Pasqua'
tw = draw.textlength(title_text, font=title_font)
# Title with gradient effect (simulate with 2 colors overlaid)
draw.text(((W - tw) / 2 + 2, 52), title_text, font=title_font, fill=(30, 58, 138, 180))
draw.text(((W - tw) / 2, 50), title_text, font=title_font, fill=GOLD_LIGHT)

# Year subtitle
year_text = '2 0 2 6'
yw = draw.textlength(year_text, font=year_font)
draw.text(((W - yw) / 2, 130), year_text, font=year_font, fill=(255, 214, 102, 200))

# Brand at bottom
brand = 'EMC DIGITAL SOLUTIONS'
bw = draw.textlength(brand, font=brand_font)
draw.text(((W - bw) / 2, 575), brand, font=brand_font, fill=(232, 228, 220, 200))

img.save(OUT, 'PNG', optimize=True)
print(f'Generated: {OUT}')
print(f'Size: {img.size}')
