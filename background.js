/* Genki Manga — Japanese Study New Tab
 * background.js — MV3 service worker (no DOM access).
 *
 * Responsibilities:
 *  - schedule / re-schedule the daily study reminder alarm
 *  - show a motivational notification when the alarm fires
 *  - handle notification clicks (open the study tab or the source)
 *  - react to settings changes coming from the popup / new tab
 *
 * All Chrome API use is feature-detected so this file can also be loaded
 * in a normal page for preview purposes without throwing.
 */

var GM_SETTINGS_KEY = 'gm_settings';
var GM_PROGRESS_KEY = 'gm_progress';
var GM_ALARM_NAME = 'gm-daily-reminder';

var GM_DEFAULT_SETTINGS = {
  reminderEnabled: true,
  reminderTime: '09:00',
  bg: 0,
  character: 0,
  name: 'Gakusei'
};

var GM_DEFAULT_PROGRESS = {
  xp: 0,
  streak: 0,
  lastStudy: null,
  completed: {},
  dayTasks: {},
  confidence: {},
  startDate: null
};

var GM_HAS = {
  alarms: typeof chrome !== 'undefined' && !!(chrome.alarms && chrome.alarms.create && chrome.alarms.clear),
  notifications: typeof chrome !== 'undefined' && !!(chrome.notifications && chrome.notifications.create),
  storage: typeof chrome !== 'undefined' && !!(chrome.storage && chrome.storage.local),
  runtime: typeof chrome !== 'undefined' && !!chrome.runtime,
  tabs: typeof chrome !== 'undefined' && !!(chrome.tabs && chrome.tabs.create)
};

/* ------------------------------------------------------------------ */
/* Shared data (data/genki.js)                                          */
/* ------------------------------------------------------------------ */

var GENKI = null;
try {
  if (typeof importScripts === 'function') {
    // data/genki.js publishes globalThis.GENKI (service workers have no window).
    importScripts('data/genki.js');
    GENKI = (typeof globalThis !== 'undefined' && globalThis.GENKI) || null;
  }
} catch (e) {
  GENKI = null;
}

/* ------------------------------------------------------------------ */
/* Storage (chrome.storage.local with localStorage fallback)           */
/* ------------------------------------------------------------------ */

function gmReadKey(key, defaults, cb) {
  if (GM_HAS.storage) {
    try {
      chrome.storage.local.get(key, function (res) {
        var stored = res && res[key];
        cb(gmMerge(defaults, stored));
      });
      return;
    } catch (e) { /* fall through to preview fallback */ }
  }
  var value = null;
  try { value = JSON.parse(localStorage.getItem(key)); } catch (e) { value = null; }
  cb(gmMerge(defaults, value));
}

function gmMerge(defaults, stored) {
  var out = {};
  var k;
  for (k in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, k)) out[k] = defaults[k];
  }
  if (stored && typeof stored === 'object') {
    for (k in stored) {
      if (Object.prototype.hasOwnProperty.call(stored, k)) out[k] = stored[k];
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

/** Next local-time occurrence of "HH:MM" (tomorrow if it already passed). */
function gmNextOccurrenceMs(timeStr, now) {
  var source = now instanceof Date ? now : new Date();
  var match = /^(\d{1,2}):(\d{2})$/.exec(String(timeStr || '09:00').trim());
  var hh = match ? parseInt(match[1], 10) : 9;
  var mm = match ? parseInt(match[2], 10) : 0;
  if (isNaN(hh) || hh < 0 || hh > 23) hh = 9;
  if (isNaN(mm) || mm < 0 || mm > 59) mm = 0;

  var when = new Date(source.getFullYear(), source.getMonth(), source.getDate(), hh, mm, 0, 0);
  if (when.getTime() <= source.getTime()) when.setDate(when.getDate() + 1);
  return when.getTime();
}

/** First uncompleted day, clamped to the number of available days. */
function gmNextDay(progress, total) {
  var completed = (progress && progress.completed) || {};
  var day = 1;
  while (day <= total && completed[day]) day++;
  return day > total ? total : day;
}

function gmOpenUrl(url) {
  if (!url) return;
  if (GM_HAS.tabs) {
    try { chrome.tabs.create({ url: url }); return; } catch (e) { /* fallback */ }
  }
  if (typeof window !== 'undefined' && window.open) {
    try { window.open(url, '_blank'); } catch (e) { /* no window in a worker */ }
  }
}

/* ------------------------------------------------------------------ */
/* Alarm scheduling                                                     */
/* ------------------------------------------------------------------ */

function gmSetupAlarm() {
  if (!GM_HAS.alarms) return;
  gmReadKey(GM_SETTINGS_KEY, GM_DEFAULT_SETTINGS, function (settings) {
    // Always clear first so we never end up with duplicate alarms.
    try { chrome.alarms.clear(GM_ALARM_NAME, function () {}); } catch (e) { /* noop */ }
    if (!settings.reminderEnabled) return;

    var when = gmNextOccurrenceMs(settings.reminderTime, new Date());
    try { chrome.alarms.create(GM_ALARM_NAME, { when: when }); } catch (e) { /* noop */ }
  });
}

/* ------------------------------------------------------------------ */
/* Event wiring                                                         */
/* ------------------------------------------------------------------ */

if (GM_HAS.alarms && chrome.alarms.onAlarm) {
  chrome.alarms.onAlarm.addListener(function (alarm) {
    if (!alarm || alarm.name !== GM_ALARM_NAME) return;

    gmReadKey(GM_SETTINGS_KEY, GM_DEFAULT_SETTINGS, function () {
      gmReadKey(GM_PROGRESS_KEY, GM_DEFAULT_PROGRESS, function (progress) {
        var days = (GENKI && Array.isArray(GENKI.DAYS)) ? GENKI.DAYS : [];
        var total = days.length || 30;
        var nextDay = gmNextDay(progress, total);
        var dayData = days[nextDay - 1] || {};
        var title = dayData.title || dayData.jp || 'your Japanese lesson';
        var streak = Number(progress.streak) || 0;

        var message = 'Day ' + nextDay + ': ' + title +
          ' — streak ' + streak + '\uD83D\uDD25 · let\'s go!';

        if (GM_HAS.notifications) {
          try {
            chrome.notifications.create('gm-daily', {
              type: 'basic',
              iconUrl: (GM_HAS.runtime && chrome.runtime.getURL)
                ? chrome.runtime.getURL('assets/icon128.png') : 'assets/icon128.png',
              title: '\uD83C\uDF38 今日のげんき！ Time to study!',
              message: message,
              badge: '\uD83C\uDF38',
              priority: 1
            });
          } catch (e) { /* notification API unavailable at this moment */ }
        }
      });
    });

    // Schedule tomorrow's reminder right away.
    gmSetupAlarm();
  });
}

if (GM_HAS.notifications && chrome.notifications.onClicked) {
  chrome.notifications.onClicked.addListener(function (id) {
    try { chrome.notifications.clear(id); } catch (e) { /* noop */ }

    if (id === 'gm-source') {
      gmOpenUrl((GENKI && GENKI.SOURCE_URL) || '');
      return;
    }
    if (id === 'gm-daily') {
      var newtabUrl = (GM_HAS.runtime && chrome.runtime.getURL)
        ? chrome.runtime.getURL('newtab.html')
        : 'newtab.html';
      gmOpenUrl(newtabUrl);
    }
  });
}

if (GM_HAS.storage && chrome.storage.onChanged) {
  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName && areaName !== 'local') return;
    if (changes && changes.gm_settings) gmSetupAlarm();
  });
}

if (GM_HAS.runtime) {
  if (chrome.runtime.onInstalled) chrome.runtime.onInstalled.addListener(gmSetupAlarm);
  if (chrome.runtime.onStartup) chrome.runtime.onStartup.addListener(gmSetupAlarm);
}

// Re-assert the alarm on every service worker wake-up (install/startup
// listeners above plus this defensive call cover all MV3 restart cases).
gmSetupAlarm();
