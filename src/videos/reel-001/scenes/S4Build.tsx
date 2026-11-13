import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces, type } from "../../../brand/theme";
import { Camera } from "../../../shared/Camera";
import { Frame } from "../../../shared/Frame";
import { RouteMark, ROUTE_MARK } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { local, SCENES } from "../timing";

// «فبنينا الصوت من الشكل نفسه. النقطة… لها صوت. الطريق… له صوت. والوصول… له ضربة.»
const at = local(19.5);
const s = surfaces.ink;

// Mark placement (px) and where its parts land on screen.
const W = 420;
const H = (W * ROUTE_MARK.h) / ROUTE_MARK.w;
const BOX = { left: 540 - W / 2, top: 930 - H / 2 };
const vb = (x: number, y: number) => ({
  x: BOX.left + ((x + 5.6) / 124.3) * W,
  y: BOX.top + ((y - 2) / 150) * H,
});
const DOT = vb(7.4, 139);
const MID = vb(91, 77);
const TIP = vb(118.7, 15);

const T = {
  dot: at(23.18),
  path: at(26.84),
  arrive: at(29.92),
  hit: at(31.6),
};

const Label: React.FC<{ n: string; text: string; x: number; y: number; from: number; align?: "left" | "right" }> = ({
  n,
  text,
  x,
  y,
  from,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const t = prog(frame, from, motion.frames.slow);
  return (
    <div
      style={{
        position: "absolute",
        left: align === "left" ? x : undefined,
        right: align === "right" ? 1080 - x : undefined,
        top: y,
        transform: `translateY(-50%) translateY(${(1 - t) * motion.move.md}px)`,
        opacity: t,
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        direction: "rtl",
      }}
    >
      <span style={{ fontFamily: fonts.latin, fontSize: 26, color: s.accent, fontWeight: 600 }}>{n}</span>
      <span style={{ fontFamily: fonts.arabic, fontSize: 46, fontWeight: 600 }}>{text}</span>
    </div>
  );
};

export const S4Build: React.FC = () => {
  const frame = useCurrentFrame();
  const head = prog(frame, 0, motion.frames.slow);
  const ghost = prog(frame, 10, motion.frames.slower) * (1 - prog(frame, T.hit, 12));
  const punch = 1 + 0.05 * (1 - prog(frame, T.hit, 9)) * (frame >= T.hit ? 1 : 0);

  return (
    <Frame surface="ink" safe={false}>
      <Camera zoomFrom={1} zoomTo={1.08} duration={SCENES.build[1] - SCENES.build[0]}>
        <AbsoluteFill style={{ top: 460, height: 160, alignItems: "center" }}>
          <div
            style={{
              fontSize: type.h1.size,
              fontWeight: 600,
              opacity: head,
              transform: `translateY(${(1 - head) * motion.move.lg}px)`,
            }}
          >
            الصوت من <span style={{ color: s.accent }}>الشكل</span> نفسه
          </div>
        </AbsoluteFill>

        <div
          style={{
            position: "absolute",
            left: BOX.left,
            top: BOX.top,
            transform: `scale(${punch})`,
            transformOrigin: "50% 50%",
          }}
        >
          <RouteMark
            width={W}
            ghost={ghost}
            dot={prog(frame, T.dot, motion.frames.fast)}
            path={prog(frame, T.path, 27)}
            head={prog(frame, T.hit - 4, 4)}
            hit={frame >= T.hit ? Math.min(1, (frame - T.hit) / 16) : 0}
          />
        </div>

        <Label n="01" text="البداية" x={DOT.x - 30} y={DOT.y + 90} from={T.dot + 4} />
        <Label n="02" text="الطريق" x={MID.x + 70} y={MID.y} from={T.path + 6} />
        <Label n="03" text="الوصول" x={TIP.x + 40} y={TIP.y - 90} from={T.arrive} align="right" />
      </Camera>

      <HiddenLetter letter="ا" at={262} x={120} y={1270} />

      <Sfx name="pop" at={T.dot} volume={0.8} />
      <Sfx name="draw" at={T.path} volume={0.6} len={27} />
      <Sfx name="hit" at={T.hit} volume={1} />
    </Frame>
  );
};
