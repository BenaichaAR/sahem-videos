import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { Lockup } from "../../../shared/Lockup";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «الشعار الذي يكبر… هو الذي يعرف… متى يصغر.» — the lockup steps down to a dot.
const at = local(32.6);

export const S6Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const a = prog(frame, at(33.02), motion.frames.slow);
  const b = prog(frame, at(35.02), motion.frames.slow);
  const c = prog(frame, at(36.56), motion.frames.slow);
  const shrinkAt = at(36.56);
  const step = Math.max(0, Math.min(3, Math.floor((frame - shrinkAt) / 6) + 1));
  const level = (frame < shrinkAt ? 3 : 3 - step) as 0 | 1 | 2 | 3;
  const show = prog(frame, at(33.02), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", top: 480, gap: 20 }}>
        <div style={{ ...up(a), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>الشعار الذي يكبر…</div>
        <div style={{ ...up(b), fontSize: 96, fontWeight: 600 }}>هو الذي يعرف…</div>
        <div style={{ ...up(c), fontSize: 130, fontWeight: 600, lineHeight: 1.4 }}>
          متى <span style={{ color: s.accent }}>يصغر</span>.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 1060, height: 300, alignItems: "center", justifyContent: "center", opacity: show }}>
        <Lockup level={level} h={130} />
      </AbsoluteFill>
      {[1, 2, 3].map((k) => (
        <Sfx key={k} name="tick" at={shrinkAt + (k - 1) * 6} volume={0.55} />
      ))}
      <Sfx name="pop" at={shrinkAt + 12} volume={0.8} />
    </Frame>
  );
};
