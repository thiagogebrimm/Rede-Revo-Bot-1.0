const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var b;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setDescription(`Qual é a sua sugestão?`)
        .setColor(`36393e`)
    ).catch(() => { b = false });  
    b = true;
    if (b) {
        message.channel.send(new MessageEmbed()
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`)
        ).then(i => i.delete({ timeout: 5 * 1000 }))
        message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, { time: 90000, max: 1 })
        .on('collect', m1 => {
            let r1 = m1.content;
            message.author.send(new MessageEmbed()
                .setColor(`36393e`)
                .setDescription(`Por que sua sugestão deve ser implementada?`)
            ).then(async msg => {
                msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 90000, max: 1 })
                .on('collect', m2 => {
                    let r2 = m2.content;
                    message.guild.channels.cache.find(x => x.id === '793284851889209355').send(new MessageEmbed()
                        .setAuthor(`Sugestão enviada por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor(`FFD700`)
                        .setDescription(`<a:Sino_Revo:849415817502523412> ▫️ Sugestão:\n\n\`\`\`${r1}\`\`\`\n\n💭 Motivo para ser implementada: **${r2}**`)
                        .setFooter(`ID: ${message.author.id} `)
                    ).then(async msg => {
                        await msg.react('<:Minecraftaccept_Revo:845887665617633290>') && await msg.react('<:MinecraftDeny_Revo:845887665445797938>')
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Sugestão enviada com êxito.`)
                        )
                    })
                })
            })
        })
    }
}

module.exports.help = {
    name: 'sugerir',
    description: 'Envia uma sugestão a ser discutida publicamente.',
    category: 'Utilities'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}