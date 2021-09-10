const { MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports.run = async (bot, message) => {

    util.status('rederevo.com', { port: 25565 })
    .then((response) => {
    let embed = new MessageEmbed()
    .setColor(`#FF0000`)
    .setTitle(`rederevo.com`)
    .setDescription(`
                     Total de jogadores:  \`${response.onlinePlayers}/${response.maxPlayers}\` 
                     Versão: 1.8x/1.17.1\n`)
                     .setThumbnail(message.guild.iconURL({ dynamic: true }))
                     .setTimestamp(message.createdAt)
                     .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                     message.channel.send(embed)

                })
            }

module.exports.help = {
    name: 'online',
    description: 'Retorna o estado dos servidores.',
    category: 'Utilities',
    aliases: []
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    cooldown: 6e4,
    rateLimit: 3
}