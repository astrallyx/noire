"use strict";
const config = require(__dirname + "/../config.json");

class Admin {
    constructor(admins, bot) {
        admins.forEach((a) => {
            if (admins.indexOf(config.owner_id) != -1) {} else admins.push(config.owner_id)
        })
        this.admins = admins;
        this.bot = bot;
    }
    
    
    get getAdmins() {
        var response = []
        this.admins.forEach((a) => {
            if (response.indexOf(a) != -1) {
            } else {
                response.push({
                    admin_username: this.bot.users.get(a).username + "#" + this.bot.users.get(a).discriminator,
                    admin_id: this.bot.users.get(a).id,
                    admin_avatar: this.bot.users.get(a).avatarURL,
                    admin_isBot: this.bot.users.get(a).bot
                })
            }
        })
        return response;
    }
    
    get adminsMessage() {
        var response = [];
        var message
        this.getAdmins.forEach((a) => {
            response.push(a.admin_username)
        })
        var newres = "**" + response.toString().split(",").join("**: Bot Admin\n**") + "**: Bot Admin"
        return newres
    }
}


module.exports = Admin;
