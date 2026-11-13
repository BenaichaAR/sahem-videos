import React from "react";
import { useCurrentFrame } from "remotion";
import { fonts, motion, surfaces } from "../../../brand/theme";
import { Frame } from "../../../shared/Frame";
import { prog } from "../../../shared/anim";
import { Sfx } from "../../../shared/Sfx";
import { Headline } from "../../../shared/series/Headline";
import { local } from "../timing";

// «بدون قراءة؟ الكلمة تحتاج لغة… قهوة… كوفي… كافيه… كلّ واحد يفهم كلمته فقط.»
const at = local(0);
const s = surfaces.ink;

// One word, many languages. Latin words in Sora, Arabic in Readex Pro.
export const COFFEE: { w: string; latin: boolean; t: number }[] = [
  { w: "قهوة", latin: false, t: 5.15 },
  { w: "Coffee", latin: true, t: 6.32 },
  { w: "Café", latin: true, t: 7.33 },
  { w: "Kaffee", latin: true, t: 7.75 },
  { w: "Kahve", latin: true, t: 8.0 },
  { w: "Caffè", latin: true, t: 8.25 },
];

// Positions for the final ring of words (around centre 540, 980).
const RING = [
  [540, 760],
  [800, 880],
  [790, 1110],
  [540, 1210],
  [290, 1110],
  [280, 880],
];

export const S2Words: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = prog(frame, at(8.55), motion.frames.slower);
  return (
    <Frame surface="ink" safe={false}>
      <Headline
        lines={[
          { at: 0, node: <>بدون قراءة؟</> },
          { at: at(2.09), node: <>الكلمة تحتاج <span style={{ color: s.accent }}>لغة</span>…</> },
          { at: at(8.55), node: <>كلٌّ يفهم كلمته فقط.</> },
        ]}
        size={96}
      />
      {COFFEE.map((c, i) => {
        const inn = prog(frame, at(c.t), motion.frames.fast);
        const next = COFFEE[i + 1];
        // Before the ring: only the current word, big, in the centre.
        const replaced = next ? prog(frame, at(next.t), motion.frames.fast) : 0;
        const big = 1 - ring;
        const [rx, ry] = RING[i];
        const x = 540 + (rx - 540) * ring;
        const y = 980 + (ry - 980) * ring;
        const op = ring > 0 ? inn * (0.25 + 0.75 * ring) : inn * (1 - replaced);
        if (op <= 0.001) return null;
        return (
          <div
            key={c.w}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${0.45 + 0.55 * big})`,
              fontFamily: c.latin ? fonts.latin : fonts.arabic,
              fontSize: 190,
              fontWeight: 600,
              whiteSpace: "nowrap",
              color: ring > 0 ? s.muted : s.text,
              opacity: op,
            }}
          >
            {c.w}
          </div>
        );
      })}
      {COFFEE.map((c) => (
        <Sfx key={c.w} name="tick" at={at(c.t)} volume={0.55} />
      ))}
      <Sfx name="wipe" at={at(8.55)} volume={0.35} />
    </Frame>
  );
};

export { RING };
