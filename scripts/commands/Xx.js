const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "Shakil",
    version: "1.0.6",
    permission: 0,
    credits: "Shakil",
    prefix: false,
    description: "XX video likhle automatic video reply dibe!",
    category: "auto-reply",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    const { body, threadID } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const triggerWords = /(xx video|x video|xxx video)/i;

    if (triggerWords.test(text)) {
        const msg = "😁🥵ভালো হ লুচ্ছা🫦";

        // **ভিডিও লিংক লিস্ট**
        let videoLinks = [
            "https://i.imgur.com/S1uelu9.mp4",
            "https://i.imgur.com/2u74X0s.mp4",
            "https://i.imgur.com/H6qj2UI.mp4",
            "https://i.imgur.com/dH7rJ6n.mp4",
            "https://i.imgur.com/XRwSIYn.mp4",
            "https://i.imgur.com/OtPhXg2.mp4"
        ];

        // **ভিডিও এলোমেলোভাবে সিলেক্ট করা হবে**
        const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        const videoPath = __dirname + "/xx_video.mp4";

        try {
            const response = await axios.get(randomVideo, { responseType: "arraybuffer" });
            fs.writeFileSync(videoPath, Buffer.from(response.data, "binary"));

            api.sendMessage({ body: msg, attachment: fs.createReadStream(videoPath) }, threadID, () => {
                fs.unlinkSync(videoPath);
            });
        } catch (error) {
            api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID);
        }
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'xx video' বা এরকম কিছু লিখুন!", event.threadID);
};
