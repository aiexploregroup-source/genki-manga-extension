# 🌸 Genki Manga — Japanese Study New Tab

A colorful, fully offline **Chrome extension** that turns your new tab into a manga/anime study dashboard for the **げんき Genki I — 30-Day Manga Study Challenge**.

![manga](https://img.shields.io/badge/design-manga%20%2B%20anime-ff4d8d) ![mv3](https://img.shields.io/badge/manifest-V3-35d6ff) ![genki](https://img.shields.io/badge/course-Genki%20I-ffd93d)

## ✨ Features

- **Manga-designed home tab** — halftone dots, speed lines, speech bubbles, bold outlines, sticker buttons, pop colors.
- **4 hand-drawn anime backgrounds** — Sakura Street, Sunset City, Torii Shrine, Neon Tokyo — switch anytime; animated falling petals/sparkles on top.
- **3 cute chibi study buddies** — Hana, Ken and Mochi. Tap them for a Japanese pep talk (with real `ja-JP` speech synthesis).
- **Genki I 30-day quest** — the exact 30-day map from the source challenge: Intro → Lessons 1–12 → checkpoints → Final Boss.
- **Study tools**:
  - 📇 Flip **flashcards** (per day or mega deck of all words), with example sentences.
  - 🧠 **Boss Quiz** — 10 questions mixing the source's quiz items with generated vocab questions; score 6+ to tick your mission.
  - 🔤 Full **hiragana & katakana charts** — click any kana to hear its pronunciation.
  - 📖 Per-day lesson modal with vocabulary + grammar points, linked to the full Genki source book.
- **Progress that sticks** — XP, 🔥 streak (date-aware), 🏁 stamp per day, ranks from 🐣 Rookie Gakusei to 👑 Genki Legend, and a 30-day map rendered right on the tab.
- **Full daily reminder** — configurable time + on/off toggle; a real Chrome notification every day with your day number and streak. Clicking it opens your study tab. Includes a **Test 🔔** button.
- **Toolbar popup** — quick stats, today's mission, reminder settings, and a mini vocab quiz without leaving your current page.
- **Google search** with a `j: word` shortcut that searches **Jisho** instead.

## 📥 Install (Chrome / Edge / Brave / Vivaldi)

1. Download or clone this folder.
2. Open `chrome://extensions` (Edge: `edge://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select this `genki-manga-extension-v2` folder.
5. Open a **new tab** — your manga dashboard appears. Pin the extension for the popup.

> The extension works fully offline. Google Fonts load when online; system Japanese fonts are used as a fallback. Text-to-speech uses your system's Japanese voice if installed.

## 🎯 How the daily loop works

1. Your new tab shows **Today's Mission** (first unstamped day).
2. Do the 4 tasks: 👀 look, 🗣 say, ✍ write, 🧠 pass the quiz (6+/10).
3. **Stamp the stage** → +50 XP, confetti, day marked ✓ on the map.
4. Set your daily reminder time on the right — a notification nudges you tomorrow.
5. Climb the ranks to 👑 Genki Legend.

## 🔗 Learning source

The 30-day curriculum, day titles, Japanese subtitles and quiz focus come from the Genki I challenge here:
<https://01a19544-304f-7d8b-8930-e35a178a6df6.arena.site/>

The extension links to it from the **📖 Source** button, the quick links panel and each day's detail modal.

## 📁 Structure

```
manifest.json       MV3 config: new tab override, popup, alarms + notifications
newtab.html/css/js  the manga/anime home tab (UI, quizzes, storage, particles)
background.js       daily reminder service worker (chrome.alarms + notifications)
popup.html/css/js   toolbar popup dashboard
data/genki.js       30-day Genki I data, kana charts, vocab, grammar, quizzes, quotes
assets/             anime SVG backgrounds, chibi mascots, extension icons
```

## 🔧 Troubleshooting

- **Reminder didn't fire?** Chrome must be running (service workers don't run when the browser is fully closed). Check the time in the reminder panel and click **Test 🔔**.
- **Japanese text looks off?** Install a Japanese font (e.g. Noto Sans JP) or connect to the internet so Google Fonts can load.
- **No voice?** Install a Japanese text-to-speech voice in your OS speech settings.
- **Reset progress:** ⚙ Settings → Reset all progress.
