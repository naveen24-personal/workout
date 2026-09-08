/* ============================================================
   clips_core.js — the four core patterns
     flexion · hip flexion · anti-extension · anti-rotation
   ============================================================ */
import { S, P, kneel } from './anim.js';

/* lying face-up on the mat: hips 16 cm off the floor, head toward -Z */
const SUP = { root: { p: [0, 0.16, 0.95], r: [-90, 0, 0] } };
const armsDown = S({ armR: [0, 0, -14], foreR: [-6, 0, 0] });

/* forearm plank: face down, head toward +Z, hips ~35 cm up */
const PLANK = { root: { p: [0, 0.445, -0.945], r: [96, 0, 0] } };
const plankArms = S({ armR: [-102, 0, -8], foreR: [-88, 0, 0], handR: [6, 0, 0] });
const plankLegs = S({ thighR: [-20, 0, -4], shinR: [4, 0, 0], footR: [-56, 0, 0] });

/* hanging from the bar (matches clips_pull.js) */
const HANG = { root: { p: [0, 0.41, 0], r: [0, 0, 0] } };
const hangArms = S({ clavR: [0, 0, -6], armR: [0, 0, -166], foreR: [0, 0, -5] });

export const CORE_CLIPS = {

  cableCrunch: {
    prop: 'cableHigh',
    attach: { handR: 'rope', handL: 'rope' },
    highlight: ['abs', 'obliques'],
    camera: { pos: [2.4, 1.3, -1.3], target: [0, 0.85, 0.35] },
    dur: 4.6,
    frames: [
      { t: 0.00, label: 'Start — kneel, rope beside your ears', tip: 'Kneel a step back from the tower with the rope pulled down beside your head. Hips stay directly under your shoulders.', pose: P(kneel(-0.15), { spine: [8, 0, 0], chest: [6, 0, 0] }, S({ armR: [0, 0, -150], foreR: [118, 0, 0] })) },
      { t: 0.30, label: 'Curl the ribs toward the pelvis', tip: 'This is the whole exercise: round your spine and crunch. Your hips must not fold — no hinging.', pose: P(kneel(-0.15), { spine: [30, 0, 0], chest: [16, 0, 0], neck: [12, 0, 0] }, S({ armR: [-16, 0, -142], foreR: [116, 0, 0] })) },
      { t: 0.48, label: 'Elbows toward the thighs, squeeze', tip: 'Hold the crunch for a second at the bottom. The hands never pull — they just hold the rope in place.', pose: P(kneel(-0.15), { spine: [52, 0, 0], chest: [26, 0, 0], neck: [16, 0, 0] }, S({ armR: [-26, 0, -132], foreR: [112, 0, 0] })) },
      { t: 0.62, label: 'Uncurl slowly', tip: 'Three seconds back up, one vertebra at a time, until the abs are stretched again.', pose: P(kneel(-0.15), { spine: [52, 0, 0], chest: [26, 0, 0], neck: [16, 0, 0] }, S({ armR: [-26, 0, -132], foreR: [112, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(kneel(-0.15), { spine: [8, 0, 0], chest: [6, 0, 0] }, S({ armR: [0, 0, -150], foreR: [118, 0, 0] })) }
    ]
  },

  hangingKneeRaise: {
    prop: 'pullup',
    highlight: ['abs', 'obliques', 'forearms'],
    camera: { pos: [2.5, 1.7, 2.7], target: [0, 1.35, 0] },
    dur: 4.8,
    frames: [
      { t: 0.00, label: 'Start — hang still, shoulders packed', tip: 'Hang from the bar with your shoulders pulled down away from your ears. Legs together, body quiet — no swinging.', pose: P(HANG, hangArms, S({ thighR: [-4, 0, -4], shinR: [10, 0, 0] })) },
      { t: 0.28, label: 'Tilt the pelvis, then lift the knees', tip: 'Start by curling your pelvis up toward your ribs. If you only lift the legs, you are training hip flexors instead of abs.', pose: P(HANG, hangArms, { spine: [10, 0, 0] }, S({ thighR: [-48, 0, -5], shinR: [56, 0, 0] })) },
      { t: 0.48, label: 'Knees above hip height', tip: 'Bring the knees up to at least hip level and pause. Higher is better once you can do it without swinging.', pose: P(HANG, hangArms, { spine: [18, 0, 0], chest: [6, 0, 0] }, S({ thighR: [-104, 0, -6], shinR: [96, 0, 0] })) },
      { t: 0.62, label: 'Lower with control', tip: 'Three seconds down. If you start swinging, stop, reset the hang and go again.', pose: P(HANG, hangArms, { spine: [18, 0, 0], chest: [6, 0, 0] }, S({ thighR: [-104, 0, -6], shinR: [96, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(HANG, hangArms, S({ thighR: [-4, 0, -4], shinR: [10, 0, 0] })) }
    ]
  },

  plank: {
    prop: 'mat',
    highlight: ['abs', 'obliques', 'glutes'],
    camera: { pos: [2.6, 1.1, 2.2], target: [0, 0.35, -0.1] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'Elbows under the shoulders', tip: 'Forearms flat, elbows directly beneath your shoulders, feet hip-width apart.', pose: P(PLANK, plankArms, plankLegs, { neck: [-14, 0, 0] }) },
      { t: 0.30, label: 'Squeeze the glutes, tuck the ribs', tip: 'Pull your belly button in and tilt your pelvis so your lower back flattens. A plank is an anti-extension exercise — the job is resisting the sag.', pose: P({ root: { p: [0, 0.435, -0.945], r: [97, 0, 0] } }, plankArms, plankLegs, { spine: [-3, 0, 0], neck: [-12, 0, 0] }) },
      { t: 0.62, label: 'Hold 30–60 seconds, breathing', tip: 'One straight line from your heels to your head. When your hips start to drop, the set is over — quality beats duration.', pose: P({ root: { p: [0, 0.44, -0.945], r: [96.5, 0, 0] } }, plankArms, plankLegs, { neck: [-13, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: P(PLANK, plankArms, plankLegs, { neck: [-14, 0, 0] }) }
    ]
  },

  sidePlank: {
    prop: 'mat',
    highlight: ['obliques', 'abs', 'glutes'],
    camera: { pos: [0.4, 1.2, 3.2], target: [0, 0.4, 0] },
    dur: 5.0,
    frames: [
      { t: 0.00, label: 'On your side, elbow under the shoulder', tip: 'Lie on your right side, prop up on the forearm with the elbow directly under the shoulder. Stack the feet.', pose: P({ root: { p: [0.55, 0.13, 0], r: [0, 0, 72] } }, { armR: [0, 0, -72], foreR: [-88, 0, 0], armL: [0, 0, 34], foreL: [-64, 0, -22], thighR: [0, 0, -2], shinR: [4, 0, 0], thighL: [0, 0, 4], shinL: [6, 0, 0], neck: [0, 0, -8] }) },
      { t: 0.32, label: 'Lift the hips into a straight line', tip: 'Push the floor away and drive the hips up until your body is one straight line from ankle to ear.', pose: P({ root: { p: [0.55, 0.16, 0], r: [0, 0, 70] } }, { armR: [0, 0, -70], foreR: [-88, 0, 0], armL: [0, 0, 34], foreL: [-64, 0, -22], thighR: [0, 0, -2], shinR: [3, 0, 0], thighL: [0, 0, 4], shinL: [4, 0, 0], neck: [0, 0, -6] }) },
      { t: 0.62, label: 'Hold 30–45 seconds each side', tip: 'This is the anti-lateral-flexion pattern — you are stopping your hips from sagging toward the floor. Do both sides.', pose: P({ root: { p: [0.55, 0.16, 0], r: [0, 0, 70] } }, { armR: [0, 0, -70], foreR: [-88, 0, 0], armL: [0, 0, 34], foreL: [-64, 0, -22], thighR: [0, 0, -2], shinR: [3, 0, 0], thighL: [0, 0, 4], shinL: [4, 0, 0], neck: [0, 0, -6] }) },
      { t: 0.97, label: '', tip: '', pose: P({ root: { p: [0.55, 0.13, 0], r: [0, 0, 72] } }, { armR: [0, 0, -72], foreR: [-88, 0, 0], armL: [0, 0, 34], foreL: [-64, 0, -22], thighR: [0, 0, -2], shinR: [4, 0, 0], thighL: [0, 0, 4], shinL: [6, 0, 0], neck: [0, 0, -8] }) }
    ]
  },

  reverseCrunch: {
    prop: 'mat',
    highlight: ['abs'],
    camera: { pos: [2.6, 1.1, 1.8], target: [0, 0.3, 0.1] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Start — knees over the hips', tip: 'Lie on your back, arms flat beside you, knees bent to 90 degrees and stacked over your hips.', pose: P(SUP, armsDown, S({ thighR: [-88, 0, -6], shinR: [88, 0, 0] })) },
      /* the pelvis tilts under a still ribcage: rotate the hips joint and
         counter-rotate the spine, so the head stays on the mat */
      { t: 0.30, label: 'Curl the pelvis off the floor', tip: 'Roll your hips up toward your ribs. The movement is small — a few centimetres of pelvis, not a big leg swing.', pose: P({ root: { p: [0, 0.19, 0.95], r: [-90, 0, 0] } }, armsDown, { hips: [9, 0, 0], spine: [-7, 0, 0] }, S({ thighR: [-108, 0, -6], shinR: [96, 0, 0] })) },
      { t: 0.48, label: 'Knees toward the chest, squeeze', tip: 'Pause for a second at the top with the lower abs fully shortened.', pose: P({ root: { p: [0, 0.22, 0.95], r: [-90, 0, 0] } }, armsDown, { hips: [17, 0, 0], spine: [-13, 0, 0] }, S({ thighR: [-124, 0, -6], shinR: [104, 0, 0] })) },
      { t: 0.62, label: 'Lower slowly — no dropping', tip: 'Take three seconds to place the pelvis back down. Lower back stays in contact with the floor throughout.', pose: P({ root: { p: [0, 0.22, 0.95], r: [-90, 0, 0] } }, armsDown, { hips: [17, 0, 0], spine: [-13, 0, 0] }, S({ thighR: [-124, 0, -6], shinR: [104, 0, 0] })) },
      { t: 0.97, label: '', tip: '', pose: P(SUP, armsDown, S({ thighR: [-88, 0, -6], shinR: [88, 0, 0] })) }
    ]
  },

  deadBug: {
    prop: 'mat',
    highlight: ['abs', 'lowback'],
    camera: { pos: [2.4, 1.3, 1.9], target: [0, 0.35, 0.05] },
    dur: 5.2,
    frames: [
      { t: 0.00, label: 'Start — arms up, knees over hips', tip: 'On your back with both arms pointing at the ceiling and both knees bent at 90 degrees above your hips. Press your lower back gently into the floor.', pose: P(SUP, { armR: [-90, 0, -8], foreR: [-4, 0, 0], armL: [-90, 0, 8], foreL: [-4, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) },
      { t: 0.26, label: 'Extend the opposite arm and leg', tip: 'Right arm back over your head as the left leg straightens out. Move slowly and keep breathing.', pose: P(SUP, { armR: [-168, 0, -8], foreR: [-6, 0, 0], armL: [-90, 0, 8], foreL: [-4, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-26, 0, 6], shinL: [16, 0, 0] }) },
      { t: 0.5, label: 'Back to the middle', tip: 'The rule: if your lower back lifts off the floor, shorten the range. That is your true limit today.', pose: P(SUP, { armR: [-90, 0, -8], foreR: [-4, 0, 0], armL: [-90, 0, 8], foreL: [-4, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) },
      { t: 0.74, label: 'Now the other pair', tip: 'Left arm and right leg. Ten controlled reps each side.', pose: P(SUP, { armL: [-168, 0, 8], foreL: [-6, 0, 0], armR: [-90, 0, -8], foreR: [-4, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0], thighR: [-26, 0, -6], shinR: [16, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: P(SUP, { armR: [-90, 0, -8], foreR: [-4, 0, 0], armL: [-90, 0, 8], foreL: [-4, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) }
    ]
  },

  bicycleCrunch: {
    prop: 'mat',
    highlight: ['obliques', 'abs'],
    camera: { pos: [2.4, 1.3, 1.9], target: [0, 0.35, 0.05] },
    dur: 4.4,
    frames: [
      { t: 0.00, label: 'Hands behind the head, shoulders up', tip: 'Fingertips behind your ears — never pull on your neck. Curl the shoulder blades off the floor and hold them there.', pose: P(SUP, { spine: [22, 0, 0], neck: [14, 0, 0], armR: [-28, 0, -84], foreR: [-118, 0, 0], armL: [-28, 0, 84], foreL: [-118, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) },
      { t: 0.26, label: 'Rotate — right elbow to left knee', tip: 'Turn from the ribcage, not the elbow. The opposite leg extends straight out at the same time.', pose: P(SUP, { spine: [26, -18, 0], chest: [6, -14, 0], neck: [12, 0, 0], armR: [-28, 0, -84], foreR: [-118, 0, 0], armL: [-28, 0, 84], foreL: [-118, 0, 0], thighL: [-96, 0, 6], shinL: [78, 0, 0], thighR: [-24, 0, -6], shinR: [18, 0, 0] }) },
      { t: 0.5, label: 'Through the middle', tip: 'Slow is the point. Three seconds per rotation beats thirty fast ones.', pose: P(SUP, { spine: [24, 0, 0], neck: [13, 0, 0], armR: [-28, 0, -84], foreR: [-118, 0, 0], armL: [-28, 0, 84], foreL: [-118, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) },
      { t: 0.74, label: 'Left elbow to right knee', tip: 'Keep your lower back pressed into the mat and your shoulders off the floor the entire set.', pose: P(SUP, { spine: [26, 18, 0], chest: [6, 14, 0], neck: [12, 0, 0], armR: [-28, 0, -84], foreR: [-118, 0, 0], armL: [-28, 0, 84], foreL: [-118, 0, 0], thighR: [-96, 0, -6], shinR: [78, 0, 0], thighL: [-24, 0, 6], shinL: [18, 0, 0] }) },
      { t: 0.97, label: '', tip: '', pose: P(SUP, { spine: [22, 0, 0], neck: [14, 0, 0], armR: [-28, 0, -84], foreR: [-118, 0, 0], armL: [-28, 0, 84], foreL: [-118, 0, 0], thighR: [-88, 0, -6], shinR: [88, 0, 0], thighL: [-88, 0, 6], shinL: [88, 0, 0] }) }
    ]
  }
};
