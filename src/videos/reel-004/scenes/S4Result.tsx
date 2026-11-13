import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Thing, ThingArt } from "../Things";
import { BOX, DOT } from "./S3Secret";

// Silent: objects flash by fast under the same dot, then only the dot remains.
const ORDER: Thing[] = ["shop", "cup", "bag", "door", "phone", "cup", "bag", "shop"];
const STEP = 8;
const ALONE = ORDER.length * STEP + 6; // 70

export const S4Result: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const i = Math.floor(frame / STEP);
  const kind = frame < ALONE - 6 ? ORDER[Math.min(i, ORDER.length - 1)] : null;
  const toCenter = prog(frame, ALONE, 18);
  const grow = 1 + 1.5 * prog(frame, ALONE + 4, 20);
  const x = DOT.x + (540 - DOT.x) * toCenter;
  const y = DOT.y + (960 - DOT.y) * toCenter;
  return (
    <Frame surface="ink" safe={false}>
      {kind && (
        <div style={{ position: "absolute", left: BOX.x, top: BOX.y }}>
          <ThingArt kind={kind} size={BOX.size} />
        </div>
      )}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: x - 24,
            top: y - 24,
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: s.accent,
            transform: `scale(${grow})`,
          }}
        />
      </AbsoluteFill>
      {ORDER.map((_, k) => (
        <Sfx key={k} name="tick" at={k * STEP} volume={0.55} />
      ))}
      <Sfx name="pop" at={ALONE} volume={0.9} />
      <Sfx name="reveal" at={ALONE + 4} volume={0.5} />
    </Frame>
  );
};
