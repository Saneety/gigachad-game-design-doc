"""Generated magenta-key pixel-art image -> clean sprite.

Usage: python pixelize.py RAW.png OUT_DIR NAME [--canvas 64] [--feet 56] [--pitch auto|N]
Writes OUT_DIR/NAME_<canvas>.png (alpha 0/255), NAME_<canvas>_x8.png (nearest upscale),
NAME_hires.png (generator image with the key removed), NAME_check.png (over dark and light).
"""
import argparse, collections, os
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("raw"); ap.add_argument("out"); ap.add_argument("name")
ap.add_argument("--canvas", type=int, default=64)
ap.add_argument("--feet", type=int, default=56)
ap.add_argument("--pitch", default="auto")
ap.add_argument("--colors", type=int, default=32)
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)

rgb = np.asarray(Image.open(a.raw).convert("RGB")).astype(np.int32)
H, W, _ = rgb.shape
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
# magenta key: strong red and blue, weak green
keyness = np.clip(((np.minimum(r, b) - g) - 60) / 80.0, 0, 1)
fg = keyness < 0.5

# keep the largest blob (drop specks)
def largest_blob(mask):
    from collections import deque
    lab = np.zeros(mask.shape, np.int32); best, bestn, n = 0, 0, 0
    for y0, x0 in zip(*np.nonzero(mask)):
        if lab[y0, x0]: continue
        n += 1; q = deque([(y0, x0)]); lab[y0, x0] = n; cnt = 0
        while q:
            y, x = q.popleft(); cnt += 1
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                yy, xx = y + dy, x + dx
                if 0 <= yy < mask.shape[0] and 0 <= xx < mask.shape[1] and mask[yy, xx] and not lab[yy, xx]:
                    lab[yy, xx] = n; q.append((yy, xx))
        if cnt > bestn: best, bestn = n, cnt
    return lab == best

small = fg[::4, ::4]
blob = largest_blob(small)
ys, xs = np.nonzero(blob)
y0, y1 = ys.min() * 4 - 8, ys.max() * 4 + 12
x0, x1 = xs.min() * 4 - 8, xs.max() * 4 + 12
y0, x0 = max(y0, 0), max(x0, 0); y1, x1 = min(y1, H), min(x1, W)
print("figure bbox (image px):", x0, y0, x1, y1, "size", x1 - x0, y1 - y0)

# hi-res cutout with despill
hi = np.zeros((H, W, 4), np.uint8)
alpha = (1 - keyness)
spill = np.minimum(r, b) - g
rgbc = rgb.copy().astype(np.float32)
m = spill > 0
lim = np.maximum(g, np.minimum(r, b) - spill // 2)
rgbc[..., 0] = np.where(m, np.minimum(r, lim + (r - np.minimum(r, b))), r)
rgbc[..., 2] = np.where(m, np.minimum(b, lim + (b - np.minimum(r, b))), b)
hi[..., :3] = np.clip(rgbc, 0, 255).astype(np.uint8)
hi[..., 3] = np.where(alpha > 0.5, 255, 0).astype(np.uint8)
blobmask = np.kron(blob, np.ones((4, 4), bool))[:H, :W]
grown = blobmask.copy()
for _ in range(2):
    grown = grown | np.roll(grown, 1, 0) | np.roll(grown, -1, 0) | np.roll(grown, 1, 1) | np.roll(grown, -1, 1)
hi[..., 3] = np.where(grown, hi[..., 3], 0)
Image.fromarray(hi[y0:y1, x0:x1]).save(os.path.join(a.out, a.name + "_hires.png"))

# pitch estimate from colour edges inside the bbox
crop = rgb[y0:y1, x0:x1]; cf = fg[y0:y1, x0:x1]
dx = (np.abs(np.diff(crop, axis=1)).sum(-1) > 40) & cf[:, 1:] & cf[:, :-1]
dy = (np.abs(np.diff(crop, axis=0)).sum(-1) > 40) & cf[1:, :] & cf[:-1, :]
ex, ey = dx.sum(0).astype(float), dy.sum(1).astype(float)

def fit(e, pitches):
    best = None
    pos = np.arange(len(e)) + 0.5
    for p in pitches:
        for ph in np.arange(0, p, 0.25):
            d = np.abs(((pos - ph) / p) - np.round((pos - ph) / p)) * p
            s = (e * (d < 1.0)).sum() / max(e.sum(), 1)
            if best is None or s > best[0]: best = (s, p, ph)
    return best

if a.pitch == "auto":
    sx = fit(ex, np.arange(8, 26, 0.1)); sy = fit(ey, np.arange(8, 26, 0.1))
    print("pitch x: score %.2f p %.2f ph %.2f | y: score %.2f p %.2f ph %.2f" % (*sx, *sy))
    px, phx, py, phy = sx[1], sx[2], sy[1], sy[2]
else:
    px = py = float(a.pitch)
    phx = fit(ex, [px])[2]; phy = fit(ey, [py])[2]

nx = int((x1 - x0 - phx) // px); ny = int((y1 - y0 - phy) // py)
art = np.zeros((ny, nx, 4), np.uint8)
for j in range(ny):
    for i in range(nx):
        cx0 = int(phx + i * px); cy0 = int(phy + j * py)
        ix0, ix1 = cx0 + int(px * 0.3), cx0 + int(px * 0.7) + 1
        iy0, iy1 = cy0 + int(py * 0.3), cy0 + int(py * 0.7) + 1
        m = cf[iy0:iy1, ix0:ix1]
        if m.mean() < 0.5: continue
        cols = crop[iy0:iy1, ix0:ix1][m]
        c = collections.Counter(map(tuple, (cols // 4)))
        mode = np.array(c.most_common(1)[0][0]) * 4
        near = cols[np.abs(cols - mode).sum(1) < 30]
        art[j, i, :3] = np.median(near if len(near) else cols, axis=0).astype(np.uint8)
        art[j, i, 3] = 255

# key-tinted cells (blue above green: the warm palette never has it) are edge mix with the key
a3 = art.astype(int)
tint = (art[..., 3] == 255) & (a3[..., 2] - a3[..., 1] > 20) & (a3[..., 0] - a3[..., 1] > 20)
print("key-tinted cells:", int(tint.sum()))
for y, x in zip(*np.nonzero(tint)):
    nb = [(y + dy, x + dx) for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1))
          if 0 <= y + dy < art.shape[0] and 0 <= x + dx < art.shape[1]]
    if any(art[p][3] == 0 for p in nb):
        art[y, x] = 0  # on the silhouette edge: background
    else:
        good = [art[p][:3] for p in nb if art[p][3] == 255 and not tint[p]]
        if good: art[y, x, :3] = good[0]

# reduce to a small palette without dithering
op = art[..., 3] == 255
pix = Image.fromarray(art[..., :3][op].reshape(1, -1, 3))
q = pix.quantize(colors=a.colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert("RGB")
art[..., :3][op] = np.asarray(q).reshape(-1, 3)

# drop lone pixels with no opaque 4-neighbour
o = art[..., 3] == 255
pad = np.pad(o, 1)
nb = pad[:-2, 1:-1].astype(int) + pad[2:, 1:-1] + pad[1:-1, :-2] + pad[1:-1, 2:]
art[o & (nb == 0)] = 0

ys, xs = np.nonzero(art[..., 3])
art = art[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
h, w = art.shape[:2]
ncol = len(set(map(tuple, art[art[..., 3] == 255][:, :3])))
print("art size %dx%d, colours %d" % (w, h, ncol))

C = a.canvas
can = Image.new("RGBA", (C, C), (0, 0, 0, 0))
can.paste(Image.fromarray(art), ((C - w) // 2, a.feet - h))
base = os.path.join(a.out, "%s_%d" % (a.name, C))
can.save(base + ".png")
can.resize((C * 8, C * 8), Image.NEAREST).save(base + "_x8.png")

chk = Image.new("RGBA", (C * 2 * 6, C * 6))
for k, colr in enumerate([(40, 40, 48, 255), (225, 225, 215, 255)]):
    t = Image.new("RGBA", (C, C), colr); t.alpha_composite(can)
    chk.paste(t.resize((C * 6, C * 6), Image.NEAREST), (k * C * 6, 0))
chk.save(os.path.join(a.out, a.name + "_check.png"))
