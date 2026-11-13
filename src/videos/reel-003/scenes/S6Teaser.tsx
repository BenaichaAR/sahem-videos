import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { colors, fonts, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «غداً… يريد لوناً… لا يملكه أحد في مدينته.» — a row of swatches, one is still a question.
const at = local(34.0);
const SWATCHES = [colors.graphite700, colors.stone400, colors.mist300, colors.paper200];

export const S6Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const tag = prog(frame, at(34.21), motion.frames.slow);
  const card = prog(frame, at(34.5), motion.frames.slow);
  const sw = [0, 1, 2, 3, 4].map((i) => prog(frame, at(36.68) + i * 3, motion.frames.slow));
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 460, alignItems: "center", gap: 50 }}>
        <div style={{ ...up(tag), display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.accent }} />
          <div style={{ fontSize: type.h1.size, fontWeight: 600 }}>غداً…</div>
        </div>
        <div style={up(card)}>
          <VoiceNote src={staticFile(`voice/${ID}/client.mp3`)} playAt={99999} label="رسالة جديدة · العميل المستحيل" width={700} />
        </div>
        <div style={{ display: "flex", gap: 22, marginTop: 30, direction: "ltr" }}>
          {SWATCHES.map((c, i) => (
            <div key={i} style={{ ...up(sw[i]), width: 120, height: 220, borderRadius: 24, background: c }} />
          ))}
          <div
            style={{
              ...up(sw[4]),
              width: 120,
              height: 220,
              borderRadius: 24,
              border: `4px dashed ${s.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.arabic,
              fontSize: 80,
              fontWeight: 600,
              color: s.accent,
            }}
          >
            ؟
          </div>
        </div>
      </AbsoluteFill>
      <Sfx name="tap" at={at(34.5)} volume={0.6} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="tick" at={at(36.68) + i * 3} volume={0.4} />
      ))}
      <Sfx name="pop" at={at(36.68) + 12} volume={0.7} />
    </Frame>
  );
};
