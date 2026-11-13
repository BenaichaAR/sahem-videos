import { interpolate } from "remotion";
import { motion } from "../brand/theme";

/** 0..1 progress between two frames on the brand curve (clamped). */
export const prog = (frame: number, from: number, len: number) =>
  interpolate(frame, [from, from + Math.max(1, len)], [0, 1], {
    easing: motion.ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Seconds → frames at 30fps. */
export const sec = (s: number) => Math.round(s * 30);
