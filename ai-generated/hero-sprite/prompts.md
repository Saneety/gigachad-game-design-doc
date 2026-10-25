# Промпты спрайтов героя поверх поз LPC (Codex imagegen, 16.10)

Идея человека: брать готовые анимации из генератора LPC как позы и тайминг, а персонажа
перерисовывать нейросетью в каждом кадре. Решения: герой из концепта `hero-design/01-skull-crown.png`,
рост как у героя GK2 и игрока (около 44 px тело, с рогами около 54 px), кадр 64x64.

Каждый запрос = style + hero + блок направления. Картинки к запросу (в этом порядке):
1. шаблон поз `tpl_walk_<dir>.png` (`tools/art/lpc/repaint.py template` из
   `assets/visual_test/lpc/cultist_leader_walk_<dir>.png`): 8 кадров ходьбы LPC, увеличены в 6 раз,
   клетки 384x512 сеткой 4x2 на зелёном #00FF00;
2. концепт `hero-design/01-skull-crown.png` - тот же персонаж;
3. `ref_3d_views.png` - верхний ряд `art3d/blockbench/out/cult_hero_sheet.png`, только формы в
   профиль и сзади.

Генерация: `GEN_REF_NOTE=... tools/art/previews/chars/gen_ref.sh OUT.png "brief" tpl.png concept.png ref_3d_views.png`
(`GEN_REF_NOTE` - строка «ref roles» ниже). Обработка: бумажная кукла `tools/art/lpc/doll.py`
по рецепту `tools/art/lpc/hero/doll.json` (команда - в `assets/visual_test/lpc_repaint/README.md`).

## walk_down_small

Проба: тот же style и hero, шаблон `tpl_walk_down_s44.png` (`--scale 4.4`, фигура LPC
меньше), этот блок вместо walk_down. Цель - чтобы нейронка нарисовала героя ростом 44
арт-пикселя в своей сетке, а не крупными пикселями.

```
SIZE OVERRIDE (wins over the pixel size in the style text): the hero is SMALL. Draw him with exactly 44 art pixels from the soles of his feet to the top of his hood, the antlers adding about 12 more art pixels above; each art pixel is a crisp square block of about 5x5 image pixels, so the figure is about 220 image pixels tall without the antlers, the same size as the template figure. Fewer, chunkier pixels: simplify the details to what reads at 44 pixels tall, like a Graveyard Keeper character sprite. Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell holds one frame of the hero's walk cycle, facing the viewer (walking towards the camera). Frames read left to right, top row then bottom row, exactly like the template. In every cell draw THE HERO in exactly the template's pose: the same position in the cell, the same height, the same feet placement, the same arm swing and the same sway of the robe hem; the feet peek out under the hem as in the template. Every cell shows the same character with identical colours, outline and details; only the pose changes between cells. Keep wide green gaps between the figures; nothing touches the cell borders.
```

## Результаты

- `walk_down_small_v1.png` (проба `walk_down_small`) - отказ: фигура стала меньше, но пиксели
  тоже мельче, в арт-пикселях рост тот же (70-78). Нейронка не рисует героя мельче в своей сетке.
- Листы v1 читаются в родной сетке (шаг 4.75-4.8) и собираются бумажной куклой
  (`tools/art/lpc/rig.py`, рецепт `tools/art/lpc/hero/rig.json`), см.
  `assets/visual_test/lpc_repaint/README.md`.
- `spellcast_*_v1.png`, `slash_*_v1.png` (блоки «Каст и удар» ниже) - с первой попытки, позы по
  шаблону. Удар человек убрал (16.10), его листы вынесены из хранилища; блок `action_slash` оставлен
  как история. В двух кадрах каста спереди ухмылка стала зубастой - не важно, голова берется из
  эталона. Из этих листов кукла берет только руки.

Ранние заметки:
- `walk_down_v1.png`, `walk_up_v1.png`, `walk_side_v1.png` - с первой попытки, отказов нет.
  Персонаж одинаковый во всех клетках, позы шагов и мах руками сбоку соблюдены, клетки на месте.
- Генератор рисует «под пиксель», но без ровной сетки (блоки 1-6 px, шум), поэтому кадры
  собираются выборкой по блокам с модой цвета. Фигура вышла крупнее шаблона (тело около 46 px,
  с рогами до 62), шаг выборки 6.3 вместо 6 дает тело около 44 px. Сбоку верхний ряд клеток
  нарисован на 5 арт-пикселей выше нижнего - это убирает постановка кадра по линии ног LPC.

## ref roles

```
Three images are attached, each with its own role. IMAGE 1 is the LAYOUT AND POSE TEMPLATE: use it only for the canvas layout, the cell positions, the pose, the size and the position of the figure in every cell; ignore its colours, clothes, horns and drawing style. IMAGE 2 is the CHARACTER REFERENCE: the same character must be drawn (identity, outfit, colours, skull, antlers, void face); its first figure is the front view, its second figure is the back view. IMAGE 3 shows the same character as a blocky 3D model from several angles: use it only to understand his shapes from the side and from behind; do not copy its blocky look, its noise texture or its text labels. Pass all three to the image generation tool as reference images.
```

## style

```
In-game sprite sheet drawn as pixel art in the style of Graveyard Keeper: hand-placed pixels, and every art pixel is a crisp square block of exactly 6x6 image pixels (nearest-neighbour upscale): no anti-aliasing, no blur, no gradients, no painterly brushwork, no 3D render look. Top-down three-quarter view as in Graveyard Keeper. Light from the top-left, 3-4 tone colour ramps per material, cool blue-violet shadows, a 1-pixel outline in a darker shade of each material's own colour (no pure black outline). Muted earthy palette with deep crimson and tarnished gold accents. Clean readable shapes, flat colour areas, no noise texture, no dithering. No text, no letters, no numbers, no grid lines, no ground shadow, no glow halo, no particles, no motion blur.
```

## hero

```
THE HERO: a disgraced cult leader whose body is living darkness. Deep crimson hooded robe reaching the ground, tarnished gold trim along the hem, the sleeve cuffs and the hood edge, a vertical gold band down the front, a round gold medallion on the chest. Inside the hood: a pitch-black void with two glowing amber eyes and a glowing amber grin. A bone-white deer skull sits on top of the hood like a crown, its snout pointing forward over the hood opening, with two brown branching antlers; his left antler (on the viewer's right in the front view) is snapped off halfway and wrapped in a dirty white bandage, and two crossed sticking plasters cover a crack on the skull. His hands are slender black shadow hands. A brown belt with two small red wax seals; a small rolled scroll with a red seal hangs from the belt. At this sprite size keep only details that read: skull, antlers, eyes and grin, gold trim and band, medallion. He keeps the big hood, skull and flaring robe of the concept, but his whole figure must fit the template figure: the same height from the feet to the top of the hood, the antlers rising above it.
```

## walk_down

```
Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell holds one frame of the hero's walk cycle, facing the viewer (walking towards the camera). Frames read left to right, top row then bottom row, exactly like the template. In every cell draw THE HERO in exactly the template's pose: the same position in the cell, the same height, the same feet placement, the same arm swing and the same sway of the robe hem; the feet peek out under the hem as in the template. Every cell shows the same character with identical colours, outline and details; only the pose changes between cells. Keep wide green gaps between the figures; nothing touches the cell borders.
```

## walk_up

```
Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell holds one frame of the hero's walk cycle seen from behind (walking away from the camera): we see the back of the crimson hood, the back of the skull and both antlers from behind (the bandaged broken one is now on the viewer's left), the back of the robe with its gold hem trim; no face, no medallion. Frames read left to right, top row then bottom row, exactly like the template. In every cell draw THE HERO in exactly the template's pose: the same position in the cell, the same height, the same feet placement, the same arm swing and the same sway of the robe hem. Every cell shows the same character with identical colours, outline and details; only the pose changes between cells. Keep wide green gaps between the figures; nothing touches the cell borders.
```

## walk_side

```
Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each cell holds one frame of the hero's walk cycle in side view, facing and walking to the RIGHT: we see his right side in profile, the hood opening and the glowing amber eye on the right, the skull snout pointing right, the antlers rising above the hood, the robe hem swinging. Frames read left to right, top row then bottom row, exactly like the template. In every cell draw THE HERO in exactly the template's pose: the same position in the cell, the same height, the same feet placement, the same arm swing and the same sway of the robe hem. Every cell shows the same character with identical colours, outline and details; only the pose changes between cells. Keep wide green gaps between the figures; nothing touches the cell borders.
```

## Каст и удар (16.10)

Запрос = style + hero + action_<anim> + facing_<dir> + layout. Картинки: шаблон
`tpl_<anim>_<dir>.png`, концепт, лист ходьбы того же направления `walk_<dir>_v1.png` (тот же герой в
размере спрайта), `ref_3d_views.png`; роли - «ref roles v2».

## ref roles v2

```
Four images are attached, each with its own role. IMAGE 1 is the LAYOUT AND POSE TEMPLATE: use it only for the canvas layout, the cell positions, the pose, the size and the position of the figure in every cell; ignore its colours, clothes, horns and drawing style. IMAGE 2 is the CHARACTER REFERENCE (concept art of the same character: identity, outfit, colours, skull, antlers, void face). IMAGE 3 is an APPROVED SPRITE SHEET of the same character in this game's sprite style and size: match its pixel size, palette, outline and level of detail exactly; its poses are a different animation and must not be copied. IMAGE 4 shows the same character as a blocky 3D model from several angles: use it only to understand his shapes from the side and from behind; do not copy its blocky look, its noise texture or its text labels. Pass all four to the image generation tool as reference images.
```

## action_spellcast

```
ANIMATION: casting a spell, empty-handed. Frame by frame as in the template: he stands, draws both black shadow hands in, then raises and spreads both arms with open hands above shoulder height (the wide sleeves fall back and show the slender dark forearms), holds the pose, and lowers them again. The body, head, skull and antlers stay still; only the arms and sleeves move. The scroll stays hanging on the belt.
```

## action_slash

```
ANIMATION: an empty-handed dismissive backhand swipe, like slapping something away (no weapon in his hands). Frame by frame as in the template: he draws his free arm back, then sweeps the open black shadow hand forward and up across, and ends with the arm stretched out. The body, head, skull and antlers stay still; only that arm and its sleeve move; the other arm hangs by his side. The scroll stays hanging on the belt.
```

## facing_down

```
FACING: towards the viewer (front view): we see the void face with the amber eyes and grin, the skull's front with the crossed plasters, the medallion and the gold band down the front; his left antler, the broken bandaged one, is on the viewer's right.
```

## facing_up

```
FACING: away from the viewer (back view): we see the back of the crimson hood, the back of the skull and both antlers from behind (the broken bandaged one is now on the viewer's left), the back of the robe with its gold hem trim; no face, no medallion.
```

## facing_side

```
FACING: to the RIGHT (side view): we see his right side in profile, the hood opening and the glowing amber eye on the right, the skull snout pointing right, the antlers rising above the hood.
```

## layout

```
Output: one 1536x1024 image with the same 4 columns x 2 rows of cells as IMAGE 1 and the same flat pure green (#00FF00) background everywhere around the figures. Each template cell that holds a figure becomes one frame of this animation; cells that are empty in the template stay empty green. Frames read left to right, top row then bottom row, exactly like the template. In every cell draw THE HERO in exactly the template's pose: the same position in the cell, the same height, the same feet placement, the same arm positions. Every cell shows the same character with identical colours, outline and details; only the arms change between cells. Keep wide green gaps between the figures; nothing touches the cell borders.
```
