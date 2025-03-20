module.exports.config = {
    name: "replyv4",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Shakil",
    description: "Smart auto reply bot",
    commandCategory: "fun",
    usages: "[message]",
    cooldowns: 2,
};

module.exports.run = async ({ event, api }) => {
    const message = event.body.toLowerCase();
    
    const replies = {
        // 🔹 সাধারণ কথাবার্তা
        "kmn acho": "Ami valo achi, tumi? 🥰",
        "কেমন আছো": "আমি ভালো আছি, তুমি?",
        "ki koro": "Tomar sathe kotha bolchi! 😊",
        "কি করছো": "তোমার সাথে কথা বলছি! 😊",
        "tumar nam ki?": "Ami Shakil-er Bot 🤖",
        "তোমার নাম কি?": "আমি Shakil-এর Bot 🤖",
        "tumi kothay thako?": "Ami tomar mone thaki! 😍",
        "তুমি কোথায় থাকো?": "আমি তোমার মনে থাকি! 😍",
        "bhalobaso amake?": "Ami sobar kache special! ❤️",
        "ভালবাসো আমাকে?": "আমি সবাইকে ভালোবাসি! ❤️",
        "ghumaiso?": "Bot ki ghumay naki? 🤔",
        "ঘুমাইছো?": "বট কি ঘুমায় নাকি? 🤔",
        "ki obostha?": "Life e chill kortesi... 😎",
        "কি খবর": "সব ঠিকঠাক! তোমার?",
        
        // 🔹 রোমান্টিক কথাবার্তা
        "ami tomake valobashi": "Awww! 🥰 Ami o tomake valobashi! ❤️",
        "আমি তোমাকে ভালোবাসি": "আহারে! 🥰 আমিও তোমাকে ভালোবাসি! ❤️",
        "kiss dao": "Eii, eijeh 😘",
        "চুমু দাও": "এই নাও, মিষ্টি একটা চুমু! 😘",
        "hug dao": "Eii, ekta boro jhappi 🤗",
        "জড়িয়ে ধরো": "এই নাও, ভালোবাসার আলিঙ্গন 🤗",
        "tumi ki prem koro?": "Bot-er abar prem! 😜",
        "তুমি কি প্রেম করো?": "বটের আবার প্রেম! 😜",
        "tumi amake miss koro?": "Aww, ami tomake khub miss kori! 😭",
        "তুমি আমাকে মিস করো?": "আহারে! আমি তোমাকে খুব মিস করি! 😭",
        
        // 🔹 লুচ্চামি টাইপ কথাবার্তা
        "single naki?": "Single life best! 😉",
        "সিঙ্গেল নাকি?": "সিঙ্গেল লাইফ বেস্ট! 😉",
        "biye korba?": "Shuru hoia gelo! 😂",
        "বিয়ে করবে?": "শুরু হয়ে গেলো! 😂",
        "meye patate paro?": "Hmm, ai to amar pro level skill! 😆",
        "মেয়ে পটাতে পারো?": "হুম, এটাই তো আমার প্রো লেভেলের স্কিল! 😆",
        "patli tor bou?": "Arehh! Erokom ki bola jay! 😆",
        "পটলি তোর বউ?": "আরেহ! এরকম কি বলা যায়! 😆",
        "prem korba?": "Hmmm, tumi ki available? 😜",
        "প্রেম করবে?": "হুমম, তুমি কি অ্যাভেইলেবল? 😜",
        
        // 🔹 ফাজলামি টাইপ রিপ্লাই
        "tumi ki moja koro?": "Ami shudhu moja kori! 😆",
        "তুমি কি মজা করো?": "আমি শুধু মজা করি! 😆",
        "pagol naki?": "Hmm, ekto pagol e! 😆",
        "পাগল নাকি?": "হুম, একটু পাগলই! 😆",
        "areh beta chup": "Bhai bhai, eto rag ken? 🤣",
        "আরেহ বেটা চুপ": "ভাই ভাই, এতো রাগ কেন? 🤣",
        "matha thik ase?": "Bhai, chintar kono karon nai! 😆",
        "মাথা ঠিক আছে?": "ভাই, চিন্তার কোনো কারণ নাই! 😆",
        "faltu kotha bolish na": "Areh sorry boss! 😂",
        "ফালতু কথা বলিস না": "আরে স্যরি বস! 😂",
        
        // 🔹 বন্ধুত্বপূর্ণ কথা
        "best friend tumi": "Haan! Friends forever! ❤️",
        "তুমি কি বন্ধু?": "হ্যাঁ! আমি তোমার বট-বন্ধু! ❤️",
        "tomar bondhu ke?": "Tumi! Amar best friend! 😍",
        "তোমার বন্ধু কে?": "তুমিই! আমার বেস্ট ফ্রেন্ড! 😍",
        
        // 🔹 ফানি কথাবার্তা
        "murgi age na dim?": "Eto boro jinish amar mathai dhukena! 😂",
        "মুরগি আগে না ডিম?": "এতো বড় বিষয় আমার মাথায় ঢোকে না! 😂",
        "ai bot ki kore?": "Tomar sathe moja kore! 🤪",
        "এই বট কি করে?": "তোমার সাথে মজা করে! 🤪",
        "matha kharap?": "Ekdom fresh matha! 😂",
        "মাথা খারাপ?": "একদম ফ্রেশ মাথা! 😂",
        "khela hobe?": "Shuru kore dao bhai! 😎",
        "খেলা হবে?": "শুরু করে দাও ভাই! 😎",
        "exam e fail korlam": "Bujhtei partesi, ghum besi diso! 😆",
        "পরীক্ষায় ফেল করলাম": "বুঝতেই পারছি, ঘুম বেশি দিছো! 😆",
        
        // 🔹 টুকটাক কথা
        "music dao": "Kon song chai bolo?",
        "গান দাও": "কোন গান চাই বলো?",
        "valo song bolo": "Sunba ki 'Tomar chokher mayabi duita golpo'?",
        "ভালো গান বলো": "শুনবা কি 'তোমার চোখের মায়াবী দু'টা গল্প'?",
        "coding sikha": "Tumi o coder hote chao?",
        "কোডিং শেখাও": "তুমিও কি কোডার হতে চাও?",
        "shakil ke?": "Shakil amar malik! 😎",
        "শাকিল কে?": "শাকিল আমার মালিক! 😎",
    };

    for (let key in replies) {
        if (message.includes(key.toLowerCase())) {
            return api.sendMessage(replies[key], event.threadID, event.messageID);
        }
    }
};
