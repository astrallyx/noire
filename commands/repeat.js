"use strict"
module.exports = {
    code: function(bot, msg, config) {
		let args = msg.content.split(`${bot.prefix}repeat `).join("")
		msg.channel.createMessage(args)
    },
    description: 'Repeat anything provided to the command!',
    args: false,
    hidden: false
}
