/* ============================================================
   player.js — the 3D exercise player
   Stage + transport controls on the left, coaching notes on the
   right. One live viewer at a time; switching exercise reuses it.
   ============================================================ */
import { ExerciseViewer, VIEWS } from '../3d/viewer.js';
import { getEx } from '../data/exercises.js';
import { esc, el, $, $$, store, load } from './dom.js';

const SPEEDS = [0.25, 0.5, 1];

export function playerMarkup() {
  return `
  <div class="player" id="player">
    <div class="stage" id="stage">
      <div class="stage-badge" id="stageBadge"></div>
      <div class="stage-phase" id="stagePhase"><b></b><span></span></div>
      <div class="controls">
        <div class="scrub" id="scrub">
          <div class="scrub-fill" id="scrubFill"></div>
          <div class="scrub-marks" id="scrubMarks"></div>
        </div>
        <div class="ctrl-row">
          <button class="iconbtn" id="btnPrev" title="Previous step" aria-label="Previous step">&#9198;</button>
          <button class="iconbtn on" id="btnPlay" title="Play / pause" aria-label="Play or pause">&#10074;&#10074;</button>
          <button class="iconbtn" id="btnNext" title="Next step" aria-label="Next step">&#9197;</button>
          <span class="ctrl-spacer"></span>
          <div class="ctrl-row" id="speeds"></div>
          <div class="ctrl-row" id="views"></div>
          <button class="chip" id="btnStyle" title="Switch between the avatar and the plain mannequin">ANATOMY</button>
          <button class="chip on" id="btnMuscles" title="Highlight the working muscles">MUSCLES</button>
          <button class="chip" id="btnRec" title="Record this animation as a video file">REC</button>
        </div>
      </div>
    </div>
    <aside class="pside" id="pside"></aside>
  </div>`;
}

/**
 * Mount the player into a host element.
 * @param {HTMLElement} host  container that already holds playerMarkup()
 * @param {string} exId       exercise id from data/exercises.js
 */
export function mountPlayer(host, exId) {
  const stage = $('#stage', host);
  const phaseBox = $('#stagePhase', host);
  const fill = $('#scrubFill', host);
  const marks = $('#scrubMarks', host);
  const side = $('#pside', host);
  const badge = $('#stageBadge', host);

  const viewer = new ExerciseViewer(stage, {
    onPhase: (ph) => {
      phaseBox.querySelector('b').textContent = ph.label || '';
      const span = phaseBox.querySelector('span');
      span.textContent = ph.tip || '';
      span.style.display = ph.tip ? '' : 'none';
    },
    onProgress: (u) => { fill.style.width = (u * 100).toFixed(1) + '%'; }
  });

  /* ---- transport ---- */
  const btnPlay = $('#btnPlay', host);
  const setPlayIcon = () => { btnPlay.innerHTML = viewer.playing ? '&#10074;&#10074;' : '&#9654;'; btnPlay.classList.toggle('on', viewer.playing); };
  btnPlay.onclick = () => { viewer.toggle(); setPlayIcon(); };
  $('#btnPrev', host).onclick = () => { viewer.step(-1); setPlayIcon(); };
  $('#btnNext', host).onclick = () => { viewer.step(1); setPlayIcon(); };

  const scrub = $('#scrub', host);
  const seekFromEvent = (e) => {
    const r = scrub.getBoundingClientRect();
    const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width;
    viewer.pause(); setPlayIcon();
    viewer.seek(Math.min(Math.max(x, 0), 0.999));
  };
  scrub.addEventListener('pointerdown', (e) => {
    seekFromEvent(e);
    const move = (ev) => seekFromEvent(ev);
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });

  /* speed + view chips */
  const speeds = $('#speeds', host);
  speeds.innerHTML = SPEEDS.map((s) => `<button class="chip${s === 1 ? ' on' : ''}" data-sp="${s}">${s === 1 ? '1×' : s + '×'}</button>`).join('');
  speeds.onclick = (e) => {
    const b = e.target.closest('[data-sp]'); if (!b) return;
    $$('[data-sp]', speeds).forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    viewer.setSpeed(parseFloat(b.dataset.sp));
  };

  const views = $('#views', host);
  views.innerHTML = Object.entries(VIEWS).map(([k, v]) =>
    `<button class="chip${k === '3q' ? ' on' : ''}" data-view="${k}">${esc(v.name)}</button>`).join('');
  views.onclick = (e) => {
    const b = e.target.closest('[data-view]'); if (!b) return;
    $$('[data-view]', views).forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    viewer.setView(b.dataset.view);
  };

  const btnStyle = $('#btnStyle', host);
  btnStyle.onclick = () => {
    const style = viewer.toggleStyle();
    btnStyle.textContent = style === 'avatar' ? 'ANATOMY' : 'AVATAR';
    btnStyle.classList.toggle('on', style === 'anatomy');
    store({ figureStyle: style });
  };
  if (load().figureStyle === 'anatomy') {
    viewer.setStyle('anatomy');
    btnStyle.textContent = 'AVATAR';
    btnStyle.classList.add('on');
  }

  const btnMus = $('#btnMuscles', host);
  btnMus.onclick = () => { btnMus.classList.toggle('on', viewer.toggleMuscles()); };

  /* ---- video export ---- */
  const btnRec = $('#btnRec', host);
  if (!viewer.canRecord || !viewer.canRecord()) {
    btnRec.style.display = 'none';
  } else {
    btnRec.onclick = () => {
      if (btnRec.dataset.on) { viewer.stopRecording(); return; }
      const started = viewer.startRecording(2, () => {
        delete btnRec.dataset.on;
        btnRec.innerHTML = 'REC';
        btnRec.classList.remove('on');
      });
      if (started) {
        btnRec.dataset.on = '1';
        btnRec.innerHTML = '<span class="rec-dot"></span>RECORDING';
        btnRec.classList.add('on');
        setPlayIcon();
      }
    };
  }

  /* ---- load an exercise ---- */
  function show(id) {
    const ex = getEx(id);
    if (!ex) return;
    const def = viewer.load(ex.clip);
    viewer.play(); setPlayIcon();

    /* keyframe ticks on the scrub bar */
    if (viewer.clip) {
      marks.innerHTML = viewer.clip.markers()
        .map((m) => `<i style="left:${(m * 100).toFixed(1)}%"></i>`).join('');
    }

    badge.innerHTML = `<span class="tag">${esc(ex.group)}</span><span class="tag">${esc(ex.equip)}</span>` +
      ((def && def.highlight) ? `<span class="tag abs">${esc(def.highlight.slice(0, 3).join(' · '))}</span>` : '');

    side.innerHTML = `
      <h3>${esc(ex.name)}</h3>
      <p class="fine">${esc(ex.why || '')}</p>
      <div class="p-meta">
        <span class="tag">${esc(ex.pattern)}</span>
        <span class="tag">Tempo ${esc(ex.tempo || '—')}</span>
        <span class="tag">Rest ${esc(ex.rest || '—')}</span>
      </div>
      <div class="pblock">
        <p class="h">Set up — how to sit &amp; how to hold</p>
        <ol class="steps">${(ex.setup || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      </div>
      <div class="pblock">
        <p class="h">Execute — the rep itself</p>
        <ol class="steps">${(ex.execute || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      </div>
      <div class="pblock">
        <p class="h">Cues to repeat in your head</p>
        <ul class="cuelist">${(ex.cues || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
      <div class="pblock">
        <p class="h">Common mistakes</p>
        <ul class="cuelist bad">${(ex.mistakes || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
      <div class="pblock">
        <p class="h">Drag to rotate · scroll to zoom · scrub to step through</p>
        <p class="fine">Press <b>REC</b> to save this animation as a video file you can keep on your phone.</p>
      </div>`;
    side.scrollTop = 0;
    host.dataset.ex = id;
  }

  show(exId);

  return {
    viewer,
    show,
    dispose() { viewer.dispose(); }
  };
}
