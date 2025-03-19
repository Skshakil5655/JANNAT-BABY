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
    usages: "boss k, bot boss k, bot kar",
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, Users }) => {
    var id = event.threadID;  // গ্রুপে রিপ্লাই দেওয়ার জন্য senderID এর বদলে threadID ব্যবহার করা হয়েছে
    var name = await Users.getNameUser(event.senderID);
    var message = event.body.toLowerCase();

    if (message.includes("boss k") || message.includes("bot boss k") || message.includes("bot kar")) {
        const imagePath = __dirname + "/shakil-bot.jpg";

        const imageUrl = "https://i.postimg.cc/MZ0DWThV/1732977665089.jpg"; // তোমার দেওয়া ইমেজ লিংক

        try {
            const response = await axios({
                url: imageUrl,
                responseType: "arraybuffer"
            });

            fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

            api.sendMessage(
                {
                    body: `Hello, আমি SK Shakil এর ভদ্র বট! 🤖`,
                    attachment: fs.createReadStream(imagePath)
                },
                id,
                () => fs.unlinkSync(imagePath) // মেসেজ পাঠানোর পর ফাইল মুছে ফেলা হবে
            );
        } catch (error) {
            console.error("ইমেজ লোড করতে সমস্যা হয়েছে:", error);
            api.sendMessage("দুঃখিত, ইমেজ পাঠানো সম্ভব হয়নি।", id);
        }
    }
};

module.exports.run = async ({ api, event }) => {
    return api.sendMessage("এই কমান্ড অটো কাজ করবে যখন কেউ 'boss k', 'bot boss k', বা 'bot kar' লিখবে।", event.threadID);
};
