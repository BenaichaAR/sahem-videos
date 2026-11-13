import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { Street, STREET_W } from "../Things";
import { local, SCENES } from "../timing";

// «لونٌ لا يملكه أحد؟ انظر إلى أيّ شارع… المحلّات تتشابه… حتّى تختفي.»
const at = local(0);
const s = surfaces.ink;

export const S2Street: React.FC = () => {
  const frame = useCurrentFrame();
  const len = SCENES.street[1] - SCENES.street[0];
  const street = prog(frame, at(2.94), motion.frames.slow);
  // RTL: the street slides from left to right, as if walking along it.
  const x = interpolate(frame, [0, len], [-(STREET_W - 1080) + 200, -200]);
  const same = prog(frame, at(5.09), at(6.63) - at(5.09));
  const vanish = prog(frame, at(7.18), motion.frames.slower);
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: 0, node: <>لونٌ لا يملكه أحد؟</> },
          { at: at(2.94), node: <>انظر إلى أيّ شارع…</> },
          { at: at(5.09), node: <>المحلّات تتشابه…</> },
          { at: at(7.18), node: <>…حتّى <span style={{ color: s.accent }}>تختفي</span>.</> },
        ]}
        size={96}
      />
      <AbsoluteFill
        style={{
          top: 720,
          alignItems: "flex-start",
          direction: "ltr",
          opacity: street * (1 - vanish * 0.85),
          transform: `translateX(${x}px) translateY(${(1 - street) * motion.move.lg}px)`,
          filter: `blur(${vanish * 8}px)`,
        }}
      >
        <Street same={same} />
      </AbsoluteFill>
      <Sfx name="wipe" at={at(2.94)} volume={0.4} />
      <Sfx name="cut" at={at(7.18)} volume={0.5} />
    </Frame>
  );
};
