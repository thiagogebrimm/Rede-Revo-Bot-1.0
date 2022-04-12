const { MessageEmbed } = require('discord.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let moment = require("moment")

module.exports = {
    name: 'atualizar',
    category: 'Admin',
    description: 'Postar uma atualização',
    usage: '',
    options: [
        {
            name: 'imagem',
            type: 'STRING',
            description: 'Link da Imagem',
            required: false
        }
    ],
    run: async (client, interaction, message) => {
        var b;
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return interaction.editReply("Sem permissão para executar esse comando!");

        const img = interaction.options.getString('imagem')
        if(img && (!img.startsWith('http://') && !img.startsWith('https://') || !img.includes('.png') && !img.contains('.jpeg'))) return interaction.editReply('Você deve inserir o link de uma imagem!')

        interaction.editReply({
            embeds: [new MessageEmbed()
                .setTitle(`O que foi adicionado/removido?`)
                .setColor(`DCDCDC`)
                .setDescription(`OBS: É importante que a atualização seja descrita em apenas uma mensagem`)]
        }
        ).then(async () => {
            const filter = x => x.author.id == interaction.user.id
            let c2 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20, max: 1 })
                .on('collect', c => {
                    const r1 = c.content

                    let hora = moment().format("[ATUALIZAÇÃO] [DIA] DD[/]MM[/]YYYY");

                    let RevoUpdate = new MessageEmbed()
                        .setTitle(`${hora}`)
                        .setColor(`0094ff`)
                        .setDescription(`${r1}`)
                        .setThumbnail('https://i.imgur.com/Hu3AcY0.png')
                        .setFooter({ text: `Atenciosamente Rede Revo`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    if (img) {
                        RevoUpdate.setImage(img)
                    }
                    
                    interaction.guild.channels.cache.find(x => x.id === '845531157990866974').send({
                        content: `<@&795509113307004938>`, embeds: [RevoUpdate]
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