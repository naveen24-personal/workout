/* ============================================================
   tools/check.mjs — validate the data and the animations
   ------------------------------------------------------------
     node tools/check.mjs
   No dependencies. It copies the modules to a temp folder,
   rewrites the bare "three" import to the vendored file, then:
     1. imports every module (catches syntax + import errors)
     2. checks every clip: joints, frames, props, implements
     3. checks the plan only references exercises that exist
     4. runs forward kinematics on every pose and flags anything
        physically wrong — feet through the floor, hands off the
        pull-up bar, a body part underground, feet sliding
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'atlaslab-'));

function copyRewrite(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name); const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyRewrite(s, d);
    else if (entry.name.endsWith('.js')) {
      const three = pathToFileURL(path.join(root, 'vendor', 'three.module.js')).href;
      const orbit = pathToFileURL(path.join(root, 'vendor', 'OrbitControls.js')).href;
      fs.writeFileSync(d, fs.readFileSync(s, 'utf8')
        .replaceAll("from 'three/addons/controls/OrbitControls.js'", `from '${orbit}'`)
        .replaceAll("from 'three'", `from '${three}'`));
    }
  }
}
copyRewrite(path.join(root, 'js'), path.join(tmp, 'js'));
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
const load = (rel) => import(pathToFileURL(path.join(tmp, rel)).href);

const { JOINTS, buildFigure } = await load('js/3d/rig.js');
const { Clip } = await load('js/3d/anim.js');
const { CLIPS } = await load('js/3d/clips.js');
const { PROPS, HANDHELD } = await load('js/3d/props.js');
const { EX, EX_LIST } = await load('js/data/exercises.js');
const { DAYS, WARMUP, ABS_MATRIX, PULLUP_LEVELS, CARDIO } = await load('js/data/plan.js');

const errs = []; const notes = [];
const valid = new Set([...JOINTS, 'root']);

/* ---- 1. clip integrity ---- */
for (const [key, def] of Object.entries(CLIPS)) {
  if (!PROPS[def.prop || 'none']) errs.push(`${key}: unknown prop "${def.prop}"`);
  for (const [slot, kind] of Object.entries(def.attach || {})) {
    if (!['handR', 'handL'].includes(slot)) errs.push(`${key}: bad attach slot ${slot}`);
    if (!HANDHELD[kind]) errs.push(`${key}: unknown implement "${kind}"`);
  }
  for (const f of def.frames || []) {
    if (!(f.t >= 0 && f.t <= 1)) errs.push(`${key}: frame t=${f.t} out of range`);
    for (const [j, v] of Object.entries(f.pose || {})) {
      if (!valid.has(j)) errs.push(`${key} @${f.t}: unknown joint "${j}"`);
      else if (j !== 'root' && (!Array.isArray(v) || v.length !== 3 || v.some((n) => typeof n !== 'number')))
        errs.push(`${key} @${f.t}: bad rotation for ${j}`);
    }
  }
  const c = new Clip(def);
  for (let u = 0; u < 1; u += 0.02) {
    const p = c.sample(u);
    if (JOINTS.some((j) => p[j].some(Number.isNaN)) || p.root.p.some(Number.isNaN))
      { errs.push(`${key}: NaN in the interpolated pose`); break; }
  }
  if (!c.markers().length) notes.push(`${key}: no labelled keyframes`);
}

/* ---- 2. content wiring ---- */
for (const [id, ex] of Object.entries(EX)) if (!CLIPS[ex.clip]) errs.push(`exercise ${id}: missing clip "${ex.clip}"`);
for (const d of DAYS) {
  for (const b of d.blocks) for (const it of b.items) if (!EX[it.id]) errs.push(`${d.id}/${b.name}: unknown exercise "${it.id}"`);
  for (const it of d.abs) if (!EX[it.id]) errs.push(`${d.id}/abs: unknown exercise "${it.id}"`);
}
for (const w of WARMUP.drills) if (!EX[w.id]) errs.push(`warm-up: unknown "${w.id}"`);
for (const m of ABS_MATRIX) for (const id of m.ex) if (!EX[id]) errs.push(`abs matrix: unknown "${id}"`);
for (const l of PULLUP_LEVELS) if (!EX[l.id]) errs.push(`pull-up level ${l.level}: unknown "${l.id}"`);
for (const c of CARDIO) if (c.id && !EX[c.id]) errs.push(`cardio: unknown "${c.id}"`);

/* ---- 3. pose physics ---- */
const fig = buildFigure();
const W = (n) => { const m = fig.joints[n].matrixWorld.elements; return { x: m[12], y: m[13], z: m[14] }; };
const BAR = 2.32;
const MOVING = new Set(['walkingLunge', 'hipCircles', 'inclineWalk']);   /* these travel on purpose */

for (const [key, def] of Object.entries(CLIPS)) {
  const clip = new Clip(def); const prop = def.prop || 'none';
  let minY = 9, ankle = 9, handMin = 9, handMax = -9, head = 9;
  const feetR = [], feetL = [];
  for (let i = 0; i < 30; i++) {
    fig.applyPose(clip.sample(i / 30));
    fig.root.updateMatrixWorld(true);
    for (const n of JOINTS) minY = Math.min(minY, W(n).y);
    feetR.push(W('footR')); feetL.push(W('footL'));
    ankle = Math.min(ankle, W('footR').y, W('footL').y);
    handMin = Math.min(handMin, W('handR').y, W('handL').y);
    handMax = Math.max(handMax, W('handR').y, W('handL').y);
    head = Math.min(head, W('head').y);
  }
  const onBar = prop.startsWith('pullup');
  const onFeet = ['none', 'cableHigh', 'cableLow', 'cableMid', 'cableBehind', 'calf', 'treadmill'].includes(prop);
  const slide = (a) => Math.max(...a.map((p) => p.z)) - Math.min(...a.map((p) => p.z));
  if (minY < -0.16) errs.push(`${key}: a joint reaches ${minY.toFixed(2)} m, below the floor`);
  if (head < -0.05) errs.push(`${key}: head below the floor (${head.toFixed(2)})`);
  if (onBar && (handMax > BAR + 0.05 || handMin < BAR - 0.14)) errs.push(`${key}: hands leave the bar (${handMin.toFixed(2)}..${handMax.toFixed(2)} vs ${BAR})`);
  if (onBar && ankle < 0.06) errs.push(`${key}: feet touch the floor while hanging`);
  if (onFeet && ankle > 0.35) errs.push(`${key}: figure floats (lowest foot ${ankle.toFixed(2)})`);
  if (onFeet && ankle < -0.06) errs.push(`${key}: foot through the floor (${ankle.toFixed(2)})`);
  if (onFeet && !MOVING.has(key) && Math.max(slide(feetR), slide(feetL)) > 0.42)
    errs.push(`${key}: foot slides ${Math.max(slide(feetR), slide(feetL)).toFixed(2)} m`);
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`clips ${Object.keys(CLIPS).length} · exercises ${EX_LIST.length} · days ${DAYS.length}`);
notes.forEach((n) => console.log('  note  ' + n));
errs.forEach((e) => console.log('  FAIL  ' + e));
console.log(errs.length ? `\n${errs.length} problem(s)` : '\nAll checks passed.');
process.exit(errs.length ? 1 : 0);
