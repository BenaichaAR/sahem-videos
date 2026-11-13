import React from "react";
import { surfaces, SurfaceName, motion } from "../brand/theme";

// The Sahem symbol (dot → route → arrowhead) driven by progress values 0..1,
// so any scene can build it piece by piece. Base size 261×315 px.
export const ROUTE_MARK = { w: 261, h: 315 } as const;

const HIT_LINES = [
  [123, 15, 133, 15],
  [122, 9.5, 131, 5],
  [122, 20.5, 131, 25],
] as const;

export const RouteMark: React.FC<{
  surface?: SurfaceName;
  dot?: number;
  path?: number;
  head?: number;
  /** 0..1 over the hit: strokes grow then fade, a ring expands. */
  hit?: number;
  /** Faint outline of the whole mark, as a guide. */
  ghost?: number;
  width?: number;
}> = ({ surface = "ink", dot = 1, path = 1, head = 1, hit = 0, ghost = 0, width = ROUTE_MARK.w }) => {
  const s = surfaces[surface];
  const grow = Math.min(1, hit * 2.5);
  const fade = hit < 0.4 ? 1 : 1 - (hit - 0.4) / 0.6;
  const route = "M36 139H60A31 31 0 0 0 60 77A31 31 0 0 1 60 15H94";
  const arrow = "M93.5 2L118.7 15L93.5 28Z";
  return (
    <svg
      viewBox="-5.6 2 124.3 150"
      width={width}
      height={(width * ROUTE_MARK.h) / ROUTE_MARK.w}
      overflow="visible"
    >
      {ghost > 0 && (
        <g opacity={ghost} fill="none" stroke={s.line} strokeWidth={1.2} strokeDasharray="3 3">
          <path d={route} strokeWidth={motion.routeStroke} strokeOpacity={0.35} strokeDasharray="none" />
          <path d={arrow} />
          <circle cx={7.4} cy={139} r={13} />
        </g>
      )}
      {hit > 0 && hit < 1 && (
        <circle
          cx={118.7}
          cy={15}
          r={16 + hit * 80}
          fill="none"
          stroke={s.accent}
          strokeWidth={(1 - hit) * 3}
          opacity={1 - hit}
        />
      )}
      <path
        d={route}
        fill="none"
        stroke={s.text}
        strokeWidth={motion.routeStroke}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - path}
      />
      <path d={arrow} fill={s.text} opacity={head > 0 ? 1 : 0} transform={`translate(${(head - 1) * 22} 0)`} />
      {hit > 0 && hit < 1 && (
        <g stroke={s.accent} strokeWidth={2.6} opacity={fade} transform={`translate(${grow * 4} 0)`}>
          {HIT_LINES.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * grow} y2={y1 + (y2 - y1) * grow} />
          ))}
        </g>
      )}
      <circle
        cx={7.4}
        cy={139}
        r={13}
        fill={s.accent}
        style={{ transform: `scale(${dot})`, transformOrigin: "7.4px 139px" }}
      />
    </svg>
  );
};
