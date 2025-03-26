const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "shakil_auto_reply",
    version: "1.0.1",
    permission: 0,
    credits: "Shakil",
    prefix: false,
    description: "Shakil related message likhle automatic video reply dibe!",
    category: "auto-reply",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    const { body, threadID } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const shakilKeywords = ["shakil", "shakil k", "শাকিল", "সাকিল"];
    const hasShakil = shakilKeywords.some(keyword => text.includes(keyword));

    if (hasShakil) {
        const msg = "☺️ Hello শাকিল কে কি দরকার? 😌";

        // ভিডিও লিংক লিস্ট (ডাউনলোড করে পাঠানোর জন্য)
        const videoLinks = [
            "https://streamable.com/na7tal",
            "https://streamable.com/pn4wv9",
            "https://streamable.com/oxricg"
        ];

        // এলোমেলোভাবে (Random) একটি ভিডিও বাছাই করা
        const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        // ভিডিও ফাইল নাম সেট করা
        const videoPath = __dirname + "/shakil_video.mp4";

        try {
            // ভিডিও ডাউনলোড করা
            const response = await axios.get(randomVideo, { responseType: "arraybuffer" });
            fs.writeFileSync(videoPath, Buffer.from(response.data, "binary"));

            // ভিডিও পাঠানো
            api.sendMessage({ body: msg, attachment: fs.createReadStream(videoPath) }, threadID, () => {
                fs.unlinkSync(videoPath); // পাঠানোর পর ফাইল ডিলিট করে ফেলা
            });

        } catch (error) {
            api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID);
        }
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'Shakil' বা এরকম কিছু লিখুন!", event.threadID);
};
