import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «غداً… الطلب الأخير. هل جمعت الحروف؟» — a 7s chip and seven letter slots
// (six found, one still a question). The letters themselves stay hidden.
const at = local(38.2);

export const S7Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const tag = prog(frame, at(38.44), motion.frames.slow);
  const last = prog(frame, at(39.51), motion.frames.slow);
  const chip = prog(frame, at(40.1), motion.frames.slow);
  const q = prog(frame, at(41.23), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 470, alignItems: "center", gap: 46 }}>
        <div style={{ ...up(tag), display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: type.h1.size, fontWeight: 600 }}>غداً…</div>
        </div>
        <div style={{ ...up(last), fontSize: 120, fontWeight: 600, lineHeight: 1.3 }}>الطلب الأخير.</div>
        <div
          style={{
            ...up(chip),
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 36px",
            borderRadius: 60,
            border: `2px solid ${s.line}`,
          }}
        >
          <span style={{ fontFamily: fonts.latin, fontSize: 52, fontWeight: 600, color: s.accent }}>7</span>
          <span style={{ fontSize: 42 }}>ثوانٍ</span>
        </div>
        <div style={{ ...up(q), marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <div style={{ fontSize: 56, fontWeight: 500 }}>هل جمعت الحروف؟</div>
          <div style={{ display: "flex", gap: 18 }}>
            {Array.from({ length: 7 }, (_, i) => {
              const on = prog(frame, at(41.23) + 4 + i * 3, motion.frames.fast);
              const missing = i === 6;
              return (
                <div
                  key={i}
                  style={{
                    width: 96,
                    height: 120,
                    borderRadius: 18,
                    border: `3px ${missing ? "dashed" : "solid"} ${missing ? s.accent : s.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${0.7 + 0.3 * on})`,
                    opacity: on,
                  }}
                >
                  {missing ? (
                    <span style={{ fontSize: 64, fontWeight: 600, color: s.accent }}>؟</span>
                  ) : (
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
      <Sfx name="hit" at={at(39.51)} volume={0.7} />
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={i} name="tick" at={at(41.23) + 4 + i * 3} volume={0.45} />
      ))}
    </Frame>
  );
};
