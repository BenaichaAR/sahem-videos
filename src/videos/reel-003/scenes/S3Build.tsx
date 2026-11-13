import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { Browser, CafeSite, Pointer } from "../Site";
import { local } from "../timing";

// «فبنينا موقعاً لمقهى… بالأشكال فقط. صورةٌ… تقول ماذا نبيع. أيقونتان… تقولان أين ومتى. وزرٌّ واحد… يقول: هنا.»
const at = local(11.3);
const s = surfaces.ink;

const Num: React.FC<{ n: string }> = ({ n }) => (
  <span style={{ fontFamily: fonts.latin, color: s.accent, fontSize: 64, marginLeft: 20 }}>{n}</span>
);

export const S3Build: React.FC = () => {
  const frame = useCurrentFrame();
  const page = prog(frame, at(11.59), motion.frames.slow);
  const hero = prog(frame, at(15.69), motion.frames.slower);
  const pin = prog(frame, at(19.36), motion.frames.slower);
  const clock = prog(frame, at(20.68), motion.frames.slower);
  const button = prog(frame, at(23.25), motion.frames.slow);
  const click = at(25.8);
  const press = frame >= click ? 1 - prog(frame, click, 8) : 0;
  const ring = frame >= click ? Math.min(1, (frame - click) / 24) : 0;

  // Pointer path (screen px): enters bottom-right, lands on the button.
  const move = prog(frame, at(24.0), at(25.6) - at(24.0));
  const px = interpolate(move, [0, 1], [1000, 600]);
  const py = interpolate(move, [0, 1], [1500, 1290]);

  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(11.59), node: <>موقعٌ لمقهى…</> },
          { at: at(13.88), node: <>بالأشكال <span style={{ color: s.accent }}>فقط</span>.</> },
          { at: at(15.69), node: <><Num n="01" />ماذا نبيع؟</> },
          { at: at(19.36), node: <><Num n="02" />أين ومتى؟</> },
          { at: at(23.25), node: <><Num n="03" />هنا.</> },
        ]}
        size={96}
      />
      <AbsoluteFill style={{ top: 650, alignItems: "center" }}>
        <Browser width={760} height={756} style={{ opacity: page, transform: `translateY(${(1 - page) * motion.move.lg}px)` }}>
          <CafeSite width={760} hero={hero} pin={pin} clock={clock} button={button} press={press} t={frame * 0.15} />
        </Browser>
      </AbsoluteFill>

      {/* Click ring on the button */}
      {ring > 0 && ring < 1 && (
        <div
          style={{
            position: "absolute",
            left: 540 - (60 + ring * 300),
            top: 1319 - (60 + ring * 300),
            width: 2 * (60 + ring * 300),
            height: 2 * (60 + ring * 300),
            borderRadius: "50%",
            border: `4px solid ${s.accent}`,
            opacity: 1 - ring,
          }}
        />
      )}
      {move > 0 && <Pointer x={px} y={py} press={press} />}

      <HiddenLetter letter="ط" at={at(21.9)} x={110} y={560} />

      <Sfx name="wipe" at={at(11.59)} volume={0.35} />
      <Sfx name="pop" at={at(15.69)} volume={0.7} />
      <Sfx name="draw" at={at(15.69) + 3} volume={0.4} len={20} />
      <Sfx name="tick" at={at(19.36)} volume={0.6} />
      <Sfx name="tick" at={at(20.68)} volume={0.6} />
      <Sfx name="rise" at={at(23.25)} volume={0.5} />
      <Sfx name="tap" at={click} volume={0.8} />
      <Sfx name="hit" at={click + 1} volume={0.9} />
    </Frame>
  );
};
