import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { local } from "../timing";

// «والمفاجأة؟ اسمنا… سهم. العربيّ يقرأ الاسم… والأجنبيّ يرى السهم… والاثنان فهما نفس الشيء.»
// The word «سهم» turns into the arrow mark; then both side by side.
const at = local(26.6);
const s = surfaces.ink;

export const S4Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const word = prog(frame, at(29.46), motion.frames.slow);
  const tagAr = prog(frame, at(31.13), motion.frames.slow);
  const morph = prog(frame, at(33.38), motion.frames.slow); // word → mark
  const dot = prog(frame, at(33.38), motion.frames.fast);
  const path = prog(frame, at(33.6), 27);
  const hitAt = at(34.6);
  const head = prog(frame, hitAt - 4, 4);
  const hit = frame >= hitAt ? Math.min(1, (frame - hitAt) / 16) : 0;
  const both = prog(frame, at(35.8), motion.frames.slower); // side by side

  // Positions: centre alone, then mark right / word left (RTL reading: name first).
  const markX = 540 + 230 * both;
  const wordX = 540 - 270 * both;
  const wordOpacity = word * (1 - morph) + both;

  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: at(27.08), node: <>والمفاجأة؟</> },
          { at: at(28.44), node: <>اسمنا…</> },
          { at: at(31.13), node: <>العربيّ يقرأ <span style={{ color: s.accent }}>الاسم</span>…</> },
          { at: at(33.38), node: <>والأجنبيّ يرى <span style={{ color: s.accent }}>السهم</span>…</> },
          { at: at(35.8), node: <>…نفس الشيء.</> },
        ]}
        size={96}
      />

      {/* The word «سهم» */}
      <div
        style={{
          position: "absolute",
          left: wordX,
          top: 990,
          transform: `translate(-50%, -50%) scale(${1 - 0.45 * both}) translateY(${(1 - word) * 40}px)`,
          fontFamily: fonts.arabic,
          fontSize: 330,
          fontWeight: 600,
          lineHeight: 1,
          opacity: Math.min(1, wordOpacity),
          filter: `blur(${morph * (1 - both) * 14}px)`,
        }}
      >
        سهم
      </div>
      {/* «AR» tag under the word while the Arab reads it */}
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 1250,
          transform: "translateX(-50%)",
          opacity: tagAr * (1 - morph),
          fontFamily: fonts.arabic,
          fontSize: 40,
          color: s.muted,
        }}
      >
        يُقرأ بالعربية
      </div>

      {/* The mark */}
      {morph > 0 && (
        <div style={{ position: "absolute", left: markX, top: 990, transform: `translate(-50%, -50%) scale(${1 - 0.35 * both})` }}>
          <RouteMark width={320} dot={dot} path={path} head={head} hit={hit} />
        </div>
      )}
      {/* «=» between them */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 990 - 960, opacity: both }}>
        <div style={{ fontFamily: fonts.latin, fontSize: 120, fontWeight: 500, color: s.accent }}>=</div>
      </AbsoluteFill>

      <HiddenLetter letter="ا" at={at(31.9)} x={880} y={1300} />

      <Sfx name="reveal" at={at(29.46) - 2} volume={0.55} />
      <Sfx name="wipe" at={at(33.38)} volume={0.4} />
      <Sfx name="pop" at={at(33.38)} volume={0.8} />
      <Sfx name="draw" at={at(33.6)} volume={0.55} len={27} />
      <Sfx name="hit" at={hitAt} volume={1} />
      <Sfx name="rise" at={at(35.8)} volume={0.45} />
    </Frame>
  );
};
