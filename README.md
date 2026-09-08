# ATLAS LAB — 6-day fat-loss & abs programme, in 3D

A single static website for a six-day push/pull/legs fat-loss programme, with an abs system,
a five-level pull-up progression, cardio and loading rules, and a calorie/protein calculator.

Every exercise is **animated live in 3D in the browser** — a rigged figure, hand-authored
keyframes, and gym equipment that tracks the body. There are no video files, no models to
download and no build step: 49 animations weigh a few kilobytes of JavaScript.

---

## Run it locally

No Node, no npm, no bundler. Just serve the folder (ES modules need HTTP, `file://` will not work):

```bash
cd gym
python -m http.server 8000
# then open http://localhost:8000
```

Anything else that serves static files works too (`npx serve`, VS Code Live Server, nginx).

---

## Deploy to Render (free static site)

1. Push this folder to GitHub (see *Git* below).
2. On [dashboard.render.com](https://dashboard.render.com): **New +** → **Static Site** → pick the repo.
3. Fill in exactly:

   | Field | Value |
   |---|---|
   | Name | `atlas-lab` (anything you like) |
   | Branch | `main` |
   | Build Command | *(leave completely empty)* |
   | Publish Directory | `.` |

4. **Create Static Site.** First deploy takes about a minute.

`render.yaml` in this folder already describes exactly that, so if you use Render Blueprints it
will configure itself. Every push to `main` redeploys automatically.

---

## What is in here

```
gym/
├── index.html            the app shell (nav, footer, import map)
├── tune.html             pose tuner — freeze a keyframe and drag the numbers
├── render.yaml           Render static-site config
├── css/style.css         the whole design system
├── vendor/               three.js r160 + OrbitControls, vendored (no CDN)
├── tools/check.mjs       validates data, clips and pose physics (needs Node)
└── js/
    ├── main.js           hash router
    ├── data/
    │   ├── plan.js       the 6-day week, warm-up, abs matrix, pull-up levels, rules
    │   └── exercises.js  49 exercises: setup, execution, cues, mistakes, tempo, rest
    ├── 3d/
    │   ├── rig.js        the articulated figure (19 joints, muscle highlighting)
    │   ├── props.js      benches, machines, cables, pull-up rig, leg press, treadmill
    │   ├── anim.js       pose kit (sit / recline / hang / plank …) + keyframe engine
    │   ├── clips_*.js    the animations, grouped push / pull / legs / core
    │   └── viewer.js     renderer, lighting, playback, camera presets, video capture
    └── ui/               player component and the pages
```

---

## How the animations work

There is no motion-capture data and no `.glb` model. The figure is built from code:

1. **The rig** (`js/3d/rig.js`) nests 19 `Object3D` joints — hips → spine → chest → arms/legs —
   with capsules for limbs and thin "muscle plates" that light up orange for the muscles an
   exercise trains.

2. **A clip** (`js/3d/clips_*.js`) is 4–6 hand-written poses. A pose is just joint rotations in
   degrees plus a root position, e.g.

   ```js
   { t: 0.48, label: 'Chin over the bar', tip: 'Lead with the chest…',
     pose: P(hangTop, S({ armR: [0, 0, -52], foreR: [0, 0, -118] })) }
   ```

   `S()` mirrors right-side joints onto the left, so symmetric movements are written once.
   `P()` merges partial poses. The engine (`anim.js`) blends between keyframes with a smoothstep,
   so a handful of positions become a smooth, loopable rep.

3. **Axis conventions** (memorise these before writing a pose):
   * `+Y` up, `+Z` is the direction the figure faces, `+X` is the figure's **left**.
   * Arms and legs hang **down** from their joint: `rx` negative swings forward, `rz` negative
     abducts the right limb away from the body (and is mirrored for the left).
   * The spine and neck point **up**: `rx` positive bends forward.
   * For an already-abducted arm, `rz` moves it in the frontal plane, `ry` sweeps it
     forward/back, and `rx` rolls it — which is how the elbow's bend plane is chosen.

4. **The equipment follows the body.** Props expose `update(ctx)` and receive the world positions
   of the hands, knees, feet and shoulders every frame, so machine handles, the lat bar, the leg
   press sled, cables and bands physically track the figure instead of drifting out of alignment.

### Adding or fixing an exercise

1. Add a clip to the right `js/3d/clips_*.js`.
2. Add an entry to `js/data/exercises.js` pointing at that clip (`clip: 'myNewClip'`).
3. Reference it from a day in `js/data/plan.js` if it belongs in the programme.
4. Open `tune.html`, pick the clip and keyframe, drag the numbers until it looks right, press
   **Copy pose** and paste the result back into the clip.
5. Run the checker:

   ```bash
   node tools/check.mjs
   ```

   It imports every module, validates joint names, prop names and every plan reference, then runs
   forward kinematics over all 49 animations and fails on anything physically impossible — a foot
   through the floor, hands drifting off the pull-up bar, a figure floating, feet sliding.

---

## Making video files of the exercises

**In the browser (the intended way).** Every player has a **REC** button. It captures the live
WebGL canvas with `MediaRecorder`, records exactly two full repetitions and downloads a `.webm`.
Because the animation is generated, the recording is always in sync and you can change the camera
angle, speed (0.25×/0.5×/1×) and muscle highlighting before you record.

Convert or trim with ffmpeg if you want to send it to someone or put it in a reel:

```bash
# webm -> mp4 (works everywhere, including WhatsApp and iPhones)
ffmpeg -i assisted-pullup.webm -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart assisted-pullup.mp4

# webm -> looping gif
ffmpeg -i cable-crunch.webm -vf "fps=20,scale=640:-1:flags=lanczos,palettegen" palette.png
ffmpeg -i cable-crunch.webm -i palette.png -lavfi "fps=20,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse" cable-crunch.gif
```

**Batch export (optional).** If you want all 49 clips as files without clicking, drive the same
page with headless Chrome:

```bash
npm i puppeteer            # one-off, only for this script
node tools/record.mjs      # writes ./clips/<exercise>.webm
```

**Other ways to generate exercise animations**, for reference, and why this project does not use them:

| Approach | What it involves | Trade-off |
|---|---|---|
| Procedural keyframes (**used here**) | Write joint angles in code | Tiny, editable, no assets, camera and speed are live |
| Mixamo + Blender | Download a rigged character, hand-animate, export `.glb` | Prettier characters, but ~5–15 MB per model and slow to edit |
| Motion capture | Film yourself, extract pose data | The most realistic, needs the exercise performed perfectly and a lot of clean-up |
| Stock video | Licence clips | Fastest, but no camera control, no slow-motion, no muscle highlighting, and licensing costs |

---

## Git

This folder is its own repository so the whole thing is the site root on Render.
Identity is set **locally** in `.git/config` — nothing global on the machine is changed:

```bash
cd gym
git remote -v            # should point at your workout repo
git push -u origin main
```

---

## The training content

The programme itself: six days (push / pull / legs, twice each), abs on four days, cardio after
every session, and a pull-up progression on Tuesday and Friday. The written guidance follows
mainstream strength and conditioning practice: work most sets 1–3 reps short of failure, rest 2–3
minutes on compounds and 60–90 seconds on isolation, control the eccentric for 2–3 seconds, and
accumulate at least 150 minutes of moderate aerobic activity a week alongside the lifting.

Two things the site repeats on purpose, because they decide the result:

* Ab training builds the abdominal muscles; it does **not** selectively burn belly fat.
* Fat loss comes from a sustained calorie deficit. The gym keeps the muscle you already have and
  builds more — the diet is what uncovers it.

This is training information, not medical advice.
