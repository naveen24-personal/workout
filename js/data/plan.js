/* ============================================================
   plan.js — the 6-day programme, plus the systems around it
   ============================================================ */

export const WARMUP = {
  time: '8–10 minutes, before every session',
  treadmill: 'Walk 5 minutes at 4–5.5 km/h, no incline. You want to feel warm, not tired.',
  drills: [
    { id: 'arm-circles', reps: '15 forward + 15 back' },
    { id: 'shoulder-rotations', reps: '15' },
    { id: 'bodyweight-squat', reps: '10' },
    { id: 'walking-lunge', reps: '10 each leg' },
    { id: 'hip-circles', reps: '10 each way, each leg' },
    { id: 'band-row', reps: '15 light' }
  ],
  after: 'Then do 1–2 light warm-up sets of your first exercise before the working sets. Those do not count as working sets.'
};

export const DAYS = [
  {
    id: 'mon', short: 'Mon', day: 'Monday', title: 'Push A', type: 'push',
    focus: 'Chest · Shoulders · Triceps',
    blurb: 'Heavy pressing while you are freshest, then the smaller shoulder and triceps work, then abs and cardio.',
    cardio: '20 min incline treadmill walk',
    absTime: '15 min',
    blocks: [
      {
        name: 'Chest', items: [
          { id: 'machine-chest-press', sets: '3 × 10–12' },
          { id: 'incline-db-press', sets: '3 × 8–12' },
          { id: 'pec-deck-fly', sets: '3 × 12–15' }
        ]
      },
      {
        name: 'Shoulders', items: [
          { id: 'seated-db-shoulder-press', sets: '3 × 8–12' },
          { id: 'db-lateral-raise', sets: '3 × 12–15' }
        ]
      },
      {
        name: 'Triceps', items: [
          { id: 'rope-pushdown', sets: '3 × 10–15' },
          { id: 'overhead-cable-ext', sets: '2 × 12–15' }
        ]
      }
    ],
    abs: [
      { id: 'cable-crunch', sets: '3 × 12–15' },
      { id: 'hanging-knee-raise', sets: '3 × 8–12' },
      { id: 'plank', sets: '3 × 30–60 s' }
    ]
  },

  {
    id: 'tue', short: 'Tue', day: 'Tuesday', title: 'Pull A', type: 'pull',
    focus: 'Back · Biceps · Pull-up training',
    blurb: 'Your most important day for the pull-up. The progression work comes first, while you are fresh.',
    cardio: '20 min',
    absTime: '15 min',
    blocks: [
      {
        name: 'Pull-up progression', note: 'Do this first, before the back work.', items: [
          { id: 'scap-pullup', sets: '3 × 5–8' },
          { id: 'assisted-pullup', sets: '3 × 5–8' },
          { id: 'negative-pullup', sets: '2 × 3–5' }
        ]
      },
      {
        name: 'Back', items: [
          { id: 'lat-pulldown', sets: '3 × 8–12' },
          { id: 'seated-cable-row', sets: '3 × 10–12' },
          { id: 'chest-supported-row', sets: '3 × 10–12' },
          { id: 'straight-arm-pulldown', sets: '2 × 12–15' }
        ]
      },
      {
        name: 'Biceps', items: [
          { id: 'db-curl', sets: '3 × 10–12' },
          { id: 'hammer-curl', sets: '3 × 10–12' }
        ]
      }
    ],
    abs: [
      { id: 'reverse-crunch', sets: '3 × 12–15' },
      { id: 'cable-crunch', sets: '3 × 12–15' },
      { id: 'plank', sets: '2 × 45 s' }
    ]
  },

  {
    id: 'wed', short: 'Wed', day: 'Wednesday', title: 'Legs A', type: 'legs',
    focus: 'Quads · Hamstrings · Calves',
    blurb: 'Legs burn the most calories of any session. Do not skip this day because it is uncomfortable.',
    cardio: '20–25 min incline treadmill or cycling',
    absTime: '10 min',
    blocks: [
      {
        name: 'Quads', items: [
          { id: 'leg-press', sets: '3 × 10–12' },
          { id: 'goblet-squat', sets: '3 × 10–12' },
          { id: 'leg-extension', sets: '3 × 12–15' }
        ]
      },
      {
        name: 'Hamstrings & glutes', items: [
          { id: 'romanian-deadlift', sets: '3 × 8–12' },
          { id: 'leg-curl', sets: '3 × 10–15' }
        ]
      },
      {
        name: 'Calves', items: [
          { id: 'calf-raise', sets: '3 × 12–20' }
        ]
      }
    ],
    abs: [
      { id: 'hanging-knee-raise', sets: '3 × 8–12' },
      { id: 'dead-bug', sets: '3 × 10 each side' }
    ]
  },

  {
    id: 'thu', short: 'Thu', day: 'Thursday', title: 'Push B', type: 'push',
    focus: 'Chest · Shoulders · Triceps',
    blurb: 'Same muscles as Monday, different angles and machines so the stimulus stays fresh.',
    cardio: '20 min',
    absTime: '15 min',
    blocks: [
      {
        name: 'Chest', items: [
          { id: 'incline-machine-press', sets: '3 × 8–12' },
          { id: 'flat-db-press', sets: '3 × 8–12' },
          { id: 'cable-fly', sets: '3 × 12–15' }
        ]
      },
      {
        name: 'Shoulders', items: [
          { id: 'machine-shoulder-press', sets: '3 × 8–12' },
          { id: 'db-lateral-raise', sets: '3 × 12–15' },
          { id: 'face-pull', sets: '2 × 12–15' }
        ]
      },
      {
        name: 'Triceps', items: [
          { id: 'rope-pushdown', sets: '3 × 10–15' },
          { id: 'single-arm-cable-ext', sets: '2 × 12–15' }
        ]
      }
    ],
    abs: [
      { id: 'cable-crunch', sets: '3 × 12–15' },
      { id: 'bicycle-crunch', sets: '3 × 12 each side' },
      { id: 'side-plank', sets: '2 × 30–45 s each side' }
    ]
  },

  {
    id: 'fri', short: 'Fri', day: 'Friday', title: 'Pull B', type: 'pull',
    focus: 'Back · Rear delts · Biceps · Pull-up training',
    blurb: 'Second pull-up session of the week — this is where the progression really happens.',
    cardio: '20 min',
    absTime: '15 min',
    blocks: [
      {
        name: 'Pull-up progression', note: 'Again, first thing while you are fresh.', items: [
          { id: 'scap-pullup', sets: '2 × 6–8' },
          { id: 'assisted-pullup', sets: '3 × 5–8' },
          { id: 'negative-pullup', sets: '3 × 3–5' }
        ]
      },
      {
        name: 'Back', items: [
          { id: 'lat-pulldown', sets: '3 × 8–12' },
          { id: 'seated-cable-row', sets: '3 × 10–12' },
          { id: 'single-arm-lat-pulldown', sets: '3 × 10–12 each side' },
          { id: 'chest-supported-row', sets: '3 × 10–12' }
        ]
      },
      {
        name: 'Rear delts', items: [
          { id: 'reverse-pec-deck', sets: '3 × 12–15' }
        ]
      },
      {
        name: 'Biceps', items: [
          { id: 'ez-bar-curl', sets: '3 × 10–12' },
          { id: 'hammer-curl', sets: '2 × 10–12' }
        ]
      }
    ],
    abs: [
      { id: 'hanging-knee-raise', sets: '3 × 8–12' },
      { id: 'cable-crunch', sets: '3 × 12–15' }
    ]
  },

  {
    id: 'sat', short: 'Sat', day: 'Saturday', title: 'Legs B + Conditioning', type: 'legs',
    focus: 'Legs · Full-body conditioning',
    blurb: 'A little more volume and a longer cardio finish, because you have the weekend to recover.',
    cardio: '20–30 min treadmill or cycle',
    absTime: '10 min',
    blocks: [
      {
        name: 'Legs', items: [
          { id: 'leg-press', sets: '4 × 10–12' },
          { id: 'bulgarian-split-squat', sets: '3 × 8–10 each leg' },
          { id: 'romanian-deadlift', sets: '3 × 10' },
          { id: 'leg-curl', sets: '3 × 12–15' },
          { id: 'leg-extension', sets: '3 × 12–15' },
          { id: 'calf-raise', sets: '3 × 15–20' }
        ]
      }
    ],
    abs: [
      { id: 'reverse-crunch', sets: '3 × 12–15' },
      { id: 'plank', sets: '3 × 45–60 s' }
    ]
  },

  {
    id: 'sun', short: 'Sun', day: 'Sunday', title: 'Rest', type: 'rest',
    focus: 'Recovery',
    blurb: 'Optional 30–45 minute walk. Rest is when the training you did actually turns into muscle.',
    cardio: 'Optional 30–45 min walk',
    absTime: '—',
    blocks: [], abs: []
  }
];

export const dayById = (id) => DAYS.find((d) => d.id === id);

/* ---------------- abs system ---------------- */
export const ABS_MATRIX = [
  {
    pattern: 'Flexion', colour: 'accent',
    what: 'Curling the ribs toward the pelvis — the classic "crunch" motion, loaded so it can progress.',
    ex: ['cable-crunch', 'reverse-crunch']
  },
  {
    pattern: 'Hip flexion + lower ab control', colour: 'cyan',
    what: 'Lifting the legs while curling the pelvis. Trains the part of the abs most people never reach.',
    ex: ['hanging-knee-raise']
  },
  {
    pattern: 'Anti-extension', colour: 'violet',
    what: 'Stopping your lower back from sagging. This is the core\'s real job under a heavy load.',
    ex: ['plank', 'dead-bug']
  },
  {
    pattern: 'Anti-lateral flexion + rotation', colour: 'warn',
    what: 'Resisting sideways bend and controlling twist — the obliques.',
    ex: ['side-plank', 'bicycle-crunch']
  }
];

export const ABS_RULES = [
  'Train abs like any other muscle: 3–4 sessions a week, 10–15 minutes, with real progression.',
  'Do not do 100–200 crunches every day. That builds endurance to boredom, not a stronger core.',
  'Add resistance over time — that is what the cable crunch is for.',
  'Cover all four patterns above in a week rather than doing sit-ups from one angle.',
  'Visible abs are mostly a body-fat outcome. The training builds the muscle; the calorie deficit uncovers it.'
];

/* ---------------- pull-up programme ---------------- */
export const PULLUP_LEVELS = [
  {
    level: 1, id: 'scap-pullup', title: 'Scapular pull-ups',
    goal: '3 × 5–8 with a 2-second hold',
    detail: 'Learn to start the pull with your shoulder blades instead of your arms.'
  },
  {
    level: 2, id: 'assisted-pullup', title: 'Assisted pull-up machine',
    goal: '3 × 8–10 clean reps before reducing assistance',
    detail: 'Your main exercise. Set the counterweight so 5–8 reps are hard but perfect, then chip the assistance down over the weeks.'
  },
  {
    level: 3, id: 'negative-pullup', title: 'Negative pull-ups',
    goal: '3 × 3 with a 5–8 second descent',
    detail: 'Step up to the top, then fight the way down. You are far stronger lowering than lifting, so this trains your full bodyweight early.'
  },
  {
    level: 4, id: 'band-pullup', title: 'Band-assisted pull-ups',
    goal: '8 clean reps, then drop to a lighter band',
    detail: 'The band helps most at the bottom, exactly where you are weakest, and almost nothing at the top.'
  },
  {
    level: 5, id: 'full-pullup', title: 'Your first full pull-up',
    goal: '1 clean rep from a dead hang → then 3 → then 5',
    detail: 'Dead hang → brace → pull the elbows down → chest toward the bar → chin over → controlled descent.'
  }
];

export const PULLUP_RULE = {
  title: 'The assistance-reduction rule',
  body: 'Do not drop the assistance the moment you hit the target once. Earn it across all your sets first.',
  example: [
    'Week 1 — 40 kg assist: 8, 8, 7',
    'Week 2 — 40 kg assist: 8, 8, 8',
    'Week 3 — 40 kg assist: 10, 9, 8  ← now you have earned it',
    'Week 4 — 35 kg assist: 8, 7, 6',
    '… then 30 → 25 → 20 → 15 → 10 → 5 → 0 kg'
  ],
  close: 'Zero assistance is a full pull-up. Most people take 8–16 weeks from a standing start — twice a week, every week, is what gets you there.'
};

/* ---------------- loading and rest ---------------- */
export const LOAD_RULES = {
  headline: 'Pick the weight from how the set feels, not from the number on the page.',
  points: [
    'The first reps should feel comfortable; the last 2–3 should be genuinely difficult.',
    'Form must still be perfect on the final rep.',
    'Finish most sets with roughly 1–3 good reps left in the tank rather than grinding to failure.',
    'If your target is 3 × 10 and you get 10, 10, 9 with good form — that is excellent.',
    'If you get 10, 6, 4 — the weight is too heavy. Drop it.',
    'When you hit the top of the rep range on every set with clean form, add a small amount of weight next time.'
  ]
};

export const REST_RULES = [
  { kind: 'Big compound lifts', time: '2–3 min', ex: 'Leg press · RDL · dumbbell and machine presses · shoulder press · rows · lat pulldown · assisted pull-ups' },
  { kind: 'Isolation and small muscles', time: '60–90 s', ex: 'Curls · triceps · lateral raises · cable crunches · calf raises · rear delts' }
];

export const CARDIO = [
  {
    name: 'Incline treadmill walk', when: 'After lifting', time: '20–30 min',
    detail: '4.5–5.5 km/h at 5–10% incline. Adjust so you are working but could repeat it tomorrow. Hands off the rails.',
    id: 'incline-walk'
  },
  {
    name: 'Cycling', when: 'After lifting', time: '20–30 min',
    detail: 'Moderate, steady pace. Easier on the knees if walking at an incline bothers them.'
  },
  {
    name: 'Walking', when: 'Rest days', time: '30–45 min',
    detail: 'Free calories with no recovery cost. Steps across the day matter more than most people think.'
  }
];

export const CARDIO_NOTE = 'General guidance is at least 150 minutes of moderate aerobic activity a week plus muscle-strengthening work. This plan gets you there through the week — you do not need to destroy yourself with HIIT every day. Consistency and total weekly activity matter far more.';

export const TECHNIQUE_RULES = [
  { n: 1, title: 'Set up first', body: 'Adjust the seat, bench, pads and handles before your first rep. Half of good form is just good setup.' },
  { n: 2, title: 'Start light', body: 'Learn the movement with a weight that is obviously easy, then add load once the pattern is automatic.' },
  { n: 3, title: 'Control the eccentric', body: 'Lower the weight over about 2–3 seconds on every rep. That is where most of the muscle growth comes from.' },
  { n: 4, title: 'Never trade form for reps', body: 'A clean set of 8 beats a sloppy set of 12, every single time.' },
  { n: 5, title: 'Add weight gradually', body: 'When you reach the top of the rep range with good technique, put a small amount more on the bar.' }
];

export const FAT_LOSS_TRUTHS = [
  {
    t: 'Ab exercises do not burn belly fat',
    b: 'They strengthen and thicken the abdominal muscles. Where you lose fat from is not something you can choose — it comes off everywhere as your overall body fat drops.'
  },
  {
    t: 'The deficit drives the fat loss',
    b: 'The gym builds and keeps muscle and improves your fitness. The calorie deficit is what actually removes the fat. You can follow this programme perfectly and still not lose weight if you eat more than you burn.'
  },
  {
    t: 'Muscle is what makes the result look good',
    b: 'Losing weight without resistance training usually means losing muscle too — you end up smaller but still soft. Six days of lifting is what keeps the shape.'
  },
  {
    t: 'Slow is faster',
    b: 'A deficit of about 20% and 0.5–0.75 kg a week is sustainable. Crash dieting costs muscle, wrecks gym performance and almost always rebounds.'
  }
];

export const NUTRITION_RULES = [
  'Protein at every meal — roughly 1.6–2.2 g per kg of bodyweight per day.',
  'Vegetables or fruit at every meal for volume, fibre and micronutrients.',
  'Mostly whole foods; keep the highly processed, easy-to-overeat stuff occasional.',
  'Controlled portions — weigh things for a couple of weeks so you learn what a portion actually looks like.',
  'Water throughout the day; limit liquid calories, alcohol and sweets.',
  'Do not eat back your cardio calories. That is how a deficit quietly disappears.'
];
