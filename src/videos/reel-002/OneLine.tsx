import React from "react";
import { getLength, getPointAtLength } from "@remotion/paths";
import { surfaces } from "../../brand/theme";
import { RouteMark } from "../../shared/RouteMark";

// One continuous stroke: table → cup → key → house → the Sahem route.
// Strip coordinates: x 0..2430, y -330..180 (table line at y=140).
// The route part is the real logo route scaled by K, so it can turn into the mark.
const K = 3.4;
const X0 = 2150 - 36 * K;
const sc = (x: number, y: number) => [X0 + x * K, 140 + (y - 139) * K] as const;
const R = 31 * K;
const [r60x, r77y] = sc(60, 77);
const [, r15y] = sc(60, 15);
const [r94x] = sc(94, 15);
const [r36x] = sc(36, 139);
export const DOT_AT = sc(7.4, 139);

const SEGMENTS = [
  "M0 140 H300", // table to the cup
  "L280 -60 H520 L500 20 C600 20 600 110 495 100 L490 140", // cup + handle
  "H760 C820 140 880 140 880 110 A70 70 0 1 1 950 40 H1240 V100 H1200 V70 H1160 V100 H1120 V40 H1240 C1300 40 1300 140 1360 140", // key
  "H1660 V40 H1740 V140 H1880 V-60 L1700 -220 L1520 -60 V140", // house
  `H${DOT_AT[0]}`, // out to the dot
  `H${r36x} H${r60x} A${R} ${R} 0 0 0 ${r60x} ${r77y} A${R} ${R} 0 0 1 ${r60x} ${r15y} H${r94x}`, // route
];
export const PATH = SEGMENTS.join(" ");
/** Cumulative length at the end of each segment: toCup, cup, key, house, toDot, route. */
export const L = SEGMENTS.map((_, i) => getLength(SEGMENTS.slice(0, i + 1).join(" ")));
export const TOTAL_LEN = L[L.length - 1];
export const penAt = (len: number) =>
  getPointAtLength(PATH, Math.max(0, Math.min(TOTAL_LEN, len))) ?? { x: 0, y: 140 };

// Extra details: separate strokes that break the rule, then fall away.
export const DETAILS = [
  "M360 -110 c-20 -30 20 -50 0 -80",
  "M440 -110 c-20 -30 20 -50 0 -80",
  "M905 40 A25 25 0 1 1 904.9 39",
  "M1560 -20 h60 v60 h-60 z M1590 -20 v60 M1560 10 h60",
  "M1800 -130 v-70 h40 v105",
  "M1820 -230 c-20 -30 20 -50 0 -80",
];

export type Cam = { x: number; y: number; s: number };

export const OneLineStage: React.FC<{
  len: number;
  cam: Cam;
  /** 0..1 per detail: appear. */
  details?: number[];
  /** 0..1 per detail: fall. */
  fall?: number[];
  dot: number;
  /** Mark: thin line turns into the real mark (0..1), and hit progress. */
  mark: number;
  hit: number;
  pen: boolean;
  /** Opacity of the thin line (fade it under the mark when only the route is in view). */
  thin?: number;
}> = ({ len, cam, details = [], fall = [], dot, mark, hit, pen, thin = 1 }) => {
  const s = surfaces.ink;
  const p = penAt(len);
  const sw = 16 / Math.sqrt(cam.s);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(540 1000) scale(${cam.s}) translate(${-cam.x} ${-cam.y})`}>
        {DETAILS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={s.muted}
            strokeWidth={sw * 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={(details[i] ?? 0) * (1 - (fall[i] ?? 0))}
            transform={`translate(0 ${(fall[i] ?? 0) * 700}) rotate(${(fall[i] ?? 0) * (i % 2 ? 25 : -25)} 1200 0)`}
          />
        ))}
        <path
          d={PATH}
          fill="none"
          stroke={s.text}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${len} ${TOTAL_LEN + 10}`}
          opacity={thin}
        />
        {/* The real Sahem dot */}
        <circle
          cx={DOT_AT[0]}
          cy={DOT_AT[1]}
          r={13 * K}
          fill={s.accent}
          style={{ transform: `scale(${dot})`, transformOrigin: `${DOT_AT[0]}px ${DOT_AT[1]}px` }}
        />
        {/* Thin route → real mark (nested svg, no foreignObject) */}
        {mark > 0 && (
          <g opacity={mark} transform={`translate(${X0 - 5.6 * K} ${140 + (2 - 139) * K})`}>
            <RouteMark width={124.3 * K} dot={1} path={1} head={mark} hit={hit} />
          </g>
        )}
        {/* Pen tip */}
        {pen && <circle cx={p.x} cy={p.y} r={18 / cam.s} fill={s.accent} />}
      </g>
    </svg>
  );
};
