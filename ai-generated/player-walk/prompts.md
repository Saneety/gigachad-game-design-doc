# Промпты ходьбы игрока сбоку: ноги нейронки в нашем цикле шага (17.10)

Проба подхода на персонаже без робы (решение человека: игрок-инженер, вариант «позы ног от
нейронки, порядок шага наш»). Шаблон поз - наша ходьба `tools/art/lpc/player/walk_side.py`: ноги
нарисованы кодом по правильному циклу (контакт, присед, проход, подъем), но некрасивые. Нейронка
перерисовывает персонажа в тех же позах, из ее кадров берутся ноги и рука - по разу, ключами.

Картинки: 1) шаблон `.tmp/player/tpl_walk_side.png` (8 кадров x7 на зеленом, сетка 4x2);
2) `.tmp/player/ref_player.png` - текущие спрайты игрока x6 (стойка вниз, вверх, вбок и 4 кадра
ходьбы вбок): тот же персонаж и стиль. Генерация: `GEN_REF_NOTE=<ref roles> gen_ref.sh`.

## ref roles

```
Two images are attached, each with its own role. IMAGE 1 is the LAYOUT AND POSE TEMPLATE: 8 cells in 4 columns and 2 rows on flat green; it shows the exact pose of the legs, the feet and the body in every frame of a correct walk cycle. Copy the leg positions exactly (where each foot is, which foot is in front, which is lifted, how far apart they are), but not their crude drawing. IMAGE 2 is the CHARACTER AND STYLE REFERENCE: the same player character drawn as in-game pixel art sprites (idle front, back and side, and four side walk frames): match his look, palette, outline, pixel size and level of detail exactly. Pass both to the image generation tool as reference images.
```

## walk_side

```
In-game sprite sheet, pixel art in the style of Graveyard Keeper: top-down three-quarter view, light from the top-left, dark warm-brown outline, warm palette with cool shadows; every art pixel a crisp square block (nearest-neighbour upscale), no anti-aliasing, no blur, no gradients. THE PLAYER: a young engineer-adventurer with big messy brown hair, brass goggles with blue lenses pushed up on his forehead, a cream shirt with rolled sleeves, a dark brown leather apron over the torso, a tool belt with a steel wrench, olive trousers and sturdy brown leather boots. Chibi proportions as in IMAGE 2: big head, short legs, big boots. Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell is one frame of his walk cycle, facing and walking to the RIGHT, in side view. In every cell draw him in exactly the template's pose: the same position and size in the cell, the same height, and above all the same leg positions: the front foot, the back foot, the lifted foot and the stride width exactly as in the template cell; the near leg (closer to the viewer) is drawn lighter, the far leg darker and partly behind it. His near arm swings opposite to his near leg: forward when the near leg is back, back when it is forward. Every cell shows the same character with identical colours and details; only the legs and the arm change. Keep wide green gaps between the figures; nothing touches the cell borders. No text, no shadows on the ground, no motion blur.
```

## Результат v1 (17.10)

`walk_side_v1.png`: нейронка поставила ноги во всех 8 ячейках как в шаблоне (цикл верный), руку
не качала. Пиксели у нее неровные (6-8 px), поэтому ноги после считывания чистятся: палитра ног
игрока, слияние одиночных пикселей, контур по силуэту. Сборка: `tools/art/lpc/player/walk_side_keys.py`
(`read` один раз, затем `keys` и `build`): ноги - ключи из генерации, верх - кадр стойки сбоку,
тело опускается на 1 px в контактах, предплечье качается до 2 px навстречу ноге, дальняя кисть
прячется за фартук, когда дальняя рука уходит назад.

# Ходьба вниз (к камере), 17.10

Шаблон - `tools/art/lpc/player/walk_down.py`: ноги стойки, поднятая нога укорочена кодом по
таймингу LPC (поднятая ступня выше на 1-3 px, опорная на линии ног), тело опускается на 1 px в
кадрах 2 и 6, кисти на 1 px вверх и вниз. Картинки: 1) `.tmp/player/tpl_walk_down.png` (8 кадров
x7 на зеленом, сетка 4x2); 2) `.tmp/player/ref_player_down.png` - стойка вниз, вверх, вбок и 4
текущих кадра ходьбы вниз x6.

## ref roles down

```
Two images are attached, each with its own role. IMAGE 1 is the LAYOUT AND POSE TEMPLATE: 8 cells in 4 columns and 2 rows on flat green; it shows the exact pose of the legs, the feet and the body in every frame of a correct walk cycle toward the viewer. Copy the leg positions exactly (which foot is raised, how high, which stands on the ground), but not their crude drawing. IMAGE 2 is the CHARACTER AND STYLE REFERENCE: the same player character drawn as in-game pixel art sprites (idle front, back and side, and four older front walk frames): match his look, palette, outline, pixel size and level of detail exactly. Pass both to the image generation tool as reference images.
```

## walk_down

```
In-game sprite sheet, pixel art in the style of Graveyard Keeper: top-down three-quarter view, light from the top-left, dark warm-brown outline, warm palette with cool shadows; every art pixel a crisp square block (nearest-neighbour upscale), no anti-aliasing, no blur, no gradients. THE PLAYER: a young engineer-adventurer with big messy brown hair, brass goggles with blue lenses pushed up on his forehead, a cream shirt with rolled sleeves, a dark brown leather apron over the torso, a tool belt with a steel wrench, olive trousers and sturdy brown leather boots. Chibi proportions as in IMAGE 2: big head, short legs, big boots. Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell is one frame of his walk cycle, facing the viewer and walking toward the camera (down the screen), in front view. In every cell draw him in exactly the template's pose: the same position and size in the cell, the same height, and above all the same legs: the raised foot exactly as high as in the template cell, with its knee bent forward toward the viewer, and the other foot standing flat on the ground; in the first and fifth cells both feet are down. His hands swing slightly with the step as in the template. Every cell shows the same character with identical face, hair, colours and details; only the legs and the arms change. Keep wide green gaps between the figures; nothing touches the cell borders. No text, no shadows on the ground, no motion blur.
```

## Результат walk_down v1 (17.10)

`walk_down_v1.png`: нейронка подняла ноги в тех же кадрах и на ту же высоту, что в шаблоне,
добавила изгиб колена и носок поднятого сапога. Сборка: `tools/art/lpc/player/walk_down_keys.py`.
Шаблон спереди и сам по себе чистый (ноги стойки), поэтому человеку показаны оба: A - ноги
нейронки, B - ноги стойки, поднятые кодом.
