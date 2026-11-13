import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «إذا لم تستطع أن ترسم فكرتك بخطٍّ واحد… فهي ليست جاهزة بعد.»
const at = local(24.0);

export const S4Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const a = prog(frame, at(24.44), motion.frames.slow);
  const b = prog(frame, at(26.74), motion.frames.slow);
  const line = prog(frame, at(26.74), at(28.2) - at(26.74));
  const cut = prog(frame, at(28.44), motion.frames.base);
  const c = prog(frame, at(28.44), motion.frames.slow);
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const W = 760;
  const gap = 90 * cut;

  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -80 }}>
        <div style={{ ...up(a), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>
          إذا لم تستطع رسم فكرتك
        </div>
        <div style={{ ...up(b), fontSize: 130, fontWeight: 600, lineHeight: 1.4 }}>بخطٍّ واحد…</div>
        {/* The line: drawn whole, then it breaks */}
        <svg width={W} height={20} style={{ marginTop: 10 }} viewBox={`0 0 ${W} 20`}>
          <line x1={W} y1={10} x2={W - (W / 2 - gap / 2) * Math.min(1, line * 2)} y2={10} stroke={s.text} strokeWidth={8} strokeLinecap="round" />
          {line > 0.5 && (
            <line
              x1={W / 2 - gap / 2}
              y1={10 + cut * 6}
              x2={W / 2 - gap / 2 - (W / 2 - gap / 2) * Math.min(1, (line - 0.5) * 2)}
              y2={10 + cut * 6}
              stroke={s.text}
              strokeWidth={8}
              strokeLinecap="round"
            />
          )}
        </svg>
        <div style={{ ...up(c), marginTop: 70, fontSize: 96, fontWeight: 600, lineHeight: 1.4, textAlign: "center" }}>
          فهي <span style={{ color: s.accent }}>ليست جاهزة</span> بعد.
        </div>
      </AbsoluteFill>
      <Sfx name="draw" at={at(26.74)} volume={0.45} len={at(28.2) - at(26.74)} />
      <Sfx name="cut" at={at(28.44)} volume={0.7} />
    </Frame>
  );
};
