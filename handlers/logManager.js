"use strict";
const fs = require("fs");
class Logs {
    
    constructor() {
        this.date_now = new Date()
    }
    
    run() {
        if (!fs.existsSync(__dirname + "/../logs/")) {
            fs.mkdirSync(__dirname + "/../logs/")
        } else {
            var date = new Date()
            var datefile = "" + this.date_now + ""
            datefile.split(" ").join("_")
            if (!fs.existsSync(__dirname + "/../logs/" + datefile + ".noire_log")) {
                fs.appendFileSync(__dirname + "/../logs/" + datefile + ".noire_log", '(' + new Date() + ') [INFO] Begun logging for today!')
            }
        }
    }
    
    info(message) {
            var date = new Date()
            var datefile = "" + this.date_now + ""
            datefile.split(" ").join("_")
        if (fs.existsSync(__dirname + "/../logs/" + datefile + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + datefile + ".noire_log", '\n(' + new Date() + ') [INFO] ' + message)   
        }
    }
    
    warn(message) {
            var date = new Date()
            var datefile = "" + this.date_now + ""
            datefile.split(" ").join("_")
        if (fs.existsSync(__dirname + "/../logs/" + datefile + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + datefile + ".noire_log", '\n(' + new Date() + ') [WARN] ' + message)   
        }
    }
    
    error(message) {
            var date = new Date()
            var datefile = "" + this.date_now + ""
            datefile.split(" ").join("_")
        if (fs.existsSync(__dirname + "/../logs/" + datefile + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + datefile + ".noire_log", '\n(' + new Date() + ') [ERROR] ' + message)   
        }
    }
}

module.exports = Logs;