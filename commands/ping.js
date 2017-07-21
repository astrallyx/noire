"use strict"
module.exports = {
    code: function(bot, msg, config) {
		let start = Date.now()
		msg.channel.createMessage("Pong!").then(function(newMsg) {
			let end = Date.now()
			newMsg.edit(`Pong! [${end - start}ms] taken! (${bot.guilds.get(msg.channel.guild.id).shard.latency}ms Latency)`)
		})
    },
    description: 'Ping the bot',
    args: false,
    hidden: false
}
