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
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return interaction.editReply("Sem permissão para executar esse comando!");

        interaction.editReply({
            embeds: [new MessageEmbed()
                .setTitle(`O que foi adicionado/removido?`)
                .setColor(`DCDCDC`)
                .setDescription(`OBS: É importante que a atualização seja descrita em apenas uma mensagem`)]
        }
        ).then(msg2 => {
            const filter = x => x.author.id == interaction.user.id
            let c2 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20, max: 1 })
                .on('collect', c => {
                    const r1 = c.content

                    let hora = moment().format("[ATUALIZAÇÃO] [DIA] DD[/]MM[/]YYYY");

                    interaction.guild.channels.cache.find(x => x.id === '845531157990866974').send({
                        content: `<@&795509113307004938>`, embeds: [new MessageEmbed()
                            .setTitle(`${hora}`)
                            .setColor(`0094ff`)
                            .setDescription(`${r1}`)
                            .setThumbnail('https://i.imgur.com/27xTVaF.png')
                            .setFooter({ text: `Atenciosamente Rede Revo`, string: interaction.guild.iconURL({ dynamic: true }) })]
                    }).then(async () => {
                        interaction.editReply({
                            embeds: [new MessageEmbed()
                                .setColor(`DCDCDC`)
                                .setDescription(`Atualização postada!`)]
                        })
                    })
                })
        })
    }
}