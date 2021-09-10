module.exports.run = (bot, message) => {
    const test = message.createdTimestamp - message.createdTimestamp
    message.channel.send(`🏓Ping Revo:\`${Date.now() - message.createdTimestamp}ms\`. \n🏓Ping API:\`${Math.round(bot.ws.ping)}ms\`.`);
}

module.exports.help = {
    name: 'ping',
    description: 'Verifique a latência do bot através de um cálculo.',
    aliases: ['latencia'],
    category: 'Utilities'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    cooldown: 6e4,
    rateLimit: 3
}