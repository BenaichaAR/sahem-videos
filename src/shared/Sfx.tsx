import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

export type SfxName = "pop" | "draw" | "hit" | "wipe" | "rise" | "reveal" | "tap" | "tick" | "cut";

// One brand sound effect (public/sfx) at a frame. `len` trims with a short fade-out.
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number; len?: number }> = ({
  name,
  at,
  volume = 0.6,
  len,
}) => (
  <Sequence from={at} name={`sfx ${name}`} layout="none">
    <Audio
      src={staticFile(`sfx/sahem_sfx_${name}.wav`)}
      volume={(f) => (len ? volume * Math.max(0, Math.min(1, (len - f) / 6)) : volume)}
    />
  </Sequence>
);
