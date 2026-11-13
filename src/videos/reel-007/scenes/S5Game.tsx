import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";

// «اجمع الحروف السبعة… رتّبها… وأرسل الكلمة لنا في رسالة خاصّة.
//  أوّل من يرسلها صحيحة… يربح مراجعة مجّانيّة لهويّة مشروعه.»
const at = local(22.6);
const s = surfaces.ink;
// A shuffle order for «رتّبها» (slots swap places).
const SHUFFLE = [3, 0, 5, 1, 6, 2, 4];

export const S5Game: React.FC = () => {
  const frame = useCurrentFrame();
  const shuffle = prog(frame, at(24.64), motion.frames.slow) * (1 - prog(frame, at(25.3), motion.frames.slow));
  const send = prog(frame, at(25.57), motion.frames.slow);
  const fly = prog(frame, at(26.6), motion.frames.slower);
  const slotsOut = prog(frame, at(28.89), motion.frames.slow);
  const prize = prog(frame, at(30.88), motion.frames.slow);
  const W = 104;
  const G = 18;
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(22.85), node: <>اجمع الحروف السبعة…</> },
          { at: at(24.64), node: <>رتّبها…</> },
          { at: at(25.57), node: <>وأرسلها في <span style={{ color: s.accent }}>الخاص</span>.</> },
          { at: at(28.89), node: <>أوّل من يرسلها صحيحة…</> },
        ]}
        size={88}
      />

      {/* seven slots, all found now */}
      <AbsoluteFill style={{ top: 760, height: 160, opacity: 1 - slotsOut }}>
        <div style={{ position: "relative", width: 7 * W + 6 * G, height: 140, margin: "0 auto" }}>
          {Array.from({ length: 7 }, (_, i) => {
            const t = prog(frame, at(22.85) + i * 3, motion.frames.fast);
            const x = (i + (SHUFFLE[i] - i) * shuffle) * (W + G);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: 0,
                  width: W,
                  height: 136,
                  borderRadius: 20,
                  border: `3px solid ${s.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: t,
                  transform: `scale(${0.7 + 0.3 * t}) translateY(${Math.sin((i + 1) * 2) * 24 * shuffle}px)`,
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.accent }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* send: a paper plane (object) flies off */}
      <AbsoluteFill style={{ top: 1000, height: 300, alignItems: "center", opacity: send * (1 - slotsOut) }}>
        <svg
          width={200}
          height={200}
          viewBox="0 0 100 100"
          style={{ transform: `translate(${fly * -420}px, ${fly * -260}px) rotate(${-fly * 20}deg)`, opacity: 1 - fly * 0.9 }}
          fill="none"
          stroke={s.text}
          strokeWidth={5}
          strokeLinejoin="round"
        >
          <path d="M90 12 L10 46 L40 56 Z M90 12 L40 56 L48 88 Z M40 56 L60 64" />
        </svg>
      </AbsoluteFill>

      {/* the prize */}
      <AbsoluteFill style={{ top: 760, alignItems: "center", opacity: prize, transform: `translateY(${(1 - prize) * motion.move.lg}px)` }}>
        <div
          style={{
            width: 860,
            padding: "60px 60px",
            borderRadius: 40,
            background: colors.ink800,
            border: `3px solid ${s.accent}`,
            display: "flex",
            alignItems: "center",
            gap: 50,
          }}
        >
          <RouteMark width={150} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 40, color: s.muted }}>الجائزة</div>
            <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.3 }}>مراجعة مجّانيّة</div>
            <div style={{ fontSize: 44, fontWeight: 500 }}>لهويّة مشروعك</div>
          </div>
        </div>
      </AbsoluteFill>

      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="tick" at={at(22.85) + i * 3} volume={0.4} />
      ))}
      <Sfx name="wipe" at={at(24.64)} volume={0.45} />
      <Sfx name="draw" at={at(26.6)} volume={0.4} len={21} />
      <Sfx name="reveal" at={at(30.88) - 2} volume={0.6} />
      <Sfx name="hit" at={at(30.88) + 6} volume={0.8} />
    </Frame>
  );
};
