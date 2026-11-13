import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Camera } from "../../../shared/Camera";
import { Frame } from "../../../shared/Frame";
import { prog, sec } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { CLIENT_AT, ID, SCENES } from "../timing";

// Hook: a voice message from an unknown client. «أريد شعاراً… يُسمَع».
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const card = prog(frame, 2, motion.frames.slow);
  const wordAt = CLIENT_AT + sec(2.55); // «يُسمَع»
  const word = prog(frame, wordAt, motion.frames.slow);
  return (
    <Frame surface="ink" safe={false}>
      <Camera zoomFrom={1} zoomTo={1.06} duration={SCENES.hook[1]}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 70, top: -60 }}>
          <div style={{ opacity: card, transform: `translateY(${(1 - card) * motion.move.lg}px)` }}>
            <VoiceNote src={staticFile(`voice/${ID}/client.mp3`)} playAt={CLIENT_AT} label="رسالة صوتية · عميل مجهول" />
          </div>
          <div style={{ height: 230, overflow: "hidden" }}>
            <div
              style={{
                fontFamily: fonts.arabic,
                fontSize: 200,
                fontWeight: 600,
                lineHeight: 1.15,
                color: s.accent,
                transform: `translateY(${(1 - word) * 100}%)`,
              }}
            >
              يُسمَع
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
      <Sfx name="tap" at={2} volume={0.6} />
      <Sfx name="reveal" at={wordAt - 2} volume={0.45} />
    </Frame>
  );
};
