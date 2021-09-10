const { MessageEmbed } = require("discord.js")
const moment = require("moment")
moment.locale("pt-BR")

module.exports.run = async (bot, message) => {
    var b;
    if (!message.member.permissions.has(['ADMINISTRATOR'])) return;
    await message.author.createDM();
    message.author.send(new MessageEmbed()
        .setTitle(`Data da manutenção?`)
        .setColor(`36393e`)
        .setDescription(`Exemplo: **05/08/2021 ás 11:00 da manhã**`)
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

                    message.guild.channels.cache.find(x => x.id === '845531099768815646').send(`<@&795509121503068222>`,new MessageEmbed()
                        .setTitle(`⛔️ Manutenção Agendada ⛔️`)
                        .setColor(`0000ff`)
                        .setAuthor(`Agendado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Manutenção acontecerá no dia **${r1}** (Horário de Brasília)`)
                        .setThumbnail('https://th.bing.com/th/id/R.8e5c42012fdcad01e00855e2d5ca3a19?rik=WXk8KdZPf1eWhQ&pid=ImgRaw&r=0.png')
                        .setFooter(`Atenciosamente Rede Revo`, message.guild.iconURL({ dynamic: true }))
                    ).then(async () => {
                        message.author.send(new MessageEmbed()
                            .setColor(`36393e`)
                            .setDescription(`Agendado!`)
                            )
                        })
                    })
                }
            }

module.exports.help = {
    name: 'manu',
    description: 'Marca a data para o servidor entrar em manutenção.',
    category: 'Moderation',
    aliases: ['manutencao']
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e2
}

module.exports.requirements = {
    ownerOnly: false
}