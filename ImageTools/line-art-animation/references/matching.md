# Matching a reference clip

When someone shares an animation and wants it "exactly like this", measure it. Guessed
timing and poses were rejected every time; measured ones landed.

## 0. Get the clip and fix the clock

For an X post, `https://cdn.syndication.twimg.com/tweet-result?id=<id>&token=4` lists
`mediaDetails[].video_info.variants`; take the highest-bitrate mp4.

```sh
ffprobe -v error -select_streams v -show_entries stream=r_frame_rate,avg_frame_rate,nb_frames clip.mp4
```

If `nb_frames / duration` isn't `r_frame_rate`, the clip is variable-frame-rate (most
social clips are). Resample by time (`-vf fps=30`) everywhere and index by time.
ffmpeg's `trim=start_frame` and `select='…n…'` count decoded frames, and `-f rawvideo`
pads to the nominal rate — mixing those once doubled a walk's speed.

## 1. Loop lengths

```sh
node scripts/clip.ts period clip.mp4 X Y W H --fps 60
```

Measure parts separately when they might loop independently: a dog's legs (0.52 s) and
its body sway (1.3 s) had different periods. Identical-looking legs also match at half
the cycle; use arms or props to tell which lag is the real one.

## 2. Read poses off a grid

```sh
scripts/frames.sh clip.mp4 X Y W H out/ 6 40
```

Every 3 frames (30 fps) over one step, read hip, knees (only when bent), ankles and
toe angle in source pixels (`px / scale`). Note the head height for body bob. Rigid
parts (coat, head, an arm holding something) are measured once and ride on the hip.
Put the numbers into `curve()` keys, or into `gait()` overrides (`stride`, `period`,
`duty`, `lift`).

## 3. Track what you can automatically

```sh
node scripts/clip.ts blobs clip.mp4 X Y W H BAND_Y0 BAND_Y1 --fps 30
```

prints dark-run centres per frame, e.g. ink-dot feet in the ground band. Fit centres,
amplitudes and the period over the whole clip so nothing drifts by the end.

## 4. Overlay check

Add an `?overlay&t=` mode to the page: a `<video>` of the clip positioned so the crop
lines up (`width: W_clip / W_crop × 100%`, `left: −X / W_crop × 100%`,
`top: −Y / H_crop × 100%`), `currentTime = t` on `loadeddata`, and CSS that turns your
ink red at 65 % opacity with paper fills set to `none`. Freeze your drawing at the same
`t`. Check 0–0.6 s in 0.1 s steps and a few points late in the clip.

## Copying vs. making new

Measuring a clip's motion to match its feel is fine. Shipping its characters as your
own is not: if the brief is "like this but new", reuse the medium and timing and draw
new characters doing new things.
