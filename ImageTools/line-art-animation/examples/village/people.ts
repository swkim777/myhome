// Villagers. Each is drawn in its own space (~95 px tall, ground y 120, facing +x,
// feet centred on x 40) and placed with translate/scale, so line weight matches.
import { el, pen, shape, blot, f, pt, limb, joint, curve, PEN, PAPER } from '../../lib/ink.ts';
import { FS, WATER, rnd, pick, clamp, lerp, smooth, ease, oval, rgb, hex, mix } from './kit.ts';

const RAD = Math.PI / 180;
const place = (g, X, Y, dir, s = FS) => g.setAttribute('transform', `translate(${f(X)} ${f(Y)}) scale(${f(dir * s)} ${f(s)}) translate(-40 -120)`);
const world = (X, Y, dir, lx, ly, s = FS) => [X + dir * s * (lx - 40), Y + s * (ly - 120)];
const fillOf = (c, P, k = 0.55) => rgb(mix(hex(c), mix(hex(c), [12, 16, 30], 0.6), P.inkT * k));
const solid = (lb, c = 'currentColor') => { const n = lb.g.querySelector('path'); n.classList.remove('pp'); n.setAttribute('fill', c); return lb; };
const paintPath = (g, c, w = PEN) => el('path', { fill: c, stroke: 'currentColor', 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);

// ===================================================================== woman in kimono
// A real gait under the kimono: two hidden legs (thigh 23, shin 23) walk at a
// natural 2 steps/s. The planted foot slides back at exactly the travel speed;
// the swinging foot follows a minimum-jerk path with a low geta lift; the heel
// peels off the front tooth before each swing. Hip height is whatever both
// planted legs can reach, so the body rises over each step and dips at double
// support. The kimono is then drawn around the forward knee and both ankles,
// so the cloth opens and closes with the stride; sleeves swing on springs.
export function createKimono(parent, glow, { dir = 1, x, y, lantern = false }) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const T = 1.0, DUTY = 0.62, S = 24, LEG = 45.2;
  const speed = (S / (DUTY * T)) * FS; // scene px/s; matches the planted foot
  const colours = pick([['#34507a', '#d3a24c'], ['#7a4766', '#cfd3c2'], ['#4f6b55', '#c58a4a'], ['#8a5a3c', '#2f3f5f']]);
  const [kimonoC, obiC] = colours;
  const parasolC = pick(['#2f4d5c', '#7b2f2f', '#2f3d2f']);

  const feet = [0, 1].map(() => ({ tabi: shape(g, PEN * 0.75), geta: blot(g) }));
  const farSleeve = paintPath(g, kimonoC);
  const lower = paintPath(g, kimonoC);
  const okumi = pen(g, PEN * 0.6), crease = pen(g, PEN * 0.45);
  const patternLow = el('path', { fill: 'none', stroke: '#f2ead8', 'stroke-width': PEN * 0.5 }, g);
  const upperG = el('g', {}, g);
  const upper = paintPath(upperG, kimonoC);
  const pattern = el('path', { fill: 'none', stroke: '#f2ead8', 'stroke-width': PEN * 0.5 }, upperG);
  const obi = paintPath(upperG, obiC), taiko = paintPath(upperG, obiC), cord = el('path', { stroke: '#b3412d', 'stroke-width': 1.1, fill: 'none' }, upperG);
  const collar = shape(upperG, PEN * 0.8);
  const neck = limb(upperG, 3.2);
  const head = el('ellipse', { cx: 41, cy: 32, rx: 4.2, ry: 5.1, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, upperG);
  const hair = blot(upperG);
  const pin = pen(upperG, PEN * 0.7), pinBall = el('circle', { r: 1.1, fill: '#c9a24a', stroke: 'currentColor', 'stroke-width': 0.5 }, upperG);
  const sleeve = paintPath(upperG, kimonoC);
  const hand = el('ellipse', { rx: 1.8, ry: 1.5, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN * 0.7 }, upperG);
  const prop = el('g', {}, upperG);
  const pole = pen(prop, PEN * 0.9);
  const canopyG = el('g', {}, prop);
  const canopy = paintPath(canopyG, parasolC, PEN * 0.9), ring_ = el('path', { fill: 'none', stroke: '#f1e7d0', 'stroke-width': 2.4 }, canopyG), ribs = pen(canopyG, PEN * 0.4), cap = blot(canopyG);
  const lanternG = el('g', {}, prop);
  const lBody = el('path', { stroke: 'currentColor', 'stroke-width': PEN * 0.8 }, lanternG), lCaps = blot(lanternG), lRibs = pen(lanternG, PEN * 0.4);
  const lGlow = el('circle', { r: 22, fill: 'url(#v-warmglow)', opacity: 0 }, glow);

  const mj = (s) => s * s * s * (10 - 15 * s + 6 * s * s); // minimum-jerk
  // foot pose over the cycle: ankle position + geta pitch (deg, toe down) + pivot
  const foot = (u) => {
    u = ((u % 1) + 1) % 1;
    if (u < DUTY) {
      const x = 40 + S / 2 - (S * u) / DUTY;
      const heel = smooth(DUTY - 0.14, DUTY, u);       // heel peels off the front tooth
      const th = 15 * heel * RAD, px = x + 4.2, py = 120;
      const ox = -4.2, oy = -4;                            // ankle relative to the toe pivot
      return { a: [px + ox * Math.cos(th) - oy * Math.sin(th), py + ox * Math.sin(th) + oy * Math.cos(th)], pitch: 15 * heel, stance: true };
    }
    const s = (u - DUTY) / (1 - DUTY);
    return { a: [40 - S / 2 + S * mj(s), 116 - 3.4 * Math.pow(Math.sin(Math.PI * s), 1.2)], pitch: 15 * Math.pow(1 - smooth(0, 0.55, s), 1.4), stance: false };
  };
  const getaPath = (ank, pitch) => {
    const r = pitch * RAD, c = Math.cos(r), s = Math.sin(r);
    const R = (px, py) => pt([ank[0] + px * c - py * s, ank[1] + px * s + py * c]);
    return {
      geta: `M${R(-4.4, 0.2)} L${R(5.2, 0.2)} L${R(5.2, 1.5)} L${R(3.8, 1.5)} L${R(3.8, 4)} L${R(2.4, 4)} L${R(2.4, 1.5)} L${R(-1.4, 1.5)} L${R(-1.4, 4)} L${R(-2.8, 4)} L${R(-2.8, 1.5)} L${R(-4.4, 1.5)}Z`,
      tabi: `M${R(-3.4, 0.2)} Q${R(-3.7, -5)} ${R(-0.7, -5.6)} L${R(1.6, -5)} Q${R(4.7, -3.4)} ${R(4.8, 0.2)}Z`,
    };
  };
  let ph = rnd(0, 1), hipS = 70.8, slv = 0, slvV = 0, tiltS = 0, tiltV = 0, lanA = 0, lanV = 0, bowT = -1, stop = 0;
  return {
    g, x, y, dir, speed, done: false,
    poke() { if (bowT < 0) bowT = 0; },
    draw(t, dt, P) {
      // a polite bow: ease to a stop, bend from the waist, rise, walk on
      let bow = 0;
      if (bowT >= 0) { bowT += dt; bow = bowT < 0.7 ? 0 : bowT < 1.15 ? ease((bowT - 0.7) / 0.45) : bowT < 1.9 ? 1 : 1 - ease((bowT - 1.9) / 0.5); if (bowT > 2.6) bowT = -1; }
      stop = clamp(stop + (bowT >= 0 && bowT < 2.4 ? dt : -dt) * 2.4, 0, 1);
      const go = 1 - ease(stop);
      ph += (dt / T) * go; this.x += dir * speed * dt * go;
      if (this.x < -80 || this.x > 1040) this.done = true;
      place(g, this.x, this.y, dir);

      // legs (hidden) → hip height, knees, ankles
      const F = [foot(ph), foot(ph + 0.5)];
      if (go < 1) F.forEach((fo, i) => { const rest = 40 + (i ? -2 : 2); fo.a = [lerp(rest, fo.a[0], go), lerp(116, fo.a[1], go)]; fo.pitch *= go; });
      let hipY = 70.8;
      F.forEach((fo) => { if (fo.stance || go < 1) { const dx = fo.a[0] - 40; hipY = Math.max(hipY, fo.a[1] - Math.sqrt(Math.max(1, LEG * LEG - dx * dx))); } });
      hipS = lerp(hipS, hipY, Math.min(1, dt * 18));
      const hip = [40, hipS], b = hipS - 70.8;
      const K = F.map((fo) => joint(hip, fo.a, 23, 23, 1));
      F.forEach((fo, i) => { const p = getaPath(fo.a, fo.pitch); feet[i].geta.setAttribute('d', p.geta); feet[i].tabi.setAttribute('d', p.tabi); });
      const iF = F[0].a[0] >= F[1].a[0] ? 0 : 1, iR = 1 - iF;
      const aF = F[iF].a, aR = F[iR].a;
      const kF = K[0][0] >= K[1][0] ? K[0] : K[1], kR = K[0][0] >= K[1][0] ? K[1] : K[0];
      // swinging foot passes in front of the planted one
      g.insertBefore(feet[iF].geta, farSleeve); g.insertBefore(feet[iF].tabi, feet[iF].geta);

      // kimono below the obi, shaped by the knees and ankles
      const wB = [31.8, 69 + b], wF = [47.8, 69.4 + b];
      const hemF = [Math.max(46.6, aF[0] + 4.2), 112.6], hemR = [Math.min(31.4, aR[0] - 2.4), 113];
      const kx = Math.max(kF[0] + 2.6, 47.4);
      lower.setAttribute('d', `M${pt(wB)} L${pt(wF)} C${f(48.6)} ${f(80 + b)} ${f(kx)} ${f(kF[1] - 9)} ${f(kx)} ${f(kF[1])} Q${f(kx - 0.2)} ${f((kF[1] + hemF[1]) / 2 + 2)} ${pt(hemF)} Q${f((hemF[0] + hemR[0]) / 2)} ${f(113.6)} ${pt(hemR)} Q${f(Math.min(30.8, hemR[0] + 1.6))} ${f(92 + b * 0.5)} ${pt(wB)}Z`);
      okumi.setAttribute('d', `M${f(44.4)} ${f(72 + b)} Q${f(kF[0] - 0.6)} ${f(kF[1] + 3)} ${f(Math.max(42, aF[0] + 0.8))} ${f(112.6)}`);
      crease.setAttribute('d', `M${f(kR[0] + 1.6)} ${f(kR[1] - 4)} Q${f(kR[0] + 0.4)} ${f(kR[1] + 6)} ${f(Math.max(hemR[0] + 3, aR[0] + 1.4))} ${f(112.4)}`);
      patternLow.setAttribute('d', [[36.4, 84], [41.6, 96], [36, 104], [42, 79]].map(([px, py]) => `M${px} ${f(py + b * 0.6)} a1.1 1.1 0 1 0 0.1 0`).join(' '));

      // sleeves swing on springs, trailing a little while walking
      const stepPh = 4 * Math.PI * ph;
      slvV += (40 * ((-1.4 + Math.sin(stepPh - 1.1) * 0.9) * go - slv) - 6 * slvV) * dt; slv += slvV * dt;
      tiltV += (30 * (Math.sin(stepPh - 0.8) * 1.6 * go - tiltS) - 5 * tiltV) * dt; tiltS += tiltV * dt;
      farSleeve.setAttribute('d', `M${f(34)} ${f(47 + b)} Q${f(30 + slv * 0.5)} ${f(56 + b)} ${f(28.8 + slv)} ${f(74 + b)} Q${f(31 + slv)} ${f(77.6 + b)} ${f(34)} ${f(76 + b)}Z`);

      // upper body rides on the hip, with a slight lean into the walk; bows from the waist
      upperG.setAttribute('transform', `translate(0 ${f(b)}) rotate(${f(bow * 34 + 1.4 * go)} 40 68)`);
      upper.setAttribute('d', 'M36 43 Q32 45.5 32.2 52 Q31.6 60 32 69 L47.6 69 Q48.4 56 46.6 48 Q45.4 44 43.4 43Z');
      pattern.setAttribute('d', [[36, 55], [42, 50]].map(([px, py]) => `M${px} ${py} a1.1 1.1 0 1 0 0.1 0`).join(' '));
      obi.setAttribute('d', 'M31.8 59 L47.8 59.5 L47.9 69.4 L31.7 69Z');
      cord.setAttribute('d', 'M31.8 64.4 L47.9 64.6');
      taiko.setAttribute('d', 'M32 57.5 L25.4 58.6 Q24.4 66 25.6 75 L32 74Z');
      collar.setAttribute('d', 'M37.4 43.4 L41.6 53.4 L44.8 43.6 L43 43 L41.4 49 L39.2 43.2Z');
      neck.draw([[40.6, 44], [40.8, 37]], [0.2, 0.2]);
      hair.setAttribute('d', `M36.6 31 Q35.4 23.6 41 22.6 Q46.4 22.4 46 28.6 Q43.2 25.6 39.8 27 Q37.8 28.4 36.6 31Z ${oval(35.4, 31.4, 3, 3.8)} ${oval(40.2, 20.6, 3.8, 2.3)}`);
      pin.setAttribute('d', 'M42.6 21.2 L47.4 17.6');
      pinBall.setAttribute('cx', 47.6); pinBall.setAttribute('cy', 17.4);
      sleeve.setAttribute('d', `M43.6 46 Q49.6 49 50.4 55 L${f(50.6 + slv * 0.5)} 72 Q${f(46 + slv)} 75.6 ${f(41.6 + slv)} 72.4 L41.6 54Z`);
      if (!lantern && P.lamp > 0.62) lantern = true; // dusk caught her out: parasol down, lantern lit
      const night = lantern;
      const hx = 50.4, hy = night ? 57.4 : 54.6;
      hand.setAttribute('cx', hx); hand.setAttribute('cy', hy);
      canopyG.style.display = night ? 'none' : '';
      lanternG.style.display = night ? '' : 'none';
      if (!night) {
        const tilt = -14 + tiltS - bow * 10;
        const apex = [hx - 15, hy - 50];
        pole.setAttribute('d', `M${hx + 1} ${hy + 3} L${f(apex[0])} ${f(apex[1])}`);
        canopyG.setAttribute('transform', `translate(${f(apex[0])} ${f(apex[1])}) rotate(${f(tilt)})`);
        canopy.setAttribute('d', 'M-27 10 Q-25 -1.6 0 -4 Q25 -1.6 27 10 Q22 8 18 9.6 Q13 7.6 9 9 Q4.6 7.4 0 8.8 Q-4.6 7.4 -9 9 Q-13 7.6 -18 9.6 Q-22 8 -27 10Z');
        ring_.setAttribute('d', 'M-18.6 2.8 Q0 -3 18.6 2.8');
        ribs.setAttribute('d', Array.from({ length: 9 }, (_, k) => { const xx = lerp(-24, 24, k / 8); return `M0 -3.6 L${f(xx)} ${f(8.8 - Math.abs(xx) * 0.02)}`; }).join(' '));
        cap.setAttribute('d', oval(0, -4.2, 2.6, 1.4));
        lGlow.setAttribute('opacity', 0);
      } else {
        const tip = [hx + 15, hy - 9];
        pole.setAttribute('d', `M${hx - 1} ${hy + 1} Q${hx + 8} ${hy - 6} ${tip[0]} ${tip[1]}`);
        lanV += (-lanA * 22 - Math.sin(stepPh) * 2.2 * go - lanV * 2.2) * dt; lanA += lanV * dt;
        lanternG.setAttribute('transform', `translate(${tip[0]} ${tip[1]}) rotate(${f(lanA * 57.3)})`);
        lBody.setAttribute('d', 'M-3.6 5 Q-5.4 10.5 -3.6 16 L3.6 16 Q5.4 10.5 3.6 5Z M0 0 L0 3');
        lBody.setAttribute('fill', rgb(mix(P.paper, hex('#ffd38a'), 1)));
        lCaps.setAttribute('d', 'M-2.6 3 L2.6 3 L2.6 5 L-2.6 5Z M-2.6 15.6 L2.6 15.6 L2.6 17.4 L-2.6 17.4Z');
        lRibs.setAttribute('d', 'M-4.4 8 Q0 9 4.4 8 M-4.8 11 Q0 12 4.8 11 M-4.4 14 Q0 15 4.4 14');
        const [wx, wy] = world(this.x, this.y, dir, tip[0] - Math.sin(lanA) * 10, tip[1] + b + 10.5);
        lGlow.setAttribute('cx', f(wx)); lGlow.setAttribute('cy', f(wy)); lGlow.setAttribute('opacity', f(0.9 + 0.1 * Math.sin(t * 9)));
      }
      [lower, upper, sleeve].forEach((n) => n.setAttribute('fill', fillOf(kimonoC, P)));
      farSleeve.setAttribute('fill', rgb(mix(hex(kimonoC), [10, 12, 20], 0.18 + P.inkT * 0.4)));
      [obi, taiko].forEach((n) => n.setAttribute('fill', fillOf(obiC, P)));
      canopy.setAttribute('fill', fillOf(parasolC, P));
    },
    remove() { g.remove(); lGlow.remove(); },
  };
}

// ===================================================================== schoolboy on a mama-chari
export function createCyclist(parent, glow, { dir = -1, x, y }) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const speed = 66; // scene px/s
  const R = 13.5, REAR = [18, 106.5], FRONT = [71, 106.5], BB = [41, 108];
  const wheels = [REAR, FRONT].map((c) => ({ c, tyre: el('circle', { cx: c[0], cy: c[1], r: R, fill: 'none', stroke: 'currentColor', 'stroke-width': PEN * 1.1 }, g), rim: el('circle', { cx: c[0], cy: c[1], r: R - 1.6, fill: 'none', stroke: 'currentColor', 'stroke-width': PEN * 0.45 }, g), spokes: pen(g, PEN * 0.32), hub: el('circle', { cx: c[0], cy: c[1], r: 1.4, fill: 'currentColor' }, g) }));
  const farLeg = solid(limb(g, 4.2));
  const farShoe = blot(g);
  const frame = pen(g, PEN * 1.05);
  pen(g, PEN * 0.6).setAttribute('d', `M${REAR[0] - 15} ${REAR[1] - 2} Q${REAR[0]} ${REAR[1] - 18} ${REAR[0] + 14} ${REAR[1] - 5} M${FRONT[0] - 13} ${FRONT[1] - 5} Q${FRONT[0]} ${FRONT[1] - 18} ${FRONT[0] + 14} ${FRONT[1] - 3}`);
  frame.setAttribute('d', `M64 79 Q52 103 ${BB[0]} ${BB[1]} L${REAR[0]} ${REAR[1]} L31 80 L${BB[0]} ${BB[1]} M31 80 L30 74 M64 79 L66.6 89 Q68.4 97 ${FRONT[0]} ${FRONT[1]} M64 79 L62.4 70 Q58 68 54.4 69.6`);
  const guard = shape(g, PEN * 0.6); guard.setAttribute('d', `M${BB[0] + 3} ${BB[1] - 3.6} L${REAR[0] + 1} ${REAR[1] - 3} Q${REAR[0] - 2} ${REAR[1]} ${REAR[0] + 1} ${REAR[1] + 3} L${BB[0] + 3} ${BB[1] + 3.6} Q${BB[0] + 6.4} ${BB[1]} ${BB[0] + 3} ${BB[1] - 3.6}Z`);
  const saddle = blot(g); saddle.setAttribute('d', 'M25 73 Q30 70.6 35.6 72.4 L34.6 75 L26 75Z');
  const basket = shape(g, PEN * 0.7); basket.setAttribute('d', 'M66 71 L82 71 L80.6 84 L67.4 84Z');
  pen(g, PEN * 0.35).setAttribute('d', 'M66.5 75 L81.6 75 M66.9 79.4 L81 79.4 M70 71 L70.6 84 M74 71 L74 84 M78 71 L77.4 84');
  const bag = el('path', { d: 'M68 71 Q68.5 64 74 64 Q80 64 80 71Z', fill: '#4a3a2c', stroke: 'currentColor', 'stroke-width': PEN * 0.6 }, g);
  const lamp = el('path', { d: 'M81.6 84 L85.4 84 L85.4 88 L81.6 88Z', fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN * 0.6 }, g);
  const bell = el('path', { d: 'M56 66.6 a1.8 1.8 0 0 1 3.6 0Z', fill: '#d8d2c0', stroke: 'currentColor', 'stroke-width': 0.5 }, g);
  const crank = pen(g, PEN * 0.9);
  const torso = blot(g);
  const collarB = pen(g, PEN * 0.6);
  const head = el('ellipse', { rx: 4.3, ry: 5, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, g);
  const capC = blot(g);
  const nearLeg = solid(limb(g, 4.4));
  const nearShoe = blot(g);
  const arm = solid(limb(g, 3.6));
  const handC = el('ellipse', { rx: 1.7, ry: 1.4, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN * 0.7 }, g);
  const rings = pen(g, PEN * 0.6);
  const beam = el('path', { fill: dir > 0 ? 'url(#v-beamR)' : 'url(#v-beamL)', opacity: 0 }, glow);
  const beamGlow = el('circle', { r: 10, fill: 'url(#v-warmglow)', opacity: 0 }, glow);
  let dist = 0, ringT = -1;
  return {
    g, x, y, dir, done: false, kind: 'bike',
    poke() { ringT = 0; },
    get ringing() { return ringT >= 0 && ringT < 0.8; },
    draw(t, dt, P) {
      this.x += dir * speed * dt; dist += speed * dt / FS;
      if (this.x < -80 || this.x > 1040) this.done = true;
      place(g, this.x, this.y, dir);
      const wa = dist / R;
      wheels.forEach((w) => {
        const d = [];
        for (let k = 0; k < 8; k++) { const a = wa + (k * Math.PI) / 8; d.push(`M${f(w.c[0] + Math.cos(a) * (R - 1.6))} ${f(w.c[1] + Math.sin(a) * (R - 1.6))} L${f(w.c[0] - Math.cos(a) * (R - 1.6))} ${f(w.c[1] - Math.sin(a) * (R - 1.6))}`); }
        w.spokes.setAttribute('d', d.join(' '));
      });
      const ca = wa * 0.42, CR = 6.2;
      const pN = [BB[0] + Math.cos(ca) * CR, BB[1] + Math.sin(ca) * CR], pF = [BB[0] - Math.cos(ca) * CR, BB[1] - Math.sin(ca) * CR];
      crank.setAttribute('d', `M${pt(pF)} L${pt(pN)} M${f(pN[0] - 2)} ${f(pN[1])} l4 0 M${f(pF[0] - 2)} ${f(pF[1])} l4 0`);
      const bob = Math.sin(ca * 2) * 0.35;
      const hip = [31, 70.6 + bob];
      [[farLeg, farShoe, pF], [nearLeg, nearShoe, pN]].forEach(([L, S, p]) => {
        const ank = [p[0] - 0.6, p[1] - 2.2];
        L.draw([hip, joint(hip, ank, 21, 21, 1), ank], [0.2, 0.4]);
        S.setAttribute('d', `M${f(ank[0] - 2.6)} ${f(ank[1] + 0.6)} L${f(ank[0] + 4.4)} ${f(ank[1] + 0.6)} Q${f(ank[0] + 5.4)} ${f(ank[1] + 2.6)} ${f(ank[0] + 3)} ${f(ank[1] + 2.8)} L${f(ank[0] - 2.4)} ${f(ank[1] + 2.8)}Z`);
      });
      const sh = [44.6, 43 + bob];
      torso.setAttribute('d', `M${f(hip[0] - 3.6)} ${f(hip[1] + 2)} Q${f(hip[0] - 4.4)} ${f(hip[1] - 14)} ${f(sh[0] - 6)} ${f(sh[1] + 1)} Q${f(sh[0] - 1)} ${f(sh[1] - 3.4)} ${f(sh[0] + 3.4)} ${f(sh[1] + 1.6)} Q${f(sh[0] - 2)} ${f(hip[1] - 12)} ${f(hip[0] + 6)} ${f(hip[1] + 2)}Z`);
      collarB.setAttribute('d', `M${f(sh[0] - 2)} ${f(sh[1] - 1)} l3 1.6`);
      collarB.setAttribute('stroke', rgb(P.paper));
      const hc = [sh[0] + 4.2, sh[1] - 9.4];
      head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
      capC.setAttribute('d', `M${f(hc[0] - 4.6)} ${f(hc[1] - 1.6)} Q${f(hc[0] - 4.4)} ${f(hc[1] - 7)} ${f(hc[0] + 0.4)} ${f(hc[1] - 6.8)} Q${f(hc[0] + 4.8)} ${f(hc[1] - 6.4)} ${f(hc[0] + 4.6)} ${f(hc[1] - 2)} L${f(hc[0] + 8)} ${f(hc[1] - 1.2)} L${f(hc[0] + 4.4)} ${f(hc[1] - 0.6)}Z`);
      const grip = [55.4, 69.6];
      arm.draw([[sh[0], sh[1] + 2], joint([sh[0], sh[1] + 2], grip, 11.5, 11.5, -1), grip], [0.2, 0.4]);
      handC.setAttribute('cx', grip[0]); handC.setAttribute('cy', grip[1]);
      bag.setAttribute('fill', fillOf('#4a3a2c', P));
      // bell rings
      if (ringT >= 0) { ringT += dt; if (ringT > 0.9) ringT = -1; }
      const rr = ringT >= 0 ? ringT : 0;
      rings.setAttribute('d', ringT >= 0 ? [5, 9].map((r) => `M${57.8 - r * 0.6} ${f(64 - r * 0.5)} Q57.8 ${f(64 - r * 1.1)} ${57.8 + r * 0.6} ${f(64 - r * 0.5)}`).join(' ') : '');
      rings.setAttribute('opacity', f(1 - rr));
      bell.setAttribute('transform', ringT >= 0 ? `rotate(${f(Math.sin(rr * 60) * 14 * (1 - rr))} 57.8 66.6)` : '');
      // headlamp after dark
      const on = smooth(0.35, 0.6, P.lamp);
      lamp.style.fill = rgb(mix(P.paper, hex('#fff1c2'), on));
      const [lx, ly] = world(this.x, this.y, dir, 85, 86);
      beamGlow.setAttribute('cx', f(lx)); beamGlow.setAttribute('cy', f(ly)); beamGlow.setAttribute('opacity', f(on));
      beam.setAttribute('d', `M${f(lx)} ${f(ly - 1)} L${f(lx + dir * 70)} ${f(this.y - 5)} L${f(lx + dir * 70)} ${f(this.y + 6)} L${f(lx)} ${f(ly + 1)}Z`);
      beam.setAttribute('opacity', f(on * 0.7));
    },
    remove() { g.remove(); beam.remove(); beamGlow.remove(); },
  };
}

// ===================================================================== child with a pinwheel
export function createKid(parent, glow, { dir = 1, x, y }) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const T = 0.5, STRIDE = 8, DUTY = 0.36;
  const speed = (2 * STRIDE) / (DUTY * T) * FS;
  const legs = [0, 1].map(() => ({ L: limb(g, 3.6), S: blot(g) }));
  const farArm = limb(g, 3);
  const shorts = el('path', { fill: '#33465e', stroke: 'currentColor', 'stroke-width': PEN }, g);
  const shirt = el('path', { fill: 'url(#v-stripes)', stroke: 'currentColor', 'stroke-width': PEN }, g);
  const head = el('ellipse', { rx: 6.4, ry: 6.9, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, g);
  const hair = blot(g);
  const hat = el('path', { fill: '#e6cf8e', stroke: 'currentColor', 'stroke-width': PEN * 0.8 }, g);
  const band = el('path', { fill: '#b3412d' }, g);
  const arm = limb(g, 3);
  const stick = pen(g, PEN * 0.7);
  const wheel = el('g', {}, g);
  const blades = ['#d4552f', '#3f6ea8', '#e3b33d', '#4e8a5a'].map((c, k) => el('path', { d: 'M0 0 L0 -7.6 Q4.8 -6.2 4.8 -3.2Z', transform: `rotate(${k * 90})`, fill: c, stroke: 'currentColor', 'stroke-width': PEN * 0.5, 'stroke-linejoin': 'round' }, wheel));
  const pinDot = el('circle', { r: 1, fill: 'currentColor' }, wheel);
  const footKey = (u) => {
    u = ((u % 1) + 1) % 1;
    if (u < DUTY) return { x: STRIDE - (2 * STRIDE * u) / DUTY, y: 0 };
    const s = (u - DUTY) / (1 - DUTY);
    // heel kicks up behind first, then the knee drives the foot forward and down
    const xs = s * s * s * (10 - 15 * s + 6 * s * s);
    return { x: -STRIDE + 2 * STRIDE * xs - 3.5 * Math.sin(Math.PI * Math.min(1, s * 1.6)), y: -12 * Math.pow(Math.sin(Math.PI * Math.pow(s, 0.7)), 1.1) };
  };
  let ph = rnd(0, 1), spin = 0, hopT = -1;
  return {
    g, x, y, dir, done: false,
    poke() { if (hopT < 0) hopT = 0; },
    draw(t, dt, P, wind) {
      ph += dt / T; this.x += dir * speed * dt;
      if (this.x < -60 || this.x > 1020) this.done = true;
      let hop = 0;
      if (hopT >= 0) { hopT += dt; hop = Math.sin(Math.PI * Math.min(1, hopT / 0.55)) * 14; if (hopT > 0.55) hopT = -1; }
      place(g, this.x, this.y - hop * FS, dir);
      const bounce = -3 * Math.pow(Math.abs(Math.sin(2 * Math.PI * ph + 0.6)), 1.4) + 0.8; // up in flight, down at contact
      const hip = [40, 94 + bounce];
      [footKey(ph), footKey(ph + 0.5)].forEach((k, i) => {
        const a = [40 + k.x, 118 + k.y];
        legs[i].L.draw([hip, joint(hip, a, 13, 13, 1), a], [0.2, 0.4]);
        legs[i].S.setAttribute('d', `M${f(a[0] - 2)} ${f(a[1])} L${f(a[0] + 4)} ${f(a[1])} Q${f(a[0] + 5)} ${f(a[1] + 2)} ${f(a[0] + 3)} ${f(a[1] + 2)} L${f(a[0] - 2)} ${f(a[1] + 2)}Z`);
      });
      g.appendChild(legs[footKey(ph).x > footKey(ph + 0.5).x ? 0 : 1].L.g);
      g.insertBefore(farArm.g, shorts);
      const sh = [47, 72.6 + bounce]; // leaning into the run
      shorts.setAttribute('d', `M34.6 ${f(hip[1] - 4)} L46 ${f(hip[1] - 4)} L47 ${f(hip[1] + 4)} L41 ${f(hip[1] + 4.6)} L40 ${f(hip[1] + 1)} L37.6 ${f(hip[1] + 4.6)} L33.8 ${f(hip[1] + 3.6)}Z`);
      shirt.setAttribute('d', `M35 ${f(hip[1] - 3.6)} Q34.2 ${f(sh[1] + 6)} ${f(sh[0] - 6)} ${f(sh[1])} Q${f(sh[0])} ${f(sh[1] - 2.6)} ${f(sh[0] + 3)} ${f(sh[1] + 1)} Q47.4 ${f(sh[1] + 10)} 46.4 ${f(hip[1] - 3.6)}Z`);
      const hc = [sh[0] + 2.4, sh[1] - 11];
      head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
      hair.setAttribute('d', `M${f(hc[0] - 6.2)} ${f(hc[1] + 1)} Q${f(hc[0] - 6.6)} ${f(hc[1] - 6)} ${f(hc[0])} ${f(hc[1] - 6.6)} Q${f(hc[0] - 3)} ${f(hc[1] - 2)} ${f(hc[0] - 6.2)} ${f(hc[1] + 1)}Z`);
      hat.setAttribute('d', `M${f(hc[0] - 12)} ${f(hc[1] - 4)} Q${f(hc[0])} ${f(hc[1] - 8)} ${f(hc[0] + 12)} ${f(hc[1] - 4)} Q${f(hc[0])} ${f(hc[1] - 1)} ${f(hc[0] - 12)} ${f(hc[1] - 4)}Z M${f(hc[0] - 5.6)} ${f(hc[1] - 5.4)} Q${f(hc[0] - 5)} ${f(hc[1] - 12)} ${f(hc[0])} ${f(hc[1] - 12)} Q${f(hc[0] + 5)} ${f(hc[1] - 12)} ${f(hc[0] + 5.6)} ${f(hc[1] - 5.6)}Z`);
      band.setAttribute('d', `M${f(hc[0] - 5.5)} ${f(hc[1] - 7.6)} L${f(hc[0] + 5.5)} ${f(hc[1] - 7.6)} L${f(hc[0] + 5.6)} ${f(hc[1] - 5.8)} L${f(hc[0] - 5.6)} ${f(hc[1] - 5.8)}Z`);
      const swing = Math.sin(2 * Math.PI * ph) * 52;
      const fsh = [sh[0] - 2.5, sh[1] + 1.5];
      const fe = [fsh[0] + Math.sin(swing * RAD) * 8, fsh[1] + Math.cos(swing * RAD) * 8];
      farArm.draw([fsh, fe, [fe[0] + Math.sin((swing - 50) * RAD) * 8, fe[1] + Math.cos((swing - 50) * RAD) * 8]], [0.2, 0.4]);
      const hand = [56, sh[1] - 5];
      arm.draw([[sh[0], sh[1] + 1.5], [sh[0] + 4.6, sh[1] + 5], hand], [0.2, 0.4]);
      const top = [hand[0] + 3, hand[1] - 22];
      stick.setAttribute('d', `M${hand[0] - 0.6} ${f(hand[1] + 2)} L${f(top[0])} ${f(top[1])}`);
      spin += (8 + speed * 0.12 + Math.abs(wind) * 6 + (hopT >= 0 ? 30 : 0)) * dt;
      wheel.setAttribute('transform', `translate(${f(top[0])} ${f(top[1])}) rotate(${f(spin * 57.3)})`);
      blades.forEach((b, k) => b.setAttribute('fill', fillOf(['#d4552f', '#3f6ea8', '#e3b33d', '#4e8a5a'][k], P)));
      shorts.setAttribute('fill', fillOf('#33465e', P));
      hat.setAttribute('fill', fillOf('#e6cf8e', P));
    },
    remove() { g.remove(); },
  };
}

// ===================================================================== boatman poling a flat boat
export function createBoat(parent, glow, { onRipple }) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const Y = WATER + 30; // waterline in scene
  const hull = el('path', { fill: '#8b6a48', stroke: 'currentColor', 'stroke-width': PEN }, g);
  const planks = pen(g, PEN * 0.45);
  const cargo = el('g', {}, g);
  const bales = [[120, 106], [146, 106], [172, 106], [133, 94], [159, 94]].map(([bx, by]) => {
    const n = el('path', { d: `M${bx - 12} ${by} Q${bx - 12} ${by - 6} ${bx} ${by - 6.5} Q${bx + 12} ${by - 6} ${bx + 12} ${by} Q${bx + 12} ${by + 6} ${bx} ${by + 6.5} Q${bx - 12} ${by + 6} ${bx - 12} ${by}Z`, fill: '#e2cf95', stroke: 'currentColor', 'stroke-width': PEN * 0.8 }, cargo);
    pen(cargo, PEN * 0.45).setAttribute('d', `M${bx - 6} ${by - 6} Q${bx - 7.4} ${by} ${bx - 6} ${by + 6} M${bx + 6} ${by - 6} Q${bx + 7.4} ${by} ${bx + 6} ${by + 6} M${bx - 12} ${by} L${bx + 12} ${by}`);
    return n;
  });
  const post = pen(g, PEN * 0.9);
  const lan = el('path', { stroke: 'currentColor', 'stroke-width': PEN * 0.7 }, g);
  const lanGlow = el('circle', { r: 26, fill: 'url(#v-warmglow)', opacity: 0 }, glow);
  const man = el('g', {}, g);
  const legs = [limb(man, 4.2), limb(man, 4.2)];
  legs.forEach((l) => solid(l, '#2b3446'));
  const coat = el('path', { fill: '#34507a', stroke: 'currentColor', 'stroke-width': PEN }, man);
  const coatMark = pen(man, PEN * 0.5);
  const head = el('ellipse', { rx: 4, ry: 4.8, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, man);
  const kasa = el('path', { fill: '#cdb57a', stroke: 'currentColor', 'stroke-width': PEN * 0.8 }, man);
  const kasaL = pen(man, PEN * 0.4);
  const arms = [limb(man, 3.4), limb(man, 3.4)];
  const pole = pen(g, PEN * 1.4);
  const poleWet = el('path', { stroke: 'currentColor', 'stroke-width': PEN * 0.9, 'stroke-dasharray': '2 2.4', fill: 'none', opacity: 0.6 }, g);
  const notes = el('g', {}, g);
  let X = 140, anchor = null, ph = 0, songT = -1, lastTip = [40, 160];
  const noteN = [];
  const T = 3.6;
  const lean = curve([[0, -4], [0.45, 26], [0.62, 14], [0.8, 2]], 1);
  return {
    g,
    get x() { return X; },
    poke() { if (songT < 0) { songT = 0; for (let i = 0; i < 4; i++) noteN.push({ t: -i * 0.35, x0: rnd(-4, 4), n: el('text', { 'font-size': 11, fill: 'currentColor', 'font-family': 'serif' }, notes) }); noteN.slice(-4).forEach((n, i) => (n.n.textContent = i % 2 ? '♪' : '♫')); } },
    draw(t, dt, P, wind) {
      ph = (ph + dt / T) % 1;
      const push = ph > 0.1 && ph < 0.62 ? Math.sin(Math.PI * (ph - 0.1) / 0.52) : 0;
      const v = 7 + 15 * push;
      X += v * dt; if (X > 1120) { X = -170; anchor = null; }
      g.setAttribute('transform', `translate(${f(X)} ${f(Y - 120 * FS + Math.sin(t * 1.4) * 0.6)}) scale(${FS}) translate(-40 0)`);
      // hull with an upturned bow, cargo of rice bales
      hull.setAttribute('d', 'M14 112 L232 112 Q250 110 258 96 Q252 116 236 124 L30 124 Q18 122 14 112Z');
      hull.setAttribute('fill', fillOf('#8b6a48', P));
      planks.setAttribute('d', 'M18 116 L240 116 M24 120 L236 120 M60 112 L60 124 M110 112 L110 124 M200 112 L200 124');
      bales.forEach((b) => b.setAttribute('fill', fillOf('#e2cf95', P)));
      // bow lantern
      post.setAttribute('d', 'M244 112 L244 86 Q244 82 248 82');
      const on = smooth(0.3, 0.55, P.lamp);
      lan.setAttribute('d', 'M245 84 L251 84 Q253 89 251 94 L245 94 Q243 89 245 84Z');
      lan.setAttribute('fill', rgb(mix(P.paper, hex('#ffd38a'), on)));
      const lw = [X + (248 - 40) * FS, Y - 120 * FS + 89 * FS];
      lanGlow.setAttribute('cx', f(lw[0])); lanGlow.setAttribute('cy', f(lw[1])); lanGlow.setAttribute('opacity', f(on));
      // boatman at the stern
      const ln = lean(ph) * RAD;
      const hip = [40, 86];
      legs[0].draw([hip, [44 + Math.sin(ln) * 6, 99], [46, 111]], [0.2, 0.4]);
      legs[1].draw([hip, [36, 99], [32, 111]], [0.2, 0.4]);
      const sh = [hip[0] + Math.sin(ln) * 22, hip[1] - Math.cos(ln) * 22];
      coat.setAttribute('d', `M${f(hip[0] - 5)} ${f(hip[1] + 4)} L${f(sh[0] - 5)} ${f(sh[1] + 1)} Q${f(sh[0])} ${f(sh[1] - 2.6)} ${f(sh[0] + 5)} ${f(sh[1] + 1)} L${f(hip[0] + 6)} ${f(hip[1] + 4)}Z`);
      coat.setAttribute('fill', fillOf('#34507a', P));
      coatMark.setAttribute('d', `M${f((hip[0] + sh[0]) / 2 - 3)} ${f((hip[1] + sh[1]) / 2)} l6 0`);
      coatMark.setAttribute('stroke', rgb(P.paper));
      const hc = [sh[0] + Math.sin(ln) * 9 + 1, sh[1] - Math.cos(ln) * 9];
      head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
      kasa.setAttribute('d', `M${f(hc[0] - 15)} ${f(hc[1] - 1)} L${f(hc[0] + 0.5)} ${f(hc[1] - 12)} L${f(hc[0] + 16)} ${f(hc[1] - 1)} Q${f(hc[0])} ${f(hc[1] - 3.6)} ${f(hc[0] - 15)} ${f(hc[1] - 1)}Z`);
      kasa.setAttribute('fill', fillOf('#cdb57a', P));
      kasaL.setAttribute('d', [-10, -5, 0, 5, 10].map((k) => `M${f(hc[0] + 0.5)} ${f(hc[1] - 11)} L${f(hc[0] + k)} ${f(hc[1] - 2.6)}`).join(' '));
      // the pole: planted in the bed while he pushes, then lifted and swung forward
      const toLocal = (wx) => (wx - X) / FS + 40;
      const bed = (Y - 120 * FS + 160 * FS);
      let tip;
      if (ph < 0.62) {
        if (!anchor) { anchor = X + (100 - 40) * FS; onRipple(anchor, WATER + 30); }
        tip = [toLocal(anchor), 160];
        lastTip = tip;
      } else {
        anchor = null;
        const u = (ph - 0.62) / 0.38;
        tip = [lerp(lastTip[0], 100, ease(u)), 160 - 58 * Math.sin(Math.PI * u)];
      }
      const hiHand = [sh[0] + 9, sh[1] + 4 + lean(ph) * 0.2];
      const dirx = hiHand[0] - tip[0], diry = hiHand[1] - tip[1], dl = Math.hypot(dirx, diry);
      const top = [hiHand[0] + (dirx / dl) * 46, hiHand[1] + (diry / dl) * 46];
      const loHand = [hiHand[0] - (dirx / dl) * 13, hiHand[1] - (diry / dl) * 13];
      arms[0].draw([[sh[0] + 1, sh[1] + 2], joint([sh[0] + 1, sh[1] + 2], hiHand, 10, 10, 1), hiHand], [0.2, 0.3]);
      arms[1].draw([[sh[0] - 1, sh[1] + 2], joint([sh[0] - 1, sh[1] + 2], loHand, 10, 11, 1), loHand], [0.2, 0.3]);
      // split at the water surface (local y where world y == WATER)
      const wl = (WATER - (Y - 120 * FS)) / FS;
      const k = (wl - top[1]) / (tip[1] - top[1]);
      const surf = k > 0 && k < 1 ? [lerp(top[0], tip[0], k), wl] : tip;
      pole.setAttribute('d', `M${pt(top)} L${pt(surf)}`);
      poleWet.setAttribute('d', k > 0 && k < 1 ? `M${pt(surf)} L${pt(tip)}` : '');
      // song
      if (songT >= 0) songT += dt; if (songT > 3.4) songT = -1;
      for (let i = noteN.length - 1; i >= 0; i--) {
        const n = noteN[i]; n.t += dt;
        if (n.t < 0) { n.n.setAttribute('opacity', 0); continue; }
        n.n.setAttribute('x', f(hc[0] + 6 + n.x0 + n.t * 10)); n.n.setAttribute('y', f(hc[1] - 10 - n.t * 18 + Math.sin(n.t * 6) * 2));
        n.n.setAttribute('opacity', f(Math.max(0, 1 - n.t / 1.8)));
        if (n.t > 1.8) { n.n.remove(); noteN.splice(i, 1); }
      }
    },
  };
}
