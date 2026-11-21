# Style

The look in one sentence: one thin, slightly wobbly ink line on warm paper; open,
economical figures without faces; flat muted colour used sparingly; buildings drawn
straight-on like an elevation. Most of the effort goes into the line, not the colour.

## Pen and paper

| | value | why |
|---|---|---|
| pen | `1.35` figure units (≈1.4 % of a 95-unit figure) | thinner reads as vector, thicker as cartoon |
| scene pen | pen × figure scale (0.5 scale → ~0.7–0.8) | architecture and figures must share one pen |
| detail pen | 0.4–0.6 × pen | tile lines, slats, hatching, ribs |
| ink (day) | `#1c1c1c` | not pure black |
| paper (day) | `#fdfcf8` / `#fdfdfc` | warm, never pure white |
| caps/joins | round | |
| wobble | `inkDefs()` filter: turbulence 0.6, displacement 0.45, blur 0.12 | ink, not vector — keep it subtle |

Fills are paper (`shape`) so things occlude each other like a drawing, solid ink
(`blot`) for small dark parts, or one flat colour (`paint`) for clothes and props.
No gradients on objects; gradients only for sky and light.

## Figures

Work in figure space: ~95 units tall, feet on y = 120, facing +x, standing at x = 40.

- **Head**: small oval, about 7 × 9 units, faceless. Character comes from hair and
  hats (bun, cap, bowler, straw hat, kasa), not faces.
- **Neck**: short open double stroke.
- **Body**: a simple garment silhouette — boxy coat with a straight front, kimono
  column, striped shirt (`inkDefs().stripes`), solid trousers via `solid()`.
- **Limbs**: `limb()` — two open strokes, rounded joints. Legs ~4.2 wide, arms ~3.6.
  Arm length ≈ 0.44 × height: a hand holding a bag hangs at the thigh, not the waist.
- **Feet**: `shoe()` wedges, or drawn geta/tabi; they peel off at the heel.
- **Proportions**: head ≈ 1/9.5 of height for adults; children have bigger heads
  (≈1/6), shorter limbs, and a straw hat or cap helps read age instantly.

## Animals

Open strokes only: a back line and a separate belly line, single-stroke legs ending
in fat ink-dot feet, a small head with an ear. A cat sitting is a closed paper shape
with a few patches; birds are a body oval, a cap blot, a tail line.

## Architecture

Draw buildings as street elevations (no perspective), with enough detail that the eye
can wander — this is where richness comes from:

- tiled roofs: tile channels converging to the ridge, round tile ends along the eave,
  rafter ends under the fascia, a stacked ridge with end tiles, a slight upward sweep
- façades: lattice slats with a rhythm (every fourth slat full height), plaster
  windows with fat bars, shoji grids, low curved fences, blinds, signboards with real
  lettering in the right script
- props that tell you who lives there: barrels, pots, a bench, buckets, a bicycle

Keep large areas of plain paper. Density belongs on the buildings, not the sky.

## Colour

Pick one or two accents and use them in small areas (a red parasol and lanterns, an
indigo kimono, yellow pails). At night every flat colour is pushed toward the night
palette with `nightTint()`, and ink becomes pale — see `scenes.md`.

## Day and night

Day: dark ink on warm paper, soft gradient sky. Night: the drawing inverts — pale ink
on indigo paper — and light comes from the windows, lanterns, a street lamp, a bike
lamp, fireflies, each with a warm radial glow on a `mix-blend-mode: screen` layer. The
moon is a pale crescent, stars twinkle. This inversion is why ink is `currentColor`.
