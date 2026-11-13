import React, { useMemo } from "react";
import { useAudioData } from "@remotion/media-utils";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, surfaces, SurfaceName } from "../../brand/theme";

// A voice-message card (our own design, no app UI). The waveform is computed
// from the real audio file; bars turn Signal as the message plays.
// `playAt` = frame (in this Sequence) when the audio starts.
export const VoiceNote: React.FC<{
  src: string;
  playAt: number;
  label: string;
  surface?: SurfaceName;
  bars?: number;
  width?: number;
}> = ({ src, playAt, label, surface = "ink", bars = 38, width = 760 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = surfaces[surface];
  const audio = useAudioData(src);

  const peaks = useMemo(() => {
    if (!audio) return Array.from({ length: bars }, () => 0.15);
    const ch = audio.channelWaveforms[0];
    const size = Math.floor(ch.length / bars);
    const raw = Array.from({ length: bars }, (_, b) => {
      let m = 0;
      for (let i = b * size; i < (b + 1) * size; i += 32) m = Math.max(m, Math.abs(ch[i]));
      return m;
    });
    const max = Math.max(...raw, 0.001);
    return raw.map((v) => 0.12 + 0.88 * (v / max));
  }, [audio, bars]);

  const total = audio ? audio.durationInSeconds * fps : 1;
  const played = Math.max(0, Math.min(1, (frame - playAt) / total));
  const playing = frame >= playAt && played < 1;
  const secs = Math.ceil(audio ? audio.durationInSeconds : 0);
  const barW = 8;
  const gap = (width - 200 - bars * barW) / (bars - 1);

  return (
    <div
      style={{
        width,
        padding: "34px 40px",
        borderRadius: 48,
        background: surface === "ink" ? colors.ink800 : colors.white,
        border: `2px solid ${s.line}`,
        direction: "ltr",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        style={{
          direction: "rtl",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.arabic,
          fontSize: 30,
          fontWeight: 500,
          color: s.muted,
        }}
      >
        <span>{label}</span>
        <span style={{ fontFamily: fonts.latin, direction: "ltr" }}>0:{String(secs).padStart(2, "0")}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* play / pause */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: s.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {playing ? (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 10, height: 34, background: s.bg }} />
              <div style={{ width: 10, height: 34, background: s.bg }} />
            </div>
          ) : (
            <svg width={34} height={38} viewBox="0 0 34 38" style={{ marginLeft: 6 }}>
              <path d="M0 0L34 19L0 38Z" fill={s.bg} />
            </svg>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap, height: 90 }}>
          {peaks.map((h, i) => {
            const on = i / bars < played;
            return (
              <div
                key={i}
                style={{
                  width: barW,
                  height: Math.max(8, h * 90),
                  borderRadius: 4,
                  background: on ? s.accent : s.line,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
