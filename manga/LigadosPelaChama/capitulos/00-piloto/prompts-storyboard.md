# Prompts de storyboard — Piloto

Prompts prontos para gerar ou regerar os storyboards do capítulo 00. Escritos em inglês porque os geradores de imagem respondem melhor nesse idioma; o conteúdo segue o cânone dos arquivos de página.

## Bloco de estilo — colar no início de todo prompt

```
Shonen manga storyboard page, clean expressive linework, flat cel shading with
muted natural colors, ink-wash texture, black panel borders with white gutters,
portrait page 2:3, western left-to-right reading order.
Speech balloons drawn EMPTY with no text of any kind — no letters, no words,
no signatures, no watermarks anywhere on the page.
Setting: Solar da Vigília, a small reused gothic manor of dark grey stone at the
foot of a vast grey mountain range, morning, clear blue sky with light clouds.
```

## Bloco de elenco — colar quando o personagem aparece

```
MIRA: 15-year-old girl, messy black shoulder-length hair, compact athletic build,
layered off-white tunic, dark trousers, reinforced boots, SHORT EARTH-RED CLOAK,
bandage wraps on both forearms, small feather pendant, wide bright brown eyes,
always mid-sentence and over-animated.

TEO: 16-year-old boy, lean and wiry, untidy grey-brown hair with one stubborn
raised strand, amber-brown eyes, SHORT DARK-GREEN AND BROWN TUNIC, pale neck
scarf, fingerless gloves, worn boots. His palette must never approach Mira's
earth-red — green reads first, so the two are told apart instantly.

GARRAN: 48-year-old guild master, completely bald, short grey beard, thick
eyebrows, one old scar across an eyebrow, broad heavy build softened by age,
dark shirt with rolled sleeves, worn leather vest, ring of keys at the belt,
plain unornamented sword, tired eyes.

BRINA: 39-year-old quartermaster and carpenter, tall and muscular, broad
shoulders, brown skin, faint freckles, coppery-brown hair in a side braid with
one temple shaved close, ochre work clothes, burnt-red sash, gloves,
tool-heavy belt.
```

## Regra de altura — obrigatória nas páginas 2, 3 e 4

```
CRITICAL SCALE RULE: the great hall roof where Mira and Teo work is SEVEN METRES
above the courtyard — a full two-storey gothic hall with wooden scaffolding
against its west wall and a timber derrick with a pulley holding a red bucket.
It is NEVER a low cottage wall. A person standing in the courtyard CANNOT reach
the eaves and CANNOT speak face to face with anyone on the roof. Whenever both
levels appear in one panel, use a steep low camera looking up, with the roof
figures small and silhouetted against the sky at the top edge of the frame.
```

---

## Página 002 — Manutenção (regeração)

Corrige a cor da capa de Téo e a leitura de altura no quadro 4.

```
[STYLE BLOCK] [CAST BLOCK: Mira, Teo, Brina, Garran] [SCALE RULE]

Five-panel manga storyboard page, empty speech balloons.

PANEL 1 (wide, top): Brina stands at the base of the tall stone hall wall,
examining a crack and marking the stone with chalk. Behind her, the courtyard
and the observation tower with a red banner. At the right edge, high above her,
the timber derrick and the hanging red bucket. Low camera — the wall towers
over her.

PANEL 2 (small, left): Two mercenaries on the steep slate roof replacing tiles,
a ladder against the pitch, mountains far behind.

PANEL 3 (large, right): On the roof ridge, TEO IN A DARK-GREEN TUNIC braces a
plank while MIRA IN HER EARTH-RED CLOAK raises a hammer and talks at the same
time, mouth open, eyes bright. Green versus red must separate them instantly.
Sky behind them, no ground visible — they are clearly very high up.

PANEL 4 (small, left): STEEP DOWNWARD VIEW FROM THE ROOF. Garran crosses the
courtyard seven metres below, small in frame, reading a clipboard. The well and
the gate are visible below him. The drop must be obvious.

PANEL 5 (large, right): Mira, hammer up, still talking; Teo beside her in green,
flat unimpressed expression. Roof tiles and open sky.
```

## Página 004 — O balde (regeração)

Corrige o erro principal: nos quadros 3 e 4 Mira e Téo apareciam sobre uma parede baixa, na altura de Garran. O quadro 1 é a leitura correta e deve reger a página inteira.

```
[STYLE BLOCK] [CAST BLOCK: Mira, Teo, Garran] [SCALE RULE]

Four-panel manga storyboard page, empty speech balloons. Physical comedy in
three beats: impact, silence, exchange. The joke is the DISTANCE between the
courtyard and the roof, so the height must read in every panel that shows both.

PANEL 1 (small, top-left): LOW ANGLE LOOKING UP. Garran in the courtyard in the
low foreground, head tilted back, hearing a shout. Behind and above him the hall
wall rises to the eaves; Mira and Teo are two tiny silhouettes against the sky
at the top of the scaffolding, seven metres up. The vertical distance is the
subject of the panel.

PANEL 2 (large, top-right): Close impact shot at Garran's own height — the only
panel without the roof in frame. The red bucket strikes him full on, water
explodes outward in sharp radiating lines, contract pages fly loose, his face
clenched in fury.

PANEL 3 (wide, middle): Silence. Open courtyard view, slight upward tilt.
Garran soaked and motionless at centre, the bucket rolling across wet stone, and
the WHOLE TWO-STOREY MASS OF THE HALL rising behind him to the distant roofline.
Tiny at the top edge, seven metres up and silhouetted against the sky: Mira with
a guilty grin, Teo covering his face with one hand. The empty courtyard between
them measures the fall.

PANEL 4 (wide, bottom): STEEP LOW ANGLE, camera almost at boot height. Garran
fills the lower corner, looking up, dripping, still gripping the ruined
clipboard. At the very top of the frame, seen from below and cut against open
sky, Mira leans over the distant eaves with Teo beside her in dark green. Empty
balloons float across the tall empty space between the two planes.

DO NOT draw a low wall, a cottage, or any structure that puts Mira and Teo
within reach of Garran. They are on a high roof, far above him, in every panel
where they appear.
```

---

## Como usar

1. Gerar a página inteira num único pedido, para que os quadros compartilhem iluminação e paleta.
2. Conferir contra a página correspondente em `paginas/` e contra a regra de altura antes de salvar.
3. Salvar como `pagina-00X-storyboard-v3.png` e atualizar a tabela no [README](README.md) e a lista de correções em [continuidade-local.md](continuidade-local.md).
4. Textos, nomes e símbolos que o gerador inventar dentro da imagem não entram no cânone.
