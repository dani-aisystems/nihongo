/* NIHONGO — Days 113–168 (Stages 5–6) */
(function(){
const N = window.NIHONGO;
const DAYS = N.DAYS;
const R = (t,o,x={}) => Object.assign({rv:1,t,o},x);

/* ===== WEEK 17 ===== */
DAYS.push({t:"My family",o:"Talk about your own family with humble words.",
 info:[["Two sets of family words","For your own family use plain words: ちち (my father), はは (my mother). For someone else's, use polite ones: おとうさん, おかあさん (Day 114)."]],
 v:["ちち|my father;father|👨","はは|my mother;mother|👩","あに|my older brother;older brother|🧑","あね|my older sister;older sister|👩","おとうと|my younger brother;younger brother|👦","いもうと|my younger sister;younger sister|👧"],
 s:["ちち は かいしゃいん です|My father is an office worker;My father is a company employee|Tell someone what your father does.","あね が います|I have an older sister;I've got an older sister|Say you have an older sister.","いもうと は じゅうごさい です|My younger sister is fifteen;My little sister is 15;My younger sister is 15|Say your younger sister is 15."]});

DAYS.push({t:"Someone else's family",o:"Ask about other people's families politely.",
 v:["おにいさん|(someone's) older brother|🧑","おねえさん|(someone's) older sister|👩","ごかぞく|(someone's) family|👪","なんにん|how many people|👥"],
 s:["ごかぞく は なんにん です か|How many people are in your family?;How many people in your family?|Ask about someone's family size.","おにいさん は がくせい です か|Is your older brother a student?|Ask if their older brother is a student."]});

DAYS.push({t:"Family size and siblings",o:"Say how many people are in your family.",
 v:["よにん|four people|4️⃣","ごにん|five people|5️⃣","きょうだい|siblings;brothers and sisters|👫","ひとりっこ|only child|1️⃣"],
 s:["よにん かぞく です|There are four people in my family;We are a family of four;My family has four people;I have a family of four|Say your family has four people.","きょうだい が います か|Do you have any siblings?;Do you have brothers or sisters?;Do you have siblings?|Ask if someone has siblings.","わたし は ひとりっこ です|I am an only child;I'm an only child|Say you're an only child."]});

DAYS.push({t:"Friends and colleagues",o:"Talk about the people around you.",
 v:["どうりょう|colleague;coworker|🧑‍💼","ルームメイト|roommate;flatmate|🏠","かれし|boyfriend|💑","かのじょ|girlfriend|💑|Also means “she”."],
 s:["どうりょう と ひるごはん を たべます|I eat lunch with my colleagues;I have lunch with a coworker;I eat lunch with a colleague|Say you have lunch with colleagues.","ルームメイト は アメリカじん です|My roommate is American;My flatmate is American|Say your roommate is American."]});

DAYS.push({t:"Where do you live?",o:"Say where you live and where you're from.",
 info:[["A fixed phrase","すんで います means “live (somewhere)”. Use it as a set phrase for now: [place] に すんで います."]],
 v:["すんで います|live (somewhere)|🏘️","どちら|where (polite);which way|🧭","しゅっしん|hometown;where you're from|🏡","まち|town;city|🏙️"],
 s:["どちら に すんで います か|Where do you live?|Politely ask where someone lives.","とうきょう に すんで います|I live in Tokyo|Say you live in Tokyo.","しゅっしん は どこ です か|Where are you from?;Where is your hometown?;Where's your hometown?|Ask where someone is from."]});

DAYS.push({t:"Conversation: talking about family",o:"Hold a short conversation about families.",
 v:["みんな|everyone;all of us|👥"],
 dl:{set:"A colleague shows you a photo.",l:[["Colleague","これ は わたし の かぞく の しゃしん です。","This is a photo of my family."],["You",[["ごかぞく は なんにん です か。",1,"Polite question about their family."],["かぞく は なんにん です か。",0,"Understandable, but use ごかぞく for someone else's family."]]],["Colleague","ごにん です。ちち と はは と あに と いもうと です。","Five. My father, mother, older brother and younger sister."],["Colleague","{me}さん は きょうだい が います か。","Do you have siblings?"],["You",[["はい、あね が います。",1,"Your own sister: あね."],["はい、おねえさん が います。",0,"おねえさん is for someone else's sister. Your own is あね."]]],["Colleague","いい です ね。","That's nice."]]}});

DAYS.push(R("Week 17 check","Family words (both sets), family size, friends and where you live."));

/* ===== WEEK 18 ===== */
DAYS.push({t:"い-adjectives",o:"Describe things with い-adjectives.",g:"iiadj",
 v:["おおきい|big;large|🐘","ちいさい|small;little|🐭","たかい|expensive;tall;high|💰","やすい|cheap;inexpensive|🏷️","あたらしい|new|✨","ふるい|old (things)|🏚️"],
 s:["この かばん は たかい です|This bag is expensive|Say this bag is expensive.","あの ホテル は おおきい です|That hotel is big;That hotel over there is big|Say that hotel is big.","やすい です ね|It's cheap, isn't it;That's cheap;It's inexpensive, isn't it|React to a low price."]});

DAYS.push({t:"な-adjectives",o:"Describe things with な-adjectives.",g:"naadj",
 v:["きれい|pretty;beautiful;clean|✨|Ends in い but it's a な-adjective.","しずか|quiet|🤫","にぎやか|lively;busy (place)|🎊","げんき|healthy;energetic;well|💪","べんり|convenient|👍","ゆうめい|famous|🌟"],
 s:["この まち は しずか です|This town is quiet|Say this town is quiet.","とうきょう は にぎやか です|Tokyo is lively;Tokyo is busy|Say Tokyo is lively.","げんき です か|How are you?;Are you well?;Are you doing well?|Ask a friend how they are."]});

DAYS.push({t:"Adjectives before nouns",o:"Put adjectives in front of nouns: たかい かばん, しずか な へや.",g:"naadj",
 v:["ひろい|spacious;wide;big (space)|↔️","せまい|cramped;narrow;small (space)|↕️","たてもの|building|🏢"],
 s:["おおきい くるま です|It's a big car;It is a big car|Describe the car.","きれい な はな です ね|It's a pretty flower, isn't it;What a beautiful flower;They're pretty flowers|Compliment the flowers.","しずか な へや が いい です|I'd like a quiet room;A quiet room would be good;I prefer a quiet room|Ask the hotel for a quiet room.","ひろい へや です ね|It's a spacious room, isn't it;It's a big room, isn't it|Comment on the room's size."]});

DAYS.push({t:"Not difficult: adjective negatives",o:"Make adjectives negative.",g:"adjneg",
 v:["むずかしい|difficult;hard|🧩","やさしい|easy;kind;gentle|🙂","たのしい|fun;enjoyable|🎉"],
 s:["にほんご は むずかしく ない です|Japanese isn't difficult;Japanese is not hard;Japanese isn't hard|Say Japanese isn't difficult.","この へや は しずか じゃ ありません|This room isn't quiet;This room is not quiet|Complain the room isn't quiet.","テスト は やさしく ない です|The test isn't easy;The test is not easy|Say the test isn't easy."]});

DAYS.push({t:"Very, not very: とても・あまり",o:"Soften or strengthen adjectives.",
 v:["おもしろい|interesting;funny|😄","つまらない|boring|😐","いそがしい|busy|⏳","さむい|cold (weather)|🥶","あつい|hot (weather)|🥵"],
 s:["とても たのしい です|It's very fun;It's a lot of fun;It's really enjoyable|Say it's a lot of fun.","あまり たかく ない です|It's not very expensive;It isn't that expensive;It's not too expensive|Say it's not very expensive.","にほんご は とても おもしろい です|Japanese is very interesting;Japanese is really interesting|Say Japanese is very interesting.","きょう は さむい です ね|It's cold today, isn't it;Today is cold, isn't it|Make small talk about the cold."]});

DAYS.push({t:"Describing people",o:"Describe someone's features with は〜が.",g:"waga",
 v:["せ|height (of a person)|📏|せ が たかい = tall.","かみ|hair|💇","ながい|long|📏","みじかい|short (length)|✂️"],
 s:["あね は せ が たかい です|My older sister is tall|Say your sister is tall.","たなかさん は かみ が ながい です|Ms. Tanaka has long hair;Tanaka has long hair;Mr. Tanaka has long hair|Describe Tanaka-san's hair.","ちち は やさしい です|My father is kind;My dad is kind|Say your father is kind."]});

DAYS.push(R("Week 18 check","い- and な-adjectives, negatives, とても・あまり and describing people."));

/* ===== WEEK 19 ===== */
DAYS.push({t:"Likes and dislikes: すき・きらい",o:"Say what you like with が すき です.",g:"suki",
 v:["すき|like;liked|❤️","きらい|dislike;hate|💔","だいすき|love;really like|💖","どんな|what kind of|❓"],
 s:["ねこ が すき です|I like cats|Say you like cats.","やさい が きらい です|I don't like vegetables;I dislike vegetables;I hate vegetables|Say you dislike vegetables.","どんな おんがく が すき です か|What kind of music do you like?|Ask what music someone likes."]});

DAYS.push({t:"Hobbies",o:"Ask about and describe hobbies.",
 v:["しゅみ|hobby;hobbies|🎯","どくしょ|reading (books)|📚","スポーツ|sports;sport|⚽","サッカー|soccer;football|⚽","ギター|guitar|🎸","ひきます|play (an instrument)|🎸"],
 s:["しゅみ は なん です か|What are your hobbies?;What's your hobby?;What is your hobby?|Ask someone's hobby.","しゅみ は どくしょ です|My hobby is reading|Say your hobby is reading.","ギター を ひきます|I play the guitar;I play guitar|Say you play the guitar."]});

DAYS.push({t:"Good at, bad at: じょうず・へた",o:"Talk about skills — and reply modestly to compliments.",
 info:[["Being modest","If someone says your Japanese is good, the polite reply is いえいえ、まだまだ です (No, no, I still have a long way to go)."]],
 v:["じょうず|good at;skilled|🏅","へた|bad at;not good at|🙈","うた|song;singing|🎤","まだまだ|not yet (modest reply);still a long way to go|🙇"],
 s:["たなかさん は りょうり が じょうず です|Mr. Tanaka is good at cooking;Tanaka is a good cook;Ms. Tanaka is good at cooking;Tanaka is good at cooking|Compliment Tanaka-san's cooking.","わたし は うた が へた です|I'm bad at singing;I'm not good at singing;I am bad at singing|Admit you can't sing.","にほんご が じょうず です ね|Your Japanese is good;You're good at Japanese;Your Japanese is great|Compliment someone's Japanese."],
 dl:{set:"After you say a few sentences, a new friend is impressed.",l:[["Friend","にほんご が じょうず です ね！","Your Japanese is great!"],["You",[["いえいえ、まだまだ です。",1,"The modest reply is expected — and liked."],["はい、じょうず です。",0,"Agreeing sounds boastful in Japanese culture."]]],["Friend","しゅみ は なん です か。","What are your hobbies?"],["You",[["ギター を ひきます。",1,"Answer with an activity."],["ギター が へた です か。",0,"That asks if *you* are bad at guitar."]]]]}});

DAYS.push({t:"Favourites: いちばん",o:"Say what you like most.",
 v:["いちばん|the most;number one;best|🥇","とくに|especially;particularly|⭐"],
 s:["なに が いちばん すき です か|What do you like the most?;What do you like best?|Ask what someone likes most.","りんご が いちばん すき です|I like apples the most;I like apples best;Apples are my favourite;Apples are my favorite|Say apples are your favourite.","とくに ラーメン が すき です|I especially like ramen;I particularly like ramen|Say you especially like ramen."]});

DAYS.push({t:"Linking ideas: そして・でも・それから",o:"Connect sentences with and, but and then.",g:"soshite",
 v:["そして|and;and also|➕","でも|but;however|↩️","それから|after that;and then|⏭️"],
 s:["にほんご は むずかしい です。 でも たのしい です|Japanese is difficult. But it's fun.;Japanese is hard, but it's fun;Japanese is difficult but fun;Japanese is difficult, but it's fun|Say Japanese is hard but fun.","あさごはん を たべます。 それから がっこう へ いきます|I eat breakfast. Then I go to school.;I eat breakfast and then go to school;I have breakfast, then I go to school|Describe your morning in order."]});

DAYS.push({t:"Kanji: 大 小 山 川 上 下",o:"Read six picture-like kanji in context.",
 v:["かわ|river|🏞️"],
 info:[["Picture kanji","山 looks like three peaks, 川 like flowing water, 上 and 下 point up and down."]],
 s:["あの 山[やま] は 大[おお]きい です|That mountain is big;That mountain over there is big|Point out the big mountain.","ねこ は つくえ の 下[した] に います|The cat is under the desk|Say the cat is under the desk.","川[かわ] は きれい です|The river is beautiful;The river is clean;The river is pretty|Say the river is beautiful."]});

DAYS.push(R("Week 19 check","Likes and dislikes, hobbies, skills, favourites, linking words and kanji."));

/* ===== WEEK 20 ===== */
DAYS.push({t:"How was it? Adjective past",o:"Say how something was with かった です.",g:"adjpast",
 v:["どう|how|🤔","よかった|(it) was good|👍","さいこう|the best;awesome|🤩","ざんねん|too bad;unfortunate|😞"],
 s:["りょこう は どう でした か|How was the trip?;How was your trip?|Ask a friend about their trip.","とても たのしかった です|It was very fun;It was really enjoyable;It was a lot of fun|Say it was a lot of fun.","テスト は むずかしかった です|The test was difficult;The test was hard|Say the test was hard."]});

DAYS.push({t:"Weather and な-adjective past",o:"Describe past weather and places.",g:"adjpast",
 v:["てんき|weather|⛅","あめ|rain|🌧️","はれ|sunny;clear weather|☀️"],
 s:["ホテル は しずか でした|The hotel was quiet|Say the hotel was quiet.","てんき は よかった です|The weather was good;The weather was nice|Say the weather was nice.","えいが は おもしろく なかった です|The movie wasn't interesting;The movie was not interesting;The film wasn't interesting|Say the movie wasn't interesting.","きのう は あめ でした|It rained yesterday;Yesterday was rainy;It was rainy yesterday|Say it rained yesterday."]});

DAYS.push({t:"A weekend story",o:"Tell a short story about your weekend.",
 v:["おんせん|hot spring;onsen|♨️","ハイキング|hiking|🥾","つかれました|(I'm) tired;got tired|😮‍💨"],
 s:["しゅうまつ に おんせん へ いきました|I went to a hot spring on the weekend;I went to an onsen at the weekend;I went to a hot spring at the weekend|Say you went to a hot spring at the weekend.","やま で ハイキング を しました|I went hiking in the mountains;I hiked in the mountains|Say you went hiking.","つかれました|I'm tired;I got tired;I was tired|Say you're tired."]});

DAYS.push({t:"Talking about a trip",o:"Describe what you saw and bought on a trip.",
 v:["おみやげ|souvenir;souvenirs|🎁","はじめて|for the first time|🆕","おてら|temple|🛕","じんじゃ|shrine|⛩️"],
 s:["はじめて きょうと へ いきました|I went to Kyoto for the first time|Say it was your first time in Kyoto.","ふるい おてら を みました|I saw an old temple;I visited an old temple|Say you saw an old temple.","おみやげ を かいました|I bought souvenirs;I bought a souvenir|Say you bought souvenirs."]});

DAYS.push({t:"Writing a short diary",o:"Read and build a simple diary entry.",
 v:["にっき|diary;journal|📔"],
 s:["きょう は いい てんき でした|The weather was nice today;It was nice weather today;Today the weather was good|Start your diary with the weather.","ともだち と こうえん へ いきました|I went to the park with a friend;I went to the park with my friend|Write where you went and with whom."],
 rd:{title:"ゆきさん の にっき（Yuki's diary）",text:["どようび","きょう は いい てんき でした。","ともだち と こうえん へ いきました。","こうえん で おにぎり を たべました。","とても たのしかった です。"],q:[["What was the weather like?",["Nice","Rainy","Cold"],0,"いい てんき でした — the weather was nice."],["Where did Yuki go?",["To the park","To a temple","To the station"],0,"こうえん へ いきました — went to the park."],["What did Yuki eat?",["Rice balls","Ramen","Cake"],0,"おにぎり を たべました."],["How was the day?",["Very fun","Boring","Tiring"],0,"とても たのしかった です — it was a lot of fun."]]}});

DAYS.push({t:"Conversation: how was your weekend?",o:"Ask about and describe a weekend in a two-way conversation.",
 v:["ほか に|anything else;besides that|➕"],
 dl:{set:"Monday morning at work.",l:[["Colleague","しゅうまつ は どう でした か。","How was your weekend?"],["You",[["とても たのしかった です。",1,"Positive and natural."],["とても たのしい でした。",0,"い-adjectives make the past with かった: たのしかった です."]]],["Colleague","なに を しました か。","What did you do?"],["You",[["おんせん へ いきました。",1,"Past tense + destination."],["おんせん へ いきます。",0,"That's present/future — the weekend is over."]]],["Colleague","いい です ね！おんせん は どう でした か。","Nice! How was the hot spring?"],["You",[["しずか でした。そして きれい でした。",1,"な-adjectives use でした. Linked with そして."],["しずかかった です。",0,"しずか is a な-adjective: しずか でした."]]]]}});

DAYS.push(R("Stage 5 assessment","Family, adjectives, likes, hobbies, past descriptions and stories.",{as:1}));

/* ===== WEEK 21 ===== */
DAYS.push({t:"Reading signs",o:"Understand common signs in shops and stations.",
 v:["いりぐち|entrance|🚪","でぐち|exit|🚪","きんえん|no smoking|🚭","あぶない|dangerous;danger;watch out|⚠️","えいぎょうちゅう|open (for business)|🟢","じゅんびちゅう|preparing (closed)|🔴"],
 rd:{title:"かんばん（Signs）",text:["A：でぐち →","B：きんえん","C：じゅんびちゅう","D：あぶない！"],q:[["You want to leave the station. Which sign do you follow?",["A","B","C"],0,"でぐち = exit."],["A restaurant door shows C. Can you go in now?",["No — they're preparing","Yes — they're open","Only for smokers"],0,"じゅんびちゅう = in preparation, not open yet."],["Sign B tells you…",["Not to smoke","To be quiet","Where the exit is"],0,"きんえん = no smoking."]]}});

DAYS.push({t:"Reading a menu",o:"Read a simple menu and find prices.",
 v:["ねだん|price|🏷️","のみもの|drinks;beverages|🥤","たべもの|food|🍽️","ぜいこみ|tax included|🧾"],
 rd:{title:"メニュー",text:["たべもの","・ラーメン ……… 900えん","・カレー ………… 850えん","・おにぎり ……… 200えん","のみもの","・コーヒー ……… 400えん","・おちゃ ………… 300えん","（ぜいこみ）"],q:[["How much is ramen?",["900 yen","850 yen","400 yen"],0,"ラーメン 900えん."],["Which is the cheapest food?",["Rice ball","Curry","Ramen"],0,"おにぎり 200えん."],["You order curry and tea. How much?",["1,150 yen","1,250 yen","1,050 yen"],0,"850 + 300 = 1,150 yen."],["Do you pay extra tax?",["No — tax is included","Yes, 10% more","Only for drinks"],0,"ぜいこみ = tax included."]]}});

DAYS.push({t:"Reading a timetable",o:"Find departure times on a train timetable.",
 v:["じこくひょう|timetable;schedule|🕘","ふつう|local (train);normal|🚃","きゅうこう|express (train)|🚄"],
 rd:{title:"じこくひょう（Timetable）",text:["ふつう　　 9:05　 9:20　 9:35","きゅうこう 9:12　 9:42","つぎ の でんしゃ：きゅうこう 9:12"],q:[["When does the next train leave?",["9:12","9:05","9:20"],0,"つぎ の でんしゃ：9:12."],["What type is the next train?",["Express","Local","Bullet train"],0,"きゅうこう = express."],["You need a local train after 9:30. Which one?",["9:35","9:20","9:42"],0,"ふつう 9:35."]]}});

DAYS.push({t:"Reading a message from a friend",o:"Understand a short text message.",
 v:["メッセージ|message;text|💬","おくれます|be late|⏰"],
 s:["すみません、 ちょっと おくれます|Sorry, I'll be a little late;Sorry, I'm running a bit late;Sorry, I'll be a bit late|Text your friend that you'll be late."],
 rd:{title:"メッセージ",text:["すずき：","こんにちは！","すみません、ちょっと おくれます。","じゅうにじ はん に えき に つきます。","えき の まえ の カフェ で まって ください。"],q:[["What is Suzuki's news?",["She'll be a little late","She's sick","She can't come"],0,"ちょっと おくれます = I'll be a bit late."],["When will she arrive at the station?",["12:30","12:00","2:30"],0,"じゅうにじ はん = 12:30."],["Where should you wait?",["At the café in front of the station","Inside the station","At home"],0,"えき の まえ の カフェ で まって ください."]]}});

DAYS.push({t:"Reading a self-introduction",o:"Read a short self-introduction and pick out details.",
 v:["だいがくせい|university student;college student|🎓","にねんせい|second-year student|2️⃣"],
 rd:{title:"じこしょうかい（Self-introduction）",text:["はじめまして。","わたし は マリア です。","スペインじん です。","とうきょう の だいがく の にねんせい です。","しゅみ は りょうり と テニス です。","よろしく おねがいします。"],q:[["Where is Maria from?",["Spain","Japan","Germany"],0,"スペインじん = Spanish."],["What is she?",["A second-year university student","A teacher","An office worker"],0,"だいがく の にねんせい."],["What are her hobbies?",["Cooking and tennis","Reading and music","Soccer"],0,"りょうり と テニス."]]}});

DAYS.push({t:"Kanji: 入 出 口 中 学 生",o:"Read kanji you'll see on signs and in daily life.",
 info:[["Compound kanji","Kanji combine: 入 (enter) + 口 (opening) = 入口 entrance; 学 (study) + 生 (life) = 学生 student."]],
 s:["入口[いりぐち] は あそこ です|The entrance is over there|Point to the entrance.","出口[でぐち] は どこ です か|Where is the exit?;Where's the exit?|Ask where the exit is.","わたし は 学生[がくせい] です|I am a student;I'm a student|Say you're a student, in kanji.","かばん の 中[なか] に あります|It's in the bag;It is inside the bag|Say it's in your bag."]});

DAYS.push(R("Week 21 check","Signs, menus, timetables, messages and new kanji."));

/* ===== WEEK 22 — LISTENING ===== */
DAYS.push({t:"Listening: numbers and prices",o:"Catch prices and numbers spoken at natural, slow speed.",num:"yen2",
 ls:{title:"レジ で（At the till）",l:[["Clerk","いらっしゃいませ。"],["Clerk","おにぎり ふたつ と おちゃ です ね。"],["Clerk","ろっぴゃく ごじゅう えん です。"]],q:[["What did the customer buy?",["Two rice balls and tea","One rice ball and coffee","Two coffees"],0,"おにぎり ふたつ と おちゃ."],["How much is it?",["650 yen","560 yen","1,650 yen"],0,"ろっぴゃく ごじゅう = 650."]]}});

DAYS.push({t:"Listening: times and dates",o:"Catch times and dates in short announcements.",num:"date",
 ls:{title:"よてい（Plans）",l:[["Teacher","テスト は らいしゅう の かようび です。"],["Teacher","じゅうがつ にじゅうよっか です。"],["Teacher","くじ はん から です。"]],q:[["Which day is the test?",["Next Tuesday","This Tuesday","Next Thursday"],0,"らいしゅう の かようび."],["What date?",["October 24","October 4","October 14"],0,"じゅうがつ にじゅうよっか = October 24."],["What time does it start?",["9:30","9:00","4:30"],0,"くじ はん = 9:30."]]}});

DAYS.push({t:"Listening: station announcements",o:"Understand a simple, slow platform announcement.",
 v:["まもなく|shortly;soon|⏳","まいります|(a train) arrives (polite)|🚉","ドア|door|🚪","ごちゅうい ください|please be careful|⚠️"],
 ls:{title:"アナウンス（Announcement）",l:[["Announcer","まもなく、さんばんせん に でんしゃ が まいります。"],["Announcer","きゅうこう、しんじゅく ゆき です。"],["Announcer","ドア に ごちゅうい ください。"]],q:[["Which platform?",["Platform 3","Platform 1","Platform 8"],0,"さんばんせん."],["Where is the train going?",["Shinjuku","Tokyo","Kyoto"],0,"しんじゅく ゆき = bound for Shinjuku."],["What kind of train?",["Express","Local","Bullet train"],0,"きゅうこう."]]}});

DAYS.push({t:"Listening: in a shop",o:"Follow a short shop conversation by ear.",
 v:["エルサイズ|size L;large|🅻","ふく|clothes|👕"],
 ls:{title:"ふく の みせ（Clothes shop）",l:[["You","すみません、この セーター の エムサイズ は あります か。"],["Clerk","すみません、エムサイズ は ありません。エルサイズ は あります。"],["You","そう です か。ほか の いろ は あります か。"],["Clerk","くろ と しろ が あります。"],["You","じゃ、くろ の エルサイズ を ください。"]],q:[["What does the customer want first?",["A medium sweater","A large shirt","A black bag"],0,"セーター の エムサイズ."],["Is size M available?",["No","Yes","Only in white"],0,"エムサイズ は ありません."],["What does the customer buy?",["A black size L","A white size M","A white size L"],0,"くろ の エルサイズ."]]}});

DAYS.push({t:"Listening: a self-introduction",o:"Understand someone introducing themselves.",
 p:["〜から きました|(I) came from …|✈️|A common way to say where you're from: おおさか から きました.|kara kimashita"],
 ls:{title:"じこしょうかい",l:[["Ken","はじめまして。ケン です。"],["Ken","おおさか から きました。"],["Ken","かいしゃいん です。ぎんこう で はたらきます。"],["Ken","しゅみ は サッカー です。よろしく おねがいします。"]],q:[["Where is Ken from?",["Osaka","Tokyo","Kyoto"],0,"おおさか から きました = I came from Osaka."],["Where does he work?",["At a bank","At a school","At a hospital"],0,"ぎんこう で はたらきます."],["What's his hobby?",["Soccer","Tennis","Cooking"],0,"サッカー."]]}});

DAYS.push({t:"When you don't catch it",o:"Use repair strategies when you don't understand.",
 v:["えっと|um;let me see|🤔","なるほど|I see;that makes sense|💡","ちょっと まって ください|wait a moment, please|✋"],
 s:["すみません、 もういちど ゆっくり おねがいします|Sorry, once more slowly please;Excuse me, could you say it again slowly;Sorry, again slowly please|Ask someone to repeat slowly.","ちょっと まって ください|Wait a moment, please;Just a moment, please|Ask someone to wait a moment."],
 dl:{set:"A stranger asks you something quickly.",l:[["Stranger","（はやい にほんご）","(fast Japanese)"],["You",[["すみません、もういちど ゆっくり おねがいします。",1,"Polite repair: again, slowly."],["はい、そう です。",0,"Don't agree to something you didn't understand!"]]],["Stranger","えき は どこ です か。","Where is the station?"],["You",[["えっと… あそこ です。",1,"えっと buys you time. Then answer."],["わかりました。",0,"They asked a question — answer it."]]]]}});

DAYS.push(R("Week 22 check: listening","Numbers, times, announcements and conversations by ear.",{listen:1}));

/* ===== WEEK 23 — CONVERSATION ===== */
DAYS.push({t:"Conversation: meeting someone new",o:"Hold a two-way introduction and ask questions back.",
 v:["こちらこそ|likewise;the pleasure is mine|🤝"],
 dl:{set:"At a language exchange event.",l:[["Mai","はじめまして。まい です。よろしく おねがいします。","Hi, I'm Mai. Nice to meet you."],["You",[["はじめまして。{me} です。こちらこそ、よろしく おねがいします。",1,"こちらこそ = likewise. Very natural."],["はじめまして。まい です。",0,"That's her name."]]],["Mai","おくに は どちら です か。","Where are you from?"],["You",[["ブルガリア です。まいさん は？",1,"Answer, then ask back with は？"],["いいえ、ちがいます。",0,"That doesn't answer the question."]]],["Mai","とうきょう です。しゅみ は なん です か。","Tokyo. What are your hobbies?"],["You",[["ギター を ひきます。まいさん は？",1,"Answer and keep the conversation going."],["しゅみ が いちばん すき です。",0,"That means “I like hobbies the most”."]]]]}});

DAYS.push({t:"Conversation: a full restaurant visit",o:"Handle a restaurant visit from door to bill.",
 v:["おまたせしました|sorry to keep you waiting|⏳","ごゆっくり|take your time;enjoy|🙂"],
 dl:{set:"An evening at a ramen shop.",l:[["Staff","いらっしゃいませ。なんめいさま です か。","Welcome. How many?"],["You",[["ひとり です。",1,"One person."],["ひとつ です。",0,"ひとつ counts things."]]],["Staff","なに に します か。","What will you have?"],["You",[["ラーメン と ビール を ください。",1,"Order two things with と."],["ラーメン が すき です。",0,"That's a statement about your taste, not an order."]]],["Staff","おまたせしました。ごゆっくり どうぞ。","Sorry to keep you waiting. Enjoy."],["You",[["いただきます。",1,"Before eating."],["ごちそうさまでした。",0,"That's after eating."]]],["You",[["すみません、おかいけい おねがいします。",1,"Ask for the bill."],["すみません、おかいけい を たべます。",0,"That means you'll eat the bill."]]],["Staff","せんにひゃく えん です。","1,200 yen."],["You",[["ごちそうさまでした。",1,"Thanks on the way out — the perfect finish."],["いらっしゃいませ。",0,"Staff say that."]]]]}});

DAYS.push({t:"Conversation: shopping",o:"Ask, compare and buy in a shop.",
 v:["もうすこし|a little more|➕"],
 dl:{set:"Buying a bag at a market.",l:[["You",[["すみません、この かばん は いくら です か。",1,"Ask the price."],["この かばん を みません か。",0,"That's an invitation to watch the bag."]]],["Seller","さんぜん えん です。","3,000 yen."],["You",[["もうすこし ちいさい かばん は あります か。",1,"Ask for something a little smaller."],["さんぜん えん じゃ ありません。",0,"That denies the price!"]]],["Seller","はい、これ は せんはっぴゃく えん です。","Yes, this one is 1,800 yen."],["You",[["じゃ、これ を ください。カード で いい です か。",1,"Buy it and ask about card."],["これ は にほんご で なん です か。",0,"You already know it's a bag."]]]]}});

DAYS.push({t:"Conversation: directions",o:"Ask for directions, confirm and thank.",
 v:["とおい|far|🗺️","ちかい|near;close|📍"],
 s:["えき は とおい です か|Is the station far?|Ask if the station is far.","いいえ、 ちかい です|No, it's close;No, it's near;No, it's nearby|Say it's close."],
 dl:{set:"Looking for the post office.",l:[["You",[["すみません、ゆうびんきょく は どこ です か。",1,"Polite question."],["ゆうびんきょく へ いきません か。",0,"That invites them to go to the post office."]]],["Local","あの かど を ひだり に まがって ください。","Turn left at that corner."],["You",[["ひだり です ね。とおい です か。",1,"Confirm and ask a follow-up."],["みぎ です ね。",0,"They said left (ひだり)."]]],["Local","いいえ、ちかい です。ごふん ぐらい です。","No, it's close. About five minutes."],["You",[["ありがとうございます。",1,"Thank them."],["ごちそうさまでした。",0,"That's for after a meal."]]]]}});

DAYS.push({t:"Conversation: making plans",o:"Agree on a plan: day, time and place.",
 v:["つごう|availability;convenience (schedule)|🗓️","だいじょうぶ|okay;all right;fine|👌"],
 s:["どようび は だいじょうぶ です か|Is Saturday okay?;Is Saturday all right for you?|Check if Saturday works.","はい、 だいじょうぶ です|Yes, that's fine;Yes, it's okay;Yes, I'm fine|Say Saturday works."],
 dl:{set:"Texting a friend about the weekend.",l:[["Friend","こんど いっしょに びじゅつかん へ いきません か。","Want to go to the art museum together sometime?"],["You",[["いい です ね！どようび は だいじょうぶ です か。",1,"Accept and suggest a day."],["びじゅつかん が わかりません。",0,"That says you don't understand the museum."]]],["Friend","どようび は ちょっと…。にちようび は？","Saturday is a bit… How about Sunday?"],["You",[["にちようび、だいじょうぶ です。なんじ に あいましょう か。",1,"Agree and ask the time."],["どようび に いきましょう。",0,"Your friend just said Saturday doesn't work."]]],["Friend","じゅうじ に えき で。","10 at the station."],["You",[["わかりました。たのしみ です！",1,"Confirm and show you're looking forward to it."],["すみません、もういちど おねがいします。",0,"You understood perfectly."]]]]}});

DAYS.push({t:"Saying what you want and need",o:"Say what you'd like with ほしい and how you feel.",
 info:[["ほしい","[thing] が ほしい です = I want [thing]. It's an い-adjective. Use it about yourself; asking others what they want with ほしい can sound direct."]],
 v:["ほしい|want (a thing)|🎁","おなか が すきました|I'm hungry|🍽️","のど が かわきました|I'm thirsty|🥤"],
 s:["あたらしい かばん が ほしい です|I want a new bag;I'd like a new bag|Say you want a new bag.","おなか が すきました|I'm hungry;I got hungry|Tell a friend you're hungry.","みず が ほしい です|I want some water;I'd like water;I want water|Say you'd like some water."]});

DAYS.push(R("Week 23 check: conversation","Two-way conversations in social and practical situations."));

/* ===== WEEK 24 — CONSOLIDATION ===== */
DAYS.push({t:"High-frequency vocabulary sweep",o:"Review the words you'll use most, focusing on your weak spots.",cons:"vocab"});
DAYS.push({t:"Particle clinic",o:"Fix the particle mistakes learners make most: は が を に で へ と も.",cons:"particles"});
DAYS.push({t:"Verbs and adjectives clinic",o:"Review ます forms, past, negatives and adjective forms.",cons:"forms"});
DAYS.push({t:"Scenario assessment: travel day",o:"Handle station, taxi, hotel and restaurant situations without help.",cons:"travel",scn:[102,111,156,158]});
DAYS.push({t:"Scenario assessment: social life",o:"Introduce yourself, talk about family and make plans.",cons:"social",scn:[55,118,155,159,139]});
DAYS.push({t:"Mock final",o:"A timed-free practice run of the final assessment.",cons:"mock"});
DAYS.push(R("Final A1 assessment","Show what you can do across reading, listening, vocabulary, grammar and conversation, and get a personal plan.",{as:1,fin:1}));
})();
