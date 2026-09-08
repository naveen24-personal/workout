/* ============================================================
   pages.js — home, the week, day sessions, exercise library
   Each page returns { html, mount(root) -> cleanup }
   ============================================================ */
import { DAYS, dayById, WARMUP, TECHNIQUE_RULES, REST_RULES, LOAD_RULES, FAT_LOSS_TRUTHS } from '../data/plan.js';
import { getEx, EX_LIST, GROUPS } from '../data/exercises.js';
import { playerMarkup, mountPlayer } from './player.js';
import { ExerciseViewer } from '../3d/viewer.js';
import { esc, $, $$, revealAll, store, load } from './dom.js';

/* ---------------- shared fragments ---------------- */
const exRow = (item, n) => {
  const ex = getEx(item.id);
  if (!ex) return '';
  return `<button class="exrow" data-ex="${esc(item.id)}">
    <span class="n">${n}</span>
    <span class="b"><b>${esc(ex.name)}</b><span>${esc(ex.group)} · ${esc(ex.equip)}</span></span>
    <span class="sets">${esc(item.sets || item.reps || '')}</span>
    <span class="play">&#9654;</span>
  </button>`;
};

const dayCard = (d) => `
  <a class="card hoverable daycard reveal" href="#/day/${d.id}">
    <div class="d-top">
      <span class="d-day">${esc(d.day)}</span>
      <span class="tag ${d.type}">${esc(d.type)}</span>
    </div>
    <h3>${esc(d.title)}</h3>
    <p class="d-sub">${esc(d.focus)}</p>
    <div class="d-meta">
      ${d.type === 'rest' ? '' : `<span class="tag abs">Abs ${esc(d.absTime)}</span>`}
      <span class="tag">${esc(d.cardio)}</span>
    </div>
    ${d.blocks.length ? `<div class="d-list">${d.blocks.map((b) =>
      `<span>${esc(b.name)}<i>${b.items.length} exercise${b.items.length > 1 ? 's' : ''}</i></span>`).join('')}</div>` : ''}
    <p class="go">${d.type === 'rest' ? 'Recovery notes' : 'Open the session'} &rarr;</p>
  </a>`;

/* ============================================================
   HOME
   ============================================================ */
export function homePage() {
  const html = `
  <section class="hero">
    <div id="hero-canvas"></div>
    <div class="wrap hero-inner">
      <div class="hero-grid">
        <div>
          <span class="eyebrow"><i></i>6 days · push / pull / legs · abs focus</span>
          <h1>Train it right,<br><span>see it in 3D.</span></h1>
          <p class="lede">A complete six-day fat-loss programme built around heavy compound lifting, four core
            sessions a week, steady cardio — and a five-level path to your first pull-up. Every exercise is
            animated live in 3D so you can see exactly how to sit, how to hold and how to move before you touch a machine.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#/plan">See the week &rarr;</a>
            <a class="btn btn-ghost" href="#/pullups">Get my first pull-up</a>
          </div>
          <div class="hero-stats">
            <div class="hstat"><b>6</b><span>training days</span></div>
            <div class="hstat"><b>4×</b><span>core sessions / week</span></div>
            <div class="hstat"><b>150+</b><span>cardio minutes / week</span></div>
            <div class="hstat"><b>49</b><span>animated exercises</span></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">The week</span>
        <h2>Six sessions, each with a job to do</h2>
        <p>Push, pull and legs twice each. Abs on four of the six days, cardio on all of them. Sunday is
        for walking and recovering — that is where the training you did turns into muscle.</p>
      </div>
      <div class="grid g3">${DAYS.map(dayCard).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Why this works</span>
        <h2>Four things worth being honest about</h2>
      </div>
      <div class="grid g2">
        ${FAT_LOSS_TRUTHS.map((f) => `
          <div class="card reveal">
            <h3>${esc(f.t)}</h3>
            <p class="fine" style="margin-top:10px">${esc(f.b)}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">How the animations are made</span>
        <h2>No stock footage. Every rep is generated.</h2>
        <p>A rigged 3D person driven by hand-written keyframes — the same technique games use — dressed so it
        looks like someone you would actually see in the gym rather than a robot. The equipment tracks the body in
        real time, so the handles, cables, sled and bar always follow the hands and feet instead of drifting. You
        can rotate the camera mid-rep, slow it to a quarter speed, scrub to any step, switch to the plain anatomy
        mannequin, and hit <b>REC</b> to save the movement as a video file for your phone.</p>
      </div>
      <div class="grid g3">
        <div class="card reveal"><h3>1 · A person, not a robot</h3><p class="fine" style="margin-top:8px">
          19 joints built from code, with skin, hair, a beard, a tee, relaxed jeans and trainers. Working muscles
          glow orange through the clothes, and one tap swaps the whole thing for a plain anatomy mannequin.</p></div>
        <div class="card reveal"><h3>2 · Keyframed reps</h3><p class="fine" style="margin-top:8px">
          Each exercise is 4–6 hand-authored positions, blended into a smooth loop with a labelled coaching step at every stage.</p></div>
        <div class="card reveal"><h3>3 · Recorded on demand</h3><p class="fine" style="margin-top:8px">
          The REC button captures the live canvas to a .webm video — no video files are hosted, so the site stays tiny and fast.</p></div>
      </div>
      <div style="margin-top:26px" class="reveal">
        <a class="btn btn-primary" href="#/library">Open the exercise lab &rarr;</a>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    const host = $('#hero-canvas', root);
    let viewer = null; let timer = null;
    try {
      viewer = new ExerciseViewer(host, { hero: true, transparent: true, showMuscles: true });
      const playlist = ['fullPullup', 'machineChestPress', 'cableCrunch', 'romanianDeadlift', 'latPulldown', 'gobletSquat'];
      let i = 0;
      viewer.load(playlist[0]);
      timer = setInterval(() => { i = (i + 1) % playlist.length; viewer.load(playlist[i]); }, 9000);
    } catch (e) { /* hero is decorative — never block the page */ }
    return () => { timer && clearInterval(timer); viewer && viewer.dispose(); };
  };

  return { html, mount, title: 'ATLAS LAB — 6-day fat loss & abs programme' };
}

/* ============================================================
   THE WEEK
   ============================================================ */
export function planPage() {
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>The week</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">The programme</span>
        <h2>Your 6-day week</h2>
        <p>Resistance training six days a week, core work on four of them, and cardio after every session.
        Do the sessions in this order — the pull days are spaced so your back and biceps are fresh for pull-up practice.</p>
      </div>

      <div class="tablewrap reveal" style="margin-bottom:36px">
        <table class="table">
          <thead><tr><th>Day</th><th>Main workout</th><th>Abs</th><th>Cardio</th></tr></thead>
          <tbody>
            ${DAYS.map((d) => `<tr>
              <td><b>${esc(d.day)}</b></td>
              <td><a href="#/day/${d.id}" style="color:var(--accent-2);font-weight:600">${esc(d.title)}</a>
                  <span class="fine"> — ${esc(d.focus)}</span></td>
              <td>${d.type === 'rest' ? '—' : '✓ ' + esc(d.absTime)}</td>
              <td>${esc(d.cardio)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="grid g3">${DAYS.map(dayCard).join('')}</div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Before every session</span>
        <h2>Warm-up · ${esc(WARMUP.time)}</h2>
        <p>${esc(WARMUP.treadmill)}</p>
      </div>
      <div class="grid g3">
        ${WARMUP.drills.map((d, i) => {
    const ex = getEx(d.id);
    return `<button class="exrow reveal" data-ex="${esc(d.id)}">
            <span class="n">${i + 1}</span>
            <span class="b"><b>${esc(ex ? ex.name : d.id)}</b><span>Dynamic warm-up</span></span>
            <span class="sets">${esc(d.reps)}</span><span class="play">&#9654;</span></button>`;
  }).join('')}
      </div>
      <div class="callout reveal" style="margin-top:20px">${esc(WARMUP.after)}</div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Non-negotiables</span>
        <h2>The five technique rules</h2>
      </div>
      <div class="grid g2">
        ${TECHNIQUE_RULES.map((r) => `
          <div class="card reveal">
            <div style="display:flex;gap:14px;align-items:flex-start">
              <span class="lv" style="width:40px;height:40px;border-radius:12px;display:grid;place-content:center;background:#141b24;border:1px solid var(--line);font-family:var(--display);font-weight:800;flex:none">${r.n}</span>
              <div><h3>${esc(r.title)}</h3><p class="fine" style="margin:8px 0 0">${esc(r.body)}</p></div>
            </div>
          </div>`).join('')}
      </div>

      <div class="grid g2" style="margin-top:16px">
        <div class="card reveal">
          <h3>How heavy should you lift?</h3>
          <p class="fine" style="margin:10px 0 14px">${esc(LOAD_RULES.headline)}</p>
          <ul class="cuelist">${LOAD_RULES.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>
        <div class="card reveal">
          <h3>Rest between sets</h3>
          ${REST_RULES.map((r) => `
            <div style="margin-top:14px">
              <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
                <b>${esc(r.kind)}</b><span class="mono" style="color:var(--accent-2)">${esc(r.time)}</span>
              </div>
              <p class="fine" style="margin:4px 0 0">${esc(r.ex)}</p>
            </div>`).join('')}
          <p class="fine" style="margin-top:16px">Do not rush your heavy sets just to burn more calories — that is
          what the cardio at the end is for.</p>
        </div>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (b) location.hash = '#/ex/' + b.dataset.ex;
    });
    return () => {};
  };
  return { html, mount, title: 'The 6-day week — ATLAS LAB' };
}

/* ============================================================
   ONE DAY
   ============================================================ */
export function dayPage(id) {
  const d = dayById(id);
  if (!d) return { html: `<div class="wrap section"><h2>Session not found</h2></div>`, mount: () => () => {} };

  if (d.type === 'rest') {
    const html = `
    <div class="wrap crumb"><a href="#/plan">The week</a> <span>/</span> <span>${esc(d.day)}</span></div>
    <section class="section" style="padding-top:26px"><div class="wrap">
      <span class="tag rest">Rest day</span>
      <h2 style="margin:14px 0">${esc(d.day)} — recover on purpose</h2>
      <p style="max-width:62ch;color:var(--ink-2)">${esc(d.blurb)}</p>
      <div class="grid g3" style="margin-top:26px">
        <div class="card"><h3>Walk 30–45 min</h3><p class="fine" style="margin-top:8px">Free calories with no
          recovery cost. Outside, on the treadmill, or just a long errand on foot.</p></div>
        <div class="card"><h3>Eat like a training day</h3><p class="fine" style="margin-top:8px">Protein at every
          meal. Recovery happens on rest days, and it needs material to work with.</p></div>
        <div class="card"><h3>Sleep 7–9 hours</h3><p class="fine" style="margin-top:8px">The single most
          underrated fat-loss and strength variable there is.</p></div>
      </div>
    </div></section>`;
    return { html, mount: () => () => {}, title: 'Sunday — ATLAS LAB' };
  }

  const first = d.blocks[0].items[0].id;
  let n = 0;
  const html = `
  <div class="wrap crumb"><a href="#/plan">The week</a> <span>/</span> <span>${esc(d.day)}</span></div>
  <section class="section" style="padding-top:22px">
    <div class="wrap">
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
        <span class="tag ${d.type}">${esc(d.type)}</span>
        <span class="tag abs">Abs ${esc(d.absTime)}</span>
        <span class="tag">${esc(d.cardio)}</span>
      </div>
      <h2>${esc(d.day)} — ${esc(d.title)}</h2>
      <p style="max-width:64ch;color:var(--ink-2);margin-top:10px">${esc(d.blurb)}</p>

      <div style="margin-top:26px" id="playerHost">${playerMarkup()}</div>

      <div class="grid g2" style="margin-top:26px;align-items:start">
        <div>
          ${d.blocks.map((b) => `
            <div style="margin-bottom:26px">
              <p class="mono" style="color:var(--ink-3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:10px">${esc(b.name)}</p>
              ${b.note ? `<div class="callout" style="margin-bottom:12px">${esc(b.note)}</div>` : ''}
              <div class="grid" style="gap:9px">${b.items.map((it) => exRow(it, ++n)).join('')}</div>
            </div>`).join('')}
        </div>
        <div>
          <div style="margin-bottom:26px">
            <p class="mono" style="color:var(--warn);letter-spacing:.2em;text-transform:uppercase;margin-bottom:10px">Abs · ${esc(d.absTime)}</p>
            <div class="grid" style="gap:9px">${d.abs.map((it) => exRow(it, ++n)).join('')}</div>
          </div>
          <div class="card">
            <h3>Finish with cardio</h3>
            <p class="fine" style="margin:10px 0 12px">${esc(d.cardio)}. Steady effort — you should be able to
            speak in short sentences but not hold a conversation.</p>
            <a class="btn btn-ghost btn-sm" href="#/cardio">Cardio settings &rarr;</a>
          </div>
          <div class="card" style="margin-top:16px">
            <h3>Session checklist</h3>
            <p class="fine" style="margin:8px 0 12px">Ticks are saved on this device.</p>
            <div id="checks" class="grid" style="gap:8px"></div>
            <button class="btn btn-ghost btn-sm" id="resetChecks" style="margin-top:14px">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    const host = $('#playerHost', root);
    const player = mountPlayer(host, first);

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (!b) return;
      $$('.exrow', root).forEach((r) => r.classList.remove('on'));
      b.classList.add('on');
      player.show(b.dataset.ex);
      const top = host.getBoundingClientRect().top + window.scrollY - 80;
      if (window.scrollY > top + 40 || window.scrollY < top - 400) window.scrollTo({ top, behavior: 'smooth' });
    });

    /* per-session checklist in localStorage */
    const all = [...d.blocks.flatMap((b) => b.items), ...d.abs];
    const box = $('#checks', root);
    const key = 'checks_' + d.id;
    const state = load()[key] || {};
    box.innerHTML = all.map((it) => {
      const ex = getEx(it.id);
      return `<label style="display:flex;gap:10px;align-items:center;font-size:.88rem;color:var(--ink-2);cursor:pointer">
        <button class="tick${state[it.id] ? ' on' : ''}" data-check="${esc(it.id)}">&#10003;</button>
        <span>${esc(ex ? ex.name : it.id)} <i class="mono" style="color:var(--ink-3);font-style:normal">${esc(it.sets)}</i></span>
      </label>`;
    }).join('');
    box.addEventListener('click', (e) => {
      const t = e.target.closest('[data-check]'); if (!t) return;
      e.preventDefault();
      const on = t.classList.toggle('on');
      state[t.dataset.check] = on;
      store({ [key]: state });
    });
    $('#resetChecks', root).onclick = () => {
      Object.keys(state).forEach((k) => delete state[k]);
      store({ [key]: {} });
      $$('[data-check]', box).forEach((t) => t.classList.remove('on'));
    };

    return () => player.dispose();
  };

  return { html, mount, title: `${d.day} · ${d.title} — ATLAS LAB` };
}

/* ============================================================
   EXERCISE LIBRARY
   ============================================================ */
export function libraryPage() {
  const groups = ['All', ...GROUPS];
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>Exercise lab</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">${EX_LIST.length} exercises</span>
        <h2>The exercise lab</h2>
        <p>Pick anything to see it animated in 3D with full setup, execution, cues and the mistakes to avoid.</p>
      </div>
      <div class="pill-row" id="filters">
        ${groups.map((g, i) => `<button class="chip${i === 0 ? ' on' : ''}" data-group="${esc(g)}">${esc(g)}</button>`).join('')}
      </div>
      <div class="grid g3" id="exGrid"></div>
    </div>
  </section>`;

  const mount = (root) => {
    const grid = $('#exGrid', root);
    const render = (group) => {
      const list = group === 'All' ? EX_LIST : EX_LIST.filter((e) => e.group === group);
      grid.innerHTML = list.map((e) => `
        <a class="card hoverable reveal" href="#/ex/${esc(e.id)}">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
            <h3 style="font-size:1.05rem">${esc(e.name)}</h3>
            <span class="play" style="width:30px;height:30px;border-radius:8px;background:#161d27;display:grid;place-content:center;color:var(--accent-2);flex:none;font-size:.7rem">&#9654;</span>
          </div>
          <div class="d-meta" style="margin:12px 0 10px">
            <span class="tag">${esc(e.group)}</span><span class="tag">${esc(e.equip)}</span>
          </div>
          <p class="fine">${esc((e.why || '').slice(0, 110))}${(e.why || '').length > 110 ? '…' : ''}</p>
        </a>`).join('');
      revealAll(grid);
    };
    render('All');
    $('#filters', root).onclick = (e) => {
      const b = e.target.closest('[data-group]'); if (!b) return;
      $$('[data-group]', root).forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      render(b.dataset.group);
    };
    revealAll(root);
    return () => {};
  };
  return { html, mount, title: 'Exercise lab — ATLAS LAB' };
}

/* ============================================================
   SINGLE EXERCISE
   ============================================================ */
export function exercisePage(id) {
  const ex = getEx(id);
  if (!ex) return { html: `<div class="wrap section"><h2>Exercise not found</h2><a class="btn btn-ghost" href="#/library">Back to the lab</a></div>`, mount: () => () => {} };
  const related = EX_LIST.filter((e) => e.group === ex.group && e.id !== id).slice(0, 3);

  const html = `
  <div class="wrap crumb"><a href="#/library">Exercise lab</a> <span>/</span> <span>${esc(ex.name)}</span></div>
  <section class="section" style="padding-top:22px">
    <div class="wrap">
      <div id="playerHost">${playerMarkup()}</div>
      ${related.length ? `
      <div style="margin-top:34px">
        <p class="mono" style="color:var(--ink-3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px">More ${esc(ex.group.toLowerCase())} work</p>
        <div class="grid g3">
          ${related.map((r) => `<a class="card hoverable" href="#/ex/${esc(r.id)}">
            <h3 style="font-size:1.02rem">${esc(r.name)}</h3>
            <div class="d-meta" style="margin-top:10px"><span class="tag">${esc(r.equip)}</span></div>
          </a>`).join('')}
        </div>
      </div>` : ''}
    </div>
  </section>`;

  const mount = (root) => {
    const player = mountPlayer($('#playerHost', root), id);
    return () => player.dispose();
  };
  return { html, mount, title: `${ex.name} — ATLAS LAB` };
}
