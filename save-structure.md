# О чем док
Здесь описана структура сейв файла игрока. Структура сейв-файла должна быть в формате JSON. 

Нейронки могут изменять структуру сейв файла только после ревью и аппрува от человека.

## Структура сейв файла

Правила:
- Один файл JSON. Пропущенное поле берется из сцен (`world.tscn`, `player.tscn`).
- Id предмета или постройки - имя файла конфига (`data/items/iron_ore.tres` -> `iron_ore`).
- Объекты из `world.tscn` хранятся под именем узла (`CoalDeposit2`) и только если их состояние изменилось. Объект сдвинули в редакторе - состояние осталось. Переименовали - объект начинает с начального состояния.

Полный пример:

```json
{
  "version": 1,
  "player": {
    "position": [12.0, -40.5],
    "facing": "down",
    "hp": 120,
    "body": "body_t1",
    "effects": [{ "effect": "sharp", "left": 12.5, "tick_left": 0.0 }],
    "selected_slot": 0,
    "slots": [
      { "slot": 0, "item": "sword", "count": 1 },
      { "slot": 9, "item": "copper_ore", "count": 37 }
    ],
    "shortcuts": [
      { "slot": 3, "building": "furnace" }
    ],
    "research": {
      "book": true,
      "seen": ["copper_ore", "coal"],
      "taken": ["copper_ore"],
      "crafted": ["head_t1"],
      "visited": ["poi_1_1"],
      "produced": [{ "item": "copper_ingot", "count": 12 }],
      "records": [{ "knowledge": "copper_ore", "state": 1 }],
      "unread": ["copper_ore"],
      "updated": []
    }
  },
  "world": {
    "deposits": {
      "CoalDeposit2": { "progress": 2 }
    },
    "hand_harvests": {
      "SwordStone": { "taken": 1, "progress": 0.0 }
    },
    "altar": {
      "tier": 1, "upgrade": [{ "item": "blood_stone", "count": 40 }],
      "center": "flesh", "slots": [{ "slot": 0, "item": "coal" }], "result": null
    },
    "blockers": {
      "Bridge": { "opened": true },
      "Gates": { "put": { "brick": 10 }, "progress": 1 }
    },
    "bosses": {
      "GolemPit": {
        "summoned": true,
        "golem": { "position": [-660.0, -20.0], "home": [-660.0, -40.0], "hp": 300, "effects": [], "asleep": false }
      },
      "CandleMatron": { "position": [1010.0, 40.0], "home": [1010.0, 40.0], "hp": 220, "effects": [], "asleep": true }
    },
    "spawners": {
      "ZombieCamp": {
        "cooldown_left": 0.0,
        "mobs": [
          {
            "position": [300.0, 180.0], "home": [310.0, 170.0], "hp": 12,
            "effects": [{ "effect": "bleed", "left": 6.0, "tick_left": 0.5 }]
          }
        ]
      },
      "SkeletonAmbush": { "fired": true, "mobs": [] }
    },
    "sites": [
      { "building": "macerator", "position": [64.0, 96.0], "put": { "wood": 3 }, "progress": 1 }
    ],
    "buildings": [
      {
        "building": "macerator", "position": [128.0, 96.0], "recipe": "bone_meal", "progress": 0.5,
        "collected": [{ "item": "bone", "count": 1 }], "output": { "item": "bone_meal", "count": 2 }, "belt_progress": 0.8
      },
      {
        "building": "furnace", "position": [192.0, 96.0],
        "input": { "item": "copper_ore", "count": 3 },
        "fuel": { "item": "coal", "count": 2 },
        "output": { "item": "copper_ingot", "count": 5 },
        "energy": 12.5, "progress": 2.0
      },
      { "building": "chest", "position": [272.0, 48.0], "slots": [{ "slot": 0, "item": "coal", "count": 10 }] },
      {
        "building": "conveyor", "position": [304.0, 48.0], "direction": "right",
        "items": [{ "item": "coal", "at": 0.6 }]
      },
      { "building": "merger", "position": [336.0, 48.0], "direction": "right", "items": [{ "item": "sand", "at": 0.3 }] },
      { "building": "blood_vessel", "position": [-272.0, 48.0], "output": { "item": "blood", "count": 2 }, "flights": [4.5] },
      { "building": "constructor", "position": [-352.0, 128.0], "recipe": "body_t1", "progress": 0.0, "body": "body_t1" },
      { "building": "hunter_lodge", "position": [96.0, -224.0], "cultist": true, "progress": 4.5, "buffer": ["flesh"] }
    ],
    "pickups": [
      { "item": "coal", "count": 1, "position": [40.0, 10.0] }
    ]
  }
}
```

Версия и игрок:

| Путь                          | Тип            | Пример          | Что хранит                                     |
| ----------------------------- | -------------- | --------------- | ---------------------------------------------- |
| `version`                     | int            | `1`             | версия формата; сейв новее игры не грузится    |
| `player.position`             | [float, float] | `[12.0, -40.5]` | где стоит персонаж                             |
| `player.facing`               | string         | `"down"`        | куда смотрит: `up`, `down`, `left`, `right`    |
| `player.hp`                   | int            | `85`            | текущее HP                                     |
| `player.body`                 | string         | `"body_t1"`     | в каком теле герой; если поля нет - т0         |
| `player.effects[].effect`     | string         | `"sharp"`       | id эффекта                                     |
| `player.effects[].left`       | float          | `12.5`          | секунд до конца эффекта                        |
| `player.effects[].tick_left`  | float          | `1.2`           | секунд до следующего урона                     |
| `player.selected_slot`        | int            | `0`             | выбранный слот тулбара, 0-8; -1 - ничего не выбрано |
| `player.slots[].slot`         | int            | `9`             | номер непустого слота: 0-8 тулбар, 9-35 рюкзак |
| `player.slots[].item`         | string         | `"iron_ore"`    | id предмета                                    |
| `player.slots[].count`        | int            | `37`            | сколько штук                                   |
| `player.shortcuts[].slot`     | int            | `3`             | слот тулбара с ярлыком постройки               |
| `player.shortcuts[].building` | string         | `"furnace"`     | id постройки                                   |
| `player.research.book` | bool | `true` | Некрономикон найден: книга открывается |
| `player.research.seen[]` | array[string] | `["copper_ore"]` | id предметов, мобов, месторождений и построек, к которым герой подходил ближе 5 клеток |
| `player.research.taken[]` | array[string] | `["copper_ore"]` | id предметов, которые побывали в инвентаре |
| `player.research.crafted[]` | array[string] | `["head_t1"]` | id того, что скрафчено на алтаре |
| `player.research.visited[]` | array[string] | `["poi_1_1"]` | id точек интереса, в которые герой входил |
| `player.research.produced[].item` | string | `"copper_ingot"` | id предмета, который делали постройки |
| `player.research.produced[].count` | int | `12` | сколько штук его сделали постройки за игру |
| `player.research.records[].knowledge` | string | `"copper_ore"` | id знания с записью в книге; записи идут в том порядке, в каком появились |
| `player.research.records[].state` | int | `1` | до какого состояния знание дошло этой записью, с 1 |
| `player.research.unread[]` | array[string] | `["copper_ore"]` | id знаний, которые в книге светятся как новые: игрок их еще ни разу не читал |
| `player.research.updated[]` | array[string] | `["iron_ore"]` | id прочитанных знаний, у которых появилось новое состояние: в книге на ноде мерцает значок обновления |

Объекты, которые стоят в `world.tscn`:

| Путь | Тип | Пример | Что хранит |
|---|---|---|---|
| `world.deposits.<узел>.progress` | int | `2` | ударов с последнего выпадения предмета |
| `world.hand_harvests.<узел>.taken` | int | `1` | сколько предметов уже добыто; добыты все - объекта нет |
| `world.hand_harvests.<узел>.progress` | float | `0.7` | секунд работы над текущим предметом |
| `world.altar.tier` | int | `1` | тир алтаря: 0 - руины, 1-3 |
| `world.altar.cleared[]` | array[int] | `[1]` | только у руин: разобранные кучи мусора, 0 - камни, 1 - коряги, 2 - земля |
| `world.altar.upgrade[]` | [{item, count}] | `[{ "item": "blood_stone", "count": 40 }]` | что конвейер уже принес в алтарь в цену следующего тира |
| `world.altar.center` | string или null | `"flesh"` | предмет в центре алтаря |
| `world.altar.slots[].slot` | int | `2` | номер пьедестала с предметом, 0-5 |
| `world.altar.slots[].item` | string | `"bone"` | что лежит на пьедестале |
| `world.altar.result` | string или null | `"head_t1"` | готовый результат в центре |
| `world.spawners.<узел>.fired` | bool | `true` | только у засады: уже сработала |
| `world.spawners.<узел>.cooldown_left` | float | `12.5` | только у лагеря: секунд до новой партии |
| `world.spawners.<узел>.mobs[].position` | [float, float] | `[300.0, 180.0]` | где стоит живой моб; его вид задан точкой спавна |
| `world.spawners.<узел>.mobs[].home` | [float, float] | `[310.0, 170.0]` | куда моб возвращается и от чего считается предел погони |
| `world.spawners.<узел>.mobs[].hp` | int | `12` | текущее HP моба |
| `world.spawners.<узел>.mobs[].effects[]` | как у игрока | `[{ "effect": "bleed", "left": 6.0, "tick_left": 0.5 }]` | эффекты на мобе |
| `world.blockers.<узел>.opened` | bool | `true` | блокер открыт, путь свободен; тогда других полей нет |
| `world.blockers.<узел>.put` | объект id -> int | `{ "brick": 10 }` | сколько ресурсов уже вложено в закрытый блокер |
| `world.blockers.<узел>.progress` | int | `1` | ударов с последней вложенной штуки |
| `world.bosses.<узел>.defeated` | bool | `true` | босс убит; тогда других полей нет |
| `world.bosses.GolemPit.put` | int | `12` | сколько плоти уже вложено в яму голема |
| `world.bosses.GolemPit.progress` | int | `1` | ударов с последней вложенной плоти |
| `world.bosses.GolemPit.summoned` | bool | `true` | голем призван |
| `world.bosses.GolemPit.golem` | как у босса из сцены | `{ "position": [-660.0, -20.0], "home": [-660.0, -40.0], "hp": 300, "effects": [], "asleep": false }` | призванный голем |
| `world.bosses.<узел>.position` | [float, float] | `[1010.0, 40.0]` | босс, который стоит в сцене (свечная матрона): где он |
| `world.bosses.<узел>.home` | [float, float] | `[1010.0, 40.0]` | куда босс возвращается |
| `world.bosses.<узел>.hp` | int | `220` | текущее HP босса |
| `world.bosses.<узел>.effects[]` | как у игрока | `[]` | эффекты на боссе |
| `world.bosses.<узел>.asleep` | bool | `true` | босс спит, пока игрок не войдет в его зал |

Большое дерево, которое появляется на месте дерева с топором, хранится в `world.deposits` под именем `AxeTree_used`.

Поля `world.altar.laid` больше нет: если оно есть в старом сейве, его предметы при загрузке падают на землю у алтаря.

У дробилки поля `input` больше нет: если оно есть в старом сейве, кость из него читается как `collected`.

То, что появилось за время игры:

| Путь | Тип | Пример | Что хранит |
|---|---|---|---|
| `world.sites[].building` | string | `"macerator"` | id постройки на площадке |
| `world.sites[].position` | [float, float] | `[64.0, 96.0]` | центр площадки |
| `world.sites[].put` | объект id -> int | `{ "wood": 3 }` | сколько ресурсов уже вложено |
| `world.sites[].progress` | int | `1` | ударов молотком с последней вложенной штуки |
| `world.buildings[].building` | string | `"furnace"` | id постройки |
| `world.buildings[].position` | [float, float] | `[192.0, 96.0]` | центр постройки |
| `world.buildings[].recipe` | string или null | `"bone_meal"` | кроме печи: выбранный рецепт, записан как id результата |
| `world.buildings[].progress` | float | `0.5` | секунд крафта или плавки текущей штуки; у сторожки охотника - секунд текущей охоты |
| `world.buildings[].input` | {item, count} или null | `{ "item": "iron_ore", "count": 3 }` | только печь: что плавить |
| `world.buildings[].collected[]` | [{item, count}] | `[{ "item": "iron_ingot", "count": 3 }]` | дробилка и кузница: что уже приехало с лент на текущую штуку |
| `world.buildings[].fuel` | {item, count} или null | `{ "item": "coal", "count": 2 }` | только печь: топливо |
| `world.buildings[].output` | {item, count} или null | `{ "item": "iron_ingot", "count": 5 }` | печь: готовые слитки; резервуар: капли внутри; дробилка и кузница: готовое, которое ждет места на ленте |
| `world.buildings[].energy` | float | `12.5` | только печь: секунд плавки, оставшихся в огне |
| `world.buildings[].belt_progress` | float | `0.8` | дробилка и кузница: сколько секунд уже идет крафт штуки из собранного с лент |
| `world.buildings[].direction` | string | `"right"` | лента: куда она везет; объединитель и разъединитель: куда смотрит их перед; если поля нет - `right` |
| `world.buildings[].items[].item` | string | `"mosquito"` | лента, объединитель, разъединитель: предмет на ней |
| `world.buildings[].items[].at` | float | `0.5` | какую часть клетки предмет проехал, 0-1 |
| `world.buildings[].slots[]` | {slot, item, count} | `{ "slot": 4, "item": "coal", "count": 12 }` | только сундук: непустые слоты 0-26 |
| `world.buildings[].flights` | array[float] | `[12.5, 3.0]` | только резервуар: сколько секунд каждый комар уже в полете |
| `world.buildings[].body` | string или null | `"body_t1"` | только конструктор: готовое тело, которое стоит у него |
| `world.buildings[].cultist` | bool | `true` | только сторожка охотника: в ней работает культист |
| `world.buildings[].buffer[]` | array[string] | `["flesh"]` | только сторожка охотника: добыча, которая ждет ленту, до 20 штук |
| `world.pickups[].item` | string | `"coal"` | id предмета на земле |
| `world.pickups[].count` | int | `1` | сколько штук |
| `world.pickups[].position` | [float, float] | `[40.0, 10.0]` | где лежит; летящий предмет - точка, куда он упадет |

Постройки тира 2 сохраняются так же, как их тир 1. Каменоломня, лесопилка, прялка и ритуальный круг сохраняются как дробилка: `recipe`, `progress`, `collected`, `output`, `belt_progress`.

Что не сохраняется:
- Короткие состояния: удар, деш и его перезарядка, комбо, отброс, неуязвимость, режим сноса. После загрузки персонаж свободен.
- Состояние мобов в бою: замах, выпад и то, куда они смотрят. После загрузки моб заново замечает игрока.
- Открытые окна: сохранение закрывает окно, а стопка с курсора возвращается в слоты, как при обычном закрытии инвентаря.
- Идущий ритуал: прервать его нельзя, поэтому он сохраняется как законченный, с результатом в центре.
- Задержка перед подбором предмета и точка респавна (она берется из `world.tscn`).
- Чей вход или выход следующий у объединителя и разъединителя, прогресс переселения в тело.
- По какой ленте уйдет готовое из печи, дробилки и кузницы: после загрузки - по любой выходящей ленте, по очереди.
- Удары по куче мусора, которую еще не разобрали: после загрузки она целая.
- Сколько культистов свободно: это считается по сторожкам, где `cultist` - true.

## Сейв файл для новой игры

Файл `data/new_game.json`. Новая игра - это обычная загрузка этого файла, поэтому в нем только отличия от сцен:

```json
{
  "version": 1
}
```
