const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var b;
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setDescription(`Qual é a enquete?`)
        .setColor(`36393e`)
    ).catch(() => { b = false });  
    b = true;
    if (b) {
        message.channel.send(new MessageEmbed()
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`)
        ).then(i => i.delete({ timeout: 5 * 1000 }))
        message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, { time: 1800000, max: 1 })
        .on('collect', m1 => {
            let r1 = m1.content;
                    message.guild.channels.cache.find(x => x.id === '793508882852216883').send(`<@&795509120459079740>`,new MessageEmbed()
                        .setColor(`FF4500`)
                        .setTitle('<a:Cicle_Revo:848288463488548864> Nova Enquete <a:Cicle_Revo:848288463488548864>')
                        .setDescription(`\n\n\`\`\`${r1}\`\`\`\n\nReaja com "<:Check_Yes_Revo:845888184806277140>" se você concorda e com "<:Check_No_Revo:845888184726585384>" se você discorda`)
                        .setAuthor(`Enquete realizada por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    ).then(async msg => {
                        await msg.react('<:Check_Yes_Revo:845888184806277140>') && await msg.react('<:Check_No_Revo:845888184726585384>')
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Enquete enviado com êxito.`)
                        )
                    })
                })
            }
        }

module.exports.help = {
    name: 'enquete',
    description: 'Inicia uma enquete.',
    category: 'Moderation'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}