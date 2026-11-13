import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Camera } from "../../../shared/Camera";
import { Frame } from "../../../shared/Frame";

// Route line draws first, then the headline rises in, word by word.
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.paper;
  const f = motion.frames;
  const ease = (from: number, len: number) =>
    interpolate(frame, [from, from + len], [0, 1], {
      easing: motion.ease,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const line = ease(0, f.route);
  const words = ["هوية", "واضحة", "وموقع", "سريع"];

  return (
    <Frame surface="paper">
      <Camera zoomFrom={1} zoomTo={1.06}>
        <div style={{ position: "absolute", top: 260, right: 0, left: 0 }}>
          {/* route: dot + line that draws right-to-left */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 64 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: s.accent,
                transform: `scale(${ease(0, f.slow)})`,
              }}
            />
            <div
              style={{
                height: 8,
                flex: 1,
                background: s.text,
                transform: `scaleX(${line})`,
                transformOrigin: "right center",
              }}
            />
          </div>
          <div style={{ fontSize: type.display.size, fontWeight: type.display.weight, lineHeight: type.display.lineHeight }}>
            {words.map((w, i) => {
              const p = ease(f.route * 0.6 + i * f.staggerMd * 3, f.slower);
              return (
                <span
                  key={w}
                  style={{
                    display: "inline-block",
                    marginLeft: 28,
                    opacity: p,
                    transform: `translateY(${(1 - p) * motion.move.lg}px)`,
                    color: i === 1 ? s.accent : s.text,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>
      </Camera>
    </Frame>
  );
};
