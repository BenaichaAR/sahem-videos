import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";

// «وما هو طلبك المستحيل؟ اكتبه في التعليقات… فالموسم الثاني… سيُبنى من طلباتكم.»
const at = local(34.5);
const s = surfaces.ink;

export const S6Season: React.FC = () => {
  const frame = useCurrentFrame();
  const box = prog(frame, at(37.02), motion.frames.slow);
  const season = prog(frame, at(38.89), motion.frames.slow);
  const built = prog(frame, at(40.67), motion.frames.slow);
  const caret = Math.floor(frame / 15) % 2 === 0;
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(34.73), node: <>وما طلبك <span style={{ color: s.accent }}>المستحيل</span>؟</> },
          { at: at(38.89), node: <>الموسم الثاني…</> },
        ]}
        size={96}
      />
      {/* An empty comment field, waiting */}
      <AbsoluteFill style={{ top: 760, alignItems: "center", opacity: box * (1 - season * 0.6), transform: `translateY(${(1 - box) * motion.move.lg}px)` }}>
        <div
          style={{
            width: 860,
            height: 130,
            borderRadius: 65,
            border: `3px solid ${s.line}`,
            background: colors.ink800,
            display: "flex",
            alignItems: "center",
            padding: "0 50px",
            gap: 20,
          }}
        >
          <div style={{ width: 5, height: 60, background: caret ? s.accent : "transparent" }} />
          <div style={{ fontSize: 42, color: s.muted }}>اكتب طلبك هنا…</div>
        </div>
      </AbsoluteFill>
      {/* Season 2 */}
      <AbsoluteFill style={{ top: 960, alignItems: "center", gap: 40 }}>
        <div
          style={{
            opacity: season,
            transform: `scale(${0.85 + 0.15 * season})`,
            padding: "26px 60px",
            borderRadius: 80,
            background: s.accent,
            color: s.bg,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span style={{ fontSize: 60, fontWeight: 600 }}>الموسم</span>
          <span style={{ fontFamily: fonts.latin, fontSize: 80, fontWeight: 600 }}>2</span>
        </div>
        <div style={{ opacity: built, transform: `translateY(${(1 - built) * motion.move.lg}px)`, fontSize: 84, fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}>
          من طلباتكم.
        </div>
      </AbsoluteFill>
      <Sfx name="tap" at={at(37.02)} volume={0.55} />
      <Sfx name="hit" at={at(38.89)} volume={0.85} />
      <Sfx name="rise" at={at(40.67)} volume={0.5} />
    </Frame>
  );
};
