// A man with a briefcase walks across the card. Click him to tip his hat;
// move the pointer to blow his scarf. ~150 lines: the smallest complete example
// of the library — gait, open-stroke limbs, clothing drawn around the legs,
// springs for things that swing, a reaction to a click.
import { el, pen, shape, blot, paint, limb, shoe, place, inkDefs, run, f, pt, PEN, PAPER, type Vec } from '../../lib/ink.ts';
import { gait } from '../../lib/gait.ts';
import { spring, pendulum, pointerWind, ease, clamp } from '../../lib/motion.ts';

const W = 480, H = 240, GROUND = 196, SCALE = 1.25;
const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Line drawing of a man walking with a briefcase' });
const { filter } = inkDefs(svg, 'w');
document.querySelector('#stage')!.appendChild(svg);
const scene = el('g', { filter }, svg);

// --- a little street: kerb, paving, a lamp post
pen(scene, 0.9).setAttribute('d', `M0 ${GROUND} L${W} ${GROUND} M0 ${GROUND + 9} L${W} ${GROUND + 9}`);
pen(scene, 0.55).setAttribute('d', Array.from({ length: 16 }, (_, i) => `M${i * 32 + 10} ${GROUND} l0 9`).join(' '));
shape(scene, 0.9).setAttribute('d', `M383 ${GROUND} L385 70 L389 70 L391 ${GROUND}Z`);
shape(scene, 0.9).setAttribute('d', 'M377 70 L397 70 L394 58 L380 58Z');
pen(scene, 0.6).setAttribute('d', 'M381 64 L393 64 M387 58 L387 52');

// --- the figure, back to front. Everything is in figure space (feet on y 120).
const fig = el('g', { style: 'cursor:pointer' }, scene);
const farArm = limb(fig, 3.6);
const legs = [limb(fig, 4.2), limb(fig, 4.2)];
const shoes = [blot(fig), blot(fig)];
const coat = shape(fig);
const coatSeam = pen(fig, PEN * 0.6);
const scarfTail = paint(fig, '#b3412d', PEN * 0.8);
const head = el('ellipse', { rx: 3.6, ry: 4.6, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, fig);
const hat = blot(fig);
const scarf = paint(fig, '#b3412d', PEN * 0.8);
const nearArm = limb(fig, 3.6);
const caseG = el('g', {}, fig);
const briefcase = paint(caseG, '#6b4a32', PEN * 0.8);
const handle = pen(caseG, PEN * 0.7);

const walk = gait({ kind: 'walk' });
const wind = pointerWind(svg, 0.2);
const armSwing = [spring(60, 9), spring(60, 9)];
const caseSwing = pendulum(14, 1.8);
const tail = spring(30, 4);
let phase = 0, x = 120, tipT = -1;

fig.addEventListener('pointerdown', () => { if (tipT < 0) tipT = 0; });

run((t, dt) => {
  wind.step(t);
  // tipping the hat: slow to a stop, raise the hand, lift the hat, walk on
  let tip = 0;
  if (tipT >= 0) { tipT += dt; tip = tipT < 0.35 ? ease(tipT / 0.35) : tipT < 1.2 ? 1 : 1 - ease((tipT - 1.2) / 0.4); if (tipT > 1.6) tipT = -1; }
  const go = 1 - tip * 0.85;
  phase += (dt / walk.period) * go;
  x += walk.speed * SCALE * dt * go;
  if (x > W + 50) x = -50;
  place(fig, x, GROUND, 1, SCALE);

  const p = walk.pose(phase, go);
  const b = p.bob;
  // legs; the leading leg is drawn on top
  p.feet.forEach((fo, i) => { legs[i].draw([p.hip, fo.knee, fo.ankle], [0.3, 0.8]); shoe(shoes[i], fo.ankle, fo.pitch); });
  fig.insertBefore(legs[p.front].g, coat); fig.insertBefore(shoes[p.front], coat);

  // coat: drawn around the forward knee, so the hem opens and closes with the stride
  const kF = p.feet[p.front].knee, aF = p.feet[p.front].ankle;
  const sh: Vec = [41, 41 + b], hemY = 92;
  const fx = Math.max(kF[0] + 2.4, 46.4);
  coat.setAttribute('d', `M${f(sh[0] - 6)} ${f(sh[1] + 1)} Q${f(sh[0] - 1)} ${f(sh[1] - 2.4)} ${f(sh[0] + 5)} ${f(sh[1] + 1)} L${f(fx - 0.6)} ${f(70 + b)} Q${f(fx)} ${f(82 + b * 0.5)} ${f(Math.max(fx, aF[0] - 4))} ${hemY} L${f(30.6)} ${hemY + 1} L${f(33.2)} ${f(70 + b)}Z`);
  coatSeam.setAttribute('d', `M${f(sh[0] + 2.6)} ${f(sh[1] + 4)} L${f(sh[0] + 3.8)} ${f(66 + b)}`);

  // head, hat (lifts when tipped), scarf tail streaming in the wind
  const hc: Vec = [42.6, 31.6 + b];
  head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
  const lift = tip * 5;
  hat.setAttribute('d', `M${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)} L${f(hc[0] + 6.6)} ${f(hc[1] - 3.6 - lift)} Q${f(hc[0] + 4.4)} ${f(hc[1] - 5 - lift)} ${f(hc[0] + 4)} ${f(hc[1] - 8 - lift)} Q${f(hc[0])} ${f(hc[1] - 11 - lift)} ${f(hc[0] - 3.8)} ${f(hc[1] - 8 - lift)} Q${f(hc[0] - 4.2)} ${f(hc[1] - 5 - lift)} ${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)}Z`);
  scarf.setAttribute('d', `M${f(hc[0] - 4.6)} ${f(hc[1] + 4.6)} Q${f(hc[0])} ${f(hc[1] + 8.4)} ${f(hc[0] + 4)} ${f(hc[1] + 4.8)} L${f(hc[0] + 4.4)} ${f(hc[1] + 7.6)} Q${f(hc[0])} ${f(hc[1] + 11)} ${f(hc[0] - 4.8)} ${f(hc[1] + 7.4)}Z`);
  const flow = tail.step(-6 - walk.speed * 0.08 * go - wind.value * 5 + Math.sin(t * 9) * 0.8, dt);
  scarfTail.setAttribute('d', `M${f(hc[0] - 3.6)} ${f(hc[1] + 6)} Q${f(hc[0] - 6 + flow * 0.4)} ${f(hc[1] + 9)} ${f(hc[0] - 4 + flow)} ${f(hc[1] + 16 + flow * 0.2)} L${f(hc[0] - 1 + flow * 0.9)} ${f(hc[1] + 16.6 + flow * 0.2)} Q${f(hc[0] - 3 + flow * 0.3)} ${f(hc[1] + 10)} ${f(hc[0] - 0.8)} ${f(hc[1] + 7.4)}Z`);

  // arms swing opposite the legs, through springs so they lag and settle
  const legSwing = (p.feet[0].ankle[0] - 40) / (walk.stride / 2); // -1..1, near leg
  const farA = armSwing[0].step(-legSwing * 16 * go, dt) * Math.PI / 180;
  const nearA = armSwing[1].step(legSwing * 14 * go, dt) * Math.PI / 180;
  const shF: Vec = [sh[0] - 1, sh[1] + 2], shN: Vec = [sh[0] + 1.6, sh[1] + 2.4];
  const elbF: Vec = [shF[0] + 17 * Math.sin(farA), shF[1] + 17 * Math.cos(farA)];
  farArm.draw([shF, elbF, [elbF[0] + 16 * Math.sin(farA + 0.25), elbF[1] + 16 * Math.cos(farA + 0.25)]], [0.2, 0.5]);
  let hand: Vec;
  if (tip > 0.01) {
    // near arm goes to the hat brim
    const target: Vec = [hc[0] + 4, hc[1] - 4 - lift];
    const mid = lerpP(shN, target, 0.5);
    const elb: Vec = [mid[0] + 7 * tip, mid[1] + 3];
    hand = lerpP([shN[0] + 17 * Math.sin(nearA) + 16 * Math.sin(nearA + 0.1), shN[1] + 33], target, tip);
    nearArm.draw([shN, lerpP([shN[0] + 17 * Math.sin(nearA), shN[1] + 17], elb, tip), hand], [0.2, 0.4]);
  } else {
    const elb: Vec = [shN[0] + 17 * Math.sin(nearA), shN[1] + 17 * Math.cos(nearA)];
    hand = [elb[0] + 16 * Math.sin(nearA + 0.1), elb[1] + 16 * Math.cos(nearA + 0.1)];
    nearArm.draw([shN, elb, hand], [0.2, 0.4]);
  }
  // briefcase hangs from the near hand (or rests on the ground-side when tipping)
  const accel = Math.cos(2 * Math.PI * phase * 2) * 1.6 * go;
  const ca = caseSwing.step(-accel - wind.value * 0.3, dt);
  const ch: Vec = tip > 0.01 ? [shN[0] + 6, shN[1] + 34] : hand;
  caseG.setAttribute('transform', `rotate(${f(ca * 57.3)} ${pt(ch)})`);
  handle.setAttribute('d', `M${f(ch[0] - 2.4)} ${f(ch[1] + 2.4)} Q${pt(ch)} ${f(ch[0] + 2.4)} ${f(ch[1] + 2.4)}`);
  briefcase.setAttribute('d', `M${f(ch[0] - 8)} ${f(ch[1] + 2.4)} L${f(ch[0] + 8)} ${f(ch[1] + 2.4)} L${f(ch[0] + 8)} ${f(ch[1] + 13)} L${f(ch[0] - 8)} ${f(ch[1] + 13)}Z`);
});

function lerpP(a: Vec, b: Vec, t: number): Vec { t = clamp(t, 0, 1); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
