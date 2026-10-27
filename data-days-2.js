/* NIHONGO — Days 57–112 (Stages 3–4) */
(function(){
const N = window.NIHONGO;
const DAYS = N.DAYS;
const R = (t,o,x={}) => Object.assign({rv:1,t,o},x);

/* ===== WEEK 9 ===== */
DAYS.push({t:"Polite verbs: 〜ます",o:"Recognise and use your first ます verbs.",g:"masu",
 v:["たべます|eat;to eat;will eat|🍽️","のみます|drink;to drink;will drink|🥤","みます|watch;see;look;to watch|👀","ききます|listen;hear;ask;to listen|🎧"],
 s:["たべます か|Will you eat?;Do you eat?;Are you going to eat?|Ask a friend if they're going to eat.","はい、 たべます|Yes, I'll eat;Yes, I eat;Yes, I will eat|Say yes, you'll eat."]});

DAYS.push({t:"What you act on: を",o:"Mark the object of a verb with を.",g:"wo",
 v:["みず|water|💧","テレビ|TV;television|📺","おんがく|music|🎵"],
 s:["みず を のみます|I drink water;I'll drink water;I will drink water|Say you'll drink water.","テレビ を みます|I watch TV;I'll watch TV;I watch television|Say you watch TV.","おんがく を ききます|I listen to music;I'll listen to music|Say you listen to music."]});

DAYS.push({t:"Don't and won't: 〜ません",o:"Make verbs negative with ません.",g:"masen",
 v:["さかな|fish|🐟","にく|meat|🥩","おさけ|alcohol;sake|🍶|Can mean Japanese sake or alcohol in general."],
 s:["にく を たべません|I don't eat meat;I do not eat meat;I won't eat meat|Tell your host you don't eat meat.","おさけ を のみません|I don't drink alcohol;I don't drink;I do not drink alcohol;I don't drink sake|Politely say you don't drink alcohol.","さかな を たべます か|Do you eat fish?;Will you eat fish?|Ask a guest whether they eat fish."]});

DAYS.push({t:"Going places: へ and に",o:"Say where you go, come and return to.",g:"eni",
 v:["いきます|go;to go;will go|🚶","きます|come;to come;will come|🏃","かえります|go home;return;go back;to go home|🏠","うち|home;my house|🏡"],
 s:["がっこう へ いきます|I go to school;I'm going to school;I will go to school;I'll go to school|Say you're going to school.","うち へ かえります|I go home;I'm going home;I'll go home;I will go home;I return home|Say you're going home.","あした ぎんこう に いきます|I'll go to the bank tomorrow;Tomorrow I will go to the bank;I'm going to the bank tomorrow;I go to the bank tomorrow|Say you'll go to the bank tomorrow."]});

DAYS.push({t:"Where you do it: で",o:"Say where an action happens with で.",g:"deplace",
 v:["べんきょうします|study;to study|📚","としょかん|library|🏛️","よみます|read;to read|📖","かきます|write;to write|✍️"],
 s:["としょかん で ほん を よみます|I read books at the library;I read a book in the library;I'll read a book at the library;I read books in the library|Say you read books at the library.","うち で にほんご を べんきょうします|I study Japanese at home|Say you study Japanese at home.","カフェ で コーヒー を のみます|I drink coffee at a café;I drink coffee at a cafe;I'll have coffee at a café;I drink coffee at the cafe|Say you drink coffee at a café."]});

DAYS.push({t:"At what time: time + に",o:"Say when you do things with に.",g:"nitime",
 v:["おきます|get up;wake up|⏰","ねます|sleep;go to bed|😴","まいあさ|every morning|🌅"],
 s:["しちじ に おきます|I get up at seven;I wake up at 7;I get up at 7;I wake up at seven|Say you get up at 7.","じゅういちじ に ねます|I go to bed at eleven;I sleep at 11;I go to bed at 11|Say you go to bed at 11.","まいあさ コーヒー を のみます|I drink coffee every morning;Every morning I drink coffee|Say you drink coffee every morning."]});

DAYS.push(R("Week 9 check","ます verbs and the particles を, へ/に, で and time に."));

/* ===== WEEK 10 ===== */
DAYS.push({t:"Your daily routine",o:"Describe a typical day: meals, shower, sleep.",
 v:["あさごはん|breakfast|🥐","ひるごはん|lunch|🍱","ばんごはん|dinner;supper|🍛","シャワー|shower|🚿","あびます|take (a shower);bathe|🚿|シャワー を あびます = take a shower."],
 s:["はちじ に あさごはん を たべます|I eat breakfast at eight;I have breakfast at 8;I eat breakfast at 8|Say you have breakfast at 8.","よる シャワー を あびます|I take a shower at night;I shower at night;I take a shower in the evening|Say you shower in the evening.","いちじ に ひるごはん を たべます|I eat lunch at one;I have lunch at 1;I eat lunch at 1|Say you have lunch at 1."]});

DAYS.push({t:"From … until …: から・まで",o:"Say from when and until when.",g:"karamade",
 v:["はたらきます|work;to work|💼","じゅぎょう|class;lesson|🏫"],
 s:["くじ から ごじ まで はたらきます|I work from nine to five;I work from 9 to 5;I work from 9 until 5|Describe your working hours.","じゅぎょう は なんじ から です か|What time does class start?;From what time is class?;What time is class from?|Ask when class starts.","じゅぎょう は じゅうじ から です|Class is from ten;Class starts at 10;The class is from 10;Class starts at ten|Answer: class starts at 10."]});

DAYS.push({t:"How often? まいにち・ときどき",o:"Say how often you do things.",
 info:[["Negative partners","あまり (not much) and ぜんぜん (not at all) need a negative verb: あまり みません = I don't watch much."]],
 v:["まいにち|every day|📆","ときどき|sometimes|🔀","よく|often|🔁","あまり|not much (+ negative)|📉","ぜんぜん|not at all (+ negative)|🚫"],
 s:["まいにち にほんご を べんきょうします|I study Japanese every day|Say you study Japanese every day.","ときどき ラーメン を たべます|I sometimes eat ramen;Sometimes I eat ramen|Say you sometimes eat ramen.","あまり テレビ を みません|I don't watch TV much;I don't watch much TV;I don't really watch TV|Say you don't watch much TV."]});

DAYS.push({t:"What do you do? 〜を します",o:"Use します for activities like shopping and cleaning.",
 v:["します|do;to do|✅","かいもの|shopping|🛍️","そうじ|cleaning|🧹","りょうり|cooking;cuisine|🍳"],
 s:["どようび に なに を します か|What do you do on Saturday?;What will you do on Saturday?;What are you doing on Saturday?|Ask a friend about their Saturday.","かいもの を します|I go shopping;I'll do some shopping;I do shopping;I'll go shopping|Say you'll go shopping.","にちようび に そうじ を します|I clean on Sunday;I do the cleaning on Sundays;I'll clean on Sunday;I clean on Sundays|Say you clean on Sundays."]});

DAYS.push({t:"How you get there: で",o:"Say how you travel with で, or あるいて for walking.",g:"demeans",
 v:["じてんしゃ|bicycle;bike|🚲","あるいて|on foot;walking|🚶","ひこうき|airplane;plane|✈️","しんかんせん|bullet train;Shinkansen|🚄"],
 s:["でんしゃ で がっこう へ いきます|I go to school by train;I take the train to school|Say you go to school by train.","あるいて うち へ かえります|I walk home;I go home on foot|Say you walk home.","しんかんせん で きょうと へ いきます|I'll go to Kyoto by bullet train;I go to Kyoto by Shinkansen;I'll take the Shinkansen to Kyoto|Say you'll go to Kyoto by Shinkansen."]});

DAYS.push({t:"With whom: と",o:"Say who you do things with — or that you're alone.",g:"to",
 v:["えいが|movie;film|🎬","ひとりで|alone;by myself|🧍","いっしょに|together|🤝"],
 s:["ともだち と えいが を みます|I watch a movie with a friend;I'll watch a movie with my friend;I watch movies with friends;I watch a movie with my friend|Say you'll watch a movie with a friend.","だれ と いきます か|Who are you going with?;Who will you go with?|Ask who someone is going with.","ひとりで いきます|I'll go alone;I go by myself;I will go alone;I'm going alone|Say you'll go by yourself."]});

DAYS.push(R("Week 10 check","Routines, から・まで, frequency, します, transport and と."));

/* ===== WEEK 11 ===== */
DAYS.push({t:"There is: あります・います",o:"Say what exists, using あります for things and います for living beings.",g:"aruiru",
 v:["あります|there is (things);have|📦","います|there is (people, animals)|🐾","こども|child;kid|🧒","おとこのひと|man|👨","おんなのひと|woman|👩"],
 s:["ねこ が います|There is a cat;There's a cat|Point out a cat.","ほん が あります|There is a book;There's a book;There are books|Say there is a book.","トイレ が あります か|Is there a toilet?;Is there a restroom?;Do you have a toilet?;Is there a bathroom?|Ask a shop if they have a toilet."]});

DAYS.push({t:"Where things are: 〜に あります",o:"Say where something is located.",g:"niloc",
 v:["つくえ|desk|🗃️","へや|room|🚪","にわ|garden;yard|🌳"],
 s:["へや に つくえ が あります|There is a desk in the room;There's a desk in the room|Describe your room.","にわ に いぬ が います|There is a dog in the garden;There's a dog in the yard;There is a dog in the yard|Say there's a dog in the garden.","かぎ は かばん に あります|The key is in the bag;The keys are in the bag;The key is in my bag|Tell someone where the key is."]});

DAYS.push({t:"On, under, in front: positions",o:"Use position words to say exactly where things are.",g:"position",
 v:["なか|inside;in|📥","まえ|front;in front|🔼","うしろ|behind;back|🔽","となり|next to;beside|↔️"],
 s:["ほん は つくえ の うえ に あります|The book is on the desk;The book is on top of the desk|Say the book is on the desk.","ねこ は いす の した に います|The cat is under the chair|Say the cat is under the chair.","ぎんこう は えき の まえ に あります|The bank is in front of the station|Say the bank is in front of the station."]});

DAYS.push({t:"Inviting: 〜ませんか",o:"Invite someone politely and accept or decline.",g:"masenka",
 v:["こんど|next time;sometime|🔜","ひま|free (time);not busy|🛋️","うみ|sea;beach|🌊"],
 s:["いっしょに えいが を みません か|Would you like to watch a movie together?;Won't you watch a movie with me?;Shall we watch a movie together?|Invite a friend to a movie.","こんど うみ へ いきません か|Would you like to go to the beach sometime?;Shall we go to the sea next time?;How about going to the beach sometime?|Suggest going to the beach sometime.","すみません、 ちょっと…|Sorry, that's a bit…;Sorry, it's a little difficult;Sorry, I can't|Politely decline an invitation."],
 dl:{set:"A friend has free time on Saturday.",l:[["Friend","どようび、ひま です か。","Are you free on Saturday?"],["You",[["はい、ひま です。",1,"Yes, I'm free."],["はい、ひま じゃ ありません。",0,"はい + a negative is contradictory."]]],["Friend","いっしょに えいが を みません か。","Would you like to see a movie together?"],["You",[["いい です ね。",1,"Warm acceptance.",["Friend","じゃ、どようび に。","Saturday, then."]],["すみません、ちょっと…",1,"A polite decline — trailing off is the normal way to say no.",["Friend","そう です か。じゃ、また こんど。","I see. Next time, then."]],["いいえ、みません。",0,"Grammatical, but blunt and cold as a reply to an invitation."]]]]}});

DAYS.push({t:"Let's: 〜ましょう",o:"Suggest doing things together with ましょう.",g:"mashou",
 v:["あいます|meet|🤝|Use に: ともだち に あいます = meet a friend.","まちます|wait|⏳","はじめます|begin;start|▶️"],
 s:["いきましょう|Let's go|Encourage everyone to set off.","なんじ に あいましょう か|What time shall we meet?|Ask what time to meet.","えき の まえ で あいましょう|Let's meet in front of the station|Suggest meeting in front of the station.","はじめましょう|Let's begin;Let's start|Start the class."]});

DAYS.push({t:"Kanji for the days of the week",o:"Read 月 火 水 木 金 土 and use them in day names.",
 info:[["Weekday kanji","月曜日 (Monday) = moon + 曜 (weekday) + 日 (day). You only need to recognise the first kanji to know the day."]],
 v:["やすみます|rest;take a day off|🛌"],
 s:["あした は 金[きん]曜[よう]日[び] です|Tomorrow is Friday;It's Friday tomorrow|Say tomorrow is Friday.","日[にち]曜[よう]日[び] は やすみ です|Sunday is a day off;Sundays are my day off;I'm off on Sunday;Sunday is a holiday|Say Sunday is your day off.","水[みず] を のみます|I drink water;I'll drink water|Say you'll drink water (in kanji)."]});

DAYS.push(R("Week 11 check","あります・います, locations, positions, invitations and weekday kanji."));

/* ===== WEEK 12 ===== */
DAYS.push({t:"Did it: 〜ました",o:"Talk about what you did with ました.",g:"mashita",
 v:["しゅくだい|homework|📝","かいます|buy;to buy|🛍️"],
 s:["きのう えいが を みました|I watched a movie yesterday;Yesterday I saw a movie;I saw a movie yesterday|Say you saw a movie yesterday.","しゅくだい を しました|I did my homework;I did the homework|Say you did your homework.","コンビニ で パン を かいました|I bought bread at the convenience store;I bought bread at a convenience store|Say you bought bread at the convenience store."]});

DAYS.push({t:"Didn't: 〜ませんでした",o:"Say what you didn't do.",g:"mashita",
 v:["けさ|this morning|🌅","ゆうべ|last night|🌙"],
 s:["けさ あさごはん を たべませんでした|I didn't eat breakfast this morning;I did not have breakfast this morning;I didn't have breakfast this morning|Say you skipped breakfast this morning.","ゆうべ テレビ を みませんでした|I didn't watch TV last night;I did not watch TV last night|Say you didn't watch TV last night.","きのう しごと に いきませんでした|I didn't go to work yesterday;I did not go to work yesterday|Say you didn't go to work yesterday."]});

DAYS.push({t:"What did you do?",o:"Ask and answer about the weekend.",
 v:["しゅうまつ|weekend|🎒","こうえん|park|🌳","さんぽ|walk;stroll|🚶"],
 s:["しゅうまつ に なに を しました か|What did you do on the weekend?;What did you do at the weekend?;What did you do over the weekend?|Ask a colleague about their weekend.","こうえん で さんぽ を しました|I took a walk in the park;I went for a walk in the park|Say you went for a walk in the park.","ともだち に あいました|I met a friend;I met my friend;I met friends|Say you met a friend."]});

DAYS.push({t:"Reading a weekly plan",o:"Read a short schedule and find key information.",
 v:["よてい|plan;schedule|🗓️","メモ|memo;note|🗒️"],
 rd:{title:"ゆきさん の よてい（Yuki's plans）",text:["げつようび：じゅうじ から じゅぎょう","すいようび：ともだち と えいが","きんようび：ぎんこう に いきます","どようび：やすみ"],q:[["When does Yuki see a movie?",["Monday","Wednesday","Friday"],1,"すいようび (Wednesday): ともだち と えいが — a movie with a friend."],["What does Yuki do on Friday?",["Goes to the bank","Has class","Rests"],0,"きんようび：ぎんこう に いきます — goes to the bank."],["When is Monday's class?",["From 10:00","From 9:00","Until 10:00"],0,"じゅうじ から = from 10 o'clock."],["Which day is free?",["Saturday","Wednesday","Monday"],0,"どようび：やすみ — Saturday is a day off."]]}});

DAYS.push({t:"A short phone call",o:"Follow a short phone exchange by ear.",
 v:["もしもし|hello (on the phone)|📞","じかん|time;hours|⏳"],
 ls:{title:"でんわ（A phone call）",l:[["Suzuki","もしもし、すずき です。"],["You","あ、すずきさん。こんにちは。"],["Suzuki","あした、じかん が あります か。"],["You","はい、あります。"],["Suzuki","いっしょに ひるごはん を たべません か。"],["You","いい です ね。なんじ に あいましょう か。"],["Suzuki","じゅうにじ に えき の まえ で。"]],q:[["What does Suzuki suggest?",["Having lunch together","Watching a movie","Studying together"],0,"ひるごはん を たべません か — shall we have lunch?"],["When will they meet?",["12 o'clock","2 o'clock","10 o'clock"],0,"じゅうにじ = 12 o'clock."],["Where will they meet?",["In front of the station","At a café","At school"],0,"えき の まえ で — in front of the station."]]}});

DAYS.push({t:"Making weekend plans",o:"Invite, agree on a time and place, and confirm.",
 v:["どうぶつえん|zoo|🦁","びじゅつかん|art museum;art gallery|🖼️"],
 s:["どようび に どうぶつえん へ いきません か|Would you like to go to the zoo on Saturday?;Shall we go to the zoo on Saturday?|Invite a friend to the zoo on Saturday."],
 dl:{set:"Planning the weekend with a friend.",l:[["Friend","しゅうまつ、なに を します か。","What are you doing this weekend?"],["You",[["どようび に どうぶつえん へ いきません か。",1,"An invitation with ませんか."],["どうぶつえん です。",0,"Too abrupt — it doesn't answer or invite."]]],["Friend","いい です ね。なんじ に あいましょう か。","Sounds good. What time shall we meet?"],["You",[["じゅうじ に えき で あいましょう。",1,"Time with に, place with で, and ましょう."],["じゅうじ を あいます。",0,"Times take に, not を."]]],["Friend","じゃ、どようび に。","See you Saturday, then."]]}});

DAYS.push(R("Stage 3 assessment","Verbs, particles, routines, locations, invitations and past tense.",{as:1}));

/* ===== WEEK 13 ===== */
DAYS.push({t:"Food",o:"Name everyday foods.",
 v:["やさい|vegetables|🥦","くだもの|fruit|🍇","たまご|egg;eggs|🥚","とりにく|chicken (meat)|🍗","たくさん|a lot;lots;many|➕"],
 s:["まいあさ たまご を たべます|I eat eggs every morning;I eat an egg every morning|Describe your breakfast habit.","やさい を たくさん たべます|I eat a lot of vegetables;I eat lots of vegetables|Say you eat lots of vegetables."]});

DAYS.push({t:"Drinks and choosing: 〜に します",o:"Choose what you'll have with に します.",g:"nishimasu",
 v:["こうちゃ|black tea|🫖","ビール|beer|🍺","ぎゅうにゅう|milk|🥛","アイスコーヒー|iced coffee|🧋"],
 s:["なに に します か|What will you have?;What would you like?|A friend asks what you'll order.","わたし は コーヒー に します|I'll have coffee;I'll go with coffee;I'll have a coffee|Choose coffee.","アイスコーヒー に します|I'll have an iced coffee;I'll have iced coffee|Choose iced coffee."]});

DAYS.push({t:"Please give me: 〜を ください",o:"Ask for things in a shop or café.",g:"kudasai",
 v:["ください|please give me|🙏","みせ|shop;store|🏬","べんとう|boxed lunch;bento|🍱","おにぎり|rice ball|🍙"],
 s:["これ を ください|This one, please;I'll take this;Please give me this|Point at an item and ask for it.","おにぎり を ください|A rice ball, please;Rice ball, please;Please give me a rice ball;Onigiri, please|Ask for a rice ball.","みず を ください|Water, please;Please give me water;Some water, please|Ask for water."]});

DAYS.push({t:"At the restaurant door",o:"Tell staff how many people and follow them to a table.",
 info:[["Counting people","ひとり (1), ふたり (2), then number + にん: さんにん, よにん. Staff ask なんめいさま です か."]],
 v:["なんめいさま|how many people (polite, used by staff)|👥","ひとり|one person|1️⃣","ふたり|two people|2️⃣","さんにん|three people|3️⃣"],
 s:["ふたり です|Two people;There are two of us;Two;Table for two|Tell the staff there are two of you.","ひとり です|Just one;One person;Just me;Table for one|Say you're alone."],
 dl:{set:"You and a friend walk into a restaurant.",l:[["Staff","いらっしゃいませ。なんめいさま です か。","Welcome! How many people?"],["You",[["ふたり です。",1,"Two people — exactly what they asked."],["にさい です。",0,"にさい means “two years old”."],["ふたつ です。",0,"ふたつ counts things, not people."]]],["Staff","こちら へ どうぞ。","This way, please."]]}});

DAYS.push({t:"Ordering and the bill",o:"Ask for the menu, a recommendation and the bill.",
 v:["おすすめ|recommendation|⭐","おかいけい|the bill;the check|🧾","ていしょく|set meal|🍱"],
 s:["すみません、 メニュー を おねがいします|Excuse me, the menu please;Excuse me, can I have the menu;Excuse me, menu please|Call the waiter and ask for the menu.","おすすめ は なん です か|What do you recommend?;What is your recommendation?;What's recommended?|Ask for a recommendation.","おかいけい おねがいします|The bill, please;Check, please;Can I have the bill|Ask for the bill."],
 dl:{set:"You're sitting at a table, ready to order.",l:[["You",[["すみません。",1,"Call the staff with すみません — it's normal and polite."],["いらっしゃいませ。",0,"Staff say that, not customers."]]],["Staff","はい、どうぞ。","Yes, go ahead."],["You",[["おすすめ は なん です か。",1,"Ask for a recommendation."],["おすすめ を たべません か。",0,"That invites the staff to eat!"]]],["Staff","この ていしょく です。","This set meal."],["You",[["じゃ、それ を ください。",1,"Order it."],["いただきます。",0,"Save that for when the food arrives."]]]]}});

DAYS.push({t:"Delicious! Table manners",o:"Praise food and use meal phrases correctly.",
 info:[["Manners","Say いただきます before and ごちそうさまでした after. Never stand chopsticks upright in rice (it's for funerals). There's no tipping in Japan."]],
 v:["おいしい|delicious;tasty;good|😋","とても|very|➕","ごちそうさまでした|thank you for the meal (polite)|🙏"],
 s:["おいしい です|It's delicious;It is tasty;It's good;It's tasty|Tell the cook it's tasty.","とても おいしい です|It's very delicious;It's really tasty;It's very good|Say it's really delicious.","ごちそうさまでした|Thank you for the meal|Thank the host after eating."]});

DAYS.push(R("Week 13 check","Food, drinks, ordering, people counters and restaurant phrases."));

/* ===== WEEK 14 ===== */
DAYS.push({t:"How much? いくら",o:"Ask prices and read 100s, 1,000s and 10,000s.",g:"ikura",num:"yen",
 v:["いくら|how much|💴","えん|yen|💴","ひゃく|hundred|💯","せん|thousand|🔢","まん|ten thousand|🔢|Japanese counts big numbers in units of 10,000."],
 s:["これ は いくら です か|How much is this?;How much does this cost?|Ask the price of an item.","ひゃくえん です|It's 100 yen;100 yen;It is one hundred yen;It's one hundred yen|Say the price is 100 yen."]});

DAYS.push({t:"Price sound changes and kanji",o:"Hear さんびゃく, ろっぴゃく, はっせん and read 百 千 万 円.",num:"yen2",
 info:[["Sound changes","300 さんびゃく, 600 ろっぴゃく, 800 はっぴゃく, 3,000 さんぜん, 8,000 はっせん. Everything else is regular."],["Price kanji","百 hundred, 千 thousand, 万 ten thousand, 円 yen — you'll see them on price tags."]],
 s:["さんびゃく えん です|It's 300 yen;300 yen;It is three hundred yen|Say the price is 300 yen.","せんはっぴゃく えん です|It's 1,800 yen;It's 1800 yen;1800 yen;1,800 yen|Say the price is 1,800 yen.","千[せん]円[えん] です|It's 1,000 yen;It's 1000 yen;1000 yen;1,000 yen|Read the price tag: 1,000 yen."]});

DAYS.push({t:"Counting things: ひとつ, ふたつ",o:"Order quantities with native counters.",g:"counters",
 v:["ひとつ|one (thing)|1️⃣","ふたつ|two (things)|2️⃣","みっつ|three (things)|3️⃣","いくつ|how many|❓","りんご|apple|🍎"],
 s:["りんご を みっつ ください|Three apples, please;Please give me three apples|Ask for three apples.","これ を ふたつ ください|Two of these, please;I'll take two of these;Two of these please|Ask for two of an item.","いくつ あります か|How many are there?;How many do you have?|Ask how many there are."]});

DAYS.push({t:"Colours and preferences: 〜が いいです",o:"Say which colour or option you'd like.",g:"gaii",
 v:["あか|red|🔴","しろ|white|⚪","くろ|black|⚫","みどり|green|🟢","どの|which (+ noun)|❓"],
 s:["どの いろ が いい です か|Which color would you like?;Which colour do you want?;Which colour would you like?|A clerk asks which colour you want.","あか が いい です|I'd like red;Red is good;I prefer red;Red, please|Say you'd like the red one.","しろ と くろ が あります|There's white and black;We have white and black;There are white and black ones|Say they have white and black."]});

DAYS.push({t:"Sizes and asking “do you have…?”",o:"Ask for a size or a different colour.",
 v:["サイズ|size|📏","エムサイズ|size M;medium|Ⓜ️","ほか|other;another|↔️"],
 s:["エムサイズ は あります か|Do you have a medium?;Do you have size M?;Is there an M size?;Do you have it in medium?|Ask for a medium.","ほか の いろ は あります か|Do you have other colors?;Do you have it in another colour?;Are there other colors?;Do you have other colours?|Ask about other colours."]});

DAYS.push({t:"Paying",o:"Pay by card or cash and refuse a bag politely.",
 info:[["いいです can mean no","ふくろ は いい です = “I'm fine without a bag.” With は, いい です is a polite refusal."],["Paying","Put cash or card on the small tray at the counter rather than handing it over."]],
 v:["カード|card;credit card|💳","げんきん|cash|💵","レシート|receipt|🧾","ふくろ|bag (shopping);plastic bag|🛍️"],
 s:["カード で いい です か|Is card okay?;Can I pay by card?;Is a card OK?;Can I use a card?|Ask if you can pay by card.","げんきん で おねがいします|In cash, please;I'll pay in cash;Cash, please|Say you'll pay cash.","ふくろ は いい です|I don't need a bag;No bag, thanks;I'm fine without a bag|Decline a bag."],
 dl:{set:"At a convenience store checkout.",l:[["Clerk","ふくろ は いります か。","Do you need a bag?"],["You",[["ふくろ は いい です。",1,"A polite “no thanks”."],["ふくろ を ください。",1,"Also fine — you're asking for one.",["Clerk","はい、さんえん です。","Sure, it's 3 yen."]],["ふくろ です。",0,"Unclear — it just says “it's a bag”."]]],["Clerk","ごひゃく えん です。","That's 500 yen."],["You",[["カード で いい です か。",1,"Ask about card payment."],["ごひゃく えん を たべます。",0,"That means “I eat 500 yen”."]]],["Clerk","はい、だいじょうぶ です。","Yes, that's fine."]]}});

DAYS.push(R("Week 14 check","Prices, counters, colours, sizes and paying."));

/* ===== WEEK 15 ===== */
DAYS.push({t:"Left, right, straight on",o:"Understand simple directions, including 〜て ください.",g:"tekudasai",
 v:["みぎ|right|➡️","ひだり|left|⬅️","まっすぐ|straight ahead;straight|⬆️","かど|corner|↩️","まがります|turn|↪️"],
 s:["まっすぐ いって ください|Please go straight;Go straight, please;Go straight ahead|Tell someone to go straight.","かど を みぎ に まがって ください|Please turn right at the corner;Turn right at the corner|Tell someone to turn right at the corner.","えき は ひだり です|The station is on the left;The station is to the left|Say the station is on the left."]});

DAYS.push({t:"Is there one nearby?",o:"Ask if a place is nearby and understand where it is.",
 v:["ちかく|nearby;near|📍","ちず|map|🗺️","みち|road;street;way|🛣️"],
 s:["この ちかく に コンビニ は あります か|Is there a convenience store near here?;Is there a convenience store nearby?|Ask if there's a convenience store nearby.","ぎんこう は ゆうびんきょく の となり です|The bank is next to the post office|Say the bank is next to the post office.","えき は どこ です か|Where is the station?;Where's the station?|Ask where the station is."]});

DAYS.push({t:"Taking the train",o:"Buy a ticket, find the platform and ride.",
 v:["きっぷ|ticket|🎫","なんばんせん|which platform;what track|🚉","のります|get on;ride;take (a vehicle)|🚃|Use に: でんしゃ に のります.","おります|get off|🚶|Use を: でんしゃ を おります."],
 s:["なんばんせん です か|Which platform is it?;What platform?;Which track?|Ask which platform.","さんばんせん です|It's platform 3;It's platform three;Platform 3|Answer: platform 3.","でんしゃ に のります|I get on the train;I take the train;I ride the train|Say you'll take the train.","しんじゅく で おります|I get off at Shinjuku;I'll get off at Shinjuku|Say you get off at Shinjuku."]});

DAYS.push({t:"Taking a taxi",o:"Tell a taxi where to go and where to stop.",
 v:["くうこう|airport|🛫","おつり|change (money back)|🪙","うんてんしゅ|driver|🧑‍✈️"],
 s:["くうこう まで おねがいします|To the airport, please;Airport, please|Tell the driver to go to the airport.","ここ で いい です|Here is fine;You can stop here;Here is okay|Tell the driver to stop here.","えき まで いくら です か|How much is it to the station?;How much to the station?|Ask the fare to the station."],
 dl:{set:"You get into a taxi.",l:[["Driver","どちら まで ですか。","Where to?"],["You",[["くうこう まで おねがいします。",1,"Destination + まで おねがいします."],["くうこう です か。",0,"That asks “is it the airport?”"]]],["Driver","はい。","Okay."],["Driver","くうこう です。にせんごひゃく えん です。","Here's the airport. That's 2,500 yen."],["You",[["カード で いい です か。",1,"Asking to pay by card."],["いいえ、くうこう じゃ ありません。",0,"You do want the airport!"]]]]}});

DAYS.push({t:"Timetables: でます・つきます",o:"Ask when trains leave and arrive.",
 v:["でます|leave;depart|🚉","つきます|arrive|🏁","つぎ|next|⏭️"],
 s:["つぎ の でんしゃ は なんじ に でます か|What time does the next train leave?;When does the next train leave?|Ask when the next train leaves.","じゅうじ はん に つきます|It arrives at 10:30;It arrives at half past ten;It gets in at 10:30|Say it arrives at 10:30.","しんかんせん は くじ に でます|The bullet train leaves at nine;The Shinkansen departs at 9;The Shinkansen leaves at 9|Say the Shinkansen leaves at 9."]});

DAYS.push({t:"Lost something",o:"Report a lost item and find the police box.",
 info:[["こうばん","A こうばん is a small neighbourhood police box. Officers help with directions and lost property — a very common first stop."]],
 v:["こうばん|police box|👮","なくします|lose (something)|🔍","さいふ|wallet;purse|👛","けいたい|mobile phone;cell phone|📱"],
 s:["さいふ を なくしました|I lost my wallet;I've lost my wallet|Say you lost your wallet.","こうばん は どこ です か|Where is the police box?;Where's the police box?|Ask where the police box is.","けいたい を なくしました|I lost my phone;I've lost my mobile;I lost my cell phone;I've lost my phone|Say you lost your phone."]});

DAYS.push(R("Week 15 check","Directions, nearby places, trains, taxis and timetables."));

/* ===== WEEK 16 ===== */
DAYS.push({t:"I (don't) understand",o:"Say what you understand with が わかります.",g:"wakaru",
 v:["わかります|understand|💡","わかりません|don't understand;I don't know|🤷","すこし|a little;a bit|🤏"],
 s:["わかりません|I don't understand;I don't know|Say you don't understand.","にほんご が すこし わかります|I understand a little Japanese;I understand Japanese a little|Say you understand a little Japanese.","えいご が わかります か|Do you understand English?;Do you speak English?|Ask if someone understands English."]});

DAYS.push({t:"What does it mean?",o:"Ask how to say something and what a word means.",
 v:["いみ|meaning|💭","ことば|word;language|💬","どういう|what kind of;what sort of|❓"],
 s:["これ は にほんご で なん です か|What is this in Japanese?;How do you say this in Japanese?|Point at something and ask its Japanese name.","この ことば は どういう いみ です か|What does this word mean?|Ask what a word means.","かいて ください|Please write it;Please write it down|Ask someone to write it down."]});

DAYS.push({t:"At the doctor",o:"Explain simple symptoms.",
 v:["いたい|hurts;painful;sore|🤕","おなか|stomach;belly|😣","くすり|medicine|💊","ねつ|fever;temperature|🌡️"],
 s:["あたま が いたい です|I have a headache;My head hurts|Say you have a headache.","おなか が いたい です|I have a stomachache;My stomach hurts|Say your stomach hurts.","ねつ が あります|I have a fever;I have a temperature|Say you have a fever.","くすり を ください|Medicine, please;Can I have some medicine;Please give me some medicine|Ask a pharmacist for medicine."]});

DAYS.push({t:"At the hotel",o:"Check in and ask about check-out.",
 v:["よやく|reservation;booking|📅","チェックイン|check-in|🛎️","チェックアウト|check-out|🧳","パスポート|passport|🛂"],
 s:["よやく が あります|I have a reservation;I have a booking|Tell the front desk you have a booking.","チェックイン を おねがいします|Check-in, please;I'd like to check in|Ask to check in.","チェックアウト は なんじ です か|What time is check-out?;When is check-out?|Ask when check-out is."],
 dl:{set:"Front desk of a hotel.",l:[["Staff","いらっしゃいませ。","Welcome."],["You",[["チェックイン を おねがいします。よやく が あります。",1,"Clear request with the key information."],["チェックアウト です。",0,"You're arriving, not leaving."]]],["Staff","おなまえ は。","Your name?"],["You",[["{me} です。",1,"Give your name."],["わかりません。",0,"You know your own name!"]]],["Staff","パスポート を おねがいします。","Your passport, please."],["You",[["はい、どうぞ。",1,"どうぞ when handing something over."],["いただきます。",0,"That's for food."]]]]}});

DAYS.push({t:"Asking a stranger for help",o:"Ask someone to take a photo or press a button.",
 v:["とります|take (a photo)|📷","おします|push;press|👆","ボタン|button|🔘"],
 s:["すみません、 しゃしん を とって ください|Excuse me, please take a photo;Excuse me, could you take a photo;Excuse me, please take our picture|Ask a passer-by to take your photo.","この ボタン を おして ください|Please press this button;Press this button, please|Show them which button to press.","ここ で しゃしん を とります|I'll take a photo here;I take photos here|Say you'll take a photo here."]});

DAYS.push({t:"Role-play: a day of travel",o:"Handle a full travel day: station, café and directions.",
 v:["りょこう|trip;travel|🧳","たのしみ|looking forward (to it)|😊"],
 s:["あした から りょこう です|I'm traveling from tomorrow;The trip starts tomorrow;My trip starts tomorrow|Say your trip starts tomorrow.","たのしみ です|I'm looking forward to it;I can't wait|Say you're looking forward to it."],
 dl:{set:"Kyoto Station. You need to find your hotel.",l:[["You",[["すみません。ホテル は どこ です か。",1,"Polite question."],["ホテル を ください。",0,"That means “give me a hotel”."]]],["Local","この みち を まっすぐ いって ください。","Go straight along this road."],["You",[["まっすぐ です ね。",1,"Confirm with ね."],["ひだり です か。",0,"They said straight, not left."]]],["Local","はい。ぎんこう の となり です。","Yes. It's next to the bank."],["You",[["ありがとうございます。",1,"Thank them politely."],["どういたしまして。",0,"That's the reply to thanks, not thanks itself."]]],["","（カフェ で）","(Later, at a café)"],["Staff","なに に します か。","What will you have?"],["You",[["アイスコーヒー に します。",1,"Choose with に します."],["アイスコーヒー が わかります。",0,"That says you understand iced coffee."]]]]}});

DAYS.push(R("Stage 4 assessment","Restaurants, shopping, directions, transport, hotels and asking for help.",{as:1}));
})();
