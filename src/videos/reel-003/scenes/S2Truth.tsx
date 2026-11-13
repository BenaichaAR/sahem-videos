import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { Browser } from "../Site";
import { local } from "../timing";

// «موقعٌ بدون كلمات؟ الحقيقة… الزائر لا يقرأ أصلاً. يمرّ بعينه… ثلاث ثوانٍ… ويقرّر.»
const at = local(0);
const s = surfaces.ink;
// Paragraph lines (widths in %), as a text-heavy page.
const LINES = [92, 100, 96, 70, 0, 100, 88, 97, 60, 0, 94, 100, 82, 99, 45];

export const S2Truth: React.FC = () => {
  const frame = useCurrentFrame();
  const page = prog(frame, 4, motion.frames.slow);
  const scan = prog(frame, at(6.98), at(8.18) - at(6.98));
  const timer = prog(frame, at(8.61), at(10.2) - at(8.61));
  const fade = prog(frame, at(10.2), motion.frames.slow);
  const count = Math.max(1, 3 - Math.floor(timer * 3));
  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: 0, node: <>موقعٌ بدون كلمات؟</> },
          { at: at(2.56), node: <>الحقيقة…</> },
          { at: at(4.5), node: <>الزائر <span style={{ color: s.accent }}>لا يقرأ</span>.</> },
          { at: at(6.98), node: <>يمرّ بعينه…</> },
          { at: at(8.61), node: <><span style={{ fontFamily: fonts.latin, color: s.accent }}>3</span> ثوانٍ…</> },
          { at: at(10.2), node: <>…ويقرّر.</> },
        ]}
      />
      <AbsoluteFill style={{ top: 680, alignItems: "center" }}>
        <Browser width={760} height={700} style={{ opacity: page, transform: `translateY(${(1 - page) * motion.move.lg}px)` }}>
          <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-end" }}>
            {LINES.map((w, i) =>
              w === 0 ? (
                <div key={i} style={{ height: 10 }} />
              ) : (
                <div
                  key={i}
                  style={{
                    width: `${w}%`,
                    height: 16,
                    borderRadius: 8,
                    background: s.line,
                    opacity: 1 - fade * 0.85,
                  }}
                />
              ),
            )}
          </div>
          {/* The eye skims: a band sweeps down the page */}
          {scan > 0 && scan < 1 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 56 + scan * 600,
                height: 60,
                background: `linear-gradient(transparent, ${s.accent}33, transparent)`,
              }}
            />
          )}
        </Browser>
      </AbsoluteFill>

      {/* 3-second timer */}
      {timer > 0 && (
        <AbsoluteFill style={{ top: 680, height: 700, alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 200, height: 200, opacity: 1 - fade }}>
            <svg width={200} height={200} viewBox="0 0 200 200" style={{ position: "absolute" }}>
              <circle cx={100} cy={100} r={R + 20} fill={s.bg} />
              <circle cx={100} cy={100} r={R} fill="none" stroke={s.line} strokeWidth={10} />
              <circle
                cx={100}
                cy={100}
                r={R}
                fill="none"
                stroke={s.accent}
                strokeWidth={10}
                strokeDasharray={C}
                strokeDashoffset={C * timer}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.latin,
                fontSize: 84,
                fontWeight: 600,
              }}
            >
              {count}
            </div>
          </div>
        </AbsoluteFill>
      )}

      <Sfx name="wipe" at={4} volume={0.35} />
      <Sfx name="draw" at={at(6.98)} volume={0.35} len={at(8.18) - at(6.98)} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="tick" at={at(8.61) + Math.round((i * (at(10.2) - at(8.61))) / 3)} volume={0.6} />
      ))}
      <Sfx name="cut" at={at(10.2)} volume={0.6} />
    </Frame>
  );
};
