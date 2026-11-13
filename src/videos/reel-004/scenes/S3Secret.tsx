import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { DOT_SPOT, Thing, ThingArt } from "../Things";
import { local } from "../timing";

// «والسرّ؟ ليس في لونٍ نادر. السرّ في لونٍ واحد… في نفس المكان… في كلّ مرّة.
//  على الكوب… على الكيس… على الباب… على الشاشة.»
// The dot never moves on screen; the objects change under it.
const at = local(8.5);
const s = surfaces.ink;
export const BOX = { size: 560, x: 540 - 280, y: 990 - 280 };
export const DOT = { x: BOX.x + (DOT_SPOT.x / 100) * BOX.size, y: BOX.y + (DOT_SPOT.y / 100) * BOX.size };

const ITEMS: { kind: Thing; t: number; label: string }[] = [
  { kind: "shop", t: 12.06, label: "الواجهة" },
  { kind: "cup", t: 18.85, label: "الكوب" },
  { kind: "bag", t: 20.06, label: "الكيس" },
  { kind: "door", t: 21.29, label: "الباب" },
  { kind: "phone", t: 22.45, label: "الشاشة" },
];

export const S3Secret: React.FC = () => {
  const frame = useCurrentFrame();
  const dot = prog(frame, at(14.98), motion.frames.fast);
  const counter = prog(frame, at(16.77), motion.frames.slow);
  const shown = ITEMS.filter((it) => frame >= at(it.t)).length;
  // Rare colours, crossed out: «ليس في لونٍ نادر»
  const rare = prog(frame, at(9.95), motion.frames.slow) * (1 - prog(frame, at(12.06), motion.frames.base));
  const cross = prog(frame, at(10.9), motion.frames.slow);

  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(8.81), node: <>والسرّ؟</> },
          { at: at(9.95), node: <>ليس في لونٍ نادر.</> },
          { at: at(12.06), node: <>لونٌ <span style={{ color: s.accent }}>واحد</span>…</> },
          { at: at(14.98), node: <>في نفس المكان…</> },
          { at: at(16.77), node: <>في كلّ مرّة.</> },
        ]}
        size={96}
      />

      {/* A wheel of rare colour swatches (greys only), crossed out */}
      {rare > 0 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 30, opacity: rare }}>
          <svg width={460} height={460} viewBox="-230 -230 460 460">
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={Math.cos(a) * 170}
                  cy={Math.sin(a) * 170}
                  r={34 * rare}
                  fill={[s.line, s.muted, colors.mist300][i % 3]}
                  opacity={0.5 + (i % 3) * 0.2}
                />
              );
            })}
            <line x1={-200} y1={200} x2={-200 + 400 * cross} y2={200 - 400 * cross} stroke={s.text} strokeWidth={10} strokeLinecap="round" />
          </svg>
        </AbsoluteFill>
      )}

      {/* Objects swap under a fixed dot */}
      {ITEMS.map((it, i) => {
        const next = ITEMS[i + 1];
        const inn = prog(frame, at(it.t), motion.frames.base);
        const out = next ? prog(frame, at(next.t), motion.frames.fast) : 0;
        if (inn === 0 || out === 1) return null;
        return (
          <div
            key={it.kind}
            style={{
              position: "absolute",
              left: BOX.x,
              top: BOX.y,
              opacity: inn * (1 - out),
              transform: `translateY(${(1 - inn) * motion.move.lg}px)`,
            }}
          >
            <ThingArt kind={it.kind} size={BOX.size} draw={i === 0 ? prog(frame, at(it.t), motion.frames.slower) : 1} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: DOT.x - 24,
          top: DOT.y - 24,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: s.accent,
          transform: `scale(${dot})`,
        }}
      />

      {/* Counter */}
      <AbsoluteFill style={{ top: 1330, height: 90, alignItems: "center" }}>
        <div
          style={{
            opacity: counter,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "14px 34px",
            borderRadius: 60,
            border: `2px solid ${s.line}`,
            fontSize: 38,
            fontWeight: 500,
          }}
        >
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: s.accent }} />
          <span>نفس النقطة</span>
          <span style={{ fontFamily: fonts.latin, color: s.accent, direction: "ltr" }}>×{Math.max(1, shown)}</span>
        </div>
      </AbsoluteFill>

      <HiddenLetter letter="ل" at={at(20.4)} x={130} y={1210} />

      <Sfx name="wipe" at={at(9.95)} volume={0.35} />
      <Sfx name="cut" at={at(10.9)} volume={0.5} />
      <Sfx name="draw" at={at(12.06)} volume={0.45} len={21} />
      <Sfx name="pop" at={at(14.98)} volume={0.85} />
      {ITEMS.slice(1).map((it) => (
        <Sfx key={it.kind} name="tick" at={at(it.t)} volume={0.6} />
      ))}
    </Frame>
  );
};
