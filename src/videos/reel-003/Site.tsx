import React from "react";
import { colors, surfaces } from "../../brand/theme";

// A café website made of shapes only — not one letter in it.
const s = surfaces.ink;

export const Glyph: React.FC<{ kind: "cup" | "pin" | "clock" | "arrow" | "check"; size: number; color?: string; draw?: number; t?: number }> = ({
  kind,
  size,
  color = s.text,
  draw = 1,
  t = 0,
}) => {
  const dash = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      {kind === "cup" && (
        <>
          <path d="M18 40 H72 L66 84 H24 Z M72 50 C90 50 90 72 70 72" {...dash} />
          <path d="M36 30 c-6 -8 6 -12 0 -20 M54 30 c-6 -8 6 -12 0 -20" opacity={draw} />
        </>
      )}
      {kind === "pin" && (
        <>
          <path d="M50 90 C30 64 22 52 22 38 A28 28 0 0 1 78 38 C78 52 70 64 50 90 Z" {...dash} />
          <circle cx={50} cy={38} r={9} opacity={draw} />
        </>
      )}
      {kind === "clock" && (
        <>
          <circle cx={50} cy={50} r={36} {...dash} />
          <path d={`M50 50 L${50 + 22 * Math.sin(t)} ${50 - 22 * Math.cos(t)}`} opacity={draw} />
          <path d={`M50 50 L${50 + 14 * Math.sin(t / 12 + 2)} ${50 - 14 * Math.cos(t / 12 + 2)}`} opacity={draw} />
        </>
      )}
      {kind === "arrow" && <path d="M20 50 H78 M58 30 L78 50 L58 70" />}
      {kind === "check" && <path d="M22 52 L42 72 L80 32" {...dash} />}
    </svg>
  );
};

/** Mouse pointer (an object, drawn as a simple arrow shape). */
export const Pointer: React.FC<{ x: number; y: number; press?: number }> = ({ x, y, press = 0 }) => (
  <svg
    width={70}
    height={90}
    viewBox="0 0 70 90"
    style={{ position: "absolute", left: x, top: y, transform: `scale(${1 - press * 0.12})`, transformOrigin: "0 0" }}
  >
    <path d="M4 4 L4 70 L22 54 L34 84 L48 78 L36 49 L60 49 Z" fill={s.text} stroke={s.bg} strokeWidth={5} strokeLinejoin="round" />
  </svg>
);

/** Browser window frame. */
export const Browser: React.FC<{ width: number; height: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  width,
  height,
  children,
  style,
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 32,
      border: `3px solid ${s.line}`,
      background: colors.ink800,
      overflow: "hidden",
      direction: "ltr",
      position: "relative",
      ...style,
    }}
  >
    <div style={{ height: 56, borderBottom: `2px solid ${s.line}`, display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: i === 0 ? s.accent : s.line }} />
      ))}
    </div>
    {children}
  </div>
);

/** The café site content. Each piece has its own progress 0..1. */
export const CafeSite: React.FC<{
  hero: number;
  pin: number;
  clock: number;
  button: number;
  press?: number;
  t: number;
  width: number;
  gap?: number;
}> = ({ hero, pin, clock, button, press = 0, t, width, gap = 28 }) => {
  const inner = width - 64;
  const up = (p: number) => ({ opacity: p, transform: `translateY(${(1 - p) * 30}px)` });
  const tile = (p: number, child: React.ReactNode) => (
    <div
      style={{
        ...up(p),
        flex: 1,
        height: 170,
        borderRadius: 22,
        border: `2px solid ${s.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {child}
    </div>
  );
  return (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap }}>
      <div
        style={{
          ...up(hero),
          width: inner,
          height: 300,
          borderRadius: 26,
          background: colors.graphite700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Glyph kind="cup" size={210} draw={hero} />
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {tile(pin, <Glyph kind="pin" size={110} draw={pin} />)}
        {tile(clock, <Glyph kind="clock" size={110} draw={clock} t={t} />)}
      </div>
      <div
        style={{
          ...up(button),
          height: 110,
          borderRadius: 60,
          background: s.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${(1 - button) * 30}px) scale(${1 - press * 0.05})`,
        }}
      >
        <Glyph kind="arrow" size={70} color={s.bg} />
      </div>
    </div>
  );
};
