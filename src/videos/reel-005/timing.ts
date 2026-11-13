// Reel 005 — "العميل المستحيل" ep. 5: «أريد شعاراً يفهمه العربي والأجنبي بدون قراءة».
// Built around public/voice/reel-005: client.mp3 (6.35s) and narrator.mp3 (47.39s).
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-005";
export const CLIENT_AT = 10;
export const N1_AT = 210;
export const NAR_CUT_S = 38.6; // after «والاثنان فهما نفس الشيء.»
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_LEN = sec(47.39);
export const RESULT_LEN = 100;
export const N2_AT = N1_AT + NAR_CUT + RESULT_LEN;
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_CUT) + TAIL;
export const TOTAL = END + OUTRO_V2_FRAMES;

export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_CUT_S));

export const SCENES = {
  hook: [0, N1_AT],
  words: [N1_AT, nar(11.7)],
  symbols: [nar(11.7), nar(26.6)],
  reveal: [nar(26.6), N1_AT + NAR_CUT],
  result: [N1_AT + NAR_CUT, N2_AT],
  lesson: [N2_AT, nar(43.3)],
  teaser: [nar(43.3), END],
} as const;

export const local = (t0: number) => (t: number) => sec(t - t0);
