// Reel 002 — العميل المستحيل · 2/7 — «أريد شعاراً بخطٍّ واحد، بدون رفع القلم».
import React from "react";
import { Audio } from "@remotion/media";
import type { Caption as Cap } from "@remotion/captions";
import { CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { Caption } from "../../shared/Caption";
import { OutroV2, OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";
import { HookScene } from "../../shared/series/HookScene";
import { SeriesBadge } from "../../shared/series/SeriesBadge";
import { S2Draw } from "./scenes/S2Draw";
import { S3Result } from "./scenes/S3Result";
import { S4Lesson } from "./scenes/S4Lesson";
import { S5Teaser } from "./scenes/S5Teaser";
import { CLIENT_AT, END, ID, N1_AT, N2_AT, NAR_CUT, NAR_CUT_S, SCENES, TOTAL } from "./timing";

export type Reel002Props = { client: Cap[]; narrator: Cap[] };

export const calculateReel002Metadata: CalculateMetadataFunction<Reel002Props> = async () => {
  const [client, narrator] = await Promise.all(
    ["client", "narrator"].map((f) => fetch(staticFile(`voice/${ID}/${f}.json`)).then((r) => r.json() as Promise<Cap[]>)),
  );
  return { durationInFrames: TOTAL, props: { client, narrator } };
};

const shift = (caps: Cap[], ms: number) => caps.map((c) => ({ ...c, startMs: c.startMs - ms, endMs: c.endMs - ms }));

const Hook: React.FC = () => (
  <HookScene
    src={staticFile(`voice/${ID}/client.mp3`)}
    playAt={CLIENT_AT}
    duration={SCENES.hook[1]}
    big={{ text: "بخطٍّ واحد", at: CLIENT_AT + sec(2.23) }}
    sub={{ text: "بدون رفع القلم.", at: CLIENT_AT + sec(4.0) }}
  />
);

const scenes = [
  ["S1 Hook", SCENES.hook, Hook],
  ["S2 Draw", SCENES.draw, S2Draw],
  ["S3 Result", SCENES.result, S3Result],
  ["S4 Lesson", SCENES.lesson, S4Lesson],
  ["S5 Teaser", SCENES.teaser, S5Teaser],
] as const;

export const Reel002: React.FC<Reel002Props> = ({ client, narrator }) => {
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
        <SeriesBadge title="العميل المستحيل" episode={2} at={4} />
      </Sequence>

      <Sequence name="Client voice" from={CLIENT_AT} durationInFrames={N1_AT - CLIENT_AT}>
        <Audio src={staticFile(`voice/${ID}/client.mp3`)} />
        <Caption captions={client} surface="ink" />
      </Sequence>
      <Sequence name="Narrator 1" from={N1_AT} durationInFrames={NAR_CUT}>
        <Audio src={staticFile(`voice/${ID}/narrator.mp3`)} trimAfter={NAR_CUT} />
        <Caption captions={part1} surface="ink" />
      </Sequence>
      <Sequence name="Narrator 2" from={N2_AT} durationInFrames={END - N2_AT}>
        <Audio src={staticFile(`voice/${ID}/narrator.mp3`)} trimBefore={NAR_CUT} />
        <Caption captions={part2} surface="ink" />
      </Sequence>

      <Sequence name="Outro" from={END} durationInFrames={OUTRO_V2_FRAMES}>
        <OutroV2 />
      </Sequence>
    </>
  );
};
