/* ============================================================
   main.js — hash router and shell wiring
   ============================================================ */
import { homePage, planPage, dayPage, libraryPage, exercisePage } from './ui/pages.js';
import { pullupPage, absPage, cardioPage, youPage } from './ui/tools.js';
import { $, $$ } from './ui/dom.js';

const view = $('#view');
let cleanup = null;

const ROUTES = [
  [/^\/?$/, () => homePage()],
  [/^\/plan$/, () => planPage()],
  [/^\/day\/([a-z]+)$/, (m) => dayPage(m[1])],
  [/^\/library$/, () => libraryPage()],
  [/^\/ex\/([a-z0-9-]+)$/, (m) => exercisePage(m[1])],
  [/^\/pullups$/, () => pullupPage()],
  [/^\/abs$/, () => absPage()],
  [/^\/cardio$/, () => cardioPage()],
  [/^\/you$/, () => youPage()]
];

function resolve(path) {
  for (const [re, fn] of ROUTES) {
    const m = path.match(re);
    if (m) return fn(m);
  }
  return {
    html: `<section class="section"><div class="wrap">
      <h2>That page does not exist</h2>
      <p class="fine" style="margin:12px 0 20px">The link may be out of date.</p>
      <a class="btn btn-primary" href="#/">Back to the start</a></div></section>`,
    mount: () => () => {}
  };
}

function markNav(path) {
  const base = '#/' + (path.replace(/^\//, '').split('/')[0] || '');
  $$('#nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('on', href === base || (base === '#/' && href === '#/'));
  });
}

function render() {
  const path = (location.hash || '#/').replace(/^#/, '') || '/';

  if (cleanup) { try { cleanup(); } catch (e) { console.warn(e); } cleanup = null; }

  const page = resolve(path);
  view.innerHTML = page.html;
  document.title = page.title || 'ATLAS LAB';
  markNav(path);

  try {
    cleanup = page.mount ? page.mount(view) : null;
  } catch (err) {
    console.error('[page mount]', err);
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
  $('#nav').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
}

/* ---------- shell ---------- */
$('#burger').addEventListener('click', () => {
  const nav = $('#nav');
  const open = nav.classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);

render();

/* fade the loader once the first page (and the fonts) are in */
window.addEventListener('load', () => {
  setTimeout(() => $('#loader').classList.add('done'), 220);
});
setTimeout(() => $('#loader').classList.add('done'), 2600);   /* safety net */
