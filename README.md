# YouTube Study Mode – Chrome Extension

This Chrome extension removes distractions from YouTube so you can focus while studying. It hides recommendations, comments, shorts, related videos, and includes a timer-based focus mode with alerts.

---

## ✨ Features

- ✅ Toggle Study Mode ON/OFF from popup
- ⏱️ Built-in Study Timer (default 30 minutes, customizable)
    - Alerts 5 minutes before ending
    - Alert when time is up with options to Restart / Extend / Exit Study Mode
- 🚫 Blocks YouTube Shorts completely (even direct links)
- 🔕 Removes:
  - YouTube homepage feed
  - Left sidebar (Guide, subscriptions, explore)
  - Shorts shelf
  - Comments under video
  - Related video sidebar

---

## 📁 Folder Structure

```
study_mode_extension/
 ├── manifest.json
 ├── content.js
 ├── popup.html
 ├── popup.js
 └── styles.css
```

---

## 🔧 Installation (during development)

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (toggle on top right).
4. Click **Load unpacked** and select the `study_mode_extension` folder.
5. Pin the extension icon (optional).
6. Open YouTube and enjoy distraction-free studying!

---

## ✅ How To Use

1. Click on the extension icon.
2. Toggle Study Mode ON (switch).
3. Enter the number of minutes (default is 30).
4. Click **Start Study**.
5. Timer starts, distractions are hidden, Shorts are blocked.
6. When time ends, you'll be alerted and given options to:
   - Restart Timer
   - Extend by 10 min
   - Exit Study Mode

---

## 🚀 Roadmap / Future Ideas

- Set automatic daily study time windows (e.g., 9am–12pm)
- Pomodoro mode
- Dark mode popup styling
- Add extension logo icon in toolbar

---


