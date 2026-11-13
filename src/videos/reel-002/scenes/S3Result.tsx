import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { L, OneLineStage, TOTAL_LEN } from "../OneLine";

// Silent scene: the whole journey in one breath, zoomed out. Cup → key → house → mark.
const DRAW = [4, 88] as const;
const HIT = 90;

export const S3Result: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const len = interpolate(frame, DRAW, [0, TOTAL_LEN], {
    easing: motion.ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hit = frame >= HIT ? Math.min(1, (frame - HIT) / 16) : 0;
  const text = prog(frame, HIT + 6, motion.frames.slow);
  const zoom = 0.38 + 0.02 * prog(frame, 0, 120);
  return (
    <Frame surface="ink" safe={false}>
      <OneLineStage
        len={len}
        cam={{ x: 1215, y: -60, s: zoom }}
        dot={len >= L[4] ? 1 : 0}
        mark={prog(frame, HIT - 2, 6)}
        hit={hit}
        pen={frame >= 2 && frame < HIT}
      />
      <AbsoluteFill style={{ top: 1290, height: 160, alignItems: "center" }}>
        <div
          style={{
            fontSize: type.h1.size,
            fontWeight: 600,
            opacity: text,
            transform: `translateY(${(1 - text) * motion.move.lg}px)`,
          }}
        >
          خطّ <span style={{ color: s.accent }}>واحد</span>. بلا رفع.
        </div>
      </AbsoluteFill>
      <Sfx name="draw" at={DRAW[0]} volume={0.55} />
      <Sfx name="draw" at={DRAW[0] + 43} volume={0.55} len={HIT - DRAW[0] - 43} />
      <Sfx name="hit" at={HIT} volume={1} />
    </Frame>
  );
};
