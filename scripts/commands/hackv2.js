const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "hackv2",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    prefix: true,
    description: "ফেক হ্যাকিং ইফেক্ট দেখাবে",
    category: "fun",
    usages: "/hackv2 @mention",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    if (!event.mentions || Object.keys(event.mentions).length === 0) {
        return api.sendMessage("⚠️ দয়া করে কারো নাম মেনশন করুন!", event.threadID);
    }

    let mentionedID = Object.keys(event.mentions)[0]; // মেনশন করা ইউজারের আই
