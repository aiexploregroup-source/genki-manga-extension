/* Genki Manga — popup logic.
 * Uses the same gm_settings / gm_progress storage contract as background.js
 * and mirrors the alarm scheduling so the popup never waits for the worker.
 */

(function () {
  'use strict';

  var SETTINGS_KEY = 'gm_settings';
  var PROGRESS_KEY = 'gm_progress';
  var ALARM_NAME = 'gm-daily-reminder';

  var DEFAULT_SETTINGS = {
    reminderEnabled: true,
    reminderTime: '09:00',
    bg: 0,
    character: 0,
    name: 'Gakusei'
  };

  var DEFAULT_PROGRESS = {
    xp: 0,
    streak: 0,
    lastStudy: null,
    completed: {},
    dayTasks: {},
    confidence: {},
    startDate: null
  };

  var HAS = {
    storage: typeof chrome !== 'undefined' && !!(chrome.storage && chrome.storage.local),
    alarms: typeof chrome !== 'undefined' && !!(chrome.alarms && chrome.alarms.create && chrome.alarms.clear),
    notifications: typeof chrome !== 'undefined' && !!(chrome.notifications && chrome.notifications.create),
    runtime: typeof chrome !== 'undefined' && !!chrome.runtime,
    tabs: typeof chrome !== 'undefined' && !!(chrome.tabs && chrome.tabs.create)
  };

  var GENKI = (typeof window !== 'undefined' && window.GENKI) || {};
  var SOURCE_URL = GENKI.SOURCE_URL || 'https://genki.japantimes.co.jp/';

  var FALLBACK_VOCAB = [
    { jp: 'こんにちは', reading: 'konnichiwa', en: 'hello' },
    { jp: 'ありがとう', reading: 'arigatou', en: 'thank you' },
    { jp: 'おはよう', reading: 'ohayou', en: 'good morning' },
    { jp: 'さようなら', reading: 'sayounara', en: 'goodbye' },
    { jp: 'はい', reading: 'hai', en: 'yes' },
    { jp: 'いいえ', reading: 'iie', en: 'no' }
  ];

  var FILLER_MEANINGS = [
    'hello', 'thank you', 'good morning', 'goodbye', 'yes', 'no',
    'water', 'rice', 'book', 'friend', 'teacher', 'student'
  ];

  var settings = null;
  var progress = null;
  var correctAnswer = null;
  var quizAnswered = false;

  function $(id) { return document.getElementById(id); }

  /* ---------------------------------------------------------------- */
  /* Storage helpers (chrome.storage.local with localStorage fallback)  */
  /* ---------------------------------------------------------------- */

  function mergeDefaults(defaults, stored) {
    var out = {};
    var key;
    for (key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key)) out[key] = defaults[key];
    }
    if (stored && typeof stored === 'object') {
      for (key in stored) {
        if (Object.prototype.hasOwnProperty.call(stored, key)) out[key] = stored[key];
      }
    }
    return out;
  }

  function readKey(key, defaults, cb) {
    if (HAS.storage) {
      try {
        chrome.storage.local.get(key, function (res) {
          cb(mergeDefaults(defaults, res && res[key]));
        });
        return;
      } catch (e) { /* fall through for preview */ }
    }
    var value = null;
    try { value = JSON.parse(localStorage.getItem(key)); } catch (e) { value = null; }
    cb(mergeDefaults(defaults, value));
  }

  function writeKey(key, value) {
    if (HAS.storage) {
      try {
        var payload = {};
        payload[key] = value;
        chrome.storage.local.set(payload);
        return;
      } catch (e) { /* fall through for preview */ }
    }
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
  }

  /* ---------------------------------------------------------------- */
  /* Data helpers                                                      */
  /* ---------------------------------------------------------------- */

  function getDays() {
    return GENKI && Array.isArray(GENKI.DAYS) ? GENKI.DAYS : [];
  }

  function currentDayNumber() {
    var days = getDays();
    var total = days.length || 30;
    var completed = (progress && progress.completed) || {};
    var day = 1;
    while (day <= total && completed[day]) day++;
    return day > total ? total : day;
  }

  function completedCount(total) {
    var completed = (progress && progress.completed) || {};
    var count = 0;
    for (var day = 1; day <= total; day++) {
      if (completed[day]) count++;
    }
    return count;
  }

  function computeRank(xp) {
    var ranks = GENKI && GENKI.RANKS;
    if (Array.isArray(ranks) && ranks.length) {
      var chosen = ranks[0];
      for (var i = 0; i < ranks.length; i++) {
        var entry = ranks[i];
        var min = entry && typeof entry === 'object'
          ? Number(entry.min != null ? entry.min : (entry.xp != null ? entry.xp : (entry.required != null ? entry.required : (entry.threshold != null ? entry.threshold : 0))))
          : -Infinity;
        if (!isNaN(min) && xp >= min) chosen = entry;
      }
      if (chosen && typeof chosen === 'object') {
        return chosen.name || chosen.title || chosen.rank || chosen.label || 'Gakusei';
      }
      if (typeof chosen === 'string') return chosen;
    }

    if (ranks && typeof ranks === 'object') {
      var best = null;
      var bestMin = -1;
      Object.keys(ranks).forEach(function (key) {
        var min = Number(key);
        if (!isNaN(min) && xp >= min && min > bestMin) {
          bestMin = min;
          best = ranks[key];
        }
      });
      if (best != null) {
        return typeof best === 'string' ? best : (best.name || best.title || best.rank || 'Gakusei');
      }
    }

    if (xp >= 1500) return 'Ninja';
    if (xp >= 800) return 'Sensei';
    if (xp >= 300) return 'Senpai';
    if (xp >= 100) return 'Kouhai';
    return 'Gakusei';
  }

  /* ---------------------------------------------------------------- */
  /* Rendering                                                         */
  /* ---------------------------------------------------------------- */

  function renderStats() {
    var xp = Number(progress.xp) || 0;
    var streak = Number(progress.streak) || 0;
    $('streakNum').textContent = streak;
    $('xpNum').textContent = xp;
    $('rankName').textContent = computeRank(xp);
  }

  function renderMission() {
    var days = getDays();
    var total = days.length || 30;
    var day = currentDayNumber();
    var data = days[day - 1] || {};

    $('dayNum').textContent = day;
    $('dayEmoji').textContent = data.emoji || '\uD83C\uDF38';
    $('dayTitle').textContent = data.title || 'Today\'s Japanese lesson';
    $('dayJp').textContent = data.jp || '';
    $('dayStage').textContent = data.stage || 'N5';

    var done = Math.min(completedCount(total), total);
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    $('progressText').textContent = done + ' / ' + total;
    $('progressFill').style.width = pct + '%';
    $('progressTrack').setAttribute('aria-valuenow', done);
    $('progressTrack').setAttribute('aria-valuemax', total);
  }

  /* ---------------------------------------------------------------- */
  /* Reminder controls                                                 */
  /* ---------------------------------------------------------------- */

  function nextOccurrence(timeStr, now) {
    var source = now instanceof Date ? now : new Date();
    var match = /^(\d{1,2}):(\d{2})$/.exec(String(timeStr || '09:00').trim());
    var hh = match ? parseInt(match[1], 10) : 9;
    var mm = match ? parseInt(match[2], 10) : 0;
    if (isNaN(hh) || hh < 0 || hh > 23) hh = 9;
    if (isNaN(mm) || mm < 0 || mm > 59) mm = 0;

    var when = new Date(source.getFullYear(), source.getMonth(), source.getDate(), hh, mm, 0, 0);
    if (when.getTime() <= source.getTime()) when.setDate(when.getDate() + 1);
    return when;
  }

  function describeWhen(when) {
    var now = new Date();
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var label = (when.getFullYear() === tomorrow.getFullYear() &&
                 when.getMonth() === tomorrow.getMonth() &&
                 when.getDate() === tomorrow.getDate()) ? 'tomorrow' : 'today';
    return label + ' ' + when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function updateReminderStatus() {
    var el = $('reminderStatus');
    if (!settings || !settings.reminderEnabled) {
      el.textContent = 'Reminder is off — toggle it on!';
      return;
    }

    if (HAS.alarms && chrome.alarms.get) {
      try {
        chrome.alarms.get(ALARM_NAME, function (alarm) {
          if (alarm && alarm.scheduledTime) {
            el.textContent = 'Next reminder: ' + describeWhen(new Date(alarm.scheduledTime));
          } else {
            el.textContent = 'Next reminder: ' + describeWhen(nextOccurrence(settings.reminderTime, new Date()));
          }
        });
        return;
      } catch (e) { /* fall through to local calculation */ }
    }

    el.textContent = 'Next reminder: ' + describeWhen(nextOccurrence(settings.reminderTime, new Date()));
  }

  function scheduleReminderFromPopup() {
    if (!HAS.alarms || !settings) return;
    try {
      chrome.alarms.clear(ALARM_NAME, function () {
        if (!settings.reminderEnabled) return;
        try {
          chrome.alarms.create(ALARM_NAME, {
            when: nextOccurrence(settings.reminderTime, new Date()).getTime()
          });
        } catch (e) { /* noop */ }
      });
    } catch (e) { /* noop */ }
  }

  function notificationMessage() {
    var days = getDays();
    var total = days.length || 30;
    var nextDay = currentDayNumber();
    var title = (days[nextDay - 1] && days[nextDay - 1].title) || 'your Japanese lesson';
    var streak = (progress && Number(progress.streak)) || 0;
    return 'Day ' + nextDay + ': ' + title + ' — streak ' + streak + '\uD83D\uDD25 · let\'s go!';
  }

  function testNotification() {
    var options = {
      type: 'basic',
      iconUrl: 'assets/icon128.png',
      title: '\uD83C\uDF38 今日のげんき！ Time to study!',
      message: notificationMessage()
    };
    if (HAS.notifications) {
      try {
        chrome.notifications.create('gm-daily', options);
        return;
      } catch (e) { /* fall through to alert preview */ }
    }
    if (typeof alert === 'function') alert(options.title + '\n\n' + options.message);
  }

  /* ---------------------------------------------------------------- */
  /* Mini quiz                                                         */
  /* ---------------------------------------------------------------- */

  function normalizeVocab(item, key) {
    var out = { jp: '', reading: '', en: '' };
    if (item == null) return null;

    if (typeof item === 'string') {
      var parts = item.split(/\s*[|＝=—–]\s*|\s+-\s+/);
      if (parts.length > 1) {
        out.jp = parts[0].trim();
        out.en = parts.slice(1).join(' ').trim();
      } else {
        out.en = item.trim();
        out.jp = key || '';
      }
    } else if (Array.isArray(item)) {
      out.jp = String(item[0] || key || '').trim();
      out.en = String(item[1] || '').trim();
      out.reading = String(item[2] || '').trim();
    } else if (typeof item === 'object') {
      out.jp = String(item.jp || item.japanese || item.word || item.kanji || item.front || item.term || key || '').trim();
      out.en = String(item.en || item.english || item.meaning || item.translation || item.def || item.back || '').trim();
      out.reading = String(item.reading || item.kana || item.hiragana || item.furigana || '').trim();
    }

    return (out.jp || out.en) ? out : null;
  }

  function collectVocab() {
    var pool = [];
    getDays().forEach(function (day) {
      var vocab = day && day.vocab;
      if (!vocab) return;
      if (Array.isArray(vocab)) {
        vocab.forEach(function (item) {
          var normalized = normalizeVocab(item);
          if (normalized && normalized.en) pool.push(normalized);
        });
      } else if (typeof vocab === 'object') {
        Object.keys(vocab).forEach(function (key) {
          var normalized = normalizeVocab(vocab[key], key);
          if (normalized && normalized.en) pool.push(normalized);
        });
      }
    });
    return pool;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function answerQuestion(button, choice) {
    if (quizAnswered) return;
    quizAnswered = true;

    var isCorrect = choice === correctAnswer;
    var feedback = $('quizFeedback');
    var choices = $('quizChoices');

    if (isCorrect) {
      button.classList.add('correct');
      feedback.textContent = 'せいかい！ Correct! +2 XP';
      progress.xp = (Number(progress.xp) || 0) + 2;
      writeKey(PROGRESS_KEY, progress);
      renderStats();
    } else {
      button.classList.add('wrong');
      Array.prototype.forEach.call(choices.children, function (child) {
        if (child.textContent === correctAnswer) child.classList.add('correct');
      });
      feedback.textContent = 'ちがいます！ Answer: ' + correctAnswer;
    }

    Array.prototype.forEach.call(choices.children, function (child) {
      child.disabled = true;
    });

    setTimeout(loadQuiz, 1600);
  }

  function loadQuiz() {
    var pool = collectVocab();
    if (pool.length < 4) pool = FALLBACK_VOCAB.slice();

    var correct = pool[Math.floor(Math.random() * pool.length)];
    correctAnswer = correct.en;
    quizAnswered = false;

    var choices = [correct.en];
    var seen = {};
    seen[correct.en.toLowerCase()] = true;

    var guard = 0;
    while (choices.length < 4 && guard < 300) {
      guard++;
      var candidate = pool[Math.floor(Math.random() * pool.length)];
      var answer = candidate.en;
      if (!answer || seen[answer.toLowerCase()]) continue;
      seen[answer.toLowerCase()] = true;
      choices.push(answer);
    }

    while (choices.length < 4) {
      var filler = FILLER_MEANINGS[Math.floor(Math.random() * FILLER_MEANINGS.length)];
      if (seen[filler]) continue;
      seen[filler] = true;
      choices.push(filler);
    }

    shuffle(choices);

    var display = correct.jp + (correct.reading ? '（' + correct.reading + '）' : '');
    $('quizPrompt').textContent = '「' + display + '」 means…';

    var container = $('quizChoices');
    container.innerHTML = '';
    choices.forEach(function (choice) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice';
      button.textContent = choice;
      button.addEventListener('click', function () {
        answerQuestion(button, choice);
      });
      container.appendChild(button);
    });

    $('quizFeedback').textContent = '';
  }

  /* ---------------------------------------------------------------- */
  /* Navigation                                                        */
  /* ---------------------------------------------------------------- */

  function openUrl(url) {
    if (!url) return;
    if (HAS.tabs) {
      try { chrome.tabs.create({ url: url }); return; } catch (e) { /* preview fallback */ }
    }
    if (typeof window !== 'undefined' && window.open) {
      try { window.open(url, '_blank'); } catch (e) { /* noop */ }
    }
  }

  function openStudyTab() {
    var url = (HAS.runtime && chrome.runtime.getURL)
      ? chrome.runtime.getURL('newtab.html')
      : 'newtab.html';
    openUrl(url);
  }

  /* ---------------------------------------------------------------- */
  /* Wiring & init                                                     */
  /* ---------------------------------------------------------------- */

  function wireEvents() {
    $('openStudyBtn').addEventListener('click', openStudyTab);
    $('sourceBtn').addEventListener('click', function () { openUrl(SOURCE_URL); });
    $('testBtn').addEventListener('click', testNotification);

    $('reminderToggle').addEventListener('change', function (event) {
      if (!settings) return;
      settings.reminderEnabled = !!event.target.checked;
      writeKey(SETTINGS_KEY, settings);
      scheduleReminderFromPopup();
      updateReminderStatus();
    });

    $('reminderTime').addEventListener('change', function (event) {
      if (!settings) return;
      settings.reminderTime = event.target.value || '09:00';
      writeKey(SETTINGS_KEY, settings);
      scheduleReminderFromPopup();
      updateReminderStatus();
    });
  }

  function init() {
    readKey(SETTINGS_KEY, DEFAULT_SETTINGS, function (storedSettings) {
      settings = storedSettings;
      $('reminderToggle').checked = !!settings.reminderEnabled;
      $('reminderTime').value = settings.reminderTime || '09:00';
      updateReminderStatus();
    });

    readKey(PROGRESS_KEY, DEFAULT_PROGRESS, function (storedProgress) {
      progress = storedProgress;
      renderStats();
      renderMission();
    });

    wireEvents();
    loadQuiz();
  }

  init();
})();
