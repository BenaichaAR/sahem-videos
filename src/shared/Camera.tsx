import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { motion } from "../brand/theme";

// Smooth camera move: zoom + pan on the brand curve (no bounce).
// x / y are the pan in px at the end of the move (positive = toward right / down).
export const Camera: React.FC<{
  children: React.ReactNode;
  zoomFrom?: number;
  zoomTo?: number;
  x?: number;
  y?: number;
  startFrame?: number;
  /** Frames for the move. Defaults to the whole scene (slow drift). */
  duration?: number;
}> = ({ children, zoomFrom = 1, zoomTo = 1.08, x = 0, y = 0, startFrame = 0, duration }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const len = duration ?? Math.max(1, durationInFrames - startFrame);
  const p = interpolate(frame, [startFrame, startFrame + len], [0, 1], {
    easing: motion.ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [zoomFrom, zoomTo]);
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${-x * p}px, ${-y * p}px)`,
        transformOrigin: "50% 50%",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
