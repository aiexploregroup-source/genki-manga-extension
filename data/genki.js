/* Genki Manga Challenge - data. Plain script; assigns globalThis.GENKI. */
(function () {
  "use strict";

  globalThis.GENKI = {
    SOURCE_URL: "https://01a19544-304f-7d8b-8930-e35a178a6df6.arena.site/",

    DAYS: [
      {
        day: 1,
        emoji: "✏️",
        stage: "Intro",
        title: "Intro — Writing System & Sounds",
        jp: "もじ と おと",
        vocab: [
          { jp: "ひらがな", romaji: "hiragana", en: "hiragana syllabary", example: "ひらがなを べんきょうします。", exampleEn: "I study hiragana." },
          { jp: "カタカナ", romaji: "katakana", en: "katakana syllabary", example: "カタカナは かんたんです。", exampleEn: "Katakana is easy." },
          { jp: "漢字（かんじ）", romaji: "kanji", en: "kanji character", example: "漢字を かきます。", exampleEn: "I write kanji." },
          { jp: "文字（もじ）", romaji: "moji", en: "letter, character", example: "この 文字は きれいです。", exampleEn: "This character is beautiful." },
          { jp: "音（おと）", romaji: "oto", en: "sound", example: "おとを ききます。", exampleEn: "I listen to the sound." },
          { jp: "言葉（ことば）", romaji: "kotoba", en: "word, language", example: "にほんの 言葉を ならいます。", exampleEn: "I learn Japanese words." },
          { jp: "日本語（にほんご）", romaji: "nihongo", en: "Japanese language", example: "日本語は おもしろいです。", exampleEn: "Japanese is interesting." }
        ],
        grammar: [
          { point: "〜は〜です", en: "A is B (the basic identifying sentence)", example: "これは ひらがなです。", exampleEn: "This is hiragana." },
          { point: "〜を べんきょうします", en: "study something (を marks the object)", example: "漢字を べんきょうします。", exampleEn: "I study kanji." }
        ],
        quiz: [
          { q: "ひらがな is what kind of writing?", choices: ["A Japanese syllabary", "A kind of food", "A Chinese character", "A number system"], answer: 0, explain: "ひらがな is the basic Japanese syllabary, e.g. あ・い・う・え・お。" },
          { q: "What is the romaji for カタカナ?", choices: ["katakana", "hiragana", "kanji", "kotoba"], answer: 0, explain: "カタカナ = katakana, used for loanwords like コーヒー (coffee)." },
          { q: "Fill in: これは ひらがな___。", choices: ["です", "ます", "は", "を"], answer: 0, explain: "です is the polite copula: これは ひらがなです = This is hiragana." }
        ]
      },
      {
        day: 2,
        emoji: "👋",
        stage: "Intro",
        title: "Intro — Greetings & Numbers",
        jp: "あいさつ と すうじ",
        vocab: [
          { jp: "こんにちは", romaji: "konnichiwa", en: "hello, good afternoon", example: "こんにちは、げんきですか。", exampleEn: "Hello, how are you?" },
          { jp: "おはよう", romaji: "ohayou", en: "good morning", example: "おはよう、せんせい。", exampleEn: "Good morning, teacher." },
          { jp: "こんばんは", romaji: "konbanwa", en: "good evening", example: "こんばんは、ともだち。", exampleEn: "Good evening, friend." },
          { jp: "ありがとう", romaji: "arigatou", en: "thank you", example: "ありがとう、とても うれしいです。", exampleEn: "Thank you, I am very happy." },
          { jp: "すみません", romaji: "sumimasen", en: "excuse me, sorry", example: "すみません、じかんが ありません。", exampleEn: "Sorry, I have no time." },
          { jp: "数字（すうじ）", romaji: "suuji", en: "number", example: "すうじを おぼえます。", exampleEn: "I memorize numbers." },
          { jp: "一（いち）", romaji: "ichi", en: "one", example: "いち、に、さん、よん、ご。", exampleEn: "One, two, three, four, five." }
        ],
        grammar: [
          { point: "〜は〜です", en: "identifying with は + です", example: "わたしは がくせいです。", exampleEn: "I am a student." },
          { point: "Numbers 1–10", en: "いち・に・さん・よん・ご・ろく・なな・はち・きゅう・じゅう", example: "りんごを ふたつ ください。", exampleEn: "Please give me two apples." }
        ],
        quiz: [
          { q: "What does おはよう mean?", choices: ["Good morning", "Good night", "Thank you", "Sorry"], answer: 0, explain: "おはよう is the casual 'good morning' greeting." },
          { q: "ありがとう means:", choices: ["Thank you", "Excuse me", "Hello", "Goodbye"], answer: 0, explain: "ありがとう = thank you; polite form is ありがとうございます。" },
          { q: "Which word means four?", choices: ["よん", "しち", "はち", "きゅう"], answer: 0, explain: "よん (or し) = four; しち = seven, はち = eight, きゅう = nine." }
        ]
      },
      {
        day: 3,
        emoji: "🎒",
        stage: "Lesson 1",
        title: "Lesson 1 — New Friends · Vocabulary",
        jp: "あたらしい ともだち",
        vocab: [
          { jp: "友達（ともだち）", romaji: "tomodachi", en: "friend", example: "ともだちと あそびます。", exampleEn: "I play with a friend." },
          { jp: "学生（がくせい）", romaji: "gakusei", en: "student", example: "わたしは がくせいです。", exampleEn: "I am a student." },
          { jp: "先生（せんせい）", romaji: "sensei", en: "teacher", example: "せんせいに ききます。", exampleEn: "I ask the teacher." },
          { jp: "人（ひと）", romaji: "hito", en: "person", example: "あの ひとは やさしいです。", exampleEn: "That person is kind." },
          { jp: "名前（なまえ）", romaji: "namae", en: "name", example: "なまえを おしえてください。", exampleEn: "Please tell me your name." },
          { jp: "国（くに）", romaji: "kuni", en: "country", example: "わたしの くには にほんです。", exampleEn: "My country is Japan." },
          { jp: "日本語（にほんご）", romaji: "nihongo", en: "Japanese language", example: "にほんごを はなします。", exampleEn: "I speak Japanese." }
        ],
        grammar: [
          { point: "Nは Nです", en: "A is B; は marks the topic", example: "わたしは がくせいです。", exampleEn: "I am a student." },
          { point: "〜も", en: "also, too", example: "わたしも がくせいです。", exampleEn: "I am a student too." }
        ],
        quiz: [
          { q: "ともだち means:", choices: ["friend", "teacher", "student", "name"], answer: 0, explain: "ともだち = friend; せんせい = teacher, がくせい = student." },
          { q: "Which word means name?", choices: ["なまえ", "くに", "ひと", "ともだち"], answer: 0, explain: "なまえ = name; くに = country, ひと = person." },
          { q: "Fill in: わたし___がくせいです。", choices: ["は", "に", "を", "の"], answer: 0, explain: "は marks the topic: わたしは がくせいです = I am a student." }
        ]
      },
      {
        day: 4,
        emoji: "⏰",
        stage: "Lesson 1",
        title: "Lesson 1 — New Friends · Grammar & Time",
        jp: "ぶんぽう と じかん",
        vocab: [
          { jp: "時間（じかん）", romaji: "jikan", en: "time", example: "じかんが ありません。", exampleEn: "I have no time." },
          { jp: "今（いま）", romaji: "ima", en: "now", example: "いま 六時です。", exampleEn: "It is six o'clock now." },
          { jp: "時（とき）", romaji: "toki", en: "time, hour", example: "なんじですか。", exampleEn: "What time is it?" },
          { jp: "朝（あさ）", romaji: "asa", en: "morning", example: "あさ 六時に おきます。", exampleEn: "I get up at six in the morning." },
          { jp: "昼（ひる）", romaji: "hiru", en: "noon, daytime", example: "ひるごはんを たべます。", exampleEn: "I eat lunch at noon." },
          { jp: "夜（よる）", romaji: "yoru", en: "night", example: "よる ねます。", exampleEn: "I sleep at night." },
          { jp: "毎日（まいにち）", romaji: "mainichi", en: "every day", example: "まいにち べんきょうします。", exampleEn: "I study every day." }
        ],
        grammar: [
          { point: "〜に (time)", en: "at a time: 六時に = at six o'clock", example: "六時に おきます。", exampleEn: "I get up at six." },
          { point: "Nの N", en: "の links nouns: my friend, the book of...", example: "わたしの ともだちです。", exampleEn: "This is my friend." },
          { point: "Nと N", en: "and / with", example: "ともだちと がっこうへ いきます。", exampleEn: "I go to school with a friend." }
        ],
        quiz: [
          { q: "六時 means:", choices: ["6 o'clock", "7 o'clock", "6 days", "June"], answer: 0, explain: "六 (six) + 時 (hour) = 六時, 6 o'clock." },
          { q: "Fill in: わたし___ともだちです。", choices: ["の", "に", "と", "へ"], answer: 0, explain: "の connects nouns: わたしの ともだち = my friend." },
          { q: "まいにち means:", choices: ["every day", "today", "tomorrow", "yesterday"], answer: 0, explain: "毎日 (まいにち) = every day; きょう = today, あした = tomorrow." }
        ]
      },
      {
        day: 5,
        emoji: "🛍️",
        stage: "Lesson 2",
        title: "Lesson 2 — Shopping · Vocabulary",
        jp: "かいもの",
        vocab: [
          { jp: "買い物（かいもの）", romaji: "kaimono", en: "shopping", example: "かいものに いきます。", exampleEn: "I go shopping." },
          { jp: "店（みせ）", romaji: "mise", en: "shop, store", example: "あの みせは きれいです。", exampleEn: "That shop is clean." },
          { jp: "円（えん）", romaji: "en", en: "yen (Japanese currency)", example: "千円です。", exampleEn: "It is one thousand yen." },
          { jp: "財布（さいふ）", romaji: "saifu", en: "wallet", example: "さいふが あります。", exampleEn: "I have a wallet." },
          { jp: "靴（くつ）", romaji: "kutsu", en: "shoes", example: "くつを かいます。", exampleEn: "I buy shoes." },
          { jp: "服（ふく）", romaji: "fuku", en: "clothes", example: "ふくが たくさん あります。", exampleEn: "There are many clothes." },
          { jp: "たくさん", romaji: "takusan", en: "many, a lot", example: "たくさん かいました。", exampleEn: "I bought a lot." }
        ],
        grammar: [
          { point: "〜を ください", en: "please give me (a polite shopping request)", example: "この くつを ください。", exampleEn: "Please give me these shoes." },
          { point: "Nが あります", en: "there is / I have (inanimate things)", example: "おかねが あります。", exampleEn: "I have money." },
          { point: "いくらですか", en: "How much is it?", example: "それは いくらですか。", exampleEn: "How much is that?" }
        ],
        quiz: [
          { q: "かいもの means:", choices: ["shopping", "studying", "cleaning", "cooking"], answer: 0, explain: "買い物 (かいもの) = shopping; かいものに いきます = go shopping." },
          { q: "円（えん）is:", choices: ["Japanese currency (yen)", "a shoe", "a shop", "a wallet"], answer: 0, explain: "円 = yen, the currency of Japan, e.g. 千円 (sen-en)." },
          { q: "Fill in: この くつ___ください。", choices: ["を", "が", "に", "と"], answer: 0, explain: "を marks the object of the request: くつを ください = Please give me the shoes." }
        ]
      },
      {
        day: 6,
        emoji: "💴",
        stage: "Lesson 2",
        title: "Lesson 2 — Shopping · Grammar & Classroom",
        jp: "ぶんぽう と きょうしつ",
        vocab: [
          { jp: "教室（きょうしつ）", romaji: "kyoushitsu", en: "classroom", example: "きょうしつに がくせいが います。", exampleEn: "There are students in the classroom." },
          { jp: "机（つくえ）", romaji: "tsukue", en: "desk", example: "つくえの うえに ほんが あります。", exampleEn: "There is a book on the desk." },
          { jp: "椅子（いす）", romaji: "isu", en: "chair", example: "いすに すわります。", exampleEn: "I sit on the chair." },
          { jp: "本（ほん）", romaji: "hon", en: "book", example: "ほんを よみます。", exampleEn: "I read a book." },
          { jp: "ペン", romaji: "pen", en: "pen", example: "ペンで かきます。", exampleEn: "I write with a pen." },
          { jp: "ノート", romaji: "nouto", en: "notebook", example: "ノートに かきます。", exampleEn: "I write in a notebook." },
          { jp: "上（うえ）", romaji: "ue", en: "on, above", example: "うえに みどりです。", exampleEn: "It is on top." }
        ],
        grammar: [
          { point: "Nの うえに あります", en: "there is ... on top of ...", example: "ほんは つくえの うえに あります。", exampleEn: "The book is on the desk." },
          { point: "Nは 場所に あります", en: "something is located somewhere (inanimate)", example: "ペンは かばんの なかに あります。", exampleEn: "The pen is inside the bag." },
          { point: "いくらですか", en: "asking the price", example: "この ノートは いくらですか。", exampleEn: "How much is this notebook?" }
        ],
        quiz: [
          { q: "つくえ means:", choices: ["desk", "chair", "book", "classroom"], answer: 0, explain: "机 (つくえ) = desk; いす = chair, ほん = book." },
          { q: "Fill in: ほんは つくえの___に あります。", choices: ["うえ", "した", "そと", "あと"], answer: 0, explain: "つくえの うえに = on the desk; した = under, そと = outside." },
          { q: "いくらですか means:", choices: ["How much is it?", "What time is it?", "Where is it?", "Who is it?"], answer: 0, explain: "いくら = how much; used when shopping." }
        ]
      },
      {
        day: 7,
        emoji: "🏆",
        stage: "Review",
        title: "Review — Checkpoint 1 · Review",
        jp: "ふくしゅう 1",
        vocab: [
          { jp: "復習（ふくしゅう）", romaji: "fukushuu", en: "review", example: "ふくしゅうを します。", exampleEn: "I do a review." },
          { jp: "宿題（しゅくだい）", romaji: "shukudai", en: "homework", example: "しゅくだいを します。", exampleEn: "I do homework." },
          { jp: "試験（しけん）", romaji: "shiken", en: "exam, test", example: "しけんが あります。", exampleEn: "There is an exam." },
          { jp: "問題（もんだい）", romaji: "mondai", en: "question, problem", example: "もんだいに こたえます。", exampleEn: "I answer the question." },
          { jp: "答え（こたえ）", romaji: "kotae", en: "answer", example: "こたえを かきます。", exampleEn: "I write the answer." },
          { jp: "間違い（まちがい）", romaji: "machigai", en: "mistake", example: "まちがいを なおします。", exampleEn: "I fix my mistake." },
          { jp: "頑張る（がんばる）", romaji: "ganbaru", en: "to do one's best", example: "まいにち がんばります。", exampleEn: "I do my best every day." }
        ],
        grammar: [
          { point: "〜を します", en: "do an activity (に vs を distinction review)", example: "ふくしゅうを します。", exampleEn: "I review." },
          { point: "〜が あります", en: "there is / an event takes place", example: "あした しけんが あります。", exampleEn: "There is an exam tomorrow." }
        ],
        quiz: [
          { q: "ふくしゅう means:", choices: ["review", "homework", "exam", "answer"], answer: 0, explain: "復習 (ふくしゅう) = review of what you learned." },
          { q: "しゅくだい means:", choices: ["homework", "test", "problem", "mistake"], answer: 0, explain: "宿題 (しゅくだい) = homework." },
          { q: "がんばる means:", choices: ["to do one's best", "to forget", "to sleep", "to buy"], answer: 0, explain: "頑張る = to try hard / do one's best. がんばって！ =Hang in there!" }
        ]
      },
      {
        day: 8,
        emoji: "💕",
        stage: "Lesson 3",
        title: "Lesson 3 — Making a Date · Vocabulary",
        jp: "デートの やくそく",
        vocab: [
          { jp: "デート", romaji: "deeto", en: "date", example: "デートに いきます。", exampleEn: "I go on a date." },
          { jp: "約束（やくそく）", romaji: "yakusoku", en: "promise, appointment", example: "やくそくを まもります。", exampleEn: "I keep my promise." },
          { jp: "映画（えいが）", romaji: "eiga", en: "movie", example: "えいがを みます。", exampleEn: "I watch a movie." },
          { jp: "喫茶店（きっさてん）", romaji: "kissaten", en: "coffee shop, cafe", example: "きっさてんに います。", exampleEn: "I am at the cafe." },
          { jp: "土曜日（どようび）", romaji: "doyoubi", en: "Saturday", example: "どようびに あいましょう。", exampleEn: "Let's meet on Saturday." },
          { jp: "時間（じかん）", romaji: "jikan", en: "time", example: "じかんを きめます。", exampleEn: "We decide on the time." },
          { jp: "行く（いく）", romaji: "iku", en: "to go", example: "がっこうに いきます。", exampleEn: "I go to school." }
        ],
        grammar: [
          { point: "〜に いきます", en: "go to a place (に marks destination)", example: "えいがに いきます。", exampleEn: "I go to a movie." },
          { point: "〜ませんか", en: "won't you ...? (invitation)", example: "デートに いきませんか。", exampleEn: "Won't you go on a date with me?" }
        ],
        quiz: [
          { q: "やくそく means:", choices: ["promise", "movie", "cafe", "date"], answer: 0, explain: "約束 (やくそく) = a promise or appointment." },
          { q: "えいが means:", choices: ["movie", "book", "music", "photo"], answer: 0, explain: "映画 (えいが) = movie; えいがを みます = watch a movie." },
          { q: "どようび means:", choices: ["Saturday", "Sunday", "Monday", "Friday"], answer: 0, explain: "土曜日 (どようび) = Saturday; 日曜日 = Sunday." }
        ]
      },
      {
        day: 9,
        emoji: "🔧",
        stage: "Lesson 3",
        title: "Lesson 3 — Making a Date · Grammar",
        jp: "どうし と じょし",
        vocab: [
          { jp: "動詞（どうし）", romaji: "doushi", en: "verb", example: "どうしを おぼえます。", exampleEn: "I memorize verbs." },
          { jp: "助詞（じょし）", romaji: "joshi", en: "particle", example: "じょしは たいせつです。", exampleEn: "Particles are important." },
          { jp: "食べる（たべる）", romaji: "taberu", en: "to eat", example: "りんごを たべます。", exampleEn: "I eat an apple." },
          { jp: "飲む（のむ）", romaji: "nomu", en: "to drink", example: "水を のみます。", exampleEn: "I drink water." },
          { jp: "見る（みる）", romaji: "miru", en: "to see, watch", example: "えいがを みます。", exampleEn: "I watch a movie." },
          { jp: "聞く（きく）", romaji: "kiku", en: "to listen, ask", example: "おんがくを ききます。", exampleEn: "I listen to music." },
          { jp: "話す（はなす）", romaji: "hanasu", en: "to speak, talk", example: "ともだちと はなします。", exampleEn: "I talk with a friend." }
        ],
        grammar: [
          { point: "Nを + verb", en: "を marks the direct object", example: "りんごを たべます。", exampleEn: "I eat an apple." },
          { point: "Nへ / Nに いきます", en: "destination with へ or に", example: "がっこうへ いきます。", exampleEn: "I go to school." },
          { point: "Nと", en: "together with", example: "ともだちと はなします。", exampleEn: "I talk with a friend." }
        ],
        quiz: [
          { q: "たべる means:", choices: ["to eat", "to drink", "to see", "to sleep"], answer: 0, explain: "食べる (たべる) = to eat; のむ = drink, みる = see." },
          { q: "Fill in: りんご___たべます。", choices: ["を", "に", "が", "と"], answer: 0, explain: "りんご is the object of たべます, so use the object particle を." },
          { q: "じょし means:", choices: ["particle", "verb", "noun", "adjective"], answer: 0, explain: "助詞 (じょし) = particle, e.g. は, が, を, に." }
        ]
      },
      {
        day: 10,
        emoji: "🏯",
        stage: "Lesson 3",
        title: "Lesson 3 — Houses, Days & Months",
        jp: "いえ と カレンダー",
        vocab: [
          { jp: "家（いえ）", romaji: "ie", en: "house, home", example: "いえに かえります。", exampleEn: "I return home." },
          { jp: "部屋（へや）", romaji: "heya", en: "room", example: "へやに ねこが います。", exampleEn: "There is a cat in the room." },
          { jp: "日曜日（にちようび）", romaji: "nichiyoubi", en: "Sunday", example: "にちようびは やすみです。", exampleEn: "Sunday is a day off." },
          { jp: "月曜日（げつようび）", romaji: "getsuyoubi", en: "Monday", example: "げつようびに がっこうへ いきます。", exampleEn: "I go to school on Monday." },
          { jp: "一月（いちがつ）", romaji: "ichigatsu", en: "January", example: "いちがつは さむいです。", exampleEn: "January is cold." },
          { jp: "今日（きょう）", romaji: "kyou", en: "today", example: "きょうは いい てんきです。", exampleEn: "Today is nice weather." },
          { jp: "明日（あした）", romaji: "ashita", en: "tomorrow", example: "あした えいがを みます。", exampleEn: "I will see a movie tomorrow." }
        ],
        grammar: [
          { point: "〜に (day/date)", en: "on a day: 月曜日に = on Monday", example: "月曜日に しけんが あります。", exampleEn: "There is an exam on Monday." },
          { point: "〜から〜まで", en: "from ... to ...", example: "月曜日から 金曜日まで がっこうです。", exampleEn: "School is from Monday to Friday." }
        ],
        quiz: [
          { q: "にちようび means:", choices: ["Sunday", "Saturday", "Monday", "Tuesday"], answer: 0, explain: "日曜日 (にちようび) = Sunday; 土曜日 = Saturday." },
          { q: "いちがつ means:", choices: ["January", "October", "one o'clock", "one day"], answer: 0, explain: "一月 (いちがつ) = January; 〜月 (がつ) makes months." },
          { q: "あした means:", choices: ["tomorrow", "today", "yesterday", "tonight"], answer: 0, explain: "明日 (あした) = tomorrow; きょう = today, きのう = yesterday." }
        ]
      },
      {
        day: 11,
        emoji: "🌸",
        stage: "Lesson 4",
        title: "Lesson 4 — The First Date · Vocabulary",
        jp: "はじめての デート",
        vocab: [
          { jp: "初めて（はじめて）", romaji: "hajimete", en: "first time", example: "はじめての デートです。", exampleEn: "It is our first date." },
          { jp: "公園（こうえん）", romaji: "kouen", en: "park", example: "こうえんを あるきます。", exampleEn: "I walk in the park." },
          { jp: "レストラン", romaji: "resutoran", en: "restaurant", example: "レストランで たべます。", exampleEn: "I eat at a restaurant." },
          { jp: "料理（りょうり）", romaji: "ryouri", en: "dish, cooking", example: "りょうりが おいしいです。", exampleEn: "The food is delicious." },
          { jp: "美味しい（おいしい）", romaji: "oishii", en: "delicious", example: "この ケーキは おいしいです。", exampleEn: "This cake is delicious." },
          { jp: "楽しい（たのしい）", romaji: "tanoshii", en: "fun, enjoyable", example: "デートは たのしいです。", exampleEn: "The date is fun." },
          { jp: "写真（しゃしん）", romaji: "shashin", en: "photo", example: "しゃしんを とります。", exampleEn: "I take a photo." }
        ],
        grammar: [
          { point: "い-adjective + N", en: "い-adjectives directly modify nouns", example: "おいしい りょうりです。", exampleEn: "It is delicious food." },
          { point: "Nが あります", en: "there is a place (inanimate)", example: "こうえんが あります。", exampleEn: "There is a park." }
        ],
        quiz: [
          { q: "おいしい means:", choices: ["delicious", "fun", "cold", "beautiful"], answer: 0, explain: "美味しい (おいしい) = delicious; たのしい = fun." },
          { q: "こうえん means:", choices: ["park", "restaurant", "photo", "food"], answer: 0, explain: "公園 (こうえん) = park." },
          { q: "たのしい means:", choices: ["fun", "delicious", "busy", "far"], answer: 0, explain: "楽しい (たのしい) = fun, enjoyable." }
        ]
      },
      {
        day: 12,
        emoji: "📍",
        stage: "Lesson 4",
        title: "Lesson 4 — The First Date · Grammar",
        jp: "あります と います",
        vocab: [
          { jp: "猫（ねこ）", romaji: "neko", en: "cat", example: "ねこが います。", exampleEn: "There is a cat." },
          { jp: "犬（いぬ）", romaji: "inu", en: "dog", example: "いぬと あるきます。", exampleEn: "I walk with a dog." },
          { jp: "上（うえ）", romaji: "ue", en: "on, above", example: "つくえの うえです。", exampleEn: "It is on the desk." },
          { jp: "下（した）", romaji: "shita", en: "under, below", example: "いすの したです。", exampleEn: "It is under the chair." },
          { jp: "中（なか）", romaji: "naka", en: "inside", example: "かばんの なかです。", exampleEn: "It is inside the bag." },
          { jp: "前（まえ）", romaji: "mae", en: "in front of", example: "みせの まえです。", exampleEn: "It is in front of the shop." },
          { jp: "後ろ（うしろ）", romaji: "ushiro", en: "behind", example: "いえの うしろです。", exampleEn: "It is behind the house." }
        ],
        grammar: [
          { point: "Nが あります", en: "there is / are (things, plants)", example: "つくえの うえに ほんが あります。", exampleEn: "There is a book on the desk." },
          { point: "Nが います", en: "there is / are (people, animals)", example: "へやに ねこが います。", exampleEn: "There is a cat in the room." },
          { point: "場所に", en: "location marker with existence verbs", example: "こうえんに いぬが います。", exampleEn: "There is a dog in the park." }
        ],
        quiz: [
          { q: "ねこ means:", choices: ["cat", "dog", "book", "room"], answer: 0, explain: "猫 (ねこ) = cat; いぬ = dog." },
          { q: "Fill in: つくえの うえに ほんが___。", choices: ["あります", "います", "します", "です"], answer: 0, explain: "A book is an inanimate object, so use あります." },
          { q: "Fill in: へやに ねこが___。", choices: ["います", "あります", "します", "なります"], answer: 0, explain: "A cat is alive, so use います." }
        ]
      },
      {
        day: 13,
        emoji: "🗾",
        stage: "Lesson 4",
        title: "Lesson 4 — Holidays & Directions",
        jp: "しゅくじつ と みち",
        vocab: [
          { jp: "祝日（しゅくじつ）", romaji: "shukujitsu", en: "national holiday", example: "しゅくじつは やすみです。", exampleEn: "National holidays are days off." },
          { jp: "道（みち）", romaji: "michi", en: "road, street", example: "みちが せまいです。", exampleEn: "The road is narrow." },
          { jp: "右（みぎ）", romaji: "migi", en: "right", example: "みぎに まがります。", exampleEn: "I turn right." },
          { jp: "左（ひだり）", romaji: "hidari", en: "left", example: "ひだりに あります。", exampleEn: "It is on the left." },
          { jp: "駅（えき）", romaji: "eki", en: "station", example: "えきで あいましょう。", exampleEn: "Let's meet at the station." },
          { jp: "近く（ちかく）", romaji: "chikaku", en: "nearby", example: "ちかくに みせが あります。", exampleEn: "There is a shop nearby." },
          { jp: "遠い（とおい）", romaji: "tooi", en: "far", example: "えきは とおいです。", exampleEn: "The station is far." }
        ],
        grammar: [
          { point: "〜に まがります", en: "turn to the right/left", example: "みぎに まがってください。", exampleEn: "Please turn right." },
          { point: "〜が あります", en: "there is a building/place", example: "ちかくに えきが あります。", exampleEn: "There is a station nearby." },
          { point: "〜は 〜に あります", en: "is located at", example: "みせは えきの ちかくに あります。", exampleEn: "The shop is near the station." }
        ],
        quiz: [
          { q: "みぎ means:", choices: ["right", "left", "road", "station"], answer: 0, explain: "右 (みぎ) = right; ひだり = left." },
          { q: "えき means:", choices: ["station", "holiday", "street", "near"], answer: 0, explain: "駅 (えき) = station; えきで あう = meet at the station." },
          { q: "しゅくじつ means:", choices: ["national holiday", "weekend", "birthday", "school day"], answer: 0, explain: "祝日 (しゅくじつ) = a national holiday." }
        ]
      },
      {
        day: 14,
        emoji: "🏅",
        stage: "Review",
        title: "Review — Checkpoint 2 · Review",
        jp: "ふくしゅう 2",
        vocab: [
          { jp: "覚える（おぼえる）", romaji: "oboeru", en: "to memorize, learn", example: "かんじを おぼえます。", exampleEn: "I memorize kanji." },
          { jp: "忘れる（わすれる）", romaji: "wasureru", en: "to forget", example: "なまえを わすれました。", exampleEn: "I forgot the name." },
          { jp: "練習（れんしゅう）", romaji: "renshuu", en: "practice", example: "かいわを れんしゅうします。", exampleEn: "I practice conversation." },
          { jp: "会話（かいわ）", romaji: "kaiwa", en: "conversation", example: "かいわが じょうずです。", exampleEn: "You are good at conversation." },
          { jp: "単語（たんご）", romaji: "tango", en: "word, vocabulary", example: "たんごを おぼえます。", exampleEn: "I memorize words." },
          { jp: "文（ぶん）", romaji: "bun", en: "sentence", example: "ぶんを かきます。", exampleEn: "I write a sentence." },
          { jp: "間違える（まちがえる）", romaji: "machigaeru", en: "to make a mistake", example: "こたえを まちがえました。", exampleEn: "I got the answer wrong." }
        ],
        grammar: [
          { point: "〜てください", en: "please do ...", example: "こたえてください。", exampleEn: "Please answer." },
          { point: "〜ましょう", en: "let's ...", example: "ふくしゅうしましょう。", exampleEn: "Let's review." }
        ],
        quiz: [
          { q: "おぼえる means:", choices: ["to memorize", "to forget", "to write", "to read"], answer: 0, explain: "覚える (おぼえる) = to memorize; わすれる = to forget." },
          { q: "わすれる means:", choices: ["to forget", "to remember", "to practice", "to answer"], answer: 0, explain: "忘れる (わすれる) = to forget." },
          { q: "れんしゅう means:", choices: ["practice", "conversation", "sentence", "word"], answer: 0, explain: "練習 (れんしゅう) = practice; かいわ = conversation." }
        ]
      },
      {
        day: 15,
        emoji: "🌴",
        stage: "Lesson 5",
        title: "Lesson 5 — A Trip to Okinawa · Vocabulary",
        jp: "おきなわ りょこう",
        vocab: [
          { jp: "旅行（りょこう）", romaji: "ryokou", en: "trip, travel", example: "りょこうが たのしいです。", exampleEn: "The trip is fun." },
          { jp: "沖縄（おきなわ）", romaji: "okinawa", en: "Okinawa", example: "おきなわへ いきます。", exampleEn: "I go to Okinawa." },
          { jp: "海（うみ）", romaji: "umi", en: "sea, ocean", example: "うみが きれいです。", exampleEn: "The sea is beautiful." },
          { jp: "島（しま）", romaji: "shima", en: "island", example: "しまに います。", exampleEn: "I am on the island." },
          { jp: "飛行機（ひこうき）", romaji: "hikouki", en: "airplane", example: "ひこうきで いきます。", exampleEn: "I go by airplane." },
          { jp: "ホテル", romaji: "hoteru", en: "hotel", example: "ホテルに とまります。", exampleEn: "I stay at a hotel." },
          { jp: "荷物（にもつ）", romaji: "nimotsu", en: "luggage, baggage", example: "にもつが おおいです。", exampleEn: "I have a lot of luggage." }
        ],
        grammar: [
          { point: "〜へ いきます", en: "go toward a destination", example: "おきなわへ いきます。", exampleEn: "I go to Okinawa." },
          { point: "Nで (means)", en: "by means of transportation", example: "ひこうきで いきます。", exampleEn: "I go by plane." }
        ],
        quiz: [
          { q: "りょこう means:", choices: ["trip", "hotel", "ocean", "luggage"], answer: 0, explain: "旅行 (りょこう) = travel / trip." },
          { q: "うみ means:", choices: ["sea", "island", "plane", "hotel"], answer: 0, explain: "海 (うみ) = sea; しま = island." },
          { q: "ひこうき means:", choices: ["airplane", "train", "bus", "ticket"], answer: 0, explain: "飛行機 (ひこうき) = airplane; ひこうきで = by plane." }
        ]
      },
      {
        day: 16,
        emoji: "🎆",
        stage: "Lesson 5",
        title: "Lesson 5 — Okinawa · Grammar & Festivals",
        jp: "けいようし と まつり",
        vocab: [
          { jp: "祭り（まつり）", romaji: "matsuri", en: "festival", example: "まつりに いきます。", exampleEn: "I go to the festival." },
          { jp: "綺麗（きれい）", romaji: "kirei", en: "beautiful, clean", example: "はなびが きれいです。", exampleEn: "The fireworks are beautiful." },
          { jp: "静か（しずか）", romaji: "shizuka", en: "quiet", example: "うみは しずかです。", exampleEn: "The sea is quiet." },
          { jp: "賑やか（にぎやか）", romaji: "nigiyaka", en: "lively, bustling", example: "まつりは にぎやかです。", exampleEn: "The festival is lively." },
          { jp: "花火（はなび）", romaji: "hanabi", en: "fireworks", example: "はなびを みます。", exampleEn: "I watch fireworks." },
          { jp: "太鼓（たいこ）", romaji: "taiko", en: "drum", example: "たいこを たたきます。", exampleEn: "I beat the drum." },
          { jp: "踊り（おどり）", romaji: "odori", en: "dance", example: "おどりを みます。", exampleEn: "I watch the dance." }
        ],
        grammar: [
          { point: "な-adjective + N", en: "add な before a noun: きれいな はなび", example: "きれいな はなびです。", exampleEn: "It is a beautiful firework." },
          { point: "な-adjective + です", en: "na-adjectives take です without な", example: "まつりは にぎやかです。", exampleEn: "The festival is lively." },
          { point: "〜が あります", en: "an event exists", example: "まつりが あります。", exampleEn: "There is a festival." }
        ],
        quiz: [
          { q: "まつり means:", choices: ["festival", "fireworks", "drum", "dance"], answer: 0, explain: "祭り (まつり) = festival." },
          { q: "きれい is what kind of adjective?", choices: ["な-adjective", "い-adjective", "verb", "particle"], answer: 0, explain: "きれい is a な-adjective: きれいな はなび, きれいです." },
          { q: "Fill in: しずか___へやです。", choices: ["な", "い", "の", "に"], answer: 0, explain: "しずか is a な-adjective, so it becomes しずかな へや." }
        ]
      },
      {
        day: 17,
        emoji: "🌞",
        stage: "Lesson 6",
        title: "Lesson 6 — Robert's Day · Vocabulary",
        jp: "ロバートさんの いちにち",
        vocab: [
          { jp: "一日（いちにち）", romaji: "ichinichi", en: "day, one day", example: "ロバートさんの いちにちです。", exampleEn: "This is Robert's day." },
          { jp: "起きる（おきる）", romaji: "okiru", en: "to get up", example: "六時に おきます。", exampleEn: "I get up at six." },
          { jp: "朝ご飯（あさごはん）", romaji: "asagohan", en: "breakfast", example: "あさごはんを たべます。", exampleEn: "I eat breakfast." },
          { jp: "学校（がっこう）", romaji: "gakkou", en: "school", example: "がっこうへ いきます。", exampleEn: "I go to school." },
          { jp: "仕事（しごと）", romaji: "shigoto", en: "work, job", example: "しごとが あります。", exampleEn: "I have work." },
          { jp: "昼ご飯（ひるごはん）", romaji: "hirugohan", en: "lunch", example: "ひるごはんを たべます。", exampleEn: "I eat lunch." },
          { jp: "寝る（ねる）", romaji: "neru", en: "to sleep, go to bed", example: "十一時に ねます。", exampleEn: "I go to bed at eleven." }
        ],
        grammar: [
          { point: "〜時に", en: "at ... o'clock", example: "六時に おきます。", exampleEn: "I get up at six." },
          { point: "〜から〜まで", en: "from ... until ...", example: "九時から 五時まで しごとです。", exampleEn: "I work from nine to five." }
        ],
        quiz: [
          { q: "おきる means:", choices: ["to get up", "to sleep", "to eat", "to go"], answer: 0, explain: "起きる (おきる) = to get up; ねる = to sleep." },
          { q: "あさごはん means:", choices: ["breakfast", "lunch", "dinner", "snack"], answer: 0, explain: "朝ご飯 (あさごはん) = breakfast; 昼ご飯 = lunch." },
          { q: "しごと means:", choices: ["work", "school", "homework", "rest"], answer: 0, explain: "仕事 (しごと) = work / job." }
        ]
      },
      {
        day: 18,
        emoji: "🧩",
        stage: "Lesson 6",
        title: "Lesson 6 — Robert's Day · Te-form",
        jp: "て-けい",
        vocab: [
          { jp: "て形（てけい）", romaji: "tekei", en: "te-form of a verb", example: "てけいを れんしゅうします。", exampleEn: "I practice the te-form." },
          { jp: "書く（かく）", romaji: "kaku", en: "to write", example: "てがみを かきます。", exampleEn: "I write a letter." },
          { jp: "泳ぐ（およぐ）", romaji: "oyogu", en: "to swim", example: "うみで およぎます。", exampleEn: "I swim in the sea." },
          { jp: "話す（はなす）", romaji: "hanasu", en: "to talk", example: "ともだちと はなします。", exampleEn: "I talk with a friend." },
          { jp: "取る（とる）", romaji: "toru", en: "to take", example: "しゃしんを とります。", exampleEn: "I take a photo." },
          { jp: "買う（かう）", romaji: "kau", en: "to buy", example: "ほんを かいます。", exampleEn: "I buy a book." },
          { jp: "する", romaji: "suru", en: "to do", example: "しゅくだいを します。", exampleEn: "I do homework." }
        ],
        grammar: [
          { point: "Verbて (te-form)", en: "connects actions: かく → かいて, およぐ → およいで", example: "かいて、みせに だします。", exampleEn: "Write it and hand it in." },
          { point: "〜てください", en: "please do ...", example: "ここに かいてください。", exampleEn: "Please write here." },
          { point: "〜ています", en: "is doing (ongoing action)", example: "いま しごとを しています。", exampleEn: "I am working now." }
        ],
        quiz: [
          { q: "What is the te-form of かく (write)?", choices: ["かいて", "かきて", "かくて", "かけり"], answer: 0, explain: "かく is a う-verb: く → いて, so かいて." },
          { q: "What is the te-form of およぐ (swim)?", choices: ["およいで", "およぎて", "およぐて", "およんで"], answer: 0, explain: "およぐ is a う-verb: ぐ → いで, so およいで." },
          { q: "Fill in: ここに___ください。", choices: ["かいて", "かき", "かく", "かけ"], answer: 0, explain: "〜てください requires the te-form: かいてください = please write." }
        ]
      },
      {
        day: 19,
        emoji: "🏫",
        stage: "Lesson 6",
        title: "Lesson 6 — Robert's Day · School & Directions",
        jp: "がっこう と みち",
        vocab: [
          { jp: "図書館（としょかん）", romaji: "toshokan", en: "library", example: "としょかんに います。", exampleEn: "I am in the library." },
          { jp: "食堂（しょくどう）", romaji: "shokudou", en: "cafeteria", example: "しょくどうで たべます。", exampleEn: "I eat in the cafeteria." },
          { jp: "体育館（たいいくかん）", romaji: "taiikukan", en: "gymnasium", example: "たいいくかんに いきます。", exampleEn: "I go to the gym." },
          { jp: "受付（うけつけ）", romaji: "uketsuke", en: "reception desk", example: "うけつけに あります。", exampleEn: "It is at the reception desk." },
          { jp: "階段（かいだん）", romaji: "kaidan", en: "stairs", example: "かいだんを のぼります。", exampleEn: "I climb the stairs." },
          { jp: "隣（となり）", romaji: "tonari", en: "next to", example: "しょくどうの となりです。", exampleEn: "It is next to the cafeteria." },
          { jp: "向かい（むかい）", romaji: "mukai", en: "opposite, across from", example: "としょかんの むかいです。", exampleEn: "It is across from the library." }
        ],
        grammar: [
          { point: "Nは Nの となりに あります", en: "is next to ...", example: "としょかんは しょくどうの となりに あります。", exampleEn: "The library is next to the cafeteria." },
          { point: "〜を まがります", en: "turn at a corner or stairs", example: "かいだんを まがってください。", exampleEn: "Please turn at the stairs." },
          { point: "〜が あります", en: "facilities exist", example: "がっこうに としょかんが あります。", exampleEn: "There is a library at school." }
        ],
        quiz: [
          { q: "としょかん means:", choices: ["library", "cafeteria", "gym", "reception"], answer: 0, explain: "図書館 (としょかん) = library." },
          { q: "となり means:", choices: ["next to", "behind", "under", "far"], answer: 0, explain: "隣 (となり) = next to; むかい = across from." },
          { q: "しょくどう means:", choices: ["cafeteria", "library", "stairs", "classroom"], answer: 0, explain: "食堂 (しょくどう) = cafeteria / dining hall." }
        ]
      },
      {
        day: 20,
        emoji: "👨‍👩‍👧‍👦",
        stage: "Lesson 7",
        title: "Lesson 7 — Family Picture · Vocabulary",
        jp: "かぞくの しゃしん",
        vocab: [
          { jp: "家族（かぞく）", romaji: "kazoku", en: "family", example: "かぞくの しゃしんです。", exampleEn: "It is a family photo." },
          { jp: "両親（りょうしん）", romaji: "ryoushin", en: "parents", example: "りょうしんと くらしています。", exampleEn: "I live with my parents." },
          { jp: "父（ちち）", romaji: "chichi", en: "father (my)", example: "ちちは いしゃです。", exampleEn: "My father is a doctor." },
          { jp: "母（はは）", romaji: "haha", en: "mother (my)", example: "ははは やさしいです。", exampleEn: "My mother is kind." },
          { jp: "兄（あに）", romaji: "ani", en: "older brother (my)", example: "あにが います。", exampleEn: "I have an older brother." },
          { jp: "姉（あね）", romaji: "ane", en: "older sister (my)", example: "あねは がくせいです。", exampleEn: "My older sister is a student." },
          { jp: "妹（いもうと）", romaji: "imouto", en: "younger sister (my)", example: "いもうとと あそびます。", exampleEn: "I play with my younger sister." }
        ],
        grammar: [
          { point: "Nの N", en: "possessive with の", example: "わたしの かぞくです。", exampleEn: "This is my family." },
          { point: "Nが います", en: "there is / I have (people)", example: "あにが います。", exampleEn: "I have an older brother." }
        ],
        quiz: [
          { q: "かぞく means:", choices: ["family", "friend", "photo", "teacher"], answer: 0, explain: "家族 (かぞく) = family." },
          { q: "あね means:", choices: ["older sister", "older brother", "younger sister", "mother"], answer: 0, explain: "姉 (あね) = older sister; あに = older brother." },
          { q: "りょうしん means:", choices: ["parents", "children", "grandparents", "siblings"], answer: 0, explain: "両親 (りょうしん) = parents (father and mother)." }
        ]
      },
      {
        day: 21,
        emoji: "🧍",
        stage: "Lesson 7",
        title: "Lesson 7 — Family Picture · Grammar",
        jp: "かぞく と からだ",
        vocab: [
          { jp: "身体（からだ）", romaji: "karada", en: "body", example: "からだが つかれました。", exampleEn: "My body is tired." },
          { jp: "頭（あたま）", romaji: "atama", en: "head", example: "あたまが いたいです。", exampleEn: "I have a headache." },
          { jp: "手（て）", romaji: "te", en: "hand, arm", example: "てを あらいます。", exampleEn: "I wash my hands." },
          { jp: "足（あし）", romaji: "ashi", en: "foot, leg", example: "あしが いたいです。", exampleEn: "My foot hurts." },
          { jp: "目（め）", romaji: "me", en: "eye", example: "めが ふたつ あります。", exampleEn: "I have two eyes." },
          { jp: "耳（みみ）", romaji: "mimi", en: "ear", example: "みみが ちいさいです。", exampleEn: "The ears are small." },
          { jp: "口（くち）", romaji: "kuchi", en: "mouth", example: "くちを あけます。", exampleEn: "I open my mouth." }
        ],
        grammar: [
          { point: "Nが ふたつ あります", en: "counting body parts with あります", example: "めが ふたつ あります。", exampleEn: "I have two eyes." },
          { point: "Nが 〜にん います", en: "counting people with います", example: "かぞくが ごにん います。", exampleEn: "There are five people in my family." },
          { point: "い-adjective with です", en: "describing with an adjective", example: "あたまは おおきいです。", exampleEn: "The head is big." }
        ],
        quiz: [
          { q: "あたま means:", choices: ["head", "hand", "eye", "mouth"], answer: 0, explain: "頭 (あたま) = head; て = hand." },
          { q: "て means:", choices: ["hand", "foot", "ear", "leg"], answer: 0, explain: "手 (て) = hand / arm; あし = foot / leg." },
          { q: "Fill in: めが ふたつ___。", choices: ["あります", "います", "します", "なります"], answer: 0, explain: "Eyes are body parts (inanimate): めが ふたつ あります." }
        ]
      },
      {
        day: 22,
        emoji: "🍖",
        stage: "Lesson 8",
        title: "Lesson 8 — Barbecue · Vocabulary",
        jp: "バーベキュー",
        vocab: [
          { jp: "バーベキュー", romaji: "baabekyuu", en: "barbecue", example: "バーベキューを します。", exampleEn: "We have a barbecue." },
          { jp: "肉（にく）", romaji: "niku", en: "meat", example: "にくを やきます。", exampleEn: "I grill meat." },
          { jp: "野菜（やさい）", romaji: "yasai", en: "vegetable", example: "やさいも やきます。", exampleEn: "I grill vegetables too." },
          { jp: "炭（すみ）", romaji: "sumi", en: "charcoal", example: "すみに ひを つけます。", exampleEn: "I light the charcoal." },
          { jp: "火（ひ）", romaji: "hi", en: "fire", example: "ひが もえています。", exampleEn: "The fire is burning." },
          { jp: "焼く（やく）", romaji: "yaku", en: "to grill, bake", example: "にくを やいて たべます。", exampleEn: "I grill the meat and eat it." },
          { jp: "美味しい（おいしい）", romaji: "oishii", en: "delicious", example: "やいた にくは おいしいです。", exampleEn: "The grilled meat is delicious." }
        ],
        grammar: [
          { point: "Nを やきます", en: "grill something (を marks the object)", example: "にくと やさいを やきます。", exampleEn: "I grill meat and vegetables." },
          { point: "〜ましょう", en: "let's do ...", example: "バーベキューを しましょう。", exampleEn: "Let's have a barbecue." }
        ],
        quiz: [
          { q: "にく means:", choices: ["meat", "vegetable", "fire", "charcoal"], answer: 0, explain: "肉 (にく) = meat; やさい = vegetable." },
          { q: "やさい means:", choices: ["vegetable", "meat", "rice", "fish"], answer: 0, explain: "野菜 (やさい) = vegetable." },
          { q: "やく means:", choices: ["to grill", "to drink", "to sleep", "to buy"], answer: 0, explain: "焼く (やく) = to grill / bake; te-form やいて." }
        ]
      },
      {
        day: 23,
        emoji: "🍣",
        stage: "Lesson 8",
        title: "Lesson 8 — Barbecue · Grammar & Food",
        jp: "みじかい けい と たべもの",
        vocab: [
          { jp: "短い（みじかい）", romaji: "mijikai", en: "short", example: "みじかい じかんです。", exampleEn: "It is a short time." },
          { jp: "長い（ながい）", romaji: "nagai", en: "long", example: "ながい みちです。", exampleEn: "It is a long road." },
          { jp: "大きい（おおきい）", romaji: "ookii", en: "big", example: "おおきい にくです。", exampleEn: "It is a big piece of meat." },
          { jp: "小さい（ちいさい）", romaji: "chiisai", en: "small", example: "ちいさい みせです。", exampleEn: "It is a small shop." },
          { jp: "新しい（あたらしい）", romaji: "atarashii", en: "new", example: "あたらしい ほんです。", exampleEn: "It is a new book." },
          { jp: "古い（ふるい）", romaji: "furui", en: "old", example: "ふるい じてんです。", exampleEn: "It is an old dictionary." },
          { jp: "食べ物（たべもの）", romaji: "tabemono", en: "food", example: "たべものが たくさん あります。", exampleEn: "There is a lot of food." }
        ],
        grammar: [
          { point: "い-adjective + N", en: "い-adjective directly precedes a noun", example: "おおきい にくを やきます。", exampleEn: "I grill a big piece of meat." },
          { point: "Nは い-adjectiveです", en: "predicate adjective", example: "この にくは おおきいです。", exampleEn: "This meat is big." },
          { point: "Nが すきです", en: "like something", example: "やさいが すきです。", exampleEn: "I like vegetables." }
        ],
        quiz: [
          { q: "みじかい means:", choices: ["short", "long", "big", "old"], answer: 0, explain: "短い (みじかい) = short; ながい = long." },
          { q: "おおきい means:", choices: ["big", "small", "new", "cheap"], answer: 0, explain: "大きい (おおきい) = big; ちいさい = small." },
          { q: "Fill in: やさいが___です。", choices: ["すき", "すきな", "すきに", "すきで"], answer: 0, explain: "Nが すきです = like N: やさいが すきです." }
        ]
      },
      {
        day: 24,
        emoji: "🎭",
        stage: "Lesson 9",
        title: "Lesson 9 — Kabuki · Vocabulary",
        jp: "かぶき",
        vocab: [
          { jp: "歌舞伎（かぶき）", romaji: "kabuki", en: "kabuki theater", example: "かぶきを みます。", exampleEn: "I watch kabuki." },
          { jp: "俳優（はいゆう）", romaji: "haiyuu", en: "actor", example: "はいゆうが すばらしいです。", exampleEn: "The actor is wonderful." },
          { jp: "舞台（ぶたい）", romaji: "butai", en: "stage", example: "ぶたいに でます。", exampleEn: "I appear on stage." },
          { jp: "着物（きもの）", romaji: "kimono", en: "kimono", example: "きものを きます。", exampleEn: "I wear a kimono." },
          { jp: "化粧（けしょう）", romaji: "keshou", en: "makeup", example: "けしょうが おもしろいです。", exampleEn: "The makeup is interesting." },
          { jp: "扇子（せんす）", romaji: "sensu", en: "folding fan", example: "せんすを もちます。", exampleEn: "I hold a folding fan." },
          { jp: "伝統（でんとう）", romaji: "dentou", en: "tradition", example: "でんとうが あります。", exampleEn: "There is a tradition." }
        ],
        grammar: [
          { point: "Nを みます", en: "watch something", example: "かぶきを みます。", exampleEn: "I watch kabuki." },
          { point: "Nに いきます", en: "go to an event/place", example: "ぶたいに いきます。", exampleEn: "I go to the stage." }
        ],
        quiz: [
          { q: "かぶき means:", choices: ["kabuki theater", "kimono", "fan", "actor"], answer: 0, explain: "歌舞伎 (かぶき) = kabuki, traditional Japanese theater." },
          { q: "きもの means:", choices: ["kimono", "makeup", "stage", "fan"], answer: 0, explain: "着物 (きもの) = kimono; せんす = folding fan." },
          { q: "はいゆう means:", choices: ["actor", "tradition", "makeup", "stage"], answer: 0, explain: "俳優 (はいゆう) = actor." }
        ]
      },
      {
        day: 25,
        emoji: "🎨",
        stage: "Lesson 9",
        title: "Lesson 9 — Kabuki · Grammar & Culture",
        jp: "かこけい と ぶんか",
        vocab: [
          { jp: "過去（かこ）", romaji: "kako", en: "the past", example: "かこについて はなします。", exampleEn: "We talk about the past." },
          { jp: "文化（ぶんか）", romaji: "bunka", en: "culture", example: "にほんの ぶんかが すきです。", exampleEn: "I like Japanese culture." },
          { jp: "昨日（きのう）", romaji: "kinou", en: "yesterday", example: "きのう かぶきを みました。", exampleEn: "I saw kabuki yesterday." },
          { jp: "先週（せんしゅう）", romaji: "senshuu", en: "last week", example: "せんしゅう びじゅつかんに いきました。", exampleEn: "I went to the art museum last week." },
          { jp: "美術館（びじゅつかん）", romaji: "bijutsukan", en: "art museum", example: "びじゅつかんに います。", exampleEn: "I am at the art museum." },
          { jp: "芝居（しばい）", romaji: "shibai", en: "play, theater performance", example: "しばいを みました。", exampleEn: "I saw a play." },
          { jp: "経験（けいけん）", romaji: "keiken", en: "experience", example: "いい けいけんでした。", exampleEn: "It was a good experience." }
        ],
        grammar: [
          { point: "〜ました (past)", en: "polite past tense of verbs", example: "かぶきを みました。", exampleEn: "I saw kabuki." },
          { point: "〜ませんでした", en: "polite negative past", example: "きのうは いきませんでした。", exampleEn: "I didn't go yesterday." },
          { point: "〜が ありました", en: "there was ...", example: "まつりが ありました。", exampleEn: "There was a festival." }
        ],
        quiz: [
          { q: "きのう means:", choices: ["yesterday", "today", "tomorrow", "last week"], answer: 0, explain: "昨日 (きのう) = yesterday; せんしゅう = last week." },
          { q: "Fill in: かぶきを___。 (I saw kabuki)", choices: ["みました", "みます", "みる", "みて"], answer: 0, explain: "みる → みました is the polite past form: saw." },
          { q: "びじゅつかん means:", choices: ["art museum", "library", "station", "restaurant"], answer: 0, explain: "美術館 (びじゅつかん) = art museum." }
        ]
      },
      {
        day: 26,
        emoji: "⛄",
        stage: "Lesson 10",
        title: "Lesson 10 — Winter Plans · Vocabulary",
        jp: "ふゆやすみの よてい",
        vocab: [
          { jp: "冬休み（ふゆやすみ）", romaji: "fuyuyasumi", en: "winter vacation", example: "ふゆやすみが あります。", exampleEn: "There is a winter vacation." },
          { jp: "予定（よてい）", romaji: "yotei", en: "plan, schedule", example: "よていを きめます。", exampleEn: "I decide on my plans." },
          { jp: "雪（ゆき）", romaji: "yuki", en: "snow", example: "ゆきが ふっています。", exampleEn: "It is snowing." },
          { jp: "寒い（さむい）", romaji: "samui", en: "cold", example: "きょうは さむいです。", exampleEn: "Today is cold." },
          { jp: "スキー", romaji: "sukii", en: "skiing", example: "スキーを します。", exampleEn: "I go skiing." },
          { jp: "温泉（おんせん）", romaji: "onsen", en: "hot spring", example: "おんせんに いきます。", exampleEn: "I go to a hot spring." },
          { jp: "帰る（かえる）", romaji: "kaeru", en: "to return, go home", example: "いえに かえります。", exampleEn: "I return home." }
        ],
        grammar: [
          { point: "〜つもりです", en: "intend to ...", example: "スキーを するつもりです。", exampleEn: "I intend to go skiing." },
          { point: "〜たいです", en: "want to ...", example: "ゆきを みたいです。", exampleEn: "I want to see snow." }
        ],
        quiz: [
          { q: "ふゆやすみ means:", choices: ["winter vacation", "summer vacation", "golden week", "weekend"], answer: 0, explain: "冬休み (ふゆやすみ) = winter vacation." },
          { q: "ゆき means:", choices: ["snow", "rain", "wind", "ice"], answer: 0, explain: "雪 (ゆき) = snow; ゆきが ふる = it snows." },
          { q: "さむい means:", choices: ["cold", "hot", "fun", "far"], answer: 0, explain: "寒い (さむい) = cold (used for weather or feeling cold)." }
        ]
      },
      {
        day: 27,
        emoji: "🚄",
        stage: "Lesson 10",
        title: "Lesson 10 — Winter Plans · Grammar & Trains",
        jp: "くらべる と こうつう",
        vocab: [
          { jp: "比べる（くらべる）", romaji: "kuraberu", en: "to compare", example: "ふたつを くらべます。", exampleEn: "I compare the two." },
          { jp: "電車（でんしゃ）", romaji: "densha", en: "train", example: "でんしゃで いきます。", exampleEn: "I go by train." },
          { jp: "新幹線（しんかんせん）", romaji: "shinkansen", en: "bullet train", example: "しんかんせんは はやいです。", exampleEn: "The bullet train is fast." },
          { jp: "切符（きっぷ）", romaji: "kippu", en: "ticket", example: "きっぷを かいます。", exampleEn: "I buy a ticket." },
          { jp: "速い（はやい）", romaji: "hayai", en: "fast", example: "しんかんせんは はやいです。", exampleEn: "The bullet train is fast." },
          { jp: "高い（たかい）", romaji: "takai", en: "expensive, high", example: "きっぷは たかいです。", exampleEn: "The ticket is expensive." },
          { jp: "安い（やすい）", romaji: "yasui", en: "cheap", example: "でんしゃは やすいです。", exampleEn: "The train is cheap." }
        ],
        grammar: [
          { point: "Aより B", en: "B is ... than A", example: "でんしゃより しんかんせんの ほうが はやいです。", exampleEn: "The bullet train is faster than the train." },
          { point: "Bの ほうが", en: "B is more ... (of the two)", example: "しんかんせんの ほうが たかいです。", exampleEn: "The bullet train is more expensive." },
          { point: "Nが いちばん", en: "N is the most ...", example: "しんかんせんが いちばん はやいです。", exampleEn: "The bullet train is the fastest." }
        ],
        quiz: [
          { q: "きっぷ means:", choices: ["ticket", "train", "station", "plan"], answer: 0, explain: "切符 (きっぷ) = ticket; きっぷを かいます = buy a ticket." },
          { q: "Fill in: しんかんせんは でんしゃ___はやいです。", choices: ["より", "の", "に", "が"], answer: 0, explain: "Aより B = B is more ... than A: でんしゃより はやい = faster than the train." },
          { q: "いちばん means:", choices: ["most, -est", "more", "less", "cheap"], answer: 0, explain: "いちばん = most / -est: しんかんせんが いちばん はやいです." }
        ]
      },
      {
        day: 28,
        emoji: "📮",
        stage: "Lesson 11",
        title: "Lesson 11 — After the Vacation",
        jp: "やすみの あと",
        vocab: [
          { jp: "休み（やすみ）", romaji: "yasumi", en: "vacation, break", example: "やすみが おわりました。", exampleEn: "The vacation ended." },
          { jp: "後（あと）", romaji: "ato", en: "after", example: "やすみの あとです。", exampleEn: "It is after the vacation." },
          { jp: "レポート", romaji: "repooto", en: "report", example: "レポートを かきます。", exampleEn: "I write a report." },
          { jp: "提出（ていしゅつ）", romaji: "teishutsu", en: "submission", example: "レポートを ていしゅつしました。", exampleEn: "I submitted the report." },
          { jp: "思い出（おもいで）", romaji: "omoide", en: "memory", example: "おもいでが たくさん あります。", exampleEn: "I have many memories." },
          { jp: "忙しい（いそがしい）", romaji: "isogashii", en: "busy", example: "きょうは いそがしいです。", exampleEn: "Today I am busy." },
          { jp: "元気（げんき）", romaji: "genki", en: "healthy, energetic", example: "げんきですか。", exampleEn: "Are you well?" }
        ],
        grammar: [
          { point: "Nの あとで", en: "after ...", example: "やすみの あとで、しゅくだいを しました。", exampleEn: "After the vacation, I did homework." },
          { point: "〜てから", en: "after doing ...", example: "きいてから、かきます。", exampleEn: "I write after listening." },
          { point: "〜ました (past review)", en: "polite past tense", example: "レポートを ていしゅつしました。", exampleEn: "I submitted the report." }
        ],
        quiz: [
          { q: "おもいで means:", choices: ["memory", "report", "vacation", "break"], answer: 0, explain: "思い出 (おもいで) = memory, recollection." },
          { q: "いそがしい means:", choices: ["busy", "free", "quiet", "tired"], answer: 0, explain: "忙しい (いそがしい) = busy." },
          { q: "げんき means:", choices: ["healthy, energetic", "sick", "sad", "slow"], answer: 0, explain: "元気 (げんき) = healthy / lively; げんきですか = How are you?" }
        ]
      },
      {
        day: 29,
        emoji: "🤒",
        stage: "Lesson 12",
        title: "Lesson 12 — Feeling Ill",
        jp: "びょうき",
        vocab: [
          { jp: "病気（びょうき）", romaji: "byouki", en: "illness", example: "びょうきに なりました。", exampleEn: "I got sick." },
          { jp: "風邪（かぜ）", romaji: "kaze", en: "a cold", example: "かぜを ひきました。", exampleEn: "I caught a cold." },
          { jp: "熱（ねつ）", romaji: "netsu", en: "fever", example: "ねつが あります。", exampleEn: "I have a fever." },
          { jp: "頭痛（ずつう）", romaji: "zuutsuu", en: "headache", example: "ずつうが あります。", exampleEn: "I have a headache." },
          { jp: "薬（くすり）", romaji: "kusuri", en: "medicine", example: "くすりを のみます。", exampleEn: "I take medicine." },
          { jp: "医者（いしゃ）", romaji: "isha", en: "doctor", example: "いしゃに いきます。", exampleEn: "I go to the doctor." },
          { jp: "病院（びょういん）", romaji: "byouin", en: "hospital", example: "びょういんに います。", exampleEn: "I am at the hospital." }
        ],
        grammar: [
          { point: "Nが いたいです", en: "body part hurts", example: "あたまが いたいです。", exampleEn: "I have a headache." },
          { point: "〜た ほうが いいです", en: "had better do ...", example: "いしゃに いった ほうが いいです。", exampleEn: "You had better see a doctor." },
          { point: "〜なければ なりません", en: "must do ...", example: "くすりを のまなければ なりません。", exampleEn: "I must take medicine." }
        ],
        quiz: [
          { q: "かぜ means:", choices: ["a cold", "fever", "medicine", "hospital"], answer: 0, explain: "風邪 (かぜ) = a cold; かぜを ひく = catch a cold." },
          { q: "くすり means:", choices: ["medicine", "doctor", "fever", "headache"], answer: 0, explain: "薬 (くすり) = medicine; くすりを のむ = take medicine." },
          { q: "Fill in: あたまが___です。", choices: ["いたい", "いたいな", "いたく", "いた"], answer: 0, explain: "いたい is an い-adjective: あたまが いたいです = I have a headache." }
        ]
      },
      {
        day: 30,
        emoji: "👑",
        stage: "Finale",
        title: "Finale — FINAL BOSS · Grand Review",
        jp: "さいごの たたかい",
        vocab: [
          { jp: "最後（さいご）", romaji: "saigo", en: "the end, last", example: "さいごの もんだいです。", exampleEn: "This is the last question." },
          { jp: "戦い（たたかい）", romaji: "tatakai", en: "battle, fight", example: "さいごの たたかいです。", exampleEn: "It is the final battle." },
          { jp: "勝つ（かつ）", romaji: "katsu", en: "to win", example: "たたかいに かちました。", exampleEn: "We won the battle." },
          { jp: "主人公（しゅじんこう）", romaji: "shujinkou", en: "main character, hero", example: "あなたは しゅじんこうです。", exampleEn: "You are the main character." },
          { jp: "冒険（ぼうけん）", romaji: "bouken", en: "adventure", example: "ぼうけんが つづきます。", exampleEn: "The adventure continues." },
          { jp: "完璧（かんぺき）", romaji: "kanpeki", en: "perfect", example: "こたえは かんぺきです。", exampleEn: "Your answer is perfect." },
          { jp: "卒業（そつぎょう）", romaji: "sotsugyou", en: "graduation", example: "そつぎょうを おめでとう！", exampleEn: "Congratulations on graduating!" }
        ],
        grammar: [
          { point: "〜ました (achievement)", en: "past tense for what you accomplished", example: "たたかいに かちました。", exampleEn: "We won the battle." },
          { point: "Nが できます", en: "can do something", example: "にほんごが できます。", exampleEn: "I can speak Japanese." },
          { point: "〜ましょう", en: "let's do it together", example: "いっしょに たたかいましょう。", exampleEn: "Let's fight together." }
        ],
        quiz: [
          { q: "たたかい means:", choices: ["battle", "adventure", "hero", "ending"], answer: 0, explain: "戦い (たたかい) = battle; さいごの たたかい = final battle." },
          { q: "かつ means:", choices: ["to win", "to lose", "to rest", "to begin"], answer: 0, explain: "勝つ (かつ) = to win; past: かちました." },
          { q: "Fill in: にほんごが___。", choices: ["できます", "します", "あります", "います"], answer: 0, explain: "Nが できます = can do N: にほんごが できます = I can speak Japanese." }
        ]
      }
    ],

    HIRAGANA: [
      [{ c: "あ", r: "a" }, { c: "い", r: "i" }, { c: "う", r: "u" }, { c: "え", r: "e" }, { c: "お", r: "o" }],
      [{ c: "か", r: "ka" }, { c: "き", r: "ki" }, { c: "く", r: "ku" }, { c: "け", r: "ke" }, { c: "こ", r: "ko" }],
      [{ c: "さ", r: "sa" }, { c: "し", r: "shi" }, { c: "す", r: "su" }, { c: "せ", r: "se" }, { c: "そ", r: "so" }],
      [{ c: "た", r: "ta" }, { c: "ち", r: "chi" }, { c: "つ", r: "tsu" }, { c: "て", r: "te" }, { c: "と", r: "to" }],
      [{ c: "な", r: "na" }, { c: "に", r: "ni" }, { c: "ぬ", r: "nu" }, { c: "ね", r: "ne" }, { c: "の", r: "no" }],
      [{ c: "は", r: "ha" }, { c: "ひ", r: "hi" }, { c: "ふ", r: "fu" }, { c: "へ", r: "he" }, { c: "ほ", r: "ho" }],
      [{ c: "ま", r: "ma" }, { c: "み", r: "mi" }, { c: "む", r: "mu" }, { c: "め", r: "me" }, { c: "も", r: "mo" }],
      [{ c: "や", r: "ya" }, null, { c: "ゆ", r: "yu" }, null, { c: "よ", r: "yo" }],
      [{ c: "ら", r: "ra" }, { c: "り", r: "ri" }, { c: "る", r: "ru" }, { c: "れ", r: "re" }, { c: "ろ", r: "ro" }],
      [{ c: "わ", r: "wa" }, null, null, null, { c: "を", r: "wo" }],
      [{ c: "ん", r: "n" }, null, null, null, null],
      [{ c: "が", r: "ga" }, { c: "ぎ", r: "gi" }, { c: "ぐ", r: "gu" }, { c: "げ", r: "ge" }, { c: "ご", r: "go" }],
      [{ c: "ざ", r: "za" }, { c: "じ", r: "ji" }, { c: "ず", r: "zu" }, { c: "ぜ", r: "ze" }, { c: "ぞ", r: "zo" }],
      [{ c: "だ", r: "da" }, { c: "ぢ", r: "ji" }, { c: "づ", r: "zu" }, { c: "で", r: "de" }, { c: "ど", r: "do" }],
      [{ c: "ば", r: "ba" }, { c: "び", r: "bi" }, { c: "ぶ", r: "bu" }, { c: "べ", r: "be" }, { c: "ぼ", r: "bo" }],
      [{ c: "ぱ", r: "pa" }, { c: "ぴ", r: "pi" }, { c: "ぷ", r: "pu" }, { c: "ぺ", r: "pe" }, { c: "ぽ", r: "po" }]
    ],

    KATAKANA: [
      [{ c: "ア", r: "a" }, { c: "イ", r: "i" }, { c: "ウ", r: "u" }, { c: "エ", r: "e" }, { c: "オ", r: "o" }],
      [{ c: "カ", r: "ka" }, { c: "キ", r: "ki" }, { c: "ク", r: "ku" }, { c: "ケ", r: "ke" }, { c: "コ", r: "ko" }],
      [{ c: "サ", r: "sa" }, { c: "シ", r: "shi" }, { c: "ス", r: "su" }, { c: "セ", r: "se" }, { c: "ソ", r: "so" }],
      [{ c: "タ", r: "ta" }, { c: "チ", r: "chi" }, { c: "ツ", r: "tsu" }, { c: "テ", r: "te" }, { c: "ト", r: "to" }],
      [{ c: "ナ", r: "na" }, { c: "ニ", r: "ni" }, { c: "ヌ", r: "nu" }, { c: "ネ", r: "ne" }, { c: "ノ", r: "no" }],
      [{ c: "ハ", r: "ha" }, { c: "ヒ", r: "hi" }, { c: "フ", r: "fu" }, { c: "ヘ", r: "he" }, { c: "ホ", r: "ho" }],
      [{ c: "マ", r: "ma" }, { c: "ミ", r: "mi" }, { c: "ム", r: "mu" }, { c: "メ", r: "me" }, { c: "モ", r: "mo" }],
      [{ c: "ヤ", r: "ya" }, null, { c: "ユ", r: "yu" }, null, { c: "ヨ", r: "yo" }],
      [{ c: "ラ", r: "ra" }, { c: "リ", r: "ri" }, { c: "ル", r: "ru" }, { c: "レ", r: "re" }, { c: "ロ", r: "ro" }],
      [{ c: "ワ", r: "wa" }, null, null, null, { c: "ヲ", r: "wo" }],
      [{ c: "ン", r: "n" }, null, null, null, null],
      [{ c: "ガ", r: "ga" }, { c: "ギ", r: "gi" }, { c: "グ", r: "gu" }, { c: "ゲ", r: "ge" }, { c: "ゴ", r: "go" }],
      [{ c: "ザ", r: "za" }, { c: "ジ", r: "ji" }, { c: "ズ", r: "zu" }, { c: "ゼ", r: "ze" }, { c: "ゾ", r: "zo" }],
      [{ c: "ダ", r: "da" }, { c: "ヂ", r: "ji" }, { c: "ヅ", r: "zu" }, { c: "デ", r: "de" }, { c: "ド", r: "do" }],
      [{ c: "バ", r: "ba" }, { c: "ビ", r: "bi" }, { c: "ブ", r: "bu" }, { c: "ベ", r: "be" }, { c: "ボ", r: "bo" }],
      [{ c: "パ", r: "pa" }, { c: "ピ", r: "pi" }, { c: "プ", r: "pu" }, { c: "ペ", r: "pe" }, { c: "ポ", r: "po" }]
    ],

    QUOTES: [
      { jp: "今日もがんばろう！", en: "Let's do our best today!" },
      { jp: "一歩ずつ、いこう！", en: "Let's go one step at a time!" },
      { jp: "まちがえても、だいじょぶ！", en: "It is okay to make mistakes!" },
      { jp: "すごい！あなたはヒーローだ！", en: "Amazing! You are a hero!" },
      { jp: "ひらがな、むずかしい？だいじょぶ！", en: "Hiragana tricky? No worries!" },
      { jp: "おなかがすいたら、おにぎりをたべよう！", en: "If you are hungry, let's eat a rice ball!" },
      { jp: "まいにちのちいさなすすみが、おおきなちから！", en: "Small daily progress becomes great power!" },
      { jp: "まんがのしゅじんこうみたいに、つよくなろう！", en: "Let's get strong like a manga hero!" },
      { jp: "やったね！また明日もあおう！", en: "Yay! See you again tomorrow!" },
      { jp: "ことばはまほう！どんどんおぼえよう！", en: "Words are magic! Let's learn lots of them!" },
      { jp: "ねむいときは、ちょっとやすもう。", en: "When you are sleepy, take a little rest." },
      { jp: "さいごまであきらめないで！", en: "Do not give up until the very end!" }
    ],

    RANKS: [
      { min: 0, name: "Rookie Gakusei", emoji: "🐣" },
      { min: 60, name: "Bookworm", emoji: "📖" },
      { min: 150, name: "Kana Knight", emoji: "⚔️" },
      { min: 300, name: "Sakura Senpai", emoji: "🌸" },
      { min: 600, name: "Kanji Master", emoji: "🏯" },
      { min: 1000, name: "Genki Legend", emoji: "👑" }
    ]
  };
})();
