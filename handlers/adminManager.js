"use strict";
const config = require(__dirname + "/../config.json");

class Admin {
    constructor(admins, bot) {
        admins.forEach((a) => {
            if (admins.indexOf(config.owner_id) != -1) {} else {
                admins.push(config.owner_id)
            }
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
                        display_name: this.bot.users.get(a).username + "#" + this.bot.users.get(a).discriminator,
                        id: this.bot.users.get(a).id,
                        avatar: this.bot.users.get(a).avatarURL,
                        bot: this.bot.users.get(a).bot
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
