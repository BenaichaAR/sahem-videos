import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";

// Silent scene: no voice. The mark plays its full sound, then «هذا صوت سهم.»
const T = { dot: 10, path: 14, hit: 44, text: 66 };

export const S5Result: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const text = prog(frame, T.text, motion.frames.slow);
  const rings = [0, 6, 12].map((d) => (frame >= T.hit + d ? Math.min(1, (frame - T.hit - d) / 36) : 0));
  const punch = 1 + 0.06 * (1 - prog(frame, T.hit, 9)) * (frame >= T.hit ? 1 : 0);
  const zoom = 1 + 0.05 * prog(frame, 0, 120);

  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -90 }}>
          {rings.map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 300 + r * 900,
                height: 300 + r * 900,
                borderRadius: "50%",
                border: `3px solid ${i === 0 ? s.accent : s.line}`,
                opacity: r > 0 ? (1 - r) * (i === 0 ? 0.8 : 0.6) : 0,
              }}
            />
          ))}
          <div style={{ transform: `scale(${punch})` }}>
            <RouteMark
              width={460}
              dot={prog(frame, T.dot, motion.frames.fast)}
              path={prog(frame, T.path, 27)}
              head={prog(frame, T.hit - 4, 4)}
              hit={frame >= T.hit ? Math.min(1, (frame - T.hit) / 16) : 0}
            />
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ top: 1290, height: 160, alignItems: "center" }}>
          <div
            style={{
              fontSize: type.h1.size,
              fontWeight: 600,
              opacity: text,
              transform: `translateY(${(1 - text) * motion.move.lg}px)`,
            }}
          >
            هذا صوت <span style={{ color: s.accent }}>سهم</span>.
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <Sfx name="pop" at={T.dot} volume={0.8} />
      <Sfx name="draw" at={T.path} volume={0.6} len={27} />
      <Sfx name="hit" at={T.hit} volume={1} />
    </Frame>
  );
};
