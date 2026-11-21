// Sky, sun, moon, stars and the day/night palette.
// Time of day τ ∈ [0,1): 0 midnight, 0.25 dawn, 0.5 noon, 0.75 dusk.
import { el, pen, shape, blot, f, pt, PAPER } from '../../lib/ink.ts';
import { W, SP, rnd, srnd, clamp, lerp, smooth, ramp, rgb, hex, mix, lum, oval } from './kit.ts';

const SKY_TOP = [[0, '#0d1222'], [0.19, '#131a30'], [0.235, '#3d4066'], [0.27, '#cfd8e2'], [0.33, '#f3f2ee'], [0.5, '#f6f5f1'], [0.68, '#f3eee4'], [0.735, '#e3c6a6'], [0.762, '#5a5279'], [0.80, '#1b2140'], [0.86, '#0d1222']];
const SKY_BOT = [[0, '#1a2240'], [0.19, '#283050'], [0.235, '#d49884'], [0.27, '#f3d0b3'], [0.33, '#faf6ee'], [0.5, '#fcfbf7'], [0.68, '#f9efdc'], [0.735, '#f0a379'], [0.762, '#d47f68'], [0.80, '#383a60'], [0.86, '#1a2240']];
const PAPERS = [[0, '#1a2036'], [0.19, '#1f263e'], [0.235, '#4a4561'], [0.27, '#ede4d8'], [0.33, '#fbf8f1'], [0.5, '#fdfcf8'], [0.68, '#faf4e8'], [0.735, '#f0dbc4'], [0.756, '#5d5571'], [0.80, '#262c48'], [0.86, '#1a2036']];
const INK_DARK = hex('#1c1c1c'), INK_LIGHT = hex('#efe6cf');

export function palette(tau) {
  const top = ramp(SKY_TOP, tau), bot = ramp(SKY_BOT, tau), paper = ramp(PAPERS, tau);
  const L = lum(paper);
  const inkT = smooth(0.56, 0.36, L);
  return {
    top, bot, paper,
    ink: mix(INK_DARK, INK_LIGHT, inkT),
    inkT,
    lamp: smooth(0.78, 0.4, L),            // how dark it is for lamps (windows add their own threshold)
    night: smooth(0.42, 0.1, lum(top)),    // stars, moon glow, fireflies
    sunset: Math.max(smooth(0.67, 0.735, tau) * smooth(0.79, 0.745, tau), smooth(0.215, 0.245, tau) * smooth(0.3, 0.26, tau)),
  };
}

const sunArc = (u) => [40 + 880 * u, 300 - 236 * Math.sin(Math.PI * u)];
const moonArc = (u) => [60 + 840 * u, 290 - 205 * Math.sin(Math.PI * u)];
const SUN_SPAN = [0.225, 0.55], MOON_SPAN = [0.775, 0.45];

export function createSky(svg, root, defs, { onScrub, onShoot }) {
  // gradient sky
  const grad = el('linearGradient', { id: 'v-sky', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  const s0 = el('stop', { offset: 0 }, grad), s1 = el('stop', { offset: 1 }, grad);
  const glowSun = el('radialGradient', { id: 'v-sunglow' }, defs);
  el('stop', { offset: 0, 'stop-color': '#ffd9a0', 'stop-opacity': 0.55 }, glowSun);
  el('stop', { offset: 1, 'stop-color': '#ffd9a0', 'stop-opacity': 0 }, glowSun);
  const glowMoon = el('radialGradient', { id: 'v-moonglow' }, defs);
  el('stop', { offset: 0, 'stop-color': '#e9e4ff', 'stop-opacity': 0.35 }, glowMoon);
  el('stop', { offset: 1, 'stop-color': '#e9e4ff', 'stop-opacity': 0 }, glowMoon);

  const g = el('g', {}, root);
  el('rect', { x: -20, y: -20, width: W + 40, height: 520, fill: 'url(#v-sky)' }, g);

  // stars
  const starG = el('g', {}, g);
  const stars = Array.from({ length: 90 }, () => {
    const x = srnd(0, W), y = srnd(6, 250), r = srnd(0.35, 1.05);
    return { n: el('circle', { cx: f(x), cy: f(y), r: f(r), fill: '#f5efda' }, starG), ph: srnd(0, 6), sp: srnd(0.6, 2.4), big: r > 0.9, spark: null as SVGPathElement | null };
  });
  stars.filter((s) => s.big).forEach((s) => {
    const x = +s.n.getAttribute('cx'), y = +s.n.getAttribute('cy');
    s.spark = el('path', { d: `M${x - 2.6} ${y} L${x + 2.6} ${y} M${x} ${y - 2.6} L${x} ${y + 2.6}`, stroke: '#f5efda', 'stroke-width': 0.35, opacity: 0.6 }, starG);
  });
  const shoots = [];

  // sun & moon (draggable)
  const sunG = el('g', { class: 'drag', style: 'cursor:grab' }, g);
  const sunGlow = el('circle', { r: 70, fill: 'url(#v-sunglow)' }, sunG);
  const sunDisk = el('circle', { r: 21, stroke: 'currentColor', 'stroke-width': SP }, sunG);
  el('title', {}, sunG).textContent = 'Drag the sun to change the time';
  const moonG = el('g', { class: 'drag', style: 'cursor:grab' }, g);
  el('circle', { r: 60, fill: 'url(#v-moonglow)' }, moonG);
  const moonDisk = el('path', { fill: '#f3ecd6', stroke: '#f3ecd6', 'stroke-width': 0.6 }, moonG);
  const moonShade = el('path', { fill: 'none', stroke: '#cfc6ad', 'stroke-width': 0.5, opacity: 0.7 }, moonG);
  el('title', {}, moonG).textContent = 'Drag the moon to change the time';

  // mist bands (suyari-gasumi) drifting in the day sky
  const mist = el('g', {}, g);
  const bands = [[120, 92, 150], [520, 64, 190], [760, 120, 130], [330, 140, 100]].map(([x, y, w]) => ({ x, y, w, v: rnd(1.2, 2.6), n: pen(mist, SP * 0.75) }));
  // Japanese cloud strokes: long horizontal lines that curl into small spirals at the ends
  const cloudD = (x, y, w) => {
    const curlR = (cx, cy, s) => `M${f(cx)} ${f(cy)} q${5 * s} 0 ${5 * s} -4 q0 -3.2 ${-3.2 * s} -3.2 q-2.2 0 -2.2 2.2 q0 1.4 1.4 1.4`;
    return `M${f(x)} ${f(y)} L${f(x + w)} ${f(y)} ${curlR(x + w, y, 1)} ${curlR(x, y, -1)} `
      + `M${f(x + w * 0.18)} ${f(y - 7)} L${f(x + w * 0.66)} ${f(y - 7)} ${curlR(x + w * 0.66, y - 7, 1)} `
      + `M${f(x + w * 0.42)} ${f(y + 6.5)} L${f(x + w * 0.92)} ${f(y + 6.5)} ${curlR(x + w * 0.42, y + 6.5, -1)}`;
  };

  // far hills and a pagoda, in diluted ink
  const far = el('g', { opacity: 0.42 }, g);
  pen(far, SP * 0.8).setAttribute('d', 'M0 262 Q80 238 170 222 Q240 206 300 214 Q360 222 420 208 Q470 196 520 188 Q600 176 660 198 Q720 218 790 206 Q860 192 960 214');
  pen(far, SP * 0.55).setAttribute('d', 'M140 228 q20 -6 40 -4 M300 216 q16 -2 30 2 M560 186 q26 -4 44 4 M820 202 q18 -4 32 0');
  drawPagoda(far, 640, 236);

  // dragging: pointer x along the arc → time
  let drag = null;
  const toSvg = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  const start = (kind) => (e) => { e.preventDefault(); e.stopPropagation(); drag = kind; svg.setPointerCapture?.(e.pointerId); svg.classList.add('scrubbing'); };
  sunG.addEventListener('pointerdown', start('sun'));
  moonG.addEventListener('pointerdown', start('moon'));
  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toSvg(e);
    if (drag === 'sun') onScrub(SUN_SPAN[0] + SUN_SPAN[1] * clamp((p.x - 40) / 880, 0, 1));
    else onScrub((MOON_SPAN[0] + MOON_SPAN[1] * clamp((p.x - 60) / 840, 0, 1)) % 1);
  });
  const end = () => { if (drag) { drag = null; svg.classList.remove('scrubbing'); onScrub(null); } };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);

  // night sky click → shooting star
  const skyHit = el('rect', { x: 0, y: 0, width: W, height: 160, fill: 'transparent' }, g);
  skyHit.addEventListener('pointerdown', (e) => { if (onShoot()) { const p = toSvg(e); shoot(p.x, p.y); } });
  g.insertBefore(skyHit, sunG);
  function shoot(x, y) {
    shoots.push({ x: x - 30, y: y - 18, t: 0, dir: Math.random() < 0.5 ? -1 : 1, n: el('path', { stroke: '#fff6dc', 'stroke-width': 0.9, 'stroke-linecap': 'round', fill: 'none' }, starG) });
  }

  return {
    shoot,
    draw(tau, t, dt, P, wind) {
      s0.setAttribute('stop-color', rgb(P.top));
      s1.setAttribute('stop-color', rgb(P.bot));
      starG.setAttribute('opacity', f(P.night));
      if (P.night > 0.01) stars.forEach((s) => {
        const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
        s.n.setAttribute('opacity', f(tw));
        if (s.spark) s.spark.setAttribute('opacity', f(tw * 0.7));
      });
      if (P.night > 0.6 && Math.random() < dt * 0.04) shoot(rnd(100, 860), rnd(30, 110));
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]; s.t += dt;
        const u = s.t / 0.9, x = s.x + s.dir * 120 * u, y = s.y + 60 * u;
        s.n.setAttribute('d', `M${f(x)} ${f(y)} L${f(x - s.dir * 34 * (1 - u))} ${f(y - 17 * (1 - u))}`);
        s.n.setAttribute('opacity', f(Math.sin(Math.PI * Math.min(1, u))));
        if (u >= 1) { s.n.remove(); shoots.splice(i, 1); }
      }

      // sun
      const su = (tau - SUN_SPAN[0]) / SUN_SPAN[1];
      if (su > -0.05 && su < 1.05) {
        const [x, y] = sunArc(clamp(su, 0, 1));
        sunG.setAttribute('transform', `translate(${f(x)} ${f(y + (su < 0 || su > 1 ? 30 : 0))})`);
        sunG.style.display = '';
        sunDisk.setAttribute('fill', rgb(mix(hex('#fbf3df'), hex('#df5a3a'), P.sunset)));
        sunGlow.setAttribute('opacity', f(0.35 + 0.65 * P.sunset));
      } else sunG.style.display = 'none';

      // moon (waxing crescent drawn with two arcs)
      const mu = (((tau - MOON_SPAN[0]) % 1) + 1) % 1 / MOON_SPAN[1];
      if (mu <= 1.02) {
        const [x, y] = moonArc(clamp(mu, 0, 1));
        moonG.setAttribute('transform', `translate(${f(x)} ${f(y)}) rotate(-24)`);
        moonG.style.display = '';
        moonG.setAttribute('opacity', f(smooth(0, 0.08, mu) * smooth(1.02, 0.94, mu)));
        const r = 15;
        moonDisk.setAttribute('d', `M0 ${-r} A${r} ${r} 0 1 1 0 ${r} A${r * 0.62} ${r} 0 1 0 0 ${-r}Z`);
        moonShade.setAttribute('d', `M3 -6 a2.4 1.8 0 1 0 0.1 0 M8 4 a1.6 1.3 0 1 0 0.1 0`);
      } else moonG.style.display = 'none';

      // mist bands — strongest in the morning
      mist.setAttribute('opacity', f(0.75 - 0.45 * P.night));
      bands.forEach((b) => {
        b.x += (b.v + wind * 3) * dt; if (b.x > W + 40) b.x = -b.w - 40; if (b.x < -b.w - 60) b.x = W + 30;
        b.n.setAttribute('d', cloudD(b.x, b.y, b.w));
      });
    },
  };
}

function drawPagoda(g, cx, baseY) {
  // five tiers, each a sweeping roof with a small body under it, then the sōrin spire
  let y = baseY;
  for (let i = 0; i < 5; i++) {
    const w = 36 - i * 4.2, bodyH = 9 - i * 0.6;
    shape(g, SP * 0.75).setAttribute('d', `M${cx - w * 0.42} ${y} L${cx + w * 0.42} ${y} L${cx + w * 0.42} ${y - bodyH} L${cx - w * 0.42} ${y - bodyH}Z`);
    pen(g, SP * 0.5).setAttribute('d', `M${cx - w * 0.18} ${y} L${cx - w * 0.18} ${y - bodyH} M${cx + w * 0.18} ${y} L${cx + w * 0.18} ${y - bodyH}`);
    y -= bodyH;
    shape(g, SP * 0.75).setAttribute('d', `M${cx - w} ${y + 1} Q${cx - w * 0.6} ${y - 1} ${cx - w * 0.35} ${y - 5} L${cx + w * 0.35} ${y - 5} Q${cx + w * 0.6} ${y - 1} ${cx + w} ${y + 1} Q${cx} ${y - 2} ${cx - w} ${y + 1}Z`);
    y -= 5;
  }
  pen(g, SP * 0.8).setAttribute('d', `M${cx} ${y} L${cx} ${y - 26}`);
  pen(g, SP * 0.5).setAttribute('d', Array.from({ length: 6 }, (_, k) => `M${cx - 2.6} ${y - 4 - k * 3} L${cx + 2.6} ${y - 4 - k * 3}`).join(' '));
}
