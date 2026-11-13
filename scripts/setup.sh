#!/usr/bin/env bash
# One-time setup after cloning. Usage: bash scripts/setup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

need() { command -v "$1" >/dev/null || { echo "missing: $1 — $2" >&2; exit 1; }; }
need node   "install Node.js 20.19+ / 22.13+ (https://nodejs.org)"
need ffmpeg "sudo apt install ffmpeg  (macOS: brew install ffmpeg)"
need python3 "install Python 3.10+"

echo "→ npm packages"
npm ci

echo "→ Python venv (edge-tts + faster-whisper)"
[ -d .venv ] || python3 -m venv .venv
.venv/bin/pip install -q --upgrade pip
.venv/bin/pip install -q -r requirements.txt

chmod +x scripts/*.sh
echo "✓ ready. Preview: npm run dev   |   Claude: claude"
