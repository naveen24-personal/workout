/* ============================================================
   clips_push.js — chest, shoulders, triceps
   Angles are degrees. See anim.js for the axis conventions.
   ============================================================ */
import { S, P, sit, stand, recline } from './anim.js';

/* shared body attitudes -------------------------------------------------- */
const SEAT = 0.48;
const seatedUpright = P(sit(SEAT), { spine: [-2, 0, 0], chest: [-3, 0, 0] });
/* feet planted while reclined on a 30 deg incline bench */
const inclineLegs = S({ thighR: [-7, 0, -4], shinR: [53, 0, 0], footR: [-16, 0, 0] });
/* feet planted while lying flat (solved so the soles sit on the floor) */
const flatLegs = S({ thighR: [20, 0, -5], shinR: [40, 0, 0], footR: [-30, 0, 0] });

/* press arm positions (used by every horizontal press) ------------------- */
const pressBottom = S({ armR: [8, -8, -70], foreR: [-100, 0, 0], handR: [0, 0, 0] });
const pressMid = S({ armR: [-48, 4, -42], foreR: [-52, 0, 0] });
const pressTop = S({ armR: [-86, 8, -15], foreR: [-6, 0, 0] });

export const PUSH_CLIPS = {

  /* ------------------------------------------------------------------ */
  machineChestPress: {
    prop: 'machinePress',
    highlight: ['chest', 'triceps', 'delts'],
    camera: { pos: [2.5, 1.35, 2.3], target: [0, 0.95, 0.15] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — handles at mid-chest', tip: 'Seat set so the grips line up with the middle of your chest. Back and head flat on the pad, feet planted.', pose: P(seatedUpright, pressBottom) },
      { t: 0.28, label: 'Press forward', tip: 'Push the handles away, elbows tracking about 45 degrees from your body — not flared to 90.', pose: P(seatedUpright, pressMid) },
      { t: 0.46, label: 'Finish — stop just short of locking', tip: 'Chest squeezed, shoulders still down and back against the pad.', pose: P(seatedUpright, pressTop) },
      { t: 0.58, label: 'Lower for 2–3 seconds', tip: 'Control the weight back until your hands are level with your chest. No bouncing off the stack.', pose: P(seatedUpright, pressTop) },
      { t: 0.97, label: '', tip: '', pose: P(seatedUpright, pressBottom) }
    ]
  },

  inclineMachinePress: {
    prop: 'machineInclinePress',
    highlight: ['chest', 'delts', 'triceps'],
    camera: { pos: [2.5, 1.5, 2.3], target: [0, 1.0, 0.15] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — grips at collarbone height', tip: 'On an incline the handles sit higher, roughly level with the top of your chest.', pose: P(sit(0.46), { spine: [-6, 0, 0], chest: [-8, 0, 0] }, S({ armR: [-4, -6, -62], foreR: [-98, 0, 0] })) },
      { t: 0.30, label: 'Press up and forward', tip: 'The path is diagonal — up and away, following the angle of the pad.', pose: P(sit(0.46), { spine: [-6, 0, 0], chest: [-8, 0, 0] }, S({ armR: [-58, 6, -36], foreR: [-46, 0, 0] })) },
      { t: 0.48, label: 'Finish tall', tip: 'Ribs down, shoulders pinned. Upper chest should feel the work.', pose: P(sit(0.46), { spine: [-6, 0, 0], chest: [-8, 0, 0] }, S({ armR: [-96, 8, -16], foreR: [-6, 0, 0] })) },
      { t: 0.60, label: 'Lower slowly', tip: 'Three seconds down beats a fast, sloppy rep every time.', pose: P(sit(0.46), { spine: [-6, 0, 0], chest: [-8, 0, 0] }, S({ armR: [-96, 8, -16], foreR: [-6, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.46), { spine: [-6, 0, 0], chest: [-8, 0, 0] }, S({ armR: [-4, -6, -62], foreR: [-98, 0, 0] })) }
    ]
  },

  inclineDbPress: {
    prop: 'benchIncline',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['chest', 'delts', 'triceps'],
    camera: { pos: [2.6, 1.6, 2.2], target: [0, 1.0, 0.1] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — dumbbells at chest', tip: 'Bench at 30 degrees. Sit down with the dumbbells on your thighs, then kick them up one at a time as you lie back.', pose: P(recline(30, 0.62, 0.30), inclineLegs, S({ armR: [-10, -8, -64], foreR: [-96, 0, 0] })) },
      { t: 0.30, label: 'Press', tip: 'Drive the dumbbells up and slightly together. Wrists stay stacked over the elbows.', pose: P(recline(30, 0.62, 0.30), inclineLegs, S({ armR: [-52, 4, -38], foreR: [-46, 0, 0] })) },
      { t: 0.48, label: 'Top — don’t clang them together', tip: 'Stop a few centimetres apart, elbows soft. Shoulder blades still tucked into the pad.', pose: P(recline(30, 0.62, 0.30), inclineLegs, S({ armR: [-90, 6, -14], foreR: [-6, 0, 0] })) },
      { t: 0.60, label: 'Lower for 3 seconds', tip: 'Elbows travel down and slightly out until you feel a stretch across the chest.', pose: P(recline(30, 0.62, 0.30), inclineLegs, S({ armR: [-90, 6, -14], foreR: [-6, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(recline(30, 0.62, 0.30), inclineLegs, S({ armR: [-10, -8, -64], foreR: [-96, 0, 0] })) }
    ]
  },

  flatDbPress: {
    prop: 'bench',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['chest', 'triceps'],
    camera: { pos: [2.7, 1.5, 1.9], target: [0, 0.7, -0.1] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — flat back, feet down', tip: 'Head, upper back and hips on the bench, feet flat on the floor, slight natural arch in the lower back.', pose: P({ root: { p: [0, 0.60, 0.95], r: [-90, 0, 0] } }, flatLegs, S({ armR: [-8, -8, -66], foreR: [-98, 0, 0] })) },
      { t: 0.30, label: 'Press', tip: 'Push through the middle of your hand and squeeze the chest as the dumbbells rise.', pose: P({ root: { p: [0, 0.60, 0.95], r: [-90, 0, 0] } }, flatLegs, S({ armR: [-50, 4, -40], foreR: [-46, 0, 0] })) },
      { t: 0.48, label: 'Top', tip: 'Elbows nearly straight, shoulders still pulled back and down.', pose: P({ root: { p: [0, 0.60, 0.95], r: [-90, 0, 0] } }, flatLegs, S({ armR: [-88, 6, -14], foreR: [-6, 0, 0] })) },
      { t: 0.60, label: 'Lower under control', tip: 'Two to three seconds down to chest level. Never let the weight drop.', pose: P({ root: { p: [0, 0.60, 0.95], r: [-90, 0, 0] } }, flatLegs, S({ armR: [-88, 6, -14], foreR: [-6, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P({ root: { p: [0, 0.60, 0.95], r: [-90, 0, 0] } }, flatLegs, S({ armR: [-8, -8, -66], foreR: [-98, 0, 0] })) }
    ]
  },

  pecDeckFly: {
    prop: 'machineFly',
    highlight: ['chest', 'delts'],
    camera: { pos: [2.2, 1.5, 2.6], target: [0, 1.0, 0.2] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — arms open, chest tall', tip: 'Sit with your back flat on the pad and grip the handles with your elbows very slightly bent. Feel a stretch across the chest, not the shoulder joint.', pose: P(seatedUpright, S({ armR: [-70, -34, -22], foreR: [-16, 0, 0] })) },
      { t: 0.32, label: 'Sweep together', tip: 'Think about hugging a barrel — the movement happens at the shoulder, the elbow angle never changes.', pose: P(seatedUpright, S({ armR: [-80, -14, -16], foreR: [-14, 0, 0] })) },
      { t: 0.50, label: 'Squeeze for a beat', tip: 'Hands almost touching in front of the chest. Hold, don’t bounce.', pose: P(seatedUpright, S({ armR: [-84, 8, -12], foreR: [-14, 0, 0] })) },
      { t: 0.62, label: 'Open slowly', tip: 'Let the arms travel back until you feel the stretch, then reverse. Stop if the front of the shoulder pinches.', pose: P(seatedUpright, S({ armR: [-84, 8, -12], foreR: [-14, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(seatedUpright, S({ armR: [-70, -34, -22], foreR: [-16, 0, 0] })) }
    ]
  },

  cableFly: {
    prop: 'cableHigh',
    attach: { handR: 'dHandle', handL: 'dHandle' },
    highlight: ['chest'],
    camera: { pos: [2.6, 1.5, -1.6], target: [0, 1.1, 0.4] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — split stance, arms wide', tip: 'One foot forward, torso leaning very slightly into the movement, elbows softly bent and fixed.', pose: P(stand(), { spine: [8, 0, 0] }, S({ thighR: [-14, 0, -4], shinR: [10, 0, 0] }), S({ armR: [-56, -40, -30], foreR: [-18, 0, 0] })) },
      { t: 0.34, label: 'Draw the hands together', tip: 'Lead with the elbows, finish with the hands. The chest does the work, not the arms.', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-14, 0, -4], shinR: [10, 0, 0] }), S({ armR: [-62, -14, -20], foreR: [-20, 0, 0] })) },
      { t: 0.52, label: 'Cross and squeeze', tip: 'Hands meet in front of your belly button, one slightly over the other. Hold for a second.', pose: P(stand(), { spine: [12, 0, 0] }, S({ thighR: [-14, 0, -4], shinR: [10, 0, 0] }), S({ armR: [-62, 12, -12], foreR: [-22, 0, 0] })) },
      { t: 0.64, label: 'Let the cables pull you open', tip: 'Resist on the way back — the stretch phase is where the chest grows.', pose: P(stand(), { spine: [12, 0, 0] }, S({ thighR: [-14, 0, -4], shinR: [10, 0, 0] }), S({ armR: [-62, 12, -12], foreR: [-22, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [8, 0, 0] }, S({ thighR: [-14, 0, -4], shinR: [10, 0, 0] }), S({ armR: [-56, -40, -30], foreR: [-18, 0, 0] })) }
    ]
  },

  /* ---------------------------- shoulders ---------------------------- */
  seatedDbShoulderPress: {
    prop: 'benchUpright',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['delts', 'triceps', 'traps'],
    camera: { pos: [2.4, 1.7, 2.4], target: [0, 1.15, 0] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — elbows at shoulder height', tip: 'Sit tall against the upright pad. Dumbbells just outside the shoulders, palms facing forward, wrists stacked over the elbows.', pose: P(sit(0.5), { spine: [-3, 0, 0] }, S({ armR: [0, 0, -100], foreR: [0, 0, -80] })) },
      { t: 0.30, label: 'Press up', tip: 'Push straight up, ribs pulled down so you don’t arch your lower back.', pose: P(sit(0.5), { spine: [-3, 0, 0] }, S({ armR: [0, 0, -138], foreR: [0, 0, -42] })) },
      { t: 0.48, label: 'Lock out overhead', tip: 'Biceps end up near your ears. Shoulders can shrug up slightly at the very top — that is normal.', pose: P(sit(0.5), { spine: [-3, 0, 0] }, S({ clavR: [0, 0, -6], armR: [0, 0, -170], foreR: [0, 0, -6] })) },
      { t: 0.60, label: 'Lower to ear level', tip: 'Control the descent until your elbows are back at shoulder height.', pose: P(sit(0.5), { spine: [-3, 0, 0] }, S({ clavR: [0, 0, -6], armR: [0, 0, -170], foreR: [0, 0, -6] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.5), { spine: [-3, 0, 0] }, S({ armR: [0, 0, -100], foreR: [0, 0, -80] })) }
    ]
  },

  machineShoulderPress: {
    prop: 'machineShoulder',
    highlight: ['delts', 'triceps'],
    camera: { pos: [2.3, 1.7, 2.3], target: [0, 1.15, 0] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — grips level with the shoulders', tip: 'Set the seat so the handles sit just above shoulder height. Back flat on the pad.', pose: P(sit(0.48), S({ armR: [-6, 0, -98], foreR: [0, 0, -78] })) },
      { t: 0.30, label: 'Press overhead', tip: 'Push up and very slightly back so the bar path stays over your shoulders.', pose: P(sit(0.48), S({ armR: [-4, 0, -140], foreR: [0, 0, -40] })) },
      { t: 0.48, label: 'Finish', tip: 'Elbows almost straight, no shrugging into your ears at the top.', pose: P(sit(0.48), S({ armR: [0, 0, -168], foreR: [0, 0, -8] })) },
      { t: 0.60, label: 'Lower with control', tip: 'Three seconds back to the start. The stretch at the bottom is the useful part.', pose: P(sit(0.48), S({ armR: [0, 0, -168], foreR: [0, 0, -8] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.48), S({ armR: [-6, 0, -98], foreR: [0, 0, -78] })) }
    ]
  },

  dbLateralRaise: {
    prop: 'none',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['delts'],
    camera: { pos: [0.4, 1.5, 3.4], target: [0, 1.05, 0] },
    dur: 4.2,
    frames: [
      { t: 0.00, label: 'Start — dumbbells beside the thighs', tip: 'Stand tall, tiny bend in the elbows, thumbs pointing slightly forward. This is a light exercise — leave the ego weights alone.', pose: P(stand(), S({ armR: [-4, 0, -10], foreR: [-10, 0, -6] })) },
      { t: 0.34, label: 'Raise out to the sides', tip: 'Lead with the elbows, not the hands, as if pouring from a jug. Body stays still — no swinging.', pose: P(stand(), S({ armR: [-2, 0, -52], foreR: [-8, 0, -8] })) },
      { t: 0.50, label: 'Stop at shoulder height', tip: 'Wrists level with the elbows, elbows level with the shoulders. Going higher just brings the traps in.', pose: P(stand(), S({ armR: [0, 0, -86], foreR: [-6, 0, -10] })) },
      { t: 0.62, label: 'Lower for 3 seconds', tip: 'Fight gravity all the way down. That slow negative is what makes light weight feel heavy.', pose: P(stand(), S({ armR: [0, 0, -86], foreR: [-6, 0, -10] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-4, 0, -10], foreR: [-10, 0, -6] })) }
    ]
  },

  facePull: {
    prop: 'cableMid',
    attach: { handR: 'rope', handL: 'rope' },
    highlight: ['traps', 'delts', 'lats'],
    camera: { pos: [2.6, 1.6, -1.2], target: [0, 1.2, 0.5] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — rope at eye level, arms long', tip: 'Set the pulley at roughly eye height. Take one end of the rope in each hand, thumbs pointing back, and step back until there is tension.', pose: P(stand(), S({ armR: [-72, 12, -18], foreR: [-12, 0, 0] })) },
      { t: 0.32, label: 'Pull toward your face', tip: 'Pull the rope apart as you pull it in — the hands finish either side of your head, not in front of it.', pose: P(stand(), S({ armR: [-40, 6, -58], foreR: [40, 0, 0] })) },
      { t: 0.50, label: 'Elbows high, squeeze the rear delts', tip: 'Upper arms end up parallel to the floor. Hold for a second and feel the shoulder blades pull together.', pose: P(stand(), S({ armR: [-6, 0, -88], foreR: [96, 0, 0] })) },
      { t: 0.62, label: 'Return slowly', tip: 'Let the shoulder blades travel forward at the end — full range, controlled.', pose: P(stand(), S({ armR: [-6, 0, -88], foreR: [96, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-72, 12, -18], foreR: [-12, 0, 0] })) }
    ]
  },

  /* ---------------------------- triceps ---------------------------- */
  ropePushdown: {
    prop: 'cableHigh',
    attach: { handR: 'rope', handL: 'rope' },
    highlight: ['triceps'],
    camera: { pos: [2.4, 1.4, -1.4], target: [0, 1.05, 0.4] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — elbows pinned to your sides', tip: 'Stand close to the tower, feet hip-width, a small forward lean. Hands at chest height, elbows glued to your ribs.', pose: P(stand(), { spine: [6, 0, 0] }, S({ armR: [-10, 0, -8], foreR: [-86, 0, 0] })) },
      { t: 0.32, label: 'Push down', tip: 'Only the forearms move. If your elbows drift forward, the weight is too heavy.', pose: P(stand(), { spine: [6, 0, 0] }, S({ armR: [-10, 0, -8], foreR: [-44, 0, 0] })) },
      { t: 0.50, label: 'Lock out and spread the rope', tip: 'At the bottom, pull the two ends slightly apart and squeeze the triceps for a beat.', pose: P(stand(), { spine: [6, 0, 0] }, S({ armR: [-8, 0, -10], foreR: [-4, 0, -8] })) },
      { t: 0.62, label: 'Let it come back up slowly', tip: 'Control the return until your forearms are just past parallel with the floor.', pose: P(stand(), { spine: [6, 0, 0] }, S({ armR: [-8, 0, -10], foreR: [-4, 0, -8] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [6, 0, 0] }, S({ armR: [-10, 0, -8], foreR: [-86, 0, 0] })) }
    ]
  },

  overheadCableExt: {
    prop: 'cableBehind',
    attach: { handR: 'rope', handL: 'rope' },
    highlight: ['triceps'],
    camera: { pos: [2.6, 1.6, 1.8], target: [0, 1.25, 0] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — rope behind your head', tip: 'Face away from the tower, split stance, arms up beside your ears with the elbows bent and the rope behind your head.', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [0, 0, -156], foreR: [128, 0, 0] })) },
      { t: 0.32, label: 'Extend forward and up', tip: 'Keep the upper arms still and beside your head — only the elbows open.', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [0, 0, -158], foreR: [64, 0, 0] })) },
      { t: 0.50, label: 'Lock out', tip: 'Arms straight, elbows close together. You should feel a hard squeeze in the long head of the triceps.', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [0, 0, -160], foreR: [8, 0, 0] })) },
      { t: 0.62, label: 'Lower into the stretch', tip: 'Let the rope pull your hands back behind your head under control. That deep stretch is the point of this exercise.', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [0, 0, -160], foreR: [8, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [10, 0, 0] }, S({ thighR: [-16, 0, -4], shinR: [12, 0, 0] }), S({ armR: [0, 0, -156], foreR: [128, 0, 0] })) }
    ]
  },

  singleArmCableExt: {
    prop: 'cableHigh',
    attach: { handR: 'dHandle' },
    highlight: ['triceps'],
    camera: { pos: [2.2, 1.4, -1.5], target: [0, 1.05, 0.35] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — one hand, palm up or down', tip: 'Same setup as the rope pushdown but with a single handle. Free hand on your hip so you cannot cheat with the body.', pose: P(stand(), { spine: [5, 0, 0], chest: [0, -8, 0] }, { armR: [-10, 0, -8], foreR: [-88, 0, 0], armL: [-14, 0, 26], foreL: [-72, 0, -20] }) },
      { t: 0.32, label: 'Straighten the arm', tip: 'Elbow stays welded to your side. Nothing above the elbow moves.', pose: P(stand(), { spine: [5, 0, 0], chest: [0, -8, 0] }, { armR: [-10, 0, -8], foreR: [-40, 0, 0], armL: [-14, 0, 26], foreL: [-72, 0, -20] }) },
      { t: 0.50, label: 'Squeeze at the bottom', tip: 'A one-second hold at full extension is worth more than three extra sloppy reps.', pose: P(stand(), { spine: [5, 0, 0], chest: [0, -8, 0] }, { armR: [-8, 0, -8], foreR: [-4, 0, 0], armL: [-14, 0, 26], foreL: [-72, 0, -20] }) },
      { t: 0.62, label: 'Return under control', tip: 'Resist the cable on the way up, then repeat. Do both arms.', pose: P(stand(), { spine: [5, 0, 0], chest: [0, -8, 0] }, { armR: [-8, 0, -8], foreR: [-4, 0, 0], armL: [-14, 0, 26], foreL: [-72, 0, -20] }) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [5, 0, 0], chest: [0, -8, 0] }, { armR: [-10, 0, -8], foreR: [-88, 0, 0], armL: [-14, 0, 26], foreL: [-72, 0, -20] }) }
    ]
  }
};
