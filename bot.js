"use strict";
const Eris = require("eris");
const config = require(__dirname + "/config.json");
const fs = require("fs")
const bot = new Eris(config.token, {})
const ch = require(__dirname + "/handlers/commandHandler.js"), commandHandler = new ch(bot);
bot.logging = config.detailed_logging;
bot.prefix = config.prefix
bot.owner_id = config.owner_id
var commands = commandHandler.commands;

commands.help = {};
commands.help.args = '';
commands.help.description = "Displays a list of commands.";
commands.help.code = function(bot, msg) {
    let cmd = []
    for (let command in commands) {
        if (commands[command].hidden != true) {
            let args;
            if (commands[command].args) {
                args = "*" + commands[command].args + "*"
            } else if (commands[command].args == false) args = "";
            cmd.push({
                name: `**${bot.prefix}${command}** ${args}`,
                value: "*" + commands[command].description + "*",
                inline: false
            })
        }
    }
    
    bot.createMessage(msg.channel.id, {
        content: '',
        embed: {
            color: 0xd3d3d3,
            description: "**Bot commands!**",
            fields: cmd,
            footer: { icon_url: bot.user.avatarURL, text: bot.user.username }
        }
    })
    
}
bot.on("ready", () => {
    console.log("Loaded! (" + bot.user.username + ") in " + bot.guilds.size + " servers!")
    commandHandler.load();
})

bot.on("messageCreate", (msg) => {
    if (msg.content.startsWith(bot.prefix)) {
        commandHandler.checkMFC(msg)
    }
})

bot.connect();