module.exports.config = {
    name: "misty_jannat",
    version: "1.0.0",
    permission: 0, // সবাই ব্যবহার করতে পারবে
    credits: "Shakil",
    prefix: false, // প্রেফিক্স ছাড়া চলবে
    description: "Misty K or Jannat K likhle automatic reply dibe!",
    category: "fun",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    const { body, threadID } = event;
    if (!body) return;

    const text = body.toLowerCase();

    if (text.includes("misty k")) {
        return api.sendMessage("Misty আমার বস শাকিল এর এক্স🙂", threadID);
    } else if (text.includes("jannat k")) {
        return api.sendMessage("Jannat আমার বস শাকিলের এক্স🤕", threadID);
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! 'Misty K' বা 'Jannat K' লিখুন", event.threadID);
};
