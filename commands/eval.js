"use strict"
const util = require("util")
module.exports = {
    code: function(bot, msg, config) {
		if (config.admins.masters.indexOf(msg.author.id) || msg.author.id == config.admins.owner_id) {
		    let args = msg.content.split(`${bot.prefix}eval `).join("")
            try {
                let ev = eval(args)
                let str = util.inspect(ev, {
                    depth: 1
                })
                str = str.replace(new RegExp(bot.token, 'gi'), '¯\\_(ツ)_/¯')
                str = str.replace(new RegExp(config.token, 'gi'), '¯\\_(ツ)_/¯')
                if(str.length > 1800) {
                    str = str.substr(0, 1800)
                    str = str + "..."
                }
                bot.createMessage(msg.channel.id, `:white_check_mark: | **Evaluation Result**: (Success)\n${"```js\n"}${str}${"\n```"}`)
            } catch (err) {
                bot.createMessage(msg.channel.id, `:warning: | **Evaluation Result**: (Error)\n${"```js\n"}${err}${"\n```"}`)
            } finally {
                let start = new Date(msg.timestamp)
                bot.createMessage(msg.channel.id, "...").then((m) => {
                    let end = new Date(m.timestamp)
                    m.edit("Executed in " + (end - start) + "ms.")
                })
            }
		}
    },
    description: 'Execute an Eval.',
    args: "<code>",
    hidden: false
}
