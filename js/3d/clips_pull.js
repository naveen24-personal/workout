/* ============================================================
   clips_pull.js — back, rear delts, biceps, and the whole
   pull-up progression (levels 1 to 5).
   ============================================================ */
import { S, P, sit, stand, hang } from './anim.js';

/* --- pull-up geometry -------------------------------------------------
   The hands stay on the bar, so each rung of the movement needs its own
   root height. These numbers come from the rig's arm length: the body
   rises about 54 cm between a dead hang and chin-over-bar.            */
const BAR = 2.32;
const legsTuckedBack = S({ thighR: [16, 0, -5], shinR: [64, 0, 0], footR: [-24, 0, 0] });

const hangLow = P(
  { root: { p: [0, 0.37, 0], r: [0, 0, 0] } },
  S({ clavR: [0, 0, -15], armR: [0, 0, -166], foreR: [0, 0, -6] }),
  legsTuckedBack
);
const hangPacked = P(
  { root: { p: [0, 0.44, 0], r: [0, 0, 0] } },
  S({ clavR: [0, 0, 9], armR: [0, 0, -166], foreR: [0, 0, -4] }),
  legsTuckedBack
);
const pullMid = P(
  { root: { p: [0, 0.55, 0], r: [0, 0, 0] } },
  { spine: [-4, 0, 0], chest: [-6, 0, 0] },
  S({ clavR: [0, 0, 6], armR: [0, 0, -120], foreR: [0, 0, -70] }),
  legsTuckedBack
);
const pullTop = P(
  { root: { p: [0, 0.83, 0], r: [0, 0, 0] } },
  { spine: [-7, 0, 0], chest: [-10, 0, 0], neck: [-8, 0, 0] },
  S({ clavR: [0, 0, 8], armR: [0, 0, -52], foreR: [0, 0, -118] }),
  legsTuckedBack
);

export const PULL_CLIPS = {

  /* ---------------------------- back ---------------------------- */
  latPulldown: {
    prop: 'pulldown',
    highlight: ['lats', 'biceps'],
    camera: { pos: [2.5, 1.7, 2.4], target: [0, 1.25, 0.2] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — long arms, chest up', tip: 'Thigh pads snug so you stay seated. Grip just outside shoulder width, let the shoulders rise, then lift the chest toward the bar.', pose: P(sit(0.5), { spine: [-4, 0, 0], chest: [-6, 0, 0] }, S({ clavR: [0, 0, -12], armR: [0, 0, -158], foreR: [0, 0, -8] })) },
      { t: 0.20, label: 'Pull the shoulder blades down first', tip: 'Before the elbows bend, pull your shoulders away from your ears. This is what switches the lats on.', pose: P(sit(0.5), { spine: [-5, 0, 0], chest: [-7, 0, 0] }, S({ clavR: [0, 0, 8], armR: [0, 0, -152], foreR: [0, 0, -12] })) },
      { t: 0.42, label: 'Drive the elbows down to your ribs', tip: 'Think about pulling your elbows into your back pockets — the hands are just hooks.', pose: P(sit(0.5), { spine: [-6, 0, 0], chest: [-9, 0, 0] }, S({ clavR: [0, 0, 8], armR: [0, 0, -96], foreR: [0, 0, -62] })) },
      { t: 0.55, label: 'Bar to the collarbone, hold a beat', tip: 'Stop at the top of your chest. Never behind the neck. Squeeze, then reverse.', pose: P(sit(0.5), { spine: [-8, 0, 0], chest: [-11, 0, 0] }, S({ clavR: [0, 0, 8], armR: [0, 0, -58], foreR: [0, 0, -96] })) },
      { t: 0.66, label: 'Let it rise for 3 seconds', tip: 'Follow the bar up, finishing with the shoulders stretched overhead. No slamming the stack.', pose: P(sit(0.5), { spine: [-8, 0, 0], chest: [-11, 0, 0] }, S({ clavR: [0, 0, 8], armR: [0, 0, -58], foreR: [0, 0, -96] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.5), { spine: [-4, 0, 0], chest: [-6, 0, 0] }, S({ clavR: [0, 0, -12], armR: [0, 0, -158], foreR: [0, 0, -8] })) }
    ]
  },

  singleArmLatPulldown: {
    prop: 'pulldown',
    attach: { handR: 'dHandle' },
    highlight: ['lats', 'biceps', 'obliques'],
    camera: { pos: [2.6, 1.7, 2.2], target: [0, 1.2, 0.2] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — one handle, arm fully overhead', tip: 'Sit slightly off-centre, free hand on the thigh pad. Let the working shoulder stretch upward.', pose: P(sit(0.5), { spine: [0, 0, -5] }, { clavR: [0, 0, -14], armR: [0, 0, -162], foreR: [0, 0, -6], armL: [-16, 0, 34], foreL: [-58, 0, -14] }) },
      { t: 0.40, label: 'Pull the elbow down and back', tip: 'Because one arm works alone you get a longer range — pull until the handle is beside your ribs.', pose: P(sit(0.5), { spine: [0, 0, 4] }, { clavR: [0, 0, 8], armR: [0, 0, -88], foreR: [0, 0, -68], armL: [-16, 0, 34], foreL: [-58, 0, -14] }) },
      { t: 0.55, label: 'Squeeze the lat', tip: 'Elbow finishes below and slightly behind the shoulder. Don’t twist the whole torso to get there.', pose: P(sit(0.5), { spine: [0, 0, 6] }, { clavR: [0, 0, 10], armR: [0, 0, -46], foreR: [0, 0, -112], armL: [-16, 0, 34], foreL: [-58, 0, -14] }) },
      { t: 0.66, label: 'Control the stretch back', tip: 'Let the shoulder travel all the way up again before the next rep. Then swap sides.', pose: P(sit(0.5), { spine: [0, 0, 6] }, { clavR: [0, 0, 10], armR: [0, 0, -46], foreR: [0, 0, -112], armL: [-16, 0, 34], foreL: [-58, 0, -14] }) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.5), { spine: [0, 0, -5] }, { clavR: [0, 0, -14], armR: [0, 0, -162], foreR: [0, 0, -6], armL: [-16, 0, 34], foreL: [-58, 0, -14] }) }
    ]
  },

  seatedCableRow: {
    prop: 'row',
    highlight: ['lats', 'traps', 'biceps'],
    camera: { pos: [2.7, 1.4, 1.6], target: [0, 0.95, 0.35] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — arms long, slight forward lean', tip: 'Feet on the plate, knees softly bent. Let the handle draw your arms and shoulder blades forward, but keep the lower back neutral — do not round it.', pose: P(sit(0.44), { spine: [14, 0, 0], chest: [6, 0, 0], neck: [-6, 0, 0] }, S({ clavR: [0, 0, -8], armR: [-58, 4, -10], foreR: [-18, 0, 0], thighR: [-84, 0, -6], shinR: [56, 0, 0], footR: [-26, 0, 0] })) },
      { t: 0.24, label: 'Sit up, then pull', tip: 'The torso comes upright first, then the elbows move. No heaving backward and forward.', pose: P(sit(0.44), { spine: [4, 0, 0], chest: [0, 0, 0] }, S({ clavR: [0, 0, 4], armR: [-40, 2, -10], foreR: [-46, 0, 0], thighR: [-84, 0, -6], shinR: [56, 0, 0], footR: [-26, 0, 0] })) },
      { t: 0.46, label: 'Handle to the belly button', tip: 'Elbows brush past your sides, shoulder blades squeeze together at the end.', pose: P(sit(0.44), { spine: [-2, 0, 0], chest: [-3, 0, 0] }, S({ clavR: [0, 0, 6], armR: [6, 0, -8], foreR: [-96, 0, 0], thighR: [-84, 0, -6], shinR: [56, 0, 0], footR: [-26, 0, 0] })) },
      { t: 0.58, label: 'Hold, then return slowly', tip: 'One second squeeze, then three seconds letting the arms straighten. Torso stays quiet.', pose: P(sit(0.44), { spine: [-2, 0, 0], chest: [-3, 0, 0] }, S({ clavR: [0, 0, 6], armR: [6, 0, -8], foreR: [-96, 0, 0], thighR: [-84, 0, -6], shinR: [56, 0, 0], footR: [-26, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.44), { spine: [14, 0, 0], chest: [6, 0, 0], neck: [-6, 0, 0] }, S({ clavR: [0, 0, -8], armR: [-58, 4, -10], foreR: [-18, 0, 0], thighR: [-84, 0, -6], shinR: [56, 0, 0], footR: [-26, 0, 0] })) }
    ]
  },

  chestSupportedRow: {
    prop: 'benchIncline',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['lats', 'traps', 'biceps'],
    camera: { pos: [2.6, 1.5, 1.9], target: [0, 0.85, 0.2] },
    dur: 4.4,
    /* face-down on the 30 degree pad: rotate 180 about Y, then tip forward */
    frames: (() => {
      /* chest down along a 30 degree pad: turn 180 about Y, then lay the
         torso back along the pad; the legs stand on the floor behind it */
      const base = P(
        { root: { p: [0, 0.145, 0.923], r: [-60, 180, 0] } },
        { spine: [2, 0, 0], chest: [3, 0, 0], neck: [-34, 0, 0] },
        S({ thighR: [-8, 0, -4], shinR: [4, 0, 0], footR: [-30, 0, 0] })
      );
      const bottom = S({ clavR: [0, 0, -8], armR: [-6, 0, -12], foreR: [-8, 0, 0] });
      const mid = S({ clavR: [0, 0, 4], armR: [22, 0, -16], foreR: [-52, 0, 0] });
      const top = S({ clavR: [0, 0, 6], armR: [46, 0, -14], foreR: [-92, 0, 0] });
      return [
        { t: 0.00, label: 'Start — chest on the pad, arms hanging', tip: 'Set the bench at about 30 degrees, lie face down with your chest on the pad and your feet planted behind. Let the dumbbells hang straight down.', pose: P(base, bottom) },
        { t: 0.32, label: 'Row the elbows up and back', tip: 'Because the pad holds your torso, there is no way to cheat with momentum. Pure back work.', pose: P(base, mid) },
        { t: 0.50, label: 'Squeeze the shoulder blades', tip: 'Elbows finish past your ribs, dumbbells beside your hips. Hold for a beat.', pose: P(base, top) },
        { t: 0.62, label: 'Lower to a full stretch', tip: 'Three seconds down until the arms are completely straight and the shoulder blades spread.', pose: P(base, top) },
        { t: 0.97, label: '', tip: '', pose: P(base, bottom) }
      ];
    })()
  },

  straightArmPulldown: {
    prop: 'cableHigh',
    attach: { handR: 'rope', handL: 'rope' },
    highlight: ['lats', 'abs'],
    camera: { pos: [2.5, 1.5, -1.4], target: [0, 1.1, 0.4] },
    dur: 4.2,
    frames: [
      { t: 0.00, label: 'Start — arms up and forward, hips back', tip: 'Stand a step away from the tower, hinge slightly at the hips, arms almost straight and reaching up toward the pulley.', pose: P(stand(), { spine: [16, 0, 0], chest: [4, 0, 0] }, S({ thighR: [16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [-142, 0, -12], foreR: [-8, 0, 0] })) },
      { t: 0.34, label: 'Sweep the arms down', tip: 'Elbows stay locked at the same small angle the whole way. This is a shoulder movement, not a triceps one.', pose: P(stand(), { spine: [16, 0, 0], chest: [4, 0, 0] }, S({ thighR: [16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [-74, 0, -10], foreR: [-8, 0, 0] })) },
      { t: 0.52, label: 'Finish at your thighs', tip: 'Rope ends up beside your legs, lats fully contracted. Squeeze for one second.', pose: P(stand(), { spine: [16, 0, 0], chest: [4, 0, 0] }, S({ thighR: [16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [-6, 0, -8], foreR: [-6, 0, 0] })) },
      { t: 0.64, label: 'Let the arms travel back up', tip: 'Control the return until you feel the lats stretch overhead.', pose: P(stand(), { spine: [16, 0, 0], chest: [4, 0, 0] }, S({ thighR: [16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [-6, 0, -8], foreR: [-6, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [16, 0, 0], chest: [4, 0, 0] }, S({ thighR: [16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [-142, 0, -12], foreR: [-8, 0, 0] })) }
    ]
  },

  reversePecDeck: {
    prop: 'machineFly',
    highlight: ['delts', 'traps'],
    camera: { pos: [2.5, 1.5, -2.4], target: [0, 1.0, -0.1] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — chest on the pad, arms in front', tip: 'Turn around and sit facing the machine so your chest rests against the pad. Arms straight out in front, elbows barely bent.', pose: P(sit(0.48, 0, 180), { spine: [4, 0, 0] }, S({ armR: [-84, 16, -14], foreR: [-12, 0, 0] })) },
      { t: 0.34, label: 'Open the arms wide', tip: 'Lead with the elbows and think about pulling your shoulder blades together — the hands are along for the ride.', pose: P(sit(0.48, 0, 180), { spine: [3, 0, 0] }, S({ armR: [-50, -24, -52], foreR: [-14, 0, 0] })) },
      { t: 0.52, label: 'Squeeze the rear delts', tip: 'Stop when your arms are level with your shoulders. Neck stays relaxed — no shrugging.', pose: P(sit(0.48, 0, 180), { spine: [2, 0, 0] }, S({ armR: [-8, -34, -86], foreR: [-16, 0, 0] })) },
      { t: 0.64, label: 'Return slowly', tip: 'Three seconds back to the start. Light weight, high reps — this is a small muscle.', pose: P(sit(0.48, 0, 180), { spine: [2, 0, 0] }, S({ armR: [-8, -34, -86], foreR: [-16, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.48, 0, 180), { spine: [4, 0, 0] }, S({ armR: [-84, 16, -14], foreR: [-12, 0, 0] })) }
    ]
  },

  /* ---------------------------- biceps ---------------------------- */
  dbCurl: {
    prop: 'none',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['biceps', 'forearms'],
    camera: { pos: [1.6, 1.4, 2.9], target: [0, 1.0, 0] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — arms straight, palms forward', tip: 'Stand tall, elbows tucked beside your ribs, shoulders back. Dumbbells beside your thighs with the palms facing forward.', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 0, 0] })) },
      { t: 0.30, label: 'Curl up', tip: 'Only the forearm moves. If your elbow drifts forward or your body swings, drop the weight.', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-72, 0, 0] })) },
      { t: 0.48, label: 'Squeeze at the top', tip: 'Finish with the little finger slightly higher than the thumb to fully contract the biceps.', pose: P(stand(), S({ armR: [-8, 0, -8], foreR: [-138, 0, 0] })) },
      { t: 0.60, label: 'Lower for 3 seconds', tip: 'All the way down to straight arms. Half reps build half arms.', pose: P(stand(), S({ armR: [-8, 0, -8], foreR: [-138, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 0, 0] })) }
    ]
  },

  hammerCurl: {
    prop: 'none',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['biceps', 'forearms'],
    camera: { pos: [1.8, 1.4, 2.8], target: [0, 1.0, 0] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — neutral grip, thumbs up', tip: 'Same stance as a normal curl, but the palms face each other as if you were holding two hammers.', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 90, 0] })) },
      { t: 0.30, label: 'Curl straight up', tip: 'The dumbbell stays vertical the whole way — no rotating the wrist.', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-70, 90, 0] })) },
      { t: 0.48, label: 'Top', tip: 'This version hits the brachialis and the forearm, which is what makes the arm look thicker from the side.', pose: P(stand(), S({ armR: [-6, 0, -8], foreR: [-132, 90, 0] })) },
      { t: 0.60, label: 'Lower under control', tip: 'Three seconds down, elbows still glued to your sides.', pose: P(stand(), S({ armR: [-6, 0, -8], foreR: [-132, 90, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 90, 0] })) }
    ]
  },

  ezBarCurl: {
    prop: 'none',
    attach: { handR: 'ezBar' },
    highlight: ['biceps', 'forearms'],
    camera: { pos: [1.4, 1.4, 3.0], target: [0, 1.0, 0] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — bar at arms length', tip: 'Take the angled part of the bar so your wrists sit comfortably. Elbows in, chest up, knees softly bent.', pose: P(stand(), S({ armR: [-4, 0, -10], foreR: [-8, 0, 0] })) },
      { t: 0.30, label: 'Curl', tip: 'Drive the bar up in an arc. Your upper arms should stay vertical throughout.', pose: P(stand(), S({ armR: [-4, 0, -10], foreR: [-74, 0, 0] })) },
      { t: 0.48, label: 'Top — no leaning back', tip: 'If you have to lean back to finish the rep, the bar is too heavy for strict curls.', pose: P(stand(), S({ armR: [-8, 0, -10], foreR: [-136, 0, 0] })) },
      { t: 0.60, label: 'Lower slowly', tip: 'Three seconds down to a full stretch, then go again.', pose: P(stand(), S({ armR: [-8, 0, -10], foreR: [-136, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-4, 0, -10], foreR: [-8, 0, 0] })) }
    ]
  },

  /* ==================== PULL-UP PROGRESSION ==================== */
  deadHang: {
    prop: 'pullup',
    highlight: ['lats', 'forearms', 'abs'],
    camera: { pos: [2.4, 1.9, 2.6], target: [0, 1.5, 0] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Level 0 — the dead hang', tip: 'Grip slightly wider than your shoulders, thumbs wrapped around the bar. Just hang, relaxed, and breathe.', pose: hangLow },
      { t: 0.45, label: 'Hold 20–40 seconds', tip: 'This builds the grip and the shoulder tolerance you need before anything else. Legs still, no swinging.', pose: P(hangLow, { spine: [1, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: hangLow }
    ]
  },

  scapPullup: {
    prop: 'pullup',
    highlight: ['lats', 'traps'],
    camera: { pos: [2.2, 1.9, 2.6], target: [0, 1.6, 0] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Level 1 — hang with the shoulders up', tip: 'Arms completely straight. Let your shoulders rise toward your ears — this is the relaxed bottom.', pose: hangLow },
      { t: 0.34, label: 'Pull the shoulders down, arms stay straight', tip: 'Without bending your elbows, push your shoulders away from your ears. Your body rises a few centimetres. That is the whole rep.', pose: hangPacked },
      { t: 0.52, label: 'Hold for 2 seconds', tip: 'This teaches the lats to start the pull-up. Most people who cannot do a pull-up have never felt this.', pose: hangPacked },
      { t: 0.66, label: 'Release slowly', tip: 'Let the shoulders rise again under control. 3 sets of 5–8 reps.', pose: hangPacked },
      { t: 0.97, label: '', tip: '', pose: hangLow }
    ]
  },

  assistedPullup: {
    prop: 'pullupAssist',
    highlight: ['lats', 'biceps', 'abs'],
    camera: { pos: [2.5, 1.8, 2.7], target: [0, 1.45, 0] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Level 2 — knees on the pad, arms straight', tip: 'Set the assistance so you can do 5–8 clean reps. Step on, place both knees on the pad, and let the arms straighten fully.', pose: P(hangLow, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.18, label: 'Brace, then pull the shoulders down', tip: 'Squeeze the abs and glutes so the body is one rigid unit, then start the pull with the shoulder blades.', pose: P(hangPacked, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.42, label: 'Drive the elbows down toward your sides', tip: 'Chest leads, elbows finish beside your ribs. Do not shrug or crane your neck to reach the bar.', pose: P(pullMid, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.56, label: 'Chin over the bar — pause', tip: 'Chest close to the bar, one-second pause at the top.', pose: P(pullTop, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.66, label: 'Lower for 3 seconds', tip: 'The controlled descent is where most of the strength is built. Finish with completely straight arms.', pose: P(pullTop, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(hangLow, S({ thighR: [8, 0, -5], shinR: [96, 0, 0], footR: [-30, 0, 0] })) }
    ]
  },

  negativePullup: {
    prop: 'pullupStep',
    highlight: ['lats', 'biceps', 'forearms'],
    camera: { pos: [2.5, 1.8, 2.7], target: [0, 1.5, 0] },
    dur: 6.0,
    frames: [
      { t: 0.00, label: 'Level 3 — start at the top', tip: 'Use a box or step to get your chin above the bar. Grip the bar, brace, then take your feet off the step.', pose: pullTop },
      { t: 0.12, label: 'Lower for 5 seconds — count them', tip: 'Fight the descent the whole way. Shoulders stay packed, body stays tight, no dropping at the end.', pose: pullTop },
      { t: 0.55, label: 'Halfway — keep fighting', tip: 'The sticking point is usually here. Slow it down even more through this range.', pose: pullMid },
      { t: 0.80, label: 'Finish with straight arms', tip: 'End in a controlled dead hang, then step back up. Never jump back to the top.', pose: hangLow },
      { t: 0.97, label: '', tip: '', pose: pullTop }
    ]
  },

  bandPullup: {
    prop: 'pullupBand',
    highlight: ['lats', 'biceps', 'abs'],
    camera: { pos: [2.5, 1.8, 2.7], target: [0, 1.45, 0] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Level 4 — one foot in the band', tip: 'Loop a band over the bar, put one foot in it and cross the other ankle behind. The band helps most at the bottom, exactly where you are weakest.', pose: P(hangLow, { thighR: [-24, 0, -4], shinR: [10, 0, 0], footR: [-8, 0, 0], thighL: [14, 0, 6], shinL: [92, 0, 0] }) },
      { t: 0.36, label: 'Pull — same technique as a real pull-up', tip: 'Shoulders down first, elbows to your ribs, chest to the bar.', pose: P(pullMid, { thighR: [-24, 0, -4], shinR: [10, 0, 0], footR: [-8, 0, 0], thighL: [14, 0, 6], shinL: [92, 0, 0] }) },
      { t: 0.54, label: 'Chin over the bar', tip: 'Pause briefly at the top so you actually own the position.', pose: P(pullTop, { thighR: [-24, 0, -4], shinR: [10, 0, 0], footR: [-8, 0, 0], thighL: [14, 0, 6], shinL: [92, 0, 0] }) },
      { t: 0.66, label: 'Lower under control', tip: 'When this feels easy, move to a lighter band — that is the whole progression.', pose: P(pullTop, { thighR: [-24, 0, -4], shinR: [10, 0, 0], footR: [-8, 0, 0], thighL: [14, 0, 6], shinL: [92, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: P(hangLow, { thighR: [-24, 0, -4], shinR: [10, 0, 0], footR: [-8, 0, 0], thighL: [14, 0, 6], shinL: [92, 0, 0] }) }
    ]
  },

  fullPullup: {
    prop: 'pullup',
    highlight: ['lats', 'biceps', 'abs', 'forearms'],
    camera: { pos: [2.4, 1.9, 2.7], target: [0, 1.5, 0] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Level 5 — dead hang, full grip', tip: 'Hands just outside shoulder width, thumbs wrapped. Arms completely straight.', pose: hangLow },
      { t: 0.16, label: 'Brace the abs and squeeze the glutes', tip: 'A tight body does not swing, and a body that does not swing does not waste force.', pose: hangPacked },
      { t: 0.40, label: 'Pull the elbows down and back', tip: 'Chest toward the bar, elbows driving toward your back pockets.', pose: pullMid },
      { t: 0.56, label: 'Chin clears the bar', tip: 'Neck neutral — clear the bar with your chest, not by tipping your head back.', pose: pullTop },
      { t: 0.68, label: 'Lower under control', tip: 'Take 2–3 seconds down and finish at a full dead hang. That is one honest rep.', pose: pullTop },
      { t: 0.97, label: '', tip: '', pose: hangLow }
    ]
  }
};
