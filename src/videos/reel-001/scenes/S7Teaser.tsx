import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «غداً… يريد شعاراً بخطٍّ واحد، بدون رفع القلم.»
const at = local(37.8);
// One continuous stroke across the frame — a preview of episode 2.
const ONE_LINE =
  "M1000 1120 C860 1120 820 1260 700 1260 C560 1260 560 1060 440 1060 C320 1060 340 1280 220 1280 C140 1280 100 1200 80 1160";

export const S7Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const tag = prog(frame, 0, motion.frames.slow);
  const card = prog(frame, 6, motion.frames.slow);
  const line = prog(frame, at(39.74), at(43.74) - at(39.74));
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 470, alignItems: "center", gap: 50 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: tag,
            transform: `translateY(${(1 - tag) * motion.move.md}px)`,
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: type.h1.size, fontWeight: 600 }}>غداً…</div>
        </div>
        <div style={{ opacity: card, transform: `translateY(${(1 - card) * motion.move.lg}px)` }}>
          <VoiceNote src={staticFile(`voice/${ID}/client.mp3`)} playAt={99999} label="رسالة جديدة · العميل المستحيل" />
        </div>
      </AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path
          d={ONE_LINE}
          fill="none"
          stroke={s.text}
          strokeWidth={10}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - line}
        />
      </svg>
      <Sfx name="tap" at={6} volume={0.6} />
      <Sfx name="draw" at={at(39.74)} volume={0.5} len={at(43.74) - at(39.74)} />
    </Frame>
  );
};
