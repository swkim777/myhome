// Street surface, canal wall, water, reflections, willow, koi, fireflies.
import { el, pen, shape, blot, f, pt, PAPER } from '../../lib/ink.ts';
import { W, H, BASE, EDGE, WATER, SP, rnd, srnd, clamp, lerp, smooth, ease, oval, rgb, hex, mix, wobble } from './kit.ts';

const WARM = hex('#ffcf7e');

export function buildCanal({ ground, canalL, willowL, glow }, defs) {
  // ---------- street surface and gutter
  el('path', { d: `M-10 ${BASE} L${W + 10} ${BASE} L${W + 10} ${EDGE} L-10 ${EDGE}Z`, fill: PAPER }, ground);

  // ---------- canal wall: coping stones then two courses of masonry
  const wall = el('g', {}, canalL);
  shape(wall, SP).setAttribute('d', `M-10 ${EDGE} L${W + 10} ${EDGE} L${W + 10} ${WATER} L-10 ${WATER}Z`);
  const d = [`M-10 ${EDGE + 5} L${W + 10} ${EDGE + 5}`, `M-10 ${EDGE + 10.5} Q${W / 2} ${EDGE + 10} ${W + 10} ${EDGE + 10.6}`];
  for (let x = srnd(0, 20); x < W; x += srnd(28, 44)) d.push(`M${f(x)} ${EDGE} l0.4 5`);
  [[EDGE + 5, EDGE + 10.5, 0], [EDGE + 10.5, WATER, 8]].forEach(([y0, y1, o]) => {
    for (let x = srnd(0, 14) + o; x < W; x += srnd(12, 24)) d.push(`M${f(x)} ${f(y0 + 0.4)} Q${f(x + srnd(-1, 1))} ${f((y0 + y1) / 2)} ${f(x + srnd(-0.6, 0.6))} ${f(y1 - 0.4)}`);
  });
  for (let i = 0; i < 40; i++) { const x = srnd(4, W - 4), y = srnd(EDGE + 6, WATER - 2); d.push(`M${f(x)} ${f(y)} l${f(srnd(1, 2.6))} ${f(srnd(-0.3, 0.3))}`); }
  pen(wall, SP * 0.5).setAttribute('d', d.join(' '));
  // moss tufts hanging over the coping
  const moss = [];
  for (let i = 0; i < 26; i++) { const x = srnd(0, W); moss.push(`M${f(x)} ${EDGE + 5} q-1 3 0.4 5 M${f(x + 2)} ${EDGE + 5} q1 2.6 -0.2 4.4`); }
  pen(wall, SP * 0.45).setAttribute('d', moss.join(' '));

  // ---------- water
  const water = el('path', { d: `M-10 ${WATER} L${W + 10} ${WATER} L${W + 10} ${H + 10} L-10 ${H + 10}Z` }, canalL);
  pen(canalL, SP * 0.8).setAttribute('d', `M-10 ${WATER} L${W + 10} ${WATER}`);
  const reflG = el('g', {}, canalL);
  const ripG = el('g', {}, canalL);
  const lines = Array.from({ length: 46 }, (_, i) => ({ x: rnd(-40, W), y: WATER + 5 + (i % 9) * 8.4 + rnd(-2, 2), len: rnd(10, 34), v: rnd(4, 9), n: pen(ripG, SP * 0.5) }));
  const rings = [];
  const ringG = el('g', {}, canalL);
  const ring = (x, y, n = 1, big = 1) => { for (let i = 0; i < n; i++) rings.push({ x, y, t: -i * 0.22, big, n: el('ellipse', { fill: 'none', stroke: 'currentColor', 'stroke-width': SP * 0.55 }, ringG) }); };

  // reflections: light streaks under each lit source
  const refl = [];
  const addRefl = (src, x, w, warm = true) => {
    const strokes = Array.from({ length: 9 }, (_, k) => el('path', { stroke: warm ? '#ffcf7e' : '#f3ecd6', 'stroke-width': 1.4 - k * 0.08, 'stroke-linecap': 'round', fill: 'none' }, reflG));
    refl.push({ src, x, w, strokes, warm });
  };

  // floating petals land here
  const floating = [];
  const floatG = el('g', {}, canalL);

  // ---------- koi (jumps where you click, or now and then)
  const koiG = el('g', { opacity: 0 }, canalL);
  const koiBody = el('path', { fill: '#f4ede0', stroke: 'currentColor', 'stroke-width': SP * 0.8 }, koiG);
  const koiSpots = el('path', { fill: '#d4552f' }, koiG);
  const koiFin = shape(koiG, SP * 0.6), koiEye = el('circle', { r: 0.9, fill: 'currentColor' }, koiG);
  let koi = null;
  const jump = (x) => { if (koi) return; koi = { x: clamp(x, 60, W - 60), t: 0, dir: Math.random() < 0.5 ? -1 : 1 }; ring(koi.x, WATER + 14, 2); };

  // ---------- weeping willow on the near bank (left)
  const willow = el('g', {}, willowL);
  shape(willow, SP).setAttribute('d', 'M14 384 Q20 340 16 300 Q12 262 34 236 Q46 222 40 206 L46 206 Q54 226 42 244 Q24 270 28 306 Q32 344 28 384Z');
  pen(willow, SP * 0.8).setAttribute('d', 'M36 238 Q66 214 104 212 M30 260 Q60 246 86 252 M40 222 Q22 204 -4 202 M42 214 Q56 196 82 190');
  pen(willow, SP * 0.45).setAttribute('d', 'M20 330 q3 -6 0 -12 M24 290 q-3 -6 1 -12 M18 360 q2 -4 -1 -8');
  const strands = [];
  const roots = [[104, 212], [86, 252], [-4, 202], [82, 190], [64, 216], [52, 252], [20, 206], [70, 196], [94, 230], [40, 226], [6, 214]];
  roots.forEach(([rx, ry], i) => {
    const n = 4;
    for (let k = 0; k < n; k++) {
      const x = rx + srnd(-10, 10), y = ry + srnd(-3, 5), len = srnd(80, 150);
      strands.push({ x, y, len, ph: srnd(0, 6), stiff: srnd(0.7, 1.3), n: pen(willow, SP * 0.5), leaves: pen(willow, SP * 0.45), a: 0, v: 0 });
    }
  });
  let willowKick = 0;

  // ---------- fireflies (night) and moths at the street lamp
  const flies = Array.from({ length: 22 }, (_, i) => ({ cx: srnd(20, W - 20), cy: srnd(300, 460), ph: srnd(0, 50), sp: srnd(0.4, 0.9), blink: srnd(2, 5),
    n: el('circle', { r: 5.5, fill: 'url(#v-fly)' }, glow), dot: el('circle', { r: 0.9, fill: '#f1ffb4' }, glow) }));
  const fly = el('radialGradient', { id: 'v-fly' }, defs);
  el('stop', { offset: 0, 'stop-color': '#e9ff9a', 'stop-opacity': 0.9 }, fly);
  el('stop', { offset: 1, 'stop-color': '#c8ff6a', 'stop-opacity': 0 }, fly);
  const moths = Array.from({ length: 4 }, () => ({ ph: rnd(0, 6), r: rnd(5, 12), sp: rnd(3, 6), n: el('circle', { r: 0.7, fill: '#fff4d2' }, glow) }));

  return {
    ring, jump, addRefl,
    floatPetal(p) { floating.push({ x: p.x, y: WATER + rnd(3, 40), r: p.r, life: 0, n: el('ellipse', { rx: 1.5, ry: 0.7, fill: '#f6dfe4', stroke: 'currentColor', 'stroke-width': SP * 0.4 }, floatG) }); },
    poke(x, y) { if (y > WATER) { if (Math.random() < 0.7 || !koi) jump(x); ring(x, y, 3); } },
    willowPoke() { willowKick = 1; strands.forEach((s) => (s.v += rnd(1.5, 3))); },
    draw(t, dt, P, wind, lights, tau, lampOn, moonX?: number) {
      water.setAttribute('fill', rgb(mix(P.paper, P.inkT > 0.5 ? hex('#0f1730') : hex('#bfd0d8'), P.inkT > 0.5 ? 0.45 : 0.32)));
      lines.forEach((l) => {
        l.x += (l.v + wind * 4) * dt; if (l.x > W + 20) l.x = -40; if (l.x < -50) l.x = W + 10;
        const y = l.y + Math.sin(t * 1.3 + l.x * 0.04) * 0.7;
        l.n.setAttribute('d', `M${f(l.x)} ${f(y)} Q${f(l.x + l.len / 2)} ${f(y - 1.2)} ${f(l.x + l.len)} ${f(y)}`);
      });
      if (Math.random() < dt * 0.5) ring(rnd(40, W - 40), rnd(WATER + 10, H - 10), 1, 0.6);
      if (P.night < 0.5 && Math.random() < dt * 0.03) jump(rnd(120, W - 120));
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i]; r.t += dt;
        if (r.t < 0) { r.n.setAttribute('opacity', 0); continue; }
        r.n.setAttribute('cx', f(r.x)); r.n.setAttribute('cy', f(r.y));
        r.n.setAttribute('rx', f((2 + r.t * 12) * r.big)); r.n.setAttribute('ry', f((0.6 + r.t * 2.2) * r.big));
        r.n.setAttribute('opacity', f(Math.max(0, 1 - r.t / 1.6)));
        if (r.t > 1.6) { r.n.remove(); rings.splice(i, 1); }
      }
      // reflections
      refl.forEach((r) => {
        const lit = r.src();
        r.strokes.forEach((s, k) => {
          if (lit < 0.02) { s.setAttribute('d', ''); return; }
          const y = WATER + 6 + k * 6.5, jit = Math.sin(t * 2.2 + k * 1.7 + r.x * 0.1) * (2 + k * 0.5);
          const w = r.w * (1 - k * 0.07) * (0.7 + 0.3 * Math.sin(t * 1.7 + k));
          s.setAttribute('d', `M${f(r.x - w / 2 + jit)} ${f(y)} L${f(r.x + w / 2 + jit)} ${f(y)}`);
          s.setAttribute('opacity', f(lit * (0.75 - k * 0.07)));
        });
      });
      // floating petals drift downstream
      for (let i = floating.length - 1; i >= 0; i--) {
        const p = floating[i]; p.life += dt; p.x += (6 + wind * 3) * dt; p.r += dt * 0.3;
        p.n.setAttribute('cx', f(p.x)); p.n.setAttribute('cy', f(p.y + Math.sin(t + p.x * 0.05) * 0.6));
        p.n.setAttribute('transform', `rotate(${f(p.r * 40)} ${f(p.x)} ${f(p.y)})`);
        p.n.setAttribute('opacity', f(Math.min(1, (12 - p.life) / 2)));
        if (p.life > 12 || p.x > W + 10) { p.n.remove(); floating.splice(i, 1); }
      }
      // koi leap: arc out of the water, flip, splash back in
      if (koi) {
        koi.t += dt;
        const u = koi.t / 1.1;
        if (u >= 1) { ring(koi.x + koi.dir * 30, WATER + 14, 3, 1.2); koi = null; koiG.setAttribute('opacity', 0); }
        else {
          const x = koi.x + koi.dir * 30 * u, y = WATER + 14 - 26 * Math.sin(Math.PI * u);
          const ang = Math.atan2(-26 * Math.PI * Math.cos(Math.PI * u), 30) * 57.3;
          const bend = Math.sin(u * 18) * 2;
          koiG.setAttribute('opacity', 1);
          koiG.setAttribute("transform", `translate(${f(x)} ${f(y)}) rotate(${f(ang * koi.dir)}) scale(${koi.dir} 1)`);
          koiBody.setAttribute('d', `M-11 0 Q-4 -5.4 6 -3.6 Q11 -2 12 0 Q11 2 6 3.6 Q-4 5.4 -11 0Z M-11 0 L-17 ${f(-4.5 + bend)} Q-15 0 -17 ${f(4.5 + bend)}Z`);
          koiSpots.setAttribute('d', `${oval(2, -1.5, 3.2, 1.8)} ${oval(-5, 1, 2.6, 1.6)} ${oval(8.6, -0.8, 1.6, 1.2)}`);
          koiFin.setAttribute('d', `M-1 3 L-4 7.5 L2 4Z`);
          koiEye.setAttribute('cx', 9); koiEye.setAttribute('cy', -0.8);
          if (u > 0.08 && u < 0.12 && !koi.dripped) { koi.dripped = true; ring(koi.x, WATER + 12, 2, 0.9); }
        }
      }
      // willow strands: pendulums driven by the wind
      willowKick = Math.max(0, willowKick - dt);
      strands.forEach((s) => {
        s.v += (-s.a * 3.2 * s.stiff + wind * 0.32 + wobble(t * 0.6 + s.ph) * 0.12 - s.v * 0.9) * dt; s.a += s.v * dt;
        const pts = [];
        for (let k = 0; k <= 10; k++) {
          const u = k / 10, sway = s.a * s.len * u * u * 0.9 + Math.sin(t * 1.6 + s.ph + u * 3) * 1.2 * u;
          pts.push([s.x + sway + u * 2, s.y + s.len * u - Math.abs(s.a) * s.len * u * u * 0.12]);
        }
        s.n.setAttribute('d', 'M' + pts.map(pt).join('L'));
        s.leaves.setAttribute('d', pts.slice(2).map(([x, y], k) => `M${f(x)} ${f(y)} l${k % 2 ? 2 : -2} 2.4`).join(' '));
      });
      // fireflies: drift on slow noise, blink, only after dark
      flies.forEach((fl, i) => {
        const tt = t * fl.sp + fl.ph;
        const x = fl.cx + Math.sin(tt * 0.7) * 30 + Math.sin(tt * 1.9) * 8, y = fl.cy + Math.sin(tt * 0.9 + 1) * 16 + Math.cos(tt * 2.3) * 5;
        const b = Math.pow(Math.max(0, Math.sin(t * fl.blink + fl.ph)), 3);
        fl.n.setAttribute('cx', f(x)); fl.n.setAttribute('cy', f(y)); fl.dot.setAttribute('cx', f(x)); fl.dot.setAttribute('cy', f(y));
        fl.n.setAttribute('opacity', f(P.night * b)); fl.dot.setAttribute('opacity', f(P.night * (0.3 + 0.7 * b)));
      });
      moths.forEach((m, i) => {
        const a = t * m.sp + m.ph, x = 446 + Math.cos(a) * m.r + Math.sin(a * 2.7) * 3, y = 240 + Math.sin(a * 1.3) * m.r * 0.6;
        m.n.setAttribute('cx', f(x)); m.n.setAttribute('cy', f(y)); m.n.setAttribute('opacity', f(lampOn * (0.6 + 0.4 * Math.sin(a * 5))));
      });
    },
  };
}
