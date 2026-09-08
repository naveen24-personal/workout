/* ============================================================
   viewer.js — the 3D stage
   ------------------------------------------------------------
   One WebGL renderer per stage. Loads a clip, drives the rig,
   keeps the equipment glued to the body, and can record what
   you see straight to a .webm video file.
   ============================================================ */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildFigure } from './rig.js';
import { buildProp, HANDHELD } from './props.js';
import { Clip } from './anim.js';
import { CLIPS } from './clips.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export const VIEWS = {
  '3q': { pos: [2.5, 1.6, 2.6], name: '3/4' },
  front: { pos: [0, 1.5, 3.6], name: 'Front' },
  side: { pos: [3.6, 1.4, 0.2], name: 'Side' },
  top: { pos: [0.2, 3.4, 1.6], name: 'Top' }
};

export class ExerciseViewer {
  constructor(container, opts = {}) {
    this.el = container;
    this.opts = opts;
    this.speed = 1;
    this.u = 0;
    this.playing = true;
    this.showMuscles = opts.showMuscles !== false;
    this.ok = false;
    this._disposed = false;

    try {
      this._initScene();
      this.ok = true;
    } catch (err) {
      this._fail(err);
      return;
    }

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    this._loop = this._loop.bind(this);
    this.clock = new THREE.Clock();
    this._raf = requestAnimationFrame(this._loop);
  }

  /* ---------------------------------------------------------- */
  _fail(err) {
    console.error('[viewer]', err);
    if (this.opts.hero) return;          /* the hero is decorative: fail silently */
    const d = document.createElement('div');
    d.className = 'stage-err';
    d.innerHTML = '<b>3D could not start in this browser.</b><br><span class="fine">' +
      'WebGL looks to be unavailable or disabled. Every exercise still has full written ' +
      'setup, execution and cue notes below.</span>';
    this.el.appendChild(d);
  }

  _initScene() {
    const w = this.el.clientWidth || 800;
    const h = this.el.clientHeight || 520;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.el.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    if (!this.opts.transparent) {
      this.scene.background = new THREE.Color(0x090c11);
      this.scene.fog = new THREE.Fog(0x090c11, 7, 17);
    }

    this.camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    this.camera.position.set(2.5, 1.6, 2.6);

    /* ---- lights: key, fill, rim ---- */
    this.scene.add(new THREE.HemisphereLight(0x2a3a52, 0x07090c, 0.7));
    const key = new THREE.DirectionalLight(0xfff2e2, 2.4);
    key.position.set(3.4, 5.2, 3.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1; key.shadow.camera.far = 16;
    key.shadow.camera.left = -3.5; key.shadow.camera.right = 3.5;
    key.shadow.camera.top = 4; key.shadow.camera.bottom = -1;
    key.shadow.bias = -0.0012;
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xff7a3c, 1.5);
    rim.position.set(-3.2, 2.6, -3.4);
    this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0x36d6c6, 0.5);
    fill.position.set(-3.6, 1.6, 3.0);
    this.scene.add(fill);

    /* ---- ground ---- */
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshStandardMaterial({ color: 0x0d1219, roughness: 0.95, metalness: 0.05 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    const grid = new THREE.GridHelper(18, 36, 0x1c2836, 0x141c26);
    grid.position.y = 0.002;
    grid.material.transparent = true;
    grid.material.opacity = 0.5;
    this.scene.add(grid);

    /* ---- figure ---- */
    this.figure = buildFigure();
    this.scene.add(this.figure.root);

    /* ---- controls ---- */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 1.4;
    this.controls.maxDistance = 9;
    this.controls.maxPolarAngle = Math.PI * 0.52;
    this.controls.target.set(0, 1.05, 0);
    this.controls.enabled = !this.opts.hero;
    if (this.opts.hero) {
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.55;
    }

    this.propGroup = new THREE.Group();
    this.scene.add(this.propGroup);
    this._held = [];
    this._ctx = {
      handR: V(), handL: V(), footR: V(), footL: V(),
      kneeR: V(), kneeL: V(), shoulder: V(), t: 0
    };
    this._tmp = V();
  }

  /* ---------------------------------------------------------- */
  /** Load an exercise clip by key. */
  load(key) {
    if (!this.ok) return;
    const def = CLIPS[key];
    if (!def) { console.warn('[viewer] unknown clip', key); return; }
    this.key = key;
    this.def = def;
    this.clip = new Clip(def);
    this.u = 0;
    this._phase = null;

    /* swap the equipment */
    this._clearProp();
    this.prop = buildProp(def.prop || 'none');
    if (def.propPos) this.prop.group.position.set(def.propPos[0], def.propPos[1], def.propPos[2]);
    this.propGroup.add(this.prop.group);

    /* hand-held implements */
    for (const [hand, kind] of Object.entries(def.attach || {})) {
      const maker = HANDHELD[kind];
      if (!maker) continue;
      const mesh = maker();
      this.figure.joints[hand].add(mesh);
      this._held.push({ parent: this.figure.joints[hand], mesh });
    }

    this.figure.highlight(this.showMuscles ? (def.highlight || []) : []);
    this.setView(this.opts.hero ? 'hero' : '3q', def);
    this._apply(0);
    return def;
  }

  _clearProp() {
    if (this.prop) {
      this.propGroup.remove(this.prop.group);
      this.prop.group.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
      this.prop = null;
    }
    this._held.forEach(({ parent, mesh }) => {
      parent.remove(mesh);
      mesh.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
    });
    this._held = [];
  }

  /* ---------------------------------------------------------- */
  _apply(u) {
    this._applyPose(this.clip.sample(u), u);
  }

  /** Drive the figure (and the equipment) from an explicit pose. */
  _applyPose(pose, u) {
    this.figure.applyPose(pose);
    this.figure.root.updateMatrixWorld(true);

    /* feed the equipment the body's world contact points */
    const j = this.figure.joints; const c = this._ctx;
    const grip = (name, out) => {
      this._tmp.set(0, -0.05, 0).applyMatrix4(j[name].matrixWorld);
      out.copy(this._tmp);
    };
    grip('handR', c.handR); grip('handL', c.handL);
    j.footR.getWorldPosition(c.footR); j.footL.getWorldPosition(c.footL);
    j.shinR.getWorldPosition(c.kneeR); j.shinL.getWorldPosition(c.kneeL);
    j.chest.getWorldPosition(c.shoulder); c.shoulder.y += 0.18;
    c.t = u || 0;
    if (this.prop && this.prop.update) this.prop.update(c);

    if (u === undefined || !this.clip) return;
    /* phase callback */
    const ph = this.clip.phase(u);
    if (ph !== this._phase) {
      this._phase = ph;
      this.opts.onPhase && this.opts.onPhase(ph);
    }
    this.opts.onProgress && this.opts.onProgress(u);
  }

  _loop() {
    if (this._disposed) return;
    this._raf = requestAnimationFrame(this._loop);
    const dt = Math.min(this.clock.getDelta(), 0.1);
    if (this.manual) {
      this._applyPose(this.manual);
    } else if (this.clip) {
      if (this.playing) {
        this.u = (this.u + (dt * this.speed) / this.clip.dur) % 1;
        if (this._rec && this.u < this._recLast) {
          this._recLoops++;
          if (this._recLoops >= this._recTarget) this.stopRecording();
        }
        this._recLast = this.u;
      }
      this._apply(this.u);
    }
    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /* ---------------------------------------------------------- */
  /** Pose editor hook: pass a pose object to freeze the figure in it. */
  setManual(pose) {
    this.manual = pose || null;
    if (pose) { this.playing = false; this._applyPose(pose); }
  }

  play() { this.manual = null; this.playing = true; }
  pause() { this.playing = false; }
  toggle() { this.playing = !this.playing; return this.playing; }
  setSpeed(s) { this.speed = s; }
  seek(u) { if (!this.clip) return; this.u = Math.min(Math.max(u, 0), 0.999); this._apply(this.u); }
  step(dir) {
    if (!this.clip) return;
    /* jump to the next / previous labelled keyframe */
    const marks = this.clip.markers();
    let target = marks[0];
    if (dir > 0) target = marks.find((m) => m > this.u + 0.01) ?? marks[0];
    else { const prev = marks.filter((m) => m < this.u - 0.01); target = prev.length ? prev[prev.length - 1] : marks[marks.length - 1]; }
    this.playing = false;
    this.seek(target);
  }

  setView(name, def) {
    if (!this.ok) return;
    const d = def || this.def || {};
    let p;
    if (name === 'auto' || name === 'hero') p = (d.camera && d.camera.pos) || VIEWS['3q'].pos;
    else if (VIEWS[name]) p = VIEWS[name].pos;
    else p = VIEWS['3q'].pos;
    if (name === '3q' && d.camera && d.camera.pos) p = d.camera.pos;
    const t = (d.camera && d.camera.target) || [0, 1.05, 0];
    this.camera.position.set(p[0], p[1], p[2]);
    this.controls.target.set(t[0], t[1], t[2]);
    this.controls.update();
    this.view = name;
  }

  toggleMuscles() {
    if (!this.ok) return false;
    this.showMuscles = !this.showMuscles;
    this.figure.highlight(this.showMuscles ? (this.def.highlight || []) : []);
    return this.showMuscles;
  }

  /* ---------------- video export ---------------- */
  canRecord() {
    return typeof MediaRecorder !== 'undefined' &&
      this.renderer && typeof this.renderer.domElement.captureStream === 'function';
  }

  /**
   * Record `loops` full repetitions of the current animation to a .webm file.
   * This is how the "video" for each exercise is produced — the clip is
   * rendered live and captured, so there are no video assets to host.
   */
  startRecording(loops = 2, onDone) {
    if (!this.canRecord() || this._rec) return false;
    const stream = this.renderer.domElement.captureStream(30);
    const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
    const mime = types.find((t) => MediaRecorder.isTypeSupported(t)) || '';
    const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 6000000 } : undefined);
    const chunks = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (this.key || 'exercise') + '.webm';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      this._rec = null;
      onDone && onDone();
    };
    this._rec = rec;
    this._recLoops = 0;
    this._recTarget = loops;
    this._recLast = 0;
    this.u = 0;
    this.playing = true;
    rec.start();
    return true;
  }

  stopRecording() {
    if (this._rec && this._rec.state !== 'inactive') this._rec.stop();
  }

  /* ---------------------------------------------------------- */
  resize() {
    if (!this.ok || this._disposed) return;
    const w = this.el.clientWidth || 800;
    const h = this.el.clientHeight || 520;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  dispose() {
    this._disposed = true;
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    this.stopRecording();
    if (!this.ok) return;
    this._clearProp();
    this.figure && this.figure.dispose();
    this.controls && this.controls.dispose();
    this.scene && this.scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry && o.geometry.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material && o.material.dispose();
      }
    });
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
  }
}
