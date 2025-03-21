const fs = require("fs");
const path = "./commands.json"; 

module.exports.config = {
    name: "editcmd",
    version: "1.0.0",
    permission: 2,
    credits: "Shakil",
    description: "Bot command edit system",
    prefix: true,
    category: "admin",
    usages: "[add/edit/list] [command] [new response]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}, null, 2));

    let commands = JSON.parse(fs.readFileSync(path));

    let action = args[0];
    let commandName = args[1];
    let newResponse = args.slice(2).join(" ");

    if (action === "add" || action === "edit") {
        if (!commandName || !newResponse) return api.sendMessage("❌ Usage: /editcmd add/edit <command_name> <new_response>", event.threadID);
        commands[commandName] = newResponse;
        fs.writeFileSync(path, JSON.stringify(commands, null, 2));
        return api.sendMessage(`✅ Command "${commandName}" updated successfully!`, event.threadID);
    }

    if (action === "list") {
        let list = Object.keys(commands).map(cmd => `🔹 ${cmd}: ${commands[cmd]}`).join("\n");
        return api.sendMessage(list ? `📜 Command List:\n${list}` : "❌ No commands found.", event.threadID);
    }

    return api.sendMessage("❌ Invalid action. Use: /editcmd add/edit/list", event.threadID);
};

module.exports.onMessage = function ({ api, event }) {
    let commands = JSON.parse(fs.readFileSync(path));
    let userMessage = event.body.toLowerCase();
    if (commands[userMessage]) {
        api.sendMessage(commands[userMessage], event.threadID);
    }
};
