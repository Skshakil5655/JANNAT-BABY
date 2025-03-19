const fs = require("fs");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
    name: "coverv2",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    prefix: true,
    description: "Create a stylish Facebook cover photo",
    category: "image",
    usages: "coverv2 Name - Number - Email - Location - Color",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const input = args.join(" ").split(" - ");
    if (input.length < 5) return api.sendMessage("❌ উদাহরণ: coverv2 Shakil - 017xxxxxxxx - shakil@gmail.com - Rangpur - red", event.threadID);

    const [name, number, email, location, color] = input;

    const validColors = { red: "#FF0000", white: "#FFFFFF", black: "#000000", blue: "#0000FF" };
    const selectedColor = validColors[color.toLowerCase()] || "#FFFFFF";

    const width = 820, height = 312;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(0, 0, width, height);

    ctx.font = "bold 40px 'Bleeding Cowboys'";
    ctx.fillStyle = selectedColor;
    ctx.fillText(name, 50, 80);

    ctx.font = "30px Arial";
    ctx.fillText(`📞 ${number}`, 50, 140);
    ctx.fillText(`📧 ${email}`, 50, 190);
    ctx.fillText(`📍 ${location}`, 50, 240);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFD700";
    ctx.fillText("Credit by Shakil", width - 200, height - 20);

    const imagePath = __dirname + "/cover.png";
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(imagePath, buffer);

    api.sendMessage({
        body: "✅ তোমার কভার ফটো তৈরি হয়েছে!",
        attachment: fs.createReadStream(imagePath)
    }, event.threadID, () => fs.unlinkSync(imagePath));
};
