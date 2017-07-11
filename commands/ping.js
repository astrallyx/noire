"use strict";
module.exports = {
    code: function(bot, msg, config) {
		var start = Date.now();
		msg.channel.createMessage("Pong!").then(function(newMsg) {
			var end = Date.now();
			var diff = end - start
			newMsg.edit(`Pong! [${diff}ms] taken!`);
		});
    },
    description: 'Ping the bot',
    args: false, 
    hidden: false
};