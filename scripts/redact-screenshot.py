"""Pixelate + blur boxes (x0,y0,x1,y1) in an image and save to dest."""
import sys, json
from PIL import Image, ImageFilter
src, dest, boxes = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
im = Image.open(src).convert("RGB")
for b in boxes:
    b = tuple(b); r = im.crop(b); w, h = r.size
    r = r.resize((max(1, w // 8), max(1, h // 8)), Image.BILINEAR).resize((w, h), Image.NEAREST).filter(ImageFilter.GaussianBlur(4))
    im.paste(r, b)
im.save(dest, quality=92)
print("saved", dest, im.size)
