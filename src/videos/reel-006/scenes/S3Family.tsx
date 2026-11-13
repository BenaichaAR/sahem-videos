import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { Lockup } from "../../../shared/Lockup";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";

// «الحلّ؟ ليس شعاراً واحداً… بل عائلة. نقطة… رمز… رمزٌ واسم… ثمّ الشعار كاملاً.»
const at = local(11.4);
const s = surfaces.ink;

const ROWS: { level: 0 | 1 | 2 | 3; h: number; label: string; t: number }[] = [
  { level: 0, h: 70, label: "أيقونة", t: 16.42 },
  { level: 1, h: 110, label: "تطبيق", t: 17.42 },
  { level: 2, h: 110, label: "بطاقة", t: 18.34 },
  { level: 3, h: 130, label: "لافتة", t: 19.64 },
];

export const S3Family: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(11.71), node: <>الحلّ؟</> },
          { at: at(12.78), node: <>ليس شعاراً واحداً…</> },
          { at: at(14.6), node: <>بل <span style={{ color: s.accent }}>عائلة</span>.</> },
        ]}
        size={96}
      />
      <AbsoluteFill style={{ top: 680, height: 720, justifyContent: "space-between", padding: "0 90px" }}>
        {ROWS.map((r, i) => {
          const t = prog(frame, at(r.t), motion.frames.slow);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 150,
                borderBottom: i < ROWS.length - 1 ? `2px solid ${s.line}` : "none",
                opacity: t,
                transform: `translateX(${(1 - t) * -40}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                <span style={{ fontFamily: fonts.latin, fontSize: 30, color: s.accent }}>0{i + 1}</span>
                <span style={{ fontSize: 50, fontWeight: 600 }}>{r.label}</span>
              </div>
              <div style={{ transform: `scale(${0.85 + 0.15 * t})`, transformOrigin: "0 50%" }}>
                <Lockup level={r.level} h={r.h} />
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Sfx name="rise" at={at(14.6)} volume={0.45} />
      {ROWS.map((r) => (
        <Sfx key={r.label} name="pop" at={at(r.t)} volume={0.45 + r.level * 0.12} />
      ))}
    </Frame>
  );
};
