import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { colors, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «سبعة طلبات مستحيلة… ولم يكن أيٌّ منها مستحيلاً. والآن… هل عرفت من هو العميل المستحيل؟ إنّه… أنت.»
const at = local(7.4);
const s = surfaces.ink;
const EPISODES = ["يُسمَع", "خطّ واحد", "بلا كلمات", "لون واحد", "بلا قراءة", "يكبر", "7 ثوانٍ"];

export const S4Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const cardsOut = prog(frame, at(14.99), motion.frames.slow);
  const note = prog(frame, at(16.5), motion.frames.slow);
  const you = frame >= at(21.33);
  const youT = prog(frame, at(21.33), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(7.78), node: <>سبعة طلبات مستحيلة…</> },
          { at: at(11.14), node: <>ولا واحد <span style={{ color: s.accent }}>مستحيل</span>.</> },
          { at: at(14.99), node: <>والآن…</> },
          { at: at(16.5), node: <>من هو العميل؟</> },
          { at: at(19.91), node: <>إنّه…</> },
        ]}
        size={96}
      />

      {/* The seven requests, each one checked */}
      <AbsoluteFill
        style={{
          top: 690,
          height: 720,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "flex-start",
          gap: 24,
          padding: "0 70px",
          opacity: 1 - cardsOut,
        }}
      >
        {EPISODES.map((e, i) => {
          const t = prog(frame, at(7.78) + i * 5, motion.frames.slow);
          const ok = prog(frame, at(11.14) + i * 3, motion.frames.base);
          return (
            <div
              key={e}
              style={{
                width: 290,
                height: 150,
                borderRadius: 26,
                background: colors.ink800,
                border: `2px solid ${s.line}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 26px",
                gap: 8,
                opacity: t,
                transform: `translateY(${(1 - t) * motion.move.lg}px)`,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 26, color: s.muted }}>الحلقة {i + 1}</div>
              <div style={{ fontSize: 40, fontWeight: 600 }}>{e}</div>
              <svg
                width={44}
                height={44}
                viewBox="0 0 100 100"
                style={{ position: "absolute", left: 22, top: 22, opacity: ok }}
                fill="none"
                stroke={s.accent}
                strokeWidth={12}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 52 L40 74 L84 28" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ok} />
              </svg>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* The client's voice note — the label changes to «أنت» */}
      <AbsoluteFill style={{ top: 760, alignItems: "center", gap: 70, opacity: note }}>
        <div style={{ transform: `translateY(${(1 - note) * motion.move.lg}px)` }}>
          <VoiceNote
            src={staticFile(`voice/${ID}/client.mp3`)}
            playAt={99999}
            label={you ? "رسالة صوتية · أنت" : "رسالة صوتية · عميل مجهول"}
          />
        </div>
        <div
          style={{
            fontSize: 260,
            fontWeight: 600,
            lineHeight: 1.2,
            color: s.accent,
            opacity: youT,
            transform: `scale(${0.85 + 0.15 * youT})`,
          }}
        >
          أنت.
        </div>
      </AbsoluteFill>

      {EPISODES.map((e, i) => (
        <Sfx key={e} name="tick" at={at(11.14) + i * 3} volume={0.45} />
      ))}
      <Sfx name="tap" at={at(16.5)} volume={0.6} />
      <Sfx name="hit" at={at(21.33)} volume={1} />
    </Frame>
  );
};
