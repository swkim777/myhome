#!/usr/bin/env bash
# Grid frames for reading poses off a clip:
#   scripts/frames.sh <clip> <x> <y> <w> <h> <outDir> [scale=6] [count=40]
# Resamples to 30 fps by time, crops (x,y,w,h) in source px, scales up and draws a
# light grid every 5 source px and a red one every 10. outDir/f01.png is t = 0.
set -euo pipefail
clip=$1 x=$2 y=$3 w=$4 h=$5 out=$6 s=${7:-6} n=${8:-40}
mkdir -p "$out"
ffmpeg -y -v error -i "$clip" -vf "fps=30,crop=$w:$h:$x:$y,scale=$((w*s)):$((h*s)):flags=neighbor,drawgrid=w=$((5*s)):h=$((5*s)):t=1:c=0x40a0ff@0.35,drawgrid=w=$((10*s)):h=$((10*s)):t=1:c=red@0.6" -frames:v "$n" "$out/f%02d.png"
echo "wrote $n frames to $out (1 source px = $s px, f01 = t 0)"
