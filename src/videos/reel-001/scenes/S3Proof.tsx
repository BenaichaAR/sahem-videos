import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts, motion, surfaces, type } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local } from "../timing";

// «أنت تعرف أصواتاً كثيرة من أوّل نغمة. صوت تشغيل جهاز… صوت إشعار… هذه شعارات، لكن بالأُذُن.»
const at = local(7.3);
const s = surfaces.ink;

// Simple object icons (inanimate only), 64px, stroke style.
const Icon: React.FC<{ kind: "power" | "bell" | "speaker" }> = ({ kind }) => (
  <svg width={64} height={64} viewBox="0 0 64 64" fill="none" stroke={s.text} strokeWidth={5} strokeLinecap="round">
    {kind === "power" && (
      <>
        <path d="M20 16A22 22 0 1 0 44 16" />
        <path d="M32 8V32" />
      </>
    )}
    {kind === "bell" && (
      <>
        <path d="M16 44V28A16 16 0 0 1 48 28V44L52 48H12Z" strokeLinejoin="round" />
        <path d="M27 54A5 5 0 0 0 37 54" />
      </>
    )}
    {kind === "speaker" && (
      <>
        <path d="M10 26H20L34 14V50L20 38H10Z" strokeLinejoin="round" />
        <path d="M42 24A11 11 0 0 1 42 40" />
        <path d="M48 16A22 22 0 0 1 48 48" />
      </>
    )}
  </svg>
);

const SoundCard: React.FC<{ kind: "power" | "bell" | "speaker"; label: string; from: number; seed: number }> = ({
  kind,
  label,
  from,
  seed,
}) => {
  const frame = useCurrentFrame();
  const t = prog(frame, from, motion.frames.slow);
  const live = frame >= from && frame < from + 50;
  return (
    <div
      style={{
        width: 820,
        height: 150,
        borderRadius: 40,
        background: colors.ink800,
        border: `2px solid ${s.line}`,
        display: "flex",
        alignItems: "center",
        gap: 34,
        padding: "0 40px",
        opacity: t,
        transform: `translateX(${(1 - t) * 60}px)`,
      }}
    >
      <Icon kind={kind} />
      <div style={{ fontSize: 46, fontWeight: 500, flex: 1 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, direction: "ltr" }}>
        {Array.from({ length: 12 }, (_, i) => {
          const base = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7 + seed));
          const wave = live ? 0.55 + 0.45 * Math.sin(frame * 0.6 + i * 0.9 + seed) : 0.4;
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: 12 + 60 * base * wave,
                borderRadius: 4,
                background: live ? s.accent : s.line,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const S3Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const h1 = prog(frame, 6, motion.frames.slow);
  const h2 = prog(frame, at(15.62), motion.frames.slow); // «هذه شعارات»
  const h3 = prog(frame, at(17.46), motion.frames.slow); // «لكن بالأُذُن»
  const cardsOut = prog(frame, at(17.46), motion.frames.slower);
  const head = (t: number, out: number, children: React.ReactNode) => (
    <div
      style={{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        opacity: t * (1 - out),
        transform: `translateY(${(1 - t) * motion.move.lg - out * motion.move.lg}px)`,
      }}
    >
      {children}
    </div>
  );

  return (
    <Frame surface="ink" safe={false}>
      <AbsoluteFill style={{ top: 470, height: 200 }}>
        {head(h1, h2, <div style={{ fontSize: type.display.size, fontWeight: 600 }}>من أوّل نغمة</div>)}
        {head(
          h2,
          h3,
          <div style={{ fontSize: type.display.size, fontWeight: 600 }}>
            هذه <span style={{ color: s.accent }}>شعارات</span>
          </div>,
        )}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          top: 720,
          alignItems: "center",
          gap: 34,
          opacity: 1 - cardsOut,
          transform: `scale(${1 - cardsOut * 0.06})`,
        }}
      >
        <SoundCard kind="power" label="تشغيل جهاز" from={at(11.58)} seed={1} />
        <SoundCard kind="bell" label="إشعار" from={at(13.82)} seed={2.4} />
        <SoundCard kind="speaker" label="إعلان" from={at(15.3)} seed={4.1} />
      </AbsoluteFill>

      {/* «لكن بالأُذُن» */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -40 }}>
        <div
          style={{
            textAlign: "center",
            opacity: h3,
            transform: `translateY(${(1 - h3) * motion.move.lg}px)`,
            fontFamily: fonts.arabic,
          }}
        >
          <div style={{ fontSize: type.h1.size, color: s.muted, fontWeight: 500, marginBottom: 40 }}>لكن…</div>
          <div style={{ fontSize: 210, fontWeight: 600, lineHeight: 1.5, color: s.accent }}>بالأُذُن</div>
        </div>
      </AbsoluteFill>

      <Sfx name="tap" at={at(11.58)} volume={0.5} />
      <Sfx name="tap" at={at(13.82)} volume={0.5} />
      <Sfx name="tap" at={at(15.3)} volume={0.5} />
      <Sfx name="wipe" at={at(17.46)} volume={0.35} />
    </Frame>
  );
};
