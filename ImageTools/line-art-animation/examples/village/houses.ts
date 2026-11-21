// The street: four machiya-style buildings and an alley, drawn once, plus the
// parts that live (windows that light, noren and lanterns in the wind, the
// fūrin, a sliding shoji someone opens).
import { el, pen, shape, blot, f, pt, limb, PAPER } from '../../lib/ink.ts';
import { BASE, SP, srnd, lerp, clamp, smooth, ease, oval, rgb, hex, mix, wobble } from './kit.ts';

const JP = '"Hiragino Mincho ProN","Yu Mincho","YuMincho","Noto Serif JP","Songti SC",serif';
const RED = hex('#b3412d'), RED_NIGHT = hex('#6e2a22'), WARM = hex('#ffcf7e'), WARM_DEEP = hex('#f3a54d');

// ------------------------------------------------------------------ drawing kit
const P = (g, d, w = SP) => { const n = pen(g, w); n.setAttribute('d', d); return n; };
const S = (g, d, w = SP) => { const n = shape(g, w); n.setAttribute('d', d); return n; };
const B = (g, d) => { const n = blot(g); n.setAttribute('d', d); return n; };
const rect = (x0, y0, x1, y1) => `M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} L${x0} ${y1}Z`;
function text(g, x, y, s, size, { vertical = false, weight = 600, anchor = 'middle', fill = 'currentColor' } = {}) {
  const n = el('text', { x, y, 'font-size': size, 'font-family': JP, 'font-weight': weight, fill, 'text-anchor': anchor, 'dominant-baseline': 'central' }, g);
  if (vertical) { n.setAttribute('writing-mode', 'vertical-rl'); n.setAttribute('glyph-orientation-vertical', '0'); }
  n.textContent = s;
  return n;
}

/** Tiled roof seen from the street: sweeping eave (sori), round tile ends, rafters, stacked ridge with oni tiles. */
function roof(g, { x0, x1, eave, ridge, inset, tile = 5.6, sori = 2.8, depth = 2.6, oni = true, rafters = true }) {
  const cx = (x0 + x1) / 2;
  const eaveY = (x) => eave - sori * Math.pow(Math.abs(x - cx) / ((x1 - x0) / 2), 2.2);
  S(g, `M${x0} ${eaveY(x0)} Q${cx} ${eave + sori * 0.6} ${x1} ${eaveY(x1)} L${x1 - inset} ${ridge} L${x0 + inset} ${ridge}Z`);
  // tile channels: a line from each round tile end up to the ridge, slightly concave
  const ch = [], ends = [];
  for (let x = x0 + tile * 0.8; x < x1 - tile * 0.4; x += tile) {
    const t = (x - x0) / (x1 - x0), ey = eaveY(x) - 0.4;
    const top = lerp(x0 + inset, x1 - inset, t);
    ch.push(`M${f(x)} ${f(ey - 1.6)} Q${f(lerp(x, top, 0.5) + (t - 0.5) * 2)} ${f(lerp(ey, ridge, 0.55))} ${f(top)} ${ridge + 1}`);
    ends.push(oval(x, ey, 1.35, 1.35));
  }
  P(g, ch.join(' '), SP * 0.5);
  const tiles = el('path', { d: ends.join(' '), fill: PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.55 }, g);
  // fascia + rafter ends under the eave
  P(g, `M${x0 + 1} ${eaveY(x0) + depth} Q${cx} ${eave + sori * 0.6 + depth} ${x1 - 1} ${eaveY(x1) + depth}`, SP * 0.7);
  if (rafters) {
    const r = [];
    for (let x = x0 + 5; x < x1 - 3; x += 4.2) r.push(`M${f(x)} ${f(eaveY(x) + depth + 0.6)} l0 1.8`);
    P(g, r.join(' '), SP * 0.6);
  }
  // ridge: stacked noshi tiles
  const rx0 = x0 + inset - 4, rx1 = x1 - inset + 4;
  S(g, rect(rx0, ridge - 5.5, rx1, ridge + 0.5), SP * 0.9);
  P(g, `M${rx0} ${ridge - 2.6} L${rx1} ${ridge - 2.6}`, SP * 0.5);
  if (oni) [rx0, rx1].forEach((x, i) => {
    const s = i ? 1 : -1;
    S(g, `M${x} ${ridge + 0.5} L${x} ${ridge - 6} Q${x + s * 0.5} ${ridge - 11} ${x + s * 4.5} ${ridge - 12} Q${x + s * 6.5} ${ridge - 9} ${x + s * 5} ${ridge - 6} L${x + s * 5} ${ridge + 0.5}Z`, SP * 0.85);
    P(g, `M${x + s * 1.6} ${ridge - 4} q${s * 1.4} -1 ${s * 1.8} 1`, SP * 0.5);
  });
  return { tiles };
}

/** Sen-bon kōshi: fine vertical slats with a rhythm, rails top and bottom, short kiriko slats above the upper rail. */
function koshi(g, x0, x1, y0, y1, { gap = 2.3 } = {}) {
  const top = y0 + (y1 - y0) * 0.16;
  S(g, rect(x0, y0, x1, y1), SP * 0.9);
  const d = [`M${x0} ${f(top)} L${x1} ${f(top)}`, `M${x0} ${y1 - 3} L${x1} ${y1 - 3}`];
  let k = 0;
  for (let x = x0 + gap; x < x1 - 0.5; x += gap, k++) {
    if (k % 4 === 3) d.push(`M${f(x)} ${y0} L${f(x)} ${y1}`);
    else d.push(`M${f(x)} ${f(top)} L${f(x)} ${y1 - 3}`);
  }
  P(g, d.join(' '), SP * 0.55);
}

/** Plaster window with fat vertical bars (mushiko-mado). */
function mushiko(g, x0, y0, x1, y1) {
  S(g, `M${x0 + 3} ${y0} L${x1 - 3} ${y0} Q${x1} ${y0} ${x1} ${y0 + 3} L${x1} ${y1 - 3} Q${x1} ${y1} ${x1 - 3} ${y1} L${x0 + 3} ${y1} Q${x0} ${y1} ${x0} ${y1 - 3} L${x0} ${y0 + 3} Q${x0} ${y0} ${x0 + 3} ${y0}Z`, SP);
  const d = [];
  for (let x = x0 + 4; x < x1 - 3; x += 5) d.push(`M${x} ${y0 + 2.5} Q${x - 0.6} ${(y0 + y1) / 2} ${x} ${y1 - 2.5} M${x + 2.4} ${y0 + 2.5} Q${x + 1.8} ${(y0 + y1) / 2} ${x + 2.4} ${y1 - 2.5}`);
  P(g, d.join(' '), SP * 0.55);
}

/** Inuyarai: curved bamboo fence along the base of the wall. */
function inuyarai(g, x0, x1, y0) {
  const d = [`M${x0} ${y0 + 1} Q${(x0 + x1) / 2} ${y0 - 1} ${x1} ${y0 + 1}`, `M${x0 - 1} ${BASE - 1} L${x1 + 1} ${BASE - 1}`];
  for (let x = x0 + 1.5; x < x1; x += 2.6) d.push(`M${f(x)} ${y0 + 1} Q${f(x + 0.4)} ${f((y0 + BASE) / 2 + 3)} ${f(x - 0.6)} ${BASE - 1}`);
  P(g, d.join(' '), SP * 0.5);
}

/** A window pane that lights up at night (drawn first; lattice goes on top). */
function pane(g, glowG, x0, y0, x1, y1, { thr = srnd(0.15, 0.6), lateOff = srnd(0, 1) < 0.45 ? srnd(0.93, 1.12) : 9, warmth = srnd(0, 1) } = {}) {
  const n = el('path', { d: rect(x0, y0, x1, y1), fill: PAPER }, g);
  const glow = el('ellipse', { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, rx: (x1 - x0) * 0.9 + 10, ry: (y1 - y0) * 0.9 + 10, fill: 'url(#v-warmglow)', opacity: 0 }, glowG);
  return { n, glow, thr, lateOff, warmth, x0, y0, x1, y1, lit: 0 };
}

/** Wind-blown noren hanging from a rod. */
function noren(g, x0, x1, y, len, panels, label, { open = [0.28, 0.88], red = false } = {}) {
  const grp = el('g', {}, g);
  P(grp, `M${x0 - 2} ${y} L${x1 + 2} ${y}`, SP * 1.2);
  const w = (x1 - x0) / panels;
  const cloth = Array.from({ length: panels }, (_, i) => ({ x: x0 + i * w, w: w - 0.8, n: el('path', { fill: red ? rgb(RED) : PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.8, 'stroke-linejoin': 'round' }, grp), a: 0, v: 0, ph: srnd(0, 6) }));
  const label_ = text(grp, (x0 + x1) / 2, y + len * 0.48, label, Math.min(len * 0.42, w * 0.95), { weight: 700, fill: red ? '#fbf3e6' : 'currentColor' });
  return { grp, cloth, label: label_, y, len, open, red, x0, x1, show: 1,
    draw(t, dt, wind, tau, P_) {
      const [o0, o1] = this.open;
      const isOpen = o1 > 1 ? tau > o0 || tau < o1 - 1 : tau > o0 && tau < o1;
      this.show = this.first === undefined ? (this.first = 1, isOpen ? 1 : 0) : clamp(this.show + (isOpen ? dt : -dt) * 0.8, 0, 1);
      this.grp.setAttribute('opacity', f(this.show));
      this.grp.setAttribute('transform', `translate(0 ${f(-(1 - ease(this.show)) * 6)})`);
      if (this.red) this.cloth.forEach((c) => c.n.setAttribute('fill', rgb(mix(RED, RED_NIGHT, P_.inkT))));
      let sw = 0;
      this.cloth.forEach((c, i) => {
        c.v += (-c.a * 22 + wind * 2.2 + Math.sin(t * 1.7 + c.ph) * 0.6 - c.v * 3.2) * dt;
        c.a += c.v * dt;
        const s = c.a * this.len * 0.45, flt = Math.sin(t * 3.1 + i) * 0.5;
        c.n.setAttribute('d', `M${f(c.x)} ${this.y} L${f(c.x + c.w)} ${this.y} Q${f(c.x + c.w + s * 0.4)} ${f(this.y + this.len * 0.6)} ${f(c.x + c.w + s + flt)} ${f(this.y + this.len)} L${f(c.x + s + flt)} ${f(this.y + this.len - 0.6)} Q${f(c.x + s * 0.4)} ${f(this.y + this.len * 0.6)} ${f(c.x)} ${this.y}Z`);
        sw += s;
      });
      this.label.setAttribute('transform', `translate(${f(sw / this.cloth.length * 0.6)} 0)`);
    },
    poke() { this.cloth.forEach((c) => (c.v += 3 + Math.random() * 2)); },
  };
}

/** Chōchin lantern hanging from a hook, swinging, glowing at night. */
function chochin(g, glowG, x, y, { r = 7, h = 16, label = '', red = false } = {}) {
  const grp = el('g', {}, g);
  const body = el('path', { d: `M${-r * 0.75} 4 Q${-r * 1.18} ${4 + h / 2} ${-r * 0.75} ${4 + h} L${r * 0.75} ${4 + h} Q${r * 1.18} ${4 + h / 2} ${r * 0.75} 4Z`, fill: red ? rgb(RED) : PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.8 }, grp);
  const ribs = [];
  for (let k = 1; k < 5; k++) { const yy = 4 + (h * k) / 5, wv = r * (1.18 - 0.3 * Math.abs(k / 5 - 0.5) * 2); ribs.push(`M${f(-wv * 0.95)} ${f(yy)} Q0 ${f(yy + 1)} ${f(wv * 0.95)} ${f(yy)}`); }
  P(grp, ribs.join(' '), SP * 0.4);
  B(grp, `M${-r * 0.6} 2 L${r * 0.6} 2 L${r * 0.6} 4.4 L${-r * 0.6} 4.4Z M${-r * 0.6} ${4 + h - 0.4} L${r * 0.6} ${4 + h - 0.4} L${r * 0.6} ${6.4 + h} L${-r * 0.6} ${6.4 + h}Z`);
  P(grp, 'M0 -4 L0 2', SP * 0.5);
  const lbl = label ? text(grp, 0, 4 + h / 2, label, h * 0.42, { vertical: label.length > 1, weight: 700, fill: red ? '#fbf3e6' : 'currentColor' }) : null;
  const glow = el('circle', { r: 30 + r, fill: 'url(#v-warmglow)', opacity: 0 }, glowG);
  return { grp, body, glow, lbl, x, y, h, red, a: srnd(-0.05, 0.05), v: 0, ph: srnd(0, 6), thr: srnd(0.1, 0.3),
    draw(t, dt, wind, P_) {
      this.v += (-this.a * 10 + wind * 0.5 + Math.sin(t * 0.9 + this.ph) * 0.15 - this.v * 1.1) * dt;
      this.a += this.v * dt;
      this.grp.setAttribute('transform', `translate(${this.x} ${this.y}) rotate(${f(-this.a * 57.3)})`);
      const lit = smooth(this.thr, this.thr + 0.2, P_.lamp);
      const base = this.red ? mix(RED, RED_NIGHT, P_.inkT * (1 - lit)) : P_.paper;
      this.body.setAttribute('fill', rgb(mix(base, this.red ? hex('#ff8a4a') : WARM, lit * 0.95)));
      const cx = this.x + Math.sin(this.a) * -(this.h / 2 + 4), cy = this.y + Math.cos(this.a) * (this.h / 2 + 4);
      this.glow.setAttribute('cx', f(cx)); this.glow.setAttribute('cy', f(cy));
      this.glow.setAttribute('opacity', f(lit * (0.85 + 0.15 * Math.sin(t * 7 + this.ph) * Math.sin(t * 3.3))));
    },
    poke() { this.v += (Math.random() < 0.5 ? -1 : 1) * (1.8 + Math.random()); },
  };
}

// ------------------------------------------------------------------ the street
export function buildStreet(layers, defs) {
  const { back, houses: hg, front, glow } = layers;
  const g = (parent) => el('g', {}, parent);
  const glowGrad = el('radialGradient', { id: 'v-warmglow' }, defs);
  el('stop', { offset: 0, 'stop-color': '#ffd58a', 'stop-opacity': 0.75 }, glowGrad);
  el('stop', { offset: 0.45, 'stop-color': '#ffb85c', 'stop-opacity': 0.28 }, glowGrad);
  el('stop', { offset: 1, 'stop-color': '#ffb85c', 'stop-opacity': 0 }, glowGrad);

  const windows = [], lanterns = [], norens = [];

  // ---------- cherry tree behind the roofs (canopy rises above the alley)
  const tree = g(back);
  P(tree, 'M452 344 Q450 300 446 268 Q440 236 420 214 M462 344 Q463 300 468 262 Q474 236 500 214 M447 262 Q458 248 456 226 Q455 206 462 192', SP * 1.1);
  P(tree, 'M430 224 l-10 -6 M490 222 l12 -4 M456 212 l-8 -10 M468 236 q10 -4 14 -12', SP * 0.7);
  const canopy = g(tree);
  const blossoms = [];
  [[414, 206, 26], [502, 200, 28], [458, 176, 30], [434, 186, 22], [486, 180, 22], [460, 204, 26], [520, 216, 18], [400, 222, 18]].forEach(([cx, cy, r]) => {
    const pts = [];
    for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 2; const rr = r + 2 * Math.abs(Math.sin(a * 6.5)) - 0.6 * Math.sin(a * 3); pts.push([cx + rr * Math.cos(a), cy + rr * 0.78 * Math.sin(a)]); }
    S(canopy, 'M' + pts.map(pt).join('L') + 'Z', SP * 0.8);
  });
  const fl = [];
  for (let i = 0; i < 110; i++) {
    const a = srnd(0, 6.28), d = Math.sqrt(srnd(0, 1));
    const [cx, cy, r] = [[458, 196, 54], [414, 210, 26], [502, 204, 28]][i % 3];
    const x = cx + Math.cos(a) * r * d * 0.95, y = cy + Math.sin(a) * r * 0.62 * d;
    blossoms.push([x, y]);
    const s = srnd(0.8, 1.3);
    fl.push(`M${f(x)} ${f(y - s)} l${f(s * 0.95)} ${f(s * 0.7)} l${f(-s * 0.4)} ${f(s * 1.1)} l${f(-s * 1.1)} 0 l${f(-s * 0.4)} ${f(-s * 1.1)}Z`);
  }
  P(canopy, fl.join(' '), SP * 0.45);

  // ---------- alley between H2 and H3: stone path to a small gate and a lantern
  const alley = g(back);
  S(alley, rect(432, 250, 482, BASE), SP * 0.6);
  // side walls receding to a small gate; plank lines follow the perspective
  S(alley, 'M432 258 L449 286 L449 306 L432 344Z', SP * 0.6);
  S(alley, 'M482 258 L465 286 L465 306 L482 344Z', SP * 0.6);
  P(alley, 'M436 265 L436 337 M440 271 L440 330 M444 278 L444 322 M478 265 L478 337 M474 271 L474 330 M470 278 L470 322', SP * 0.4);
  S(alley, rect(449, 288, 465, 306), SP * 0.7);
  S(alley, 'M446 289 L468 289 L465 283 L449 283Z', SP * 0.7);
  P(alley, 'M457 289 L457 306', SP * 0.5);
  // stepping stones shrinking into the distance
  [[457, 339, 7, 2.4], [456, 328, 5.6, 1.9], [458, 319, 4.4, 1.5], [457, 312, 3.4, 1.1]].forEach(([x, y, rx, ry]) => S(alley, oval(x, y, rx, ry), SP * 0.5));
  const alleyLamp = pane(alley, glow, 453.5, 293, 460.5, 301, { thr: 0.05, lateOff: 9 });
  P(alley, 'M457 293 L457 301 M453.5 297 L460.5 297', SP * 0.4);

  // ================= H1 · sake shop (酒屋) x 18–236
  const h1 = g(hg);
  [[26, 206], [220, 206]].forEach(([x, y]) => { S(h1, rect(x, y + 4, x + 8, 262), SP * 0.8); S(h1, `M${x - 3} ${y + 5} L${x + 11} ${y + 5} L${x + 8} ${y} L${x} ${y}Z`, SP * 0.7); });
  S(h1, rect(32, 214, 222, 262));
  roof(h1, { x0: 12, x1: 242, eave: 218, ridge: 184, inset: 28 });
  mushiko(h1, 46, 230, 128, 252);
  // horizontal signboard under the eave
  S(h1, rect(140, 228, 212, 250), SP * 1.1);
  P(h1, rect(142.5, 230.5, 209.5, 247.5), SP * 0.5);
  text(h1, 176, 239.5, '白梅 酒', 11.5, { weight: 800 });
  S(h1, rect(20, 270, 234, BASE));
  roof(h1, { x0: 14, x1: 240, eave: 274, ridge: 262, inset: 6, tile: 5, sori: 1.4, oni: false });
  windows.push(pane(h1, glow, 28, 284, 88, 336));
  koshi(h1, 26, 90, 280, 340);
  // door with noren
  S(h1, rect(114, 280, 166, BASE), SP * 0.9);
  windows.push(pane(h1, glow, 117, 283, 163, BASE - 1, { thr: 0.05, lateOff: 0.9 }));
  P(h1, 'M117 314 L163 314 M140 283 L140 344', SP * 0.45);
  norens.push(noren(h1, 116, 164, 281, 26, 3, '酒', { open: [0.29, 0.86] }));
  // sake barrels (komodaru) stacked to the right
  const barrel = (x, y, w, h) => {
    S(h1, `M${x} ${y + 2} Q${x + w / 2} ${y - 1} ${x + w} ${y + 2} L${x + w} ${y + h - 2} Q${x + w / 2} ${y + h + 1} ${x} ${y + h - 2}Z`, SP * 0.9);
    P(h1, `M${x} ${y + 6} Q${x + w / 2} ${y + 3.5} ${x + w} ${y + 6} M${x} ${y + h - 6} Q${x + w / 2} ${y + h - 3.5} ${x + w} ${y + h - 6} M${x + 3} ${y + 1} L${x + 3} ${y + h - 1} M${x + w - 3} ${y + 1} L${x + w - 3} ${y + h - 1}`, SP * 0.5);
    S(h1, oval(x + w / 2, y + h / 2, w * 0.24, h * 0.24), SP * 0.6);
    text(h1, x + w / 2, y + h / 2, '酒', w * 0.26, { weight: 800 });
  };
  barrel(172, 318, 28, 26); barrel(202, 318, 28, 26); barrel(187, 292, 28, 26);
  // sugidama (cedar ball) hanging by the door
  P(h1, 'M102 274 L102 280', SP * 0.6);
  const sug = [];
  for (let i = 0; i < 360; i++) { const a = srnd(0, 6.28), d = Math.sqrt(srnd(0, 1)) * 11.2; const x = 102 + Math.cos(a) * d, y = 292 + Math.sin(a) * d; const b = srnd(0, 6.28); sug.push(`M${f(x)} ${f(y)} l${f(Math.cos(b) * 1.6)} ${f(Math.sin(b) * 1.6)}`); }
  S(h1, oval(102, 292, 12, 12), SP * 0.8);
  P(h1, sug.join(' '), SP * 0.45);
  P(h1, 'M97 303 l10 0 M100 303 l-1 5 M105 303 l1 5', SP * 0.5);

  // ================= H2 · house with balcony x 236–432
  const h2 = g(hg);
  S(h2, rect(246, 200, 424, 260));
  roof(h2, { x0: 230, x1: 438, eave: 204, ridge: 168, inset: 26 });
  // upper shoji windows (left one slides open on click)
  const shojiWin = pane(h2, glow, 262, 212, 318, 250, { thr: 0.12, lateOff: 1.08 });
  windows.push(shojiWin);
  const interior = g(h2); // revealed when the shoji slides
  const room = el('path', { d: rect(262, 212, 318, 250), fill: '#3a2c22' }, interior);
  const person = g(interior);
  S(person, 'M294 250 Q295 236 304 234 Q313 236 314 250Z', SP * 0.8);
  const face = S(person, oval(304, 227, 5, 6), SP * 0.8);
  B(person, 'M298.6 226 Q299 219 304 219 Q309.4 219 309.4 226 Q307 222.5 304 223 Q301 222.5 298.6 226Z M302 219.4 a2.6 2.2 0 1 1 4 0Z');
  const waveArm = limb(person, 3, SP * 0.7);
  const slide = g(h2); // the sliding panel
  const shojiGrid = (gg, x0, y0, x1, y1, cols, rows) => {
    const d = [rect(x0, y0, x1, y1)];
    for (let i = 1; i < cols; i++) { const x = lerp(x0, x1, i / cols); d.push(`M${f(x)} ${y0} L${f(x)} ${y1}`); }
    for (let j = 1; j < rows; j++) { const y = lerp(y0, y1, j / rows); d.push(`M${x0} ${f(y)} L${x1} ${f(y)}`); }
    P(gg, d.join(' '), SP * 0.5);
  };
  const slidePane = el('path', { d: rect(290, 212, 318, 250), fill: PAPER }, slide);
  shojiGrid(slide, 290, 212, 318, 250, 3, 5);
  shojiGrid(h2, 262, 212, 290, 250, 3, 5);
  P(h2, rect(262, 212, 318, 250), SP);
  windows.push(pane(h2, glow, 340, 212, 404, 250, { thr: 0.3 }));
  shojiGrid(h2, 340, 212, 372, 250, 3, 5); shojiGrid(h2, 372, 212, 404, 250, 3, 5);
  P(h2, rect(340, 212, 404, 250), SP);
  // balcony rail
  const rail = g(h2);
  S(rail, rect(250, 238, 418, 258), SP * 0.8);
  const bal = [];
  for (let x = 254; x < 416; x += 5.2) bal.push(`M${f(x)} 241 L${f(x)} 256`);
  P(rail, bal.join(' ') + ' M250 241 L418 241', SP * 0.5);
  S(h2, rect(240, 268, 428, BASE));
  roof(h2, { x0: 232, x1: 436, eave: 272, ridge: 260, inset: 6, tile: 5, sori: 1.4, oni: false });
  windows.push(pane(h2, glow, 246, 282, 294, 322));
  koshi(h2, 244, 296, 278, 324);
  windows.push(pane(h2, glow, 366, 282, 422, 322, { thr: 0.25 }));
  koshi(h2, 364, 424, 278, 324);
  inuyarai(h2, 244, 296, 326); inuyarai(h2, 364, 424, 326);
  // lattice sliding entrance door
  S(h2, rect(304, 278, 356, BASE), SP * 0.9);
  windows.push(pane(h2, glow, 306, 280, 354, BASE - 1, { thr: 0.2 }));
  const dd = [];
  for (let x = 308; x < 354; x += 3.4) dd.push(`M${f(x)} 280 L${f(x)} 343`);
  for (let y = 290; y < 342; y += 12) dd.push(`M306 ${y} L354 ${y}`);
  P(h2, dd.join(' ') + ' M330 280 L330 344', SP * 0.45);
  S(h2, rect(316, 270, 344, 276), SP * 0.6);
  text(h2, 330, 273, '伊 藤', 4.6, { weight: 700 });
  // potted plants at the door
  ([[298, 'pine'], [360, 'asagao']] as Array<[number, string]>).forEach(([x, kind]) => {
    S(h2, `M${x - 5} 336 L${x + 5} 336 L${x + 4} ${BASE} L${x - 4} ${BASE}Z`, SP * 0.7);
    if (kind === 'pine') {
      P(h2, `M${x} 336 Q${x - 3} 330 ${x + 1} 325 Q${x + 4} 321 ${x - 1} 316 M${x + 1} 325 Q${x + 5} 324 ${x + 7} 321`, SP * 0.8);
      [[x - 4, 324, 5.2], [x + 6, 319.5, 4], [x - 1, 314, 4.4]].forEach(([px, py, r]) => {
        S(h2, `M${px - r} ${py} Q${px - r * 0.8} ${py - 2.6} ${px - r * 0.3} ${py - 2.2} Q${px} ${py - 3.4} ${px + r * 0.4} ${py - 2.4} Q${px + r} ${py - 2.2} ${px + r} ${py} Q${px} ${py + 1} ${px - r} ${py}Z`, SP * 0.6);
        P(h2, Array.from({ length: 4 }, (_, k) => `M${f(px - r * 0.6 + k * r * 0.4)} ${py - 0.5} l0.6 -1.4`).join(' '), SP * 0.35);
      });
    }
    else { P(h2, `M${x - 2} 336 L${x - 2} 300 M${x + 2} 336 L${x + 2} 300 M${x - 3} 312 L${x + 3} 312 M${x - 3} 324 L${x + 3} 324`, SP * 0.5); P(h2, `M${x} 334 q-4 -8 1 -14 q4 -6 -1 -12 q-3 -4 1 -8`, SP * 0.5); [[x - 3, 316], [x + 3, 306], [x - 2, 326]].forEach(([fx, fy]) => S(h2, oval(fx, fy, 2.2, 1.8), SP * 0.5)); }
  });
  // fūrin under the main eave
  const furinG = g(h2);

  // ================= H3 · tea house (茶屋) x 482–704
  const h3 = g(hg);
  S(h3, rect(496, 224, 690, 256));
  roof(h3, { x0: 476, x1: 710, eave: 228, ridge: 196, inset: 24 });
  mushiko(h3, 520, 232, 668, 250);
  S(h3, rect(486, 264, 700, BASE));
  roof(h3, { x0: 478, x1: 708, eave: 268, ridge: 256, inset: 5, tile: 5, sori: 1.6, oni: false });
  // open shop front: interior (lights up), counter, menu tags, sudare
  windows.push(pane(h3, glow, 492, 272, 614, 330, { thr: 0.02, lateOff: 0.94 }));
  P(h3, 'M496 308 L610 308', SP * 0.55);
  const tags = ['だんご', '甘酒', '抹茶', 'おしるこ', '草餅'];
  tags.forEach((s, i) => { const x = 506 + i * 22; P(h3, `M${x} 283 L${x} 285.5`, SP * 0.4); S(h3, rect(x - 5, 285.5, x + 5, 307), SP * 0.6); text(h3, x, 296.2, s, 4.6, { vertical: true, weight: 700 }); });
  S(h3, rect(490, 318, 616, 324), SP * 0.9); // counter
  P(h3, 'M494 324 L494 344 M612 324 L612 344', SP * 0.7);
  // dango on a plate on the counter
  [528, 574].forEach((x) => { S(h3, `M${x - 9} 318 Q${x} 321 ${x + 9} 318 Z`, SP * 0.6); P(h3, `M${x - 7} 315 L${x + 8} 307`, SP * 0.6); [0, 1, 2].forEach((k) => S(h3, oval(x - 4 + k * 4.4, 313.5 - k * 2.4, 2.3, 2.3), SP * 0.6)); });
  const sudare = g(h3);
  S(sudare, rect(490, 270, 616, 282), SP * 0.7);
  P(sudare, Array.from({ length: 5 }, (_, i) => `M490 ${272 + i * 2} L616 ${272 + i * 2}`).join(' ') + ' M520 268 L520 284 M586 268 L586 284', SP * 0.35);
  S(sudare, `M488 268.5 a2.5 2.5 0 0 0 0 5 L618 273.5 a2.5 2.5 0 0 0 0 -5Z`, SP * 0.7);
  // entrance with noren
  S(h3, rect(620, 270, 694, BASE), SP * 0.9);
  windows.push(pane(h3, glow, 622, 272, 692, BASE - 1, { thr: 0.02, lateOff: 0.95 }));
  norens.push(noren(h3, 624, 690, 271, 24, 4, '茶', { open: [0.31, 0.9] }));
  lanterns.push(chochin(h3, glow, 498, 268, { r: 6.4, h: 15, label: '茶', red: true }));
  lanterns.push(chochin(h3, glow, 696, 268, { r: 6.4, h: 15, label: '茶', red: true }));
  // bench (shōgi) and the red parasol (nodategasa) out front
  const out = g(front);
  S(out, `M586 351 L586 296 M589 351 L589 296`, SP * 0.6);
  P(out, 'M587.5 352 L587.5 262', SP * 0.9);
  let rimD = 'M536 273 Q548 256 587.5 252 Q627 256 639 273';
  for (let i = 12; i > 0; i--) { const xa = lerp(536, 639, i / 12), xb = lerp(536, 639, (i - 1) / 12); rimD += ` Q${f((xa + xb) / 2)} 276.4 ${f(xb)} 273`; }
  const parasol = el('path', { d: rimD + 'Z', fill: rgb(RED), stroke: 'currentColor', 'stroke-width': SP * 0.8 }, out);
  P(out, Array.from({ length: 13 }, (_, i) => `M587.5 252.6 L${f(lerp(538, 637, i / 12))} 272.4`).join(' '), SP * 0.35);
  S(out, oval(587.5, 252, 3.2, 1.6), SP * 0.6);
  const benchTop = el('path', { d: rect(516, 330, 600, 336), fill: rgb(RED), stroke: 'currentColor', 'stroke-width': SP * 0.8 }, out);
  S(out, rect(514, 336, 602, 339), SP * 0.7);
  P(out, 'M520 339 L520 352 M596 339 L596 352 M522 339 L522 352 M594 339 L594 352 M520 348 L596 348', SP * 0.7);
  // a teacup and a plate left on the bench
  S(out, 'M584 330 L585 325 L591 325 L592 330Z', SP * 0.6);

  // ================= H4 · public bath (銭湯) x 704–948
  const h4 = g(hg);
  // chimney behind the roof
  const chim = g(back);
  S(chim, 'M893 252 L895 72 L907 72 L909 252Z', SP);
  P(chim, 'M894.3 100 L907.7 100 M894 130 L908 130 M893.7 170 L908.3 170 M893.4 210 L908.6 210', SP * 0.55);
  S(chim, rect(892, 66, 910, 72), SP * 0.9);
  text(chim, 901, 150, 'ゆ', 9, { weight: 800 });
  S(h4, rect(708, 252, 944, BASE));
  roof(h4, { x0: 700, x1: 952, eave: 256, ridge: 214, inset: 44 });
  // karahafu: undulating gable over the entrance
  S(h4, 'M766 262 Q780 262 790 250 Q806 226 826 222 Q846 226 862 250 Q872 262 886 262 L882 268 Q870 268 860 258 Q846 236 826 232 Q806 236 792 258 Q782 268 770 268Z', SP);
  P(h4, 'M790 252 Q806 230 826 226 Q846 230 862 252', SP * 0.5);
  S(h4, 'M821 222 Q826 214 831 222Z', SP * 0.7);
  P(h4, 'M800 262 L800 344 M852 262 L852 344', SP);
  windows.push(pane(h4, glow, 803, 266, 849, BASE - 1, { thr: 0.0, lateOff: 9 }));
  norens.push(noren(h4, 804, 848, 266, 30, 2, 'ゆ', { open: [0.6, 1.08], red: false }));
  // clerestory windows
  windows.push(pane(h4, glow, 716, 266, 774, 292, { thr: 0.05, lateOff: 9 }));
  windows.push(pane(h4, glow, 878, 266, 936, 292, { thr: 0.05, lateOff: 9 }));
  [[716, 774], [878, 936]].forEach(([a, b]) => shojiGrid(h4, a, 266, b, 292, 6, 2));
  // signboard + wainscot
  S(h4, rect(714, 300, 734, 344), SP * 0.9);
  text(h4, 724, 322, '松の湯', 9, { vertical: true, weight: 800 });
  const ws = [];
  for (let x = 740; x < 800; x += 4) ws.push(`M${x} 304 L${x} 344`);
  for (let x = 856; x < 940; x += 4) ws.push(`M${x} 304 L${x} 344`);
  P(h4, ws.join(' ') + ' M738 304 L800 304 M852 304 L940 304', SP * 0.5);
  // bucket pyramid (yellow bath pails)
  const pail = (x, y) => { const n = el('path', { d: `M${x - 6} ${y} L${x + 6} ${y} L${x + 5} ${y + 9} L${x - 5} ${y + 9}Z`, fill: '#e9c45a', stroke: 'currentColor', 'stroke-width': SP * 0.7 }, h4); P(h4, `M${x - 5.6} ${y + 2.4} L${x + 5.6} ${y + 2.4}`, SP * 0.4); return n; };
  const pails = [pail(902, 335), pail(915, 335), pail(928, 335), pail(908.5, 326), pail(921.5, 326), pail(915, 317)];
  // lanterns at the bath
  lanterns.push(chochin(h4, glow, 790, 262, { r: 5.6, h: 13, label: 'ゆ' }));
  lanterns.push(chochin(h4, glow, 862, 262, { r: 5.6, h: 13, label: 'ゆ' }));

  // ---------- utility pole, wires, street lamp (in front of the alley)
  const pole = g(front);
  S(pole, 'M465 352 L466.5 98 L470.5 98 L472 352Z', SP * 0.9);
  P(pole, 'M466 140 L471 140 M466 200 L471 200 M466 260 L471 260 M466 320 L471 320', SP * 0.5);
  S(pole, rect(446, 110, 490, 114), SP * 0.8);
  [450, 458, 478, 486].forEach((x) => S(pole, `M${x - 1.6} 110 L${x + 1.6} 110 L${x + 1.2} 105 L${x - 1.2} 105Z`, SP * 0.5));
  S(pole, 'M472 140 Q480 140 480 146 L480 170 Q480 176 472 176Z', SP * 0.8); // transformer
  P(pole, 'M472 150 L479 150 M472 160 L479 160', SP * 0.45);
  // lamp arm
  P(pole, 'M466 226 Q452 222 446 230', SP * 0.8);
  S(pole, 'M439 230 L453 230 L450 236 L442 236Z', SP * 0.8);
  const streetLamp = el('ellipse', { cx: 446, cy: 237, rx: 3, ry: 1.6, fill: PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.5 }, pole);
  const lampCone = el('path', { d: 'M441 237 L451 237 L496 352 L396 352Z', fill: 'url(#v-cone)', opacity: 0 }, glow);
  const cone = el('linearGradient', { id: 'v-cone', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el('stop', { offset: 0, 'stop-color': '#ffe2a8', 'stop-opacity': 0.5 }, cone);
  el('stop', { offset: 1, 'stop-color': '#ffe2a8', 'stop-opacity': 0.06 }, cone);
  const lampGlow = el('circle', { cx: 446, cy: 237, r: 34, fill: 'url(#v-warmglow)', opacity: 0 }, glow);
  // wires sag to both sides; sparrows sit on the right-hand wire
  const wireY = (x) => { if (x >= 488) { const u = (x - 488) / (970 - 488); return 112 + (108 - 112) * u + 26 * 4 * u * (1 - u); } const u = (446 - x) / (446 + 10); return 112 + (104 - 112) * u + 22 * 4 * u * (1 - u); };
  const wires = g(back);
  const wd = [];
  for (const [a, b, off] of [[488, 970, 0], [446, -10, 0], [488, 970, 7], [446, -10, 7]]) {
    const pts = []; for (let k = 0; k <= 30; k++) { const x = lerp(a, b, k / 30); pts.push([x, wireY(x) + off * (1 + 0.3 * Math.sin(k))]); }
    wd.push('M' + pts.map(pt).join('L'));
  }
  P(wires, wd.join(' '), SP * 0.5);

  // ---------- the street itself
  const street = g(front);
  P(street, `M0 ${BASE} L960 ${BASE}`, SP);
  const cracks = [];
  for (let i = 0; i < 34; i++) { const x = srnd(0, 960), y = srnd(350, 380); cracks.push(`M${f(x)} ${f(y)} l${f(srnd(6, 16))} ${f(srnd(-0.4, 0.4))}`); }
  P(street, cracks.join(' '), SP * 0.45);
  // stone gutter slabs along the houses
  const gut = [];
  for (let x = 0; x < 960; x += srnd(16, 26)) gut.push(`M${f(x)} ${BASE} L${f(x)} ${BASE + 4}`);
  P(street, `M0 ${BASE + 4} L960 ${BASE + 4} ` + gut.join(' '), SP * 0.5);

  // ---------- fūrin (wind chime) under H2's eave
  const furin = (() => {
    const x = 412, y = 207;
    const grp = g(furinG);
    const cord = pen(grp, SP * 0.45), bell = el('path', { fill: '#e8f2f4', stroke: 'currentColor', 'stroke-width': SP * 0.7 }, grp);
    const clap = pen(grp, SP * 0.45), strip = el('path', { fill: PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.55 }, grp);
    const rings = pen(grp, SP * 0.5);
    let a = 0, v = 0, sa = 0, sv = 0, ring = 0;
    return {
      x, y,
      draw(t, dt, wind) {
        v += (-a * 14 + wind * 0.9 + wobble(t * 0.7) * 0.4 - v * 1.4) * dt; a += v * dt;
        sv += (-(sa - a * 1.6) * 9 + wind * 2.2 + Math.sin(t * 2.3) * 0.6 - sv * 1.6) * dt; sa += sv * dt;
        ring = Math.max(0, ring - dt * 0.9);
        const bx = x + Math.sin(a) * 6, by = y + Math.cos(a) * 6;
        cord.setAttribute('d', `M${x} ${y - 3} L${f(bx)} ${f(by)}`);
        bell.setAttribute('d', `M${f(bx - 4)} ${f(by + 5)} Q${f(bx - 4.2)} ${f(by - 0.6)} ${f(bx)} ${f(by - 0.6)} Q${f(bx + 4.2)} ${f(by - 0.6)} ${f(bx + 4)} ${f(by + 5)}Z`);
        const cx = bx + Math.sin(sa) * 4, cy = by + 5 + Math.cos(sa) * 4;
        clap.setAttribute('d', `M${f(bx)} ${f(by)} L${f(cx)} ${f(cy)} M${f(cx - 0.8)} ${f(cy)} l1.6 0`);
        const sx = cx + Math.sin(sa) * 9, sy = cy + Math.cos(sa) * 9;
        strip.setAttribute('d', `M${f(cx - 1.6)} ${f(cy + 1)} L${f(cx + 1.6)} ${f(cy + 1)} L${f(sx + 1.6)} ${f(sy)} L${f(sx - 1.6)} ${f(sy)}Z`);
        rings.setAttribute('d', ring > 0.02 ? [7, 11].map((r) => `M${f(bx - r * 0.7)} ${f(by - r * 0.1 - 4)} Q${f(bx)} ${f(by - r - 4)} ${f(bx + r * 0.7)} ${f(by - r * 0.1 - 4)}`).join(' ') : '');
        rings.setAttribute('opacity', f(ring));
      },
      poke() { v += 2.4; sv += 6; ring = 1; },
      ring() { ring = 1; },
      get swing() { return sv; },
    };
  })();

  // ---------- the shoji someone opens
  const shoji = (() => {
    let s = -1;
    return {
      hit: rect(260, 210, 320, 252),
      poke() { if (s < 0) s = 0; },
      draw(t, dt, P_) {
        let open = 0;
        if (s >= 0) { s += dt; open = s < 0.6 ? ease(s / 0.6) : s < 4.4 ? 1 : 1 - ease((s - 4.4) / 0.6); if (s > 5) s = -1; }
        slide.setAttribute('transform', `translate(${f(-open * 27.5)} 0)`);
        interior.setAttribute('opacity', f(open > 0.001 ? 1 : 0));
        const lit = shojiWin.lit;
        room.setAttribute('fill', rgb(mix(hex('#4a3a2c'), hex('#f0a85a'), lit * 0.85)));
        // the person leans into view and waves
        const lean = ease(clamp((s - 0.4) / 0.6, 0, 1)) * (1 - ease(clamp((s - 4.0) / 0.5, 0, 1)));
        person.setAttribute('transform', `translate(${f((1 - lean) * 22)} 0)`);
        const wv = Math.sin(Math.max(0, s - 1) * 9) * 0.5 * lean;
        const sh = [297, 238], el2 = [293, 231], hand = [293 + Math.sin(wv) * 5, 222 - Math.cos(wv) * 2];
        waveArm.draw([sh, el2, hand], [0.2, 0.2]);
        slidePane.setAttribute('fill', rgb(mix(P_.paper, WARM, lit * 0.9)));
      },
    };
  })();

  return {
    windows, lanterns, norens, furin, shoji, blossoms, canopy, pails,
    parasol, benchTop, alleyLamp,
    bench: { x0: 518, x1: 598, y: 330 },
    chimney: [901, 64] as [number, number],
    wireY,
    lamp: { node: streetLamp, cone: lampCone, glow: lampGlow, x: 446, y: 237 },
    applyRed(P_) {
      const c = rgb(mix(RED, RED_NIGHT, P_.inkT));
      parasol.setAttribute('fill', c); benchTop.setAttribute('fill', c);
      pails.forEach((p) => p.setAttribute('fill', rgb(mix(hex('#e9c45a'), hex('#6d6240'), P_.inkT))));
    },
  };
}
