# Motion

Animation here is mechanics first: solve where the body has to be, then draw around
it. Free-running sines look procedural immediately; every rejected version of a walk
had one.

## Walking and running — `gait()`

```ts
import { gait } from '../lib/gait.ts';
const walk = gait({ kind: 'walk' });           // or 'shuffle' (kimono, geta), 'run'
let phase = 0;
// per frame:
phase += (dt / walk.period) * go;              // go ∈ [0,1] slows to a stop
x += dir * walk.speed * SCALE * dt * go;       // exactly this speed, or feet slide
const p = walk.pose(phase, go);                // hip, feet[0..1] {ankle, knee, pitch, stance}, front, bob
```

What it does, so you can extend it rather than replace it:

- **Planted foot** slides back under the hip at `stride / (duty × period)` — the travel
  speed. Move by anything else and feet skate.
- **Swing** follows a minimum-jerk curve with a low lift (walk 3.4, geta 2.4); runs add
  a heel kick and a high, early lift.
- **Heel-off**: in the last 14 % of stance the foot pivots on its toe (`pitch`).
- **Hip height** is solved, not animated: for a walk, the lowest the planted legs can
  reach (high at passing, dipped at double support); for a run, compressed over the
  planted foot and highest in flight.

Natural numbers to sanity-check against: adults ≈ 2 steps/s; kimono or geta steps
are shorter and lower; children run at ≈ 4 steps/s with a forward lean.

Draw from the pose: legs with `limb().draw([hip, knee, ankle])`, the leading leg on
top (`p.front`), shoes at `ankle` with `pitch`. Hidden legs (under a kimono or coat)
are still solved; the garment is drawn from `p.feet[p.front].knee` and both ankles:

- front edge: from the waist, out over the forward knee, down to just past the front ankle
- hem: from the front ankle to the rear ankle, so it opens into an A when the legs part
- back edge: pushed back only when the rear leg extends behind
- a fold line from the rear knee, an overlap line toward the front foot

The upper body rides on `p.bob` (with a degree or two of lean), arms swing opposite
the legs through springs, sleeves and bags hang on springs/pendulums.

## Things that roll or push

- **Wheels** roll without slipping: angle = distance / radius. Cranks turn at a
  gear ratio of the wheel angle; feet sit on the pedals; legs are IK to the pedals.
- **Poling a boat**: plant the pole tip at a fixed world point, let the boat surge
  while the tip stays put (the pole leans back), lift it out, swing it forward. The
  boat's speed follows the push, not a constant.

## Things that hang or trail — springs and pendulums

```ts
const sleeve = spring(40, 6);                 // stiffness, damping
sleeve.step(-1.4 + Math.sin(stepPhase) * 0.9, dt);   // target moves, the sleeve lags
const lantern = pendulum(10, 1.1);
lantern.step(wind.value * 0.5 + carrierAccel, dt);   // force this frame
```

Use them for sleeves, scarves, bags, parasol tilt, lanterns on hooks or sticks,
curtains (one pendulum per panel), wind chimes (bell + clapper + paper strip, three
coupled pendulums), willow strands, laundry. Drive them with wind, the carrier's
acceleration, and clicks (`kick()`).

## Idle life

Things should never be perfectly still: breathing (±0.35 units), a tail-tip flick
every few seconds, an ear twitch, birds that hop, turn, preen at random intervals
(1–4 s), smoke puffs, water strokes drifting, stars twinkling. Randomise intervals,
not shapes.

## Gestures and reactions — keyed poses

For interactions, key a few poses and blend between them over time
(`sequence([['sit', 0.7], ['yawn', 0.9], ['stretch', 1.5], …])`, `curve()` for single
channels). Ease each transition. Stop walking before gesturing (blend `go` to 0 over
~0.4 s), then resume. Typical durations: bow 2.6 s, hat tip 1.6 s, cat wake-up 8 s.

## Time compression

If a scene runs a day in 30 s, people still walk at natural speed. Compress what can
be compressed without looking fake — how often people arrive, the sky, the lights.
