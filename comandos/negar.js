const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message) => {
    
    message.delete({ timeout: 5 * 1000 });
    
    var b;
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setDescription(`Qual sugestão será negada?`)
        .setColor(`36393e`)
    ).catch(() => { b = false });  
    b = true;
    if (b) {
        message.channel.send(new MessageEmbed()
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`)
        ).then(i => i.delete({ timeout: 5 * 1000 }))
        message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
        .on('collect', m1 => {
            let r1 = m1.content;
                    message.author.send(new MessageEmbed()
                    .setColor(`36393e`)
                    .setTitle(`Autor da sugestão?`)
                    .setDescription(`Mande o ID de quem fez a sugestão`)
                ).then(async msg => {
                    msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
                    .on('collect', m2 => {
                        let r2 = m2.content;
                    message.guild.channels.cache.find(x => x.id === '849420024829050910').send(`<@${r2}>`,new MessageEmbed()
                        .setAuthor(`Sugestão negada por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTitle('<:MinecraftDeny_Revo:845887665445797938> SUA SUGESTÃO FOI NEGADA <:MinecraftDeny_Revo:845887665445797938>')
                        .setColor(`B22222`)
                        .setDescription(`<a:Sino_Revo:849415817502523412> ▫️ Sugestão:\n\`\`\`${r1}\`\`\`\n\n💭 **Agradecemos sua sugestão, porém após cuidadosa análise por parte da nossa equipe, ela foi negada.**`)
                    ).then(async msg => {
                        await msg.react('<:F_Revo:850305832867856395>')
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Resultado enviado com êxito.`)
                            )
                        })
                    })
                })
            })
        }
    }

module.exports.help = {
    name: 'negar',
    description: 'Nega uma sugestão.',
    category: 'Moderation'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}