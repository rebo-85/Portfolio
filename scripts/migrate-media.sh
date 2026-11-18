#!/usr/bin/env bash
# One-off migration: old static-page assets/ folder -> ReBo public/media/
# Usage (from the ReBo repo root, in Git Bash or WSL):
#   scripts/migrate-media.sh "/c/path/to/old-portfolio/assets"
# Needs ffmpeg on PATH (Windows: winget install Gyan.FFmpeg).
set -euo pipefail

src="${1:?Pass the path to the old assets folder}"
[ -d "$src" ] || { echo "Not a folder: $src" >&2; exit 1; }
[ -f scripts/optimize-media.sh ] || { echo "Run this from the ReBo repo root." >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg not found on PATH." >&2; exit 1; }

mkdir -p public/media
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

# old filename | new name (must match the names used in src/content/site.ts)
videos=(
  "dragon shop-1.mp4|dragon-shop-1.mp4"
  "grifo combat.mp4|grifo-combat.mp4"
  "gps-1.mp4|gps-1.mp4"
  "comerciants.mp4|comerciants.mp4"
  "arean wave.mp4|arena-wave.mp4"
  "rain_fire.mp4|rain-fire.mp4"
  "static_singalarity.mp4|static-singularity.mp4"
  "divine_punishment.mp4|divine-punishment.mp4"
  "attack.mp4|attack.mp4"
  "ice_crash.mp4|ice-crash.mp4"
  "tornado-1.mp4|tornado-1.mp4"
  "teleport.mp4|teleport.mp4"
  "load.mp4|load.mp4"
)
images=(
  "draconian-bp-pack-icon.png|draconian-bp-pack-icon.png"
  "dragon_menu.png|dragon-menu.png"
  "wind-chestplate-icon.png|wind-chestplate-icon.png"
  "hud_preview.png|hud-preview.png"
  "demo.gif|demo.gif"
)

for pair in "${videos[@]}"; do
  old="${pair%%|*}"; new="${pair##*|}"
  if [ ! -f "$src/$old" ]; then echo "MISSING video: $old" >&2; continue; fi
  cp "$src/$old" "$tmp/$new"
  echo ">> encoding $old -> public/media/${new%.*}.mp4"
  bash scripts/optimize-media.sh "$tmp/$new"
done

for pair in "${images[@]}"; do
  old="${pair%%|*}"; new="${pair##*|}"
  if [ ! -f "$src/$old" ]; then echo "MISSING image: $old" >&2; continue; fi
  cp "$src/$old" "public/media/$new"
  echo ">> copied $old -> public/media/$new"
done

echo; echo "Done. Sizes:"; du -sh public/media; ls -lh public/media
