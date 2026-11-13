// Sahem Studio — video theme. Single source of every visual value.
// Source: ../../../02-tokens/tokens.css and ../../../05-motion/motion-spec.md
import { Easing } from "remotion";

export const FPS = 30;

export const colors = {
  ink900: "#0e0e10",
  ink800: "#1a1a1d",
  graphite700: "#3a3a40",
  graphite500: "#8e8d88",
  stone400: "#a9a8a3",
  mist300: "#d9d8d3",
  paper200: "#ecebe6",
  paper100: "#f5f4f0",
  white: "#ffffff",
  signal500: "#ff4d1f",
} as const;

// Two surfaces: "paper" (light, default) and "ink" (dark). Signal is the only accent.
export const surfaces = {
  paper: { bg: colors.paper100, text: colors.ink900, muted: colors.graphite700, line: colors.mist300, accent: colors.signal500 },
  ink: { bg: colors.ink900, text: colors.paper100, muted: colors.stone400, line: colors.graphite700, accent: colors.signal500 },
} as const;
export type SurfaceName = keyof typeof surfaces;

export const fonts = {
  arabic: '"Readex Pro", system-ui, sans-serif',
  latin: 'Sora, "Readex Pro", system-ui, sans-serif',
} as const;

// Type scale for a 1080-wide vertical frame (px).
export const type = {
  display: { size: 120, weight: 600, lineHeight: 1.2 },
  h1: { size: 84, weight: 600, lineHeight: 1.21 },
  h2: { size: 60, weight: 500, lineHeight: 1.33 },
  body: { size: 44, weight: 400, lineHeight: 1.6 },
  caption: { size: 56, weight: 600, lineHeight: 1.35 },
  label: { size: 30, weight: 500, lineHeight: 1.4 },
} as const;

// Motion: one master curve, no bounce, no overshoot.
const ms = (v: number) => Math.round((v / 1000) * FPS);
export const motion = {
  ease: Easing.bezier(0.7, 0, 0.2, 1),
  frames: {
    fast: ms(160), // 5
    base: ms(240), // 7
    hit: ms(300), // 9
    slow: ms(400), // 12
    slower: ms(700), // 21
    route: ms(1400), // 42
    staggerSm: ms(60), // 2
    staggerMd: ms(90), // 3
  },
  move: { sm: 8, md: 16, lg: 32 },
  routeStroke: 26, // logo stroke width in its own viewBox
} as const;

// Formats. Reels/stories keep top 250px and bottom 400px clear for the app UI.
export const formats = {
  vertical: { width: 1080, height: 1920, safe: { top: 250, bottom: 400, side: 80 } },
  wide: { width: 1920, height: 1080, safe: { top: 80, bottom: 120, side: 120 } },
} as const;

export const brand = {
  name: "سهم ستوديو",
  nameLatin: "Sahem Studio",
  website: "sahemstudio.com",
  handle: "sahem.studio",
  logo: {
    primary: "brand/logo/symbol-primary.svg",
    reverse: "brand/logo/symbol-reverse.svg",
    monoInk: "brand/logo/symbol-mono-ink.svg",
    monoPaper: "brand/logo/symbol-mono-paper.svg",
  },
} as const;
