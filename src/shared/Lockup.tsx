import React from "react";
import { brand, fonts, surfaces, SurfaceName } from "../brand/theme";
import { RouteMark, ROUTE_MARK } from "./RouteMark";

// The responsive logo family. `h` = height of the symbol in px.
// 0: dot only · 1: symbol · 2: symbol + SAHEM · 3: full lockup (+ website optional).
export const Lockup: React.FC<{
  level: 0 | 1 | 2 | 3;
  h: number;
  surface?: SurfaceName;
  website?: boolean;
}> = ({ level, h, surface = "ink", website = false }) => {
  const s = surfaces[surface];
  const markW = (h * ROUTE_MARK.w) / ROUTE_MARK.h;
  if (level === 0) {
    return <div style={{ width: h * 0.45, height: h * 0.45, borderRadius: "50%", background: s.accent }} />;
  }
  if (level === 1) return <RouteMark width={markW} surface={surface} />;
  return (
    <div style={{ direction: "ltr", display: "flex", flexDirection: "column", alignItems: "center", gap: h * 0.18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: h * 0.28 }}>
        <RouteMark width={markW} surface={surface} />
        <div style={{ fontFamily: fonts.latin, color: s.text, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <div style={{ fontSize: h * 0.56, fontWeight: 600, lineHeight: 1 }}>SAHEM</div>
          {level === 3 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: h * 0.18,
                fontWeight: 400,
                lineHeight: 1,
                marginTop: h * 0.08,
              }}
            >
              {"STUDIO".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {level === 3 && website && (
        <div style={{ fontFamily: fonts.latin, fontSize: h * 0.16, fontWeight: 500, color: s.muted, letterSpacing: "0.05em" }}>
          {brand.website}
        </div>
      )}
    </div>
  );
};
