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
    usages: "boss, k.bot, boss.bot",
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, Users }) => {
    var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
    var message = event.body.toLowerCase();

    if (message.includes("boss") || message.includes("bot boss") || message.includes("bot kar")) {
        const imagePath = __dirname + "/shakil-bot.jpg";

        const imageUrl = "YOUR_IMAGE_URL_HERE"; // এখানে তোমার পিকচার লিংক বসাও

        const response = await axios({
            url: imageUrl,
            responseType: "arraybuffer"
        });

        fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

        api.sendMessage(
            {
                body: "Hello আমি SK Shakil এর ভদ্র বট",
                attachment: fs.createReadStream(imagePath)
            },
            id,
            () => fs.unlinkSync(imagePath)
        );
    }
};

module.exports.run = async ({ api, event }) => {
    return api.sendMessage("এই কমান্ড অটো কাজ করবে যখন কেউ 'boss', 'k.bot', বা 'boss.bot' লিখবে।", event.threadID);
};
