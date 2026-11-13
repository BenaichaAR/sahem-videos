import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { CafeSite, Glyph } from "../Site";

// Silent scene: the site on a phone. It scrolls, a tap on the button, a check.
const T = { phone: 0, scroll: [14, 54] as const, tap: 66, check: 70 };
const s = surfaces.ink;

export const S4Result: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = prog(frame, T.phone, motion.frames.slow);
  const scroll = interpolate(frame, T.scroll, [0, 1], { easing: motion.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const press = frame >= T.tap ? 1 - prog(frame, T.tap, 8) : 0;
  const tapDot = frame >= T.tap - 6 && frame < T.tap + 10 ? 1 : 0;
  const check = prog(frame, T.check, motion.frames.slow);
  const W = 500;
  const H = 1000;
  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40 }}>
        <div
          style={{
            width: W,
            height: H,
            borderRadius: 70,
            border: `10px solid ${colors.graphite700}`,
            background: colors.ink800,
            overflow: "hidden",
            position: "relative",
            direction: "ltr",
            opacity: phone,
            transform: `translateY(${(1 - phone) * 60}px)`,
          }}
        >
          <div style={{ position: "absolute", top: 18, left: W / 2 - 60, width: 100, height: 26, borderRadius: 13, background: colors.ink900 }} />
          {/* Scrolling page: a tall version of the site */}
          <div style={{ transform: `translateY(${60 - scroll * 300}px)` }}>
            <CafeSite width={W - 20} hero={1} pin={1} clock={1} button={1} press={press} t={frame * 0.15} gap={34} />
            <div style={{ padding: "0 32px", display: "flex", flexDirection: "column", gap: 34 }}>
              <div style={{ height: 260, borderRadius: 26, background: colors.graphite700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Glyph kind="cup" size={150} />
              </div>
              <div style={{ height: 110, borderRadius: 60, background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - press * 0.05})` }}>
                <Glyph kind="arrow" size={70} color={s.bg} />
              </div>
            </div>
          </div>
          {/* Tap */}
          {tapDot > 0 && (
            <div
              style={{
                position: "absolute",
                left: W / 2 - 45,
                top: 742 - 45,
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: `${s.text}55`,
                transform: `scale(${1 - press * 0.3})`,
              }}
            />
          )}
          {/* Check */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `${colors.ink900}e6`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: check,
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: s.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${0.6 + 0.4 * check})`,
              }}
            >
              <Glyph kind="check" size={130} color={s.bg} draw={prog(frame, T.check + 4, motion.frames.slow)} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Sfx name="wipe" at={T.scroll[0]} volume={0.45} />
      <Sfx name="tap" at={T.tap} volume={0.8} />
      <Sfx name="reveal" at={T.check} volume={0.6} />
      <Sfx name="hit" at={T.check + 6} volume={0.8} />
    </Frame>
  );
};
