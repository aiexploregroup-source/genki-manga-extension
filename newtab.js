/* ============================================================
   GENKI MANGA — new tab logic
   Storage contract (shared with popup + background):
   gm_settings: { reminderEnabled, reminderTime, bg, character, name }
   gm_progress: { xp, streak, lastStudy, completed, dayTasks, confidence, startDate }
   ============================================================ */
(function () {
  "use strict";

  /* ---------- defensive fallbacks (in case data file is missing) ---------- */
  if (!window.GENKI || !Array.isArray(window.GENKI.DAYS)) {
    window.GENKI = {
      SOURCE_URL: "https://01a19544-304f-7d8b-8930-e35a178a6df6.arena.site/",
      DAYS: [{ day: 1, emoji: "✏️", stage: "Intro", title: "Writing System & Sounds", jp: "もじ と おと", vocab: [], grammar: [], quiz: [] }],
      HIRAGANA: [], KATAKANA: [],
      QUOTES: [{ jp: "今日もがんばろう！", en: "Let's do our best today!" }],
      RANKS: [{ min: 0, name: "Rookie Gakusei", emoji: "🐣" }]
    };
  }
  const D = window.GENKI;

  const DEFAULT_SETTINGS = { reminderEnabled: true, reminderTime: "09:00", bg: 0, character: 0, name: "Gakusei" };
  const DEFAULT_PROGRESS = { xp: 0, streak: 0, lastStudy: null, completed: {}, dayTasks: {}, confidence: {}, startDate: null };
  const BACKGROUNDS = [
    { file: "assets/bg-sakura.svg", label: "桜 Sakura Street" },
    { file: "assets/bg-sunset.svg", label: "夕 Sunset City" },
    { file: "assets/bg-shrine.svg", label: "神社 Torii Shrine" },
    { file: "assets/bg-neon.svg", label: "霓 Neon Tokyo" }
  ];
  const MASCOTS = ["assets/chara-hana.svg", "assets/chara-ken.svg", "assets/chara-mochi.svg"];
  const TASK_LABELS = ["👀 Look at every page", "🗣 Say every item out loud", "✍ Write key words 3×", "🧠 Clear the Boss Quiz"];

  /* ---------- storage helpers ---------- */
  const Store = {
    async get(key, fallback) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          const res = await chrome.storage.local.get(key);
          if (res && Object.prototype.hasOwnProperty.call(res, key)) return res[key];
        }
      } catch (e) { /* preview fallback */ }
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    async set(key, value) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          await chrome.storage.local.set({ [key]: value });
        }
      } catch (e) { /* preview fallback */ }
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };

  const $ = (id) => document.getElementById(id);
  const state = { settings: Object.assign({}, DEFAULT_SETTINGS), progress: Object.assign({}, DEFAULT_PROGRESS), currentDay: 1, quoteIndex: 0, deck: [], cardIndex: 0, flipped: false, quiz: null };

  /* ---------- small utilities ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayOfYear = () => { const n = new Date(); return Math.floor((n - new Date(n.getFullYear(), 0, 0)) / 86400000); };
  const allVocab = () => D.DAYS.reduce((a, d) => a.concat((d.vocab || []).map(v => Object.assign({ day: d.day }, v))), []);

  function toast(msg, ms) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), ms || 2400);
  }
  function openURL(url) {
    try {
      if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) chrome.tabs.create({ url });
      else window.open(url, "_blank", "noopener");
    } catch (e) { window.open(url, "_blank", "noopener"); }
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("🔇 Speech isn't available in this browser"); return; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP"; u.rate = 0.85; u.pitch = 1.05;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { toast("🔇 Couldn't speak that word"); }
  }

  /* ---------- progress helpers ---------- */
  function noteStudy() {
    const p = state.progress;
    const today = todayStr();
    if (p.lastStudy !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      const yStr = `${y.getFullYear()}-${pad(y.getMonth() + 1)}-${pad(y.getDate())}`;
      p.streak = p.lastStudy === yStr ? (Number(p.streak) || 0) + 1 : 1;
      p.lastStudy = today;
    }
  }
  function addXP(n) {
    noteStudy();
    state.progress.xp = (Number(state.progress.xp) || 0) + n;
    Store.set("gm_progress", state.progress);
    renderJourney();
  }
  function rankFor(xp) {
    const ranks = D.RANKS.slice().sort((a, b) => a.min - b.min);
    let cur = ranks[0], next = null;
    for (const r of ranks) { if (xp >= r.min) cur = r; else { next = r; break; } }
    return { cur, next };
  }
  function currentDay() {
    for (let d = 1; d <= D.DAYS.length; d++) if (!state.progress.completed[d]) return d;
    return D.DAYS.length;
  }
  function tasksFor(day) { return (state.progress.dayTasks[day] || [false, false, false, false, false]).slice(); }

  /* ---------- clock ---------- */
  function tick() {
    const n = new Date();
    const h = n.getHours();
    const greet = h < 11 ? "おはようございます！" : h < 17 ? "こんにちは！" : "こんばんは！";
    const name = (state.settings.name || "Gakusei").trim() || "Gakusei";
    $("greeting").textContent = `${greet} ${name}！`;
    $("clock").textContent = `${pad(h)}:${pad(n.getMinutes())}`;
    $("seconds").textContent = pad(n.getSeconds());
    $("date").textContent = n.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }

  /* ---------- mascot + quotes ---------- */
  function nextQuote(announce) {
    const q = D.QUOTES[state.quoteIndex % D.QUOTES.length];
    state.quoteIndex++;
    $("quoteJp").textContent = q.jp;
    $("quoteEn").textContent = q.en;
    const b = $("quoteBubble");
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
    if (announce) speak(q.jp);
  }

  /* ---------- word of the day ---------- */
  function renderWord() {
    const list = allVocab();
    if (!list.length) return;
    const v = list[dayOfYear() % list.length];
    $("wordJp").textContent = v.jp;
    $("wordRomaji").textContent = v.romaji || "";
    $("wordEn").textContent = v.en || "";
    $("wordExample").textContent = v.example ? `${v.example} — ${v.exampleEn || ""}` : `Day ${v.day} vocabulary`;
    $("speakWordBtn").onclick = () => speak(v.jp);
  }

  /* ---------- mission ---------- */
  function renderMission() {
    state.currentDay = currentDay();
    const day = D.DAYS[state.currentDay - 1];
    if (!day) return;
    $("missionEmoji").textContent = day.emoji || "📘";
    $("missionDay").textContent = pad(day.day);
    $("stageBadge").textContent = (day.stage || "LESSON").toUpperCase();
    $("missionTitle").textContent = day.title;
    $("missionJp").textContent = day.jp || "";
    const tasks = tasksFor(day.day);
    document.querySelectorAll("#taskList input[data-task]").forEach((input) => {
      input.checked = !!tasks[Number(input.dataset.task)];
    });
    const done = tasks.slice(0, 4).filter(Boolean).length;
    $("taskCount").textContent = `${done} / 4`;
    $("taskFill").style.width = `${done * 25}%`;
    const stampBtn = $("stampBtn");
    stampBtn.disabled = done < 4 || !!state.progress.completed[day.day];
    $("missionHint").textContent = state.progress.completed[day.day]
      ? "✅ Stage cleared! Pick another day from the map."
      : done < 4 ? "Finish all 4 tasks to earn your stamp ✨" : "Ready! Stamp this stage for +50 XP 🏁";
  }
  function toggleTask(index, checked) {
    const day = state.currentDay;
    const tasks = tasksFor(day);
    tasks[index] = checked;
    state.progress.dayTasks[day] = tasks;
    if (checked) addXP(1);
    Store.set("gm_progress", state.progress);
    renderMission();
  }
  function stampDay() {
    const day = state.currentDay;
    state.progress.completed[day] = true;
    const tasks = tasksFor(day); tasks[4] = true;
    state.progress.dayTasks[day] = tasks;
    if (!state.progress.startDate) state.progress.startDate = todayStr();
    addXP(50);
    Store.set("gm_progress", state.progress);
    confetti();
    toast(`🏁 Day ${day} cleared! +50 XP — げんき！`);
    renderMission(); renderJourney(); renderMaps();
  }

  /* ---------- journey / map ---------- */
  function renderJourney() {
    const p = state.progress;
    const cleared = Object.values(p.completed || {}).filter(Boolean).length;
    $("streakVal").textContent = p.streak || 0;
    $("xpVal").textContent = p.xp || 0;
    $("clearedVal").innerHTML = `${cleared}<span class="of">/${D.DAYS.length}</span>`;
    const { cur, next } = rankFor(Number(p.xp) || 0);
    $("rankEmoji").textContent = cur.emoji;
    $("rankName").textContent = cur.name;
    $("rankNext").textContent = next ? `${next.min - (p.xp || 0)} XP to ${next.name}` : "MAX RANK!";
    const lo = cur.min, hi = next ? next.min : cur.min + 1;
    $("xpFill").style.width = `${Math.min(100, ((p.xp || 0) - lo) / (hi - lo) * 100)}%`;
    renderMaps();
  }
  function renderMaps() {
    const mini = $("miniMap"), full = $("fullMap");
    mini.innerHTML = ""; full.innerHTML = "";
    D.DAYS.forEach((d) => {
      const done = !!state.progress.completed[d.day];
      const current = d.day === state.currentDay;
      const c = document.createElement("button");
      c.className = `map-cell${done ? " done" : ""}${current ? " current" : ""}`;
      c.textContent = done ? "✓" : d.day;
      c.title = `Day ${d.day}: ${d.title}`;
      c.setAttribute("aria-label", c.title);
      c.onclick = () => openDayModal(d.day);
      mini.appendChild(c);

      const f = document.createElement("button");
      f.className = `map-card${done ? " done" : ""}${current ? " current" : ""}`;
      f.innerHTML = `<div class="md">DAY ${pad(d.day)} · ${(d.stage || "").toUpperCase()}</div><div class="me">${d.emoji || ""}</div><div class="mt">${d.title}</div><div class="mj">${d.jp || ""}</div>`;
      f.onclick = () => { closeModal("mapModal"); openDayModal(d.day); };
      full.appendChild(f);
    });
  }

  /* ---------- flashcards ---------- */
  function deckOptions() {
    const sel = $("deckSelect");
    sel.innerHTML = "";
    D.DAYS.forEach((d) => {
      const o = document.createElement("option");
      o.value = String(d.day);
      o.textContent = `Day ${pad(d.day)} · ${d.title}`;
      sel.appendChild(o);
    });
    const all = document.createElement("option");
    all.value = "all"; all.textContent = "🌟 All 30 days (mega deck)";
    sel.appendChild(all);
    sel.value = String(state.currentDay);
  }
  function loadDeck() {
    const v = $("deckSelect").value;
    state.deck = v === "all" ? allVocab() : ((D.DAYS[Number(v) - 1] || {}).vocab || []).slice();
    if (!state.deck.length) state.deck = allVocab().slice(0, 6);
    state.cardIndex = 0;
    renderCard();
  }
  function renderCard() {
    if (!state.deck.length) return;
    const c = state.deck[state.cardIndex % state.deck.length];
    $("cardCounter").textContent = `${state.cardIndex % state.deck.length + 1} / ${state.deck.length}`;
    $("cardFront").textContent = c.jp;
    $("cardBack").textContent = c.en || "";
    $("cardRomaji").textContent = c.romaji || "";
    $("cardExample").textContent = c.example ? `${c.example}\n${c.exampleEn || ""}` : "";
    state.flipped = false;
    $("flashcard").classList.remove("flipped");
  }
  function flipCard() { state.flipped = !state.flipped; $("flashcard").classList.toggle("flipped", state.flipped); }
  function moveCard(step) {
    state.cardIndex = (state.cardIndex + step + state.deck.length) % state.deck.length;
    renderCard();
  }
  function gotCard() {
    const key = `c${$("deckSelect").value}-${state.cardIndex}`;
    if (!state.progress.confidence) state.progress.confidence = {};
    if (!state.progress.confidence[key]) {
      state.progress.confidence[key] = true;
      addXP(2);
      Store.set("gm_progress", state.progress);
      toast("⭐ Nice! +2 XP");
    } else toast("Already got this one ✓");
    moveCard(1);
  }

  /* ---------- boss quiz ---------- */
  function buildQuiz(dayNum) {
    const day = D.DAYS[dayNum - 1] || D.DAYS[0];
    const pool = allVocab();
    const questions = (day.quiz || []).map(q => ({ q: q.q, choices: q.choices, answer: q.answer, explain: q.explain || "がんばった！" }));
    // add vocabulary questions from this day + earlier days
    const source = shuffle(pool.filter(v => v.day <= dayNum && v.en && v.jp));
    for (const v of source) {
      if (questions.length >= 10) break;
      const reverse = Math.random() < 0.45;
      const distract = shuffle(pool.filter(x => x.en !== v.en && x.jp !== v.jp)).slice(0, 3);
      while (distract.length < 3) distract.push({ jp: "—", en: "—" });
      if (reverse) {
        const choices = shuffle([v.en, distract[0].en, distract[1].en, distract[2].en]);
        questions.push({ q: `「${v.jp}」 means…`, choices, answer: choices.indexOf(v.en), explain: `${v.jp} = ${v.romaji} = ${v.en}` });
      } else {
        const choices = shuffle([v.jp, distract[0].jp, distract[1].jp, distract[2].jp]);
        questions.push({ q: `Which Japanese word means “${v.en}”?`, choices, answer: choices.indexOf(v.jp), explain: `${v.jp} (${v.romaji}) = ${v.en}` });
      }
    }
    while (questions.length < 10 && pool.length) {
      const v = pool[Math.floor(Math.random() * pool.length)];
      const choices = shuffle([v.en, "teacher", "umbrella", "delicious"]);
      questions.push({ q: `「${v.jp}」 means…`, choices, answer: choices.indexOf(v.en), explain: `${v.jp} = ${v.en}` });
    }
    return shuffle(questions).slice(0, 10);
  }
  function startQuiz(dayNum) {
    state.quiz = { day: dayNum || state.currentDay, questions: buildQuiz(dayNum || state.currentDay), index: 0, score: 0, locked: false };
    $("quizIntro").classList.add("hidden");
    $("quizResult").classList.add("hidden");
    $("quizGame").classList.remove("hidden");
    renderQuestion();
    document.querySelector('.tab[data-tab="quiz"]').click();
  }
  function renderQuestion() {
    const q = state.quiz;
    if (!q) return;
    if (q.index >= q.questions.length) return finishQuiz();
    const item = q.questions[q.index];
    $("quizQnum").textContent = `QUESTION ${q.index + 1} / ${q.questions.length}`;
    $("quizScore").textContent = `⭐ ${q.score}`;
    $("quizFill").style.width = `${q.index / q.questions.length * 100}%`;
    $("quizQuestion").textContent = item.q;
    const box = $("quizChoices"); box.innerHTML = "";
    item.choices.forEach((choice, i) => {
      const b = document.createElement("button");
      b.className = "choice"; b.textContent = choice;
      b.onclick = () => answerQuestion(i, b);
      box.appendChild(b);
    });
    $("quizFeedback").innerHTML = "&nbsp;";
    q.locked = false;
  }
  function answerQuestion(index, btn) {
    const q = state.quiz;
    if (!q || q.locked) return;
    q.locked = true;
    const item = q.questions[q.index];
    const buttons = $("quizChoices").querySelectorAll(".choice");
    if (index === item.answer) {
      q.score++; btn.classList.add("correct");
      $("quizFeedback").textContent = `⚡ せいかい! ${item.explain}`;
    } else {
      btn.classList.add("wrong");
      buttons[item.answer].classList.add("correct");
      $("quizFeedback").textContent = `💦 ちがいます… ${item.explain}`;
    }
    $("quizScore").textContent = `⭐ ${q.score}`;
    setTimeout(() => { q.index++; renderQuestion(); }, 1100);
  }
  function finishQuiz() {
    const q = state.quiz;
    $("quizGame").classList.add("hidden");
    $("quizResult").classList.remove("hidden");
    const pass = q.score >= 6;
    $("resultEmoji").textContent = pass ? "🎉" : "💪";
    $("resultTitle").textContent = pass ? "STAGE CLEAR!" : "KEEP GOING!";
    $("resultText").textContent = `You got ${q.score} / ${q.questions.length} — +${q.score * (pass ? 3 : 2)} XP. ${pass ? "Your quiz mission is ticked!" : "Score 6+ to tick your quiz mission."}`;
    if (pass) {
      const tasks = tasksFor(q.day); tasks[3] = true;
      state.progress.dayTasks[q.day] = tasks;
      Store.set("gm_progress", state.progress);
    }
    addXP(q.score * (pass ? 3 : 2));
    renderMission();
  }

  /* ---------- kana chart ---------- */
  function renderKana(which) {
    const rows = D[which] || [];
    const box = $("kanaChart"); box.innerHTML = "";
    rows.forEach(row => {
      if (!Array.isArray(row)) return;
      row.forEach(cell => {
        const el = document.createElement(cell ? "button" : "div");
        el.className = `kana-cell${cell ? "" : " empty"}`;
        if (cell) {
          el.innerHTML = `<span class="kc">${cell.c}</span><span class="kr">${cell.r || ""}</span>`;
          el.title = `${cell.c} = ${cell.r}`;
          el.onclick = () => {
            speak(cell.c);
            document.querySelectorAll(".kana-cell.playing").forEach(x => x.classList.remove("playing"));
            el.classList.add("playing");
            setTimeout(() => el.classList.remove("playing"), 600);
          };
        }
        box.appendChild(el);
      });
    });
  }

  /* ---------- reminder controls ---------- */
  async function scheduleReminder() {
    if (typeof chrome === "undefined" || !chrome.alarms) return;
    try {
      await chrome.alarms.clear("gm-daily-reminder");
      if (!state.settings.reminderEnabled) return;
      const [h, m] = (state.settings.reminderTime || "09:00").split(":").map(Number);
      const n = new Date();
      const when = new Date(n.getFullYear(), n.getMonth(), n.getDate(), h || 0, m || 0, 0);
      if (when.getTime() <= n.getTime()) when.setDate(when.getDate() + 1);
      await chrome.alarms.create("gm-daily-reminder", { when: when.getTime() });
      updateReminderStatus(when);
    } catch (e) { /* preview mode */ }
  }
  function updateReminderStatus(when) {
    $("reminderStatus").textContent = state.settings.reminderEnabled ? "Reminder ON 🔔" : "Reminder OFF 💤";
    let text = `Every day at ${state.settings.reminderTime}`;
    if (when) text += ` · next ${when.toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })}`;
    $("reminderNext").textContent = text;
  }
  function testNotification() {
    const title = "🌸 今日のげんき！ Time to study!";
    const day = D.DAYS[state.currentDay - 1];
    const msg = `Day ${state.currentDay}: ${day ? day.title : "Japanese"} — keep your ${state.progress.streak || 0}🔥 streak alive!`;
    if (typeof chrome !== "undefined" && chrome.notifications && chrome.notifications.create) {
      const iconUrl = (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL)
        ? chrome.runtime.getURL("assets/icon128.png") : "assets/icon128.png";
      chrome.notifications.create("gm-manual", {
        type: "basic", iconUrl, title, message: msg,
        buttons: [{ title: "Study now" }, { title: "Not now" }]
      }, () => { if (chrome.runtime.lastError) toast(msg); });
      toast("🔔 Test reminder sent!");
    } else toast(msg, 4000);
  }

  /* ---------- modals ---------- */
  function openModal(id) { $(id).classList.remove("hidden"); }
  function closeModal(id) { $(id).classList.add("hidden"); }
  function openDayModal(dayNum) {
    const d = D.DAYS[dayNum - 1]; if (!d) return;
    $("modalEmoji").textContent = d.emoji || "📘";
    $("modalDay").textContent = pad(d.day);
    $("modalStage").textContent = (d.stage || "").toUpperCase();
    $("modalTitle").textContent = d.title;
    $("modalJp").textContent = d.jp || "";
    const vbox = $("modalVocab"); vbox.innerHTML = "";
    (d.vocab || []).forEach(v => {
      const el = document.createElement("div");
      el.className = "vocab-item";
      el.innerHTML = `<span class="vj">${v.jp}</span><span class="vr">${v.romaji || ""}</span><span class="ve">${v.en || ""}</span>${v.example ? `<span class="vex">${v.example} — ${v.exampleEn || ""}</span>` : ""}`;
      vbox.appendChild(el);
    });
    if (!(d.vocab || []).length) vbox.innerHTML = '<p class="panel-note">Open the Genki source book to see this day’s full page.</p>';
    const gbox = $("modalGrammar"); gbox.innerHTML = "";
    (d.grammar || []).forEach(g => {
      const el = document.createElement("div");
      el.className = "grammar-item";
      el.innerHTML = `<div class="gp">${g.point}</div><div class="ge">${g.en || ""}</div><div class="gx">${g.example || ""} ${g.exampleEn || ""}</div>`;
      gbox.appendChild(el);
    });
    if (!(d.grammar || []).length) gbox.innerHTML = '<p class="panel-note">No new grammar today — review and enjoy!</p>';
    $("modalQuizBtn").onclick = () => { closeModal("dayModal"); startQuiz(d.day); };
    openModal("dayModal");
  }

  /* ---------- confetti ---------- */
  function confetti() {
    const layer = $("burst");
    const colors = ["#ff4d8d", "#35d6ff", "#ffd93d", "#a26bff", "#5bd68a"];
    for (let i = 0; i < 46; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = `${Math.random() * 100}%`;
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = `${1.5 + Math.random() * 1.7}s`;
      c.style.animationDelay = `${Math.random() * 0.35}s`;
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  /* ---------- background particles ---------- */
  let particles = [], canvasCtx = null, rafId = null;
  function initParticles() {
    const canvas = $("petals");
    canvasCtx = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
      canvasCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paletteFor = (bg) => bg === 0 ? ["#ffb3cf", "#ffd7e6", "#fff2f7"] : bg === 1 ? ["#ffd93d", "#ff9d5c", "#fff0b3"] : bg === 2 ? ["#b6e3a7", "#d8f0b8", "#ffe8a8"] : ["#35d6ff", "#ff5bd0", "#b6a4ff"];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const make = (initial) => {
      const p = {
        x: Math.random() * innerWidth,
        y: initial ? Math.random() * innerHeight : -25,
        size: 4 + Math.random() * 8,
        vy: 0.5 + Math.random() * 1.3,
        vx: -0.5 + Math.random() * 1.3,
        rot: Math.random() * 6.28,
        vr: -0.03 + Math.random() * 0.06,
        alpha: 0.35 + Math.random() * 0.5,
        color: "#fff"
      };
      p.color = pick(paletteFor(Number(state.settings.bg) || 0));
      return p;
    };
    particles = Array.from({ length: reduced ? 0 : 32 }, () => make(true));
    function frame() {
      const bg = Number(state.settings.bg) || 0;
      const ctx = canvasCtx;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach((p) => {
        p.y += p.vy; p.x += p.vx + Math.sin(p.y / 70) * 0.35; p.rot += p.vr;
        if (p.y > innerHeight + 25 || p.x < -40 || p.x > innerWidth + 40) Object.assign(p, make(false));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        if (bg === 3) { ctx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2); }
        else { ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      });
      rafId = requestAnimationFrame(frame);
    }
    if (!reduced) frame();
  }

  function applyBackground() {
    const i = Math.max(0, Math.min(BACKGROUNDS.length - 1, Number(state.settings.bg) || 0));
    const scene = $("bgScene");
    scene.style.opacity = "0";
    setTimeout(() => { scene.style.backgroundImage = `url("${BACKGROUNDS[i].file}")`; scene.style.opacity = "1"; }, 180);
    document.querySelectorAll(".bg-thumb").forEach(b => b.classList.toggle("active", Number(b.dataset.bg) === i));
    const palette = i === 0 ? ["#ffb3cf", "#ffd7e6", "#fff2f7"] : i === 1 ? ["#ffd93d", "#ff9d5c", "#fff0b3"] : i === 2 ? ["#b6e3a7", "#d8f0b8", "#ffe8a8"] : ["#35d6ff", "#ff5bd0", "#b6a4ff"];
    particles.forEach(p => { p.color = palette[Math.floor(Math.random() * palette.length)]; });
  }
  function applyMascot() {
    const i = Math.max(0, Math.min(MASCOTS.length - 1, Number(state.settings.character) || 0));
    $("mascot").src = MASCOTS[i];
    document.querySelectorAll(".char-thumb").forEach(b => b.classList.toggle("active", Number(b.dataset.char) === i));
  }
  async function saveSettings() { await Store.set("gm_settings", state.settings); }

  /* ---------- wiring ---------- */
  function wire() {
    document.querySelectorAll("#taskList input[data-task]").forEach(input => {
      input.addEventListener("change", () => toggleTask(Number(input.dataset.task), input.checked));
    });
    $("stampBtn").onclick = stampDay;
    $("sourceBtn").onclick = () => openURL(D.SOURCE_URL);
    $("genkiSourceBtn").onclick = () => openURL(D.SOURCE_URL);
    $("settingsSource").onclick = (e) => { e.preventDefault(); openURL(D.SOURCE_URL); };
    $("openDayBtn").onclick = () => openDayModal(state.currentDay);
    $("mapFullBtn").onclick = () => { renderMaps(); openModal("mapModal"); };
    $("expandMapBtn").onclick = () => { renderMaps(); openModal("mapModal"); };

    $("mascotBtn").onclick = () => {
      const b = $("mascotBtn"); b.classList.remove("tap"); void b.offsetWidth; b.classList.add("tap");
      nextQuote(true);
    };
    $("settingsBtn").onclick = () => {
      $("nameInput").value = state.settings.name || "";
      $("settingsTime").value = state.settings.reminderTime || "09:00";
      openModal("settingsModal");
    };
    document.querySelectorAll("[data-close]").forEach(el => { el.onclick = () => closeModal(el.dataset.close); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") document.querySelectorAll(".modal").forEach(m => closeModal(m.id));
    });
    $("nameInput").onchange = () => { state.settings.name = $("nameInput").value.trim() || "Gakusei"; saveSettings(); tick(); toast(`こんにちは、${state.settings.name}！`); };
    $("settingsTime").onchange = () => {
      state.settings.reminderTime = $("settingsTime").value || "09:00";
      $("reminderTime").value = state.settings.reminderTime;
      saveSettings(); scheduleReminder(); toast("⏰ Reminder time saved");
    };
    $("resetBtn").onclick = () => {
      if (!confirm("Reset all XP, streaks and stamps? This cannot be undone.")) return;
      state.progress = Object.assign({}, DEFAULT_PROGRESS, { completed: {}, dayTasks: {}, confidence: {} });
      Store.set("gm_progress", state.progress);
      renderMission(); renderJourney(); loadDeck();
      closeModal("settingsModal"); toast("Progress reset — a fresh start! 🌱");
    };

    $("reminderToggle").onchange = () => {
      state.settings.reminderEnabled = $("reminderToggle").checked;
      saveSettings(); scheduleReminder();
      toast(state.settings.reminderEnabled ? "🔔 Daily reminder is ON" : "💤 Daily reminder is OFF");
    };
    $("reminderTime").onchange = () => {
      state.settings.reminderTime = $("reminderTime").value || "09:00";
      $("settingsTime").value = state.settings.reminderTime;
      saveSettings(); scheduleReminder(); updateReminderStatus(); toast("⏰ Study time saved");
    };
    $("testNotifyBtn").onclick = testNotification;

    $("bgPicker").onclick = (e) => {
      const b = e.target.closest(".bg-thumb"); if (!b) return;
      state.settings.bg = Number(b.dataset.bg); saveSettings(); applyBackground();
    };
    $("charPicker").onclick = (e) => {
      const b = e.target.closest(".char-thumb"); if (!b) return;
      state.settings.character = Number(b.dataset.char); saveSettings(); applyMascot();
      toast(`Study buddy switched! ${["はな", "けん", "もち"][Number(b.dataset.char)]} です ✦`);
    };

    $("searchForm").onsubmit = (e) => {
      e.preventDefault();
      const q = $("searchInput").value.trim(); if (!q) return;
      const url = /^j:\s*/i.test(q)
        ? `https://jisho.org/search/${encodeURIComponent(q.replace(/^j:\s*/i, ""))}`
        : `https://www.google.com/search?q=${encodeURIComponent(q)}`;
      openURL(url); $("searchInput").value = "";
    };

    document.querySelectorAll(".tab").forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.toggle("active", c.id === `tab-${tab.dataset.tab}`));
      };
    });
    $("flashcard").onclick = flipCard;
    $("flashcard").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); } };
    $("cardPrev").onclick = () => moveCard(-1);
    $("cardNext").onclick = () => moveCard(1);
    $("cardGot").onclick = gotCard;
    $("deckSelect").onchange = loadDeck;

    $("quizStart").onclick = () => startQuiz(state.currentDay);
    $("quizAgain").onclick = () => startQuiz(state.quiz ? state.quiz.day : state.currentDay);
    document.querySelectorAll(".seg").forEach(seg => {
      seg.onclick = () => {
        document.querySelectorAll(".seg").forEach(s => s.classList.toggle("active", s === seg));
        renderKana(seg.dataset.kana);
      };
    });
  }

  /* ---------- boot ---------- */
  async function init() {
    const [settings, progress] = await Promise.all([
      Store.get("gm_settings", DEFAULT_SETTINGS),
      Store.get("gm_progress", DEFAULT_PROGRESS)
    ]);
    state.settings = Object.assign({}, DEFAULT_SETTINGS, settings || {});
    state.progress = Object.assign({}, DEFAULT_PROGRESS, progress || {}, {
      completed: (progress && progress.completed) || {},
      dayTasks: (progress && progress.dayTasks) || {},
      confidence: (progress && progress.confidence) || {}
    });

    wire();

    // Deep links: newtab.html?tab=quiz&bg=3 (handy for links & store screenshots)
    try {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get("tab");
      if (["cards", "quiz", "kana"].indexOf(tabParam) !== -1) {
        const t = document.querySelector(`.tab[data-tab="${tabParam}"]`);
        if (t) t.click();
      }
      const bgParam = params.get("bg");
      if (bgParam !== null && /^[0-3]$/.test(bgParam)) {
        state.settings.bg = Number(bgParam);
        saveSettings(); applyBackground();
      }
    } catch (e) { /* preview without URL params */ }

    tick(); setInterval(tick, 1000);
    applyBackground(); applyMascot(); initParticles();
    renderMission(); renderJourney(); deckOptions(); loadDeck();
    renderWord(); renderKana("HIRAGANA"); nextQuote(false);
    $("reminderToggle").checked = !!state.settings.reminderEnabled;
    $("reminderTime").value = state.settings.reminderTime || "09:00";
    $("settingsTime").value = state.settings.reminderTime || "09:00";
    updateReminderStatus();
    scheduleReminder();
    setInterval(() => nextQuote(false), 9000);
    $("settingsSource").href = D.SOURCE_URL;

    // keep views in sync if popup changes settings/progress in another context
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes) => {
        if (changes.gm_settings) {
          state.settings = Object.assign({}, DEFAULT_SETTINGS, changes.gm_settings.newValue || {});
          applyBackground(); applyMascot();
          $("reminderToggle").checked = !!state.settings.reminderEnabled;
          $("reminderTime").value = state.settings.reminderTime || "09:00";
          updateReminderStatus(); tick();
        }
        if (changes.gm_progress) {
          state.progress = Object.assign({}, DEFAULT_PROGRESS, changes.gm_progress.newValue || {});
          renderMission(); renderJourney();
        }
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
