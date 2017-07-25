"use strict"
module.exports = {
    code: function(bot, msg, config) {
        // UNFINISHED, WILL FINISH LATER
	    let args = msg.content.substr(config.prefix.length).split(' ')
        args = args.slice(1, args.length).join(' ')
        if(!args[0]) {
            // Embed bot info here
        }
        if(args[0] == "server") {
            // Embed info for the server
        }
        if(args[0] == "member") {
            // Embed info about the member here || a mention of someone
        }
    },
    description: 'Get info for something.',
    args: "blank || server || member || mention",
    hidden: false
}
