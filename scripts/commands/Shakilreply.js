const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "shakil_auto_reply",
    version: "1.0.6",
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
    const shakilRegex = /(shakil|শাকিল|সাকিল)/i;

    if (shakilRegex.test(text)) {
        const msg = "☺️ Hello শাকিল কে কি দরকার? 😌";

        // **ভিডিও লিংক লিস্ট (যেন বারবার এক ভিডিও না আসে, তাই শাফল করা হবে)**
        let videoLinks = [
            "https://i.imgur.com/FUATdRx.mp4",
            "https://i.imgur.com/Tc5uHvX.mp4",
            "https://i.imgur.com/3cm8rn0.mp4",
            "https://i.imgur.com/qXuf3f2.mp4",
            "https://i.imgur.com/s6jZ76s.mp4",
            "https://i.imgur.com/IBzDny8.mp4"
        ];

        // **ভিডিও লিস্ট শাফল করা (Randomize করা)**
        videoLinks = videoLinks.sort(() => Math.random() - 0.5);

        // **প্রথম ভিডিও নেওয়া (এলোমেলোভাবে পরিবর্তিত হবে)**
        const randomVideo = videoLinks[0];

        const videoPath = __dirname + "/shakil_video.mp4";

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
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'Shakil' বা এরকম কিছু লিখুন!", event.threadID);
};
