/* ============================================================
   clips.js — the animation registry
   ============================================================ */
import { PUSH_CLIPS } from './clips_push.js';
import { PULL_CLIPS } from './clips_pull.js';
import { LEG_CLIPS } from './clips_legs.js';
import { CORE_CLIPS } from './clips_core.js';

export const CLIPS = {
  ...PUSH_CLIPS,
  ...PULL_CLIPS,
  ...LEG_CLIPS,
  ...CORE_CLIPS
};

export const CLIP_KEYS = Object.keys(CLIPS);

export function hasClip(key) { return !!CLIPS[key]; }
