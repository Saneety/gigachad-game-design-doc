"""Finish a Sprite Fusion walk export (8 frames of 96x96 in one strip) into a game strip.

Usage: python finish.py SHEET.png OUT_DIR [--frame 96] [--head-cut 31] [--no-head-lock]
Writes OUT_DIR/brawler_walk_side.png (strip), brawler_walk_side_x4.gif (preview, 8 fps),
brawler_walk_side_compare.png (raw above, finished below, x4).

Steps:
  1. colours foreign to the sprite go to the outline they stand for (teal #092d2b, green-black #13150f);
  2. below the tunic hem the tunic reds and the reddish darks become the boot browns of the same
     lightness (the generator painted boots with tunic colours);
  3. every frame stands on the same feet line (the lowest row of the strip);
  4. the head (rows above --head-cut) is taken from frame 0 at each frame's best 2-px shift, so it
     bobs with the body but does not flicker;
  5. transparent pixels enclosed by the figure are filled with their most common neighbour.
"""
import argparse, collections, os
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("sheet"); ap.add_argument("out")
ap.add_argument("--frame", type=int, default=96)
ap.add_argument("--head-cut", type=int, default=31)
ap.add_argument("--no-head-lock", action="store_true")
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)

H = lambda s: tuple(int(s[i:i + 2], 16) for i in (1, 3, 5))
GLOBAL = {H("#092d2b"): H("#1f0e08"), H("#13150f"): H("#201508")}
TROUSERS = H("#7a5f40")
BELOW_HEM = {H("#8c2e1c"): H("#6f3e1e"), H("#712916"): H("#512b13"), H("#561e0f"): H("#402714"),
             H("#360d04"): H("#291106"), H("#3f1b0b"): H("#402714")}

raw = np.asarray(Image.open(a.sheet).convert("RGBA")).copy()
S = a.frame
n = raw.shape[1] // S
frames = [raw[:, i * S:(i + 1) * S].copy() for i in range(n)]

def recolour(f, mapping, rows=None):
    cnt = 0
    for src, dst in mapping.items():
        m = (f[..., 3] == 255) & (f[..., :3] == src).all(-1)
        if rows is not None:
            m &= rows
        f[m, :3] = dst; cnt += int(m.sum())
    return cnt

report = []
for i, f in enumerate(frames):
    g = recolour(f, GLOBAL)
    # the hem is the row above the first trouser row: whole red patches sit on the boots in some frames
    trousers = (f[..., 3] == 255) & (f[..., :3] == TROUSERS).all(-1)
    hem = int(np.nonzero(trousers.any(1))[0].min()) - 1
    rows = np.zeros(f.shape[:2], bool); rows[hem + 1:] = True
    b = recolour(f, BELOW_HEM, rows)
    report.append(f"frame {i}: hem row {hem}, {g} foreign px, {b} boot/leg px recoloured")

# feet line
grounds = [int(np.nonzero(f[..., 3].any(1))[0].max()) for f in frames]
feet = max(grounds)
for i, f in enumerate(frames):
    d = feet - grounds[i]
    if d:
        frames[i] = np.roll(f, d, 0); frames[i][:d] = 0
        report.append(f"frame {i}: lowered {d} px to the feet line {feet}")

# head lock
if not a.no_head_lock:
    cut = a.head_cut
    ref = frames[0]
    for i in range(1, n):
        f = frames[i]; best = None
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                s = np.roll(np.roll(ref, dy, 0), dx, 1)
                r = cut + dy
                d = int(((s[:r] != f[:r]).any(-1) & ((s[:r, :, 3] > 0) | (f[:r, :, 3] > 0))).sum())
                if best is None or d < best[0]: best = (d, dy, dx)
        d, dy, dx = best
        s = np.roll(np.roll(ref, dy, 0), dx, 1)
        f[:cut + dy] = s[:cut + dy]
        report.append(f"frame {i}: head from frame 0 shifted dx={dx} dy={dy} ({d} px differed)")

# enclosed holes
for i, f in enumerate(frames):
    m = f[..., 3] > 0
    enc = np.zeros_like(m)
    enc[1:-1, 1:-1] = ~m[1:-1, 1:-1] & m[:-2, 1:-1] & m[2:, 1:-1] & m[1:-1, :-2] & m[1:-1, 2:]
    for y, x in zip(*np.nonzero(enc)):
        nb = [tuple(f[y + dy, x + dx]) for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1))]
        f[y, x] = collections.Counter(nb).most_common(1)[0][0]
    if enc.any():
        report.append(f"frame {i}: filled {int(enc.sum())} enclosed hole px")

strip = np.concatenate(frames, 1)
Image.fromarray(strip).save(os.path.join(a.out, "brawler_walk_side.png"))

Z = 4
gif = []
for f in frames:
    bg = Image.new("RGBA", (S, S), (198, 205, 188, 255)); bg.alpha_composite(Image.fromarray(f))
    gif.append(bg.resize((S * Z, S * Z), Image.NEAREST).convert("P", palette=Image.ADAPTIVE))
gif[0].save(os.path.join(a.out, "brawler_walk_side_x4.gif"), save_all=True, append_images=gif[1:],
            duration=125, loop=0, disposal=2)

cmp = Image.new("RGBA", (strip.shape[1], S * 2), (198, 205, 188, 255))
cmp.alpha_composite(Image.fromarray(raw), (0, 0)); cmp.alpha_composite(Image.fromarray(strip), (0, S))
cmp.resize((cmp.width * Z, cmp.height * Z), Image.NEAREST).save(os.path.join(a.out, "brawler_walk_side_compare.png"))
print("\n".join(report))
