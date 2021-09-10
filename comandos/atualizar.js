const { MessageEmbed } = require("discord.js")
const moment = require("moment")
moment.locale("pt-BR")

module.exports.run = async (bot, message) => {
    var b;
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setTitle(`O que foi adicionado/removido?`)
        .setColor(`36393e`)
        .setDescription(`OBS: É importante que a atualização seja descrita em apenas uma mensagem`)
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
            let hora = moment().format("[ATUALIZAÇÃO] [DIA] DD[/]MM[/]YYYY");

                    message.guild.channels.cache.find(x => x.id === '845531157990866974').send(`<@&795509113307004938>`,new MessageEmbed()
                        .setTitle(`${hora}`)
                        .setColor(`0000ff`)
                        .setAuthor(`Atualização feita por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`${r1}`)
                        .setFooter(`Atenciosamente Rede Revo`, message.guild.iconURL({ dynamic: true }))
                    ).then(async () => {
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Postado!`)
                            )
                        })
                    })
                }
            }

module.exports.help = {
    name: 'atualizar',
    description: 'Envia uma mensagem de atualização.',
    category: 'Moderation'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}