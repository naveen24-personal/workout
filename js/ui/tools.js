/* ============================================================
   tools.js — pull-up lab, abs system, cardio & load, your numbers
   ============================================================ */
import { PULLUP_LEVELS, PULLUP_RULE, ABS_MATRIX, ABS_RULES, CARDIO, CARDIO_NOTE, REST_RULES, LOAD_RULES, NUTRITION_RULES } from '../data/plan.js';
import { getEx } from '../data/exercises.js';
import { playerMarkup, mountPlayer } from './player.js';
import { esc, $, $$, revealAll, store, load } from './dom.js';

/* ============================================================
   PULL-UP LAB
   ============================================================ */
export function pullupPage() {
  const saved = load();
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>Pull-up lab</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Level 1 → 5</span>
        <h2>Getting your first pull-up</h2>
        <p>Do not keep jumping at the bar and failing — repeated failed attempts build very little. Instead you
        climb five levels, twice a week, on Tuesday and Friday, always at the start of the session while you are fresh.</p>
      </div>

      <div id="playerHost" class="reveal">${playerMarkup()}</div>

      <div class="grid" style="gap:14px;margin-top:30px">
        ${PULLUP_LEVELS.map((lv) => {
    const ex = getEx(lv.id);
    return `<div class="card level reveal" data-level="${lv.level}">
            <div class="lv">${lv.level}</div>
            <div>
              <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
                <h3>${esc(lv.title)}</h3>
                <span class="mono" style="color:var(--accent-2)">${esc(lv.goal)}</span>
              </div>
              <p class="fine" style="margin:8px 0 12px">${esc(lv.detail)}</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-ghost btn-sm" data-ex="${esc(lv.id)}">Watch in 3D</button>
                <a class="btn btn-ghost btn-sm" href="#/ex/${esc(lv.id)}">Full technique &rarr;</a>
                <button class="btn btn-ghost btn-sm" data-setlevel="${lv.level}">I am here</button>
              </div>
              ${(ex && ex.setup) ? `<ol class="steps" style="margin-top:14px">${ex.setup.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
            </div>
          </div>`;
  }).join('')}
      </div>

      <div class="grid g2" style="margin-top:26px;align-items:start">
        <div class="card reveal">
          <h3>${esc(PULLUP_RULE.title)}</h3>
          <p class="fine" style="margin:10px 0 14px">${esc(PULLUP_RULE.body)}</p>
          <div class="mono" style="display:grid;gap:6px;color:var(--ink-2)">
            ${PULLUP_RULE.example.map((e) => `<span>${esc(e)}</span>`).join('')}
          </div>
          <p class="fine" style="margin-top:14px">${esc(PULLUP_RULE.close)}</p>
        </div>

        <div class="card reveal">
          <h3>Assistance calculator</h3>
          <p class="fine" style="margin:8px 0 16px">Enter what you did on the assisted machine today and it will
          tell you whether to hold or drop the assistance.</p>
          <div class="field"><label>Assistance used (kg)</label><input type="number" id="pkg" value="${esc(saved.pkg ?? 40)}" min="0" max="120" step="2.5"></div>
          <div class="field"><label>Clean reps: set 1 / 2 / 3</label>
            <div style="display:flex;gap:8px">
              <input type="number" id="r1" value="${esc(saved.r1 ?? 8)}" min="0" max="30">
              <input type="number" id="r2" value="${esc(saved.r2 ?? 8)}" min="0" max="30">
              <input type="number" id="r3" value="${esc(saved.r3 ?? 7)}" min="0" max="30">
            </div>
          </div>
          <div class="result" id="pres"></div>
        </div>
      </div>

      <div class="card reveal" style="margin-top:16px">
        <h3>What a pull-up week looks like</h3>
        <div class="tablewrap" style="margin-top:14px;border:none;background:none">
          <table class="table">
            <thead><tr><th>Day</th><th>Level 1</th><th>Level 2</th><th>Level 3</th></tr></thead>
            <tbody>
              <tr><td><b>Tuesday</b></td><td>Scapular 3 × 5–8</td><td>Assisted 3 × 5–8</td><td>Negatives 2 × 3–5</td></tr>
              <tr><td><b>Friday</b></td><td>Scapular 2 × 6–8</td><td>Assisted 3 × 5–8</td><td>Negatives 3 × 3–5</td></tr>
            </tbody>
          </table>
        </div>
        <p class="fine" style="margin-top:12px">Everything else on pull day — pulldowns, rows, curls — supports this.
        The lat pulldown in particular is the same movement pattern with a load you choose, so treat it seriously.</p>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    const player = mountPlayer($('#playerHost', root), 'scap-pullup');

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (b) {
        player.show(b.dataset.ex);
        window.scrollTo({ top: $('#playerHost', root).getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        return;
      }
      const s = e.target.closest('[data-setlevel]');
      if (s) {
        const lvl = +s.dataset.setlevel;
        store({ pullupLevel: lvl });
        $$('.level', root).forEach((c) => c.classList.toggle('on', +c.dataset.level <= lvl));
      }
    });
    const cur = load().pullupLevel;
    if (cur) $$('.level', root).forEach((c) => c.classList.toggle('on', +c.dataset.level <= cur));

    /* assistance calculator */
    const out = $('#pres', root);
    const calc = () => {
      const kg = Math.max(0, +$('#pkg', root).value || 0);
      const reps = [+$('#r1', root).value || 0, +$('#r2', root).value || 0, +$('#r3', root).value || 0];
      store({ pkg: kg, r1: reps[0], r2: reps[1], r3: reps[2] });
      const min = Math.min(...reps);
      const total = reps.reduce((a, b) => a + b, 0);
      let verdict, next, tone;
      if (min >= 8) {
        verdict = 'Drop the assistance';
        next = Math.max(0, kg - 5) + ' kg next session';
        tone = 'hi';
      } else if (min >= 5) {
        verdict = 'Stay here and add reps';
        next = kg + ' kg — chase 8, 8, 8 first';
        tone = '';
      } else {
        verdict = 'Too little assistance';
        next = (kg + 5) + ' kg so you can hit 5–8 clean reps';
        tone = '';
      }
      const bw = load().weight ? Math.round((1 - kg / load().weight) * 100) : null;
      out.innerHTML = `
        <div class="r ${tone}"><span>Verdict</span><b>${esc(verdict)}</b></div>
        <div class="r"><span>Next session</span><b>${esc(next)}</b></div>
        <div class="r"><span>Total clean reps</span><b>${total}</b></div>
        ${bw !== null && bw > 0 ? `<div class="r"><span>You are lifting roughly</span><b>${bw}% of bodyweight</b></div>` : ''}
        <p class="fine">Zero assistance is a full pull-up. Reduce in small steps — 5 kg at a time — and never at the
        cost of form.</p>`;
    };
    ['#pkg', '#r1', '#r2', '#r3'].forEach((s) => { $(s, root).addEventListener('input', calc); });
    calc();

    return () => player.dispose();
  };
  return { html, mount, title: 'Pull-up lab — ATLAS LAB' };
}

/* ============================================================
   ABS SYSTEM
   ============================================================ */
export function absPage() {
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>Abs system</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Core · 4 sessions a week</span>
        <h2>The abs system</h2>
        <p>Your abs get trained on four days a week, for 10–15 minutes, using four different movement patterns.
        That builds a genuinely strong, thick core — far better than a thousand identical sit-ups.</p>
      </div>

      <div class="callout reveal" style="margin-bottom:26px">
        <b>Read this first.</b> Ab exercises strengthen and develop the abdominal muscles, but they do not
        selectively burn belly fat. Fat loss comes from an overall calorie deficit, resistance training and
        aerobic activity. Train the abs to build them — use the diet and the cardio to reveal them.
      </div>

      <div id="playerHost" class="reveal">${playerMarkup()}</div>

      <div class="grid g2" style="margin-top:30px">
        ${ABS_MATRIX.map((m) => `
          <div class="card reveal">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
              <h3>${esc(m.pattern)}</h3>
            </div>
            <p class="fine" style="margin:10px 0 14px">${esc(m.what)}</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${m.ex.map((id) => {
    const ex = getEx(id);
    return `<button class="btn btn-ghost btn-sm" data-ex="${esc(id)}">${esc(ex ? ex.name : id)}</button>`;
  }).join('')}
            </div>
          </div>`).join('')}
      </div>

      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card reveal">
          <h3>The rules</h3>
          <ul class="cuelist" style="margin-top:12px">${ABS_RULES.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
        </div>
        <div class="card reveal">
          <h3>A 15-minute core block</h3>
          <div class="tablewrap" style="border:none;background:none;margin-top:10px">
            <table class="table">
              <tbody>
                <tr><td><b>Cable crunch</b><br><span class="fine">Loaded flexion</span></td><td>3 × 12–15</td></tr>
                <tr><td><b>Hanging knee raise</b><br><span class="fine">Lower abs</span></td><td>3 × 8–12</td></tr>
                <tr><td><b>Plank</b><br><span class="fine">Anti-extension</span></td><td>3 × 30–60 s</td></tr>
              </tbody>
            </table>
          </div>
          <p class="fine" style="margin-top:12px">Swap in the reverse crunch, dead bug, side plank or bicycle crunch
          on the other days so all four patterns get covered across the week.</p>
        </div>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    const player = mountPlayer($('#playerHost', root), 'cable-crunch');
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]'); if (!b) return;
      player.show(b.dataset.ex);
      window.scrollTo({ top: $('#playerHost', root).getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
    return () => player.dispose();
  };
  return { html, mount, title: 'Abs system — ATLAS LAB' };
}

/* ============================================================
   CARDIO & LOAD (with a rest timer)
   ============================================================ */
export function cardioPage() {
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>Cardio &amp; load</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">After every session</span>
        <h2>Cardio, loading and rest</h2>
        <p>${esc(CARDIO_NOTE)}</p>
      </div>

      <div id="playerHost" class="reveal">${playerMarkup()}</div>

      <div class="grid g3" style="margin-top:30px">
        ${CARDIO.map((c) => `
          <div class="card reveal">
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline">
              <h3>${esc(c.name)}</h3><span class="mono" style="color:var(--accent-2)">${esc(c.time)}</span>
            </div>
            <p class="fine" style="margin:10px 0 12px">${esc(c.detail)}</p>
            <span class="tag">${esc(c.when)}</span>
          </div>`).join('')}
      </div>

      <div class="grid g2" style="margin-top:26px;align-items:start">
        <div class="card reveal">
          <h3>How heavy should you lift?</h3>
          <p class="fine" style="margin:10px 0 14px">${esc(LOAD_RULES.headline)}</p>
          <ul class="cuelist">${LOAD_RULES.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>

        <div class="card reveal">
          <h3>Rest timer</h3>
          <p class="fine" style="margin:8px 0 16px">
            ${REST_RULES.map((r) => `<b style="color:var(--ink)">${esc(r.kind)}</b> — ${esc(r.time)}`).join('<br>')}
          </p>
          <div class="timer-face" id="timerFace">2:00</div>
          <div class="pill-row" style="justify-content:center;margin:18px 0 0">
            <button class="chip" data-t="60">60 s</button>
            <button class="chip on" data-t="120">2 min</button>
            <button class="chip" data-t="180">3 min</button>
          </div>
          <div class="cta-row" style="justify-content:center;margin-top:6px">
            <button class="btn btn-primary btn-sm" id="tStart">Start</button>
            <button class="btn btn-ghost btn-sm" id="tReset">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    const player = mountPlayer($('#playerHost', root), 'incline-walk');

    /* rest timer */
    const face = $('#timerFace', root);
    let total = 120; let left = 120; let iv = null;
    const paint = () => {
      const m = Math.floor(left / 60); const s = left % 60;
      face.textContent = `${m}:${String(s).padStart(2, '0')}`;
      face.classList.toggle('ring', left === 0);
    };
    const stop = () => { clearInterval(iv); iv = null; $('#tStart', root).textContent = 'Start'; };
    $('#tStart', root).onclick = () => {
      if (iv) { stop(); return; }
      $('#tStart', root).textContent = 'Pause';
      iv = setInterval(() => {
        left = Math.max(0, left - 1); paint();
        if (left === 0) {
          stop();
          try {
            const ac = new (window.AudioContext || window.webkitAudioContext)();
            const o = ac.createOscillator(); const g = ac.createGain();
            o.connect(g); g.connect(ac.destination); o.frequency.value = 880;
            g.gain.setValueAtTime(0.001, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
            o.start(); o.stop(ac.currentTime + 0.62);
          } catch (e) { /* audio blocked */ }
        }
      }, 1000);
    };
    $('#tReset', root).onclick = () => { stop(); left = total; paint(); };
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-t]'); if (!b) return;
      $$('[data-t]', root).forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      stop(); total = +b.dataset.t; left = total; paint();
    });
    paint();

    return () => { stop(); player.dispose(); };
  };
  return { html, mount, title: 'Cardio & load — ATLAS LAB' };
}

/* ============================================================
   YOUR NUMBERS
   ============================================================ */
export function youPage() {
  const s = load();
  const html = `
  <div class="wrap crumb"><a href="#/">Home</a> <span>/</span> <span>Your numbers</span></div>
  <section class="section" style="padding-top:26px">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Personalise it</span>
        <h2>Your calorie and protein targets</h2>
        <p>The gym builds and keeps the muscle; the calorie deficit is what actually removes the fat. These
        numbers are an estimate to start from — track your weight for two weeks and adjust from what the scale
        and the mirror actually do.</p>
      </div>

      <div class="grid g2" style="align-items:start">
        <div class="card reveal">
          <h3>About you</h3>
          <div style="margin-top:16px">
            <div class="grid g2" style="gap:0 14px">
              <div class="field"><label>Age</label><input type="number" id="age" value="${esc(s.age ?? 28)}" min="14" max="90"></div>
              <div class="field"><label>Sex</label><select id="sex">
                <option value="m"${s.sex !== 'f' ? ' selected' : ''}>Male</option>
                <option value="f"${s.sex === 'f' ? ' selected' : ''}>Female</option>
              </select></div>
              <div class="field"><label>Height (cm)</label><input type="number" id="height" value="${esc(s.height ?? 172)}" min="130" max="220"></div>
              <div class="field"><label>Weight (kg)</label><input type="number" id="weight" value="${esc(s.weight ?? 78)}" min="35" max="220" step="0.5"></div>
              <div class="field"><label>Daily steps</label><input type="number" id="steps" value="${esc(s.steps ?? 6000)}" min="0" max="30000" step="500"></div>
              <div class="field"><label>Months training</label><input type="number" id="months" value="${esc(s.months ?? 2)}" min="0" max="240"></div>
            </div>
          </div>
          <p class="fine">Saved on this device only. Nothing is uploaded anywhere.</p>
        </div>

        <div>
          <div class="card reveal">
            <h3>Your targets</h3>
            <div class="result" id="numbers" style="margin-top:16px"></div>
          </div>
          <div class="card reveal" style="margin-top:16px">
            <h3>How to eat it</h3>
            <ul class="cuelist" style="margin-top:12px">${NUTRITION_RULES.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
          </div>
        </div>
      </div>

      <div class="card reveal" style="margin-top:16px">
        <h3>Where you are in the programme</h3>
        <p class="fine" style="margin:10px 0 14px" id="expNote"></p>
        <div class="progress-track"><i id="expBar" style="width:0%"></i></div>
        <p class="fine">Twelve weeks of consistent training is the point where most people stop being a beginner —
        strength jumps, technique becomes automatic, and the first pull-up usually arrives somewhere in there.</p>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    revealAll(root);
    const ids = ['age', 'sex', 'height', 'weight', 'steps', 'months'];
    const out = $('#numbers', root);

    const calc = () => {
      const v = {};
      ids.forEach((i) => { const n = $('#' + i, root); v[i] = n.type === 'number' ? +n.value : n.value; });
      store(v);

      const { age, sex, height, weight, steps, months } = v;
      if (!age || !height || !weight) return;

      /* Mifflin-St Jeor */
      const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + (sex === 'f' ? -161 : 5));
      /* activity factor from daily steps, plus six lifting sessions */
      let f = 1.2;
      if (steps >= 4000) f = 1.32;
      if (steps >= 7500) f = 1.42;
      if (steps >= 10000) f = 1.52;
      if (steps >= 13000) f = 1.6;
      const tdee = Math.round(bmr * f + 130);            /* ~130 kcal/day averaged from 6 gym sessions */
      const target = Math.max(Math.round(tdee * 0.8), Math.round(bmr * 1.05));
      const deficit = tdee - target;
      const perWeek = (deficit * 7 / 7700);
      const protein = Math.round(weight * 2.0);
      const fat = Math.round(weight * 0.8);
      const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));

      out.innerHTML = `
        <div class="r"><span>Resting metabolic rate</span><b>${bmr} kcal</b></div>
        <div class="r"><span>Maintenance (with this plan)</span><b>${tdee} kcal</b></div>
        <div class="r hi"><span>Fat-loss target</span><b>${target} kcal</b></div>
        <div class="r"><span>Expected rate</span><b>${perWeek.toFixed(2)} kg / week</b></div>
        <div class="r"><span>Protein</span><b>${protein} g</b></div>
        <div class="r"><span>Fat</span><b>${fat} g</b></div>
        <div class="r"><span>Carbohydrate</span><b>${carbs} g</b></div>
        <p class="fine">Roughly a 20% deficit — aggressive enough to see progress, gentle enough to keep your
        strength and your muscle. If your weight has not moved in two weeks, take 150–200 kcal off, or add 2,000
        steps a day, rather than cutting hard.</p>`;

      const pct = Math.min(100, Math.round((months / 12) * 100));
      $('#expBar', root).style.width = pct + '%';
      $('#expNote', root).textContent = months < 3
        ? `${months} month${months === 1 ? '' : 's'} in — you are in the phase where technique matters more than weight. Add a little load every week and it will come fast.`
        : months < 12
          ? `${months} months in — you should now be adding weight to the big lifts steadily and chasing the pull-up progression hard.`
          : `${months} months in — progress slows and precision matters: track your sets, push close to failure, and keep the deficit modest.`;
    };

    ids.forEach((i) => $('#' + i, root).addEventListener('input', calc));
    calc();
    return () => {};
  };
  return { html, mount, title: 'Your numbers — ATLAS LAB' };
}
