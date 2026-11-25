# Kathabastu (कथाबस्तु) — episode playbook

Each run makes ONE new Nepali 2D animated short (60–90 s, 1080×1920) and posts it to
YouTube Shorts and TikTok. Follow these steps in order. Work in a clone of this repo.

## 0. Setup (every run starts in a fresh workspace)
First call the `add_repo` tool with owner `karkiamrit`, repo `kathabastu-shorts`, access `push`
(needed to push the episode; if it is refused, report and stop before making anything).
```
git clone https://github.com/karkiamrit/kathabastu-shorts.git ks && cd ks
git clone --depth 1 https://github.com/wyzowl/sfx-kit.git /tmp/sfx-kit   # CC0 sound effects
pip install --break-system-packages playwright numpy >/dev/null; python3 -m playwright install chromium >/dev/null
```
ffmpeg must be present (`which ffmpeg`; install with apt if missing).

## 1. Credit gate (ElevenLabs)
Call the ElevenLabs `account_get_usage`. `remaining = character_limit - character_count`.
A typical episode uses 700–1,000 characters. If `remaining < 1500`, STOP: post nothing,
make nothing, and tell the user in one line that this run was skipped for credits and when
they reset (`next_character_count_reset_unix`). The next scheduled run tries again.

## 2. Research what is trending (10–15 min of searching, no more)
- WebSearch (several queries, mode "standard", "extended" if thin): trending animated / 2D /
  cartoon YouTube Shorts and TikToks in Nepal and India this week; Nepali "what if" shorts;
  mythology animation shorts; Nepali festivals or news hooks coming up in the next 2 weeks
  (Dashain, Tihar, Chhath, Holi, Teej, Buddha Jayanti, Indra Jatra, cricket/football moments,
  exam season, monsoon, etc.).
- Note 3–5 top reference videos (title, channel, why it works: hook, format, length).
- Read `episodes/index.json` and do NOT repeat a topic or the same "what if" twist.
- Pick ONE original concept that fits the channel: Nepali-language storytelling,
  "यदि … भए?" what-ifs, folk tales, mythology retold respectfully, everyday Nepali life humour.
  Use references for format and energy only. Never copy another creator's script, characters,
  art, title wording or audio.

### Content rules (hard)
- No real, named public figures (sportspeople, politicians, celebrities) as characters or
  named in the story; use original characters instead (see the Nemraj episode idea).
- No copyrighted characters, brands, logos, film/TV/game IP, song lyrics or melodies.
- Deities and religious stories: reverent and accurate to the tradition; humour may come
  from the situation, never mocks a deity, a faith or a community. End warmly.
- Nothing political, communal, hateful, sexual, violent-gory, medical/financial advice,
  or misinformation. Facts stated as facts must be true.
- Suitable for all ages, but upload with made_for_kids = false.

## 3. Script (Nepali, Devanagari)
- 6–8 scenes, 12–20 spoken lines total, each line ≤ ~60 characters (long lines fail on the
  ElevenLabs free tier). Hook question in the first 2 seconds. End with a comment prompt.
- Voices (ElevenLabs voice ids):
  - Narrator (always): Ram `y0MwmNFdzDdYeB1EYYkk`
  - Young/playful male: Ashok `dn3M2FqG5VIRePAJqGHz` · Young male: Aswin `9P6nFewEyR3y0aY0G6Bs`
  - Deep elder / villain: Abi `VfsxF66VGZk4V1ei06Bi`
  - Female: Sarita `ljCTqT1biPnI7ZjS5gyi` · Expressive female: Kaanchi `BTUIboFmihb87sfmikzP`
  - Model `eleven_v3`, `generations_count` 1. Audio tags like `[excited]`, `[playful]` allowed.

## 4. Voices
Create one ElevenLabs flow for the episode. Generate lines STRICTLY ONE AT A TIME:
generate → wait ~6 s → `creative_get_generations` → download `full_res_url` with curl into
`episodes/<slug>/el/<clip>.mp3` → next line. If a call says "busy", wait 60 s and retry that
same line, at most 3 times per line; if still busy, stop the run and report (nothing posted).
Then trim silence into `vo/`:
```
ffmpeg -i el/X.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse" -ar 44100 -ac 1 vo/X.wav
```

## 5. Animate: write `episodes/<slug>/story.js` and `episode.json`
Copy the structure of `episodes/2026-11-24-krishna-ramayan/` (comic-book style) or design a
new look (folk-art style like the Nemraj video). Scene functions `c0..cN(t)` draw with the
helpers; finish with `const DUR=[...],FN=[c0,...];` (DUR = planned seconds per scene).

Helpers available (engine/helpers.js, engine/comic.js):
- shapes: `circ, ell, rr, poly, line, limb, grad, txt, wrap, ss (smoothstep), lerp, rnd`
- comic: `page(), panel(x,y,w,h,t,t0,fn,{tilt}), caption(text,x,y,maxW,t0,t1,t), bubble(text,x,y,tailX,tailY,t0,t1,t,name), burst(text,x,y,r,t0,t1,t), speed(...), rays2(cx,cy,c1,c2,n,t), note(...)`
- folk-art: `border(), sun, peak/range, terraces, flags (prayer flags), birds, cloud, house, wall`
- characters: `boy(...)` (kid, poses: run/kick/arms up/back view with jersey), `woman, father, goat,
  krishna, ram, ravan (sage:true for disguise), hanuman, deer, tree, hut, palace, chariot, flagH, lanka`
- Add new characters/props in story.js when the story needs them (flat shapes, 6–8 px ink
  outlines, bold colours). Keep everything original.
Layout rules: canvas 1080×1920; keep text between y=150 and y=1600 (TikTok UI covers the
bottom ~320 px and the right ~120 px); captions ≥ 46 px; every spoken line also appears on
screen (caption or bubble) so the video works on mute.

`episode.json`: `scenes[i].cues` = `[[oldTime, ["clipName"...]], ...]` matching when each
caption/bubble appears in scene i; `sfx` = `[[scene, oldTime, "sfx-kit id", gainDb], ...]`
(ids from /tmp/sfx-kit/sounds.json: whooshes, pops, impacts, risers, shimmers, celebration,
cinematic hits, foley-paper-slide, appear-poof, sting-*); `bells`, `flute` (spans where a
flute is on screen), `drone` true, `page_turn` true for comic style.
The builder stretches scenes so every voice line fits; you never need to time audio by hand.

Check before the full render: `python3 build.py episodes/<slug> --stills 3 15 30 45 60`,
build a contact sheet with ffmpeg xstack, LOOK at it, fix overlaps/clipping/illegible text.
Then `python3 build.py episodes/<slug>` → `episodes/<slug>/video.mp4`.

## 6. SEO pack (write to `episodes/<slug>/meta.json`)
- `title` (≤ 95 chars): Nepali hook question + 1–2 emojis + English keyword tail, e.g.
  `यदि कृष्णजी रामायणमा भएको भए? 🦚 | What if Krishna was in Ramayan #shorts`
- `description`: 3–5 short lines Nepali + 1–2 lines English summary, a comment question,
  "Voices: ElevenLabs", then 10–15 hashtags mixing Nepali + English + niche
  (#कथाबस्तु #kathabastu #nepali #nepalitiktok #shorts #animation #whatif + topic tags).
- `tags` (YouTube, 12–20): topic words in English and romanised Nepali.
- `tiktok_caption` (≤ 2,000 chars): hook line, 2 lines story, question, 8–15 hashtags.
- Post time: the run fires in the Nepal evening, which is prime time; post immediately.

## 7. Publish
1. Commit `episodes/<slug>/` (story.js, episode.json, meta.json, vo/, video.mp4; not el/ or
   stills) and update `episodes/index.json` (slug, date, title, concept, references). Push to
   main. Public file URL:
   `https://raw.githubusercontent.com/karkiamrit/kathabastu-shorts/main/episodes/<slug>/video.mp4`
   Confirm it returns HTTP 200 and the right size (curl -I) before posting.
2. YouTube (Windsor.ai for Social Media, connector `youtube`, account `122057`):
   `execute_action` `upload_video` with video_url, title, description, tags, category_id "1"
   (Film & Animation), made_for_kids false, privacy_status "public". Record the video id/url.
3. TikTok: if the Buffer connector is available, use it to post the same video URL with
   `tiktok_caption` to the Kathabastu TikTok channel. If Buffer is not connected, send the
   video file and caption to the user instead (SendUserFile + message) so they can post it.
4. Add the YouTube/TikTok links to index.json, commit, push.

## 8. Report
Send the user one short message: concept + why (trend reference), YouTube link, TikTok
status, characters used and ElevenLabs credits left. Attach video.mp4.
If anything failed, say exactly which step and that nothing else was posted.
