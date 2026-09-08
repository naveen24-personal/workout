/* ============================================================
   clips_legs.js — quads, hamstrings, glutes, calves
   ============================================================ */
import { S, P, sit, stand, recline, prone } from './anim.js';

/* goblet squat / bodyweight squat shared key positions */
const squatTop = P(stand(), S({ thighR: [-4, 0, -7], shinR: [4, 0, 0] }));
const squatMid = P({ root: { p: [0, -0.20, -0.24], r: [0, 0, 0] } }, { spine: [14, 0, 0] }, S({ thighR: [-52, 0, -10], shinR: [42, 0, 0], footR: [4, 0, 0] }));
const squatBottom = P({ root: { p: [0, -0.40, -0.48], r: [0, 0, 0] } }, { spine: [22, 0, 0], chest: [4, 0, 0], neck: [-14, 0, 0] }, S({ thighR: [-88, 0, -14], shinR: [72, 0, 0], footR: [10, 0, 0] }));
const gobletArms = S({ armR: [-28, 0, -16], foreR: [-124, 0, 0] });

export const LEG_CLIPS = {

  legPress: {
    prop: 'legPress',
    highlight: ['quads', 'glutes', 'hams'],
    camera: { pos: [2.9, 1.5, 2.2], target: [0, 0.75, 0.5] },
    dur: 4.8,
    frames: [
      { t: 0.00, label: 'Start — knees bent, back flat on the pad', tip: 'Feet shoulder-width in the middle of the plate, toes very slightly out. Lower back and head stay in contact with the pad the whole set.', pose: P(recline(72, 0.55, -0.05), S({ thighR: [-126, 0, -8], shinR: [84, 0, 0], footR: [-24, 0, 0] })) },
      { t: 0.30, label: 'Press through the whole foot', tip: 'Push through the mid-foot and heel, not the toes. Knees track in line with your feet — never let them cave inward.', pose: P(recline(72, 0.55, -0.05), S({ thighR: [-114, 0, -7], shinR: [44, 0, 0], footR: [-26, 0, 0] })) },
      { t: 0.48, label: 'Stop just short of locking the knees', tip: 'Leave a small bend at the top. Snapping the knees straight under load is how people get hurt on this machine.', pose: P(recline(72, 0.55, -0.05), S({ thighR: [-102, 0, -6], shinR: [10, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.60, label: 'Lower for 3 seconds', tip: 'Come down until your knees are at about 90 degrees — or as deep as you can go before your hips start to roll off the pad.', pose: P(recline(72, 0.55, -0.05), S({ thighR: [-102, 0, -6], shinR: [10, 0, 0], footR: [-30, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(recline(72, 0.55, -0.05), S({ thighR: [-126, 0, -8], shinR: [84, 0, 0], footR: [-24, 0, 0] })) }
    ]
  },

  gobletSquat: {
    prop: 'none',
    attach: { handR: 'plate' },
    highlight: ['quads', 'glutes', 'abs'],
    camera: { pos: [2.4, 1.3, 2.6], target: [0, 0.85, -0.15] },
    dur: 4.8,
    frames: [
      { t: 0.00, label: 'Start — weight at the chest, elbows in', tip: 'Hold a dumbbell or plate against your sternum. Feet shoulder-width, toes turned out slightly, chest tall.', pose: P(squatTop, gobletArms) },
      { t: 0.30, label: 'Sit down between your heels', tip: 'Push the hips back and down at the same time. Knees travel forward and outward, never inward.', pose: P(squatMid, gobletArms) },
      { t: 0.48, label: 'Bottom — elbows inside the knees', tip: 'Go as deep as you can while keeping your heels down and your lower back neutral. Pause for a beat.', pose: P(squatBottom, gobletArms) },
      { t: 0.62, label: 'Drive up through the whole foot', tip: 'Stand up by pushing the floor away, finishing with the glutes squeezed and the ribs down.', pose: P(squatBottom, gobletArms) },
      { t: 0.97, label: '', tip: '', pose: P(squatTop, gobletArms) }
    ]
  },

  bodyweightSquat: {
    prop: 'none',
    highlight: ['quads', 'glutes'],
    camera: { pos: [2.4, 1.3, 2.6], target: [0, 0.85, -0.15] },
    dur: 3.6,
    frames: [
      { t: 0.00, label: 'Warm-up squat — arms forward for balance', tip: 'Ten easy reps as part of the warm-up. No weight, full range, smooth tempo.', pose: P(squatTop, S({ armR: [-78, 0, -10], foreR: [-10, 0, 0] })) },
      { t: 0.32, label: 'Down', tip: 'Hips back, knees out, chest proud.', pose: P(squatMid, S({ armR: [-84, 0, -10], foreR: [-8, 0, 0] })) },
      { t: 0.50, label: 'Bottom', tip: 'Thighs at least parallel if your mobility allows it.', pose: P(squatBottom, S({ armR: [-88, 0, -10], foreR: [-6, 0, 0] })) },
      { t: 0.62, label: 'Stand tall', tip: 'Squeeze the glutes at the top and go again.', pose: P(squatBottom, S({ armR: [-88, 0, -10], foreR: [-6, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(squatTop, S({ armR: [-78, 0, -10], foreR: [-10, 0, 0] })) }
    ]
  },

  legExtension: {
    prop: 'legExtension',
    highlight: ['quads'],
    camera: { pos: [2.6, 1.3, 2.2], target: [0, 0.75, 0.35] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Start — pad on the shins, knees at 90', tip: 'Sit right back so the pivot of the machine lines up with your knee. The roller sits just above your ankles.', pose: P(sit(0.5), { spine: [-4, 0, 0] }, S({ shinR: [84, 0, 0], footR: [10, 0, 0], armR: [-24, 0, 20], foreR: [-70, 0, -10] })) },
      { t: 0.32, label: 'Straighten the knees', tip: 'Lift smoothly — no kicking or swinging. Keep your bum planted on the seat.', pose: P(sit(0.5), { spine: [-4, 0, 0] }, S({ shinR: [42, 0, 0], footR: [6, 0, 0], armR: [-24, 0, 20], foreR: [-70, 0, -10] })) },
      { t: 0.50, label: 'Squeeze the quads for a second', tip: 'A short hold at the top is what makes this exercise worth doing.', pose: P(sit(0.5), { spine: [-4, 0, 0] }, S({ shinR: [4, 0, 0], footR: [0, 0, 0], armR: [-24, 0, 20], foreR: [-70, 0, -10] })) },
      { t: 0.62, label: 'Lower slowly', tip: 'Three seconds back to 90 degrees, resisting the whole way.', pose: P(sit(0.5), { spine: [-4, 0, 0] }, S({ shinR: [4, 0, 0], footR: [0, 0, 0], armR: [-24, 0, 20], foreR: [-70, 0, -10] })) },
      { t: 0.97, label: '', tip: '', pose: P(sit(0.5), { spine: [-4, 0, 0] }, S({ shinR: [84, 0, 0], footR: [10, 0, 0], armR: [-24, 0, 20], foreR: [-70, 0, -10] })) }
    ]
  },

  legCurl: {
    prop: 'legCurl',
    highlight: ['hams', 'calves'],
    camera: { pos: [2.7, 1.2, 1.6], target: [0, 0.7, -0.1] },
    dur: 4.2,
    frames: [
      { t: 0.00, label: 'Start — face down, legs straight', tip: 'Lie face down with your knees just off the end of the pad and the roller across the back of your ankles. Hold the handles.', pose: P(prone(0.62, 0.15), { spine: [-4, 0, 0], neck: [-24, 0, 0] }, S({ shinR: [4, 0, 0], armR: [-118, 0, -12], foreR: [-30, 0, 0] })) },
      { t: 0.32, label: 'Curl the heels toward your bum', tip: 'Hips stay pressed into the pad — if they lift, the weight is too heavy.', pose: P(prone(0.62, 0.15), { spine: [-4, 0, 0], neck: [-24, 0, 0] }, S({ shinR: [52, 0, 0], armR: [-118, 0, -12], foreR: [-30, 0, 0] })) },
      { t: 0.50, label: 'Squeeze the hamstrings', tip: 'Point your toes toward your shins on the way up for a stronger contraction.', pose: P(prone(0.62, 0.15), { spine: [-4, 0, 0], neck: [-24, 0, 0] }, S({ shinR: [96, 0, 0], footR: [20, 0, 0], armR: [-118, 0, -12], foreR: [-30, 0, 0] })) },
      { t: 0.62, label: 'Lower under control', tip: 'Three seconds down to almost straight — do not let the stack crash.', pose: P(prone(0.62, 0.15), { spine: [-4, 0, 0], neck: [-24, 0, 0] }, S({ shinR: [96, 0, 0], footR: [20, 0, 0], armR: [-118, 0, -12], foreR: [-30, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(prone(0.62, 0.15), { spine: [-4, 0, 0], neck: [-24, 0, 0] }, S({ shinR: [4, 0, 0], armR: [-118, 0, -12], foreR: [-30, 0, 0] })) }
    ]
  },

  romanianDeadlift: {
    prop: 'none',
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['hams', 'glutes', 'lowback'],
    camera: { pos: [2.8, 1.3, 2.2], target: [0, 0.85, -0.1] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Start — tall, weights against your thighs', tip: 'Feet hip-width, knees softly bent, shoulders pulled back. The dumbbells rest lightly on the front of your thighs.', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 0, 0] })) },
      { t: 0.28, label: 'Push the hips backwards', tip: 'This is a hinge, not a squat. The knees stay at the same soft angle while the hips travel back.', pose: P({ root: { p: [0, -0.02, -0.12], r: [0, 0, 0] } }, { spine: [34, 0, 0], chest: [4, 0, 0], neck: [-24, 0, 0] }, S({ thighR: [-7, 0, -6], shinR: [10, 0, 0], armR: [30, 0, -8], foreR: [-4, 0, 0] })) },
      { t: 0.48, label: 'Bottom — weights just below the knees', tip: 'Stop where your hamstrings say stop. Back stays flat, weights stay in contact with your legs the whole way.', pose: P({ root: { p: [0, -0.04, -0.2], r: [0, 0, 0] } }, { spine: [62, 0, 0], chest: [6, 0, 0], neck: [-44, 0, 0] }, S({ thighR: [-12, 0, -6], shinR: [14, 0, 0], armR: [60, 0, -8], foreR: [-4, 0, 0] })) },
      { t: 0.62, label: 'Drive the hips forward to stand', tip: 'Squeeze the glutes to finish — do not lean back at the top.', pose: P({ root: { p: [0, -0.04, -0.2], r: [0, 0, 0] } }, { spine: [62, 0, 0], chest: [6, 0, 0], neck: [-44, 0, 0] }, S({ thighR: [-12, 0, -6], shinR: [14, 0, 0], armR: [60, 0, -8], foreR: [-4, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-4, 0, -8], foreR: [-6, 0, 0] })) }
    ]
  },

  /* Solved so the front foot stays planted at one spot on the floor and the
     rear foot stays on the bench pad (0.46 m) through the whole rep. */
  bulgarianSplitSquat: {
    prop: 'bench',
    propPos: [0, 0, -0.62],
    attach: { handR: 'dumbbell', handL: 'dumbbell' },
    highlight: ['quads', 'glutes'],
    camera: { pos: [2.8, 1.4, 2.0], target: [0, 0.8, -0.25] },
    dur: 5.0,
    frames: (() => {
      const arms = { armR: [-4, 0, -8], foreR: [-6, 0, 0], armL: [-4, 0, 8], foreL: [-6, 0, 0] };
      const rear = (shin) => ({ thighL: [17, 0, 5], shinL: [shin, 0, 0], footL: [-60, 0, 0] });
      const top = P({ root: { p: [0, -0.06, 0], r: [0, 0, 0] } }, { spine: [8, 0, 0] },
        { thighR: [-30, 0, -6], shinR: [30, 0, 0], footR: [0, 0, 0] }, rear(69), arms);
      const mid = P({ root: { p: [0, -0.18, -0.05], r: [0, 0, 0] } }, { spine: [12, 0, 0] },
        { thighR: [-50, 0, -6], shinR: [56, 0, 0], footR: [5, 0, 0] }, rear(91), arms);
      const bottom = P({ root: { p: [0, -0.30, -0.10], r: [0, 0, 0] } }, { spine: [16, 0, 0] },
        { thighR: [-70, 0, -6], shinR: [83, 0, 0], footR: [10, 0, 0] }, rear(113), arms);
      return [
        { t: 0.00, label: 'Start — rear foot on the bench', tip: 'Stand about one stride in front of the bench and place the top of your rear foot on it. Front foot far enough forward that your knee stays over the ankle.', pose: top },
        { t: 0.32, label: 'Lower straight down', tip: 'Drop the back knee toward the floor. Most of the weight stays on the front leg — the back leg is only for balance.', pose: mid },
        { t: 0.50, label: 'Bottom — front thigh near parallel', tip: 'Front shin stays fairly vertical, torso leans forward slightly. Pause without resting on the bench.', pose: bottom },
        { t: 0.64, label: 'Drive up through the front heel', tip: 'Push the floor away with the front foot. Complete all reps on one leg, then swap.', pose: bottom },
        { t: 0.97, label: '', tip: '', pose: top }
      ];
    })()
  },

  calfRaise: {
    prop: 'calf',
    highlight: ['calves'],
    camera: { pos: [2.2, 1.2, 2.4], target: [0, 0.7, 0.1] },
    dur: 3.6,
    frames: [
      { t: 0.00, label: 'Start — heels dropped below the step', tip: 'Balls of the feet on the block, heels hanging off. Let them sink until you feel a stretch in the calf.', pose: P({ root: { p: [0, 0.06, 0], r: [0, 0, 0] } }, S({ footR: [26, 0, 0], thighR: [0, 0, -4] })) },
      { t: 0.30, label: 'Push up onto the toes', tip: 'Rise as high as you can. Knees stay almost straight — this is an ankle movement.', pose: P({ root: { p: [0, 0.16, 0], r: [0, 0, 0] } }, S({ footR: [-12, 0, 0], thighR: [0, 0, -4] })) },
      { t: 0.48, label: 'Hold at the top', tip: 'One to two seconds at the top of every rep. Calves respond to time under tension.', pose: P({ root: { p: [0, 0.26, 0], r: [0, 0, 0] } }, S({ footR: [-42, 0, 0], thighR: [0, 0, -4] })) },
      { t: 0.62, label: 'Lower into the stretch', tip: 'Three seconds down, all the way past level. Don’t bounce out of the bottom.', pose: P({ root: { p: [0, 0.26, 0], r: [0, 0, 0] } }, S({ footR: [-42, 0, 0], thighR: [0, 0, -4] })) },
      { t: 0.97, label: '', tip: '', pose: P({ root: { p: [0, 0.06, 0], r: [0, 0, 0] } }, S({ footR: [26, 0, 0], thighR: [0, 0, -4] })) }
    ]
  },

  /* ------------------------- warm-up drills ------------------------- */
  walkingLunge: {
    prop: 'none',
    highlight: ['quads', 'glutes'],
    camera: { pos: [2.6, 1.3, 2.4], target: [0, 0.85, 0] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Step forward', tip: 'Take a long step, keeping your torso upright and your hands on your hips.', pose: P(stand(), { spine: [4, 0, 0] }, { thighR: [-38, 0, -6], shinR: [30, 0, 0], thighL: [22, 0, 6], shinL: [26, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.34, label: 'Drop the back knee', tip: 'Both knees end up at about 90 degrees. Front knee stays over the ankle.', pose: P({ root: { p: [0, -0.26, 0], r: [0, 0, 0] } }, { spine: [6, 0, 0] }, { thighR: [-74, 0, -6], shinR: [72, 0, 0], footR: [8, 0, 0], thighL: [36, 0, 6], shinL: [96, 0, 0], footL: [-40, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.56, label: 'Push through the front heel', tip: 'Stand up and step straight into the next lunge with the other leg.', pose: P(stand(), { spine: [4, 0, 0] }, { thighL: [-38, 0, 6], shinL: [30, 0, 0], thighR: [22, 0, -6], shinR: [26, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.82, label: 'Other side', tip: 'Ten each leg is plenty as a warm-up.', pose: P({ root: { p: [0, -0.26, 0], r: [0, 0, 0] } }, { spine: [6, 0, 0] }, { thighL: [-74, 0, 6], shinL: [72, 0, 0], footL: [8, 0, 0], thighR: [36, 0, -6], shinR: [96, 0, 0], footR: [-40, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { spine: [4, 0, 0] }, { thighR: [-38, 0, -6], shinR: [30, 0, 0], thighL: [22, 0, 6], shinL: [26, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) }
    ]
  },

  hipCircles: {
    prop: 'none',
    highlight: ['glutes', 'quads', 'obliques'],
    camera: { pos: [2.2, 1.3, 2.6], target: [0, 0.85, 0] },
    dur: 4.0,
    frames: [
      { t: 0.00, label: 'Knee up in front', tip: 'Stand tall, hands on hips or lightly holding a rack for balance. Lift one knee to hip height.', pose: P(stand(), { thighR: [-88, 0, -8], shinR: [82, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.25, label: 'Open the hip out to the side', tip: 'Draw a big circle with the knee — out, back, then down. Slow and controlled.', pose: P(stand(), { thighR: [-70, -46, -30], shinR: [78, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.5, label: 'Sweep it behind you', tip: 'Keep your ribs down so the movement comes from the hip, not the lower back.', pose: P(stand(), { thighR: [22, -20, -18], shinR: [66, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.75, label: 'Back to the start', tip: 'Ten circles each way, each leg.', pose: P(stand(), { thighR: [-30, 6, -8], shinR: [40, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), { thighR: [-88, 0, -8], shinR: [82, 0, 0], armR: [-10, 0, 26], foreR: [-64, 0, -18], armL: [-10, 0, -26], foreL: [-64, 0, 18] }) }
    ]
  },

  armCircles: {
    prop: 'none',
    highlight: ['delts', 'traps'],
    camera: { pos: [0.8, 1.5, 3.2], target: [0, 1.15, 0] },
    dur: 3.4,
    frames: [
      { t: 0.00, label: 'Arms out to the sides', tip: 'Stand tall with your arms straight out at shoulder height.', pose: P(stand(), S({ armR: [0, 0, -88], foreR: [-4, 0, 0] })) },
      { t: 0.25, label: 'Circle forward and up', tip: 'Draw small circles that gradually get bigger. Fifteen forward.', pose: P(stand(), S({ armR: [-40, 0, -140], foreR: [-4, 0, 0] })) },
      { t: 0.5, label: 'Overhead', tip: 'Keep the elbows straight and the neck relaxed.', pose: P(stand(), S({ armR: [0, 0, -172], foreR: [-4, 0, 0] })) },
      { t: 0.75, label: 'Down and around', tip: 'Then fifteen backward. Your shoulders should feel warm, not tired.', pose: P(stand(), S({ armR: [40, 0, -120], foreR: [-4, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [0, 0, -88], foreR: [-4, 0, 0] })) }
    ]
  },

  shoulderRotation: {
    prop: 'none',
    highlight: ['delts', 'traps'],
    camera: { pos: [1.2, 1.5, 3.0], target: [0, 1.2, 0] },
    dur: 3.6,
    frames: [
      { t: 0.00, label: 'Hands on shoulders', tip: 'Fingertips on your shoulders, elbows pointing down.', pose: P(stand(), S({ armR: [-24, 0, -30], foreR: [-140, 0, 0] })) },
      { t: 0.28, label: 'Elbows forward and up', tip: 'Bring the elbows together in front, then lift them.', pose: P(stand(), S({ armR: [-96, 20, -20], foreR: [-140, 0, 0] })) },
      { t: 0.55, label: 'Open wide at the top', tip: 'Sweep the elbows out and back, opening the chest.', pose: P(stand(), S({ armR: [-30, -10, -96], foreR: [-140, 0, 0] })) },
      { t: 0.8, label: 'Back down', tip: 'Fifteen slow rotations. This wakes up the rotator cuff before pressing.', pose: P(stand(), S({ armR: [4, 0, -50], foreR: [-140, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-24, 0, -30], foreR: [-140, 0, 0] })) }
    ]
  },

  bandRow: {
    prop: 'cableMid',
    attach: { handR: 'dHandle', handL: 'dHandle' },
    highlight: ['lats', 'traps'],
    camera: { pos: [2.4, 1.4, -1.4], target: [0, 1.05, 0.4] },
    dur: 3.6,
    frames: [
      { t: 0.00, label: 'Arms straight, light tension', tip: 'Warm-up sets only — a light band or cable, 15 easy reps to switch the back on.', pose: P(stand(), S({ armR: [-70, 6, -12], foreR: [-14, 0, 0] })) },
      { t: 0.34, label: 'Pull to the ribs', tip: 'Elbows brush your sides, shoulder blades squeeze together.', pose: P(stand(), S({ armR: [-6, 0, -10], foreR: [-92, 0, 0] })) },
      { t: 0.6, label: 'Return', tip: 'Slow and smooth. Nothing heavy before the working sets.', pose: P(stand(), S({ armR: [-6, 0, -10], foreR: [-92, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(stand(), S({ armR: [-70, 6, -12], foreR: [-14, 0, 0] })) }
    ]
  },

  inclineWalk: {
    prop: 'treadmill',
    propPos: [0, 0, 0.15],
    highlight: ['calves', 'quads', 'glutes'],
    camera: { pos: [2.8, 1.5, 2.4], target: [0, 0.95, -0.1] },
    dur: 2.2,
    frames: [
      { t: 0.00, label: 'Incline walk — 20 to 30 minutes', tip: 'Start around 4.5–5.5 km/h at 5–10% incline. You should be able to hold a broken conversation, not a full one.', pose: P({ root: { p: [0, 0.20, -0.05], r: [0, 0, 0] } }, { spine: [6, 0, 0] }, { thighR: [-32, 0, -5], shinR: [16, 0, 0], footR: [-6, 0, 0], thighL: [22, 0, 5], shinL: [30, 0, 0], footL: [-26, 0, 0], armR: [26, 0, -8], foreR: [-46, 0, 0], armL: [-26, 0, 8], foreL: [-46, 0, 0] }) },
      { t: 0.5, label: 'Hands off the rails', tip: 'Holding on takes 20–30% of the work away. Lower the incline instead if you need to let go.', pose: P({ root: { p: [0, 0.20, -0.05], r: [0, 0, 0] } }, { spine: [6, 0, 0] }, { thighL: [-32, 0, 5], shinL: [16, 0, 0], footL: [-6, 0, 0], thighR: [22, 0, -5], shinR: [30, 0, 0], footR: [-26, 0, 0], armL: [26, 0, 8], foreL: [-46, 0, 0], armR: [-26, 0, -8], foreR: [-46, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: P({ root: { p: [0, 0.20, -0.05], r: [0, 0, 0] } }, { spine: [6, 0, 0] }, { thighR: [-32, 0, -5], shinR: [16, 0, 0], footR: [-6, 0, 0], thighL: [22, 0, 5], shinL: [30, 0, 0], footL: [-26, 0, 0], armR: [26, 0, -8], foreR: [-46, 0, 0], armL: [-26, 0, 8], foreL: [-46, 0, 0] }) }
    ]
  }
};
