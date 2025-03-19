const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "bossbot",
    version: "1.0.0",
    permission: 0,
    credits: "SK Shakil",
    prefix: true,
    description: "Auto reply to boss related keywords with an image",
    category: "noprefix",
    usages: "boss k, Bot boss k, bot kar",
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, Users }) => {
    var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
    var message = event.body.toLowerCase();

    if (message.includes("boss k") || message.includes("bot boss k") || message.includes("bot kar")) {
        const imagePath = __dirname + "/shakil-bot.jpg";

        // এখানে সরাসরি ইমেজ লিংক বসানো হয়েছে
        const imageUrl = "https://i.postimg.cc/MZ0DWThV/1732977665089.jpg";

        // ইমেজ ডাউনলোড করে লোকাল ফাইল shakil-bot.jpg এ সেভ করা
        const response = await axios({
            url: imageUrl,
            responseType: "arraybuffer"
        });
        fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

        // ইমেজ সহ মেসেজ সেন্ড
        api.sendMessage(
            {
                body: "Hello আমি SK Shakil এর ভদ্র বট",
                attachment: fs.createReadStream(imagePath)
            },
            id,
            () => fs.unlinkSync(imagePath) // মেসেজ সেন্ড হয়ে গেলে লোকাল ফাইল ডিলিট
        );
    }
};

module.exports.run = async ({ api, event }) => {
    return api.sendMessage("এই কমান্ড অটো কাজ করবে যখন কেউ 'boss k', 'Bot boss k', বা 'bot kar' লিখবে।", event.threadID);
};
