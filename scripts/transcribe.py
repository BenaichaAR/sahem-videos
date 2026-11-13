"""Transcribe an audio/video file to word-level captions for Remotion.

Output: <input>.json next to the input, an array in the @remotion/captions
Caption shape: {text, startMs, endMs, timestampMs, confidence}.

If --text is given (the script you fed to TTS) and its word count matches the
transcript, the script's exact spelling replaces Whisper's, keeping the timing.

Usage:
  .venv/bin/python scripts/transcribe.py public/voice/reel-001/s1.mp3 [--text file.txt] [--model small]
"""
import argparse
import json
import pathlib
import subprocess

import numpy as np
from faster_whisper import WhisperModel

p = argparse.ArgumentParser()
p.add_argument("input")
p.add_argument("--text", help="script text file to correct spelling")
p.add_argument("--model", default="small", help="tiny|base|small|medium|large-v3")
p.add_argument("--lang", default="ar")
a = p.parse_args()

src = pathlib.Path(a.input)
script = pathlib.Path(a.text).read_text(encoding="utf-8").split() if a.text else None

# Decode with system ffmpeg (16 kHz mono float32) instead of PyAV.
pcm = subprocess.run(
    ["ffmpeg", "-nostdin", "-v", "error", "-i", str(src), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
    check=True,
    capture_output=True,
).stdout
audio = np.frombuffer(pcm, dtype=np.float32)

model = WhisperModel(a.model, device="cpu", compute_type="int8", cpu_threads=4)
segments, _ = model.transcribe(
    audio,
    language=a.lang,
    word_timestamps=True,
    initial_prompt=" ".join(script) if script else None,
)

words = [w for s in segments for w in (s.words or [])]
caps = [
    {
        "text": w.word.strip(),
        "startMs": round(w.start * 1000),
        "endMs": round(w.end * 1000),
        "timestampMs": round((w.start + w.end) * 500),
        "confidence": round(w.probability, 3),
    }
    for w in words
    if w.word.strip()
]

if script:
    if len(script) == len(caps):
        for c, t in zip(caps, script):
            c["text"] = t
        note = "spelling from script"
    else:
        note = f"word count differs (script {len(script)} / heard {len(caps)}), kept Whisper spelling"
else:
    note = "Whisper spelling"

out = src.with_suffix(".json")
out.write_text(json.dumps(caps, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{out}: {len(caps)} words, {note}")
