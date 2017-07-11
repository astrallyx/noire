"use strict";
const util = require("util")
module.exports = {
    code: function(bot, msg, config) {
		if (config.admins.indexOf(msg.author.id) || msg.author.id == config.owner_id) {
		    let args = msg.content.split(`${bot.prefix}eval `).join("")
            try {
                let ev = eval(args)
                var str = util.inspect(ev, {depth: 1});
                str = str.replace(new RegExp(bot.token, 'gi'), '¯\\_(ツ)_/¯');
                bot.createMessage(msg.channel.id, `:white_check_mark: | **Evaluation Result**: (Success)\n${"```js\n"}${str}${"\n```"}`)
            } catch (err) {
                bot.createMessage(msg.channel.id, `:warning: | **Evaluation Result**: (Error)\n${"```js\n"}${err}${"\n```"}`)
            } finally {
                let start = Date.now();
                bot.createMessage(msg.channel.id, "...").then((m) => {
                    let end = Date.now();
                    let ms = end - start
                    m.edit("Executed in " + ms + "ms.")
                })
            }
		}
    },
    description: 'Execute an Eval.',
    args: "<code>", 
    hidden: false
};