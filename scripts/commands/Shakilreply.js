const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "shakil_auto_reply",
    version: "1.0.5",
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

    // **Regex ব্যবহার করে চেক করা (Shakil, শাকিল, সাকিল যেকোনো জায়গায় থাকলেই ম্যাচ হবে)**
    const shakilRegex = /(shakil|শাকিল|সাকিল)/i;

    if (shakilRegex.test(text)) {
        const msg = "☺️ Hello শাকিল কে কি দরকার? 😌";

        // **ডাইরেক্ট MP4 ভিডিও লিংক লিস্ট**
        const videoLinks = [
            "https://i.imgur.com/FUATdRx.mp4",
            "https://i.imgur.com/Tc5uHvX.mp4",
            "https://i.imgur.com/3cm8rn0.mp4",
            "https://i.imgur.com/qXuf3f2.mp4",
            "https://i.imgur.com/s6jZ76s.mp4",
            "https://i.imgur.com/IBzDny8.mp4"
        ];

        // এলোমেলো (Random) ভিডিও বাছাই করা
        const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        const videoPath = __dirname + "/shakil_video.mp4";

        try {
            // ভিডিও ডাউনলোড করা
            const response = await axios.get(randomVideo, { responseType: "arraybuffer" });
            fs.writeFileSync(videoPath, Buffer.from(response.data, "binary"));

            // ভিডিও পাঠানো
            api.sendMessage({ body: msg, attachment: fs.createReadStream(videoPath) }, threadID, () => {
                fs.unlinkSync(videoPath); // ভিডিও পাঠানোর পর ফাইল ডিলিট করবে
            });

        } catch (error) {
            api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID);
        }
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'Shakil' বা এরকম কিছু লিখুন!", event.threadID);
};
