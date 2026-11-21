# Scenes

`examples/village` is the reference implementation of everything here.

## The component

- A card (rounded corners, soft shadow, `overflow: hidden`) on a fixed neutral page
  background (`#ebe8e2`). The page never changes with the scene's time of day.
- Any readout (a clock) or hint lives inside the card, coloured with the scene ink.
- 2:1 is a good default aspect; size with `width: min(94vw, calc((100vh - 48px) * 2))`.
- `touch-action: none` on the card if you use drag interactions.

## Coordinates and layers

Pick a scene viewBox (the village uses 960 × 480) and a figure scale (0.5 → figures
≈ 48 tall; a doorway ≈ 60–66; a two-storey house ≈ 140–180). Set the scene pen to
pen × figure scale so everything shares one line weight.

Layer order, back to front:

1. sky (gradient rect, stars, sun/moon, clouds, far hills in diluted ink at ~40 % opacity)
2. behind-buildings (trees whose canopies rise above roofs, chimneys, wires, birds on wires)
3. buildings
4. street (paper fill), street furniture, a cat on a bench
5. walkers — re-sorted every frame by their ground y
6. foreground (water, a boat, a willow on the near bank)
7. airborne particles (petals) with `pointer-events: none`
8. glow layer: `mix-blend-mode: screen; pointer-events: none` — all light lives here
9. hit areas for small targets

Put `inkDefs().filter` on the scene group, not the sky or glow.

## Day and night

`palette(τ)` from `lib/daynight.ts`; call `applyPalette(svg, P)` each frame and keep
`.pp { fill: var(--paper) }` in CSS. Things that follow time:

- **Windows**: a pane drawn before its lattice, filled `mix(paper, warm, lit)`, plus a
  radial glow. Give each its own on-threshold on `P.lamp` and some an off-time late at
  night, so lights come on and go out one by one.
- **Lanterns, street lamp, bike lamp, boat lantern**: same, with a light cone or flicker.
- **Reflections**: horizontal warm strokes in the water under each lit source, jittered.
- **Shops** take in their curtains after hours; laundry or stalls follow the day.
- **Creatures**: birds roost at dusk, fireflies and moths at night, a cat's eyes glow.
- Flat colours go through `nightTint(colour, P)`.

Start the live component in the afternoon (τ ≈ 0.66) so a visitor sees dusk within a
minute. Let the user drag the sun or moon along its arc to scrub time.

## People and traffic

Spawn walkers on per-type timers that depend on the hour (children by day, a lantern
instead of a parasol after dark, fewer people deep at night). Start with two or three
already on screen so the scene is never empty. Remove them when off-screen.

## Wind

`pointerWind(svg)` gives a smoothed value from pointer speed plus a slow breeze. Feed
it to everything that hangs or floats — curtains, lanterns, chimes, petals, smoke,
willow strands, water strokes, clouds.

## Interactions

Every clickable thing reacts in character, takes 1–8 s, and returns to idle by itself:
a person bows or tips a hat; a cyclist rings the bell (and the birds scatter); a kid
hops; a boatman sings; a cat wakes, yawns, stretches, grooms, curls up; birds flush and
resettle; a lantern swings; a chime rings; a window slides open and someone waves;
a tree drops petals; the water ripples and a fish jumps; the night sky gets a shooting
star. Give small targets a transparent hit path with a `<title>`. Moving characters
take `pointerdown` on their own group.

## Performance

Create every node once and only update attributes. Keep per-frame work to path strings
(`f()` rounds to 2 dp). The village runs ~40 animated objects at 60 fps with the ink
filter on.
