// Reel 004 — "العميل المستحيل" ep. 4: «أريد لوناً لا يملكه أحد في مدينتي».
// Built around public/voice/reel-004: client.mp3 (5.88s) and narrator.mp3 (35.63s).
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-004";
export const CLIENT_AT = 10;
export const N1_AT = 196;
export const NAR_CUT_S = 23.7; // after «على الشاشة.»
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_LEN = sec(35.63);
export const RESULT_LEN = 120;
export const N2_AT = N1_AT + NAR_CUT + RESULT_LEN;
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_CUT) + TAIL;
export const TOTAL = END + OUTRO_V2_FRAMES;

export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_CUT_S));

export const SCENES = {
  hook: [0, N1_AT],
  street: [N1_AT, nar(8.5)],
  secret: [nar(8.5), N1_AT + NAR_CUT],
  result: [N1_AT + NAR_CUT, N2_AT],
  lesson: [N2_AT, nar(29.3)],
  teaser: [nar(29.3), END],
} as const;

export const local = (t0: number) => (t: number) => sec(t - t0);
