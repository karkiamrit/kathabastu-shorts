#!/bin/bash
# Voice clean-up for manual episodes: trim silence, remove rumble/hiss, cut boxy low-mids,
# add presence, gentle compression and a limiter so lines sound close and clear.
# usage: enhance_vo.sh <episode dir>   (reads el/*.mp3, writes vo/*.wav)
cd "$1" || exit 1
for f in el/*.mp3; do b=$(basename "$f" .mp3)
 ffmpeg -loglevel error -y -i "$f" -af "aresample=48000,silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,\
highpass=f=75,lowpass=f=14000,afftdn=nr=10:nf=-40:tn=1,\
equalizer=f=220:t=q:w=1.2:g=-2.5,equalizer=f=500:t=q:w=1.4:g=-2,equalizer=f=3200:t=q:w=1.0:g=3,equalizer=f=6500:t=q:w=1.5:g=1.5,\
agate=threshold=0.008:ratio=2:attack=5:release=120,\
acompressor=threshold=-20dB:ratio=3:attack=6:release=90:makeup=3,alimiter=limit=0.89:level=false,aresample=44100" -ac 1 "vo/$b.wav"
done
