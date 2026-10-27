/* NIHONGO — Days 1–56 (Stages 1–2). Hand-curated. */
(function(){
const N = window.NIHONGO = window.NIHONGO || {};
const DAYS = N.DAYS = N.DAYS || [];
const R = (t,o,x={}) => Object.assign({rv:1,t,o},x);

/* ===== WEEK 1 ===== */
DAYS.push({t:"Sounds of Japanese & the five vowels",o:"Pronounce the five Japanese vowels and read あ い う え お.",k:"あいうえお",
 info:[["Three scripts","Japanese mixes three scripts: hiragana for native words and grammar, katakana for foreign words, and kanji (Chinese characters) for meaning. You start with hiragana: 46 basic characters, each one sound."],
       ["Five pure vowels","a as in “father”, i as in “machine”, u with relaxed lips, e as in “pet”, o as in “note” but without the glide. Every kana gets one even beat — Japanese sounds like a steady drum, not stressed syllables."]],
 v:["あい|love|❤️","いえ|house;home|🏠","うえ|above;up;on top;top|⬆️","あお|blue|🔵","いいえ|no|🙅|The polite “no”. You'll use it from day one."],
 p:["こんにちは|hello;good afternoon;hi|👋|Daytime greeting. The last kana は is read “wa” here — you'll learn why on Day 6.|konnichiwa","ありがとう|thank you;thanks|🙏|Friendly thanks. The polite version comes on Day 23.|arigatou"],
 dl:{set:"Your neighbour waves at you in the afternoon.",l:[["Neighbour","こんにちは。","Hello."],["You",[["こんにちは。",1,"Mirror the greeting. Simple and natural.",["Neighbour","（にこにこ）","(smiles)"]],["いいえ。",0,"いいえ means “no”. It doesn't answer a greeting."],["あお。",0,"あお means “blue”."]]]]}});

DAYS.push({t:"The か row",o:"Read か き く け こ and the words they make with vowels.",k:"かきくけこ",
 info:[["Consonant + vowel","Most kana are a consonant plus a vowel: k + a = か. Learn the row and you can read it in any word."]],
 v:["かお|face|🙂","えき|station;train station|🚉","あき|autumn;fall|🍁","こえ|voice|🗣️","いけ|pond|🪷"],
 p:["おはよう|good morning|🌅|Casual morning greeting for friends and family.|ohayou"],
 dl:{set:"You meet a friend on the way to class in the morning.",l:[["Friend","おはよう！","Morning!"],["You",[["おはよう！",1,"A casual good morning back to a friend."],["こんにちは。",0,"こんにちは is for later in the day. In the morning use おはよう."],["かお。",0,"かお means “face”."]]]]}});

DAYS.push({t:"The さ row",o:"Read さ し す せ そ, including し = shi.",k:"さしすせそ",
 info:[["し is “shi”","The s-row has one surprise: s + i becomes “shi”. Japanese has no “si” sound in native words."]],
 v:["すし|sushi|🍣","あさ|morning|🌄","かさ|umbrella|☂️","いす|chair|🪑","おかし|sweets;snacks;candy|🍬"],
 p:["さようなら|goodbye|👋|Sounds final or formal. Friends usually say じゃあね (Day 22).|sayounara"],
 dl:{set:"Class is over. Your teacher waves.",l:[["Teacher","さようなら。","Goodbye."],["You",[["さようなら。",1,"Return the goodbye."],["おはよう。",0,"おはよう is a morning greeting."],["すし。",0,"すし is the food."]]]]}});

DAYS.push({t:"The た row",o:"Read た ち つ て と, including ち = chi and つ = tsu.",k:"たちつてと",
 info:[["Watch these sounds","ち is “chi”, つ is “tsu” — t and s together, like the end of “cats”. Practise つ slowly: tsu, tsu, tsu."]],
 v:["くつ|shoes|👟","て|hand|✋","した|under;below;beneath|⬇️","とけい|clock;watch|⏰","ちかてつ|subway;metro;underground|🚇"],
 p:["すみません|excuse me;sorry;I'm sorry|🙇|Gets attention, apologises lightly, or thanks someone for their trouble. One of the most useful words in Japanese.|sumimasen"],
 dl:{set:"On a crowded subway, you bump into someone.",l:[["","（ドン）","(bump)"],["You",[["すみません。",1,"A light apology is exactly right here."],["おはよう。",0,"That's “good morning”, not an apology."],["ちかてつ。",0,"ちかてつ means “subway”."]]],["Passenger","いいえ。","No, no (it's fine)."]]}});

DAYS.push({t:"The な row",o:"Read な に ぬ ね の and tell ぬ apart from similar shapes.",k:"なにぬねの",
 info:[["Loops matter","ぬ (nu) ends in a small loop. ね (ne) has one too. Later you'll meet め (me), which looks like ぬ without the loop."]],
 v:["ねこ|cat|🐈","いぬ|dog|🐕","なつ|summer|☀️","なに|what|❓","おかね|money|💴"],
 p:["いただきます|(said before eating);let's eat|🍚|Literally “I humbly receive”. Said with hands together before a meal.|itadakimasu"],
 dl:{set:"Dinner at a Japanese friend's home. The food is served.",l:[["Host","どうぞ。","Please, go ahead."],["You",[["いただきます。",1,"Said before you start eating. Perfect."],["すみません。",0,"Polite, but before eating Japanese people say いただきます."],["なに？",0,"なに means “what?” — a bit rude here."]]]]}});

DAYS.push({t:"The は row",o:"Read は ひ ふ へ ほ and know that は can be read “wa”.",k:"はひふへほ",
 info:[["ふ is soft","ふ sits between “hu” and “fu”: blow gently, lips barely touching."],["は has two jobs","As a normal letter は is “ha”. As a grammar particle (Day 25) it is read “wa”. That's why こんにちは ends in “wa”."]],
 v:["はな|flower|🌼","ひと|person|🧍","ほし|star|⭐","ふね|boat;ship|⛵","はし|chopsticks|🥢|Same kana as はし “bridge”; pitch accent tells them apart."],
 p:["はじめまして|nice to meet you|🤝|Only for the very first time you meet someone.|hajimemashite"],
 dl:{set:"Your friend introduces you to Yuki for the first time.",l:[["Yuki","はじめまして。","Nice to meet you."],["You",[["はじめまして。",1,"The standard first-meeting greeting."],["おはよう。",0,"That's “good morning”."],["いただきます。",0,"That's said before eating."]]]]}});

DAYS.push(R("Week 1 check","Show what you know: vowels, か さ た な は rows and your first phrases."));

/* ===== WEEK 2 ===== */
DAYS.push({t:"The ま row",o:"Read ま み む め も and tell め from ぬ.",k:"まみむめも",
 v:["みみ|ear;ears|👂","め|eye;eyes|👁️","むし|insect;bug|🐞","もも|peach|🍑","あたま|head|🧑"],
 p:["いってきます|I'm off;see you later (leaving home)|🚪|Said when you leave home. The family replies いってらっしゃい.|ittekimasu"],
 dl:{set:"You put on your shoes to leave the house.",l:[["","（げんかん）","(at the front door)"],["You",[["いってきます。",1,"The set phrase for leaving home.",["Host mother","いってらっしゃい。","Take care! See you later."]],["いただきます。",0,"That's said before eating."],["はじめまして。",0,"That's for meeting someone new."]]]]}});

DAYS.push({t:"や ゆ よ, わ を ん",o:"Read the last basic hiragana: や ゆ よ わ を ん.",k:"やゆよわをん",
 info:[["ん stands alone","ん is the only kana that is just a consonant. It sounds like n, m or ng depending on the next sound, and it takes a full beat: ほ-ん = 2 beats."],["を is only grammar","を is pronounced “o” and is only used as a particle (Day 58)."]],
 v:["やま|mountain|⛰️","ゆき|snow|❄️","ほん|book|📕","にほん|Japan|🗾","わたし|I;me|🙋"],
 p:["おやすみなさい|good night|🌙|Said before going to bed, not as an evening hello.|oyasuminasai"],
 dl:{set:"It's late. Your host family is going to bed.",l:[["Host","おやすみ。","Night!"],["You",[["おやすみなさい。",1,"Polite good night."],["こんにちは。",0,"That's a daytime hello."],["いってきます。",0,"That's for leaving home."]]]]}});

DAYS.push({t:"The ら row",o:"Read ら り る れ ろ and pronounce the Japanese r.",k:"らりるれろ",
 info:[["The Japanese r","A light tap of the tongue behind the teeth, between English r, l and d. Never rolled."],["Look-alikes","る has a loop, ろ does not. れ, ね and わ share a left stroke — check the right side."]],
 v:["さくら|cherry blossom|🌸","くるま|car|🚗","よる|night;evening|🌃","いろ|color;colour|🎨","おふろ|bath|🛁"],
 p:["よろしく|nice to meet you;please treat me well|🙇|Said at the end of an introduction. Polite form on Day 26.|yoroshiku"],
 dl:{set:"Yuki finishes introducing herself.",l:[["Yuki","ゆき です。よろしく！","I'm Yuki. Nice to meet you!"],["You",[["よろしく！",1,"Return it to close the introduction."],["おやすみなさい。",0,"That's good night."],["さくら。",0,"That's cherry blossom."]]]]}});

DAYS.push({t:"Voiced sounds: ゛ and ゜",o:"Read が ざ だ ば ぱ rows — the marks that change a sound.",k:["が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ"],
 info:[["Two dots, one circle","The two dots ゛ voice a sound: か→が, さ→ざ, た→だ, は→ば. The circle ゜ turns the は row into p: ぱ ぴ ぷ ぺ ぽ."],["Rare ones","ぢ and づ sound like じ and ず and are rare. When you hear “ji” or “zu”, it's almost always じ or ず."]],
 v:["かぞく|family|👨‍👩‍👧","でんわ|telephone;phone|📞","ごはん|rice;meal|🍚","えんぴつ|pencil|✏️","ともだち|friend|🧑‍🤝‍🧑"],
 p:["ごちそうさま|thanks for the meal (after eating)|🍽️|Said after eating. Add でした to be more polite.|gochisousama"],
 dl:{set:"You've finished dinner at a friend's home.",l:[["Friend","どう？","How was it?"],["You",[["ごちそうさま！",1,"The phrase after a meal — it thanks the cook."],["いただきます。",0,"That's said before eating."],["はじめまして。",0,"That's for a first meeting."]]]]}});

DAYS.push({t:"Combined sounds: きゃ しゅ ちょ",o:"Read small ゃ ゅ ょ combinations as one beat.",k:N.YOON.map(x=>x[0]),
 info:[["Small や ゆ よ","A small ゃ ゅ ょ after an i-column kana blends into one beat: き + ゃ = きゃ (kya). Compare the big version: きや = ki-ya, two beats."]],
 v:["きょう|today|📅","しゃしん|photo;photograph;picture|📷","おちゃ|tea;green tea|🍵","じしょ|dictionary|📖","でんしゃ|train|🚆"],
 p:["いらっしゃいませ|welcome (in shops and restaurants)|🛍️|Staff say it when you enter. Customers don't say it back — a nod is enough.|irasshaimase"],
 dl:{set:"You walk into a small shop.",l:[["Clerk","いらっしゃいませ。","Welcome!"],["You",[["こんにちは。",1,"A short こんにちは or just a nod is fine. Staff don't expect a reply."],["いらっしゃいませ。",0,"That's what staff say. Customers don't repeat it."],["さようなら。",0,"That's goodbye."]]]]}});

DAYS.push({t:"Small っ and long vowels",o:"Hear and read double consonants (っ) and long vowels.",k:["っ"],
 info:[["Small っ = a tiny pause","A small っ doubles the next consonant with a short stop: きって (kit-te) vs きて (ki-te). It takes one full beat."],["Long vowels","Some vowels are held for two beats: おかあさん = o-ka-a-sa-n. えい is usually said “ee” (せんせい ≈ sensee), and おう is “oo” (がっこう ≈ gakkoo). Length changes meaning, so hold it!"]],
 v:["がっこう|school|🏫","きって|stamp;postage stamp|📮","おかあさん|mother;mom;mum|👩|Used for someone's mother, or when talking to your own.","おとうさん|father;dad|👨|Used for someone's father, or when talking to your own.","せんせい|teacher|🧑‍🏫|Also used for doctors."],
 p:["おはようございます|good morning (polite)|🌅|Polite version of おはよう — for teachers, colleagues and strangers.|ohayougozaimasu"],
 dl:{set:"Morning. You meet your teacher at the school gate.",l:[["Teacher","おはようございます。","Good morning."],["You",[["おはようございます。",1,"Polite and correct for a teacher."],["おはよう。",0,"Too casual for a teacher. Add ございます."],["こんにちは。",0,"It's morning — use おはようございます."]]]]}});

DAYS.push(R("Week 2 check: read all hiragana","Read every hiragana, including voiced sounds, combinations, っ and long vowels."));

/* ===== WEEK 3 — KATAKANA ===== */
DAYS.push({t:"Katakana ア–コ",o:"Read katakana ア to コ and the long-vowel bar ー.",k:"アイウエオカキクケコ",
 info:[["Why katakana?","Same sounds as hiragana, sharper shapes. Used for foreign words, names, brands and emphasis — menus and signs are full of it."],["The bar ー","ー holds the previous vowel for one more beat: ケーキ = ke-e-ki."]],
 v:["ケーキ|cake|🍰","ココア|cocoa;hot chocolate|☕","イカ|squid|🦑"]});

DAYS.push({t:"Katakana サ–ト",o:"Read サ to ト and tell シ from ツ.",k:"サシスセソタチツテト",
 info:[["シ vs ツ","シ (shi): the two short strokes sit on the left and the long stroke sweeps up. ツ (tsu): the short strokes sit on top and the long stroke comes down."]],
 v:["テスト|test;exam|📝","タクシー|taxi;cab|🚕","スキー|skiing;ski;skis|⛷️","セーター|sweater;jumper|🧶","トースト|toast|🍞"]});

DAYS.push({t:"Katakana ナ–ホ",o:"Read ナ to ホ in everyday loanwords.",k:"ナニヌネノハヒフヘホ",
 info:[["Old friends","ヘ is almost identical to へ. カ, キ, リ and ヘ look like their hiragana partners."]],
 v:["ノート|notebook|📓","テニス|tennis|🎾","ネクタイ|necktie;tie|👔","コーヒー|coffee|☕"]});

DAYS.push({t:"Katakana マ–ン",o:"Finish basic katakana: マ to ン.",k:"マミムメモヤユヨラリルレロワヲン",
 info:[["ソ vs ン","ソ (so) — the long stroke comes down from the top. ン (n) — it sweeps up from the bottom."],["Loanword sounds","English words are re-shaped to fit Japanese beats: hotel → ホテル (ho-te-ru), camera → カメラ."]],
 v:["ラーメン|ramen;ramen noodles|🍜","ホテル|hotel|🏨","カメラ|camera|📷","トイレ|toilet;restroom;bathroom|🚻","アメリカ|America;USA;United States|🗽"]});

DAYS.push({t:"Katakana: voiced sounds and combinations",o:"Read ガ, パ, ジュ, ッ and other katakana combinations.",k:["ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ","ジャ","ジュ","ジョ","ニュ","ッ"],
 info:[["Same rules","Dakuten, small ャ ュ ョ and small ッ work exactly like in hiragana: ベッド = be-d-do, ジュース = ju-u-su."]],
 v:["バス|bus|🚌","ゲーム|game;video game|🎮","パン|bread|🥖","ベッド|bed|🛏️","ジュース|juice|🧃","メニュー|menu|📋"]});

DAYS.push({t:"Foreign sounds: ティ, ファ, フォ",o:"Read special katakana combinations for sounds Japanese borrowed.",k:N.EXTRA_KATA.map(x=>x[0]),
 info:[["New combinations","Katakana uses small ァ ィ ゥ ェ ォ to write sounds Japanese didn't have: ティ (ti), ファ (fa), フォ (fo), ウィ (wi)."]],
 v:["パーティー|party|🎉","フォーク|fork|🍴","カフェ|café;cafe;coffee shop|☕","コンピューター|computer|💻"]});

DAYS.push(R("Week 3 check: read katakana","Read all katakana and common loanwords on menus and signs."));

/* ===== WEEK 4 ===== */
DAYS.push({t:"Greetings through the day",o:"Choose the right greeting for morning, day, evening, night and parting.",
 info:[["Time-of-day greetings","おはようございます until about 10–11am, こんにちは in the daytime, こんばんは in the evening, おやすみなさい before bed. A slight bow goes with all of them."],["は again","こんばんは, like こんにちは, ends in は read “wa”."]],
 v:["こんばんは|good evening|🌆||konbanwa","じゃあね|see you;bye (casual)|👋","また あした|see you tomorrow|📅","どうも|thanks (casual, short)|🙂|Also a quick all-purpose “hi / thanks”."],
 dl:{set:"Evening. You come home and meet your neighbour.",l:[["Neighbour","こんばんは。","Good evening."],["You",[["こんばんは。",1,"Evening greeting — correct."],["おはようございます。",0,"That's for the morning."],["おやすみなさい。",0,"That's only before going to bed."]]],]}});

DAYS.push({t:"Thank you, please, you're welcome",o:"Use polite thanks, please, yes and you're welcome.",
 info:[["Two kinds of please","おねがいします = please (asking for something). どうぞ = please, go ahead / here you are (offering)."]],
 v:["ありがとうございます|thank you (polite);thank you very much|🙏","はい|yes|🙆|Also “I'm listening” or “okay”.","おねがいします|please (asking)|🙇","どうぞ|please, go ahead;here you are|🤲","どういたしまして|you're welcome|😊"],
 dl:{set:"A stranger holds the door open for you.",l:[["Stranger","どうぞ。","After you."],["You",[["ありがとうございます。",1,"Polite thanks — perfect.",["Stranger","いいえ。","Not at all."]],["どういたしまして。",0,"That's the reply to “thank you”."],["おねがいします。",0,"That's for asking for something."]]]]}});

DAYS.push({t:"Numbers 0–10",o:"Count from 0 to 10 and recognise the alternative readings.",num:"n10",
 info:[["Two readings","4, 7 and 9 have two readings. Use よん, なな and きゅう — they're clearest. し (4) sounds like the word for death, so it's often avoided."]],
 v:["ゼロ|zero|0️⃣","いち|one|1️⃣","に|two|2️⃣","さん|three|3️⃣","よん|four|4️⃣|Also し.","ご|five|5️⃣","ろく|six|6️⃣","なな|seven|7️⃣|Also しち.","はち|eight|8️⃣","きゅう|nine|9️⃣|Also く.","じゅう|ten|🔟"]});

DAYS.push({t:"Your first sentence: A は B です",o:"Say what someone is with A は B です.",g:"wa",
 v:["がくせい|student|🎓","かいしゃいん|company employee;office worker|💼","いしゃ|doctor|🩺","あなた|you|🫵|Often avoided in conversation — use the person's name + さん instead."],
 s:["わたし は がくせい です|I am a student;I'm a student|Tell a new classmate you are a student.","たなかさん は せんせい です|Mr. Tanaka is a teacher;Ms. Tanaka is a teacher;Tanaka is a teacher|Tell someone what Tanaka-san does.","やまださん は いしゃ です|Ms. Yamada is a doctor;Mr. Yamada is a doctor;Yamada is a doctor|Explain that Yamada-san is a doctor."]});

DAYS.push({t:"Introduce yourself",o:"Give a complete polite self-introduction.",
 info:[["The pattern","はじめまして。→ [name] です。→ よろしく おねがいします。 That's a full, polite introduction."],["さん is for others","Add さん to other people's names (たなかさん), never to your own."]],
 v:["なまえ|name|🏷️"],p:["よろしく おねがいします|nice to meet you (polite);please treat me well|🙇|The polite closing of an introduction.|yoroshiku onegaishimasu"],
 s:["わたし は たなか です|I am Tanaka;I'm Tanaka;My name is Tanaka|Introduce yourself as Tanaka.","よろしく おねがいします|Nice to meet you;Pleased to meet you|Finish your introduction politely."],
 dl:{set:"A new colleague introduces herself.",l:[["Tanaka","はじめまして。たなか です。","Nice to meet you. I'm Tanaka."],["You",[["はじめまして。{me} です。",1,"Return the greeting with your own name. (Set your name in Settings.)"],["はじめまして。{me}さん です。",0,"Never put さん on your own name."],["たなかさん です。",0,"That's her name, not yours."]]],["Tanaka","よろしく おねがいします。","Nice to meet you."],["You",[["よろしく おねがいします。",1,"Return the closing phrase."],["おやすみなさい。",0,"That's good night."]]]]}});

DAYS.push({t:"Countries and nationalities",o:"Say where you're from with 〜じん.",
 info:[["Add じん","Country + じん = a person from there: にほん → にほんじん. Countries other than Japan, China and Korea are usually in katakana."]],
 v:["にほんじん|Japanese (person);a Japanese person|🗾","アメリカじん|American (person);an American|🗽","ブルガリアじん|Bulgarian (person);a Bulgarian|🌹","イギリスじん|British (person);a British person|💂","くに|country|🌍"],
 s:["わたし は ブルガリアじん です|I am Bulgarian;I'm Bulgarian|Tell someone you are Bulgarian.","たなかさん は にほんじん です|Mr. Tanaka is Japanese;Ms. Tanaka is Japanese;Tanaka is Japanese|Say that Tanaka-san is Japanese."]});

DAYS.push(R("Stage 1 assessment","Kana reading, greetings, numbers 0–10 and your first introduction.",{as:1}));

/* ===== WEEK 5 ===== */
DAYS.push({t:"Asking questions with か",o:"Ask yes/no questions and answer はい、そう です.",g:"ka",
 v:["そう|so;that way|🙂|はい、そう です = Yes, that's right.","にほんご|Japanese (language)|🗣️","えいご|English (language)|🔤"],
 s:["がくせい です か|Are you a student?;Are you a student|Ask a new acquaintance if they are a student.","はい、 そう です|Yes, that's right;Yes, it is;Yes, I am;Yes|Confirm that what they said is right.","たなかさん は せんせい です か|Is Mr. Tanaka a teacher?;Is Ms. Tanaka a teacher?;Is Tanaka a teacher?|Ask whether Tanaka-san is a teacher."],
 dl:{set:"A classmate starts chatting with you.",l:[["Classmate","がくせい です か。","Are you a student?"],["You",[["はい、そう です。",1,"Natural confirmation."],["はい、がくせい です か。",0,"Adding か turns your answer into another question."],["いいえ、そう です。",0,"いいえ (no) contradicts そう です (that's right)."]]]]}});

DAYS.push({t:"Saying “is not”: じゃ ありません",o:"Make polite negative sentences.",g:"ja",
 v:["ちがいます|that's wrong;no, that's not it|🙅|A polite way to correct someone.","エンジニア|engineer|🛠️"],
 s:["わたし は せんせい じゃ ありません|I am not a teacher;I'm not a teacher|Correct someone who thinks you are a teacher.","いいえ、 がくせい じゃ ありません|No, I'm not a student;No, I am not a student|Say no, you're not a student.","たなかさん は いしゃ じゃ ありません|Mr. Tanaka is not a doctor;Ms. Tanaka is not a doctor;Tanaka isn't a doctor;Tanaka is not a doctor|Explain that Tanaka-san isn't a doctor."],
 dl:{set:"Someone guesses your job.",l:[["Guest","いしゃ です か。","Are you a doctor?"],["You",[["いいえ、いしゃ じゃ ありません。エンジニア です。",1,"Clear negative, then the correction."],["はい、いしゃ じゃ ありません。",0,"はい (yes) contradicts the negative."],["いいえ、いしゃ です。",0,"いいえ then “I am a doctor” is contradictory."]]]]}});

DAYS.push({t:"This and that: これ・それ・あれ",o:"Point to things near you, near the listener, and far away.",g:"kosoa",
 v:["これ|this;this one|👇","それ|that;that one (near you)|👉","あれ|that over there;that one over there|🔭","かばん|bag|👜","かぎ|key|🔑"],
 s:["これ は ほん です|This is a book|Hold up a book and say what it is.","それ は かさ です|That is an umbrella;That's an umbrella|Tell your friend what they are holding.","あれ は えき です|That is a station;That's the station;That over there is a station|Point to a distant station."]});

DAYS.push({t:"This book, that person: この・その・あの",o:"Use この, その, あの directly before a noun.",g:"kono",
 v:["この|this (+ noun)|👇","その|that (+ noun, near you)|👉","あの|that (+ noun, over there)|🔭","ぼうし|hat;cap|🧢"],
 s:["この ひと は せんせい です|This person is a teacher|Introduce the teacher standing next to you.","あの ひと は たなかさん です|That person is Mr. Tanaka;That person is Ms. Tanaka;That person is Tanaka;That person over there is Tanaka|Point out Tanaka-san across the room."]});

DAYS.push({t:"Whose is it? の",o:"Show possession and link nouns with の.",g:"no",
 v:["ペン|pen|🖊️","だいがく|university;college|🏛️"],
 s:["これ は わたし の ほん です|This is my book|Claim your book.","それ は たなかさん の かさ です|That is Mr. Tanaka's umbrella;That's Tanaka's umbrella;That is Ms. Tanaka's umbrella;That is Tanaka's umbrella|Tell someone whose umbrella that is.","わたし の なまえ は たなか です|My name is Tanaka|Give your name with なまえ.","わたし は にほんご の がくせい です|I am a Japanese-language student;I am a student of Japanese;I'm a Japanese language student;I'm a student of Japanese|Say you're a student of Japanese."]});

DAYS.push({t:"What? Who? なん・だれ",o:"Ask what something is and who someone is.",g:"nan",
 v:["なん|what (before です)|❓|なに and なん both mean “what”.","だれ|who|🧑","どなた|who (polite)|🙇"],
 s:["これ は なん です か|What is this?;What's this?|Ask what an unfamiliar object is.","あの ひと は だれ です か|Who is that person?;Who's that person?;Who is that person over there?|Ask who the person over there is.","それ は ペン です|That is a pen;That's a pen|Answer: it's a pen."]});

DAYS.push(R("Week 5 check","Questions, negatives, これ・この, の and question words."));

/* ===== WEEK 6 ===== */
DAYS.push({t:"Numbers 11–99",o:"Read and say any number up to 99.",num:"n99",
 info:[["Build them like blocks","Tens are “two-ten”, “three-ten”: にじゅう = 20, さんじゅう = 30. Then add the units: にじゅうさん = 23."]],
 v:["じゅういち|eleven|1️⃣","にじゅう|twenty|2️⃣","さんじゅう|thirty|3️⃣","きゅうじゅう|ninety|9️⃣"]});

DAYS.push({t:"How old are you?",o:"Say and ask ages with 〜さい.",num:"age",
 info:[["Age sound changes","1 いっさい, 8 はっさい, 10 じゅっさい. 20 has its own word: はたち."],["Asking politely","なんさい です か is fine with friends; おいくつ です か is politer."]],
 v:["なんさい|how old|🎂","おいくつ|how old (polite)|🙇","はたち|20 years old|🎉"],
 s:["わたし は じゅうきゅうさい です|I am 19 years old;I'm 19;I am nineteen;I'm nineteen years old;I am 19|Tell someone you are nineteen.","たなかさん は なんさい です か|How old is Mr. Tanaka?;How old is Ms. Tanaka?;How old is Tanaka?|Ask how old Tanaka-san is.","ねこ は ごさい です|The cat is five years old;The cat is 5;The cat is five|Say the cat is five."]});

DAYS.push({t:"What time is it?",o:"Ask the time and say the hour with 〜じ.",num:"hour",
 info:[["Hours to watch","4 o'clock = よじ, 7 = しちじ, 9 = くじ. These are fixed — not よんじ, ななじ or きゅうじ."]],
 v:["いま|now|⏱️","なんじ|what time|🕐","ごぜん|a.m.;morning|🌅","ごご|p.m.;afternoon|🌇"],
 s:["いま なんじ です か|What time is it now?;What time is it?|Ask someone the time.","いま さんじ です|It's three o'clock now;It is 3 o'clock now;It's 3 o'clock;It is three now;It's three|Tell someone it's 3 o'clock.","ごご よじ です|It's 4 p.m.;It's four in the afternoon;It is 4pm|Say it's 4 in the afternoon."]});

DAYS.push({t:"Minutes and half past",o:"Say exact times with 〜ふん and はん.",num:"min",
 info:[["ふん or ぷん","Minutes change sound: 1 いっぷん, 3 さんぷん, 4 よんぷん, 6 ろっぷん, 8 はっぷん, 10 じゅっぷん; but 2 にふん, 5 ごふん, 7 ななふん, 9 きゅうふん."]],
 v:["はん|half past;half|🕧","〜ふん|minute(s)|⏲️"],
 s:["いま くじ はん です|It's 9:30 now;It's half past nine now;It's nine thirty now;It's 9:30;It's half past nine|Say it's half past nine.","じゅうじ じゅっぷん です|It's 10:10;It is ten past ten;It's ten ten|Say it's ten past ten."]});

DAYS.push({t:"Days of the week",o:"Name all seven days and ask what day it is.",
 info:[["Elements","The days are named after the sun, moon and five elements: Monday = moon (げつ), Tuesday = fire (か), Wednesday = water (すい), Thursday = wood (もく), Friday = gold (きん), Saturday = earth (ど), Sunday = sun (にち)."]],
 v:["げつようび|Monday|🌙","かようび|Tuesday|🔥","すいようび|Wednesday|💧","もくようび|Thursday|🌳","きんようび|Friday|🪙","どようび|Saturday|🪨","にちようび|Sunday|☀️","なんようび|what day of the week|❓"],
 s:["きょう は なんようび です か|What day is it today?;What day of the week is it today?|Ask what day it is.","きょう は きんようび です|Today is Friday;It's Friday today|Say today is Friday."]});

DAYS.push({t:"Me too: も",o:"Say “also / too” with も.",g:"mo",
 v:["あした|tomorrow|📅","やすみ|day off;holiday;rest;break|🏖️","しごと|work;job|💼"],
 s:["わたし も がくせい です|I am a student too;I'm also a student;I am also a student;I'm a student too|After a friend says they're a student, say you are too.","きょう は やすみ です|Today is a day off;Today is a holiday;I'm off today|Say today is a day off.","あした も やすみ です|Tomorrow is a day off too;Tomorrow is also a holiday;Tomorrow is a day off as well;Tomorrow is also a day off|Add that tomorrow is a day off too."]});

DAYS.push(R("Week 6 check","Numbers to 99, ages, time, days of the week and も."));

/* ===== WEEK 7 ===== */
DAYS.push({t:"Months and birthdays",o:"Name the months and say when your birthday is.",num:"month",
 info:[["Months are numbered","Number + がつ: いちがつ = January. Watch: April しがつ, July しちがつ, September くがつ."]],
 v:["なんがつ|which month;what month|🗓️","たんじょうび|birthday|🎂"],
 s:["たんじょうび は なんがつ です か|What month is your birthday?;Which month is your birthday?;When is your birthday?|Ask a friend which month their birthday is in.","わたし の たんじょうび は しがつ です|My birthday is in April;My birthday is April|Say your birthday is in April."]});

DAYS.push({t:"Dates: ついたち to さんじゅういちにち",o:"Say and understand dates of the month.",num:"date",
 info:[["Special dates","1st–10th, 14th, 20th and 24th have special readings: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか, じゅうよっか, はつか, にじゅうよっか. Others are number + にち."]],
 v:["なんにち|what date;what day of the month|📆","いつ|when|🕒"],
 s:["たんじょうび は いつ です か|When is your birthday?|Ask when someone's birthday is.","しがつ ついたち です|It's April 1st;It is April first;April 1;April first|Answer: April 1st."]});

DAYS.push({t:"Yesterday, today, next week",o:"Talk about past and future days with でした.",g:"deshita",
 v:["きのう|yesterday|⏪","せんしゅう|last week|◀️","こんしゅう|this week|⏺️","らいしゅう|next week|▶️"],
 s:["きのう は やすみ でした|Yesterday was a day off;Yesterday was a holiday|Say yesterday was a day off.","らいしゅう は しごと です|Next week is work;I have work next week;I work next week;Next week I have work|Say you have work next week.","せんしゅう は テスト でした|Last week was the test;I had a test last week;There was a test last week|Mention last week's test."]});

DAYS.push({t:"Here, there, where: ここ・そこ・あそこ・どこ",o:"Ask where things are and point to places.",g:"koko",
 v:["ここ|here|📍","そこ|there (near you)|👉","あそこ|over there|🔭","どこ|where|🧭"],
 s:["トイレ は どこ です か|Where is the toilet?;Where is the restroom?;Where's the bathroom?;Where is the bathroom?;Where's the toilet?|Ask where the toilet is.","トイレ は あそこ です|The toilet is over there;The restroom is over there;The bathroom is over there;It's over there|Tell someone the toilet is over there.","ここ は がっこう です|This is a school;This place is a school;Here is the school|Explain that this place is a school."]});

DAYS.push({t:"Places around town",o:"Name common places and ask where they are.",
 v:["ぎんこう|bank|🏦","コンビニ|convenience store|🏪","ゆうびんきょく|post office|🏤","スーパー|supermarket|🛒","レストラン|restaurant|🍽️","びょういん|hospital|🏥"],
 s:["コンビニ は どこ です か|Where is the convenience store?;Where's the convenience store?|Ask where the convenience store is.","ゆうびんきょく は そこ です|The post office is there;The post office is right there|Tell someone the post office is right there."]});

DAYS.push({t:"Your first kanji",o:"Read 一 二 三 人 日 本 with the help of furigana.",
 info:[["What kanji are","Kanji carry meaning. Most have more than one reading, so they come with small furigana above them until you know them."],["Reading in context","人 is ひと alone, but じん in 日本人 (Japanese person) and にん when counting people."]],
 s:["わたし は 日本[にほん]人[じん] じゃ ありません|I am not Japanese;I'm not Japanese|Say you're not Japanese.","これ は 日本[にほん]ご の 本[ほん] です|This is a Japanese book;This is a book in Japanese;This is a Japanese-language book|Say this is a book in Japanese."]});

DAYS.push(R("Week 7 check","Dates, past and future days, places and your first kanji."));

/* ===== WEEK 8 ===== */
DAYS.push({t:"Introducing other people",o:"Introduce someone with こちら は 〜 です.",
 info:[["こちら","こちら (this person / this way) is the polite way to present someone. It sounds warmer than これ, which is only for things."]],
 v:["こちら|this person (polite);this way|🤝","おしごと|your job (polite);work|💼|お makes it polite when asking about someone else."],
 s:["こちら は やまださん です|This is Mr. Yamada;This is Ms. Yamada;This is Yamada|Introduce Yamada-san to a friend.","おしごと は なん です か|What do you do (for work)?;What is your job?;What's your job?;What do you do?|Politely ask someone their job."],
 dl:{set:"At a party, you introduce your friend to Yamada-san.",l:[["You",[["やまださん、こちら は たなかさん です。",1,"Polite introduction with こちら."],["やまださん、これ は たなかさん です。",0,"これ is for things. Use こちら for people."]]],["Yamada","はじめまして。やまだ です。","Nice to meet you. I'm Yamada."],["Tanaka","たなか です。よろしく おねがいします。","I'm Tanaka. Nice to meet you."],["Yamada","おしごと は なん です か。","What do you do?"],["Tanaka","いしゃ です。","I'm a doctor."]]}});

DAYS.push({t:"Where is it from? どこ の",o:"Ask where something is from and what it's about.",
 v:["ドイツ|Germany|🍺","フランス|France|🥐","ちゅうごく|China|🐼","かんこく|South Korea;Korea|🥢"],
 s:["これ は どこ の くるま です か|Where is this car from?;Which country's car is this?;Where is this car made?|Ask where a car was made.","それ は にほん の くるま です|That is a Japanese car;That's a Japanese car;It's a Japanese car|Answer: it's a Japanese car.","これ は なん の ほん です か|What is this book about?;What kind of book is this?|Ask what a book is about."]});

DAYS.push({t:"Sounding natural: ね and よ",o:"Add ね to share feelings and よ to tell new information.",g:"neyo",
 v:["いい|good;nice|👍|いい です ね = That's nice.","ほんとう|true;real;really|😮|ほんとう です か = Really?"],
 s:["いい です ね|That's nice;That sounds good;Nice;That's good|React warmly to a friend's plan.","きょう は やすみ です よ|Today is a day off, you know;Today is a holiday, you know;It's a day off today, you know|Tell a friend who forgot that today is a day off.","そう です ね|That's right;That's true;I agree;Yes, that's right|Agree with someone.","ほんとう です か|Really?;Is that true?|React with surprise."]});

DAYS.push({t:"Names, titles and respect",o:"Use さん, くん, ちゃん and せんぱい correctly.",
 info:[["Name suffixes","さん is safe for anyone (except yourself). くん is for boys or juniors, ちゃん for children and close friends. Teachers and doctors are called name + せんせい."],["Seniority","せんぱい (senior) and こうはい (junior) shape relationships at school and work — even a year makes a difference."]],
 v:["くん|(name suffix: boys, juniors)|👦","ちゃん|(name suffix: children, close friends)|🧒","せんぱい|senior (at school or work);senpai|🧑‍💼","こうはい|junior (at school or work);kohai|🧑"],
 s:["やまだ せんせい は にほんじん です|Professor Yamada is Japanese;Dr. Yamada is Japanese;Teacher Yamada is Japanese;Mr. Yamada is Japanese;Ms. Yamada is Japanese|Say that Yamada-sensei is Japanese.","たなかさん は わたし の せんぱい です|Mr. Tanaka is my senior;Tanaka is my senior;Ms. Tanaka is my senpai;Tanaka is my senpai|Explain that Tanaka-san is your senior."]});

DAYS.push({t:"Classroom survival phrases",o:"Ask for repetition and slow speech, and show you understood.",
 v:["わかりました|I understand;I see;got it;understood|👌","もういちど|once more;one more time;again|🔁","ゆっくり|slowly|🐢","しつもん|question|🙋"],
 s:["もういちど おねがいします|Once more, please;Again, please;One more time, please|Ask the teacher to repeat.","ゆっくり おねがいします|Slowly, please;Please speak slowly|Ask someone to speak more slowly."],
 dl:{set:"The teacher says something too fast.",l:[["Teacher","（はやい にほんご）","(fast Japanese you didn't catch)"],["You",[["すみません、もういちど おねがいします。",1,"Polite and clear request to repeat."],["わかりました。",0,"Only say this if you did understand!"],["さようなら。",0,"That's goodbye."]]],["Teacher","あした は テスト です。","Tomorrow is the test."],["You",[["わかりました。",1,"Now you understood — say so."],["もういちど おねがいします。",0,"You understood this time."]]]]}});

DAYS.push({t:"A first real conversation",o:"Hold a short conversation: greet, ask, answer and say goodbye.",
 v:["じゃ|well then;okay then|🙂","また|again|🔁","ちょっと|a little;a bit|🤏"],
 s:["じゃ、 また あした|See you tomorrow then;Well then, see you tomorrow|Say goodbye until tomorrow."],
 dl:{set:"After class, a classmate starts talking to you.",l:[["Classmate","こんにちは。はじめまして。すずき です。","Hi. Nice to meet you. I'm Suzuki."],["You",[["はじめまして。{me} です。よろしく おねがいします。",1,"A full, polite self-introduction."],["すずきさん です。",0,"Repeating her name isn't introducing yourself."]]],["Suzuki","にほんじん です か。","Are you Japanese?"],["You",[["いいえ、にほんじん じゃ ありません。ブルガリアじん です。",1,"Clear: no, then where you're from."],["はい、にほんじん じゃ ありません。",0,"はい + a negative is contradictory."]]],["Suzuki","そう です か。にほんご の がくせい です か。","I see. Are you a student of Japanese?"],["You",[["はい、そう です。",1,"Simple confirmation."],["いいえ、そう です。",0,"Contradictory."]]],["Suzuki","じゃ、また あした。","See you tomorrow, then."],["You",[["また あした。",1,"See you tomorrow."],["おはようございます。",0,"That's good morning."]]]]}});

DAYS.push(R("Stage 2 assessment","Introductions, questions, numbers, time, dates and places.",{as:1}));
})();
