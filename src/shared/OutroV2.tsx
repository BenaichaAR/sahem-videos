import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts, motion, surfaces, SurfaceName } from "../brand/theme";

export const OUTRO_V2_FRAMES = 90;

// Outro v2 — "hero" version, 3s.
// 1. Camera starts tight on the Signal dot and follows the route as it draws, giant.
// 2. Arrowhead slams in: Signal shockwave + hit strokes + a short scale punch (no overshoot).
// 3. The symbol flies into the lockup while SAHEM rises letter by letter.
// 4. A line draws under the lockup (line leads), the website follows it.
// Website only, no social handle.

const T = {
  dot: [0, 6],
  path: [3, 30],
  head: [28, 32],
  hit: [31, 46],
  fly: [36, 56],
  word: [40, 58],
  line: [54, 66],
  site: [58, 72],
  hold: [56, 90],
} as const;

const SFX: { name: string; at: number; volume: number; len?: number }[] = [
  { name: "pop", at: T.dot[0], volume: 0.8 },
  { name: "draw", at: T.path[0], volume: 0.55, len: T.path[1] - T.path[0] },
  { name: "hit", at: T.hit[0], volume: 1 },
  { name: "wipe", at: T.fly[0], volume: 0.5 },
  { name: "rise", at: T.site[0], volume: 0.55 },
];

// Logo geometry (viewBox units). Base SVG is 261×315 px → 2.1 px per unit.
const VB = { x: -5.6, y: 2, w: 124.3, h: 150 };
const SYM = { w: 261, h: 315 };
const U = SYM.w / VB.w;
const DOT = { x: 7.4, y: 139 };
const TIP = { x: 118.7, y: 15 };
const center = { x: VB.x + VB.w / 2, y: VB.y + VB.h / 2 };
// Dot offset from the symbol centre, in base px.
const DOT_OFF = { x: (DOT.x - center.x) * U, y: (DOT.y - center.y) * U };

const HIT_LINES = [
  [123, 15, 133, 15],
  [122, 9.5, 131, 5],
  [122, 20.5, 131, 25],
] as const;

// Background routes: thin S-ish lines across the frame, for depth.
const BG_ROUTES = [
  "M-80 260 H300 C420 260 420 420 540 420 H1160",
  "M-80 610 H180 C300 610 300 760 420 760 H1160",
  "M1160 1180 H760 C640 1180 640 1330 520 1330 H-80",
  "M1160 1540 H880 C760 1540 760 1690 640 1690 H-80",
  "M-80 1880 H420 C540 1880 540 2020 660 2020 H1160",
  "M1160 40 H700 C580 40 580 140 460 140 H-80",
];

export const OutroV2: React.FC<{
  surface?: SurfaceName;
  website?: string;
  /** Play the brand sound effects (default true). */
  sound?: boolean;
}> = ({ surface = "ink", website = brand.website, sound = true }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = surfaces[surface];
  const p = ([a, b]: readonly [number, number]) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: motion.ease,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;

  const dot = p(T.dot);
  const path = p(T.path);
  const head = p(T.head);
  const fly = p(T.fly);
  const line = p(T.line);
  const site = p(T.site);
  const hold = p(T.hold);
  const hitGrow = p([T.hit[0], T.hit[0] + 6]);
  const hitFade = 1 - p([T.hit[0] + 6, T.hit[1]]);
  const punch = 1 - p([T.hit[0], T.hit[0] + 8]); // 1 at impact → 0

  // ---- Final lockup layout (px, frame coords) ----
  const k = Math.min(1, (width * 0.8) / 1020); // lockup scale, same as Outro v1
  const symW = SYM.w * k;
  const gap = 80 * k;
  const wordW = 600 * k;
  const lockW = symW + gap + wordW;
  const lockLeft = (width - lockW) / 2;
  const lockY = height * 0.47;
  const symFinal = { x: lockLeft + symW / 2, y: lockY, s: k };

  // ---- Symbol camera ----
  // Hero: symbol centred and big. Starts tighter, centred on the dot, and pulls back as the route draws.
  const heroS = mix(3.4, 2.5, path);
  const follow = p([0, T.path[1] + 2]);
  const hero = {
    x: mix(width / 2 - DOT_OFF.x * 3.4, width / 2, follow),
    y: mix(lockY - DOT_OFF.y * 3.4, lockY, follow),
    s: heroS * (1 + 0.06 * punch * (frame >= T.hit[0] ? 1 : 0)),
  };
  const sym = {
    x: mix(hero.x, symFinal.x, fly),
    y: mix(hero.y, symFinal.y, fly),
    s: mix(hero.s, symFinal.s, fly),
  };
  // Stroke gets thinner on screen as it shrinks, so keep the shockwave in px terms.
  const ringScale = 1 / sym.s;

  // Global slow push for life during the hold.
  const push = 1 + 0.03 * hold;
  // Background parallax: moves less than the symbol.
  const bgScale = mix(1.25, 1, p([0, T.fly[1]])) * push;
  const bgDraw = (i: number) => p([i * 3, 26 + i * 3]);
  const bgOpacity = mix(0.9, 0.45, p(T.hit));

  const letters = "SAHEM".split("");

  return (
    <AbsoluteFill style={{ backgroundColor: s.bg, overflow: "hidden" }}>
      {/* Soft spotlight behind the symbol */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% ${(lockY / height) * 100}%, ${s.line}55 0%, transparent 55%)`,
          opacity: p([0, 20]),
        }}
      />

      {/* Background routes */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, opacity: bgOpacity }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {BG_ROUTES.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={s.line}
              strokeWidth={3}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - bgDraw(i)}
            />
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        {/* Symbol */}
        <div
          style={{
            position: "absolute",
            left: sym.x - SYM.w / 2,
            top: sym.y - SYM.h / 2,
            width: SYM.w,
            height: SYM.h,
            transform: `scale(${sym.s})`,
            transformOrigin: "50% 50%",
          }}
        >
          <svg
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            width={SYM.w}
            height={SYM.h}
            overflow="visible"
            aria-label={brand.nameLatin}
          >
            {/* Shockwave rings from the tip */}
            {[0, 4].map((delay) => {
              const r = p([T.hit[0] + delay, T.hit[0] + delay + 14]);
              return (
                <circle
                  key={delay}
                  cx={TIP.x}
                  cy={TIP.y}
                  r={16 + r * 80}
                  fill="none"
                  stroke={s.accent}
                  strokeWidth={(1 - r) * 3 * ringScale * 2.5}
                  opacity={frame >= T.hit[0] + delay ? 1 - r : 0}
                />
              );
            })}
            <path
              d="M36 139H60A31 31 0 0 0 60 77A31 31 0 0 1 60 15H94"
              fill="none"
              stroke={s.text}
              strokeWidth={motion.routeStroke}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - path}
            />
            <path
              d="M93.5 2L118.7 15L93.5 28Z"
              fill={s.text}
              opacity={head > 0 ? 1 : 0}
              transform={`translate(${(head - 1) * 22} 0)`}
            />
            <g stroke={s.accent} strokeWidth={2.6} opacity={hitFade} transform={`translate(${hitGrow * 4} 0)`}>
              {HIT_LINES.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * hitGrow} y2={y1 + (y2 - y1) * hitGrow} />
              ))}
            </g>
            <circle
              cx={DOT.x}
              cy={DOT.y}
              r={13}
              fill={s.accent}
              style={{ transform: `scale(${dot})`, transformOrigin: `${DOT.x}px ${DOT.y}px` }}
            />
          </svg>
        </div>

        {/* Wordmark: SAHEM rises letter by letter, STUDIO wipes in */}
        <div
          style={{
            position: "absolute",
            left: lockLeft + symW + gap,
            top: lockY,
            transform: `translateY(-50%) scale(${k})`,
            transformOrigin: "0 50%",
            direction: "ltr",
            fontFamily: fonts.latin,
            color: s.text,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", overflow: "hidden", fontSize: 174, fontWeight: 600, lineHeight: 1.08 }}>
            {letters.map((c, i) => {
              const t = p([T.word[0] + i * motion.frames.staggerSm, T.word[0] + i * motion.frames.staggerSm + 12]);
              return (
                <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - t) * 110}%)` }}>
                  {c}
                </span>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 1,
              marginTop: 18,
              clipPath: `inset(-10% ${(1 - p([T.word[0] + 8, T.word[1]])) * 100}% -10% 0)`,
            }}
          >
            {"STUDIO".split("").map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>

        {/* Line leads, website follows */}
        <div
          style={{
            position: "absolute",
            left: lockLeft,
            width: lockW,
            top: lockY + 250 * k,
            height: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 3,
              width: `${line * 100}%`,
              background: s.line,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -7,
              left: `calc(${line * 100}% - 8px)`,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: s.accent,
              opacity: line > 0 ? 1 : 0,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: lockY + 250 * k + 50,
            textAlign: "center",
            direction: "ltr",
            fontFamily: fonts.latin,
            fontSize: 54,
            fontWeight: 500,
            letterSpacing: `${mix(0.3, 0.06, site)}em`,
            color: s.text,
            opacity: site,
            transform: `translateY(${(1 - site) * motion.move.lg}px)`,
          }}
        >
          {website}
        </div>
      </AbsoluteFill>

      {sound &&
        SFX.map((x) => (
          <Sequence key={x.name} from={x.at} name={`sfx ${x.name}`} layout="none">
            <Audio
              src={staticFile(`sfx/sahem_sfx_${x.name}.wav`)}
              volume={(f) =>
                x.len
                  ? x.volume *
                    interpolate(f, [x.len - 6, x.len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                  : x.volume
              }
            />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
