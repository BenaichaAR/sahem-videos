import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «العلامة القويّة… لا تُرى فقط. تُسمَع.»
const at = local(32.8);

export const S6Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const a = prog(frame, at(33.41), motion.frames.slow);
  const b = prog(frame, at(34.74), motion.frames.slow);
  const strike = prog(frame, at(35.9), motion.frames.slow);
  const c = prog(frame, at(36.92), motion.frames.slow);
  const rings = [0, 7, 14].map((d) => prog(frame, at(36.92) + d, 34));
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });

  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -60 }}>
        <div style={{ ...up(a), fontSize: type.h1.size, color: s.muted, fontWeight: 500 }}>العلامة القويّة…</div>
        <div style={{ ...up(b), fontSize: 110, fontWeight: 600, marginTop: 30, position: "relative" }}>
          لا <span style={{ position: "relative" }}>
            تُرى
            <span
              style={{
                position: "absolute",
                right: 0,
                top: "55%",
                height: 8,
                width: `${strike * 100}%`,
                background: s.muted,
              }}
            />
          </span>{" "}
          فقط.
        </div>
        <div style={{ position: "relative", marginTop: 110, display: "flex", justifyContent: "center" }}>
          {rings.map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 200 + r * 800,
                height: 200 + r * 800,
                marginLeft: -(100 + r * 400),
                marginTop: -(100 + r * 400),
                borderRadius: "50%",
                border: `3px solid ${s.line}`,
                opacity: r > 0 ? 1 - r : 0,
              }}
            />
          ))}
          <div style={{ ...up(c), fontSize: 230, fontWeight: 600, lineHeight: 1.4, color: s.accent }}>تُسمَع.</div>
        </div>
      </AbsoluteFill>
      <Sfx name="reveal" at={at(36.92) - 2} volume={0.55} />
    </Frame>
  );
};
