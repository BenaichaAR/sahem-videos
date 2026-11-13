// Demo reel: proves the pipeline (voice → captions → scene → outro).
// Copy this folder to start a new video, e.g. src/videos/reel-001.
import React from "react";
import { Audio } from "@remotion/media";
import type { Caption as Cap } from "@remotion/captions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { FPS } from "../../brand/theme";
import { Caption } from "../../shared/Caption";
import { Outro, OUTRO_FRAMES } from "../../shared/Outro";
import { Scene1 } from "./scenes/Scene1";

const ID = "demo";
const TAIL = 15; // breathing room after the voice, frames

export type DemoProps = { captions: Cap[]; s1Frames: number };

export const calculateDemoMetadata: CalculateMetadataFunction<DemoProps> = async () => {
  const [captions, secs] = await Promise.all([
    fetch(staticFile(`voice/${ID}/s1.json`)).then((r) => r.json() as Promise<Cap[]>),
    getAudioDurationInSeconds(staticFile(`voice/${ID}/s1.mp3`)),
  ]);
  const s1Frames = Math.ceil(secs * FPS) + TAIL;
  return { durationInFrames: s1Frames + OUTRO_FRAMES, props: { captions, s1Frames } };
};

export const Demo: React.FC<DemoProps> = ({ captions, s1Frames }) => (
  <>
    <Sequence durationInFrames={s1Frames} name="Scene 1">
      <Scene1 />
      <Caption captions={captions} />
      <Audio src={staticFile(`voice/${ID}/s1.mp3`)} />
    </Sequence>
    <Sequence from={s1Frames} durationInFrames={OUTRO_FRAMES} name="Outro">
      <Outro />
    </Sequence>
  </>
);
