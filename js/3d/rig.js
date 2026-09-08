/* ============================================================
   rig.js — the articulated figure
   ------------------------------------------------------------
   A skeleton of nested Object3D "joints" with body, clothing and
   face built from primitives. Every animation in the site is just
   a list of joint rotations over time, so there are no model
   files and no video assets — the whole person is a few kB of JS.

   Two looks share one skeleton:
     'avatar'  — skin, hair, beard, tee, relaxed jeans, sneakers
     'anatomy' — the plain grey mannequin, for studying the joints
   Working muscles glow orange on top of either.

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

/* ---------- the look: edit these to restyle the avatar ---------- */
export const PALETTE = {
  skin: 0xba7f4e,
  skinShade: 0x8d5c36,
  hair: 0x140f0c,
  beard: 0x1c1512,
  eye: 0x0d0b0a,
  tee: 0x8a4522,
  teeShade: 0x6d3419,
  print: 0xe6ddd0,
  denim: 0xa9c2dd,
  denimShade: 0x8ba7c4,
  shoe: 0xeae5da,
  sole: 0xcfc8bb,
  watch: 0xa8b0ba,
  strap: 0x23282f,
  thread: 0xd9522a
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
  const std = (color, rough = 0.7, metal = 0.02) =>
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
  return {
    skin: std(PALETTE.skin, 0.68),
    skinShade: std(PALETTE.skinShade, 0.72),
    hair: std(PALETTE.hair, 0.82),
    beard: std(PALETTE.beard, 0.85),
    eye: std(PALETTE.eye, 0.35, 0.1),
    tee: std(PALETTE.tee, 0.86),
    teeShade: std(PALETTE.teeShade, 0.88),
    print: std(PALETTE.print, 0.7),
    denim: std(PALETTE.denim, 0.9),
    denimShade: std(PALETTE.denimShade, 0.9),
    shoe: std(PALETTE.shoe, 0.75),
    sole: std(PALETTE.sole, 0.8),
    watch: std(PALETTE.watch, 0.3, 0.85),
    strap: std(PALETTE.strap, 0.7),
    thread: std(PALETTE.thread, 0.8),
    /* the plain mannequin look */
    grey: std(0x9fb0c6, 0.62, 0.06),
    greyJoint: std(0x63758c, 0.5, 0.18),
    /* muscle overlay — hidden until an exercise highlights it */
    muscle: new THREE.MeshStandardMaterial({
      color: 0xff5c1a, roughness: 0.42, metalness: 0.08,
      emissive: 0xff3d00, emissiveIntensity: 0.6
    })
  };
}

/* ---------- primitive helpers ---------- */
/** capsule hanging downward from y=0 to y=-len */
function limb(mat, len, rad) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(rad, Math.max(len - rad * 2, 0.01), 6, 14), mat);
  m.position.y = -len / 2;
  m.castShadow = true;
  return m;
}
function ball(mat, r, pos, scale) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  m.castShadow = true;
  return m;
}
function box(mat, w, h, d, pos, rot) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * D, rot[1] * D, rot[2] * D);
  m.castShadow = true;
  return m;
}
/** part of a sphere: cap for hair, lower shell for a beard */
function shell(mat, r, thetaStart, thetaLength, pos, scale) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 20, 14, 0, Math.PI * 2, thetaStart, thetaLength), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  m.castShadow = true;
  m.material.side = THREE.DoubleSide;
  return m;
}

/**
 * Build the figure.
 * @param {{style?:'avatar'|'anatomy'}} opts
 */
export function buildFigure(opts = {}) {
  const mats = makeMaterials();
  const joints = {};
  const muscles = {};     // group name -> [meshes]
  const outfit = [];      // clothes / hair / face — hidden in anatomy mode
  const bodyParts = [];   // { mesh, avatar, anatomy } material swap targets
  const owned = [];

  const node = (name, parent, pos) => {
    const o = new THREE.Object3D();
    o.position.set(pos[0], pos[1], pos[2]);
    parent.add(o);
    joints[name] = o;
    return o;
  };
  /** register a mesh whose material differs between the two looks */
  const skinned = (mesh, anatomyMat) => {
    bodyParts.push({ mesh, avatar: mesh.material, anatomy: anatomyMat || mats.grey });
    return mesh;
  };
  const worn = (mesh) => { outfit.push(mesh); return mesh; };
  /** muscle overlay plate — invisible until highlighted */
  const plate = (group, w, h, d, pos, rot) => {
    const m = box(mats.muscle, w, h, d, pos, rot);
    m.castShadow = false;
    m.visible = false;
    (muscles[group] = muscles[group] || []).push(m);
    return m;
  };
  const plateBall = (group, r, pos, scale) => {
    const m = ball(mats.muscle, r, pos, scale);
    m.castShadow = false;
    m.visible = false;
    (muscles[group] = muscles[group] || []).push(m);
    return m;
  };

  const root = new THREE.Group();
  root.scale.setScalar(opts.scale || 1);

  /* ============================ torso ============================ */
  const hips = node('hips', root, [0, DIM.hipY, 0]);
  const pelvis = new THREE.Mesh(new THREE.CapsuleGeometry(0.128, 0.07, 6, 14), mats.denim);
  pelvis.rotation.z = Math.PI / 2;
  pelvis.scale.set(1, 1, 0.8);
  pelvis.castShadow = true;
  hips.add(pelvis);
  skinned(pelvis, mats.grey);
  hips.add(worn(box(mats.denimShade, 0.28, 0.035, 0.23, [0, 0.075, 0])));      /* waistband */
  hips.add(plate('glutes', 0.25, 0.16, 0.06, [0, -0.02, -0.13]));

  const spine = node('spine', hips, [0, 0.05, 0]);
  const abdomen = new THREE.Mesh(new THREE.CapsuleGeometry(0.118, 0.06, 6, 14), mats.skin);
  abdomen.position.y = 0.08;
  abdomen.scale.set(1.04, 1.05, 0.86);
  abdomen.castShadow = true;
  spine.add(skinned(abdomen));
  /* the tee, in two pieces so it flexes with the spine */
  const teeLower = new THREE.Mesh(new THREE.CapsuleGeometry(0.142, 0.07, 6, 16), mats.tee);
  teeLower.position.y = 0.075;
  teeLower.scale.set(1.02, 1, 0.84);
  teeLower.castShadow = true;
  spine.add(worn(teeLower));
  spine.add(worn(box(mats.teeShade, 0.245, 0.02, 0.2, [0, -0.01, 0])));         /* hem */
  spine.add(plate('abs', 0.18, 0.2, 0.05, [0, 0.07, 0.128]));
  spine.add(plate('obliques', 0.05, 0.18, 0.14, [-0.135, 0.07, 0.02]));
  spine.add(plate('obliques', 0.05, 0.18, 0.14, [0.135, 0.07, 0.02]));
  spine.add(plate('lowback', 0.17, 0.17, 0.05, [0, 0.06, -0.128]));

  const chest = node('chest', spine, [0, DIM.spine, 0]);
  const ribs = new THREE.Mesh(new THREE.CapsuleGeometry(0.148, 0.1, 6, 16), mats.skin);
  ribs.position.y = 0.11;
  ribs.scale.set(1.08, 1, 0.8);
  ribs.castShadow = true;
  chest.add(skinned(ribs));
  const teeUpper = new THREE.Mesh(new THREE.CapsuleGeometry(0.166, 0.12, 6, 18), mats.tee);
  teeUpper.position.y = 0.105;
  teeUpper.scale.set(1.06, 1, 0.84);
  teeUpper.castShadow = true;
  chest.add(worn(teeUpper));
  /* collar */
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.014, 8, 20), mats.teeShade);
  collar.position.set(0, 0.225, 0.006);
  collar.rotation.x = Math.PI / 2;
  chest.add(worn(collar));
  /* the vertical chest print, suggested with small blocks */
  for (let i = 0; i < 6; i++) {
    chest.add(worn(box(mats.print, 0.016, 0.02, 0.006, [-0.06, 0.17 - i * 0.028, 0.128])));
  }
  chest.add(plate('chest', 0.24, 0.16, 0.05, [0, 0.13, 0.125]));
  chest.add(plate('lats', 0.25, 0.21, 0.05, [0, 0.07, -0.138]));
  chest.add(plate('traps', 0.23, 0.09, 0.07, [0, 0.2, -0.07]));

  const neck = node('neck', chest, [0, DIM.chest, 0]);
  const neckMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, 0.05, 5, 12), mats.skin);
  neckMesh.position.y = 0.04;
  neckMesh.castShadow = true;
  neck.add(skinned(neckMesh));

  /* ============================= head ============================= */
  const head = node('head', neck, [0, DIM.neck, 0]);
  const skull = ball(mats.skin, DIM.headR, [0, 0.05, 0], [0.9, 1.05, 0.95]);
  head.add(skinned(skull));
  /* ears */
  head.add(skinned(ball(mats.skin, 0.024, [-0.1, 0.048, -0.004], [0.5, 1.1, 0.85])));
  head.add(skinned(ball(mats.skin, 0.024, [0.1, 0.048, -0.004], [0.5, 1.1, 0.85])));
  /* nose */
  head.add(skinned(ball(mats.skin, 0.019, [0, 0.042, 0.098], [0.85, 1.05, 1])));
  /* eyes + brows */
  head.add(worn(ball(mats.eye, 0.0115, [-0.039, 0.064, 0.093])));
  head.add(worn(ball(mats.eye, 0.0115, [0.039, 0.064, 0.093])));
  head.add(worn(box(mats.hair, 0.038, 0.009, 0.012, [-0.04, 0.085, 0.09], [10, 0, -6])));
  head.add(worn(box(mats.hair, 0.038, 0.009, 0.012, [0.04, 0.085, 0.09], [10, 0, 6])));
  /* beard along the jaw + moustache */
  head.add(worn(shell(mats.beard, 0.125, Math.PI * 0.56, Math.PI * 0.44, [0, 0.05, 0.004], [0.87, 1.0, 0.93])));
  head.add(worn(box(mats.beard, 0.046, 0.014, 0.022, [0, 0.019, 0.094])));
  /* hair: a cap plus a few volumes for the wave on top */
  head.add(worn(shell(mats.hair, 0.126, 0, Math.PI * 0.38, [0, 0.048, -0.008], [0.99, 1.02, 1.02])));
  const backHair = shell(mats.hair, 0.126, Math.PI * 0.3, Math.PI * 0.34, [0, 0.048, -0.03], [0.99, 1.02, 0.9]);
  head.add(worn(backHair));
  const curls = [[0, 0.145, 0.02, 0.05], [-0.06, 0.138, -0.01, 0.045], [0.06, 0.138, -0.01, 0.045],
    [-0.035, 0.132, 0.055, 0.04], [0.035, 0.132, 0.055, 0.04], [0, 0.115, -0.075, 0.05],
    [-0.09, 0.09, -0.05, 0.04], [0.09, 0.09, -0.05, 0.04]];
  curls.forEach(([x, y, z, r]) => head.add(worn(ball(mats.hair, r, [x, y, z], [1, 0.9, 1]))));

  /* ============================= arms ============================= */
  const arm = (side) => {
    const s = side === 'R' ? -1 : 1;                 /* the figure's right sits at -X */
    const clav = node('clav' + side, chest, [s * DIM.clavX, DIM.clavY, 0]);
    const upper = node('arm' + side, clav, [s * DIM.armX, 0.02, 0]);
    upper.add(skinned(ball(mats.skin, 0.07), mats.grey));
    upper.add(skinned(limb(mats.skin, DIM.upperArm, 0.054)));
    /* short tee sleeve over the top of the upper arm */
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.083, 0.06, 6, 14), mats.tee);
    sleeve.position.y = -0.055;
    sleeve.scale.set(1, 1, 0.95);
    sleeve.castShadow = true;
    upper.add(worn(sleeve));
    upper.add(plateBall('delts', 0.088, [0, 0.005, 0]));
    upper.add(plate('biceps', 0.088, 0.16, 0.05, [0, -0.16, 0.05]));
    upper.add(plate('triceps', 0.088, 0.17, 0.05, [0, -0.16, -0.05]));

    const fore = node('fore' + side, upper, [0, -DIM.upperArm, 0]);
    fore.add(skinned(ball(mats.skin, 0.047), mats.greyJoint));
    fore.add(skinned(limb(mats.skin, DIM.foreArm, 0.045)));
    fore.add(plate('forearms', 0.075, 0.13, 0.045, [0, -0.09, 0.04]));
    /* watch on the left wrist, thread on the right */
    if (side === 'L') {
      fore.add(worn(box(mats.strap, 0.062, 0.03, 0.062, [0, -0.215, 0])));
      const face = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.014, 16), mats.watch);
      face.position.set(0, -0.215, 0.036);
      face.rotation.x = Math.PI / 2;
      face.castShadow = true;
      fore.add(worn(face));
    } else {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.049, 0.008, 8, 18), mats.thread);
      band.position.set(0, -0.215, 0);
      band.rotation.x = Math.PI / 2;
      fore.add(worn(band));
    }

    const hand = node('hand' + side, fore, [0, -DIM.foreArm, 0]);
    const fist = ball(mats.skin, 0.05, [0, -0.052, 0], [0.78, 1.05, 1]);
    hand.add(skinned(fist, mats.greyJoint));
    /* thumb, so a grip reads at a distance */
    hand.add(skinned(ball(mats.skin, 0.018, [s * -0.032, -0.036, 0.026]), mats.greyJoint));
    return hand;
  };
  arm('R'); arm('L');

  /* ============================= legs ============================= */
  const leg = (side) => {
    const s = side === 'R' ? -1 : 1;
    const thigh = node('thigh' + side, hips, [s * DIM.thighX, -0.03, 0]);
    thigh.add(skinned(ball(mats.skin, 0.078), mats.greyJoint));
    thigh.add(skinned(limb(mats.skin, DIM.thigh, 0.082)));
    /* relaxed-fit jeans: a slightly wider capsule over the whole thigh */
    const jeanTop = new THREE.Mesh(new THREE.CapsuleGeometry(0.108, 0.3, 6, 16), mats.denim);
    jeanTop.position.y = -0.22;
    jeanTop.scale.set(1, 1, 0.98);
    jeanTop.castShadow = true;
    thigh.add(worn(jeanTop));
    thigh.add(worn(box(mats.denimShade, 0.1, 0.13, 0.02, [s * 0.075, -0.26, 0.055], [0, 0, s * 4])));  /* cargo pocket */
    thigh.add(plate('quads', 0.12, 0.26, 0.06, [0, -0.2, 0.12]));
    thigh.add(plate('hams', 0.12, 0.24, 0.06, [0, -0.21, -0.12]));

    const shin = node('shin' + side, thigh, [0, -DIM.thigh, 0]);
    shin.add(skinned(ball(mats.skin, 0.062), mats.greyJoint));
    shin.add(skinned(limb(mats.skin, DIM.shin, 0.06)));
    const jeanLow = new THREE.Mesh(new THREE.CapsuleGeometry(0.098, 0.3, 6, 16), mats.denim);
    jeanLow.position.y = -0.2;
    jeanLow.castShadow = true;
    shin.add(worn(jeanLow));
    shin.add(worn(box(mats.denimShade, 0.16, 0.03, 0.16, [0, -0.36, 0])));          /* stacked hem */
    shin.add(plate('calves', 0.095, 0.18, 0.055, [0, -0.13, -0.105]));

    const foot = node('foot' + side, shin, [0, -DIM.shin, 0]);
    const shoeBody = box(mats.shoe, 0.098, 0.062, DIM.foot, [0, -0.028, DIM.foot / 2 - 0.07]);
    foot.add(skinned(shoeBody, mats.greyJoint));
    const soleMesh = box(mats.sole, 0.104, 0.028, DIM.foot + 0.01, [0, -0.062, DIM.foot / 2 - 0.07]);
    foot.add(skinned(soleMesh, mats.greyJoint));
    foot.add(worn(box(mats.sole, 0.09, 0.03, 0.05, [0, -0.012, 0.02])));            /* tongue */
    return foot;
  };
  leg('R'); leg('L');

  root.traverse((o) => { if (o.isMesh && o.geometry) owned.push(o.geometry); });

  /* ---------- pose application ---------- */
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

  /* ---------- muscle highlighting ---------- */
  let lit = [];
  const highlight = (names) => {
    lit.forEach((m) => { m.visible = false; });
    lit = [];
    (names || []).forEach((n) => {
      (muscles[n] || []).forEach((m) => { m.visible = true; lit.push(m); });
    });
  };

  /* ---------- avatar / mannequin ---------- */
  let style = opts.style || 'avatar';
  const setStyle = (next) => {
    style = next === 'anatomy' ? 'anatomy' : 'avatar';
    outfit.forEach((m) => { m.visible = style === 'avatar'; });
    bodyParts.forEach(({ mesh, avatar, anatomy }) => { mesh.material = style === 'avatar' ? avatar : anatomy; });
    return style;
  };
  const toggleStyle = () => setStyle(style === 'avatar' ? 'anatomy' : 'avatar');

  const dispose = () => {
    owned.forEach((g) => g.dispose && g.dispose());
    Object.values(mats).forEach((m) => m.dispose());
  };

  setStyle(style);
  applyPose(BASE_POSE);
  return {
    root, joints, muscles, materials: mats,
    applyPose, highlight, setStyle, toggleStyle, dispose, DIM,
    get style() { return style; }
  };
}

/** Muscle groups that can be highlighted, for the UI legend. */
export const MUSCLE_GROUPS = [
  'chest', 'lats', 'traps', 'delts', 'biceps', 'triceps', 'forearms',
  'abs', 'obliques', 'lowback', 'glutes', 'quads', 'hams', 'calves'
];
