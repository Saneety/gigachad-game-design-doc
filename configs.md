# О чем док
Здесь лежат конфиги для игры:
- Таблица констант с константами
- Таблицы сущностей с единой структурой и их значения в JSON

## Правила
Нейронки могут изменять структуру конфигов только после ревью и аппрува от человека.

Когда требуется создать новые конфиги / константы - нейронка спрашивает аппрув у человека и потом добавляет новые конфиги и константы в этот док.

- Структура конфига - таблица с названием столбца и его описанием, тип данных не пишем. Под таблицей - значения всех сущностей в JSON.
- Новые структуры и константы нейронка предлагает сама, когда они нужны, и ждет аппрува. Значения сущностей она выбирает сама, сообщает человеку и записывает сюда, аппрув на них не нужен.
- Пока главнее этот док. Игра читает значения из `game/data/` (файлы `.tres`), поэтому меняем сразу оба места, а если они разошлись - переносим из дока в игру.
- Минимум полей: в структуре только то, что нужно по ТЗ сейчас, без полей "для полноты" и "на будущее". Есть сомнение, нужно ли поле - спросить человека.
- Единая структура: все сущности одного вида заполняют одни и те же поля. Новый вид контента получает свою структуру, контент не хардкодим.
- Новую или измененную структуру нейронка показывает человеку в чате целиком: каждое поле с тем, что оно значит, вложенные списки с отступом.
- Внешний вид живет в сцене сущности, а не в конфиге. Исключение - `icon`: картинка для тулбара и списков, а у предмета своей сцены нет вовсе.
- Id сущности - имя файла конфига (`data/items/iron_ore.tres` -> `iron_ore`), в JSON это ключ. Ссылка на другую сущность в JSON - тоже ее id (`"tool": "pickaxe"`). Сейв ссылается на предметы и постройки по этому id.

## Константы

| Константа | Значение | Описание                                             |
| --------- | -------- | ---------------------------------------------------- |
| CULTISTS  | 2        | сколько культистов у игрока; сторожка берет одного, пока работает |

## Конфиги
### Предметы
Конфиг `ItemDef`, файлы `game/data/items/<id>.tres`.

| Столбец      | Описание                              |
| ------------ | ------------------------------------- |
| id           | имя файла конфига, в JSON это ключ    |
| display_name | название в игре                       |
| icon         | картинка предмета                     |
| max_stack    | сколько штук помещается в одну ячейку |

```json
{
  "blood": {
    "display_name": "Капля крови",
    "icon": "res://assets/icons/blood.png",
    "max_stack": 64
  },
  "blood_chain": {
    "display_name": "Кровавая цепь",
    "icon": "res://assets/icons/blood_chain.png",
    "max_stack": 64
  },
  "blood_copper_ingot": {
    "display_name": "Кровавый медный слиток",
    "icon": "res://assets/icons/blood_copper_ingot.png",
    "max_stack": 64
  },
  "blood_stone": {
    "display_name": "Кровавый камень",
    "icon": "res://assets/icons/blood_stone.png",
    "max_stack": 64
  },
  "bone": {
    "display_name": "Кость",
    "icon": "res://assets/icons/bone.png",
    "max_stack": 64
  },
  "bone_meal": {
    "display_name": "Костяная мука",
    "icon": "res://assets/icons/bone_meal.png",
    "max_stack": 64
  },
  "brick": {
    "display_name": "Кирпич",
    "icon": "res://assets/icons/brick.png",
    "max_stack": 64
  },
  "clay": {
    "display_name": "Глина",
    "icon": "res://assets/icons/clay.png",
    "max_stack": 64
  },
  "coal": {
    "display_name": "Уголь",
    "icon": "res://assets/icons/coal.png",
    "max_stack": 64
  },
  "cobblestone": {
    "display_name": "Булыжник",
    "icon": "res://assets/icons/cobblestone.png",
    "max_stack": 64
  },
  "cobweb": {
    "display_name": "Паутина",
    "icon": "res://assets/icons/cobweb.png",
    "max_stack": 64
  },
  "copper_ingot": {
    "display_name": "Медный слиток",
    "icon": "res://assets/icons/copper_ingot.png",
    "max_stack": 64
  },
  "copper_ore": {
    "display_name": "Медная руда",
    "icon": "res://assets/icons/copper_ore.png",
    "max_stack": 64
  },
  "copper_plate": {
    "display_name": "Медная пластина",
    "icon": "res://assets/icons/copper_plate.png",
    "max_stack": 64
  },
  "corpse_fat": {
    "display_name": "Трупный жир",
    "icon": "res://assets/icons/corpse_fat.png",
    "max_stack": 64
  },
  "flesh": {
    "display_name": "Плоть",
    "icon": "res://assets/icons/flesh.png",
    "max_stack": 64
  },
  "glass": {
    "display_name": "Стекло",
    "icon": "res://assets/icons/glass.png",
    "max_stack": 64
  },
  "head_t1": {
    "display_name": "Голова т1",
    "icon": "res://assets/icons/head_t1.png",
    "max_stack": 64
  },
  "head_t2": {
    "display_name": "Голова т2",
    "icon": "res://assets/icons/head_t2.png",
    "max_stack": 64
  },
  "iron_ingot": {
    "display_name": "Железный слиток",
    "icon": "res://assets/icons/iron_ingot.png",
    "max_stack": 64
  },
  "iron_ore": {
    "display_name": "Железная руда",
    "icon": "res://assets/icons/iron_ore.png",
    "max_stack": 64
  },
  "iron_plate": {
    "display_name": "Железная пластина",
    "icon": "res://assets/icons/iron_plate.png",
    "max_stack": 64
  },
  "leg_t1": {
    "display_name": "Ноги т1",
    "icon": "res://assets/icons/leg_t1.png",
    "max_stack": 64
  },
  "leg_t2": {
    "display_name": "Ноги т2",
    "icon": "res://assets/icons/leg_t2.png",
    "max_stack": 64
  },
  "living_heart": {
    "display_name": "Живое сердце",
    "icon": "res://assets/icons/living_heart.png",
    "max_stack": 1
  },
  "mosquito": {
    "display_name": "Комар",
    "icon": "res://assets/icons/mosquito.png",
    "max_stack": 64
  },
  "planks": {
    "display_name": "Доски",
    "icon": "res://assets/icons/planks.png",
    "max_stack": 64
  },
  "sand": {
    "display_name": "Песок",
    "icon": "res://assets/icons/sand.png",
    "max_stack": 64
  },
  "silver_ore": {
    "display_name": "Серебряная руда",
    "icon": "res://assets/icons/silver_ore.png",
    "max_stack": 64
  },
  "soul": {
    "display_name": "Душа",
    "icon": "res://assets/icons/soul.png",
    "max_stack": 64
  },
  "stick": {
    "display_name": "Палка",
    "icon": "res://assets/icons/stick.png",
    "max_stack": 64
  },
  "stitched_flesh": {
    "display_name": "Сшитая плоть",
    "icon": "res://assets/icons/stitched_flesh.png",
    "max_stack": 64
  },
  "stone": {
    "display_name": "Камень",
    "icon": "res://assets/icons/stone.png",
    "max_stack": 64
  },
  "sulfur": {
    "display_name": "Сера",
    "icon": "res://assets/icons/sulfur.png",
    "max_stack": 64
  },
  "tallow_candle": {
    "display_name": "Сальная свеча",
    "icon": "res://assets/icons/tallow_candle.png",
    "max_stack": 64
  },
  "thread": {
    "display_name": "Нить",
    "icon": "res://assets/icons/thread.png",
    "max_stack": 64
  },
  "torso_t1": {
    "display_name": "Торс т1",
    "icon": "res://assets/icons/torso_t1.png",
    "max_stack": 64
  },
  "torso_t2": {
    "display_name": "Торс т2",
    "icon": "res://assets/icons/torso_t2.png",
    "max_stack": 64
  },
  "undying_flame": {
    "display_name": "Неугасимое пламя",
    "icon": "res://assets/icons/undying_flame.png",
    "max_stack": 1
  },
  "wood": {
    "display_name": "Древесина",
    "icon": "res://assets/icons/wood.png",
    "max_stack": 64
  }
}
```

#### Оружие
Конфиг `WeaponDef`, файлы `game/data/items/<id>.tres`: все столбцы предмета и еще эти.

| Столбец | Описание |
|---|---|
| damage | урон при 100% |
| combo[] | удары комбо по порядку, атаки подряд идут по кругу |
| combo[].damage_percent | доля урона оружия, в процентах |
| combo[].speed | скорость замаха, меньше 1 - медленнее |

```json
{
  "bloodletter": {
    "display_name": "Кровопуск",
    "icon": "res://assets/icons/bloodletter.png",
    "max_stack": 1,
    "damage": 16,
    "combo": [
      { "damage_percent": 100, "speed": 1.0 },
      { "damage_percent": 110, "speed": 1.0 },
      { "damage_percent": 150, "speed": 0.7 }
    ]
  },
  "chain_bloodletter": {
    "display_name": "Кровопуск на цепи",
    "icon": "res://assets/icons/chain_bloodletter.png",
    "max_stack": 1,
    "damage": 24,
    "combo": [
      { "damage_percent": 100, "speed": 1.0 },
      { "damage_percent": 110, "speed": 1.0 },
      { "damage_percent": 150, "speed": 0.7 }
    ]
  },
  "sword": {
    "display_name": "Меч",
    "icon": "res://assets/icons/sword.png",
    "max_stack": 1,
    "damage": 10,
    "combo": [
      { "damage_percent": 100, "speed": 1.0 },
      { "damage_percent": 110, "speed": 1.0 },
      { "damage_percent": 150, "speed": 0.7 }
    ]
  }
}
```

#### Инструменты
Конфиг `ToolDef`, файлы `game/data/items/<id>.tres`: все столбцы предмета и еще эти. Поле с `?` инструмент может не заполнять.

| Столбец       | Описание                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------ |
| kind          | вид инструмента: pickaxe, axe или shovel; у инструмента т0 совпадает с его id              |
| tier          | тир инструмента, 0-2                                                                       |
| power         | на сколько шагов один удар заполняет шкалу добычи                                          |
| ?bonus_item   | id предмета, который с шансом выпадает вместе с ресурсом; пусто - выпадает еще один такой же ресурс |
| ?bonus_chance | шанс бонуса, в процентах                                                                   |

```json
{
  "axe": {
    "display_name": "Топор",
    "icon": "res://assets/icons/axe.png",
    "max_stack": 1,
    "kind": "axe",
    "tier": 0,
    "power": 1
  },
  "bound_gravedigger": {
    "display_name": "Окованная могильщица",
    "icon": "res://assets/icons/bound_gravedigger.png",
    "max_stack": 1,
    "kind": "shovel",
    "tier": 2,
    "power": 3,
    "bonus_item": "bone",
    "bonus_chance": 30
  },
  "bound_headsman": {
    "display_name": "Окованный палач",
    "icon": "res://assets/icons/bound_headsman.png",
    "max_stack": 1,
    "kind": "axe",
    "tier": 2,
    "power": 3,
    "bonus_item": "blood",
    "bonus_chance": 30
  },
  "bound_stonegnawer": {
    "display_name": "Окованный камнегрыз",
    "icon": "res://assets/icons/bound_stonegnawer.png",
    "max_stack": 1,
    "kind": "pickaxe",
    "tier": 2,
    "power": 3,
    "bonus_chance": 30
  },
  "gravedigger": {
    "display_name": "Могильщица",
    "icon": "res://assets/icons/gravedigger.png",
    "max_stack": 1,
    "kind": "shovel",
    "tier": 1,
    "power": 2,
    "bonus_item": "bone",
    "bonus_chance": 15
  },
  "headsman": {
    "display_name": "Палач",
    "icon": "res://assets/icons/headsman.png",
    "max_stack": 1,
    "kind": "axe",
    "tier": 1,
    "power": 2,
    "bonus_item": "blood",
    "bonus_chance": 15
  },
  "pickaxe": {
    "display_name": "Кирка",
    "icon": "res://assets/icons/pickaxe.png",
    "max_stack": 1,
    "kind": "pickaxe",
    "tier": 0,
    "power": 1
  },
  "shovel": {
    "display_name": "Лопата",
    "icon": "res://assets/icons/shovel.png",
    "max_stack": 1,
    "kind": "shovel",
    "tier": 0,
    "power": 1
  },
  "stonegnawer": {
    "display_name": "Камнегрыз",
    "icon": "res://assets/icons/stonegnawer.png",
    "max_stack": 1,
    "kind": "pickaxe",
    "tier": 1,
    "power": 2,
    "bonus_chance": 15
  }
}
```

#### Заклинания
Конфиг `SpellDef`, файлы `game/data/items/<id>.tres`: все столбцы предмета и еще этот. Заклинание выбирают в тулбаре, клик ЛКМ применяет его, заклинание не тратится.

| Столбец | Описание |
|---|---|
| effect | id эффекта, который вешается на того, кто применил заклинание |

```json
{
  "spell_sharpness": {
    "display_name": "Острота",
    "icon": "res://assets/icons/spell_sharpness.png",
    "max_stack": 64,
    "effect": "sharp"
  }
}
```

#### Тела
Конфиг `BodyDef`, файлы `game/data/items/<id>.tres`: все столбцы предмета и еще эти.

| Столбец | Описание |
|---|---|
| max_hp | HP героя в этом теле |
| scene | сцена с видом тела |

```json
{
  "body_t0": {
    "display_name": "Тело т0",
    "icon": "кадр (0, 8, 32x32) из res://assets/player/player_idle.png",
    "max_stack": 1,
    "max_hp": 100,
    "scene": "res://scenes/bodies/body_t0.tscn"
  },
  "body_t1": {
    "display_name": "Тело т1",
    "icon": "res://assets/icons/body_t1.png",
    "max_stack": 1,
    "max_hp": 150,
    "scene": "res://scenes/bodies/body_t1.tscn"
  },
  "body_t2": {
    "display_name": "Тело т2",
    "icon": "res://assets/icons/body_t2.png",
    "max_stack": 1,
    "max_hp": 220,
    "scene": "res://scenes/bodies/body_t2.tscn"
  }
}
```

### Эффекты
Баффы и дебаффы на игроке и мобах. Конфиг `EffectDef`, файлы `game/data/effects/<id>.tres`. Поле с `?` эффект может не заполнять.

| Столбец | Описание |
|---|---|
| id | имя файла конфига, в JSON это ключ |
| display_name | название в тултипе |
| icon | иконка на HUD |
| description | текст тултипа |
| negative | дебафф: красный фон иконки; иначе бафф, зеленый фон |
| seconds | сколько длится; если повесить еще раз, отсчет начинается заново |
| ?damage | урон за тик |
| ?damage_every | секунд между тиками урона |
| ?on_attack_effect | id эффекта, который может повеситься на цель при каждой атаке существа под этим эффектом |
| ?on_attack_chance | шанс этого, в процентах |

```json
{
  "bleed": {
    "display_name": "Кровотечение",
    "icon": "res://assets/icons/effects/bleed.png",
    "description": "5 урона раз в 3 секунды.",
    "negative": true,
    "seconds": 9.0,
    "damage": 5,
    "damage_every": 3.0
  },
  "sharp": {
    "display_name": "Режущий",
    "icon": "res://assets/icons/effects/sharp.png",
    "description": "Каждая атака с шансом 20% вешает на цель Кровотечение.",
    "negative": false,
    "seconds": 15.0,
    "on_attack_effect": "bleed",
    "on_attack_chance": 20
  }
}
```

### Месторождения
Конфиг `DepositDef`, файлы `game/data/deposits/<id>.tres`.

| Столбец | Описание                                                            |
| ------- | ------------------------------------------------------------------- |
| id      | имя файла конфига, в JSON это ключ                                  |
| item    | id предмета, который выпадает, когда шкала добычи заполнится, 1 шт. |
| hits    | сколько ударов заполняют шкалу добычи                               |
| tool    | вид инструмента (`kind` у инструмента), который должен быть выбран в тулбаре для добычи |
| tool_tier | минимальный тир инструмента; инструмент старше тоже подходит      |

```json
{
  "big_tree": {
    "item": "wood",
    "hits": 5,
    "tool": "axe",
    "tool_tier": 0
  },
  "clay": {
    "item": "clay",
    "hits": 3,
    "tool": "shovel",
    "tool_tier": 1
  },
  "coal": {
    "item": "coal",
    "hits": 3,
    "tool": "pickaxe",
    "tool_tier": 0
  },
  "cobblestone": {
    "item": "cobblestone",
    "hits": 4,
    "tool": "pickaxe",
    "tool_tier": 0
  },
  "copper": {
    "item": "copper_ore",
    "hits": 5,
    "tool": "pickaxe",
    "tool_tier": 0
  },
  "iron": {
    "item": "iron_ore",
    "hits": 5,
    "tool": "pickaxe",
    "tool_tier": 1
  },
  "sand": {
    "item": "sand",
    "hits": 3,
    "tool": "shovel",
    "tool_tier": 0
  },
  "silver": {
    "item": "silver_ore",
    "hits": 6,
    "tool": "pickaxe",
    "tool_tier": 1
  },
  "small_tree": {
    "item": "stick",
    "hits": 3,
    "tool": "axe",
    "tool_tier": 0
  },
  "sulfur": {
    "item": "sulfur",
    "hits": 4,
    "tool": "pickaxe",
    "tool_tier": 1
  }
}
```

### Добыча руками
Объекты, из которых предметы достают руками, держа E. Конфиг `HandHarvestDef`, файлы `game/data/hand/<id>.tres`.

| Столбец | Описание                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------- |
| id      | имя файла конфига, в JSON это ключ                                                             |
| items[] | id предметов, которые выпадают по одному в этом порядке; после последнего объект израсходован |
| seconds | сколько секунд держать E на один предмет                                                       |

```json
{
  "axe_tree": {
    "items": ["axe"],
    "seconds": 1.5
  },
  "sword_stone": {
    "items": ["sword"],
    "seconds": 1.5
  },
  "tool_box": {
    "items": ["pickaxe", "shovel"],
    "seconds": 1.5
  }
}
```

### Мобы
Конфиг `MobDef`, файлы `game/data/mobs/<id>.tres`.

| Столбец               | Описание                                                 |
| --------------------- | -------------------------------------------------------- |
| id                    | имя файла конфига, в JSON это ключ                       |
| display_name          | название в игре                                          |
| max_hp                | здоровье                                                 |
| speed                 | скорость ходьбы, пикселей в секунду                      |
| damage                | урон одного удара по игроку                              |
| loot[]                | что может выпасть при смерти, каждая строка бросает свой шанс |
| loot[].item           | id предмета                                              |
| loot[].chance_percent | шанс выпадения, в процентах                              |

```json
{
  "candle_matron": {
    "display_name": "Свечная матрона",
    "max_hp": 500,
    "speed": 40.0,
    "damage": 15,
    "loot": [
      { "item": "undying_flame", "chance_percent": 100 }
    ]
  },
  "flesh_golem": {
    "display_name": "Мясной голем",
    "max_hp": 400,
    "speed": 18.0,
    "damage": 25,
    "loot": [
      { "item": "living_heart", "chance_percent": 100 }
    ]
  },
  "ghoul": {
    "display_name": "Упырь",
    "max_hp": 60,
    "speed": 22.0,
    "damage": 18,
    "loot": [
      { "item": "corpse_fat", "chance_percent": 100 }
    ]
  },
  "skeleton": {
    "display_name": "Скелет",
    "max_hp": 18,
    "speed": 52.0,
    "damage": 8,
    "loot": [
      { "item": "bone", "chance_percent": 100 },
      { "item": "soul", "chance_percent": 50 }
    ]
  },
  "spider": {
    "display_name": "Паук",
    "max_hp": 12,
    "speed": 80.0,
    "damage": 7,
    "loot": [
      { "item": "cobweb", "chance_percent": 100 }
    ]
  },
  "zombie": {
    "display_name": "Зомби",
    "max_hp": 30,
    "speed": 28.0,
    "damage": 10,
    "loot": [
      { "item": "flesh", "chance_percent": 100 },
      { "item": "soul", "chance_percent": 50 }
    ]
  }
}
```

### Постройки
Конфиг `BuildingDef`, файлы `game/data/buildings/<id>.tres`.

<!-- col-widths: 168 867 -->

| Столбец           | Описание                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| id                | имя файла конфига, в JSON это ключ                                                    |
| display_name      | название в игре                                                                       |
| icon              | картинка в тулбаре и в списке экрана строительства                                    |
| description       | текст блока описания на экране строительства                                         |
| scene             | сцена постройки, в ней вид и размер; встает на место площадки, когда постройка достроена (ленту, объединитель и разъединитель кладут сразу) |
| cost              | цена в этом порядке: id предмета -> сколько штук                                      |
| recipes[]         | крафты постройки                                                                      |
| recipes[].inputs  | что входит в один крафт: id предмета -> сколько штук                                   |
| recipes[].output  | id предмета, который выходит, 1 шт. за крафт                                          |
| recipes[].seconds | сколько секунд идет один крафт                                                        |
| tier              | тир постройки, 1-3: в тулбаре LShift + колесо листает открытые тиры одной постройки    |
| base              | id постройки тира 1, тиром которой эта является; пусто - это постройка тира 1         |
| altar_tier        | с какого тира алтаря постройка открыта                                                |

```json
{
  "blood_vessel": {
    "display_name": "Резервуар крови",
    "icon": "res://assets/icons/buildings/blood_vessel.png",
    "description": "Комары с входной ленты летят на юг за кровью и приносят по капле. Капли уходят на выходную ленту.",
    "scene": "res://scenes/buildings/blood_vessel.tscn",
    "cost": { "glass": 4, "copper_ingot": 2 },
    "recipes": [
      { "inputs": { "mosquito": 1 }, "output": "blood", "seconds": 30.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "chest": {
    "display_name": "Сундук",
    "icon": "res://assets/icons/buildings/chest.png",
    "description": "Хранит 27 стаков. Забирает всё с входных лент и отдаёт содержимое на выходные.",
    "scene": "res://scenes/buildings/chest.tscn",
    "cost": { "stick": 2, "wood": 2 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "constructor": {
    "display_name": "Конструктор",
    "icon": "res://assets/icons/buildings/constructor.png",
    "description": "Собирает тело из частей, пока зажата F. Готовое тело стоит рядом: зажми E, чтобы переселиться в него.",
    "scene": "res://scenes/buildings/constructor.tscn",
    "cost": { "blood_copper_ingot": 6, "soul": 10 },
    "recipes": [
      { "inputs": { "head_t1": 1, "torso_t1": 1, "leg_t1": 1 }, "output": "body_t1", "seconds": 10.0 },
      { "inputs": { "head_t2": 1, "torso_t2": 1, "leg_t2": 1 }, "output": "body_t2", "seconds": 15.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "conveyor": {
    "display_name": "Конвейерная лента",
    "icon": "res://assets/icons/buildings/conveyor.png",
    "description": "Везёт предметы. Ставится сразу: зажми ЛКМ и веди курсор, R поворачивает.",
    "scene": "res://scenes/buildings/conveyor.tscn",
    "cost": { "stick": 1 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "forge": {
    "display_name": "Простая кузница",
    "icon": "res://assets/icons/buildings/forge.png",
    "description": "Ставится на ленту. Куёт медные пластины, пока зажата F, или сама из слитков с лент под ней.",
    "scene": "res://scenes/buildings/forge.tscn",
    "cost": { "copper_ingot": 10, "wood": 4 },
    "recipes": [
      { "inputs": { "copper_ingot": 2 }, "output": "copper_plate", "seconds": 6.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "forge_t2": {
    "display_name": "Кузница т2",
    "icon": "res://assets/icons/buildings/forge_t2.png",
    "description": "Тир 2 простой кузницы. Куёт кровавые цепи и железные пластины, и всё, что куёт простая кузница.",
    "scene": "res://scenes/buildings/forge_t2.tscn",
    "cost": { "iron_ingot": 10, "stone": 10 },
    "recipes": [
      { "inputs": { "iron_ingot": 1, "blood": 2 }, "output": "blood_chain", "seconds": 5.0 },
      { "inputs": { "iron_ingot": 2 }, "output": "iron_plate", "seconds": 8.0 },
      { "inputs": { "copper_ingot": 2 }, "output": "copper_plate", "seconds": 6.0 }
    ],
    "tier": 2,
    "base": "forge",
    "altar_tier": 2
  },
  "furnace": {
    "display_name": "Простая печь",
    "icon": "res://assets/icons/buildings/furnace.png",
    "description": "Ставится на ленту. Сама плавит руду в слитки и песок в стекло, пока в ней есть уголь. Руду, песок и уголь берёт и с лент под ней.",
    "scene": "res://scenes/buildings/furnace.tscn",
    "cost": { "copper_ore": 1 },
    "recipes": [
      { "inputs": { "copper_ore": 1 }, "output": "copper_ingot", "seconds": 5.0 },
      { "inputs": { "sand": 3 }, "output": "glass", "seconds": 3.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "furnace_t2": {
    "display_name": "Печь т2",
    "icon": "res://assets/icons/buildings/furnace_t2.png",
    "description": "Тир 2 простой печи. Плавит ещё железную руду в железный слиток и глину в кирпич, пока в ней есть уголь.",
    "scene": "res://scenes/buildings/furnace_t2.tscn",
    "cost": { "stone": 20, "copper_ingot": 10, "blood_stone": 4 },
    "recipes": [
      { "inputs": { "iron_ore": 1 }, "output": "iron_ingot", "seconds": 6.0 },
      { "inputs": { "clay": 2 }, "output": "brick", "seconds": 4.0 },
      { "inputs": { "copper_ore": 1 }, "output": "copper_ingot", "seconds": 5.0 },
      { "inputs": { "sand": 3 }, "output": "glass", "seconds": 3.0 }
    ],
    "tier": 2,
    "base": "furnace",
    "altar_tier": 2
  },
  "hunter_lodge": {
    "display_name": "Охотничья сторожка",
    "icon": "res://assets/icons/buildings/hunter_lodge.png",
    "description": "Ставится рядом с боевым энкаунтером. E назначает в неё культиста или снимает его. С культистом сторожка добывает лут с мобов энкаунтера и отдаёт его на выходные ленты.",
    "scene": "res://scenes/buildings/hunter_lodge.tscn",
    "cost": { "wood": 10, "stick": 10, "copper_ingot": 2 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "macerator": {
    "display_name": "Простая дробилка",
    "icon": "res://assets/icons/buildings/macerator.png",
    "description": "Ставится на ленту. Перемалывает кости в костяную муку: по F или сама, с ленты под ней.",
    "scene": "res://scenes/buildings/macerator.tscn",
    "cost": { "wood": 10, "copper_ore": 5 },
    "recipes": [
      { "inputs": { "bone": 1 }, "output": "bone_meal", "seconds": 2.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "merger": {
    "display_name": "Объединитель",
    "icon": "res://assets/icons/buildings/merger.png",
    "description": "Собирает до 3 входных лент в одну выходную, по очереди.",
    "scene": "res://scenes/buildings/merger.tscn",
    "cost": { "wood": 1 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "quarry": {
    "display_name": "Каменоломня",
    "icon": "res://assets/icons/buildings/quarry.png",
    "description": "Ставится на ленту. Обтёсывает булыжник в камень: по F или сама, с ленты под ней.",
    "scene": "res://scenes/buildings/quarry.tscn",
    "cost": { "wood": 10, "copper_plate": 2 },
    "recipes": [
      { "inputs": { "cobblestone": 1 }, "output": "stone", "seconds": 3.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "ritual_circle": {
    "display_name": "Ритуальный круг",
    "icon": "res://assets/icons/buildings/ritual_circle.png",
    "description": "Ставится на ленту. Крафтит комаров, кровавый камень и кровавый медный слиток: по F или сам, с лент под ним.",
    "scene": "res://scenes/buildings/ritual_circle.tscn",
    "cost": { "stone": 10, "bone": 10, "soul": 5 },
    "recipes": [
      { "inputs": { "bone_meal": 1, "flesh": 1 }, "output": "mosquito", "seconds": 5.0 },
      { "inputs": { "stone": 1, "blood": 1 }, "output": "blood_stone", "seconds": 6.0 },
      { "inputs": { "copper_ingot": 1, "blood": 2 }, "output": "blood_copper_ingot", "seconds": 8.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "ritual_circle_t2": {
    "display_name": "Ритуальный круг т2",
    "icon": "res://assets/icons/buildings/ritual_circle_t2.png",
    "description": "Тир 2 ритуального круга. Крафтит ещё сальные свечи и сшитую плоть.",
    "scene": "res://scenes/buildings/ritual_circle_t2.tscn",
    "cost": { "blood_stone": 20, "soul": 10, "iron_ingot": 4 },
    "recipes": [
      { "inputs": { "thread": 1, "corpse_fat": 1 }, "output": "tallow_candle", "seconds": 5.0 },
      { "inputs": { "thread": 2, "flesh": 2 }, "output": "stitched_flesh", "seconds": 6.0 },
      { "inputs": { "bone_meal": 1, "flesh": 1 }, "output": "mosquito", "seconds": 5.0 },
      { "inputs": { "stone": 1, "blood": 1 }, "output": "blood_stone", "seconds": 6.0 },
      { "inputs": { "copper_ingot": 1, "blood": 2 }, "output": "blood_copper_ingot", "seconds": 8.0 }
    ],
    "tier": 2,
    "base": "ritual_circle",
    "altar_tier": 2
  },
  "sawmill": {
    "display_name": "Лесопилка",
    "icon": "res://assets/icons/buildings/sawmill.png",
    "description": "Ставится на ленту. Пилит древесину в доски: по F или сама, с ленты под ней.",
    "scene": "res://scenes/buildings/sawmill.tscn",
    "cost": { "stone": 10, "copper_plate": 3 },
    "recipes": [
      { "inputs": { "wood": 1 }, "output": "planks", "seconds": 2.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 2
  },
  "spinning_wheel": {
    "display_name": "Прялка",
    "icon": "res://assets/icons/buildings/spinning_wheel.png",
    "description": "Ставится на ленту. Прядёт паутину в нить: по F или сама, с ленты под ней.",
    "scene": "res://scenes/buildings/spinning_wheel.tscn",
    "cost": { "planks": 10, "copper_ingot": 4 },
    "recipes": [
      { "inputs": { "cobweb": 2 }, "output": "thread", "seconds": 3.0 }
    ],
    "tier": 1,
    "base": "",
    "altar_tier": 2
  },
  "splitter": {
    "display_name": "Разъединитель",
    "icon": "res://assets/icons/buildings/splitter.png",
    "description": "Делит входную ленту на выходы по очереди, до 3. Занятый выход пропускает.",
    "scene": "res://scenes/buildings/splitter.tscn",
    "cost": { "wood": 1 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  },
  "trash_hole": {
    "display_name": "Помойка",
    "icon": "res://assets/icons/buildings/trash_hole.png",
    "description": "Удаляет всё, что приезжает по ленте или что в неё положить.",
    "scene": "res://scenes/buildings/trash_hole.tscn",
    "cost": { "wood": 1 },
    "recipes": [],
    "tier": 1,
    "base": "",
    "altar_tier": 1
  }
}
```

### Рецепты алтаря
Конфиг `AltarRecipeDef`, файлы `game/data/altar/<id>.tres`.

| Столбец | Описание                                                    |
| ------- | ----------------------------------------------------------- |
| id      | имя файла конфига, в JSON это ключ                          |
| center  | id предмета, который кладут в центр алтаря, 1 шт.           |
| slots   | что разложить по пьедесталам: id предмета -> сколько штук, по 1 шт. на пьедестал |
| output  | id предмета, который появляется в центре алтаря, 1 шт.      |

```json
{
  "bloodletter": {
    "center": "sword",
    "slots": { "copper_plate": 1, "blood_copper_ingot": 1 },
    "output": "bloodletter"
  },
  "bound_gravedigger": {
    "center": "gravedigger",
    "slots": { "iron_plate": 1, "blood_chain": 2 },
    "output": "bound_gravedigger"
  },
  "bound_headsman": {
    "center": "headsman",
    "slots": { "iron_plate": 1, "blood_chain": 2 },
    "output": "bound_headsman"
  },
  "bound_stonegnawer": {
    "center": "stonegnawer",
    "slots": { "iron_plate": 1, "blood_chain": 2 },
    "output": "bound_stonegnawer"
  },
  "chain_bloodletter": {
    "center": "bloodletter",
    "slots": { "iron_plate": 1, "blood_chain": 2 },
    "output": "chain_bloodletter"
  },
  "gravedigger": {
    "center": "shovel",
    "slots": { "copper_plate": 1, "blood_copper_ingot": 1 },
    "output": "gravedigger"
  },
  "headsman": {
    "center": "axe",
    "slots": { "copper_plate": 1, "blood_copper_ingot": 1 },
    "output": "headsman"
  },
  "spell_sharpness": {
    "center": "soul",
    "slots": { "blood_copper_ingot": 2 },
    "output": "spell_sharpness"
  },
  "stonegnawer": {
    "center": "pickaxe",
    "slots": { "copper_plate": 1, "blood_copper_ingot": 1 },
    "output": "stonegnawer"
  },
  "t1_body": {
    "center": "flesh",
    "slots": { "copper_ingot": 1, "bone": 1 },
    "output": "torso_t1"
  },
  "t1_head": {
    "center": "flesh",
    "slots": { "coal": 1, "blood": 1 },
    "output": "head_t1"
  },
  "t1_leg": {
    "center": "flesh",
    "slots": { "bone": 1, "flesh": 1 },
    "output": "leg_t1"
  },
  "t2_body": {
    "center": "torso_t1",
    "slots": { "stitched_flesh": 3, "blood_stone": 1 },
    "output": "torso_t2"
  },
  "t2_head": {
    "center": "head_t1",
    "slots": { "stitched_flesh": 2, "soul": 1 },
    "output": "head_t2"
  },
  "t2_leg": {
    "center": "leg_t1",
    "slots": { "stitched_flesh": 2, "bone": 1 },
    "output": "leg_t2"
  }
}
```

### Тиры алтаря
Конфиг `AltarTierDef`, файлы `game/data/altar_tiers/<id>.tres`. Тир 1 алтарь получает, когда разобраны кучи мусора вокруг руин; следующие тиры - когда конвейер принесет в алтарь всю цену тира.

| Столбец   | Описание                                                                                 |
| --------- | ---------------------------------------------------------------------------------------- |
| id        | имя файла конфига, в JSON это ключ                                                       |
| tier      | номер тира                                                                               |
| cost      | что конвейер должен принести в алтарь для этого тира: id предмета -> сколько штук          |
| knowledge | id знания, которое надо исследовать, прежде чем алтарь начнет брать цену тира; пусто - не нужно |
| pedestals | сколько пьедесталов у алтаря на этом тире                                                |

```json
{
  "altar_t1": {
    "tier": 1,
    "cost": {},
    "knowledge": "",
    "pedestals": 2
  },
  "altar_t2": {
    "tier": 2,
    "cost": { "blood_stone": 100, "living_heart": 1 },
    "knowledge": "",
    "pedestals": 4
  },
  "altar_t3": {
    "tier": 3,
    "cost": { "tallow_candle": 100, "blood_chain": 100, "undying_flame": 1 },
    "knowledge": "rite_altar_t3",
    "pedestals": 6
  }
}
```

### Блокеры регионов
Препятствия на пути в регион: недостроенный мост, обрушенные ворота, дверь логова. Игрок вкладывает в блокер его цену, как в площадку стройки, и путь открывается. Конфиг `BlockerDef`, файлы `game/data/blockers/<id>.tres`.

| Столбец      | Описание                                            |
| ------------ | --------------------------------------------------- |
| id           | имя файла конфига, в JSON это ключ                  |
| display_name | название в игре                                     |
| cost         | что вложить, в этом порядке: id предмета -> сколько штук |

```json
{
  "bridge": {
    "display_name": "Недостроенный мост",
    "cost": { "planks": 20, "stone": 20, "copper_plate": 5 }
  },
  "gates": {
    "display_name": "Обрушенные ворота",
    "cost": { "brick": 30 }
  },
  "lair_door": {
    "display_name": "Дверь логова некромантов",
    "cost": { "blood_copper_ingot": 5 }
  }
}
```

### Знания
Узлы графа в Некрономиконе. Состояния идут по порядку: знание переходит в следующее, когда выполнены все требования этого состояния. Конфиг `KnowledgeDef`, файлы `game/data/knowledge/<id>.tres`.

| Столбец                        | Описание                                                                 |
| ------------------------------ | ------------------------------------------------------------------------ |
| id                             | имя файла конфига, в JSON это ключ                                       |
| display_name                   | название в книге                                                         |
| tab                            | вкладка книги, на графе которой лежит знание                             |
| parents                        | id знаний, от которых на графе идет линия к этому                        |
| states[]                       | состояния по порядку                                                     |
| states[].requirements[]        | требования состояния, все должны быть выполнены                          |
| states[].requirements[].type   | see - подойти ближе 5 клеток, take - взять в инвентарь, craft - скрафтить на алтаре, visit - войти в точку интереса, produce - постройки сделали count штук |
| states[].requirements[].target | id предмета, моба, месторождения, постройки или точки интереса           |
| states[].requirements[].count  | для produce: сколько штук                                                |
| unlocks                        | id того, что открывает последнее состояние (тир алтаря `altar_t3`); пусто - ничего |

```json
{
  "blood": {
    "display_name": "Капля крови",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "blood_vessel" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "blood" }
        ]
      }
    ],
    "unlocks": ""
  },
  "bone": {
    "display_name": "Кость",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "skeleton" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "bone" }
        ]
      }
    ],
    "unlocks": ""
  },
  "clay": {
    "display_name": "Глина",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "clay" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "clay" }
        ]
      }
    ],
    "unlocks": ""
  },
  "coal": {
    "display_name": "Уголь",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "coal" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "coal" }
        ]
      }
    ],
    "unlocks": ""
  },
  "cobblestone": {
    "display_name": "Булыжник",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "cobblestone" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "cobblestone" }
        ]
      }
    ],
    "unlocks": ""
  },
  "cobweb": {
    "display_name": "Паутина",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "spider" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "cobweb" }
        ]
      }
    ],
    "unlocks": ""
  },
  "copper_ore": {
    "display_name": "Медная руда",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "copper" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "copper_ore" }
        ]
      }
    ],
    "unlocks": ""
  },
  "corpse_fat": {
    "display_name": "Трупный жир",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "ghoul" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "corpse_fat" }
        ]
      }
    ],
    "unlocks": ""
  },
  "flesh": {
    "display_name": "Плоть",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "zombie" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "flesh" }
        ]
      }
    ],
    "unlocks": ""
  },
  "iron_ore": {
    "display_name": "Железная руда",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "iron" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "iron_ore" }
        ]
      }
    ],
    "unlocks": ""
  },
  "living_heart": {
    "display_name": "Живое сердце",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "flesh_golem" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "living_heart" }
        ]
      }
    ],
    "unlocks": ""
  },
  "rite_altar_t3": {
    "display_name": "Обряд алтаря т3",
    "tab": "Кровь",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "ghoul" },
          { "type": "visit", "target": "poi_2_1_1" },
          { "type": "visit", "target": "poi_2_1_2" },
          { "type": "visit", "target": "poi_2_2_1" },
          { "type": "visit", "target": "poi_2_2_2" },
          { "type": "craft", "target": "torso_t2" },
          { "type": "produce", "target": "tallow_candle", "count": 50 }
        ]
      }
    ],
    "unlocks": "altar_t3"
  },
  "sand": {
    "display_name": "Песок",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "sand" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "sand" }
        ]
      }
    ],
    "unlocks": ""
  },
  "silver_ore": {
    "display_name": "Серебряная руда",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "silver" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "silver_ore" }
        ]
      }
    ],
    "unlocks": ""
  },
  "soul": {
    "display_name": "Душа",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "zombie" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "soul" }
        ]
      }
    ],
    "unlocks": ""
  },
  "stick": {
    "display_name": "Палка",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "small_tree" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "stick" }
        ]
      }
    ],
    "unlocks": ""
  },
  "sulfur": {
    "display_name": "Сера",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "sulfur" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "sulfur" }
        ]
      }
    ],
    "unlocks": ""
  },
  "undying_flame": {
    "display_name": "Неугасимое пламя",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "candle_matron" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "undying_flame" }
        ]
      }
    ],
    "unlocks": ""
  },
  "wood": {
    "display_name": "Древесина",
    "tab": "Ремесло",
    "parents": [],
    "states": [
      {
        "requirements": [
          { "type": "see", "target": "big_tree" }
        ]
      },
      {
        "requirements": [
          { "type": "take", "target": "wood" }
        ]
      }
    ],
    "unlocks": ""
  }
}
```
