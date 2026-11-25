#!/usr/bin/env python3
"""Kathabastu shorts builder.

usage: python3 build.py episodes/<slug> [--stills t1 t2 ...]

The episode folder must contain:
  story.js      scene functions c0..cN plus `const DUR=[...]` (old scene lengths, s) and `FN=[...]`
  episode.json  {"scenes":[{"cues":[[t,["clip",...]],...]}], "sfx":[[scene,t,"sfx-id",gainDb],...],
                 "bells":[[scene,t],...], "flute":[[scene,a,b],...], "drone":true}
  vo/<clip>.wav voice clips (mono, silence-trimmed) named as in the cues
Outputs episodes/<slug>/video.mp4 (1080x1920, 30fps, H.264 + AAC, loudness -14 LUFS).
"""
import base64, json, os, subprocess, sys, glob, wave
import numpy as np
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.abspath(__file__))
EP = os.path.abspath(sys.argv[1])
SFX = os.environ.get('SFX_KIT', '/tmp/sfx-kit')
FPS, SR = 30, 44100
cfg = json.load(open(f'{EP}/episode.json'))

def sh(*a): subprocess.run(a, check=True)
def dur(f): return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))

# ---------- page ----------
def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()
DEV = 'U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF'
LAT = 'U+0000-00FF,U+2000-206F,U+2032'
faces = ''
for fam, pre in [('Mukta', 'mukta'), ('Baloo 2', 'baloo-2')]:
    for sub, rng in [('devanagari', DEV), ('latin', LAT)]:
        faces += f"@font-face{{font-family:'{fam}';font-weight:800;src:url(data:font/woff2;base64,{b64(f'{ROOT}/fonts/{pre}-{sub}-800-normal.woff2')});unicode-range:{rng}}}\n"
js = ''.join(open(p).read() + '\n' for p in [f'{ROOT}/engine/helpers.js', f'{ROOT}/engine/comic.js', f'{EP}/story.js', f'{ROOT}/engine/runtime.js'])
html = f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{faces}body{{margin:0}}</style></head><body><canvas id=c width=1080 height=1920></canvas><script>{js}</script></body></html>"
open(f'{EP}/page.html', 'w').write(html)

# ---------- timing: stretch each scene so every voice clip fits ----------
L = {os.path.basename(f)[:-4]: dur(f) for f in glob.glob(f'{EP}/vo/*.wav')}
olddur = None
PAD = 0.35
def plan(DUR):
    kn_all, place, start = [], [], 0
    for D, sc in zip(DUR, cfg['scenes']):
        kn = [[0, 0]]; need = 0; po = pn = 0
        for ot, clips in sc['cues']:
            nt = pn + max(ot - po, need); kn.append([ot, round(nt, 3)]); t = nt; need = 0
            for c in clips:
                place.append((c, start + t)); t += L[c] + 0.15; need += L[c] + 0.15
            if clips: need += PAD - 0.15
            po, pn = ot, nt
        end = pn + max(D - po, need + 0.8); kn.append([D, round(end, 3)]); kn_all.append(kn); start += end
    return kn_all, place, start

from playwright.sync_api import sync_playwright
def open_page(p):
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + f'{EP}/page.html')
    pg.evaluate("""Promise.all(["800 60px Mukta","800 60px 'Baloo 2'"].map(f=>document.fonts.load(f,'नेमराज SEE')))""")
    return b, pg, errs

with sync_playwright() as p:
    b, pg, errs = open_page(p)
    DUR = pg.evaluate('DUR'); b.close()
assert len(DUR) == len(cfg['scenes']), 'DUR and episode.json scenes differ in count'
KN, PLACE, TOTAL = plan(DUR)
json.dump(KN, open(f'{EP}/warp.json', 'w'))

def at(scene, old_t):
    starts = [0]
    for k in KN: starts.append(starts[-1] + k[-1][1])
    k = KN[scene]
    for j in range(1, len(k)):
        (o0, n0), (o1, n1) = k[j-1], k[j]
        if old_t <= o1 or j == len(k) - 1:
            f = 0 if o1 == o0 else (old_t - o0) / (o1 - o0)
            return starts[scene] + n0 + (n1 - n0) * min(max(f, 0), 1)

def render(idx):
    out = []
    with sync_playwright() as p:
        b, pg, errs = open_page(p); pg.evaluate('kn=>setWarp(kn)', KN)
        scenes = pg.evaluate('SCENES')
        if idx == 'stills':
            for T in sys.argv[3:]:
                d = pg.evaluate(f'frame({T})'); open(f'{EP}/still_{T}.jpg', 'wb').write(base64.b64decode(d.split(',')[1]))
        else:
            for i in idx:
                s, e = scenes[i]; n = round((e - s) * FPS); tmp = f'{EP}/scenes/s{i}.tmp.mp4'
                ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg', '-i', '-',
                                       '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', str(FPS), tmp], stdin=subprocess.PIPE)
                for f in range(n):
                    d = pg.evaluate(f'frame({s + f / FPS})'); ff.stdin.write(base64.b64decode(d.split(',')[1]))
                ff.stdin.close()
                if ff.wait() == 0: os.rename(tmp, f'{EP}/scenes/s{i}.mp4')
        b.close()
    if errs: print('PAGE ERRORS', errs[:5])

if len(sys.argv) > 2 and sys.argv[2] == '--stills':
    render('stills'); print('stills written'); sys.exit(0)

os.makedirs(f'{EP}/scenes', exist_ok=True)
n = len(DUR); groups = [list(range(0, n, 2)), list(range(1, n, 2))]
with ThreadPoolExecutor(2) as ex: list(ex.map(render, groups))
open(f'{EP}/list.txt', 'w').write(''.join(f"file 'scenes/s{i}.mp4'\n" for i in range(n)))
sh('ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{EP}/list.txt', '-c', 'copy', f'{EP}/joined.mp4')

# ---------- background: tanpura drone, bells, flute (all synthesized, no licence needed) ----------
N = int(TOTAL * SR) + SR; t = np.arange(N) / SR; rng = np.random.default_rng(7)
def pluck(f, d=4.0):
    tt = np.arange(int(d * SR)) / SR; s = np.zeros_like(tt)
    for h in range(1, 14): s += (1 / h) * (1 if h < 4 else .6) * np.sin(2*np.pi*f*h*tt + rng.uniform(0, 6.28)) * np.exp(-tt*(0.6 + 0.25*h))
    return s * np.minimum(1, tt / 0.01)
bg = np.zeros(N)
if cfg.get('drone', True):
    dr = np.zeros(N); t0, i = 0.0, 0
    while t0 < TOTAL:
        f = [110.0, 146.83, 146.83, 73.42][i % 4]; nt = pluck(f); a = int(t0*SR); b2 = min(N, a + len(nt)); dr[a:b2] += nt[:b2-a]
        t0 += 0.9 * (1.6 if i % 4 == 3 else 1); i += 1
    pad = (0.25*np.sin(2*np.pi*146.83*t) + 0.15*np.sin(2*np.pi*220*t) + 0.12*np.sin(2*np.pi*73.42*t)) * (0.6 + 0.4*np.sin(2*np.pi*t/9))
    dr = dr / np.max(np.abs(dr)) * 0.8 + pad * 0.35
    bg += dr * np.minimum(1, t/2.5) * np.minimum(1, (TOTAL - t).clip(0)/2.5) * 10**(-27/20)
def bell(d=5.0, f=523.0):
    tt = np.arange(int(d*SR))/SR; s = np.zeros_like(tt)
    for r, a, dc in [(1,1,1.2),(2,.5,1.6),(2.76,.4,2),(5.4,.25,3),(8.9,.12,4)]: s += a*np.sin(2*np.pi*f*r*tt)*np.exp(-tt*dc)
    return s / 2.2
for sc, ot in cfg.get('bells', []):
    bl = bell(); a = int(at(sc, ot)*SR); b2 = min(N, a+len(bl)); bg[a:b2] += bl[:b2-a] * 10**(-27/20)
def fnote(f, d):
    tt = np.arange(int(d*SR))/SR; ph = 2*np.pi*np.cumsum(f*(1 + 0.006*np.sin(2*np.pi*5.2*tt)*np.minimum(1, tt/0.35)))/SR
    br = np.convolve(rng.normal(0, 1, len(tt)), np.ones(30)/30, 'same')
    return ((np.sin(ph) + .18*np.sin(2*ph) + .06*np.sin(3*ph))*.85 + br*.25) * np.minimum(1, tt/.12) * np.minimum(1, (d-tt)/.25).clip(0)
NOTES = {'S':587.33,'R':659.25,'G':739.99,'P':880.0,'D':987.77,"S'":1174.66,'d':493.88}
PHR = [[('S',.6),('R',.4),('G',.9),('P',.5),('G',.4),('R',.5),('S',1.2)],[('P',.5),('D',.5),("S'",1),('D',.4),('P',.5),('G',.9)],[('G',.4),('P',.4),('D',.8),('P',.5),('G',.5),('R',.4),('S',1.3)]]
fl = np.zeros(N)
for sc, a_, b_ in cfg.get('flute', []):
    t0, k = at(sc, a_), 0; tb = at(sc, b_)
    while t0 < tb - 1:
        for nm, d in PHR[k % 3]:
            if t0 + d > tb: break
            x = fnote(NOTES[nm], d*1.25); a = int(t0*SR); b2 = min(N, a+len(x)); fl[a:b2] += x[:b2-a]; t0 += d*1.2
        t0 += 1.4; k += 1
if np.max(np.abs(fl)) > 0: bg += fl/np.max(np.abs(fl)) * 10**(-23/20)
st = np.clip(np.stack([bg, np.roll(bg, int(.012*SR))*.95], 1), -1, 1)
with wave.open(f'{EP}/bg_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
sh('ffmpeg', '-loglevel', 'error', '-y', '-i', f'{EP}/bg_raw.wav', '-af', 'aecho=0.8:0.7:60|140|260:0.35|0.25|0.15,lowpass=f=7000', f'{EP}/bg.wav')

# ---------- mix: voices + CC0 sound effects + background ----------
META = {s['id']: s for s in json.load(open(f'{SFX}/sounds.json'))['sounds']}
EV = [tuple(e) for e in cfg.get('sfx', [])]
if cfg.get('page_turn', True): EV += [(i, 0.0, 'props-page-turn', 0) for i in range(1, n)]
args = ['ffmpeg', '-loglevel', 'error', '-y']; fl_ = []; k = 0
for c, tt in PLACE:
    args += ['-i', f'{EP}/vo/{c}.wav']; fl_.append(f'[{k}]aresample={SR},aformat=channel_layouts=stereo,adelay={int(tt*1000)}:all=1[v{k}]'); k += 1
nv = k
for sc, ot, sid, g in EV:
    m = META[sid]; sync = m['duration'] if sid.startswith('riser') else m['sync']['at']
    tt = max(0, at(sc, ot) - sync); db = m.get('under_voiceover_db', -6) + g - 4
    args += ['-i', f"{SFX}/{m['file']}"]; fl_.append(f'[{k}]aresample={SR},aformat=channel_layouts=stereo,volume={db}dB,adelay={int(tt*1000)}:all=1[s{k}]'); k += 1
args += ['-i', f'{EP}/bg.wav']; fl_.append(f'[{k}]aresample={SR},aformat=channel_layouts=stereo[bg]')
fl_.append(''.join(f'[v{i}]' for i in range(nv)) + f'amix=inputs={nv}:normalize=0:dropout_transition=0[vo]')
fl_.append(''.join(f'[s{i}]' for i in range(nv, k)) + f'amix=inputs={k-nv}:normalize=0:dropout_transition=0[fx]')
fl_.append('[vo][fx][bg]amix=inputs=3:normalize=0:dropout_transition=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
args += ['-filter_complex', ';'.join(fl_), '-map', '[out]', '-ar', str(SR), f'{EP}/mix.wav']
sh(*args)
V = dur(f'{EP}/joined.mp4')
sh('ffmpeg', '-loglevel', 'error', '-y', '-i', f'{EP}/joined.mp4', '-i', f'{EP}/mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
   '-af', 'apad', '-c:a', 'aac', '-b:a', '192k', '-t', f'{V}', '-movflags', '+faststart', f'{EP}/video.mp4')
for f in ['joined.mp4', 'mix.wav', 'bg_raw.wav', 'bg.wav', 'list.txt', 'page.html']:
    try: os.remove(f'{EP}/{f}')
    except FileNotFoundError: pass
sh('rm', '-rf', f'{EP}/scenes')
print(f'done {EP}/video.mp4 {V:.1f}s, {os.path.getsize(EP + "/video.mp4")/1e6:.1f} MB')
