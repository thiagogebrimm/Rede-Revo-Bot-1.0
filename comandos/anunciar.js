const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message) => {
    var b;
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setDescription(`Titulo do anuncio?`)
        .setColor(`00e0ff`)
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
                .setDescription(`Texto?`)
            ).then(async msg => {
                msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 90000, max: 1 })
                .on('collect', m2 => {
                    let r2 = m2.content;
                    message.author.send(new MessageEmbed()
                    .setColor(`36393e`)
                    .setDescription(`Canal`)
                ).then(async msg => {
                    msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 90000, max: 1 })
                    .on('collect', m3 => {
                        let r3 = m3.content;                    
                    message.guild.channels.cache.find(x => x.id === r3).send(new MessageEmbed()

                        .setTitle(`${r1}`)
                        .setColor(`RED`)
                        .setAuthor(`Anuncio enviado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`${r2}`)
                    ).then(async () => {
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Anunciado!.`)
                        )
                    })
                })
            })
        })
    }) 
        })
    }
}

module.exports.help = {
    name: 'anunciar',
    description: 'Envia uma mensagem pra todos.',
    category: 'Moderation'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}