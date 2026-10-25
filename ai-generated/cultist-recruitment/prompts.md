# Промпты иллюстраций к вариантам найма культистов (Codex imagegen, 07.10)

Каждая картинка = общий стиль + сцена. Стиль повторяет концепт из `visual-test/concept/prompts.md`,
чтобы варианты выглядели как кадры из нашей игры. Перегенерация одной картинки:
`tools/art/gen_image.sh giga-chad-game/design-doc/ai-generated/cultist-recruitment/<имя>.png "<style>` + пустая строка +
`<сцена>"` (около 1,5-2,5 минут на картинку, можно запускать по 5 параллельно).

## style

```
In-game screenshot mockup of a 2D top-down three-quarter view automation game (camera like Graveyard Keeper and Core Keeper: orthographic, looking down about 45 degrees, front faces of objects visible). The art is pixel art produced by rendering simple blocky low-poly 3D models (Blockbench / Minecraft-like cuboid models with hand-painted pixel textures) to crisp pixels at 32x32 pixels per ground tile, nearest-neighbour, no anti-aliasing, the whole frame upscaled x4 so every art pixel is a sharp 4x4 block. Warm autumn palette with cool blue-violet shadows, light from the top-left, soft ambient occlusion and contact shadows that give real volume (like Core Keeper), dark warm-brown outlines.
Recurring characters (draw them exactly like this whenever they appear):
- THE PLAYER: a fallen cult leader with cute chibi proportions (big head), crimson hooded robe with tarnished gold trim and a torn hem, face hidden in the hood's shadow with two glowing amber eyes, a cracked golden halo floating above the hood held together by a sticking plaster, a bandaged forearm, rope belt with a tiny skull charm.
- CULTISTS: small chibi followers in plain grey hooded robes with a red rope belt, faces hidden in the hood's shadow with two white dot eyes, comically miserable or dazed body language.
Mood: cozy but darkly funny cult industry, absurd humour like Cult of the Lamb and Graveyard Keeper, nothing gory. One clear focal action that reads instantly at a small size. No UI, no text, no letters, no numbers, no watermark. Wide 16:9 frame.
```

## 01-queue.png

```
Scene: the edge of the player's cult camp, a sturdy wooden palisade fence with an open gate under a crimson banner with a skull emblem. Outside the gate a long queue of six varied hopeful candidates waits on a dirt road, each clearly different: a farmer with a pitchfork, a gloomy bard with a lute, a fat bald monk, a pale goth girl holding a candle, an old man with a cane, a scruffy beggar with a bundle on a stick. At the gate the player stands like a strict nightclub bouncer with crossed arms, inspecting the first candidate, next to a small wooden lectern with an open book and a quill. Behind the fence, inside the camp, two grey cultists push a treadwheel.
```

## 02-cliff.png

```
Scene: the foot of an enormous grey cliff that fills the top of the frame. At the very top edge a tiny figure in shining white-and-gold robes (the traitor) pushes someone off. Mid-air, a screaming peasant in a white shirt falls with speed lines. At the cliff base: one fallen peasant has already landed head-first in a big haystack with only his legs sticking out; a second one bounces high off a wooden trampoline made of a rope net stretched on a timber frame; a third one lies in a comic person-shaped dent in the ground with dizzy stars above his head. The player stands nearby looking up and shading his eyes with a hand, with a grey cultist holding a stretcher ready.
```

## 03-buildings-lure.png

```
Scene: a small cult base with three distinct buildings: a brass smelting furnace glowing orange, a candle-lit shrine with stacks of old books, and a wooden treadwheel machine. At the edge of the base stands a stone portal arch with a swirling purple vortex inside. A brand-new cultist wearing a leather blacksmith apron and carrying a hammer is stepping out of the portal, drawn toward the glowing furnace; a faint dotted trail of sparkles leads from the furnace to the portal like a lure. A second new cultist with a book under his arm already walks toward the shrine. The player watches with hands on hips, pleased.
```

## 04-altar-level.png

```
Scene: the player stands before a large dark stone altar ringed by four tall rune pylons that glow red and send beams of light into the sky. A pillar of crimson light hits the ground in front of the altar, and inside the light a new grey cultist materialises in a puff of smoke and kneels, confused. Small celebratory sparks and floating crimson runes swirl around, like a level-up moment. Offerings of iron ingots and candles lie on the altar slab.
```

## 05-wanderers.png

```
Scene: a forest clearing with a campfire surrounded by three ragged vagrants in patched blankets under a lean-to of sticks. The player tosses a shiny gold coin that arcs through the air toward one vagrant, who jumps up with joy. At the same time the player's other hand points a gnarled staff at a second vagrant, a crimson spiral beam of conversion hitting him: his rags are half turned into a grey cult robe, with a spiral pattern in his eyes. The third vagrant looks on, worried.
```

## 06-catch-sack.png

```
Scene: a quiet farm field with a wooden fence and haystacks. The player sneaks on tiptoe behind a startled villager and throws a large burlap sack over his head and body; the sack wriggles with motion lines. Nearby stands a small wooden handcart already loaded with two more wriggling burlap sacks tied with rope. A grey cultist holds the cart handles, looking guilty and whistling innocently.
```

## 07-mercy.png

```
Scene: right after a fight in a rocky clearing. A defeated enemy soldier in white-and-gold robes of the rival cult kneels on the ground, waving a small white flag, his helmet knocked askew. Above him float two large glowing choice icons side by side: a red skull on the left and a golden handshake on the right. The player stands over him with a sword lowered, thinking, a hand on his chin. In the background a green slime monster wearing a tiny grey cult hood (a previously spared enemy) carries a log for the camp.
```

## 08-rescue.png

```
Scene: dark ruined temple interior lit by torches, with a collapsed rockfall blocking one passage in the background. In the centre a cultist with a funny unique look (a cooking pot worn as a helmet and a huge moustache) is chained to a wooden post above a glowing ritual circle, two defeated enemy guards lying dazed nearby. The player swings an iron pickaxe and breaks the chains, links flying. The chained cultist cries tears of joy.
```

## 09-negotiation.png

```
Scene: a cozy tavern corner with a rough wooden table and two stools, candles on the table. The player sits across from a nervous sweating candidate in peasant clothes. Between them float large comic speech bubbles that contain only pictograms, no letters: a cake, a skull, a heart, a coin and a question mark. The candidate scratches his head, choosing. A grey cultist stands behind the player holding a tray with a contract scroll and a quill, waiting.
```

## 10-homunculus-craft.png

```
Scene: an alchemical factory corner. A tall brass machine with riveted plates, glass flasks and a big glass vat full of glowing red liquid in which a small humanoid silhouette floats. A wooden conveyor belt feeds it lumps of grey clay, red vials of blood and candles. From a chute on the other side, small freshly made grey cultists pop out one after another, still steaming and dazed, landing onto a second conveyor belt and stumbling off it. Gears, pipes, a pressure gauge and candles on the machine.
```

## 11-brainwash-line.png

```
Scene: a long industrial production line seen from three-quarter view, running left to right on a conveyor belt. On the left, ordinary peasants in brown everyday clothes step onto the belt. Station 1: giant brass scissors trimming their hair. Station 2: a stamping press that slams grey hooded robes onto them. Station 3: a machine with a huge rotating black-and-white hypnotic spiral wheel and a big staring eye. On the right, identical grey cultists with spiral eyes march off the belt in a neat line. The player stands at a lever, satisfied.
```

## 12-mandrake-farm.png

```
Scene: a tidy vegetable garden with rows of tilled dark soil. Instead of turnips, little grey cult hoods stick out of the soil, each topped with a tuft of green leaves, at different growth stages from tiny sprouts to big ripe ones. The player grips one ripe tuft and pulls a small screaming cultist out of the ground like a mandrake, its legs are roots trailing soil, with comic scream lines. A watering can and a basket with two already harvested dazed cultists stand nearby.
```

## 13-incubator.png

```
Scene: next to a small cosy canvas tent decorated with a hanging pink heart charm, a warm hatchery built from straw nests under a heat lamp of candles. Several big speckled eggs sit in the nests. One egg is cracking open and a tiny baby cultist in a miniature grey hood peeks out of the shell. Two adult grey cultists sit on a bench beside the tent, blushing and looking away from each other awkwardly. The player stands proudly beside the nests like a farmer with a clipboard-like wooden board without any writing.
```

## 14-souls-from-mobs.png

```
Scene: a grassy battlefield with a few green slime monsters. Defeated slimes burst and release small glowing teal soul wisps. The player holds a brass soul-catcher staff with a glass lantern at its tip and sucks the wisps in like a vacuum cleaner, the wisps streaming into it. Nearby a short brass pipe leads from a stone soul gate: a carved stone arch filled with teal mist, from which a new grey cultist with glowing teal eyes stomps out. A small heap of slime goo lies on the ground.
```

## 15-raise-dead.png

```
Scene: an old graveyard at dusk with crooked tombstones, one freshly dug grave and a shovel stuck in the dirt. A skeletal horse pulls a small cart carrying a body wrapped in a linen shroud. In the middle, on a stone slab table surrounded by dripping candles and a green glowing necromantic circle, a zombie cultist is rising: grey robe, greenish skin, visible stitches, one bigger eye, arms stretched forward. The player raises both hands, casting a green glow.
```

## 16-second-life.png

```
Scene: three identical small treadwheel machines in a row, each powered by the same cultist at a different stage of his afterlife: on the left a living grey cultist running and sweating; in the middle the same cultist as a greenish stitched zombie in a torn grey robe, shuffling slowly; on the right the same cultist as a skeleton in a tattered grey hood, rattling along happily. A faded circular arrow painted on the ground connects them. Next to the row stands a cauldron full of bones and a gravestone with a skull.
```

## 17-summon-imps.png

```
Scene: a ritual site with a large stone pentagram slab. In its centre a fiery portal opens in the ground, and several small red imps with stubby horns and tiny bat wings eagerly hop out, wearing little hard hats and carrying a pickaxe, a shovel and a wrench. On an offering stand beside the slab, iron ingots and a bowl of blood are dissolving into smoke. The player gestures commandingly with one hand raised, his halo glowing.
```

## 18-gacha-well.png

```
Scene: an ominous old stone well glowing with purple light from inside. The player has just flipped a gold coin into it. A cultist is being spat out of the well high into the air, surrounded by a dramatic golden rainbow beam of legendary rarity, wearing cool dark sunglasses and striking a heroic pose. Beside the well sits a heap of ordinary plain grey cultists that came out before, all looking disappointed and sulking. Several spent coins lie scattered around.
```

## 19-petitioners.png

```
Scene: outside a wooden cult gate stands a line of four petitioners in plain peasant clothes. Above each of them floats a thought bubble with a single item pictogram and no text: an iron ingot, a brass gear, a loaf of bread, a healing potion. The player hands an iron ingot to the first petitioner; that petitioner cheers, and his clothes are transforming into a grey cult robe in a puff of sparkles. A wooden chest full of ingots and gears stands next to the player.
```

## 20-missionaries.png

```
Scene: a dirt road leaving the cult camp toward distant hills. A cheerful grey cultist missionary carrying a stack of leaflets returns along the road, followed by three new recruits in peasant clothes walking behind him in a neat line like ducklings, holding hands. Further along the road another missionary sets off with a big backpack. At the roadside stands a small wooden recruitment booth shaped like a pyramid with a crimson eye emblem. A third missionary comes back alone with bandages and a black eye, looking defeated.
```
