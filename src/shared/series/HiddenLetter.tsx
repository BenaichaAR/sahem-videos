import React from "react";
import { useCurrentFrame } from "remotion";
import { fonts, surfaces, SurfaceName } from "../../brand/theme";

// The hidden letter of the series game: a small Signal letter that shows
// for a few frames only. Viewers collect one per episode.
export const HiddenLetter: React.FC<{
  letter: string;
  at: number;
  frames?: number;
  x: number;
  y: number;
  size?: number;
  surface?: SurfaceName;
}> = ({ letter, at, frames = 10, x, y, size = 64, surface = "ink" }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= at + frames) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: fonts.arabic,
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1,
        color: surfaces[surface].accent,
      }}
    >
      {letter}
    </div>
  );
};
