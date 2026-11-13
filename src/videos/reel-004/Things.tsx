import React from "react";
import { colors, surfaces } from "../../brand/theme";

// Objects (all inanimate) drawn in a 100×100 box. Each has a flat surface at
// DOT_SPOT, so the Signal dot sits in the very same place on every one.
const s = surfaces.ink;
export const DOT_SPOT = { x: 71, y: 38 };

export type Thing = "shop" | "cup" | "bag" | "door" | "phone";

export const ThingArt: React.FC<{ kind: Thing; size: number; draw?: number }> = ({ kind, size, draw = 1 }) => {
  const dash = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={s.text}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "shop" && (
        <>
          <path d="M10 92 V28 H90 V92 Z" {...dash} />
          <path d="M10 28 H90 V48 H10 Z" {...dash} />
          <path d="M10 48 l8 7 8 -7 8 7 8 -7 8 7 8 -7 8 7 8 -7 8 7 8 -7" {...dash} />
          <path d="M22 92 V64 H42 V92 M54 64 H80 V80 H54 Z" {...dash} />
        </>
      )}
      {kind === "cup" && (
        <>
          <path d="M20 28 H84 L78 88 H26 Z" {...dash} />
          <path d="M22 42 C6 42 6 66 24 66" {...dash} />
          <path d="M44 20 c-5 -6 5 -9 0 -15 M60 20 c-5 -6 5 -9 0 -15" opacity={draw} />
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M16 30 H84 L88 92 H12 Z" {...dash} />
          <path d="M36 30 C36 10 64 10 64 30" {...dash} />
        </>
      )}
      {kind === "door" && (
        <>
          <path d="M20 96 V6 H86 V96" {...dash} />
          <path d="M28 54 H78 V88 H28 Z" {...dash} />
          <circle cx={30} cy={50} r={2.5} opacity={draw} />
          <path d="M8 96 H96" {...dash} />
        </>
      )}
      {kind === "phone" && (
        <>
          <path d="M22 4 H80 A6 6 0 0 1 86 10 V90 A6 6 0 0 1 80 96 H22 A6 6 0 0 1 16 90 V10 A6 6 0 0 1 22 4 Z" {...dash} />
          <path d="M42 10 H60" {...dash} />
          <path d="M26 64 H76 M26 74 H62" stroke={colors.graphite700} opacity={draw} />
        </>
      )}
    </svg>
  );
};

// A street of shop facades, all the same greys, blank signs. Width ~3300px, height 640.
const FACADES = Array.from({ length: 14 }, (_, i) => {
  const w = [220, 260, 200, 240, 280, 210, 250][i % 7];
  const h = [520, 460, 560, 480, 500, 540, 440][(i * 3) % 7];
  const fill = [colors.graphite700, colors.ink800, colors.graphite500, colors.ink800][i % 4];
  return { w, h, fill };
});
export const STREET_W = FACADES.reduce((a, f) => a + f.w + 16, 0);

export const Street: React.FC<{ same: number }> = ({ same }) => {
  let x = 0;
  return (
    <svg width={STREET_W} height={640} viewBox={`0 0 ${STREET_W} 640`} style={{ display: "block", flexShrink: 0, minWidth: STREET_W }}>
      <line x1={0} y1={620} x2={STREET_W} y2={620} stroke={s.line} strokeWidth={4} />
      {FACADES.map((f, i) => {
        const x0 = x;
        x += f.w + 16;
        const top = 620 - f.h;
        const fill = same > 0.5 ? colors.graphite700 : f.fill;
        return (
          <g key={i} opacity={1 - same * 0.45}>
            <rect x={x0} y={top} width={f.w} height={f.h} fill={fill} stroke={colors.stone400} strokeWidth={3} />
            {/* sign board: blank */}
            <rect x={x0 + 18} y={top + 24} width={f.w - 36} height={54} rx={8} fill={same > 0.5 ? colors.graphite700 : colors.mist300} opacity={0.8} />
            {/* awning */}
            <path
              d={`M${x0} ${top + 100} h${f.w} l-14 34 h-${f.w - 28} z`}
              fill={i % 2 ? colors.stone400 : colors.mist300}
              opacity={0.35 + 0.65 * (1 - same)}
            />
            {/* door + window */}
            <rect x={x0 + 24} y={620 - 190} width={70} height={190} fill={colors.ink900} stroke={s.line} strokeWidth={3} />
            <rect x={x0 + 110} y={620 - 220} width={f.w - 134} height={120} fill={colors.ink900} stroke={s.line} strokeWidth={3} />
          </g>
        );
      })}
    </svg>
  );
};
