import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../brand/theme";
import { Camera } from "../Camera";
import { Frame } from "../Frame";
import { prog } from "../anim";
import { Sfx } from "../Sfx";
import { VoiceNote } from "./VoiceNote";

// Episode hook: the impossible client's voice message, then the key words of the request.
export const HookScene: React.FC<{
  src: string;
  playAt: number;
  duration: number;
  label?: string;
  big: { text: string; at: number; size?: number };
  sub?: { text: string; at: number };
}> = ({ src, playAt, duration, label = "رسالة صوتية · عميل مجهول", big, sub }) => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const card = prog(frame, 2, motion.frames.slow);
  const b = prog(frame, big.at, motion.frames.slow);
  const u = sub ? prog(frame, sub.at, motion.frames.slow) : 0;
  return (
    <Frame surface="ink" safe={false}>
      <Camera zoomFrom={1} zoomTo={1.06} duration={duration}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 60, top: -40 }}>
          <div style={{ opacity: card, transform: `translateY(${(1 - card) * motion.move.lg}px)` }}>
            <VoiceNote src={src} playAt={playAt} label={label} />
          </div>
          <div style={{ height: (big.size ?? 160) * 1.55, overflow: "hidden" }}>
            <div
              style={{
                fontFamily: fonts.arabic,
                fontSize: big.size ?? 160,
                fontWeight: 600,
                lineHeight: 1.55,
                whiteSpace: "nowrap",
                color: s.accent,
                transform: `translateY(${(1 - b) * 100}%)`,
              }}
            >
              {big.text}
            </div>
          </div>
          {sub && (
            <div
              style={{
                fontSize: type.h1.size,
                fontWeight: 500,
                color: s.text,
                opacity: u,
                transform: `translateY(${(1 - u) * motion.move.lg}px)`,
              }}
            >
              {sub.text}
            </div>
          )}
        </AbsoluteFill>
      </Camera>
      <Sfx name="tap" at={2} volume={0.6} />
      <Sfx name="reveal" at={big.at - 2} volume={0.45} />
      {sub && <Sfx name="rise" at={sub.at} volume={0.35} />}
    </Frame>
  );
};
