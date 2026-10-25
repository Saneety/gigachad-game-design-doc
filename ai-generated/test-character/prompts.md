# Тестовый персонаж для инструментов анимации (23.10)

Запрос: спрайт персонажа, у которого хорошо видны руки и ноги, чтобы проверить новый инструмент
анимации (ходьба вправо, атака вправо и остальное). Не персонаж игры: дизайн выбран агентом.

## Файлы
- `raw_side_v1.png` - ответ генератора как есть (1254x1254, пурпурный фон).
- `brawler_side_96.png` - пиксель-арт: холст 96x96, фигура 32x77, ступни на строке 87, альфа только
  0/255, 32 цвета, смотрит вправо.
- `brawler_side_96_x8.png` - он же, увеличен в 8 раз (768x768) без сглаживания.
- `brawler_side_hires.png` - картинка генератора с вырезанным фоном (416x996), не пересобрана в пиксели.
- `ref_style_player_side_x8.png` - референс стиля (игрок в профиль из `.tmp/retro_diffusion_test`, x8).
- `pixelize.py` - обработка: вырезка пурпура, шаг сетки генератора по краям цветов (вышел 12.7 px),
  выборка центра каждой клетки, чистка пикселей с примесью фона, палитра 32 цвета.
  `python pixelize.py raw_side_v1.png OUT brawler_side --canvas 96 --feet 88 --colors 32`

Просили 48 арт-пикселей роста, генератор нарисовал 77: размер взят как нарисовано, без пересэмплинга.

## Retro Diffusion: ходьба вправо (23.10)

Advanced Animation, действие Walking (`rd_advanced_animation__walking`), стартовый кадр
`brawler_side_96.png` (родные пиксели, не x8: увеличенный кадр сайт отклоняет), размер 96x96, 8 кадров,
результат листом PNG. Направления в параметрах нет, оно задаётся картинкой и промптом.

```
walking to the right in place, steady heavy strides, both legs fully pass each other, arms swing opposite to the legs with loose fists, head stays level, slight body bob
```

## Sprite Fusion: ходьба вправо и доводка (23.10)

Человек прогнал этот промпт в Sprite Fusion (бесплатно на сайте): 8 кадров 96x96, 8 fps, 19 цветов.
Экспорт - `sf_walk_raw.png` и `sf_walk_raw.json`. Что было не так:
- в кадрах 1, 3, 5 на ботинках пятна цвета майки (по 100-165 px), в 2, 4, 6, 7 - отдельные красные пиксели;
- 2 цвета не из спрайта: бирюзовый `#092d2b` и зеленовато-чёрный `#13150f` по контуру;
- кадры 2-4 подняты на 1 px над линией ног;
- голова перерисована в каждом кадре заново (между кадрами меняются 57-120 px головы);
- 3 дырки в фигуре (кадры 0 и 4).

`finish_walk.py` чинит всё это: чужие цвета в контур, ниже края майки (строка над первым пикселем
штанов `#7a5f40`) красные и красноватые тёмные - в коричневые ботинка той же светлоты, все кадры на
строку 87, голова (строки 0-30) из кадра 0 со сдвигом каждого кадра до 2 px, дырки заливаются соседним
цветом. Результат - `brawler_walk_side.png` (полоса 8x96, 17 цветов), превью `brawler_walk_side_x4.gif`,
сравнение до/после `brawler_walk_side_compare.png`. `check_strips.py --frame 96 --head-row 30`: ok.

`python finish_walk.py sf_walk_raw.png OUT --head-cut 31`

## Промпт (`codex-imagegen.sh`, `--ref style=ref_style_player_side_x8.png`)

```
Pixel art game sprite of ONE character, full body, strict side view (profile), facing RIGHT. Style of the attached reference: Graveyard Keeper-like pixel art, crisp square pixels, dark warm-brown outline around the whole figure, warm palette with cool shadows, simple flat shading in 2-3 tones per material, light from the top-left. No anti-aliasing, no gradients, no blur.

Character: a stocky young brawler-blacksmith. Short dark-brown hair and a short beard. Sleeveless dark-red tunic that ends at the hips, held by a wide leather belt with a brass buckle. Bare muscular arms with short brown leather bracers on the forearms. Fitted grey-brown trousers and tall dark-brown leather boots. Empty hands clenched into fists. No weapon, no cape, no cloak, no apron, no bag: nothing hangs over the arms or the legs.

Pose (a neutral base pose that is easy to animate): standing upright on flat ground in a relaxed fighting-ready stance, body in profile facing right. The legs are clearly separated with a visible gap between them: the near leg slightly forward, the far leg slightly back, both feet flat on the same ground line, knees very slightly bent. The near arm (the one closer to the viewer) hangs slightly away from the torso, elbow a little bent, fist at hip height, so there is a visible gap between the arm and the body. The far arm is partly visible behind the torso, slightly forward, its fist visible in front of the chest. Every limb reads as a separate shape: upper arm, forearm, fist, thigh, shin, boot.

Size: the character is 48 art pixels tall from the soles of the boots to the top of the hair; each art pixel is a crisp square block of about 16x16 image pixels, so the figure is about 770 image pixels tall. Simplify details to what reads at 48 pixels tall.

Composition: one 1024x1024 image, the single figure centred horizontally with a wide margin on every side, nothing touches the image edges. Background: flat pure magenta (#FF00FF) everywhere around the figure, a single solid colour with no texture, no gradient, no ground, no shadow.

Exclude: text, logos, watermarks, ground shadow, glow, particles, motion blur, a second character, a grid or checkerboard.
```
