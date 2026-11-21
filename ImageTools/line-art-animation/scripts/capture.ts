// Deterministic frame capture of a page that uses ink.js `run()` with ?debug.
// Drives headless Chrome over the DevTools protocol (Node ≥ 22, no npm deps),
// advances the scene by exactly 1/fps between screenshots, writes PNGs.
//
//   node scripts/capture.ts <url> <outDir> <frames> <fps> [width] [height] [setupJs] [perFrameJs]
// (Node ≥ 22.18 runs .ts directly by stripping types.)
//
// The url must include ?debug (so the page exposes window.__step). Encode with:
//   ffmpeg -framerate 30 -i out/f%04d.png -c:v libx264 -preset slow -crf 15 -pix_fmt yuv420p -tune animation out.mp4
// Set CHROME=/path/to/chrome to choose the browser.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [url, outDir, framesArg, fpsArg, wArg, hArg, setupJs = '', frameJs = ''] = process.argv.slice(2);
if (!url || !outDir || !framesArg) { console.error('usage: capture.ts <url> <outDir> <frames> <fps> [w] [h] [setupJs] [perFrameJs]'); process.exit(1); }
const FRAMES = +framesArg, FPS = +(fpsArg || 30), W = +(wArg || 1920), H = +(hArg || 1080);

function findChrome(): string | undefined {
  if (process.env.CHROME) return process.env.CHROME;
  const home = process.env.HOME || '';
  const fromCache = (dir: string, test: (d: string) => string): string | null => {
    if (!existsSync(dir)) return null;
    for (const d of readdirSync(dir).sort().reverse()) { const p = test(join(dir, d)); if (p && existsSync(p)) return p; }
    return null;
  };
  return fromCache(join(home, 'Library/Caches/ms-playwright'), (d) => join(d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'))
    || fromCache(join(home, 'Library/Caches/ms-playwright'), (d) => join(d, 'chrome-headless-shell-mac-x64/chrome-headless-shell'))
    || fromCache(join(home, '.cache/ms-playwright'), (d) => join(d, 'chrome-headless-shell-linux64/chrome-headless-shell'))
    || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
}
const CHROME = findChrome();
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome (or `npx playwright install chromium-headless-shell`).'); process.exit(1); }

mkdirSync(outDir, { recursive: true });
const port = 9400 + Math.floor(Math.random() * 400);
const proc = spawn(CHROME, [`--remote-debugging-port=${port}`, '--headless', `--window-size=${W},${H}`, '--hide-scrollbars',
  '--force-device-scale-factor=1', `--user-data-dir=${join(outDir, '.profile')}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const quit = (code: number): never => { try { proc.kill(); } catch {} return process.exit(code); };

interface Target { type: string; webSocketDebuggerUrl: string }
let list: Target[] = [];
for (let i = 0; i < 60 && !list.length; i++) { try { list = ((await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as Target[]).filter((t) => t.type === 'page'); } catch {} if (!list.length) await sleep(200); }
if (!list.length) { console.error('Chrome did not start.'); quit(1); }
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
type Reply = { id?: number; method?: string; params?: any; result?: any; error?: { message: string } };
let id = 0; const pending = new Map<number, (d: Reply) => void>(); const errors: string[] = [];
ws.onmessage = (m: MessageEvent<string>) => {
  const d: Reply = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)!(d); pending.delete(d.id); }
  if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push(d.params.args.map((a: { value?: unknown; description?: string }) => a.value ?? a.description).join(' '));
};
const send = (method: string, params: object = {}): Promise<any> => new Promise((res, rej) => { const i = ++id; pending.set(i, (d) => (d.error ? rej(new Error(`${method}: ${d.error.message}`)) : res(d.result))); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expression: string): Promise<any> => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
let ready = false;
for (let i = 0; i < 100 && !ready; i++) { await sleep(150); try { ready = await evalJs('typeof __step === "function" && document.readyState === "complete"'); } catch {} }
if (!ready) { console.error('Page never exposed __step — is ?debug in the url, and does the page use run()?', errors.join('\n')); quit(1); }
await evalJs('document.fonts.ready.then(() => true)');
await sleep(400);
if (setupJs) await evalJs(setupJs);

const t0 = Date.now();
for (let i = 0; i < FRAMES; i++) {
  if (i > 0) await evalJs(`__step(${1 / FPS})`);
  if (frameJs) await evalJs(frameJs);
  const { data } = (await send('Page.captureScreenshot', { format: 'png' })) as { data: string };
  writeFileSync(join(outDir, `f${String(i).padStart(4, '0')}.png`), Buffer.from(data, 'base64'));
  if (i % 60 === 0) process.stdout.write(`frame ${i}/${FRAMES}  ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
}
console.log(`done: ${FRAMES} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (errors.length) { console.error('page errors:\n' + [...new Set(errors)].join('\n')); quit(2); }
ws.close(); quit(0);
