# Verifying

Check what the person will check — motion frame by frame and detail at zoom — before
showing them anything.

## 1. Types and build

```sh
npm run typecheck     # tsc, strict for lib/ and small examples
npm run build         # vite build
```

## 2. Step time exactly

Load the page with `?debug`. `run()` then skips rAF and exposes `window.__step(s)`,
which advances in exact 1/60 s steps. Background tabs, embedded preview panes and
headless browsers throttle rAF to a frame or two per second, which makes everything
crawl and can make a working scene look broken — always check in debug mode.

`?t=1.25` freezes a normal page at one moment.

## 3. Look at frames, not screenshots of the whole card

Pane screenshots are too downscaled to judge a 1-unit pen. Either temporarily widen
the SVG container 4–11× and pan it over the area, or capture headless and crop:

```sh
node scripts/capture.ts "http://localhost:5173/examples/walker/?debug" /tmp/w 8 8 1920 1080
ffmpeg -i /tmp/w/f%04d.png -vf "crop=560:500:330:330,scale=280:-1,tile=8x1" -frames:v 1 -update 1 strip.png
```

To follow a moving figure, pass setup and per-frame JS to `capture.ts` that pick the
figure and re-centre a zoomed container on it, so one stride reads in place:

```sh
SETUP='window.K = __village.people[0]; true'
FRAME='(() => { const v = document.querySelector("#village"), z = 11;
  v.style.cssText = `width:${960*z}px;height:${480*z}px;position:fixed;left:${-(K.x-22)*z}px;top:${-(K.y-58)*z}px`;
  return true })()'
node scripts/capture.ts "http://localhost:5173/examples/village/?debug&tau=0.5" /tmp/g 9 8 480 640 "$SETUP" "$FRAME"
```

Expose whatever handles you need on `window` in the example (the village exposes
`__village` with its people, cat, boat and spawn function).

What to look for in a strip:

- feet stay still while planted; no skating, no popping between frames
- the body rises over the planted foot and dips at double support (walk)
- clothing opens and closes with the stride; sleeves and bags lag, then settle
- the leading leg is drawn on top
- nothing is ruler-straight; limbs are open at the ends
- props sit where hands are; a held bag hangs at the thigh

## 4. Trigger every interaction

Dispatch `pointerdown` on each hit area (`<title>` names them) and step through the
reaction, taking frames at the start, middle and end. Check it returns to idle.

## 5. Sweep the day

Render at τ = 0.3, 0.5, 0.72, 0.75, 0.8, 0.95, 0.24: day, golden hour, sunset, the ink
flip, night, late night (lights going out), dawn. Contrast must hold everywhere except
the brief flip.

## 6. Real frame rate

In a foreground tab, count rAF callbacks for 3 s; expect ~60.
