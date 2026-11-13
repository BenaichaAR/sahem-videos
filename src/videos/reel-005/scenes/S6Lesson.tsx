import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «الشعار القويّ… لا يحتاج مترجماً.»
const at = local(38.6);

export const S6Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const a = prog(frame, at(39.12), motion.frames.slow);
  const b = prog(frame, at(40.85), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -60, gap: 30 }}>
        <div style={{ ...up(a), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>الشعار القويّ…</div>
        <div style={{ ...up(b), fontSize: 120, fontWeight: 600, lineHeight: 1.4, textAlign: "center" }}>
          <span style={{ color: s.accent }}>لا</span> يحتاج مترجماً.
        </div>
      </AbsoluteFill>
      <Sfx name="rise" at={at(40.85)} volume={0.5} />
    </Frame>
  );
};
