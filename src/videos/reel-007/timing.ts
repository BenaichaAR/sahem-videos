// Reel 007 — "العميل المستحيل" ep. 7 (finale): «أريد كلّ شيء… في 7 ثوانٍ».
// public/voice/reel-007: client.mp3 (4.2s) and narrator.mp3 (42.68s).
// The narrator is cut after «جاهز؟» (NAR_CUT_S) and resumes at NAR_RESUME_S, with
// exactly seven wordless seconds in between.
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-007";
export const CLIENT_AT = 10;
export const N1_AT = 150;
export const NAR_CUT_S = 6.7;
export const NAR_RESUME_S = 7.4;
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_RESUME = sec(NAR_RESUME_S);
export const NAR_LEN = sec(42.68);
export const SEVEN_LEAD = 10;
export const SEVEN_BEAT = 30;
export const SEVEN_LEN = SEVEN_LEAD + 7 * SEVEN_BEAT + 10; // 230
export const N2_AT = N1_AT + NAR_CUT + SEVEN_LEN;
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_RESUME) + TAIL;
export const TOTAL = END + OUTRO_V2_FRAMES;

export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_RESUME_S));

export const SCENES = {
  hook: [0, N1_AT],
  ready: [N1_AT, N1_AT + NAR_CUT],
  seven: [N1_AT + NAR_CUT, N2_AT],
  reveal: [N2_AT, nar(22.6)],
  game: [nar(22.6), nar(34.5)],
  season: [nar(34.5), END],
} as const;

/** Narrator time → frame local to a scene that starts at narrator time `t0` (both after the cut). */
export const local = (t0: number) => (t: number) => sec(t - t0);
