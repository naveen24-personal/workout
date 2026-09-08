/* ============================================================
   dom.js — tiny helpers shared by every page
   ============================================================ */

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Build a DOM node from an HTML string. */
export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/** Fade-and-rise elements in as they scroll into view. */
export function revealAll(root = document) {
  const items = $$('.reveal', root);
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  items.forEach((i, n) => { i.style.transitionDelay = Math.min(n % 6, 5) * 55 + 'ms'; io.observe(i); });
}

/* ---------------- local storage ---------------- */
const KEY = 'atlaslab.v1';
export function store(patch) {
  const cur = load();
  const next = { ...cur, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) { /* private mode */ }
  return next;
}
export function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
}

export const TYPE_TAG = { push: 'push', pull: 'pull', legs: 'legs', rest: 'rest' };
