// Reel 003 — "العميل المستحيل" ep. 3: «أريد موقعاً بدون أيّ كلمة».
// Built around public/voice/reel-003: client.mp3 (4.2s) and narrator.mp3 (39.0s),
// narrator split at NAR_CUT for the silent result scene.
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-003";
export const CLIENT_AT = 10;
export const N1_AT = 160;
export const NAR_CUT_S = 26.5; // after «يقول: هنا.»
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_LEN = sec(39.0);
export const RESULT_LEN = 120;
export const N2_AT = N1_AT + NAR_CUT + RESULT_LEN;
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_CUT) + TAIL;
export const TOTAL = END + OUTRO_V2_FRAMES;

export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_CUT_S));

export const SCENES = {
  hook: [0, N1_AT],
  truth: [N1_AT, nar(11.3)],
  build: [nar(11.3), N1_AT + NAR_CUT],
  result: [N1_AT + NAR_CUT, N2_AT],
  lesson: [N2_AT, nar(34.0)],
  teaser: [nar(34.0), END],
} as const;

export const local = (t0: number) => (t: number) => sec(t - t0);
