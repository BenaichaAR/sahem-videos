import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { fonts, formats, surfaces, SurfaceName } from "../brand/theme";

// Base of every scene: brand surface, RTL, Arabic font, safe area.
export const Frame: React.FC<{
  children: React.ReactNode;
  surface?: SurfaceName;
  /** Lay children inside the safe area (default true). */
  safe?: boolean;
}> = ({ children, surface = "paper", safe = true }) => {
  const { width, height } = useVideoConfig();
  const s = surfaces[surface];
  const f = height > width ? formats.vertical : formats.wide;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: s.bg,
        color: s.text,
        fontFamily: fonts.arabic,
        direction: "rtl",
      }}
    >
      <AbsoluteFill
        style={
          safe
            ? {
                top: f.safe.top,
                bottom: f.safe.bottom,
                left: f.safe.side,
                right: f.safe.side,
              }
            : undefined
        }
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
