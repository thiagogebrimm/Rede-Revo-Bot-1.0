const { MessageEmbed } = require("discord.js")

module.exports = async (bot, oldstate, newstate) => {

    if (oldstate.voiceChannel === undefined && newstate.voiceChannel !== undefined) {
        console.log('entrou')
    } else if (newstate.voiceChannel === undefined) {
        console.log('saiu')
    }
};