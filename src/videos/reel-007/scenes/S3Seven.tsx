import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { RouteMark } from "../../../shared/RouteMark";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { HiddenLetter } from "../../../shared/series/HiddenLetter";
import { SEVEN_BEAT, SEVEN_LEAD } from "../timing";

// Seven wordless seconds. One piece per second, each one an episode of the series.
const s = surfaces.ink;
const BEATS = [
  { label: "صوت", ep: 1 },
  { label: "خطّ واحد", ep: 2 },
  { label: "ضربة", ep: 2 },
  { label: "اسم", ep: 5 },
  { label: "لون واحد", ep: 4 },
  { label: "موقع بلا كلمات", ep: 3 },
  { label: "لافتة", ep: 6 },
];
const B = (k: number) => SEVEN_LEAD + k * SEVEN_BEAT; // start of beat k (0-based)

export const S3Seven: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.max(0, Math.min(6, Math.floor((frame - SEVEN_LEAD) / SEVEN_BEAT)));
  const inBeat = prog(frame, B(beat), motion.frames.fast);

  const dot = prog(frame, B(0), motion.frames.fast);
  const path = prog(frame, B(1), 24);
  const head = prog(frame, B(2), 4);
  const hit = frame >= B(2) + 4 ? Math.min(1, (frame - B(2) - 4) / 16) : 0;
  const name = prog(frame, B(3), motion.frames.slow);
  const color = prog(frame, B(4), motion.frames.slow) * (1 - prog(frame, B(5), motion.frames.slow));
  const site = prog(frame, B(5), motion.frames.slow) * (1 - prog(frame, B(6), motion.frames.base));
  const sign = prog(frame, B(6), motion.frames.slow);

  const markX = 540 - 230 * name;
  return (
    <Frame surface="ink" safe={false}>
      {/* Counter */}
      <AbsoluteFill style={{ top: 440, height: 300, alignItems: "center" }}>
        <div style={{ direction: "ltr", fontFamily: fonts.latin, fontWeight: 600, lineHeight: 1 }}>
          <span style={{ fontSize: 190, color: s.accent, display: "inline-block", transform: `scale(${1.15 - 0.15 * inBeat})` }}>
            {beat + 1}
          </span>
          <span style={{ fontSize: 80, color: s.muted }}>/7</span>
        </div>
        <div style={{ marginTop: 18, fontSize: 52, fontWeight: 600, opacity: inBeat }}>{BEATS[beat].label}</div>
      </AbsoluteFill>

      {/* Stage */}
      <AbsoluteFill style={{ top: 0 }}>
        {/* site frame (beat 6) */}
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 870,
            width: 900,
            height: 560,
            borderRadius: 30,
            border: `3px solid ${s.line}`,
            background: colors.ink800,
            opacity: site,
            transform: `scale(${0.94 + 0.06 * site})`,
          }}
        >
          <div style={{ height: 50, borderBottom: `2px solid ${s.line}`, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", direction: "ltr" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: i === 0 ? s.accent : s.line }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 40, left: 40, right: 40, display: "flex", gap: 20, direction: "ltr" }}>
            <div style={{ flex: 1, height: 90, borderRadius: 16, border: `2px solid ${s.line}` }} />
            <div style={{ flex: 1, height: 90, borderRadius: 16, border: `2px solid ${s.line}` }} />
            <div style={{ flex: 1, height: 90, borderRadius: 45, background: s.accent }} />
          </div>
        </div>
        {/* shop sign (beat 7) */}
        <div style={{ position: "absolute", left: 60, top: 840, width: 960, opacity: sign, transform: `translateY(${(1 - sign) * 30}px)` }}>
          <div style={{ height: 380, background: colors.ink800, border: `5px solid ${colors.stone400}` }} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: 18, height: 170, background: s.line }} />
            <div style={{ width: 18, height: 170, background: s.line }} />
          </div>
        </div>

        {/* mark */}
        <div
          style={{
            position: "absolute",
            left: markX,
            top: 1030,
            transform: `translate(-50%, -50%) scale(${1 - 0.25 * name})`,
            filter: color > 0 ? `grayscale(0)` : undefined,
            opacity: 1,
          }}
        >
          <div style={{ opacity: 1 - color * 0.75 }}>
            <RouteMark width={260} dot={0} path={path} head={head} hit={hit} />
          </div>
          {/* the dot stays full colour (beat 5) */}
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <RouteMark width={260} dot={dot} path={0} head={0} />
          </div>
          {color > 0 && (
            <div
              style={{
                position: "absolute",
                left: ((7.4 + 5.6) / 124.3) * 260 - 80,
                top: ((139 - 2) / 150) * 314 - 80,
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: `4px solid ${s.accent}`,
                opacity: (1 - ((frame - B(4)) % 30) / 30) * color,
                transform: `scale(${0.4 + (((frame - B(4)) % 30) / 30) * 1.2})`,
              }}
            />
          )}
        </div>
        {/* name */}
        <div
          style={{
            position: "absolute",
            left: 470,
            top: 1030,
            transform: "translateY(-50%)",
            direction: "ltr",
            fontFamily: fonts.latin,
            color: s.text,
            clipPath: `inset(-10% ${(1 - name) * 100}% -10% 0)`,
            opacity: 1 - color * 0.75,
          }}
        >
          <div style={{ fontSize: 130, fontWeight: 600, lineHeight: 1 }}>SAHEM</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 42, marginTop: 16 }}>
            {"STUDIO".split("").map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <HiddenLetter letter="ة" at={B(5) + 12} x={120} y={760} />

      <Sfx name="pop" at={B(0)} volume={0.85} />
      <Sfx name="draw" at={B(1)} volume={0.6} len={24} />
      <Sfx name="hit" at={B(2) + 4} volume={1} />
      <Sfx name="wipe" at={B(3)} volume={0.55} />
      <Sfx name="tick" at={B(4)} volume={0.7} />
      <Sfx name="rise" at={B(5)} volume={0.55} />
      <Sfx name="reveal" at={B(6)} volume={0.6} />
      <Sfx name="hit" at={B(6) + 10} volume={0.8} />
    </Frame>
  );
};
