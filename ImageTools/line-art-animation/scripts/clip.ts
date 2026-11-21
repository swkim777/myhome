// Measure a reference clip. Needs ffmpeg on PATH; run with Node ≥ 22.18.
//
//   node scripts/clip.ts period <clip> <x> <y> <w> <h> [--fps 60] [--min 10] [--max 200]
//     Loop length of a cropped region: frame-differences it against several
//     reference frames and prints the best lags in frames and seconds.
//
//   node scripts/clip.ts blobs <clip> <x> <y> <w> <h> <bandY0> <bandY1> [--fps 30] [--dark 110] [--frames N]
//     Per frame, the x centres (source px) of dark runs inside a horizontal band of
//     the crop — e.g. ink-dot feet on a ground line. Fit centres, amplitude and
//     period from this output instead of eyeballing.
//
// Both resample by time (fps filter), because social-media clips are usually
// variable-frame-rate and decoded frame numbers are not a clock.
import { execFileSync } from 'node:child_process';

const [mode, clip, ...rest] = process.argv.slice(2);
const flags = new Map<string, string>();
const pos: number[] = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) flags.set(rest[i].slice(2), rest[++i]);
  else pos.push(Number(rest[i]));
}
const flag = (k: string, d: number) => (flags.has(k) ? Number(flags.get(k)) : d);

function frames(x: number, y: number, w: number, h: number, fps: number): Uint8Array[] {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', clip, '-vf', `fps=${fps},crop=${w}:${h}:${x}:${y},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 30 });
  const n = w * h, out: Uint8Array[] = [];
  for (let i = 0; i + n <= raw.length; i += n) out.push(raw.subarray(i, i + n));
  return out;
}

if (mode === 'period' && pos.length >= 4) {
  const [x, y, w, h] = pos;
  const fps = flag('fps', 60), min = flag('min', 10), max = flag('max', 200);
  const F = frames(x, y, w, h, fps), N = w * h;
  const refs: number[] = [];
  for (let r = 0; r < F.length - max - 1 && refs.length < 12; r += Math.max(1, Math.floor(fps / 6))) refs.push(r);
  if (!refs.length) refs.push(0);
  const score = new Map<number, number>();
  for (let lag = min; lag < Math.min(max, F.length - 1); lag++) {
    let s = 0;
    for (const r of refs) {
      if (r + lag >= F.length) continue;
      const A = F[r], B = F[r + lag];
      for (let i = 0; i < N; i += 3) s += Math.abs(A[i] - B[i]);
    }
    score.set(lag, s);
  }
  console.log(`${F.length} frames @ ${fps} fps`);
  [...score.entries()].sort((a, b) => a[1] - b[1]).slice(0, 8)
    .forEach(([lag, s]) => console.log(`lag ${String(lag).padStart(4)} frames = ${(lag / fps).toFixed(3)} s   score ${s}`));
} else if (mode === 'blobs' && pos.length >= 6) {
  const [x, y, w, h, y0, y1] = pos;
  const fps = flag('fps', 30), dark = flag('dark', 110), minPx = flag('min-px', 2), limit = flag('frames', 0);
  const F = frames(x, y, w, h, fps);
  const count = limit ? Math.min(limit, F.length) : F.length;
  for (let i = 0; i < count; i++) {
    const fr = F[i], runs: number[] = [];
    const col = Array.from({ length: w }, (_, cx) => { let c = 0; for (let cy = y0; cy <= y1; cy++) if (fr[cy * w + cx] < dark) c++; return c; });
    for (let cx = 0; cx < w;) {
      if (col[cx] >= minPx) { const s = cx; while (cx < w && col[cx] >= minPx) cx++; runs.push(+(x + (s + cx - 1) / 2).toFixed(1)); }
      else cx++;
    }
    console.log(`${String(i).padStart(3)}  t=${(i / fps).toFixed(3).padStart(6)}  [${runs.join(', ')}]`);
  }
} else {
  console.error('usage:\n  clip.ts period <clip> <x> <y> <w> <h> [--fps 60] [--min 10] [--max 200]\n  clip.ts blobs  <clip> <x> <y> <w> <h> <bandY0> <bandY1> [--fps 30] [--dark 110] [--frames N]');
  process.exit(1);
}
