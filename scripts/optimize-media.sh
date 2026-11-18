#!/usr/bin/env bash
# Usage: scripts/optimize-media.sh <project-id|site> <input.mov>
#   -> public/media/<project-id>/<name>.mp4 + <name>-poster.webp (720p, no audio, web-ready)
# <project-id> must match the `id` of the project in src/content/projects/ ("site" = site-wide assets).
set -euo pipefail
folder="${1:?Usage: optimize-media.sh <project-id|site> <input>}"
in="${2:?Usage: optimize-media.sh <project-id|site> <input>}"
[ -f "$in" ] || { echo "Not a file: $in" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg not found on PATH." >&2; exit 1; }

name="$(basename "${in%.*}" | tr ' _' '--' | tr '[:upper:]' '[:lower:]')"
out="public/media/${folder}"
mkdir -p "$out"
ffmpeg -i "$in" -vf "scale=-2:720,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart "${out}/${name}.mp4"
ffmpeg -i "$in" -vframes 1 -vf "scale=-2:720" "${out}/${name}-poster.webp"
echo "Use in content: mediaFor(\"${folder}\").video(\"${name}\", \"alt text\")"
