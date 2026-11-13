// Reel 006 — "العميل المستحيل" ep. 6: «أريد شعاراً يكبر مع مشروعي».
// Built around public/voice/reel-006: client.mp3 (4.13s) and narrator.mp3 (42.68s).
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-006";
export const CLIENT_AT = 10;
export const N1_AT = 145;
export const NAR_CUT_S = 32.6; // after «على واجهة محلّك.»
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_LEN = sec(42.68);
export const RESULT_LEN = 110;
export const N2_AT = N1_AT + NAR_CUT + RESULT_LEN;
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_CUT) + TAIL;
export const TOTAL = END + OUTRO_V2_FRAMES;

export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_CUT_S));

export const SCENES = {
  hook: [0, N1_AT],
  problem: [N1_AT, nar(11.4)],
  family: [nar(11.4), nar(21.6)],
  grow: [nar(21.6), N1_AT + NAR_CUT],
  result: [N1_AT + NAR_CUT, N2_AT],
  lesson: [N2_AT, nar(38.2)],
  teaser: [nar(38.2), END],
} as const;

export const local = (t0: number) => (t: number) => sec(t - t0);
