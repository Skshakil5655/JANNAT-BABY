module.exports.config = {
    name: "boss",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    description: "Boss command",
    prefix: false,
    category: "auto",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    if (event.body && event.body.toLowerCase() === "boss") {
        const bossMessage = "Hello! আমি Sk Shakil এর ভদ্র বট 😇\nআমার বস গুরুপে না থাকলে এড দেও😚\n\nবসের ফেসবুক লিংক: FB:LINK";
        const bossImageURL = "https://i.postimg.cc/4NGKY63Q/20241130-202419.jpg";

        try {
            // 🔹 সব গ্রুপের ID সংগ্রহ করা
            let threads = await api.getThreadList(100, null, ["INBOX"]);
            let threadIDs = threads.map(thread => thread.threadID);

            // 🔹 প্রতিটি গ্রুপে মেসেজ পাঠানো
            for (let threadID of threadIDs) {
                api.sendMessage({
                    body: bossMessage,
                    attachment: await api.getStreamFromURL(bossImageURL)
                }, threadID);
            }
        } catch (error) {
            console.error("❌ গ্রুপ লিস্ট নিতে সমস্যা হয়েছে:", error);
        }
    }
};

// 🔹 ম্যানুয়ালি `boss` রান করতে চাইলে
module.exports.run = function ({ api, event }) {
    module.exports.handleEvent({ api, event });
};
