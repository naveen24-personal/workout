/* ============================================================
   props.js — gym equipment
   ------------------------------------------------------------
   Every prop returns { group, update(ctx), attach }.
     group  : THREE.Object3D to add to the scene
     update : called each frame with world-space positions of the
              figure's hands and feet, so handles, bars, sleds and
              cables physically follow the body instead of drifting
     attach : optional { handR, handL } meshes parented to the hands
   The figure always stands at the origin facing +Z.
   ============================================================ */
import * as THREE from 'three';

const D = Math.PI / 180;

/* ---------- shared materials ---------- */
export const M = {
  frame: new THREE.MeshStandardMaterial({ color: 0x2b333f, roughness: 0.42, metalness: 0.78 }),
  frameDark: new THREE.MeshStandardMaterial({ color: 0x1a202a, roughness: 0.55, metalness: 0.6 }),
  pad: new THREE.MeshStandardMaterial({ color: 0x141a23, roughness: 0.9, metalness: 0.02 }),
  padEdge: new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.95, metalness: 0.0 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x8b97a6, roughness: 0.28, metalness: 0.92 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x0f1319, roughness: 0.95, metalness: 0.0 }),
  accent: new THREE.MeshStandardMaterial({ color: 0xff5c1a, roughness: 0.4, metalness: 0.2, emissive: 0xff3d00, emissiveIntensity: 0.18 }),
  cable: new THREE.MeshStandardMaterial({ color: 0x39424f, roughness: 0.6, metalness: 0.4 }),
  band: new THREE.MeshStandardMaterial({ color: 0x2fd4c4, roughness: 0.7, metalness: 0.05, emissive: 0x0e5f58, emissiveIntensity: 0.3 })
};

/* ---------- primitives ---------- */
function box(w, h, d, mat, pos, rot) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * D, rot[1] * D, rot[2] * D);
  m.castShadow = true;
  return m;
}
function tube(r, h, mat, pos, rot) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 16), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * D, rot[1] * D, rot[2] * D);
  m.castShadow = true;
  return m;
}
function disc(r, t, mat, pos, rot) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, t, 24), mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * D, rot[1] * D, rot[2] * D);
  m.castShadow = true;
  return m;
}

/* a straight segment (cable, band, chain) redrawn between two points */
function segment(mat, radius = 0.012) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 1, 8), mat);
  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const mid = new THREE.Vector3();
  mesh.update = (a, b) => {
    dir.subVectors(b, a);
    const len = dir.length() || 0.001;
    mid.addVectors(a, b).multiplyScalar(0.5);
    mesh.position.copy(mid);
    mesh.scale.set(1, len, 1);
    mesh.quaternion.setFromUnitVectors(up, dir.normalize());
  };
  return mesh;
}

/* the padded bench body used by several props */
function benchPad(len = 1.25, top = 0.46, z = -0.05, tilt = 0) {
  const g = new THREE.Group();
  const p = box(0.32, 0.09, len, M.pad, [0, top - 0.045, z], [tilt, 0, 0]);
  g.add(p);
  g.add(box(0.34, 0.02, len * 0.98, M.padEdge, [0, top - 0.095, z], [tilt, 0, 0]));
  return g;
}

function floorPlate(w = 1.1, d = 1.5, z = 0) {
  const g = new THREE.Group();
  g.add(box(w, 0.06, d, M.frameDark, [0, 0.03, z]));
  g.add(box(w * 0.9, 0.012, d * 0.9, M.rubber, [0, 0.066, z]));
  return g;
}

function weightStack(x, z, h = 1.15) {
  const g = new THREE.Group();
  g.add(tube(0.02, h + 0.35, M.steel, [x - 0.11, (h + 0.35) / 2, z]));
  g.add(tube(0.02, h + 0.35, M.steel, [x + 0.11, (h + 0.35) / 2, z]));
  const n = 9;
  for (let i = 0; i < n; i++) {
    const plate = box(0.3, 0.075, 0.34, i < 3 ? M.frameDark : M.frame, [x, 0.09 + i * 0.085, z]);
    g.add(plate);
  }
  g.add(box(0.31, 0.02, 0.35, M.accent, [x, 0.09 + 2 * 0.085 + 0.05, z]));
  return g;
}

/* ============================================================
   PROP BUILDERS
   ============================================================ */

/** bare floor mat, for planks / crunches / dead bugs */
function matProp() {
  const g = new THREE.Group();
  g.add(box(0.95, 0.035, 2.0, M.pad, [0, 0.018, 0]));
  g.add(box(0.99, 0.012, 2.04, M.padEdge, [0, 0.006, 0]));
  return { group: g };
}

/** flat or incline bench. tilt in degrees (0 = flat, 30 = incline) */
function benchProp(cfg = {}) {
  const tilt = cfg.tilt || 0;
  const top = cfg.top || 0.46;
  const g = new THREE.Group();
  if (tilt === 0) {
    g.add(benchPad(1.32, top, -0.05));
  } else {
    /* seat pad + inclined back pad, hinge at z = +0.28 */
    g.add(box(0.32, 0.09, 0.42, M.pad, [0, top - 0.045, 0.36]));
    const back = new THREE.Group();
    back.position.set(0, top - 0.05, 0.16);
    back.rotation.x = tilt * D;               /* top of pad leans toward -Z */
    back.add(box(0.32, 0.09, 0.95, M.pad, [0, 0, -0.45]));
    g.add(back);
  }
  g.add(tube(0.045, top - 0.09, M.frame, [0, (top - 0.09) / 2, -0.52]));
  g.add(tube(0.045, top - 0.09, M.frame, [0, (top - 0.09) / 2, 0.5]));
  g.add(box(0.5, 0.05, 0.1, M.frameDark, [0, 0.025, -0.52]));
  g.add(box(0.5, 0.05, 0.1, M.frameDark, [0, 0.025, 0.5]));
  if (cfg.rack) {
    g.add(tube(0.035, 1.05, M.frame, [-0.42, 0.52, -0.42]));
    g.add(tube(0.035, 1.05, M.frame, [0.42, 0.52, -0.42]));
  }
  return { group: g };
}

/**
 * Plate-loaded / selectorised machine with a seat, a back pad and a pair of
 * handles that follow the hands.
 * cfg: { seat, backTilt, backZ, handles:'press'|'fly'|'row'|'none', stack }
 */
function machineProp(cfg = {}) {
  const seat = cfg.seat ?? 0.5;
  const g = new THREE.Group();
  g.add(floorPlate(1.0, 1.5, cfg.baseZ ?? -0.25));
  g.add(box(0.42, 0.1, 0.46, M.pad, [0, seat - 0.05, 0]));                       /* seat */
  const backZ = cfg.backZ ?? -0.28;
  const back = new THREE.Group();
  back.position.set(0, seat, backZ);
  back.rotation.x = (cfg.backTilt ?? -8) * D;
  back.add(box(0.42, 0.62, 0.1, M.pad, [0, 0.34, 0]));
  g.add(back);
  g.add(tube(0.05, seat, M.frame, [0, seat / 2, backZ - 0.06]));
  g.add(tube(0.05, 1.5, M.frame, [-0.5, 0.75, backZ - 0.06]));
  g.add(tube(0.05, 1.5, M.frame, [0.5, 0.75, backZ - 0.06]));
  if (cfg.stack !== false) g.add(weightStack(0, backZ - 0.42, 1.0));

  /* handles that ride with the hands */
  const handles = new THREE.Group();
  const hr = new THREE.Group(); const hl = new THREE.Group();
  const kind = cfg.handles || 'press';
  const makeHandle = (mirror) => {
    const h = new THREE.Group();
    if (kind === 'press') {
      h.add(tube(0.028, 0.24, M.steel, [0, 0, 0], [90, 0, 0]));      /* grip along Z */
      h.add(tube(0.03, 0.3, M.frame, [mirror * 0.16, 0, -0.06], [0, 0, 90]));
    } else if (kind === 'fly') {
      h.add(tube(0.028, 0.22, M.steel, [0, 0, 0], [0, 0, 0]));       /* vertical grip */
      h.add(tube(0.035, 0.55, M.frame, [0, 0.26, 0]));
    } else {
      h.add(tube(0.028, 0.2, M.steel, [0, 0, 0], [90, 0, 0]));
    }
    return h;
  };
  hr.add(makeHandle(-1)); hl.add(makeHandle(1));
  handles.add(hr, hl);
  g.add(handles);

  const update = (ctx) => {
    if (ctx.handR) hr.position.copy(ctx.handR);
    if (ctx.handL) hl.position.copy(ctx.handL);
  };
  return { group: g, update };
}

/**
 * Cable column. cfg: { pulleyY, z, x, double, handle:'rope'|'bar'|'d'|'none' }
 * The cable is redrawn from the pulley to the working hand each frame.
 */
function cableProp(cfg = {}) {
  const py = cfg.pulleyY ?? 2.05;
  const z = cfg.z ?? -1.15;
  const x = cfg.x ?? 0;
  const g = new THREE.Group();
  g.add(floorPlate(0.9, 0.9, z));
  g.add(tube(0.06, 2.25, M.frame, [x, 1.12, z]));
  g.add(box(0.42, 0.5, 0.42, M.frameDark, [x, 0.3, z]));
  g.add(weightStack(x, z, 1.2));
  g.add(disc(0.075, 0.05, M.steel, [x, py, z + 0.06], [90, 0, 0]));   /* pulley wheel */
  g.add(box(0.1, 0.16, 0.06, M.frame, [x, py + 0.02, z + 0.06]));

  const cable = segment(M.cable, 0.011);
  g.add(cable);
  const pulley = new THREE.Vector3(x, py, z + 0.1);
  const target = new THREE.Vector3();

  const update = (ctx) => {
    const a = ctx.handR || ctx.handL;
    if (!a) return;
    if (ctx.handR && ctx.handL) target.addVectors(ctx.handR, ctx.handL).multiplyScalar(0.5);
    else target.copy(a);
    if (cfg.toHands === false && ctx.anchor) target.copy(ctx.anchor);
    cable.update(pulley, target);
  };
  return { group: g, update, anchor: pulley };
}

/** Lat pulldown / seated row station (shares the cable column). */
function stationProp(cfg = {}) {
  const kind = cfg.kind || 'pulldown';
  const g = new THREE.Group();
  const parts = [];

  if (kind === 'pulldown') {
    const cab = cableProp({ pulleyY: 2.1, z: 0.66 });
    g.add(cab.group); parts.push(cab);
    g.add(box(0.44, 0.11, 0.44, M.pad, [0, 0.5, 0.02]));                 /* seat */
    g.add(tube(0.05, 0.5, M.frame, [0, 0.25, 0.02]));
    g.add(box(0.14, 0.16, 0.4, M.pad, [-0.17, 0.68, 0.16]));             /* thigh pads */
    g.add(box(0.14, 0.16, 0.4, M.pad, [0.17, 0.68, 0.16]));
    g.add(tube(0.04, 0.42, M.frame, [0, 0.72, -0.2], [0, 0, 0]));
    /* wide grip bar rides with the hands */
    const bar = new THREE.Group();
    const barMesh = tube(0.022, 1.15, M.steel, [0, 0, 0], [0, 0, 90]);
    bar.add(barMesh);
    bar.add(tube(0.022, 0.18, M.steel, [-0.5, 0.07, 0], [0, 0, 35]));
    bar.add(tube(0.022, 0.18, M.steel, [0.5, 0.07, 0], [0, 0, -35]));
    g.add(bar);
    parts.push({
      update: (ctx) => {
        if (!ctx.handR || !ctx.handL) return;
        bar.position.addVectors(ctx.handR, ctx.handL).multiplyScalar(0.5);
        bar.position.y += 0.03;
      }
    });
  } else {                                             /* seated cable row */
    const cab = cableProp({ pulleyY: 0.34, z: 1.35 });
    g.add(cab.group); parts.push(cab);
    g.add(box(0.4, 0.1, 0.7, M.pad, [0, 0.42, -0.05]));                  /* seat */
    g.add(tube(0.05, 0.42, M.frame, [0, 0.21, -0.05]));
    g.add(box(0.7, 0.06, 0.5, M.frameDark, [0, 0.2, 1.05], [-20, 0, 0]));/* foot plate */
    /* v-handle */
    const h = new THREE.Group();
    h.add(tube(0.024, 0.26, M.steel, [0, 0, 0], [90, 0, 0]));
    h.add(tube(0.03, 0.16, M.frame, [0, 0, -0.1], [0, 0, 0]));
    g.add(h);
    parts.push({ update: (ctx) => { if (ctx.handR && ctx.handL) h.position.addVectors(ctx.handR, ctx.handL).multiplyScalar(0.5); } });
  }

  return {
    group: g,
    update: (ctx) => parts.forEach((p) => p.update && p.update(ctx))
  };
}

/** Pull-up rig. cfg: { barY, assist, step, band } */
function pullupProp(cfg = {}) {
  const barY = cfg.barY ?? 2.32;
  const g = new THREE.Group();
  const parts = [];
  g.add(floorPlate(1.6, 1.2, -0.35));
  g.add(tube(0.06, barY, M.frame, [-0.85, barY / 2, -0.35]));
  g.add(tube(0.06, barY, M.frame, [0.85, barY / 2, -0.35]));
  g.add(tube(0.06, 1.7, M.frame, [0, barY + 0.03, -0.35], [0, 0, 90]));
  g.add(tube(0.026, 1.5, M.steel, [0, barY, 0], [0, 0, 90]));            /* the bar */
  g.add(tube(0.05, 0.36, M.frame, [-0.62, barY + 0.01, -0.18], [90, 0, 0]));
  g.add(tube(0.05, 0.36, M.frame, [0.62, barY + 0.01, -0.18], [90, 0, 0]));

  if (cfg.assist) {
    /* counterweighted knee pad that rides under the figure */
    const padG = new THREE.Group();
    padG.add(box(0.5, 0.12, 0.34, M.pad, [0, 0, 0]));
    padG.add(tube(0.04, 0.5, M.frame, [0, -0.26, -0.12]));
    g.add(padG);
    g.add(weightStack(-0.85, -0.35, 1.0));
    parts.push({
      update: (ctx) => {
        if (!ctx.kneeR || !ctx.kneeL) return;
        padG.position.addVectors(ctx.kneeR, ctx.kneeL).multiplyScalar(0.5);
        padG.position.y -= 0.02; padG.position.z += 0.08;
      }
    });
  }
  if (cfg.step) g.add(box(0.62, 0.42, 0.42, M.frameDark, [0, 0.21, 0.05]));
  if (cfg.band) {
    const b1 = segment(M.band, 0.02); const b2 = segment(M.band, 0.02);
    g.add(b1, b2);
    const barPt = new THREE.Vector3(0, barY - 0.02, 0);
    parts.push({
      update: (ctx) => {
        if (ctx.footR) b1.update(barPt, ctx.footR);
        if (ctx.footR) b2.update(barPt, ctx.footR.clone().add(new THREE.Vector3(0.06, 0.02, 0.04)));
      }
    });
  }
  return { group: g, update: (ctx) => parts.forEach((p) => p.update(ctx)) };
}

/** 45-degree leg press with a sled that tracks the feet. */
function legPressProp() {
  const g = new THREE.Group();
  const ang = 40;
  g.add(floorPlate(1.3, 2.4, 0.1));
  /* back pad, reclined, figure sits at origin facing +Z */
  g.add(box(0.5, 0.12, 0.75, M.pad, [0, 0.42, -0.28], [18, 0, 0]));
  g.add(box(0.5, 0.1, 0.5, M.pad, [0, 0.55, 0.06]));
  g.add(tube(0.06, 0.45, M.frame, [-0.3, 0.22, -0.2], [0, 0, 0]));
  g.add(tube(0.06, 0.45, M.frame, [0.3, 0.22, -0.2], [0, 0, 0]));
  /* rails running up and forward */
  const rail = (x) => {
    const r = tube(0.045, 2.3, M.frame, [x, 0.86, 0.95], [ang, 0, 0]);
    return r;
  };
  g.add(rail(-0.45), rail(0.45));
  /* sled + foot plate */
  const sled = new THREE.Group();
  sled.add(box(0.72, 0.72, 0.08, M.frameDark, [0, 0, 0], [-(90 - ang), 0, 0]));
  sled.add(box(0.74, 0.06, 0.16, M.accent, [0, -0.3, 0.06], [-(90 - ang), 0, 0]));
  const plateR = 0.24;
  sled.add(disc(plateR, 0.05, M.rubber, [-0.45, 0.05, -0.08], [0, 0, 90]));
  sled.add(disc(plateR, 0.05, M.rubber, [0.45, 0.05, -0.08], [0, 0, 90]));
  g.add(sled);
  const update = (ctx) => {
    if (!ctx.footR || !ctx.footL) return;
    sled.position.addVectors(ctx.footR, ctx.footL).multiplyScalar(0.5);
    sled.position.z += 0.06;
  };
  return { group: g, update };
}

/** Seated leg extension / lying leg curl / seated calf block. */
function legMachineProp(cfg = {}) {
  const kind = cfg.kind || 'extension';
  const g = new THREE.Group();
  const parts = [];
  g.add(floorPlate(1.0, 1.6, -0.2));
  if (kind === 'curl-lying') {
    g.add(box(0.42, 0.12, 1.3, M.pad, [0, 0.62, -0.1], [-4, 0, 0]));
    g.add(tube(0.05, 0.56, M.frame, [0, 0.28, -0.5]));
    g.add(tube(0.05, 0.56, M.frame, [0, 0.28, 0.35]));
    const roll = new THREE.Group();
    roll.add(tube(0.075, 0.34, M.pad, [0, 0, 0], [0, 0, 90]));
    g.add(roll);
    parts.push({ update: (ctx) => { if (ctx.footR && ctx.footL) { roll.position.addVectors(ctx.footR, ctx.footL).multiplyScalar(0.5); roll.position.z -= 0.06; } } });
  } else if (kind === 'calf') {
    g.add(box(0.9, 0.14, 0.35, M.frameDark, [0, 0.07, 0.16]));
    g.add(tube(0.05, 1.6, M.frame, [-0.55, 0.8, -0.1]));
    g.add(tube(0.05, 1.6, M.frame, [0.55, 0.8, -0.1]));
    const pads = new THREE.Group();
    pads.add(box(0.16, 0.16, 0.2, M.pad, [-0.22, 0, 0]));
    pads.add(box(0.16, 0.16, 0.2, M.pad, [0.22, 0, 0]));
    g.add(pads);
    parts.push({ update: (ctx) => { if (ctx.shoulder) { pads.position.copy(ctx.shoulder); pads.position.y += 0.04; } } });
  } else {
    g.add(box(0.44, 0.11, 0.46, M.pad, [0, 0.5, -0.02]));
    g.add(box(0.42, 0.6, 0.1, M.pad, [0, 0.8, -0.3], [-10, 0, 0]));
    g.add(tube(0.05, 0.5, M.frame, [0, 0.25, -0.02]));
    g.add(weightStack(0, -0.55, 0.9));
    const roll = new THREE.Group();
    roll.add(tube(0.075, 0.34, M.pad, [0, 0, 0], [0, 0, 90]));
    roll.add(tube(0.03, 0.5, M.frame, [0, 0.2, -0.2], [50, 0, 0]));
    g.add(roll);
    parts.push({ update: (ctx) => { if (ctx.footR && ctx.footL) { roll.position.addVectors(ctx.footR, ctx.footL).multiplyScalar(0.5); roll.position.y += 0.06; } } });
  }
  return { group: g, update: (ctx) => parts.forEach((p) => p.update(ctx)) };
}

/** Treadmill, used on the cardio page. */
function treadmillProp() {
  const g = new THREE.Group();
  const deck = new THREE.Group();
  deck.rotation.x = -6 * D;
  deck.add(box(0.78, 0.12, 1.9, M.frameDark, [0, 0.16, 0]));
  const belt = box(0.62, 0.03, 1.78, M.rubber, [0, 0.23, 0]);
  deck.add(belt);
  g.add(deck);
  g.add(tube(0.04, 1.15, M.frame, [-0.38, 0.6, -0.85], [12, 0, 0]));
  g.add(tube(0.04, 1.15, M.frame, [0.38, 0.6, -0.85], [12, 0, 0]));
  g.add(tube(0.035, 0.8, M.steel, [-0.38, 1.05, -0.55], [80, 0, 0]));
  g.add(tube(0.035, 0.8, M.steel, [0.38, 1.05, -0.55], [80, 0, 0]));
  g.add(box(0.78, 0.36, 0.1, M.frameDark, [0, 1.18, -0.92], [16, 0, 0]));
  g.add(box(0.6, 0.22, 0.02, M.accent, [0, 1.2, -0.96], [16, 0, 0]));
  const update = (ctx) => { belt.material.map && (belt.material.map.offset.y = ctx.t); };
  return { group: g, update };
}

/* ============================================================
   HAND-HELD IMPLEMENTS (parented to the hand joints)
   ============================================================ */
function dumbbell(kg = 12) {
  const g = new THREE.Group();
  const r = 0.075 + Math.min(kg, 40) * 0.0016;
  g.add(tube(0.017, 0.24, M.steel, [0, 0, 0], [0, 0, 90]));
  [-0.09, 0.09].forEach((x) => {
    g.add(disc(r, 0.05, M.rubber, [x, 0, 0], [0, 0, 90]));
    g.add(disc(r * 0.72, 0.075, M.rubber, [x, 0, 0], [0, 0, 90]));
    g.add(disc(r * 0.28, 0.08, M.accent, [x, 0, 0], [0, 0, 90]));
  });
  g.position.y = -0.045;    /* sits inside the fist */
  return g;
}
function ezBar() {
  const g = new THREE.Group();
  g.add(tube(0.017, 1.2, M.steel, [0, 0, 0], [0, 0, 90]));
  [-0.5, 0.5].forEach((x) => {
    g.add(disc(0.17, 0.045, M.rubber, [x, 0, 0], [0, 0, 90]));
    g.add(disc(0.17, 0.045, M.rubber, [x + (x < 0 ? -0.05 : 0.05), 0, 0], [0, 0, 90]));
    g.add(disc(0.05, 0.06, M.accent, [x, 0, 0], [0, 0, 90]));
  });
  g.position.y = -0.045;
  return g;
}
function rope() {
  const g = new THREE.Group();
  g.add(tube(0.014, 0.34, M.pad, [0, 0.12, 0], [0, 0, 12]));
  g.add(tube(0.02, 0.1, M.frameDark, [0, -0.06, 0]));
  g.position.y = -0.04;
  return g;
}
function dHandle() {
  const g = new THREE.Group();
  g.add(tube(0.02, 0.14, M.steel, [0, 0, 0], [90, 0, 0]));
  g.add(tube(0.014, 0.16, M.frame, [0, 0.09, 0]));
  g.position.y = -0.04;
  return g;
}
function kettleOrPlate() {
  const g = new THREE.Group();
  g.add(disc(0.19, 0.06, M.rubber, [0, -0.16, 0], [90, 0, 0]));
  g.add(disc(0.05, 0.08, M.accent, [0, -0.16, 0], [90, 0, 0]));
  g.add(tube(0.02, 0.16, M.steel, [0, -0.06, 0]));
  return g;
}

export const HANDHELD = { dumbbell, ezBar, rope, dHandle, plate: kettleOrPlate };

/* ============================================================
   REGISTRY
   ============================================================ */
export const PROPS = {
  none: () => ({ group: new THREE.Group() }),
  mat: matProp,
  bench: () => benchProp({ tilt: 0 }),
  benchIncline: () => benchProp({ tilt: 30 }),
  benchInclineSteep: () => benchProp({ tilt: 45 }),
  benchUpright: () => benchProp({ tilt: 76 }),
  machinePress: () => machineProp({ seat: 0.48, backTilt: -14, handles: 'press' }),
  machineInclinePress: () => machineProp({ seat: 0.46, backTilt: -28, handles: 'press' }),
  machineShoulder: () => machineProp({ seat: 0.48, backTilt: -4, handles: 'press' }),
  machineFly: () => machineProp({ seat: 0.48, backTilt: -4, handles: 'fly' }),
  cableHigh: () => cableProp({ pulleyY: 2.05, z: 1.15 }),
  cableLow: () => cableProp({ pulleyY: 0.3, z: 1.15 }),
  cableMid: () => cableProp({ pulleyY: 1.35, z: 1.2 }),
  cableBehind: () => cableProp({ pulleyY: 2.05, z: -1.2 }),
  pulldown: () => stationProp({ kind: 'pulldown' }),
  row: () => stationProp({ kind: 'row' }),
  pullup: () => pullupProp({}),
  pullupAssist: () => pullupProp({ assist: true }),
  pullupStep: () => pullupProp({ step: true }),
  pullupBand: () => pullupProp({ band: true }),
  legPress: legPressProp,
  legExtension: () => legMachineProp({ kind: 'extension' }),
  legCurl: () => legMachineProp({ kind: 'curl-lying' }),
  calf: () => legMachineProp({ kind: 'calf' }),
  treadmill: treadmillProp
};

/** Build a prop by key; unknown keys fall back to an empty group. */
export function buildProp(key) {
  const fn = PROPS[key] || PROPS.none;
  return fn();
}
