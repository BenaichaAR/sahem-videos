import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «اللون لا يُشترى… يُكرَّر… حتّى يصير لك.»
const at = local(23.7);
const DOTS = 7;

export const S5Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const a = prog(frame, at(24.05), motion.frames.slow);
  const b = prog(frame, at(26.37), motion.frames.slow);
  const c = prog(frame, at(27.47), motion.frames.slow);
  const step = (at(27.4) - at(26.37)) / DOTS;
  const own = prog(frame, at(27.47), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -60, gap: 16 }}>
        <div style={{ ...up(a), fontSize: 96, fontWeight: 600 }}>اللون لا يُشترى…</div>
        <div style={{ ...up(b), fontSize: 140, fontWeight: 600, lineHeight: 1.4, color: s.accent }}>يُكرَّر</div>
        <div style={{ display: "flex", gap: 30, margin: "10px 0 30px" }}>
          {Array.from({ length: DOTS }, (_, i) => {
            const t = prog(frame, at(26.37) + i * step, motion.frames.fast);
            return (
              <div
                key={i}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: own > 0.5 ? s.accent : s.text,
                  transform: `scale(${t})`,
                }}
              />
            );
          })}
        </div>
        <div style={{ ...up(c), fontSize: type.h1.size, fontWeight: 500 }}>…حتّى يصير لك.</div>
      </AbsoluteFill>
      {Array.from({ length: DOTS }, (_, i) => (
        <Sfx key={i} name="tap" at={at(26.37) + Math.round(i * step)} volume={0.4} />
      ))}
      <Sfx name="rise" at={at(27.47)} volume={0.5} />
    </Frame>
  );
};
