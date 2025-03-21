module.exports.config = {
    name: "editcmd",
    version: "1.0.0",
    permission: 2, // শুধু OWNER ইউজ করতে পারবে
    credits: "Shakil",
    description: "কাস্টম কমান্ড যোগ, এডিট, ডিলিট & লিস্ট",
    prefix: true,
    category: "admin",
    usages: "[add/edit/delete/list] [command_name] [response]",
    cooldowns: 5
};

const fs = require("fs");
const customCommandsFile = "./customCommands.json";

// কমান্ড লোড & সেভ করার ফাংশন
const loadCommands = () => {
    if (!fs.existsSync(customCommandsFile)) fs.writeFileSync(customCommandsFile, JSON.stringify({}, null, 2));
    return JSON.parse(fs.readFileSync(customCommandsFile));
};

const saveCommands = (data) => {
    fs.writeFileSync(customCommandsFile, JSON.stringify(data, null, 2));
};

module.exports.run = ({ api, event, args, permssion }) => {
    const senderID = event.senderID;
    const ownerID = "61564959257681"; // শুধু তুমি ইউজ করতে পারবে

    if (senderID !== ownerID) return api.sendMessage("❌ তুমি এই কমান্ড ব্যবহার করতে পারবে না!", event.threadID);

    let commands = loadCommands();
    let type = args[0];
    let commandName = args[1]?.toLowerCase();
    let response = args.slice(2).join(" ");

    if (!type) return api.sendMessage("⚠️ ব্যবহার: editcmd [add/edit/delete/list] [command_name] [response]", event.threadID);

    if (type === "add") {
        if (!commandName || !response) return api.sendMessage("⚠️ ব্যবহার: editcmd add [command_name] [response]", event.threadID);
        commands[commandName] = response;
        saveCommands(commands);
        return api.sendMessage(`✅ কমান্ড **${commandName}** যোগ করা হয়েছে!`, event.threadID);
    }

    if (type === "edit") {
        if (!commandName || !response) return api.sendMessage("⚠️ ব্যবহার: editcmd edit [command_name] [new_response]", event.threadID);
        if (!commands[commandName]) return api.sendMessage("❌ এই কমান্ড নেই!", event.threadID);
        commands[commandName] = response;
        saveCommands(commands);
        return api.sendMessage(`✅ **${commandName}** কমান্ড আপডেট করা হয়েছে!`, event.threadID);
    }

    if (type === "delete") {
        if (!commandName) return api.sendMessage("⚠️ ব্যবহার: editcmd delete [command_name]", event.threadID);
        if (!commands[commandName]) return api.sendMessage("❌ এই কমান্ড নেই!", event.threadID);
        delete commands[commandName];
        saveCommands(commands);
        return api.sendMessage(`🗑 **${commandName}** কমান্ড ডিলিট করা হয়েছে!`, event.threadID);
    }

    if (type === "list") {
        let commandList = Object.keys(commands);
        return api.sendMessage(`📜 কাস্টম কমান্ড লিস্ট:\n${commandList.length > 0 ? commandList.join(", ") : "❌ কোনো কমান্ড নেই!"}`, event.threadID);
    }

    return api.sendMessage("⚠️ ভুল কমান্ড! ব্যবহার: editcmd [add/edit/delete/list] [command_name] [response]", event.threadID);
};

// ইউজার যখন কাস্টম কমান্ড ইউজ করবে তখন রান করানো হবে
module.exports.onMessage = ({ api, event }) => {
    let commands = loadCommands();
    let message = event.body.toLowerCase();
    if (commands[message]) return api.sendMessage(commands[message], event.threadID);
};
