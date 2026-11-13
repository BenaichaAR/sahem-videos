// Reel 001 — "العميل المستحيل" ep. 1: «أريد شعاراً يُسمَع».
// Timeline is built around the real ElevenLabs files in public/voice/reel-001:
//   client.mp3 (3.8s)  and  narratorv4.mp3 (44.04s), split at NAR_CUT for the silent result scene.
import { OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";

export const ID = "reel-001";
export const CLIENT_AT = 10; // client voice starts (frames)
export const N1_AT = 130; // narrator part 1 starts
export const NAR_CUT_S = 32.8; // narrator split: after «له ضربة»
export const NAR_CUT = sec(NAR_CUT_S);
export const NAR_LEN = sec(44.04);
export const RESULT_LEN = 120; // silent scene: only the mark's sound
export const N2_AT = N1_AT + NAR_CUT + RESULT_LEN; // narrator part 2 starts
export const TAIL = 20;
export const END = N2_AT + (NAR_LEN - NAR_CUT) + TAIL; // outro starts
export const TOTAL = END + OUTRO_V2_FRAMES;

/** Narrator time (s) → composition frame. */
export const nar = (t: number) => (t < NAR_CUT_S ? N1_AT + sec(t) : N2_AT + sec(t - NAR_CUT_S));

export const SCENES = {
  hook: [0, N1_AT],
  shock: [N1_AT, nar(7.3)],
  proof: [nar(7.3), nar(19.5)],
  build: [nar(19.5), N1_AT + NAR_CUT],
  result: [N1_AT + NAR_CUT, N2_AT],
  lesson: [N2_AT, nar(37.8)],
  teaser: [nar(37.8), END],
} as const;

/** Narrator time (s) → frame local to a scene that starts at narrator time `t0`. */
export const local = (t0: number) => (t: number) => sec(t - t0);
