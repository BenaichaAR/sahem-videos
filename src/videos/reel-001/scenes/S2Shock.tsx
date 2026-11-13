import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../../brand/theme";
import { Camera } from "../../../shared/Camera";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { local, SCENES } from "../timing";

// «شعارٌ يُسمَع؟ يعني تسمعه وأنت مغمض عينيك… وتعرف أنّه هو.»
const at = local(0);

export const S2Shock: React.FC = () => {
  const frame = useCurrentFrame();
  const s = surfaces.ink;
  const t1 = prog(frame, 0, motion.frames.slow);
  const under = prog(frame, 8, motion.frames.slower);
  const dim = prog(frame, at(1.8), motion.frames.slower); // «يعني تسمعه…»
  const t2 = prog(frame, at(2.4), motion.frames.slow);
  const know = prog(frame, at(4.68), motion.frames.slow); // «وتعرف أنّه هو»
  const rings = [0, 8, 16].map((d) => prog(frame, at(4.68) + d, 40));

  return (
    <Frame surface="ink" safe={false}>
      <Camera zoomFrom={1.04} zoomTo={1} duration={SCENES.shock[1] - SCENES.shock[0]}>
        {/* Sound rings: you know it without seeing it */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          {rings.map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 200 + r * 700,
                height: 200 + r * 700,
                borderRadius: "50%",
                border: `3px solid ${s.line}`,
                opacity: r > 0 ? 1 - r : 0,
              }}
            />
          ))}
        </AbsoluteFill>

        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: -80 }}>
          {/* «مستحيل؟» → fades back when the screen goes dark */}
          <div
            style={{
              position: "absolute",
              opacity: t1 * (1 - dim),
              transform: `scale(${1 - dim * 0.1})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 190, fontWeight: 600, lineHeight: 1.2, transform: `translateY(${(1 - t1) * 30}px)` }}>
              مستحيل؟
            </div>
            <div style={{ height: 14, width: 560, display: "flex", justifyContent: "flex-start" }}>
              <div style={{ height: 14, width: `${under * 100}%`, background: s.accent }} />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              textAlign: "center",
              opacity: t2,
              transform: `translateY(${(1 - t2) * motion.move.lg}px)`,
            }}
          >
            <div style={{ fontSize: type.h1.size, fontWeight: 500, color: s.muted, lineHeight: 1.5 }}>بدون أن تراه…</div>
            <div
              style={{
                fontSize: 130,
                fontWeight: 600,
                lineHeight: 1.3,
                opacity: know,
                transform: `translateY(${(1 - know) * motion.move.lg}px)`,
                fontFamily: fonts.arabic,
              }}
            >
              <span style={{ color: s.accent }}>تعرفه</span>.
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
      <Sfx name="wipe" at={0} volume={0.35} />
      <Sfx name="rise" at={at(4.68)} volume={0.4} />
    </Frame>
  );
};
