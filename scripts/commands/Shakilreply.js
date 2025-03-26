module.exports.config = {
    name: "shakil_auto_reply",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    prefix: false,
    description: "Shakil related message likhle automatic reply dibe video shoho!",
    category: "auto-reply",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    const { body, threadID } = event;
    if (!body) return;

    const text = body.toLowerCase();

    // শাকিল নামের বিভিন্ন ভ্যারিয়েশন চেক করা
    const shakilKeywords = ["shakil", "shakil k", "শাকিল", "সাকিল"];
    const hasShakil = shakilKeywords.some(keyword => text.includes(keyword));

    if (hasShakil) {
        const msg = "☺️ Hello শাকিল কে কি দরকার? 😌";

        // তিনটি ভিডিও লিংক লিস্ট
        const videoLinks = [
            "https://streamable.com/na7tal",
            "https://streamable.com/pn4wv9",
            "https://streamable.com/oxricg"
        ];

        // এলোমেলো (Random) ভাবে একটি ভিডিও লিংক বাছাই করা
        const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        api.sendMessage({ body: msg + "\n\n🎥 ভিডিও: " + randomVideo }, threadID);
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'Shakil' বা এরকম কিছু লিখুন!", event.threadID);
};
