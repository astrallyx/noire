"use strict";
const util = require("util")
module.exports = {
    code: function(bot, msg) {
		if (msg.author.id == bot.owner_id) {
		    let args = msg.content.split(`${bot.prefix}eval `).join("")
            try {
                let ev = eval(args)
                var str = util.inspect(ev, {depth: 1});
                str = str.replace(new RegExp(bot.token, 'gi'), '¯\\_(ツ)_/¯');
                bot.createMessage(msg.channel.id, `:white_check_mark: | **Evaluation Result**: (Success)\n${"```js\n"}${str}${"\n```"}`)
            } catch (err) {
                bot.createMessage(msg.channel.id, `:warning: | **Evaluation Result**: (Error)\n${"```js\n"}${err}${"\n```"}`)
            }
		}
    },
    description: 'Ping the bot',
    args: "<code>", 
    hidden: false
};