// Reel 007 — العميل المستحيل · 7/7 (finale) — «أريد كلّ شيء… في 7 ثوانٍ».
import React from "react";
import { Audio } from "@remotion/media";
import type { Caption as Cap } from "@remotion/captions";
import { CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { Caption } from "../../shared/Caption";
import { OutroV2, OUTRO_V2_FRAMES } from "../../shared/OutroV2";
import { sec } from "../../shared/anim";
import { HookScene } from "../../shared/series/HookScene";
import { SeriesBadge } from "../../shared/series/SeriesBadge";
import { S2Ready } from "./scenes/S2Ready";
import { S3Seven } from "./scenes/S3Seven";
import { S4Reveal } from "./scenes/S4Reveal";
import { S5Game } from "./scenes/S5Game";
import { S6Season } from "./scenes/S6Season";
import { CLIENT_AT, END, ID, N1_AT, N2_AT, NAR_CUT, NAR_CUT_S, NAR_RESUME, NAR_RESUME_S, SCENES, TOTAL } from "./timing";

export type Reel007Props = { client: Cap[]; narrator: Cap[] };

export const calculateReel007Metadata: CalculateMetadataFunction<Reel007Props> = async () => {
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
    big={{ text: "في 7 ثوانٍ", at: CLIENT_AT + sec(2.78) }}
  />
);

const scenes = [
  ["S1 Hook", SCENES.hook, Hook],
  ["S2 Ready", SCENES.ready, S2Ready],
  ["S3 Seven seconds", SCENES.seven, S3Seven],
  ["S4 Reveal", SCENES.reveal, S4Reveal],
  ["S5 Game", SCENES.game, S5Game],
  ["S6 Season 2", SCENES.season, S6Season],
] as const;

export const Reel007: React.FC<Reel007Props> = ({ client, narrator }) => {
  const part1 = narrator.filter((c) => c.startMs < NAR_CUT_S * 1000);
  const part2 = shift(
    narrator.filter((c) => c.startMs >= NAR_RESUME_S * 1000),
    NAR_RESUME_S * 1000,
  );
  return (
    <>
      {scenes.map(([name, [from, to], Scene]) => (
        <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
          <Scene />
        </Sequence>
      ))}

      <Sequence name="Badge" durationInFrames={END} layout="none">
        <SeriesBadge title="العميل المستحيل" episode={7} at={4} />
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
        <Audio src={staticFile(`voice/${ID}/narrator.mp3`)} trimBefore={NAR_RESUME} />
        <Caption captions={part2} surface="ink" />
      </Sequence>

      <Sequence name="Outro" from={END} durationInFrames={OUTRO_V2_FRAMES}>
        <OutroV2 />
      </Sequence>
    </>
  );
};
