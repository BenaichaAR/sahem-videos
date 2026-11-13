import "./brand/fonts";
import { Composition, Folder } from "remotion";
import { formats, FPS } from "./brand/theme";
import { Outro, OUTRO_FRAMES } from "./shared/Outro";
import { OUTRO_V2_FRAMES, OutroV2 } from "./shared/OutroV2";
import { calculateDemoMetadata, Demo } from "./videos/demo";
import { calculateReel001Metadata, Reel001 } from "./videos/reel-001";
import { TOTAL as REEL001_FRAMES } from "./videos/reel-001/timing";
import { calculateReel002Metadata, Reel002 } from "./videos/reel-002";
import { TOTAL as REEL002_FRAMES } from "./videos/reel-002/timing";
import { calculateReel003Metadata, Reel003 } from "./videos/reel-003";
import { TOTAL as REEL003_FRAMES } from "./videos/reel-003/timing";
import { calculateReel004Metadata, Reel004 } from "./videos/reel-004";
import { TOTAL as REEL004_FRAMES } from "./videos/reel-004/timing";
import { calculateReel005Metadata, Reel005 } from "./videos/reel-005";
import { TOTAL as REEL005_FRAMES } from "./videos/reel-005/timing";
import { calculateReel006Metadata, Reel006 } from "./videos/reel-006";
import { TOTAL as REEL006_FRAMES } from "./videos/reel-006/timing";
import { calculateReel007Metadata, Reel007 } from "./videos/reel-007";
import { TOTAL as REEL007_FRAMES } from "./videos/reel-007/timing";

const V = formats.vertical;

// Register every video here. Reels/stories: vertical 1080×1920. Wide: formats.wide.
export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Reels">
      <Composition
        id="Demo"
        component={Demo}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={300}
        defaultProps={{ captions: [], s1Frames: 150 }}
        calculateMetadata={calculateDemoMetadata}
      />
      <Composition
        id="Reel001"
        component={Reel001}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL001_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel001Metadata}
      />
      <Composition
        id="Reel002"
        component={Reel002}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL002_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel002Metadata}
      />
      <Composition
        id="Reel003"
        component={Reel003}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL003_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel003Metadata}
      />
      <Composition
        id="Reel004"
        component={Reel004}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL004_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel004Metadata}
      />
      <Composition
        id="Reel005"
        component={Reel005}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL005_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel005Metadata}
      />
      <Composition
        id="Reel006"
        component={Reel006}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL006_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel006Metadata}
      />
      <Composition
        id="Reel007"
        component={Reel007}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={REEL007_FRAMES}
        defaultProps={{ client: [], narrator: [] }}
        calculateMetadata={calculateReel007Metadata}
      />
    </Folder>
    <Folder name="Shared">
      <Composition
        id="Outro"
        component={Outro}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={OUTRO_FRAMES}
      />
      <Composition
        id="OutroV2"
        component={OutroV2}
        fps={FPS}
        width={V.width}
        height={V.height}
        durationInFrames={OUTRO_V2_FRAMES}
      />
    </Folder>
  </>
);
