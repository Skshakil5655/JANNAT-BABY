const fs = require("fs");
const axios = require("axios");
const { loadImage, createCanvas } = require("canvas");

module.exports.config = {
    name: "slapv2",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    prefix: true,
    description: "Mention someone to put them in the toilet!",
    category: "fun",
    usages: "@mention",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    if (!event.mentions || Object.keys(event.mentions).length === 0) {
        return api.sendMessage("দয়া করে একজনকে মেনশন করুন! উদাহরণ: /slapv2 @ব্যক্তি", event.threadID);
    }

    let mentionedID = Object.keys(event.mentions)[0];
    let mentionedName = event.mentions[mentionedID].replace("@", "");
    let userAvatar = `https://graph.facebook.com/${mentionedID}/picture?width=500&height=500`;
    let toiletImage = "https://i.postimg.cc/0Nw3JpMN/toilet-template.png"; // টয়লেট ব্যাকগ্রাউন্ড ইমেজ

    try {
        let avatarBuffer = (await axios({ url: userAvatar, responseType: "arraybuffer" })).data;
        let toiletBuffer = (await axios({ url: toiletImage, responseType: "arraybuffer" })).data;

        const avatar = await loadImage(avatarBuffer);
        const toilet = await loadImage(toiletBuffer);

        const canvas = createCanvas(600, 600);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(toilet, 0,
