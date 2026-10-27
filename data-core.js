/* NIHONGO — core reference data: kana, kanji, grammar, stages, weeks, competencies */
(function(){
const N = window.NIHONGO = window.NIHONGO || {};

/* ---------- Kana ---------- */
// [hiragana, romaji, mnemonic]
N.HIRA = [
 ["あ","a","An apple stuck on a cross — 'a' for apple."],
 ["い","i","Two eels standing side by side — 'ee'."],
 ["う","u","A person bent over: 'ooh', my stomach."],
 ["え","e","An energetic bird with a crest — 'eh?'"],
 ["お","o","A golfer's 'oh!' as the ball flies off the right."],
 ["か","ka","A karate chop with a little extra stroke — 'ka!'"],
 ["き","ki","An old door key."],
 ["く","ku","A bird's beak going 'coo'."],
 ["け","ke","A keg on its side with a tap."],
 ["こ","ko","Two worms, cozy and parallel — 'ko'."],
 ["さ","sa","A signpost leaning: 'sa'. Its twin ち faces the other way."],
 ["し","shi","A fishhook — 'she' goes fishing. Romaji: shi."],
 ["す","su","A swing with a loop — 'su'."],
 ["せ","se","A mouth with a tooth: 'say'."],
 ["そ","so","A zig-zag thread being sewn — 'so'."],
 ["た","ta","The letters t and a squeezed together."],
 ["ち","chi","A cheerleader's '5' — 'chi'. Mirror of さ."],
 ["つ","tsu","A wave; a tsunami. Romaji: tsu."],
 ["て","te","An open hand — て also means 'hand'."],
 ["と","to","A thorn in a toe."],
 ["な","na","A nun kneeling at a cross."],
 ["に","ni","A knee (|) next to two lines: 'ni'."],
 ["ぬ","nu","Noodles with a loop at the end. め has no loop."],
 ["ね","ne","A cat (ねこ) with a curled tail."],
 ["の","no","A 'no entry' swirl."],
 ["は","ha","'Ha' — a laughing face beside a pole. As a particle it is read 'wa'."],
 ["ひ","hi","A big grin: 'hee hee'."],
 ["ふ","fu","Mount Fuji with clouds. Lips barely touch: 'fu'."],
 ["へ","he","A gentle hill: 'heh'. As a particle it is read 'e'."],
 ["ほ","ho","は with an extra cross bar on top: 'ho'."],
 ["ま","ma","A mama with two belts."],
 ["み","mi","The number 21 written fast: 'me'."],
 ["む","mu","A cow mooing with its tail out."],
 ["め","me","An eye (め) with no loop. ぬ has the loop."],
 ["も","mo","A fishhook with more bait."],
 ["や","ya","A yak with horns."],
 ["ゆ","yu","A unique fish swimming in a circle."],
 ["よ","yo","A yo-yo on a stick."],
 ["ら","ra","A rabbit's ear: 'ra'."],
 ["り","ri","Reeds swaying. Looks like い but joined."],
 ["る","ru","A route with a loop at the end. ろ has no loop."],
 ["れ","re","A man kneeling to rest. Compare ね and わ."],
 ["ろ","ro","A road with no loop. る has the loop."],
 ["わ","wa","A wasp with a round body. Like れ but rounded."],
 ["を","wo","Only a particle; read 'o'. A man falling off a ledge: 'whoa'."],
 ["ん","n","A lowercase 'n' written loosely."],
];
N.DAKU = [["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]];
N.YOON = [["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],["しゃ","sha"],["しゅ","shu"],["しょ","sho"],["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],["みゃ","mya"],["みゅ","myu"],["みょ","myo"],["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],["じゃ","ja"],["じゅ","ju"],["じょ","jo"],["びゃ","bya"],["びゅ","byu"],["びょ","byo"],["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]];
N.EXTRA_KATA = [["ティ","ti"],["ディ","di"],["ファ","fa"],["フィ","fi"],["フェ","fe"],["フォ","fo"],["ウィ","wi"],["ウェ","we"],["チェ","che"],["シェ","she"],["ジェ","je"]];
// Look-alike groups drive discrimination drills and distractors
N.LOOKALIKE = [["ぬ","め"],["ね","れ","わ"],["は","ほ"],["る","ろ"],["さ","ち","き"],["い","り"],["こ","に"],["う","ら"],["あ","お"],["シ","ツ"],["ソ","ン"],["ク","ケ"],["ウ","ワ","フ"],["コ","ユ"],["チ","テ"],["ス","ヌ"],["マ","ア"],["ノ","メ"],["ヲ","ヨ"],["ク","タ"],["ナ","メ"],["ロ","コ"]];
N.KATA_NOTES = {"ツ":"Strokes come down from the top. シ strokes go up from the left.","シ":"Strokes go up from the left. ツ strokes come down from the top.","ソ":"Stroke comes down from the top. ン stroke goes up.","ン":"Final stroke sweeps up from the bottom. ソ comes down.","カ":"Same shape as hiragana か without the extra stroke.","ヘ":"Almost identical to hiragana へ.","リ":"Like hiragana り, but straighter.","ー":"Long-vowel bar: hold the previous vowel for one more beat."};

/* ---------- Kanji (introduced gradually, always with furigana) ---------- */
// [kanji, meaning, readings, example (ruby markup), example meaning, day]
N.KANJI = [
 ["一","one","いち・ひと(つ)","一[いち]","one",48],["二","two","に・ふた(つ)","二[に]","two",48],["三","three","さん・みっ(つ)","三[さん]","three",48],
 ["人","person","じん・にん・ひと","日本[にほん]人[じん]","a Japanese person",48],["日","sun; day","にち・に・ひ・び","日本[にほん]","Japan",48],["本","book; origin","ほん","本[ほん]","book",48],
 ["月","moon; month","げつ・がつ・つき","月[げつ]曜[よう]日[び]","Monday",76],["火","fire","か・ひ","火[か]曜[よう]日[び]","Tuesday",76],["水","water","すい・みず","水[みず]","water",76],
 ["木","tree","もく・き","木[もく]曜[よう]日[び]","Thursday",76],["金","gold; money","きん・かね","金[きん]曜[よう]日[び]","Friday",76],["土","earth; soil","ど・つち","土[ど]曜[よう]日[び]","Saturday",76],
 ["百","hundred","ひゃく・びゃく・ぴゃく","三[さん]百[びゃく]","three hundred",93],["千","thousand","せん・ぜん","千[せん]円[えん]","1,000 yen",93],["万","ten thousand","まん","一[いち]万[まん]円[えん]","10,000 yen",93],["円","yen; circle","えん","百[ひゃく]円[えん]","100 yen",93],
 ["大","big","だい・おお(きい)","大[おお]きい","big",132],["小","small","しょう・ちい(さい)","小[ちい]さい","small",132],["山","mountain","さん・やま","山[やま]","mountain",132],
 ["川","river","かわ・がわ","川[かわ]","river",132],["上","up; above","じょう・うえ","上[うえ]","above",132],["下","down; below","か・した","下[した]","below",132],
 ["入","enter","にゅう・い(る)","入口[いりぐち]","entrance",146],["出","exit; go out","しゅつ・で(る)","出口[でぐち]","exit",146],["口","mouth; opening","こう・くち・ぐち","出口[でぐち]","exit",146],
 ["中","middle; inside","ちゅう・なか","中[なか]","inside",146],["学","study","がく・がっ","学校[がっこう]","school",146],["生","life; birth","せい・い(きる)","学生[がくせい]","student",146],
];

/* ---------- Grammar ---------- */
// t title, s short explanation, ex [jp tiles, en], how, more (expanded), err [[bad tiles, wrongIndex, correction, why]]
N.GRAMMAR = {
 wa:{t:"A は B です — “A is B”",s:"は (read “wa”) marks the topic. です makes the sentence polite: “is / am / are”.",ex:["わたし は がくせい です","I am a student."],how:"わたし (I) + は (as for…) + がくせい (student) + です (is).",more:"Japanese drops the topic when it is obvious. Answering a question, がくせいです alone means “(I) am a student”. は is written with the kana ha but always pronounced “wa” as a particle.",err:[["わたし を がくせい です",1,"は","The topic marker is は. を marks the object of an action verb (Day 58)."],["たなかさん は せんせい",2,"せんせい です","A polite sentence needs です at the end."]]},
 ka:{t:"〜か — questions",s:"Put か at the end of a sentence to make it a question. Word order does not change.",ex:["がくせい です か","Are you a student?"],how:"がくせい です (am a student) + か (?) → question.",more:"Japanese questions keep statement order. In writing, か is usually followed by 。 rather than ？. Answer with はい、そうです (yes, that's right) or いいえ (no).",err:[["はい、 がくせい です か",3,"(remove か)","Adding か turns your answer into another question."]]},
 ja:{t:"じゃ ありません — “is not”",s:"Replace です with じゃ ありません to make a polite negative.",ex:["わたし は せんせい じゃ ありません","I am not a teacher."],how:"せんせい (teacher) + じゃ ありません (is not).",more:"では ありません is the more formal written version. じゃ ないです is also common in speech. All mean the same.",err:[["わたし は いしゃ です ありません",3,"じゃ","The negative of です is じゃ ありません, not です ありません."]]},
 kosoa:{t:"これ・それ・あれ — this / that",s:"これ = this (near me), それ = that (near you), あれ = that over there (far from both).",ex:["これ は ほん です","This is a book."],how:"これ (this thing) + は + ほん (book) + です.",more:"Japanese splits “that” by distance: near the listener (そ-) or far from both (あ-). The same ko/so/a/do pattern repeats in ここ/そこ/あそこ/どこ and この/その/あの/どの.",err:[["これ を ほん です",1,"は","これ is the topic here, so mark it with は."]]},
 kono:{t:"この・その・あの + noun",s:"この / その / あの always come right before a noun: この ひと = this person.",ex:["あの ひと は たなかさん です","That person (over there) is Mr. Tanaka."],how:"あの (that … over there) + ひと (person) → “that person”.",more:"これ stands alone (“this one”); この needs a noun after it (“this ___”). You cannot say この は.",err:[["この は ほん です",0,"これ","この must be followed by a noun. On its own, use これ."]]},
 no:{t:"A の B — possession and linking",s:"の links two nouns: A の B = A's B, or B of/about A.",ex:["これ は わたし の ほん です","This is my book."],how:"わたし (I) + の → my; わたし の ほん = my book.",more:"の is very flexible: にほんご の ほん is a book about/in Japanese; にほん の くるま is a car from Japan. わたし の can stand alone too: それ は わたし の です = That's mine.",err:[["これ は わたし ほん です",2,"わたし の","Between two nouns you need の: わたし の ほん."]]},
 nan:{t:"なん・だれ — what / who",s:"Put the question word where the answer will go, then end with か.",ex:["これ は なん です か","What is this?"],how:"これ は ___ です か: fill the slot with なん (what).",more:"なに and なん both mean “what”. Use なん before です and before counters (なんじ, なんさい); use なに before particles like を. だれ = who; どなた is the polite version.",err:[["これ は なん です",3,"です か","A question needs か at the end."]]},
 mo:{t:"も — “also / too”",s:"も replaces は (or が, を) to mean “also”.",ex:["わたし も がくせい です","I am a student too."],how:"わたし も = me too; it takes the place of は.",more:"Never use は and も together. あした も やすみ です = Tomorrow is also a day off.",err:[["わたし は も がくせい です",1,"(remove は)","も replaces は. Say わたし も, not わたし は も."]]},
 deshita:{t:"でした — “was”",s:"でした is the past of です.",ex:["きのう は やすみ でした","Yesterday was a day off."],how:"やすみ (day off) + でした (was).",more:"Negative past: じゃ ありませんでした (was not).",err:[["きのう は やすみ です",3,"でした","きのう is yesterday, so use the past form でした."]]},
 koko:{t:"ここ・そこ・あそこ・どこ — places",s:"ここ = here, そこ = there (near you), あそこ = over there, どこ = where.",ex:["トイレ は どこ です か","Where is the toilet?"],how:"トイレ は + どこ (where) + です か.",more:"Polite versions: こちら, そちら, あちら, どちら. Staff often use them: こちら へ どうぞ = This way, please.",err:[["トイレ は どこ か",3,"です か","Keep です before か in a polite question."]]},
 neyo:{t:"〜ね and 〜よ — sentence endings",s:"ね asks for agreement (“isn't it?”). よ tells new information (“you know”).",ex:["いい です ね","That's nice, isn't it."],how:"いい です (it's good) + ね (right?).",more:"Use ね when you expect the listener already agrees, よ when you inform them. Too much よ can sound pushy.",err:[]},
 masu:{t:"〜ます — polite verbs",s:"Verbs ending in ます are polite present/future: たべます = (I) eat / will eat.",ex:["はい 、 たべます","Yes, I'll eat."],how:"たべ (eat) + ます (polite non-past).",more:"Japanese has no separate future tense: ます covers “do” and “will do”. The subject is usually left out. Verbs always come at the end of the sentence.",err:[["たべます わたし は",0,"(verb goes last)","In Japanese the verb comes at the end of the sentence."]]},
 wo:{t:"を — the object marker",s:"を (read “o”) marks what the verb acts on.",ex:["みず を のみます","I drink water."],how:"みず (water) + を (object) + のみます (drink).",more:"を is only ever used as this particle. Order: [object] を [verb].",err:[["みず は のみます",1,"を","With an action verb, mark the thing acted on with を."],["テレビ に みます",1,"を","みます takes an object: テレビ を みます."]]},
 masen:{t:"〜ません — polite negative",s:"Change ます to ません for “don't / won't”.",ex:["にく を たべません","I don't eat meat."],how:"たべます → たべません.",more:"〜ません か is an invitation (Day 74), not just a negative question.",err:[["にく を たべますん",2,"たべません","The negative is たべません: ます → ません."]]},
 eni:{t:"へ / に — going somewhere",s:"With いきます (go), きます (come), かえります (return), mark the destination with へ (read “e”) or に.",ex:["がっこう へ いきます","I go to school."],how:"がっこう (school) + へ (to) + いきます (go).",more:"へ stresses direction, に stresses arrival; both are correct here. As a particle へ is pronounced “e”.",err:[["がっこう を いきます",1,"へ","Destinations take へ or に, not を."]]},
 deplace:{t:"で — where an action happens",s:"で marks the place where you do something.",ex:["としょかん で ほん を よみます","I read books at the library."],how:"としょかん (library) + で (at) + ほん を よみます.",more:"Compare に for where something exists (Day 72) and where you go (Day 60). で is for actions.",err:[["としょかん に べんきょうします",1,"で","For the place of an action, use で."]]},
 nitime:{t:"time + に — at a specific time",s:"Put に after clock times, dates and days: しちじ に = at 7.",ex:["しちじ に おきます","I get up at seven."],how:"しちじ (7 o'clock) + に (at) + おきます (get up).",more:"Relative times — きょう, あした, まいにち, まいあさ — take no に.",err:[["あした に いきます",1,"(no に)","Relative time words like あした don't take に."]]},
 karamade:{t:"〜から〜まで — from … to …",s:"から = from, まで = until / as far as. Works for time and place.",ex:["くじ から ごじ まで はたらきます","I work from nine to five."],how:"くじ から (from 9) + ごじ まで (until 5) + はたらきます.",more:"えき まで = as far as the station. Taxi request: くうこう まで おねがいします.",err:[]},
 demeans:{t:"で — by means of",s:"で after a vehicle or tool means “by / with”.",ex:["でんしゃ で がっこう へ いきます","I go to school by train."],how:"でんしゃ (train) + で (by) …",more:"Walking is あるいて (on foot) — no で. Also: はし で たべます = eat with chopsticks.",err:[["でんしゃ を いきます",1,"で","“By train” is でんしゃ で."]]},
 to:{t:"と — with / and",s:"と after a person means “with”. Between nouns it means “and”.",ex:["ともだち と えいが を みます","I watch a movie with a friend."],how:"ともだち (friend) + と (with).",more:"コーヒー と ケーキ = coffee and cake (a complete list). ひとりで = alone.",err:[]},
 aruiru:{t:"あります / います — there is",s:"あります for things and plants; います for people and animals. The thing that exists is marked with が.",ex:["ねこ が います","There is a cat."],how:"ねこ (cat) + が (subject) + います (exists — living).",more:"あります also means “to have”: トイレ が あります か = Is there / do you have a toilet?",err:[["ねこ が あります",2,"います","Animals and people use います."],["ほん が います",2,"あります","Objects use あります."]]},
 niloc:{t:"place に あります — where things are",s:"Mark the location of something with に.",ex:["へや に つくえ が あります","There is a desk in the room."],how:"へや (room) + に (in) + つくえ が あります.",more:"Two orders: [place] に [thing] が あります (there is X in Y) or [thing] は [place] に あります (X is in Y).",err:[["へや で つくえ が あります",1,"に","Where something exists takes に. で is for actions."]]},
 position:{t:"A の うえ / した / なか — positions",s:"Position words are nouns joined with の: つくえ の うえ = on the desk.",ex:["ほん は つくえ の うえ に あります","The book is on the desk."],how:"つくえ (desk) + の + うえ (top) + に (at).",more:"うえ above, した below, なか inside, まえ in front, うしろ behind, となり next to.",err:[["ほん は つくえ うえ に あります",2,"つくえ の うえ","Join with の: つくえ の うえ."]]},
 masenka:{t:"〜ませんか — invitations",s:"A negative question invites politely: “Won't you …?”",ex:["いっしょに えいが を みません か","Would you like to watch a movie together?"],how:"みません (don't watch) + か → “won't you watch?” = invitation.",more:"Accept with いい です ね. Decline politely with すみません、ちょっと… (trailing off is the polite no).",err:[]},
 mashou:{t:"〜ましょう — let's",s:"Change ます to ましょう for “let's”.",ex:["いきましょう","Let's go."],how:"いきます → いきましょう.",more:"〜ましょう か = Shall we …? / Shall I …?",err:[["えき の まえ で あいます",4,"あいましょう","For “let's”, change ます to ましょう."]]},
 mashita:{t:"〜ました / 〜ませんでした — past",s:"ます → ました (did). ません → ませんでした (didn't).",ex:["きのう えいが を みました","I watched a movie yesterday."],how:"みます → みました.",more:"する verbs work the same: します → しました.",err:[["きのう えいが を みます",3,"みました","きのう is past, so use みました."]]},
 nishimasu:{t:"〜に します — I'll have …",s:"When choosing, say [choice] に します.",ex:["わたし は コーヒー に します","I'll have coffee."],how:"コーヒー + に します = decide on coffee.",more:"Staff may ask なに に します か. A very natural way to order.",err:[]},
 kudasai:{t:"〜を ください — please give me",s:"[thing] を ください = “(Give me) …, please.”",ex:["これ を ください","This one, please."],how:"これ を + ください (please give).",more:"〜を おねがいします is slightly softer and also works for services: チェックイン を おねがいします.",err:[["これ ください を",1,"を ください","Order is [thing] を ください."]]},
 ikura:{t:"いくら — how much",s:"[thing] は いくら です か = How much is …?",ex:["これ は いくら です か","How much is this?"],how:"これ は + いくら (how much) + です か.",more:"Prices: number + えん. Watch the sound changes: さんびゃく, ろっぴゃく, はっぴゃく, さんぜん, はっせん.",err:[]},
 counters:{t:"ひとつ・ふたつ — counting things",s:"Native counters for general objects: ひとつ 1, ふたつ 2, みっつ 3, よっつ 4, いつつ 5, むっつ 6, ななつ 7, やっつ 8, ここのつ 9, とお 10.",ex:["これ を ふたつ ください","Two of these, please."],how:"これ を + ふたつ (two) + ください. The number comes after を, right before the verb.",more:"いくつ = how many. For people use ひとり, ふたり, then さんにん, よにん…",err:[["ふたつ これ を ください",0,"これ を ふたつ","The counter goes after the object: これ を ふたつ ください."]]},
 tekudasai:{t:"〜て ください — please do",s:"Instructions use the て-form + ください. At A1, learn them as fixed phrases.",ex:["まっすぐ いって ください","Please go straight."],how:"いって (go — て-form) + ください (please).",more:"Common: まって ください (wait), みて ください (look), かいて ください (write it), まがって ください (turn). You'll hear these more than you say them.",err:[]},
 wakaru:{t:"〜が わかります — understand",s:"The thing understood is marked with が, not を.",ex:["にほんご が すこし わかります","I understand a little Japanese."],how:"にほんご (Japanese) + が + すこし (a little) + わかります.",more:"わかりません = I don't understand / I don't know. わかりました = Got it.",err:[["にほんご を わかります",1,"が","わかります takes が: にほんご が わかります."]]},
 gaii:{t:"〜が いいです — I'd like / prefer",s:"[choice] が いい です = “… would be good / I'd like …”.",ex:["あか が いい です","I'd like red."],how:"あか (red) + が + いい です (is good).",more:"Careful: ふくろ は いい です (with は) means “No bag, thanks” — a polite refusal.",err:[]},
 iiadj:{t:"い-adjectives",s:"Adjectives ending in い: たかい です = it's expensive. Before a noun: たかい かばん.",ex:["この かばん は たかい です","This bag is expensive."],how:"かばん は + たかい (expensive) + です.",more:"です is only there for politeness with い-adjectives. いい (good) is irregular in other forms: よくない, よかった.",err:[]},
 naadj:{t:"な-adjectives",s:"Some adjectives take な before a noun: しずか な へや = a quiet room. In “X is quiet”, no な: しずか です.",ex:["この まち は しずか です","This town is quiet."],how:"まち は + しずか (quiet) + です.",more:"きれい ends in い but is a な-adjective: きれい な はな.",err:[["しずか へや が いい です",0,"しずか な","Before a noun, な-adjectives need な."]]},
 adjneg:{t:"Adjective negatives",s:"い-adj: drop い, add くない です (たかくない です). な-adj: じゃ ありません.",ex:["にほんご は むずかしく ない です","Japanese isn't difficult."],how:"むずかしい → むずかしく ない です.",more:"いい → よくない です. あまり + negative = not very: あまり たかく ない です.",err:[["テスト は むずかしい ない です",2,"むずかしく","い-adjective negatives change い to く: むずかしく ない."]]},
 waga:{t:"A は B が adjective",s:"Describe a feature of someone: [person] は [part] が [adjective].",ex:["あね は せ が たかい です","My older sister is tall."],how:"あね は (as for my sister) + せ が たかい (height is tall).",more:"Same pattern: ぞう は はな が ながい = Elephants have long trunks. りょうり が じょうず = good at cooking.",err:[]},
 suki:{t:"〜が すき です — likes",s:"The thing you like is marked with が.",ex:["ねこ が すき です","I like cats."],how:"ねこ (cats) + が + すき (liked) + です.",more:"すき is a な-adjective. Negative: すき じゃ ありません. Strong: だいすき. きらい is strong; すき じゃ ない is gentler.",err:[["ねこ を すき です",1,"が","すき takes が: ねこ が すき です."]]},
 adjpast:{t:"Adjective past",s:"い-adj: drop い, add かった です (たのしかった です). な-adj and nouns: でした.",ex:["とても たのしかった です","It was a lot of fun."],how:"たのしい → たのしかった + です.",more:"いい → よかった です. Negative past: たのしく なかった です; しずか じゃ ありませんでした.",err:[["たのしい でした",0,"たのしかった です","い-adjectives make the past with かった, not でした."]]},
 soshite:{t:"そして・でも・それから — linking",s:"Start a new sentence with そして (and), でも (but) or それから (after that).",ex:["にほんご は むずかしい です。 でも たのしい です","Japanese is difficult. But it's fun."],how:"Two sentences linked by でも at the start of the second.",more:"In speech, でも is very common. それから is for sequence of actions.",err:[]},
};

/* ---------- Competencies (JF Standard A1-style Can-do) ---------- */
N.COMP = [
 {id:"read",t:"Read hiragana and katakana",d:"Recognise all kana and read simple words aloud."},
 {id:"greet",t:"Greet and use courtesy expressions",d:"Greet, thank, apologise and take leave appropriately."},
 {id:"intro",t:"Introduce yourself and others",d:"Give your name, nationality, job and ask the same."},
 {id:"things",t:"Ask about things, places and people",d:"Ask what, who, where and whose, and understand the answer."},
 {id:"numbers",t:"Handle numbers, time and dates",d:"Say and understand ages, times, dates and days of the week."},
 {id:"routine",t:"Describe daily routines",d:"Talk about what you do, where, when and with whom."},
 {id:"food",t:"Order food and shop",d:"Order in a restaurant, ask prices, buy items and pay."},
 {id:"travel",t:"Get around and ask for help",d:"Ask for directions, use trains and taxis, handle simple problems."},
 {id:"personal",t:"Talk about family, likes and experiences",d:"Describe people and things, say what you like, tell what you did."},
 {id:"listen",t:"Understand slow, simple speech",d:"Catch key information in short, clear spoken Japanese."},
];

/* ---------- Stages & weeks ---------- */
N.STAGES = [
 {n:1,t:"Japanese Foundations",jp:"きそ",color:"var(--l1)",weeks:[1,2,3,4]},
 {n:2,t:"Building Simple Sentences",jp:"ぶん",color:"var(--l2)",weeks:[5,6,7,8]},
 {n:3,t:"Everyday Communication",jp:"まいにち",color:"var(--l3)",weeks:[9,10,11,12]},
 {n:4,t:"Practical Situations",jp:"まち",color:"var(--l4)",weeks:[13,14,15,16]},
 {n:5,t:"Personal Expression",jp:"わたし",color:"var(--l5)",weeks:[17,18,19,20]},
 {n:6,t:"A1 Consolidation",jp:"しあげ",color:"var(--l6)",weeks:[21,22,23,24]},
];
N.WEEKS = [
 null,
 {t:"Sounds & first hiragana",c:"read",out:["Pronounce the five vowels","Read あ through ほ","Greet people with simple set phrases"]},
 {t:"All of hiragana",c:"read",out:["Read every basic hiragana","Read voiced sounds, small ゃゅょ and っ","Read long vowels"]},
 {t:"Katakana",c:"read",out:["Read all katakana","Recognise loanwords on menus and signs","Read foreign sounds like ティ and ファ"]},
 {t:"Greetings & first sentences",c:"intro",out:["Greet at any time of day","Count from 0 to 10","Say “I am a student” and introduce yourself"]},
 {t:"Questions, this & that",c:"things",out:["Ask yes/no questions","Say what something is and whose it is","Ask what and who"]},
 {t:"Numbers, age & time",c:"numbers",out:["Count to 99","Give your age","Tell the time and the day of the week"]},
 {t:"Dates & places",c:"numbers",out:["Say months and dates","Talk about yesterday and next week","Ask where places are","Read your first kanji"]},
 {t:"First conversations",c:"intro",out:["Introduce others","Use ね and よ naturally","Use classroom survival phrases"]},
 {t:"Polite verbs",c:"routine",out:["Use ます verbs","Mark objects, destinations and places","Say when you do things"]},
 {t:"Daily routine",c:"routine",out:["Describe your day","Say from when until when","Say how, how often and with whom"]},
 {t:"Where things are",c:"things",out:["Say what exists where","Use position words","Invite someone and suggest plans"]},
 {t:"Past & short exchanges",c:"routine",out:["Say what you did and didn't do","Read a short schedule","Follow a short phone exchange"]},
 {t:"Food & restaurants",c:"food",out:["Name common food and drinks","Order with ください and にします","Handle a restaurant visit"]},
 {t:"Shopping & prices",c:"food",out:["Ask and understand prices","Count objects","Ask for sizes and colours and pay"]},
 {t:"Directions & transport",c:"travel",out:["Understand simple directions","Use trains and taxis","Ask departure times"]},
 {t:"Help & travel",c:"travel",out:["Say you don't understand","Explain simple health problems","Check in at a hotel"]},
 {t:"Family & people",c:"personal",out:["Talk about your family","Ask about someone else's family","Say where you live"]},
 {t:"Describing things",c:"personal",out:["Use い- and な-adjectives","Make adjectives negative","Describe people"]},
 {t:"Likes & hobbies",c:"personal",out:["Say what you like and dislike","Talk about hobbies and skills","Link sentences"]},
 {t:"Past experiences",c:"personal",out:["Say how something was","Tell a short weekend story","Write a simple diary entry"]},
 {t:"Reading practical texts",c:"read",out:["Read signs and menus","Read a timetable","Read a short message and self-introduction"]},
 {t:"Listening",c:"listen",out:["Catch numbers, prices and times","Understand a simple station announcement","Ask for repetition"]},
 {t:"Two-way conversation",c:"intro",out:["Hold a short introduction","Handle a restaurant, shop and directions conversation","Make plans and state preferences"]},
 {t:"A1 consolidation",c:"listen",out:["Review high-frequency words and grammar","Pass scenario assessments","See your A1 profile and next steps"]},
];

/* names and function words allowed in sentences (for validation and romaji) */
N.NAMES = ["たなか","やまだ","すずき","さとう","ゆき","とうきょう","きょうと","おおさか","しんじゅく"];
N.PARTICLES = {"は":"wa","へ":"e","を":"o"};
})();
