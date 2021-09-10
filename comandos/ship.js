const Discord = require("discord.js")
 
module.exports.run = async (bot, message, args) => {
        if (!args[0]) return message.channel.send("Você esqueceu de mencionar alguém!")
        if (!args[1]) return message.channel.send("Você precisa mencionar outra pessoa!")
 
        if (args[0] || args[1]) {
            var FirstUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var SecondUser = message.mentions.members.first(-1) || message.guild.members.cache.get(args[1])
 
            if (!FirstUser) return message.channel.send(`Não consegui encontrar alguém chamado **${args[0]}**!`)
            if (!SecondUser) return message.channel.send(`Não consegui encontrar alguém chamado **${args[1]}**!`)
 
            if (FirstUser || SecondUser) {
                const FirstUserSliced = FirstUser.user.username.slice(0, FirstUser.user.username.length / 2)
                const SecondUserSliced = SecondUser.map(user => { return user.user.username.slice(user.user.username.length / 2) })
                const SecondUserName = SecondUser.map(user => { return user.user.username })
 
                message.channel.send(`${FirstUser.user.username} + ${SecondUserName} = **${FirstUserSliced}${SecondUserSliced}**`)
            }
        }
    }

module.exports.help = {
    name: 'ship',
    aliases: ['shippar'],
    category: 'Utilities',
    description: 'Shippa um suposto casal.'
}

module.exports.limits = {
    cooldown: 1,
    ratelimit: 1e2
}

module.exports.requirements = {
    ownerOnly: false
}