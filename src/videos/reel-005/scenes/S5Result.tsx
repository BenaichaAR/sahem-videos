import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";

// Silent: «arrow» in six languages flies in from all sides and collapses into one mark.
const WORDS: { w: string; latin: boolean; x: number; y: number }[] = [
  { w: "سهم", latin: false, x: 540, y: 560 },
  { w: "Arrow", latin: true, x: 860, y: 780 },
  { w: "Flèche", latin: true, x: 850, y: 1200 },
  { w: "Flecha", latin: true, x: 540, y: 1400 },
  { w: "Pfeil", latin: true, x: 220, y: 1200 },
  { w: "Freccia", latin: true, x: 230, y: 780 },
];
const IN = 5; // stagger
const COLLAPSE = 40;
const HIT = 58;

export const S5Result: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const c = prog(frame, COLLAPSE, 16);
  const hit = frame >= HIT ? Math.min(1, (frame - HIT) / 16) : 0;
  return (
    <Frame surface="ink" safe={false}>
      {WORDS.map((w, i) => {
        const t = prog(frame, i * IN, motion.frames.slow);
        const x = w.x + (540 - w.x) * c;
        const y = w.y + (980 - w.y) * c;
        return (
          <div
            key={w.w}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${(0.8 + 0.2 * t) * (1 - 0.8 * c)})`,
              fontFamily: w.latin ? fonts.latin : fonts.arabic,
              fontSize: 110,
              fontWeight: 600,
              color: i === 0 ? s.accent : s.text,
              opacity: t * (1 - c),
              whiteSpace: "nowrap",
            }}
          >
            {w.w}
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 20 }}>
        <div style={{ opacity: prog(frame, COLLAPSE + 8, 6), transform: `scale(${1 + 0.05 * (1 - prog(frame, HIT, 9)) * (frame >= HIT ? 1 : 0)})` }}>
          <RouteMark width={380} dot={prog(frame, COLLAPSE + 8, 5)} path={prog(frame, COLLAPSE + 8, 10)} head={prog(frame, HIT - 4, 4)} hit={hit} />
        </div>
      </AbsoluteFill>
      {WORDS.map((w, i) => (
        <Sfx key={w.w} name="tick" at={i * IN} volume={0.5} />
      ))}
      <Sfx name="wipe" at={COLLAPSE} volume={0.5} />
      <Sfx name="hit" at={HIT} volume={1} />
    </Frame>
  );
};
