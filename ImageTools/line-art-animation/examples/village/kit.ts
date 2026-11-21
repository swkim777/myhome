// Shared constants and small helpers for the ink village.

// The scene sets many numeric attributes; let setAttribute take numbers (the DOM stringifies them).
declare global { interface Element { setAttribute(qualifiedName: string, value: string | number): void } }
export const W = 960, H = 480;
export const BASE = 344;   // house fronts / back edge of the street
export const LANE = { back: 360, mid: 366, front: 372 }; // feet lines on the street
export const EDGE = 384;   // canal coping top
export const WATER = 400;  // water surface
export const SP = 0.8;     // scene pen
export const FS = 0.5;     // figure scale (figures are drawn ~95 px tall, ground 120)

export const rnd = (a, b) => a + Math.random() * (b - a);
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
export const ease = (t) => smooth(0, 1, t);
export const easeOut = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const oval = (cx, cy, rx, ry) => `M${(cx - rx).toFixed(2)} ${cy.toFixed(2)} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;

// deterministic randomness for the static drawing, so the street is the same every load
let seed = 11;
export const srnd = (a, b) => { seed = (seed * 16807) % 2147483647; return a + ((seed - 1) / 2147483646) * (b - a); };

// colours
export const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const rgb = (c) => `rgb(${c.map((v) => Math.round(v)).join(',')})`;
export const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
export const lum = (c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;

/** Sample a cyclic colour ramp [[pos, '#hex'], ...] at u in [0,1). */
export function ramp(keys, u) {
  u = ((u % 1) + 1) % 1;
  const n = keys.length;
  let i = n - 1;
  for (let j = 0; j < n; j++) if (keys[j][0] <= u) i = j;
  const [p0, c0] = keys[i], [p1, c1] = keys[(i + 1) % n];
  const span = (i + 1 < n ? p1 : p1 + 1) - p0;
  let x = u - p0; if (x < 0) x += 1;
  return mix(hex(c0), hex(c1), ease(x / span));
}

/** Simple layered noise for organic motion (no deps). */
export const wobble = (t, k = 1) => Math.sin(t * 1.3 * k) * 0.6 + Math.sin(t * 2.7 * k + 1.7) * 0.3 + Math.sin(t * 5.1 * k + 4.1) * 0.1;
