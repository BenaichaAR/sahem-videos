import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";
import { COFFEE, RING } from "./S2Words";

// «لكنّ الرمز… يفهمه الجميع. الأشكال لها لغة واحدة.
//  السهم يعني: اتّجاه. والعلامة تعني: تمّ. والدائرة تعني: اكتمال.»
const at = local(11.7);
const s = surfaces.ink;

const Sym: React.FC<{ kind: "cup" | "arrow" | "check" | "circle"; size: number; draw: number; color?: string }> = ({
  kind,
  size,
  draw,
  color = s.text,
}) => {
  const d = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      {kind === "cup" && (
        <>
          <path d="M20 36 H74 L68 86 H26 Z M74 46 C92 46 92 70 72 70" {...d} />
          <path d="M38 26 c-6 -8 6 -12 0 -20 M56 26 c-6 -8 6 -12 0 -20" opacity={draw} />
        </>
      )}
      {kind === "arrow" && <path d="M14 50 H82 M60 28 L82 50 L60 72" {...d} />}
      {kind === "check" && <path d="M18 52 L40 74 L84 28" {...d} />}
      {kind === "circle" && <circle cx={50} cy={50} r={34} {...d} />}
    </svg>
  );
};

const ITEMS = [
  { kind: "arrow" as const, label: "اتّجاه", t: 18.7 },
  { kind: "check" as const, label: "تمّ", t: 21.19 },
  { kind: "circle" as const, label: "اكتمال", t: 23.78 },
];

export const S3Symbols: React.FC = () => {
  const frame = useCurrentFrame();
  // Words from the previous scene fade away as the cup draws.
  const wordsOut = prog(frame, at(12.15), motion.frames.slower);
  const cup = prog(frame, at(12.15), motion.frames.slower);
  const all = prog(frame, at(13.62), motion.frames.slow);
  const cupOut = prog(frame, at(15.87), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(12.15), node: <>لكنّ الرمز…</> },
          { at: at(13.62), node: <>يفهمه <span style={{ color: s.accent }}>الجميع</span>.</> },
          { at: at(15.87), node: <>للأشكال لغة واحدة.</> },
        ]}
        size={96}
      />
      {/* leftover ring of words */}
      {COFFEE.map((c, i) => (
        <div
          key={c.w}
          style={{
            position: "absolute",
            left: RING[i][0],
            top: RING[i][1],
            transform: `translate(-50%, -50%) scale(${0.45 - 0.15 * wordsOut})`,
            fontFamily: c.latin ? fonts.latin : fonts.arabic,
            fontSize: 190,
            fontWeight: 600,
            whiteSpace: "nowrap",
            color: s.muted,
            opacity: 1 - wordsOut,
          }}
        >
          {c.w}
        </div>
      ))}
      {/* the cup symbol: everyone gets it */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 20, opacity: 1 - cupOut }}>
        <div style={{ transform: `scale(${1 + 0.08 * all})` }}>
          <Sym kind="cup" size={380} draw={cup} />
        </div>
      </AbsoluteFill>
      {/* three shapes, one language */}
      <AbsoluteFill style={{ top: 760, height: 520, flexDirection: "row", justifyContent: "center", gap: 40 }}>
        {ITEMS.map((it) => {
          const t = prog(frame, at(it.t), motion.frames.slow);
          const draw = prog(frame, at(it.t), motion.frames.slower);
          return (
            <div
              key={it.kind}
              style={{
                width: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 26,
                opacity: t,
                transform: `translateY(${(1 - t) * motion.move.lg}px)`,
              }}
            >
              <div
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 40,
                  border: `2px solid ${s.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sym kind={it.kind} size={170} draw={draw} />
              </div>
              <div style={{ fontSize: 54, fontWeight: 600 }}>{it.label}</div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Sfx name="draw" at={at(12.15)} volume={0.45} len={21} />
      <Sfx name="rise" at={at(13.62)} volume={0.4} />
      {ITEMS.map((it) => (
        <Sfx key={it.kind} name="pop" at={at(it.t)} volume={0.6} />
      ))}
    </Frame>
  );
};
