import React from "react";
import { colors, surfaces } from "../../brand/theme";
import { Lockup } from "../../shared/Lockup";

// The places a growing project lives in. All objects; centred in their own box.
const s = surfaces.ink;

export const BrowserTab: React.FC<{ icon?: React.ReactNode }> = ({ icon }) => (
  <div style={{ width: 900, direction: "ltr" }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, paddingLeft: 30 }}>
      <div
        style={{
          width: 380,
          height: 96,
          borderRadius: "22px 22px 0 0",
          background: colors.graphite700,
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "0 26px",
        }}
      >
        <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon ?? <Lockup level={0} h={70} />}
        </div>
        <div style={{ height: 14, flex: 1, borderRadius: 7, background: colors.stone400, opacity: 0.6 }} />
      </div>
      <div style={{ width: 300, height: 80, borderRadius: "18px 18px 0 0", background: colors.ink800, display: "flex", alignItems: "center", padding: "0 26px", gap: 18 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: s.line }} />
        <div style={{ height: 12, flex: 1, borderRadius: 6, background: s.line }} />
      </div>
    </div>
    <div style={{ height: 300, background: colors.graphite700, borderRadius: "0 0 26px 26px", padding: 30 }}>
      <div style={{ height: 50, borderRadius: 25, background: colors.ink800 }} />
    </div>
  </div>
);

export const PhoneHome: React.FC = () => (
  <div
    style={{
      width: 460,
      height: 900,
      borderRadius: 64,
      border: `10px solid ${colors.graphite700}`,
      background: colors.ink800,
      padding: "90px 40px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 34,
      alignContent: "start",
      direction: "ltr",
    }}
  >
    {Array.from({ length: 12 }, (_, i) =>
      i === 4 ? (
        <div
          key={i}
          style={{
            aspectRatio: "1",
            borderRadius: 26,
            background: colors.ink900,
            border: `3px solid ${s.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lockup level={1} h={70} />
        </div>
      ) : (
        <div key={i} style={{ aspectRatio: "1", borderRadius: 26, background: colors.graphite700, opacity: 0.7 }} />
      ),
    )}
  </div>
);

export const BusinessCard: React.FC = () => (
  <div
    style={{
      width: 780,
      height: 450,
      borderRadius: 26,
      background: colors.ink800,
      border: `2px solid ${s.line}`,
      padding: 56,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      direction: "ltr",
      transform: "rotate(-4deg)",
    }}
  >
    <Lockup level={2} h={110} />
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 300, height: 14, borderRadius: 7, background: s.line }} />
      <div style={{ width: 220, height: 14, borderRadius: 7, background: s.line }} />
    </div>
  </div>
);

export const ShopFront: React.FC<{ big?: boolean }> = ({ big }) => (
  <div style={{ width: 900, direction: "ltr", display: "flex", flexDirection: "column" }}>
    <div
      style={{
        height: big ? 360 : 240,
        background: colors.ink800,
        border: `4px solid ${colors.stone400}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lockup level={3} h={big ? 200 : 130} website={big} />
    </div>
    <div style={{ height: big ? 0 : 420, background: colors.graphite700, display: big ? "none" : "flex", gap: 30, padding: 40, alignItems: "flex-end" }}>
      <div style={{ width: 200, height: 320, background: colors.ink900, border: `3px solid ${s.line}` }} />
      <div style={{ flex: 1, height: 220, alignSelf: "flex-start", background: colors.ink900, border: `3px solid ${s.line}` }} />
    </div>
  </div>
);
