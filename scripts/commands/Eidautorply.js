const schedule = require("node-schedule");

module.exports.config = {
    name: "eid_auto_reply",
    version: "1.0.0",
    permission: 0,
    credits: "𝐂𝐫𝐞𝐚𝐭𝐨𝐫 𝐁𝐲 𝑺𝒉𝒂𝒌𝒊𝒍 ✨",
    prefix: false,
    description: "Auto Eid Mubarak message every 10 minutes",
    category: "auto-reply",
    usages: "",
    cooldowns: 5
};

// 🎯 টার্গেট গ্রুপ আইডি (আপনার গ্রুপের ID দিন)
const targetThreadID = "YOUR_THREAD_ID_HERE"; 

module.exports.onLoad = function ({ api }) {
    schedule.scheduleJob("*/10 * * * *", function () {  // প্রতি ১০ মিনিট পরপর চলবে
        const eidMubarakMessages = [
            "✨ 𝑬𝒊𝒅 𝑴𝒖𝒃𝒂𝒓𝒂𝒌! 🌙❤️ সবাইকে ঈদের অনেক অনেক শুভেচ্ছা! 🎉🎊",
            "🕌 𝐄𝐢𝐝 𝐌𝐮𝐛𝐚𝐫𝐚𝐤! 🤲 আল্লাহ সবাইকে সুখী ও সুস্থ রাখুক! 🕋",
            "💖 𝑬𝒊𝒅 𝒎𝒂𝒏𝒆 𝒂𝒏𝒂𝒏𝒅𝒐, 𝑬𝒊𝒅 𝒎𝒂𝒏𝒆 𝒗𝒂𝒍𝒐𝒃𝒂𝒔𝒂! 𝑬𝒊𝒅 𝑴𝒖𝒃𝒂𝒓𝒂𝒌! 🎆🌟",
            "🕊️ 𝐄𝐢𝐝 𝐌𝐮𝐛𝐚𝐫𝐚𝐤! 😍 নতুন দিনের নতুন সূর্য সবার জীবনে আনন্দ বয়ে আনুক! 🌞",
            "🌸✨ঈদ মোবারক! ✨🌸 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 𝐁𝐲 𝑺𝒉𝒂𝒌𝒊𝒍 ✨"
        ];

        const randomMessage = eidMubarakMessages[Math.floor(Math.random() * eidMubarakMessages.length)];

        api.sendMessage(randomMessage, targetThreadID);
    });
};

module.exports.run = function ({ api, event }) {
    return api.sendMessage("✅ 𝑨𝒖𝒕𝒐 𝑬𝒊𝒅 𝑴𝒖𝒃𝒂𝒓𝒂𝒌 𝒔𝒚𝒔𝒕𝒆𝒎 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅! (𝑬𝒗𝒆𝒓𝒚 10 𝒎𝒊𝒏𝒖𝒕𝒆𝒔) 🌙🎊", event.threadID);
};
