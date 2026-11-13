import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { BrowserTab, BusinessCard, PhoneHome, ShopFront } from "../Places";

// Silent: one fast pull-back through every size, ending on a building billboard.
const STEP = 16;
const PLACES = [<BrowserTab key="t" />, <PhoneHome key="p" />, <BusinessCard key="c" />, <ShopFront key="s" />];
const FINAL = PLACES.length * STEP; // 64
const HIT = FINAL + 14;

export const S5Result: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const i = Math.min(PLACES.length - 1, Math.floor(frame / STEP));
  const f = frame - i * STEP;
  const scale = interpolate(f, [0, STEP], [2.4, 0.7], { easing: motion.ease, extrapolateRight: "clamp" });
  const building = prog(frame, FINAL, 20);
  return (
    <Frame surface="ink" safe={false}>
      {frame < FINAL && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${scale})`, opacity: interpolate(f, [0, 3, STEP - 3, STEP], [0, 1, 1, 0]) }}>{PLACES[i]}</div>
        </AbsoluteFill>
      )}
      {frame >= FINAL && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 380, opacity: building }}>
          {/* a building with a billboard on its roof */}
          <div style={{ transform: `scale(${1.25 - 0.25 * building})`, transformOrigin: "50% 100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ShopFront big />
            <div style={{ display: "flex", gap: 300 }}>
              <div style={{ width: 16, height: 70, background: s.line }} />
              <div style={{ width: 16, height: 70, background: s.line }} />
            </div>
            <div
              style={{
                width: 760,
                height: 620,
                background: colors.graphite700,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 26,
                padding: 40,
              }}
            >
              {Array.from({ length: 12 }, (_, k) => (
                <div key={k} style={{ background: colors.ink900, border: `2px solid ${s.line}` }} />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}
      {PLACES.map((_, k) => (
        <Sfx key={k} name="wipe" at={k * STEP} volume={0.35} />
      ))}
      <Sfx name="rise" at={FINAL} volume={0.5} />
      <Sfx name="hit" at={HIT} volume={0.9} />
    </Frame>
  );
};
