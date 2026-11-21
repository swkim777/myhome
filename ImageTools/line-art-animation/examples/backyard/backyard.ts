// Two cats in a sunny backyard chasing a butterfly across the grass and right into a garden pond.
// After splashing into the pond and shaking off water, the cats sulk over to the backyard wall and sit down gloomily —
// until the butterfly gently lands right on a cat's head, making both cats spring back up and resume the chase!
// Occasionally, the female owner enters from the left to pour cat food into their bowls; the cats dash over happily to eat
// while the butterfly rests gently on a flower, and the owner sits watching them, pets their heads, and exits left.
import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { el, pen, shape, blot, paint, limb, shoe, place, inkDefs, run, f, pt, PEN, PAPER, NS, type Vec, type Limb } from '../../lib/ink.ts';
import { gait } from '../../lib/gait.ts';
import { spring, pendulum, pointerWind, seeded, clamp, lerp, smooth, ease, minJerk, wobble, type Spring } from '../../lib/motion.ts';

const W = 640, H = 320;
const FENCE_Y = 216;
const SP = 0.85; // scene pen weight

// Garden pond on the right side of the backyard
const POND_X = 512, POND_Y = 256, POND_RX = 78, POND_RY = 25;

const svg = el('svg', {
  xmlns: NS,
  viewBox: `0 0 ${W} ${H}`,
  width: W,
  height: H,
  role: 'img',
  'aria-label': 'Line-art animation of two cats chasing a butterfly in a backyard, splashing into a pond, and being fed and petted by their owner',
});
const ink = inkDefs(svg, 'by');
// Embed paper fill style inside <defs> so serialized SVG snapshots render identically when exported to GIF
el('style', {}, ink.defs).textContent = 'svg { color: #1c1c1c; } .pp { fill: #fdfdfc; }';
document.querySelector('#stage')!.appendChild(svg);

// Soft warm afternoon sky gradient above the fence
const skyGrad = el('linearGradient', { id: 'by-sky', x1: 0, y1: 0, x2: 0, y2: 1 }, ink.defs);
el('stop', { offset: '0%', 'stop-color': '#f5f0e4' }, skyGrad);
el('stop', { offset: '100%', 'stop-color': '#fdfcf8' }, skyGrad);
el('rect', { width: W, height: FENCE_Y, fill: 'url(#by-sky)' }, svg);

const scene = el('g', { filter: ink.filter }, svg);
const bgLayer = el('g', {}, scene);
const fenceLayer = el('g', {}, scene);
const pondLayer = el('g', {}, scene);
const gardenLayer = el('g', {}, scene);
const actorLayer = el('g', {}, scene);
const splashLayer = el('g', { style: 'pointer-events:none' }, scene);
const fgLayer = el('g', {}, scene);

const srnd = seeded(29);
const wind = pointerWind(svg, 0.25);
const hintEl = document.querySelector('#hint');
const hideHint = () => hintEl?.classList.add('gone');
setTimeout(hideHint, 14000);

const oval = (cx: number, cy: number, rx: number, ry: number): string =>
  `M${f(cx - rx)} ${f(cy)} a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0 a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0Z`;

const inPond = (x: number, y: number, padX = 12, padY = 8): boolean => {
  const nx = (x - POND_X) / (POND_RX + padX);
  const ny = (y - POND_Y) / (POND_RY + padY);
  return nx * nx + ny * ny <= 1;
};

// ============================================================================
// 1. Background: distant roof, garden tree, wooden slat fence, and house engawa
// ============================================================================
function buildBackyard(onCallOwner: () => void) {
  const far = el('g', { opacity: 0.32 }, bgLayer);
  pen(far, SP * 0.7).setAttribute(
    'd',
    `M170 112 Q260 94 370 108 T640 96 M240 105 L245 84 L335 84 L342 105 ` +
    `M238 84 Q290 79 344 84`
  );

  // Garden tree rising behind the wooden fence on the right
  const treeG = el('g', {}, bgLayer);
  const trunk = shape(treeG, SP * 0.95);
  trunk.setAttribute(
    'd',
    `M512 ${FENCE_Y} Q514 140 504 96 Q492 66 462 50 L466 45 Q498 60 512 88 ` +
    `Q520 64 554 44 L558 49 Q526 68 522 98 Q526 140 526 ${FENCE_Y}Z`
  );
  pen(treeG, SP * 0.5).setAttribute('d', 'M516 155 Q518 130 514 110 M521 178 Q522 152 520 132');

  const canopyG = el('g', {}, bgLayer);
  const blobs: Array<[number, number, number, number]> = [
    [458, 52, 34, 18],
    [495, 39, 44, 22],
    [544, 46, 38, 20],
    [575, 62, 28, 16],
    [432, 66, 26, 15],
  ];
  blobs.forEach(([cx, cy, rx, ry], idx) => {
    const pts: Vec[] = [];
    const n = 12;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const bump = 1 + 0.12 * Math.sin(a * 3 + idx * 1.7) + 0.08 * Math.cos(a * 2 - idx);
      pts.push([cx + Math.cos(a) * rx * bump, cy + Math.sin(a) * ry * bump]);
    }
    const mid = (a: Vec, b: Vec): Vec => [(a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5];
    let d = `M${pt(mid(pts[n - 1], pts[0]))}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[i], p1 = pts[(i + 1) % n];
      d += ` Q${pt(p0)} ${pt(mid(p0, p1))}`;
    }
    shape(canopyG, SP * 0.8).setAttribute('d', d + 'Z');
    pen(canopyG, SP * 0.45).setAttribute(
      'd',
      `M${f(cx - rx * 0.35)} ${f(cy + 2)} q5 -3 10 0 M${f(cx + rx * 0.12)} ${f(cy - 3)} q5 -2 9 1`
    );
  });

  // Weathered wooden board fence (板塀) across x = 168..640
  const fx0 = 168, fx1 = W, fy0 = 108, fy1 = FENCE_Y;
  shape(fenceLayer, SP).setAttribute('d', `M${fx0} ${fy0} L${fx1} ${fy0} L${fx1} ${fy1} L${fx0} ${fy1}Z`);
  shape(fenceLayer, SP * 0.85).setAttribute('d', `M${fx0} ${fy1 - 10} L${fx1} ${fy1 - 10} L${fx1} ${fy1} L${fx0} ${fy1}Z`);
  shape(fenceLayer, SP * 0.95).setAttribute('d', `M${fx0 - 2} ${fy0 - 4} L${fx1} ${fy0 - 4} L${fx1} ${fy0 + 2} L${fx0 - 2} ${fy0 + 2}Z`);

  const plankLines: string[] = [];
  const grainLines: string[] = [];
  const plankW = 16;
  for (let x = fx0 + plankW; x < fx1; x += plankW) {
    plankLines.push(`M${f(x)} ${fy0 + 2} L${f(x)} ${fy1 - 10}`);
    const gx = x - plankW * 0.5;
    const gy = srnd(fy0 + 18, fy1 - 36);
    grainLines.push(`M${f(gx - 2)} ${f(gy)} Q${f(gx + 1)} ${f(gy + 12)} ${f(gx - 1)} ${f(gy + 24)}`);
    grainLines.push(`M${f(gx - 3)} ${fy0 + 18} l0.6 0 M${f(gx + 3)} ${fy0 + 18} l0.6 0`);
    grainLines.push(`M${f(gx - 3)} ${fy1 - 26} l0.6 0 M${f(gx + 3)} ${fy1 - 26} l0.6 0`);
  }
  for (let x = fx0 + 28; x < fx1; x += 34) {
    plankLines.push(`M${f(x)} ${fy1 - 10} L${f(x)} ${fy1}`);
  }
  pen(fenceLayer, SP * 0.65).setAttribute('d', plankLines.join(' '));
  pen(fenceLayer, SP * 0.4).setAttribute('d', grainLines.join(' '));

  // Left side: House veranda (縁側 / engawa) elevation (x = 0..172) — click to summon the owner!
  const houseG = el('g', { style: 'cursor:pointer' }, fenceLayer);
  el('title', {}, houseG).textContent = 'Call the owner to feed the cats';
  houseG.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    hideHint();
    onCallOwner();
  });

  shape(houseG, SP).setAttribute('d', `M0 44 L168 44 L168 ${FENCE_Y} L0 ${FENCE_Y}Z`);
  shape(houseG, SP).setAttribute('d', 'M0 30 L182 42 Q186 48 178 52 L0 42Z');
  const tileEnds: string[] = [];
  for (let x = 8; x < 176; x += 11) {
    const y = 34 + (x / 176) * 11;
    tileEnds.push(oval(x, y, 2.2, 2.0));
  }
  shape(houseG, SP * 0.6).setAttribute('d', tileEnds.join(' '));

  shape(houseG, SP * 0.9).setAttribute('d', 'M14 58 L148 58 L148 184 L14 184Z');
  blot(houseG).setAttribute('d', 'M132 59 L147 59 L147 183 L132 183Z');
  const shojiGrid: string[] = ['M74 58 L74 184', 'M132 58 L132 184', 'M14 156 L132 156'];
  for (let y = 76; y < 155; y += 16) shojiGrid.push(`M14 ${y} L132 ${y}`);
  for (let x = 34; x < 130; x += 20) if (x !== 74) shojiGrid.push(`M${x} 58 L${x} 156`);
  pen(houseG, SP * 0.5).setAttribute('d', shojiGrid.join(' '));

  shape(houseG, SP).setAttribute('d', 'M148 48 L157 48 L157 184 L148 184Z');
  shape(houseG, SP).setAttribute('d', 'M0 184 L176 184 L176 193 L0 193Z');
  shape(houseG, SP * 0.85).setAttribute('d', `M0 193 L168 193 L168 ${FENCE_Y} L0 ${FENCE_Y}Z`);
  const underSlats: string[] = [];
  for (let x = 10; x < 164; x += 9) underSlats.push(`M${x} 193 L${x} ${FENCE_Y}`);
  pen(houseG, SP * 0.5).setAttribute('d', underSlats.join(' '));

  shape(houseG, SP * 0.95).setAttribute(
    'd',
    `M46 ${FENCE_Y - 6} Q44 ${FENCE_Y - 14} 58 ${FENCE_Y - 15} L106 ${FENCE_Y - 15} ` +
    `Q120 ${FENCE_Y - 14} 118 ${FENCE_Y - 4} Q116 ${FENCE_Y + 3} 102 ${FENCE_Y + 3} ` +
    `L56 ${FENCE_Y + 3} Q46 ${FENCE_Y + 2} 46 ${FENCE_Y - 6}Z`
  );
  shape(houseG, SP * 0.65).setAttribute('d', `M66 ${FENCE_Y - 7} l10 -1 l1 4 l-10 1Z M80 ${FENCE_Y - 6} l10 -1 l1 4 l-10 1Z`);
  paint(houseG, '#b3412d', SP * 0.55).setAttribute('d', `M69 ${FENCE_Y - 7} q2 -2 5 0 M83 ${FENCE_Y - 6} q2 -2 5 0`);

  paint(houseG, '#b86342', SP * 0.8).setAttribute('d', 'M18 184 L15 171 L29 171 L26 184Z');
  pen(houseG, SP * 0.75).setAttribute('d', 'M22 171 Q16 161 12 164 M22 171 Q22 158 25 156 M22 171 Q28 162 32 165');

  shape(houseG, SP * 0.85).setAttribute('d', `M184 ${FENCE_Y + 2} L182 ${FENCE_Y - 18} L204 ${FENCE_Y - 18} L202 ${FENCE_Y + 2}Z`);
  pen(houseG, SP * 0.55).setAttribute(
    'd',
    `M182.5 ${FENCE_Y - 12} L203.5 ${FENCE_Y - 12} M183.5 ${FENCE_Y - 5} L202.5 ${FENCE_Y - 5} ` +
    `M179 ${FENCE_Y - 20} L208 ${FENCE_Y - 17}`
  );

  pen(fenceLayer, SP * 0.85).setAttribute('d', `M0 ${FENCE_Y} L${W} ${FENCE_Y}`);
  const stones: Array<[number, number, number, number]> = [
    [138, 232, 16, 4.5],
    [194, 244, 18, 5],
    [256, 252, 15, 4.2],
    [322, 248, 17, 4.6],
  ];
  stones.forEach(([sx, sy, rx, ry]) => {
    shape(gardenLayer, SP * 0.7).setAttribute('d', oval(sx, sy, rx, ry));
  });

  // Hanging ceramic wind chime (風鈴 / fūrin)
  const chimeAnchor: Vec = [162, 50];
  const chimeG = el('g', { style: 'cursor:pointer' }, fenceLayer);
  el('title', {}, chimeG).textContent = 'Ring the wind chime';
  const stringN = pen(chimeG, SP * 0.55);
  const bellN = shape(chimeG, SP * 0.8);
  const bellBand = paint(chimeG, '#b3412d', SP * 0.55);
  const stripN = shape(chimeG, SP * 0.65);
  const stripInk = pen(chimeG, SP * 0.45);
  el('rect', { x: 150, y: 48, width: 24, height: 48, fill: 'transparent' }, chimeG);

  const bellPend = pendulum(16, 1.3);
  const stripPend = pendulum(11, 0.9);
  chimeG.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    hideHint();
    bellPend.kick(4.5);
    stripPend.kick(7.5);
  });

  return {
    draw(t: number, dt: number, w: number) {
      const sway = w * 1.8 + Math.sin(t * 1.1) * 0.6;
      canopyG.setAttribute('transform', `translate(${f(sway)} ${f(Math.sin(t * 1.7) * 0.35)})`);

      const ba = bellPend.step(w * 0.9 + Math.sin(t * 2.3) * 0.25, dt);
      const sa = stripPend.step(w * 1.8 + Math.sin(t * 3.7) * 0.5, dt);
      const bx = chimeAnchor[0] + Math.sin(ba) * 10;
      const by = chimeAnchor[1] + Math.cos(ba) * 10;
      stringN.setAttribute('d', `M${pt(chimeAnchor)} L${f(bx)} ${f(by)}`);
      bellN.setAttribute(
        'd',
        `M${f(bx - 5.2)} ${f(by + 7.5)} Q${f(bx - 5.5)} ${f(by)} ${f(bx)} ${f(by)} ` +
        `Q${f(bx + 5.5)} ${f(by)} ${f(bx + 5.2)} ${f(by + 7.5)} Z`
      );
      bellBand.setAttribute(
        'd',
        `M${f(bx - 4.8)} ${f(by + 5.2)} L${f(bx + 4.8)} ${f(by + 5.2)} L${f(bx + 5.1)} ${f(by + 7.4)} L${f(bx - 5.1)} ${f(by + 7.4)}Z`
      );
      const sx0 = bx + Math.sin(ba) * 3;
      const sy0 = by + 7.5;
      const sx1 = sx0 + Math.sin(sa) * 18;
      const sy1 = sy0 + Math.cos(sa) * 18;
      const dx = Math.cos(sa) * 2.1, dy = -Math.sin(sa) * 2.1;
      stripN.setAttribute(
        'd',
        `M${f(sx0)} ${f(sy0)} L${f(sx0 + (sx1 - sx0) * 0.25)} ${f(sy0 + 4)} ` +
        `M${f(sx0 - dx)} ${f(sy0 + 4 - dy)} L${f(sx0 + dx)} ${f(sy0 + 4 + dy)} ` +
        `L${f(sx1 + dx)} ${f(sy1 + dy)} L${f(sx1 - dx)} ${f(sy1 - dy)}Z`
      );
      stripInk.setAttribute(
        'd',
        `M${f((sx0 + sx1) * 0.5)} ${f((sy0 + 4 + sy1) * 0.5 - 3)} L${f((sx0 + sx1) * 0.5 + Math.sin(sa) * 3)} ${f((sy0 + 4 + sy1) * 0.5 + 3)}`
      );
    },
  };
}

// ============================================================================
// 2. Right-Side Backyard Pond — rocks, lily pads, ripples, and water splashes
// ============================================================================
interface RippleRing {
  x: number;
  y: number;
  t: number;
  scale: number;
  node: SVGEllipseElement;
}

interface SplashDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  node: SVGPathElement;
}

interface SplashCrown {
  x: number;
  y: number;
  t: number;
  power: number;
  node: SVGPathElement;
}

function buildPond() {
  const pondPath = (rx: number, ry: number, dy = 0): string => {
    const pts: Vec[] = [];
    const n = 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const k = 1 + 0.06 * Math.cos(a * 2 - 0.5) + 0.04 * Math.sin(a * 3 + 0.8);
      const pinch = Math.sin(a) < 0 ? 1 - 0.08 * Math.pow(Math.sin(a), 2) : 1;
      pts.push([
        POND_X + Math.cos(a) * rx * k,
        POND_Y + dy + Math.sin(a) * ry * k * pinch,
      ]);
    }
    const mid = (a: Vec, b: Vec): Vec => [(a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5];
    let d = `M${pt(mid(pts[n - 1], pts[0]))}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[i], p1 = pts[(i + 1) % n];
      d += ` Q${pt(p0)} ${pt(mid(p0, p1))}`;
    }
    return d + 'Z';
  };

  shape(pondLayer, SP * 0.95).setAttribute('d', pondPath(POND_RX + 4, POND_RY + 2.8, -0.5));
  const waterSurface = paint(pondLayer, '#d6e3e6', SP * 0.85);
  waterSurface.setAttribute('d', pondPath(POND_RX, POND_RY, 0.5));
  pen(pondLayer, SP * 0.45).setAttribute('d', pondPath(POND_RX - 3.5, POND_RY - 2.0, 1.5));

  const backRocks: Array<[number, number, number, number]> = [
    [POND_X - 66, POND_Y - 14, 11, 6.5],
    [POND_X - 50, POND_Y - 21, 9, 5.2],
    [POND_X + 42, POND_Y - 22, 13, 7.2],
    [POND_X + 60, POND_Y - 17, 15, 8.5],
    [POND_X + 74, POND_Y - 8, 10, 6.0],
  ];
  backRocks.forEach(([rx, ry, w, h]) => {
    shape(pondLayer, SP * 0.85).setAttribute(
      'd',
      `M${f(rx - w)} ${f(ry + h * 0.3)} Q${f(rx - w * 0.8)} ${f(ry - h)} ${f(rx + w * 0.1)} ${f(ry - h * 0.9)} ` +
      `Q${f(rx + w)} ${f(ry - h * 0.7)} ${f(rx + w)} ${f(ry + h * 0.3)} ` +
      `Q${f(rx)} ${f(ry + h * 0.7)} ${f(rx - w)} ${f(ry + h * 0.3)}Z`
    );
    pen(pondLayer, SP * 0.4).setAttribute('d', `M${f(rx - w * 0.4)} ${f(ry - h * 0.2)} q${f(w * 0.5)} -2 ${f(w * 0.8)} 1`);
  });

  const frontRocks: Array<[number, number, number, number]> = [
    [POND_X - 75, POND_Y + 9, 10, 5.0],
    [POND_X - 42, POND_Y + 24, 12, 5.2],
    [POND_X + 52, POND_Y + 23, 13, 5.5],
    [POND_X + 73, POND_Y + 12, 9.5, 4.8],
  ];
  frontRocks.forEach(([rx, ry, w, h]) => {
    shape(fgLayer, SP * 0.8).setAttribute(
      'd',
      `M${f(rx - w)} ${f(ry + h * 0.3)} Q${f(rx - w * 0.7)} ${f(ry - h)} ${f(rx + w * 0.2)} ${f(ry - h * 0.85)} ` +
      `Q${f(rx + w)} ${f(ry - h * 0.6)} ${f(rx + w)} ${f(ry + h * 0.3)} ` +
      `Q${f(rx)} ${f(ry + h * 0.65)} ${f(rx - w)} ${f(ry + h * 0.3)}Z`
    );
  });

  const padsG = el('g', {}, pondLayer);
  const lilyPads = [
    { x: POND_X - 36, y: POND_Y + 5, rx: 9.5, ry: 4.2, dir: -1, n: paint(padsG, '#bfd1b8', SP * 0.65), vein: pen(padsG, SP * 0.35) },
    { x: POND_X + 34, y: POND_Y - 6, rx: 11.0, ry: 4.8, dir: 1, n: paint(padsG, '#bfd1b8', SP * 0.65), vein: pen(padsG, SP * 0.35) },
    { x: POND_X + 46, y: POND_Y + 6, rx: 7.8, ry: 3.5, dir: -1, n: paint(padsG, '#bfd1b8', SP * 0.65), vein: pen(padsG, SP * 0.35) },
  ];
  const lotusBud = paint(padsG, '#e898a0', SP * 0.6);

  const shimmerG = el('g', {}, pondLayer);
  const shimmers = [
    { dx: -44, dy: -8, len: 18, ph: 0.2, n: pen(shimmerG, SP * 0.45) },
    { dx: -16, dy: 4, len: 24, ph: 1.5, n: pen(shimmerG, SP * 0.45) },
    { dx: 12, dy: -11, len: 20, ph: 2.9, n: pen(shimmerG, SP * 0.45) },
    { dx: -8, dy: 14, len: 22, ph: 4.1, n: pen(shimmerG, SP * 0.45) },
    { dx: 26, dy: 11, len: 16, ph: 5.3, n: pen(shimmerG, SP * 0.45) },
  ];

  const ringG = el('g', {}, pondLayer);
  const rings: RippleRing[] = [];
  const drops: SplashDrop[] = [];
  const crowns: SplashCrown[] = [];

  function addRing(x: number, y: number, count = 1, scale = 1) {
    for (let i = 0; i < count; i++) {
      rings.push({
        x: clamp(x, POND_X - POND_RX + 14, POND_X + POND_RX - 14),
        y: clamp(y, POND_Y - POND_RY + 6, POND_Y + POND_RY - 6),
        t: -i * 0.18,
        scale,
        node: el('ellipse', { fill: 'none', stroke: 'currentColor', 'stroke-width': SP * 0.55, opacity: 0 }, ringG),
      });
    }
  }

  function addDrops(x: number, y: number, count: number, speedScale = 1) {
    for (let i = 0; i < count; i++) {
      const ang = -Math.PI * 0.18 - (i / Math.max(1, count - 1)) * Math.PI * 0.64 + (Math.random() - 0.5) * 0.25;
      const spd = (55 + Math.random() * 55) * speedScale;
      drops.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y - 2,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 20,
        life: 0,
        maxLife: 0.45 + Math.random() * 0.25,
        node: shape(splashLayer, SP * 0.6),
      });
    }
  }

  function splash(x: number, y: number, power = 1) {
    addRing(x, y, 4, 1.35 * power);
    addDrops(x, y, Math.round(11 * power), power);
    crowns.push({
      x,
      y,
      t: 0,
      power,
      node: shape(splashLayer, SP * 0.75),
    });
  }

  let ambientTimer = 1.2;

  return {
    addRing,
    addDrops,
    splash,
    draw(t: number, dt: number, w: number) {
      lilyPads.forEach((p, i) => {
        const bx = p.x + Math.sin(t * 1.4 + i * 2) * 1.1 + w * 0.8;
        const by = p.y + Math.cos(t * 1.8 + i) * 0.5;
        const nx = bx + p.dir * p.rx * 0.75;
        p.n.setAttribute(
          'd',
          `M${f(bx)} ${f(by)} L${f(nx)} ${f(by - 1.4)} ` +
          `A${f(p.rx)} ${f(p.ry)} 0 1 ${p.dir > 0 ? 0 : 1} ${f(nx)} ${f(by + 1.4)} Z`
        );
        p.vein.setAttribute('d', `M${f(bx)} ${f(by)} l${f(-p.dir * p.rx * 0.55)} 0 M${f(bx)} ${f(by)} l${f(-p.dir * p.rx * 0.35)} -1.8`);
      });
      const lp = lilyPads[1];
      const lbx = lp.x + 2 + Math.sin(t * 1.4 + 2) * 1.1 + w * 0.8;
      const lby = lp.y - 2.5 + Math.cos(t * 1.8 + 1) * 0.5;
      lotusBud.setAttribute(
        'd',
        `M${f(lbx - 2.6)} ${f(lby)} Q${f(lbx)} ${f(lby - 5.5)} ${f(lbx + 2.6)} ${f(lby)} ` +
        `Q${f(lbx)} ${f(lby + 1.8)} ${f(lbx - 2.6)} ${f(lby)}Z`
      );

      shimmers.forEach((s) => {
        const sx = POND_X + s.dx + Math.sin(t * 1.1 + s.ph) * 5 + w * 2;
        const sy = POND_Y + s.dy + Math.cos(t * 1.5 + s.ph) * 0.6;
        s.n.setAttribute('d', `M${f(sx)} ${f(sy)} Q${f(sx + s.len * 0.5)} ${f(sy - 1.1)} ${f(sx + s.len)} ${f(sy)}`);
      });

      ambientTimer -= dt;
      if (ambientTimer <= 0) {
        ambientTimer = 1.8 + Math.random() * 2.2;
        addRing(POND_X + (Math.random() - 0.5) * 85, POND_Y + (Math.random() - 0.5) * 22, 1, 0.65);
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.t += dt;
        if (r.t < 0) {
          r.node.setAttribute('opacity', '0');
          continue;
        }
        const dur = 1.45;
        const u = r.t / dur;
        if (u >= 1) {
          r.node.remove();
          rings.splice(i, 1);
          continue;
        }
        r.node.setAttribute('cx', f(r.x));
        r.node.setAttribute('cy', f(r.y));
        r.node.setAttribute('rx', f((3 + r.t * 22) * r.scale));
        r.node.setAttribute('ry', f((1.1 + r.t * 6.8) * r.scale));
        r.node.setAttribute('opacity', f((1 - u) * 0.85));
      }

      for (let i = crowns.length - 1; i >= 0; i--) {
        const c = crowns[i];
        c.t += dt;
        const dur = 0.42;
        const u = c.t / dur;
        if (u >= 1) {
          c.node.remove();
          crowns.splice(i, 1);
          continue;
        }
        const spread = (9 + u * 19) * c.power;
        const height = Math.sin(u * Math.PI) * 26 * c.power;
        const cx = c.x, cy = c.y;
        c.node.setAttribute(
          'd',
          `M${f(cx - spread)} ${f(cy)} ` +
          `Q${f(cx - spread * 0.85)} ${f(cy - height * 0.9)} ${f(cx - spread * 0.55)} ${f(cy - height)} ` +
          `Q${f(cx - spread * 0.25)} ${f(cy - height * 0.35)} ${f(cx)} ${f(cy - height * 1.15)} ` +
          `Q${f(cx + spread * 0.25)} ${f(cy - height * 0.35)} ${f(cx + spread * 0.55)} ${f(cy - height * 0.95)} ` +
          `Q${f(cx + spread * 0.85)} ${f(cy - height * 0.85)} ${f(cx + spread)} ${f(cy)} ` +
          `Q${f(cx)} ${f(cy + 2.5)} ${f(cx - spread)} ${f(cy)}Z`
        );
        c.node.setAttribute('opacity', f(1 - u * 0.75));
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.life += dt;
        if (d.life >= d.maxLife) {
          d.node.remove();
          drops.splice(i, 1);
          continue;
        }
        d.vy += 260 * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        const r = 1.4 * (1 - (d.life / d.maxLife) * 0.4);
        d.node.setAttribute('d', oval(d.x, d.y, r, r * 1.25));
      }
    },
  };
}

// ============================================================================
// 3. Swaying Backyard Grass & Garden Flowers (exposes flower tip for butterfly)
// ============================================================================
interface Flower {
  x: number;
  y: number;
  h: number;
  tx: number;
  ty: number;
  colour: string;
  bend: Spring;
  stem: SVGPathElement;
  leaves: SVGPathElement;
  head: SVGPathElement;
  center: SVGPathElement;
  layer: 'back' | 'front';
}

interface GrassTuft {
  x: number;
  y: number;
  h: number;
  bend: Spring;
  node: SVGPathElement;
}

function buildFlora() {
  const flowers: Flower[] = [];
  const specs: Array<[number, number, number, string, 'back' | 'front']> = [
    [232, 222, 24, '#e58c78', 'back'],
    [244, 224, 19, '#fdfcf8', 'back'],
    [358, 221, 26, '#e58c78', 'back'], // flower index 2: butterfly's favourite flower perch!
    [370, 223, 21, '#e8b85a', 'back'],
    [418, 224, 24, '#fdfcf8', 'back'],
    [429, 226, 20, '#e58c78', 'back'],
    [594, 225, 25, '#e8b85a', 'back'],
    [606, 228, 21, '#e58c78', 'back'],
    [102, 274, 26, '#e58c78', 'front'],
    [116, 278, 21, '#fdfcf8', 'front'],
    [392, 278, 25, '#e8b85a', 'front'],
    [405, 281, 20, '#e58c78', 'front'],
    [602, 276, 26, '#fdfcf8', 'front'],
  ];

  specs.forEach(([x, y, h, colour, layer]) => {
    const parent = layer === 'back' ? gardenLayer : fgLayer;
    const stem = pen(parent, SP * 0.7);
    const leaves = pen(parent, SP * 0.65);
    const head = paint(parent, colour, SP * 0.65);
    const center = blot(parent);
    flowers.push({ x, y, h, tx: x, ty: y - h, colour, bend: spring(34, 4.5), stem, leaves, head, center, layer });
  });

  const tufts: GrassTuft[] = [];
  for (let i = 0; i < 34; i++) {
    const x = srnd(24, W - 24);
    const y = i < 22 ? srnd(FENCE_Y + 3, 258) : srnd(262, 294);
    if (inPond(x, y, 14, 10)) continue;
    const h = srnd(7, 14);
    const parent = y < 260 ? gardenLayer : fgLayer;
    tufts.push({ x, y, h, bend: spring(42, 5.5), node: pen(parent, SP * 0.6) });
  }

  return {
    flowers,
    get perchFlowerTip(): Vec {
      const fl = flowers[2];
      return [fl.tx, fl.ty - 2.4];
    },
    draw(t: number, dt: number, w: number, catPositions: Vec[]) {
      flowers.forEach((fl, i) => {
        let catPush = 0;
        for (const [cx, cy] of catPositions) {
          const dx = fl.x - cx, dy = fl.y - cy;
          if (Math.abs(dx) < 26 && Math.abs(dy) < 16) {
            catPush += (dx >= 0 ? 1 : -1) * (1 - Math.abs(dx) / 26) * 8;
          }
        }
        const target = w * 4.5 + Math.sin(t * 2.1 + i * 1.3) * 1.4 + catPush;
        const b = fl.bend.step(target, dt);
        const tx = fl.x + b, ty = fl.y - fl.h + Math.abs(b) * 0.15;
        fl.tx = tx;
        fl.ty = ty;
        fl.stem.setAttribute('d', `M${f(fl.x)} ${f(fl.y)} Q${f(fl.x + b * 0.4)} ${f(fl.y - fl.h * 0.55)} ${f(tx)} ${f(ty)}`);
        const mx = fl.x + b * 0.35, my = fl.y - fl.h * 0.42;
        fl.leaves.setAttribute(
          'd',
          `M${f(mx)} ${f(my)} q${f(-5 + b * 0.2)} -4 ${f(-8 + b * 0.3)} -1 ` +
          `M${f(mx)} ${f(my + 2)} q${f(5 + b * 0.2)} -4 ${f(8 + b * 0.3)} -1`
        );
        const r = 3.6;
        const petals: string[] = [];
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2 + b * 0.04;
          petals.push(oval(tx + Math.cos(a) * 2.4, ty + Math.sin(a) * 2.0, r * 0.55, r * 0.45));
        }
        fl.head.setAttribute('d', petals.join(' '));
        fl.center.setAttribute('d', oval(tx, ty, 1.3, 1.1));
      });

      tufts.forEach((gr, i) => {
        let catPush = 0;
        for (const [cx, cy] of catPositions) {
          const dx = gr.x - cx, dy = gr.y - cy;
          if (Math.abs(dx) < 24 && Math.abs(dy) < 14) {
            catPush += (dx >= 0 ? 1 : -1) * (1 - Math.abs(dx) / 24) * 6;
          }
        }
        const b = gr.bend.step(w * 2.8 + Math.sin(t * 2.6 + i) * 0.8 + catPush, dt);
        const x = gr.x, y = gr.y, h = gr.h;
        gr.node.setAttribute(
          'd',
          `M${f(x - 2)} ${f(y)} Q${f(x - 3 + b * 0.4)} ${f(y - h * 0.5)} ${f(x - 5 + b)} ${f(y - h * 0.85)} ` +
          `M${f(x)} ${f(y)} Q${f(x + b * 0.5)} ${f(y - h * 0.6)} ${f(x + b * 1.1)} ${f(y - h)} ` +
          `M${f(x + 2)} ${f(y)} Q${f(x + 3 + b * 0.4)} ${f(y - h * 0.5)} ${f(x + 5 + b * 0.9)} ${f(y - h * 0.8)}`
        );
      });
    },
  };
}

// ============================================================================
// 4. The Butterfly — lands on a sulking cat's head, or rests on a flower during feeding!
// ============================================================================
function createButterfly(parent: Element) {
  const g = el('g', { style: 'cursor:pointer' }, parent);
  const backWing = paint(g, '#e07a48', SP * 0.7);
  const frontWing = paint(g, '#f0935b', SP * 0.75);
  const wingMark = blot(g);
  const body = pen(g, SP * 1.1);
  const antennae = pen(g, SP * 0.5);

  let x = 350, y = 182;
  let vx = 42, vy = -6;
  let targetX = POND_X - 8, targetY = 196;
  let waypointTimer = 3.2;
  let startledTimer = 0;
  let flapPhase = 0;
  let visitPondNext = false;

  let perchedOnHead = false;
  let perchedOnFlower = false;
  let perchedTimer = 0;

  function pickWaypoint(nearX?: number, nearY?: number) {
    perchedOnHead = false;
    perchedOnFlower = false;
    perchedTimer = 0;
    if (nearX !== undefined && nearY !== undefined) {
      targetX = clamp(nearX, 75, W - 65);
      targetY = clamp(nearY, 118, 224);
      waypointTimer = 3.6;
      startledTimer = 0.5;
      return;
    }
    visitPondNext = !visitPondNext;
    if (visitPondNext) {
      targetX = POND_X + srnd(-22, 18);
      targetY = srnd(188, 206);
      waypointTimer = srnd(3.4, 4.6);
    } else {
      targetX = srnd(145, 345);
      targetY = srnd(145, 200);
      waypointTimer = srnd(2.4, 3.5);
    }
  }

  function renderWings(flap: number, dir: 1 | -1, pitchDeg: number, posY = y) {
    g.setAttribute('transform', `translate(${f(x)} ${f(posY)}) rotate(${f(pitchDeg)}) scale(${f(dir * 1.22)} 1.22)`);
    const wy = -flap * 7.8;
    const by2 = -flap * 6.2;
    backWing.setAttribute(
      'd',
      `M0 -0.5 Q${f(-5.5)} ${f(by2 - 4.2)} ${f(-1.5)} ${f(by2 - 5.2)} ` +
      `Q${f(3.8)} ${f(by2 - 4.5)} 1.5 -0.5Z`
    );
    frontWing.setAttribute(
      'd',
      `M0.5 0 Q${f(-2.5)} ${f(wy - 6.8)} ${f(4.2)} ${f(wy - 6.2)} ` +
      `Q${f(8.2)} ${f(wy - 3.6)} 1.5 0.4 ` +
      `Q${f(-1.2)} ${f(wy * 0.75 + 4.8)} ${f(-4.8)} ${f(wy * 0.7 + 3.2)} ` +
      `Q${f(-5.2)} ${f(wy * 0.4 + 0.5)} 0.5 0Z`
    );
    wingMark.setAttribute('d', oval(2.8, wy * 0.65 - 2.6, 1.1, Math.max(0.4, Math.abs(flap) * 1.1)));
    body.setAttribute('d', 'M-3.4 0.8 Q0 0 3.6 -0.8');
    antennae.setAttribute('d', 'M3.4 -0.8 Q6.2 -3.6 5.6 -5.2 M3.4 -0.6 Q6.8 -2.0 6.8 -3.6');
  }

  return {
    g,
    get x() { return x; },
    get y() { return y; },
    get nearPond() { return !perchedOnHead && !perchedOnFlower && Math.abs(x - POND_X) < POND_RX + 14 && y > 150; },
    get isPerched() { return perchedOnHead; },
    get perchedTime() { return perchedTimer; },
    guideTo(nx: number, ny: number) {
      pickWaypoint(nx, ny);
    },
    startleFrom(cx: number, cy: number) {
      perchedOnHead = false;
      perchedOnFlower = false;
      perchedTimer = 0;
      if (Math.abs(x - POND_X) < POND_RX + 20) {
        targetX = clamp(POND_X + srnd(-30, 35), 90, W - 70);
        targetY = clamp(cy - srnd(72, 98), 120, 168);
      } else {
        const awayDir = x >= cx ? 1 : -1;
        targetX = clamp(x + awayDir * srnd(110, 180), 80, W - 75);
        targetY = clamp(cy - srnd(58, 86), 122, 178);
      }
      vy = -85;
      vx = (targetX >= x ? 1 : -1) * 95;
      startledTimer = 1.1;
      waypointTimer = 2.4;
    },
    draw(
      t: number,
      dt: number,
      w: number,
      sulkHeadTarget: { pos: Vec; dir: 1 | -1 } | null,
      flowerPerchTarget: Vec | null
    ) {
      // Priority 1: When the female owner is feeding/petting the cats, the butterfly gently perches on a garden flower!
      if (flowerPerchTarget) {
        perchedOnHead = false;
        const [fx, fy] = flowerPerchTarget;
        const dx = fx - x;
        const dy = fy - y;
        const dist = Math.hypot(dx, dy);

        if (!perchedOnFlower) {
          if (dist < 6.0) {
            perchedOnFlower = true;
            vx = 0;
            vy = 0;
          } else {
            const spd = clamp(dist * 1.4, 24, 78);
            vx = lerp(vx, (dx / (dist || 1)) * spd + Math.sin(t * 5) * 6, dt * 5);
            vy = lerp(vy, (dy / (dist || 1)) * spd + Math.cos(t * 7) * 6, dt * 5);
            x += vx * dt;
            y += vy * dt;
          }
        }

        if (perchedOnFlower) {
          x = lerp(x, fx, dt * 16);
          y = lerp(y, fy, dt * 16);
          flapPhase += dt * 1.1;
          const flap = 0.4 + 0.5 * Math.sin(flapPhase * Math.PI * 2);
          renderWings(flap, -1, 5);
          return;
        }
      } else if (perchedOnFlower) {
        perchedOnFlower = false;
        pickWaypoint();
      }

      // Priority 2: If a cat is sitting gloomily by the wall, glide down and land softly on its head!
      if (!flowerPerchTarget && sulkHeadTarget) {
        const [hx, hy] = sulkHeadTarget.pos;
        const dx = hx - x;
        const dy = (hy - 2.5) - y;
        const dist = Math.hypot(dx, dy);

        if (!perchedOnHead) {
          if (dist < 6.5) {
            perchedOnHead = true;
            perchedTimer = 0;
            vx = 0;
            vy = 0;
          } else {
            const approachSpd = clamp(dist * 1.4, 22, 82);
            const desiredVx = (dx / (dist || 1)) * approachSpd + Math.sin(t * 6) * 8;
            const desiredVy = (dy / (dist || 1)) * approachSpd + Math.cos(t * 8) * 8;
            vx = lerp(vx, desiredVx, dt * 5.2);
            vy = lerp(vy, desiredVy, dt * 5.2);
            x += vx * dt;
            y += vy * dt;
          }
        }

        if (perchedOnHead) {
          perchedTimer += dt;
          x = lerp(x, hx, dt * 16);
          y = lerp(y, hy - 2.2, dt * 16);
          flapPhase += dt * 1.4;
          const flap = 0.35 + 0.55 * Math.sin(flapPhase * Math.PI * 2);
          const dir = sulkHeadTarget.dir;
          renderWings(flap, dir, -6 * dir);
          return;
        }
      } else if (perchedOnHead) {
        perchedOnHead = false;
        perchedTimer = 0;
      }

      waypointTimer -= dt;
      startledTimer = Math.max(0, startledTimer - dt);
      if (!sulkHeadTarget && !flowerPerchTarget && (waypointTimer <= 0 || Math.hypot(targetX - x, targetY - y) < 16)) {
        pickWaypoint();
      }

      if (!sulkHeadTarget && !flowerPerchTarget) {
        const dx = targetX - x;
        const dy = targetY - y;
        const dist = Math.hypot(dx, dy) || 1;
        const maxSpd = startledTimer > 0 ? 128 : 72;
        const desiredVx = (dx / dist) * maxSpd + w * 14 + wobble(t, 1.4) * 20;
        const desiredVy = (dy / dist) * maxSpd * 0.75 + Math.sin(t * 9.5) * 26 - (startledTimer > 0 ? 20 : 0);

        vx = lerp(vx, desiredVx, dt * 3.8);
        vy = lerp(vy, desiredVy, dt * 4.5);
        x = clamp(x + vx * dt, 55, W - 55);
        y = clamp(y + vy * dt, 108, 224);
      }

      const flapRate = startledTimer > 0 ? 15 : vy < 0 ? 11.5 : 8.5;
      flapPhase += dt * flapRate;
      const flap = Math.sin(flapPhase * Math.PI * 2);
      const liftY = -flap * 2.2;

      const dir: 1 | -1 = vx >= 0 ? 1 : -1;
      const pitch = clamp((vy / 110) * 22 * dir, -28, 28);
      renderWings(flap, dir, pitch, y + liftY);
    },
  };
}

// ============================================================================
// 5. Female Owner & Cat Food Bowls — enters from left, pours food, watches & pets cats!
// ============================================================================
type OwnerPhase = 'hidden' | 'enter' | 'pour' | 'watch' | 'pet' | 'exit';

function createOwner(parent: Element) {
  const OWNER_Y = 248;
  const OWNER_SCALE = 0.84;
  const STOP_X = 136;

  // Two ceramic cat food bowls on the grass near the veranda (at x=178 and x=198)
  const bowlsG = el('g', {}, parent);
  const bowl1 = paint(bowlsG, '#c86446', SP * 0.75);
  const kibble1 = blot(bowlsG);
  const bowl2 = paint(bowlsG, '#4e6b7c', SP * 0.75);
  const kibble2 = blot(bowlsG);
  const fallingKibble = blot(bowlsG);

  const B1: Vec = [176, 255];
  const B2: Vec = [194, 241];
  const drawBowlMesh = (node: SVGPathElement, cx: number, cy: number) => {
    node.setAttribute(
      'd',
      `M${f(cx - 6.2)} ${f(cy)} L${f(cx - 4.6)} ${f(cy - 3.6)} L${f(cx + 4.6)} ${f(cy - 3.6)} L${f(cx + 6.2)} ${f(cy)} ` +
      `Q${f(cx)} ${f(cy + 1.4)} ${f(cx - 6.2)} ${f(cy)}Z`
    );
  };
  drawBowlMesh(bowl1, B1[0], B1[1]);
  drawBowlMesh(bowl2, B2[0], B2[1]);

  // Female owner figure in standard ink.ts figure space (feet on y = 120, center x = 40)
  const fig = el('g', { opacity: 0, style: 'cursor:pointer' }, parent);
  const farArm = limb(fig, 3.3);
  const legs = [limb(fig, 3.8), limb(fig, 3.8)];
  const shoes = [blot(fig), blot(fig)];
  const skirt = paint(fig, '#526b5c'); // muted sage-green dress
  const apron = shape(fig, PEN * 0.85); // warm cream paper apron
  const apronTie = pen(fig, PEN * 0.7);
  const bodice = paint(fig, '#526b5c');
  const collar = shape(fig, PEN * 0.75);
  const neck = limb(fig, 2.8);
  const head = el('ellipse', { rx: 3.6, ry: 4.5, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, fig);
  const hairBun = blot(fig);
  const hairPin = paint(fig, '#d48846', PEN * 0.6);
  const nearArm = limb(fig, 3.3);
  const canN = paint(fig, '#c85a32', PEN * 0.75); // cat food canister held in hand

  const walk = gait({ kind: 'walk', period: 0.95, stride: 22 });
  const armSwing = [spring(55, 8), spring(55, 8)];
  const tieSpring = spring(32, 4.5);

  let state: OwnerPhase = 'hidden';
  let stateT = 0;
  let x = -36;
  let dir: 1 | -1 = 1;
  let walkPhase = 0;
  let crouch = 0;       // 0 = standing/walking, 1 = kneeling/sitting to feed & pet
  let foodLevel = 0;    // 0..1 kibble fullness in the bowls
  let nextVisitTimer = 17.5; // appears periodically

  function triggerVisit() {
    if (state !== 'hidden') return;
    state = 'enter';
    stateT = 0;
    x = -32;
    dir = 1;
    crouch = 0;
    fig.setAttribute('opacity', '1');
  }

  return {
    fig,
    y: OWNER_Y,
    bowl1Pos: B1,
    bowl2Pos: B2,
    get active() { return state !== 'hidden' && state !== 'exit'; },
    get isPetting() { return state === 'pet'; },
    get hasFood() { return foodLevel > 0.05 || state === 'pour' || state === 'watch' || state === 'pet'; },
    triggerVisit,
    draw(t: number, dt: number, w: number, canStartVisit: boolean) {
      // Update kibble pile inside both bowls
      if (foodLevel > 0.02) {
        const h1 = 2.6 * foodLevel;
        kibble1.setAttribute(
          'd',
          `M${f(B1[0] - 4.2)} ${f(B1[1] - 3.2)} Q${f(B1[0])} ${f(B1[1] - 3.2 - h1 * 1.8)} ${f(B1[0] + 4.2)} ${f(B1[1] - 3.2)}Z`
        );
        kibble2.setAttribute(
          'd',
          `M${f(B2[0] - 4.2)} ${f(B2[1] - 3.2)} Q${f(B2[0])} ${f(B2[1] - 3.2 - h1 * 1.8)} ${f(B2[0] + 4.2)} ${f(B2[1] - 3.2)}Z`
        );
      } else {
        kibble1.setAttribute('d', '');
        kibble2.setAttribute('d', '');
      }

      if (state === 'hidden') {
        fallingKibble.setAttribute('d', '');
        if (canStartVisit) {
          nextVisitTimer -= dt;
          if (nextVisitTimer <= 0) {
            nextVisitTimer = srnd(24, 32);
            triggerVisit();
          }
        }
        return;
      }

      stateT += dt;
      let go = 0;

      if (state === 'enter') {
        dir = 1;
        const dist = STOP_X - x;
        go = clamp(dist / 22, 0, 1);
        walkPhase += (dt / walk.period) * go;
        x += walk.speed * OWNER_SCALE * dt * go;
        crouch = lerp(crouch, 0, dt * 8);
        if (dist < 1.5) {
          x = STOP_X;
          state = 'pour';
          stateT = 0;
        }
      } else if (state === 'pour') {
        // Kneel/sit down and pour cat food into the two bowls
        crouch = ease(Math.min(1, stateT / 0.55));
        if (stateT > 0.45) {
          foodLevel = clamp((stateT - 0.45) / 0.85, 0, 1);
          // Animated kibble granules pouring from the canister into the bowls
          const dropY = 224 + ((stateT * 85) % 24);
          fallingKibble.setAttribute(
            'd',
            `${oval(B1[0] - 1, dropY, 1.1, 1.1)} ${oval(B1[0] + 1.5, dropY + 5, 1.0, 1.0)} ` +
            `${oval(B2[0] - 1, dropY - 4, 1.1, 1.1)}`
          );
        }
        if (stateT >= 1.45) {
          fallingKibble.setAttribute('d', '');
          state = 'watch';
          stateT = 0;
        }
      } else if (state === 'watch') {
        // Sitting warmly watching the two cats eat their kibble
        crouch = 1;
        foodLevel = Math.max(0.25, 1 - stateT * 0.18);
        if (stateT >= 2.8) {
          state = 'pet';
          stateT = 0;
        }
      } else if (state === 'pet') {
        // Gently stroking the cats' heads before standing up
        crouch = 1;
        foodLevel = Math.max(0, foodLevel - dt * 0.12);
        if (stateT >= 2.3) {
          state = 'exit';
          stateT = 0;
        }
      } else if (state === 'exit') {
        // Stand up smoothly, turn left, and walk off-screen
        if (stateT < 0.5) {
          crouch = 1 - ease(stateT / 0.5);
          go = 0;
        } else {
          crouch = 0;
          dir = -1;
          go = ease(Math.min(1, (stateT - 0.5) / 0.35));
          walkPhase += (dt / walk.period) * go;
          x -= walk.speed * OWNER_SCALE * dt * go;
          if (x < -38) {
            state = 'hidden';
            stateT = 0;
            fig.setAttribute('opacity', '0');
            return;
          }
        }
      }

      place(fig, x, OWNER_Y, dir, OWNER_SCALE);

      // Solve walking pose & blend smoothly with the kneeling/sitting crouch pose
      const p = walk.pose(walkPhase, go);
      const b = p.bob * (1 - crouch);
      const hipY = lerp(p.hip[1], 95, crouch);
      const hipX = lerp(40, 35, crouch);
      const hip: Vec = [hipX, hipY];

      p.feet.forEach((fo, i) => {
        const crouchKnee: Vec = [49 + i * 2.5, 113 + i * 2];
        const crouchAnkle: Vec = [34 + i * 3, 118.4];
        const kn: Vec = [lerp(fo.knee[0], crouchKnee[0], crouch), lerp(fo.knee[1], crouchKnee[1], crouch)];
        const ak: Vec = [lerp(fo.ankle[0], crouchAnkle[0], crouch), lerp(fo.ankle[1], crouchAnkle[1], crouch)];
        legs[i].draw([hip, kn, ak], [0.3, 0.7]);
        shoe(shoes[i], ak, fo.pitch * (1 - crouch));
      });

      // Shoulder & upper body lean forward slightly when kneeling/sitting to watch & pet the cats
      const leanX = crouch * 4.5;
      const sh: Vec = [40.5 + leanX, lerp(42 + b, 66, crouch)];
      const waistY = lerp(68 + b, 91, crouch);
      const hemY = lerp(104, 114, crouch);
      const kF = p.feet[p.front].knee;
      const frontSkirtX = lerp(Math.max(kF[0] + 3.5, 47), 53, crouch);
      const backSkirtX = lerp(31.5, 27.5, crouch);

      // Bodice, collar, skirt, and paper apron
      bodice.setAttribute(
        'd',
        `M${f(sh[0] - 5.2)} ${f(sh[1] + 1)} Q${f(sh[0])} ${f(sh[1] - 2.2)} ${f(sh[0] + 5.2)} ${f(sh[1] + 1.5)} ` +
        `L${f(hip[0] + 6.5)} ${f(waistY)} L${f(hip[0] - 5.5)} ${f(waistY)}Z`
      );
      collar.setAttribute(
        'd',
        `M${f(sh[0] - 2.4)} ${f(sh[1] - 0.5)} Q${f(sh[0] + 0.8)} ${f(sh[1] + 3.2)} ${f(sh[0] + 3.2)} ${f(sh[1] - 0.2)}Z`
      );
      skirt.setAttribute(
        'd',
        `M${f(hip[0] - 5.5)} ${f(waistY)} L${f(hip[0] + 6.5)} ${f(waistY)} ` +
        `Q${f(frontSkirtX + 1.5)} ${f((waistY + hemY) * 0.5)} ${f(frontSkirtX)} ${f(hemY)} ` +
        `Q${f((frontSkirtX + backSkirtX) * 0.5)} ${f(hemY + 2)} ${f(backSkirtX)} ${f(hemY - 0.5)} ` +
        `Q${f(backSkirtX + 1)} ${f((waistY + hemY) * 0.5)} ${f(hip[0] - 5.5)} ${f(waistY)}Z`
      );
      apron.setAttribute(
        'd',
        `M${f(hip[0] - 1.5)} ${f(waistY - 0.5)} L${f(hip[0] + 6.8)} ${f(waistY - 0.5)} ` +
        `Q${f(frontSkirtX + 0.8)} ${f((waistY + hemY) * 0.5)} ${f(frontSkirtX - 0.5)} ${f(hemY - 2.5)} ` +
        `L${f(hip[0] + 0.5)} ${f(hemY - 2.0)}Z`
      );
      const tieFlow = tieSpring.step(-4 - go * 3 - w * 3.5, dt);
      apronTie.setAttribute(
        'd',
        `M${f(hip[0] - 5.2)} ${f(waistY)} Q${f(hip[0] - 8 + tieFlow * 0.5)} ${f(waistY + 5)} ${f(hip[0] - 7 + tieFlow)} ${f(waistY + 12)}`
      );

      // Neck, head, hair bun & hair pin (tilts warmly downward when watching/petting the cats)
      const headPitch = crouch * 16;
      const hc: Vec = [sh[0] + 1.8 + crouch * 2.2, sh[1] - 9.4 + crouch * 1.2];
      neck.draw([[sh[0] + 0.5, sh[1]], [hc[0] - 0.6, hc[1] + 3.5]], [0.2, 0.3]);
      head.setAttribute('cx', f(hc[0]));
      head.setAttribute('cy', f(hc[1]));
      head.setAttribute('transform', `rotate(${f(headPitch)} ${pt(hc)})`);

      // Hair crown + neat bun at the back of the head
      const bx = hc[0] - 4.6, by = hc[1] - 1.2;
      hairBun.setAttribute(
        'd',
        `${oval(bx - 1.6, by, 2.5, 2.4)} ` +
        `M${f(hc[0] - 3.6)} ${f(hc[1] - 1.0)} Q${f(hc[0] - 3.0)} ${f(hc[1] - 5.4)} ${f(hc[0] + 1.8)} ${f(hc[1] - 4.4)} ` +
        `Q${f(hc[0] + 4.0)} ${f(hc[1] - 3.2)} ${f(hc[0] + 3.4)} ${f(hc[1] - 1.2)} ` +
        `Q${f(hc[0] + 0.5)} ${f(hc[1] - 3.0)} ${f(hc[0] - 3.6)} ${f(hc[1] - 1.0)}Z`
      );
      hairPin.setAttribute('d', oval(bx, by - 1.8, 1.1, 1.1));

      // Arms: swing naturally while walking, pour food in 'pour', rest on lap in 'watch', stroke cat heads in 'pet'
      const legSwing = (p.feet[0].ankle[0] - 40) / (walk.stride / 2);
      const farA = (armSwing[0].step(-legSwing * 14 * go, dt) * Math.PI) / 180;
      const nearA = (armSwing[1].step(legSwing * 13 * go, dt) * Math.PI) / 180;
      const shF: Vec = [sh[0] - 0.8, sh[1] + 2.2];
      const shN: Vec = [sh[0] + 1.2, sh[1] + 2.4];

      // Far arm
      const elbF: Vec = [shF[0] + 14 * Math.sin(farA) + crouch * 5, shF[1] + 14 * Math.cos(farA)];
      const handF: Vec = [elbF[0] + 13 * Math.sin(farA + 0.35) + crouch * 6, elbF[1] + 13 * Math.cos(farA + 0.35)];
      farArm.draw([shF, elbF, handF], [0.2, 0.4]);

      // Near arm & food canister
      let elbN: Vec, handN: Vec;
      if (state === 'pour') {
        const pourShake = stateT > 0.45 ? Math.sin(stateT * 26) * 1.8 : 0;
        elbN = [shN[0] + 9, shN[1] + 9];
        handN = [shN[0] + 22, shN[1] + 12 + pourShake];
      } else if (state === 'watch') {
        elbN = [shN[0] + 4, shN[1] + 12];
        handN = [shN[0] + 12, shN[1] + 18];
      } else if (state === 'pet') {
        // Reaching out to gently stroke the eating cats' heads back and forth!
        const strokeX = Math.sin(stateT * 6.5) * 4.5;
        const strokeY = Math.cos(stateT * 6.5) * 1.4;
        elbN = [shN[0] + 11, shN[1] + 10];
        handN = [shN[0] + 26 + strokeX, shN[1] + 15 + strokeY];
      } else {
        // Carrying the cat food canister while walking in/out
        elbN = [shN[0] + 13 * Math.sin(nearA) + 3, shN[1] + 13 * Math.cos(nearA)];
        handN = [elbN[0] + 12 * Math.sin(nearA + 0.45) + 4, elbN[1] + 11 * Math.cos(nearA + 0.45)];
      }
      nearArm.draw([shN, elbN, handN], [0.2, 0.4]);

      // Draw the small terracotta food canister in her hand (tilted when pouring, tucked when petting)
      if (state !== 'pet') {
        const cx = handN[0] + 1.5, cy = handN[1];
        const tilt = state === 'pour' ? 52 : 0;
        canN.setAttribute('d', `M${f(cx - 2.4)} ${f(cy - 3.2)} L${f(cx + 2.4)} ${f(cy - 3.2)} L${f(cx + 2.1)} ${f(cy + 3.2)} L${f(cx - 2.1)} ${f(cy + 3.2)}Z`);
        canN.setAttribute('transform', `rotate(${tilt} ${f(cx)} ${f(cy)})`);
      } else {
        canN.setAttribute('d', '');
      }
    },
  };
}

// ============================================================================
// 6. Quadruped Chasing Cats — Pond Dive, Sulk at Wall, & Happy Feeding/Petting!
// ============================================================================
type CatMode =
  | 'chase'
  | 'crouch'
  | 'pounce'
  | 'bat'
  | 'pond_dive'
  | 'sulk_walk'
  | 'sulk_sit'
  | 'spring_up'
  | 'eat_run'
  | 'eat';

interface PondHelper {
  addRing(x: number, y: number, count?: number, scale?: number): void;
  addDrops(x: number, y: number, count: number, speedScale?: number): void;
  splash(x: number, y: number, power?: number): void;
}

interface CatOptions {
  name: string;
  x: number;
  groundY: number;
  scale: number;
  accent: string;
  collar: string;
  roleOffset: number;
  pondSpot: Vec;
  pondExitX: number;
  sulkSpot: Vec;
  eatSpot: Vec;         // bowl standing position when the owner feeds them
  isPrimaryPerch?: boolean;
}

export function createChasingCat(parent: Element, opts: CatOptions, pond: PondHelper) {
  const { groundY, scale, accent, collar, roleOffset, pondSpot, pondExitX, sulkSpot, eatSpot, isPrimaryPerch } = opts;
  const g = el('g', { style: 'cursor:pointer' }, parent);
  el('title', {}, g).textContent = `Click ${opts.name} to pounce!`;

  const farHind = limb(g, 3.0, PEN * 0.88);
  const farFront = limb(g, 2.8, PEN * 0.88);
  const farPaws = blot(g);

  const tailOut = el('path', { fill: 'none', stroke: 'currentColor', 'stroke-width': 3.6, 'stroke-linecap': 'round' }, g);
  const tailIn = el('path', { fill: 'none', stroke: accent, 'stroke-width': 1.9, 'stroke-linecap': 'round' }, g);

  const bodyFill = el('path', { fill: PAPER }, g);
  const backPatch = el('path', { fill: accent }, g);
  const rumpPatch = blot(g);
  const bodyLines = pen(g, PEN * 0.95);

  const nearHind = limb(g, 3.1, PEN * 0.92);
  const nearFront = limb(g, 2.9, PEN * 0.92);
  const nearPaws = blot(g);

  const collarN = paint(g, collar, PEN * 0.7);
  const bellN = paint(g, '#e2b646', PEN * 0.55);

  const submergeMask = el('path', { fill: '#d6e3e6', stroke: 'none', opacity: 0 }, g);
  const waterLineN = pen(g, PEN * 0.75);

  const headG = el('g', {}, g);
  const earsN = shape(headG, PEN * 0.85);
  const earPatch = el('path', { fill: accent }, headG);
  const skullN = shape(headG, PEN * 0.92);
  const capPatch = blot(headG);
  const faceN = pen(headG, PEN * 0.6);
  const moodN = pen(headG, PEN * 0.55);

  el('rect', { x: -26, y: -36, width: 52, height: 40, fill: 'transparent' }, g);

  let x = opts.x;
  let curGroundY = groundY;
  let dir: 1 | -1 = 1;
  let vx = 0;
  let phase = roleOffset;
  let mode: CatMode = 'chase';
  let modeT = 0;
  let cooldown = 0.8 + roleOffset * 0.8;
  let headTopScene: Vec = [x, curGroundY - 24];

  let pounceStartX = x;
  let pounceEndX = x;
  let pouncePeakH = 44;
  let pounceDur = 0.64;

  let diveStartX = x;
  let diveStartY = groundY;
  let splashedIn = false;
  let splashedOut = false;
  let swimRippleAcc = 0;
  let shakeDropAcc = 0;

  const tailSpring = spring(28, 3.8);
  const landSpring = spring(85, 7.5);
  const headTiltSpring = spring(45, 6.0);

  function startPondDive() {
    mode = 'pond_dive';
    modeT = -roleOffset * 0.32;
    diveStartX = x;
    diveStartY = curGroundY;
    dir = pondSpot[0] >= x ? 1 : -1;
    splashedIn = false;
    splashedOut = false;
    swimRippleAcc = 0;
    shakeDropAcc = 0;
    tailSpring.kick(-6);
  }

  function triggerSpringUp(bf: { startleFrom(cx: number, cy: number): void }) {
    if (mode === 'spring_up') return;
    mode = 'spring_up';
    modeT = 0;
    tailSpring.kick(12);
    bf.startleFrom(x, curGroundY - 28);
  }

  function triggerPounce(bfX: number, bfY: number) {
    const targetX = x + (bfX >= x ? 1 : -1) * clamp(Math.abs(bfX - x) * 0.92, 45, 110);
    if (Math.abs(bfX - POND_X) < POND_RX + 22 || Math.abs(targetX - POND_X) < POND_RX - 6) {
      startPondDive();
      return;
    }
    mode = 'pounce';
    modeT = 0;
    pounceStartX = x;
    const dx = bfX - x;
    dir = dx >= 0 ? 1 : -1;
    const jumpDist = clamp(Math.abs(dx) * 0.92, 42, 108);
    pounceEndX = clamp(x + dir * jumpDist, 55, POND_X - POND_RX - 18);
    pouncePeakH = clamp(groundY - bfY - 12, 34, 72);
    pounceDur = 0.64;
    tailSpring.kick(-8);
  }

  return {
    g,
    groundY,
    isPrimaryPerch: !!isPrimaryPerch,
    get x() { return x; },
    get y() { return curGroundY; },
    get dir() { return dir; },
    get mode() { return mode; },
    get headTop() { return headTopScene; },
    startPondDive,
    triggerSpringUp,
    poke(bf: { x: number; y: number; startleFrom(cx: number, cy: number): void }) {
      if (mode === 'pond_dive' || mode === 'eat_run' || mode === 'eat') return;
      if (mode === 'sulk_sit' || mode === 'sulk_walk') {
        triggerSpringUp(bf);
        return;
      }
      triggerPounce(bf.x, bf.y);
    },
    draw(
      t: number,
      dt: number,
      bf: {
        x: number;
        y: number;
        nearPond: boolean;
        isPerched: boolean;
        perchedTime: number;
        startleFrom(cx: number, cy: number): void;
      },
      ownerState: { active: boolean; isPetting: boolean; hasFood: boolean },
      onTriggerPartnerDive?: () => void,
      onTriggerPartnerSpringUp?: () => void
    ) {
      modeT += dt;
      cooldown = Math.max(0, cooldown - dt);
      const dx = bf.x - x;
      const adx = Math.abs(dx);
      const heightAbove = curGroundY - bf.y;

      const pondBankX = POND_X - POND_RX - 14 - roleOffset * 24;

      // When the female owner arrives with food (and the cat isn't mid-dive in the pond), excitedly dash over to eat!
      if (ownerState.active && mode !== 'pond_dive' && mode !== 'eat_run' && mode !== 'eat') {
        mode = 'eat_run';
        modeT = 0;
      }

      // --- State machine transitions ---
      if (mode === 'eat_run') {
        if (!ownerState.active) {
          mode = 'chase';
          modeT = 0;
        } else {
          const dxEat = eatSpot[0] - x;
          const dyEat = eatSpot[1] - curGroundY;
          const dist = Math.hypot(dxEat, dyEat);
          if (dist < 4.5) {
            x = eatSpot[0];
            curGroundY = eatSpot[1];
            dir = -1; // face left toward the food bowl and owner
            mode = 'eat';
            modeT = 0;
            vx = 0;
          }
        }
      } else if (mode === 'eat') {
        dir = -1;
        if (!ownerState.active) {
          mode = 'chase';
          modeT = 0;
          cooldown = 1.4;
        }
      } else if (mode === 'chase') {
        curGroundY = lerp(curGroundY, groundY, dt * 5);
        const aimX = bf.nearPond ? pondBankX : Math.min(bf.x + (roleOffset > 0.2 ? -18 : 16), pondBankX);
        const toTarget = aimX - x;
        if (Math.abs(toTarget) > 8) dir = toTarget >= 0 ? 1 : -1;

        if (bf.nearPond && Math.abs(x - pondBankX) < 28 && cooldown <= 0) {
          startPondDive();
          onTriggerPartnerDive?.();
        } else if (!bf.nearPond && cooldown <= 0 && adx < 78 && adx > 26 && heightAbove < 92) {
          mode = 'crouch';
          modeT = 0;
          dir = dx >= 0 ? 1 : -1;
        } else if (!bf.nearPond && cooldown <= 0 && adx <= 30 && heightAbove < 82) {
          mode = 'bat';
          modeT = 0;
          dir = dx >= 0 ? 1 : -1;
        }
      } else if (mode === 'crouch') {
        dir = dx >= 0 ? 1 : -1;
        if (modeT >= 0.46) {
          triggerPounce(bf.x, bf.y);
        }
      } else if (mode === 'pounce') {
        if (modeT >= pounceDur) {
          mode = 'chase';
          modeT = 0;
          cooldown = 1.4 + roleOffset * 0.7;
          landSpring.kick(38);
        } else if (modeT > pounceDur * 0.38 && modeT < pounceDur * 0.58) {
          const curAirY = curGroundY - Math.sin((modeT / pounceDur) * Math.PI) * pouncePeakH;
          if (Math.hypot(bf.x - x, bf.y - (curAirY - 16)) < 36) {
            bf.startleFrom(x, curGroundY);
          }
        }
      } else if (mode === 'bat') {
        if (adx > 8) dir = dx >= 0 ? 1 : -1;
        if (modeT > 0.55 && Math.hypot(bf.x - x, bf.y - (curGroundY - 32)) < 34) {
          bf.startleFrom(x, curGroundY);
        }
        if (modeT >= 1.5) {
          mode = 'chase';
          modeT = 0;
          cooldown = 1.2;
        }
      }

      // --- Solve body position & kinematics ---
      let airY = 0;
      let bodyPitch = 0;
      let crouchAmt = 0;
      let rearUp = 0;
      let sitAmt = 0;
      let sulkAmt = 0;
      let eatDip = 0;     // 0..1 lowering front shoulders & head into the food bowl
      let petHappy = 0;   // 0..1 leaning happily into the owner's hand when being petted
      let go = 0;
      let gallop = 0;
      let submergeDepth = 0;
      let shakeOsc = 0;
      let flail = 0;

      if (mode === 'eat_run') {
        // Joyful bounding sprint toward the food bowls!
        const dxEat = eatSpot[0] - x;
        const dyEat = eatSpot[1] - curGroundY;
        const dist = Math.hypot(dxEat, dyEat) || 1;
        dir = dxEat >= 0 ? 1 : -1;
        const runSpd = 115;
        vx = (dxEat / dist) * runSpd;
        const vy = (dyEat / dist) * runSpd;
        x += vx * dt;
        curGroundY += vy * dt;
        go = 1.25;
        gallop = 0.85;
        const strideLen = 28 * scale;
        const period = (strideLen / runSpd) / 0.44;
        phase = (phase + dt / period) % 1;
      } else if (mode === 'eat') {
        vx = 0;
        if (ownerState.isPetting) {
          // Being petted on the head by the owner! Lift chin slightly, arch back happily
          petHappy = ease(Math.min(1, modeT / 0.3));
          eatDip = 0.15;
        } else if (ownerState.hasFood) {
          // Munching happily from the bowl
          eatDip = 0.85 + Math.sin(t * 14 + roleOffset * 3) * 0.15;
        } else {
          eatDip = 0.2;
        }
      } else if (mode === 'pond_dive') {
        const mt = Math.max(0, modeT);
        if (mt < 0.38) {
          vx = 0;
          dir = pondSpot[0] >= x ? 1 : -1;
          crouchAmt = ease(mt / 0.38);
        } else if (mt < 0.98) {
          const u = (mt - 0.38) / 0.60;
          x = lerp(diveStartX, pondSpot[0], minJerk(u));
          curGroundY = lerp(diveStartY, pondSpot[1], u);
          const peak = 58;
          airY = (-Math.sin(u * Math.PI) * peak + (u > 0.65 ? (u - 0.65) * 28 : 0)) / scale;
          bodyPitch = Math.cos(u * Math.PI) * -32;
          if (u > 0.42 && u < 0.55) {
            bf.startleFrom(x, curGroundY - peak);
          }
          if (u > 0.5) flail = Math.sin((u - 0.5) * 42) * 1.2;
        } else if (mt < 2.25) {
          if (!splashedIn) {
            splashedIn = true;
            pond.splash(pondSpot[0], pondSpot[1], 1.25);
          }
          const u = (mt - 0.98) / (2.25 - 0.98);
          x = pondSpot[0] + Math.sin(u * Math.PI * 2) * 3.5 * -dir;
          curGroundY = pondSpot[1];
          const dip = u < 0.18 ? Math.sin((u / 0.18) * Math.PI) * 5.5 : Math.sin(mt * 9) * 1.4;
          airY = (9.8 + dip) / scale;
          submergeDepth = 1;
          if (u > 0.45) dir = pondExitX >= x ? 1 : -1;
          swimRippleAcc += dt;
          if (swimRippleAcc > 0.28) {
            swimRippleAcc = 0;
            pond.addRing(x, curGroundY, 1, 0.75);
          }
        } else if (mt < 2.80) {
          if (!splashedOut) {
            splashedOut = true;
            dir = pondExitX >= x ? 1 : -1;
            pond.splash(x, curGroundY, 0.85);
          }
          const u = (mt - 2.25) / (2.80 - 2.25);
          x = lerp(pondSpot[0], pondExitX, minJerk(u));
          curGroundY = lerp(pondSpot[1], groundY, ease(u));
          airY = (-Math.sin(u * Math.PI) * 34) / scale;
          bodyPitch = Math.cos(u * Math.PI) * -24;
          shakeDropAcc += dt;
          if (shakeDropAcc > 0.12) {
            shakeDropAcc = 0;
            pond.addDrops(x, curGroundY + airY * scale, 2, 0.5);
          }
        } else if (mt < 3.45) {
          if (mt - dt < 2.80) landSpring.kick(32);
          x = pondExitX;
          curGroundY = groundY;
          const u = (mt - 2.80) / (3.45 - 2.80);
          shakeOsc = Math.sin(u * Math.PI * 14) * Math.sin(u * Math.PI);
          crouchAmt = 0.25 * Math.sin(u * Math.PI);
          shakeDropAcc += dt;
          if (shakeDropAcc > 0.09) {
            shakeDropAcc = 0;
            pond.addDrops(x, curGroundY - 14, 3, 0.65);
          }
        } else {
          mode = 'sulk_walk';
          modeT = 0;
        }
      } else if (mode === 'sulk_walk') {
        sulkAmt = ease(Math.min(1, modeT / 0.4));
        const dxSulk = sulkSpot[0] - x;
        const dySulk = sulkSpot[1] - curGroundY;
        const dist = Math.hypot(dxSulk, dySulk);
        if (dist < 4) {
          x = sulkSpot[0];
          curGroundY = sulkSpot[1];
          mode = 'sulk_sit';
          modeT = 0;
          vx = 0;
        } else {
          dir = dxSulk >= 0 ? 1 : -1;
          const walkSpd = 38;
          vx = (dxSulk / dist) * walkSpd;
          const vy = (dySulk / dist) * walkSpd;
          x += vx * dt;
          curGroundY += vy * dt;
          go = 0.52;
          gallop = 0;
          const strideLen = 20 * scale;
          const period = (strideLen / walkSpd) / 0.6;
          phase = (phase + dt / period) % 1;
          shakeDropAcc += dt;
          if (shakeDropAcc > 0.45) {
            shakeDropAcc = 0;
            pond.addDrops(x, curGroundY - 10, 1, 0.3);
          }
        }
      } else if (mode === 'sulk_sit') {
        vx = 0;
        sitAmt = ease(Math.min(1, modeT / 0.45));
        const noticed = bf.isPerched ? smooth(0.25, 0.75, bf.perchedTime) : 0;
        sulkAmt = 1 - noticed;

        if (bf.isPerched && bf.perchedTime >= 1.55) {
          triggerSpringUp(bf);
          onTriggerPartnerSpringUp?.();
        } else if (modeT > 7.5) {
          triggerSpringUp(bf);
          onTriggerPartnerSpringUp?.();
        }
      } else if (mode === 'spring_up') {
        const dur = 0.55;
        const u = clamp(modeT / dur, 0, 1);
        sitAmt = Math.max(0, 1 - u * 3.5);
        airY = (-Math.sin(u * Math.PI) * 32) / scale;
        bodyPitch = Math.sin(u * Math.PI * 2) * -18;
        if (modeT >= dur) {
          mode = 'chase';
          modeT = 0;
          cooldown = 2.6 + roleOffset * 0.8;
          landSpring.kick(28);
        }
      } else if (mode === 'chase') {
        const aimX = bf.nearPond ? pondBankX : Math.min(bf.x, pondBankX);
        const dist = Math.abs(aimX - x);
        const targetSpeed = dist > 90 ? 112 : dist > 22 ? 68 : 0;
        vx = lerp(vx, dir * targetSpeed, dt * 6.5);
        const spd = Math.abs(vx);
        go = clamp(spd / 65, 0, 1.35);
        gallop = smooth(72, 105, spd);

        const strideLen = lerp(22, 30, gallop) * scale;
        const duty = lerp(0.56, 0.42, gallop);
        const period = (strideLen / Math.max(18, spd)) / duty;
        if (spd > 4) {
          phase = (phase + dt / clamp(period, 0.26, 0.75)) % 1;
        }
        x = clamp(x + vx * dt, 48, POND_X - POND_RX - 12);
      } else if (mode === 'crouch') {
        vx = lerp(vx, 0, dt * 12);
        crouchAmt = ease(Math.min(1, modeT / 0.25));
      } else if (mode === 'pounce') {
        const u = clamp(modeT / pounceDur, 0, 1);
        x = lerp(pounceStartX, pounceEndX, minJerk(u));
        airY = (-Math.sin(u * Math.PI) * pouncePeakH) / scale;
        bodyPitch = Math.cos(u * Math.PI) * -28;
      } else if (mode === 'bat') {
        vx = lerp(vx, 0, dt * 10);
        rearUp = modeT < 0.28 ? ease(modeT / 0.28) : modeT > 1.2 ? 1 - ease((modeT - 1.2) / 0.3) : 1;
      }

      const landDip = landSpring.step(0, dt);
      const breathe = Math.sin(t * 2.8 + roleOffset * 5) * 0.35;

      const gaitWave = (mode === 'chase' || mode === 'sulk_walk' || mode === 'eat_run') ? Math.sin(phase * Math.PI * 2) * go : 0;
      const crouchWiggle = crouchAmt > 0 ? Math.sin(modeT * 28) * 0.9 * crouchAmt : 0;

      const isJumping =
        mode === 'pounce' ||
        mode === 'spring_up' ||
        (mode === 'pond_dive' && ((modeT >= 0.38 && modeT < 0.98) || (modeT >= 2.25 && modeT < 2.80)));
      const pounceStretch = isJumping ? 3.2 : 0;

      const hx = -10.5 - pounceStretch * 0.5 + rearUp * 2.5 + sitAmt * 4.5;
      const hy = -15.8 + crouchAmt * 5.2 + rearUp * 4.2 + sitAmt * 8.6 + airY + landDip * 0.5 - gaitWave * 1.1;

      const rad = (bodyPitch * Math.PI) / 180;
      const span = 19.5 + pounceStretch - crouchAmt * 1.8 - rearUp * 7.5 - sitAmt * 9.5;
      const sx = hx + Math.cos(rad) * span;
      const sy =
        hy +
        Math.sin(rad) * span +
        crouchAmt * 1.6 -
        rearUp * 11.5 -
        sitAmt * 8.2 +
        sulkAmt * 2.2 +
        eatDip * 4.8 + // lower front shoulders when eating from the bowl!
        landDip +
        gaitWave * 1.2 -
        breathe +
        shakeOsc * 1.4;

      const S: Vec = [sx, sy];
      const H: Vec = [hx, hy + crouchWiggle - shakeOsc * 1.1];
      const arch = -2.2 - gaitWave * 2.2 * (0.4 + 0.6 * gallop) - crouchAmt * 1.0 + pounceStretch * 1.1 - sulkAmt * 1.2 - petHappy * 1.4;
      const Bc: Vec = [(S[0] + H[0]) * 0.5 + rearUp * 1.5 + sitAmt * 1.2, (S[1] + H[1]) * 0.5 + arch];
      const C: Vec = [S[0] + 4.2 - sitAmt * 1.2, S[1] + 5.6 - eatDip * 1.2];
      const Bt: Vec = [H[0] - 3.0, H[1] + 5.4 - sitAmt * 3.8];
      const bellyMid: Vec = [
        (Bt[0] + C[0]) * 0.5 - rearUp * 1.2,
        (Bt[1] + C[1]) * 0.5 + 3.2 - sitAmt * 1.6 - gaitWave * 0.8,
      ];

      const torsoD =
        `M${pt(C)} Q${f(S[0] + 4.8)} ${f(S[1] + 1.2)} ${pt(S)} ` +
        `Q${pt(Bc)} ${pt(H)} ` +
        `Q${f(H[0] - 4.2)} ${f(H[1] + 1.8)} ${pt(Bt)} ` +
        `Q${pt(bellyMid)} ${pt(C)}Z`;
      bodyFill.setAttribute('d', torsoD);
      bodyLines.setAttribute('d', torsoD);

      const m1: Vec = [lerp(H[0], S[0], 0.52), lerp(H[1], S[1], 0.52) + arch * 0.45 + 1.2];
      backPatch.setAttribute(
        'd',
        `M${f(m1[0] - 4.4)} ${f(m1[1] - 0.6)} Q${f(m1[0])} ${f(m1[1] - 2.6)} ${f(m1[0] + 4.6)} ${f(m1[1] - 0.4)} ` +
        `Q${f(m1[0] + 1.6)} ${f(m1[1] + 4.2)} ${f(m1[0] - 3.8)} ${f(m1[1] + 2.8)}Z`
      );
      rumpPatch.setAttribute('d', oval(H[0] - 0.6, H[1] + 2.2, 2.4, 1.6));

      // --- Solve & draw the 4 legs ---
      const legFoot = (u: number, anchorX: number, isFront: boolean): { paw: Vec } => {
        u = ((u % 1) + 1) % 1;
        const duty = lerp(0.56, 0.4, gallop);
        const stride = lerp(11.5, 16.5, gallop) * Math.min(1.15, go);
        const lift = lerp(4.2, 7.2, gallop) * Math.min(1.15, go);
        let px: number, py: number;
        if (go < 0.05) {
          px = anchorX + (isFront ? 1.2 : -1.0);
          py = 0;
        } else if (u < duty) {
          const s = u / duty;
          px = anchorX + stride * 0.5 - stride * s;
          py = 0;
        } else {
          const s = (u - duty) / (1 - duty);
          px = anchorX - stride * 0.5 + stride * minJerk(s);
          py = -lift * Math.sin(s * Math.PI);
        }
        return { paw: [px, py] };
      };

      const phFL = 0;
      const phFR = lerp(0.5, 0.12, gallop);
      const phHL = lerp(0.52, 0.48, gallop);
      const phHR = lerp(0.02, 0.58, gallop);

      let pawFL: Vec, pawFR: Vec, pawHL: Vec, pawHR: Vec;

      if (mode === 'spring_up') {
        pawFL = [S[0] + 8, S[1] - 6];
        pawFR = [S[0] + 6, S[1] - 4];
        pawHL = [H[0] - 4, H[1] + 12];
        pawHR = [H[0] - 2, H[1] + 12];
      } else if (isJumping) {
        const swipe = flail * 4.5;
        pawFL = [S[0] + 13, S[1] + 6 + swipe];
        pawFR = [S[0] + 10.5, S[1] + 8 - swipe];
        pawHL = [H[0] - 12, H[1] + 9 - swipe * 0.7];
        pawHR = [H[0] - 9.5, H[1] + 10 + swipe * 0.7];
      } else if (submergeDepth > 0.5) {
        const pad = Math.sin(t * 18) * 3;
        pawFL = [S[0] + 3 + pad, S[1] + 11];
        pawFR = [S[0] + 3 - pad, S[1] + 11];
        pawHL = [H[0] - 2 - pad, H[1] + 11];
        pawHR = [H[0] - 2 + pad, H[1] + 11];
      } else if (sitAmt > 0.2) {
        pawFL = [S[0] + 2.2, 0];
        pawFR = [S[0] + 0.4, 0];
        pawHL = [H[0] + 2.4, 0];
        pawHR = [H[0] + 0.8, 0];
      } else if (mode === 'bat') {
        pawHL = [H[0] + 2.5, 0];
        pawHR = [H[0] + 5.2, 0];
        const batWave = Math.sin(modeT * 15);
        pawFL = [lerp(S[0] + 1.5, S[0] + 9.5, rearUp), lerp(0, S[1] - 4.5 + batWave * 4.5, rearUp)];
        pawFR = [lerp(S[0] + 3.2, S[0] + 7.5, rearUp), lerp(0, S[1] - 2.0 - batWave * 4.2, rearUp)];
      } else if (crouchAmt > 0.1 || mode === 'eat') {
        pawFL = [S[0] + 2.4, 0];
        pawFR = [S[0] + 0.8, 0];
        pawHL = [H[0] - 1.2, 0];
        pawHR = [H[0] + 1.4, 0];
      } else {
        pawFL = legFoot(phase + phFL, S[0] + 1.5, true).paw;
        pawFR = legFoot(phase + phFR, S[0] + 0.5, true).paw;
        pawHL = legFoot(phase + phHL, H[0] - 0.5, false).paw;
        pawHR = legFoot(phase + phHR, H[0] + 0.8, false).paw;
      }

      const drawCatLeg = (l: Limb, root: Vec, paw: Vec, bendDir: number) => {
        const mid: Vec = [(root[0] + paw[0]) * 0.5 + bendDir * 2.2, (root[1] + paw[1]) * 0.5 + 1.0];
        l.draw([root, mid, paw], [0.25, 0.55]);
      };

      drawCatLeg(farHind, [H[0] - 0.6, H[1] + 2.2], pawHR, -1);
      drawCatLeg(farFront, [S[0] + 0.4, S[1] + 2.6], pawFR, -0.6);
      drawCatLeg(nearHind, [H[0] - 0.2, H[1] + 2.6], pawHL, -1.1);
      drawCatLeg(nearFront, [S[0] + 1.0, S[1] + 3.0], pawFL, -0.7);

      farPaws.setAttribute('d', `${oval(pawHR[0] + 0.5, pawHR[1] - 0.7, 1.5, 1.0)} ${oval(pawFR[0] + 0.5, pawFR[1] - 0.7, 1.4, 0.95)}`);
      nearPaws.setAttribute('d', `${oval(pawHL[0] + 0.5, pawHL[1] - 0.7, 1.6, 1.05)} ${oval(pawFL[0] + 0.5, pawFL[1] - 0.7, 1.5, 1.0)}`);

      // --- Expressive S-curved Tail (held high & swaying happily when eating or being petted!) ---
      const tailTarget =
        submergeDepth > 0.5
          ? 11 + Math.sin(t * 14) * 3
          : mode === 'eat' || mode === 'eat_run'
            ? 10.5 + Math.sin(t * 8 + roleOffset * 3) * 3.2 // happy upright tail!
            : sulkAmt > 0.2
              ? -11.5 * sulkAmt
              : mode === 'sulk_sit' && bf.isPerched
                ? 4 + Math.sin(t * 18) * 3.5
                : crouchAmt > 0.2
                  ? -3 + Math.sin(modeT * 24) * 5.5
                  : isJumping
                    ? -7
                    : 6 + gaitWave * 4.2 + Math.sin(t * 3.4 + roleOffset * 6) * 2.8;
      const tw = tailSpring.step(tailTarget, dt);
      const flick = (sulkAmt > 0.4 ? 0.3 : 1) * Math.sin(t * 6.5 + roleOffset * 4) * 2.4 + shakeOsc * 4;
      const T0: Vec = [H[0] - 2.4, H[1] + 0.4];
      const C1: Vec = [T0[0] - 6.5, T0[1] - 3.5 - tw * 0.45];
      const C2: Vec = [T0[0] - 10.5 + tw * 0.25, T0[1] - 11.5 - tw * 0.85];
      const T2: Vec = [T0[0] - 14.5 + tw * 0.45 + flick, T0[1] - 14.0 - tw * 0.7];
      const tailD = `M${pt(T0)} C${pt(C1)} ${pt(C2)} ${pt(T2)}`;
      tailOut.setAttribute('d', tailD);
      tailIn.setAttribute('d', tailD);

      // --- Collar & bell ---
      const nk: Vec = [S[0] + 3.8 - sitAmt * 0.8, S[1] + 0.6];
      collarN.setAttribute(
        'd',
        `M${f(nk[0] - 2.4)} ${f(nk[1] - 1.2)} Q${f(nk[0] + 0.4)} ${f(nk[1] + 2.4)} ${f(nk[0] + 2.8)} ${f(nk[1] + 0.6)} ` +
        `L${f(nk[0] + 2.2)} ${f(nk[1] + 2.2)} Q${f(nk[0] - 0.2)} ${f(nk[1] + 3.6)} ${f(nk[0] - 3.0)} ${f(nk[1] + 0.2)}Z`
      );
      bellN.setAttribute('d', oval(nk[0] + 1.8, nk[1] + 2.4, 1.3, 1.3));

      // --- Submerge water mask when inside the pond ---
      if (submergeDepth > 0.05) {
        const wy = -4.2;
        const wave = Math.sin(t * 11) * 0.8;
        submergeMask.setAttribute('opacity', '1');
        submergeMask.setAttribute(
          'd',
          `M-24 ${f(wy)} Q-12 ${f(wy + wave)} 0 ${f(wy - wave)} Q12 ${f(wy + wave)} 20 ${f(wy)} ` +
          `L20 18 L-24 18Z`
        );
        waterLineN.setAttribute(
          'd',
          `M-16 ${f(wy + 0.4)} Q-6 ${f(wy + 1.6 + wave)} 4 ${f(wy - 0.4 - wave)} Q11 ${f(wy + 1.2)} 15 ${f(wy + 0.2)}`
        );
      } else {
        submergeMask.setAttribute('opacity', '0');
        waterLineN.setAttribute('d', '');
      }

      // --- Head pose: dips into bowl when eating, tilts softly when petted, droops when sulking ---
      const munchNod = mode === 'eat' && !ownerState.isPetting ? Math.sin(t * 16 + roleOffset * 4) * 1.1 : 0;
      const petNod = petHappy > 0.1 ? Math.sin(t * 6.5) * 1.2 : 0;
      const hd: Vec = [
        S[0] + 5.2 - crouchAmt * 0.6 - sitAmt * 1.4 - sulkAmt * 1.0 + eatDip * 1.2,
        S[1] - 3.2 + crouchAmt * 1.6 - sitAmt * 1.2 + sulkAmt * 2.8 + eatDip * 4.5 + munchNod + petNod * 0.5,
      ];
      const lookDx = (bf.x - x) * dir;
      const lookDy = bf.y - (curGroundY + hd[1] * scale);
      const rawLookDeg =
        submergeDepth > 0.5
          ? -14 + Math.sin(t * 10) * 6
          : shakeOsc !== 0
            ? shakeOsc * 28
            : mode === 'eat'
              ? (petHappy > 0.2 ? -10 + petNod * 4 : 32 + munchNod * 5) // lowered into bowl when eating, lifted into hand when petted!
              : mode === 'sulk_walk'
                ? 24
                : mode === 'sulk_sit'
                  ? (bf.isPerched && bf.perchedTime > 0.35 ? -16 : 22)
                  : clamp(Math.atan2(lookDy, Math.max(14, lookDx)) * 57.3, -42, 18);
      const headDeg = headTiltSpring.step(rawLookDeg, dt);
      headG.setAttribute('transform', `translate(${pt(hd)}) rotate(${f(headDeg)})`);

      const headRad = (headDeg * Math.PI) / 180;
      const localCrownX = hd[0] + Math.sin(headRad) * 4.4;
      const localCrownY = hd[1] - Math.cos(headRad) * 4.4;
      headTopScene = [x + dir * scale * localCrownX, curGroundY + scale * localCrownY];

      const wetOrSulkEars = submergeDepth > 0.5 || Math.abs(shakeOsc) > 0.05 ? 2.1 : sulkAmt * 2.3;
      const earFlat = Math.max(crouchAmt * 1.4, wetOrSulkEars, petHappy * 0.9);
      const earTwitch = Math.sin(t * 17 + roleOffset * 9) > 0.96 ? 0.9 : 0;
      earsN.setAttribute(
        'd',
        `M-3.4 -2.2 L${f(-4.4 - earFlat)} ${f(-8.2 + earFlat + earTwitch)} L-0.4 -3.8Z ` +
        `M0.8 -3.8 L${f(3.6 + earFlat * 0.7)} ${f(-8.0 + earFlat)} L4.2 -1.6Z`
      );
      earPatch.setAttribute('d', `M-3.3 -2.4 L${f(-4.2 - earFlat)} ${f(-7.7 + earFlat + earTwitch)} L-0.8 -3.7Z`);
      skullN.setAttribute('d', oval(0, 0, 4.7, 4.1));
      capPatch.setAttribute('d', 'M-4.4 -1.0 Q-3.2 -4.1 0.4 -4.0 Q-1.2 -1.4 -4.4 -1.0Z');

      // Eye expression: happy curved arch '^' when being petted or eating!
      const isLookingAtHeadButterfly = mode === 'sulk_sit' && bf.isPerched && bf.perchedTime > 0.3;
      const eyeD =
        Math.abs(shakeOsc) > 0.05
          ? 'M0.6 -0.8 l1.8 0.5 l-1.8 0.5 '
          : mode === 'eat'
            ? 'M0.7 -0.5 q0.9 -1.1 1.8 0 ' // happy closed arch eye when eating & being petted!
            : sulkAmt > 0.45
              ? 'M0.7 -0.3 q0.9 0.7 1.8 -0.2 '
              : isLookingAtHeadButterfly || submergeDepth > 0.5
                ? 'M1.4 -1.3 a1.05 1.15 0 1 0 0.1 0 '
                : 'M1.4 -0.8 a0.75 0.9 0 1 0 0.1 0 ';
      faceN.setAttribute(
        'd',
        eyeD +
        'M4.3 0.6 l-0.8 0.6 l0.7 0.5 ' +
        (sulkAmt > 0.45 ? 'M3.0 2.2 l3.4 0.8 M2.8 2.8 l3.2 1.2' : 'M3.2 1.8 l3.8 -0.5 M3.0 2.4 l3.6 0.7')
      );

      // Mood lines above head: gloom '|||' when sulking, surprise '!' when springing up, or happy purr curves when petted!
      if (sulkAmt > 0.5) {
        const bob = Math.sin(t * 4) * 0.4;
        moodN.setAttribute(
          'd',
          `M-1.5 ${f(-10.2 + bob)} l0 2.6 M0.2 ${f(-10.8 + bob)} l0 2.8 M1.9 ${f(-10.1 + bob)} l0 2.5`
        );
      } else if (petHappy > 0.3) {
        const bob = Math.sin(t * 8) * 0.6;
        moodN.setAttribute(
          'd',
          `M-0.5 ${f(-10.2 + bob)} q1.2 -2.2 2.4 0 q1.2 -2.2 2.4 0`
        );
      } else if (mode === 'spring_up' && modeT < 0.35) {
        moodN.setAttribute('d', 'M0.5 -13.5 l0 3.2 M0.5 -8.8 l0 0.6');
      } else {
        moodN.setAttribute('d', '');
      }

      g.setAttribute('transform', `translate(${f(x)} ${f(curGroundY)}) scale(${f(dir * scale)} ${f(scale)})`);
    },
  };
}

// ============================================================================
// 7. Assemble Scene, Interactions, and Animation Loop
// ============================================================================
const pond = buildPond();
const flora = buildFlora();
const owner = createOwner(actorLayer);
const yard = buildBackyard(() => owner.triggerVisit());
const butterfly = createButterfly(actorLayer);

// Cat 1: "Mikan" — warm ginger/calico-patched cat with red collar
const cat1 = createChasingCat(
  actorLayer,
  {
    name: 'Mikan',
    x: 245,
    groundY: 256,
    scale: 1.22,
    accent: '#d48846',
    collar: '#b3412d',
    roleOffset: 0.0,
    pondSpot: [POND_X - 18, POND_Y + 6],
    pondExitX: 392,
    sulkSpot: [284, FENCE_Y + 13],
    eatSpot: [190, 255],
    isPrimaryPerch: true,
  },
  pond
);

// Cat 2: "Sumi" — sleek tuxedo/tabby-spotted cat with indigo collar
const cat2 = createChasingCat(
  actorLayer,
  {
    name: 'Sumi',
    x: 315,
    groundY: 240,
    scale: 1.08,
    accent: '#4a4742',
    collar: '#3b5b78',
    roleOffset: 0.45,
    pondSpot: [POND_X + 18, POND_Y - 4],
    pondExitX: 416,
    sulkSpot: [324, FENCE_Y + 9],
    eatSpot: [206, 241],
    isPrimaryPerch: false,
  },
  pond
);

const cats = [cat2, cat1];

function triggerBothCatsPondDive() {
  cats.forEach((c) => {
    if (c.mode !== 'pond_dive') c.startPondDive();
  });
}

function triggerBothCatsSpringUp() {
  cats.forEach((c) => {
    if (c.mode === 'sulk_sit' || c.mode === 'sulk_walk') {
      c.triggerSpringUp(butterfly);
    }
  });
}

// Click a cat to trigger an immediate pounce (or spring up if sulking)
cats.forEach((c) => {
  c.g.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    hideHint();
    c.poke(butterfly);
  });
});

// Click the owner to restart/extend her visit
owner.fig.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  hideHint();
  owner.triggerVisit();
});

// Click anywhere in the backyard (or on the pond) to guide the butterfly there
svg.addEventListener('pointerdown', (e) => {
  hideHint();
  const ptSvg = svg.createSVGPoint();
  ptSvg.x = e.clientX;
  ptSvg.y = e.clientY;
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const p = ptSvg.matrixTransform(ctm.inverse());
    if (inPond(p.x, p.y, 18, 12)) {
      pond.addRing(p.x, p.y, 2, 0.9);
      butterfly.guideTo(clamp(p.x, POND_X - 35, POND_X + 35), 196);
    } else {
      butterfly.guideTo(p.x, p.y);
    }
  }
});

const gifRecorder = setupGifRecorder(svg);

run((t, dt) => {
  dt = dt || 1 / 60;
  const w = wind.step(t);

  // Only start an automatic owner visit when the cats are not mid-pond-dive or sulking by the wall
  const catsBusyInStory = cats.some(
    (c) => c.mode === 'pond_dive' || c.mode === 'sulk_walk' || c.mode === 'sulk_sit' || c.mode === 'spring_up'
  );

  yard.draw(t, dt, w);
  pond.draw(t, dt, w);
  flora.draw(t, dt, w, cats.map((c) => [c.x, c.y]));
  owner.draw(t, dt, w, !catsBusyInStory);

  const sulkingCat =
    cat1.mode === 'sulk_sit' ? cat1 : cat2.mode === 'sulk_sit' ? cat2 : null;
  const sulkHeadTarget = sulkingCat
    ? { pos: sulkingCat.headTop, dir: sulkingCat.dir }
    : null;
  const flowerPerchTarget = owner.active ? flora.perchFlowerTip : null;

  cats.forEach((c) =>
    c.draw(
      t,
      dt,
      butterfly,
      { active: owner.active, isPetting: owner.isPetting, hasFood: owner.hasFood },
      triggerBothCatsPondDive,
      triggerBothCatsSpringUp
    )
  );
  butterfly.draw(t, dt, w, sulkHeadTarget, flowerPerchTarget);

  // Depth sort actors by ground y (Sumi y=240..241, Owner y=248, Mikan y=255..256) + Butterfly on top
  const sortedActors: Array<{ y: number; el: Element }> = [
    { y: cat1.y, el: cat1.g },
    { y: cat2.y, el: cat2.g },
    { y: owner.y, el: owner.fig },
  ].sort((a, b) => a.y - b.y);
  sortedActors.forEach((a) => actorLayer.appendChild(a.el));
  actorLayer.appendChild(butterfly.g);

  gifRecorder.tick(dt);
});

// ============================================================================
// 8. Real-Time Browser GIF Recorder (gifenc) — Top-Right [GIF 녹화] Button
// ============================================================================
function setupGifRecorder(svgEl: SVGSVGElement) {
  const btn = document.querySelector<HTMLButtonElement>('#gif-btn')!;
  const label = document.querySelector<HTMLElement>('#gif-label')!;
  const serializer = new XMLSerializer();

  const GIF_W = 800, GIF_H = 400;
  const FPS = 15;
  const FRAME_INTERVAL = 1 / FPS;
  const MAX_SECONDS = 30;

  const canvas = document.createElement('canvas');
  canvas.width = GIF_W;
  canvas.height = GIF_H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

  let recording = false;
  let encoding = false;
  let recElapsed = 0;
  let frameAcc = 0;
  let svgSnapshots: string[] = [];

  function startRecording() {
    if (encoding) return;
    recording = true;
    recElapsed = 0;
    frameAcc = FRAME_INTERVAL; // capture the very first frame immediately
    svgSnapshots = [];
    btn.classList.add('recording');
    label.textContent = '녹화 중지 (0.0s)';
  }

  async function stopAndEncode() {
    if (!recording || encoding) return;
    recording = false;
    encoding = true;
    btn.classList.remove('recording');
    btn.disabled = true;

    const total = svgSnapshots.length;
    if (total === 0) {
      encoding = false;
      btn.disabled = false;
      label.textContent = 'GIF 녹화';
      return;
    }

    const gif = GIFEncoder();
    const delayMs = Math.round(1000 / FPS);
    let globalPalette: number[][] | null = null;

    for (let i = 0; i < total; i++) {
      label.textContent = `GIF 생성 중… ${Math.round(((i + 1) / total) * 100)}%`;
      await renderSvgToCanvas(svgSnapshots[i]);
      const imgData = ctx.getImageData(0, 0, GIF_W, GIF_H).data;
      // Quantize a 128-colour palette per frame (or reuse when appropriate) so subtle paper & accent tones stay crisp
      const palette = quantize(imgData, 128);
      if (!globalPalette) globalPalette = palette;
      const index = applyPalette(imgData, palette);
      gif.writeFrame(index, GIF_W, GIF_H, {
        palette,
        delay: delayMs,
        repeat: 0,
      });
      // Yield to browser UI every 3 frames so the progress percentage updates smoothly
      if (i % 3 === 0) await new Promise((r) => setTimeout(r, 0));
    }

    gif.finish();
    const bytes = gif.bytes();
    const blob = new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
    a.href = url;
    a.download = `backyard-cats-${stamp}.gif`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    svgSnapshots = [];
    encoding = false;
    btn.disabled = false;
    label.textContent = 'GIF 녹화';
  }

  function renderSvgToCanvas(svgMarkup: string): Promise<void> {
    return new Promise((resolve) => {
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = '#fdfcf8';
        ctx.fillRect(0, 0, GIF_W, GIF_H);
        ctx.drawImage(img, 0, 0, GIF_W, GIF_H);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  }

  btn.addEventListener('pointerdown', (e) => {
    // Prevent click on the button from guiding the butterfly in the SVG underneath
    e.stopPropagation();
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (encoding) return;
    if (!recording) startRecording();
    else void stopAndEncode();
  });

  return {
    tick(dt: number) {
      if (!recording) return;
      recElapsed += dt;
      frameAcc += dt;
      if (frameAcc >= FRAME_INTERVAL) {
        frameAcc -= FRAME_INTERVAL;
        svgSnapshots.push(serializer.serializeToString(svgEl));
        label.textContent = `녹화 중지 (${recElapsed.toFixed(1)}s)`;
      }
      if (recElapsed >= MAX_SECONDS) {
        void stopAndEncode();
      }
    },
  };
}

// Expose debug handle for verification & frame capture
(window as unknown as { __backyard: unknown }).__backyard = { butterfly, cats, owner, yard, pond, flora, gifRecorder };
