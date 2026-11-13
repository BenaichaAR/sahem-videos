import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { Lockup } from "../../../shared/Lockup";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { BrowserTab } from "../Places";
import { local } from "../timing";

// «شعارٌ يكبر؟ أغلب الشعارات… تُصمَّم لمقاسٍ واحد. فتضيع في الصغير… وتفقد قوّتها في الكبير.»
const at = local(0);
const s = surfaces.ink;

export const S2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const one = prog(frame, at(4.25), motion.frames.slow) * (1 - prog(frame, at(7.04), motion.frames.base));
  const small = prog(frame, at(7.04), motion.frames.slow) * (1 - prog(frame, at(9.04), motion.frames.base));
  const big = prog(frame, at(9.04), motion.frames.slow);
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: 0, node: <>شعارٌ يكبر؟</> },
          { at: at(2.05), node: <>أغلب الشعارات…</> },
          { at: at(4.25), node: <>لمقاسٍ <span style={{ color: s.accent }}>واحد</span>.</> },
          { at: at(7.04), node: <>تضيع في الصغير…</> },
          { at: at(9.04), node: <>…وتضعف في الكبير.</> },
        ]}
        size={96}
      />
      {/* one size */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40, ...up(one) }}>
        <Lockup level={3} h={170} />
      </AbsoluteFill>
      {/* too small: the full lockup squeezed into a tab icon → a smudge */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40, ...up(small) }}>
        <div style={{ transform: "scale(1)" }}>
          <BrowserTab
            icon={
              <div style={{ transform: "scale(0.075)", filter: "blur(0.6px)" }}>
                <Lockup level={3} h={170} />
              </div>
            }
          />
        </div>
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: 40, color: s.muted }}>لا يُقرأ</div>
        </div>
      </AbsoluteFill>
      {/* too big: lost on a huge board, thin and weak */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40, ...up(big) }}>
        <div
          style={{
            width: 960,
            height: 560,
            background: colors.ink800,
            border: `4px solid ${s.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            direction: "ltr",
          }}
        >
          <div style={{ opacity: 0.35, transform: "scaleX(2.2) scaleY(0.6)" }}>
            <Lockup level={3} h={90} />
          </div>
        </div>
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: 40, color: s.muted }}>بلا قوّة</div>
        </div>
      </AbsoluteFill>
      <Sfx name="pop" at={at(4.25)} volume={0.6} />
      <Sfx name="cut" at={at(7.04)} volume={0.55} />
      <Sfx name="wipe" at={at(9.04)} volume={0.45} />
    </Frame>
  );
};
