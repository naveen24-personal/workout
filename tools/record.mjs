/* ============================================================
   tools/record.mjs — batch-export every exercise animation
   ------------------------------------------------------------
     npm i puppeteer
     node tools/record.mjs             all exercises
     node tools/record.mjs assisted-pullup cable-crunch
     node tools/record.mjs --loops 3 --out ./clips

   It serves this folder, opens each exercise page in headless
   Chrome, presses the site's own REC button and saves the .webm
   Chrome downloads. Same capture path as clicking REC yourself,
   so the output is identical — just unattended.

   Optional. The site itself needs no Node at all.
   ============================================================ */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ---- args ---- */
const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  if (i === -1) return dflt;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const loops = Number(flag('loops', 2));
const outDir = path.resolve(root, flag('out', 'clips'));
const only = argv.filter((a) => !a.startsWith('--'));

/* ---- which exercises ---- */
const { EX } = await import(pathToFileURL(path.join(root, 'js', 'data', 'exercises.js')).href)
  .catch(async () => {
    /* exercises.js has no three import, but fall back to a crude parse if that ever changes */
    const src = fs.readFileSync(path.join(root, 'js', 'data', 'exercises.js'), 'utf8');
    return { EX: Object.fromEntries([...src.matchAll(/^\s*'([a-z0-9-]+)':\s*\{/gm)].map((m) => [m[1], {}])) };
  });
const ids = (only.length ? only : Object.keys(EX)).filter((id) => EX[id]);
if (!ids.length) { console.error('No matching exercises.'); process.exit(1); }

/* ---- static server ---- */
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

/* ---- browser ---- */
const { default: puppeteer } = await import('puppeteer').catch(() => {
  console.error('puppeteer is not installed.  Run:  npm i puppeteer');
  process.exit(1);
});

fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--enable-webgl', '--ignore-gpu-blocklist', '--window-size=1280,720']
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
const cdp = await page.createCDPSession();
await cdp.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: outDir });

for (const id of ids) {
  process.stdout.write(`  ${id} … `);
  try {
    await page.goto(`${base}/#/ex/${id}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));   /* let the first frames settle */
    const dur = await page.evaluate(() => {
      const b = document.querySelector('#btnRec');
      if (!b || b.style.display === 'none') return 0;
      b.click();
      return 4.5;
    });
    if (!dur) { console.log('skipped (no recorder in this browser)'); continue; }
    await page.evaluate((ms) => new Promise((r) => setTimeout(r, ms)), (dur * loops + 3) * 1000);
    console.log('saved');
  } catch (err) {
    console.log('failed — ' + err.message);
  }
}

await browser.close();
server.close();
console.log(`\nDone. Files are in ${outDir}`);
console.log('Convert to mp4:  ffmpeg -i file.webm -c:v libx264 -pix_fmt yuv420p -crf 20 file.mp4');
