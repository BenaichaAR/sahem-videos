import React, { useMemo } from "react";
import { createTikTokStyleCaptions, type Caption as Cap } from "@remotion/captions";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, formats, motion, surfaces, SurfaceName, type } from "../brand/theme";

// Word-by-word captions. Pages of a few words; the spoken word turns Signal.
// `captions` comes from public/voice/<id>/<scene>.json (scripts/transcribe.py).
export const Caption: React.FC<{
  captions: Cap[];
  surface?: SurfaceName;
  /** Group words spoken within this many ms into one page. */
  pageMs?: number;
  /** Extra distance above the bottom of the safe area, px. */
  bottom?: number;
}> = ({ captions, surface = "paper", pageMs = 1400, bottom = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = (height > width ? formats.vertical : formats.wide).safe;
  const nowMs = (frame / fps) * 1000;
  const s = surfaces[surface];

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        // Each word needs a leading space so words don't glue together.
        captions: captions.map((c, i) => ({
          ...c,
          text: i === 0 || c.text.startsWith(" ") ? c.text : ` ${c.text}`,
        })),
        combineTokensWithinMilliseconds: pageMs,
      }),
    [captions, pageMs],
  );
  const page = pages.find((p) => nowMs >= p.startMs && nowMs < p.startMs + p.durationMs);
  if (!page) return null;

  const pageFrame = Math.round((page.startMs / 1000) * fps);
  const enter = interpolate(frame, [pageFrame, pageFrame + motion.frames.slow], [0, 1], {
    easing: motion.ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: safe.bottom + bottom,
        paddingLeft: safe.side,
        paddingRight: safe.side,
      }}
    >
      <div
        style={{
          direction: "rtl",
          textAlign: "center",
          fontFamily: fonts.arabic,
          fontSize: type.caption.size,
          fontWeight: type.caption.weight,
          lineHeight: type.caption.lineHeight,
          color: s.text,
          opacity: enter,
          transform: `translateY(${(1 - enter) * motion.move.md}px)`,
        }}
      >
        {page.tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          return (
            <span key={i} style={{ color: active ? s.accent : s.text, whiteSpace: "pre" }}>
              {t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
