import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, type } from "../../brand/theme";
import { prog } from "../anim";

// One headline slot near the top; each line replaces the previous one.
// `at` is a frame local to the scene.
export const Headline: React.FC<{
  lines: { at: number; node: React.ReactNode }[];
  top?: number;
  size?: number;
}> = ({ lines, top = 470, size = type.display.size }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ top, height: 180 }}>
      {lines.map((l, i) => {
        const inn = prog(frame, l.at, motion.frames.slow);
        const next = lines[i + 1];
        const out = next ? prog(frame, next.at, motion.frames.base) : 0;
        if (inn === 0 || out === 1) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontFamily: fonts.arabic,
              fontSize: size,
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
};
