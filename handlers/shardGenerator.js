"use strict"
const config = require(__dirname + "/../config.json");
const request = require("request");
var url = "https://discordapp.com/api"
var Promise;
try {
Promise = require('bluebird');
} catch(e) { Promise = global.Promise }

class ShardGen {
    constructor(first_shard) {
        this.minimum = first_shard;
    }
    
    shard_array() {
        return new Promise((resolve, reject) => {
            request({
                method: "GET",
                uri: `${url}/gateway/bot`,
                headers: {
                    "Authorization": "Bot " + config.token
                }, json: true
            }, (error, response, body) => {
                let sh = [];
                sh.push(this.minimum)
                sh.push(body.shards)
                resolve(sh)
            });
        });
        
    }
    
    get shards() {
        var shar
        this.shard_array().then(shards => shar = JSON.stringify(shards))
        return shar;
    }
}

module.exports = ShardGen;