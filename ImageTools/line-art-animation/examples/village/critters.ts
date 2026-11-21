// Cat, sparrows, swallows, cherry petals, chimney smoke.
import { el, pen, shape, blot, f, pt, PAPER } from '../../lib/ink.ts';
import { W, BASE, EDGE, WATER, SP, rnd, pick, clamp, lerp, smooth, ease, oval, rgb, hex, mix, wobble } from './kit.ts';

const L2 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

// ===================================================================== calico cat on the bench
// Pose = a handful of points; the cat blends between keyed poses.
const POSES = {
  sleep:   { S: [-7, -6.4], H: [7, -6.6], Bc: [0, -9.4], C: [-9, -0.2], Bt: [9.6, -0.2], hd: [-10.6, -3.6], tilt: 30, ear: 0.4, eye: 0, mouth: 0, F1: [-11, 0], F2: [-8.6, 0], T0: [9, -2], T1: [6, 3], T2: [-5, 1.2], paw: 0 },
  sit:     { S: [-4.4, -12.6], H: [4.6, -5.4], Bc: [2.2, -11.4], C: [-6.4, -1.4], Bt: [6.6, -0.2], hd: [-5.4, -17.6], tilt: 0, ear: 1, eye: 1, mouth: 0, F1: [-5.6, 0], F2: [-3.4, 0], T0: [6.6, -1], T1: [13, 0.6], T2: [15.6, -4.4], paw: 0 },
  yawn:    { S: [-4.4, -12.8], H: [4.6, -5.4], Bc: [2.2, -11.6], C: [-6.4, -1.4], Bt: [6.6, -0.2], hd: [-5.6, -18.6], tilt: -18, ear: 0.6, eye: 0, mouth: 1, F1: [-5.6, 0], F2: [-3.4, 0], T0: [6.6, -1], T1: [13, 0.6], T2: [15.6, -4.4], paw: 0 },
  stretch: { S: [-9.4, -4.6], H: [5.4, -11.6], Bc: [-1, -8.6], C: [-11, -1], Bt: [7.4, -3.6], hd: [-15.6, -6.6], tilt: -6, ear: 0.7, eye: 0.3, mouth: 0, F1: [-17.6, 0], F2: [-15, 0], T0: [7, -9.6], T1: [10, -17], T2: [8.6, -22], paw: 0 },
  groom:   { S: [-4.4, -12.6], H: [4.6, -5.4], Bc: [2.2, -11.4], C: [-6.4, -1.4], Bt: [6.6, -0.2], hd: [-5.2, -16.4], tilt: 22, ear: 1, eye: 0, mouth: 0, F1: [-5.6, 0], F2: [-6.6, -13.6], T0: [6.6, -1], T1: [13, 0.6], T2: [15.6, -3.4], paw: 1 },
};
const lerpPose = (a, b, t) => { const o = {}; for (const k in a) o[k] = Array.isArray(a[k]) ? L2(a[k], b[k], t) : lerp(a[k], b[k], t); return o; };
const SEQ: Array<[string, number]> = [['sit', 0.7], ['yawn', 0.9], ['sit', 0.4], ['stretch', 1.5], ['sit', 0.6], ['groom', 0.45], ['sit', 0.35], ['groom', 0.45], ['sit', 0.35], ['groom', 0.45], ['sit', 0.9], ['sleep', 1.1]];

export function createCat(parent, glow, { x, y }) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const tailOut = el('path', { fill: 'none', stroke: 'currentColor', 'stroke-width': 3.1, 'stroke-linecap': 'round' }, g);
  const tailIn = el('path', { fill: 'none', stroke: '#d08a4a', 'stroke-width': 1.5, 'stroke-linecap': 'round' }, g);
  const legs = pen(g, SP * 1.6);
  const body = shape(g, SP);
  const patch = el('path', { fill: '#d08a4a' }, g), patch2 = blot(g);
  const paws = shape(g, SP * 0.7);
  const headG = el('g', {}, g);
  const ears = el('path', { fill: PAPER, stroke: 'currentColor', 'stroke-width': SP * 0.9, 'stroke-linejoin': 'round' }, headG);
  el('ellipse', { cx: 0, cy: 0, rx: 4.6, ry: 4.1, fill: PAPER, stroke: 'currentColor', 'stroke-width': SP }, headG);
  const capPatch = blot(headG);
  const face = pen(headG, SP * 0.6);
  const mouth = el('path', { fill: '#6a2a2a', stroke: 'currentColor', 'stroke-width': SP * 0.5 }, headG);
  const eyesGlow = [0, 1].map(() => el('circle', { r: 2.4, fill: 'url(#v-cateye)', opacity: 0 }, glow));
  let seqT = -1, idle = 0, flick = 0, ear = 0;
  const hit = el('rect', { x: x - 20, y: y - 26, width: 42, height: 28, fill: 'transparent' }, g);
  return {
    g, hit,
    poke() { if (seqT < 0) seqT = 0; },
    draw(t, dt, P) {
      // which pose now?
      const awakeAtNight = P.night > 0.55;
      let pose;
      if (seqT >= 0) {
        seqT += dt;
        let acc = 0, prev = awakeAtNight ? 'sit' : 'sleep', cur = SEQ[0][0], u = 1;
        for (let i = 0; i < SEQ.length; i++) {
          const [name, d] = SEQ[i];
          if (seqT < acc + d) { cur = name; u = (seqT - acc) / d; break; }
          acc += d; prev = name; cur = name;
        }
        if (seqT > SEQ.reduce((a, s) => a + s[1], 0)) seqT = -1;
        pose = lerpPose(POSES[prev], POSES[cur], ease(Math.min(1, u * 1.6)));
      } else pose = lerpPose(POSES.sleep, POSES.sit, ease(clamp((P.night - 0.4) * 4, 0, 1)));
      // breathing, tail tip flick, ear twitch
      const breathe = Math.sin(t * 1.8) * 0.35;
      idle -= dt; if (idle < 0) { idle = rnd(2, 6); if (Math.random() < 0.6) flick = 1; else ear = 1; }
      flick = Math.max(0, flick - dt * 1.6); ear = Math.max(0, ear - dt * 3);
      const X = (p) => x + p[0], Y = (p) => y + p[1];
      const S = [X(pose.S), Y(pose.S) - breathe], H = [X(pose.H), Y(pose.H) - breathe * 0.6], Bc = [X(pose.Bc), Y(pose.Bc) - breathe * 1.2];
      const C = [X(pose.C), Y(pose.C)], Bt = [X(pose.Bt), Y(pose.Bt)];
      body.setAttribute('d', `M${pt(C)} Q${f(C[0] - 2)} ${f((C[1] + S[1]) / 2)} ${pt(S)} Q${pt(Bc)} ${pt(H)} Q${f(H[0] + 4)} ${f((H[1] + Bt[1]) / 2)} ${pt(Bt)} Q${f((Bt[0] + C[0]) / 2)} ${f(Math.max(Bt[1], C[1]) + 1)} ${pt(C)}Z`);
      const mid = L2(S, H, 0.55);
      patch.setAttribute('d', `M${f(mid[0] - 3.4)} ${f(mid[1] + 0.6)} Q${f(mid[0])} ${f(mid[1] - 3)} ${f(mid[0] + 4)} ${f(mid[1] + 0.2)} Q${f(mid[0] + 1)} ${f(mid[1] + 3.6)} ${f(mid[0] - 3.4)} ${f(mid[1] + 0.6)}Z`);
      patch.setAttribute('fill', rgb(mix(hex('#d08a4a'), hex('#5a3a28'), P.inkT * 0.6)));
      tailIn.setAttribute('stroke', rgb(mix(hex('#d08a4a'), hex('#5a3a28'), P.inkT * 0.6)));
      const hb = L2(S, H, 0.85);
      patch2.setAttribute('d', oval(hb[0], hb[1] + 1.4, 1.8, 1.2));
      const fl = Math.sin(t * 14) * 2.5 * flick;
      const T0 = [X(pose.T0), Y(pose.T0)], T1 = [X(pose.T1), Y(pose.T1)], T2 = [X(pose.T2) + fl, Y(pose.T2) - fl * 0.4];
      tailOut.setAttribute('d', `M${pt(T0)} Q${pt(T1)} ${pt(T2)}`); tailIn.setAttribute('d', `M${pt(T0)} Q${pt(T1)} ${pt(T2)}`);
      const sh = [S[0] + 1.4, S[1] + 4];
      const F1 = [X(pose.F1), Y(pose.F1)], F2 = [X(pose.F2), Y(pose.F2)];
      legs.setAttribute('d', `M${pt(sh)} L${pt(F1)} M${f(sh[0] + 1.6)} ${f(sh[1])} L${pt(F2)}`);
      paws.setAttribute('d', `${oval(F1[0] - 0.4, F1[1] - 0.6, 1.5, 0.9)} ${oval(F2[0] - 0.4, F2[1] - 0.6, 1.5, 0.9)}`);
      // head
      const hd = [X(pose.hd), Y(pose.hd) - breathe];
      headG.setAttribute('transform', `translate(${pt(hd)}) rotate(${f(pose.tilt)})`);
      const e = pose.ear, tw = ear * 0.6;
      ears.setAttribute('d', `M-4 -2 L${f(-4.2 - (1 - e) * 1.4)} ${f(-7.4 + (1 - e) * 3 + tw)} L-1 -3.6Z M1.4 -3.8 L${f(3.6 + (1 - e) * 1.6)} ${f(-7.2 + (1 - e) * 3)} L4.4 -1.8Z`);
      capPatch.setAttribute('d', 'M-4.4 -1.2 Q-3.6 -3.8 -0.6 -4 Q-1.6 -1.6 -4.4 -1.2Z');
      const open = pose.eye;
      face.setAttribute('d', (open > 0.5 ? 'M-2.6 -0.4 a0.6 0.8 0 1 0 0.1 0 M1 -0.4 a0.6 0.8 0 1 0 0.1 0' : 'M-3.2 -0.2 q0.7 0.7 1.4 0 M0.6 -0.2 q0.7 0.7 1.4 0') + ' M-1.2 1.4 l0.6 0.5 l0.6 -0.5 M-4.4 1.6 l-3.6 -0.4 M-4.4 2.4 l-3.4 0.8 M2.6 1.8 l3.4 -0.2');
      mouth.setAttribute('d', pose.mouth > 0.1 ? oval(-0.6, 2.6, 1.2 * pose.mouth, 1.5 * pose.mouth) : '');
      eyesGlow.forEach((n, i) => { n.setAttribute('cx', f(hd[0] - 2.2 + i * 3.6)); n.setAttribute('cy', f(hd[1] - 0.4)); n.setAttribute('opacity', f(P.night * (open > 0.5 ? 0.9 : 0))); });
    },
  };
}

// ===================================================================== sparrows on the wire
export function createSparrows(parent, { wireY, count = 7 }) {
  const g = el('g', {}, parent);
  const spots = [540, 575, 610, 660, 720, 790, 850, 905];
  const birds = Array.from({ length: count }, (_, i) => {
    const bg = el('g', {}, g);
    return {
      x: spots[i] + rnd(-6, 6), dir: Math.random() < 0.5 ? -1 : 1, state: 'perch', t: 0, next: rnd(1, 5), hopT: -1, tail: 0, peck: 0,
      g: bg, tailN: pen(bg, SP * 0.9), body: shape(bg, SP * 0.7), cap: el('path', { fill: '#7a5a3c' }, bg), cheek: blot(bg), beak: blot(bg), wing: pen(bg, SP * 0.5), legs: pen(bg, SP * 0.4), wings: pen(bg, SP * 0.8),
      fx: 0, fy: 0, path: null, hopFrom: 0, hopTo: 0,
    };
  });
  const hit = el('path', { fill: 'transparent', style: 'cursor:pointer', d: '' }, g);
  const flush = () => birds.forEach((b) => { if (b.state === 'perch') takeOff(b, false); });
  function takeOff(b, away) {
    const y0 = wireY(b.x) - 2.5;
    const nx = away ? (Math.random() < 0.5 ? -40 : 1000) : clamp(spots[(Math.random() * spots.length) | 0] + rnd(-8, 8), 520, 930);
    const up = rnd(40, 80);
    b.path = { p0: [b.x, y0], c1: [b.x + rnd(-80, 80), y0 - up], c2: [nx + rnd(-60, 60), y0 - up * rnd(0.6, 1.2)], p1: [nx, away ? rnd(20, 80) : wireY(nx) - 2.5], dur: rnd(1.8, 3.2), away };
    b.state = 'fly'; b.t = 0;
  }
  const bez = (p, u) => { const a = 1 - u; return [0, 1].map((k) => a * a * a * p.p0[k] + 3 * a * a * u * p.c1[k] + 3 * a * u * u * p.c2[k] + u * u * u * p.p1[k]); };
  return {
    g, hit, flush,
    draw(t, dt, P) {
      const roost = P.night > 0.5;
      hit.setAttribute('d', `M520 ${wireY(520) - 14} L940 ${wireY(940) - 14} L940 ${wireY(940) + 6} L520 ${wireY(520) + 6}Z`);
      birds.forEach((b, i) => {
        if (b.state === 'perch' && roost) takeOff(b, true);
        if (b.state === 'gone') { if (!roost && Math.random() < dt * 0.5) { b.x = spots[i]; b.path = { p0: [rnd(0, 1) < 0.5 ? -30 : 990, rnd(30, 90)], c1: [rnd(300, 700), rnd(40, 100)], c2: [b.x + rnd(-60, 60), wireY(b.x) - 50], p1: [b.x, wireY(b.x) - 2.5], dur: rnd(2.2, 3.4) }; b.state = 'fly'; b.t = 0; } b.g.setAttribute('opacity', 0); return; }
        b.g.setAttribute('opacity', 1);
        let x, y, flying = false, ang = 0;
        if (b.state === 'fly') {
          b.t += dt; const u = clamp(b.t / b.path.dur, 0, 1);
          [x, y] = bez(b.path, ease(u));
          const [x2] = bez(b.path, ease(Math.min(1, u + 0.02)));
          b.dir = x2 >= x ? 1 : -1;
          flying = u < 0.97;
          if (u >= 1) { if (b.path.away) { b.state = 'gone'; } else { b.state = 'perch'; b.x = x; b.next = rnd(0.6, 3); } }
        } else {
          // idle life on the wire: hop, turn, peck/preen, flick the tail
          b.next -= dt;
          if (b.next < 0) {
            b.next = rnd(0.8, 3.6);
            const r = Math.random();
            if (r < 0.35) { b.hopT = 0; b.hopFrom = b.x; b.hopTo = clamp(b.x + b.dir * rnd(4, 9), 520, 935); }
            else if (r < 0.6) b.dir *= -1;
            else if (r < 0.8) b.peck = 1;
            else b.tail = 1;
          }
          if (b.hopT >= 0) { b.hopT += dt / 0.22; b.x = lerp(b.hopFrom, b.hopTo, ease(Math.min(1, b.hopT))); if (b.hopT >= 1) b.hopT = -1; }
          x = b.x; y = wireY(b.x) - 2.5 - (b.hopT >= 0 ? Math.sin(Math.PI * b.hopT) * 3.2 : 0);
        }
        b.peck = Math.max(0, b.peck - dt * 2); b.tail = Math.max(0, b.tail - dt * 3);
        const d = b.dir, pk = Math.sin(Math.PI * b.peck) * 1.6;
        const X = (dx) => f(x + dx * d);
        b.body.setAttribute('d', oval(x, y - 2.8, 3.1, 2.4));
        b.cap.setAttribute('d', `M${X(0.8)} ${f(y - 5.6 + pk)} a2 1.8 0 0 1 ${f(3.6 * d)} 0Z`);
        b.cap.setAttribute('fill', rgb(mix(hex('#7a5a3c'), hex('#3a2c22'), P.inkT * 0.5)));
        b.cheek.setAttribute('d', oval(x + 2.6 * d, y - 4.4 + pk, 0.6, 0.6));
        b.beak.setAttribute('d', `M${X(4.4)} ${f(y - 5.2 + pk)} L${X(6)} ${f(y - 4.8 + pk)} L${X(4.4)} ${f(y - 4.3 + pk)}Z`);
        const tf = Math.sin(b.tail * 20) * 1.6 * b.tail;
        b.tailN.setAttribute('d', `M${X(-2.4)} ${f(y - 2.6)} L${X(-6)} ${f(y - 0.6 - tf)}`);
        b.wing.setAttribute('d', flying ? '' : `M${X(-1.6)} ${f(y - 3.6)} Q${X(0.6)} ${f(y - 2.2)} ${X(-2.2)} ${f(y - 1.4)}`);
        b.legs.setAttribute('d', flying ? '' : `M${X(-0.4)} ${f(y - 0.6)} l0 1.2 M${X(0.8)} ${f(y - 0.6)} l0 1.2`);
        const fl = Math.sin(t * 34 + i) * 4;
        b.wings.setAttribute('d', flying ? `M${X(0)} ${f(y - 3.4)} L${X(-2)} ${f(y - 3.4 - fl)} M${X(0.6)} ${f(y - 3)} L${X(2.4)} ${f(y - 3 - fl * 0.8)}` : '');
      });
    },
  };
}

// ===================================================================== swallows (day)
export function createSwallows(parent) {
  const birds = [0, 1].map((i) => ({ n: blot(parent), a: rnd(0, 6), b: rnd(0, 6), sp: rnd(0.8, 1.1) * (i ? -1 : 1), lx: 0, ly: 0 }));
  return {
    draw(t, dt, P) {
      birds.forEach((s) => {
        const tt = t * 0.32 * s.sp;
        const x = 480 + 440 * Math.sin(tt + s.a), y = 150 + 55 * Math.sin(tt * 2.3 + s.b) + 18 * Math.sin(tt * 5.1);
        const vx = x - (s.lx || x), vy = y - (s.ly || y); s.lx = x; s.ly = y;
        const ang = Math.atan2(vy, vx) * 57.3;
        const flap = Math.sin(t * 22 + s.a) > 0.4 ? 0.55 : 1;
        s.n.setAttribute('d', `M7 0 L2.4 -1 L${-3} ${-6.4 * flap} L-0.6 -1.2 L-7 -2.6 L-4.6 0 L-7 2.6 L-0.6 1.2 L${-3} ${6.4 * flap} L2.4 1Z`);
        s.n.setAttribute('transform', `translate(${f(x)} ${f(y)}) rotate(${f(ang)}) scale(0.8)`);
        s.n.setAttribute('opacity', f(1 - P.night));
      });
    },
  };
}

// ===================================================================== cherry petals
export function createPetals(parent, { blossoms, canal }) {
  const petals = [];
  const add = (burst) => {
    const [x, y] = blossoms[(Math.random() * blossoms.length) | 0];
    const toWater = Math.random() < 0.35;
    petals.push({ x, y, vx: rnd(-6, 6), vy: burst ? rnd(-10, 2) : rnd(2, 7), r: rnd(0, 6), ph: rnd(0, 6), life: 0, rest: 0,
      land: toWater ? WATER + rnd(4, 40) : rnd(BASE + 2, EDGE - 2), toWater,
      n: el('path', { fill: '#f6dfe4', stroke: 'currentColor', 'stroke-width': SP * 0.4 }, parent) });
  };
  return {
    burst(n = 40) { for (let i = 0; i < n; i++) add(true); },
    draw(t, dt, P, wind) {
      if (Math.random() < dt * (1.4 + Math.abs(wind) * 1.4)) add(false);
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]; p.life += dt;
        if (p.y < p.land) {
          p.vy = lerp(p.vy, 11, dt * 1.4);
          p.x += (p.vx + wind * 22 + Math.sin(p.life * 2.6 + p.ph) * 9) * dt; p.y += p.vy * dt; p.r += dt * 3.4;
        } else if (p.toWater) { canal.floatPetal(p); p.n.remove(); petals.splice(i, 1); continue; }
        else p.rest += dt;
        const op = p.rest > 3 ? Math.max(0, 1 - (p.rest - 3)) : 1;
        const sx = Math.abs(Math.cos(p.r * 1.3)) * 0.8 + 0.25;
        p.n.setAttribute('d', `M${f(p.x - 1.8 * sx)} ${f(p.y)} Q${f(p.x)} ${f(p.y - 1.4)} ${f(p.x + 1.8 * sx)} ${f(p.y)} L${f(p.x + 1.2 * sx)} ${f(p.y + 0.4)} L${f(p.x + 1.8 * sx)} ${f(p.y + 0.9)} Q${f(p.x)} ${f(p.y + 1.6)} ${f(p.x - 1.8 * sx)} ${f(p.y)}Z`);
        p.n.setAttribute('transform', `rotate(${f(Math.sin(p.r) * 70)} ${f(p.x)} ${f(p.y)})`);
        p.n.setAttribute('opacity', f(op));
        p.n.setAttribute('fill', rgb(mix(hex('#f6dfe4'), hex('#8a7480'), P.inkT * 0.6)));
        if (op <= 0 || p.x > W + 20 || p.x < -20) { p.n.remove(); petals.splice(i, 1); }
      }
    },
  };
}

// ===================================================================== smoke from the bath-house chimney
export function createSmoke(parent, [cx, cy]) {
  const puffs = [];
  let acc = 0;
  return {
    draw(t, dt, P, wind, tau) {
      const firing = tau > 0.55 || tau < 0.08; // the bath fires up in the afternoon
      acc += dt;
      if (firing && acc > 0.55) { acc = 0; puffs.push({ x: cx + rnd(-2, 2), y: cy, r: rnd(3, 4.5), life: 0, ph: rnd(0, 6), n: shape(parent, SP * 0.7) }); }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i]; p.life += dt;
        p.x += (4 + wind * 10 + Math.sin(p.life * 1.2 + p.ph) * 2) * dt; p.y -= (9 - p.life * 0.6) * dt; p.r += dt * 2.2;
        const pts = [];
        for (let k = 0; k <= 14; k++) { const a = (k / 14) * Math.PI * 2; const rr = p.r * (1 + 0.16 * Math.sin(a * 3 + p.ph + p.life)); pts.push([p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr * 0.8]); }
        p.n.setAttribute('d', 'M' + pts.map(pt).join('L') + 'Z');
        p.n.setAttribute('opacity', f(Math.max(0, 0.9 - p.life / 7)));
        if (p.life > 6.3) { p.n.remove(); puffs.splice(i, 1); }
      }
    },
  };
}
