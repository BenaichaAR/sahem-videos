import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, formats, surfaces, SurfaceName } from "../../brand/theme";
import { prog } from "../anim";

// Series badge at the top: name + "n/7" + a route with one station per episode.
// The current station lights up in Signal; past ones are solid, future ones hollow.
export const SeriesBadge: React.FC<{
  title: string;
  episode: number;
  total?: number;
  surface?: SurfaceName;
  /** Frame at which the badge animates in. */
  at?: number;
}> = ({ title, episode, total = 7, surface = "ink", at = 0 }) => {
  const frame = useCurrentFrame();
  const s = surfaces[surface];
  const t = prog(frame, at, 12);
  const line = prog(frame, at + 4, 21);
  const w = 520;
  const step = w / (total - 1);
  return (
    <AbsoluteFill style={{ top: formats.vertical.safe.top + 10, height: 140, alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 18,
          direction: "rtl",
          opacity: t,
          transform: `translateY(${(1 - t) * -16}px)`,
        }}
      >
        <span style={{ fontFamily: fonts.arabic, fontSize: 34, fontWeight: 600, color: s.text }}>{title}</span>
        <span style={{ fontFamily: fonts.latin, fontSize: 30, fontWeight: 500, color: s.muted, direction: "ltr" }}>
          <span style={{ color: s.accent }}>{episode}</span>/{total}
        </span>
      </div>
      {/* RTL: station 1 on the right */}
      <svg width={w + 24} height={30} style={{ marginTop: 18 }} viewBox={`-12 -15 ${w + 24} 30`}>
        <line x1={w} y1={0} x2={w - w * line} y2={0} stroke={s.line} strokeWidth={3} />
        {Array.from({ length: total }, (_, i) => {
          const x = w - i * step;
          const on = prog(frame, at + 4 + (i / (total - 1)) * 21, 5);
          const n = i + 1;
          const current = n === episode;
          return (
            <circle
              key={i}
              cx={x}
              cy={0}
              r={current ? 9 : 6}
              fill={current ? s.accent : n < episode ? s.text : s.bg}
              stroke={current ? s.accent : s.line}
              strokeWidth={3}
              style={{ transform: `scale(${on})`, transformOrigin: `${x}px 0px` }}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
