# Промпты концепта визуал-теста (Codex imagegen, 04.10)

Общий дизайн (делегирован агенту по `concept-doc.md`, ждёт ОК человека):
- Лидер культа - падший пророк: багровый балахон с капюшоном и потёртой золотой каймой, рваный
  подол, лицо в тени капюшона, светятся два янтарных глаза. Над капюшоном парит треснувший
  золотой нимб (остаток почти-божественности), склеенный пластырем. Забинтованное предплечье,
  верёвочный пояс с маленьким черепом-оберегом, железная кирка.
- Машина - бур на тяге культиста (2x2 клетки): каркас из тёмного бруса с железными полосами,
  слева деревянное колесо-барабан, в нём бежит маленький серый культист. Ось колеса через
  железные шестерни крутит вертикальный шнек, который бурит рудную жилу в красном рунном круге.
  Свечи, фонарь-череп, лоток выхода спереди.

## mockup.png - как это будет выглядеть в игре

```
In-game screenshot mockup of a 2D top-down three-quarter view automation game (camera like Graveyard Keeper and Core Keeper: orthographic, looking down about 45 degrees, front faces of objects visible). The art is pixel art produced by rendering simple blocky low-poly 3D models (Blockbench / Minecraft-like cuboid models with hand-painted pixel textures) to crisp pixels at 32x32 pixels per ground tile, nearest-neighbour, no anti-aliasing, the whole frame upscaled x4 so every art pixel is a sharp 4x4 block. Warm autumn palette with cool blue-violet shadows, light from the top-left, soft ambient occlusion and contact shadows that give real volume (like Core Keeper), dark warm-brown outlines.
Scene: a small rocky clearing at the foot of a grey cliff, autumn grass, fallen orange leaves, pebbles.
Subject 1, the player (about 1.5 tiles tall): a fallen cult leader with cute chibi proportions (big head), crimson hooded robe with tarnished gold trim and a torn hem, face hidden in the hood's shadow with two glowing amber eyes, a cracked golden halo floating above the hood held together by a sticking plaster, a bandaged forearm, rope belt with a tiny skull charm; he swings an iron pickaxe at an iron ore rock, small rock chips flying.
Subject 2, a machine occupying 2x2 tiles and about 3 tiles tall: a cultist-powered drill. Dark timber frame with iron bands; on its left side a big wooden treadwheel (like a hamster wheel) with a small hooded grey-robed cultist running inside it; the wheel's axle drives iron gears that turn a vertical iron auger screw boring into an ore vein inside a glowing red rune circle on the ground; ore chunks and dust at the hole; two dripping candles and a small skull lantern on the frame; a wooden output chute at the front dropping ore onto a short conveyor belt that leads to a wooden chest.
Mood: cozy but darkly funny cult industry. No UI, no text, no watermark. Wide 16:9 frame.
```

## character_sheet.png - модельный лист лидера культа

```
Character model sheet for a blocky low-poly 3D game character that will be built in Blockbench from cuboid parts only (Minecraft-like construction, hand-painted pixel textures, 16 texture pixels per block unit). Character: a fallen cult leader with cute chibi proportions (head about one third of the height, short body, short limbs), crimson hooded robe with tarnished gold trim and a torn hem, face hidden in the hood's shadow with two glowing amber eyes, a cracked golden halo floating above the hood held together by a sticking plaster, a bandaged left forearm, rope belt with a tiny skull charm, simple dark boots. Next to him, his iron pickaxe with a wooden handle, shown alone.
Layout on a plain light grey background, all views the same scale and aligned on one ground line: front, back, left side, right side, and a three-quarter view from above as seen by a top-down game camera. Neutral standing pose with the arms slightly away from the body so every part is visible. Flat even lighting, crisp pixel textures visible on every cuboid face, clean silhouettes. No text, no labels, no watermark.
```

## machine_sheet.png - модельный лист бура на тяге культиста

```
Model sheet for a blocky low-poly 3D game machine that will be built in Blockbench from cuboid parts only (Minecraft-like construction, hand-painted pixel textures, 16 texture pixels per block unit). The machine: a cultist-powered drill standing on a square 2x2 tile footprint, about 3 tiles tall. Dark timber frame with iron bands and rivets; on its left side a big wooden treadwheel like a hamster wheel with a small hooded grey-robed cultist running inside it; the wheel's axle goes through iron bevel gears that turn a vertical iron auger screw in the middle of the frame, boring down into an ore vein inside a red rune circle painted on a stone base; two dripping candles and a small skull lantern hanging on the frame; a wooden output chute on the front side.
Layout on a plain light grey background, same scale for every view: a large three-quarter view from above as seen by a top-down game camera, then front, left side and top views, plus an exploded view of the moving parts (treadwheel with the runner, axle, gears, auger) with arrows showing how the rotation is passed from the wheel to the auger. Flat even lighting, crisp pixel textures on every cuboid face. No text, no labels, no watermark.
```
