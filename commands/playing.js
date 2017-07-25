"use strict"
module.exports = {
    code: function(bot, msg, config) {
		if (config.admins.masters.indexOf(msg.author.id) || msg.author.id == config.admins.owner_id) {
            let args = msg.content.split(`${bot.prefix}playing `).join('')
            if(!args) {
                bot.editStatus("online", null)
                msg.channel.createMessage("Playing status cleared.")
            } else if(args.length > 128) {
                msg.channel.createMessage("Playing status too long.")
            } else {
                bot.editStats("online", {name: args})
                msg.channel.createMessage(`Playing status set to ${args}`)
            }
        }
    },
    description: 'Sets the playing status of the bot.',
    args: "<game name>",
    hidden: false
}
