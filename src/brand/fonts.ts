// Loads the brand fonts from public/brand/fonts once, before any frame renders.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const faces: { family: string; file: string; weight: string }[] = [
  ...(["400", "500", "600"] as const).flatMap((w) => [
    { family: "Readex Pro", file: `readex-pro-arabic-${w}-normal.woff2`, weight: w },
    { family: "Readex Pro", file: `readex-pro-latin-${w}-normal.woff2`, weight: w },
    { family: "Sora", file: `sora-latin-${w}-normal.woff2`, weight: w },
  ]),
];

export const fontsReady = Promise.all(
  faces.map((f) =>
    loadFont({
      family: f.family,
      url: staticFile(`brand/fonts/${f.file}`),
      weight: f.weight,
      format: "woff2",
    }),
  ),
);
