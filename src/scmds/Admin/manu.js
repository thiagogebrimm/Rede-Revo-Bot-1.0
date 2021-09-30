const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'manu',
    aliases: [''],
    categories : '',
    description: 'cmd de manu',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        var b;
        if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return;
    await interaction.user.createDM();
    interaction.user.send(new MessageEmbed()
        .setTitle(`Data da manutenção?`)
        .setColor(`36393e`)
        .setDescription(`Exemplo: **05/08/2021 ás 11:00 da manhã**`)
    ).catch(() => { b = false });  
    b = true;
    if (b) {
        interaction.channel.send(new MessageEmbed()
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`)
        ).then(i => i.delete({ timeout: 5 * 1000 }))
        interaction.user.dmChannel.createMessageCollector({ filter: x => x.user.id === interaction.user.id, time: 1800000, max: 1 })
        .on('collect', m1 => {
            let r1 = m1.content;

                    interaction.guild.channels.cache.find(x => x.id === '845531099768815646').send( { content: `<@&795509121503068222>`, embeds: [new MessageEmbed()
                        .setTitle(`⛔️ Manutenção Agendada ⛔️`)
                        .setColor(`0000ff`)
                        .setuser(`Agendado por: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Manutenção acontecerá no dia **${r1}** (Horário de Brasília)`)
                        .setThumbnail('https://th.bing.com/th/id/R.8e5c42012fdcad01e00855e2d5ca3a19?rik=WXk8KdZPf1eWhQ&pid=ImgRaw&r=0.png')
                        .setFooter(`Atenciosamente Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                    }).then(async () => {
                        interaction.user.send({
                            embeds: [new MessageEmbed()
                                .setColor(`36393e`)
                                .setDescription(`Agendado!`)
                                ]
                        })
                    })
                })
      }
    }
}