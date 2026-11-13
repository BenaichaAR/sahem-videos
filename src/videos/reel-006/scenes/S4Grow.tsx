import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { BrowserTab, BusinessCard, PhoneHome, ShopFront } from "../Places";
import { local } from "../timing";

// «يبدأ المشروع نقطةً… في تبويبٍ صغير. ثمّ أيقونةً… على الهاتف. ثمّ بطاقة عمل… ثمّ لافتةً… على واجهة محلّك.»
const at = local(21.6);
const s = surfaces.ink;

const STEPS = [
  { t: 21.89, el: <BrowserTab /> },
  { t: 25.27, el: <PhoneHome /> },
  { t: 27.76, el: <BusinessCard /> },
  { t: 29.5, el: <ShopFront /> },
];

export const S4Grow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(21.89), node: <>يبدأ <span style={{ color: s.accent }}>نقطةً</span>…</> },
          { at: at(25.27), node: <>ثمّ أيقونة…</> },
          { at: at(27.76), node: <>ثمّ بطاقة…</> },
          { at: at(29.5), node: <>ثمّ لافتة.</> },
        ]}
        size={96}
      />
      {STEPS.map((st, i) => {
        const inn = prog(frame, at(st.t), motion.frames.slower);
        const next = STEPS[i + 1];
        const out = next ? prog(frame, at(next.t), motion.frames.slow) : 0;
        if (inn === 0 || out === 1) return null;
        // Each place comes in from closer (bigger) and leaves by shrinking away: the project grows.
        const scale = (1.35 - 0.35 * inn) * (1 - 0.4 * out);
        return (
          <AbsoluteFill key={i} style={{ alignItems: "center", justifyContent: "center", top: 70 }}>
            <div style={{ opacity: inn * (1 - out), transform: `scale(${scale})` }}>{st.el}</div>
          </AbsoluteFill>
        );
      })}
      <HiddenLetter letter="ق" at={at(28.4)} x={900} y={560} />
      {STEPS.map((st, i) => (
        <Sfx key={i} name={i === STEPS.length - 1 ? "reveal" : "wipe"} at={at(st.t)} volume={0.45} />
      ))}
    </Frame>
  );
};
