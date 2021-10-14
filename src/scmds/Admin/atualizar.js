const { MessageEmbed } = require('discord.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let moment = require("moment")

module.exports = {
    name: 'atualizar',
    category: 'Admin',
    description: 'Postar uma atualização',
    usage: '',
    run: async (client, interaction) => {
        var b;
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return;
        await interaction.user.createDM();
        interaction.user.send({
            embeds: [new MessageEmbed()
                .setTitle(`O que foi adicionado/removido?`)
                .setColor(`36393e`)
                .setDescription(`OBS: É importante que a atualização seja descrita em apenas uma mensagem`)]
        }
        ).catch(() => { b = false });
        b = true;
        if (b) {
            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setDescription(`Instruções enviadas em seu privado.`)
                    .setColor(`GREEN`)]
            }).then(async i => { await delay(5 * 5000); i.delete() })
            interaction.user.dmChannel.createMessageCollector({
                filter: (x) => (x.author.id === interaction.user.id),
                time: 1800000,
                max: 1
            })
                .on('collect', m1 => {
                    let r1 = m1.content;
                    let hora = moment().format("[ATUALIZAÇÃO] [DIA] DD[/]MM[/]YYYY");

                    interaction.guild.channels.cache.find(x => x.id === '845531157990866974').send({
                        content: `<@&795509113307004938>`, embeds: [new MessageEmbed()
                            .setTitle(`${hora}`)
                            .setColor(`0094ff`)
                            .setDescription(`${r1}`)
                            .setThumbnail('https://i.imgur.com/27xTVaF.png')
                            .setFooter(`Atenciosamente Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                    }).then(async () => {
                        interaction.user.send({
                            embeds: [new MessageEmbed()
                                .setColor(`36393e`)
                                .setDescription(`Postado!`)]
                        })
                    })
                })
        }
    }
}