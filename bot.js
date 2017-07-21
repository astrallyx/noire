"use strict";

const Eris = require("eris")
const fs = require("fs")
const config = require(__dirname + "/config.json")
const sg = require(__dirname + "/handlers/shardGenerator.js"), shardGenerator = new sg(0)
const logs = require(__dirname + "/handlers/logManager.js"), lm = new logs()
// lm.run(); (Deprecated for now)

const bot = new Eris(config.token, {
    firstShardID: 0,
    maxShards: (config.shard_max ? config.shard_max : 1)
})

bot.sharding = {
    shard_max: config.shard_max,
    shards: []
};

const am = require(__dirname + "/handlers/adminManager.js"), adminManager = new am(config.admins, bot)
const ch = require(__dirname + "/handlers/commandHandler.js"), commandHandler = new ch(bot)

// important shit
bot.logging = config.detailed_logging
bot.prefix = config.prefix
bot.owner_id = config.owner_id
var commands = commandHandler.commands

//handlers (evalable)
bot.handlers = {}
bot.handlers.shardGenerator = shardGenerator
bot.handlers.logManager = lm
bot.handlers.adminManager = adminManager
bot.handlers.commandHandler = commandHandler

commands.help = {}
commands.help.args = ''
commands.help.description = "Displays a list of commands."
commands.help.code = function(bot, msg) {
    let cmd = []
    for (let command in commands) {
        if (commands[command].hidden != true) {
            let args
            if (commands[command].args) {
                args = "*" + commands[command].args + "*"
            } else if (commands[command].args == false) args = ""
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

bot.on("shardReady", (id) => {
    lm.info(`Shard [${id}] ready for use!`)
    console.log(`Shard [${id}] ready for use!`)
    bot.shards.forEach((s) => {
        if (s.id == id) {
            bot.sharding.shards.push({
                shard_id: id,
                shard_owner: bot.user.username
            })
        }
    })
})

bot.on("ready", () => {
    lm.info("Loaded! (" + bot.user.username + ") in " + bot.guilds.size + " servers!")
    console.log("Loaded! (" + bot.user.username + ") in " + bot.guilds.size + " servers!")
    setTimeout(() => {
        bot.editStatus("online", { name: `${config.prefix}help || ${bot.guilds.size} servers!`, type: 1, url: "https://www.twitch.tv/monstercat" })
    }, 1000)
    commandHandler.load()
})

bot.on("messageCreate", (msg) => {
    if (msg.content.startsWith(bot.prefix)) {
        commandHandler.checkMFC(msg)
    }
})

bot.connect()
