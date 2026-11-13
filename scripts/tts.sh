#!/usr/bin/env bash
# Generate voice-over for one scene, then word timings for captions.
# Usage: scripts/tts.sh <video-id> <scene> [voice] [rate]
#   reads  src/videos/<video-id>/voice/<scene>.txt
#   writes public/voice/<video-id>/<scene>.mp3 and <scene>.json
# Example: scripts/tts.sh reel-001 s1 ar-DZ-IsmaelNeural -5%
set -euo pipefail
cd "$(dirname "$0")/.."

id="${1:?video id, e.g. reel-001}"
scene="${2:?scene, e.g. s1}"
voice="${3:-ar-SA-HamedNeural}"
rate="${4:-+0%}"

text="src/videos/$id/voice/$scene.txt"
outdir="public/voice/$id"
[ -f "$text" ] || { echo "missing $text" >&2; exit 1; }
mkdir -p "$outdir"

.venv/bin/edge-tts --voice "$voice" --rate="$rate" --file "$text" \
  --write-media "$outdir/$scene.mp3"

.venv/bin/python scripts/transcribe.py "$outdir/$scene.mp3" --text "$text"

dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$outdir/$scene.mp3")
echo "done: $outdir/$scene.mp3  ${dur}s  ≈ $(python3 -c "import math;print(math.ceil($dur*30))") frames"
