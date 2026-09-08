/* ============================================================
   exercises.js — the exercise library
   Each entry drives one 3D animation plus the written coaching
   that sits beside it: how to set up, how to hold, how to move,
   what to feel, and what usually goes wrong.
   ============================================================ */

export const EX = {

  /* ============================ PUSH ============================ */
  'machine-chest-press': {
    name: 'Machine Chest Press', clip: 'machineChestPress',
    group: 'Chest', equip: 'Machine', pattern: 'Push',
    why: 'The safest way to load the chest hard. The machine holds the path for you, so all your attention goes on the muscle instead of on balancing.',
    setup: [
      'Adjust the seat so the handles line up with the middle of your chest — roughly nipple height. Too high and it becomes a shoulder exercise.',
      'Sit right back so your head, upper back and bum are all touching the pad.',
      'Feet flat on the floor, slightly wider than your hips.',
      'Grip the handles with a full grip, thumbs wrapped, wrists straight — not bent back.',
      'Pull your shoulder blades down and back into the pad and keep them there for the whole set.'
    ],
    execute: [
      'Take a breath in, brace your stomach lightly.',
      'Press the handles away from you, elbows travelling at about 45° to your body.',
      'Stop just short of locking your elbows out and squeeze the chest for a beat.',
      'Take 2–3 seconds to let the handles come back until your hands are level with your chest.',
      'Breathe out on the press, in on the way back.'
    ],
    cues: ['Chest up, shoulders down', 'Push the floor away with your feet', 'Elbows at 45°, not flared to 90°'],
    mistakes: ['Letting the shoulders roll forward at the end of the press', 'Bouncing the weight stack at the bottom', 'Setting the seat too low so the handles press upward into the shoulders'],
    tempo: '2–3 s down · 1 s squeeze · controlled press', rest: '2–3 min'
  },

  'incline-machine-press': {
    name: 'Incline Machine Press', clip: 'inclineMachinePress',
    group: 'Chest', equip: 'Machine', pattern: 'Push',
    why: 'Biases the upper chest, which is the part that gives the chest a fuller, squarer look.',
    setup: [
      'Set the seat so the handles sit at the top of your chest / collarbone height.',
      'Back flat against the inclined pad, feet planted.',
      'Full grip on the handles, wrists straight and stacked over the elbows.'
    ],
    execute: [
      'Press up and away along the angle of the pad.',
      'Stop just short of lockout, squeeze, then lower for three seconds.',
      'Keep your ribs pulled down — do not arch your lower back off the pad to move more weight.'
    ],
    cues: ['Push up and slightly away', 'Ribs down', 'Shoulders pinned to the pad'],
    mistakes: ['Arching the lower back off the seat', 'Letting the elbows flare straight out to the sides'],
    tempo: '3 s down · press smoothly', rest: '2–3 min'
  },

  'incline-db-press': {
    name: 'Incline Dumbbell Press', clip: 'inclineDbPress',
    group: 'Chest', equip: 'Dumbbells', pattern: 'Push',
    why: 'Free weights make each side work on its own and allow a deeper stretch than a machine.',
    setup: [
      'Set the bench to about 30°. Steeper than 45° and your shoulders take over.',
      'Sit down with a dumbbell resting on each thigh.',
      'Kick one knee up at a time to help each dumbbell into position as you lie back.',
      'Start with the dumbbells just outside your shoulders, palms facing forward.',
      'Plant both feet, squeeze the shoulder blades back and down into the bench.'
    ],
    execute: [
      'Press the dumbbells up and slightly together.',
      'Stop a few centimetres apart at the top — do not clang them together.',
      'Lower for three seconds until your hands are level with your chest and you feel a stretch.',
      'To finish the set, bring the dumbbells to your chest, tuck your chin and sit up with them.'
    ],
    cues: ['Wrists over elbows', 'Chest to the ceiling', 'Stretch at the bottom, squeeze at the top'],
    mistakes: ['Letting the elbows drop far below the bench and straining the shoulder', 'Bouncing the dumbbells at the top', 'Using a bench angle that is too steep'],
    tempo: '3 s down · 1 s pause · press', rest: '2–3 min'
  },

  'flat-db-press': {
    name: 'Flat Dumbbell Bench Press', clip: 'flatDbPress',
    group: 'Chest', equip: 'Dumbbells', pattern: 'Push',
    why: 'The classic chest builder. Dumbbells let the arms move naturally and even out left/right strength differences.',
    setup: [
      'Lie back with your head, upper back and hips on the bench, feet flat on the floor.',
      'Keep a small natural arch in the lower back — not a big bridge.',
      'Dumbbells at chest level, palms facing forward, wrists straight.'
    ],
    execute: [
      'Press up until the arms are almost straight, squeezing the chest.',
      'Lower for 2–3 seconds until your hands are beside your chest.',
      'Keep the shoulder blades pulled together throughout.'
    ],
    cues: ['Squeeze the blades together', 'Drive your feet into the floor', 'Elbows at 45°'],
    mistakes: ['Flaring the elbows to 90°', 'Lifting the hips off the bench', 'Half reps'],
    tempo: '2–3 s down · press', rest: '2–3 min'
  },

  'pec-deck-fly': {
    name: 'Pec-Deck / Cable Fly', clip: 'pecDeckFly',
    group: 'Chest', equip: 'Machine', pattern: 'Push',
    why: 'An isolation move — the elbow angle stays fixed so the chest does all the work of bringing the arms together.',
    setup: [
      'Set the seat so the handles are at roughly chest height.',
      'Sit with your back flat on the pad, feet planted.',
      'Grip the handles with a very slight bend in the elbows and keep that same bend all set.'
    ],
    execute: [
      'Sweep the arms together in front of your chest as if hugging a barrel.',
      'Squeeze for a second when the hands nearly touch.',
      'Open slowly until you feel a stretch across the chest, then reverse.'
    ],
    cues: ['Fixed elbow angle', 'Hug a barrel', 'Chest leads, hands follow'],
    mistakes: ['Turning it into a press by bending and straightening the elbows', 'Opening so far that the front of the shoulder pinches'],
    tempo: '3 s open · 1 s squeeze', rest: '60–90 s'
  },

  'cable-fly': {
    name: 'Standing Cable Fly', clip: 'cableFly',
    group: 'Chest', equip: 'Cable', pattern: 'Push',
    why: 'Constant tension from the cables, and the crossover at the end gives a harder contraction than a machine fly.',
    setup: [
      'Set both pulleys high (or use one at a time). Take a handle in each hand.',
      'Step forward into a split stance and lean very slightly forward.',
      'Soften the elbows and lock that angle.'
    ],
    execute: [
      'Draw the hands down and together in front of your belly button.',
      'Cross one hand slightly over the other and squeeze for a second.',
      'Let the cables pull your arms back open under control.'
    ],
    cues: ['Lead with the elbows', 'Cross at the bottom', 'Resist on the way back'],
    mistakes: ['Standing too far back so the shoulders take the strain', 'Using so much weight that the torso swings'],
    tempo: '3 s open · 1 s squeeze', rest: '60–90 s'
  },

  'seated-db-shoulder-press': {
    name: 'Seated Dumbbell Shoulder Press', clip: 'seatedDbShoulderPress',
    group: 'Shoulders', equip: 'Dumbbells', pattern: 'Push',
    why: 'The main mass builder for the front and side of the shoulder.',
    setup: [
      'Set a bench upright (or nearly upright) and sit with your back against it.',
      'Rest the dumbbells on your thighs, then kick them up one at a time to shoulder height.',
      'Start with your elbows just outside your shoulders, palms facing forward, wrists stacked over the elbows.',
      'Feet flat, ribs pulled down so your lower back stays against the pad.'
    ],
    execute: [
      'Press straight up until the arms are almost straight, biceps near your ears.',
      'Let the shoulders shrug up slightly at the very top — that is normal and healthy.',
      'Lower for three seconds until your elbows are back at shoulder height.'
    ],
    cues: ['Ribs down, no arching', 'Press up, not forward', 'Wrists stacked over elbows'],
    mistakes: ['Arching the lower back to press heavier weights', 'Stopping the descent way above ear level', 'Flaring the elbows straight out to the sides at the bottom'],
    tempo: '3 s down · press', rest: '2–3 min'
  },

  'machine-shoulder-press': {
    name: 'Machine Shoulder Press', clip: 'machineShoulderPress',
    group: 'Shoulders', equip: 'Machine', pattern: 'Push',
    why: 'Lets you push close to failure safely, because you never have to control the weight overhead by yourself.',
    setup: [
      'Set the seat so the handles start just above shoulder height.',
      'Back flat on the pad, feet planted, full grip on the handles.'
    ],
    execute: [
      'Press up and slightly back so the path stays over your shoulders.',
      'Stop just short of locking out.',
      'Lower for three seconds to the start.'
    ],
    cues: ['Stack the wrists over the elbows', 'No shrugging into the ears'],
    mistakes: ['Setting the seat too low, which turns it into an awkward incline press'],
    tempo: '3 s down · press', rest: '2 min'
  },

  'db-lateral-raise': {
    name: 'Dumbbell / Cable Lateral Raise', clip: 'dbLateralRaise',
    group: 'Shoulders', equip: 'Dumbbells', pattern: 'Push',
    why: 'The only exercise that really targets the side delt — which is what makes the shoulders look wider and the waist look narrower.',
    setup: [
      'Stand tall, feet hip-width, a light dumbbell in each hand beside your thighs.',
      'Tiny bend in the elbows, thumbs pointing slightly forward.',
      'Brace your abs so your body cannot swing.'
    ],
    execute: [
      'Raise the dumbbells out to the sides, leading with the elbows.',
      'Stop when your wrists are level with your shoulders.',
      'Take three seconds to lower them back down.'
    ],
    cues: ['Lead with the elbow', 'Pour the jug', 'Body stays completely still'],
    mistakes: ['Swinging the weight up with the hips', 'Going above shoulder height and turning it into a trap exercise', 'Using far too much weight — this is a small muscle'],
    tempo: '1 s up · 3 s down', rest: '60–90 s'
  },

  'face-pull': {
    name: 'Face Pull', clip: 'facePull',
    group: 'Shoulders', equip: 'Cable', pattern: 'Pull',
    why: 'Rear delts and upper back. This is the exercise that keeps your shoulders healthy when you press twice a week.',
    setup: [
      'Set the pulley at about eye height and attach a rope.',
      'Take one end in each hand with your thumbs pointing back at you.',
      'Step back until the cable is under tension, feet staggered.'
    ],
    execute: [
      'Pull the rope toward your face while pulling the two ends apart.',
      'Finish with your hands either side of your head and your upper arms parallel to the floor.',
      'Squeeze for a second, then return slowly.'
    ],
    cues: ['Elbows high', 'Pull apart as you pull in', 'Hands beside the ears'],
    mistakes: ['Using so much weight that you lean back and row it', 'Letting the elbows drop below shoulder height'],
    tempo: 'Smooth · 1 s hold', rest: '60–90 s'
  },

  'rope-pushdown': {
    name: 'Rope Triceps Pushdown', clip: 'ropePushdown',
    group: 'Triceps', equip: 'Cable', pattern: 'Push',
    why: 'Simple, safe and easy to progress. Hits all three triceps heads with the rope split at the bottom.',
    setup: [
      'Attach a rope to a high pulley.',
      'Stand close to the tower, feet hip-width, one foot slightly forward, small lean at the hips.',
      'Take one end of the rope in each hand, thumbs on top.',
      'Pin your elbows to your ribs — that is the position they must stay in.'
    ],
    execute: [
      'Push down by straightening the elbows only.',
      'At the bottom, pull the rope ends slightly apart and squeeze for a beat.',
      'Let the rope come back up until your forearms pass parallel with the floor.'
    ],
    cues: ['Elbows glued to your sides', 'Only the forearms move', 'Spread the rope at the bottom'],
    mistakes: ['Letting the elbows drift forward', 'Leaning over the weight to force reps', 'Shrugging the shoulders up'],
    tempo: '2 s up · 1 s squeeze', rest: '60–90 s'
  },

  'overhead-cable-ext': {
    name: 'Overhead Cable Triceps Extension', clip: 'overheadCableExt',
    group: 'Triceps', equip: 'Cable', pattern: 'Push',
    why: 'Loads the long head of the triceps in a stretched position, which pushdowns never do.',
    setup: [
      'Attach a rope to a high pulley and take it with both hands.',
      'Turn to face away from the tower and step forward into a split stance.',
      'Bring your hands up beside your ears with your elbows bent and the rope behind your head.'
    ],
    execute: [
      'Keeping your upper arms still, extend the elbows until the arms are straight.',
      'Squeeze for a second.',
      'Let the rope pull your hands back behind your head under control — that stretch is the point.'
    ],
    cues: ['Upper arms beside the ears', 'Only the elbows move', 'Feel the stretch behind the arm'],
    mistakes: ['Letting the elbows flare wide', 'Letting the upper arms drop forward on every rep'],
    tempo: '3 s stretch · 1 s squeeze', rest: '60–90 s'
  },

  'single-arm-cable-ext': {
    name: 'Single-Arm Cable Extension', clip: 'singleArmCableExt',
    group: 'Triceps', equip: 'Cable', pattern: 'Push',
    why: 'One arm at a time means no strong side compensating, and you can turn the hand for a harder contraction.',
    setup: [
      'Single handle on a high pulley, one hand on it, the other on your hip.',
      'Stand tall and close, elbow tight to your side.'
    ],
    execute: [
      'Straighten the arm fully, hold for a second.',
      'Return under control without letting the elbow travel.',
      'Complete all reps, then swap sides.'
    ],
    cues: ['Elbow welded to your ribs', 'Full lockout each rep'],
    mistakes: ['Twisting the torso to help', 'Short reps that never fully straighten the arm'],
    tempo: '2 s up · 1 s squeeze', rest: '60 s'
  },

  /* ============================ PULL ============================ */
  'lat-pulldown': {
    name: 'Lat Pulldown', clip: 'latPulldown',
    group: 'Back', equip: 'Machine', pattern: 'Pull',
    why: 'The direct rehearsal for your pull-up. Same movement, but you choose the load.',
    setup: [
      'Set the thigh pads snug so you stay in the seat when you pull.',
      'Stand up, grip the bar just outside shoulder width, then sit down with straight arms.',
      'Feet flat on the floor, chest lifted, small lean back — about 10–15°, and keep it there.'
    ],
    execute: [
      'First pull your shoulder blades down away from your ears, arms still straight.',
      'Then drive your elbows down toward your ribs until the bar reaches your collarbone.',
      'Squeeze for a beat, then let the bar rise for three seconds until your shoulders stretch overhead.'
    ],
    cues: ['Shoulders down first, then elbows', 'Elbows into your back pockets', 'Chest to the bar'],
    mistakes: ['Pulling the bar behind your neck', 'Rocking backwards and forwards to move the weight', 'Yanking with the arms while the shoulders stay shrugged'],
    tempo: '3 s up · 1 s squeeze', rest: '2 min'
  },

  'single-arm-lat-pulldown': {
    name: 'Single-Arm Lat Pulldown', clip: 'singleArmLatPulldown',
    group: 'Back', equip: 'Cable', pattern: 'Pull',
    why: 'A longer range than the bar version and it evens out side-to-side differences.',
    setup: [
      'Attach a single handle to the high pulley and sit slightly off-centre.',
      'Free hand on the thigh pad or your knee.',
      'Let the working shoulder stretch fully upward at the start.'
    ],
    execute: [
      'Pull the elbow down and back until the handle is beside your ribs.',
      'Allow a small, controlled torso rotation — do not twist violently.',
      'Return all the way to the stretch. Complete all reps, then swap.'
    ],
    cues: ['Reach up first', 'Elbow to the hip', 'Long stretch at the top'],
    mistakes: ['Turning it into a twisting contest', 'Cutting the stretch short'],
    tempo: '3 s up · 1 s squeeze', rest: '90 s'
  },

  'seated-cable-row': {
    name: 'Seated Cable Row', clip: 'seatedCableRow',
    group: 'Back', equip: 'Cable', pattern: 'Pull',
    why: 'Builds thickness through the middle back, and teaches the shoulder-blade control you need for pull-ups.',
    setup: [
      'Sit with your feet on the plate and your knees slightly bent — never locked straight.',
      'Take the handle, sit up tall, chest lifted.',
      'Let your arms straighten and your shoulder blades travel forward, but keep your lower back neutral. Do not round it.'
    ],
    execute: [
      'Sit up to vertical first, then pull the handle to your belly button.',
      'Elbows brush past your sides; squeeze the shoulder blades together at the end.',
      'Hold for a second, then take three seconds to let the arms straighten again.'
    ],
    cues: ['Stable torso, no rocking', 'Elbows past the ribs', 'Squeeze the blades'],
    mistakes: ['Heaving backwards and forwards with the whole torso', 'Rounding the lower back at the stretch', 'Shrugging the shoulders into the ears'],
    tempo: '3 s return · 1 s squeeze', rest: '2 min'
  },

  'chest-supported-row': {
    name: 'Chest-Supported Dumbbell Row', clip: 'chestSupportedRow',
    group: 'Back', equip: 'Dumbbells', pattern: 'Pull',
    why: 'The pad removes all cheating, so the back has to do every bit of the work. Also the friendliest row for the lower back.',
    setup: [
      'Set a bench to about 30° and lie face down with your chest on the pad.',
      'Feet planted on the floor behind you for balance.',
      'Let the dumbbells hang straight down with your arms fully extended.'
    ],
    execute: [
      'Row the elbows up and back until the dumbbells reach your hips.',
      'Squeeze the shoulder blades together for a second.',
      'Lower for three seconds to a complete stretch.'
    ],
    cues: ['Chest stays glued to the pad', 'Elbows past your ribs', 'Full stretch at the bottom'],
    mistakes: ['Lifting the chest off the pad to swing the weight', 'Shrugging instead of rowing'],
    tempo: '3 s down · 1 s squeeze', rest: '90 s'
  },

  'straight-arm-pulldown': {
    name: 'Straight-Arm Cable Pulldown', clip: 'straightArmPulldown',
    group: 'Back', equip: 'Cable', pattern: 'Pull',
    why: 'Isolates the lats without the biceps joining in — perfect as a finisher, and it teaches you what "using your lats" feels like.',
    setup: [
      'High pulley with a rope or straight bar.',
      'Stand a step back, hinge slightly at the hips, arms almost straight and reaching up.',
      'Lock a small bend in the elbows and keep it.'
    ],
    execute: [
      'Sweep the arms down in an arc until the rope reaches your thighs.',
      'Squeeze the lats for a second.',
      'Let the arms travel back up until you feel the stretch.'
    ],
    cues: ['Elbow angle never changes', 'Sweep, do not press', 'Feel it in the armpit, not the triceps'],
    mistakes: ['Bending and straightening the elbows so it becomes a pushdown', 'Standing too upright and losing the stretch'],
    tempo: '2 s down · 3 s up', rest: '60–90 s'
  },

  'reverse-pec-deck': {
    name: 'Reverse Pec Deck', clip: 'reversePecDeck',
    group: 'Rear delts', equip: 'Machine', pattern: 'Pull',
    why: 'Rear delts balance out all the pressing you do on push days and pull the shoulders back into good posture.',
    setup: [
      'Turn the seat around so you face the machine with your chest against the pad.',
      'Set the handles so your arms are straight out in front at shoulder height.',
      'Very slight bend in the elbows, thumbs up or palms in.'
    ],
    execute: [
      'Open the arms wide, leading with the elbows.',
      'Stop when your arms are level with your shoulders and squeeze.',
      'Return slowly under control.'
    ],
    cues: ['Chest stays on the pad', 'Think shoulder blades, not hands', 'Neck relaxed'],
    mistakes: ['Too much weight, which turns it into a shrug', 'Bending the elbows to cheat the range'],
    tempo: '3 s return · 1 s squeeze', rest: '60 s'
  },

  'db-curl': {
    name: 'Dumbbell Curl', clip: 'dbCurl',
    group: 'Biceps', equip: 'Dumbbells', pattern: 'Pull',
    why: 'Direct biceps work with a full stretch at the bottom and a full squeeze at the top.',
    setup: [
      'Stand tall, feet hip-width, dumbbells beside your thighs with the palms facing forward.',
      'Elbows tucked in beside your ribs, shoulders back.'
    ],
    execute: [
      'Curl up without letting the elbows drift forward.',
      'Squeeze hard at the top for a second.',
      'Lower for three seconds until the arms are completely straight.'
    ],
    cues: ['Elbows pinned', 'No body swing', 'Full stretch at the bottom'],
    mistakes: ['Swinging the weight up with the lower back', 'Stopping halfway down', 'Letting the elbows travel forward at the top'],
    tempo: '1 s up · 1 s squeeze · 3 s down', rest: '60–90 s'
  },

  'hammer-curl': {
    name: 'Hammer Curl', clip: 'hammerCurl',
    group: 'Biceps', equip: 'Dumbbells', pattern: 'Pull',
    why: 'Hits the brachialis and forearm — this is what makes the arm look thicker from the side, and it strengthens your grip for pull-ups.',
    setup: [
      'Same stance as a normal curl, but hold the dumbbells with your palms facing each other.',
      'Wrists straight, elbows in.'
    ],
    execute: [
      'Curl straight up without rotating the wrist.',
      'Squeeze, then lower for three seconds.'
    ],
    cues: ['Thumbs up the whole way', 'No wrist rotation', 'Elbows still'],
    mistakes: ['Swinging', 'Letting the wrists bend back under the weight'],
    tempo: '1 s up · 3 s down', rest: '60–90 s'
  },

  'ez-bar-curl': {
    name: 'EZ-Bar Curl', clip: 'ezBarCurl',
    group: 'Biceps', equip: 'Barbell', pattern: 'Pull',
    why: 'Lets you load both arms together, and the angled bar is much kinder to the wrists than a straight one.',
    setup: [
      'Take the angled part of the bar so your palms sit at a comfortable angle.',
      'Stand tall, elbows in, knees softly bent, bar resting against your thighs.'
    ],
    execute: [
      'Curl the bar up in an arc, upper arms staying vertical.',
      'Squeeze at the top, then lower for three seconds to straight arms.'
    ],
    cues: ['Upper arms vertical', 'No leaning back', 'Control the negative'],
    mistakes: ['Using the lower back to heave the bar up', 'Half reps'],
    tempo: '1 s up · 3 s down', rest: '90 s'
  },

  /* ====================== PULL-UP PROGRESSION ====================== */
  'dead-hang': {
    name: 'Dead Hang', clip: 'deadHang',
    group: 'Pull-up', equip: 'Bar', pattern: 'Pull', level: 0,
    why: 'Builds the grip and the shoulder tolerance that everything else in the progression needs.',
    setup: [
      'Grip the bar slightly wider than your shoulders with your thumbs wrapped around it.',
      'Step or jump up so your arms are straight and your feet are off the floor.',
      'Cross your ankles behind you.'
    ],
    execute: [
      'Hang relaxed for 20–40 seconds, breathing normally.',
      'Keep the body still — no swinging.',
      'Build up to 3 sets of 45 seconds.'
    ],
    cues: ['Breathe', 'Still body', 'Full grip, thumbs wrapped'],
    mistakes: ['Swinging to pass the time', 'Gripping with the fingertips only'],
    tempo: 'Hold', rest: '60–90 s'
  },

  'scap-pullup': {
    name: 'Scapular Pull-up', clip: 'scapPullup',
    group: 'Pull-up', equip: 'Bar', pattern: 'Pull', level: 1,
    why: 'Teaches the first few centimetres of a pull-up. Almost everyone who cannot do a pull-up has never learned to start the movement with the shoulder blades.',
    setup: [
      'Hang from the bar with completely straight arms.',
      'Let your shoulders rise up toward your ears — this relaxed position is the start.'
    ],
    execute: [
      'Without bending your elbows at all, pull your shoulders down away from your ears.',
      'Your whole body rises a few centimetres. That is the rep.',
      'Hold for two seconds at the top, then let the shoulders rise again slowly.',
      '3 sets of 5–8 reps.'
    ],
    cues: ['Arms stay straight', 'Shoulders away from the ears', 'Chest lifts slightly'],
    mistakes: ['Bending the elbows and turning it into a tiny pull-up', 'Rushing — the hold is the exercise'],
    tempo: '2 s hold at the top', rest: '60–90 s'
  },

  'assisted-pullup': {
    name: 'Assisted Pull-up', clip: 'assistedPullup',
    group: 'Pull-up', equip: 'Machine', pattern: 'Pull', level: 2,
    why: 'Your main pull-up exercise. The counterweight lets you practise the real movement with perfect form, and you reduce it as you get stronger.',
    setup: [
      'Set the assistance so you can complete 5–8 clean reps — not so light that you fail at 3, not so heavy that you could do 20.',
      'Step onto the frame and place both knees (or feet) on the pad.',
      'Grip the bar slightly wider than shoulder width, thumbs wrapped.',
      'Let your arms straighten completely and brace your abs.'
    ],
    execute: [
      'Pull your shoulders down first, then drive your elbows down toward your sides.',
      'Bring your chest toward the bar until your chin clears it.',
      'Pause briefly at the top.',
      'Lower yourself for three seconds until the arms are completely straight.'
    ],
    cues: ['Shoulders down, then elbows down', 'Chest to the bar', 'Full straight arms at the bottom'],
    mistakes: ['Bouncing off the pad at the bottom', 'Half reps that never reach a straight-arm hang', 'Craning the neck to get the chin over instead of pulling the chest up'],
    tempo: '3 s down · 1 s pause', rest: '2 min'
  },

  'negative-pullup': {
    name: 'Negative Pull-up', clip: 'negativePullup',
    group: 'Pull-up', equip: 'Bar', pattern: 'Pull', level: 3,
    why: 'You are far stronger lowering than lifting, so this lets you handle your full bodyweight long before you can pull it up.',
    setup: [
      'Put a step or box under the bar so you can get your chin above it easily.',
      'Grip the bar, step up until your chin is over it, and brace hard.',
      'Take your feet off the step.'
    ],
    execute: [
      'Lower yourself for a slow five-count. Count out loud if it helps.',
      'Fight the descent all the way to straight arms — no dropping at the end.',
      'Step back up to the top. Never jump back up.',
      '3 sets of 3 reps. When you can control an 8-second negative, full pull-ups are close.'
    ],
    cues: ['Five seconds, every rep', 'Shoulders stay packed', 'Step up, never jump'],
    mistakes: ['Free-falling the last third', 'Doing so many that form collapses — 3 quality reps beats 8 sloppy ones'],
    tempo: '5–8 s lower', rest: '2 min'
  },

  'band-pullup': {
    name: 'Band-Assisted Pull-up', clip: 'bandPullup',
    group: 'Pull-up', equip: 'Band', pattern: 'Pull', level: 4,
    why: 'The band helps most at the bottom, which is exactly where you are weakest — and gives almost no help at the top, where you must do the work yourself.',
    setup: [
      'Loop a resistance band over the bar and pull one end through itself.',
      'Grip the bar, then step one foot into the loop and cross the other ankle behind.',
      'Let yourself down into a straight-arm hang.'
    ],
    execute: [
      'Pull exactly as you would a normal pull-up: shoulders down, elbows to your ribs, chest to the bar.',
      'Pause at the top, then lower under control.',
      'When you can do 8 clean reps, move to a lighter band.'
    ],
    cues: ['Body stays tight — the band makes it easy to swing', 'Chest to the bar', 'Controlled descent'],
    mistakes: ['Bouncing out of the bottom on the band', 'Jumping band sizes too quickly'],
    tempo: '3 s down · 1 s pause', rest: '2 min'
  },

  'full-pullup': {
    name: 'Full Pull-up', clip: 'fullPullup',
    group: 'Pull-up', equip: 'Bar', pattern: 'Pull', level: 5,
    why: 'The goal. One clean rep from a dead hang is worth more than five kipping half reps.',
    setup: [
      'Hands just outside shoulder width, thumbs wrapped around the bar.',
      'Hang with completely straight arms.',
      'Squeeze your glutes and brace your abs so the body is one rigid unit.'
    ],
    execute: [
      'Pull the shoulders down, then drive the elbows down and back.',
      'Lead with the chest, not the chin — clear the bar with the chest coming up.',
      'Lower for 2–3 seconds to a full dead hang. That is one honest rep.'
    ],
    cues: ['Dead hang → brace → elbows down → chest to bar → controlled descent'],
    mistakes: ['Kipping and swinging', 'Stopping short of a full hang between reps'],
    tempo: '2–3 s down', rest: '2–3 min'
  },

  /* ============================ LEGS ============================ */
  'leg-press': {
    name: 'Leg Press', clip: 'legPress',
    group: 'Quads', equip: 'Machine', pattern: 'Legs',
    why: 'Lets you load the legs heavily with your back fully supported — ideal while you are still learning to squat.',
    setup: [
      'Sit right back so your lower back and head stay against the pad.',
      'Place your feet shoulder-width in the middle of the plate, toes turned very slightly out.',
      'Hold the handles at the side.',
      'Release the safety catches.'
    ],
    execute: [
      'Lower the plate under control until your knees reach about 90° — or as deep as you can go before your hips roll off the pad.',
      'Press back up through your mid-foot and heel.',
      'Stop just short of locking the knees at the top.'
    ],
    cues: ['Back and head on the pad', 'Knees track over the toes', 'Never snap the knees straight'],
    mistakes: ['Letting the lower back round off the pad at the bottom', 'Knees caving inward', 'Aggressively locking out the knees'],
    tempo: '3 s down · press', rest: '2–3 min'
  },

  'goblet-squat': {
    name: 'Goblet Squat', clip: 'gobletSquat',
    group: 'Quads', equip: 'Dumbbell', pattern: 'Legs',
    why: 'The friendliest way to learn a squat — holding the weight in front automatically keeps your chest up.',
    setup: [
      'Hold one dumbbell vertically against your chest, or a plate with both hands.',
      'Feet shoulder-width, toes turned out about 15°.',
      'Chest tall, ribs down, abs braced.'
    ],
    execute: [
      'Sit down between your heels, pushing the hips back and down together.',
      'Let the knees travel forward and outward, never inward.',
      'Go as deep as you can with the heels down and the lower back neutral.',
      'Drive up through the whole foot and squeeze the glutes at the top.'
    ],
    cues: ['Elbows inside the knees at the bottom', 'Heels stay down', 'Knees out'],
    mistakes: ['Heels lifting off the floor', 'Knees collapsing inward', 'Rounding the lower back at the bottom'],
    tempo: '2–3 s down · drive up', rest: '2 min'
  },

  'leg-extension': {
    name: 'Leg Extension', clip: 'legExtension',
    group: 'Quads', equip: 'Machine', pattern: 'Legs',
    why: 'Pure quad isolation — useful at the end of a leg day when the compound lifts are done.',
    setup: [
      'Sit right back so the machine\'s pivot lines up with your knee joint.',
      'Set the roller so it rests just above your ankles.',
      'Hold the handles and keep your bum on the seat.'
    ],
    execute: [
      'Straighten the knees smoothly — no kicking.',
      'Squeeze the quads for a second at the top.',
      'Lower for three seconds back to 90°.'
    ],
    cues: ['Smooth, not explosive', 'Squeeze at the top', 'Bum stays down'],
    mistakes: ['Slamming into lockout with heavy weight', 'Lifting the hips off the seat'],
    tempo: '1 s up · 1 s hold · 3 s down', rest: '60–90 s'
  },

  'romanian-deadlift': {
    name: 'Romanian Deadlift (RDL)', clip: 'romanianDeadlift',
    group: 'Hamstrings', equip: 'Dumbbells', pattern: 'Legs',
    why: 'The best hamstring and glute builder, and it teaches the hip hinge — the single most useful movement pattern to own.',
    setup: [
      'Hold a dumbbell in each hand (or a barbell) resting against the front of your thighs.',
      'Feet hip-width, knees softly bent — and that bend never changes.',
      'Shoulders pulled back, chest tall, abs braced.'
    ],
    execute: [
      'Push your hips backwards as if closing a car door with your bum.',
      'Let the weights slide down the front of your legs, staying in contact.',
      'Stop when you feel a strong stretch in the hamstrings — usually just below the knee.',
      'Drive the hips forward to stand up and squeeze the glutes at the top.'
    ],
    cues: ['Hips backwards, not down', 'Weights stay close to the legs', 'Neutral spine — chest proud'],
    mistakes: ['Turning it into a squat by bending the knees', 'Rounding the lower back to reach lower', 'Leaning back at the top'],
    tempo: '3 s down · drive up', rest: '2–3 min'
  },

  'leg-curl': {
    name: 'Lying / Seated Leg Curl', clip: 'legCurl',
    group: 'Hamstrings', equip: 'Machine', pattern: 'Legs',
    why: 'The RDL trains the hamstrings at the hip; the curl trains them at the knee. You want both.',
    setup: [
      'Lie face down with your knees just off the end of the pad.',
      'The roller sits across the back of your ankles.',
      'Hold the handles and press your hips into the pad.'
    ],
    execute: [
      'Curl your heels toward your bum.',
      'Squeeze the hamstrings hard at the top for a second.',
      'Lower for three seconds to almost straight.'
    ],
    cues: ['Hips stay down', 'Toes pulled toward the shins', 'Squeeze at the top'],
    mistakes: ['Lifting the hips to swing the weight up', 'Letting the stack crash down'],
    tempo: '1 s up · 3 s down', rest: '60–90 s'
  },

  'bulgarian-split-squat': {
    name: 'Bulgarian Split Squat', clip: 'bulgarianSplitSquat',
    group: 'Quads', equip: 'Dumbbells', pattern: 'Legs',
    why: 'Brutal, effective and it fixes side-to-side imbalances. Also demands a lot of balance, which trains the core for free.',
    setup: [
      'Stand about one stride in front of a bench.',
      'Place the top of your rear foot on the bench.',
      'The front foot should be far enough forward that at the bottom your knee stays over your ankle.',
      'Dumbbells hanging at your sides, chest tall.'
    ],
    execute: [
      'Lower straight down by bending the front knee, dropping the back knee toward the floor.',
      'Keep most of your weight on the front leg — the back leg is only for balance.',
      'Pause at the bottom, then drive up through the front heel.',
      'Complete all reps on one side, then swap.'
    ],
    cues: ['Front shin near vertical', 'Small forward lean is fine', 'Push the floor away with the front foot'],
    mistakes: ['Standing too close to the bench so the front knee is crushed forward', 'Pushing off the back foot'],
    tempo: '3 s down · drive up', rest: '90 s each side'
  },

  'calf-raise': {
    name: 'Standing / Seated Calf Raise', clip: 'calfRaise',
    group: 'Calves', equip: 'Machine', pattern: 'Legs',
    why: 'Calves need full range and a real pause — they are used to your bodyweight all day, so half reps do nothing.',
    setup: [
      'Balls of the feet on the block or platform, heels hanging off.',
      'Pads on the shoulders (standing) or thighs (seated).',
      'Stand tall with the knees almost straight.'
    ],
    execute: [
      'Let the heels sink below the step until you feel a stretch.',
      'Push up as high as you can onto your toes.',
      'Hold at the top for 1–2 seconds, then lower for three seconds.'
    ],
    cues: ['Full stretch, full contraction', 'Pause at the top', 'No bouncing'],
    mistakes: ['Short bouncy reps', 'Bending the knees to cheat the weight up'],
    tempo: '2 s hold up · 3 s down', rest: '60 s'
  },

  /* ============================ CORE ============================ */
  'cable-crunch': {
    name: 'Cable Crunch', clip: 'cableCrunch',
    group: 'Abs', equip: 'Cable', pattern: 'Core', core: 'Flexion',
    why: 'The abs are a muscle — this lets you add weight to them week by week, exactly like every other muscle you train.',
    setup: [
      'Attach a rope to a high pulley.',
      'Kneel a step back from the tower and pull the rope down so your hands are beside your ears.',
      'Hips directly under your shoulders — that is the position they stay in.'
    ],
    execute: [
      'Curl your ribs down toward your pelvis, rounding your spine.',
      'Bring your elbows toward your thighs and squeeze for a second.',
      'Uncurl slowly over three seconds until the abs are stretched.',
      'Your hands only hold the rope in place — they never pull.'
    ],
    cues: ['Curl the spine, do not hinge at the hips', 'Hands stay beside the ears', 'Squeeze at the bottom'],
    mistakes: ['Bending at the hips so it becomes a hip movement', 'Pulling the rope down with the arms', 'Rushing the return'],
    tempo: '2 s crunch · 1 s hold · 3 s return', rest: '60–90 s'
  },

  'hanging-knee-raise': {
    name: 'Hanging Knee Raise', clip: 'hangingKneeRaise',
    group: 'Abs', equip: 'Bar', pattern: 'Core', core: 'Hip flexion + lower abs',
    why: 'Trains the lower abs and, as a bonus, builds the grip and shoulder position you need for pull-ups.',
    setup: [
      'Hang from the bar with your shoulders pulled down away from your ears.',
      'Legs together, body still.',
      'If you cannot hold on long enough, use a captain\'s chair (the vertical bench with arm pads) instead.'
    ],
    execute: [
      'Start by curling your pelvis up toward your ribs.',
      'Then lift the knees to at least hip height.',
      'Pause, then lower over three seconds.',
      'If you start swinging, stop and reset — momentum is doing the work, not your abs.'
    ],
    cues: ['Pelvis first, knees second', 'No swinging', 'Shoulders stay packed'],
    mistakes: ['Only lifting the legs with the hip flexors and never curling the pelvis', 'Using a big swing to throw the knees up'],
    tempo: '2 s up · 3 s down', rest: '60–90 s'
  },

  'plank': {
    name: 'Plank', clip: 'plank',
    group: 'Abs', equip: 'Bodyweight', pattern: 'Core', core: 'Anti-extension',
    why: 'Teaches the core to stop your lower back from sagging under load — the exact job it has during RDLs, presses and pull-ups.',
    setup: [
      'Elbows directly under your shoulders, forearms flat on the floor.',
      'Feet hip-width apart, toes tucked under.',
      'Lift your hips so your body forms one straight line from heels to head.'
    ],
    execute: [
      'Squeeze your glutes and tuck your ribs down so the lower back flattens.',
      'Pull your belly button gently inward and breathe normally.',
      'Hold for 30–60 seconds. When your hips start to sag, the set is over.'
    ],
    cues: ['Squeeze the glutes', 'Ribs down', 'One straight line'],
    mistakes: ['Hips sagging toward the floor', 'Hips piked high in the air', 'Holding your breath'],
    tempo: '30–60 s hold', rest: '45–60 s'
  },

  'side-plank': {
    name: 'Side Plank', clip: 'sidePlank',
    group: 'Abs', equip: 'Bodyweight', pattern: 'Core', core: 'Anti-lateral flexion',
    why: 'Trains the obliques and the deep side of the core — the pattern most people completely skip.',
    setup: [
      'Lie on your side and prop yourself on your forearm, elbow directly under your shoulder.',
      'Stack your feet, or stagger them for more balance.',
      'Top hand on your hip.'
    ],
    execute: [
      'Push the floor away and lift your hips until your body is one straight line.',
      'Hold 30–45 seconds, then do the other side.',
      'Do not let the top shoulder roll forward.'
    ],
    cues: ['Hips high', 'Body in one line', 'Both sides, equal time'],
    mistakes: ['Letting the hips drop', 'Rotating the chest toward the floor'],
    tempo: '30–45 s each side', rest: '45 s'
  },

  'reverse-crunch': {
    name: 'Reverse Crunch', clip: 'reverseCrunch',
    group: 'Abs', equip: 'Bodyweight', pattern: 'Core', core: 'Flexion (lower abs)',
    why: 'A flexion movement you can do anywhere, and it teaches the pelvic tilt that makes every other ab exercise work better.',
    setup: [
      'Lie on your back with your arms flat beside you.',
      'Knees bent to 90° and stacked directly over your hips.',
      'Press your lower back gently into the floor.'
    ],
    execute: [
      'Curl your pelvis up off the floor toward your ribs — the movement is small.',
      'Pause for a second at the top.',
      'Lower slowly over three seconds. Do not let your feet drop and yank you out of position.'
    ],
    cues: ['Roll the pelvis, do not swing the legs', 'Lower back stays flat', 'Small range, hard squeeze'],
    mistakes: ['Swinging the legs for momentum', 'Letting the lower back arch off the floor'],
    tempo: '2 s up · 3 s down', rest: '45–60 s'
  },

  'dead-bug': {
    name: 'Dead Bug', clip: 'deadBug',
    group: 'Abs', equip: 'Bodyweight', pattern: 'Core', core: 'Anti-extension',
    why: 'Teaches you to keep the ribs and pelvis locked together while the arms and legs move — which is what a strong core actually is.',
    setup: [
      'Lie on your back, both arms pointing at the ceiling, both knees bent 90° above your hips.',
      'Press your lower back gently into the floor and keep it there.'
    ],
    execute: [
      'Slowly lower the right arm overhead and straighten the left leg at the same time.',
      'Go only as far as you can without your lower back lifting off the floor.',
      'Return to the middle, then do the other pair.',
      '10 controlled reps each side.'
    ],
    cues: ['Lower back glued to the floor', 'Move slowly', 'Breathe out as you extend'],
    mistakes: ['Going too far and arching the back', 'Rushing through the reps'],
    tempo: '3 s per rep', rest: '45 s'
  },

  'bicycle-crunch': {
    name: 'Bicycle Crunch', clip: 'bicycleCrunch',
    group: 'Abs', equip: 'Bodyweight', pattern: 'Core', core: 'Flexion + rotation',
    why: 'Combines the crunch with rotation, so the obliques get worked alongside the front of the abs.',
    setup: [
      'Lie on your back, fingertips lightly behind your ears — never laced behind the neck.',
      'Curl your shoulder blades off the floor and hold them there for the whole set.',
      'Knees bent above the hips.'
    ],
    execute: [
      'Rotate the right elbow toward the left knee while the right leg extends.',
      'Turn from the ribcage, not by yanking the elbow across.',
      'Switch sides slowly — three seconds per rotation.'
    ],
    cues: ['Shoulders stay off the floor', 'Rotate from the ribs', 'Never pull on the neck'],
    mistakes: ['Pulling the head forward with the hands', 'Going fast and losing all the tension', 'Letting the lower back arch as the leg extends'],
    tempo: '3 s per rotation', rest: '45–60 s'
  },

  /* ========================= WARM-UP / CARDIO ========================= */
  'bodyweight-squat': {
    name: 'Bodyweight Squat', clip: 'bodyweightSquat',
    group: 'Warm-up', equip: 'Bodyweight', pattern: 'Warm-up',
    why: 'Wakes up the hips, knees and ankles before you load them.',
    setup: ['Feet shoulder-width, toes slightly out, arms out in front for balance.'],
    execute: ['Ten smooth reps through a full range.', 'No pausing, no weight — this is a warm-up, not a working set.'],
    cues: ['Full depth', 'Smooth tempo'], mistakes: ['Turning it into a workout'],
    tempo: 'Smooth', rest: 'None'
  },
  'walking-lunge': {
    name: 'Walking Lunge', clip: 'walkingLunge',
    group: 'Warm-up', equip: 'Bodyweight', pattern: 'Warm-up',
    why: 'Opens the hip flexors and gets the legs and balance system ready to work.',
    setup: ['Stand tall, hands on hips.'],
    execute: ['Step forward into a long stride and drop the back knee toward the floor.', 'Push through the front heel and step straight into the next rep.', '10 each leg.'],
    cues: ['Torso upright', 'Front knee over the ankle'], mistakes: ['Short, choppy steps'],
    tempo: 'Smooth', rest: 'None'
  },
  'arm-circles': {
    name: 'Arm Circles', clip: 'armCircles',
    group: 'Warm-up', equip: 'Bodyweight', pattern: 'Warm-up',
    why: 'Gets blood into the shoulders before pressing.',
    setup: ['Arms straight out at shoulder height.'],
    execute: ['15 small-to-large circles forward, then 15 backward.'],
    cues: ['Elbows straight', 'Neck relaxed'], mistakes: ['Rushing'],
    tempo: 'Smooth', rest: 'None'
  },
  'shoulder-rotations': {
    name: 'Shoulder Rotations', clip: 'shoulderRotation',
    group: 'Warm-up', equip: 'Bodyweight', pattern: 'Warm-up',
    why: 'Wakes up the rotator cuff and the upper back before pressing or pulling.',
    setup: ['Fingertips on your shoulders, elbows pointing down.'],
    execute: ['15 slow, big circles with the elbows.'],
    cues: ['Big circles', 'Open the chest'], mistakes: ['Going fast and small'],
    tempo: 'Slow', rest: 'None'
  },
  'hip-circles': {
    name: 'Hip Circles', clip: 'hipCircles',
    group: 'Warm-up', equip: 'Bodyweight', pattern: 'Warm-up',
    why: 'Opens the hips before squatting, pressing or hinging.',
    setup: ['Stand tall, hold a rack lightly for balance if you need to.'],
    execute: ['Lift one knee to hip height and draw 10 big circles, then reverse. Both legs.'],
    cues: ['Ribs down', 'Move from the hip'], mistakes: ['Twisting the lower back instead of the hip'],
    tempo: 'Slow', rest: 'None'
  },
  'band-row': {
    name: 'Light Band / Cable Row', clip: 'bandRow',
    group: 'Warm-up', equip: 'Cable', pattern: 'Warm-up',
    why: 'Switches the back on before pull days so your first working set is not your first proper rep.',
    setup: ['Light band or cable at chest height.'],
    execute: ['15 easy reps, squeezing the shoulder blades at the end of each.'],
    cues: ['Light', 'Squeeze the blades'], mistakes: ['Going heavy'],
    tempo: 'Smooth', rest: 'None'
  },
  'incline-walk': {
    name: 'Incline Treadmill Walk', clip: 'inclineWalk',
    group: 'Cardio', equip: 'Treadmill', pattern: 'Cardio',
    why: 'Burns a meaningful number of calories without beating up your joints or wrecking your recovery for the next session.',
    setup: ['Start at a comfortable walking speed with no incline for 2–3 minutes.'],
    execute: [
      'Work up to 4.5–5.5 km/h at 5–10% incline.',
      'Aim for an effort where you could speak in short sentences but not hold a full conversation.',
      'Hands off the rails — holding on takes 20–30% of the work away.',
      '20–30 minutes after lifting.'
    ],
    cues: ['Tall posture', 'Hands off the rails', 'Steady effort you can repeat tomorrow'],
    mistakes: ['Cranking the incline so high you have to hang off the handles', 'Turning every session into a sprint and destroying recovery'],
    tempo: 'Steady', rest: 'n/a'
  }
};

export const EX_LIST = Object.entries(EX).map(([id, e]) => ({ id, ...e }));

export function getEx(id) {
  return EX[id] ? { id, ...EX[id] } : null;
}

export const GROUPS = [...new Set(EX_LIST.map((e) => e.group))];
