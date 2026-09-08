/* ============================================================
   anim.js — pose kit + keyframe engine
   ------------------------------------------------------------
   A clip is a list of keyframes:
     { t: 0..1, pose: {...}, label: 'Set up', tip: 'what to feel' }
   Sampling a clip blends the joint angles of the surrounding
   keyframes, so 6-8 hand-written poses become a smooth loop.
   ============================================================ */
import { BASE_POSE, JOINTS, DIM } from './rig.js';

/* ---------- pose helpers ---------- */

/** Mirror a right-side-only pose onto the left side. */
export function S(pose) {
  const out = { ...pose };
  for (const k of Object.keys(pose)) {
    if (k.endsWith('R') && JOINTS.includes(k)) {
      const l = k.slice(0, -1) + 'L';
      if (out[l] === undefined) {
        const [x, y, z] = pose[k];
        out[l] = [x, -y, -z];
      }
    }
  }
  return out;
}

/** Shallow-merge poses left to right (later wins). */
export function P(...poses) {
  const out = {};
  for (const p of poses) {
    if (!p) continue;
    for (const k of Object.keys(p)) {
      out[k] = k === 'root' ? { ...(out.root || {}), ...p.root } : p[k];
    }
  }
  return out;
}

/* --- body positions in the world, derived from the rig sizes --- */
export const HIP_H = DIM.hipY;                 /* hips above the root origin */
/* hand joint height above the root when the arms are straight overhead */
export const REACH = DIM.hipY + 0.05 + DIM.spine + DIM.clavY + 0.02 + DIM.upperArm + DIM.foreArm;

/** Standing on the floor. */
export const stand = (z = 0, x = 0, turn = 0) => ({ root: { p: [x, 0, z], r: [0, turn, 0] } });

/** Sitting on a pad whose top surface is at `seatY`. */
export const sit = (seatY, z = 0, turn = 0) => P(
  { root: { p: [0, seatY - HIP_H + 0.02, z], r: [0, turn, 0] } },
  S({ thighR: [-88, 0, -4], shinR: [84, 0, 0], footR: [4, 0, 0] })
);

/** Lying face-up, spine axis a little above the pad top. */
export const supine = (padY, hipZ = 0, turn = 0) => ({
  root: { p: [0, padY + 0.14, hipZ + HIP_H], r: [-90, turn, 0] }
});

/** Lying face-down. */
export const prone = (padY, hipZ = 0) => ({
  root: { p: [0, padY + 0.14, hipZ - HIP_H], r: [90, 0, 0] }
});

/**
 * Reclined on an incline bench. `deg` is measured from the floor
 * (0 = lying flat, 90 = sitting upright). The hips are pinned to
 * (hipY, hipZ) and the torso is laid back along the pad.
 */
export const recline = (deg, hipY = 0.56, hipZ = 0.34) => {
  const a = -(90 - deg) * Math.PI / 180;
  return { root: { p: [0, hipY - Math.cos(a) * HIP_H, hipZ - Math.sin(a) * HIP_H], r: [-(90 - deg), 0, 0] } };
};

/** Kneeling upright, shins flat on the floor. */
export const kneel = (z = 0, turn = 0) => P(
  { root: { p: [0, -0.44, z], r: [0, turn, 0] } },
  S({ thighR: [-4, 0, -3], shinR: [92, 0, 0], footR: [-30, 0, 0] })
);

/** Hanging from a bar at height `barY` with straight arms. */
export const hang = (barY = 2.32, gripDeg = 14) => P(
  { root: { p: [0, barY - REACH - 0.05, 0], r: [0, 0, 0] } },
  S({
    clavR: [0, 0, 8], armR: [0, 0, -(180 - gripDeg)], foreR: [0, 0, 0], handR: [0, 0, 0],
    thighR: [-6, 0, -3], shinR: [34, 0, 0], footR: [-14, 0, 0]
  })
);

/** Front plank / push-up support position. */
export const plankPose = (onElbows = true) => P(
  { root: { p: [0, 0.02, 0], r: [-84, 0, 0] } },
  { spine: [3, 0, 0], chest: [4, 0, 0], neck: [-16, 0, 0] },
  S(onElbows
    ? { clavR: [0, 0, 4], armR: [-72, 0, -6], foreR: [-104, 0, 0], handR: [10, 0, 0], thighR: [4, 0, -3], shinR: [4, 0, 0], footR: [-58, 0, 0] }
    : { clavR: [0, 0, 4], armR: [-88, 0, -8], foreR: [-4, 0, 0], handR: [16, 0, 0], thighR: [4, 0, -3], shinR: [4, 0, 0], footR: [-58, 0, 0] })
);

/* ---------- keyframe sampling ---------- */

const lerp = (a, b, k) => a + (b - a) * k;
const ease = (k) => k * k * (3 - 2 * k);           /* smoothstep */
function angLerp(a, b, k) {
  let d = b - a;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return a + d * k;
}

function blendPose(a, b, k) {
  const out = {};
  for (const j of JOINTS) {
    const pa = a[j] || BASE_POSE[j] || [0, 0, 0];
    const pb = b[j] || BASE_POSE[j] || [0, 0, 0];
    out[j] = [angLerp(pa[0], pb[0], k), angLerp(pa[1], pb[1], k), angLerp(pa[2], pb[2], k)];
  }
  const ra = (a.root || BASE_POSE.root); const rb = (b.root || BASE_POSE.root);
  const pa = ra.p || [0, 0, 0]; const pb = rb.p || [0, 0, 0];
  const qa = ra.r || [0, 0, 0]; const qb = rb.r || [0, 0, 0];
  out.root = {
    p: [lerp(pa[0], pb[0], k), lerp(pa[1], pb[1], k), lerp(pa[2], pb[2], k)],
    r: [angLerp(qa[0], qb[0], k), angLerp(qa[1], qb[1], k), angLerp(qa[2], qb[2], k)]
  };
  return out;
}

export class Clip {
  /**
   * @param {object} def { id, dur, frames:[{t,pose,label,tip}], loop:'cycle'|'hold' }
   */
  constructor(def) {
    this.def = def;
    this.dur = def.dur || 4;
    /* resolve every frame against BASE_POSE so partial poses are legal */
    this.frames = def.frames.map((f) => ({
      t: f.t,
      label: f.label || '',
      tip: f.tip || '',
      pose: P(BASE_POSE, f.pose)
    })).sort((a, b) => a.t - b.t);
    if (this.frames[0].t > 0) this.frames.unshift({ ...this.frames[0], t: 0 });
    const last = this.frames[this.frames.length - 1];
    if (last.t < 1) this.frames.push({ ...this.frames[0], t: 1, label: last.label, tip: last.tip });
  }

  /** @param {number} u normalised time 0..1 */
  sample(u) {
    const f = this.frames;
    let i = 0;
    while (i < f.length - 2 && u > f[i + 1].t) i++;
    const a = f[i]; const b = f[i + 1];
    const span = Math.max(b.t - a.t, 1e-6);
    const k = ease(Math.min(Math.max((u - a.t) / span, 0), 1));
    return blendPose(a.pose, b.pose, k);
  }

  /** Frame whose label is currently showing. */
  phase(u) {
    const f = this.frames;
    let cur = f[0];
    for (const fr of f) { if (u >= fr.t - 1e-6 && fr.label) cur = fr; }
    return cur;
  }

  /** Marker positions for the scrub bar. */
  markers() { return this.frames.filter((f) => f.label).map((f) => f.t); }
}
