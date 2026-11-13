import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «إذا فهمك الزائر بدون أن يقرأ… فكلّ كلمة بعدها… قوّة إضافيّة.»
const at = local(26.5);

export const S5Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const a = prog(frame, at(26.8), motion.frames.slow);
  const b = prog(frame, at(28.4), motion.frames.slow);
  const c = prog(frame, at(30.04), motion.frames.slow);
  const d = prog(frame, at(32.31), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -60, gap: 10 }}>
        <div style={{ ...up(a), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>إذا فهمك الزائر</div>
        <div style={{ ...up(b), fontSize: 110, fontWeight: 600, lineHeight: 1.4 }}>بدون أن يقرأ…</div>
        <div style={{ height: 60 }} />
        <div style={{ ...up(c), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>فكلّ كلمة بعدها</div>
        <div style={{ ...up(d), fontSize: 130, fontWeight: 600, lineHeight: 1.4 }}>
          <span style={{ color: s.accent }}>قوّة</span> إضافيّة.
        </div>
      </AbsoluteFill>
      <Sfx name="rise" at={at(32.31)} volume={0.5} />
    </Frame>
  );
};
