const { Client, Message } = require("discord.js")
const EndPrize = require("../../Utils/EndPrize")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
    EndPrize(message)
}