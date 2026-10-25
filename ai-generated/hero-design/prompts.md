# Промпты концептов главного героя (Codex imagegen, 07.10)

Каждая картинка = style + hero + cultist + layout + блок варианта. Решения по герою - [[hero-design]].
Генерация: `python .tmp/gen_hero.py` (обёртка над `tools/art/gen_image.sh`).

## style

```
Character design sheet drawn as detailed pixel art in the style of Graveyard Keeper: hand-placed pixels, muted earthy palette with rich deep crimson and tarnished gold accents, soft pixel shading with 3-4 tone colour ramps, selective dark warm-brown outlines, light from the top-left, cool blue-violet shadows. Characters are slightly stylised with Graveyard Keeper proportions (about three heads tall). The whole sheet is upscaled with nearest-neighbour so every art pixel is a crisp square block: no anti-aliasing, no blur, no painterly brushwork, no 3D render look. Plain flat warm-grey background. Mood: darkly funny cult, absurd humour like Cult of the Lamb, nothing gory. No text, no letters, no numbers, no labels, no watermark. Wide landscape frame.
```

## hero

```
THE HERO: a disgraced cult leader and charismatic con artist, the boss of the cult. Under his robe there is no body, only living darkness: inside the hood is a pitch-black void, and his hands are slender black shadow hands. He has exactly the same body height and build as an ordinary cultist (only his antlers rise above them); he stands out by richer clothing, not by size. Deep crimson robe of fine cloth reaching the ground, tarnished gold trim along all edges, a vertical gold band down the front, and a gold cult emblem (a pair of antlers around an open eye) on the chest. Regalia: a heavy gold medallion on a chain, gold rings on the shadow fingers, a belt with small hanging wax seals and keys. He wears a deer skull with large branching antlers. His left antler is snapped off halfway and splinted with a dirty bandage, and the skull has a crack across the forehead patched with two crossed sticking plasters - souvenirs of being thrown off a cliff by a traitor. In one hand he holds a long soul contract scroll with a red wax seal, partly unrolled and covered in tiny illegible scribbles. Body language: relaxed, smug, confident showman, like a charming fraudster mentalist; his free hand gestures as if offering a deal. No halo.
```

## cultist

```
THE ORDINARY CULTIST WORKER (for scale only): plain undyed grey hooded robe of rough sackcloth, a simple red rope belt, a baggy shapeless hood with a dark face and two small white dot eyes, tired slouched posture, no decorations at all.
```

## layout

```
Layout, left to right: (1) a large full-body front view of the hero; (2) a large full-body back view of the hero, showing the robe, the hood and the antlers from behind; (3) a vertical column of three head close-ups showing his expressions; (4) at the bottom right, at true small in-game sprite scale (about 48 pixels tall), the hero standing next to an ordinary cultist worker on a tiny patch of grass, both with the same body height.
```

## 01-skull-crown.png

```
VARIANT - SKULL CROWN: the hood is an open void. The deer skull is worn on top of the hood like a crown, its long snout pointing forward above the hood opening, the antlers rising through two slits in the hood. Inside the hood is pure black darkness with two glowing amber eyes and a glowing amber Cheshire-cat grin. Expressions: smug half-lidded eyes with a sly crescent grin; a playful wink with a lopsided grin; wide eyes with a big toothy laughing grin.
```

## 02-skull-mask.png

```
VARIANT - SKULL MASK: the whole deer skull is worn as a full face mask inside a deep crimson hood, the long bone snout sticking out of the hood, the antlers rising through slits in the hood. Darkness is visible around the edges of the mask. Two glowing amber lights burn inside the empty eye sockets; there is no visible mouth, the mood is shown only by the shape of the eye-lights. Expressions: half-lidded smug eye-lights; one eye-light narrowed in a wink; both eye-lights wide and bright.
```

## 03-half-mask.png

```
VARIANT - HALF MASK: only the upper half of the deer skull is worn as a mask over the top of the void, covering the eyes area; the skull has no lower jaw. Two glowing amber lights burn in the eye sockets, and below the skull, in the pitch-black darkness of a tall pointed hood, a thin glowing amber Cheshire-cat grin floats. The antlers rise through slits in the tall pointed hood. Expressions: smug half-lidded eye-lights with a sly crescent grin; a wink with a lopsided grin; wide eye-lights with a big toothy laughing grin.
```

## 04-rakish-skull.png

```
VARIANT - RAKISH SKULL: the deer skull sits on top of the hood tilted at a jaunty angle like a dandy's hat, its snout pointing slightly sideways, so the broken antler and the whole silhouette look cocky and asymmetric. The hood has a stiff high gold-trimmed collar that frames a pure black void with two glowing amber eyes and a glowing amber Cheshire-cat grin. Expressions: smug half-lidded eyes with a sly crescent grin; a playful wink with a lopsided grin; wide eyes with a big toothy laughing grin.
```
