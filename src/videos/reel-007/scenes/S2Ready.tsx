import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";

// «كلّ شيء؟ سبعة أيّام… في سبع ثوانٍ. جاهز؟»
const at = local(0);
const s = surfaces.ink;

export const S2Ready: React.FC = () => {
  const frame = useCurrentFrame();
  const days = prog(frame, at(1.54), motion.frames.slow);
  const ready = prog(frame, at(5.21), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: 0, node: <>كلّ شيء؟</> },
          { at: at(1.54), node: <>سبعة أيّام…</> },
          { at: at(3.07), node: <>في <span style={{ fontFamily: fonts.latin, color: s.accent }}>7</span> ثوانٍ.</> },
        ]}
        size={96}
      />
      {/* seven days → seven dots */}
      <AbsoluteFill style={{ top: 820, height: 120, flexDirection: "row", justifyContent: "center", gap: 36, opacity: days * (1 - ready) }}>
        {Array.from({ length: 7 }, (_, i) => {
          const t = prog(frame, at(1.54) + i * 3, motion.frames.fast);
          return <div key={i} style={{ width: 54, height: 54, borderRadius: "50%", background: s.text, transform: `scale(${t})` }} />;
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40 }}>
        <div
          style={{
            fontSize: 220,
            fontWeight: 600,
            color: s.accent,
            opacity: ready,
            transform: `scale(${0.85 + 0.15 * ready})`,
          }}
        >
          جاهز؟
        </div>
      </AbsoluteFill>
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="tick" at={at(1.54) + i * 3} volume={0.4} />
      ))}
      <Sfx name="reveal" at={at(5.21) - 2} volume={0.55} />
    </Frame>
  );
};
