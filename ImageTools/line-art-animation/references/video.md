# Rendering to video

Capture is deterministic: the page runs in `?debug` mode and `scripts/capture.ts`
advances it by exactly 1/fps between screenshots, so motion is right regardless of
machine speed.

```sh
npm run dev                                      # or any server for the built files
node scripts/capture.ts "http://localhost:5173/examples/village/?debug&capture&day=30&start=0.3" \
  captures/village 900 30 1920 1080
ffmpeg -framerate 30 -i captures/village/f%04d.png \
  -c:v libx264 -preset slow -crf 15 -pix_fmt yuv420p -movflags +faststart -tune animation village.mp4
```

- 1080p at 30 fps for 30 s is 900 frames, about 90 s to capture.
- Use page flags rather than code edits: the village supports `capture` (hides the
  hint), `day=<seconds>` (length of a full day), `start=<τ>` (starting time, keeps
  running) and `tau=<τ>` (pins the time).
- A full day in 30 s from τ = 0.3 shows morning → noon → sunset → night → dawn.
- Render the component in its card on the page background, so the video shows it as
  a component.
- Check a contact sheet before sending: `ffmpeg -i out.mp4 -vf "fps=1/3.75,scale=480:-1,tile=4x2" -frames:v 1 sheet.png`.
- For a README or post, a short GIF: `ffmpeg -i out.mp4 -vf "fps=15,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" out.gif`.

`capture.ts` uses `$CHROME`, a Playwright Chromium in the user cache, or a system
Chrome/Chromium; it exits non-zero and prints page errors if the page threw.
