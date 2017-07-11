"use strict";
const fs = require("fs");
const config = require(__dirname + "/../config.json");
var EventEmitter;
try {
EventEmitter = require('eventemitter3');
} catch(e) { EventEmitter = require('events'); }

class Command extends EventEmitter {
    constructor(bot) {
        super();
        this.bot = bot;
        this.commands = {}
    }
    
    load() {
        var files = fs.readdirSync(__dirname + '/../commands');
        for (let file of files) {
            if (file.endsWith('.js')) {
                this.commands[file.slice(0, -3)] = require(__dirname + '/../commands/' + file);
                if (this.bot.logging) console.log("Loaded " + file);
            }
        }
        console.log("Commands loaded!");
    }
    
    checkMFC(msg) {
        var command = msg.content.split(this.bot.prefix)[1].split(" ")[0];
        msg.content = msg.content.replace(this.bot.prefix + command + " ", "");
        if(this.commands) this.commands[command].code(this.bot, msg, config);
        
    }
}

module.exports = Command;