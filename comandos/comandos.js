const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message) => {
    const filter = (reaction, user) => {
        return ['⚒️', '⛏️', '🧊'].includes(reaction.emoji.name) && !user.bot && user.id === 
            message.author.id;
    }
    const embed = new MessageEmbed()
        .setTitle(`COMANDOS`)
        .setColor(`36393e`)
        .setDescription(`Reaja abaixo com o emote correspondente a categoria de comandos que você procura.`)
        .addField(`⚒️ Utilitários`, `Aqui estarão os comandos utilizáveis.`, true)
        .addField(`⛏️ Moderação`, `Aqui estarão os comandos de moderação.`)
        .addField(`🧊 Minecraft`, `Aqui estarão os comandos do Minecraft.`)
    message.channel.send(embed).then(async msg => {
        await msg.react('⚒️') && await msg.react('⛏️') && await msg.react('🧊')
        let collector = msg.createReactionCollector(filter);
        collector.on('collect', (reaction, user) => {
        msg.reactions.removeAll();
        embed.fields = [];
        const filter = (reaction, user) => {
            return ['◀️'].includes(reaction.emoji.name) && !user.bot && user.id ===
                message.author.id
        }
        let filc = msg.createReactionCollector(filter);
        msg.react('◀️')
        filc.on('collect', async () => {
            const embed = new MessageEmbed()
            .setTitle(`COMANDOS`)
            .setColor(`36393e`)
            .setDescription(`Reaja abaixo com o emote correspondente a categoria de comandos que você procura.`)
            .addField(`⚒️ Utilitários`, `Aqui estarão os comandos utilizáveis.`, true)
            .addField(`⛏️ Moderação`, `Aqui estarão os comandos de moderação.`)
            .addField(`🧊 Minecraft`, `Aqui estarão os comandos do Minecraft.`)
            msg.edit(embed);
            msg.reactions.cache.get('◀️').remove();
            await msg.react('⚒️') && await msg.react('⛏️') && await msg.react('🧊')
        })
        if (reaction.emoji.name === '⚒️') {
                reaction.users.remove(user);
                embed.setTitle(`Utilitários`)
                embed.setDescription(bot.commands.filter(cmd => cmd.help.name !== 'comandos').filter(cmd => cmd.help.category === 'Utilities').map(cmd => `\`/${cmd.help.name}\` **|** ${cmd.help.description}`).join("\n"))
                msg.edit(embed)
            } else if (reaction.emoji.name === '⛏️') {
                reaction.users.remove(user);
                embed.setTitle(`Moderação`)
                embed.setDescription(bot.commands.filter(cmd => cmd.help.name !== 'comandos').filter(cmd => cmd.help.category === 'Moderation').map(cmd => `\`/${cmd.help.name}\` **|** ${cmd.help.description}`).join("\n"))
                msg.edit(embed);
            } else if (reaction.emoji.name === '🧊') {
                reaction.users.remove(user);
                embed.setTitle(`Minecraft`)
                embed.setDescription(bot.commands.filter(cmd => cmd.help.name !== 'comandos').filter(cmd => cmd.help.category === 'Minecraft').map(cmd => `\`/${cmd.help.name}\` **|** ${cmd.help.description}`).join("\n"))
                msg.edit(embed);
            }
        })
    })
}

module.exports.help = {
    name: 'comandos',
    aliases: ['ajuda', 'help'],
    description: 'Mostra os comandos disponíveis.',
    category: 'Commons'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    cooldown: 6e4,
    rateLimit: 3
}