import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { colors, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «غداً… يريد موقعاً… بدون أيّ كلمة.» — an empty website frame, not one word in it.
const at = local(31.1);

export const S5Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const tag = prog(frame, at(31.44), motion.frames.slow);
  const card = prog(frame, at(31.7), motion.frames.slow);
  const site = prog(frame, at(32.7), motion.frames.slower);
  const blocks = [0, 1, 2, 3].map((i) => prog(frame, at(34.21) + i * 3, motion.frames.slow));
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const W = 700;
  const H = 480;

  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 440, alignItems: "center", gap: 40 }}>
        <div style={{ ...up(tag), display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: type.h1.size, fontWeight: 600 }}>غداً…</div>
        </div>
        <div style={up(card)}>
          <VoiceNote src={staticFile(`voice/${ID}/client.mp3`)} playAt={99999} label="رسالة جديدة · العميل المستحيل" width={700} />
        </div>
        {/* Empty website: browser frame + blocks, no text at all */}
        <div
          style={{
            ...up(site),
            width: W,
            height: H,
            borderRadius: 32,
            border: `3px solid ${s.line}`,
            background: colors.ink800,
            overflow: "hidden",
            direction: "ltr",
          }}
        >
          <div style={{ height: 56, borderBottom: `2px solid ${s.line}`, display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: i === 0 ? s.accent : s.line }} />
            ))}
          </div>
          <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ height: 150, borderRadius: 18, background: s.line, opacity: blocks[0] * 0.6 }} />
            <div style={{ display: "flex", gap: 24 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ flex: 1, height: 160, borderRadius: 18, border: `2px solid ${s.line}`, opacity: blocks[i] }} />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Sfx name="tap" at={at(31.7)} volume={0.6} />
      <Sfx name="wipe" at={at(34.21)} volume={0.4} />
    </Frame>
  );
};
