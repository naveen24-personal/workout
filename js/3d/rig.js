/* ============================================================
   rig.js — procedural articulated mannequin
   ------------------------------------------------------------
   Builds a skeleton of nested Object3D "joints" with capsule
   limbs attached. Every animation in the site is just a list of
   joint rotations over time, so no external model files, no
   video assets, and the whole figure weighs a few kilobytes.

   Axis conventions (memorise these before writing poses):
     +Y up, +Z is the direction the figure faces, +X is the
     figure's LEFT. So the figure's RIGHT side sits at -X.

   Limb chains hang DOWN from their joint, so for arms/legs:
     rx negative -> swings forward (+Z)
     rx positive -> swings backward (-Z)
     rz negative -> right limb moves away from the body
                    (mirrored automatically for the left)
   Spine/neck point UP, so for those:
     rx positive -> bends forward
   ============================================================ */
import * as THREE from 'three';

const D = Math.PI / 180;

/* ---------- proportions (metres, ~1.76 m figure) ---------- */
export const DIM = {
  hipY: 0.95,
  pelvis: 0.15,
  spine: 0.16,
  chest: 0.24,
  neck: 0.10,
  headR: 0.115,
  clavX: 0.07,
  clavY: 0.17,
  armX: 0.115,
  upperArm: 0.29,
  foreArm: 0.26,
  hand: 0.10,
  thighX: 0.095,
  thigh: 0.44,
  shin: 0.42,
  foot: 0.19
};

/* joint list, used by the animation engine for interpolation */
export const JOINTS = [
  'hips', 'spine', 'chest', 'neck', 'head',
  'clavR', 'armR', 'foreR', 'handR',
  'clavL', 'armL', 'foreL', 'handL',
  'thighR', 'shinR', 'footR',
  'thighL', 'shinL', 'footL'
];

/* relaxed standing pose — every animation starts from this and
   only overrides the joints it cares about */
export const BASE_POSE = {
  root: { p: [0, 0, 0], r: [0, 0, 0] },
  hips: [0, 0, 0], spine: [0, 0, 0], chest: [0, 0, 0], neck: [0, 0, 0], head: [0, 0, 0],
  clavR: [0, 0, 0], armR: [0, 0, -6], foreR: [-8, 0, 0], handR: [0, 0, 0],
  clavL: [0, 0, 0], armL: [0, 0, 6], foreL: [-8, 0, 0], handL: [0, 0, 0],
  thighR: [0, 0, -2], shinR: [3, 0, 0], footR: [0, 0, 0],
  thighL: [0, 0, 2], shinL: [3, 0, 0], footL: [0, 0, 0]
};

/* ---------- materials ---------- */
function makeMaterials() {
  const body = new THREE.MeshStandardMaterial({
    color: 0x9fb0c6, roughness: 0.62, metalness: 0.06
  });
  const joint = new THREE.MeshStandardMaterial({
    color: 0x63758c, roughness: 0.5, metalness: 0.18
  });
  const head = new THREE.MeshStandardMaterial({
    color: 0xb4c3d6, roughness: 0.55, metalness: 0.05
  });
  const muscleOff = new THREE.MeshStandardMaterial({
    color: 0x9fb0c6, roughness: 0.62, metalness: 0.06
  });
  const muscleOn = new THREE.MeshStandardMaterial({
    color: 0xff5c1a, roughness: 0.42, metalness: 0.1,
    emissive: 0xff3d00, emissiveIntensity: 0.55
  });
  return { body, joint, head, muscleOff, muscleOn };
}

/* capsule that hangs downward from y=0 to y=-len */
function limb(mat, len, rad, radBottom) {
  const g = new THREE.CapsuleGeometry(rad, Math.max(len - rad * 2, 0.01), 6, 14);
  const m = new THREE.Mesh(g, mat);
  m.position.y = -len / 2;
  m.castShadow = true;
  if (radBottom && radBottom !== rad) m.scale.set(1, 1, 1);
  return m;
}

function ball(mat, r) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), mat);
  m.castShadow = true;
  return m;
}

/* a thin shell used to light up a muscle group */
function plate(mat, w, h, d, pos, rot) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * D, rot[1] * D, rot[2] * D);
  m.castShadow = true;
  return m;
}

/**
 * Build the figure.
 * @returns {{root:THREE.Group, joints:Object, applyPose:Function, highlight:Function, dispose:Function}}
 */
export function buildFigure(opts = {}) {
  const scale = opts.scale || 1;
  const mats = makeMaterials();
  const joints = {};
  const muscles = {};      // group name -> [meshes]
  const owned = [];        // geometries to dispose

  const track = (name, mesh) => {
    (muscles[name] = muscles[name] || []).push(mesh);
    return mesh;
  };
  const node = (name, parent, pos) => {
    const o = new THREE.Object3D();
    o.position.set(pos[0], pos[1], pos[2]);
    parent.add(o);
    joints[name] = o;
    return o;
  };

  const root = new THREE.Group();
  root.scale.setScalar(scale);

  /* ---- torso ---- */
  const hips = node('hips', root, [0, DIM.hipY, 0]);
  const pelvisMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.125, 0.07, 6, 14), mats.body);
  pelvisMesh.rotation.z = Math.PI / 2;
  pelvisMesh.scale.set(1, 1, 0.78);
  pelvisMesh.castShadow = true;
  hips.add(pelvisMesh);
  hips.add(track('glutes', plate(mats.muscleOff, 0.24, 0.15, 0.06, [0, -0.02, -0.10])));

  const spine = node('spine', hips, [0, 0.05, 0]);
  const abdomen = new THREE.Mesh(new THREE.CapsuleGeometry(0.115, 0.06, 6, 14), mats.body);
  abdomen.position.y = 0.08;
  abdomen.scale.set(1, 1.05, 0.8);
  abdomen.castShadow = true;
  spine.add(abdomen);
  spine.add(track('abs', plate(mats.muscleOff, 0.17, 0.19, 0.055, [0, 0.07, 0.075])));
  spine.add(track('obliques', plate(mats.muscleOff, 0.055, 0.17, 0.14, [-0.105, 0.07, 0.01])));
  spine.add(track('obliques', plate(mats.muscleOff, 0.055, 0.17, 0.14, [0.105, 0.07, 0.01])));
  spine.add(track('lowback', plate(mats.muscleOff, 0.16, 0.16, 0.05, [0, 0.06, -0.08])));

  const chest = node('chest', spine, [0, DIM.spine, 0]);
  const ribs = new THREE.Mesh(new THREE.CapsuleGeometry(0.145, 0.10, 6, 16), mats.body);
  ribs.position.y = 0.11;
  ribs.scale.set(1.06, 1, 0.76);
  ribs.castShadow = true;
  chest.add(ribs);
  chest.add(track('chest', plate(mats.muscleOff, 0.235, 0.15, 0.05, [0, 0.13, 0.088])));
  chest.add(track('lats', plate(mats.muscleOff, 0.24, 0.20, 0.05, [0, 0.07, -0.085])));
  chest.add(track('traps', plate(mats.muscleOff, 0.22, 0.09, 0.07, [0, 0.20, -0.045])));

  const neck = node('neck', chest, [0, DIM.chest, 0]);
  const neckMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.05, 5, 10), mats.body);
  neckMesh.position.y = 0.04;
  neck.add(neckMesh);
  const head = node('head', neck, [0, DIM.neck, 0]);
  const headMesh = ball(mats.head, DIM.headR);
  headMesh.scale.set(0.9, 1.05, 0.95);
  headMesh.position.y = 0.05;
  head.add(headMesh);

  /* ---- arms ---- */
  const arm = (side) => {
    const s = side === 'R' ? -1 : 1;           // right side sits at -X
    const clav = node('clav' + side, chest, [s * DIM.clavX, DIM.clavY, 0]);
    const upper = node('arm' + side, clav, [s * DIM.armX, 0.02, 0]);
    upper.add(track('delts', ball(mats.muscleOff, 0.072)));
    upper.add(limb(mats.body, DIM.upperArm, 0.055));
    upper.add(track('biceps', plate(mats.muscleOff, 0.085, 0.16, 0.05, [0, -0.14, 0.045])));
    upper.add(track('triceps', plate(mats.muscleOff, 0.085, 0.17, 0.05, [0, -0.14, -0.045])));
    const fore = node('fore' + side, upper, [0, -DIM.upperArm, 0]);
    fore.add(ball(mats.joint, 0.048));
    fore.add(limb(mats.body, DIM.foreArm, 0.046));
    fore.add(track('forearms', plate(mats.muscleOff, 0.072, 0.13, 0.045, [0, -0.09, 0.032])));
    const hand = node('hand' + side, fore, [0, -DIM.foreArm, 0]);
    const hm = new THREE.Mesh(new THREE.BoxGeometry(0.055, DIM.hand, 0.085), mats.joint);
    hm.position.y = -DIM.hand / 2;
    hm.castShadow = true;
    hand.add(hm);
    return hand;
  };
  arm('R'); arm('L');

  /* ---- legs ---- */
  const leg = (side) => {
    const s = side === 'R' ? -1 : 1;
    const thigh = node('thigh' + side, hips, [s * DIM.thighX, -0.03, 0]);
    thigh.add(ball(mats.joint, 0.078));
    thigh.add(limb(mats.body, DIM.thigh, 0.082));
    thigh.add(track('quads', plate(mats.muscleOff, 0.115, 0.26, 0.06, [0, -0.20, 0.062])));
    thigh.add(track('hams', plate(mats.muscleOff, 0.115, 0.24, 0.06, [0, -0.21, -0.062])));
    const shin = node('shin' + side, thigh, [0, -DIM.thigh, 0]);
    shin.add(ball(mats.joint, 0.062));
    shin.add(limb(mats.body, DIM.shin, 0.062));
    shin.add(track('calves', plate(mats.muscleOff, 0.09, 0.17, 0.055, [0, -0.13, -0.05])));
    const foot = node('foot' + side, shin, [0, -DIM.shin, 0]);
    const fm = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.055, DIM.foot), mats.joint);
    fm.position.set(0, -0.03, DIM.foot / 2 - 0.06);
    fm.castShadow = true;
    foot.add(fm);
    return foot;
  };
  leg('R'); leg('L');

  root.traverse((o) => { if (o.isMesh) { o.receiveShadow = false; owned.push(o.geometry); } });

  /* ---- pose application ---- */
  const applyPose = (pose) => {
    for (const name of JOINTS) {
      const r = pose[name];
      const j = joints[name];
      if (r && j) j.rotation.set(r[0] * D, r[1] * D, r[2] * D);
    }
    const rt = pose.root;
    if (rt) {
      if (rt.p) root.position.set(rt.p[0], rt.p[1], rt.p[2]);
      if (rt.r) root.rotation.set(rt.r[0] * D, rt.r[1] * D, rt.r[2] * D);
    }
  };

  /* ---- muscle highlighting ---- */
  let lit = [];
  const highlight = (names) => {
    lit.forEach((m) => { m.material = mats.muscleOff; });
    lit = [];
    (names || []).forEach((n) => {
      (muscles[n] || []).forEach((m) => { m.material = mats.muscleOn; lit.push(m); });
    });
  };

  const dispose = () => {
    owned.forEach((g) => g.dispose && g.dispose());
    Object.values(mats).forEach((m) => m.dispose());
  };

  applyPose(BASE_POSE);
  return { root, joints, muscles, materials: mats, applyPose, highlight, dispose, DIM };
}

/** Muscle groups that can be highlighted, for the UI legend. */
export const MUSCLE_GROUPS = [
  'chest', 'lats', 'traps', 'delts', 'biceps', 'triceps', 'forearms',
  'abs', 'obliques', 'lowback', 'glutes', 'quads', 'hams', 'calves'
];
