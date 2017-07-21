"use strict"
module.exports = {
    code: function(bot, msg) {
        msg.channel.createMessage('Your nick is: ' + Math.floor((Math.random() * 100) + 1) + '% lame')
    },
    description: 'Check your lameness of nick. 100% Random.',
    args: false,
    hidden: false
}
