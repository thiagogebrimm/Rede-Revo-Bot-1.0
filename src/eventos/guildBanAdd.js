const { MessageEmbed } = require("discord.js")

module.exports = (bot, guild, user) => {
    let canal = bot.channels.cache.find(x => x.id === '793599388420800543')
    canal.send(new MessageEmbed()
        .setTitle(`BANIMENTO`)
        .setDescription(`<:Banido_Revo:846044959399477268> ${user.username} foi banido do servidor.`)
        .setColor(`36393e`)
    )
}