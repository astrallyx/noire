"use strict"
const fs = require("fs")
class Logs {

    constructor() {
        this.date_now = new Date().toString().split(' ').join("_")
    }

    run() {
        if (!fs.existsSync(__dirname + "/../logs/")) {
            fs.mkdirSync(__dirname + "/../logs/")
        } else {
            if (!fs.existsSync(__dirname + "/../logs/" + this.date_now + ".noire_log")) {
                fs.appendFileSync(__dirname + "/../logs/" + this.date_now + ".noire_log", '(' + new Date() + ') [INFO] Begun logging for today!')
            }
        }
    }

    info(message) {
        if (fs.existsSync(__dirname + "/../logs/" + this.date_now + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + this.date_now + ".noire_log", '\n(' + new Date() + ') [INFO] ' + message)
        }
    }

    warn(message) {
        if (fs.existsSync(__dirname + "/../logs/" + this.date_now + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + this.date_now + ".noire_log", '\n(' + new Date() + ') [WARN] ' + message)
        }
    }

    error(message) {
        if (fs.existsSync(__dirname + "/../logs/" + this.date_now + ".noire_log")) {
            fs.appendFileSync(__dirname + "/../logs/" + this.date_now + ".noire_log", '\n(' + new Date() + ') [ERROR] ' + message)
        }
    }
}

module.exports = Logs
