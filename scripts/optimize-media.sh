#!/usr/bin/env bash
# Usage: scripts/optimize-media.sh input.mov  ->  public/media/input.mp4 (720p, no audio, web-ready)
set -euo pipefail
in="$1"; name="$(basename "${in%.*}" | tr ' _' '--' | tr '[:upper:]' '[:lower:]')"
ffmpeg -i "$in" -vf "scale=-2:720,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart "public/media/${name}.mp4"
ffmpeg -i "$in" -vframes 1 -vf "scale=-2:720" "public/media/${name}-poster.webp"
