import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { VoiceNote } from "../../../shared/series/VoiceNote";
import { ID, local } from "../timing";

// «غداً… يريد شعاراً… يكبر مع مشروعه.» — the same mark in three growing sizes.
const at = local(43.3);
const SIZES = [70, 130, 220];

export const S7Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const up = (t: number) => ({ opacity: t, transform: `translateY(${(1 - t) * motion.move.lg}px)` });
  const tag = prog(frame, at(43.52), motion.frames.slow);
  const card = prog(frame, at(43.8), motion.frames.slow);
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
        <div style={{ display: "flex", alignItems: "flex-end", gap: 70, direction: "ltr", marginTop: 20 }}>
          {SIZES.map((w, i) => {
            const t = prog(frame, at(45.4) + i * 8, motion.frames.slow);
            return (
              <div key={w} style={{ opacity: t, transform: `scale(${0.6 + 0.4 * t})`, transformOrigin: "50% 100%" }}>
                <RouteMark width={w} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Sfx name="tap" at={at(43.8)} volume={0.6} />
      {SIZES.map((w, i) => (
        <Sfx key={w} name="pop" at={at(45.4) + i * 8} volume={0.4 + i * 0.15} />
      ))}
    </Frame>
  );
};
