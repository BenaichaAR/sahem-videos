import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts, motion, surfaces, SurfaceName, type } from "../brand/theme";

export const OUTRO_FRAMES = 90;

// Brand outro, 3s. Follows the official logo animation
// (brand-inbox/behance/.../11_Logo_Animation_1920x1080.mp4):
// dot → route draws from the dot up → arrowhead lands with a Signal "hit"
// → SAHEM STUDIO wipes in left-to-right → follow line + handle.
// Lockup sizes are taken from that video at 1920 wide, then scaled to the frame.

const T = {
  dot: [0, 6],
  path: [3, 30],
  head: [27, 33],
  hit: [31, 45],
  word: [36, 54],
  follow: [52, 66],
} as const;

// Brand SFX (public/sfx, from Sahem_Social_Pack_v01), each synced to its moment.
// `len` trims long files to their moment, with a short fade-out.
const SFX: { name: string; at: number; volume: number; len?: number }[] = [
  { name: "pop", at: T.dot[0], volume: 0.7 },
  { name: "draw", at: T.path[0], volume: 0.5, len: T.path[1] - T.path[0] },
  { name: "hit", at: T.hit[0], volume: 0.9 },
  { name: "wipe", at: T.word[0], volume: 0.45 },
  { name: "rise", at: T.follow[0], volume: 0.5 },
];

// Hit strokes beside the arrow tip (118.7, 15), in the logo's viewBox units.
const HIT_LINES = [
  [123, 15, 131, 15],
  [122, 9.5, 129, 6],
  [122, 20.5, 129, 24],
] as const;

export const Outro: React.FC<{
  surface?: SurfaceName;
  follow?: string;
  handle?: string;
  website?: string;
  /** Play the brand sound effects (default true). */
  sound?: boolean;
}> = ({
  surface = "ink",
  follow = "تابعنا لمزيد من الأفكار",
  handle = brand.handle,
  website = brand.website,
  sound = true,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = surfaces[surface];
  const p = ([a, b]: readonly [number, number]) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: motion.ease,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const dot = p(T.dot);
  const path = p(T.path);
  const head = p(T.head);
  const word = p(T.word);
  const follow_ = p(T.follow);
  // Hit: three short Signal strokes shoot out from the tip, then fade.
  const hitGrow = p([T.hit[0], T.hit[0] + 5]);
  const hitFade = 1 - p([T.hit[0] + 5, T.hit[1]]);

  // Lockup is ~1020px wide in the reference; fit it inside the frame.
  const k = Math.min(1, (width * 0.82) / 1020);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: s.bg,
        color: s.text,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${k})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Lockup: symbol + wordmark (Latin, so LTR) */}
        <div style={{ direction: "ltr", display: "flex", alignItems: "center", gap: 85 }}>
          <svg
            viewBox="-5.6 2 124.3 150"
            width={261}
            height={315}
            overflow="visible"
            aria-label={brand.nameLatin}
          >
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
              opacity={head}
              transform={`translate(${(head - 1) * 6} 0)`}
            />
            <g
              stroke={s.accent}
              strokeWidth={2.4}
              strokeLinecap="butt"
              opacity={hitFade}
              transform={`translate(${hitGrow * 3} 0)`}
            >
              {HIT_LINES.map(([x1, y1, x2, y2], i) => {
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x1 + (x2 - x1) * hitGrow}
                    y2={y1 + (y2 - y1) * hitGrow}
                  />
                );
              })}
            </g>
            <circle
              cx={7.4}
              cy={139}
              r={13}
              fill={s.accent}
              style={{ transform: `scale(${dot})`, transformOrigin: "7.4px 139px" }}
            />
          </svg>

          <div
            style={{
              fontFamily: fonts.latin,
              color: s.text,
              clipPath: `inset(-10% ${(1 - word) * 100}% -10% 0)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div style={{ fontSize: 174, fontWeight: 600, lineHeight: 1, letterSpacing: "0.01em" }}>SAHEM</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 56,
                fontWeight: 400,
                lineHeight: 1,
                marginTop: 26,
              }}
            >
              {"STUDIO".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Follow line (Arabic) + handle */}
        <div
          style={{
            marginTop: 120,
            textAlign: "center",
            opacity: follow_,
            transform: `translateY(${(1 - follow_) * motion.move.md}px)`,
          }}
        >
          <div
            style={{
              direction: "rtl",
              fontFamily: fonts.arabic,
              fontSize: type.h2.size,
              fontWeight: type.h2.weight,
              color: s.text,
            }}
          >
            {follow}
          </div>
          <div
            style={{
              direction: "ltr",
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              fontFamily: fonts.latin,
              fontSize: type.label.size + 14,
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ color: s.text }}>{website}</span>
            <span
              style={{ width: 12, height: 12, borderRadius: "50%", background: s.accent, display: "inline-block" }}
            />
            <span style={{ color: s.muted }}>@{handle}</span>
          </div>
        </div>
      </div>

      {sound &&
        SFX.map((x) => (
          <Sequence key={x.name} from={x.at} name={`sfx ${x.name}`} layout="none">
            <Audio
              src={staticFile(`sfx/sahem_sfx_${x.name}.wav`)}
              volume={(f) =>
                x.len
                  ? x.volume * interpolate(f, [x.len - 6, x.len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                  : x.volume
              }
            />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
