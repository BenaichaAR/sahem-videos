import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog, sec } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { Cam, DETAILS, L, OneLineStage, penAt } from "../OneLine";

// Narrator 0 → 24.0s, one continuous canvas. The pen never lifts:
// «بخطٍّ واحد؟ … ولا يرتفع» → cup → key → house → «البساطة» → details fall
// → «والمفاجأة؟ شعارنا نحن… طريقٌ واحد، من النقطة إلى السهم».
const s = surfaces.ink;
const f = sec; // narrator seconds → local frames (scene starts at narrator 0)

// Pen keyframes: [narrator s, drawn length]
const KEYS: [number, number][] = [
  [1.8, 0],
  [5.6, L[0]],
  [6.98, L[0]],
  [9.8, L[1]],
  [12.3, L[2]],
  [14.4, L[3]],
  [18.9, L[3]],
  [20.7, L[4]],
  [21.0, L[4]],
  [23.2, L[5]],
];
const lenAt = (frame: number) => {
  const t = frame / 30;
  if (t <= KEYS[0][0]) return 0;
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [t0, l0] = KEYS[i];
    const [t1, l1] = KEYS[i + 1];
    if (t < t1) return interpolate(t, [t0, t1], [l0, l1], { easing: motion.ease });
  }
  return KEYS[KEYS.length - 1][1];
};

const ALL: Cam = { x: 1030, y: -40, s: 0.46 };
const ROUTE: Cam = { x: 2200, y: -20, s: 1.05 };
const mixCam = (a: Cam, b: Cam, t: number): Cam => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  s: a.s + (b.s - a.s) * t,
});

// Headline slot: each line replaces the previous one.
const LINES: { at: number; node: React.ReactNode }[] = [
  { at: 0, node: <>بخطٍّ واحد؟</> },
  { at: 3.8, node: <><span style={{ color: s.accent }}>لا</span> ترفع القلم.</> },
  { at: 6.98, node: <>أصعب قاعدة في التصميم</> },
  { at: 12.92, node: <><span style={{ color: s.accent }}>البساطة</span>.</> },
  { at: 14.67, node: <>كلّ تفصيلة زائدة…</> },
  { at: 16.86, node: <>…تسقط.</> },
  { at: 18.03, node: <>والمفاجأة؟</> },
  { at: 19.22, node: <>شعارنا نحن:</> },
  { at: 20.73, node: <>طريقٌ <span style={{ color: s.accent }}>واحد</span>.</> },
];

const Headline: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ top: 470, height: 180 }}>
    {LINES.map((l, i) => {
      const inn = prog(frame, f(l.at), motion.frames.slow);
      const next = LINES[i + 1];
      const out = next ? prog(frame, f(next.at), motion.frames.base) : 0;
      if (inn === 0 || out === 1) return null;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.arabic,
            fontSize: type.display.size,
            fontWeight: 600,
            opacity: inn * (1 - out),
            transform: `translateY(${(1 - inn) * motion.move.lg - out * motion.move.lg}px)`,
          }}
        >
          {l.node}
        </div>
      );
    })}
  </AbsoluteFill>
);

export const S2Draw: React.FC = () => {
  const frame = useCurrentFrame();
  const len = lenAt(frame);
  const p = penAt(len);
  const follow: Cam = { x: p.x, y: -40 + (p.y + 40) * 0.35, s: 1.15 };
  const cam = mixCam(mixCam(follow, ALL, prog(frame, f(14.4), 24)), ROUTE, prog(frame, f(18.03), 26));

  const details = DETAILS.map((_, i) => prog(frame, f(14.67) + i * 3, motion.frames.slow));
  const fall = DETAILS.map((_, i) => prog(frame, f(16.86) + i * 2, motion.frames.slower));
  const hitAt = f(23.2);
  const hit = frame >= hitAt ? Math.min(1, (frame - hitAt) / 16) : 0;
  const mark = prog(frame, hitAt - 2, 6);
  const chip = prog(frame, f(20.73), motion.frames.slow);

  return (
    <Frame surface="ink" safe={false}>
      <OneLineStage
        len={len}
        cam={cam}
        details={details}
        fall={fall}
        dot={prog(frame, f(20.7), motion.frames.fast)}
        mark={mark}
        hit={hit}
        thin={1 - mark}
        pen={frame >= f(0.5) && mark < 1}
      />
      <Headline frame={frame} />

      {/* Counter */}
      <AbsoluteFill style={{ top: 1300, height: 90, alignItems: "center" }}>
        <div
          style={{
            opacity: chip,
            transform: `translateY(${(1 - chip) * motion.move.md}px)`,
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "16px 36px",
            borderRadius: 60,
            border: `2px solid ${s.line}`,
            fontSize: 38,
            fontWeight: 500,
          }}
        >
          <span>خطّ واحد</span>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.accent }} />
          <span>
            <span style={{ fontFamily: fonts.latin, color: s.accent }}>0</span> رفع للقلم
          </span>
        </div>
      </AbsoluteFill>

      <HiddenLetter letter="ن" at={f(17.6)} x={860} y={760} />

      <Sfx name="draw" at={f(1.8)} volume={0.5} len={f(5.6) - f(1.8)} />
      <Sfx name="draw" at={f(6.98)} volume={0.5} />
      <Sfx name="draw" at={f(9.8)} volume={0.5} />
      <Sfx name="draw" at={f(12.3)} volume={0.5} />
      <Sfx name="tick" at={f(14.67)} volume={0.5} />
      <Sfx name="wipe" at={f(16.86)} volume={0.45} />
      <Sfx name="tap" at={f(18.03)} volume={0.5} />
      <Sfx name="pop" at={f(20.7)} volume={0.8} />
      <Sfx name="draw" at={f(21.0)} volume={0.55} />
      <Sfx name="draw" at={f(21.0) + 30} volume={0.45} len={hitAt - f(21.0) - 30} />
      <Sfx name="hit" at={hitAt} volume={1} />
    </Frame>
  );
};
