import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «غداً… يريد شعاراً… يفهمه العربيّ والأجنبيّ… بدون قراءة.»
// One symbol in the middle, a «؟» and a «?» on each side.
const at = local(29.3);

export const S6Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const tag = prog(frame, at(29.59), motion.frames.slow);
  const card = prog(frame, at(29.9), motion.frames.slow);
  const sym = prog(frame, at(32.17), motion.frames.slow);
  const qa = prog(frame, at(32.9), motion.frames.slow);
  const ql = prog(frame, at(33.3), motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 460, alignItems: "center", gap: 60 }}>
        <div style={{ ...up(tag), display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: type.h1.size, fontWeight: 600 }}>غداً…</div>
        </div>
        <div style={up(card)}>
          <VoiceNote src={staticFile(`voice/${ID}/client.mp3`)} playAt={99999} label="رسالة جديدة · العميل المستحيل" width={700} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 70, direction: "ltr", marginTop: 20 }}>
          <div style={{ ...up(ql), fontFamily: fonts.latin, fontSize: 120, fontWeight: 600, color: s.muted }}>?</div>
          <div
            style={{
              width: 230,
              height: 230,
              borderRadius: "50%",
              border: `6px solid ${s.text}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: sym,
              transform: `scale(${0.8 + 0.2 * sym})`,
            }}
          >
            <svg width={120} height={120} viewBox="0 0 100 100" fill="none" stroke={s.text} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 50 H80 M58 28 L80 50 L58 72" />
            </svg>
          </div>
          <div style={{ ...up(qa), fontFamily: fonts.arabic, fontSize: 120, fontWeight: 600, color: s.accent }}>؟</div>
        </div>
      </AbsoluteFill>
      <Sfx name="tap" at={at(29.9)} volume={0.6} />
      <Sfx name="pop" at={at(32.17)} volume={0.7} />
      <Sfx name="tick" at={at(32.9)} volume={0.5} />
      <Sfx name="tick" at={at(33.3)} volume={0.5} />
    </Frame>
  );
};
