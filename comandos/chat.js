const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    const channel = message.channel;
    if (message.member.permissions.has(['MANAGE_MESSAGES'])) {
        if (!args[0]) {
            message.channel.send(new MessageEmbed()
                .setDescription(`Você deve utilizar \`/chat [ on | off ]\` para configurar o chat.`)
                .setColor(`RED`)
            )
        } else {
            if ('on' === args[0]) {
                await channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                    })
        
                message.channel.send(new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`Agora o canal está desbloqueado, ou seja, membros comuns não poderão falar aqui.`)
                )
            }
            if ('off' === args[0]) {               
                await channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                    })
                        message.channel.send(new MessageEmbed()
                        .setColor(`GREEN`)
                        .setDescription(`Agora o canal está bloqueado, ou seja, membros comuns poderão falar aqui.`)
                )               
            }
        }
    }    
    }
module.exports.help = {
    name: 'chat',
    aliases: ['lock'],
    category: 'Moderation',
    description: 'Torna o canal indisponível para conversação.'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 1e2
}
