// Reel 001 — العميل المستحيل · 1/7 — «أريد شعاراً يُسمَع».
import React from "react";
import { Audio } from "@remotion/media";
import type { Caption as Cap } from "@remotion/captions";
import { CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { Caption } from "../../shared/Caption";
import { OutroV2, OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { SeriesBadge } from "../../shared/series/SeriesBadge";
import { S1Hook } from "./scenes/S1Hook";
import { S2Shock } from "./scenes/S2Shock";
import { S3Proof } from "./scenes/S3Proof";
import { S4Build } from "./scenes/S4Build";
import { S5Result } from "./scenes/S5Result";
import { S6Lesson } from "./scenes/S6Lesson";
import { S7Teaser } from "./scenes/S7Teaser";
import { CLIENT_AT, END, ID, N1_AT, N2_AT, NAR_CUT, NAR_CUT_S, SCENES, TOTAL } from "./timing";

export type Reel001Props = { client: Cap[]; narrator: Cap[] };

export const calculateReel001Metadata: CalculateMetadataFunction<Reel001Props> = async () => {
  const [client, narrator] = await Promise.all(
    ["client", "narratorv4"].map((f) => fetch(staticFile(`voice/${ID}/${f}.json`)).then((r) => r.json() as Promise<Cap[]>)),
  );
  return { durationInFrames: TOTAL, props: { client, narrator } };
};

const shift = (caps: Cap[], ms: number) => caps.map((c) => ({ ...c, startMs: c.startMs - ms, endMs: c.endMs - ms }));

const scenes = [
  ["S1 Hook", SCENES.hook, S1Hook],
  ["S2 Shock", SCENES.shock, S2Shock],
  ["S3 Proof", SCENES.proof, S3Proof],
  ["S4 Build", SCENES.build, S4Build],
  ["S5 Result", SCENES.result, S5Result],
  ["S6 Lesson", SCENES.lesson, S6Lesson],
  ["S7 Teaser", SCENES.teaser, S7Teaser],
] as const;

export const Reel001: React.FC<Reel001Props> = ({ client, narrator }) => {
  const cut = NAR_CUT_S * 1000;
  const part1 = narrator.filter((c) => c.startMs < cut);
  const part2 = shift(
    narrator.filter((c) => c.startMs >= cut),
    cut,
  );
  return (
    <>
      {scenes.map(([name, [from, to], Scene]) => (
        <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
          <Scene />
        </Sequence>
      ))}

      <Sequence name="Badge" durationInFrames={END} layout="none">
        <SeriesBadge title="العميل المستحيل" episode={1} at={4} />
      </Sequence>

      {/* Voice */}
      <Sequence name="Client voice" from={CLIENT_AT} durationInFrames={N1_AT - CLIENT_AT}>
        <Audio src={staticFile(`voice/${ID}/client.mp3`)} />
        <Caption captions={client} surface="ink" />
      </Sequence>
      <Sequence name="Narrator 1" from={N1_AT} durationInFrames={NAR_CUT}>
        <Audio src={staticFile(`voice/${ID}/narratorv4.mp3`)} trimAfter={NAR_CUT} />
        <Caption captions={part1} surface="ink" />
      </Sequence>
      <Sequence name="Narrator 2" from={N2_AT} durationInFrames={END - N2_AT}>
        <Audio src={staticFile(`voice/${ID}/narratorv4.mp3`)} trimBefore={NAR_CUT} />
        <Caption captions={part2} surface="ink" />
      </Sequence>

      <Sequence name="Outro" from={END} durationInFrames={OUTRO_V2_FRAMES}>
        <OutroV2 />
      </Sequence>
    </>
  );
};
